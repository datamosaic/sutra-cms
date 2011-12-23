/**
 * Calculate the row background color.
 *
 * @param {Number} index row index
 * @param {Boolean} selected is the row selected
 * @param {String} elementType element type
 * @param {String} dataProviderID element data provider
 * @param {Boolean} edited is the record edited
 *
 * @returns {Color} row background color
 *
 * @properties={type:12,typeid:36,uuid:"49A8A20F-DDE1-4E67-9DC0-6235D529F44F"}
 */
function row_background(index, selected, elementType, dataProviderID, edited) {
	var scrapbook = utils.hasRecords(web_scope_to_block) && web_scope_to_block.scope_type
	
 	//white/tan with medium blue highlighter and green if a scrapbook
	if (selected) {
		//there are blocks and they aren't unique
		if (scrapbook) {
			return '#B6E6B6'
		}
		else {
			return '#BED7F7'
		}
	}
	else {
		if (scrapbook) {
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
