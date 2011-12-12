/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f47"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"F4E09655-F0E2-402A-907F-B5B944590FA8"}
 */
function REC_on_select(event) {
	//find site-specific stuff
	//only do this when not running in data sutra
	if (!application.__parent__.solutionPrefs) {
		forms.WEB_0F_block__scrapbook.FORM_on_load()
		forms.WEB_0F_theme.FORM_on_load()
	}
	
	//set global with site info
	globals.WEB_site_display = 'Site: ' + site_name
	
	//null out used-on page foundset if selected tab doesn't have any records
	if ((elements.tab_detail.tabIndex == 1 && !utils.hasRecords(web_site_to_site_platform)) ||
		(elements.tab_detail.tabIndex == 2 && !utils.hasRecords(web_site_to_site_language)) ||
		(elements.tab_detail.tabIndex == 3 && !utils.hasRecords(web_site_to_site_group)) ||
		(elements.tab_detail.tabIndex == 4 && !utils.hasRecords(web_site_to_site_attribute))) {
		
		forms.WEB_0F_site_1L_page__groups.foundset.clear()
	}
	
	//set flag for page tree to be refreshed
	forms.WEB_0T_page._refresh = true
}

/**
 *
 * @properties={typeid:24,uuid:"5F06FB01-8EE2-4283-A5F5-E2C1E4802045"}
 */
function REC_delete() {
	var delRec = plugins.dialogs.showWarningDialog(
				'Delete record',
				'Do you really want to delete this site?',
				'Yes',
				'No'
			)

	if (delRec == 'Yes') {
		globals.WEB_site_display = null
		
		//TODO: not deleteing versions and below....need to fix this
		controller.deleteRecord()
		
		//dim out the lights
		if (!utils.hasRecords(foundset)) {
			FORM_on_show()
		}
	}
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"1F26A1AB-A7AB-4E89-92EA-4B3F4ADF38C4"}
 */
function FORM_on_hide(event) {
	if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow) {
		globals.WEB_lock_workflow(false)
	}
	
	return true
}

/**
 *
 * @properties={typeid:24,uuid:"D99C1241-A9B8-4124-9279-7C04869AE230"}
 */
function REC_new() {
	//no records created yet and interface locked
	if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow) {
		globals.WEB_lock_workflow(false)
	}
	
	controller.newRecord(false)
	
	//create a group
	var allGroup = web_site_to_site_group.getRecord(web_site_to_site_group.newRecord(false,true))
	allGroup.group_name = 'Everybody'
	allGroup.flag_default = 1
	
	//create a language
	var enLanguage = web_site_to_site_language.getRecord(web_site_to_site_language.newRecord(false,true))
	enLanguage.language_name = 'English'
	enLanguage.language_code = 'en'
	enLanguage.flag_default = 1
	
	//create a platform
	var platform = web_site_to_site_platform.getRecord(web_site_to_site_platform.newRecord(false,true))
	platform.platform_name = application.getValueListItems('WEB_platform').getValue(1,1)
	platform.flag_default = 1
	
	//save
	databaseManager.saveData()
	
	//blow in default block types
	forms.WEB_0F_block_type.BATCH_create()	
	
	//refire on select
	REC_on_select()
	
	//bring focus back to this window
	application.updateUI()
	elements.fld_site_name.requestFocus()
}

/**
 *
 * @properties={typeid:24,uuid:"DE93701D-6639-40BE-B977-D24295C1932F"}
 */
function ACTION_blow_in_missing_areas_to_all_pages() {
	return
	if (globals.TRIGGER_registered_action_authenticate('cms site page update')) {
		var input = plugins.dialogs.showWarningDialog(
						'Continue?',
						'Are you sure you want to modify all pages.\nWarning! This is irreversible.',
						'Yes',
						'No'
				)
		
		if (input == 'Yes') {
			//get foundset of pages
			
			//loop over pages
			
				//get platform/language/groups and loop all combinations
				
				
					//loop version stack and pass in to add missing areas
				
			
						//run area diff method
						forms.WEB_0F_page__design_1F_version_2L_area.AREA_add_missing(fsVersion,latestVersion,activeVersion)
		}
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"C79053B1-CA2A-4820-A7D3-65D2AD816FA3"}
 */
function ACTION_path_generate(event) {
	var input = plugins.dialogs.showWarningDialog(
					'Continue?',
					'This will add pretty URLs to all pages in this site\nthat do not have a default pretty URL',
					'Yes',
					'No'
			)
	
	if (input == 'Yes') {
		var fsPath = databaseManager.getFoundSet('sutra_cms','web_path')
		var fsPages = web_site_to_page
		var relnPath = 'web_page_to_path'
		
		var siteID = id_site
		
		//loop over all pages
		for (var i = 1; i <= fsPages.getSize(); i++) {
			var pageRec = fsPages.getRecord(i)
			
			//no paths, create
			if (!utils.hasRecords(pageRec[relnPath])) {
				var pathNameWanted = pageRec.page_name
				
				pathNameWanted = (pathNameWanted) ? pathNameWanted.toLowerCase() : 'blank'
				pathNameWanted = utils.stringReplace(pathNameWanted, ' ', '-')
				
				var pathName = pathNameWanted
				var cnt = 1
				var results = null
				
				while (results != 0) {
					fsPath.find()
					fsPath.id_site = siteID
					fsPath.path = pathName
					var results = fsPath.search()
					
					if (results) {
						pathName = pathNameWanted + cnt++
					}
				}
				
				var recPath = pageRec[relnPath].getRecord(pageRec[relnPath].newRecord(false,true))
				recPath.flag_default = 1
				recPath.path = pathName
				recPath.id_site = siteID
				
				databaseManager.saveData()
			}
		}
		
		plugins.dialogs.showInfoDialog(
					'Completed',
					'All pages for this site now have pretty urls'
			)
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EA6CC115-5079-415E-8E35-5B2FA942814C"}
 */
function ACTION_choose_home(event) {
	globals.WEBc_page_picker(forms.WEB_0F_site.ACTION_set_home)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EA6CC115-5079-415E-8E36-5B2FA942814C"}
 */
function ACTION_choose_error(event) {
	globals.WEBc_page_picker(forms.WEB_0F_site.ACTION_set_error)
}

/**
 *
 * @properties={typeid:24,uuid:"28287505-5072-4F40-BDBF-C3A0717BB35A"}
 */
function ACTION_set_home(inputID,inputRec) {
	if (inputID) {
		id_page__home = inputRec.id_page
		id_page__home__display = inputRec.page_name
		databaseManager.saveData()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"28287505-5072-4F40-BEBF-C3A0717BB35A"}
 */
function ACTION_set_error(inputID,inputRec) {
	if (inputID) {
		id_page__error = inputRec.id_page
		id_page__error__display = inputRec.page_name
		databaseManager.saveData()
	}
}

/**
 * @properties={typeid:24,uuid:"E27281B4-BC5B-46C5-8993-51C3F9CBE5BC"}
 */
function ACTION_attribute_update() {
	var input = plugins.dialogs.showWarningDialog(
				'Continue?',
				'This will link all page attributes to specific site attributes.\nYou must first define the attributes below.\n\nNote: this must be run once per site.',
				'Yes',
				'No'
		)
	
	if (input == 'Yes') {
		var fsAttribute = web_site_to_site_attribute
		var fsPages = web_site_to_page
		
		//build mapping of all attributes
		var mapAttrib = new Object()
		for (var i = 1; i <= fsAttribute.getSize(); i++) {
			var siteAttribRec = fsAttribute.getRecord(i)
			
			if (siteAttribRec.attribute_key) {
				mapAttrib[siteAttribRec.attribute_key] = siteAttribRec.id_site_attribute
			}
		}
		
		//loop over all pages
		for (var i = 1; i <= fsPages.getSize(); i++) {
			var pageRec = fsPages.getRecord(i)
			
			for (var j = 1; j <= pageRec.web_page_to_attribute.getSize(); j++) {
				var attribRec = pageRec.web_page_to_attribute.getRecord(j)
				
				if (attribRec.attribute_key && mapAttrib[attribRec.attribute_key]) {
					attribRec.id_site_attribute = mapAttrib[attribRec.attribute_key]
					databaseManager.saveData(attribRec)
				}
			}
		}
		
		plugins.dialogs.showInfoDialog(
					'Completed',
					'All page attributes on this site are now linked'
			)
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"3C6862A7-E141-4E96-B76D-8839FB10FD7C"}
 */
function TAB_change(event) {
	globals.TAB_change_grid()
	
	elements.tab_used_on.tabIndex = elements.tab_detail.tabIndex
	
	if (elements.tab_used_on.tabIndex == 4) {
		elements.btn_add_page_attrib.visible = true
	}
	else {
		elements.btn_add_page_attrib.visible = false
	}
	
	forms[elements.tab_detail.getTabFormNameAt(elements.tab_detail.tabIndex)].REC_on_select()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"DAB70AE4-3ABC-407F-A59C-ED21E3DD28E2"}
 */
function TAB_sec_add(event) {
	globals.TAB_btn_actions_list(null,'tab_used_on')
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A7337614-806A-4452-B0DC-18DEA06A0005"}
 */
function FORM_on_load(event) {
	elements.btn_add_page_attrib.visible = false
}

/**
 * Handle focus element loosing focus.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"A6977F22-63A1-4823-AE8D-C43D5A7A6B16"}
 */
function FIELD_directory_onLost(event) {
	// don't allow trailing "/"
	databaseManager.saveData()
	var provider = elements[event.getElementName()].getDataProviderID()
	if ( this[provider] && this[provider].search(/\/*$/) > 0 ) {
		this[provider] = this[provider].replace(/\/*$/, "")
		databaseManager.saveData()
	}
	// don't allow trailing "\\"
	if ( event.getElementName() == "fld_directory_windows" &&
		 this[provider] && this[provider].search(/\/*$/) > 0 ) {
		
		this[provider] = this[provider].replace(/\\*$/, "")
		databaseManager.saveData()
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8FE70347-AA8A-458C-B751-C0AE5E0B0254"}
 */
function FORM_on_show(firstShow, event) {
	//disable form if no records
	if (!utils.hasRecords(foundset)) {
		globals.WEB_lock_workflow(true)
	}
	
	//disable rewrites if turned off
	if (globals.WEBc_install_getRewrite()) {
		elements.fld_pref_links.enabled = true
		elements.fld_url_servlet.enabled = true
		elements.fld_url_servlet.transparent = true
	}
	else {
		elements.fld_pref_links.enabled = false
		elements.fld_url_servlet.enabled = false
		elements.fld_url_servlet.transparent = false
	}
	
	//disable multisite if there aren't any
	if (utils.hasRecords(forms.WEB_0F_install__multisite.foundset)) {
		elements.fld_multisite_key.enabled = true
	}
	else {
		elements.fld_multisite_key.enabled = false
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
 * @properties={typeid:24,uuid:"0407EBE6-09B2-4760-95D7-B1AE7491269A"}
 */
function FIELD_publish() {
	databaseManager.saveData()
	if ( site_name_publish_flag ) {
		if ( !site_name_publish_separator ) {
			site_name_publish_separator = " | "
		}
	}
}

/**
 * @param	{JSRecord}	[siteRec] Site record to retrieve defaults for; if left blank will use selected record. 
 * 
 * @returns	{Object}	thisSite Object containing default platform, language, and group records for a site.
 * 
 * @properties={typeid:24,uuid:"739BF19F-5BF7-433F-9CAB-408DE15D2205"}
 */
function ACTION_get_defaults(siteRec) {
	//no site specified, get the selected site
	if (!siteRec) {
		siteRec = foundset.getSelectedRecord()
	}
	
	//we have a site to work with
	if (siteRec) {
		var thisSite = new Object()
		thisSite.record = siteRec
		
		//loop over all platforms
		for (var i = 1; i <= siteRec.web_site_to_site_platform.getSize(); i++) {
			var record = siteRec.web_site_to_site_platform.getRecord(i)
			
			//grab default platform
			if (record.flag_default) {
				thisSite.platform = record
				break
			}
		}
		
		//loop over all languages
		for (var i = 1; i <= siteRec.web_site_to_site_language.getSize(); i++) {
			var record = siteRec.web_site_to_site_language.getRecord(i)
			
			//grab default platform
			if (record.flag_default) {
				thisSite.language = record
				break
			}
		}
		
		//loop over all groups
		for (var i = 1; i <= siteRec.web_site_to_site_group.getSize(); i++) {
			var record = siteRec.web_site_to_site_group.getRecord(i)
			
			//grab default platform
			if (record.flag_default) {
				thisSite.group = record
				break
			}
		}
		
		//only return if there are defaults specified for all
		if (thisSite && thisSite.platform && thisSite.language && thisSite.group) {
			return thisSite
		}
	}
}

/**
 * @properties={typeid:24,uuid:"8B462465-68C3-4371-96D0-65EFFB963C05"}
 */
function ACTION_upgrade_cms1() {
	globals.WEB_upgrade()
}
