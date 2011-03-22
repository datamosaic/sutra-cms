/**
 * @properties={typeid:35,uuid:"4FDACEFD-6F16-96F7-827B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"ABD4728C-CA5C-4D79-AB42-470E0C2435DF"}
 */
var _etherpadUUID = null;

/**
 *
 * @properties={typeid:24,uuid:"8F4D0293-999C-4F72-B472-9B161403E0D2"}
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
 * @properties={typeid:24,uuid:"C4917B70-813D-45D3-9ABF-2EA112F9EC44"}
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
 * @properties={typeid:24,uuid:"3B1B7623-F914-4E77-AD68-D1F276BEF3B3"}
 */
function VIEW_download()
{
}

/**
 * @properties={typeid:24,uuid:"868B8D01-3C50-4A9D-ABC0-2B70728A75C8"}
 */
function VIEW_lightbox()
{
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"3751F924-AA51-4D12-8EFF-E8FD65C9B6B7"}
 */
function ETHERPAD_new_pad(event) {
	
	var uuid = application.getUUID()
	
	// initial page to set cookie
	var results = application.executeProgram(
					"curl",
					"-b cookies",
					"-L",
					"http://etherpad.data-mosaic.com:9000/" + uuid)
	
			
	// create pad		
	var results = application.executeProgram(
					"curl",
					"-b cookies",
					"-d padId=" + uuid,
					"-d createPad=Create%20Pad",
					"-L",
					"http://etherpad.data-mosaic.com:9000/ep/pad/create?padId=" + uuid)
	
	etherpad_URL = 'http://etherpad.data-mosaic.com:9000/' + uuid				
		
}
