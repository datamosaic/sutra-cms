/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"071304BE-64A0-47E0-9E58-28CC87B86F18"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';



/**
 * Build a data object that defines this block. Called when creating a new block.
 * Used to create all meta data associated with this block (register a block in the CMS)
 * 
 * @returns {scopes.CMS._constant.blockInit} Data object that is used to register a block
 * 
 * @author &copy; Data Mosaic
 * 
 * @properties={typeid:24,uuid:"4B2D0EA2-959A-4E97-A51F-1F9F250FE489"}
 */
function INIT_block() {
	
	// main data object to build
	var block = {}
	
	// block record data
	block.record = {
	        block_name			: 'Layouts',
			block_description	: 'Various views to divide a row up into columns',
			block_category		: scopes.CMS._constant.blockCategory.LAYOUT,
			form_name			: controller.getName()//,
//			form_name_display	: 'WEB_0F___boiler_plate'	//this line only required when form_name_display different than form_name
		}
	
	// block views
	block.views = globals.CMS.ui.getMethods(controller.getName(), "VIEW")
	
	// block client actions - Block
	block.clientActionsBlock = globals.CMS.ui.getMethods(controller.getName(), "BLOCK")
	
	// block client actions - Page
	block.clientActionsPage = globals.CMS.ui.getMethods(controller.getName(), "PAGE")
	
	// block web actions
	block.webActions = globals.CMS.ui.getMethods(controller.getName(), "WEB")
	
	// block data points
	block.data = {
		begin 	: 'TEXT',
		end		: 'TEXT',
		count	: 'TEXT',
		items	: 'ARRAY'
	}
	
	return block
	
}

/**
 * 1 column formatter
 * 
 * @returns {String}	markup for this block
 * 
 * @properties={typeid:24,uuid:"3A0CF7E8-3114-423E-AD43-D5D622F8ACA5"}
 */
function VIEW_columns_1(obj) {
	return '\
	<div class="row">\n\
		<div class="span12">\n\
			<<BLOCK>>\n\
		</div>\n\
	</div>\n'
}

/**
 * 2 column formatter
 * 
 * @returns {String}	markup for this block
 * 
 * @properties={typeid:24,uuid:"140A8A1E-AA81-4DEF-9269-9E88B169CCC3"}
 */
function VIEW_columns_2(obj) {
	return '\
	<div class="row">\n\
		<div class="span6">\n\
			<<BLOCK>>\n\
		</div>\n\
		<div class="span6">\n\
			<<BLOCK>>\n\
		</div>\n\
	</div>\n'
}

/**
 * 2 column formatter
 * 
 * @returns {String}	markup for this block
 * 
 * @properties={typeid:24,uuid:"61AE4C35-CABB-4AB6-9BDD-EFAC35C53816"}
 */
function VIEW_columns_left_2(obj) {
	return '\
	<div class="row">\n\
		<div class="span4">\n\
			<<BLOCK>>\n\
		</div>\n\
		<div class="span8">\n\
			<<BLOCK>>\n\
		</div>\n\
	</div>\n'
}

/**
 * 2 column formatter
 * 
 * @returns {String}	markup for this block
 * 
 * @properties={typeid:24,uuid:"EBDD7489-9FC3-4E26-BD17-8B26C1EBCB88"}
 */
function VIEW_columns_right_2(obj) {
	return '\
	<div class="row">\n\
		<div class="span8">\n\
			<<BLOCK>>\n\
		</div>\n\
		<div class="span4">\n\
			<<BLOCK>>\n\
		</div>\n\
	</div>\n'
}

/**
 * 3 column formatter
 * 
 * @returns {String}	markup for this block
 * 
 * @properties={typeid:24,uuid:"660314E7-1A80-4ADD-AF84-FB5DA54242E2"}
 */
function VIEW_columns_3(obj) {
	return '\
	<div class="row">\n\
		<div class="span4">\n\
			<<BLOCK>>\n\
		</div>\n\
		<div class="span4">\n\
			<<BLOCK>>\n\
		</div>\n\
		<div class="span4">\n\
			<<BLOCK>>\n\
		</div>\n\
	</div>\n'
}

/**
 * 3 column formatter
 * 
 * @returns {String}	markup for this block
 * 
 * @properties={typeid:24,uuid:"51795C36-D611-44D7-8B06-D7DC49CEC57A"}
 */
function VIEW_columns_4(obj) {
	return '\
	<div class="row">\n\
		<div class="span3">\n\
			<<BLOCK>>\n\
		</div>\n\
		<div class="span3">\n\
			<<BLOCK>>\n\
		</div>\n\
		<div class="span3">\n\
			<<BLOCK>>\n\
		</div>\n\
		<div class="span3">\n\
			<<BLOCK>>\n\
		</div>\n\
	</div>\n'
}