/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"46DACEFD-6F16-46F7-827B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * Update display as needed when block selected.
 * 
 * @properties={typeid:24,uuid:"C4FCD4BB-E90B-46E1-BDDA-890B883963D4"}
 */
function INIT_data() {
	var data = globals.CMS.ui.getData(controller.getName())
	
	var html = '<html>'
	
	html += globals.WEBb_index_edit() + '<body>'
	if (data.Content) {
		// replace out place holders (DS_* links)
		var markup = globals.WEBc_markup_link_internal(data.Content,null,'Edit')
		
		html += markup
	}
	html += '</body></html>'
	
	if (application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
		globals.WEBb_block_preview(elements.lbl_view,markup)
	}
	else if (elements.bn_browser) {
		elements.bn_browser.html = html
	}
	else {
		globals.WEBc_browser_error()
	}
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E3F58390-86B7-4669-92AE-558B662FF672"}
 */
function FORM_on_load(event) {
	//when not web client, enable browser bean
	if (application.getApplicationType() != APPLICATION_TYPES.WEB_CLIENT) {
		if (elements.bn_browser) {
			elements.bn_browser.visible = true
			elements.lbl_view.visible = false
		}
		else {
			globals.WEBc_browser_error()
		}
	}
}
