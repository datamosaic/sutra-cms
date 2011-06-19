/**
 * @properties={type:12,typeid:36,uuid:"E0B5FAF2-D80F-4E4A-96CB-7EE5E9DE01DD"}
 */
function display_asset_info()	{
	var linebreak = function() {
		if (html != '<html><body>') {
			html += '<br>\n'
		}
	}
	
	var html = '<html><body>'
	
	if (asset_name) {
		html += '<strong>Name</strong>: ' + asset_name
	}
	
//	if (utils.hasRecords(web_asset_to_asset_instance)) {
//		linebreak()
//		
//		html += '<strong>Instances</strong>: ' + web_asset_to_asset_instance.getSize()
//	}
	
	if (utils.hasRecords(web_asset_to_asset_instance__initial)) {
		linebreak()
//		html += '<br>Defaults<br>'
//		
		//get meta data points we need
		var metaRows = new Object()
		for (var i = 1; i <= web_asset_to_asset_instance__initial.web_asset_instance_to_asset_instance_meta.getSize(); i++) {
			var record = web_asset_to_asset_instance__initial.web_asset_instance_to_asset_instance_meta.getRecord(i)
			metaRows[record.data_key] = record
		}
		
		html += '<strong>Size</strong>: ' + web_asset_to_asset_instance__initial.display_asset_size + '<br>'
		html += '<strong>Width</strong>: ' + metaRows.width.data_value + '<br>'
		html += '<strong>Height</strong>: ' + metaRows.height.data_value + '<br>'
	}
	
	
	
	html += '</body></html>'
	
	return html
}
