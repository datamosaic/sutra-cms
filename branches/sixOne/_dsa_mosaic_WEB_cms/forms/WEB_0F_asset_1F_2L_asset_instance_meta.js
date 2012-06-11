/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0FECFD05-B2A6-4032-9D2E-9B184B2B76BD"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"13DEED7A-418F-4849-A89C-5FDEC8A80592"}
 */
function REC_delete() {
	var delRec = globals.DIALOGS.showWarningDialog(
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
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"417BB7E7-DC04-4489-ABAD-AD3FED43A461"}
 */
function FLD_action__data_value(event) {
	elements.fld_data_value.requestFocus(false)
}
