/**
 * @properties={typeid:35,uuid:"46DACEFD-6F16-46F7-827B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Update display as needed when block selected.
 * 
 * @properties={typeid:24,uuid:"C4FCD4BB-E90B-46E1-BDDA-890B883963D4"}
 */
function INIT_data() {
	var data = globals.CMS.ui.getData(controller.getName())
	
	var html = '<html><body><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>'
	if (data.Content) {
		html += data.Content
	}
	html += '</body></html>'
	
	if (elements.bn_browser) {
		elements.bn_browser.html = html
	}
	else {
		globals.WEBc_browser_error()
	}
}
