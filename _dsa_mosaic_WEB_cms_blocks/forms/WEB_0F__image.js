/**
 * @properties={typeid:35,uuid:"4FDBCEFD-6F16-46F7-827B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"FFE14AC8-BECE-4D27-9AC1-0EE22A0032FF"}
 */
function BLOCK_choose() {
	//show image chooser
	application.showFormInDialog(
					forms.WEB_0F__image__P_choose,
					-1,-1,-1,-1,
					" ",
					true,
					false,
					"CMS_imageChoose"
				)
	
	//save down of what chosen happen in forms.WEB_0F__image__P_choose.ACTION_ok
	
	//update display
	globals.WEB_block_form_refresh()
}

/**
 *
 * @properties={typeid:24,uuid:"43C94817-C701-46EF-809A-33BE2CFC738C"}
 */
function BLOCK_scale() {
	var fileOBJ = forms.WEB_0F_asset__image.ASSET_scale(foundset.getRecord(1))
	
	//the image was scaled
	if (fileOBJ) {
		//get block data points we need
		var dataRows = new Object()
		for (var i = 1; i <= forms.WEB_0F_page__design__content_1L_block.web_block_to_block_data.getSize(); i++) {
			var record = forms.WEB_0F_page__design__content_1L_block.web_block_to_block_data.getRecord(i)
			dataRows[record.data_key] = record
		}
	
		//update the block data
		dataRows.image_name.data_value = fileOBJ.image_name
		dataRows.directory.data_value = fileOBJ.directory
		dataRows.width.data_value = fileOBJ.width
		dataRows.height.data_value = fileOBJ.height
		
		databaseManager.saveData()
			
		//update display
		globals.WEB_block_form_refresh()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"D5507344-C123-4997-A29D-32181865B93F"}
 */
function BLOCK_import() {
	
	forms.WEB_0C__file_stream.IMAGE_import("images")
	return
	
	var file = plugins.file.showFileOpenDialog()
	
	// create new asset with one file
	if (file) {
		var fsAsset = databaseManager.getFoundSet('sutra_cms','web_asset')
		var assetRec = fsAsset.getRecord(fsAsset.newRecord(false,true))
		assetRec.id_site = forms.WEB_0F_site.id_site
		assetRec.asset_type = 1
		
		//create asset
		var assetInstanceRec = assetRec.web_asset_to_asset_instance.getRecord(assetRec.web_asset_to_asset_instance.newRecord(false,true))
		
		//get template for this type of asset
		var template = forms.WEB_0F_asset.MAP_asset(assetRec.asset_type)
		
		//add all meta data rows
		for (var i in template.meta) {
			var metaRec = assetInstanceRec.web_asset_instance_to_asset_instance_meta.getRecord(assetInstanceRec.web_asset_instance_to_asset_instance_meta.newRecord(false,true))
			
			metaRec.data_key = i
			metaRec.data_type = template.meta[i]
			
			databaseManager.saveData(metaRec)
		}
		
		//pseudo-record
		var asset = forms.WEB_0F_asset_1F_2L_asset_instance.REC_on_select(assetInstanceRec)
		
		forms.WEB_0F_asset__image.ASSET_import(asset,file.getAbsolutePath())
		
		//select the file just imported
		
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
function LOADER_init(fsBlockData,flagEdit,flagScrapbook,contextForm) {
	//clear foundset //handled with onShow
//	foundset.clear()
	
	//update display
	var objImage = LOADER_refresh(fsBlockData,flagEdit,flagScrapbook)
	
	//laod asset that we're working with onto this form
	controller.loadRecords(utils.stringToNumber(objImage.id_asset_instance))
	
	//refire button state
	TOGGLE_buttons(flagEdit)
	
	//load form
	globals.WEB_block_form_loader(controller.getName(), ((flagScrapbook) ? "SCRAPBOOK: Image block" : "Image block"), null, contextForm)
}

/**
 * @properties={typeid:24,uuid:"CA20C98A-927F-484F-960F-73E9FC28634B"}
 */
function LOADER_refresh(fsBlockData,flagEdit,flagScrapbook) {
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
	
	//hack to get scrapbook to display
	if (flagScrapbook && application.__parent__.solutionPrefs) {
		forms.WEB_0F_page._hackNoFire = true
		forms.WEB_0F__content_view.controller.show()
		forms.DATASUTRA_0F_solution.controller.show()
		//this needs to be long enough for it to finish rendering
		application.updateUI(1000)
		forms.WEB_0F_page._hackNoFire = false
		
		//reset the window's title
		forms.DATASUTRA_0F_solution.elements.fld_trigger_name.requestFocus(true)
	}
	
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
			form_name			: 'WEB_0F__image'
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
		id_asset_instance : 'INTEGER'
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