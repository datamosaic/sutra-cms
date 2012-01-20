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
	var formName = 'WEB_0F__block_builder'
	
	//grab all data for this block
	var allFields = globals.CMS.ui.getData(controller.getName())
	
	var blockList = new Array()
	
	//build object for list to operate from
	for (var i in allFields) {
		var fieldData = plugins.serialize.fromJSON(allFields[i])
		
		//we need order, type, and whatnot that may be buried in an array
		if (fieldData instanceof Array && fieldData[0]) {
			var order = fieldData[0].order
			var type = fieldData[0].type
		}
		else {
			var order = fieldData.order
			var type = fieldData.type
		}
		
		//create object to use for reference while on this block
		blockList[order] = {
						key : i,
						type : type
					}
		
		//this is a repeatable field that hasn't been used before
		if (!(fieldData instanceof Array) && fieldData.repeatable) {
			blockList[order].data = new Array(fieldData)
		}
		//this isn't a repeatable field or it has already been array-ized
		else {
			blockList[order].data = fieldData
		}
		
	}
	
	var html = '<html><body><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>'
	for (var i = 0; i < blockList.length; i++) {
		var method = 'MRKP_' + blockList[i].type
		
		// this method exists
		if (solutionModel.getForm(controller.getName()).getFormMethod(method)) {
			html += forms.WEB_0F__block_builder[method](blockList[i].data) + '\n'
		}
	}
	html += '</body></html>'
	
	if (elements.bn_browser) {
		elements.bn_browser.html = html
	}
	else {
		globals.WEBc_browser_error()
	}
}
