/**
 * @properties={typeid:35,uuid:"1189E75A-806C-4FB7-A72F-9DA0DF73D1B7",variableType:-4}
 */
var _recPlatform = null;

/**
 * @properties={typeid:35,uuid:"CC26ACA4-3B56-44EC-B3D4-AE6A34325492"}
 */
var _idSitePlatform = 'null';

/**
 * @properties={typeid:35,uuid:"26090AA2-08B5-4C9B-BA39-F10CA9B8E602"}
 */
var _idSiteGroup = 'null';

/**
 * @properties={typeid:35,uuid:"25B01FDD-1E2F-4764-8B62-0A382867E26D"}
 */
var _idLayout = null;

/**
 * @properties={typeid:35,uuid:"06103F0C-DA58-4124-AC37-920F91CC8B01",variableType:-4}
 */
var _recGroup = null;

/**
 * @properties={typeid:35,uuid:"A75B46EF-6BDE-4485-8BCF-9C1F0949075C"}
 */
var _idTheme = null;

/**
 * @properties={typeid:35,uuid:"5DDBA9EB-080C-407B-A931-C5F5B495B88A",variableType:-4}
 */
var _recLanguage = null;

/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f58"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"2663ABEA-5268-43B2-B657-1575D5A41384",variableType:4}
 */
var _themeSet = null;

/**
 * @properties={typeid:35,uuid:"444198EB-FCF8-447C-86AF-681420811E77"}
 */
var _idSiteLanguage = '';

/**
 * @properties={typeid:35,uuid:"83AB2103-85F5-4138-B635-CBB0370DB1D8"}
 */
var _pageName = null;

/**
 *
 * @properties={typeid:24,uuid:"74D490E2-0E2D-4AA6-A808-8D64A2B7640C"}
 */
function TAB_display() {
	//go back a tab
	var formName = 'PRJ_0F_project'
	var buttonsName = formName + '__button_tab'
	
	//offset
	var tabA = 55
	var tabB = 223
	var offset = tabB - tabA + 5 //the # is the space between tab_header_detail
	
	//set new size of this tab panel
	forms[formName].elements.tab_header_detail.setSize(forms[formName].elements.tab_header_button.getWidth(),tabA)
	
	//go to display-only fields
	forms[formName].elements.tab_header_detail.tabIndex = 1
	
	//move/resize other tab panels
	forms[formName].elements.tab_main.setLocation(0,forms[formName].elements.tab_main.getLocationY() - offset)
	forms[formName].elements.tab_main.setSize(forms[formName].elements.tab_header_button.getWidth(),forms[formName].elements.tab_main.getHeight() + offset)
	
	//flip graphic
	forms[buttonsName].elements.btn_cancel.visible = false
	forms[buttonsName].elements.btn_edit.visible = true
}

/**
 *
 * @properties={typeid:24,uuid:"F8DAAD9D-EB39-47DB-95FA-577776E143A5"}
 */
function TAB_sec_actions() {
	globals.TAB_btn_actions_list(null,'tab_secondary')
}

/**
 *
 * @properties={typeid:24,uuid:"1873D4E8-3D03-4431-A4EB-75099CA8459B"}
 */
function TAB_sec_add() {
	globals.TAB_btn_rec_new(null,'tab_secondary')
}

/**
 *
 * @properties={typeid:24,uuid:"16873BD8-29ED-433A-A66F-AA9EEF7C5644"}
 */
function TAB_sec_change() {
	globals.TAB_change_grid(null,null,'tab_secondary','tab_s','btn_sec_add','btn_sec_actions','btn_sec_help')
}

/**
 * @properties={typeid:24,uuid:"FA2FEA2B-DF7F-4CB8-BBDF-6A0D7F8C9CA2"}
 */
function FORM_on_show(firstShow, event) {
	if (firstShow) {
		//turn off elements for non-page pages
		elements.fld_page_link_internal.visible = false
		elements.btn_page_link_internal.visible = false
		
		//turn off elements for new pages
		elements.lbl_platform.visible = false
		elements.var_idSitePlatform.visible = false
		elements.lbl_language.visible = false
		elements.var_idSiteLanguage.visible = false
		elements.lbl_group.visible = false
		elements.var_idSiteGroup.visible = false
	}
	
	//hide saving, please wait label
	elements.lbl_save_wait.visible = false
	
	TOGGLE_fields(page_type)
	
	//if we're not adding a record, make sure that the correct things are showing
	if (!forms.WEB_0T_page._addRecord) {
		//hook up related records to form variables
		var fsPlatform = databaseManager.getFoundSet('sutra_cms','web_platform')
		fsPlatform.find()
		fsPlatform.id_site_platform = globals.WEB_page_platform
		fsPlatform.id_page = id_page
		fsPlatform.search()
		_recPlatform = fsPlatform.getSelectedRecord()
		var fsLanguage = databaseManager.getFoundSet('sutra_cms','web_language')
		fsLanguage.find()
		fsLanguage.id_site_language = globals.WEB_page_language
		fsLanguage.id_page = id_page
		fsLanguage.search()
		_recLanguage = fsLanguage.getSelectedRecord()
		
		//punch in current values to other form variables
		_idLayout = _recPlatform.id_layout
		_idTheme = _recPlatform.id_theme
		_pageName = _recLanguage.page_name
		
		//if there is a theme set, populate layout valuelist
		if (_idTheme) {
			SET_valuelist_layout()
		}
	}
	//when adding a record, blow in defaults
	else {
		//null out for default
		_idLayout = null
		_idTheme = null
		_pageName = null
		
		//fill in platform defaults (default themes)
		_idSitePlatform = _siteDefaults.platform.id_site_platform
		if (utils.hasRecords(_siteDefaults.platform.web_site_platform_to_theme)) {
			//set theme
			_idTheme = _siteDefaults.platform.id_theme
			
			//set valuelist for default layout
			SET_valuelist_layout()
			
			//set layout
			if (utils.hasRecords(_siteDefaults.platform.web_site_platform_to_layout)) {
				_idLayout = _siteDefaults.platform.id_layout
			}
			
			//set flag that theme has been set and all areas should be blown in
			_themeSet = 1
		}
		
		//fill in language defaults (page name and seo)
		_idSiteLanguage = _siteDefaults.language.id_site_language
		
		//fill in group defaults (nothing now)
		_idSiteGroup = _siteDefaults.group.id_site_group
		
		//request focus in the page name field
		elements.var_pageName.requestFocus(false)
	}
}

/**
 * @properties={typeid:24,uuid:"CA3C8B9D-121C-41C4-8E43-DE25CD43BDA6"}
 */
function SET_valuelist_layout() {
	//grab the layouts for this platform
	var fsLayout = databaseManager.getFoundSet('sutra_cms','web_layout')
	fsLayout.find()
	fsLayout.id_theme = _idTheme
	var results = fsLayout.search()
	
	if (results) {
		fsLayout.sort('layout_name asc')
		var layoutNames = databaseManager.getFoundSetDataProviderAsArray(fsLayout,'layout_name')
		var layoutIDs = databaseManager.getFoundSetDataProviderAsArray(fsLayout,'id_layout')
	}
	else {
		var layoutNames = new Array()
		var layoutIDs = new Array()
	}
	
	//populate layout valuelist
	application.setValueListItems('WEB_layouts__by_theme_by_page',layoutNames,layoutIDs)
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"8E46EC6A-42C0-43CE-B855-F18446ACC32F"}
 */
function FLD_data_change__idTheme(oldValue, newValue, event) {
	SET_valuelist_layout()
	
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EB585F60-3597-44A6-AC80-E77B46CAE26E"}
 */
function ACTION_cancel() {
	//this will rollback and turn autoSave back on
	globals.WEB_simple_cancel()
	
	//MEMO: check WEB_P_page method too
	if (forms.WEB_0T_page._addRecord) {
		
		delete _siteDefaults
		_idSitePlatform = null
		_idSiteLanguage = null
		_idSiteGroup = null
		
		forms.WEB_0T_page._addRecord = null
		forms.WEB_0T_page._oldRecord = null
		
		//no page records, turn off ability to add a page
		if (!utils.hasRecords(forms.WEB_0F_site.web_site_to_page)) {
			globals.WEB_lock_workflow(true)
			forms.WEB_TB__web_mode.controller.enabled = false
			forms.WEB_TB__web_mode.elements.gfx_tool_left.enabled = true
			forms.WEB_TB__web_mode.elements.gfx_tool_center.enabled = true
			forms.WEB_TB__web_mode.elements.gfx_tool_right.enabled = true
		}
	}
	
	_themeSet = null
	
	//make sure correct stuff is showing
	TOGGLE_fields(page_type)
}

/**
 *
 * @properties={typeid:24,uuid:"2C217D68-302D-4F96-920E-E5145C9C19E9"}
 */
function ACTION_save() {
	//see forms.WEB_P_page.ACTION_ok
	
	//check for enough data
	if (!_pageName) {
		plugins.dialogs.showErrorDialog(
					"Error",
					"Page name is required"
				)
		return false
	}
	else if (page_type == 0  && !(_idTheme || _idLayout)) {
		plugins.dialogs.showErrorDialog(
					"Error",
					"Theme and layout are required"
				)
		return false
	}
	else if (page_type == 2 && !page_link) {
		plugins.dialogs.showErrorDialog(
					"Error",
					"Link is required"
				)
		return false
	}
	else if (page_type == 3 && !page_link_internal) {
		plugins.dialogs.showErrorDialog(
					"Error",
					"Page link is required"
				)
		return false
	}
	//all good, create/edit page
	else {
		globals.CODE_cursor_busy(true)
		
		//show label that this may take a while
		elements.lbl_save_wait.visible = true
		application.updateUI()
		
		//page was just created
		if (forms.WEB_0T_page._addRecord) {
			var pageRec = foundset.getSelectedRecord()
			
			//unfreeze screen when in frameworks
			if (application.__parent__.solutionPrefs && solutionPrefs.config.lockStatus) {
				globals.TRIGGER_interface_lock(false)
			}
			
			//turn on feedback indicator
			globals.TRIGGER_progressbar_start(null,'Creating new page...')
			
			//put this page in the correct place; there were other records
			if (forms.WEB_0T_page._oldRecord) {
				
				//find current syblings
				var fsPeers = databaseManager.getFoundSet('sutra_cms','web_page')
				fsPeers.loadRecords(forms.WEB_0T_page._oldRecord)
				
				var oldRecord = fsPeers.getSelectedRecord()
				
				fsPeers.find()
				fsPeers.parent_id_page = (oldRecord.parent_id_page) ? oldRecord.parent_id_page : '^='
				fsPeers.id_site = oldRecord.id_site
				var results = fsPeers.search()
				
				if (results) {
					fsPeers.sort('order_by asc')
					fsPeers.selectRecord(oldRecord.id_page)
				}
				
				//re-order everybody below current record in old foundset
				for (var i = oldRecord.order_by + 1; i <= fsPeers.getSize(); i++) {
					var recReorder = fsPeers.getRecord(i)
					
					recReorder.order_by ++
				}
				
				//non-top level record
				if (oldRecord.parent_id_page) {
					pageRec.parent_id_page = oldRecord.parent_id_page
					pageRec.order_by = oldRecord.order_by + 1
				}
				//top level record
				else {
					pageRec.order_by = oldRecord.order_by + 1
					
					var treeReload = true
				}
			}
			//this is the first record
			else {
				pageRec.order_by = 1
				
				var treeReload = true
			}
			
			//create platform record (theme and layout)
			var platformRec = pageRec.web_page_to_platform.getRecord(pageRec.web_page_to_platform.newRecord(false,true))
			platformRec.id_site_platform = _idSitePlatform
			platformRec.id_theme = _idTheme
			platformRec.id_layout = _idLayout
			
			//create language record (page name and seo)
			var languageRec = pageRec.web_page_to_language.getRecord(pageRec.web_page_to_language.newRecord(false,true))
			languageRec.id_site_language = _idSiteLanguage
			languageRec.page_name = _pageName
			
			//create group record (nothing now)
			var groupRec = pageRec.web_page_to_group.getRecord(pageRec.web_page_to_group.newRecord(false,true))
			groupRec.id_site_group = _idSiteGroup
			
			//create 1st version for this triumvirate
			var fsVersion = forms.WEB_0F_page__design_1F_version.foundset
			fsVersion.clear()
			var newVersion = fsVersion.getRecord(fsVersion.newRecord(false,true))
			newVersion.id_platform = platformRec.id_platform
			newVersion.id_language = languageRec.id_language
			newVersion.id_group = groupRec.id_group
			newVersion.version_number = 1
			newVersion.flag_active = 1
			newVersion.version_name = 'Initial version'
			globals.WEB_page_version = newVersion.id_version
			
			var fsPath = databaseManager.getFoundSet('sutra_cms','web_path')
			var siteID = id_site
			
			//add in path for this page
			var pathNameWanted = languageRec.page_name || 'untitled-page'
			pathNameWanted = pathNameWanted.toLowerCase()
			pathNameWanted = utils.stringReplace(pathNameWanted, ' ', '-')
			
			var pathName = pathNameWanted
			var cnt = 1	
			
			//we need to get into the loop
			results = null
			
			while (results != 0) {
				fsPath.find()
				fsPath.id_site = siteID
				fsPath.path = pathName
				var results = fsPath.search()
				
				if (results) {
					pathName = pathNameWanted + cnt++
				}
			}
			
			var recPath = languageRec.web_language_to_path.getRecord(languageRec.web_language_to_path.newRecord(false,true))
			recPath.flag_default = 1
			recPath.path = pathName
			recPath.id_site = siteID
			recPath.id_page = pageRec.id_page
			
			databaseManager.saveData()
			databaseManager.setAutoSave(true)
			
			//a full reload required
			if (treeReload) {
				forms.WEB_0T_page.TREE_refresh()
			}
			
			//commented out to get rid of flickering to correct record and then landing on incorrect record
//			forms.WEB_0T_page.elements.bean_tree.refresh()
//			forms.WEB_0T_page.elements.bean_tree.selectionPath = forms.WEB_0T_page.FIND_path(pageRec)
//			forms.WEB_0T_page.REC_on_select(pageRec.id_page)
			
			//reset flags
			var addedRecord = true
			forms.WEB_0T_page._addRecord = null
			delete _siteDefaults
			
			//update 3 globals used to control everything (done on new page creation so that what you just created is visible)
			globals.WEB_page_platform = _idSitePlatform
			globals.WEB_page_language = _idSiteLanguage
			globals.WEB_page_group = _idSiteGroup
			
			//refresh this newly created record if it is the first one (some issue with the calcs getting fired)
			databaseManager.recalculate(pageRec)
		}
		
		//MEMO: check WEB_P_page method too
		if (_themeSet) {
			//don't prompt if creating page
			if (addedRecord) {
				var input = "Yes"
			}
			//prompt
			else {
				globals.CODE_cursor_busy(false)
				var input = plugins.dialogs.showWarningDialog(
								"Warning",
								"New theme layout selected. All area records that\ndo not exist in the new theme will be deleted.\nContinue?", 
								"Yes", 
								"No"
							)
				globals.CODE_cursor_busy(true)
				
			}
	
			if ( input != "Yes") {
				globals.CODE_cursor_busy(false)
				return false
			}
			
			//theme changes for non-newly created record
			if (!addedRecord) {
				//get most recent and selected versions
				var fsVersion = forms.WEB_0F_page__design_1F_version.foundset
				var latestVersion = fsVersion.getRecord(1)
				var selectedVersion = fsVersion.getSelectedRecord()
				
				var descriptor ='Theme/layout change.\n' +
								'From: ' + application.getValueListDisplayValue('WEB_themes',selectedVersion.web_version_to_platform.id_theme) + '/' + application.getValueListDisplayValue('WEB_layouts',selectedVersion.web_version_to_platform.id_layout) + '\n' +
								'To: ' + application.getValueListDisplayValue('WEB_themes',_idTheme) + '/' + application.getValueListDisplayValue('WEB_layouts',_idLayout) + '\n'
				
				var platformRec = _recPlatform
				
				//punch down data
				_recPlatform.id_theme = _idTheme
				_recPlatform.id_layout = _idLayout
				
				//halt additional on select firing
				forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = true
				
				//create new version
				var newVersion = fsVersion.getRecord(fsVersion.newRecord(1,true))
				newVersion.id_platform = selectedVersion.id_platform
				newVersion.id_language = selectedVersion.id_language
				newVersion.id_group = selectedVersion.id_group
				newVersion.version_number = latestVersion.version_number + 1
				newVersion.version_description = descriptor
				globals.WEB_page_version = newVersion.id_version
				
				//allow additional on select firing
				forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = false
			}
			
			// get editable regions based on layout selected
			if (!utils.hasRecords(platformRec,'web_platform_to_layout.web_layout_to_editable')) {
				globals.CODE_cursor_busy(false)
				return 'No editables for selected layout'
			}
			
			var layout = platformRec.web_platform_to_layout.getSelectedRecord()
			
			if (selectedVersion) {
				var oldAreas = databaseManager.getFoundSetDataProviderAsArray(selectedVersion.web_version_to_area,'area_name')
			}
			else {
				var oldAreas = new Array()
			}
			
			//create all areas for this layout, copying over existing content based on area name
			for (var i = 1; i <= layout.web_layout_to_editable.getSize(); i++) {
				//new area to create
				var editable =  layout.web_layout_to_editable.getRecord(i)
				//this area existed in the theme we were copying from
				var oldAreaSameName = oldAreas.indexOf(editable.editable_name)
				
				//create from defaults for area
				if (oldAreaSameName == -1) {
					var newArea = forms.WEB_0F_page__design_1F__header_display__version.AREA_new(editable,newVersion,i)
				}
				//copy from chosen version
				else {
					var newArea = forms.WEB_0F_page__design_1F__header_display__version.AREA_copy(selectedVersion.web_version_to_area.getRecord(oldAreaSameName + 1),newVersion,i)
				}
				
				//make sure that selected index doesn't move around so much
				newArea.web_area_to_scope.setSelectedIndex(1)
			}
			
			// finish up
			databaseManager.saveData()
			
			if (newVersion) {
				newVersion.web_version_to_area.setSelectedIndex(1)
			}
			
			//theme has been successfully set
			_themeSet = null
		}
		
		forms.WEB_0F_page__design.REC_on_select(true,true,1)
		
		//turn off feedback indicator if on
		if (globals.TRIGGER_progressbar_get() instanceof Array) {
			if (globals.TRIGGER_progressbar_get()[1] == 'Creating new page...') {
				globals.TRIGGER_progressbar_stop()
			}
		}
		
		//hide label that this may take a while
		elements.lbl_save_wait.visible = false
		globals.CODE_cursor_busy(false)
		
		return true
	}
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"E7499053-E6AA-4FE2-801E-147C6EC9B661"}
 */
function FLD_data_change__pageName(oldValue, newValue, event) {
	//if this is a newly created record, no need to save anything
	if (!forms.WEB_0T_page._addRecord) {
		_recLanguage.page_name = newValue
	}
	
	return true
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean} valid value
 *
 * @properties={typeid:24,uuid:"5EB85F2D-6D13-4392-9A96-A8CAA31808F2"}
 */
function FLD_data_change__page_type(oldValue, newValue, event) {
	//turn things off/on
	TOGGLE_fields(newValue)
	
	return true
}

/**
 *
 * @properties={typeid:24,uuid:"6AC3202B-F934-4E51-9AF4-866A7F3A5B6C"}
 */
function TOGGLE_fields(pageType) {
	//turn off elements for new pages
	elements.lbl_platform.visible = false
	elements.var_idSitePlatform.visible = false
	elements.lbl_language.visible = false
	elements.var_idSiteLanguage.visible = false
	elements.lbl_group.visible = false
	elements.var_idSiteGroup.visible = false
	elements.lbl_flag_folder_children.visible = false
	elements.fld_flag_folder_children.visible = false
	
	//passed a number, grab word
	if (utils.stringToNumber(pageType) == pageType) {
		pageType = application.getValueListDisplayValue('WEB_page_type',pageType)
	}
	
	var linkHeader = forms.WEB_0F_page__design_1F__header_display.elements.lbl_link
	var folderHeader = forms.WEB_0F_page__design_1F__header_display.elements.lbl_folder	
	linkHeader.visible = false
	folderHeader.visible = false
	
	var page = false
	var link = false
	var linkInternal = false
	
	var headerText = ''
	var headerToolTip = ''
	
	switch (pageType) {
		//we've got a page
		case 'Page':
			var page = true
			var link = false
			break
		case 'External link':
			var page = false
			var link = true
			linkHeader.visible = true
			
			if (page_link) {
				headerText = page_link
				headerToolTip = 'Click to open "' + page_link + '" in a browser'
			}
			
			break
		case 'Internal link':
			var page = false
			var link = false
			var linkInternal = true
			linkHeader.visible = true
			
			if (page_link_internal) {
				headerText = application.getValueListDisplayValue('WEB_pages',page_link_internal)
				headerToolTip = 'Click to open internal page "' + headerText + '" in a browser'
			}
			
			break
		case 'Folder':
			var page = false
			var link = false
			folderHeader.visible = true
			
			elements.lbl_flag_folder_children.visible = true
			elements.fld_flag_folder_children.visible = true
			break
		case 'Page invalid':
			var pageHide = true
			break
	}
	
	linkHeader.text = headerText
	linkHeader.toolTipText = headerToolTip
	
	if ( utils.hasRecords(foundset) ) {
		//show new page fields when adding a new record
		var newPage = (forms.WEB_0T_page._addRecord && page) ? true : false
		
		elements.lbl_platform.visible = newPage
		elements.var_idSitePlatform.visible = newPage
		elements.lbl_language.visible = newPage
		elements.var_idSiteLanguage.visible = newPage
		elements.lbl_group.visible = newPage
		elements.var_idSiteGroup.visible = newPage
		
		elements.lbl_idTheme.visible = page
		elements.var_idTheme.visible = page
		elements.lbl_idLayout.visible = page
		elements.var_idLayout.visible = page
		elements.lbl_page_link.visible = link || linkInternal
		elements.fld_page_link.visible = link
		
		elements.fld_page_link_internal.visible = linkInternal
		elements.btn_page_link_internal.visible = linkInternal
	}

	
	//when on content tab, switch as needed
	if (forms.WEB_0F_page__design_1F__button_tab.elements.tab_button.tabIndex == 1) {
		//folder or link type of page or just creating a new record
		if (!page || forms.WEB_0T_page._addRecord || pageHide) {
			forms.WEB_0F_page__design.elements.tab_main.tabIndex = 4
		}
		//normal type of page
		else {
			forms.WEB_0F_page__design_1F__button_tab.TAB_change('WEB_0F_page__design_1F__button_tab','tab_b1')
		}
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B3FEA49F-D80F-4DE4-9CC7-B4491F7BED84"}
 */
function PAGE_picker(event) {
	if (event instanceof JSEvent) {
		globals.WEB_page_tree_to_popup(PAGE_picker,elements[event.getElementName()])
	}
	else {
		page_link_internal = event
	}
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean} valid value
 *
 * @properties={typeid:24,uuid:"97DEA334-AEAC-43AC-BB85-0D796AB05318"}
 */
function FLD_data_change__idLayout(oldValue, newValue, event) {
	//if this is a newly created record, no need to save anything
	if (!forms.WEB_0T_page._addRecord) {
		//different value than before and old value existed (not selecting for first time)
		if (_recPlatform.id_layout != newValue) {
			_themeSet = 1
		}
		else {
			_themeSet = 0
		}
	}
	//no default specified on site_platform record and changed
	else {
		_themeSet = 1
	}
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"23F9EBE0-F71A-4544-B415-774181AD82E7"}
 */
function FLD_data_change__idSitePlatform(oldValue, newValue, event) {
	// this is a newly created record
	if (forms.WEB_0T_page._addRecord) {
		var fsPlatform = databaseManager.getFoundSet('sutra_cms','web_site_platform')
		fsPlatform.find()
		fsPlatform.id_site_platform = newValue
		fsPlatform.search()
		
		var platformRec = fsPlatform.getRecord(1)
	}
	//record already exists
	else {
		var platformRec = web_page_to_platform.web_platform_to_site_platform
	}
	
	//flip default layout and theme to the default for this platform
	_idTheme = platformRec.id_theme
	_idLayout = platformRec.id_layout
	
	return true
}
