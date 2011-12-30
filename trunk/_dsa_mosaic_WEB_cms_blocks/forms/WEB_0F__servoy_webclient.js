/**
 * @properties={typeid:35,uuid:"F5A86BA7-FC8F-448E-B31F-2A787207A97B"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"D0E1184A-C03A-4F5D-A2C5-D023B469A350"}
 */
var _module = null;

/**
 * @properties={typeid:35,uuid:"339695F3-4B5B-4B4B-979D-AFB3C827D5C0"}
 */
var _form = null;

/**
 * @properties={typeid:35,uuid:"9495B9C2-7483-4D34-95EC-4D1421BC7681",variableType:4}
 */
var _height = null;

/**
 * @properties={typeid:35,uuid:"A5CA0FEC-57FD-4947-8B03-48C50608177B",variableType:4}
 */
var _width = null;

/**
 * @properties={typeid:35,uuid:"B2570C0E-8077-4812-95C0-903D4A57EFE1",variableType:4}
 */
var _transparent = null;

/**
 * @properties={typeid:35,uuid:"4077BE6B-B900-4C25-AB33-B0C2764299DD"}
 */
var _cssClass = null;

/**
 * @properties={typeid:35,uuid:"FFA48B49-8645-4C42-8B43-96E81DF8D4E0"}
 */
var _cssId = null;

/**
 * @param	{Object}	obj Data object passed to all markup methods
 * 
 * @properties={typeid:24,uuid:"399C16F5-0026-4B84-A2B5-01231434CB1A"}
 */
function VIEW_default(obj, results) {
	//get login
	var login = globals.WEBc_session_getData(obj.session_server.record.session_id, "login")
	
	//get solution model form
	var smForm = solutionModel.getForm(obj.block_data.form)
	//for width
	var defaultWidth = (smForm) ? smForm.width : 0
	//for height
	var totalHeight = 0
	if (smForm) {
		for (var i in smForm.getParts()) {
			totalHeight += smForm.getParts()[i].height
		}
	}
	var defaultHeight = totalHeight
	
	//TODO: abstract the passing in of record
	var record		= (login && login.customer && login.customer.loginID) ? login.customer.loginID : ''
	
	var url 		= globals.WEBc_markup_link_servlet(obj)
	var module		= '_dsa_mosaic_WEB_cms'
	var method		= 'WEB_servoy_wc_controller'
	var template	= '<iframe src="http://{{url}}/\
						servoy-webclient/ss?s={{module}}&m={{method}}&a=\
						sutraCMS&form={{form}}&\
						id={{record}}" width="{{width}}" height="{{height}}" frameborder="0" \
						scrolling="no" id="{{id}}" '
						//only assign a class if one was specified
						if (obj.block_configure.cssClass) {
							template += 'class="{{class}}" '
						}
template +=	'	>\n\
							Servoy Web Client cannot load\n\
						</iframe>'
	var html = template.replace(/\t/g, '')
	html = utils.stringReplace(html, "{{url}}", url)
	html = utils.stringReplace(html, "{{module}}", module)
	html = utils.stringReplace(html, "{{method}}", method)
	html = utils.stringReplace(html, "{{form}}", obj.block_data.form)
	html = utils.stringReplace(html, "{{record}}", record)
	html = utils.stringReplace(html, "{{width}}", obj.block_configure.width || defaultWidth)
	html = utils.stringReplace(html, "{{height}}", obj.block_configure.height || defaultHeight)
	html = utils.stringReplace(html, "{{id}}", obj.block_configure.cssId || 'swc')
	html = utils.stringReplace(html, "{{class}}", obj.block_configure.cssClass)
	html = utils.stringReplace(html, "{{transparent}}", (obj.block_configure.transparent ? 'true' : 'false'))
	
	return html
}

/**
 * Update display as needed when block selected.
 *
 * @properties={typeid:24,uuid:"7ABCE520-07F0-4ED3-B01B-EB3348DAEE3B"}
 */
function INIT_data() {
	//get data
	var data = globals.CMS.ui.getData(controller.getName())
	var dataConfig = globals.CMS.ui.getConfig(controller.getName())
	
	//save down form variables so records can be changed
	_module = data.module
	_form = data.form
	_width = dataConfig.width
	_height = dataConfig.height
	_transparent = dataConfig.transparent
	_cssId = dataConfig.cssId
	_cssClass = dataConfig.cssClass
	
	//set status of variables
	var editMode = globals.CMS.ui.getEdit()
	
	elements.var_module.visible = editMode
	elements.var_module__display.visible = !editMode
	elements.var_form.visible = editMode
	elements.var_form__display.visible = !editMode
	elements.var_width.transparent = editMode
	elements.var_width.editable = editMode
	elements.var_height.transparent = editMode
	elements.var_height.editable = editMode
	elements.var_transparent.readOnly = !editMode
	elements.var_cssId.transparent = editMode
	elements.var_cssId.editable = editMode
	elements.var_cssClass.transparent = editMode
	elements.var_cssClass.editable = editMode
	
	//fill valuelist appropriately
	SET_forms()
}

/**
 * @properties={typeid:24,uuid:"0829A6D7-6C0C-4C82-92B7-6BB50829DD5F"}
 */
function SET_forms() {
	//only show forms from selected module when in top level form
	if (application.__parent__.solutionPrefs && _module) {
		//get from repository via queries way
		if (!solutionPrefs.repository.api) {
			//load formNames for report module
			var moduleForms = solutionPrefs.repository.allForms[_module]
			var formNames = new Array()
			var j = 0
			
			//check to make sure that there are forms in the report module
			if (moduleForms) {
				for (var i in moduleForms) {
					formNames[j++] = moduleForms[i].formName
				}
			}
		}
		//get from the workspace
		else if (solutionPrefs.repository.workspace) {
			var moduleForms = solutionPrefs.repository.workspace[_module]
		
			var formNames = new Array()
			var j = 0
			
			if (moduleForms) { //check to make sure module_filter has a loaded value (they chose something)
				for (var i in moduleForms) {
					formNames[j++] = i
				}
			}
		}
	}
	//when in reporting module, show forms anyway
	else {
		var formNames = forms.allnames
	}
	
	formNames = formNames.sort()
	
	//set valuelist
	application.setValueListItems('WEB_webclient_forms', formNames)
}

/**
 * Build a data object that defines this block. Called when creating a new block.
 * Used to create all meta data associated with this block (register a block in the CMS)
 * 
 * @returns Data object that is used to register a block
 * @type object
 * 
 * @properties={typeid:24,uuid:"EB40FAF9-1C53-4828-91FF-2087CBDF39BE"}
 */
function INIT_block() {
	
	// main data object to build
	var block = {}
	
	// block record data
	block.record = {
	        block_name			: 'Servoy Web Client',
			block_description	: "Integrates Servoy's web client",		
			form_name			: 'WEB_0F__servoy_webclient'
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
		module : 'TEXT',
		form : 'TEXT'
	}
	
	// block configure data points
	block.blockConfigure = {
		width : 'INTEGER',
		height : 'INTEGER',
		transparent : 'INTEGER',
		cssId : 'TEXT',
		cssClass : 'TEXT'
	}
	
	// block response data points
	block.blockResponse = {
		
	}
	
	return block
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
 * @properties={typeid:24,uuid:"EAF1F56A-8C93-4502-BDA4-BB78E2FFB658"}
 */
function FLD_module__data_change(oldValue, newValue, event) {
	//save data
	globals.WEBc_block_fld_data_change__data(oldValue, newValue, event)
	
	//refresh form valuelist
	SET_forms()
}
