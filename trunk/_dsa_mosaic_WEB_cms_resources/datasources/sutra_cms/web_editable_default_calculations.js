/**
 * Display name of block (if scrapbook) otherwise type of block
 * 
 * @properties={type:12,typeid:36,uuid:"3F7650D8-DCBE-4F90-B448-717CCBFE8B4D"}
 */
function display_block() {
	if (utils.hasRecords(web_editable_default_to_block)) {
		if (web_editable_default_to_block.block_name) {
			return web_editable_default_to_block.block_name
		}
		else {
			return web_editable_default_to_block.web_block_to_block_type.block_name + ' Scrapbook'
		}
	}
	else {
		return application.getValueListDisplayValue('WEB_block_types',id_block_type)
	}
}

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
 * @properties={type:12,typeid:36,uuid:"CCFA078F-04DC-4D86-B126-FE12C22AF81C"}
 */
function row_background(index, selected, elementType, dataProviderID, edited) {
	var scrapbook = id_block
	
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
				return '#FBFBFB'
			}
			else {
				return '#FFFFFF'
			}
		}
	}
}
