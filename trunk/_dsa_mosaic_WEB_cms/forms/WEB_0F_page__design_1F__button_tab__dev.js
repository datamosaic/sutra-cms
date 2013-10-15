/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D97F4A70-FCAD-4012-9C99-029C8E1DA6CF"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"4117B27C-3AB7-4313-A23C-7459E9206E1B"}
 */
function FORM_on_load() {
	//hide buttons
	elements.btn_cancel.visible = false
	elements.btn_edit.visible = false
}

/**
 *
 * @properties={typeid:24,uuid:"9A4E2EE4-C669-426B-BF90-FAD761E62785"}
 */
function TAB_change(formName,elemName) {
	var elem = formName instanceof JSEvent ? formName.getElementName() : elemName
	
	scopes.TAB.INLINE_change(controller.getName(),elemName,'tab_button','tab_b')

	//set main tab appropriately
	forms.WEB_0F_page__design_1F_version.elements.tab_content.tabIndex = elements.tab_button.tabIndex

	//toggle display to show nothing for page when no valid version stack
	if (forms.WEB_0F_page__design.elements.tab_main.tabIndex == 5 && !utils.hasRecords(forms.WEB_0F_page__design_1F_version.foundset)) {
		forms.WEB_0F_page__design.elements.tab_main.tabIndex = 4
	}

	//standard header (if coming from scrapbook)
	if (forms.WEB_0F_page__design.elements.tab_header_detail.tabIndex == 3) {
		forms.WEB_0F_page__design.elements.tab_header_detail.tabIndex = 1
	}

}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8F5B3376-C931-42FA-B207-316735B18D40"}
 */
function VISIT_page(event,returnURL,toClippy) {
	//see forms.WEB_0F_page__browser.URL_update

	//shift-click copies to clipboard
	if (globals.CODE_key_pressed('shift')) {
		toClippy = true
	}
	//right-click shows menu
	else if (event && event.getType() == JSEvent.RIGHTCLICK) {
		//set up menu with arguments
		var menu = new Array()

		menu[0] = plugins.popupmenu.createMenuItem('Copy to clipboard',VISIT_page)
		menu[0].setMethodArguments(null,null,true)
		menu[1] = plugins.popupmenu.createMenuItem('Open default browser',VISIT_page)

		plugins.popupmenu.showPopupMenu(elements.btn_visit, menu)

		return
	}

	var fsPage = forms.WEB_0F_page.foundset

	if (utils.hasRecords(fsPage)) {
		//only tack on exact specifier when not an external link
		if (fsPage.page_type != 2) {
			//specify index-style so parameters of platform, language, group, version guaranteed to work
				//will be re-directed to correctlyu url by controller
			var urlString = globals.WEBc_markup_link_page(fsPage.id_page.toString() + '_' + forms.WEB_0F_page__design_1F__header_display_2F_language._language.id_language.toString(),null,'Index')

			if (utils.hasRecords(forms.WEB_0F_page__design_1F__header_display_2F_platform._platform)) {
				urlString += "&platform=" + forms.WEB_0F_page__design_1F__header_display_2F_platform._platform.url_param
			}

			if (utils.hasRecords(forms.WEB_0F_page__design_1F__header_display_2F_language._language)) {
				urlString += "&language=" + forms.WEB_0F_page__design_1F__header_display_2F_language._language.url_param
			}

			if (utils.hasRecords(forms.WEB_0F_page__design_1F__header_display_2F_group._group)) {
				urlString += "&group=" + forms.WEB_0F_page__design_1F__header_display_2F_group._group.url_param
			}

			if (utils.hasRecords(forms.WEB_0F_page__design_1F_version.foundset)) {
				urlString += "&version=" + forms.WEB_0F_page__design_1F_version.url_param
			}
		}

		//return url
		if (returnURL) {
			return urlString
		}
		//put on clipboard
		else if (toClippy) {
			globals.CODE_clipboard_set(urlString)
		}
		//go to page
		else {
			globals.CODE_url_handler(urlString)
		}
	}
	else if (!returnURL) {
		globals.DIALOGS.showErrorDialog(
					'Error',
					'You must have a page selected in order to preview it'
			)
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8C902619-3B60-48F4-BB58-CB4609704867"}
 */
function ACTION_edit(event) {
	var formName = 'WEB_0F_page__design'

	//get offset from forms
	var tabA = (forms[formName].TAB_header_size) ? forms[formName].TAB_header_size('A') : 40
	var tabB = (forms[formName].TAB_header_size) ? forms[formName].TAB_header_size('B') :  250
	var offset = tabB - tabA - ((forms[formName].TAB_header_size) ? forms[formName].TAB_header_size('space') : 10)

	//allowed to roll-down header area?
		//MEMO: this global method only used on pages screen; so modifcations ok
	if (!forms[scopes.CMS.util.getTreeForm()]._addRecord && forms.WEB_0F_page.page_type == 0 && !utils.hasRecords(forms.WEB_0F_page__design_1F_version.foundset)) {
		globals.DIALOGS.showQuestionDialog(
					'Error',
					'No version selected'
			)
		return
	}

	//set new size of this tab panel
	forms[formName].elements.tab_header_detail.setSize(forms[formName].elements.tab_header_button.getWidth(),tabB)

	//go to editable fields
	forms[formName].elements.tab_header_detail.tabIndex = 2

	//move/resize other tab panels
	forms[formName].elements.tab_main.setLocation(0,forms[formName].elements.tab_main.getLocationY() + offset)
	forms[formName].elements.tab_main.setSize(forms[formName].elements.tab_header_button.getWidth(),forms[formName].elements.tab_main.getHeight() - offset)

	//flip graphic
	elements.btn_cancel.visible = true
	elements.btn_edit.visible = false

	if (forms[formName] && forms[formName].elements.gfx_curtain) {
		forms[formName].elements.gfx_curtain.visible = true
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"37DBD1BA-259F-425C-9700-24E5AB3DF4AE"}
 */
function ACTION_cancel(event) {
	var formName = 'WEB_0F_page__design'

	//get offset from forms
	var tabA = (forms[formName].TAB_header_size) ? forms[formName].TAB_header_size('A') : 40
	var tabB = (forms[formName].TAB_header_size) ? forms[formName].TAB_header_size('B') :  250
	var offset = tabB - tabA - ((forms[formName].TAB_header_size) ? forms[formName].TAB_header_size('space') : 10)

	//set new size of this tab panel
	forms[formName].elements.tab_header_detail.setSize(forms[formName].elements.tab_header_button.getWidth(),tabA)

	//go to display-only fields
	forms[formName].elements.tab_header_detail.tabIndex = 1

	//move/resize other tab panels
	forms[formName].elements.tab_main.setLocation(0,forms[formName].elements.tab_main.getLocationY() - offset)
	forms[formName].elements.tab_main.setSize(forms[formName].elements.tab_header_button.getWidth(),forms[formName].elements.tab_main.getHeight() + offset)

	//flip graphic
	elements.btn_cancel.visible = false
	elements.btn_edit.visible = true

	if (forms[formName] && forms[formName].elements.gfx_curtain) {
		forms[formName].elements.gfx_curtain.visible = false
	}
}
