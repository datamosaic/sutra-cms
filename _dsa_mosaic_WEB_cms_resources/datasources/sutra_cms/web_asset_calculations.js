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
			//TODO: this is probably where the big formance hit comes in with large images
			metaRows[record.data_key] = record
		}
		
		html += '<strong>Size</strong>: ' + web_asset_to_asset_instance__initial.display_asset_size + '<br>'
		
		//image type show height/width
		if (asset_type == 1) {
			html += '<strong>Dimensions</strong>: ' + metaRows.width.data_value + ' x ' + metaRows.height.data_value + '<br>'
		}
		else if (asset_type == 2) {
			html += '<strong>File type</strong>: ' + asset_file_type + '<br>'
		}
	}
	
	html += '</body></html>'
	
	return html
}
