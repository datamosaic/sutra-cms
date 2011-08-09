/**
 * @properties={typeid:35,uuid:"4FDACEFD-6F16-46F7-827B-375E25823AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"3C0502A7-B843-4486-BD1A-4E087A858D70"}
 */
function REC_delete()
{
	var delRec = plugins.dialogs.showWarningDialog(
	'Delete record',
	'Do you really want to delete this record?',
	'Yes',
	'No')

	if (delRec == 'Yes') {

	controller.deleteRecord()
	}
}
