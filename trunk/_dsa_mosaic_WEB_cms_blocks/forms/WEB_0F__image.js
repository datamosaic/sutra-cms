/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4FDBCEFD-6F16-46F7-827B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"7EC90C89-6147-49DD-82A6-A41A364B4D2D"}
 */
var _cssClass = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"98B1121B-AEE0-4845-91FE-31514646D9DC"}
 */
var _title = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"86A68FF7-1ACC-42C6-A601-64396E8EE603"}
 */
var _cssId = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1C693A02-303B-4BB0-96CB-9F8C7865CC0A"}
 */
var _alt = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C12AC761-67DE-4861-BBB0-F32EDC4C852E"}
 */
var _file = null;

/**
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"FFE14AC8-BECE-4D27-9AC1-0EE22A0032FF"}
 */
function BLOCK_choose(event) {
	//only run in edit mode
	if (globals.CMS.ui.getEdit()) {
		forms.WEB_P__asset.LOAD_data('1||3')
		
		//show image chooser
		globals.CODE_form_in_dialog(
						forms.WEB_P__asset,
						-1,-1,-1,-1,
						" ",
						true,
						false,
						"CMS_assetChoose"
					)
		
		//start a continuation in wc
		scopes.DS.continuation.start(null,'WEB_P__asset')
		
		//something chosen, choose the image
		if (forms.WEB_P__asset._assetChosen) {
			var metaRows = forms.WEB_P__asset._assetChosen.meta
			var assetRec = forms.WEB_P__asset._assetChosen.asset
			
			if (metaRows && assetRec) {
				var data = globals.CMS.ui.getData(controller.getName())
					
				//see INIT_block for all keys
				for (var i in data) {
					switch (i) {
						case 'height':
						case 'width':
							globals.CMS.ui.setData(null,i,metaRows[i],controller.getName())
							break
						case 'image_name':
							globals.CMS.ui.setData(null,i,assetRec.asset_title,controller.getName())
							break
						case 'directory':
							globals.CMS.ui.setData(null,i,assetRec.asset_directory,controller.getName())
							break
						default:
							globals.CMS.ui.setData(null,i,assetRec[i],controller.getName())
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
	if (globals.CMS.ui.getEdit()) {
		/** @type {JSFoundSet<db:/sutra_cms/web_asset_instance>} */
		var fsAssetInstance = databaseManager.getFoundSet('sutra_cms','web_asset_instance')
		fsAssetInstance.loadRecords(application.getUUID(globals.CMS.ui.getData(controller.getName()).id_asset_instance))
		var recAsset = fsAssetInstance.web_asset_instance_to_asset.getRecord(1)
		
		/** @type {JSRecord<db:/sutra_cms/web_asset_instance>} */
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
			var data = globals.CMS.ui.getData(controller.getName())
			
			//see INIT_block for all keys
			for (var i in data) {
				switch (i) {
					case 'height':
					case 'width':
						globals.CMS.ui.setData(null,i,metaRows[i],controller.getName())
						break
					case 'image_name':
						globals.CMS.ui.setData(null,i,newAsset.asset_title,controller.getName())
						break
					case 'directory':
						globals.CMS.ui.setData(null,i,newAsset.asset_directory,controller.getName())
						break
					default:
						globals.CMS.ui.setData(null,i,newAsset[i],controller.getName())
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
	if (globals.CMS.ui.getEdit()) {
		forms.WEB_0C__file_stream.IMAGE_import("images")
	}
}

/**
 * @param {scopes.CMS._constant.objData} obj Data object passed to all markup methods
 * 
 * @return {String} markup for this block
 * 
 * @properties={typeid:24,uuid:"5AABEBFD-5C92-42EA-9C3D-B0135AA33FC8"}
 */
function VIEW_default(obj) {
	
	var data = obj.block_data
	var dataConfig = obj.block_configure
	
	// template					
	var markup = 	'<img '
		if (dataConfig.cssId) {
			markup += 'id="{{id}}" '
		}
		if (dataConfig.cssClass) {
			markup += 'class="{{class}}" '
		}
		if (data.title) {
			markup += 'title="{{title}}" '
		}
		if (data.alt) {
			markup += 'alt="{{alt}}" '
		}
	markup += 		'width="{{width}}" height="{{height}}" border="0" ' +
					'src="{{directory}}/{{image_name}}" />'
	
	// replace
	markup = markup.replace(/{{width}}/ig, data.width)
	markup = markup.replace(/{{height}}/ig, data.height)
	markup = markup.replace(/{{image_name}}/ig, data.image_name)
	markup = markup.replace(/{{directory}}/ig, '/' + globals.WEBc_markup_link_resources(obj.page.id) + data.directory)
	markup = markup.replace(/{{title}}/ig, data.title)
	markup = markup.replace(/{{alt}}/ig, data.alt)
	markup = markup.replace(/{{id}}/ig, dataConfig.cssId)
	markup = markup.replace(/{{class}}/ig, dataConfig.cssClass)
	
	// return
	return markup
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E78D3F8A-024C-4F3C-8E4A-CFB6EE31E3DD"}
 * @AllowToRunInFind
 */
function GOTO_asset(event) {
	var pk = globals.CMS.ui.getData(controller.getName()).id_asset_instance
	
	if (pk) {
		var fsAssetInstance = databaseManager.getFoundSet('sutra_cms','web_asset_instance')
		fsAssetInstance.find()
		fsAssetInstance.id_asset_instance = pk
		var results = fsAssetInstance.search()
		
		if (results) {
			//not running in data sutra application framework, just show form
			if (globals.WEBc_sutra_trigger('TRIGGER_navigation_set',['CMS_asset',true,[fsAssetInstance.id_asset]]) == 'noSutra') {
				forms.WEB_0F_asset.controller.show()
				forms.WEB_0F_asset.controller.loadRecords(fsAssetInstance.id_asset)
			}
			
			forms.WEB_0F_asset_1F_2L_asset_instance.foundset.selectRecord(application.getUUID(pk))
		}
	}
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
 * @param {JSEvent} [event] the event that triggered the action
 * 
 * @properties={typeid:24,uuid:"581D1472-7339-4669-A110-353A1904B241"}
 * @AllowToRunInFind
 */
function TOGGLE_buttons(event) {
	var editStatus = globals.CMS.ui.getEdit()
	var data = globals.CMS.ui.getData(controller.getName())
	var hasData = data.id_asset_instance ? true : false
	
	globals.CMSb.propCheck(elements.var_cssId,'transparent',editStatus)
	globals.CMSb.propCheck(elements.var_cssId,'editable',editStatus)
	globals.CMSb.propCheck(elements.var_cssClass,'transparent',editStatus)
	globals.CMSb.propCheck(elements.var_cssClass,'editable',editStatus)
	globals.CMSb.propCheck(elements.var_title,'transparent',editStatus)
	globals.CMSb.propCheck(elements.var_title,'editable',editStatus)
	globals.CMSb.propCheck(elements.var_alt,'transparent',editStatus)
	globals.CMSb.propCheck(elements.var_alt,'editable',editStatus)
	
	globals.CMSb.propCheck(elements.btn_choose,'enabled',editStatus)
	globals.CMSb.propCheck(elements.btn_import,'enabled',editStatus)
	globals.CMSb.propCheck(elements.btn_scale,'enabled',editStatus && hasData)
	globals.CMSb.propCheck(elements.lbl_choose,'enabled',editStatus)
	globals.CMSb.propCheck(elements.lbl_import,'enabled',editStatus)
	globals.CMSb.propCheck(elements.lbl_scale,'enabled',editStatus && hasData)
	
	//only allow to jump to related asset if one selected and not in edit mode
	var fileFound = false
	if (hasData) {
		var fsAssetInstance = databaseManager.getFoundSet('sutra_cms','web_asset_instance')
		fsAssetInstance.find()
		fsAssetInstance.id_asset_instance = data.id_asset_instance
		fileFound = fsAssetInstance.search()
	}
	globals.CMSb.propCheck(elements.btn_visit,'visible',!editStatus && fileFound)
}

/**
 * Build a data object that defines this block. Called when creating a new block.
 * Used to create all meta data associated with this block (register a block in the CMS)
 * 
 * @returns {scopes.CMS._constant.blockInit} Data object that is used to register a block
 * 
 * @author &copy; Data Mosaic
 * 
 * @properties={typeid:24,uuid:"5896D844-D8AA-4C31-84B2-D77EAE012F1D"}
 */
function INIT_block() {
	
	// main data object to build
	/** @type {scopes.CMS._constant.blockInit} */
	var block = {}
	
	// block record data
	block.record = {
			block_name			: 'Image',
			block_description	: 'Images resource library',
			block_category		: scopes.CMS._constant.blockCategory.CONTENT,
			block_type			: scopes.CMS._constant.blockType.DESIGNTIME,
			form_name			: controller.getName()
		}
	
	
	// block views
	block.views = globals.WEBc_block_type_getMethods(controller.getName(),"VIEW")
	
	// block client actions - Block
	block.clientActionsBlock = globals.WEBc_block_type_getMethods(controller.getName(),"BLOCK")
	
	// block client actions - Page
	block.clientActionsPage = globals.WEBc_block_type_getMethods(controller.getName(),"PAGE")
	
	// block web actions
	block.webActions = globals.WEBc_block_type_getMethods(controller.getName(),"WEB")
	
	//MEMO: everything in block.data so don't need to refactor old stuff
	
	// block data points
	block.data = {
		directory : 'TEXT',
		image_name : 'TEXT',
		height : 'INTEGER',
		width : 'INTEGER',
		title : 'TEXT',
		alt : 'TEXT',
		id_asset_instance : 'TEXT'
	}
	
	// block configure data points
	block.blockConfigure = {
		cssId : 'TEXT',
		cssClass : 'TEXT'
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
	var data = globals.CMS.ui.getData(controller.getName())
	var dataConfig = globals.CMS.ui.getConfig(controller.getName())
	var htmlData = ''
		
	//no image set yet
	if (!data.image_name) {
		htmlData = 'No image chosen yet'
		var html = 	'<html><head></head><body>' +
					htmlData +
					'</body></html>'
	}
	// image is set
	else {
		//both the base and resource url methods will return with "sutraCMS/"; need to remove from one so no doubling
		var siteURL = utils.stringReplace(globals.WEBc_markup_link_base(forms.WEB_0F_page.id_page),'sutraCMS/','') + globals.WEBc_markup_link_resources(forms.WEB_0F_page.id_page)
		htmlData = '<img src="' + siteURL + 
					data.directory + '/' + data.image_name + 
					'" height="' + data.height + '" width="' + data.width +'"' + '>'
		html = 	'<html><head></head><body>' +
					 + htmlData +
					'</body></html>'
	}
	
	TOGGLE_buttons()
	
	//save down form variables
	_cssClass = dataConfig.cssClass
	_cssId = dataConfig.cssId
	_title = data.title
	_alt = data.alt
	_file = ''
	if (data.directory) {
		_file += data.directory + '/'
	}
	if (data.image_name) {
		_file += data.image_name
	}
	
	if (application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
		globals.WEBb_block_preview(elements.lbl_view,htmlData)
	}
	else if (elements.bn_browser) {
		elements.bn_browser.html = html
	}
	else {
		globals.WEBc_browser_error()
	}
}
