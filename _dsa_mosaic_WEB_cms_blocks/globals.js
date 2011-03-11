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
 * @properties={typeid:24,uuid:"50261E32-F8E7-4BBB-8A93-A4202554C22A"}
 */
function WEB_block_form_loader(bannerName, formName) {
	// change banner name
	forms.WEB_0F_page__design__content_1F_block_data.elements.lbl_banner.text = bannerName
	
	// load form
	forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.removeTabAt(2)
	forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.addTab(forms[formName])
	forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.tabIndex = 2
}
