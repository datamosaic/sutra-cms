/**
 * @properties={typeid:35,uuid:"2AFDC806-15C2-4F4C-B003-D71264F8119B",variableType:-4}
 */
var _skipSelect = true;

/**
 * @properties={typeid:35,uuid:"4FDACEFD-6F26-46F7-827B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @param	{Object}	obj Data object passed to all markup methods
 * @properties={typeid:24,uuid:"F20BDBF7-8CB2-4035-A50B-0785CE98FC00"}
 */
function VIEW_default(obj) {
	
	// The main CMS page object gets passed to block VIEW methods.
	// So include "obj" in the parameter slot for these methods
	// The objective of VIEW methods is to return markup back to the page request.

	return "Hello world!"
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
 * Update display as needed when block selected.
 *
 * @param 	{JSEvent}	event The event that triggered the action.
 * @param	{Boolean}	[alwaysRun] Force the on select method to refire.
 *
 * @properties={typeid:24,uuid:"D0B09ECA-F3FA-4035-A0DD-62166343DF4E"}
 */
function REC_on_select(event,alwaysRun) {
	//run on select only when it is 'enabled'
	if (alwaysRun || globals.WEB_block_enable(event)) {
		
	}
}

/**
 * Build a data object that defines this block. Called when creating a new block.
 * Used to create all meta data associated with this block (register a block in the CMS)
 * 
 * @returns Data object that is used to register a block
 * @type object
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
			form_name			: 'WEB_0F___starter_block'//,
//			form_name_display	: 'WEB_0F___starter_block'	//this line only required when form_name_display different than form_name
		}
	
	// block views
	block.views = globals.WEB_block_methods(controller.getName(),"VIEW")
	
	// block client actions - Block
	block.clientActionsBlock = globals.WEB_block_methods(controller.getName(),"BLOCK")
	
	// block client actions - Page
	block.clientActionsPage = globals.WEB_block_methods(controller.getName(),"PAGE")
	
	// block web actions
	block.webActions = globals.WEB_block_methods(controller.getName(),"WEB")
	
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
	
	// exit edit mode
	globals.WEB_block_save()
}

/**
 * @properties={typeid:24,uuid:"7122605B-CB57-4365-852C-5DC97AADE5F1"}
 */
function BLOCK_cancel() {
	// your code goes here
	
	// exit edit mode
	globals.WEB_block_cancel()
}
