/**
 * @properties={type:12,typeid:36,uuid:"1088180B-5E26-4CAF-9253-4BDC3E00DB16"}
 */
function id_site_language__default() {
	//grab correct language related record
	for (var i = 1; i <= web_site_to_site_language.getSize(); i++) {
		var recLanguage = web_site_to_site_language.getRecord(i)
		
		if (recLanguage.flag_default) {
			return recLanguage.id_site_language
		}
	}
}
