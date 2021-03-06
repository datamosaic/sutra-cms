/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4FDACEFD-6F16-46F7-807B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"192EB21C-EA84-456F-928C-31AF9D68BEAF",variableType:-4}
 */
var _editMode = false;

/**
 * @param	{JSRecord}	[assetRecord] Record that we are working with
 * @param	{Boolean}	[editMode] Save data or leave in pseudo-transaction
 * 
 * @properties={typeid:24,uuid:"C27CDF64-0B6B-4908-9DD2-52593E9A0F1D"}
 */
function ASSET_scale(assetRecord,editMode) {
	var fidForm = 'WEB_0F_asset__image__P_scale'
	
	if (!assetRecord instanceof JSRecord) {
		assetRecord = foundset.getSelectedRecord()
	}
	
	if (editMode) {
		_editMode = true
	}
	else {
		_editMode = false
	}
	
	//save outstanding data and turn autosave off
	if (!_editMode) {
		databaseManager.saveData()
		databaseManager.setAutoSave(false)
	}
	
	//get default asset instance
	var srcAsset = assetRecord.web_asset_to_asset_instance__initial.getRecord(1)
	
	//duplicate default asset
	var asset = globals.CODE_record_duplicate(srcAsset,['web_asset_instance_to_asset_instance_meta'],null,true)
	asset.flag_initial = 0
	
	//get meta data points we need
	var metaRows = new Object()
	for (var i = 1; i <= asset.web_asset_instance_to_asset_instance_meta.getSize(); i++) {
		var record = asset.web_asset_instance_to_asset_instance_meta.getRecord(i)
		metaRows[record.data_key] = record
	}
	
	//pre-fill scale FiD
	forms[fidForm]._asset = asset
	forms[fidForm]._metaWidth = metaRows.width
	forms[fidForm]._metaHeight = metaRows.height
	
	forms[fidForm]._imageHeightOriginal = 
	forms[fidForm]._imageHeight = 
		metaRows.height.data_value
	
	forms[fidForm]._imageWidthOriginal = 
	forms[fidForm]._imageWidth = 
		metaRows.width.data_value
	
	forms[fidForm]._imageName = asset.asset_title
	forms[fidForm]._imageDirectory = asset.asset_directory
	
	//show FiD
	globals.CODE_form_in_dialog(
			forms[fidForm],
			-1,-1,-1,-1,
			" ", 
			true, 
			false, 
			"CMS_imageScale"
		)
	
	//start a continuation in wc
	scopes.DS.continuation.start(null,fidForm)
					
	//FiD not cancelled, get values and create new instance
	var success = false
	var recs	= databaseManager.getFoundSetDataProviderAsArray(assetRecord.web_asset_to_asset_instance, 'id_asset_instance')
	for (var i = 0; i < recs.length; i++) {
		// with UUIDs need to convert UUID to string to compare
		success = (recs[i].toString().indexOf(asset.id_asset_instance) >= 0) ? true : false
		if (success) break
	}
	if (success) {
		var baseDirectory = forms.WEB_0F_install.ACTION_get_install() +
							'/application_server/server/webapps/ROOT/sutraCMS/sites/' +
							forms.WEB_0F_site.directory + '/'
		var origLocation = 	baseDirectory + srcAsset.asset_directory + '/' + srcAsset.asset_title
		var newLocation = 	baseDirectory + asset.asset_directory + '/' + asset.asset_title
		
		var params 	= {origLocation : origLocation, 
			           newLocation 	: newLocation,
			           width		: metaRows.width.data_value,
			           height		: metaRows.height.data_value,
			           assetID		: asset.id_asset_instance,
			           directory	: forms.WEB_0F_site.directory}
		// developer or server client
		if (application.isInDeveloper()) {
			IMAGE_resize(params)
			//select correct record
			forms.WEB_0F_asset_1F_2L_asset_instance.foundset.selectRecord(asset.id_asset_instance)				
			globals.DIALOGS.showInfoDialog("Image",  "Image resized")
		}
		else {
			// headless client plugin
			var jsclient = plugins.headlessclient.createClient("_dsa_mosaic_WEB_cms", null, null, null)
			jsclient.queueMethod("WEB_0F_asset__image", "IMAGE_resize", [params], IMAGE_resize_callback)				
		}
		
		return asset
	}
}

/**
 * @properties={typeid:24,uuid:"4E1C260C-2947-4F57-8943-93E01CC26399"}
 */
function INIT_asset() {
	
	// main data object to build
	var asset = new Object()
	
	// form with info about this asset
	asset.formName = controller.getName()
	
	// meta rows
	asset.meta = {
		height : 'INTEGER',
		width : 'INTEGER'
//		thumbnail : 'MEDIA'
	}
	
	return asset
}

/**
 * @properties={typeid:24,uuid:"3278B83E-D9B7-4AD0-91CD-01106D171D26"}
 */
function ASSET_actions(input,assetRecord) {
	//menu items
	var valuelist = new Array(
					'Scale image',
					'View image'
				)
	
	//called to depress menu
	if (input instanceof JSEvent) {
		//set up menu with arguments
		var menu = new Array()
		
		for ( var i = 0 ; i < valuelist.length ; i++ ) {
			menu[i] = plugins.popupmenu.createMenuItem(valuelist[i],ASSET_actions)
			
			menu[i].setMethodArguments(i,assetRecord)
			
			if (menu[i].text == '----') {
				menu[i].setEnabled(false)
			}
		}
		//popup
		var elem = forms[input.getFormName()].elements[input.getElementName()]
		if (elem != null) {
			plugins.popupmenu.showPopupMenu(elem, menu)
		}
	}
	//menu shown and item chosen
	else {
		switch( input ) {
			case 0:	//scale
				ASSET_scale(assetRecord)
				break
			case 1:	//view
				ASSET_preview(assetRecord)
				break
		}
	}
}

/**
 * @properties={typeid:24,uuid:"1D27A610-3A52-4165-B6E5-4A2AF3FBD122"}
 * @AllowToRunInFind
 */
function IMAGE_resize(params) {
	var origLocation 	= params.origLocation
	var newLocation		= params.newLocation
	var newWidth		= params.width
	var newHeight		= params.height
	var directory		= params.directory
	
	var assetFS = databaseManager.getFoundSet("sutra_cms","web_asset_instance")
	assetFS.find()
	assetFS.id_asset_instance = params.assetID
	var count = assetFS.search()
	var asset = assetFS.getSelectedRecord()
	
	
	//root directory for this site
	var baseDirectory = forms.WEB_0F_install.ACTION_get_install() +
						'/application_server/server/webapps/ROOT/sutraCMS/sites/' +
						directory + '/'		
							
	var file = plugins.file.convertToJSFile(origLocation)
	var imageTemp =  plugins.images.getImage(file.getBytes())
	
	if (newLocation) {
		var newName = newLocation.split('/')
		newName = newName[newName.length - 1]
		
		var newDir = newLocation.substr(baseDirectory.length)
		newDir = newDir.substr(0,newDir.length - newName.length - 1)
		
		var ext = newName.split('.')
		var fileExt = ext[ext.length-1].toLowerCase()
	}
	
	
	// set image details object
	var fileOBJ = {}
	fileOBJ.image_name	= newName || file.getName().replace(/ /g, "_")
	fileOBJ.image_type	= file.getContentType()
	fileOBJ.image_extension	= fileExt
	fileOBJ.width		= newWidth || imageTemp.getWidth()
	fileOBJ.height		= newHeight || imageTemp.getHeight()
	fileOBJ.directory	= newDir || "images"	//TODO: this will need to be more customizable
	fileOBJ.rec_created = new Date()
	fileOBJ.size		= plugins.file.getFileSize(file)
	if (fileOBJ.width > 200 || fileOBJ.height > 200) {
		fileOBJ.thumbnail	= imageTemp.resize((200*fileOBJ.width) / fileOBJ.height, 200)
	}
	else {
		fileOBJ.thumbnail	= imageTemp
	}
	
	//resize image if new sizes passed in
	if (newWidth || newHeight) {
		file = imageTemp.resize(newWidth || imageTemp.getWidth(), newHeight || imageTemp.getHeight()).getData()
		fileOBJ.size = file.length
	}
	//convert to byte array for initial import
	else {
		file = file.getBytes()
	}
		
	// save file
	var success = plugins.file.writeFile(plugins.file.convertToJSFile(newLocation),file)
	
	if ( !success ) {
		return "File save error"
	}
	
	//save down new information
	asset.asset_size = fileOBJ.size
	asset.asset_directory = fileOBJ.directory
	
	databaseManager.saveData()
	
	// return asset instance ID so can select in callback
	return params.assetID
}

/**
 * @properties={typeid:24,uuid:"C889B095-3953-4BC3-BE3F-D79F2B03F0AD"}
 */
function IMAGE_resize_callback(callback) {
	//select last record
	forms.WEB_0F_asset_1F_2L_asset_instance.foundset.selectRecord(callback.data)
	globals.DIALOGS.showInfoDialog("Image",  "Image resized")
}

/**
 * @param {JSRecord<db:/sutra_cms/web_asset>} assetRecord
 * 
 * @properties={typeid:24,uuid:"61878049-82F3-401E-8DA2-9F12E9E2CEAB"}
 */
function ASSET_preview(assetRecord) {
	if (application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
		if (!(assetRecord instanceof JSRecord)) {
			assetRecord = forms.WEB_0F_asset.foundset.getSelectedRecord()
		}
		
		var height = 400
		var width = 400
		if (utils.hasRecords(assetRecord,'web_asset_to_asset_instance.web_asset_instance_to_asset_instance_meta')) {
			for (var i = 1; i <= assetRecord.web_asset_to_asset_instance.web_asset_instance_to_asset_instance_meta.getSize(); i++) {
				var metaRec = assetRecord.web_asset_to_asset_instance.web_asset_instance_to_asset_instance_meta.getRecord(i)
				if (metaRec.data_key == 'height') {
					height = metaRec.data_value
				}
				else if (metaRec.data_key == 'width') {
					width = metaRec.data_value
				}
			}
		}
		
		//get a page in this site
		if (utils.hasRecords(forms.WEB_0F_site.web_site_to_page)) {
			//both the base and resource url methods will return with "sutraCMS/"; need to remove from one so no doubling
			var siteURL = utils.stringReplace(globals.WEBc_markup_link_base(forms.WEB_0F_site.web_site_to_page.id_page),'sutraCMS/','') + globals.WEBc_markup_link_resources(forms.WEB_0F_site.web_site_to_page.id_page)
			var imgLink = siteURL + assetRecord.web_asset_to_asset_instance.asset_directory + '/' + assetRecord.web_asset_to_asset_instance.asset_title
			var imgInfo = assetRecord.web_asset_to_asset_instance.asset_title + ' (' + assetRecord.web_asset_to_asset_instance.display_asset_size + ')'
			var preview = '<html style="height: 100%; font-family: Verdana,\'Helvetica Neue\', Arial, Helvetica, sans-serif; font-size: 11px;"><body style="height: 100%; margin: 0px;"><div style="background:url(' + imgLink + ') no-repeat center center; min-height: ' + height + 'px; min-width: ' + width + 'px; height: 100%;"></div><div style="position: fixed; bottom: 5px; right: 7px; background-color: #262626; border-radius: 5px; padding: 2px 6px 3px; color: white; opacity: 0.8; -moz-box-shadow: inset 0px 3px 5px rgba(0, 0, 0, 0.4); -webkit-box-shadow: inset 0px 3px 5px rgba(0, 0, 0, 0.4); -o-box-shadow: inset 0px 3px 5px rgba(0, 0, 0, 0.4); box-shadow: inset 0px 3px 5px rgba(0, 0, 0, 0.4); -moz-box-shadow: inset 0px 3px 5px rgba(0, 0, 0, 0.3); -webkit-box-shadow: inset 0px 3px 5px rgba(0, 0, 0, 0.3); -o-box-shadow: inset 0px 3px 5px rgba(0, 0, 0, 0.3); box-shadow: inset 0px 3px 5px rgba(0, 0, 0, 0.3);"><a href="' + imgLink + '" title="Image link" style="text-decoration: none; color: white;" target="_blank">' + imgInfo + '</a></div></body></html>'
			
			globals.CODE_url_handler(preview,null,true)
		}
		else {
			globals.DIALOGS.showErrorDialog(
					'Error',
					'There are no pages in this site.\nImage preview not available.'
				)
		}
	}
	else {
		plugins.dialogs.showErrorDialog(
				'Error',
				'WC-only'
			)
	}
}