/**
 *
 * @properties={typeid:24,uuid:"9678BE76-532F-48F9-AA27-99D51DA8311B"}
 */
function VIEW_default()
{
	// input
	var data 	= arguments[0] // map
	var params	= arguments[1] // filter
	  
	// 1) get data from map and filter if data not in map already
	
	// 2) build results
	var markup = 	'<div id="data-<<id_block_data>>">\n' +
						'\t<<content>>\n' +
					'</div>'
	
	markup = markup.replace(/<<id_block_data>>/ig, data.id_block_data)
	markup = markup.replace(/<<content>>/ig, data.Content)
	
	
	// return
	return markup
}
