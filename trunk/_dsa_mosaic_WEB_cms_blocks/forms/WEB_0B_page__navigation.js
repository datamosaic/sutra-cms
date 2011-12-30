/**
 * @properties={typeid:35,uuid:"4FDACEFD-6F16-46F7-827B-375E25824DD6"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:24,uuid:"77B57E27-BA30-47D4-AF72-043CBAA4C83B"}
 */
function VIEW_breadcrumb()
{
}

/**
 *
 * @properties={typeid:24,uuid:"8FCD8F00-F3DC-4368-8FBE-5ED4CACE8652"}
 */
function VIEW_default()
{
	var data 		= arguments[0] // data	
	maxLevel 		= arguments[1]	// params
	currentLevel	= 0        

	// get top level pages 
	var pages = databaseManager.getFoundSet(controller.getServerName(),"web_page")
	pages.find()
	pages.flag_publish = 1
	pages.parent_id_page = 0
	var count = pages.search()
	if ( !count ) {
		// TODO: error for no top level navigation pages
		return null
	}	
	
	pages.sort("order_by asc")
	
	// return
	return VIEW_default_recurse(pages)
}

/**
 *
 * @properties={typeid:24,uuid:"22F0D6E7-5C55-45F4-B8C1-C9C2C1CC769B"}
 */
function VIEW_default_recurse()
{
	// one level of pages as input
	var pages = arguments[0]
	var markup = ""
	var linkLoop = 0
	
	currentLevel ++

	// process current level of pages. recurse if child pages
	for (var i = 0; i < pages.getSize(); i++) {
		var record = pages.getRecord(i + 1)
		
		// top level
		if ( !record.parent_id_page ) {
						
			// get nav_ornament from page attribute
			var ornament = databaseManager.getFoundSet(controller.getServerName(),"web_attribute")
			ornament.find()
			ornament.attribute_key = "nav_ornament"
			ornament.id_page = record.id_page
			var count = ornament.search()
			if ( count ) {
				var ornamentJPG = ornament.attribute_value
			}	
			else {
				var ornamentJPG = "web_16.png"
			}
			
			// TODO: get image and link paths from meta data
			
			// markup for top level
			markup += 	'<h2 style="margin:10px 0px 5px 0px; width:180px;">\n' +
							'\t<a href="' + globals.CMS.markup.getToken(record) + '">' + globals.CMS.markup.getToken(record,'name') +
								'<img style="float:right; margin:0px 0px 0px 0px;" ' + 
								'src="/datasutra/site/themes/datasutra/images/' + ornamentJPG + '"' +
								'alt="' + globals.CMS.markup.getToken(record,'name') + '"></a>' +
						'</h2>'
		}
		else {
			
			// get link_type from page attribute
			var linkType = databaseManager.getFoundSet(controller.getServerName(),"web_attribute")
			linkType.find()
			linkType.attribute_key = "link_type"
			linkType.id_page = record.id_page
			var count = linkType.search()
			if ( count ) {
				// divider
				linkLoop ++
				if ( linkLoop == 1) {
					markup +=	'<h2 class="module-header-divider"></h2>'
				}
				
				// blue link
				markup += 	'<p id="gamma-inner-blue">' + 
								'\t<a href="' + globals.CMS.markup.getToken(record) + '">' + globals.CMS.markup.getToken(record,'name') + '</a>' +
							'</p>\n'			}	
			else {
				linkLoop = 0
				
				// default (orange) link
				markup += 	'<p>' + 
								'\t<a href="' + globals.CMS.markup.getToken(record) + '">' + globals.CMS.markup.getToken(record,'name') + '</a>' +
							'</p>\n'
			}			
		}

		
		// web_page_to_page__child
		if ( maxLevel > currentLevel ) {
			if ( record.web_page_to_page__child__publish.getSize() ) {
				markup += VIEW_default_recurse(record.web_page_to_page__child__publish)
				currentLevel --
			}
		}
	}
	
	return markup

}
