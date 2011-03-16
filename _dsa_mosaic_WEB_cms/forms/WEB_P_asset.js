/**
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EB853B3F-BD76-4C9F-9F57-538105A40151"}
 */
function ACTION_ok(event) {
	//not already ok to close, cancel
	if (!globals.CODE_hide_form) {
		//save data
		databaseManager.saveData()
		
		//turn autosave back on
		databaseManager.setAutoSave(true)
		
		//enaable closing the form
		globals.CODE_hide_form = 1
		
		application.closeFormDialog('cmsAssetNew')
	}
}

/**
 *
 * @properties={typeid:24,uuid:"ADCC3FAC-8D9B-4017-8057-22C348AD9704"}
 */
function ACTION_cancel() {
	//not already ok to close, cancel
	if (!globals.CODE_hide_form) {
		//rollback edited records
		databaseManager.rollbackEditedRecords()
		
		//turn autosave back on
		databaseManager.setAutoSave(true)
		
		//enaable closing the form
		globals.CODE_hide_form = 1
		
		application.closeFormDialog('cmsAssetNew')
	}
}

/**
 *
 * @properties={typeid:24,uuid:"030100B3-4EA8-4BD4-AC55-D0E0461CAA67"}
 */
function FORM_on_show() {
	globals.CODE_hide_form = 0
}
