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
	//only run in edit mode
	if (globals.WEBc_block_getEdit()) {
		forms.WEB_P__asset.LOAD_data(1)
		
		//show image chooser
		application.showFormInDialog(
						forms.WEB_P__asset,
						-1,-1,-1,-1,
						" ",
						true,
						false,
						"CMS_assetChoose"
					)
		
		//something chosen, choose the image
		if (forms.WEB_P__asset._assetChosen) {
			var metaRows = forms.WEB_P__asset._assetChosen.meta
			var assetRec = forms.WEB_P__asset._assetChosen.asset
			
			if (metaRows && assetRec) {
				var data = globals.WEBc_block_getData('WEB_0F__image')
					
				//see INIT_block for all keys
				for (var i in data) {
					switch (i) {
						case 'height':
						case 'width':
							globals.WEBc_block_setData(null,i,metaRows[i],'WEB_0F__image')
							break
						case 'image_name':
							globals.WEBc_block_setData(null,i,assetRec.asset_title,'WEB_0F__image')
							break
						case 'directory':
							globals.WEBc_block_setData(null,i,assetRec.asset_directory,'WEB_0F__image')
							break
						default:
							globals.WEBc_block_setData(null,i,assetRec[i],'WEB_0F__image')
					}
				}
				
				//this should be removed; but without it, the image won't show up until exiting edit mode
				databaseManager.saveData()
				
				INIT_data()
			}
		}
	}
}

/**
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"43C94817-C701-46EF-809A-33BE2CFC738C"}
 */
function BLOCK_scale(event) {
	//only run in edit mode
	if (globals.WEBc_block_getEdit()) {
		var fsAssetInstance = databaseManager.getFoundSet('sutra_cms','web_asset_instance')
		fsAssetInstance.loadRecords([application.getUUID(globals.WEBc_block_getData(event).id_asset_instance)])
		var recAsset = fsAssetInstance.web_asset_instance_to_asset.getRecord(1)
		
		var newAsset = forms.WEB_0F_asset__image.ASSET_scale(recAsset,true)
		
		//there is something and it's different than what was there before
		if (newAsset) {
			//get meta data points we need
			var metaRows = new Object()
			for (var j = 1; j <= newAsset.web_asset_instance_to_asset_instance_meta.getSize(); j++) {
				var record = newAsset.web_asset_instance_to_asset_instance_meta.getRecord(j)
				metaRows[record.data_key] = record.data_value
			}
			
			//the data we're working with here
			var data = globals.WEBc_block_getData('WEB_0F__image')
			
			//see INIT_block for all keys
			for (var i in data) {
				switch (i) {
					case 'height':
					case 'width':
						globals.WEBc_block_setData(null,i,metaRows[i],'WEB_0F__image')
						break
					case 'image_name':
						globals.WEBc_block_setData(null,i,newAsset.asset_title,'WEB_0F__image')
						break
					case 'directory':
						globals.WEBc_block_setData(null,i,newAsset.asset_directory,'WEB_0F__image')
						break
					default:
						globals.WEBc_block_setData(null,i,newAsset[i],'WEB_0F__image')
				}
			}
			
			//refresh the block
			INIT_data()
		}
	}
}

/**
 * @param {JSEvent} event the event that triggered the action
 * 
 * @properties={typeid:24,uuid:"D5507344-C123-4997-A29D-32181865B93F"}
 */
function BLOCK_import(event) {
	//only run in edit mode
	if (globals.WEBc_block_getEdit()) {
		forms.WEB_0C__file_stream.IMAGE_import("images")
	}
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
	markup = markup.replace(/<<directory>>/ig, '/' + globals.WEBc_markup_link_resources(obj.page.id) + obj.data.directory)
	
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
	var editStatus = globals.WEBc_block_getEdit()
	
	var hasData = globals.WEBc_block_getData(event).id_asset_instance ? true : false
	
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
	block.views = globals.WEBc_block_type_getMethods(controller.getName(),"VIEW")
	
	// block client actions - Block
	block.clientActionsBlock = globals.WEBc_block_type_getMethods(controller.getName(),"BLOCK")
	
	// block client actions - Page
	block.clientActionsPage = globals.WEBc_block_type_getMethods(controller.getName(),"PAGE")
	
	// block web actions
	block.webActions = globals.WEBc_block_type_getMethods(controller.getName(),"WEB")
	
	// block data points
	block.data = {
		directory : 'TEXT',
		image_name : 'TEXT',
		height : 'INTEGER',
		width : 'INTEGER',
		id_asset_instance : 'TEXT'
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
 * Update display as needed when block selected.
 * 
 * @properties={typeid:24,uuid:"9E7A1253-45B6-4996-AEDE-56585F0B8394"}
 */
function INIT_data() {
	var data = globals.WEBc_block_getData(controller.getName())
	
	//no image set yet
	if (!data.image_name){
		var html = 	'<html><head></head><body>' +
					'No image chosen yet' +
					'</body></html>'
	}
	// image is set
	else {
		//both the base and resource url methods will return with "sutraCMS/"; need to remove from one so no doubling
		var siteURL = utils.stringReplace(globals.WEBc_markup_link_base(forms.WEB_0F_page.id_page),'sutraCMS/','') + globals.WEBc_markup_link_resources(forms.WEB_0F_page.id_page)
		
		var html = 	'<html><head></head><body>' +
					'<img src="' + siteURL + 
					data.directory + '/' + data.image_name + 
					'" height="' + data.height + '" width="' + data.width +'"' + '>' +
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
