/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"8841DBCE-C04A-4C3C-9890-97B038480C63"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"8E5B7103-552A-4042-87AB-EB0489BE2406"}
 */
var _dataValue = null;

/**
 * param {} obj Data object passed to all markup methods
 * @properties={typeid:24,uuid:"3728367F-767E-4872-B4F6-A62E1E5268AD"}
 */
function VIEW_default(obj) {
	// template
	var markup = obj.block_data.markdown	
	
	//if library available, actually do markdown conversion
	if (typeof org.pegdown.PegDownProcessor == 'function') {
		markup = new org.pegdown.PegDownProcessor().markdownToHtml(markup)
	}
	//show line breaks
	else {
		markup = utils.stringReplace(markup,'\n','<br />')
	}
	
	// return
	return markup
}

/**
 * @properties={typeid:24,uuid:"B93799CC-28F6-4CF6-9771-4A6A46567C66"}
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
 * @properties={typeid:24,uuid:"3BE6D873-FF4E-4FE2-AA82-C6228EA2B319"}
 */
function BLOCK_save(event) {
	globals.CMS.ui.setData(event,'markdown',_dataValue)
	globals.CMS.ui.save()
	
	ACTION_preview()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D1B5EE94-CBB6-4B91-A37B-BD16543EE49F"}
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
 * @properties={typeid:24,uuid:"A762DB94-F131-4D6E-8709-82C92420FC1C"}
 */
function FORM_on_show(firstShow, event) {
//	if (!firstShow) {
//		ACTION_colorize()
//	}
}

/**
 * Update display as needed when block selected.
 *
 * @properties={typeid:24,uuid:"8D730878-5777-492F-9A90-80D5D01E170D"}
 */
function INIT_data() {
	//save down form variables so records can be changed
	_dataValue = globals.CMS.ui.getData(controller.getName()).markdown
	
	//when in edit mode, enter in edit mode
	if (globals.CMS.ui.getEdit()) {
		TOGGLE_buttons(true)
	}
	//update display
	else {
		TOGGLE_buttons(false)
		ACTION_preview()
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2BC3C618-8169-40B6-8884-92979E8872FE"}
 */
function BLOCK_cancel(event) {
	globals.CMS.ui.cancel()
	
	//refresh the colored version
	if (globals.WEB_page_mode == 2) {
		ACTION_preview()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"B5F13526-AF4D-4132-9D1D-A0BD9B3BE3ED"}
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
 * @properties={typeid:24,uuid:"71815F3C-7799-4CBA-95EB-80AE7CB46F03"}
 */
function ACTION_internal_link(event) {
	//only run in edit mode
	if (globals.CMS.ui.getEdit()) {
		globals.WEBc_page_picker(ACTION_add_token,null,true)
	}
}

/**
 * @param inputID page id to tokenize for internal link
 * @properties={typeid:24,uuid:"EC3DA0EE-A1FB-4C5E-97F0-CA241E42BE65"}
 */
function ACTION_add_token(inputID,pageRec) {
	var token = globals.CMS.token.getPage(pageRec).link
	
	//wrap currently selected text with link
	var elem = elements.fld_data_value
	
	var template = '[{{text}}]({{url}})'
	var data = {
			text : elem.getSelectedText() || pageRec.page_name,
			url : token
		}
	var link = globals.CMS.markup.merge(template,data)
	
	//length of tag
	var offset = link.length
	
	//cut selected text so we can get the correct cursor position
	elem.replaceSelectedText('')
	
	//get cursor location
	var cursor = elem.caretPosition
	
	elem.replaceSelectedText(link)
	
	var dataSave = globals.CMS.ui.setData(null,'markdown',_dataValue,controller.getName())
	
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
 * @properties={typeid:24,uuid:"043EBD69-96B9-4BFD-9F3E-F69AD542F937"}
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
				var template = '![{{text}}]({{url}})'
				var data = {
						text : asset.name,
						url : asset.link
					}
				var html = globals.CMS.markup.merge(template,data)
				
				break
			case 2:	//file
			case 3:	//group
				var file = forms.WEB_P__asset._assetChosen
				var asset = globals.CMS.token.getFile(file.asset)
				
				var template = '[{{text}}]({{url}})'
				var data = {
						text : elem.getSelectedText() || asset.name || 'Link',
						url : asset.link
					}
				var html = globals.CMS.markup.merge(template,data)
				
				break
		}
		
		//length of tag
		var offset = html.length
		
		//cut selected text so we can get the correct cursor position
		elem.replaceSelectedText('')
		
		//get cursor location
		var cursor = elem.caretPosition
		
		elem.replaceSelectedText(html)
		
		var dataSave = globals.CMS.ui.setData(event,'markdown',_dataValue)
		
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
 * @properties={typeid:24,uuid:"90A784ED-2570-423C-A2CB-D0C9F73981AC"}
 */
function INIT_block() {
	
	// main data object to build
	var block = {}
	
	// block record data
	block.record = {
			block_name			: 'Markdown',
			block_description	: 'Write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid XHTML (or HTML)',
			block_category		: scopes.CMS._constant.blockCategory.CONTENT,
			block_type			: scopes.CMS._constant.blockType.DESIGNTIME,
			form_name			: 'WEB_0F__markdown'
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
		markdown : 'TEXT'            
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
 * @properties={typeid:24,uuid:"1C47C1CC-66E6-4A23-922D-F272EB81BE65"}
 */
function ACTION_preview() {
	var html = ''
	var prefix = ''
	
	var htmlData = globals.CMS.ui.getData(controller.getName()).markdown
	
	//if there's data
	if (htmlData) {
		//if library available, actually do markdown conversion
		if (typeof org.pegdown.PegDownProcessor == 'function') {
			htmlData = new org.pegdown.PegDownProcessor().markdownToHtml(htmlData)
			
			html = 
			'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n\
			<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n\
				<head>\n\
					<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />\n\
				</head>\n\
				\n\
				<body style="background: white;">\n' + 
					htmlData + 
				'</body>\n\
			</html>'
		}
		//show line breaks
		else {
			htmlData = utils.stringReplace(htmlData,'\n','<br />')
			
			//when running in tinymce
			prefix = globals.WEBc_markup_link_base()
			
			//show html markup
			html = 
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
			htmlData + 
		'</pre>\n\
	</body>\n\
</html>'
		}
	}
	
	if (elements.bn_browser) {
		elements.bn_browser.html = globals.WEBc_markup_link_internal(html,null,'Edit')
	}
	else {
		globals.WEBc_browser_error()
	}
	
	TOGGLE_buttons(false)
}
