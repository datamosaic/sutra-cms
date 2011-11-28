/**
 * @properties={typeid:35,uuid:"46DACEFD-6F16-46F7-827B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Update display as needed when block selected.
 * 
 * @properties={typeid:24,uuid:"C4FCD4BB-E90B-46E1-BDDA-890B883963D4"}
 */
function INIT_data() {
	var data = globals.WEBc_block_getData(controller.getName())
	
	var html = '<html><body>'
	if (data.Content) {
		html += data.Content
	}
	html += '</body></html>'
	
	if (elements.bn_browser) {
		elements.bn_browser.html = html
	}
	else {
		globals.WEB_browser_error()
	}
}
