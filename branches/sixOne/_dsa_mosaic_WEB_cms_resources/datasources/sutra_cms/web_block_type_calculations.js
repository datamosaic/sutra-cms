/**
 * @properties={type:12,typeid:36,uuid:"BDF8D031-80A6-4ACE-BFA2-9E88BFB20F28"}
 */
function display_block_status() {
	var status = ''
	switch (block_type) {
		default:
		case 0:
			status += 'Code block'
			break
		case 1:
			status += 'Block builder'
			if (flag_unavailable) {
				status += ' (unpublished)'
			}
			break
		case 2:
			status += 'Form builder'
			break
	}
	return status
}

/**
 * @properties={type:4,typeid:36,uuid:"625DDC8D-4E4B-4D0A-9394-C9F447B58112"}
 */
function client_tab_selected() {
	return 1
}

/**
 * @properties={type:12,typeid:36,uuid:"2F5A6E42-CEF6-4462-A28D-FBDCA807EF5C"}
 */
function client_id_block_display() {
	//return
}
