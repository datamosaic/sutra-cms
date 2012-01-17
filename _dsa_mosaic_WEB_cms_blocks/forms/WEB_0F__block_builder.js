/**
 * @properties={typeid:35,uuid:"64CDD89C-D4CF-4B05-ABE7-B913A7558558"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"4E76921E-71E9-4D07-AE77-5A85D8978F9D",variableType:-4}
 */
var BUILDER = {
	staticHTML	: { type: "staticHTML", order : null, data : null },
	textBox		: { type: "textBox", order : null, label : null, wrapper : { pre : null, post : null }, required : null, maxChars : null, data : null },
	textArea	: { type: "textArea", order : null, label : null, wrapper : { pre : null, post : null }, required : null, data : null },
	image		: { type: "image", order : null, label : null, wrapper : { pre : null, post : null }, required : null, linkField: null, resizing: null, data : null },
	fileDownload: { type: "fileDownload", order : null, label : null, wrapper : { pre : null, post : null }, required : null, data : null },
	pageLink	: { type: "pageLink", order : null, label : null, wrapper : { pre : null, post : null }, required : null, data : null },
	externalURL : { type: "externalURL", order : null, label : null, wrapper : { pre : null, post : null }, required : null, newWindow : null, data : null },
	datePicker	: { type: "datePicker", order : null, label : null, wrapper : { pre : null, post : null }, required : null, format : null, data : null },
	tinyMCE		: { type: "tinyMCE", order : null, label : null, wrapper : { pre : null, post : null }, required : null, data : null },
	table		: { type: "table", order : null, label : null, wrapper : { pre : null, post : null }, required : null, columns : null, data : null }
};

/**
 * @properties={typeid:35,uuid:"3F8AFCDF-077F-4C93-8F3D-1DE8391925A9",variableType:-4}
 */
var _blockList = null;

/**
 * @properties={typeid:35,uuid:"84026904-8F0E-409A-A20D-0ADF1747E6F1",variableType:4}
 */
var _blockSelected = null;

/**
 * @param	{Object}	obj Data object passed to all markup methods
 * 
 * @properties={typeid:24,uuid:"99A2CDA1-2F7F-490F-B51C-D753D76E724D"}
 */
function VIEW_default(obj) {
	
	// order the inputs
	var instance 	= []
	for (var i in globals.CMS.data.block_data) {
		var data = plugins.serialize.fromJSON(globals.CMS.data.block_data[i])		
		instance[data.order] = data 
	}

	// return markup by order and type
	var markup = ""
	for (var i = 0; i < instance.length; i++) {
		markup += forms.WEB_0F__block_builder["MRKP_" + instance[i].type](instance[i]) + '\n'
	}

	return markup
}

/**
 * Build a data object that defines this block. Called when creating a new block.
 * Used to create all meta data associated with this block (register a block in the CMS)
 * 
 * @returns Data object that is used to register a block
 * @type object
 * 
 * @properties={typeid:24,uuid:"F1E25A12-9BF5-4C13-B2F6-0E14144AFFBD"}
 */
function INIT_block() {
	
	// main data object to build
	var block = {}
	
	// block record data
	block.record = {
	        block_name			: 'Block builder',
			block_description	: 'Your custom block.',		
			form_name			: controller.getName(),
			form_name_display	: 'WEB_0F__block_builder_view'
		}
	
	// block views
	block.views = globals.WEBc_block_type_getMethods(controller.getName(),"VIEW")
	
	// block client actions - Block
	block.clientActionsBlock = globals.WEBc_block_type_getMethods(controller.getName(),"BLOCK")
	
	// block client actions - Page
	block.clientActionsPage = globals.WEBc_block_type_getMethods(controller.getName(),"PAGE")
	
	// block web actions
	block.webActions = globals.WEBc_block_type_getMethods(controller.getName(),"WEB")
	
	// block data points
	block.data = {
		           
	}
	
	// block configure data points
	block.blockConfigure = {
		
	}
	
	// block response data points
	block.blockResponse = {
		
	}
	
	return block
	
}

/**
 * @properties={typeid:24,uuid:"1745BEE8-D91F-45CF-86BB-BEB3FEB208E9"}
 */
function BLOCK_save(event) {
	for (var i = 0; i < _blockList.length; i++) {
		globals.CMS.ui.setData(event,_blockList[i].key,plugins.serialize.toJSON(_blockList[i].data))
	}
}

/**
 * @properties={typeid:24,uuid:"94FE1530-BF1F-4846-980A-ECB166477D91"}
 */
function BLOCK_cancel() {
	//refresh the data
	INIT_data()
}

/**
 * Update display as needed when block selected.
 *
 * @properties={typeid:24,uuid:"2EA92488-FC7A-460C-8FFF-9B35DF3616F5"}
 */
function INIT_data() {
	var fieldForm = 'WEB_0F__block_builder_1L__fields'
	
	//grab all data for this block
	var allData = globals.CMS.ui.getData(controller.getName())
	
	_blockList = new Array()
	
	//build object for list to operate from
	for (var i in allData) {
		var fieldData = plugins.serialize.fromJSON(allData[i])
		_blockList[fieldData.order] = {
							key : i,
							data : fieldData
						}
	}
	
	//build list
	var dataset = databaseManager.createEmptyDataSet(null,['data_key','row_order'])
	for (var i = 0; i < _blockList.length; i++) {
		var row = _blockList[i]
		dataset.addRow([row.key,row.data.order])
	}
	
	var dataSource = dataset.createDataSource('web_block_builder_data',[JSColumn.TEXT,JSColumn.INTEGER])
	
	//throw dataSource over onto my form (if it doesn't have one) and call it a day
	if (!elements.tab_list.getMaxTabIndex()) {
		elements.tab_list.removeAllTabs()
		var success = history.removeForm(forms[fieldForm])
		success = solutionModel.removeForm(fieldForm)
		
		solutionModel.getForm(fieldForm).dataSource = dataSource
		
		//assign this form back onto the tabpanel
		elements.tab_list.addTab(forms[fieldForm])
	}
}

/**
 * @properties={typeid:24,uuid:"E2366DDE-F0BF-4239-9438-D122077C34DB"}
 */
function FX_markup(type) {
	var markup = ""
	switch (type) {
		case "staticHTML":
			markup = BUILDER["staticHTML"].data		
		break;

	}	
	return markup
}

/**
 * @properties={typeid:24,uuid:"81C01542-15EA-47E6-AAB5-059536851A4B"}
 */
function MRKP_staticHTML(staticHTML) {
	var markup = staticHTML.data
	return markup
}

/**
 * @properties={typeid:24,uuid:"5CB846DE-A35E-4EFD-9C94-F050C54E1149"}
 */
function MRKP_textBox(textBox) {
	// strip html characters
	if ( textBox.data ) {
		var data = globals.CMS.utils.stripHTML(textBox.data.substr(0,textBox.maxChars))
		var markup = textBox.wrapper.pre + data + textBox.wrapper.post
		return markup
	}
	else {
		return null
	}
}

/**
 * @properties={typeid:24,uuid:"7EA25A69-72AC-4A62-BAFE-F6D8AFA63FD2"}
 */
function MRKP_textArea(textArea) {
	// strip html characters
	if ( textArea.data ) {
		var data = globals.CMS.utils.stripHTML(textArea.data)
		var markup = textArea.wrapper.pre + data + textArea.wrapper.post
		return markup
	}
	else {
		return null
	}
}

/**
 * @properties={typeid:24,uuid:"88DD9433-9E2D-48CD-876F-71CD714A03D8"}
 */
function MRKP_image(image) {
	if ( image.data ) {
		var markup = '<img src="' + "{DS:IMG_" + image.data + "}" + '" />'
		return markup
	}
	else {
		return null
	}
}

/**
 * @properties={typeid:24,uuid:"20422267-B22F-45F2-8A07-A7F25860F2C8"}
 */
function MRKP_fileDownload(fileDownload) {
	var markup = ""
	return markup
}

/**
 * @properties={typeid:24,uuid:"9E90340B-A333-42A2-BD34-3EBAA075037A"}
 */
function MRKP_pageLink(pageLink) {
	if ( pageLink.data ) {
		var markup = pageLink.wrapper.pre + '<a href="' + '{DS:ID_' + pageLink.data + '}">{DS:NAME_' + pageLink.data + '}</a>' + pageLink.wrapper.post
		return markup
	}
	else {
		return null
	}
}

/**
 * @properties={typeid:24,uuid:"1EF912C4-165D-4EDC-8AE3-5D7D8957F7DC"}
 */
function MRKP_externalURL(externalURL) {
	var markup = ""
	return markup
}

/**
 * @properties={typeid:24,uuid:"DD0236AE-E982-4EE2-9FA9-2EC88DAE71AD"}
 */
function MRKP_datePicker(datePicker) {
	var markup = ""
	return markup
}

/**
 * @properties={typeid:24,uuid:"3F3C2EA8-7F35-4262-926D-67488BB9DA07"}
 */
function MRKP_tinyMCE(tinyMCE) {
	var markup = tinyMCE.wrapper.pre + tinyMCE.data + tinyMCE.wrapper.post
	return markup
}

/**
 * @properties={typeid:24,uuid:"F0384DF3-4128-4E5E-B9B7-2E4E7C68DF65"}
 */
function MRKP_table(table) {
	var markup = ""
	return markup
}
