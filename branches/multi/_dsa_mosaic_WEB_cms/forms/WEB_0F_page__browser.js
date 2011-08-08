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
	//when in data sutra and notifications enabled (and they're not already on, do them)
	if (application.__parent__.solutionPrefs && solutionPrefs.config && solutionPrefs.config.currentFormName) {
		var formName = solutionPrefs.config.currentFormName
		var serverName = forms[formName].controller.getServerName()
		var tableName = forms[formName].controller.getTableName()
		var currentNavItem = solutionPrefs.config.currentFormID
		var rowSelected = forms[formName].foundset.getSelectedIndex()
		
		//show busy indicator while changing record
		if (navigationPrefs.byNavItemID[currentNavItem].navigationItem.ulBusyIndicator) {
			var busyIndicator = true
			
			globals.CODE_cursor_busy(true)
			application.updateUI()
		}
		
		//LOG record navigation
		//only run when using query based way to hit repository
		if (solutionPrefs.repository && solutionPrefs.repository.allFormsByTable && solutionPrefs.repository.allFormsByTable[serverName] && solutionPrefs.repository.allFormsByTable[serverName][tableName] && solutionPrefs.repository.allFormsByTable[serverName][tableName].primaryKey) {
			var pkName = solutionPrefs.repository.allFormsByTable[serverName][tableName].primaryKey
			var pkActedOn = forms[formName][pkName]
		}
		else {
			var pkName = 'repositoryAPINotImplemented'
			var pkActedOn = 0
		}
		
		//record not clicked on before, throw up busy bar and busy cursor
		var record = forms[formName].foundset.getRecord(rowSelected)
		if (navigationPrefs.byNavItemID[currentNavItem].navigationItem.initialRecord && !navigationPrefs.byNavItemID[currentNavItem].listData.visitedPKs[record[pkName]]) {
			var recNotLoaded = true
			
			//don't turn busy indicator on if it is already on
			if (!busyIndicator) {
				globals.CODE_cursor_busy(true)
			}
			globals.TRIGGER_progressbar_start(-273, navigationPrefs.byNavItemID[currentNavItem].navigationItem.initialRecordLabel)
		}
		
		//save currently selected index
		navigationPrefs.byNavItemID[currentNavItem].listData.index.selected = rowSelected
		
		//save time when pk of this record last accessed
		navigationPrefs.byNavItemID[currentNavItem].listData.visitedPKs[(forms[formName][pkName] != 'repositoryAPINotImplemented') ? forms[formName][pkName] : 0] = application.getServerTimeStamp()
	}
	
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
	 	forms.WEB_0F_page.SET_globals()
		
		//set up valuelists for tri globals
		var pageValid = forms.WEB_0F_page.SET_valuelists()
		
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
//		var editAllow = forms.WEB_0F_page.ACTION_edit_get()
		
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
	
	//record was not in memory, turn off busy bar and busy cursor
	if (recNotLoaded) {
		globals.TRIGGER_progressbar_stop()
		globals.CODE_cursor_busy(false)	
	}
	//changing record, finished turn off busy indicatar
	else if (busyIndicator) {
		globals.CODE_cursor_busy(false)	
	}
}

/**
 *
 * @properties={typeid:24,uuid:"CB9940A5-6AA6-4463-BB61-33DA0D5C4563"}
 */
function EDIT_on() {
	var prefix = 'sutra-block-data-'
	
	if (elements.bn_browser) {
		elements.bn_browser.executeJavaScript("editOn('" + prefix + "');")
	}
	else {
		globals.WEB_browser_error()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"7A6EFE48-21A4-4505-AF8F-1A683DF96BD4"}
 */
function URL_update(webMode) {
	//see forms.WEB_0F_page__design__buton_tab__content.VISIT_page
	
	if (!elements.bn_browser) {
		globals.WEB_browser_error()
	}
	
	//newly created page...show filler
	if (forms.WEB_0T_page._addRecord) {
		elements.bn_browser.html = '<html><body><h1>Newly created page</h1></body></html>'
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
//			plugins.dialogs.showInfoDialog('Coming soon...','Internal links can not be edited in real mode yet')
			var fsPage = databaseManager.getFoundSet('sutra_cms','web_page')
			fsPage.find()
			fsPage.id_page = page_link_internal
			var results = fsPage.search()
			
			if (results) {
				elements.bn_browser.html = '<html><body><h2>Internal link page</h2><p>Internal links cannot be edited in real mode.<br /> <a href="#" onclick="sendNSCommand(\'WEB_0T_page.SET_page\',' + fsPage.url_param + '); return false;">Click here</a> to visit and edit the "' + fsPage.page_name + '" page.</p></body></html>'
			}
			else {
				elements.bn_browser.html = '<html><body><h2>Internal link page</h2><p>The internal link this page references is not valid</p></body></html>'
			}
			
			return
		}
		//show version for selected platform-language-group combo
		else {
			var urlString = globals.WEB_MRKUP_link_page(id_page,null,'Edit',webMode)
			
			if (utils.hasRecords(forms.WEB_0F_page__design__header_display__platform._platform)) {
				urlString += "&platform=" + forms.WEB_0F_page__design__header_display__platform._platform.url_param
			}
			
			if (utils.hasRecords(forms.WEB_0F_page__design__header_display__language._language)) {
				urlString += "&language=" + forms.WEB_0F_page__design__header_display__language._language.url_param
			}
			
			if (utils.hasRecords(forms.WEB_0F_page__design__header_display__group._group)) {
				urlString += "&group=" + forms.WEB_0F_page__design__header_display__group._group.url_param
			}
			
			if (utils.hasRecords(forms.WEB_0F_page__design__content.foundset)) {
				urlString += "&version=" + forms.WEB_0F_page__design__content.url_param
			}
			
			globals.WEB_preview_url = urlString
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
	
	if (elements.bn_browser) {
		elements.bn_browser.executeJavaScript("editOff('" + prefix + "');")
	}
	else {
		globals.WEB_browser_error()
	}
	
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
	
	//entering page mode (only active version of block used)
	globals.WEB_block_page_mode = true	
	
	if (firstShow) {
		elements.bn_browser.navigateTo(globals.WEB_preview_url)
	}
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

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"1A00D0BD-4B72-4185-B038-44F2419A5D6E"}
 */
function FORM_on_hide(event) {
	//leaving page mode (only active version of block used)
	globals.WEB_block_page_mode = false	
	
	return true
}
