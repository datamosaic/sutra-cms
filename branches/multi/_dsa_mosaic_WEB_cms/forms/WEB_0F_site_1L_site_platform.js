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
		controller.deleteRecord()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"D8AB6954-FA06-4643-8FBF-49FC945CC74D"}
 */
function REC_new() {
	controller.newRecord(false)
	elements.fld_platform_name.requestFocus(false)
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
