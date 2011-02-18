/**
 * @properties={typeid:35,uuid:"4F2AE698-F740-4F36-922D-ECD6DD2A4932",variableType:-4}
 */
var editsAllowed = null;

/**
 * @properties={typeid:35,uuid:"4768DA43-4617-41AC-B2E7-77D8DC83E2DC",variableType:-4}
 */
var recBlockData = null;

/**
 * param {} obj Data object passed to all markup methods
 * @properties={typeid:24,uuid:"508D7857-762F-4C6F-9CAA-95EAB9C404F0"}
 */
function VIEW_default(obj) {
	// template
	var markup = obj.data.HTML	
	
	// return
	return markup
}

/**
 * @properties={typeid:24,uuid:"27048A75-8641-49AD-8E44-D614410947B0"}
 */
function FORM_on_load() {
	//set combobox to be square on os x
	globals.CODE_property_combobox(true)
}

/**
 * @properties={typeid:24,uuid:"B886B030-6E8A-4206-B8FC-7DF67F7362F0"}
 */
function BLOCK_save() {
	databaseManager.saveData(foundset.getSelectedRecord())
	databaseManager.setAutoSave(true)
	
	ACTION_colorize()
	
	//called from browser bean, hide form
	if (forms.WEB_0F_page.TRIGGER_mode_set() == "BROWSER") {
		forms.WEB_0F_page__browser__editor.ACTION_hide()
	}
	//refresh the colored version
	else {
		ACTION_colorize()
	}	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"5322BB4A-0CAF-42E9-B314-F47B8108433C"}
 */
function ACTION_edit(event) {
	if (utils.hasRecords(foundset.getSelectedRecord(),'web_block_data_to_block.web_block_to_area.web_area_to_version') && web_block_data_to_block.web_block_to_area.web_area_to_version.flag_edit) {
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
 * @properties={typeid:24,uuid:"0B60D003-5C1F-4432-94D9-EA53C7A29887"}
 */
function FORM_on_show(firstShow, event) {
	ACTION_colorize()
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"136705A2-5A67-4E9C-8AC9-DABCA1BABD5D"}
 */
function REC_on_select(event) {
	ACTION_colorize()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B4B7C59C-32DB-46C6-BD6B-E9C42C12DE4E"}
 */
function BLOCK_cancel(event) {
	databaseManager.rollbackEditedRecords()
	databaseManager.setAutoSave(true)
	
	//called from browser bean, hide form
	if (forms.WEB_0F_page.TRIGGER_mode_set() == "BROWSER") {
		forms.WEB_0F_page__browser__editor.ACTION_hide()
	}
	//refresh the colored version
	else {
		ACTION_colorize()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"AFC38F1A-D4AE-49AE-8C7C-C6901CC9B030"}
 */
function TOGGLE_buttons(state) {
	if (!editsAllowed) {
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
	
	//cancel is always an option if in browser mode
	if (forms.WEB_0F_page.TRIGGER_mode_set() == "BROWSER") {
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

	globals.WEB_page_tree_to_popup(ACTION_add_token)

}

/**
 * @param inputID page id to tokenize for internal link
 * @properties={typeid:24,uuid:"4432AB1D-AFD0-4AEC-8EDE-80BABA0450C4"}
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
	databaseManager.saveData(foundset.getSelectedRecord())
	
	elem.caretPosition = cursor + offset
	elem.requestFocus()
	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1134822A-1145-4653-AFC5-9C08C58EDFDC"}
 */
function ACTION_insert_image(event) {
	forms.WEB_0F_asset__image__P_choose.linkImage = 1
	
	application.showFormInDialog(
				forms.WEB_0F_asset__image__P_choose,
				-1,-1,-1,-1,
				"Image",
				false,
				false,
				"CMS_imageChoose"
			)
	
	//something chosen, insert image link at cursor location
	if (forms.WEB_0F_asset__image__P_choose.recImage) {
		//wrap currently selected text with link
		var elem = elements.fld_data_value
	
		var recImage = forms.WEB_0F_asset__image__P_choose.recImage
		var token = "{DS:IMG_" + recImage.id_asset + "}"
		
		//insert image at current location
		var html = '<img src="' + token + '" width="' + recImage.width + '" height="' + recImage.height + '" alt="' + recImage.asset_title +'">'
		
		//length of tag
		var offset = html.length
		
		//cut selected text so we can get the correct cursor position
		elem.replaceSelectedText('')
		
		//get cursor location
		var cursor = elem.caretPosition
		
		elem.replaceSelectedText(html)
		databaseManager.saveData(foundset.getSelectedRecord())
		
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
	
	// block data points
	block.data = {
		HTML : 'TEXT'            
	}
	
	// block views
	block.views = globals.WEB_block_methods(controller.getName(),"VIEW")
	
	// block client actions - Block
	block.clientActionsBlock = globals.WEB_block_methods(controller.getName(),"BLOCK")
	
	// block client actions - Page
	block.clientActionsPage = globals.WEB_block_methods(controller.getName(),"PAGE")
	
	// block web actions
	block.webActions = globals.WEB_block_methods(controller.getName(),"WEB")
	
	// block configure data points
	block.blockConfigure = {
		
	}
	
	return block
	
}

/**
 * @properties={typeid:24,uuid:"16312B6D-9AA1-465F-B962-79EAC114C412"}
 */
function LOADER_init(recBlock,flagEdit) {
	recBlockData = recBlock.web_block_to_block_data.getRecord(1)
	
	ACTION_colorize()
	
	forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.removeTabAt(2)
	forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.addTab(forms.WEB_0F__html,null,null,null,null,null,null,'web_block_data_to_block_data')
	forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.tabIndex = 2
	
	editsAllowed = flagEdit
	
	elements.btn_edit.visible = flagEdit
	elements.lbl_edit.visible = flagEdit
}

/**
 * @properties={typeid:24,uuid:"FB804749-0B28-485A-A528-4F10DE113301"}
 */
function ACTION_colorize() {
	var html = ''
	var prefix = ''
	
//	if (fsBlockData) {
//		var recBlockData = fsBlockData.getRecord(1)
//	}
//	else {
//		var recBlockData = foundset.getSelectedRecord()
//	}
	
	//if there's data, color it
	if (recBlockData.data_value) {
		var colorize = recBlockData.data_value
		colorize = colorize.replace(/</g,'&lt;')
		
		//when running on real web
//		if (utils.hasRecords(foundset.getSelectedRecord(),'web_block_data_to_block.web_block_to_area.web_area_to_version')) {
//			//rewrite mode
//			var fsInstall = databaseManager.getFoundSet('sutra_cms','web_install')
//			fsInstall.loadAllRecords()
//			if (utils.hasRecords(fsInstall)) {
//				var rewriteMode = fsInstall.rewrite_enabled
//			}
//			if (rewriteMode) {
//				prefix = 'sutraCMS/'
//			}
//		}
		//when running in tinymce
		prefix = globals.WEB_MRKUP_link_base()
		
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
	
	elements.bn_browser.html = html
	TOGGLE_buttons(false)
}
