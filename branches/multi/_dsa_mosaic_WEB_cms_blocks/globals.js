/**
 * @properties={typeid:35,uuid:"669F48AD-6BF9-4038-A808-1A8530337316",variableType:-4}
 */
var WEB_block_on_select = true;

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
		else if ( methods[i].substr(0,10) == "CONTROLLER" ) {
			views[methods[i].substr(11,100)] = methods[i]
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
 * @properties={typeid:24,uuid:"2936E71A-50BF-4F06-A427-09EE918F273C"}
 */
function WEB_block_form_refresh() {
//	//update display
//	if (globals.WEB_page_mode == 2) {
//		forms.WEB_0F_page__design__content_1L_block.ACTION_gui_mode_refresh()
//	}
//	else 
	if (globals.WEB_page_mode == 3) {
		forms.WEB_0F_page__browser__editor.FORM_on_show()
	}
}

/**
 * @param {JSEvent} event Event that triggered onSelect of the block_type form
 * 
 * @properties={typeid:24,uuid:"E81AB531-F187-476A-9EE0-455D12DE6B5D"}
 */
function WEB_block_enable(event) {
	
	var blockEnable = 
	//we're not in headless client
		application.getApplicationType() != APPLICATION_TYPES.HEADLESS_CLIENT &&
	//event is valid and called from a form
		event && event.getFormName && event.getFormName() && 
	//the foundset has records (don't fire when no block records)
		utils.hasRecords(forms[event.getFormName()].foundset) && 
	//selected block has a valid block type
		utils.hasRecords(forms[event.getFormName()].web_block_to_block_type) && 
	//either the edit form or the display form for said block type is calling the method (only run block_type code on correct block_type)
		(event.getFormName() == forms[event.getFormName()].web_block_to_block_type.form_name ||
		event.getFormName() == (forms[event.getFormName()].web_block_to_block_type.form_name_display || forms[event.getFormName()].web_block_to_block_type.form_name) ) &&
	//on_select not manually disabled
		globals.WEB_block_on_select
		
	return blockEnable
}
