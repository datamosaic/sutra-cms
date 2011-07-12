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
function REC_on_select(event,webMode,skipLoad,verIndex,fireSelect) {
	//this method is the same as...
	var formName = 'WEB_0F_page__design'
	
	//when newly added page, skip this
	if (!forms.WEB_0T_page._addRecord) {
		//halt additional on select firing
//		forms.WEB_0F_page__design__content_1L_block._skipSelect = true
		
	 	//when called with event (not programatically)
//		if (event) {
//		 	//set tooltip of visit with link
//			forms.WEB_0F_page__design__button_tab__content.elements.btn_visit.toolTipText = globals.WEB_MRKUP_link_page(id_page)
//		}
		
		//select page version of tri globals
	 	forms[formName].SET_globals()
		
		//set up valuelists for tri globals
		var pageValid = forms[formName].SET_valuelists()
		
		//set version junks
		var activeInfo = forms[formName].SET_versions(skipLoad,!pageValid)
		
		//don't change anything if we're not loading in the versions
		if (!skipLoad) {
			//specified index to be selected
			if (verIndex) {
				//set selected index
				forms.WEB_0F_page__design__content.foundset.setSelectedIndex(verIndex)
			}
			//there is info about the active version
			else if (activeInfo) {
				//set selected index
				forms.WEB_0F_page__design__content.foundset.setSelectedIndex(activeInfo.position)
				
				//set version to be the active one
				globals.WEB_page_version = activeInfo.record.id_version
			}
			//set to first thing in the list (most recent)
			else {
				globals.WEB_page_version = application.getValueListItems('WEB_page_version').getValue(1,2)
			}
		}
		
		//are edits allowed
		var editAllow = forms.WEB_0F_page.ACTION_edit_get()
		
		//make sure edit button not showing if not supposed to be
			//MEMO: probably don't want to force a save here...just need edit/save button reset to normal
		forms.WEB_TB__web_mode.ACTION_save()
		forms.WEB_TB__web_mode.TOGGLE_edit()
		
		//only show versions and groups if there is more than one defined
		forms.WEB_TB__web_mode.TOGGLE_group()
		forms.WEB_TB__web_mode.TOGGLE_version()
		
		//fill the browser bean with url to load
		URL_update(webMode)
		
		//highlight edit mode
		if (webMode) {
			forms.WEB_TB__web_mode.ACTION_edit()
		}
	}
}

/**
 *
 * @properties={typeid:24,uuid:"CB9940A5-6AA6-4463-BB61-33DA0D5C4563"}
 */
function EDIT_on() {
	var prefix = 'sutra-block-data-'
	elements.bn_browser.executeJavaScript("editOn('" + prefix + "');")
}

/**
 *
 * @properties={typeid:24,uuid:"7A6EFE48-21A4-4505-AF8F-1A683DF96BD4"}
 */
function URL_update(webMode) {
	//see forms.WEB_0F_page__design__buton_tab__content.VISIT_page
	
	//newly created page...show filler
	if (forms.WEB_0T_page._addRecord) {
		elements.bn_browser.html = '<html><body><h1>Newly created page</h1></body></head>'
	}
	//go to page
	else {
		//this is an external link, navigate there
		if (page_type == 2 && page_link) {
			globals.WEB_preview_url = page_link	
		}
		//this is an internal link
		else if (page_type == 3) {
			//TODO: put wrapper "header" on page to alert that on an internal link
				//also, the version here is wrong, need to get for internal link
//			globals.WEB_preview_url = 
//				globals.WEB_MRKUP_link_page(page_link_internal,null,'Edit',webMode) + 
//				"&version=" + forms.WEB_0F_page__browser__editor.url_param
			plugins.dialogs.showInfoDialog('Coming soon...','Internal links can not be edited in real mode yet')
		}
		//show version for selected platform-language-group combo
		else {
			globals.WEB_preview_url = 
				globals.WEB_MRKUP_link_page(id_page,null,'Edit',webMode) + 
				"&version=" + forms.WEB_0F_page__design__content.url_param
		}
		
		elements.bn_browser.navigateTo(globals.WEB_preview_url)
		
		forms.WEB_TB__web_mode.BREAD_update()
		
		/*	for debugging porpoises
		application.setClipboardContent(globals.WEB_preview_url)
		*/
	}
}

/**
 *
 * @properties={typeid:24,uuid:"81E6B9AF-45DE-4D47-A052-C92A8A013114"}
 */
function EDIT_off() {
	var prefix = 'sutra-block-data-'
	elements.bn_browser.executeJavaScript("editOff('" + prefix + "');")
	
	if (elements.bean_split.bottomComponent) {
		SPLIT_set(false)
	}
}

/**
 *
 * @properties={typeid:24,uuid:"AE8C14E7-851C-475B-A830-A03AF6B7BFE3"}
 */
function BLOCK_edit(idBlock) {
	
	function convertUUID(item) {
		return item.substr(0,8) + '-' + item.substr(8,4) + '-' + item.substr(12,4) + '-' + item.substr(16,4)  + '-' + item.substr(20,12)
	}
	
	var blockID = idBlock.split("-")
	
	forms.WEB_0F_page__browser__editor._dataID = convertUUID(blockID[blockID.length - 1])
	
	var content = databaseManager.getFoundSet(controller.getServerName(),"web_block")
	content.loadRecords(application.getUUID(forms.WEB_0F_page__browser__editor._dataID))
	
	//load correct record
	forms.WEB_0F_page__browser__editor.foundset.loadRecords(content)
	
	//TODO: make sure that only one heavyweight instance of each form		
//			forms.WEB_0F_page__browser__editor.elements.tab_edit.removeTabAt(1)
//			
//			var tabPanel = forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail
//			
//			//currently used elsewhere, remove
//			if (tabPanel.getMaxTabIndex() >= 2 && (
//				tabPanel.getTabFormNameAt(tabPanel.getMaxTabIndex()) == 'WEB_0F__content' ||
//				tabPanel.getTabFormNameAt(tabPanel.getMaxTabIndex()) == 'WEB_0F__image' //||
//				)) {
//				
//				tabPanel.removeTabAt(tabPanel.getMaxTabIndex())
//			}
	
	//load in correct forms
	var statusBlock = forms.WEB_0F_page__browser__editor.FORM_on_show()
	
	//only show block edit if something successfully loaded in
	if (statusBlock) {
		SPLIT_set(true)
	}
	else {
		forms.WEB_0F_page__browser__editor.ACTION_hide()
	}
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
	
	var editLocation = forms.WEB_0F_page__browser__editor._editLocation
	
	//edit mode on
	if (editMode) {
		//show it; only requierd one time when edit mode first shown
		if (!elements.tab_editor.visible) {
			elements.tab_editor.visible = true
		}
		
		//only switch orientation if needed
		if (elements.bean_split.orientation != editLocation) {
			elements.bean_split.orientation = editLocation
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
	
	//show picker for type of block and create
	var newBlock = forms.WEB_0F_page__design__content_1L_block.BLOCK_new(areaID)
	
	//add editor to the screen if new block not cancelled
	if (newBlock) {
		BLOCK_edit('sutra-block-data-' + utils.stringReplace(newBlock.id_block.toString(),'-',''))
	}
	//resume edit mode
	else {
		forms.WEB_0F_page__browser__editor.ACTION_hide()
	}
	
	//MEMO: page will be redrawn if block saved after edit mode
}
