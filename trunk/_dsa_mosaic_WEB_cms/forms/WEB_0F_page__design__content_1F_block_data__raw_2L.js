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
