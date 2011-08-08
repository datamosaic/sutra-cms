/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f34"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"05C77F09-34C3-42BD-8C77-F6B090C5FCD0"}
 */
function VISIT_page(event,returnURL) {
	//see forms.WEB_0F_page__browser.URL_update
	
	if (globals.CODE_key_pressed('shift')) {
		var toClippy = true
	}
	
	var fsPage = forms.WEB_0F_page.foundset
	
	if (utils.hasRecords(fsPage)) {
		
		var urlString = globals.WEB_MRKUP_link_page(fsPage.id_page)
	
		if (utils.hasRecords(forms.WEB_0F_page__design__header_display__platform._platform)) {
			urlString += "&platform=" + forms.WEB_0F_page__design__header_display__platform._platform.url_param
		}
		
		if (utils.hasRecords(forms.WEB_0F_page__design__header_display__language._language)) {
			urlString += "&language=" + forms.WEB_0F_page__design__header_display__language._language.url_param
		}
		
		if (utils.hasRecords(forms.WEB_0F_page__design__header_display__group._group)) {
			urlString += "&group=" + forms.WEB_0F_page__design__header_display__group._group.url_param
		}
		
		if (utils.hasRecords(forms.WEB_0F_page__design__content.foundset)) {
			urlString += "&version=" + forms.WEB_0F_page__design__content.url_param
		}
		
		//return url
		if (returnURL) {
			return urlString
		}
		//put on clipboard
		else if (toClippy) {
			application.setClipboardContent(urlString)
		}
		//go to page
		else {
			globals.CODE_url_handler(urlString)
		}
	}
	else if (!returnURL) {
		plugins.dialogs.showErrorDialog(
					'Error',
					'You must have a page selected in order to preview it'
			)
	}
}