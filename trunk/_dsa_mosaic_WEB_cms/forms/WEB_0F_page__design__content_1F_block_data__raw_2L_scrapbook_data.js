/**
 *
 * @properties={typeid:24,uuid:"17E44A9A-2AEC-432C-B827-7E81A1283C2F"}
 */
function DATA_action_list() {
	// get block type
	var params = new Array(forms.WEB_0F_page__design.id_page, globals.WEB_page_id_area_selected, globals.WEB_page_id_block_selected)
	var sql =	"select id_block_type, form_name from web_block_type where " +
					"web_block_type.id_block_type = " +
					"(select id_block_type from web_block where " +
					"web_block.id_page = ? and " +
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
	var sql =	"select input_name, method_name from web_block_input where " +
					"web_block_input.id_block_type = ?"
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
 *
 * @properties={typeid:24,uuid:"8FF58FD7-E04E-4319-9F22-8645D3386F67"}
 */
function DATA_action_list_control() {
	// forms[type.form_name][display.method_name](dataObject)
	forms[arguments[0]][arguments[1]]()
}

/**
 *
 * @properties={typeid:24,uuid:"3920F3DE-F706-4EAF-818D-7FE194100BF3"}
 */
function REC_delete()
{
	var delRec = plugins.dialogs.showWarningDialog(
	'Delete record',
	'Do you really want to delete this record?',
	'Yes',
	'No')

	if (delRec == 'Yes') {

	controller.deleteRecord()
	}
}
