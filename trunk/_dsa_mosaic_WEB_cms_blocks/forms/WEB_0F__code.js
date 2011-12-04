/**
 * @properties={typeid:35,uuid:"F9C97E5D-97C9-449E-A979-716462FAFB00"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"A7E4C666-0E2A-4606-A473-E3F5B1530ED4"}
 */
var _codeType = null;

/**
 * @properties={typeid:35,uuid:"B3A5E4A5-A194-4AC6-9349-01DB3DAA2591"}
 */
var _dataValue = null;

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
	//don't run in headless or web client (they use whatever solution is activated as context)
	if (application.getApplicationType() == APPLICATION_TYPES.SMART_CLIENT || application.getApplicationType() == APPLICATION_TYPES.RUNTIME_CLIENT) {
		//set combobox to be square on os x
		globals.CODE_property_combobox(true)
	}
}

/**
 * @param {JSEvent} event the event that triggered the action
 * 
 * @properties={typeid:24,uuid:"596AC1D2-C10E-435B-A670-B17748C36852"}
 */
function BLOCK_save(event) {
	globals.WEBc_block_setData(event,'code',_dataValue)
	
	ACTION_colorize()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"FD3FDA15-9CCB-46E7-81A4-CD1D2F6C1193"}
 */
function ACTION_edit(event) {
	TOGGLE_buttons(true)
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
//	if (!firstShow) {
//		ACTION_colorize()
//	}
}

/**
 * Update display as needed when block selected.
 * 
 * @properties={typeid:24,uuid:"CC43FDE6-F4F9-4BEB-AF5D-D8FDB80E9AA7"}
 */
function INIT_data() {
	//save down form variables so records can be changed
	_dataValue = globals.WEBc_block_getData(controller.getName()).code
	_codeType = globals.WEBc_block_getConfig(controller.getName()).code_type
	
	//when in edit mode, enter in edit mode
	if (globals.WEBc_block_getEdit()) {
		TOGGLE_buttons(true)
	}
	//update display
	else {
		TOGGLE_buttons(false)
		ACTION_colorize()
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
	//reset codeType var
	_codeType = globals.WEBc_block_getConfig(controller.getName()).code_type
	
	//refresh the colored version
	if (globals.WEB_page_mode == 2) {
		ACTION_colorize()
	}
}

/**
 * @properties={typeid:24,uuid:"1DD58AA1-41B8-44A1-BDAE-FE0ADBF7F314"}
 */
function TOGGLE_buttons(state) {
	if (!globals.WEBc_block_getEdit()) {
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
	if (elements.bn_browser) {
		elements.bn_browser.visible = !state
	}
	else {
		globals.WEB_browser_error()
	}
	elements.var_codeType.enabled = state
	
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

	globals.WEBc_page_picker(ACTION_add_token,null,true)

}

/**
 * @param inputID page id to tokenize for internal link
 * @properties={typeid:24,uuid:"60C5247A-7183-48A9-8E0D-463E7401E8BB"}
 */
function ACTION_add_token(inputID,pageRec) {
	var token = globals.WEBc_markup_token(inputID)
	
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
	
	var dataSave = globals.WEBc_block_setData(event,'code',_dataValue)
	
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
	forms.WEB_P__asset.LOAD_data(1)
	
	application.showFormInDialog(
				forms.WEB_P__asset,
				-1,-1,-1,-1,
				" ",
				false,
				false,
				"CMS_assetChoose"
			)
	
	//something chosen, insert image link at cursor location
	if (forms.WEB_P__asset._assetChosen) {
		//wrap currently selected text with link
		var elem = elements.fld_data_value
	
		var image = forms.WEB_P__asset._assetChosen
		var token = globals.WEBc_markup_token(image.asset)
		
		//insert image at current location
		var html = '<img src="' + token + '" width="' + image.meta.width + '" height="' + image.meta.height + '" alt="' + image.asset.asset_title +'">'
		
		//length of tag
		var offset = html.length
		
		//cut selected text so we can get the correct cursor position
		elem.replaceSelectedText('')
		
		//get cursor location
		var cursor = elem.caretPosition
		
		elem.replaceSelectedText(html)
		
		var dataSave = globals.WEBc_block_setData(event,'code',_dataValue)
		
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
	block.views = globals.WEBc_block_type_getMethods(controller.getName(),"VIEW")
	
	// block client actions - Block
	block.clientActionsBlock = globals.WEBc_block_type_getMethods(controller.getName(),"BLOCK")
	
	// block client actions - Page
	block.clientActionsPage = globals.WEBc_block_type_getMethods(controller.getName(),"PAGE")
	
	// block web actions
	block.webActions = globals.WEBc_block_type_getMethods(controller.getName(),"WEB")
	
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
 * @param {JSEvent} event Upstream event that gives context.
 * 
 * @properties={typeid:24,uuid:"145AE1D1-D199-44AE-9F61-9F1AD0DF7097"}
 */
function ACTION_colorize(event) {
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
	
	var codeData = globals.WEBc_block_getData(controller.getName()).code
	
	//if there's data, color it
	if (codeData) {
		//get type of code
		var codeType = _codeType || 'html'
		
		var colorize = codeData
		colorize = colorize.replace(/</g,'&lt;')
		
		//when running in tinymce
		prefix = globals.WEBc_markup_link_base()
		
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
	
	if (elements.bn_browser) {
		elements.bn_browser.html = html
	}
	else {
		globals.WEB_browser_error()
	}
	
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
	globals.WEBc_block_setConfig(event,'code_type',newValue)
}
