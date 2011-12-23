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
