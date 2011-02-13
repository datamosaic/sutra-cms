/**
 *
 * @properties={typeid:24,uuid:"C9C508DC-B043-49FF-BE06-45573A3BC58C"}
 */
function VIEW_default()
{
	
	var data 		= arguments[0] // data
	var parentID	= arguments[1]	// params
	var markup	= '<div class="module-archives module">'           	            
	markup		+= '<div class="module-content">'
	markup		+= '<div class="page-list-outline">'
	
	// get sub pages for parent page
	var pages = databaseManager.getFoundSet(controller.getServerName(),"web_page")
	pages.find()
	pages.parent_id_page = parentID
	var count = pages.search()
	if ( !count ) {
		// TODO: error for no top level navigation pages
		return null
	}
	else {
		pages.sort('order_by asc')
	}
	
	for (var i = 0; i < pages.getSize(); i++) {	
		var record = pages.getRecord(i + 1)

		// get outline category attribute
		var outline = databaseManager.getFoundSet(controller.getServerName(),"web_attribute")
		outline.find()
		outline.attribute_key = "outline"
		outline.id_page = record.id_page
		var count = outline.search()
		if ( count ) {
			if ( i == 0 ) {
				markup += '<h2><a href="' + '/datasutra/index.jsp?id=' + record.id_page + '">' + record.page_name + '</a></h2>'
			}
			else {
				markup += '<h2>&nbsp;</h2>'
				markup += '<h2><a href="' + '/datasutra/index.jsp?id=' + record.id_page + '">' + record.page_name + '</a></h2>'			
			}
		}
		else {
			markup += '<p><a href="' + '/datasutra/index.jsp?id=' + record.id_page + '">' + record.page_name + '</a></p>'
		}	
	}
	
	
	// close div
	markup	+= '</div></div></div>'
	
	// 3) replace tags
	markup = markup.replace(/<<id_block>>/ig, data.id_block)	
	
	// return
	return markup
}
