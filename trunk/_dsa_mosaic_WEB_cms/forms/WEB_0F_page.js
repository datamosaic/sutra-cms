/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f28"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"E678611B-86D2-4045-B97E-BF6A669DC56D"}
 */
function AREA_new(event)
{

	// ONE-OFF (shift key)
	if (event.getModifiers() & JSEvent.MODIFIER_SHIFT) {
		var size = web_page_to_area.getSize() 
		var record = web_page_to_area.getRecord(web_page_to_area.newRecord(false, true))
		record.row_order = size + 1
		databaseManager.saveData(true)
		return "one-off record added"
	}

	// ERROR CHECK: PAGE AREA RECORDS DELETE
	if (utils.hasRecords(web_page_to_area)) {
		var input = plugins.dialogs.showWarningDialog( "Warning",
		"This action will delete current area records. Continue?", "Yes", "No")

		if ( input != "Yes") {
			return
		}
	}

	// ERROR CHECK: THEME SELECTED FOR PAGE
	if ( !id_theme ) {
		plugins.dialogs.showErrorDialog( "Error",
		"No theme selected for this page")
		return
	}

	// get layouts from current page theme
	var dataset = databaseManager.getDataSetByQuery(
	controller.getServerName(),
	"select id_layout, layout_name from web_layout where id_theme = ?",
	[id_theme], -1)

	// setup associative array
	var IDs = dataset.getColumnAsArray(1)
	var values = dataset.getColumnAsArray(2)
	var valueListObj = {}
	for (var i = 0; i < IDs.length; i++) {
		valueListObj[values[i]] = IDs[i]
	}

	// choose layout
	var selection = plugins.dialogs.showSelectDialog(
	"Select",
	"Choose layout", 
	values)

	// ERROR CHECK: NO LAYOUT SELECTED
	if ( !selection ) {
		return
	}

	// get editable regions based on layout selected
	var dataset = databaseManager.getDataSetByQuery(
	controller.getServerName(),
	"select editable_name from web_editable where id_layout = ?",
	[valueListObj[selection]], -1)
	var editableNames = dataset.getColumnAsArray(1)

	// ERROR CHECK: NO EDITABLES
	if ( !editableNames.length ) {
		plugins.dialogs.showErrorDialog( "Error",
		"No editable regions set up in layout selected.")
		return
	}

	// delete current area records
	if (utils.hasRecords(web_page_to_area)) {
		web_page_to_area.deleteAllRecords()
	}

	// create a page area record for each editable
	order = 1
	for (var i = 0; i < editableNames.length; i++) {
		var record = web_page_to_area.getRecord(web_page_to_area.newRecord(false, true))
		record.area_name = editableNames[i]
		record.row_order = order ++                                
		databaseManager.saveData()
	}

	// finish up
	web_page_to_area.sort( "row_order asc" )
	web_page_to_area.setSelectedIndex(1)
	id_theme_layout = valueListObj[selection]
	databaseManager.saveData()

}

/**
 *
 * @properties={typeid:24,uuid:"CCA0668E-6769-4FCE-92AA-A6D861DAFCCB"}
 */
function BLOCK_action_list()
{

	//menu items
	var valuelist = new Array('Save to scrapbook')
	
	//set up menu with arguments
	var menu = new Array()
	for ( var i = 0 ; i < valuelist.length ; i++ ) {
		menu[i] = plugins.popupmenu.createMenuItem(valuelist[i],BLOCK_action_list_control)
	
		menu[i].setMethodArguments(i)
	
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

/**
 *
 * @properties={typeid:24,uuid:"8FE827CA-B29B-4409-AF80-74C919E0FC8D"}
 */
function BLOCK_action_list_control()
{
	switch (arguments[0]) {
		case 0:  // save block and data points to scrapbook and scrapbook data
			
			// block to scrapbook
			var source 		= forms.WEB_0F_page__design__content_1L_block.foundset.getRecord(forms.WEB_0F_page__design__content_1L_block.foundset.getSelectedIndex())
			var destination	= forms.WEB_0F_scrapbook.foundset.getRecord(forms.WEB_0F_scrapbook.foundset.newRecord(true))
			var success		= databaseManager.copyMatchingColumns(source,destination)
			databaseManager.saveData()
			
			// block_data to scrapbook data
			var source		= forms.WEB_0F_page__design__content_1L_block.web_block_to_block_data
			
			for (var i = 0; i < source.getSize(); i++) {
				var record		= source.getRecord(i + 1)
				var destination	= forms.WEB_0F_scrapbook.web_scrapbook_to_scrapbook_data.getRecord(forms.WEB_0F_scrapbook.web_scrapbook_to_scrapbook_data.newRecord(true))
				databaseManager.copyMatchingColumns(record,destination)
			}
			databaseManager.saveData()
			
			break;
		default:
			break;
	}

}

/**
 *
 * @properties={typeid:24,uuid:"038013BF-721C-4922-B361-5A19F6007D49"}
 */
function BLOCK_new()
{
	if (utils.hasRecords(foundset)) {
	
		// get blocks
		var dataset = databaseManager.getDataSetByQuery(
			controller.getServerName(),
			"select id_block_type, block_name from web_block_type",
			null, -1)
		
		// ERROR CHECK: NO BLOCKS INSTALLED
		if ( !dataset ) {
			return
		}
		
		// setup associative array
		var IDs = dataset.getColumnAsArray(1)
		var values = dataset.getColumnAsArray(2)
		var valueListObj = {}
		for (var i = 0; i < IDs.length; i++) {
			valueListObj[values[i]] = IDs[i]
		}
		
		// add scrapbook option
		values.push("---", "Scrapbook...")
		
		// choose block type
		var selection = plugins.dialogs.showSelectDialog(
		"Select",
		"Choose block type", 
		values)
		
		// ERROR CHECK: NO SELECTED
		if ( !selection ) {
			return
		}
		
		if (selection != "Scrapbook...") {
		
			// get block data points
			var dataset = databaseManager.getDataSetByQuery(
			controller.getServerName(),
			"select column_name, column_type, " +
				"(select id_block_display from web_block_display where id_block_type = ? and flag_default = 1) as display " +
			"from web_block_meta where id_block_type = ?",
			new Array(valueListObj[selection],valueListObj[selection]), -1)
			
			var dataNames = dataset.getColumnAsArray(1)
			var display = dataset.getValue(1,3)
			
			// create block record
			if (utils.hasRecords(web_page_to_area)) {
				var count = web_page_to_block_by_area.getSize()
				var record = web_page_to_block_by_area.getRecord(web_page_to_block_by_area.newRecord(false, true))
				record.id_block_type = valueListObj[selection]
				record.id_block_display = ( display ) ? display : null
				record.row_order = count + 1
				databaseManager.saveData()
			}
			
			// create a block data record for each data point
			for (var i = 0; i < dataNames.length; i++) {
				var record = web_page_to_block_data_by_area_by_block.getRecord(web_page_to_block_data_by_area_by_block.newRecord(false, true))
				record.data_key = dataNames[i]
				databaseManager.saveData()
			}
			
			// finish up
			web_page_to_block_data_by_area_by_block.setSelectedIndex(1)
			
			forms.WEB_0F_page__design__content_1L_block.REC_selected()
		}
		else {
			
			application.showFormInDialog(forms.WEB_0F_scrapbook_1P__choose,-1,-1,-1,-1,"Scrapbook", false, false, "chooseScrapbook")

		}
	}
}

/**
 *
 * @properties={typeid:24,uuid:"BFFA0ACE-EB53-44D1-9360-DBF3128DF80F"}
 */
function DATA_action_list()
{
	// get block type
	var params = new Array(id_page, globals.WEB_page_id_area_selected, globals.WEB_page_id_block_selected)
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
 * @properties={typeid:24,uuid:"38B9C448-9713-49F3-8BF1-40BFBF0953BE"}
 */
function DATA_action_list_control()
{
	// forms[type.form_name][display.method_name](dataObject)
	forms[arguments[0]][arguments[1]]()
}

/**
 * 
 * @properties={typeid:24,uuid:"22B28FF1-9C43-4F31-935E-2928B472FCE8"}
 */
function BROWSER_block_new(areaName) {
	// id_area from areaName passed in
	// TODO: put a div wrapper around areas. then can pass in id_area directly. 
	// TODO: write in the area block_new div when wrapper is created
	application.beep()
}

/**
 *
 * @properties={typeid:24,uuid:"F1DF07A7-B3D8-4A8B-A4CF-9CB5A79A5D1D"}
 */
function TRIGGER_mode_set(mode) {
	if (mode) {
		switch (mode) {
			case "DESIGN":	
				//custom block editor loaded on browser form, remove
				if (forms.WEB_0F_page__browser.elements.tab_editor.getMaxTabIndex() && (
					forms.WEB_0F_page__browser.elements.tab_editor.getTabFormNameAt(1) == 'WEB_0F__content' ||
					forms.WEB_0F_page__browser.elements.tab_editor.getTabFormNameAt(1) == 'WEB_0F_asset__image'
					)) {
					
					forms.WEB_0F_page__browser.elements.tab_editor.removeTabAt(1)
				}
				
				elements.tab_main.removeTabAt(2)
				elements.tab_main.tabIndex = 1
				
				//reset enabled/disabled, etc.
				forms.WEB_0F_page__design__header_display.FLD_data_change__version_selected()
				break;
			case "BROWSER":	
				forms.WEB_0F_page__browser.REC_selected()
				elements.tab_main.addTab( forms.WEB_0F_page__browser )
				elements.tab_main.tabIndex = 2
				break;
			default:
			break;
		}
	}
	else {
		switch (elements.tab_main.tabIndex) {
			case 1:	
				return "DESIGN"
				break;
			case 2:	
				return "BROWSER"
				break;
			default:
			break;
		}
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"10F5E463-15E2-4C0B-858D-F62E76FEDFBF"}
 */
function FORM_on_show(firstShow, event) {
	
	//don't run in headless client
	if (application.getApplicationType() != APPLICATION_TYPES.HEADLESS_CLIENT) {
		//in workflow maximized view
		if (firstShow && solutionPrefs.config.activeSpace == 'workflow') {
			//remove possible heavyweight stuff
			if (forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.getMaxTabIndex() >= 2 && (
				forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.getTabFormNameAt(2) == 'WEB_0F__content' ||
				forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.getTabFormNameAt(2) == 'WEB_0F_asset__image' //||
				)) {
				
				forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.removeTabAt(2)
			}
			
			//switch modes
			TRIGGER_mode_set("BROWSER")
			return
		}
		
		if (!utils.hasRecords(foundset)) {
			//no records, dim out
			globals.WEB_version_selected = null
			globals.WEB_group_selected = null
			
			globals.WEB_lock_workflow(true)
		}
		else {// if (TRIGGER_mode_set() != "BROWSER") {
			// trigger correct block simple display
			forms.WEB_0F_page__design__content_1L_block.ACTION_set_simple_display()
		}
	}
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean} allow hide
 *
 * @properties={typeid:24,uuid:"C35E32F1-37B2-4324-84F2-347A223A6871"}
 */
function FORM_on_hide(event) {
	//don't run in headless client
	if (application.getApplicationType() != APPLICATION_TYPES.HEADLESS_CLIENT) {
		globals.WEB_lock_workflow(false)
	}
	
	return true
}
