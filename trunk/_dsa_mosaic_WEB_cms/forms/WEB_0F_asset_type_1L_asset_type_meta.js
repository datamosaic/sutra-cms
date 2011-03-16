/**
 * @properties={typeid:35,uuid:"0FECFD05-A2A6-4032-9D2E-9B184B2C76BD"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"88C3E79B-A20E-4F34-A7A8-D52F2FEC9AA5"}
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
 * @properties={typeid:24,uuid:"C2E18882-11AE-485A-8618-B457E25460EF"}
 */
function REC_new() {
	controller.newRecord(false)
	controller.focusFirstField()
}
