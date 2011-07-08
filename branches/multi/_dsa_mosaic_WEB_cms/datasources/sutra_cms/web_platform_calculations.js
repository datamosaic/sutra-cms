/**
 * @properties={type:12,typeid:36,uuid:"776B2403-597A-4786-B373-E07C7FC5CA3F"}
 */
function platform_name() {
	if (utils.hasRecords(web_platform_to_site_platform)) {
		return web_platform_to_site_platform.platform_name
	}
	else {
		return 'Platform error'
	}
}
