/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4C5AC9B3-5453-4AC8-A00F-49B1D0C4E8DF",variableType:12}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"629C648C-0A4F-4F9A-94A6-58760F926473"}
 */
function REC_delete() {
	var delRec = plugins.dialogs.showWarningDialog(
					'Delete record',
					'Warning! This will delete all localized info for this page.\nDo you really want to delete this record?',
					'Yes',
					'No'
				)
	
	//TODO: beef up delete
	if (delRec == 'Yes') {
		controller.deleteRecord()
	}
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2E245E62-358F-40BF-90A4-AEEBB8B28C1A"}
 */
function REC_on_select(event) {
	
}
