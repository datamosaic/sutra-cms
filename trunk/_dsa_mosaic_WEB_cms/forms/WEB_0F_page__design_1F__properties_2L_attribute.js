/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f56",variableType:12}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"BA16D430-3443-451D-8F20-F2D94392EDDD"}
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

if (utils.hasRecords(foundset)) {
	var delRec = plugins.dialogs.showWarningDialog(
	'Delete record',
	'Do you really want to delete this record?',
	'Yes',
	'No')
	
	if (delRec == 'Yes') {
		controller.deleteRecord()
	}
}
else {
	plugins.dialogs.showErrorDialog(
					'Error',
					'No records'
			)
}

}

/**
 *
 * @properties={typeid:24,uuid:"DBECAE84-98F5-4AC6-9B6A-4AA69E711EE4"}
 */
function REC_new() {
	if ( utils.hasRecords( forms.WEB_0F_site.web_site_to_site_attribute) ) {
		controller.newRecord(false, true)
	}
	else {
		plugins.dialogs.showErrorDialog(
					'Error',
					'Site has no page attributes set up'
			)
	}
}
