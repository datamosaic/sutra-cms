/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f23"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"C41ECC9A-6A48-4582-8EBC-4A0555C8514B"}
 */
function REC_delete()
{

/*
 *	TITLE    :	REC_delete
 *			  	
 *	MODULE   :	start_CRM_mosaic
 *			  	
 *	ABOUT    :	prompts to delete the currently selected record
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	REC_delete()
 *			  	
 *	MODIFIED :	July 31, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

	var delRec = globals.DIALOGS.showWarningDialog(
	'Delete record',
	'Do you really want to delete this record?',
	'Yes',
	'No')
	
	if (delRec == 'Yes') {
	
	controller.deleteRecord()

}

}

/**
 *
 * @properties={typeid:24,uuid:"1D4CC972-6BFA-48E7-8792-CB26CBD5A9E3"}
 */
function REC_new() {
	controller.newRecord(false)
	databaseManager.saveData()
}
