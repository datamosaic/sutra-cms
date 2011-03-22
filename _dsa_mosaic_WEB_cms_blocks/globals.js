/**
 * @properties={typeid:24,uuid:"81DC790B-61A4-4895-BD4A-65F2BB1ABC21"}
 */
function WEB_block_methods(formName, type) {
	var methods = forms[formName].allmethods
	
	var clientActionsBlock = {}
	var clientActionsPage = {}
	var webActions = {}
	var views = {}
	
	for (var i in methods) {
		if ( methods[i].substr(0,5) == "BLOCK" ) {
			clientActionsBlock[methods[i].substr(6,100)] = methods[i]
		}
		if ( methods[i].substr(0,4) == "PAGE" ) {
			clientActionsPage[methods[i].substr(5,100)] = methods[i]
		}
		else if ( methods[i].substr(0,3) == "WEB" ) {
			webActions[methods[i].substr(4,100)] = methods[i]
		}
		else if ( methods[i].substr(0,4) == "VIEW" ) {
			views[methods[i].substr(5,100)] = methods[i]
		}
	}	
	
	switch (type) {
		case "BLOCK":
			return clientActionsBlock
			break
		case "PAGE":
			return clientActionsPage
		case "WEB":
			return webActions
			break
		case "VIEW":
			return views
			break
		default:
			return {}
	}
}

/**
 * 
 * loads block form into page UI
 * 
 * @param {String} formName Name of form to load
 * @param {String} [bannerName] Name of page block label
 * 
 * @properties={typeid:24,uuid:"50261E32-F8E7-4BBB-8A93-A4202554C22A"}
 */
function WEB_block_form_loader(formName, bannerName, relationName) {
	// change banner name
	if (bannerName) {
		forms.WEB_0F_page__design__content_1F_block_data.elements.lbl_banner.text = bannerName
	}
	else {
		forms.WEB_0F_page__design__content_1F_block_data.elements.lbl_banner.text = "Content"
	}
	
	// load form
	if (forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.getTabFormNameAt(2) != formName) {
		forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.removeTabAt(2)
		forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.addTab(forms[formName],null,null,null,null,null,null,relationName)
		forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.tabIndex = 2
	}
}

/**
 * @properties={typeid:24,uuid:"2936E71A-50BF-4F06-A427-09EE918F273C"}
 */
function WEB_block_form_refresh() {
	//update display
	if (globals.WEB_page_mode == 2) {
		forms.WEB_0F_page__design__content_1L_block.ACTION_gui_mode_refresh()
	}
	else if (globals.WEB_page_mode == 3) {
		forms.WEB_0F_page__browser__editor.FORM_on_show()
	}
}
