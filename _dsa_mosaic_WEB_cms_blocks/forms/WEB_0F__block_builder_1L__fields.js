/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"886E521A-1826-4A9F-AA05-A622716F4FDB"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1A67C02F-D927-47CD-ABC1-41196D1871A9"}
 */
function REC_on_select(event) {
	//save index down to some place where it is accessible
	forms.WEB_0F__block_builder._blockSelected = row_order
	
	//grab data for selected record
	var fieldData = forms.WEB_0F__block_builder._blockList[row_order]
	
	var formName = 'WEB_0F__block_builder' + '_1F__' + fieldData.type
	
	//load selected block type
	forms.WEB_0F__block_builder.elements.tab_detail.removeAllTabs()
	forms.WEB_0F__block_builder.elements.tab_detail.addTab(forms[formName])
	
	//punch data in
	forms[formName].INIT_data(fieldData.record)
}
