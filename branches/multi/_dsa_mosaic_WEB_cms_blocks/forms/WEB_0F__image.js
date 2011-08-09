/**
 * @properties={typeid:35,uuid:"4FDBCEFD-6F16-46F7-827B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"FFE14AC8-BECE-4D27-9AC1-0EE22A0032FF"}
 */
function BLOCK_choose(event) {
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
}

/**
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"43C94817-C701-46EF-809A-33BE2CFC738C"}
 */
function BLOCK_scale(event) {
	var fsAssetInstance = databaseManager.getFoundSet('sutra_cms','web_asset_instance')
	fsAssetInstance.loadRecords([application.getUUID(_imageData.id_asset_instance)])
	var recAsset = fsAssetInstance.web_asset_instance_to_asset.getRecord(1)
	
	var newAsset = forms.WEB_0F_asset__image.ASSET_scale(recAsset,true)
	
	//there is something and it's different than what was there before
	if (newAsset) {
		//get meta data points we need
		var metaRows = new Object()
		for (var j = 1; j <= newAsset.web_asset_instance_to_asset_instance_meta.getSize(); j++) {
			var record = newAsset.web_asset_instance_to_asset_instance_meta.getRecord(j)
			metaRows[record.data_key] = record
		}
		
		//the data we're working with here
		var data = globals.WEB_block_getData(event)
		
		//see INIT_block for all keys
		for (var i = 1; i <= data.getSize(); i++) {
			var record = data.getRecord(i)
			switch (record.data_key) {
				case 'height':
				case 'width':
					record.data_value = metaRows[record.data_key].data_value
					break
				case 'image_name':
					record.data_value = newAsset.asset_title
					break
				case 'directory':
					record.data_value = newAsset.asset_directory
					break
				default:
					record.data_value = newAsset[record.data_key]
			}
		}
		
		//refresh the block
		REC_on_select(event,true)
	}
}

/**
 * @param {JSEvent} event the event that triggered the action
 * 
 * @properties={typeid:24,uuid:"D5507344-C123-4997-A29D-32181865B93F"}
 */
function BLOCK_import(event) {
	
	forms.WEB_0C__file_stream.IMAGE_import("images")
	
	application.output('2')
	
}

/**
 * param {} obj Data object passed to all markup methods
 * @properties={typeid:24,uuid:"5AABEBFD-5C92-42EA-9C3D-B0135AA33FC8"}
 */
function VIEW_default(obj) {
	
	// template					
	var markup = 	'<img width="<<width>>" height="<<height>>" border="0" ' +
					'src="<<directory>>/<<image_name>>" ' +
					'alt="" />'
	
	// replace
	markup = markup.replace(/<<width>>/ig, obj.data.width)
	markup = markup.replace(/<<height>>/ig, obj.data.height)
	markup = markup.replace(/<<image_name>>/ig, obj.data.image_name)
	markup = markup.replace(/<<directory>>/ig, '/' + globals.WEB_MRKUP_link_resources(obj.page.id) + obj.data.directory)
	
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
 * @param {JSEvent} event the event that triggered the action
 * 
 * @properties={typeid:24,uuid:"581D1472-7339-4669-A110-353A1904B241"}
 */
function TOGGLE_buttons(event) {
	var editStatus = globals.WEB_block_edit_get()
	
	var hasData = _imageData.id_asset_instance ? true : false
	
	elements.btn_choose.enabled = editStatus
	elements.btn_import.enabled = editStatus
	elements.btn_scale.enabled = editStatus && hasData
	elements.lbl_choose.enabled = editStatus
	elements.lbl_import.enabled = editStatus
	elements.lbl_scale.enabled = editStatus && hasData
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
	
}

/**
 * @properties={typeid:35,uuid:"17B73F45-DF8E-47BD-9B5B-914A05F52899",variableType:-4}
 */
var _imageData = null;

/**
 * Update display as needed when block selected.
 *
 * @param 	{JSEvent}	event The event that triggered the action.
 * @param	{Boolean}	[alwaysRun] Force the on select method to refire.
 * 
 * @properties={typeid:24,uuid:"9E7A1253-45B6-4996-AEDE-56585F0B8394"}
 */
function REC_on_select(event,alwaysRun) {
	//run on select only when it is 'enabled'
	if (alwaysRun || globals.WEB_block_enable(event)) {
		//create object with all properties
		_imageData = new Object()

		var fsBlockData = globals.WEB_block_getData(event)
		
		for (var i = 1; i <= fsBlockData.getSize(); i++) {
			var record = fsBlockData.getRecord(i)
			_imageData[record.data_key] = record.data_value
		}
		
		//no image set yet
		if (!_imageData.image_name){
			var html = 	'<html><head></head><body>' +
						'No image chosen yet' +
						'</body></html>'
		}
		// image is set
		else {
			//both the base and resource url methods will return with "sutraCMS/"; need to remove from one so no doubling
			var siteURL = utils.stringReplace(globals.WEB_MRKUP_link_base(forms.WEB_0F_page__design.id_page),'sutraCMS/','') + globals.WEB_MRKUP_link_resources(forms.WEB_0F_page__design.id_page)
			
			var html = 	'<html><head></head><body>' +
						'<img src="' + siteURL + 
						_imageData.directory + '/' + _imageData.image_name + 
						'" height="' + _imageData.height + '" width="' + _imageData.width +'"' + '>' +
						'</body></html>'
		}
		
		TOGGLE_buttons()
		if (elements.bn_browser) {
			elements.bn_browser.html = html
		}
		else {
			globals.WEB_browser_error()
		}
	}
}
