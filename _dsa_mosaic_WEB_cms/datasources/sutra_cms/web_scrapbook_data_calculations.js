/**
 *
 * @properties={type:12,typeid:36,uuid:"5AECD874-B4C2-4B46-8E60-49734D5F62D4"}
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
