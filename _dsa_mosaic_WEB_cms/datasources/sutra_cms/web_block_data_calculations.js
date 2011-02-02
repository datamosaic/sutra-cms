/**
 *
 * @properties={type:12,typeid:36,uuid:"1644301C-C7A4-404D-AF35-581D0B53BBD0"}
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
