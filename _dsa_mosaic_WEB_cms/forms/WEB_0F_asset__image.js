/**
 * @properties={typeid:35,uuid:"4FDACEFD-6F16-46F7-807B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @param	{JSRecord}	[assetGroupRecord] Record that we are working with
 * 
 * @properties={typeid:24,uuid:"C27CDF64-0B6B-4908-9DD2-52593E9A0F1D"}
 */
function ASSET_scale(assetGroupRecord) {
	var fidForm = 'WEB_0F_asset__image__P_scale'
	
	//save outstanding data and turn autosave off
	databaseManager.saveData()
	databaseManager.setAutoSave(false)
	
	//get default asset instance
	var srcAsset = assetGroupRecord.web_asset_to_asset_instance__initial.getRecord(1)
	
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
	application.showFormInDialog(
			forms[fidForm],
			-1,-1,-1,-1,
			" ", 
			false, 
			false, 
			"CMS_imageScale"
		)
	
	//FiD not cancelled, get values and create new instance
	if (databaseManager.getFoundSetDataProviderAsArray(assetGroupRecord.web_asset_to_asset_instance, 'id_asset_instance').indexOf(asset.id_asset_instance) >= 0) {
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
		forms.WEB_0F_asset_1F_2L_asset_instance.foundset.selectRecord(asset.id_asset_instance)
	}
}

/**
 * @properties={typeid:24,uuid:"B0A3FEFE-4C3A-41AC-A3FA-07B95729C710"}
 */
function FILE_import(origLocation, newLocation, newWidth, newHeight) {
	// TODO: handle reading text files //TROY NOTE: probably not here...this is only for images
	// TODO: get file from server if passed in
	
	//root directory for this site
	var baseDirectory = forms.WEB_0F_install.ACTION_get_install() +
						'/application_server/server/webapps/ROOT/sutraCMS/sites/' +
						forms.WEB_0F_site.directory + '/'
	
	// prompt for input file
	if (!origLocation) {
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
	//convert to byte array for initial import
	else {
		file = file.getBytes()
	}
	
	// TODO: stream image upload to server from client
	// TODO: if file already exists at location attempting to save into, abort
	
	//location to write to if nothing passed in
	var outputImage	=	baseDirectory + fileOBJ.directory + '/' + fileOBJ.image_name
	
	//TODO: make sure the directory requested exists; if not, create directory tree until all exist before saving file
	
	// save file
	var success = plugins.file.writeFile(plugins.file.convertToJSFile(newLocation || outputImage),file)
	
	if ( !success ) {
		return "File save error"
	}
	
	plugins.dialogs.showInfoDialog("Image",  "Image uploaded")
	
	return fileOBJ
}

/**
 * @properties={typeid:24,uuid:"17E3F2F2-151E-48BA-9E52-8C3909064EA0"}
 */
function ASSET_import(asset,fileLocation) {
	var fileOBJ = FILE_import(fileLocation)
	
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
		var assetGroupRecord = assetRecord.web_asset_instance_to_asset
		
		assetGroupRecord.asset_file_type = fileOBJ.image_type
		assetGroupRecord.asset_extension = fileOBJ.image_extension
		assetGroupRecord.asset_name = fileOBJ.image_name
		assetGroupRecord.thumbnail = fileOBJ.thumbnail
		assetRecord.asset_title = fileOBJ.image_name
		assetRecord.asset_size = fileOBJ.size
		assetRecord.asset_directory = fileOBJ.directory
		assetRecord.flag_initial = 1
		
		//create image asset meta data records
		asset.width.data_value = fileOBJ.width
		asset.height.data_value = fileOBJ.height
//		asset.thumbnail.data_value_blob	= fileOBJ.thumbnail
		
		databaseManager.saveData()
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
