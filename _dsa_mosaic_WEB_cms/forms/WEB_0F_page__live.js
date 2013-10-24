/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f29"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"60C0F66F-9740-428F-8C64-BE5870650741"}
 */
function REC_on_select(event,webMode,skipLoad,verIndex,fireSelect) {
	//don't run on initial load of solution
	if (application.getApplicationType() != APPLICATION_TYPES.HEADLESS_CLIENT && globals.WEB_block_on_select) {

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
			if (record && navigationPrefs.byNavItemID[currentNavItem].navigationItem.initialRecord && !navigationPrefs.byNavItemID[currentNavItem].listData.visitedPKs[record[pkName]]) {
				var recNotLoaded = true

				//don't turn busy indicator on if it is already on
				if (!busyIndicator) {
					globals.CODE_cursor_busy(true)
				}
				globals.WEBc_sutra_trigger('TRIGGER_progressbar_start',[-273, navigationPrefs.byNavItemID[currentNavItem].navigationItem.initialRecordLabel])
			}

			//save currently selected index
			navigationPrefs.byNavItemID[currentNavItem].listData.index.selected = rowSelected

			//save time when pk of this record last accessed
			navigationPrefs.byNavItemID[currentNavItem].listData.visitedPKs[(forms[formName][pkName] != 'repositoryAPINotImplemented') ? forms[formName][pkName] : 0] = application.getServerTimeStamp()
		}

		//this method is the same as...
		var formName = 'WEB_0F_page__design'

		//when newly added page, skip this
		if (!forms[scopes.CMS.util.getTreeForm()]._addRecord) {
			//halt additional on select firing
	//		forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = true

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
					forms.WEB_0F_page__design_1F_version.foundset.setSelectedIndex(verIndex)
				}
				//there is info about the active version
				else if (activeInfo) {
					//set selected index
					forms.WEB_0F_page__design_1F_version.foundset.setSelectedIndex(activeInfo.position)

					//set version to be the active one
					globals.WEB_page_version = activeInfo.record.id_version
				}
				//set to first thing in  the list (most recent)
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
			forms.WEB_TB__web_mode.TOGGLE_resize(true)

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
			globals.WEBc_sutra_trigger('TRIGGER_progressbar_stop')
			globals.CODE_cursor_busy(false)
		}
		//changing record, finished turn off busy indicatar
		else if (busyIndicator) {
			globals.CODE_cursor_busy(false)
		}
	}
	//hit up headless client
	else {
		if (!elements.bn_browser) {
			globals.WEBc_browser_error()
		}
		else {
			elements.bn_browser.navigateTo(globals.WEBc_markup_link_page(id_page))
		}
	}
}

/**
 * @return {String}
 * @properties={typeid:24,uuid:"7A6EFE48-21A4-4505-AF8F-1A683DF96BD4"}
 * @AllowToRunInFind
 */
function URL_update(webMode) {
	//see forms.WEB_0F_page__design__buton_tab__content.VISIT_page

	var bodyText

	//newly created page...show filler
	if (forms[scopes.CMS.util.getTreeForm()]._addRecord) {
		bodyText = '<html><body><h1>Newly created page</h1></body></html>'
	}
	//go to page
	else {
		//this is an external link, navigate there
		if (page_type == 2 && page_link) {
//			//wc, show link
//			if (solutionPrefs.config.webClient) {
//				bodyText = '<html><body><h2>External link</h2><a href="' + page_link + '" target="_blank">' + page_link + '</a></body></html>'
//			}
//			//show actual page
//			else {
				globals.WEB_preview_url = page_link
//			}
		}
		//this is an internal link
		else if (page_type == 3) {
			//TODO: put wrapper "header" on page to alert that on an internal link
				//also, the version here is wrong, need to get for internal link
//			globals.WEB_preview_url =
//				globals.WEBc_markup_link_page(page_link_internal,null,'Edit',webMode) +
//				"&version=" + forms.WEB_0F_page__browser_1F_block__editor.url_param
//			globals.DIALOGS.showInfoDialog('Coming soon...','Internal links can not be edited in real mode yet')
			var fsPage = databaseManager.getFoundSet('sutra_cms','web_page')
			fsPage.find()
			fsPage.id_page = page_link_internal
			var results = fsPage.search()

			if (results) {
				bodyText = '<html><body><h2>Internal link page</h2><p>Internal links cannot be edited in real mode.<br /> <a href="#" onclick="sendNSCommand(\'WEB_0T_page.SET_page\',' + fsPage.url_param + '); return false;">Click here</a> to visit and edit the "' + fsPage.page_name + '" page.</p></body></html>'
			}
			else {
				bodyText = '<html><body><h2>Internal link page</h2><p>The internal link this page references is not valid</p></body></html>'
			}

			return
		}
		//show version for selected platform-language-group combo
		else if (utils.hasRecords(foundset)) {
			var pageIDs = id_page.toString()
			if (utils.hasRecords(forms.WEB_0F_page__design_1F__header_display_2F_language._language)) {
				pageIDs += '_' + forms.WEB_0F_page__design_1F__header_display_2F_language._language.id_language.toString()
			}
			var urlString = globals.WEBc_markup_link_page(pageIDs,null,'Edit',webMode)

			if (utils.hasRecords(forms.WEB_0F_page__design_1F__header_display_2F_platform._platform)) {
				urlString += "&platform=" + forms.WEB_0F_page__design_1F__header_display_2F_platform._platform.url_param
			}

			if (utils.hasRecords(forms.WEB_0F_page__design_1F__header_display_2F_language._language)) {
				urlString += "&language=" + forms.WEB_0F_page__design_1F__header_display_2F_language._language.url_param
			}

			if (utils.hasRecords(forms.WEB_0F_page__design_1F__header_display_2F_group._group)) {
				urlString += "&group=" + forms.WEB_0F_page__design_1F__header_display_2F_group._group.url_param
			}

			if (utils.hasRecords(forms.WEB_0F_page__design_1F_version.foundset)) {
				urlString += "&version=" + forms.WEB_0F_page__design_1F_version.url_param
			}

			globals.WEB_preview_url = urlString
		}
		//no records in the page foundset, replace out whatever is there with some placeholder text
		else {
			bodyText = 'No page created.'
		}

		forms.WEB_TB__web_mode.BREAD_update()

		/*	for debugging porpoises
		globals.CODE_clipboard_set(globals.WEB_preview_url)
		*/

	}
	return bodyText
}

/**
 * @param {String} idPKs Details about scope and block sutra-block-data-UUIDforSCOPE-UUIDforBLOCK
 *
 * @properties={typeid:24,uuid:"AE8C14E7-851C-475B-A830-A03AF6B7BFE3"}
 */
function BLOCK_edit(idPKs) {
	function convertUUID(item) {
		if (item) {
			return item.substr(0,8) + '-' + item.substr(8,4) + '-' + item.substr(12,4) + '-' + item.substr(16,4)  + '-' + item.substr(20,12)
		}
	}

	var unmangle = idPKs.split("-")
	var blockID = convertUUID(unmangle[1])
	var scopeID = convertUUID(unmangle[0])

	//only allow editing when scope (context) is known
	if (blockID && scopeID) {
		forms.WEB_0F_page__browser_1F_block__editor._dataID = blockID
		forms.WEB_0F_page__browser_1F_block__editor._scopeID = scopeID

		var content = databaseManager.getFoundSet(controller.getServerName(),"web_block")
		content.loadRecords(application.getUUID(blockID))

		//load correct record
		forms.WEB_0F_page__browser_1F_block__editor.foundset.loadRecords(content)

		//load in correct forms
		var statusBlock = forms.WEB_0F_page__browser_1F_block__editor.FORM_on_show()
	}

	//only show block edit if something successfully loaded in
	if (statusBlock) {
		SPLIT_set(true)
	}
	else {
		forms.WEB_0F_page__browser_1F_block__editor.ACTION_hide()
	}
}

/**
 * @param {String} idPKs Details about scope and block sutra-block-data-UUIDforSCOPE-UUIDforBLOCK
 *
 * @properties={typeid:24,uuid:"03F482F7-8B1C-4FBB-899A-488DBD994F1E"}
 * @AllowToRunInFind
 */
function BLOCK_delete(idPKs) {
	function convertUUID(item) {
		if (item) {
			return item.substr(0,8) + '-' + item.substr(8,4) + '-' + item.substr(12,4) + '-' + item.substr(16,4)  + '-' + item.substr(20,12)
		}
	}

	var unmangle = idPKs.split("-")
	var blockID = convertUUID(unmangle[1])
	var scopeID = convertUUID(unmangle[0])

	/** @type {JSFoundSet<db:/sutra_cms/web_scope>} */
	var fsScope = databaseManager.getFoundSet(controller.getServerName(),"web_scope")
	fsScope.loadRecords(application.getUUID(scopeID))

	//something to delete, prompt
	if (utils.hasRecords(fsScope)) {
		return forms.WEB_0F_page__design_1F_version_2L_scope.REC_delete(fsScope.getSelectedRecord())
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
}

/**
 *	Set the split screen to show appropriately
 * @properties={typeid:24,uuid:"E4B64C5C-7168-4FEF-B1F9-E48BEAE59238"}
 */
function SPLIT_set(editMode) {

	var editLocation = forms.WEB_0F_page__browser_1F_block__editor._editLocation

	//edit mode on
	if (editMode) {

	}
	//edit mode off
	else {

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
	SPLIT_set(false)
}

/**
 * @param {String} areaScope UUIDs for area and optionally scope and slot munged together
 *
 * @properties={typeid:24,uuid:"FE79BE16-34CC-4556-8485-B6F9211A87D2"}
 * @AllowToRunInFind
 */
function BLOCK_new(areaScope) {
	//show picker for type of block and create
	var newBlock = forms.WEB_0F_page__design_1F_version_2L_scope.BLOCK_new(areaScope)

	//add editor to the screen if new block not cancelled
	if (newBlock) {
		/** @type {JSFoundSet<db:/sutra_cms/web_scope>} */
		var fsScope = databaseManager.getFoundSet('db:/sutra_cms/web_scope')
		fsScope.find()
		fsScope.id_block = newBlock.id_block
		var results = fsScope.search()

		if (results == 1) {
			//flag that newly created
			forms.WEB_0F_page__browser_1F_block__editor._newBlock = true
			
			//if nothing editable, then nothing shown
			BLOCK_edit(utils.stringReplace(fsScope.id_scope.toString(),'-','') + '-' + utils.stringReplace(newBlock.id_block.toString(),'-',''))
		}
	}
	//resume edit mode
	else {
		//this is for smart-client only
		forms.WEB_0F_page__browser_1F_block__editor.ACTION_hide()
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
