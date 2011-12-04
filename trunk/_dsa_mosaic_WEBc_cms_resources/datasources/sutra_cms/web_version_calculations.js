/**
 * @properties={type:12,typeid:36,uuid:"6736E698-CFFE-4D0B-855D-DA4F899F77C2"}
 */
function display_id_layout() {
	if (utils.hasRecords(web_version_to_platform) && web_version_to_platform.id_layout != id_layout) {
		return id_layout
	}
}

/**
 * @properties={type:12,typeid:36,uuid:"0E3497B2-8ED6-4019-B6CF-5B77C84452E8"}
 */
function display_id_theme() {
	if (utils.hasRecords(web_version_to_platform) && web_version_to_platform.id_theme != id_theme) {
		return id_theme
	}
}

/**
 * @properties={type:12,typeid:36,uuid:"68BCBDF9-8537-4D98-997F-383C0B45A564"}
 */
function id_layout() {
	if (id_layout) {
		return id_layout
	}
	else if (utils.hasRecords(web_version_to_platform)) {
		return web_version_to_platform.id_layout
	}
	else {
		return null
	}
}

/**
 * @properties={type:12,typeid:36,uuid:"98E9F924-B4D5-4ED9-90BD-6FB2A717E84D"}
 */
function id_theme() {
	if (id_theme) {
		return id_theme
	}
	else if (utils.hasRecords(web_version_to_platform)) {
		return web_version_to_platform.id_theme
	}
	else {
		return null
	}
}
