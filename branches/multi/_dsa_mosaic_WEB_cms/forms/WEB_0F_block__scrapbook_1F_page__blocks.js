/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22121f18"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"668D91EA-CDE9-4DC7-8A9F-DD87FBC1C702"}
 */
function FORM_on_load(event) {
	//don't run in headless client
	if (application.getApplicationType() != APPLICATION_TYPES.HEADLESS_CLIENT) {
		//set combobox to be square on os x
		globals.CODE_property_combobox(false, 'mini')
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"F7D69635-C7FC-4DDF-8217-2DB4F9A311F7"}
 */
function REC_new(event) {
	forms.WEB_0F_block__scrapbook.REC_new()
}
