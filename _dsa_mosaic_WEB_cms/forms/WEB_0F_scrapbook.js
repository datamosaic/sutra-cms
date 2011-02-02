/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f51"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"69CCDB89-DD7A-46C7-BF3D-F1BD0BC5BF7F"}
 */
function REC_delete()
{
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
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A17B8FB8-4920-4F9A-92F8-6B9C7F3B4E0D"}
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

/**
 *
 * @properties={typeid:24,uuid:"81BCE4C0-7411-4947-8D02-0A5025D053CD"}
 */
function REC_new() {
	controller.newRecord(true)
	id_site = forms.WEB_0F_site.id_site
	elements.fld_scrapbook_name.requestFocus(false)
}
