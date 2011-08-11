/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f54"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"7A39A8A4-42ED-4C5B-8F93-1950E5A38B3A"}
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
 */	//TODO: renumber the remaining versions

if (utils.hasRecords(foundset)) {
	var delRec = plugins.dialogs.showWarningDialog(
			'Delete record',
			'Do you really want to delete this record?',
			'Yes',
			'No'
		)
			
	if (delRec == 'Yes') {
		controller.deleteRecord()
		
		//refresh version valuelist
		forms.WEB_0F_page__design.SET_versions(true)
		//set version to be whatever was specified
		globals.WEB_page_version = forms.WEB_0F_page__design_1F_version.id_version
		
		//update all valuelists to show correct bolded status
		if (!utils.hasRecords(foundset)) {
			forms.WEB_0F_page.SET_valuelists()
		}
	}
}
else {
	plugins.dialogs.showErrorDialog(
					'Error',
					'No records'
			)
}

}
