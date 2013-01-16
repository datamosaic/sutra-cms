/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"FB4CEA9D-DD16-41D8-A060-90DEDFE885ED"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"AB05866D-6A67-43A5-946E-9DBC9CA64B52"}
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
 * @properties={typeid:24,uuid:"0AC4B862-B344-4E21-AB97-57C5D5D21FD2"}
 */
function REC_new() {
	controller.newRecord(false)
	databaseManager.saveData()
}
