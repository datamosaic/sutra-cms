/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A9AC62EB-5C7C-4559-B231-67076B5EB855"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"889B3271-6D03-4C89-9414-779DB1943AD9"}
 */
function REC_delete() {
	var delRec = globals.DIALOGS.showWarningDialog(
					'Delete record',
					'Do you really want to delete this record?',
					'Yes',
					'No'
				)

	if (delRec == 'Yes') {
		if (flag_default) {
			var flagSet = true
		}
		
		controller.deleteRecord()
		
		if (utils.hasRecords(foundset) && flagSet) {
			flag_default = 1
		}
		
		//update valuelists
		forms.WEB_0F_page__design.REC_on_select()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"DE64A71B-0697-428B-ABE2-AA86FFB201F6"}
 */
function REC_new() {
	controller.newRecord(false)
	elements.fld_language_name.requestFocus(false)
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"9E666570-A83D-4F2E-A313-3B458326C798"}
 * @AllowToRunInFind
 */
function REC_on_select(event) {
//	var fsPage = forms.WEB_0F_site_1L_page__languages.foundset
//	
//	if (utils.hasRecords(foundset)) {
//		fsPage.find()
//		fsPage.web_page_to_language.id_site_language = id_site_language
//		var results = fsPage.search()
//	}
//	else {
//		fsPage.clear()
//	}
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
 * @properties={typeid:24,uuid:"165FE0CB-8A0F-4305-91A5-7D54E5190A28"}
 */
function FLD_data_change__flag_default(oldValue, newValue, event) {
	var record = foundset.getSelectedRecord()
	
	if (newValue) {
		for (var i = 1; i <= foundset.getSize(); i++) {
			var tempRecord = foundset.getRecord(i)
			
			if (tempRecord.id_site_language != record.id_site_language) {
				tempRecord.flag_default = null
			}
		}
	}
	else {
		globals.DIALOGS.showErrorDialog(
						'Error',
						'There must always be a default'
				)
			record.flag_default = 1
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
 * @properties={typeid:24,uuid:"CBDEDE6A-C474-4B14-B2B8-CC4045424F28"}
 */
function FLD_data_change__language_name(oldValue, newValue, event) {
	//update valuelists
	forms.WEB_0F_page__design.REC_on_select()	
		
	return true
}
