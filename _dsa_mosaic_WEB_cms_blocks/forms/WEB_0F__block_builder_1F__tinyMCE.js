/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"3261DDA6-8412-4A32-A2B8-EC3F12B461DB"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"9614EF08-C20B-4750-9748-38400B64C3E2"}
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
	
		//styles for tinymce
//		var cssFile = globals.WEBc_markup_link_base()
//		
//		//rewrite mode
//		var rewriteMode = globals.WEBc_install_getRewrite()
//		
//		//no pages, no css
//		if (utils.hasRecords(forms.WEB_0F_page.foundset)) {
//			//rewrites are disabled, spell out all the way to the site directory
//			if (!rewriteMode) {
//				cssFile += 'sites/' + forms.WEB_0F_page.web_page_to_site.directory + '/'
//			}
//			
//			if (utils.hasRecords(forms.WEB_0F_page__design_1F__header_display_2F_platform._platform,'web_platform_to_theme') && forms.WEB_0F_page__design_1F__header_display_2F_platform._platform.web_platform_to_theme.theme_directory) {
//				cssFile += 'themes/' + forms.WEB_0F_page__design_1F__header_display_2F_platform._platform.web_platform_to_theme.theme_directory + '/css/tinymce.css'
//				
//				//read in cssFile to see if exists
//				var fileExists = plugins.http.getPageData(cssFile)
//			}
//		}
//		
//		//tinymce file 
//		if (fileExists) {
//			js.content_css = cssFile
//		}
//		//no specific tinymce file present, use default css for entire site
//		else {
//			
//		}
	
				
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
			js.theme_advanced_buttons1 = 'bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,forecolor,backcolor,|,formatselect'//,|,styleselect'
		    js.theme_advanced_buttons2 = 'bullist,numlist,|,outdent,indent,blockquote,|,link,unlink,anchor,image,|,search,replace,|,spellchecker,|,pastetext'
		    js.plugins = 'safari,spellchecker,pagebreak,style,layer,advimage,advlink,emotions,iespell,inlinepopups,preview,media,searchreplace,print,contextmenu,paste,directionality,noneditable,visualchars,xhtmlxtras,template'//,imagemanager,filemanager'
			
		    js.paste_text_use_dialog = 'true'
		    js.theme_advanced_blockformats = "h1,h2,h3,h4,h5,h6,p"
		}
//		else if (mode == 'advanced') {
//		    js.theme_advanced_buttons1 = 'bold,italic,underline,strikethrough,sub,sup,|,justifyleft,justifycenter,justifyright,justifyfull,|,forecolor,backcolor,|,formatselect'//,|,styleselect,styleprops',
//	    	js.theme_advanced_buttons2 = 'bullist,numlist,|,outdent,indent,blockquote,|,link,unlink,anchor,image,|,search,replace,|,spellchecker,|,tablecontrols',
//	    	js.theme_advanced_buttons3 = 'pastetext,|,code,removeformat,cleanup,|,nonbreaking,charmap,insertdate,inserttime,hr',
//	    	js.plugins = 'safari,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,xhtmlxtras,template'//,imagemanager,filemanager'
//			
//		    js.paste_text_use_dialog = 'true'
//		    js.theme_advanced_blockformats = "h1,h2,h3,h4,h5,h6,p,div,blockquote,code"
//		}
//		else if (mode == 'all') {
//		    js.theme_advanced_buttons1 = 'save, |, bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect'
//	    	js.theme_advanced_buttons2 = 'search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,link,unlink,anchor,image,cleanup,code,|,forecolor,backcolor'
//	    	js.theme_advanced_buttons3 = 'tablecontrols,|,hr,removeformat,|,sub,sup'
//	    	js.theme_advanced_buttons4 = 'styleprops,spellchecker,|,nonbreaking, charmap,insertdate,inserttime'
//	    	js.plugins = 'safari,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,xhtmlxtras,template'//,imagemanager,filemanager'
//		}
		
		return js
	}
	else {
		return null
	}
}

/**
 *
 * @properties={typeid:24,uuid:"E2F1544A-6933-40C1-BA92-02BF6A87C0B9"}
 */
function ACTION_data_change() {
	forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected].record.data = elements.bn_tinymce.html
	
	return false
}

/**
 * @param {JSEvent} event the event that triggered the action
 * 
 * @properties={typeid:24,uuid:"553CBBDB-2219-49ED-BEC5-A585CBC2011A"}
 */
function BLOCK_save(event) {
	forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected].record.data = elements.bn_tinymce.html
	
	elements.bn_tinymce.clearDirtyState()
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D9CC2B4C-3AAC-4249-BD39-DF8970BBC827"}
 */
function FORM_on_show(firstShow, event) {
	if (firstShow) {
		//load up easy tinymce
		elements.bn_tinymce.setCustomConfiguration(TINYMCE_init("simple"))
	}
}

/**
 * Update display as needed when block selected.
 *
 * @properties={typeid:24,uuid:"22B54E90-2867-4CD5-989D-1ED3058B07BD"}
 */
function INIT_data(data) {
	if (elements.bn_tinymce) {
		elements.bn_tinymce.clearHtml()
	}
	else {
		globals.WEBc_browser_error()
	}
	
	if (data && data.data) {
		elements.bn_tinymce.html = data.data
		elements.lbl_label.text = data.label || solutionModel.getForm(controller.getName()).getLabel('lbl_label').text
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"5CB834DB-A19A-4377-8182-28FAC5CF8D7D"}
 */
function BLOCK_reset(event) {
	elements.bn_tinymce.clearHtml()
	
	//reset tinymce toolbar
	elements.bn_tinymce.setCustomConfiguration(TINYMCE_init('simple'))
	
	//cancel current edits, and reset to defaults
	forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected].data = plugins.serialize.fromJSON(globals.CMS.ui.getData('WEB_0F__block_builder')[forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected].key])
	elements.bn_tinymce.html = forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected].record.data || ''
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E8D34D08-E504-40BD-A153-AFE60A83F6F7"}
 */
function ACTION_internal_link(event) {
	globals.WEBc_page_picker(ACTION_add_token,null,true)
}

/**
 * @param inputID page id to tokenize for internal link
 * @properties={typeid:24,uuid:"FE321987-76E0-40E0-A23C-24BCC62B3001"}
 */
function ACTION_add_token(inputID,pageRec) {
	var token = globals.CMS.token.getPage(pageRec).link
	
	//set clipboard content if shift-key held
	if (globals.CODE_key_pressed('shift')) {
		application.setClipboardContent(token)
	}
	else {
		var js = "tinyMCE.execCommand('mceInsertLink', false, '" + token + "');"
		elements.bn_tinymce.executeJavaScript(js)
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"34042EB2-BD14-4A74-AC12-2BA4658E39EC"}
 */
function ACTION_insert_image(event) {
	forms.WEB_P__asset.LOAD_data(1)
	
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
		var image = forms.WEB_P__asset._assetChosen
		var token = globals.CMS.token.getImage(image.asset).link
		
		var html = '<img src="' + token + '" width="' + image.meta.width + '" height="' + image.meta.height + '" alt="' + image.asset.asset_title +'">'
		
		var js = "tinyMCE.execCommand('mceInsertContent', false, '" + html + "');"
		elements.bn_tinymce.executeJavaScript(js)
		
	}
}
