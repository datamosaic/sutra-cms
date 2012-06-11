/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"018AE33A-BE2B-457F-8287-424D6CC1CCD2"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"0B755B66-35A8-4F16-B222-9B33D0059067"}
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
 * @properties={typeid:24,uuid:"5272690D-4A64-4AB4-9867-CC3849001D27"}
 */
function REC_new() {
	controller.newRecord(false)
	databaseManager.saveData()
}
