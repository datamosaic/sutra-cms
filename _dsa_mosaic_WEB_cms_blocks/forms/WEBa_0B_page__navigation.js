/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4FDACEFD-6F16-46F7-827B-375E25824AC6"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @param {Object} obj Data object passed to all markup methods
 * 
 * @properties={typeid:24,uuid:"DD75748B-D0DF-4F21-A608-3182579FA18E"}
 * @AllowToRunInFind
 */
function VIEW_main(obj) {
	
	var linkType = obj.type
	
	// find publishable pages with attribute "navMain"
	var pages = databaseManager.getFoundSet(controller.getServerName(),"web_page")
	pages.find()
	pages.id_site = obj.site.id
	pages.flag_publish = 1
	pages.web_page_to_attribute.attribute_key = "navMain"
	var count = pages.search()
	if (count){
		
		pages.sort('web_page_to_attribute.attribute_value asc')
		var markup = ''
			
		for (var i = 0; i < pages.getSize(); i++) {		
			var record = pages.getRecord(i + 1)
			if ( record.id_page == obj.page.record.id_page ) {
				markup += '<li class=""><a href="' + globals.CMS.markup.getToken(record) + '" class="active"><span>' + globals.CMS.markup.getToken(record,'name') + '</span></a>\n'			
			}
			else {
				markup += '<li><a href="' + globals.CMS.markup.getToken(record) + '"><span>' + globals.CMS.markup.getToken(record,'name') + '</span></a>\n'			
			}	
			
			// sub menu 1 pages
			if ( utils.hasRecords(record.web_page_to_page__child) ) {
				markup += '<ul style="visibility:hidden;" class="sub_menu">'
				for (var j = 0; j < record.web_page_to_page__child.getSize(); j++) {
					var sub1Record = record.web_page_to_page__child.getRecord(j + 1)
					if ( j == 0 ) {
						markup += ' <li class="top_space"><a href="' + globals.CMS.markup.getToken(sub1Record) + '">' + sub1globals.CMS.markup.getToken(record,'name') + '</a>'
					}
					else {
						markup += ' <li><a href="' + globals.CMS.markup.getToken(sub1Record) + '">' + sub1globals.CMS.markup.getToken(record,'name') + '</a>'
					}
					
					// sub menu 2 pages
					if ( utils.hasRecords(sub1Record.web_page_to_page__child) ) {
						markup += '<ul style="visibility: hidden;">'
						for (var k = 0; k < sub1Record.web_page_to_page__child.getSize(); k++) {
							var sub2Record = sub1Record.web_page_to_page__child.getRecord(k + 1)
							if ( k == sub1Record.web_page_to_page__child.getSize() - 1) {
								markup += '<li class=""><a href="' + globals.CMS.markup.getToken(sub2Record) +  '">' + sub2globals.CMS.markup.getToken(record,'name') + '</a></li>'	
							}
							else {
								markup += '<li><a href="' + globals.CMS.markup.getToken(sub2Record) +  '">' + sub2globals.CMS.markup.getToken(record,'name') + '</a></li>'	
							}			
						}	
						markup += '</ul>'
					}
					
					// close out sub menu 1 markup
					markup += '</li>'
				}	
				markup += '</ul>'
			}
			
			// close out menu item markup
			markup += '</li>'
			
		}
			
		return markup
	}
	else
	{
		return '<ul><li>No pages with attribute "navMain" found</li></ul>'
	}
}

/**
 * @param {Object} obj Data object passed to all markup methods
 * @properties={typeid:24,uuid:"6B0D3857-E472-4792-B226-C6E2BE405B45"}
 * @AllowToRunInFind
 */
function VIEW_head(obj) {
	var linkType = obj.type
		
	// find pages with attribute "navHead" and published
	var pages = databaseManager.getFoundSet(controller.getServerName(),"web_page")
	pages.find()
	pages.id_site = obj.site.id
	pages.flag_publish = 1
	pages.web_page_to_attribute.attribute_key = "navHeader"
	var count = pages.search()
	
	if (count){
		
		pages.sort('web_page_to_attribute.attribute_value asc')
		
		var markup = '<ul>\n'

		for (var i = 0; i < pages.getSize(); i++) {
			var record = pages.getRecord(i + 1)
			
			if ( record.id_page == obj.page.record.id_page && i == (pages.getSize() - 1)  ) {
				markup += '<li class="ends-active"><a href="' + globals.CMS.markup.getToken(record) + '">' + globals.CMS.markup.getToken(record,'name') + '</a></li>\n'
			}
			else if ( i == (pages.getSize() - 1) ) {
				markup += '<li class="ends"><a href="' + globals.CMS.markup.getToken(record) + '">' + globals.CMS.markup.getToken(record,'name') + '</a></li>\n'
			}
			else if ( record.id_page == obj.page.record.id_page ) {
				markup += '<li class="active"><a href="' + globals.CMS.markup.getToken(record) + '">' + globals.CMS.markup.getToken(record,'name') + '</a></li>\n'
			}
			else {
				markup += '<li><a href="' + globals.CMS.markup.getToken(record)  + '">' + globals.CMS.markup.getToken(record,'name') + '</a></li>\n'
			}
		}
			
		markup += '</ul>'
		
		return markup
	}
	else {
		return 'No pages with attribute "navHead" found'
	}
}

/**
 * @param {Object} obj Data object passed to all markup methods
 * @properties={typeid:24,uuid:"6029C149-3FBA-4153-B39D-888D2B9C293A"}
 * @AllowToRunInFind
 */
function VIEW_footer(obj) {

	var linkType = obj.type
	
	// find pages with attribute "navFooter"
	var pages = databaseManager.getFoundSet(controller.getServerName(),"web_page")
	pages.find()
	pages.flag_publish = 1
	pages.id_site = obj.site.id
	pages.web_page_to_attribute.attribute_key = "navFooter"
	var count = pages.search()

	if (count){
		
		pages.sort('web_page_to_attribute.attribute_value asc')
		
		var markup = ""
		
		for (var i = 0; i < pages.getSize(); i++) {
			var record = pages.getRecord(i + 1)
			
			var subPages = databaseManager.getFoundSet(controller.getServerName(),"web_page")
			subPages.find()
			subPages.id_site = obj.site.id
			subPages.flag_publish = 1
			subPages.parent_id_page = record.id_page
			var subCount = subPages.search()
			
			markup += '<div class="quick_links">\n'
			markup += '<h5>' + globals.CMS.markup.getToken(record,'name') + '</h5>\n'
			markup += '<ul>'
				
			if (subCount) {
				subPages.sort('order_by asc')
				for (var j = 0; j < subPages.getSize(); j++) {
					var subRecord = subPages.getRecord(j + 1)
					markup += '<li><a href="' + globals.CMS.markup.getToken(subRecord) + '">' + globals.CMS.markup.getToken(subRecord,'name') + '</a></li>\n'
				}
			}
			markup += '</ul>'
			markup += '</div>\n' 
		}
		return markup
	}
	else {
		return '<ul><li>No pages with attribute "navFooter" found</li></ul>'
	}
}

/**
 * @param {Object} obj Data object passed to all markup methods
 * @properties={typeid:24,uuid:"97840FD3-E36C-498D-B991-CAC69238B483"}
 * @AllowToRunInFind
 */
function VIEW_actions(obj) {
	
	var linkType = obj.type
	
	// find pages with attribute "navActions"
	var pages = databaseManager.getFoundSet(controller.getServerName(),"web_page")
	pages.find()
	pages.flag_publish = 1
	pages.id_site = obj.site.id
	pages.web_page_to_attribute.attribute_key = "navActions"
	var count = pages.search()

	if (count){
		
		pages.sort('web_page_to_attribute.attribute_value asc')
		
		var markup = '<ul>\n'

		// action #1
		var record = pages.getRecord(1)
		markup += '<li><a href="' + globals.CMS.markup.getToken(record)  + '">' + globals.CMS.markup.getToken(record,'name') + '</a></li>\n'
		// action #2
		var record = pages.getRecord(2)
		markup += '<li class="ends"><a href="' + globals.CMS.markup.getToken(record)  + '">' + globals.CMS.markup.getToken(record,'name') + '</a></li>\n'

		markup += '</ul>'
		
		return markup
	}
	else {
		return '<ul><li>No pages with attribute "navActions" found</li></ul>'
	}
}

/**
 * @param {Object} obj Data object passed to all markup methods
 * @properties={typeid:24,uuid:"2B0D739C-279B-4E6D-B8A0-E1F6E555391B"}
 */
function VIEW_breadcrumb(obj) {
	
	// get current page
	// get parent pages until no more parent pages
	// write out html from first parent page to current page

	// recurring function
	function getParentRecord(parentRelation) {
		if ( utils.hasRecords( parentRelation )) {
			// traverse up tree
			getParentRecord(parentRelation.web_page_to_page__parent)
			// add record to array
			breadcrumb.push(parentRelation.getRecord(1))
		}
		// TODO: account for parent record being a folder
	}
	
	// initialize
	var breadcrumb = new Array
	var parentRelation = obj.page.record.web_page_to_page__parent
	
	// add home page record
	breadcrumb.push(obj.home.record)
	
	// collect parent records
	if ( utils.hasRecords( parentRelation )) {
		getParentRecord(parentRelation)
	}
	
	// add current page record
	breadcrumb.push(obj.page.record)
	
	// markup
	var markup = '<ul id="breadcrumb">\n'
	for (var i = 0; i < breadcrumb.length; i++) {
		if ( i == 0 ) {
			markup += '<li class="first"><a href="' + globals.CMS.markup.getToken(breadcrumb[i].id_page) + '">' + globals.CMS.markup.getToken(breadcrumb[i],'name') + '</a></li>\n'
		}
		else if ( i != (breadcrumb.length - 1) ) {
			markup += '<li><a href="' + globals.CMS.markup.getToken(breadcrumb[i].id_page) + '">' + globals.CMS.markup.getToken(breadcrumb[i],'name') + '</a></li>\n'
		}
		else {
			markup += '<li class="active">' + globals.CMS.markup.getToken(breadcrumb[i],'name') + '</li>\n'
		}
	}
	
	markup += '</ul>\n'
		
	return markup
	
}
