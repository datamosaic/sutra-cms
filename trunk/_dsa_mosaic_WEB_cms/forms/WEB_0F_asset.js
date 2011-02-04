/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f26"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"022C11EE-D472-44B4-88EA-873A195E7136"}
 */
function REC_delete()
{
	var input = plugins.dialogs.showWarningDialog(
						'Delete',
						'Do you really want to delete this record?',
						'Yes',
						'No'
					)

	if (input == 'Yes') {
		controller.deleteRecord()
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0DFCEC6C-DF14-4E2B-BE6A-A5F986F8375C"}
 */
function TAG_add(event) {
	if (utils.hasRecords(foundset)) {
		//turn autosave off
		databaseManager.setAutoSave(false)
		
		forms.WEB_P_tag__add.callingForm = controller.getName()
		
		application.showFormInDialog(
					forms.WEB_P_tag__add,
					400,-1,-1,-1,
					'Tags',
					true,
					false,
					'tagAdd'
				)
	}
	else {
		plugins.dialogs.showErrorDialog(
						'Error',
						'There is no record to add tags to'
					)
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8372B4E8-DA55-4B6A-8F4F-4B7C787F286C"}
 */
function TAG_delete(event) {
	if (utils.hasRecords(foundset)) {
		//turn autosave off
		databaseManager.setAutoSave(false)
		
		forms.WEB_P_tag__remove.callingForm = controller.getName()
		
		application.showFormInDialog(
					forms.WEB_P_tag__remove,
					400,-1,-1,-1,
					'Tags',
					true,
					false,
					'tagDelete'
				)
	}
	else {
		plugins.dialogs.showErrorDialog(
						'Error',
						'There is no record to remove tags from'
					)
	}

}

/**
 *
 * @properties={typeid:24,uuid:"FF5AF14C-E836-4D15-897E-FC174AA6C371"}
 */
function REC_new() {
	forms.WEB_0F_asset__image.BLOCK_import()
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"CFCBF7B5-C038-4D04-AFF3-41AEA18ED580"}
 */
function FORM_on_load(event) {
	//find stuff for the selected site
	if (utils.hasRecords(forms.WEB_0F_site.foundset)) {
		foundset.find()
		foundset.id_site = forms.WEB_0F_site.id_site
		var results = foundset.search()
	}
	else {
		foundset.clear()
	}
}
