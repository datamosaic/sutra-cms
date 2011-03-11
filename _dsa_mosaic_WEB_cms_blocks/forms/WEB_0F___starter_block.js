/**
 * @properties={typeid:35,uuid:"E2883D99-02A0-4C3F-A99D-50C3E79C2AE2",variableType:-4}
 */
var recBlockData = null;

/**
 * @properties={typeid:35,uuid:"CCA3703E-26DD-467D-9B1A-8D8626CE31F1",variableType:4}
 */
var toolbarMode = 0;

/**
 * param {} obj Data object passed to all markup methods
 * @properties={typeid:24,uuid:"F20BDBF7-8CB2-4035-A50B-0785CE98FC00"}
 */
function VIEW_default(obj)
{
	
	// The main CMS page object gets passed to block VIEW methods.
	// So include "obj" in the parameter slot for these methods
	// The objective of VIEW methods is to return markup back to the page request.

	return "hello world"
}

/**
 * @properties={typeid:24,uuid:"4E0834F2-0DDC-4364-8CEB-EFC70BEB339E"}
 */
function BLOCK_sample_method() {
	// method of type BLOCK
	// BLOCK type methods are used in the CMS GUI
	// not required
	plugins.dialogs.showInfoDialog( "Block action demo", "Block action just occurred")

}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D0B09ECA-F3FA-4035-A0DD-62166343DF4E"}
 */
function REC_on_select(event) {
	// various methods can be created that are attached to GUI events
}

/**
 * Build a data object that defines this block. Called when creating a new block.
 * Used to create all meta data associated with this block (register a block in the CMS)
 * 
 * @returns Data object that is used to register a block
 * @type object
 * 
 * @author Data Mosaic (C)
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
			form_name			: 'WEB_0F___starter_block',
			form_name_display	: 'WEB_0F___starter_block'
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
 * 
 * @param {JSFoundset} fsBlockData block data points
 * @param {Boolean} flagEdit page version is editable or not
 * @param {Boolean} flagScrapbook true if showing scrapbook
 * 
 * @properties={typeid:24,uuid:"66882D66-C9FB-4C36-B2DA-10D0B467E09C"}
 */
function LOADER_init(fsBlockData, flagEdit, flagScrapbook) {
	
	// set label and load form
	globals.WEB_block_form_loader((flagScrapbook) ? "Starter Block (scrapbook)" : "Starter Block", "WEB_0F__starter_block")		
	
}

/**
 * @properties={typeid:24,uuid:"7E3894A3-27A8-4435-AEAA-36891B21E483"}
 */
function PAGE_sample_method() {
	plugins.dialogs.showInfoDialog( "Page action demo", "Block page actions added to this menu")
}
