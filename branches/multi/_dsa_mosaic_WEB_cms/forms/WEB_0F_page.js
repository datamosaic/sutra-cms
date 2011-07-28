/**
 * @properties={typeid:35,uuid:"BA09B348-4B82-45BC-9ABB-BBC73E3CC672",variableType:-4}
 */
var _loadFilters = true;

/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f28"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"F1DF07A7-B3D8-4A8B-A4CF-9CB5A79A5D1D"}
 */
function TRIGGER_mode_set(mode) {
	if (mode) {
		switch (mode) {
			case "DESIGN":	
				//custom block editor loaded on browser form, remove
				if (forms.WEB_0F_page__browser.elements.tab_editor.getMaxTabIndex() && (
					forms.WEB_0F_page__browser.elements.tab_editor.getTabFormNameAt(1) == 'WEB_0F__content' ||
					forms.WEB_0F_page__browser.elements.tab_editor.getTabFormNameAt(1) == 'WEB_0F__image'
					)) {
					
					//stop loading on main browser bean form to avoid race condition
					forms.WEB_0F_page__browser.elements.bn_browser.stopLoading()
					
					forms.WEB_0F_page__browser.elements.tab_editor.removeTabAt(1)
				}
				
				elements.tab_main.removeTabAt(2)
				elements.tab_main.tabIndex = 1
				
				//reset enabled/disabled, etc.
				forms.WEB_0F_page__design.REC_on_select()
				
				break;
			case "BROWSER":	
				//following line only needed when returning to web mode after not being in it fulltime
				forms.WEB_0F_page__browser.REC_on_select()
				
				elements.tab_main.addTab( forms.WEB_0F_page__browser )
				elements.tab_main.tabIndex = 2
				break;
			default:
			break;
		}
	}
	else {
		switch (elements.tab_main.tabIndex) {
			case 1:	
				return "DESIGN"
				break;
			case 2:	
				return "BROWSER"
				break;
			default:
			break;
		}
	}
}

/**
 * @properties={typeid:35,uuid:"41D49272-FB3B-4284-B2AB-C3233F1D9C3D"}
 */
var _lastToolbar = null;

/**
 * @properties={typeid:35,uuid:"FA071178-813A-4E1E-AAEB-13E5E59D62F3",variableType:-4}
 */
var _hackNoFire = false;

/**
 * @properties={typeid:24,uuid:"10F5E463-15E2-4C0B-858D-F62E76FEDFBF"}
 */
function FORM_on_show(firstShow, event) {
	//this is set when scrapbook is shown to ensure that browser bean has enough time to load before rendering
	if (!_hackNoFire) {
		//first time go to sitemap view
		if (firstShow) {
			globals.TRIGGER_ul_tab_list('WEB_0T_page','Sitemap',0)
		}
		
		//don't run in headless client
		if (application.getApplicationType() != APPLICATION_TYPES.HEADLESS_CLIENT) {
			//save down currently selected toolbar
			if (application.__parent__.solutionPrefs && !solutionPrefs.config.lockStatus) {
				_lastToolbar = solutionPrefs.panel.toolbar[forms[solutionPrefs.config.formNameBase + '__header__toolbar'].elements.tab_toolbar.tabIndex - 1].tabName
				
				//make sure on page toolbar
				globals.TRIGGER_toolbar_set('Web Edit')
			}
			
			
			//in workflow maximized view
			if (firstShow && application.__parent__.solutionPrefs && solutionPrefs.config.activeSpace == 'workflow') {
				//switch modes
				TRIGGER_mode_set("BROWSER")
				return
			}
			
			if (!utils.hasRecords(foundset)) {
				//null out variables and valuelists
				globals.WEB_page_version = null
				globals.WEB_page_group = null
				globals.WEB_page_language = null
				globals.WEB_page_platform = null
				
				forms.WEB_0F_page__design.REC_on_select()
				
				//update tree
				forms.WEB_0T_page.TREE_refresh()
				
				//no records, dim out
				globals.WEB_lock_workflow(true)
				
				//set elements appropriately
				forms.WEB_TB__web_mode.controller.enabled = false
				forms.WEB_TB__web_mode.elements.gfx_tool_left.enabled = true
				forms.WEB_TB__web_mode.elements.gfx_tool_center.enabled = true
				forms.WEB_TB__web_mode.elements.gfx_tool_right.enabled = true
				
				forms.WEB_A__page.TOGGLE_edit_mode(false)
			}
			else {
				//enable rec_on_select of the block type form
				globals.WEB_block_on_select = true
				
				//need to reload the tree, update globals showing
				if (forms.WEB_0T_page._refresh) {
					_loadFilters = true
					SET_globals()
				}
			}
		}
	}
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean} allow hide
 *
 * @properties={typeid:24,uuid:"C35E32F1-37B2-4324-84F2-347A223A6871"}
 */
function FORM_on_hide(event) {
	//don't run in headless client
	if (application.getApplicationType() != APPLICATION_TYPES.HEADLESS_CLIENT) {
		//undo locked screen
		globals.WEB_lock_workflow(false)
		
//		//refire correct enabled state for comboboxes
//		forms.WEB_A__page.TOGGLE_edit_mode(forms.WEB_A__page._editMode)
		
		forms.WEB_TB__web_mode.controller.enabled = true
		
		//restore last selected toolbar
		if (application.__parent__.solutionPrefs && !solutionPrefs.config.lockStatus) {
			//make sure on whatever last toolbar was
			globals.TRIGGER_toolbar_set(_lastToolbar)
			
			_lastToolbar = null
		}
	}
	
	return true
}

/**
 * @properties={typeid:24,uuid:"6DF88FF6-B5B2-4C20-BECB-5199AA95F932"}
 */
function FIND_restrict_site() {
	return globals.WEB_site_find_restrict()
}

/**
 * @properties={typeid:24,uuid:"97CC07D0-6689-419F-B468-06786A53DBE0"}
 */
function FIND_post_process(count) {
	//show correct list
	var baseForm = solutionPrefs.config.formNameBase
	
	//something found as a result of this find, show flat view
	if (count) {
		forms[baseForm].elements.tab_content_B.tabIndex = (navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID].listData.withButtons) ? 2 : 3
	}
	//show tree view
	else {
		forms[baseForm].elements.tab_content_B.tabIndex = navigationPrefs.byNavSetName.configPanes.itemsByName['Custom tab ' + solutionPrefs.config.currentFormID + ': WEB_0T_page'].listData.tabNumber
		
		//force to select correct record
		forms.WEB_0T_page.elements.bean_tree.selectionPath = forms.WEB_0T_page.FIND_path(foundset.getSelectedRecord())
	}
}

/**
 * @properties={typeid:24,uuid:"C24345A2-A310-4E68-9083-1D9F656002BB"}
 */
function ACTION_edit_get() {
	//disable edits if edit flag not set
	if (!utils.hasRecords(forms.WEB_0F_page__design__content.foundset) || !forms.WEB_0F_page__design__content.flag_edit) {
		var editAllow = false
	}
	//enable edits if in edit mode
	else if (forms.WEB_A__page._editMode) {
		var editAllow = true
	}
	else {
		var editAllow = false
	}
	
	return editAllow
}

/**
 * @properties={typeid:24,uuid:"BBDA7706-C829-49AD-A0C6-C6738AFE0402"}
 */
function SET_globals() {
	//this is initial run; set filters to site defaults
	if (_loadFilters && utils.hasRecords(forms.WEB_0F_site.foundset)) {
		//turn off default load
		_loadFilters = false
		
		if (utils.hasRecords(foundset)) {
			var siteRec = web_page_to_site.getSelectedRecord()
		}
		else {
			var siteRec = forms.WEB_0F_site.foundset.getSelectedRecord()
		}
		
		for (var i = 1; i <= siteRec.web_site_to_site_platform.getSize(); i++) {
			var record = siteRec.web_site_to_site_platform.getRecord(i)
			if (record.flag_default) {
				var platform = record
				break
			}
		}
		
		for (var i = 1; i <= siteRec.web_site_to_site_language.getSize(); i++) {
			var record = siteRec.web_site_to_site_language.getRecord(i)
			if (record.flag_default) {
				var language = record
				break
			}
		}
		
		for (var i = 1; i <= siteRec.web_site_to_site_group.getSize(); i++) {
			var record = siteRec.web_site_to_site_group.getRecord(i)
			if (record.flag_default) {
				var group = record
				break
			}
		}
		
		//set globals 
		globals.WEB_page_platform = platform.id_site_platform.toString()
		globals.WEB_page_language = language.id_site_language.toString()
		globals.WEB_page_group = group.id_site_group.toString()
	}
	
	
	//store page version of platform
	var pageVersion = null
	if (utils.hasRecords(web_page_to_platform)) {
		for (var i = 1; i <= web_page_to_platform.getSize(); i++) {
			var record = web_page_to_platform.getRecord(i)
			if (record.id_site_platform.toString() == globals.WEB_page_platform) {
				pageVersion = record
				break
			}
		}
	}
	if (pageVersion) {
		forms.WEB_0F_page__design__header_display__platform._platform.loadRecords(pageVersion.id_platform)
	}
	else {
		forms.WEB_0F_page__design__header_display__platform._platform.clear()
	}
	
	//store page version of language
	pageVersion = null
	if (utils.hasRecords(web_page_to_language)) {
		for (var i = 1; i <= web_page_to_language.getSize(); i++) {
			var record = web_page_to_language.getRecord(i)
			if (record.id_site_language.toString() == globals.WEB_page_language) {
				pageVersion = record
				break
			}
		}
	}
	if (pageVersion) {
		forms.WEB_0F_page__design__header_display__language._language.loadRecords(pageVersion.id_language)
	}
	else {
		forms.WEB_0F_page__design__header_display__language._language.clear()
	}
	
	//store page version of group
	pageVersion = null
	if (utils.hasRecords(web_page_to_group)) {
		for (var i = 1; i <= web_page_to_group.getSize(); i++) {
			var record = web_page_to_group.getRecord(i)
			if (record.id_site_group.toString() == globals.WEB_page_group) {
				pageVersion = record
				break
			}
		}
		if (pageVersion) {
			forms.WEB_0F_page__design__header_display__group._group.loadRecords(pageVersion.id_group)
		}
		else {
			forms.WEB_0F_page__design__header_display__group._group.clear()
		}
	}
	
	//update tooltips for page version globals
	forms.WEB_0F_page__design__header_display__platform.SET_tooltip()
	forms.WEB_0F_page__design__header_display__language.SET_tooltip()
	forms.WEB_0F_page__design__header_display__group.SET_tooltip()
}

/**
 * @properties={typeid:24,uuid:"4F5E8573-8472-4F69-913D-6029EFFE9D26"}
 */
function SET_valuelists() {
	//from left to right...
	//set up valuelists showing all values for site, but with enabled versions for what selected
		//return value is site dictionary pk
	//TODO: big todo....all these finds for every combination in the versions table has to be slow
	
	var fsPlatformAll = forms.WEB_0F_site.web_site_to_site_platform
	var fsLanguageAll = forms.WEB_0F_site.web_site_to_site_language
	var fsGroupAll = forms.WEB_0F_site.web_site_to_site_group
	
	var fsPlatform = web_page_to_platform
	var fsLanguage = web_page_to_language
	var fsGroup = web_page_to_group
	
	var fsVersions = databaseManager.getFoundSet('sutra_cms','web_version')
	
	var valid
	
	var vlPlatformDisplay = new Array()
	var vlPlatformReal = new Array()
	var vlLanguageDisplay = new Array()
	var vlLanguageReal = new Array()
	var vlGroupDisplay = new Array()
	var vlGroupReal = new Array()
	
//PLATFORMS
	
	//grab all created platforms for this page (used to check and see if page version created)
	var keysPlatform = databaseManager.getFoundSetDataProviderAsArray(fsPlatform, 'id_site_platform')
	keysPlatform = keysPlatform.map(function(item) {return item.toString()})
	
	//loop over all platforms and only show valid ones as an option
	if (utils.hasRecords(fsPlatformAll)) {
		for (var i = 1; i <= fsPlatformAll.getSize(); i++) {
			//reset the check for validity to not valid
			valid = false
			
			//site level record
			var recSite = fsPlatformAll.getRecord(i)
			
			//1- is there a page scoped record
			var posn = keysPlatform.indexOf(recSite.id_site_platform.toString())
			if (posn >= 0) {
				//page level record
				var recPage = fsPlatform.getRecord(posn + 1)
				
				//2- is there a version stack
				fsVersions.find()
				fsVersions.id_platform = recPage.id_platform.toString()
				var results = fsVersions.search()
				if (results) {
					valid = true
					
					//this is the selected record and it's valid
					if (utils.hasRecords(forms.WEB_0F_page__design__header_display__platform._platform) && forms.WEB_0F_page__design__header_display__platform._platform.id_platform.toString() == recPage.id_platform.toString()) {
						var platformValid = true
					}
				}
			}
			
			//push on as valid
			if (valid) {
				var display = '<html><body><font color="#333333"><strong>' + recSite.platform_name + '</strong></font>'
				vlPlatformDisplay.push(display)
			}
			//invalid option, push greyed out
			else {
				var display = '<html><body><font color="#4C4C4C">' + recSite.platform_name + '</font>'
				vlPlatformDisplay.push(display)
			}
			vlPlatformReal.push(recSite.id_site_platform)
		}
	}
	
	//set valuelist
	application.setValueListItems('WEB_page_platform',vlPlatformDisplay,vlPlatformReal)
	
	
//LANGUAGES
	
	//grab all created languages for this page (used to check and see if page version created)
	var keysLanguage = databaseManager.getFoundSetDataProviderAsArray(fsLanguage, 'id_site_language')
	keysLanguage = keysLanguage.map(function(item) {return item.toString()})
	
	//loop over all languages and only show valid ones as an option
	if (utils.hasRecords(fsLanguageAll)) {
		for (var i = 1; i <= fsLanguageAll.getSize(); i++) {
			//reset the check for validity to not valid
			valid = false
			
			//site level record
			var recSite = fsLanguageAll.getRecord(i)
			
			//selected platform valid, keep checking
			if (platformValid) {
				//1- is there a page scoped record
				var posn = keysLanguage.indexOf(recSite.id_site_language.toString())
				if (posn >= 0) {
					//page level record
					var recPage = fsLanguage.getRecord(posn + 1)
					
					//2- is there a version stack
					fsVersions.find()
					fsVersions.id_platform = forms.WEB_0F_page__design__header_display__platform._platform.id_platform.toString()
					fsVersions.id_language = recPage.id_language.toString()
					var results = fsVersions.search()
					if (results) {
						valid = true
						
						//this is the selected record and it's valid
						if (utils.hasRecords(forms.WEB_0F_page__design__header_display__language._language) && forms.WEB_0F_page__design__header_display__language._language.id_language.toString() == recPage.id_language.toString()) {
							var languageValid = true
						}
					}
				}
			}
			
			//push on as valid
			if (valid) {
				var display = '<html><body><font color="#333333"><strong>' + recSite.language_name + '</strong></font>'
				vlLanguageDisplay.push(display)
			}
			//invalid option, push greyed out
			else {
				var display = '<html><body><font color="#4C4C4C">' + recSite.language_name + '</font>'
				vlLanguageDisplay.push(display)
			}
			vlLanguageReal.push(recSite.id_site_language)
		}
	}
	
	//set valuelist
	application.setValueListItems('WEB_page_language',vlLanguageDisplay,vlLanguageReal)
	
	
//GROUPS
	
	//grab all created groups for this page (used to check and see if page version created)
	var keysGroup = databaseManager.getFoundSetDataProviderAsArray(fsGroup, 'id_site_group')
	keysGroup = keysGroup.map(function(item) {return item.toString()})
	
	//loop over all groups and only show valid ones as an option
	if (utils.hasRecords(fsGroupAll)) {
		for (var i = 1; i <= fsGroupAll.getSize(); i++) {
			//reset the check for validity to not valid
			valid = false
			
			//site level record
			var recSite = fsGroupAll.getRecord(i)
			
			//selected platform and language valid, keep checking
			if (platformValid && languageValid) {
				
				//1- is there a page scoped record
				var posn = keysGroup.indexOf(recSite.id_site_group.toString())
				if (posn >= 0) {
					//page level record
					var recPage = fsGroup.getRecord(posn + 1)
					
					//2- is there a version stack
					fsVersions.find()
					fsVersions.id_platform = forms.WEB_0F_page__design__header_display__platform._platform.id_platform.toString()
					fsVersions.id_language = forms.WEB_0F_page__design__header_display__language._language.id_language.toString()
					fsVersions.id_group = recPage.id_group.toString()
					var results = fsVersions.search()
					if (results) {
						valid = true
						
						//this is the selected record and it's valid
						if (utils.hasRecords(forms.WEB_0F_page__design__header_display__group._group) && forms.WEB_0F_page__design__header_display__group._group.id_group.toString() == recPage.id_group.toString()) {
							var groupValid = true
						}
					}
				}
			}
			
			//push on as valid
			if (valid) {
				var display = '<html><body><font color="#333333"><strong>' + recSite.group_name + '</strong></font>'
				vlGroupDisplay.push(display)
			}
			//invalid option, push greyed out
			else {
				var display = '<html><body><font color="#4C4C4C">' + recSite.group_name + '</font>'
				vlGroupDisplay.push(display)
			}
			vlGroupReal.push(recSite.id_site_group)
		}
	}
	
	//set valuelist
	application.setValueListItems('WEB_page_group',vlGroupDisplay,vlGroupReal)
	
	
	//the platform-language-group combo selected is valid
	return platformValid && languageValid && groupValid
}
