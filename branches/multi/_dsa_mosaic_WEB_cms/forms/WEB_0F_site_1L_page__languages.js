/**
 * @properties={typeid:35,uuid:"79912FB2-9BCA-498A-94D7-11603FF15DEE"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"014CE968-52EF-4EDF-885A-71587E47E5D9"}
 */
function GOTO_page(event) {
	globals.TRIGGER_navigation_set('CMS_page')
	
	forms.WEB_0T_page.SET_page(id_page)
}
