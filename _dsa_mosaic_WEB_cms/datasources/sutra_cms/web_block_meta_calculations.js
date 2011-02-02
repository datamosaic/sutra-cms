/**
 *
 * @properties={type:12,typeid:36,uuid:"1579F141-13C5-4A1B-9ED5-BBE453BD0CC4"}
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
