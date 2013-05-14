/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"5FDACEFD-6F16-46F7-827B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"56A4BECA-A9AC-4780-A2C2-3317C0A49108"}
 */
var _dataValue = null;

/**
 * param {} obj Data object passed to all markup methods
 * @properties={typeid:24,uuid:"508D7857-762F-4C6F-9CAA-95EAB9C404F0"}
 */
function VIEW_default(obj) {
	// template
	var markup = obj.block_data.HTML	
	
	// return
	return markup
}

/**
 * @properties={typeid:24,uuid:"27048A75-8641-49AD-8E44-D614410947B0"}
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
 * @properties={typeid:24,uuid:"B886B030-6E8A-4206-B8FC-7DF67F7362F0"}
 */
function BLOCK_save(event) {
	globals.CMS.ui.setData(event,'HTML',_dataValue)
	
	ACTION_colorize()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"5322BB4A-0CAF-42E9-B314-F47B8108433C"}
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
 * @properties={typeid:24,uuid:"0B60D003-5C1F-4432-94D9-EA53C7A29887"}
 */
function FORM_on_show(firstShow, event) {
//	if (!firstShow) {
//		ACTION_colorize()
//	}
}

/**
 * Update display as needed when block selected.
 *
 * @properties={typeid:24,uuid:"136705A2-5A67-4E9C-8AC9-DABCA1BABD5D"}
 */
function INIT_data() {
	//save down form variables so records can be changed
	_dataValue = globals.CMS.ui.getData(controller.getName()).HTML
	
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
 * @properties={typeid:24,uuid:"B4B7C59C-32DB-46C6-BD6B-E9C42C12DE4E"}
 */
function BLOCK_cancel(event) {
	//refresh the colored version
	if (globals.WEB_page_mode == 2) {
		ACTION_colorize()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"AFC38F1A-D4AE-49AE-8C7C-C6901CC9B030"}
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
 * @properties={typeid:24,uuid:"FDAAF912-04DD-4F30-9FD4-91F46C152C8D"}
 */
function ACTION_internal_link(event) {
	//only run in edit mode
	if (globals.CMS.ui.getEdit()) {
		globals.WEBc_page_picker(ACTION_add_token,null,true)
	}
}

/**
 * @param inputID page id to tokenize for internal link
 * @properties={typeid:24,uuid:"4432AB1D-AFD0-4AEC-8EDE-80BABA0450C4"}
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
	
	var dataSave = globals.CMS.ui.setData(null,'HTML',_dataValue,controller.getName())
	
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
 * @properties={typeid:24,uuid:"1134822A-1145-4653-AFC5-9C08C58EDFDC"}
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
		
		var dataSave = globals.CMS.ui.setData(event,'HTML',_dataValue)
		
		elem.caretPosition = cursor + offset
		elem.requestFocus()
	}
}

/**
 * Build a data object that defines this block. Called when creating a new block.
 * Used to create all meta data associated with this block (register a block in the CMS)
 * 
 * @returns {Object} Data object that is used to register a block
 * 
 * @author Data Mosaic (C)
 * 
 * @properties={typeid:24,uuid:"082630B8-D99A-41B2-8022-8D8335EFA21D"}
 */
function INIT_block() {
	
	// main data object to build
	var block = {}
	
	// block record data
	block.record = {
			block_name			: 'HTML',
			block_description	: 'Generic freeform content. HTML/CSS for structure and formatting.\n\nPlain Jane HTML editing by default.',		
			form_name			: 'WEB_0F__html'
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
		HTML : 'TEXT'            
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
 * @param {JSEvent} event Upstream event that gives context.
 * 
 * @properties={typeid:24,uuid:"FB804749-0B28-485A-A528-4F10DE113301"}
 */
function ACTION_colorize() {
	var html = ''
	var prefix = ''
	
	var htmlData = globals.CMS.ui.getData(controller.getName()).HTML
	
	//if there's data, color it
	if (htmlData) {
		var colorize = htmlData
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
		<script type="text/javascript" src="' + prefix + 'resources/syntax/scripts/shBrushXml.js"></script>\n\
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
		<pre class="brush:html">' + 
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
