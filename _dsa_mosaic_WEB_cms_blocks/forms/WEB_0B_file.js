/**
 *
 * @properties={typeid:24,uuid:"80EA1B97-740F-484E-A3F2-665F9CAB70DD"}
 */
function ACTION_import()
{
	// TODO: handle reading text files
	
	// input file	  
	var file = plugins.file.showFileOpenDialog()
	if ( !file ) {
		return "Selection cancelled"
	}
	
	// copy file details to block data points
	var fileOBJ = {}
	fileOBJ.file_name = file.getName()
	fileOBJ.file_type = file.getContentType()
	fileOBJ.rec_created = new Date()
	
	var data = forms.WEB_0F_page__design.web_page_to_block_data_by_area_by_block
	for (var i = 0; i < data.getSize(); i++) {
		var record = data.getRecord(i + 1)
		record.data_value = fileOBJ[record.data_key]
	}
		
	// save file
	var outputFile = plugins.file.showFileSaveDialog()
	if ( !outputFile ) {
		return "File save cancelled"
	}
	var success = plugins.file.copyFile(file, outputFile)
	if ( !success ) {
		return "File save error"
	}
}

/**
 *
 * @properties={typeid:24,uuid:"A6EE188A-6280-4B2D-ADEC-9C67413840B1"}
 */
function VIEW_default()
{
	// input
	var data 	= arguments[0] // map
	var params	= arguments[1] // filter
	  
	// 1) get data from map and filter if data not in map already
	
	// template
	var markup = data.Content	
	
	// return
	return markup
}

/**
 * @properties={typeid:24,uuid:"560BA604-C1B4-467F-B464-0449BC91109D"}
 */
function VIEW_download()
{
}

/**
 * @properties={typeid:24,uuid:"D3C0F0C6-BD64-45A8-B042-20F82E295D5E"}
 */
function VIEW_lightbox()
{
}
