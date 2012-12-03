/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"88479F13-FA2E-4BD8-81ED-9CAFD1B5FFB8"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"DECE5802-4C9E-46D9-AC9C-377F8D1172A0"}
 */
function REC_delete(event) {
	var delRec = globals.DIALOGS.showWarningDialog(
					'Delete record',
					'Do you really want to delete this record?',
					'Yes',
					'No'
				)
	
	//TODO: beef up delete
	if (delRec == 'Yes') {
		controller.deleteRecord()
	}
}

/**
 * @properties={typeid:24,uuid:"DBF2E423-08FD-4BDC-8956-B4084B100EFA"}
 */
function REC_new() {
	controller.newRecord()
	elements.fld_data_key.requestFocus(false)
}
