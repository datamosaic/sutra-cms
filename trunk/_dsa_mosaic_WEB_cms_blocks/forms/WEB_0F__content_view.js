/**
 * @properties={typeid:35,uuid:"46DACEFD-6F16-46F7-827B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Update display as needed when block selected.
 *
 * @param 	{JSEvent}	event The event that triggered the action.
 * @param	{Boolean}	[alwaysRun] Force the on select method to refire.
 * 
 * @properties={typeid:24,uuid:"C4FCD4BB-E90B-46E1-BDDA-890B883963D4"}
 */
function REC_on_select(event,alwaysRun) {
	//run on select only when it is 'enabled'
	if (alwaysRun || globals.WEBc_block_enable(event)) {
		var fsBlockData = globals.WEBc_block_getData(event)
		
		var html = '<html><body>'
		if (utils.hasRecords(fsBlockData)) {
			html += fsBlockData.data_value
		}
		html += '</body></html>'
		
		if (elements.bn_browser) {
			elements.bn_browser.html = html
		}
		else {
			globals.WEB_browser_error()
		}
	}
}
