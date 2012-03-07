/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F53A0FCC-98AC-44B1-B8F5-0C8F46FD4B81"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"BD670864-BA2F-4C2E-8544-B4595181E48D"}
 */
function REC_new(event) {
	controller.newRecord(false)
	controller.focusFirstField()
}

/**
 * @properties={typeid:24,uuid:"931EA6E8-C7A8-43B1-A325-3E99810FE40E"}
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
