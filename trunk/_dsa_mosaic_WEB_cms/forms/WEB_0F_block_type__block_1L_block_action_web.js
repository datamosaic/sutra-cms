/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f21"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"C9FE753F-4812-4631-A939-CC5D229C2BD2"}
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

var delRec = plugins.dialogs.showWarningDialog(
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
 * @properties={typeid:24,uuid:"13E1B637-6872-49DD-8561-DD8BCE8D30DA"}
 */
function REC_new() {
	controller.newRecord(false)
	databaseManager.saveData()
}
