/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f45"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"F5A9BFE0-8D71-4C0E-AE18-04328E6D5C91"}
 */
function REC_delete()
{
	//can't rename everybody
	if (group_name == 'Everybody') {
		plugins.dialogs.showErrorDialog(
					'Error',
					'You cannot delete the "Everybody" group'
			)
	}
	else {
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
}

/**
 *
 * @properties={typeid:24,uuid:"DDA450DC-1BEC-46D0-A68B-F87B11B2E9B8"}
 */
function REC_new() {
	controller.newRecord(false)
	elements.fld_group_name.requestFocus(false)
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean} valid value
 *
 * @properties={typeid:24,uuid:"B35372DB-490C-4E30-BE71-1D86BC5075B2"}
 */
function FLD_data_change__group_name(oldValue, newValue, event) {
	//can't rename everybody
	if (oldValue == 'Everybody') {
		plugins.dialogs.showErrorDialog(
					'Error',
					'You cannot rename the "Everybody" group'
			)
		group_name = 'Everybody'
	}
	else {
		var fsGroup = databaseManager.getFoundSet(controller.getServerName(),controller.getTableName())
		fsGroup.clear()
		fsGroup.find()
		fsGroup.id_site = forms.WEB_0F_site.id_site
		fsGroup.group_name = newValue
		var results = fsGroup.search()
		
		//the path is not unique for this site
		if (results > 1) {
			plugins.dialogs.showErrorDialog(
						'Error',
						'The group name is not unique'
				)
			group_name = oldValue
		}
	}
	
	databaseManager.saveData()
	forms.WEB_0F_site.REC_on_select()
	
	return true
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"130809CF-8CCF-4180-AED8-BC70FA29B24B"}
 */
function REC_on_select(event) {
	var fsPage = forms.WEB_0F_site_1L_page.foundset
	
	if (utils.hasRecords(foundset)) {
		fsPage.find()
		fsPage.web_page_to_area__allversions.id_group = id_group
		var results = fsPage.search()
	}
	else {
		fsPage.clear()
	}
}
