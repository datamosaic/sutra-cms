/**
 * @properties={type:12,typeid:36,uuid:"7A32A275-4742-448E-AC0E-BC75868B2504"}
 */
function id_block_display()
{
	if (id_scrapbook) {
		return web_block_to_scrapbook.id_block_display
	}
	else {
		return id_block_display
	}
}

/**
 *
 * @properties={type:12,typeid:36,uuid:"B9AE4773-F5E7-468E-8A08-076CD774CD46"}
 */
function params()
{
	if (id_scrapbook) {
		return web_block_to_scrapbook.params
	}
	else {
		return params
	}
}

/**
 *
 * @properties={type:12,typeid:36,uuid:"12906DFC-E969-45E6-86B6-C91DE92F4735"}
 */
function row_background()
{
	//white/tan with medium blue highlighter and green if a scrapbook
	
	var index = arguments[0]
	var selected = arguments[1]
	
	if (selected) {
		if (id_scrapbook) {
			return '#B6E6B6'
		}
		else {
			return '#BED7F7'
		}
	}
	else {
		if (id_scrapbook) {
			return '#DBF5DB'
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
}
