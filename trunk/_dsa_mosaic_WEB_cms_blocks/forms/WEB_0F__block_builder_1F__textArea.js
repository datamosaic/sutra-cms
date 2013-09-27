/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"54BBB373-B684-4D3F-831C-BFD77693C0A3"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C587651D-0798-41C6-9FE7-B2CCB314CB53"}
 */
var _text = null;

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"664BFF42-14AF-4AD0-81D1-00466EC79732"}
 */
function onDataChange(oldValue, newValue, event) {
	forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected].record.data = newValue
}

/**
 * @properties={typeid:24,uuid:"0CE014BE-3DDD-4AFC-BB81-0B8EC87B6518"}
 */
function INIT_data(data) {
	if (!(data instanceof Array)) {
		data = new Array(data)
	}
	
	for (var i = 0; i < data.length; i++) {
		var row = data[i]
		               
		if (row) {
			_text = row.data
			elements.lbl_label.text = row.label || solutionModel.getForm(controller.getName()).getLabel('lbl_label').text
		}
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4A74A07F-357D-493C-BD0A-FBA2F05D3D85"}
 */
function ACTION_internal_link(event) {
	globals.WEBc_page_picker(ACTION_add_token,null,true)
}

/**
 * @param inputID page id to tokenize for internal link
 * @properties={typeid:24,uuid:"46D5A3E8-82F8-4790-A862-9A1130AE7AF3"}
 */
function ACTION_add_token(inputID,pageRec) {
	var token = globals.CMS.token.getPage(pageRec).link
	
	//wrap currently selected text with link
	var elem = elements.var_html
	
	var isMarkdown = forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected].record.markdown
	
	var template = isMarkdown ? '[{{text}}]({{url}})' : '<a href="{{url}}">{{text}}</a>'
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
 * @properties={typeid:24,uuid:"8D2B69B5-9F6B-4DF3-8CF7-17E0027C803C"}
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
	
	//start a continuation in wc
	scopes.DS.continuation.start(null,'WEB_P__asset')
	
	//something chosen, insert image link at cursor location
	if (forms.WEB_P__asset._assetChosen) {
		//wrap currently selected text with link
		var elem = elements.var_html
		var isMarkdown = forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected].record.markdown
		
		switch (assetType) {
			case 1:	//image
				var image = forms.WEB_P__asset._assetChosen
				var asset = globals.CMS.token.getImage(image.asset)
				
				//insert image at current location
				var template = isMarkdown ? '![{{text}}]({{url}})' : '<img src="{{url}}" width="{{width}}" height="{{height}}" alt="{{text}}">'
				var data = {
						text : asset.name,
						url : asset.link,
						width: image.meta.width,
						height: image.meta.height
					}
				var html = globals.CMS.markup.merge(template,data)
				break
			case 2:	//file
			case 3:	//group
				var file = forms.WEB_P__asset._assetChosen
				var asset = globals.CMS.token.getFile(file.asset)
				
				//insert link at current location
				var template = isMarkdown ? '[{{text}}]({{url}})' : '<a href="{{url}}">{{text}}</a>'
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
		
		elem.caretPosition = cursor + offset
		elem.requestFocus()
	}
}