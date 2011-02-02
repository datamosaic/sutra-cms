/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f40"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"6CC042F4-C204-4D07-9FFC-2D5984DFAE56"}
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
 * @properties={typeid:24,uuid:"DBF7019B-9E07-4637-B4E3-F598E32F4D1A"}
 */
function REC_selected()
{
	globals.WEB_layout_selected = id_layout
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"A42DF5D2-BC1F-44CF-9BA7-9CBA87C0FF96"}
 */
function FLD_data_change__flag_default(oldValue, newValue, event) {
//	var record = foundset.getRecord(foundset.getSelectedIndex())
//		
//	var dupe = databaseManager.getFoundSet('sutra_cms','web_layout')
//	
//	dupe.find()
//	dupe.id_theme = record.id_theme
//	dupe.search()
//	
//	if (newValue) {
//		
//		//fsupdater broken as of 5.1.4??
////		var fsUpdater = databaseManager.getFoundSetUpdater(foundset)
////		fsUpdater.setColumn('flag_default',0)
////		fsUpdater.performUpdate()
////
////		record.flag_default = 1
//		
//		for (var i = 1; i <= dupe.getSize(); i++) {
//			var recLayout = dupe.getRecord(i)
//			
//			if (recLayout.id_layout != record.id_layout) {
//				recLayout.flag_default = 0
//			}
//		}
//		
//		databaseManager.saveData()
//	}
//	else {
//		plugins.dialogs.showErrorDialog(
//					'Error',
//					'There must be a default layout set'
//			)
//		
//		record.flag_default = 1
//	}
//	
//	return true
//
if (flag_default) {
	var fsUpdater = databaseManager.getFoundSetUpdater(foundset)
	fsUpdater.setColumn('flag_default',0)
	fsUpdater.performUpdate()
	flag_default = 1
}


}
