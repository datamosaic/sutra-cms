/**
 * @properties={typeid:35,uuid:"95B8441F-6A9D-42DC-89D4-0233FA1D2FF8",variableType:4}
 */
var assetID = null;

/**
 * @properties={typeid:24,uuid:"C9F98E2A-77D9-4B9D-9F88-EB6D770007DA"}
 */
function CHOOSE_version(input) {
	//menu items
	var valuelistDisplay = new Array()
	var valuelistReal = new Array()
	
	for (var i = 1; i < web_asset_group_to_asset.getSize(); i++) {
		var assetRec = web_asset_group_to_asset.getRecord(i)
		
		//get meta data points we need
		var metaRows = new Object()
		for (var j = 1; j <= assetRec.web_asset_to_asset_meta.getSize(); j++) {
			var record = assetRec.web_asset_to_asset_meta.getRecord(j)
			metaRows[record.data_key] = record
		}
		
		var html = '<html><body>'
		html += '<strong>Name</strong>: ' + assetRec.asset_title + '<br>'
		html += '<strong>Directory</strong>: ' + assetRec.asset_directory + '<br>'
		html += '<strong>Size</strong>: ' + assetRec.display_asset_size + '<br>'
		html += '<strong>Width</strong>: ' + metaRows.width.data_value + '<br>'
		html += '<strong>Height</strong>: ' + metaRows.height.data_value
		html += '</body></html>'
		
		valuelistDisplay.push(html)
		valuelistReal.push(assetRec.id_asset)
	}
	
	//called to depress menu
	if (input instanceof JSEvent) {
		//set up menu with arguments
		var menu = new Array()
		
		for ( var i = 0 ; i < valuelistDisplay.length ; i++ ) {
			//checked
			if (valuelistReal[i] == assetID) {
				menu[i] = plugins.popupmenu.createCheckboxMenuItem(valuelistDisplay[i],CHOOSE_version)
			}
			else {
				menu[i] = plugins.popupmenu.createMenuItem(valuelistDisplay[i],CHOOSE_version)
			}
			
			menu[i].setMethodArguments(valuelistReal[i])
			
			if (menu[i].text == '----') {
				menu[i].setEnabled(false)
			}
		}
		
		//popup
		var elem = elements[input.getElementName()]
		if (elem != null) {
			plugins.popupmenu.showPopupMenu(elem, menu)
		}
	}
	//menu shown and item chosen
	else {
		assetID = input
	}
}
