/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f58"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"1189E75A-806C-4FB7-A72F-9DA0DF73D1B7",variableType:-4}
 */
var _recPlatform = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"CC26ACA4-3B56-44EC-B3D4-AE6A34325492"}
 */
var _idSitePlatform = 'null';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"26090AA2-08B5-4C9B-BA39-F10CA9B8E602"}
 */
var _idSiteGroup = 'null';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"25B01FDD-1E2F-4764-8B62-0A382867E26D"}
 */
var _idLayout = null;

/**
 * @properties={typeid:35,uuid:"06103F0C-DA58-4124-AC37-920F91CC8B01",variableType:-4}
 */
var _recGroup = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A75B46EF-6BDE-4485-8BCF-9C1F0949075C"}
 */
var _idTheme = null;

/**
 * @properties={typeid:35,uuid:"5DDBA9EB-080C-407B-A931-C5F5B495B88A",variableType:-4}
 */
var _recLanguage = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"2663ABEA-5268-43B2-B657-1575D5A41384",variableType:4}
 */
var _themeSet = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"444198EB-FCF8-447C-86AF-681420811E77"}
 */
var _idSiteLanguage = '';

/**
 * @type {String}
 *
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
 * @AllowToRunInFind
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
	if (!forms[scopes.CMS.util.getTreeForm()]._addRecord) {
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
		_idLayout = forms.WEB_0F_page__design_1F_version.id_layout
		_idTheme = forms.WEB_0F_page__design_1F_version.id_theme
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
 * @AllowToRunInFind
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
	_idLayout = null

	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EB585F60-3597-44A6-AC80-E77B46CAE26E"}
 * @AllowToRunInFind
 */
function ACTION_cancel() {
	//this will rollback and turn autoSave back on
	REC_new()

	//MEMO: check WEB_P_page method too
	if (forms[scopes.CMS.util.getTreeForm()]._addRecord) {
		var oldRec = forms[scopes.CMS.util.getTreeForm()]._oldRecord

		delete _siteDefaults
		_idSitePlatform = null
		_idSiteLanguage = null
		_idSiteGroup = null

		forms[scopes.CMS.util.getTreeForm()]._addRecord = null
		forms[scopes.CMS.util.getTreeForm()]._oldRecord = null

		//no page records, turn off ability to add a page
		if (!utils.hasRecords(forms.WEB_0F_site.web_site_to_page)) {
			globals.WEB_lock_workflow(true)
			forms.WEB_TB__web_mode.controller.enabled = false
		}
	}

	_themeSet = null

	//reselect last selected record
	if (oldRec) {
		if (forms.WEB_0F_page.foundset.find()) {
			forms.WEB_0F_page.foundset.id_page = oldRec
			var results = forms.WEB_0F_page.foundset.search()
		}
	}

	//make sure correct stuff is showing
	TOGGLE_fields(page_type)
}

/**
 *
 * @properties={typeid:24,uuid:"2C217D68-302D-4F96-920E-E5145C9C19E9"}
 * @AllowToRunInFind
 */
function ACTION_save() {
	//see forms.WEB_P_page.ACTION_ok
	var newRec = forms[scopes.CMS.util.getTreeForm()]._addRecord

	//check for enough data
	if (!_pageName) {
		globals.DIALOGS.showErrorDialog(
					"Error",
					"Page name is required"
				)
		return false
	}
	else if (page_type == 0 && !(_idTheme && _idLayout)) {
		globals.DIALOGS.showErrorDialog(
					"Error",
					"Theme and layout are required"
				)
		return false
	}
	else if (page_type == 2 && !page_link) {
		globals.DIALOGS.showErrorDialog(
					"Error",
					"Link is required"
				)
		return false
	}
	else if (page_type == 3 && !page_link_internal) {
		globals.DIALOGS.showErrorDialog(
					"Error",
					"Page link is required"
				)
		return false
	}
	//all good, create/edit page
	else {
		globals.CODE_cursor_busy(true)

		//show label that this may take a while
		if (newRec || _themeSet) {
			elements.lbl_save_wait.visible = true
			application.updateUI()
		}

		//page was just created
		if (forms[scopes.CMS.util.getTreeForm()]._addRecord) {
			var pageRec = foundset.getSelectedRecord()

			//unfreeze screen when in frameworks
			if (application.__parent__.solutionPrefs && solutionPrefs.config.lockStatus) {
				globals.WEBc_sutra_trigger('TRIGGER_interface_lock',[false])
			}

			//turn on feedback indicator
			globals.WEBc_sutra_trigger('TRIGGER_progressbar_start',[null,'Creating new page...'])

			//put this page in the correct place; there were other records
			if (forms[scopes.CMS.util.getTreeForm()]._oldRecord) {

				//find current syblings
				var fsPeers = databaseManager.getFoundSet('sutra_cms','web_page')
				fsPeers.loadRecords(forms[scopes.CMS.util.getTreeForm()]._oldRecord)

				var oldRecord = fsPeers.getSelectedRecord()

				fsPeers.find()
				fsPeers.parent_id_page = forms[scopes.CMS.util.getTreeForm()]._makeChild ? oldRecord.id_page : (oldRecord.parent_id_page) ? oldRecord.parent_id_page : '^='
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
				if (forms[scopes.CMS.util.getTreeForm()]._makeChild || oldRecord.parent_id_page) {
					pageRec.parent_id_page = forms[scopes.CMS.util.getTreeForm()]._makeChild ? oldRecord.id_page : (oldRecord.parent_id_page)
					pageRec.order_by = fsPeers.getSize() + 1
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

				treeReload = true
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

			globals.WEBc_log_create('page','page add',forms.WEB_0F_page.id_site,'web_page',forms.WEB_0F_page.id_page)

			var fsPath = databaseManager.getFoundSet('sutra_cms','web_path')
			var siteID = id_site

			//add in path for this page
			var pathNameWanted = languageRec.page_name || 'untitled-page'
			pathNameWanted = pathNameWanted.toLowerCase()
			pathNameWanted = pathNameWanted.replace(/[^\w-]/gi, '-')
			//replace two consecutive dashes with one
			while (utils.stringPatternCount(pathNameWanted,'--')) {
				pathNameWanted = utils.stringReplace(pathNameWanted, '--', '-')
			}
			//special case to never finish with a '-'
			if (pathNameWanted.indexOf('-',pathNameWanted.length - 1) != -1) {
				pathNameWanted = utils.stringLeft(pathNameWanted,pathNameWanted.length-1)
			}

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
				forms[scopes.CMS.util.getTreeForm()].TREE_refresh()
			}

			//select this new record
			forms[scopes.CMS.util.getTreeForm()].elements.bean_tree.refresh()
			application.updateUI()
			//same level as before
			if (true) {
				forms[scopes.CMS.util.getTreeForm()].elements.bean_tree.selectionPath = forms[scopes.CMS.util.getTreeForm()].FIND_path(pageRec)
			}
			//different level
			else {
				forms[scopes.CMS.util.getTreeForm()].REC_on_select(pageRec.id_page)
			}

			//reset flags
			var addedRecord = true
			forms[scopes.CMS.util.getTreeForm()]._addRecord = null
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
				var input = globals.DIALOGS.showWarningDialog(
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

				//punch down theme change data
				newVersion.id_theme = _idTheme
				newVersion.id_layout = _idLayout

				globals.WEBc_log_create('page','page version add',forms.WEB_0F_page.id_site,'web_page',forms.WEB_0F_page.id_page,'web_version',newVersion.id_version)

				//load version foundset onto properties tab
				forms.WEB_0F_page__design_1F__properties_2L_version.foundset.loadRecords(fsVersion)

				//allow additional on select firing
				forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = false
			}

			// get editable regions based on layout selected
			if (!utils.hasRecords(newVersion,'web_version_to_layout.web_layout_to_editable')) {
				globals.CODE_cursor_busy(false)
				application.output('No editables for selected layout')
			}

			var layout = newVersion.web_version_to_layout.getSelectedRecord()

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

				//todo track areas as created so can delete as needed

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
		if (globals.WEBc_sutra_trigger('TRIGGER_progressbar_get') instanceof Array) {
			if (globals.WEBc_sutra_trigger('TRIGGER_progressbar_get')[1] == 'Creating new page...') {
				globals.WEBc_sutra_trigger('TRIGGER_progressbar_stop')
			}
		}

		//hide label that this may take a while
		elements.lbl_save_wait.visible = false
		globals.CODE_cursor_busy(false)
	}

	//we got this far...everything ok
	var parentForm = 'WEB_0F_page__design'

	//get offset from forms
	var tabA = (forms[parentForm].TAB_header_size) ? forms[parentForm].TAB_header_size('A') : 40
	var tabB = (forms[parentForm].TAB_header_size) ? forms[parentForm].TAB_header_size('B') :  250
	var offset = tabB - tabA - ((forms[parentForm].TAB_header_size) ? forms[parentForm].TAB_header_size('space') : 10)

	//set new size of this tab panel
	forms[parentForm].elements.tab_header_detail.setSize(forms[parentForm].elements.tab_header_button.getWidth(),tabA)

	//go to display-only fields
	forms[parentForm].elements.tab_header_detail.tabIndex = 1

	//move/resize other tab panels
	forms[parentForm].elements.tab_main.setLocation(0,forms[parentForm].elements.tab_main.getLocationY() - offset)
	forms[parentForm].elements.tab_main.setSize(forms[parentForm].elements.tab_header_button.getWidth(),forms[parentForm].elements.tab_main.getHeight() + offset)

	//flip graphic
	forms[parentForm + '_1F__button_tab'].elements.btn_cancel.visible = false
	forms[parentForm + '_1F__button_tab'].elements.btn_edit.visible = false
	forms[parentForm + '_1F__button_tab__dev'].elements.btn_cancel.visible = false
	forms[parentForm + '_1F__button_tab__dev'].elements.btn_edit.visible = false

	//for new record, save and exit edit mode
	if (newRec) {
		//save outstanding data
		databaseManager.saveData()

		//turn autosave back on
		databaseManager.setAutoSave(true)

		//unfreeze screen if locked
		if (solutionPrefs.config.lockStatus) {
			globals.WEBc_sutra_trigger('TRIGGER_interface_lock',[false])
		}

		//hack to re-lock up the page screen
		if (solutionPrefs.config.currentFormName == 'WEB_0F_page') {
			forms.WEB_A__page.TOGGLE_edit_mode(false)
		}
	}

	if (forms[parentForm] && forms[parentForm].elements.gfx_curtain) {
		forms[parentForm].elements.gfx_curtain.visible = false
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
	if (!forms[scopes.CMS.util.getTreeForm()]._addRecord) {
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
	//turn off elements for non-page pages
	elements.fld_page_link_internal.visible = false
	elements.btn_page_link_internal.visible = false
	elements.lbl_flag_folder_children.visible = false
	elements.fld_flag_folder_children.visible = false
	
	//turn off elements for new pages
	elements.lbl_platform.visible = false
	elements.var_idSitePlatform.visible = false
	globals.CMSb.propCheck(elements.var_idSitePlatform__outline,'visible',false)
	elements.lbl_language.visible = false
	elements.var_idSiteLanguage.visible = false
	globals.CMSb.propCheck(elements.var_idSiteLanguage__outline,'visible',false)
	elements.lbl_group.visible = false
	elements.var_idSiteGroup.visible = false
	globals.CMSb.propCheck(elements.var_idSiteGroup__outline,'visible',false)
	
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
		var newPage = (forms[scopes.CMS.util.getTreeForm()]._addRecord && page) ? true : false
		var newCancel = (forms[scopes.CMS.util.getTreeForm()]._addRecord) ? true : false

		elements.lbl_platform.visible = newPage
		elements.var_idSitePlatform.visible = newPage
		elements.lbl_language.visible = newPage
		elements.var_idSiteLanguage.visible = newPage
		elements.lbl_group.visible = newPage
		elements.var_idSiteGroup.visible = newPage
		globals.CMSb.propCheck(elements.var_idSitePlatform__outline,'visible',newPage)
		globals.CMSb.propCheck(elements.var_idSiteLanguage__outline,'visible',newPage)
		globals.CMSb.propCheck(elements.var_idSiteGroup__outline,'visible',newPage)

		//only allow to cancel for new page
		if (application.getApplicationType() != APPLICATION_TYPES.WEB_CLIENT) {
			elements.lbl_cancel.visible = newCancel
		}
		elements.btn_cancel.visible = newCancel

		elements.lbl_idTheme.visible = page
		elements.var_idTheme.visible = page
		elements.lbl_idLayout.visible = page
		elements.var_idLayout.visible = page
		elements.lbl_page_link.visible = link || linkInternal
		elements.fld_page_link.visible = link
		globals.CMSb.propCheck(elements.var_idTheme__outline,'visible',page)
		globals.CMSb.propCheck(elements.var_idLayout__outline,'visible',page)
		
		elements.fld_page_link_internal.visible = linkInternal
		elements.btn_page_link_internal.visible = linkInternal
	}


	//when on content tab, switch as needed
	if (forms.WEB_0F_page__design.elements.tab_header_button.tabIndex == 2) {
		//folder or link type of page or just creating a new record
		if (!page || forms[scopes.CMS.util.getTreeForm()]._addRecord || pageHide) {
			forms.WEB_0F_page__design.elements.tab_main.tabIndex = 4
		}
		//normal type of page
		else {
			forms.WEB_0F_page__design.elements.tab_main.tabIndex = 5
		}
	}
}

/**
 * @properties={typeid:24,uuid:"1BA7A61D-B6D4-4BDB-B756-3FD989B0EDB5"}
 */
function REC_new() {
	var formName = 'WEB_0F_page__design'

	//get offset from forms
	var tabA = (forms[formName].TAB_header_size) ? forms[formName].TAB_header_size('A') : 40
	var tabB = (forms[formName].TAB_header_size) ? forms[formName].TAB_header_size('B') :  250
	var offset = tabB - tabA - ((forms[formName].TAB_header_size) ? forms[formName].TAB_header_size('space') : 10)

	//only go to edit if currently on display
	if (forms[formName].elements.tab_header_detail.tabIndex != 2) {
		//allowed to roll-down header area?
			//MEMO: this global method only used on pages screen; so modifcations ok
		if (!forms[scopes.CMS.util.getTreeForm()]._addRecord && forms.WEB_0F_page.page_type == 0 && !utils.hasRecords(forms.WEB_0F_page__design_1F_version.foundset)) {
			globals.DIALOGS.showQuestionDialog(
						'Error',
						'No version selected'
				)
			return
		}

		//turn autosave off
		databaseManager.setAutoSave(false)

		//set new size of this tab panel
		forms[formName].elements.tab_header_detail.setSize(forms[formName].elements.tab_header_button.getWidth(),tabB)

		//go to editable fields
		forms[formName].elements.tab_header_detail.tabIndex = 2

		//move/resize other tab panels
		forms[formName].elements.tab_main.setLocation(0,forms[formName].elements.tab_main.getLocationY() + offset)
		forms[formName].elements.tab_main.setSize(forms[formName].elements.tab_header_button.getWidth(),forms[formName].elements.tab_main.getHeight() - offset)

		//flip graphic
		forms.WEB_0F_page__design_1F__button_tab.elements.btn_cancel.visible = true
		forms.WEB_0F_page__design_1F__button_tab__dev.elements.btn_cancel.visible = true
		forms.WEB_0F_page__design_1F__button_tab.elements.btn_edit.visible = false
		forms.WEB_0F_page__design_1F__button_tab__dev.elements.btn_edit.visible = false

		//freeze screen
		globals.WEBc_sutra_trigger('TRIGGER_interface_lock',[true])

		if (forms[formName] && forms[formName].elements.gfx_curtain) {
			forms[formName].elements.gfx_curtain.visible = true
		}
	}
	//prompt to cancel current edits
	else {

	//	var answer = globals.DIALOGS.showWarningDialog(
	//							'Cancel?',
	//							'Cancel all header edits?',
	//							'Yes',
	//							'No'
	//						)

		if (true) {//answer == 'Yes') {
			//rollback edited records
			databaseManager.rollbackEditedRecords()

			//turn autosave back on
			databaseManager.setAutoSave(true)

			//set new size of this tab panel
			forms[formName].elements.tab_header_detail.setSize(forms[formName].elements.tab_header_button.getWidth(),tabA)

			//go to display-only fields
			forms[formName].elements.tab_header_detail.tabIndex = 1

			//move/resize other tab panels
			forms[formName].elements.tab_main.setLocation(0,forms[formName].elements.tab_main.getLocationY() - offset)
			forms[formName].elements.tab_main.setSize(forms[formName].elements.tab_header_button.getWidth(),forms[formName].elements.tab_main.getHeight() + offset)

			//flip graphic
			forms.WEB_0F_page__design_1F__button_tab.elements.btn_cancel.visible = false
			forms.WEB_0F_page__design_1F__button_tab__dev.elements.btn_cancel.visible = false
//			forms.WEB_0F_page__design_1F__button_tab.elements.btn_edit.visible = true

			//unfreeze screen
			if (solutionPrefs.config.lockStatus) {
				globals.WEBc_sutra_trigger('TRIGGER_interface_lock',[false])
			}

			//hack to re-lock up the page screen
			if (solutionPrefs.config.currentFormName == 'WEB_0F_page') {
				forms.WEB_A__page.TOGGLE_edit_mode(false)
			}

			if (forms[formName] && forms[formName].elements.gfx_curtain) {
				forms[formName].elements.gfx_curtain.visible = false
			}
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
		globals.WEBc_page_picker(PAGE_picker,elements[event.getElementName()])
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
	if (!forms[scopes.CMS.util.getTreeForm()]._addRecord) {
		//different value than before and old value existed (not selecting for first time)
		if (forms.WEB_0F_page__design_1F_version.id_layout != newValue) {
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
 * @AllowToRunInFind
 */
function FLD_data_change__idSitePlatform(oldValue, newValue, event) {
	// this is a newly created record
	if (forms[scopes.CMS.util.getTreeForm()]._addRecord) {
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

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"58D20BFD-5CC0-44E6-8EE5-8AC127C69DD4"}
 */
function FORM_on_load(event) {
	if (application.getApplicationType() != APPLICATION_TYPES.WEB_CLIENT) {
		elements.btn_cancel.setSize(elements.btn_cancel.getWidth(),elements.btn_cancel.getHeight() - 2)
		elements.btn_cancel.imageURL = 'media:///btn_standard.png'
		elements.btn_cancel.rolloverImageURL = 'media:///btn_standard_dark.png'
		elements.btn_cancel.text = null
		elements.lbl_cancel.visible = true

		elements.btn_ok.setSize(elements.btn_ok.getWidth(),elements.btn_ok.getHeight() - 2)
		elements.btn_ok.imageURL = 'media:///btn_standard.png'
		elements.btn_ok.rolloverImageURL = 'media:///btn_standard_dark.png'
		elements.btn_ok.text = null
		elements.lbl_ok.visible = true
	}
}
