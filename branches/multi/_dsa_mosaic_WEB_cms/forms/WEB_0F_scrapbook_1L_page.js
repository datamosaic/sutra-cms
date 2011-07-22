/**
 * @properties={typeid:35,uuid:"76462F92-66C1-4BD5-8BF2-514D99234191"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E5DCDB50-4E13-4376-88F0-061CDDD46183"}
 */
function GOTO_page(event) {
	globals.TRIGGER_navigation_set('CMS_page')
	
	forms.WEB_0T_page.SET_page(url_param)
}
