/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f32"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2F7F3445-277A-4DA8-948D-58099A1B41C3"}
 */
function FORM_on_show(firstShow, event) {
	//is this still needed?
	forms.WEB_0F_page__design__content_1L_area.REC_on_select()
}

/**
 *
 * @properties={typeid:24,uuid:"2A684B84-9416-419A-B6EC-6F91209B4DA1"}
 */
function TAB_header_size() {
	
	var input = arguments[0]
	
	switch (input) {
		case 'A':
			return 44
			break
		case 'B':
			return 200
			break
		default:
		case 'space':
			return 5
			break
	}

}

/**
 * @properties={typeid:35,uuid:"C2767F81-E228-4D18-9BE6-D9DC2B921123",variableType:-4}
 */
var _skipSelect = false;

/**
 * Method that is in charge of setting up the PAGE view of the page.
 * 
 * @param	{JSEvent}	[event] The event that triggered the action.
 * @param	{Boolean}	[skipLoad=false] Find correct version stack or use the existing one.
 * @param	{Number}	[verIndex] The version to select (by index).
 * @param	{Boolean}	[fireSelect=false] Manually fire the REC_on_select on the selected block type's form.
 * 
 * @properties={typeid:24,uuid:"23B7AC31-3444-4F11-BDE4-748066C79D30"}
 */
function REC_on_select(event,skipLoad,verIndex,fireSelect) {
//	if (!this.someVar) {
//		this.someVar = 1
//	}
//	else {
//		this.someVar ++
//	}
//	
//	//log how many times run and how
//	application.output('WEB_0F_page__design.REC_on_select(' + url_param + '/' + display_page_name + ') #:' + this.someVar + ' ' + (event ? '(e)' : '') + (skipLoad ? ' (skipLoad)' : ''))
	
	//wrapper to keep from firing too much on initial load
	if (!_skipSelect) {
		_skipSelect = true
	
		//when newly added page, skip this
		if (!forms.WEB_0T_page._addRecord) {
			//halt additional on select firing
			forms.WEB_0F_page__design__content_1L_block._skipSelect = true
			
		 	//when called with event (not programatically)
			if (event) {
			 	//set tooltip of visit with link
				forms.WEB_0F_page__design__button_tab__content.elements.btn_visit.toolTipText = globals.WEB_MRKUP_link_page(id_page)
			}
			
			//select page version of tri globals
		 	SET_globals()
			
			//set up valuelists for tri globals
			var pageValid = SET_valuelists()
			
			//set version junks
			var activeInfo = SET_versions(skipLoad,!pageValid)
			
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
			
			//page type ui differences
			PAGE_type_display(!pageValid ? 'Page invalid' : null)
			
			//are edits allowed
			var editAllow = forms.WEB_0F_page.ACTION_edit_get()
			
			//set elements appropriately
			forms.WEB_0F_page__design__content_1L_area.TOGGLE_elements(editAllow)
			forms.WEB_0F_page__design__content_1L_block.TOGGLE_elements(editAllow)
			forms.WEB_0F_page__design__content_1F_block_data__textarea.TOGGLE_elements(editAllow)
			forms.WEB_0F_page__design__header_display__version.TOGGLE_elements(editAllow)
			
			//allow additional on select firing
			forms.WEB_0F_page__design__content_1L_block._skipSelect = false
			
			//may fire too frequently
			forms.WEB_0F_page__design__content_1L_block.ACTION_gui_mode_load(fireSelect)
		}
		
		//allow to fire again
		_skipSelect = false
	}
}

/**
 * @properties={typeid:35,uuid:"703B297A-F6C2-4A58-8EE1-545C5457613E",variableType:-4}
 */
var _loadFilters = true;

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
	for (var i = 1; i <= forms.WEB_0F_page__design__header_display__platform.foundset.getSize(); i++) {
		var record = forms.WEB_0F_page__design__header_display__platform.foundset.getRecord(i)
		if (record.id_site_platform.toString() == globals.WEB_page_platform) {
			pageVersion = record
			break
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
	for (var i = 1; i <= forms.WEB_0F_page__design__header_display__language.foundset.getSize(); i++) {
		var record = forms.WEB_0F_page__design__header_display__language.foundset.getRecord(i)
		if (record.id_site_language.toString() == globals.WEB_page_language) {
			pageVersion = record
			break
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
	for (var i = 1; i <= forms.WEB_0F_page__design__header_display__group.foundset.getSize(); i++) {
		var record = forms.WEB_0F_page__design__header_display__group.foundset.getRecord(i)
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

/**
 *
 * @properties={typeid:24,uuid:"7853ABD5-E8E0-41C7-BDB7-C552BB9BF299"}
 */
function SET_versions(skipLoad,pageInvalid) {
	//fill versions value list
	
	var vlReal = new Array()
	var vlDisplay = new Array()	
	var fsVersions = forms.WEB_0F_page__design__content.foundset
	
	//clear versions
	if (pageInvalid) {
		fsVersions.clear()
	}
	//get versions records loaded
	else if (!skipLoad) {
		fsVersions.find()
		fsVersions.id_platform = forms.WEB_0F_page__design__header_display__platform._platform.id_platform.toString()
		fsVersions.id_language = forms.WEB_0F_page__design__header_display__language._language.id_language.toString()
		fsVersions.id_group = forms.WEB_0F_page__design__header_display__group._group.id_group.toString()
		var results = fsVersions.search()
		
		forms.WEB_0F_page__design__properties_1L_version.foundset.loadRecords(fsVersions)
	}
	
	//we've got a version stack
	if (utils.hasRecords(fsVersions)) {
		if (!skipLoad) {
			fsVersions.sort('version_number desc')
		}
		
		for (var i = 1; i <= fsVersions.getSize(); i++) {
			var recVersion = fsVersions.getRecord(i)
			
			vlReal.push(recVersion.id_version)
			
			var displayVal = ''
			
			if (recVersion.flag_active) {
				displayVal += '<html><body><strong>ACTIVE</strong> '
				var active = {
					position: i,
					record: recVersion
				}
			}
			else if (i == 1) {
				displayVal += 'Working copy'
			}
			
			if (i > 1 || recVersion.flag_active) {
				displayVal += 'Version ' + recVersion.version_number + ' (' + globals.CODE_date_format(recVersion.rec_modified,'current') + ')'
				
				if (recVersion.version_name) {
					displayVal += ': ' + recVersion.version_name
				}
			}	
			vlDisplay.push(displayVal)
		}
	}
	//prompt to create version
	else {
		vlDisplay.push('<html><body>Click <strong>+</strong> button to create a version')
		vlReal.push(null)
	}
	
	application.setValueListItems('WEB_page_version',vlDisplay,vlReal)
	
	return active
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"CBA4256A-1CF7-42E4-A265-237E6AB08408"}
 */
function BLOCK_click(event) {
	
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0F8B8765-1036-412D-88DB-7C65A6C6710C"}
 */
function FORM_on_load(event) {
	elements.gfx_curtain.visible = false
}

/**
 * @properties={typeid:24,uuid:"D5C2AE5A-0CE4-42D3-AAF1-B277E73B748A"}
 */
function PAGE_type_display(pageType) {
	if (!forms.WEB_0T_page._addRecord) {
		forms.WEB_0F_page__design__header_edit.TOGGLE_fields(pageType || page_type)
	}
}
