/**
 * @properties={typeid:35,uuid:"3508A4FC-A664-4C36-A9B0-EC66AD37D8EA"}
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
 */
function GOTO_page(event) {
	globals.TRIGGER_navigation_set('CMS_page')
	
	forms.WEB_0F_page.foundset.find()
	forms.WEB_0F_page.foundset.id_page = id_page
	forms.WEB_0F_page.foundset.search()
}