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
	forms.WEB_0F_scrapbook.REC_new()
}
