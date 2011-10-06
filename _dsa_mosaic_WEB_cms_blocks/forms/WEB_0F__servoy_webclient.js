/**
 * @properties={typeid:35,uuid:"A5CA0FEC-57FD-4947-8B03-48C50608177B",variableType:4}
 */
var _width = null;

/**
 * @properties={typeid:35,uuid:"339695F3-4B5B-4B4B-979D-AFB3C827D5C0"}
 */
var _form = null;

/**
 * @properties={typeid:35,uuid:"B2570C0E-8077-4812-95C0-903D4A57EFE1",variableType:4}
 */
var _transparent = null;

/**
 * @properties={typeid:35,uuid:"9495B9C2-7483-4D34-95EC-4D1421BC7681",variableType:4}
 */
var _height = null;

/**
 * @properties={typeid:35,uuid:"F5A86BA7-FC8F-448E-B31F-2A787207A97B"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"FFA48B49-8645-4C42-8B43-96E81DF8D4E0"}
 */
var _id = null;

/**
 * @properties={typeid:35,uuid:"C5F2DA88-F182-4F52-B94B-EACCC3DC786C",variableType:-4}
 */
var _recForm = null;

/**
 * @properties={typeid:35,uuid:"831E9A70-898C-435D-BED4-AAD63EB8A0B4",variableType:-4}
 */
var _recWidth = null;

/**
 * @properties={typeid:35,uuid:"27607730-0E58-41A6-8BAE-130D55E40C98",variableType:-4}
 */
var _recTransparent = null;

/**
 * @properties={typeid:35,uuid:"D0E1184A-C03A-4F5D-A2C5-D023B469A350"}
 */
var _module = null;

/**
 * @properties={typeid:35,uuid:"2A86EBC6-5B5E-4DAA-885F-92AB6161917B",variableType:-4}
 */
var _recCssClass = null;

/**
 * @properties={typeid:35,uuid:"8C204B49-1E4D-499C-8526-7D21DB6FD86E",variableType:-4}
 */
var _recModule = null;

/**
 * @properties={typeid:35,uuid:"2251E6E9-4029-4088-BDBC-FAB1D5277758",variableType:-4}
 */
var _recHeight = null;

/**
 * @properties={typeid:35,uuid:"4077BE6B-B900-4C25-AB33-B0C2764299DD"}
 */
var _cssClass = null;

/**
 * @properties={typeid:35,uuid:"309F4057-686B-4F04-A98E-5B6D231374EF",variableType:-4}
 */
var _recId = null;

/**
 * @param	{Object}	obj Data object passed to all markup methods
 * @properties={typeid:24,uuid:"399C16F5-0026-4B84-A2B5-01231434CB1A"}
 */
function VIEW_default(obj, results) {
	
	var fsBlockConfig = globals.WEBc_block_getConfig(null,null,obj)
	
	//create mapping to be used
	var mapp = new Object()
	for (var i = 1; i <= fsBlockConfig.getSize(); i++) {
		var record = fsBlockConfig.getRecord(i)
		
		mapp[record.data_key] = record.data_value
	}
	
	var url 		= globals.WEBc_markup_link_servlet(obj)
	var module		= '_dsa_mosaic_WEB_cms'
	var method		= 'WEB_servoy_wc_controller'
	var record		= '4'
	var template	= '<iframe src="http://{{url}}/\
						servoy-webclient/ss/s/{{module}}/m/{{method}}/a/\
						1/form/{{form}}/\
						id/{{record}}" width="{{width}}" height="{{height}}" frameborder="0" \
						scrolling="auto" id="{{id}}" '
						//only assign a class if one was specified
						if (mapp.cssClass) {
							template += 'class="{{class}}" '
						}
template +=	'	allowtransparency="{{transparent}}">\n\
							Servoy Web Client cannot load\n\
						</iframe>'
	var html = template.replace(/\t/g, '')
	html = utils.stringReplace(html, "{{url}}", url)
	html = utils.stringReplace(html, "{{module}}", module)
	html = utils.stringReplace(html, "{{method}}", method)
	html = utils.stringReplace(html, "{{form}}", mapp.form)
	html = utils.stringReplace(html, "{{record}}", record)
	html = utils.stringReplace(html, "{{width}}", mapp.width || 0)
	html = utils.stringReplace(html, "{{height}}", mapp.height || 0)
	html = utils.stringReplace(html, "{{id}}", mapp.id || 'swc')
	html = utils.stringReplace(html, "{{class}}", mapp.cssClass)
	html = utils.stringReplace(html, "{{transparent}}", (mapp.transparent ? 'true' : 'false'))

	return html
}

/**
 * Update display as needed when block selected.
 *
 * @param 	{JSEvent}	event The event that triggered the action.
 * @param	{Boolean}	[alwaysRun] Force the on select method to refire.
 *
 * @properties={typeid:24,uuid:"7ABCE520-07F0-4ED3-B01B-EB3348DAEE3B"}
 */
function REC_on_select(event,alwaysRun) {
	//run on select only when it is 'enabled'
	if (alwaysRun || globals.WEBc_block_enable(event)) {
		//get config data
		var fsBlockConfig = globals.WEBc_block_getConfig(event)
		
		//save down form variables so records can be changed
		for (var i = 1; i <= fsBlockConfig.getSize(); i++) {
			var record = fsBlockConfig.getRecord(i)
			
			switch (record.data_key) {
				case 'module':
					_module = record.data_value
					_recModule = record
					break
				case 'form':
					_form = record.data_value
					_recForm = record
					break
				case 'width':
					_width = record.data_value
					_recWidth = record
					break
				case 'height':
					_height = record.data_value
					_recHeight = record
					break
				case 'transparent':
					_transparent = record.data_value
					_recTransparent = record
					break
				case 'id':
					_id = record.data_value
					_recId = record
					break
				case 'cssClass':
					_cssClass = record.data_value
					_recCssClass = record
					break
//				case '':
//					_rec = record
//					break
			}
		}
		
		//set status of variables
		var editMode = globals.WEBc_block_getEdit()
		
		elements.var_module.visible = editMode
		elements.var_module__display.visible = !editMode
		elements.var_form.visible = editMode
		elements.var_form__display.visible = !editMode
		elements.var_width.transparent = editMode
		elements.var_width.editable = editMode
		elements.var_height.transparent = editMode
		elements.var_height.editable = editMode
		elements.var_transparent.readOnly = !editMode
		elements.var_id.transparent = editMode
		elements.var_id.editable = editMode
		elements.var_cssClass.transparent = editMode
		elements.var_cssClass.editable = editMode
		
		//fill valuelist appropriately
		SET_forms()
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
 * @properties={typeid:24,uuid:"C7AFC905-C1D4-40A1-BE2C-139B76AFC2A9"}
 */
function FLD_data_change(oldValue, newValue, event) {
	var formVar = '_rec' + event.getElementName().split('_')[1].substr(0,1).toUpperCase() + event.getElementName().split('_')[1].substr(1)
	
	forms[controller.getName()][formVar].data_value = newValue
	
	if (formVar == '_recModule') {
		SET_forms()
	}
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

	}
	
	// block configure data points
	block.blockConfigure = {
		module : 'TEXT',
		form : 'TEXT',
		width : 'INTEGER',
		height : 'INTEGER',
		transparent : 'INTEGER',
		id : 'TEXT',
		cssClass : 'TEXT'
	}
	
	// block response data points
	block.blockResponse = {
		
	}
	
	return block
}
