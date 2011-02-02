/**
 *
 * @properties={type:12,typeid:36,uuid:"C79CD5FE-2877-476B-B8DF-FB680327849C"}
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
