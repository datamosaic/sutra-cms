/**
 * @properties={typeid:35,uuid:"A7E4C666-0E2A-4606-A473-E3F5B1530ED4"}
 */
var _codeType = null;

/**
 * @properties={typeid:35,uuid:"F1C27564-A716-45E9-A1D4-ED185DCF4FA0",variableType:-4}
 */
var _editsAllowed = null;

/**
 * @properties={typeid:35,uuid:"F9C97E5D-97C9-449E-A979-716462FAFB00"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"6B8AEDAD-985E-4000-ADDB-091F6C4B3B70",variableType:-4}
 */
var _recBlockData = null;

/**
 * param {} obj Data object passed to all markup methods
 * @properties={typeid:24,uuid:"DD29544C-9226-46F3-88AB-2ECA299910DF"}
 */
function VIEW_default(obj) {
	// template
	var markup = obj.data.code
	
	// return
	return markup
}

/**
 * @properties={typeid:24,uuid:"F33BE9B2-F674-4F60-BBE6-666F668D5657"}
 */
function FORM_on_load() {
	//set combobox to be square on os x
	globals.CODE_property_combobox(true)
}

/**
 * @properties={typeid:24,uuid:"596AC1D2-C10E-435B-A670-B17748C36852"}
 */
function BLOCK_save() {
	_recBlockData.data_value = _dataValue
	databaseManager.saveData(_recBlockData)
	databaseManager.setAutoSave(true)
	
	ACTION_colorize()
	
	//called from browser bean, hide form
	if (globals.WEB_page_mode == 3) {
		forms.WEB_0F_page__browser__editor.ACTION_hide()
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"FD3FDA15-9CCB-46E7-81A4-CD1D2F6C1193"}
 */
function ACTION_edit(event) {
	if (_editsAllowed) {
		databaseManager.saveData()
		databaseManager.setAutoSave(false)
		TOGGLE_buttons(true)
	}
	else {
		plugins.dialogs.showErrorDialog(
						'Error',
						'This page is non-editable'
					)
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"3270E304-F977-48C3-97BF-FE5A7F9551D1"}
 */
function FORM_on_show(firstShow, event) {
	if (!firstShow) {
		ACTION_colorize()
	}
}

/**
 * @properties={typeid:35,uuid:"6F280884-1453-4C3C-B026-7FC70457CB7D",variableType:-4}
 */
var _recBlockDataConfigure = null;

/**
 * @properties={typeid:24,uuid:"CC43FDE6-F4F9-4BEB-AF5D-D8FDB80E9AA7"}
 */
function REC_on_select(event) {
	ACTION_colorize()
	
	//update formvar used for whatever
	if (utils.hasRecords(foundset.getSelectedRecord(),'web_block_data_to_block.web_block_to_block_data_configure')) {
		var record = web_block_data_to_block.web_block_to_block_data_configure.getRecord(1)
		_codeType = record.data_value
		
		_recBlockDataConfigure = record
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8F3FE07B-111D-4858-ABD2-3373302B5FBE"}
 */
function BLOCK_cancel(event) {
	databaseManager.rollbackEditedRecords()
	databaseManager.setAutoSave(true)
	
	//called from browser bean, hide form
	if (globals.WEB_page_mode == 3) {
		forms.WEB_0F_page__browser__editor.ACTION_hide()
	}
	//refresh the colored version
	else if (globals.WEB_page_mode == 2) {
		ACTION_colorize()
	}
}

/**
 * @properties={typeid:35,uuid:"B3A5E4A5-A194-4AC6-9349-01DB3DAA2591"}
 */
var _dataValue = null;

/**
 * @properties={typeid:24,uuid:"1DD58AA1-41B8-44A1-BDAE-FE0ADBF7F314"}
 */
function TOGGLE_buttons(state) {
	if (!_editsAllowed) {
		elements.btn_edit.visible = false
		elements.lbl_edit.visible = false
	}
	else {
		elements.btn_edit.visible = !state
		elements.lbl_edit.visible = !state
	}
	
	elements.btn_save.enabled = state
	elements.lbl_save.enabled = state
	elements.btn_cancel.enabled = state
	elements.lbl_cancel.enabled = state
	elements.btn_pages.enabled = state
	elements.gfx_pages.enabled = state
	elements.btn_graphic.enabled = state
	elements.gfx_graphic.enabled = state
	
	elements.fld_data_value.visible = state
	elements.bn_browser.visible = !state
	elements.var_codeType.enabled = !state
	
	//cancel is always an option if in browser mode
	if (globals.WEB_page_mode == 3) {
		elements.btn_cancel.enabled = true
		elements.lbl_cancel.enabled = true
	}
	
	if (state) {
		elements.fld_data_value.caretPosition = 1
		elements.fld_data_value.requestFocus(false)
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"BDBE7B79-FF2E-4BA5-911F-E02330584EF7"}
 */
function ACTION_internal_link(event) {

	globals.WEB_page_tree_to_popup(ACTION_add_token)

}

/**
 * @param inputID page id to tokenize for internal link
 * @properties={typeid:24,uuid:"60C5247A-7183-48A9-8E0D-463E7401E8BB"}
 */
function ACTION_add_token(inputID,pageRec) {
	var token = "{DS:ID_" + inputID + "}"
	
	//wrap currently selected text with link
	var elem = elements.fld_data_value
	
	var linkStart = '<a href="' + token + '">'
	var linkPage = elem.getSelectedText() || pageRec.page_name
	var linkEnd = '</a>'
	
	//length of tag
	var offset = (linkStart + linkPage + linkEnd).length
	
	//cut selected text so we can get the correct cursor position
	elem.replaceSelectedText('')
	
	//get cursor location
	var cursor = elem.caretPosition
	
	elem.replaceSelectedText(linkStart + linkPage + linkEnd)
	
	_recBlockData.data_value = _dataValue
		
	databaseManager.saveData(_recBlockData)
	
	elem.caretPosition = cursor + offset
	elem.requestFocus()
	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2CED7B67-8517-4BF5-A290-B30AA2BA874C"}
 */
function ACTION_insert_image(event) {
	forms.WEB_0F__image__P_choose._imageLink = 1
	
	application.showFormInDialog(
				forms.WEB_0F__image__P_choose,
				-1,-1,-1,-1,
				" ",
				false,
				false,
				"CMS_imageChoose"
			)
	
	//something chosen, insert image link at cursor location
	if (forms.WEB_0F__image__P_choose._imageChosen) {
		//wrap currently selected text with link
		var elem = elements.fld_data_value
	
		var image = forms.WEB_0F__image__P_choose._imageChosen
		var token = "{DS:IMG_" + image.asset.id_asset_instance + "}"
		
		//insert image at current location
		var html = '<img src="' + token + '" width="' + image.meta.width.data_value + '" height="' + image.meta.height.data_value + '" alt="' + image.asset.asset_title +'">'
		
		//length of tag
		var offset = html.length
		
		//cut selected text so we can get the correct cursor position
		elem.replaceSelectedText('')
		
		//get cursor location
		var cursor = elem.caretPosition
		
		elem.replaceSelectedText(html)
		
		_recBlockData.data_value = _dataValue
		
		databaseManager.saveData(_recBlockData)
		
		elem.caretPosition = cursor + offset
		elem.requestFocus()
	}
}

/**
 * Build a data object that defines this block. Called when creating a new block.
 * Used to create all meta data associated with this block (register a block in the CMS)
 * 
 * @returns Data object that is used to register a block
 * @type object
 * 
 * @author Data Mosaic (C)
 * 
 * @properties={typeid:24,uuid:"1868BC35-03F4-499E-9CED-EEED7BE41434"}
 */
function INIT_block() {
	
	// main data object to build
	var block = {}
	
	// block record data
	block.record = {
			block_name			: 'Code',
			block_description	: 'Code snippets to be displayed as code on a web site',		
			form_name			: 'WEB_0F__code'
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
		code : 'TEXT'            
	}
	
	// block configure data points
	block.blockConfigure = {
		code_type : 'TEXT'
	}
	
	// block response data points
	block.blockResponse = {
		
	}	
	
	return block
	
}

/**
 * @properties={typeid:24,uuid:"79BC12DD-3EBB-4708-9A39-4238787249C9"}
 */
function LOADER_init(fsBlockData, flagEdit, flagScrapbook, contextForm) {
	//save down pertinent records
	_recBlockData = fsBlockData.getRecord(1)
	_dataValue = _recBlockData.data_value
	_recBlockDataConfigure = _recBlockData.web_block_data_to_block.web_block_to_block_data_configure.getRecord(1)
	_codeType = _recBlockDataConfigure.data_value
	
	//update display
	_editsAllowed = flagEdit
	LOADER_refresh(fsBlockData,flagEdit,flagScrapbook)
	
	//load correct form
	if (flagScrapbook) {
		globals.WEB_block_form_loader('WEB_0F__code',"SCRAPBOOK: Code block",null,contextForm)
	}
	else {
		globals.WEB_block_form_loader('WEB_0F__code',"Code block",null,contextForm)
	}
}

/**
 * @properties={typeid:24,uuid:"145AE1D1-D199-44AE-9F61-9F1AD0DF7097"}
 */
function ACTION_colorize(recBlockData) {
	var brushMap = new Object()
	brushMap.html = 'shBrushXml.js'
	brushMap.js = 'shBrushJScript.js'
	brushMap.servoyjs = 'shBrushServoyJScript.js'
	brushMap.xml = 'shBrushXml.js'
	brushMap.css = 'shBrushCss.js'
	brushMap.java = 'shBrushJava.js'
	brushMap.php = 'shBrushPhp.js'
	brushMap.sql = 'shBrushSql.js'
	
	var html = ''
	var prefix = ''
	
	if (!recBlockData && _recBlockData) {
		recBlockData = _recBlockData
	}
	
	//if there's data, color it
	if (recBlockData && recBlockData.data_value) {
		//get type of code
		var codeType = _codeType || 'html'
		
		var colorize = recBlockData.data_value
		colorize = colorize.replace(/</g,'&lt;')
		
		//when running in tinymce
		prefix = globals.WEB_MRKUP_link_base()
		
		//show html markup
		var html = 
'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n\
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n\
	<head>\n\
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />\n\
		<script type="text/javascript" src="' + prefix + 'resources/syntax/scripts/shCore.js"></script>\n\
		<script type="text/javascript" src="' + prefix + 'resources/syntax/scripts/' + brushMap[codeType] + '"></script>\n\
		<link type="text/css" rel="stylesheet" href="' + prefix + 'resources/syntax/styles/shCoreEclipse.css"/>\n\
		<script type="text/javascript">\n\
			SyntaxHighlighter.defaults["toolbar"] = false;\n\
			SyntaxHighlighter.defaults["quick-code"] = false;\n\
			SyntaxHighlighter.defaults["gutter"] = false;\n\
			SyntaxHighlighter.all();\n\
		</script>\n\
	</head>\n\
	\n\
	<body style="background: white;">\n\
		<pre class="brush:' + codeType + '">' + 
			colorize + 
		'</pre>\n\
	</body>\n\
</html>'
		
	}
	
	elements.bn_browser.html = html
	TOGGLE_buttons(false)
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
 * @properties={typeid:24,uuid:"1975546E-4E95-4C97-8332-E8135178C526"}
 */
function FLD_data_change__code_type(oldValue, newValue, event) {
	if (_recBlockDataConfigure) {
		_recBlockDataConfigure.data_value = newValue
	}
	
	ACTION_colorize()
}

/**
 * @properties={typeid:24,uuid:"2032938A-9A16-4FE2-BB20-EF2015D21E7E"}
 */
function LOADER_refresh(fsBlockData,flagEdit,flagScrapbook) {
	ACTION_colorize(_recBlockData)
	
	TOGGLE_buttons(flagEdit)
	
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
}
