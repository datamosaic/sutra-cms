/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"01E8184B-FD76-4964-AB42-A83CBDF51EAB"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"528DDFCB-B83D-48FC-8700-26FA882B910B",variableType:-4}
 */
var _fsVersion = databaseManager.getFoundSet('sutra_cms','web_version');

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E02416C7-257C-4C49-AEE1-B81E2C2EA04E"}
 */
var _idGroup = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B4C92A93-6095-4716-8DCD-2D07604EA7F1"}
 */
var _idLanguage = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A6AE2FE6-7934-4127-9317-CFFEDE755D7D"}
 */
var _idPlatform = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"884E78BA-3B15-43CF-B187-7B319F4F4DF2",variableType:4}
 */
var _posnVersion = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"8502BC09-C939-41B9-AEB0-C143C0448F6F",variableType:4}
 */
var _fidAccept = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"ECFE243F-45B0-49CA-90B6-F6755D622195"}
 */
var _versionDescription = null;

/**
 *
 * @properties={typeid:24,uuid:"AC499AA6-BE52-4378-97F1-BFA389AEB2A3"}
 */
function ACTION_cancel() {
	//null out all fields
	_idGroup = null
	_idLanguage = null
	_idPlatform = null
	_posnVersion = null
	_versionDescription = null
	
	//enable closing the form
	globals.CODE_hide_form = 1
	
	globals.CODE_form_in_dialog_close('cmsVersionNew')

}

/**
 *
 * @properties={typeid:24,uuid:"80C37B56-7ACA-4577-8F30-0EDBE90CDED7"}
 */
function ACTION_ok() {
	//check for enough data
	if (!_idPlatform) {
		globals.DIALOGS.showErrorDialog(
					"Error",
					"Platform is required"
				)
		return false
	}
	else if (!_idLanguage) {
		globals.DIALOGS.showErrorDialog(
					"Error",
					"Language is required"
				)
		return false
	}
	else if (!_idGroup) {
		globals.DIALOGS.showErrorDialog(
					"Error",
					"Group is required"
				)
		return false
	}
	else if (!_posnVersion) {
		globals.DIALOGS.showErrorDialog(
					"Error",
					"Version is required"
				)
		return false
	}
	
	//enaable closing the form
	globals.CODE_hide_form = 1
	
	//accept
	_fidAccept = 1
	
	globals.CODE_form_in_dialog_close('cmsVersionNew')

}

/**
 *
 * @properties={typeid:24,uuid:"C94A67C9-20BE-45C0-8B05-D5200AE20977"}
 */
function FORM_on_show() {
	
	//disable closing the form
	globals.CODE_hide_form = 0
	
	//reset acceptance status
	_fidAccept = null
	
	
	//reset everything
	_idGroup = null
	_idLanguage = null
	_idPlatform = null
	_posnVersion = null
	_versionDescription = null
	application.setValueListItems('WEB_page_language__new_version',[],[])
	application.setValueListItems('WEB_page_group__new_version',[],[])
	application.setValueListItems('WEB_page_version__new_version',[],[])
	
	
	//find site defaults
	var siteDefaults = forms.WEB_0F_site.ACTION_get_defaults()
	
	//pre-fill to site defaults if they are valid for this page
	if (siteDefaults) {
		//platform
		for (var i = 1; i <= web_page_to_platform.getSize(); i++) {
			var record = web_page_to_platform.getRecord(i)
			
			//set this page site default value and stop this loop
			if (record.id_site_platform == siteDefaults.platform.id_site_platform) {
				_idPlatform = record.id_platform.toString()
				FLD_idPlatform__data_change()
				
				//language
				for (var i = 1; i <= web_page_to_language.getSize(); i++) {
					var record = web_page_to_language.getRecord(i)
					
					//set this page site default value and stop this loop
					if (record.id_site_language == siteDefaults.language.id_site_language) {
						_idLanguage = record.id_language.toString()
						FLD_idLanguage__data_change()
						
						//group
						for (var i = 1; i <= web_page_to_group.getSize(); i++) {
							var record = web_page_to_group.getRecord(i)
							
							//set this page site default value and stop this loop
							if (record.id_site_group == siteDefaults.group.id_site_group) {
								_idGroup = record.id_group.toString()
								FLD_idGroup__data_change()
								break
							}
						}
						break
					}
				}
				break
			}
		}
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
 * @properties={typeid:24,uuid:"AE695C02-9334-4760-8D3E-1EB72FCD7330"}
 * @AllowToRunInFind
 */
function FLD_idPlatform__data_change(oldValue, newValue, event) {
	//set up language valuelist
	var fsLanguage = web_page_to_language
	var fsVersions = _fsVersion
	
	var vlLanguageDisplay = new Array()
	var vlLanguageReal = new Array()
	
	
	for (var i = 1; i <= fsLanguage.getSize(); i++) {
		//get platform record (page-level)
		var recPage = fsLanguage.getRecord(i)
		
		//there is a version stack
		fsVersions.find()
		fsVersions.id_platform = _idPlatform
		fsVersions.id_language = recPage.id_language.toString()
		var results = fsVersions.search()
		
		//add this language to possible options
		if (results) {
			vlLanguageDisplay.push(recPage.language_name)
			vlLanguageReal.push(recPage.id_language.toString())
		}
	}
	
	//set valuelist
	application.setValueListItems('WEB_page_language__new_version',vlLanguageDisplay,vlLanguageReal)
	application.setValueListItems('WEB_page_group__new_version',[],[])
	application.setValueListItems('WEB_page_version__new_version',[],[])
	
	//reset variables
	_idLanguage = null
	_idGroup = null
	_posnVersion = null
	_versionDescription = null
	
	return true
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
 * @properties={typeid:24,uuid:"37153F49-12D2-43C1-8EFC-0DD816D25A26"}
 * @AllowToRunInFind
 */
function FLD_idLanguage__data_change(oldValue, newValue, event) {
	//set up group valuelist
	var fsGroup = web_page_to_group
	var fsVersions = _fsVersion
	
	var vlGroupDisplay = new Array()
	var vlGroupReal = new Array()
	
	
	for (var i = 1; i <= fsGroup.getSize(); i++) {
		//get platform record (page-level)
		var recPage = fsGroup.getRecord(i)
		
		//there is a version stack
		fsVersions.find()
		fsVersions.id_platform = _idPlatform
		fsVersions.id_language = _idLanguage
		fsVersions.id_group = recPage.id_group.toString()
		var results = fsVersions.search()
		
		//add this group to possible options
		if (results) {
			vlGroupDisplay.push(recPage.group_name)
			vlGroupReal.push(recPage.id_group.toString())
		}
		
	}
	
	//set valuelist
	application.setValueListItems('WEB_page_group__new_version',vlGroupDisplay,vlGroupReal)
	application.setValueListItems('WEB_page_version__new_version',[],[])
	
	//reset variables
	_idGroup = null
	_posnVersion = null
	_versionDescription = null
	
	return true
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
 * @properties={typeid:24,uuid:"3BCBFC86-819E-43A4-A4D3-04F5DDF5E276"}
 * @AllowToRunInFind
 */
function FLD_idGroup__data_change(oldValue, newValue, event) {
	//reset variables
	_posnVersion = null
	_versionDescription = null	
	
	//set up versions valuelist
	var fsVersions = _fsVersion
	
	var vlVersionDisplay = new Array()
	var vlVersionReal = new Array()
	
	//there is a version stack
	fsVersions.find()
	fsVersions.id_platform = _idPlatform
	fsVersions.id_language = _idLanguage
	fsVersions.id_group = _idGroup
	var results = fsVersions.search()
	
	//add this version to possible options
	if (results) {
		fsVersions.sort('version_number desc')
		
		for (var i = 1; i <= fsVersions.getSize(); i++) {
			var record = fsVersions.getRecord(i)
			
			//active version, set as default
			if (record.flag_active) {
				_posnVersion = i
				_versionDescription = record.version_description
			}
			
			var displayVal = 'Version ' + record.version_number + ' (' + globals.CODE_date_format(record.rec_modified,'current') + ')'
			if (record.version_name) {
				displayVal += ': ' + record.version_name
			}
			
			vlVersionDisplay.push(displayVal)
			//real contains the position of this record in the foundset
			vlVersionReal.push(i)
		}
	}
	
	//set valuelist
	application.setValueListItems('WEB_page_version__new_version',vlVersionDisplay,vlVersionReal)
	
	return true
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
 * @properties={typeid:24,uuid:"D842C432-4580-442F-AB26-FB7458CA433A"}
 */
function FLD_posnVersion__data_change(oldValue, newValue, event) {
	//set text of description field appropriately
	_versionDescription = _fsVersion.getRecord(newValue).version_description
	
	return true
}
