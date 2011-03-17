/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"570EDE4C-54AB-4279-A57B-74B45922F1E5"}
 */
function DATA_action_list(event) {
	// get block type
	var params = new Array(globals.WEB_page_id_area_selected, globals.WEB_page_id_block_selected)
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
		return "No mathing block type found"
	}

	
	// input method names for block type
	var params = [typeID]
	var sql =	"select input_name, method_name from web_block_action_client where " +
					"web_block_action_client.id_block_type = ?"
	var dataset = databaseManager.getDataSetByQuery(
					controller.getServerName(), sql, params, -1)

	if ( dataset.getMaxRowIndex() ) {

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
 * @properties={typeid:24,uuid:"8861F626-796C-403D-AB5E-03E6593A9678"}
 */
function DATA_action_list_control(event) {
	forms[arguments[0]][arguments[1]]()
}
