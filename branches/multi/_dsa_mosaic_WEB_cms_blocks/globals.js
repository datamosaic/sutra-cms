/**
 * @properties={typeid:35,uuid:"D055F5E5-A18B-459B-9D17-86A082C98715",variableType:-4}
 */
var WEB_block_page_mode = false;

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

/**
 * Returns the correct web_block_data foundset to work with.
 * 
 * @param	{JSEvent}	event Event that triggered onSelect of the block_type form
 * 
 * @returns	{JSFoundset}	web_block_data foundset.
 * 
 * @properties={typeid:24,uuid:"C8DFEF81-D9D8-4742-96C3-3BA32FFCF62C"}
 */
function WEB_block_getData(event, formName) {
	//get form from event
	if (!formName && event && event.getFormName) {
		formName = event.getFormName()
	}
	
	//we know where this is being called from
	if (formName) {
		//get the block record they were on
		/** @type {JSRecord<db:/sutra_cms/web_block>}*/
		var blockRec = forms[formName].foundset
		
		//on the page and not viewing page scrapbooks, just use active version
		if (globals.WEB_block_page_mode) {
			return (utils.hasRecords(blockRec,'web_block_to_block_version.web_block_version_to_block_data')) ? blockRec.web_block_to_block_version.web_block_version_to_block_data : {}
		}
		//on a scrapbook, go through all relation (selected index determines which version)
		else {
			return (utils.hasRecords(blockRec,'web_block_to_block_version__all.web_block_version_to_block_data')) ? blockRec.web_block_to_block_version__all.web_block_version_to_block_data : {}
		}
	}
	//return something empty so won't fail as hard
	else {
		return new Object()
	}
}

/**
 * Returns the correct web_block_data_configure foundset to work with.
 * 
 * @param	{JSEvent}	event Event that triggered onSelect of the block_type form
 * 
 * @returns	{JSFoundset}	web_block_data_configure foundset.
 * 
 * @properties={typeid:24,uuid:"C8DFEF81-D9D7-4742-96C3-3BA32FFCF62C"}
 */
function WEB_block_getConfig(event) {
	//we know where this is being called from
	if (event && event.getFormName) {
		//get the block record they were on
		/** @type {JSRecord<db:/sutra_cms/web_block>}*/
		var blockRec = forms[event.getFormName()].foundset
		
		//on the page and not viewing page scrapbooks, just use active version
		if (globals.WEB_block_page_mode) {
			return utils.hasRecords(blockRec,'web_block_to_block_version.web_block_version_to_block_data_configure') ? blockRec.web_block_to_block_version.web_block_version_to_block_data_configure : {}
		}
		//on a scrapbook, go through all relation (selected index determines which version)
		else {
			return utils.hasRecords(blockRec,'web_block_to_block_version__all.web_block_version_to_block_data_configure') ? blockRec.web_block_to_block_version__all.web_block_version_to_block_data_configure : {}
		}
	}
}

/**
 * Returns the correct web_block_data_response foundset to work with.
 * 
 * @param	{JSEvent}	event Event that triggered onSelect of the block_type form
 * 
 * @returns	{JSFoundset}	web_block_data_response foundset.
 * 
 * @properties={typeid:24,uuid:"B0D3D289-08E8-4820-9998-70F18D96C9B0"}
 */
function WEB_block_getResponse(event) {
	//we know where this is being called from
	if (event && event.getFormName) {
		//get the block record they were on
		/** @type {JSRecord<db:/sutra_cms/web_block>}*/
		var blockRec = forms[event.getFormName()].foundset
		
		//on the page and not viewing page scrapbooks, just use active version
		if (globals.WEB_block_page_mode) {
			return utils.hasRecords(blockRec,'web_block_to_block_version.web_block_version_to_block_data_response') ? blockRec.web_block_to_block_version.web_block_version_to_block_data_response : {}
		}
		//on a scrapbook, go through all relation (selected index determines which version)
		else {
			return utils.hasRecords(blockRec,'web_block_to_block_version__all.web_block_version_to_block_data_response') ? blockRec.web_block_to_block_version__all.web_block_version_to_block_data_response : {}
		}
	}
}
