/**
 *
 * @properties={type:12,typeid:36,uuid:"33576727-2FBF-4718-8F0A-ED5A68D652AA"}
 */
function display_page_name() {
	//this is a folder
	if (page_type == 1) {
		return 'Folder: ' + page_name
	}
	//this is an external link
	else if (page_type == 2) {
		return 'External link: ' + page_name
	}
	//this is an internal link
	else if (page_type == 3) {
		return 'Internal link: ' + page_name
	}	
	//this is a page
	else {
		return page_name
	}
}

/**
 *
 * @properties={type:12,typeid:36,uuid:"505BDBD8-5168-446A-ACC0-0CB9531D07DC"}
 */
function display_header_sub_right()
{
	var dateString = 'Created: ' + globals.CODE_date_format(rec_created,'current')
	
	if (rec_modified) {
		dateString += '   Modified: ' + globals.CODE_date_format(rec_modified,'current')
	}
	
	return dateString
}
