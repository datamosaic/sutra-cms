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
	tinyMCE		: { type: "tinyMCE", order : null, label : null, wrapper : { pre : null, post : null }, required : null, defaultData : null, data : null },
	table		: { type: "table", order : null, label : null, wrapper : { pre : null, post : null }, required : null, columns : null, data : null }
};

/**
 * @param	{Object}	obj Data object passed to all markup methods
 * 
 * @properties={typeid:24,uuid:"99A2CDA1-2F7F-490F-B51C-D753D76E724D"}
 */
function VIEW_default(obj) {
	
	// order the inputs
	var instance 	= []
	for (var i in obj.block_data) {
		var data = plugins.serialize.fromJSON(obj.block_data[i])		
		instance[data.order] = data 
	}
			
	// return markup by order and type
	var markup = ""
	for (var i = 0; i < instance.length; i++) {
		var data = instance[i]
		markup += forms.WEB_0F__block_builder["MRKP_" + instance[i].type](instance[i])
	}	
	
	return markup
}

/**
 * @properties={typeid:24,uuid:"EB0A7B7D-1BC2-4395-AC9E-C62700CF5E39"}
 */
function BLOCK_sample_method() {
	// method of type BLOCK
	// BLOCK type methods are used in the CMS GUI
	// not required
	plugins.dialogs.showInfoDialog( "Block action demo", "Block action just occurred" )

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
			form_name			: controller.getName()//,
//			form_name_display	: 'WEB_0F___starter_block'	//this line only required when form_name_display different than form_name
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
		sample : 'TEXT'            
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
 * @properties={typeid:24,uuid:"6A112C07-2D77-458B-9332-A43E1A9DD51B"}
 */
function PAGE_sample_method() {
	plugins.dialogs.showInfoDialog( "Page action demo", "Block page actions added to this menu")
}

/**
 * @properties={typeid:24,uuid:"1745BEE8-D91F-45CF-86BB-BEB3FEB208E9"}
 */
function BLOCK_save() {
	// your code goes here
}

/**
 * @properties={typeid:24,uuid:"94FE1530-BF1F-4846-980A-ECB166477D91"}
 */
function BLOCK_cancel() {
	// your code goes here
}

/**
 * Update display as needed when block selected.
 *
 * @properties={typeid:24,uuid:"2EA92488-FC7A-460C-8FFF-9B35DF3616F5"}
 */
function INIT_data() {
	// your code goes here
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
	var data = globals.CMS.utils.stripHTML(textBox.data.substr(textBox.maxChars))
	var markup = textBox.wrapper.pre + data + textBox.wrapper.post
	return markup
}

/**
 * @properties={typeid:24,uuid:"7EA25A69-72AC-4A62-BAFE-F6D8AFA63FD2"}
 */
function MRKP_textArea(textArea) {
	// strip html characters
	var data = globals.CMS.utils.stripHTML(textArea.data)
	var markup = textArea.wrapper.pre + data + textArea.wrapper.post
	return markup
}

/**
 * @properties={typeid:24,uuid:"88DD9433-9E2D-48CD-876F-71CD714A03D8"}
 */
function MRKP_image(image) {
	var markup = ""
	return markup
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
	var markup = ""
	return markup
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
	var markup = ""
	return markup
}

/**
 * @properties={typeid:24,uuid:"F0384DF3-4128-4E5E-B9B7-2E4E7C68DF65"}
 */
function MRKP_table(table) {
	var markup = ""
	return markup
}
