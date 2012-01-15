/**
 * @properties={typeid:35,uuid:"64CDD89C-D4CF-4B05-ABE7-B913A7558558"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @param	{Object}	obj Data object passed to all markup methods
 * 
 * @properties={typeid:24,uuid:"99A2CDA1-2F7F-490F-B51C-D753D76E724D"}
 */
function VIEW_default(obj) {
	
	// The main CMS page object gets passed to block VIEW methods.
	// So include "obj" in the parameter slot for these methods
	// The objective of VIEW methods is to return markup back to the page request.

	return 'Hello world!'
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
			block_description	: 'Easily create block types without coding.',		
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
