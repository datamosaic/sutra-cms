/**
 * @properties={typeid:35,uuid:"4FDACEFD-6F16-46F7-827B-375E258243D6"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"9678BE76-532F-48F9-AA27-99D51DA8311B"}
 */
function VIEW_default()
{
	// input
	var data 	= arguments[0] // map
	var params	= arguments[1] // filter
	  
	// 1) get data from map and filter if data not in map already
	
	// template
	var markup = data.Content	
	
	// return
	return markup
}
