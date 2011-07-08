/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f39"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"5D0F177F-BF56-477D-8B14-1EAA835890D1"}
 */
function DATA_action_list(event) {
	// get block type
	var params = new Array(forms.WEB_0F_page__design__content_1L_area.id_area, forms.WEB_0F_page__design__content_1L_block.id_block)
	var sql =	"select id_block_type, form_name from web_block_type where " +
					"web_block_type.id_block_type = " +
					"(select id_block_type from web_block where " +
					"web_block.id_area = ? and " +
					"web_block.id_block = ?)"
	var dataset = databaseManager.getDataSetByQuery(
					controller.getServerName(), sql, params, -1)	
	
	if ( dataset.getMaxRowIndex() ) {
		var typeID = dataset.getValue(1,1)
		var formName = dataset.getValue(1,2)
	}
	else { 
		return "No matching block type found"
	}

	
	// input method names for block type
	var params = [typeID,"Block"]
	var sql =	"select input_name, method_name from web_block_action_client where " +
					"id_block_type = ? AND action_type = ?"
	var dataset = databaseManager.getDataSetByQuery(
					controller.getServerName(), sql, params, -1)

	if ( dataset.getMaxRowIndex() ) {
		//sort alphabetically
		dataset.sort(1,true)
		
		//menu items
		var valuelist 	= dataset.getColumnAsArray(1)
		var methods		= dataset.getColumnAsArray(2)
		
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
	forms[arguments[0]][arguments[1]]()
}
