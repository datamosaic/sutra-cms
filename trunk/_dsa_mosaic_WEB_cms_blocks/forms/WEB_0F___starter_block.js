/**
 * @properties={typeid:35,uuid:"4FDACEFD-6F26-46F7-827B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * param {} obj Data object passed to all markup methods
 * @properties={typeid:24,uuid:"F20BDBF7-8CB2-4035-A50B-0785CE98FC00"}
 */
function VIEW_default(obj) {
	
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
	globals.WEB_block_form_loader("WEB_0F___starter_block", ((flagScrapbook) ? "SCRAPBOOK: Starter block" : "Starter block"))		
	
	//refresh display
	LOADER_refresh(fsBlockData,flagEdit,flagScrapbook)
}

/**
 * @properties={typeid:24,uuid:"C8C679D5-C524-47CD-ACD4-93FF855F1611"}
 */
function LOADER_refresh(fsBlockData,flagEdit,flagScrapbook) {
	//put in code that would be fired on rec select if changing between two blocks of the same type
	
//	//hack to get scrapbook to display (for some blocks needed always, not just scrapbook)
//	if (flagScrapbook && application.__parent__.solutionPrefs) {
//		globals.CODE_cursor_busy(true)
//		
//		forms.WEB_0F_page._hackNoFire = true
//		forms.CODE__blank.controller.show()
//		forms.DATASUTRA_0F_solution.controller.show()
//		//this needs to be long enough for it to finish rendering
//		application.updateUI(1000)
//		forms.WEB_0F_page._hackNoFire = false
//		
//		//reset the window's title
//		forms.DATASUTRA_0F_solution.elements.fld_trigger_name.requestFocus(true)
//		
//		globals.CODE_cursor_busy(false)
//	}
}

/**
 * @properties={typeid:24,uuid:"7E3894A3-27A8-4435-AEAA-36891B21E483"}
 */
function PAGE_sample_method() {
	plugins.dialogs.showInfoDialog( "Page action demo", "Block page actions added to this menu")
}
