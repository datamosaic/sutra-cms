/**
 * @properties={typeid:35,uuid:"73B51F9E-895C-42D7-8916-288A11719546"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"64A9C9A3-9681-40E6-BE47-293A2C7514C9"}
 */
function GOTO_page(event) {
	globals.TRIGGER_navigation_set('CMS_page')
	
	forms.WEB_0T_page.SET_page(id_page)
}
