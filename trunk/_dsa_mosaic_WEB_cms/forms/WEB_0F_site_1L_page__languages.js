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
	//not running in data sutra application framework, just show form
	if (globals.WEBc_sutra_trigger('TRIGGER_navigation_set',['CMS_page']) == 'noSutra') {
		forms.WEB_0F_page.controller.show()
	}
	
	//set language to selected site language; we're jumping to this record because it has this language, should probably be on it
	globals.WEB_page_language = forms.WEB_0F_site_1L_site_language.id_site_language.toString()
	
	forms.WEB_0F_page.foundset.find()
	forms.WEB_0F_page.foundset.id_page = id_page
	forms.WEB_0F_page.foundset.search()
}
