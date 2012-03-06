/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A6D51F39-3808-42DD-87E3-1C1873C0FFF5",variableType:12}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8D155492-FBF6-48A3-B75C-F0125289B3A1"}
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
