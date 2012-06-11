/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6932AE1C-A885-4BD0-8CF0-B90CF31F27AD"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"4D84FC8A-FB2C-4C1F-8D3E-6062537318F1"}
 */
function TAB_change(formName,elemName) {
	globals.TAB_change_inline('WEB_0F_block__scrapbook__button_tab',elemName,'tab_button','tab_b')
	
	//set main tab appropriately
	forms.WEB_0F_block__install.elements.tab_detail.tabIndex = elements.tab_button.tabIndex
	forms.WEB_0F_block__site.elements.tab_detail.tabIndex = elements.tab_button.tabIndex
}
