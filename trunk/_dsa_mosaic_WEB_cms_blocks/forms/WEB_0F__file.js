/**
 * @properties={typeid:35,uuid:"241F5F4F-9C73-4887-97D1-EF587A25BB99"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"64E46BDA-8C6B-4C47-9572-5AC39F6670CB"}
 */
var _cssClass = null;

/**
 * @properties={typeid:35,uuid:"4C04AB4F-6410-477C-B9EF-40AE679826D0"}
 */
var _file = null;

/**
 * @properties={typeid:35,uuid:"EA9526B7-FCE6-4996-B668-8326B81A3414"}
 */
var _cssId = null;

/**
 * @properties={typeid:35,uuid:"A929CE9E-C3C1-4939-81B6-A5FE6D4B3B33"}
 */
var _title = null;

/**
 * @properties={typeid:35,uuid:"F33F74AF-C42E-4C71-8B83-D673D26A06D2"}
 */
var _tooltip = null;

/**
 * @param	{Object}	obj Data object passed to all markup methods
 * @properties={typeid:24,uuid:"5E918192-4261-441C-87BD-AF0A513D9CBC"}
 */
function VIEW_default(obj, results) {
	
	//create mapping to be used
	var data = obj.data
	
	// template					
	var template = '<a '
		if (data.cssId) {
			template += 'id="{{id}}" '
		}
		if (data.cssClass) {
			template += 'class="{{class}}" '
		}
		if (data.tooltip) {
			template += 'title="{{tooltip}}" '
		}
	template += 'href="{DS:FILE_{{id_asset_instance}}}">'
	template += '{{title}}'
	template += '</a>'
	
	//no title specified, use file name
	if (!data.title) {
		var fsAssetInstance = databaseManager.getFoundSet('sutra_cms','web_asset_instance')
		fsAssetInstance.find()
		fsAssetInstance.id_asset_instance = data.id_asset_instance
		var results = fsAssetInstance.search()
		
		var fileName = ''
		
		if (results) {
			var fileName = fsAssetInstance.asset_title
		}
	}
	
	// replace
	var html = template.replace(/\t/g, '')
	html = utils.stringReplace(html, "{{id}}", data.cssId)
	html = utils.stringReplace(html, "{{class}}", data.cssClass)
	html = utils.stringReplace(html, "{{tooltip}}", data.tooltip)
	html = utils.stringReplace(html, "{{id_asset_instance}}", data.id_asset_instance)
	html = utils.stringReplace(html, "{{title}}", data.title || fileName)
	
	// return
	return html
}

/**
 * Update display as needed when block selected.
 *
 * @properties={typeid:24,uuid:"BBFD23D3-E654-470E-8240-06EAC71A5F7A"}
 */
function INIT_data() {
	//get data
	var data = globals.WEBc_block_getData(controller.getName())
	
	//save down form variables
	for (var i in data) {
		switch (i) {
			case 'cssClass':
				_cssClass = data[i]
				break
			case 'cssId':
				_cssId = data[i]
				break
			case 'title':
				_title = data[i]
				break
			case 'tooltip':
				_tooltip = data[i]
				break
			case 'id_asset_instance':
				var fileFound = false
				
				if (data[i]) {
					var fsAssetInstance = databaseManager.getFoundSet('sutra_cms','web_asset_instance')
					fsAssetInstance.find()
					fsAssetInstance.id_asset_instance = data[i]
					var fileFound = fsAssetInstance.search()
				}
				
				_file = (fileFound) ? fsAssetInstance.asset_title : ''
				break
		}
	}
	
	//set status of variables
	var editMode = globals.WEBc_block_getEdit()
	
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
	elements.btn_visit.visible = !editMode && fileFound
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E78D3F8C-024C-4F3C-8E4A-CFB6EE31E3DD"}
 */
function GOTO_asset(event) {
	var pk = globals.WEBc_block_getData(controller.getName()).id_asset_instance
	
	if (pk) {
		var fsAssetInstance = databaseManager.getFoundSet('sutra_cms','web_asset_instance')
		fsAssetInstance.find()
		fsAssetInstance.id_asset_instance = pk
		var results = fsAssetInstance.search()
		
		if (results) {
			globals.TRIGGER_navigation_set('CMS_asset',true,[fsAssetInstance.id_asset])
			
			forms.WEB_0F_asset_1F_2L_asset_instance.foundset.selectRecord(application.getUUID(pk))
		}
	}
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"1F9B9D43-3D26-4D27-A28A-BD00655990A6"}
 */
function FLD_data_change(oldValue, newValue, event) {
	var key = event.getElementName().split('_')[1]
	
	globals.WEBc_block_setData(event,key,newValue)
}

/**
 * Build a data object that defines this block. Called when creating a new block.
 * Used to create all meta data associated with this block (register a block in the CMS)
 * 
 * @returns Data object that is used to register a block
 * @type object
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
		title : 'TEXT',
		tooltip : 'TEXT',
		cssId : 'TEXT',
		cssClass : 'TEXT',
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
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"F1E14AC8-BECE-4D27-9AC1-0EE22A0032FF"}
 */
function BLOCK_choose(event) {
	//only run in edit mode
	if (globals.WEBc_block_getEdit()) {
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
				globals.WEBc_block_setData(null,'id_asset_instance',assetRec.id_asset_instance.toString(),'WEB_0F__file')
			
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
	if (globals.WEBc_block_getEdit()) {
		forms.WEB_0C__file_stream.FILE_import("files")
	}
}

/**
 * @param {JSEvent} event the event that triggered the action
 * 
 * @properties={typeid:24,uuid:"582D1472-7339-4669-A110-353A1904B241"}
 */
function TOGGLE_buttons(event) {
	var editStatus = globals.WEBc_block_getEdit()
	
	var hasData = globals.WEBc_block_getData(event).id_asset_instance ? true : false
	
	elements.btn_choose.enabled = editStatus
	elements.btn_import.enabled = editStatus
	elements.lbl_choose.enabled = editStatus
	elements.lbl_import.enabled = editStatus
}
