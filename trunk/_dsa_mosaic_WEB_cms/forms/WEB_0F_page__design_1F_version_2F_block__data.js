/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4FDACEFD-6F16-46F7-827B-375325824AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"570EDE4C-54AB-4279-A57B-74B45922F1E5"}
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
 * @properties={typeid:24,uuid:"8861F626-796C-403D-AB5E-03E6593A9678"}
 */
function DATA_action_list_control(event) {
	//pseudo-event comes from the scope of where this is fired
	var pseudoEvent = new Object()
	pseudoEvent.getFormName = function() {return controller.getName()}
	
	forms[arguments[0]][arguments[1]](pseudoEvent)
}

/**
 * @properties={typeid:24,uuid:"8627B776-64BF-4EBB-9102-D5D821D1D52D"}
 */
function TOGGLE_elements(editAllow) {
	forms.WEB_0F_page__design_1F_version_2F_block__data_3L_block_data.elements.edit_data_value.editable = editAllow
	forms.WEB_0F_page__design_1F_version_2F_block__data_3L_block_data_configure.elements.edit_data_value.editable = editAllow
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0CEBEBFC-B4C0-4BC0-904C-924EFFD82A1B"}
 */
function REC_on_select(event) {
	//check to make sure the active block version is editable
	if (forms.WEB_0F_page.ACTION_edit_get() && utils.hasRecords(foundset.getSelectedRecord(),'web_block_to_block_version') && !foundset.getSelectedRecord().web_block_to_block_version.flag_lock) {
		TOGGLE_elements(true)
	}
	//no edits
	else {
		TOGGLE_elements(false)
	}
	
	var fsResponse = forms.WEB_0F_page__design_1F_version_2F_block__data_3F_block_data_response.foundset
	
	if (utils.hasRecords(web_block_to_block_version) && web_block_to_block_version.id_block_version) {
		var dataset = databaseManager.getDataSetByQuery(
					"sutra_cms",
					"SELECT id_block_data_response FROM web_block_data_response WHERE id_block_version = ? GROUP BY id_instance",
					[web_block_to_block_version.id_block_version.toString()],
					-1
				)
			
		fsResponse.loadRecords(dataset)
		
		fsResponse.sort('rec_created desc')
	}
	else {
		fsResponse.clear()
	}
}
