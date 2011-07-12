/**
 * @properties={typeid:35,uuid:"02B408A8-5629-4892-AE08-90EB9C748B07",variableType:4}
 */
var _contentFilter = 1;

/**
 * @properties={typeid:35,uuid:"D72452C6-C104-4BDF-B9BC-9A79695092C2"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D9BEFB68-B1F1-4C4A-8957-ABFED75A24BA"}
 */
function FORM_on_load(event) {
	//don't run in headless client
	if (application.getApplicationType() != APPLICATION_TYPES.HEADLESS_CLIENT) {
		//set combobox to be square on os x
		globals.CODE_property_combobox(true)
	}
}
