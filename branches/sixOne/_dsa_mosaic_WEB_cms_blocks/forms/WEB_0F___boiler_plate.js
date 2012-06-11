/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4FDACEFD-6F26-46F7-827B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 * The objective of VIEW methods is to return markup back to the page request
 * 
 * @returns {String}	markup for this block
 * 
 * @properties={typeid:24,uuid:"F20BDBF7-8CB2-4035-A50B-0785CE98FC00"}
 */
function VIEW_default(obj) {
	
	// The main CMS page object globals.CMS.data is available for all VIEW methods

	return 'Hello world!'
}

/**
 * @properties={typeid:24,uuid:"4E0834F2-0DDC-4364-8CEB-EFC70BEB339E"}
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
 * @returns {Object} Data object that is used to register a block
 * 
 * @properties={typeid:24,uuid:"B1A1F180-3F8A-47FE-8D44-F3FFC0CBEE9A"}
 */
function INIT_block() {
	
	// main data object to build
	var block = {}
	
	// block record data
	block.record = {
	        block_name			: 'Starter block',
			block_description	: 'Boiler template for creating a custom block',		
			form_name			: controller.getName()//,
//			form_name_display	: 'WEB_0F___boiler_plate'	//this line only required when form_name_display different than form_name
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
 * @properties={typeid:24,uuid:"7E3894A3-27A8-4435-AEAA-36891B21E483"}
 */
function PAGE_sample_method() {
	plugins.dialogs.showInfoDialog( "Page action demo", "Block page actions added to this menu")
}

/**
 * @properties={typeid:24,uuid:"CA0EC453-6093-41F1-BB67-534534B10636"}
 */
function BLOCK_save() {
	// your code goes here
}

/**
 * @properties={typeid:24,uuid:"7122605B-CB57-4365-852C-5DC97AADE5F1"}
 */
function BLOCK_cancel() {
	// your code goes here
}

/**
 * Update display as needed when block selected.
 *
 * @properties={typeid:24,uuid:"D0B09ECA-F3FA-4035-A0DD-62166343DF4E"}
 */
function INIT_data() {
	// your code goes here
}
