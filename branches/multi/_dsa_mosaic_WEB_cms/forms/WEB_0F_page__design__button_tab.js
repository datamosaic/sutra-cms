/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f33"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"5CD2FA00-B410-47B4-BDA0-8D5A6ECF6B41"}
 */
function FORM_on_load()
{
//hide cancel button
elements.btn_cancel.visible = false
}

/**
 *
 * @properties={typeid:24,uuid:"C946B15B-1BD2-4FC4-9D1A-130E19536C2D"}
 */
function TAB_change(formName,elemName) {
	globals.TAB_change_inline('WEB_0F_page__design__button_tab',elemName,'tab_button','tab_b')
	
	//set main tab appropriately
	forms.WEB_0F_page__design.elements.tab_main.tabIndex = elements.tab_button.tabIndex
	
	//toggle display to show nothing for page when no valid version stack
	if (forms.WEB_0F_page__design.elements.tab_main.tabIndex == 1 && !utils.hasRecords(forms.WEB_0F_page__design__content.foundset)) {
		forms.WEB_0F_page__design.elements.tab_main.tabIndex = 4
	}
	
	//put on custom header for scrapbook
	if (elements.tab_button.tabIndex == 3) {
		forms.WEB_0F_page__design.elements.tab_header_detail.tabIndex = 3
	}
	//standard header
	else if (forms.WEB_0F_page__design.elements.tab_header_detail.tabIndex == 3) {
		forms.WEB_0F_page__design.elements.tab_header_detail.tabIndex = 1
	}

}
