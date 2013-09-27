/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"12B2EFFD-11E2-45E2-8193-C74C1E64618C"}
 */
var _collection = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"CCDB0637-EB35-4D31-B771-1DF208448F65"}
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
 * @properties={typeid:24,uuid:"388BEABC-CC40-4DA1-BDF6-AA19D1BCC8A3"}
 */
function INIT_block() {
	
	// main data object to build
	var block = {}
	
	// block record data
	block.record = {
	        block_name			: 'Blog',
			block_description	: 'Blog collection',
			block_category		: scopes.CMS._constant.blockCategory.COLLECTION,
			block_type			: scopes.CMS._constant.blockType.DESIGNTIME,
			form_name			: controller.getName()//,
//			form_name_display	: 'WEB_0F___boiler_plate'	//this line only required when form_name_display different than form_name
		}
	
	// block views
	block.views = globals.CMS.ui.getMethods(controller.getName(), "VIEW")
	block.defaultView = 'VIEW_blog_detail'
	
	// block client actions - Block
	block.clientActionsBlock = globals.CMS.ui.getMethods(controller.getName(), "BLOCK")
	
	// block client actions - Page
	block.clientActionsPage = globals.CMS.ui.getMethods(controller.getName(), "PAGE")
	
	// block web actions
	block.webActions = globals.CMS.ui.getMethods(controller.getName(), "WEB")
	
	// block data points
	block.data = {  // block builder tags go here
		title : "TEXT",
		post_date : "TEXT",
		categories : "TEXT",
		tags : "TEXT",
		permalink : "TEXT",
		content : "TEXTAREA",
		summary: "TEXTAREA",
		image: "IMAGE"
	}
	
	// block configure data points
	block.blockConfigure = {
		collection : 'TEXT' // choose a collection 
	}
	
	return block
	
}

/**
 * Wrapper html for this collection
 * 
 * @properties={typeid:24,uuid:"8BE28A6B-8E88-4AFB-A81A-76051413FBFC"}
 */
function COLLECTION_wrapper() {
	return '<div class="blog">\n\
	<div class="blog-post">\n\
		<<VIEW>>\n\
	</div>\n\
	</div>'
}

/**
 * Detail blog post
 * 
 * @param {scopes.CMS._constant.objData} obj Data object passed to all markup methods
 * 
 * @return {String} markup for this block
 * 
 * @properties={typeid:24,uuid:"E788541C-76DC-4CA5-9B1C-996E94315B46"}
 */
function VIEW_blog_detail(obj) {
	return '<h2><<title</h2>\n\
		<i><<post_data>></i>\n\
		<p class="post">\n\
		<<content>>\n\
		</p>\n\
		<div class="blog-post-footer">\n\
			<<categories>> | <<tags>>\n\
		</div>'
}


/**
 * Summary blog post
 * 
 * @returns {String}	markup for this block
 * 
 * @properties={typeid:24,uuid:"4BA97076-3B2F-4511-9EBA-8F2858E3FB07"}
 */
function VIEW_blog_summary(obj) {
	// demo code
	var summary = null
	var content = (!summary) ? "demo blog content sample data. dem.".substr(0, 10) : summary
	
	return '<h2><<title</h2>\n\
		<i><<post_data>></i>\n\
		<p class="post">\n\
		<<content>>\n\
		</p>\n\
		<div class="blog-post-footer">\n\
			<<categories>> | <<tags>>\n\
		</div>'
}
