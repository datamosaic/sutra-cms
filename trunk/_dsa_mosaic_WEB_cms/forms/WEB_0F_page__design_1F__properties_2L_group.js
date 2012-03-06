/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A4F401E1-947D-4140-823B-443397377D88",variableType:12}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"02ACFB80-A22C-4BCF-8BDA-732AA6E0FC70"}
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
 * @properties={typeid:24,uuid:"D9FE8997-5EC7-4139-BC4A-66A31AB6740F"}
 */
function REC_on_select(event) {
	
}
