/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D72452C6-C104-4BDF-B9BC-9A79695092C2"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"02B408A8-5629-4892-AE08-90EB9C748B07",variableType:4}
 */
var _contentFilter = 1;

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D9BEFB68-B1F1-4C4A-8957-ABFED75A24BA"}
 */
function FORM_on_load(event) {
	//don't run in headless or web client (they use whatever solution is activated as context)
	if (application.getApplicationType() == APPLICATION_TYPES.SMART_CLIENT || application.getApplicationType() == APPLICATION_TYPES.RUNTIME_CLIENT) {
		//set combobox to be square on os x
		globals.CODE_property_combobox(true)
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"BB49E4A8-738B-4785-BFCC-2278871FD89A"}
 */
function FORM_on_show(firstShow, event) {
	// make scrapbook work again for the page view
	globals.WEB_block_page_mode = false
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"C67402A5-CFCF-45F5-A6C4-A46C5DCEDCB1"}
 */
function FORM_on_hide(event) {
	// make scrapbook work again for the page view
	globals.WEB_block_page_mode = true
	
	return true
}
