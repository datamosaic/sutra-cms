/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f39"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"5D0F177F-BF56-477D-8B14-1EAA835890D1"}
 */
function DATA_action_list(event) {
	//we have the records we need
	if (utils.hasRecords(foundset.getSelectedRecord(),'web_block_to_block_type.web_block_type_to_block_action_client')) {
		//menu items
		var valuelist = new Array()
		var methods = new Array()
		
		//form where these methods will run
		var formName = web_block_to_block_type.form_name
		
		//loop over foundset and pick up the block records
		for (var i = 1; i <= web_block_to_block_type.web_block_type_to_block_action_client.getSize(); i++) {
			var record = web_block_to_block_type.web_block_type_to_block_action_client.getRecord(i)
			if (record.action_type == 'Block') {
				valuelist.push(record.input_name)
				methods.push(record.method_name)
			}
		}
		
		//set up menu with arguments
		var menu = new Array()
		for ( var i = 0 ; i < valuelist.length ; i++ ) {
			menu[i] = plugins.popupmenu.createMenuItem(valuelist[i],DATA_action_list_control)
		
			menu[i].setMethodArguments(formName, methods[i])
		
			if (menu[i].text == '----') {
				menu[i].setEnabled(false)
			}
		}
		
		//popup
		var elem = elements[application.getMethodTriggerElementName()]
		if (elem != null && valuelist.length) {
			plugins.popupmenu.showPopupMenu(elem, menu)
		}
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2AFA45C5-E703-47EB-B87F-C64BCEDA1569"}
 */
function DATA_action_list_control(event) {
	//pseudo-event comes from the scope of where this is fired
	var pseudoEvent = new Object()
	pseudoEvent.getFormName = function() {return controller.getName()/*elements.tab_detail.getTabFormNameAt(elements.tab_detail.tabIndex)*/}
	
	forms[arguments[0]][arguments[1]](pseudoEvent)
}
