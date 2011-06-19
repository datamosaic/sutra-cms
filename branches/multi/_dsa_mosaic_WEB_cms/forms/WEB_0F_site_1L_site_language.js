/**
 * @properties={typeid:35,uuid:"A9AC62EB-5C7C-4559-B231-67076B5EB855"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"889B3271-6D03-4C89-9414-779DB1943AD9"}
 */
function REC_delete() {
	var delRec = plugins.dialogs.showWarningDialog(
					'Delete record',
					'Do you really want to delete this record?',
					'Yes',
					'No'
				)

	if (delRec == 'Yes') {
		controller.deleteRecord()
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
 */
function REC_on_select(event) {
	var fsPage = forms.WEB_0F_site_1L_page__languages.foundset
	
	if (utils.hasRecords(foundset)) {
		fsPage.find()
		fsPage.web_page_to_language.id_site_language = id_site_language
		var results = fsPage.search()
	}
	else {
		fsPage.clear()
	}
}
