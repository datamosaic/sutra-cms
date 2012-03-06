/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f46"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:24,uuid:"3BEB47AA-E22C-431C-AAF9-0AE55A21E28F"}
 */
function ACTIONS_list() {
	if (utils.hasRecords(forms.WEB_0F_site_1L_site_attribute.foundset)) {
		//call page picker method, pass in element to use
		globals.WEBc_page_picker(ACTION_add_attribute,arguments[0])
	}
	else {
		plugins.dialogs.showErrorDialog(
					'Error',
					'You must select an attribute to add a page to'
			)
	}
}

/**
 * @properties={typeid:24,uuid:"7B7B5A06-CDE5-4E3D-A315-237E4A32E205"}
 */
function ACTION_add_attribute(inputID) {
	if (inputID) {
		var record = foundset.getRecord(foundset.newRecord(false,true))
		record.id_page = inputID
		record.id_site_attribute = forms.WEB_0F_site_1L_site_attribute.id_site_attribute
		record.attribute_value = foundset.getSize()
		
		databaseManager.saveData()
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"863281D0-6224-4569-8FB5-8FE76235CA1E"}
 */
function REC_delete(event) {
	var delRec = plugins.dialogs.showWarningDialog(
					'Delete record',
					'Do you really want to delete this record?',
					'Yes',
					'No'
				)

	if (delRec == 'Yes') {
		controller.deleteRecord()
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1E5F2F8A-95CE-45FA-B03D-18866F1BDAFC"}
 * @AllowToRunInFind
 */
function GOTO_page(event) {
	//not running in data sutra application framework, just show form
	if (globals.WEBc_sutra_trigger('TRIGGER_navigation_set',['CMS_page']) == 'noSutra') {
		forms.WEB_0F_page.controller.show()
	}
	
	forms.WEB_0F_page.foundset.find()
	forms.WEB_0F_page.foundset.id_page = id_page
	forms.WEB_0F_page.foundset.search()
}
