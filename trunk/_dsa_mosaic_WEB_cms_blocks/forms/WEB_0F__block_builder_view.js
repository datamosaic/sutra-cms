/**
 * @properties={typeid:35,uuid:"B9788F56-81FC-4937-AD4E-3B1BB3B4BB9A"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Update display as needed when block selected.
 * 
 * @properties={typeid:24,uuid:"F617323D-990C-4AD0-B9A2-F4F29D82D220"}
 */
function INIT_data() {
	//grab all data for this block
	var allData = globals.CMS.ui.getData(controller.getName())
	
	var blockList = new Array()
	
	//build object for list to operate from
	for (var i in allData) {
		var fieldData = plugins.serialize.fromJSON(allData[i])
		blockList[fieldData.order] = {
							key : i,
							data : fieldData
						}
	}
	
	var html = '<html><body><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>'
//	for (var i = 0; i <= blockList.length; i++) {
//		html += blockList[i]
//	}
	html += '</body></html>'
	
	if (elements.bn_browser) {
		elements.bn_browser.html = html
	}
	else {
		globals.WEBc_browser_error()
	}
}
