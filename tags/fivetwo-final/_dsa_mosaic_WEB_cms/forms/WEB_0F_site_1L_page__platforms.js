/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"73B51F9E-895C-42D7-8916-288A11719546"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"64A9C9A3-9681-40E6-BE47-293A2C7514C9"}
 * @AllowToRunInFind
 */
function GOTO_page(event) {
	//not running in data sutra application framework, just show form
	if (globals.WEBc_sutra_trigger('TRIGGER_navigation_set',['CMS_page']) == 'noSutra') {
		forms.WEB_0F_page.controller.show()
	}
	
	//set platform to selected site platform; we're jumping to this record because it has this platform, should probably be on it
	globals.WEB_page_platform = forms.WEB_0F_site_1L_site_platform.id_site_platform.toString()
	
	forms.WEB_0F_page.foundset.find()
	forms.WEB_0F_page.foundset.id_page = id_page
	forms.WEB_0F_page.foundset.search()
}
