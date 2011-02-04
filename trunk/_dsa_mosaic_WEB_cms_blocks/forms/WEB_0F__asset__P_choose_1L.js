/**
 *
 * @properties={typeid:24,uuid:"43009ECC-4560-4F35-AAE5-9C886BADAF92"}
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
