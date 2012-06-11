/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4d29-af47-7f7c22221f18"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"36F527EE-DA15-4AF8-A0C1-497FAC9161AD",variableType:-4}
 */
var _language = databaseManager.getFoundSet('sutra_cms','web_language');

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"121360AA-EAAB-4DE5-81CA-0A48D2588335"}
 */
function FORM_on_load(event) {
	//set combobox to be small on os x
	globals.CODE_property_combobox(false, 'mini')
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
 * @properties={typeid:24,uuid:"F4CC7D97-D485-4806-BEAB-2C284C6F8EDF"}
 */
function FLD_language__data_change(oldValue, newValue, event) {
	//area name
	if (utils.hasRecords(forms.WEB_0F_page__design_1F_version_2L_area.foundset)) {
		var areaName = forms.WEB_0F_page__design_1F_version_2L_area.area_name
		
		//block index
		if (utils.hasRecords(forms.WEB_0F_page__design_1F_version_2L_scope.foundset)) {
			var blockIndex = forms.WEB_0F_page__design_1F_version_2L_scope.foundset.getSelectedIndex()
		}
	}
	
	//call method that reloads up appropriate records
	forms.WEB_0F_page__design.REC_on_select(null,null,null,null,areaName,blockIndex)
	
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D4DB94B8-EF85-4942-8B24-651BAC2C808A"}
 */
function ADD_language(event) {
	//get all possible languages
	var fsLanguageAll = web_page_to_site.web_site_to_site_language
	
	//get all configured languages
	var fsLanguage = web_page_to_language
	
	//no more to add
	if (fsLanguage.getSize() == fsLanguageAll.getSize()) {
		//show info that logout canceled
		globals.DIALOGS.showWarningDialog(
				'Warning',
				'No more languages to add'
			)
	}
	else {
		//make sure on data mode so no heavyweights underneath
		if (globals.WEB_page_mode == 2) {
			var dataEvent = new Object()
			dataEvent.getElementName = function() {
					return 'lbl_mode_data'
				}
			
			forms.WEB_TB__web_mode.ACTION_mode(dataEvent)
			
			forms.WEB_P__page__new._guiMode = true
		}
		
		//figure out which ones to show
		var keysLanguage = databaseManager.getFoundSetDataProviderAsArray(fsLanguage, 'id_site_language')
		keysLanguage = keysLanguage.map(function(item) {return item.toString()})
		
		var vlDisplay = new Array()
		var vlReal = new Array()
		
		//loop all possible languages
		for (var i = 1; i <= fsLanguageAll.getSize(); i++) {
			var record = fsLanguageAll.getRecord(i)
			
			//this value doesn't exist on the page yet
			if (keysLanguage.indexOf(record.id_site_language.toString()) == -1) {
				vlDisplay.push(record.language_name)
				vlReal.push(record.id_site_language)
			}
		}
		
		//set valuelist
		application.setValueListItems('WEB_page_stuff',vlDisplay,vlReal)
		
		//set callback method
		forms.WEB_P__page__new._callbackMethod = CREATE_language
		
		//figure where the clicked component is (2nd split, 1st tabpanel)
		var refTab = forms.WEB_0F_page__design_1F__header_display.elements.tab_language
		var refSplit = forms.WEB_0F_page__design_1F__header_display.elements.split_picker_1
		var refSplitSub = forms.WEB_0F_page__design_1F__header_display.elements.split_picker_2
		//(tab panel position, plus width, minus offset to center of graphic) plus space offset
		var x = refSplit.getX() + refSplitSub.dividerLocation + refTab.getLocationX() + (refTab.getWidth() - 12) + 200
		//position plus header plus (if toolbars showing) plus offset to top of workflow form
		var y = elements.fld_language.getLocationY() + 44 + 40 + refTab.getLocationY() + forms.WEB_0F_page__design.elements.tab_header_detail.getLocationY()
		
		//show the form
		globals.WEBc_sutra_trigger('TRIGGER_dialog_small',[
					true,
					'touch',
					'WEB_P__page__new',
					false,
					x,y,
					null,null,
					'Add language',
					'Cancel',
					null,
					true,
					0
				])
	}
}

/**
 * @properties={typeid:24,uuid:"D4D9C306-4D18-4CE3-96F0-0D21AB40BE75"}
 */
function CREATE_language(versionOld) {
	var thisID = globals.WEB_page_language
	
	//something selected
	if (thisID) {
		//turn on feedback indicators
		globals.CODE_cursor_busy(true)
		
		//this page
		var pageRec = forms.WEB_0F_page__design.foundset.getSelectedRecord()
		
		//current language
		var fsLanguage = databaseManager.getFoundSet('sutra_cms','web_language')
		fsLanguage.loadRecords([versionOld.id_language])
		var languageOld = fsLanguage.getSelectedRecord()
		
		//create language record
		var languageNew = pageRec.web_page_to_language.getRecord(pageRec.web_page_to_language.newRecord(false,true))
		languageNew.id_site_language = thisID
		languageNew.page_name = languageOld.page_name
		databaseManager.saveData(languageNew)
		
		//save this record's position onto the form
		_language.loadRecords(languageNew.id_language)
		
		//turn off feedback indicators if on
		globals.CODE_cursor_busy(false)
		
		return 'Language "' + languageNew.language_name + '" added.\n'
	}
	else {
		globals.DIALOGS.showErrorDialog(
					'Error',
					'Language not selected'
			)
		return false
	}
}

/**
 * @properties={typeid:24,uuid:"03E57EE5-CFFA-4179-9564-6841CC25CAB2"}
 * @AllowToRunInFind
 */
function DEL_language(event) {
	//cannot delete last language
	if (web_page_to_language.getSize() > 1) {
		var delRec = globals.DIALOGS.showWarningDialog(
						'Delete record',
						'Do you really want to delete this record?',
						'Yes',
						'No'
					)
	
		if (delRec == 'Yes') {
			//halt additional on select firing; gets turned back on in forms.WEB_0F_page__design.REC_on_select(true)
			forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = true
			
			//turn on feedback indicators
			var progressText = 'Deleting language "' + application.getValueListDisplayValue('WEB_page_language__all',globals.WEB_page_language) + '" from page...'
			globals.WEBc_sutra_trigger('TRIGGER_progressbar_start',[null,progressText])
			globals.CODE_cursor_busy(true)
			
			//select this language
			web_page_to_language.selectRecord(globals.WEB_page_language)
			
			//whack it
			web_page_to_language.deleteRecord()
			
			//delete all versions for this language
			var fsVersion = databaseManager.getFoundSet('sutra_cms','web_version')
			fsVersion.find()
			fsVersion.id_language = globals.WEB_page_language.toString()
			fsVersion.search()
			fsVersion.deleteAllRecords()
			
			//re-set up the page
			forms.WEB_0F_page__design.REC_on_select(true)
			
			//turn off feedback indicators if on
			globals.CODE_cursor_busy(false)
			globals.WEBc_sutra_trigger('TRIGGER_progressbar_stop')
		}
	}
	else {
		globals.DIALOGS.showWarningDialog(
				'Warning',
				'There must always be one language'
			)
	}
}

/**
 * @properties={typeid:24,uuid:"1278CE0D-67DA-42D8-899B-A6692061BE4F"}
 */
function SET_tooltip() {
	if (utils.hasRecords(_language)) {
		elements.fld_language.toolTipText = 'ID: ' + _language.url_param
	}
	else {
		elements.fld_language.toolTipText = ''
	}
}
