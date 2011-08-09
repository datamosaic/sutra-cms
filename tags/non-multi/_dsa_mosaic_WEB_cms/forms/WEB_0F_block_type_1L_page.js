/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f25"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"000690EA-3A75-4324-8770-4E037C757347"}
 */
function GOTO_page(event) {
	globals.TRIGGER_navigation_set('CMS_page')
	
	forms.WEB_0T_page.SET_page(id_page)
}
