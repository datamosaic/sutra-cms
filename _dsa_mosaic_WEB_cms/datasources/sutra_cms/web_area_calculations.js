/**
 *
 * @properties={type:4,typeid:36,uuid:"32825AF8-DAA9-47D2-986C-6953DB237E7B"}
 */
function id_page()
{
	if (utils.hasRecords(web_area_to_version)) {
		return web_area_to_version.id_page
	}
}

/**
 *
 * @properties={type:12,typeid:36,uuid:"9A1C08E3-E88C-4854-AB8C-A5EABF426E9A"}
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
