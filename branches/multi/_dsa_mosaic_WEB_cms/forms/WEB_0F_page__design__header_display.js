/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f59"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8F3EE159-96AD-4FC8-A978-BD2ABAD1F366"}
 */
function FORM_on_load(event) {
	//hide hider
	elements.lbl_folder.visible = false
	
	//set up beans
	elements.split_picker_2.leftComponent = elements.tab_platform
	elements.split_picker_2.rightComponent = elements.split_picker_3
	
	elements.split_picker_3.leftComponent = elements.tab_language
	elements.split_picker_3.rightComponent = elements.tab_group
	
	elements.split_picker_1.leftComponent = elements.split_picker_2
	elements.split_picker_1.rightComponent = elements.tab_version
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EDA657C6-3547-40F8-956C-5E8541E4930C"}
 */
function FORM_on_show(firstShow, event) {
	if (firstShow) {
		//set up beans 1/3 to version, 2/9 to all else, unless screen size too large, then max for small and the rest to versions
		var fullWidth = elements.lbl_display.getWidth()
		var minWidth = 140
		var smallMax = (fullWidth * 2 / 9) > minWidth
		
		//fire several times to make sure splitpanes know how big they are
		var cnt = 3
		while (cnt) {
			elements.split_picker_2.dividerLocation = smallMax ? minWidth : fullWidth * 2 / 9
			
			elements.split_picker_3.dividerLocation = smallMax ? minWidth + 20 : (fullWidth * 2 / 9 + 20)
			
			elements.split_picker_1.dividerLocation = smallMax ? minWidth * 3 : fullWidth * 2 / 3
			cnt --
			
			application.updateUI()
		}
	}
}

/**
 *
 * @properties={typeid:24,uuid:"967D366C-A987-411F-8344-746E8CFE5089"}
 */
function TOGGLE_edit() {
	if (utils.hasRecords(foundset)) {
		elements.btn_edit_on.visible = (web_page_to_version.flag_edit) ? true : false
		elements.btn_edit_off.visible = (web_page_to_version.flag_edit) ? false : true
	}
	else {
		elements.btn_edit_on.visible = false
		elements.btn_edit_off.visible = false
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"FA57171D-D36D-4182-9DDB-DEBD402A71C1"}
 */
function CURTAIN_block(event) {
	//click through to external link when page_link type
	if (page_type == 2 && page_link) {
		globals.CODE_url_handler(page_link)
	}
	else if (page_type == 3 && page_link_internal) {
		globals.CODE_url_handler(globals.WEB_MRKUP_link_page(page_link_internal))
	}
}
