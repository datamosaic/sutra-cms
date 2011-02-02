/**
 *
 * @properties={type:12,typeid:36,uuid:"B956B677-34C2-4CE3-BE0F-659E01B0A32D"}
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
