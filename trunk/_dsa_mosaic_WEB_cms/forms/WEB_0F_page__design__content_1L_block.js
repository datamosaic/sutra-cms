/**
 *
 * @properties={typeid:24,uuid:"1480B246-ADDF-4A53-BBE8-C489910C1BAC"}
 */
function BLOCK_action_list() {
	if (utils.hasRecords(foundset)) {
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
	else {
		plugins.dialogs.showErrorDialog(
					'Error',
					'No block selected.  You must create/select a block first'
			)
	}
}

/**
 *
 * @properties={typeid:24,uuid:"0DE68168-7178-4FE8-B538-60456C223C6E"}
 */
function BLOCK_action_list_control() {
	
	switch (arguments[0]) {
		case 0:  // save block and data points to scrapbook and scrapbook data
			
			var input = plugins.dialogs.showInputDialog(
					'Enter name',
					'What is the name for this scrapbook entry?'
			)
			
			if (input) {
				// block to scrapbook
				var source 		= foundset.getRecord(foundset.getSelectedIndex())
				var destination	= forms.WEB_0F_scrapbook.foundset.getRecord(forms.WEB_0F_scrapbook.foundset.newRecord(true,true))
				var success		= databaseManager.copyMatchingColumns(source,destination)
				destination.scrapbook_name = input
				destination.id_site = forms.WEB_0F_site.id_site
				databaseManager.saveData()
				
				// block_data to scrapbook data
				var fsSource		= source.web_block_to_block_data
				
				for (var i = 0; i < fsSource.getSize(); i++) {
					var record		= fsSource.getRecord(i + 1)
					var destination	= forms.WEB_0F_scrapbook.web_scrapbook_to_scrapbook_data.getRecord(forms.WEB_0F_scrapbook.web_scrapbook_to_scrapbook_data.newRecord(true,true))
					databaseManager.copyMatchingColumns(record,destination)
				}
				databaseManager.saveData()
			}
			else {
				plugins.dialogs.showErrorDialog(
							'Error',
							'No name entered for scrapbook'
					)
			}
			break;
		default:
			break;
	}

}

/**
 *
 * @properties={typeid:24,uuid:"32ED93D4-CD10-47EF-B396-71C65FC962E7"}
 */
function BLOCK_new() {
	// get blocks
	var dataset = databaseManager.getDataSetByQuery(
				controller.getServerName(),
				"SELECT id_block_type, block_name FROM web_block_type WHERE id_site = ? ORDER BY block_name ASC",
				[forms.WEB_0F_site.id_site], 
				-1
			)
	
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
	values.push("---", "Scrapbook copy...", "Scrapbook connect...")
	
	// choose block type
	var selection = plugins.dialogs.showSelectDialog(
	"Select",
	"Choose block type", 
	values)
	
	// ERROR CHECK: NO SELECTED
	if ( !selection ) {
		return
	}
	
	if (! utils.stringPatternCount(selection,"Scrapbook")) {
	
		// get block display
		var dataset = databaseManager.getDataSetByQuery(
		controller.getServerName(),
		"select display_name, method_name, " +
			"(select id_block_display from web_block_display where id_block_type = ? and flag_default = 1) as display " +
		"from web_block_display where id_block_type = ?",
		new Array(valueListObj[selection],valueListObj[selection]), -1)
		
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
		
		// get block data points
		var dataset = databaseManager.getDataSetByQuery(
		controller.getServerName(),
		"select column_name, column_type, " +
			"(select id_block_display from web_block_display where id_block_type = ? and flag_default = 1) as display " +
		"from web_block_meta where id_block_type = ?",
		new Array(valueListObj[selection],valueListObj[selection]), -1)
		
		var dataNames = dataset.getColumnAsArray(1)
		
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
		forms.WEB_0F_scrapbook_1P__choose.f_source = "Page"
		if (selection == "Scrapbook copy...") {
			forms.WEB_0F_scrapbook_1P__choose.f_type = 0
		}
		else if (selection == "Scrapbook connect...") {
			forms.WEB_0F_scrapbook_1P__choose.f_type = 1
		}
		
		application.showFormInDialog(forms.WEB_0F_scrapbook_1P__choose,-1,-1,-1,-1,"Scrapbook", false, false, "chooseScrapbook")

	}
}

/**
 *
 * @properties={typeid:24,uuid:"08244641-DE34-4206-8FD6-CD1C1332B408"}
 */
function DIR_down()
{
	/*
	 *	TITLE:		DIR_down
	 *
	 *	MODULE:		fw_NAV_navigation_standard
	 *
	 *	ABOUT:		Move navigation_item down in list
	 *
	 *	MODIFIED:	Aug 27, 2007 - Troy Elliott, Data Mosaic
	 *
	 */

	 //if max index, exit
	 if (foundset.getSelectedIndex() == foundset.getSize()) {
		 return
	 }
	 
	 foundset.sort('row_order asc')

	 //if index = 1, set flag to avoid glitch recSelected
	 //TODO: find issue
	 if (foundset.getSelectedIndex() == 1) {
		 var recOne = true
	 }
	 else {
		 var recOne = false
	 }

	 //get current record
	 var recordCurr = foundset.getRecord(foundset.getSelectedIndex())

	 //get next record
	 var recordNext = foundset.getRecord(foundset.getSelectedIndex() + 1)

	 //swap with next record
	 recordCurr.row_order = recordNext.row_order
	 recordNext.row_order --

	 foundset.sort('row_order asc') //need to order by id_navigation_item and category first?

	 //TODO: find issue
	 if (recOne) {
		 controller.setSelectedIndex(2)
	 }
}

/**
 *
 * @properties={typeid:24,uuid:"54708E3B-2B4E-4871-B2B6-D36A7FFFB9DC"}
 */
function DIR_up()
{
	/*
	 *	TITLE:		DIR_up
	 *
	 *	MODULE:		fw_NAV_navigation_standard
	 *
	 *	ABOUT:		Move navigation_item up in list
	 *
	 *	MODIFIED:	Aug 27, 2007 - Troy Elliott, Data Mosaic
	 *
	 */

	 //if index = 1, exit
	 if (foundset.getSelectedIndex() == 1) {
		 return
	 }

	 foundset.sort('row_order asc')
	 
	 //get current record
	 var recordCurr = foundset.getRecord(foundset.getSelectedIndex())

	 //get previous record
	 var recordPrev = foundset.getRecord(foundset.getSelectedIndex() - 1)

	 //swap with previous record
	 recordCurr.row_order = recordPrev.row_order
	 recordPrev.row_order ++

	 foundset.sort('row_order asc')
}

/**
 *
 * @properties={typeid:24,uuid:"64E10B1C-C632-4B7D-92C5-F94DBA4C18BD"}
 */
function FORM_onLoad()
{
	elements.fld_id_block_display__field.visible = false
	elements.fld_id_block_display__combo.visible = true
}

/**
 *
 * @properties={typeid:24,uuid:"7E59BE92-3022-4690-94E5-0AC5FD663ABA"}
 */
function REC_delete()
{

/*
 *	TITLE    :	REC_delete
 *			  	
 *	MODULE   :	start_CRM_mosaic
 *			  	
 *	ABOUT    :	prompts to delete the currently selected record
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	REC_delete()
 *			  	
 *	MODIFIED :	July 31, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

var delRec = plugins.dialogs.showWarningDialog(
					'Delete record',
					'Do you really want to delete this record?',
					'Yes',
					'No'
				)

if (delRec == 'Yes') {
	
	var recSelect = controller.getSelectedIndex()

	controller.deleteRecord()
		
	var loop = recSelect
	while (loop <= controller.getMaxRecordIndex()) {
		controller.setSelectedIndex(loop)
		row_order--
		loop++
	}	
	controller.sort('row_order asc')
	controller.setSelectedIndex(recSelect)
	
	if (!utils.hasRecords(foundset)) {
		REC_selected()
	}
	
}


}

/**
 *
 * @properties={typeid:24,uuid:"BFBF2B28-E3BA-4CF7-807D-DADFF29D20F3"}
 */
function REC_selected()
{
	if (utils.hasRecords(foundset)) {
		// set relation
		globals.WEB_page_id_block_selected = id_block
		
		// input method names for block type
		var params = [id_block_type]
		var sql =	"select input_name, method_name from web_block_action_client where " +
						"web_block_action_client.id_block_type = ?"
		var dataset = databaseManager.getDataSetByQuery(
						controller.getServerName(), sql, params, -1)
	
		if ( dataset.getMaxRowIndex() ) {
			forms.WEB_0F_page__design__content_1F_block_data__raw.elements.btn_data_actions.visible = true
			forms.WEB_0F_page__design__content_1F_block_data.elements.btn_data_actions.visible = true
		}
		else {
			forms.WEB_0F_page__design__content_1F_block_data__raw.elements.btn_data_actions.visible = false
			forms.WEB_0F_page__design__content_1F_block_data.elements.btn_data_actions.visible = false			
		}
	}
	else {
		globals.WEB_page_id_block_selected = 0
		
		//no actions available
		forms.WEB_0F_page__design__content_1F_block_data__raw.elements.btn_data_actions.visible = false
		forms.WEB_0F_page__design__content_1F_block_data.elements.btn_data_actions.visible = false
	}
	
	//simple view
	if (globals.WEB_page_mode == 1) {
		//switch tabpanel based on type of form
		ACTION_set_simple_display()
	}
	//complex view
	else {
		forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.tabIndex = 1
	}
}

/**
 *
 * @properties={typeid:24,uuid:"39CC4D1D-2547-4F23-85E9-63C434B95F70"}
 */
function ACTION_set_simple_display() {
	var recBlock = foundset.getSelectedRecord()
	if (recBlock && utils.hasRecords(recBlock.web_block_to_block_type)) {
		var recBlockType = recBlock.web_block_to_block_type.getRecord(1)
	}
	
	//editable status
	var flagEdit = (utils.hasRecords(forms.WEB_0F_page__design.web_page_to_version) && forms.WEB_0F_page__design.web_page_to_version.flag_edit) ? true : false
	
	//this block definition exists as does the form
	if (recBlockType && forms[recBlockType.form_name]) {
		//form not loaded yet, get solution model to check for method existence
		if (forms[recBlockType.form_name] == '<Form ' + recBlockType.form_name + ' not loaded yet>' && solutionModel.getForm(recBlockType.form_name).getFormMethod('LOADER_init')) {
			var hasInit = true
		}
		//check for method existence on form
		else if (forms[recBlockType.form_name].LOADER_init) {
			var hasInit = true
		}
		
		//there is a custom form to show
		if (hasInit) {
			forms[recBlockType.form_name].LOADER_init(recBlock,flagEdit)
		}
		//something not right, show default form
		else {
			forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.removeTabAt(2)
			forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.tabIndex = 1
		}
	}
	else {
		forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.removeTabAt(2)
		forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.tabIndex = 1
	}
}

/**
 *
 * @properties={typeid:24,uuid:"4EC7D16F-6935-4DC5-AE97-1F29D7C8E65B"}
 */
function TOGGLE_elements(editAllow) {
	elements.btn_actions.enabled = editAllow
	elements.btn_add.enabled = editAllow
	elements.btn_delete.visible = editAllow
	elements.btn_down.enabled = editAllow
	elements.btn_up.enabled = editAllow
	
//	elements.fld_id_block_type.editable = editAllow
	elements.fld_id_block_display__combo.visible = editAllow
	elements.fld_id_block_display__field.visible = !editAllow
	elements.fld_params.editable = editAllow	
//	elements.fld_row_order.editable = editAllow
}
