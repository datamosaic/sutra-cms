/**
 * @properties={typeid:35,uuid:"966D33E3-3B74-49CF-8F23-9DDE0FA9F621"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"F8783226-EBD5-4459-A05D-9CEBB94C648C"}
 */
function REC_delete() {
	var delRec = plugins.dialogs.showWarningDialog(
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
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"036C8C75-8B62-4221-AE5C-17A53B4CC9F6"}
 */
function FLD_platform_name__data_change(oldValue, newValue, event) {
	//update valuelists
	forms.WEB_0F_page__design.REC_on_select()	
	
	return true
}

/**
 *
 * @properties={typeid:24,uuid:"D8AB6954-FA06-4643-8FBF-49FC945CC74D"}
 */
function REC_new() {
	controller.newRecord(false)
//	elements.fld_platform_name.requestFocus(false)
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"BEA114FA-E919-4F4B-8266-13C8D84D02E5"}
 */
function REC_on_select(event) {
	var fsPage = forms.WEB_0F_site_1L_page__platforms.foundset
	
	if (utils.hasRecords(foundset)) {
		fsPage.find()
		fsPage.web_page_to_platform.id_site_platform = id_site_platform
		var results = fsPage.search()
	}
	else {
		fsPage.clear()
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
 * @properties={typeid:24,uuid:"E0694211-066D-4F0C-8AF9-F979F3F2C5CE"}
 */
function FLD_data_change__flag_default(oldValue, newValue, event) {
	var record = foundset.getSelectedRecord()
	
	if (newValue) {
		for (var i = 1; i <= foundset.getSize(); i++) {
			var tempRecord = foundset.getRecord(i)
			
			if (tempRecord.id_site_platform != record.id_site_platform) {
				tempRecord.flag_default = null
			}
		}
	}
	else {
		plugins.dialogs.showErrorDialog(
						'Error',
						'There must always be a default'
				)
			record.flag_default = 1
	}
}
