/**
 *
 * @properties={typeid:24,uuid:"FFE14AC8-BECE-4D27-9AC1-0EE22A0032FF"}
 */
function BLOCK_choose()
{
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
		forms.WEB_0F_page__design__content_1L_block.ACTION_set_simple_display()
	}
	else {
		forms.WEB_0F_page__browser__editor.FORM_on_show()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"43C94817-C701-46EF-809A-33BE2CFC738C"}
 */
function BLOCK_scale()
{
	application.showFormInDialog(
					forms.WEB_0F_asset__image__P_scale,
					-1,-1,-1,-1,
					"Image", 
					false, 
					false, 
					"CMS_imageScale"
				)
	
	//update display
	if (forms.WEB_0F_page.TRIGGER_mode_set() == "DESIGN") {
		forms.WEB_0F_page__design__content_1L_block.ACTION_set_simple_display()
	}
	else {
		forms.WEB_0F_page__browser__editor.FORM_on_show()
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
function FILE_import() {
	// TODO: handle reading text files
	
	// input file	  
	var file = plugins.file.showFileOpenDialog()
	if ( !file ) {
		return //"Selection cancelled"
	}
	
	var imageTemp =  plugins.images.getImage(file)
	
	var ext = file.getName().split('.')
	//file has an extension
	if (ext && ext.length > 1) {
		var fileExt = ext[ext.length-1].toLowerCase()
	}
	
	// set image details object
	var fileOBJ = {}
	fileOBJ.image_name	= file.getName().replace(/ /g, "_")
	fileOBJ.image_type	= file.getContentType()
	fileOBJ.image_extension	= fileExt
	fileOBJ.width		= imageTemp.getWidth()
	fileOBJ.height		= imageTemp.getHeight()
	fileOBJ.width_original		= imageTemp.getWidth()
	fileOBJ.height_original		= imageTemp.getHeight()
	fileOBJ.directory	= "images/"	//TODO: this will need to be customized significantly
	fileOBJ.rec_created = new Date()
	fileOBJ.thumbnail	= imageTemp.resize((200*fileOBJ.width) / fileOBJ.height, 200)
	fileOBJ.size		= plugins.file.getFileSize(file)
	
	
	// save file
	// TODO: stream image upload to server from client
	
	var outputImage			= forms.WEB_0F_install.ACTION_get_install() +
							'/application_server/server/webapps/ROOT/sutraCMS/sites/' +
							forms.WEB_0F_site.directory + '/' + fileOBJ.directory + fileOBJ.image_name
				
	if (forms.WEB_0F_install.ACTION_get_server() == "Windows"){
		outputImage	= outputImage.replace(/\//g, "\\")
	}
	
	//TODO: make sure the directory requested exists; if not, create directory tree until all exist before saving file
	
	var success = plugins.file.copyFile(file, outputImage)
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
	markup = markup.replace(/<<id_block>>/ig, obj.block.id)
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
	elements.btn_choose.enabled = editStatus
	elements.btn_import.enabled = editStatus
	elements.btn_scale.enabled = editStatus
	elements.lbl_choose.enabled = editStatus
	elements.lbl_import.enabled = editStatus
	elements.lbl_scale.enabled = editStatus
}

/**
 * @properties={typeid:24,uuid:"E9062B39-C69D-4841-A367-94BDC60849FF"}
 */
function LOADER_init(recBlock,flagEdit) {
	//foundset with image datapoints
	if (utils.hasRecords(recBlock.web_block_to_scrapbook)) {
		var fsBlockData = recBlock.web_block_to_scrapbook.web_scrapbook_to_scrapbook_data
	}
	else {
		var fsBlockData = recBlock.web_block_to_block_data
	}
	
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
		var siteURL = recBlock.web_block_to_area.web_area_to_version.web_version_to_page.web_page_to_site.url
		
		if (siteURL) {
			siteURL = 'http://' + siteURL
			
			var port = application.getServerURL()
			port = port.split(':')
			if (port.length > 2) {
				siteURL += ':' + port[2]
			}
		}
		else {
			var siteDirectory = recBlock.web_block_to_area.web_area_to_version.web_version_to_page.web_page_to_site.directory
			
			siteURL = application.getServerURL() + '/' + siteDirectory
		}
		
		var html = 	'<html><head></head><body>' +
					'<img src="' + siteURL + '/' + 
					objImage.directory + '/' + objImage.image_name + 
					'" height="' + objImage.height + '" width="' + objImage.width +'"' + '>' +
					'</body></html>'
	}
	
	forms.WEB_0F_asset__image.elements.bn_browser.html = html
	forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.removeTabAt(2)
	forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.addTab(forms.WEB_0F_asset__image)
	forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.tabIndex = 2
	
	forms.WEB_0F_asset__image.TOGGLE_buttons(flagEdit)
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
		image_name : 'TEXT',
		image_extension : 'TEXT',
		height : 'INTEGER',
		width : 'INTEGER',
		directory : 'TEXT',
		height_original : 'INTEGER',
		width_original : 'INTEGER'
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
