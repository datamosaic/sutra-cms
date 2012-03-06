/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"241F5F4F-9C73-4887-97D1-EF587A25BB99",variableType:12}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"64E46BDA-8C6B-4C47-9572-5AC39F6670CB",variableType:12}
 */
var _cssClass = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4C04AB4F-6410-477C-B9EF-40AE679826D0",variableType:12}
 */
var _file = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"EA9526B7-FCE6-4996-B668-8326B81A3414",variableType:12}
 */
var _cssId = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A929CE9E-C3C1-4939-81B6-A5FE6D4B3B33",variableType:12}
 */
var _title = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F33F74AF-C42E-4C71-8B83-D673D26A06D2",variableType:12}
 */
var _tooltip = null;

/**
 * @param	{Object}	obj Data object passed to all markup methods
 * @properties={typeid:24,uuid:"5E918192-4261-441C-87BD-AF0A513D9CBC"}
 */
function VIEW_default(obj, results) {
	
	var data = obj.block_data
	var dataConfig = obj.block_configure
	
	// template					
	var template = '<a '
		if (dataConfig.cssId) {
			template += 'id="{{id}}" '
		}
		if (dataConfig.cssClass) {
			template += 'class="{{class}}" '
		}
		if (data.tooltip) {
			template += 'title="{{tooltip}}" '
		}
	template += 'href="{{directory}}/{{file_name}}">'
	template += '{{title}}'
	template += '</a>'
	
	// replace
	var html = template.replace(/\t/g, '')
	html = utils.stringReplace(html, "{{id}}", data.cssId)
	html = utils.stringReplace(html, "{{class}}", data.cssClass)
	html = utils.stringReplace(html, "{{tooltip}}", data.tooltip)
	html = utils.stringReplace(html, "{{directory}}", '/' + globals.WEBc_markup_link_resources(obj.page.id) + data.directory)
	html = utils.stringReplace(html, "{{file_name}}", data.file_name)
	//no title specified, use file name
	html = utils.stringReplace(html, "{{title}}", data.title || data.file_name)
	
	// return
	return html
}

/**
 * Update display as needed when block selected.
 *
 * @properties={typeid:24,uuid:"BBFD23D3-E654-470E-8240-06EAC71A5F7A"}
 * @AllowToRunInFind
 */
function INIT_data() {
	//get data
	var data = globals.CMS.ui.getData(controller.getName())
	var dataConfig = globals.CMS.ui.getConfig(controller.getName())
	
	//save down form variables
	_cssClass = dataConfig.cssClass
	_cssId = dataConfig.cssId
	_title = data.title
	_tooltip = data.tooltip
	_file = ''
	if (data.directory) {
		_file += data.directory + '/'
	}
	if (data.file_name) {
		_file += data.file_name
	}
	
	//set status of variables
	var editMode = globals.CMS.ui.getEdit()
	
	elements.var_cssId.transparent = editMode
	elements.var_cssId.editable = editMode
	elements.var_cssClass.transparent = editMode
	elements.var_cssClass.editable = editMode
	elements.var_title.transparent = editMode
	elements.var_title.editable = editMode
	elements.var_tooltip.transparent = editMode
	elements.var_tooltip.editable = editMode
	
	elements.btn_choose.enabled = editMode
	elements.btn_import.enabled = editMode
	elements.lbl_choose.enabled = editMode
	elements.lbl_import.enabled = editMode
	
	//only allow to jump to related asset if one selected and not in edit mode
	var fileFound = false
	if (data.id_asset_instance) {
		var fsAssetInstance = databaseManager.getFoundSet('sutra_cms','web_asset_instance')
		fsAssetInstance.find()
		fsAssetInstance.id_asset_instance = data.id_asset_instance
		var fileFound = fsAssetInstance.search()
	}
	elements.btn_visit.visible = !editMode && fileFound
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E78D3F8C-024C-4F3C-8E4A-CFB6EE31E3DD"}
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
 * Build a data object that defines this block. Called when creating a new block.
 * Used to create all meta data associated with this block (register a block in the CMS)
 * 
 * @returns {Object} Data object that is used to register a block
 * 
 * @properties={typeid:24,uuid:"9762873B-C7D9-4C39-BBE6-470547E1CB47"}
 */
function INIT_block() {
	
	// main data object to build
	var block = {}
	
	// block record data
	block.record = {
	        block_name			: 'File',
			block_description	: 'Downloadable file block',		
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
	
	// block data points
	block.data = {
		directory : 'TEXT',
		file_name : 'TEXT',
		title : 'TEXT',
		tooltip : 'TEXT',
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
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"F1E14AC8-BECE-4D27-9AC1-0EE22A0032FF"}
 */
function BLOCK_choose(event) {
	//only run in edit mode
	if (globals.CMS.ui.getEdit()) {
		forms.WEB_P__asset.LOAD_data(2)
		
		//show file chooser
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
			var assetRec = forms.WEB_P__asset._assetChosen.asset
			
			if (assetRec) {
				globals.CMS.ui.setData(null,'id_asset_instance',assetRec.id_asset_instance.toString(),'WEB_0F__file')
				globals.CMS.ui.setData(null,'file_name',assetRec.asset_title,'WEB_0F__file')
				globals.CMS.ui.setData(null,'directory',assetRec.asset_directory,'WEB_0F__file')
				
	//			databaseManager.saveData()
				
				INIT_data()
			}
		}
	}
}

/**
 * @param {JSEvent} event the event that triggered the action
 * 
 * @properties={typeid:24,uuid:"D1507344-C123-4997-A29D-32181865B93F"}
 */
function BLOCK_import(event) {
	//only run in edit mode
	if (globals.CMS.ui.getEdit()) {
		forms.WEB_0C__file_stream.FILE_import("files")
	}
}

/**
 * @param {JSEvent} event the event that triggered the action
 * 
 * @properties={typeid:24,uuid:"582D1472-7339-4669-A110-353A1904B241"}
 */
function TOGGLE_buttons(event) {
	var editStatus = globals.CMS.ui.getEdit()
	
	elements.btn_choose.enabled = editStatus
	elements.btn_import.enabled = editStatus
	elements.lbl_choose.enabled = editStatus
	elements.lbl_import.enabled = editStatus
}
