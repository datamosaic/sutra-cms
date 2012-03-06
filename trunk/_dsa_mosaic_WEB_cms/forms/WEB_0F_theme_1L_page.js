/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"3508A4FC-A664-4C36-A9B0-EC66AD37D8EA",variableType:12}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"57B64A28-D673-4B51-B6B7-4835000AAEE0"}
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
