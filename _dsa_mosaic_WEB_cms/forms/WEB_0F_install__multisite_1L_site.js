/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"ABF7F17A-EA83-401A-B284-FB6AA2F07391"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D2FA773B-16B8-4FF9-9D0B-CBFF5B309A44"}
 */
function GOTO_site(event) {
	//not running in data sutra application framework, just show form
	if (globals.WEBc_sutra_trigger('TRIGGER_navigation_set',['CMS_site',true,foundset]) == 'noSutra') {
		forms.WEB_0F_site.controller.show()
		forms.WEB_0F_site.controller.loadRecords(foundset.unrelate())
	}
}

/**
 * @properties={typeid:24,uuid:"A4F191DC-B992-4F25-B595-6AB2460E840F"}
 */
function REC_ungroup() {
	var delRec = globals.DIALOGS.showWarningDialog(
						'Ungroup',
						'Do you really want to remove this site from the group?',
						'Yes',
						'No'
					)
	
	if (delRec == 'Yes') {
		multisite_key = null
		databaseManager.saveData(foundset.getSelectedRecord())
	}
}
