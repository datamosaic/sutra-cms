/**
 * @properties={type:12,typeid:36,uuid:"DDA18819-78DA-4934-9F91-456CF2D7371E"}
 */
function attribute_key()
{
	if (utils.hasRecords(web_attribute_to_site_attribute)) {
		return web_attribute_to_site_attribute.attribute_key
	}
	else {
		return attribute_key
	}
}

/**
 *
 * @properties={type:12,typeid:36,uuid:"701ADCAF-AF30-4CE7-BA3D-74AF9B57CB30"}
 */
function row_background()
{
	//white/tan with medium blue highlighter

	var index = arguments[0]
	var selected = arguments[1]

	if (selected) {
		return '#BED7F7'
	}
	else {
		if (index % 2 == 0) {
			return '#F7F8EF'
		}
		else {
			return '#FFFFFF'
		}
	}
}
