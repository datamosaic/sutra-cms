/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f44",variableType:12}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"78EDC46D-1684-4832-AF54-36EBA13946AC"}
 * @AllowToRunInFind
 */
function GOTO_page(event) {
	//not running in data sutra application framework, just show form
	if (globals.WEBc_sutra_trigger('TRIGGER_navigation_set',['CMS_page']) == 'noSutra') {
		forms.WEB_0F_page.controller.show()
	}
	
	//set group to selected site group; we're jumping to this record because it has this group, should probably be on it
	globals.WEB_page_group = forms.WEB_0F_site_1L_site_group.id_site_group.toString()
	
	forms.WEB_0F_page.foundset.find()
	forms.WEB_0F_page.foundset.id_page = id_page
	forms.WEB_0F_page.foundset.search()
}
