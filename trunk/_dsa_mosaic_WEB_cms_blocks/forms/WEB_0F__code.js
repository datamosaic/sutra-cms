/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F9C97E5D-97C9-449E-A979-716462FAFB00"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A7E4C666-0E2A-4606-A473-E3F5B1530ED4"}
 */
var _codeType = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B3A5E4A5-A194-4AC6-9349-01DB3DAA2591"}
 */
var _dataValue = null;

/**
 * param {} obj Data object passed to all markup methods
 * @properties={typeid:24,uuid:"DD29544C-9226-46F3-88AB-2ECA299910DF"}
 */
function VIEW_default(obj) {
	// template
	var markup = obj.block_data.code
	
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
	//only run in edit mode
	if (globals.CMS.ui.getEdit()) {
		globals.CMS.ui.setData(event,'code',_dataValue)
		globals.CMS.ui.save()
		
		ACTION_colorize()
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
	_dataValue = globals.CMS.ui.getData(controller.getName()).code
	_codeType = globals.CMS.ui.getConfig(controller.getName()).code_type
	
	//when in edit mode, enter in edit mode
	if (globals.CMS.ui.getEdit()) {
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
	globals.CMS.ui.cancel()
	
	//only run in edit mode
	if (globals.CMS.ui.getEdit()) {
		//reset variables
		_dataValue = globals.CMS.ui.getData(controller.getName()).code
		_codeType = globals.CMS.ui.getConfig(controller.getName()).code_type
		
		//refresh the colored version
		if (globals.WEB_page_mode == 2) {
			ACTION_colorize()
		}
	}
}

/**
 * @properties={typeid:24,uuid:"1DD58AA1-41B8-44A1-BDAE-FE0ADBF7F314"}
 */
function TOGGLE_buttons(state) {
	if (!globals.CMS.ui.getEdit()) {
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
		globals.WEBc_browser_error()
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
	//only run in edit mode
	if (globals.CMS.ui.getEdit()) {
		globals.WEBc_page_picker(ACTION_add_token,null,true)
	}
}

/**
 * @param inputID page id to tokenize for internal link
 * @properties={typeid:24,uuid:"60C5247A-7183-48A9-8E0D-463E7401E8BB"}
 */
function ACTION_add_token(inputID,pageRec) {
	var token = globals.CMS.token.getPage(pageRec).link
	
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
	
	var dataSave = globals.CMS.ui.setData(null,'code',_dataValue,controller.getName())
	
	elem.caretPosition = cursor + offset
	elem.requestFocus()
	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param blah1
 * @param blah2
 * @param blah3
 * @param blah4
 * @param {Number} assetType
 *
 * @properties={typeid:24,uuid:"2CED7B67-8517-4BF5-A290-B30AA2BA874C"}
 */
function ACTION_insert_asset(event,blah1,blah2,blah3,blah4,assetType) {
	if (event instanceof JSEvent) {
		var elem = elements[event.getElementName()]
		
		var menu = plugins.window.createPopupMenu()
		menu.addMenuItem("Show image picker").setMethod(ACTION_insert_asset)
		menu.addMenuItem("Show file picker").setMethod(ACTION_insert_asset).methodArguments = [2]
		menu.addSeparator()
		menu.addMenuItem("Show group picker").setMethod(ACTION_insert_asset).methodArguments = [3]
		
		menu.show(elem)
		return
	}
	
	//work with images if nothing specified
	if (!assetType) {
		assetType = 1
	}
	
	//default to image unless something else specified
	forms.WEB_P__asset.LOAD_data(assetType)
	
	globals.CODE_form_in_dialog(
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
		
		switch (assetType) {
			case 1:	//image
				var image = forms.WEB_P__asset._assetChosen
				var asset = globals.CMS.token.getImage(image.asset)
				
				//insert image at current location
				var html = '<img src="' + asset.link + '" width="' + image.meta.width + '" height="' + image.meta.height + '" alt="' + asset.name +'">'
				
				break
			case 2:	//file
			case 3:	//group
				var file = forms.WEB_P__asset._assetChosen
				var asset = globals.CMS.token.getFile(file.asset)
				
				//insert image at current location
				var html = '<a href="' + asset.link + '">' + (elem.getSelectedText() || asset.name || 'Link') + '</a>'
				
				break
		}
		
		//length of tag
		var offset = html.length
		
		//cut selected text so we can get the correct cursor position
		elem.replaceSelectedText('')
		
		//get cursor location
		var cursor = elem.caretPosition
		
		elem.replaceSelectedText(html)
		
		var dataSave = globals.CMS.ui.setData(event,'code',_dataValue)
		
		elem.caretPosition = cursor + offset
		elem.requestFocus()
	}
}

/**
 * Build a data object that defines this block. Called when creating a new block.
 * Used to create all meta data associated with this block (register a block in the CMS)
 * 
 * @returns {scopes.CMS._constant.blockInit} Data object that is used to register a block
 * 
 * @author &copy; Data Mosaic
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
			block_category		: scopes.CMS._constant.blockCategory.CONTENT,
			block_type			: scopes.CMS._constant.blockType.DESIGNTIME,
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
	
	var codeData = globals.CMS.ui.getData(controller.getName()).code
	
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
		globals.WEBc_browser_error()
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
	globals.CMS.ui.setConfig(event,'code_type',newValue)
}
