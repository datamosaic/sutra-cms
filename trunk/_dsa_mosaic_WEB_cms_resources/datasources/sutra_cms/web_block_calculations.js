/**
 * @properties={type:12,typeid:36,uuid:"BBF552BD-916F-4671-B9D2-44DBD232841B"}
 */
function display_block_name() {
	if (block_name) {
		return block_name
	}
	else {
		return 'No name'
	}
}

/**
 * @properties={type:12,typeid:36,uuid:"6C866905-554B-4628-97C5-54FD489C1530"}
 */
function display_scope_type() {
	if (typeof scope_type == 'number') {
		return 'Scope: ' + application.getValueListDisplayValue('WEB_scope_type',scope_type)
	}
	else {
		return null
	}
}

/**
 * @properties={type:12,typeid:36,uuid:"3D9F612A-3E20-4858-83B0-48DF5FFF4494"}
 */
function display_scrapbook() {
	if (typeof scope_type == 'number') {
		return 'WARNING: ' + application.getValueListDisplayValue('WEB_scope_type',scope_type) + ' scrapbook'
	}
	else {
		return null
	}
}

/**
 * @properties={type:12,typeid:36,uuid:"2BAB7813-E340-4B29-81B2-0D4C51A808C8"}
 */
function id_block_display()
{
	return web_block_to_block_version.id_block_display
}

/**
 * @properties={type:12,typeid:36,uuid:"4DAD7CFA-4415-4751-83FF-5B0FFDF017C5"}
 */
function id_block_type()
{
	return web_block_to_block_version.id_block_type
}
