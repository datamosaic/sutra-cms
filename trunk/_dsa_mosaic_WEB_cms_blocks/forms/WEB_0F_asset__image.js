/**
 *
 * @properties={typeid:24,uuid:"FFE14AC8-BECE-4D27-9AC1-0EE22A0032FF"}
 */
function BLOCK_choose()
{	//TODO: remember that the id_asset punched down is of the default
	application.showFormInDialog(
					forms.WEB_0F_asset__image__P_choose,
					-1,-1,-1,-1,
					"Image",
					false,
					false,
					"CMS_imageChoose"
				)
	
	//update display
	if (forms.WEB_0F_page.TRIGGER_mode_set() == "DESIGN") {
		forms.WEB_0F_page__design__content_1L_block.ACTION_load_gui_mode()
	}
	else {
		forms.WEB_0F_page__browser__editor.FORM_on_show()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"43C94817-C701-46EF-809A-33BE2CFC738C"}
 */
function BLOCK_scale() {
	if (utils.hasRecords(foundset)) {
		var fidForm = 'WEB_0F_asset__image__P_scale'
		
		//save outstanding data and turn autosave off
		databaseManager.saveData()
		databaseManager.setAutoSave(false)
		
		//get default asset instance
		var srcAsset = foundset.getRecord(1)
		
		//duplicate default asset
		var asset = globals.CODE_record_duplicate(srcAsset,['web_asset_to_asset_meta'],null,true)
		asset.flag_initial = 0
		
		//get meta data points we need
		var metaRows = new Object()
		for (var i = 1; i <= asset.web_asset_to_asset_meta.getSize(); i++) {
			var record = asset.web_asset_to_asset_meta.getRecord(i)
			metaRows[record.data_key] = record
		}
		
		//get block data points we need
		var dataRows = new Object()
		for (var i = 1; i <= forms.WEB_0F_page__design__content_1L_block.web_block_to_block_data.getSize(); i++) {
			var record = forms.WEB_0F_page__design__content_1L_block.web_block_to_block_data.getRecord(i)
			dataRows[record.data_key] = record
		}
		
		//pre-fill scale FiD
		forms[fidForm]._asset = asset
		forms[fidForm]._metaWidth = metaRows.width
		forms[fidForm]._metaHeight = metaRows.height
		
		forms[fidForm]._image_height_original = metaRows.height.data_value
		forms[fidForm]._image_height = dataRows.height.data_value
		
		forms[fidForm]._image_width_original = metaRows.width.data_value
		forms[fidForm]._image_width = dataRows.width.data_value
		
		forms[fidForm]._image_name = asset.asset_title
		forms[fidForm]._image_directory = asset.asset_directory
		
		//show FiD
		application.showFormInDialog(
				forms[fidForm],
				-1,-1,-1,-1,
				" ", 
				false, 
				false, 
				"CMS_imageScale"
			)
		
		//FiD not cancelled, get values and create new instance
		if (databaseManager.getFoundSetDataProviderAsArray(srcAsset.web_asset_to_asset_group.web_asset_group_to_asset, 'id_asset').indexOf(asset.id_asset) >= 0) {
			var baseDirectory = forms.WEB_0F_install.ACTION_get_install() +
								'/application_server/server/webapps/ROOT/sutraCMS/sites/' +
								forms.WEB_0F_site.directory + '/'
			var origLocation = 	baseDirectory + srcAsset.asset_directory + '/' + srcAsset.asset_title
			var newLocation = 	baseDirectory + asset.asset_directory + '/' + asset.asset_title
			
			var fileOBJ = FILE_import(origLocation, newLocation, metaRows.width.data_value, metaRows.height.data_value)
			
			//save down new information
			asset.asset_size = fileOBJ.size
			asset.asset_directory = fileOBJ.directory
			
			//update the block data
			dataRows.image_name.data_value = fileOBJ.image_name
			dataRows.directory.data_value = fileOBJ.directory
			dataRows.width.data_value = fileOBJ.width
			dataRows.height.data_value = fileOBJ.height
			
			databaseManager.saveData()
			
			//update display
			if (globals.WEB_page_mode == 2) {
				forms.WEB_0F_page__design__content_1L_block.ACTION_load_gui_mode()
			}
			else if (globals.WEB_page_mode == 3) {
				forms.WEB_0F_page__browser__editor.FORM_on_show()
			}
		}
	}
}

/**
 * @param	{JSRecord}	[assetGroupRecord] Record that we are working with
 * 
 * @properties={typeid:24,uuid:"928FC2D6-1135-4C64-B923-E2E92D7E3EBC"}
 */
function ASSET_scale(assetGroupRecord) {
	var fidForm = 'WEB_0F_asset__image__P_scale'
	
	//save outstanding data and turn autosave off
	databaseManager.saveData()
	databaseManager.setAutoSave(false)
	
	//get default asset instance
	var srcAsset = assetGroupRecord.web_asset_group_to_asset__initial.getRecord(1)
	
	//duplicate default asset
	var asset = globals.CODE_record_duplicate(srcAsset,['web_asset_to_asset_meta'],null,true)
	asset.flag_initial = 0
	
	//get meta data points we need
	var metaRows = new Object()
	for (var i = 1; i <= asset.web_asset_to_asset_meta.getSize(); i++) {
		var record = asset.web_asset_to_asset_meta.getRecord(i)
		metaRows[record.data_key] = record
	}
	
	//pre-fill scale FiD
	forms[fidForm]._asset = asset
	forms[fidForm]._metaWidth = metaRows.width
	forms[fidForm]._metaHeight = metaRows.height
	
	forms[fidForm]._image_height_original = 
	forms[fidForm]._image_height = metaRows.height.data_value
	
	forms[fidForm]._image_width_original = 
	forms[fidForm]._image_width = metaRows.width.data_value
	
	forms[fidForm]._image_name = asset.asset_title
	forms[fidForm]._image_directory = asset.asset_directory
	
	//show FiD
	application.showFormInDialog(
			forms[fidForm],
			-1,-1,-1,-1,
			" ", 
			false, 
			false, 
			"CMS_imageScale"
		)
	
	//FiD not cancelled, get values and create new instance
	if (databaseManager.getFoundSetDataProviderAsArray(assetGroupRecord.web_asset_group_to_asset, 'id_asset').indexOf(asset.id_asset) >= 0) {
		var baseDirectory = forms.WEB_0F_install.ACTION_get_install() +
							'/application_server/server/webapps/ROOT/sutraCMS/sites/' +
							forms.WEB_0F_site.directory + '/'
		var origLocation = 	baseDirectory + srcAsset.asset_directory + '/' + srcAsset.asset_title
		var newLocation = 	baseDirectory + asset.asset_directory + '/' + asset.asset_title
		
		var fileOBJ = FILE_import(origLocation, newLocation, metaRows.width.data_value, metaRows.height.data_value)
		
		//save down new information
		asset.asset_size = fileOBJ.size
		asset.asset_directory = fileOBJ.directory
		
		databaseManager.saveData()
		
		//select correct record
		forms.WEB_0F_asset_group_1F_2L_asset.foundset.selectRecord(asset.id_asset)
	}
}

/**
 *
 * @properties={typeid:24,uuid:"D5507344-C123-4997-A29D-32181865B93F"}
 */
function BLOCK_import()
{
	var fileOBJ = FILE_import()
	
	//an error in importing of file
	if (typeof fileOBJ == 'string') {
		plugins.dialogs.showErrorDialog(
					'Error',
					fileOBJ
			)
	}
	// create new asset with one file
	else {
		
		//find what type of asset this is in the system
		var fsAssetType = databaseManager.getFoundSet('sutra_cms','web_asset_type')
		fsAssetType.find()
		fsAssetType.form_name = controller.getName()
		var results = fsAssetType.search()
		
		if (!results) {
			plugins.dialogs.showErrorDialog(
					'Error',
					'The complementary asset for this block has not been registered in the sytem'
			)
			return "Asset not configured"
		}
		
		var assetGroupRecord = foundset.getRecord(foundset.newRecord(false,true))
		assetGroupRecord.id_site = forms.WEB_0F_site.id_site
		assetGroupRecord.id_asset_type = fsAssetType.id_asset_type
		
		//create asset
		var assetRecord = assetGroupRecord.web_asset_group_to_asset.getRecord(assetGroupRecord.web_asset_group_to_asset.newRecord(false,true))
		
		//add all meta data rows
		for (var i = 1; i <= assetGroupRecord.web_asset_group_to_asset_type.web_asset_type_to_asset_type_meta.getSize(); i++) {
			var templateRec = assetGroupRecord.web_asset_group_to_asset_type.web_asset_type_to_asset_type_meta.getRecord(i)
			var metaRec = assetRecord.web_asset_to_asset_meta.getRecord(assetRecord.web_asset_to_asset_meta.newRecord(false,true))
			
			databaseManager.copyMatchingColumns(templateRec,metaRec)
			
			databaseManager.saveData(metaRec)
		}
		
		//pseudo-record
		var asset = forms.WEB_0F_asset_group_1F_2L_asset.REC_on_select(assetRecord)
		
		assetGroupRecord.asset_file_type	= fileOBJ.image_type
		assetGroupRecord.asset_extension	= fileOBJ.image_extension
		assetGroupRecord.asset_group		= fileOBJ.image_name
		assetGroupRecord.thumbnail			= fileOBJ.thumbnail
		assetRecord.asset_title				= fileOBJ.image_name
		assetRecord.asset_size				= fileOBJ.size
		assetRecord.asset_directory			= fileOBJ.directory
		assetRecord.flag_initial			= 1
		
		//create image asset meta data records
		asset.width.data_value			= fileOBJ.width
		asset.height.data_value			= fileOBJ.height
//		asset.thumbnail.data_value_blob	= fileOBJ.thumbnail
		
		databaseManager.saveData()
	}
}

/**
 * @properties={typeid:24,uuid:"A71662D3-E6C1-4303-AD7D-BA3A465995EA"}
 */
function FILE_import(origLocation, newLocation, newWidth, newHeight) {
	// TODO: handle reading text files //TROY NOTE: probably not here...this is only for images
	// TODO: get file from server if passed in
	
	//root directory for this site
	var baseDirectory = forms.WEB_0F_install.ACTION_get_install() +
						'/application_server/server/webapps/ROOT/sutraCMS/sites/' +
						forms.WEB_0F_site.directory + '/'
	
	// prompt for input file
	if (!(origLocation && newLocation)) {
		var file = plugins.file.showFileOpenDialog()
		
		var ext = file.getName().split('.')
		//file has an extension
		if (ext && ext.length > 1) {
			var fileExt = ext[ext.length-1].toLowerCase()
		}
		
		if ( !file ) {
			return //"Selection cancelled"
		}
	}
	// input file specified, get it
	else {
		var file = plugins.file.convertToJSFile(origLocation)
		
		if ( !file ) {
			return //"Source file not found"
		}
		
		if (newLocation) {
			var newName = newLocation.split('/')
			newName = newName[newName.length - 1]
			
			var newDir = newLocation.substr(baseDirectory.length)
			newDir = newDir.substr(0,newDir.length - newName.length - 1)
			
			var ext = newName.split('.')
			var fileExt = ext[ext.length-1].toLowerCase()
		}
	}
	
	var imageTemp =  plugins.images.getImage(file)
	
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
	
	// save file
	// TODO: stream image upload to server from client
	// TODO: if file already exists at location attempting to save into, abort
	
	//location to write to if nothing passed in
	var outputImage	=	baseDirectory + fileOBJ.directory + '/' + fileOBJ.image_name
	
	//TODO: make sure the directory requested exists; if not, create directory tree until all exist before saving file
	
	var success = plugins.file.writeFile(plugins.file.convertToJSFile(newLocation || outputImage),file)
	
	if ( !success ) {
		return "File save error"
	}
	
	plugins.dialogs.showInfoDialog("Image",  "Image uploaded")
	
	return fileOBJ
}

/**
 * @properties={typeid:24,uuid:"F7A5F36C-526B-4922-AE88-A6251CDF39C3"}
 */
function ASSET_import(asset) {
	var fileOBJ = FILE_import()
	
	//an error in importing of file
	if (typeof fileOBJ == 'string') {
		plugins.dialogs.showErrorDialog(
					'Error',
					fileOBJ
			)
	}
	// create image asset record
	else {
		var assetRecord = asset.parentRec
		var assetGroupRecord = assetRecord.web_asset_to_asset_group
		
		assetGroupRecord.asset_file_type	= fileOBJ.image_type
		assetGroupRecord.asset_extension	= fileOBJ.image_extension
		assetGroupRecord.asset_group		= fileOBJ.image_name
		assetGroupRecord.thumbnail			= fileOBJ.thumbnail
		assetRecord.asset_title				= fileOBJ.image_name
		assetRecord.asset_size				= fileOBJ.size
		assetRecord.asset_directory			= fileOBJ.directory
		assetRecord.flag_initial			= 1
		
		//create image asset meta data records
		asset.width.data_value			= fileOBJ.width
		asset.height.data_value			= fileOBJ.height
//		asset.thumbnail.data_value_blob	= fileOBJ.thumbnail
		
		databaseManager.saveData()
	}
}

/**
 * param {} obj Data object passed to all markup methods
 * @properties={typeid:24,uuid:"5AABEBFD-5C92-42EA-9C3D-B0135AA33FC8"}
 */
function VIEW_default(obj) {
	
	// template					
	var markup = 	'<img width="<<width>>" height="<<height>>" border="0"' +
					'src="<<directory>><<image_name>>"' +
					'alt="" />'
	
	// replace
	markup = markup.replace(/<<width>>/ig, obj.data.width)
	markup = markup.replace(/<<height>>/ig, obj.data.height)
	markup = markup.replace(/<<image_name>>/ig, obj.data.image_name)
	markup = markup.replace(/<<directory>>/ig, obj.data.directory)
	
	// return
	return markup	
}

/**
 * @properties={typeid:24,uuid:"D177F9D8-57D4-4E9C-BC4B-D87BF04B1B00"}
 */
function VIEW_download() {
	
}

/**
 * @properties={typeid:24,uuid:"FFB42F41-3AB3-4F26-A006-9FDF03BE1CF7"}
 */
function VIEW_lightbox() {
	
}

/**
 *
 * @properties={typeid:24,uuid:"581D1472-7339-4669-A110-353A1904B241"}
 */
function TOGGLE_buttons(editStatus) {
	var hasData = utils.hasRecords(foundset)
	
	elements.btn_choose.enabled = editStatus
	elements.btn_import.enabled = editStatus
	elements.btn_scale.enabled = editStatus && hasData
	elements.lbl_choose.enabled = editStatus
	elements.lbl_import.enabled = editStatus
	elements.lbl_scale.enabled = editStatus && hasData
}

/**
 * @properties={typeid:24,uuid:"E9062B39-C69D-4841-A367-94BDC60849FF"}
 */
function LOADER_init(fsBlockData,flagEdit,flagScrapbook) {
	//clear foundset //handled with onShow
//	foundset.clear()
	
	//update display
	var objImage = LOADER_refresh(fsBlockData,flagEdit)
	
	//laod asset that we're working with onto this form
	controller.loadRecords(utils.stringToNumber(objImage.id_asset))
	
	//refire button state
	TOGGLE_buttons(flagEdit)
	
	//load form
	globals.WEB_block_form_loader(controller.getName(), ((flagScrapbook) ? "SCRAPBOOK: Image block" : "Image block"))
}

/**
 * @properties={typeid:24,uuid:"CA20C98A-927F-484F-960F-73E9FC28634B"}
 */
function LOADER_refresh(fsBlockData,flagEdit) {
	//create object with all properties
	var objImage = new Object()
	for (var i = 1; i <= fsBlockData.getSize(); i++) {
		var record = fsBlockData.getRecord(i)
		objImage[record.data_key] = record.data_value
	}
	
	//no image set yet
	if (!objImage.image_name){
		var html = 	'<html><head></head><body>' +
					'No image chosen yet' +
					'</body></html>'
	}
	// image is set
	else {
		//both the base and resource url methods will return with "sutraCMS/"; need to remove from one so no doubling
		var siteURL = utils.stringReplace(globals.WEB_MRKUP_link_base(forms.WEB_0F_page__design__content.id_page),'sutraCMS/','') + globals.WEB_MRKUP_link_resources(forms.WEB_0F_page__design__content.id_page)
		
		var html = 	'<html><head></head><body>' +
					'<img src="' + siteURL + 
					objImage.directory + '/' + objImage.image_name + 
					'" height="' + objImage.height + '" width="' + objImage.width +'"' + '>' +
					'</body></html>'
	}
	
	TOGGLE_buttons(flagEdit)
	elements.bn_browser.html = html	
	
	return objImage
}

/**
 * @properties={typeid:24,uuid:"5896D844-D8AA-4C31-84B2-D77EAE012F1D"}
 */
function INIT_block() {
	
	// main data object to build
	var block = {}
	
	// block record data
	block.record = {
			block_name			: 'Image',
			block_description	: 'Images resource library',		
			form_name			: 'WEB_0F_asset__image'
		}
	
	
	// block views
	block.views = globals.WEB_block_methods(controller.getName(),"VIEW")
	
	// block client actions - Block
	block.clientActionsBlock = globals.WEB_block_methods(controller.getName(),"BLOCK")
	
	// block client actions - Page
	block.clientActionsPage = globals.WEB_block_methods(controller.getName(),"PAGE")
	
	// block web actions
	block.webActions = globals.WEB_block_methods(controller.getName(),"WEB")
	
	// block data points
	block.data = {
		directory : 'TEXT',
		image_name : 'TEXT',
		height : 'INTEGER',
		width : 'INTEGER',
		id_asset : 'INTEGER'
	}
	
	// block configure data points
	block.blockConfigure = {
		
	}
	
	// block response data points
	block.blockResponse = {
		
	}
	
	return block
	
}

/**
 * @properties={typeid:24,uuid:"9F8D14EA-5B89-43EE-985B-89295B33936B"}
 */
function INIT_asset() {
	
	// main data object to build
	var asset = {}
	
	// block record data
	asset.record = {
			asset_type			: 'Image',
			asset_description	: 'Images resource library',		
			form_name			: 'WEB_0F_asset__image'
		}
	
	
	// block data points
	asset.data = {
		height : 'INTEGER',
		width : 'INTEGER'
//		thumbnail : 'MEDIA'
	}
	
	return asset
	
}

/**
 * @properties={typeid:24,uuid:"8C344BE2-23AF-477C-B545-9257A724366F"}
 */
function ASSET_actions(input,assetGroupRecord) {
	//menu items
	var valuelist = new Array(
					'Scale image'
				)
	
	//called to depress menu
	if (input instanceof JSEvent) {
		//set up menu with arguments
		var menu = new Array()
		
		for ( var i = 0 ; i < valuelist.length ; i++ ) {
			menu[i] = plugins.popupmenu.createMenuItem(valuelist[i],ASSET_actions)
			
			menu[i].setMethodArguments(i,assetGroupRecord)
			
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
			case 0:	//
				ASSET_scale(assetGroupRecord)
				break
		}
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"6DABA0D5-F686-47B6-8F76-860D5D0B0209"}
 */
function FORM_on_show(firstShow, event) {
	if (firstShow) {
		foundset.clear()
	}
}
