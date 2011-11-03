/**
 * @properties={typeid:35,uuid:"D00F96B5-80F7-4362-AC89-A77CC0B9D1EE"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"AD183074-9718-4651-AF87-090791DED375"}
 */
function FORM_onShow(firstShow, event) {
	
	controller.loadAllRecords()

}
