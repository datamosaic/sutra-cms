/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f29"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"60C0F66F-9740-428F-8C64-BE5870650741"}
 */
function REC_selected(event) {
	//make sure variable set correctly
	var vlReal = forms.WEB_0F_page__design.SET_globals()
	
	//update version to most recent one if selected version is not in this page stack
	for (var i = 0; i < vlReal.length; i++) {
		if (globals.WEB_version_selected == vlReal[i]) {
			var found = true
		}
	}
	
	if (!found) {
		globals.WEB_version_selected = (vlReal.length) ? vlReal[0] : 0
	}
	
	//make sure edit button not showing if not supposed to be
		//MEMO: probably don't want to force a save here...just need edit/save button reset to normal
	forms.WEB_0TB_user_mode.ACTION_save()
	forms.WEB_0TB_user_mode.TOGGLE_edit()
	
	//only show snapshots and groups if there is more than one defined
	forms.WEB_0TB_user_mode.TOGGLE_group()
	forms.WEB_0TB_user_mode.TOGGLE_version()
	
	//fill the browser bean with url to load
	URL_update()
}

/**
 *
 * @properties={typeid:24,uuid:"CB9940A5-6AA6-4463-BB61-33DA0D5C4563"}
 */
function EDIT_on() {
	var prefix = 'data-'
	var result = elements.bn_browser.executeJavaScriptWithResult("return editOn('" + prefix + "');")
}

/**
 *
 * @properties={typeid:24,uuid:"7A6EFE48-21A4-4505-AF8F-1A683DF96BD4"}
 */
function URL_update() {
	//see forms.WEB_0F_page__design__buton_tab__content.VISIT_page
	
	//newly created page...show filler
	if (forms.WEB_0T_page.addRecord) {
		elements.bn_browser.html = '<html><body><h1>Newly created page</h1></body></head>'
	}
	//go to page
	else {
		//this is an external link, navigate there
		if (page_type == 2 && page_link) {
			globals.WEB_preview_url = page_link	
		}
		//show selected group/snapshot
		else {
			globals.WEB_preview_url = 
				globals.WEB_MRKUP_link_page(id_page,null,'Edit') + 
				"&group=" + globals.WEB_group_selected +
				"&snapshot=" + globals.WEB_version_selected
		}
		
		elements.bn_browser.navigateTo(globals.WEB_preview_url)
		
		forms.WEB_0TB_user_mode.BREAD_update()
		
		/*	for debugging porpoises
		application.setClipboardContent(urlString)
		*/
	}
}

/**
 *
 * @properties={typeid:24,uuid:"81E6B9AF-45DE-4D47-A052-C92A8A013114"}
 */
function EDIT_off() {
	var prefix = 'data-'
	var result = elements.bn_browser.executeJavaScriptWithResult("return editOff('" + prefix + "');")
	
	if (elements.bean_split.bottomComponent) {
		SPLIT_set(false)
	}
}

/**
 *
 * @properties={typeid:24,uuid:"AE8C14E7-851C-475B-A830-A03AF6B7BFE3"}
 */
function BLOCK_edit(idBlock) {
	var blockID = idBlock.split("-")
	forms.WEB_0F_page__browser__editor.dataID = blockID[1]
	
	var content = databaseManager.getFoundSet(controller.getServerName(),"web_block_data")
	content.find()
	content.id_block = blockID[1]
	var count = content.search()
	
	if (count) {
		forms.WEB_0F_page__browser__editor.dataRec = content
	}
	
	forms.WEB_0F_page__browser__editor.elements.tab_edit.removeTabAt(1)
	
	//currently used elsewhere, remove
	if (forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.getMaxTabIndex() >= 2 && (
		forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.getTabFormNameAt(2) == 'WEB_0F__content' ||
		forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.getTabFormNameAt(2) == 'WEB_0F__asset' //||
		)) {
		
		forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.removeTabAt(2)
	}
	
	//load in correct forms
	forms.WEB_0F_page__browser__editor.FORM_on_show()
	
	SPLIT_set(true)
	
//	application.showFormInDialog(
//			forms.WEB_0F_page__browser__editor,
//			-1,-1,-1,-1,
//			" ",
//			true,
//			false,
//			"cmsEditHover",
//			true
//		)
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"054DD2AE-9EC2-4214-AF1C-5612B58E4E77"}
 */
function FORM_on_show(firstShow, event) {
	SPLIT_set(false)
}

/**
 *
 * @properties={typeid:24,uuid:"E4B64C5C-7168-4FEF-B1F9-E48BEAE59238"}
 */
function SPLIT_set(editMode) {
	
	var editLocation = forms.WEB_0F_page__browser__editor.editLocation
	
	//edit mode on
	if (editMode) {
		//show it; only requierd one time when edit mode first shown
		if (!elements.tab_editor.visible) {
			elements.tab_editor.visible = true
		}
		
		//only switch orientation if needed
		if (elements.bean_split.orientation != editLocation) {
			elements.bean_split.orientation = editLocation
			
			//TODO: null out required?
		}
		
		//side-wise location
		if (editLocation) {
			elements.bean_split.leftComponent	= elements.bn_browser
			elements.bean_split.rightComponent	= elements.tab_editor
			elements.bean_split.dividerLocation	= elements.bean_split.getWidth() - 300
		}
		//bottom location
		else {
			elements.bean_split.topComponent	= elements.bn_browser
			elements.bean_split.bottomComponent	= elements.tab_editor
			elements.bean_split.dividerLocation	= elements.bean_split.getHeight() - 250
		}
		
		elements.bean_split.dividerSize = 8
	}
	//edit mode off
	else {
		//side-wise location
		if (elements.bean_split.orientation) {
			elements.bean_split.leftComponent	= elements.bn_browser
			elements.bean_split.rightComponent	= null
		}
		//bottom location
		else {
			elements.bean_split.topComponent	= elements.bn_browser
			elements.bean_split.bottomComponent	= null
		}
		
		elements.bean_split.dividerSize = 0
	}
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"341E923E-40EF-4E1D-9C25-802AC05D4789"}
 */
function FORM_on_load(event) {
	elements.tab_editor.visible = false
	SPLIT_set(false)
}

/**
 *
 * @properties={typeid:24,uuid:"FE79BE16-34CC-4556-8485-B6F9211A87D2"}
 */
function BLOCK_new(areaID) {
	
	var area = databaseManager.getFoundSet("sutra_cms","web_area")
	area.find()
	area.id_area = areaID
	var count = area.search()
			
	plugins.dialogs.showInfoDialog(
					"Coming soon...",
					"Add new block to the \"" + area.area_name + "\" area"
				)
}
