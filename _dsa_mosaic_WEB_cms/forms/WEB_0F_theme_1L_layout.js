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
function REC_delete() {
	//there are records using this layout, give a strong warning message
	if (forms.WEB_0F_theme_1L_page.foundset) {
		var delRec = plugins.dialogs.showWarningDialog(
					'Delete record',
					'Some pages reference this layout and deleting it will cause those pages to be orphaned from a layout.\nAre you sure you want to delete this layout?',
					'Yes',
					'No'
				)
	}
	else {
		var delRec = plugins.dialogs.showWarningDialog(
					'Delete record',
					'Do you really want to delete this record?',
					'Yes',
					'No'
				)
	}
	
	if (delRec == 'Yes') {
		controller.deleteRecord()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"DBF7019B-9E07-4637-B4E3-F598E32F4D1A"}
 */
function REC_on_select() {
	var fsPage = forms.WEB_0F_theme_1L_page.foundset
	
	if (utils.hasRecords(foundset)) {
		
		forms.WEB_0F_theme_1L_editable.foundset.loadRecords(web_layout_to_editable)
		
		globals.CODE_cursor_busy(true)
		
		//TODO: the final part of the query should be b.id_layout (layout lives in version table, but that only returns a few pages)
		var query = 
"SELECT DISTINCT c.id_page FROM web_platform a, web_version b, web_page c WHERE \
	a.id_platform = b.id_platform AND \
	a.id_page = c.id_page AND \
	a.id_layout = ?"
		
		var dataset = databaseManager.getDataSetByQuery(
					'sutra_cms', 
					query, 
					[id_layout.toString()], 
					-1
				)
		
		//load correct pages that this is used on
		fsPage.loadRecords(dataset)
		
		globals.CODE_cursor_busy(false)
	}
	else {
		fsPage.clear()
	}
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

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"31537525-46DE-4A2A-ACC9-9A9125BFBD9A"}
 */
function REC_new(event) {
	forms.WEB_0F_theme.ACTION_new_layout()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"86CB740F-CD69-4889-9F9A-70743385A0A2"}
 */
function ACTIONS_list(event) {
	forms.WEB_0F_theme.LAYOUTS_action_list(event)
}
