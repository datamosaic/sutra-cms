/**
 * param {} obj Data object passed to all markup methods
 * @properties={typeid:24,uuid:"9F686D38-C923-456D-AA26-356F9D67BA5F"}
 */
function VIEW_default(obj)
{
	// template
	var markup = 	'<div id="data-<<id_block>>">\n' +
						'\t<<content>>\n' +
					'</div>'
	
	// replace
	markup = markup.replace(/<<id_block>>/ig, obj.block.id)
	markup = markup.replace(/<<content>>/ig, obj.data.Content)
	
	
	// return
	return markup
}

/**
 * @properties={typeid:35,uuid:"F01848BB-5EC3-40CC-BE6B-001526B4F291",variableType:-4}
 */
var recBlockData = null;

/**
 * @properties={typeid:35,uuid:"A5E7C6DE-46F3-4090-AECA-E3CA22A9EB84",variableType:4}
 */
var toolbarMode = 0;

/**
 * @properties={typeid:24,uuid:"2C01CB8B-1D9F-46AE-A205-E94F2E746805"}
 */
function FORM_on_load() {
	//set combobox to be square on os x
	globals.CODE_property_combobox(true)
	
	//load up easy tinymce
	elements.bn_tinymce.setCustomConfiguration(TINYMCE_init("simple"))
}

/**
 *
 * @properties={typeid:24,uuid:"4CFC0DA1-34EE-4536-BBA7-188808600BF7"}
 */
function TINYMCE_init(mode) {
	var js = new Object()
	if (mode) {
		//set language
		js.language = i18n.getCurrentLanguage()
		
		//set toolbar location
		js.theme_advanced_toolbar_location = 'top'
		js.theme_advanced_toolbar_align = 'left'
			
		
		//clear all buttons from toolbar
		js.theme_advanced_buttons1 = '""'
		js.theme_advanced_buttons2 = '""'
		js.theme_advanced_buttons3 = '""'
		js.theme_advanced_buttons4 = '""'
			
		//set pop-up forms to be small enough to fit in smallest instance where used
		js.theme_advanced_source_editor_width = '400'	
		js.theme_advanced_source_editor_height = '160' 
		
		//set spellchecker
//		js.spellchecker_rpc_url = 
	
		//styles
		//get host from selected version
		var thisSite = forms.WEB_0F_site.url
		
		//dataset is valid
		if (thisSite && thisSite.length) {
			var cssFile = 'http://' + thisSite
			
			var port = application.getServerURL()
			port = port.split(':')
			if (port.length > 2) {
				cssFile += ':' + port[2]
			}
		}
		else {
			//when running on ip/localhost, must use index.jsp to render page
			var cssFile = application.getServerURL() + '/sutraCMS'
		}
		
		//use the site's 'default url style
		cssFile += '/sites/' + forms.WEB_0F_page.web_page_to_site.directory + '/themes/' + forms.WEB_0F_page.web_page_to_theme.theme_directory + '/css/tinymce.css'
		
		//tinymce file 
		if (cssFile) {
			js.content_css = cssFile
		}
		//no specific tinymce file present, use default css for entire site
		else {
			
		}
	
				
		/*
			//TODO: pull from a file in the theme directory
		js.style_formats = [
				{title : 'Bold text', inline : 'b'},
				{title : 'Red text', inline : 'span', styles : {color : '#ff0000'}},
				{title : 'Red header', block : 'h1', styles : {color : '#ff0000'}},
				{title : 'Example 1', inline : 'span', classes : 'example1'},
				{title : 'Example 2', inline : 'span', classes : 'example2'},
				{title : 'Table styles'},
				{title : 'Table row 1', selector : 'tr', classes : 'tablerow1'}
			]		
				
		//override default formats on the buttons
		js.formats = {
				alignleft : {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'left'},
				aligncenter : {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'center'},
				alignright : {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'right'},
				alignfull : {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'full'},
				bold : {inline : 'span', 'classes' : 'bold'},
				italic : {inline : 'span', 'classes' : 'italic'},
				underline : {inline : 'span', 'classes' : 'underline', exact : true},
				strikethrough : {inline : 'del'},
				        forecolor : {inline : 'span', classes : 'forecolor', styles : {color : '%value'}},
				        hilitecolor : {inline : 'span', classes : 'hilitecolor', styles : {backgroundColor : '%value'}},
				custom_format : {block : 'h1', attributes : {title : "Header"}, styles : {color : red}}
			}*/
		
		if (mode == 'simple') {
			js.theme_advanced_buttons1 = 'bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,forecolor,backcolor,|,styleselect'
		    js.theme_advanced_buttons2 = 'bullist,numlist,|,outdent,indent,blockquote,|,link,unlink,anchor,image,|,search,replace,|,spellchecker,|,pastetext'
		    js.plugins = 'safari,spellchecker,pagebreak,style,layer,advimage,advlink,emotions,iespell,inlinepopups,preview,media,searchreplace,print,contextmenu,paste,directionality,noneditable,visualchars,xhtmlxtras,template'//,imagemanager,filemanager'
			
		    js.paste_text_use_dialog = 'true'
		}
		else if (mode == 'advanced') {
		    js.theme_advanced_buttons1 = 'bold,italic,underline,strikethrough,sub,sup,|,justifyleft,justifycenter,justifyright,justifyfull,|,forecolor,backcolor,|,styleselect,styleprops',
	    	js.theme_advanced_buttons2 = 'bullist,numlist,|,outdent,indent,blockquote,|,link,unlink,anchor,image,|,search,replace,|,spellchecker,|,tablecontrols',
	    	js.theme_advanced_buttons3 = 'pastetext,|,code,removeformat,cleanup,|,nonbreaking,charmap,insertdate,inserttime,hr',
	    	js.plugins = 'safari,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,xhtmlxtras,template'//,imagemanager,filemanager'
			
		    js.paste_text_use_dialog = 'true'
		}
		else if (mode == 'all') {
		    js.theme_advanced_buttons1 = 'save, |, bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect'
	    	js.theme_advanced_buttons2 = 'search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,link,unlink,anchor,image,cleanup,code,|,forecolor,backcolor'
	    	js.theme_advanced_buttons3 = 'tablecontrols,|,hr,removeformat,|,sub,sup'
	    	js.theme_advanced_buttons4 = 'styleprops,spellchecker,|,nonbreaking, charmap,insertdate,inserttime'
	    	js.plugins = 'safari,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,xhtmlxtras,template'//,imagemanager,filemanager'
		}
		
		
		return js
	}
	else {
		return null
	}
	
	/* // all TinyMCE options
	   js = {
		    language: i18n.getCurrentLanguage(),
		    theme_advanced_buttons1: 'save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect',
	    	theme_advanced_buttons2: 'cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,|,forecolor,backcolor',
	    	theme_advanced_buttons3: 'tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen',
	    	theme_advanced_buttons4: 'insertlayer,moveforward,movebackward,absolute,|,styleprops,spellchecker,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,blockquote,pagebreak,|,insertfile,insertimage',
	    	theme_advanced_toolbar_location: 'top',
	    	theme_advanced_toolbar_align: 'left',
	    	plugins: 'safari,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template'//,imagemanager,filemanager'
		}
	 */
	
}

/**
 * @properties={typeid:24,uuid:"553CBBDB-2269-49ED-BEC5-A585CBC2011A"}
 */
function BLOCK_save() {
	recBlockData.data_value = elements.bn_tinymce.html
	databaseManager.saveData()
	elements.bn_tinymce.clearDirtyState()
	
	TOGGLE_buttons(false)
	
	//called from browser bean, hide form
	if (forms.WEB_0F_page.TRIGGER_mode_set() == "BROWSER") {
		forms.WEB_0F_page__browser__editor.BLOCK_hide()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"1133558F-BF20-48BC-9601-735022F4AD09"}
 */
function ACTION_data_change() {
	TOGGLE_buttons(true)
	return false
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"3FB8B2D5-D274-440F-A336-4912CB1DE292"}
 */
function FORM_on_show(firstShow, event) {
	TOGGLE_buttons(false)
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"BD06F60E-C5F0-4770-B6F0-7C6287A1C7DB"}
 */
function REC_on_select(event) {
	TOGGLE_buttons(false)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8DA68D80-88B6-47F7-857C-6CE05373251D"}
 */
function BLOCK_cancel(event) {
	elements.bn_tinymce.html = recBlockData.data_value
	TOGGLE_buttons(false)
	
	//called from browser bean, hide form
	if (forms.WEB_0F_page.TRIGGER_mode_set() == "BROWSER") {
		forms.WEB_0F_page__browser__editor.BLOCK_hide()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"BD8DAFE8-C240-44D4-BDD7-F10DF758D039"}
 */
function TOGGLE_buttons(state) {
	elements.btn_save.enabled = state
	elements.lbl_save.enabled = state
	elements.btn_cancel.enabled = state
	elements.lbl_cancel.enabled = state
	
	//cancel is always an option if in browser mode
	if (forms.WEB_0F_page.TRIGGER_mode_set() == "BROWSER") {
		elements.btn_cancel.enabled = true
		elements.lbl_cancel.enabled = true
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"26F961FF-263F-411A-AB23-827BDF15A740"}
 */
function TOGGLE_mode(event) {
	switch (toolbarMode) {
		case 0:
			elements.bn_tinymce.setCustomConfiguration(TINYMCE_init("simple"))
			break
		case 1:
			elements.bn_tinymce.setCustomConfiguration(TINYMCE_init("advanced"))
			break			
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1EF12E1A-6434-4F8C-BEC7-48C2B55CE870"}
 */
function BLOCK_reset(event) {
	elements.bn_tinymce.clearHtml()
	
	//get mode
	if (toolbarMode) {
		elements.bn_tinymce.setCustomConfiguration(TINYMCE_init('advanced'))
	}
	else {
		elements.bn_tinymce.setCustomConfiguration(TINYMCE_init('simple'))
	}
	
	BLOCK_cancel()
	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"55863A61-FD4C-4238-8DFF-BED3877F72C3"}
 */
function ACTION_internal_link(event) {

	globals.WEB_page_tree_to_popup(forms.WEB_0F__content.ACTION_add_token)

}

/**
 * @param inputID page id to tokenize for internal link
 * @properties={typeid:24,uuid:"AC4E3BFF-07E7-4A72-A3C1-24F4D8E8C2C0"}
 */
function ACTION_add_token(inputID) {
	var token = "{DS:ID_" + inputID + "}"
	
	//set clipboard content if mac and pre java 1.6
//	if (solutionPrefs.clientInfo.typeOS == 'Mac OS X' && utils.stringToNumber(solutionPrefs.clientInfo.verJava) < 1.6) {
//		application.setClipboardContent(token)
//	}
//	else {
		var js = "tinyMCE.execCommand('mceInsertLink', false, '" + token + "');"
		elements.bn_tinymce.executeJavaScript(js)
//	}
	
//	application.setClipboardContent(token)
	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"95F629BA-5C95-429D-8604-CF81DEF7E7E1"}
 */
function ACTION_pop_toolbar(event) {
	//hacky way until anchoring gets smarter with overlap
	elements.var_toolbarMode.requestFocus()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E285B1BC-2924-477D-8F4C-D8B94FCF01A6"}
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
		var recImage = forms.WEB_0F_asset__image__P_choose.recImage
		var token = "'{DS:IMG_" + recImage.id_asset + "}'"
		
		var html = '<img src="' + token + '" width="' + recImage.width + '" height="' + recImage.height + '" alt="' + recImage.asset_title +'">'
		
		var js = "tinyMCE.execCommand('mceImage', false, " + html + ");"
		elements.bn_tinymce.executeJavaScript(js)
		
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
 * @properties={typeid:24,uuid:"5C624070-178D-46FD-A125-98CF3D9CC9C3"}
 */
function INIT_block() {
	
	// main data object to build
	var block = {}
	
	// block record data
	block.record = {
			block_name			: 'Content',
			block_description	: 'Generic freeform content. HTML/CSS for structure and formatting.\n\nUses TinyMCE to edit content.',		
			form_name			: 'WEB_0F__content',
			form_name_display	: 'WEB_0F__content_view'
		}
	
	// block data points
	block.data = {
		Content : 'TEXT'            
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
 * @properties={typeid:24,uuid:"8947A3D9-5C5E-4766-9C2C-C2F1BE5D6B8A"}
 */
function LOADER_init(recBlock,flagEdit) {
	//show tinymce
	if (flagEdit) {
		forms.WEB_0F__content.recBlockData = recBlock.web_block_to_block_data.getRecord(1)
		
		forms.WEB_0F__content.elements.bn_tinymce.clearHtml()
		forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.removeTabAt(2)
		forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.addTab(forms.WEB_0F__content)
		forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.tabIndex = 2
		forms.WEB_0F__content.elements.bn_tinymce.html = recBlock.web_block_to_block_data.data_value
	}
	//show browser bean
	else {
		var html = '<html><body>'
		html += recBlock.web_block_to_block_data.data_value
		html += '</body></html>'
		
		//next line may need to be moved....
		forms.WEB_0F__content_view.elements.bn_browser.html = html
		forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.removeTabAt(2)
		forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.addTab(forms.WEB_0F__content_view)
		forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.tabIndex = 2
	}
}
