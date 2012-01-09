/**
 * @properties={typeid:35,uuid:"6679446D-C986-485B-8CB6-AB45C25CE03C"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @param	{Object}	obj Data object passed to all markup methods
 * 
 * @properties={typeid:24,uuid:"9AF43A7E-59C6-4F55-9643-F94FFFA6480C"}
 */
function VIEW_default(obj) {
	
	return '<div class="crausel02"> <img src="sites/ism/themes/ism/images/effect_crausal02.png" class="effect" alt="" />\n\
<ul id="slider">\n\
<li>\n\
<div class="img_sec"><img src="sites/ism/themes/ism/images/img03.jpg" alt="" width="450" height="281" /></div>\n\
</li>\n\
<li>\n\
<div class="img_sec"><img src="sites/ism/themes/ism/images/img03.jpg" alt="" width="450" height="281" /></div>\n\
</li>\n\
<li>\n\
<div class="img_sec"><img src="sites/ism/themes/ism/images/img03.jpg" alt="" width="450" height="281" /></div>\n\
</li>\n\
<li>\n\
<div class="img_sec"><img src="sites/ism/themes/ism/images/img03.jpg" alt="" width="450" height="281" /></div>\n\
</li>\n\
<li>\n\
<div class="img_sec"><img src="sites/ism/themes/ism/images/img03.jpg" alt="" width="450" height="281" /></div>\n\
</li>\n\
</ul>\n\
</div>'
	
}

/**
 * @properties={typeid:24,uuid:"2CA5AEF4-0F4D-4227-8E40-2A16E35FF1BB"}
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
 * @properties={typeid:24,uuid:"A34F67A3-C8A5-40D9-9789-AF4A88747E55"}
 */
function INIT_block() {
	
	// main data object to build
	var block = {}
	
	// block record data
	block.record = {
	        block_name			: 'Starter block',
			block_description	: 'Boiler template for creating a custom block',		
			form_name			: controller.getName() //,
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
 * @properties={typeid:24,uuid:"577789F6-F0C4-49CC-B7F9-B8B270F8F58D"}
 */
function PAGE_sample_method() {
	plugins.dialogs.showInfoDialog( "Page action demo", "Block page actions added to this menu")
}

/**
 * @properties={typeid:24,uuid:"DB4F38FE-F60D-4D5B-AAF4-018813C3EEDC"}
 */
function BLOCK_save() {
	// your code goes here
}

/**
 * @properties={typeid:24,uuid:"78FC6182-4B2A-4E3E-A67F-2C5BD2424548"}
 */
function BLOCK_cancel() {
	// your code goes here
}

/**
 * Update display as needed when block selected.
 *
 * @properties={typeid:24,uuid:"EA138DC4-C5CA-46A3-B5F6-95EEB990E224"}
 */
function INIT_data() {
	// your code goes here
}
