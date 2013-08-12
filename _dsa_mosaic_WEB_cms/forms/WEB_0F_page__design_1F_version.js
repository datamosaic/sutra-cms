/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f38"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"E4A1ABA3-14D7-48B6-895C-85F186CCB271"}
 */
function FORM_on_load()
{
	if (!solutionPrefs.config.webClient) {
		// set split 3
		elements.bean_split_3.topComponent		= elements.tab_area
		elements.bean_split_3.bottomComponent	= elements.tab_row
		elements.bean_split_3.dividerLocation	= 180	
		
		// set split 2
		elements.bean_split_2.topComponent		= elements.bean_split_3
		elements.bean_split_2.bottomComponent	= elements.tab_block
		elements.bean_split_2.dividerLocation	= 300	
		
		// set split 1
		elements.bean_split_1.leftComponent	= elements.bean_split_2
		elements.bean_split_1.rightComponent	= elements.tab_content
		elements.bean_split_1.dividerLocation	= 300
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"DC5B0B90-D4D7-4BA6-8CB4-EA4F985F284C"}
 */
function FORM_on_show(firstShow, event) {
	//entering page mode (only active version of block used)
	globals.WEB_block_page_mode = true	
	
	//covered by onSelect the first time
	if (!firstShow) {
		forms.WEB_0F_page__design.PAGE_type_display()
	}
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"97BFCB0E-2906-4C9F-B9E5-51209BAB5DCF"}
 */
function FORM_on_hide(event) {
	//leaving page mode (only active version of block used)
	globals.WEB_block_page_mode = false
	
	return true
}
