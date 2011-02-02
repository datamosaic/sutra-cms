/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f60"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"C26D4046-761A-4232-9F48-8122FC8DF4C9",variableType:-4}
 */
var recLister = null;

/**
 * @properties={typeid:35,uuid:"57D639D5-A891-4245-88E8-49D8936E45A9",variableType:4}
 */
var toolbarMode = 0;

/**
 * @properties={typeid:24,uuid:"6944BFF0-7045-496F-8349-57587CE5B4BE"}
 */
function FORM_on_load() {
	//set combobox to be square on os x
	globals.CODE_property_combobox(true)
	
	elements.bn_tinymce.setCustomConfiguration(CONFIGURATION_tinyMCE("simple"))
}

/**
 *
 * @properties={typeid:24,uuid:"53D35998-0B9B-4ECE-9073-46A10A7BD632"}
 */
function CONFIGURATION_tinyMCE(mode) {
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
			
		
		js.theme_advanced_source_editor_width = '400'	
		js.theme_advanced_source_editor_height = '160' 
		
		//set spellchecker
//		js.spellchecker_rpc_url = 
	
//		//styles
//		//get host from selected version
//		var thisSite = forms.WEB_0F_page.web_page_to_site.url
//		
//		//dataset is valid
//		if (thisSite && thisSite.length) {
//			var cssFile = 'http://' + thisSite
//			
//			var port = application.getServerURL()
//			port = port.split(':')
//			if (port.length > 2) {
//				cssFile += ':' + port[2]
//			}
//		}
//		else {
//			//when running on ip/localhost, must use index.jsp to render page
//			var cssFile = application.getServerURL() + '/sutraCMS'
//		}
		
//		//use the site's 'default url style
//		cssFile += '/sites/' + forms.WEB_0F_page.web_page_to_site.directory + '/themes/' + forms.WEB_0F_page.web_page_to_theme.theme_directory + '/css/tinymce.css'
//		
//		//tinymce file 
//		if (cssFile) {
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
 * @properties={typeid:24,uuid:"AAE5A352-25E3-4B8E-8436-98CECC4603D2"}
 */
function ACTION_save() {
	recLister.body = elements.bn_tinymce.html
	databaseManager.saveData()
	elements.bn_tinymce.clearDirtyState()
	TOGGLE_buttons(false)
}

/**
 *
 * @properties={typeid:24,uuid:"FCCBF32A-7E83-446C-B5F2-DDBDBB5C4FE4"}
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
 * @properties={typeid:24,uuid:"467ADFF5-B4D4-49CB-9CD8-D8FFB885A5C1"}
 */
function FORM_on_show(firstShow, event) {
	TOGGLE_buttons(false)
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EF962B3B-65A7-4897-A33A-BD30F311902F"}
 */
function REC_on_select(event) {
	TOGGLE_buttons(false)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"FCF674F3-7C3E-47DF-B310-F1A90FE9D514"}
 */
function ACTION_cancel(event) {
	elements.bn_tinymce.html = recLister.body
	TOGGLE_buttons(false)
}

/**
 *
 * @properties={typeid:24,uuid:"E4D8FC0B-5626-41CD-A1CA-F4CEC97EDCAE"}
 */
function TOGGLE_buttons(state) {
	elements.btn_save.enabled = state
	elements.lbl_save.enabled = state
	elements.btn_cancel.enabled = state
	elements.lbl_cancel.enabled = state
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2FB64C74-D3F7-4992-AA7E-F52905631B73"}
 */
function TOGGLE_mode(event) {
	switch (toolbarMode) {
		case 0:
			elements.bn_tinymce.setCustomConfiguration(CONFIGURATION_tinyMCE("simple"))
			break
		case 1:
			elements.bn_tinymce.setCustomConfiguration(CONFIGURATION_tinyMCE("advanced"))
			break			
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"16033D84-2100-474B-BECB-2C5B119A921B"}
 */
function ACTION_reset(event) {
	elements.bn_tinymce.clearHtml()
	
	//get mode
	if (toolbarMode) {
		elements.bn_tinymce.setCustomConfiguration(CONFIGURATION_tinyMCE('advanced'))
	}
	else {
		elements.bn_tinymce.setCustomConfiguration(CONFIGURATION_tinyMCE('simple'))
	}
	
	ACTION_cancel()
	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"94B0B532-DB89-4546-9C11-ACE662AEA0AE"}
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
 * @properties={typeid:24,uuid:"3919065E-BA94-44B7-A51E-50F7D20BA65A"}
 */
function ACTION_insert_image(event) {
	forms.WEB_0F__image__P_choose.linkImage = 1
	
	application.showFormInDialog(
				forms.WEB_0F__image__P_choose,
				-1,-1,-1,-1,
				"Image",
				false,
				false,
				"chooseImage"
			)
	
	//something chosen, insert image link at cursor location
	if (forms.WEB_0F__image__P_choose.recImage) {
		var recImage = forms.WEB_0F__image__P_choose.recImage
		var token = "'{DS:IMG_" + recImage.id_image + "}'"
		
		var html = '<img src="' + token + '" width="' + recImage.width + '" height="' + recImage.height + '" alt="' + recImage.image_title +'">'
		
		var js = "tinyMCE.execCommand('mceImage', false, " + html + ");"
		elements.bn_tinymce.executeJavaScript(js)
		
	}
}
