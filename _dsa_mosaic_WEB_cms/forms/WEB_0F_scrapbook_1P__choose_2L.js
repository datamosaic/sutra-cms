/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f48"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"8462CD49-D21E-46C1-9AA7-D98B4D3020ED"}
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
