/**
 * @properties={type:12,typeid:36,uuid:"82B3E6D3-71DE-4FB6-B63A-89A313B93075"}
 */
function language_name() {
	if (utils.hasRecords(web_language_to_site_language)) {
		return web_language_to_site_language.language_name
	}
	else {
		return 'Language error'
	}
}
