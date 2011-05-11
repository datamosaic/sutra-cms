/**
 * @properties={typeid:35,uuid:"4FDACEFD-6F16-46F7-827B-375E25024AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"88F9B85E-8A85-4B47-B2EB-6E63713E46A3"}
 */
function AREA_new(event) {
	
	var pageRec = forms.WEB_0F_page.foundset.getRecord(forms.WEB_0F_page.foundset.getSelectedIndex())
	
	// ERROR CHECK: PAGE AREA RECORDS DELETE
	if (utils.hasRecords(foundset)) {
		var input = plugins.dialogs.showWarningDialog(
						"Warning",
						"This action will delete current area records. Continue?", 
						"Yes", 
						"No"
					)

		if ( input != "Yes") {
			return
		}
	}

	// ERROR CHECK: THEME SELECTED FOR PAGE
	if ( !pageRec.id_theme ) {
		plugins.dialogs.showErrorDialog(
						"Error",
						"No theme selected for this page"
					)
		return
	}

	// get layouts from current page theme
	var dataset = databaseManager.getDataSetByQuery(
					controller.getServerName(),
					"select id_layout, layout_name from web_layout where id_theme = ?",
					[pageRec.id_theme], 
					-1
				)

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
				values
			)

	// ERROR CHECK: NO LAYOUT SELECTED
	if ( !selection ) {
		return
	}
	
	//save new layout
	pageRec.id_theme_layout = valueListObj[selection]
	
	// get editable regions based on layout selected
	if (!utils.hasRecords(pageRec.web_page_to_layout.web_layout_to_editable)) {
		plugins.dialogs.showErrorDialog( 
					"Error",
					"No editable regions set up in layout selected."
				)
		return 'No editables for selected layout'
	}
	
	var fsRegions = pageRec.web_page_to_layout.web_layout_to_editable
	
	var fsArea = databaseManager.getFoundSet('sutra_cms','web_area')
	fsArea.find()
	fsArea.id_group = globals.WEB_group_selected
	fsArea.id_version = globals.WEB_version_selected
	var results = fsArea.search()
	
	
	// delete current area records
	if (utils.hasRecords(fsArea)) {
		fsArea.deleteAllRecords()
	}
	
	// create a page area record for each editable
	var order = 1
	for (var i = 1; i <= fsRegions.getSize(); i++) {
		var tempEditableRec = fsRegions.getRecord(i)
		
		var areaRec = fsArea.getRecord(fsArea.newRecord(false, true))
		
		areaRec.area_name = tempEditableRec.editable_name
		areaRec.id_editable = tempEditableRec.id_editable
		areaRec.row_order = order ++ 
		areaRec.id_group = globals.WEB_group_selected
		
		databaseManager.saveData()
		
		//create a block record for each editable default
		for (var j = 1; j <= tempEditableRec.web_editable_to_editable_default.getSize(); j++ ) {
			var tempEditableDefaultRec = tempEditableRec.web_editable_to_editable_default.getRecord(j)
			
			var blockRec = areaRec.web_area_to_block.getRecord(areaRec.web_area_to_block.newRecord(false, true))
			
			blockRec.id_block_display = tempEditableDefaultRec.id_block_display
			blockRec.id_block_type = tempEditableDefaultRec.id_block_type
			blockRec.params = tempEditableDefaultRec.params
			blockRec.row_order = j
			databaseManager.saveData()
			
			//create a block_data record for each editable_default
			for (var k = 1; k <= tempEditableDefaultRec.web_editable_default_to_block_input.getSize(); k++) {
				var tempEditableDefaultDetailRec = tempEditableDefaultRec.web_editable_default_to_block_input.getRecord(k)
				
				var blockDataRec = blockRec.web_block_to_block_data.getRecord(blockRec.web_block_to_block_data.newRecord(false,true))
				
				blockDataRec.data_key = tempEditableDefaultDetailRec.column_name				
			}			
		}
	}
	
	// finish up
	foundset.loadRecords(fsArea)
	foundset.sort( "row_order asc" )
	foundset.setSelectedIndex(1)
	
	databaseManager.saveData()

}

/**
 *
 * @properties={typeid:24,uuid:"35FDA09F-74E0-45AF-9BC1-C682E4F0F549"}
 */
function AREA_add_missing() {
	//MEMO: does not take into account groups...will break when more than one
	
	//this page
	var pageRec = forms.WEB_0F_page.foundset.getRecord(forms.WEB_0F_page.foundset.getSelectedIndex())
	
	//existing areas
	var thisAreas = new Array()
	for (var i = 1; i <= foundset.getSize(); i++) {
		thisAreas.push(foundset.getRecord(i))
	}
	
	// ERROR CHECK: THEME SELECTED FOR PAGE
	if ( !pageRec.id_theme ) {
		plugins.dialogs.showErrorDialog(
						"Error",
						"No theme selected for this page"
					)
		return
	}
	
	// get editable regions based on layout selected
	if (pageRec.id_theme_layout) {
		if (utils.hasRecords(pageRec.web_page_to_layout)) {
			if (utils.hasRecords(pageRec.web_page_to_layout.web_layout_to_editable)) {
				
			}
			else {
				var hitme = true
			}
		}
		else {
			var hitme = true
		}
		
	}
	else {
		var hitme = true
	}
	
	if (hitme) {
		plugins.dialogs.showErrorDialog( 
					"Error",
					"No editable regions set up in layout selected."
				)
		return 'No editables for selected layout'
	}
	
	var fsRegions = pageRec.web_page_to_layout.web_layout_to_editable
	
	// create a page area record for each non-existing editable
	var order = 1
	outer:
	for (var i = 1; i <= fsRegions.getSize(); i++) {
		
		var tempEditableRec = fsRegions.getRecord(i)
				
		//check to make sure doesn't exist yet
		for (var j = 0; j < thisAreas.length; j++) {
			//already exists, reset order, continue loop
			if (thisAreas[j].area_name == tempEditableRec.editable_name) {
				thisAreas[j].row_order = order ++
				continue outer
			}
		}
		
		var areaRec = foundset.getRecord(foundset.newRecord(false, true))
		
		areaRec.area_name = tempEditableRec.editable_name
		areaRec.id_editable = tempEditableRec.id_editable
		areaRec.row_order = order ++ 
		areaRec.id_group = globals.WEB_group_selected
		
		databaseManager.saveData()
		
		//create a block record for each editable default
		for (var k = 1; k <= tempEditableRec.web_editable_to_editable_default.getSize(); k++ ) {
			var tempEditableDefaultRec = tempEditableRec.web_editable_to_editable_default.getRecord(k)
			
			var blockRec = areaRec.web_area_to_block.getRecord(areaRec.web_area_to_block.newRecord(false, true))
			
			blockRec.id_block_display = tempEditableDefaultRec.id_block_display
			blockRec.id_block_type = tempEditableDefaultRec.id_block_type
			blockRec.params = tempEditableDefaultRec.params
			blockRec.row_order = k
			databaseManager.saveData()
			
			
			//create a block_data record for each editable_default
			for (var m = 1; m <= tempEditableDefaultRec.web_editable_default_to_block_input.getSize(); m++) {
				var tempEditableDefaultDetailRec = tempEditableDefaultRec.web_editable_default_to_block_input.getRecord(m)
				
				var blockDataRec = blockRec.web_block_to_block_data.getRecord(blockRec.web_block_to_block_data.newRecord(false,true))
				
				blockDataRec.data_key = tempEditableDefaultDetailRec.column_name				
			}
		}
	}

	// finish up
	foundset.sort( "row_order asc" )
	foundset.setSelectedIndex(1)
	
	databaseManager.saveData()

}

/**
 * @properties={typeid:24,uuid:"499F5682-D55C-4135-855C-EABBC4F57F95"}
 */
function AREA_reorder(pageRec) {
	//MEMO: does not take into account groups...will break when more than one
	
	//this page not specified
	if (!pageRec) {
		pageRec = forms.WEB_0F_page.foundset.getSelectedRecord()
	}
	
	//existing areas
	var thisAreas = new Array()
	for (var i = 1; i <= foundset.getSize(); i++) {
		thisAreas.push(foundset.getRecord(i))
	}
	
	// ERROR CHECK: THEME SELECTED FOR PAGE
	if ( !pageRec.id_theme ) {
		plugins.dialogs.showErrorDialog(
						"Error",
						"No theme selected for this page"
					)
		return
	}
	
	// get editable regions based on layout selected
	if (pageRec.id_theme_layout) {
		if (utils.hasRecords(pageRec.web_page_to_layout)) {
			if (utils.hasRecords(pageRec.web_page_to_layout.web_layout_to_editable)) {
				
			}
			else {
				var hitme = true
			}
		}
		else {
			var hitme = true
		}
		
	}
	else {
		var hitme = true
	}
	
	if (hitme) {
		plugins.dialogs.showErrorDialog( 
					"Error",
					"No editable regions set up in layout selected."
				)
		return 'No editables for selected layout'
	}
	
	var fsRegions = pageRec.web_page_to_layout.web_layout_to_editable
	
	// loop over existing areas and reset to default order
	outer:
	for (var i = 1; i <= fsRegions.getSize(); i++) {
		
		var tempEditableRec = fsRegions.getRecord(i)
		
		for (var j = 0; j < thisAreas.length; j++) {
			//already exists, reset order, continue loop
			if (thisAreas[j].area_name == tempEditableRec.editable_name) {
				thisAreas[j].row_order = tempEditableRec.row_order
				continue outer
			}
		}
		
	}

	// finish up
	foundset.sort( "row_order asc" )
	foundset.setSelectedIndex(1)
	
	databaseManager.saveData()

}

/**
 *
 * @properties={typeid:24,uuid:"6C25A66F-39B1-4A07-BD1F-4FDA17C1BC38"}
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
 * @properties={typeid:24,uuid:"94DEC19A-2112-4D84-A46E-2A65A5694330"}
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
 * @properties={typeid:24,uuid:"DDD4DB94-AB93-45C1-A05E-086D87FF69BF"}
 */
function FORM_onLoad()
{
	foundset.sort('row_order asc')
}

/**
 *
 * @properties={typeid:24,uuid:"A9284E95-6251-4B35-AC1D-A10CC73409B3"}
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
					'Do you really want to delete this record and all associated blocks?',
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
 * @properties={typeid:24,uuid:"735FD557-C0C7-419E-95D5-7A6B5110B99D"}
 */
function REC_selected()
{
	if (utils.hasRecords(foundset)) {
		// populate area id global to display blocks by area
		globals.WEB_page_id_area_selected = id_area
	}
	else {
		globals.WEB_page_id_area_selected = 0
		forms.WEB_0F_page__design__content_1L_block.REC_selected()
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"C2F76B63-7C7E-4000-8E6A-12A71FEB7885"}
 */
function ACTIONS_list(event) {

var input = arguments[0]

//menu items
var valuelist = new Array(
				'Set to theme defaults',
				'Re-order areas',
				'-',
				'Change page layout'
			)

//called to depress menu
if (typeof input != 'number') {
	//set up menu with arguments
	var menu = new Array()
	
	for ( var i = 0 ; i < valuelist.length ; i++ ) {
		menu[i] = plugins.popupmenu.createMenuItem(valuelist[i],ACTIONS_list)
		
		menu[i].setMethodArguments(i)
		
		if (menu[i].text == '----') {
			menu[i].setEnabled(false)
		}
	}
	
	//popup
	var elem = elements[application.getMethodTriggerElementName()]
	if (elem != null) {
		plugins.popupmenu.showPopupMenu(elem, menu)
	}
}
//menu shown and item chosen
else {
	switch( input ) {
		case 0:	//set to theme defaults (delete all areas/blocks)
			AREA_reset()
			
			break
			
		case 1:	//re-order areas
			AREA_reorder()
			
			break
			
		case 3:	//assign new layout
			AREA_new()
			
			break
		

	}
}

}

/**
 * @properties={typeid:24,uuid:"340A4C68-CFF4-4CF1-A790-750511C79F9E"}
 */
function AREA_reset() {
	var delRec = plugins.dialogs.showWarningDialog(
					'Page reset',
					'This will reset the page to the defaults specified for the selected theme.\nWarning: This will delete all your data.  Proceed?',
					'Yes',
					'No'
				)

	if (delRec == 'Yes') {
		controller.deleteAllRecords()
		
		var pageRec = forms.WEB_0F_page.foundset.getSelectedRecord()
		
		// get editable regions based on layout selected
		if (!utils.hasRecords(pageRec.web_page_to_layout.web_layout_to_editable)) {
			plugins.dialogs.showErrorDialog( 
						"Error",
						"No editable regions set up in layout selected."
					)
			return 'No editables for selected layout'
		}
		
		var fsRegions = pageRec.web_page_to_layout.web_layout_to_editable
		
		var fsArea = databaseManager.getFoundSet('sutra_cms','web_area')
		fsArea.find()
		fsArea.id_group = globals.WEB_group_selected
		fsArea.id_version = globals.WEB_version_selected
		var results = fsArea.search()
		
		
		// delete current area records
		if (utils.hasRecords(fsArea)) {
			fsArea.deleteAllRecords()
		}
		
		// create a page area record for each editable
		var order = 1
		for (var i = 1; i <= fsRegions.getSize(); i++) {
			var tempEditableRec = fsRegions.getRecord(i)
			
			var areaRec = fsArea.getRecord(fsArea.newRecord(false, true))
			
			areaRec.area_name = tempEditableRec.editable_name
			areaRec.id_editable = tempEditableRec.id_editable
			areaRec.row_order = order ++ 
			areaRec.id_group = globals.WEB_group_selected
			
			databaseManager.saveData()
			
			//create a block record for each editable default
			for (var j = 1; j <= tempEditableRec.web_editable_to_editable_default.getSize(); j++ ) {
				var tempEditableDefaultRec = tempEditableRec.web_editable_to_editable_default.getRecord(j)
				
				var blockRec = areaRec.web_area_to_block.getRecord(areaRec.web_area_to_block.newRecord(false, true))
				
				blockRec.id_block_display = tempEditableDefaultRec.id_block_display
				blockRec.id_block_type = tempEditableDefaultRec.id_block_type
				blockRec.params = tempEditableDefaultRec.params
				blockRec.row_order = j
				databaseManager.saveData()
				
				//create a block_data record for each editable_default
				for (var k = 1; k <= tempEditableDefaultRec.web_editable_default_to_block_input.getSize(); k++) {
					var tempEditableDefaultDetailRec = tempEditableDefaultRec.web_editable_default_to_block_input.getRecord(k)
					
					var blockDataRec = blockRec.web_block_to_block_data.getRecord(blockRec.web_block_to_block_data.newRecord(false,true))
					
					blockDataRec.data_key = tempEditableDefaultDetailRec.column_name				
				}			
			}
		}
		
		// finish up
		foundset.loadRecords(fsArea)
		foundset.sort( "row_order asc" )
		foundset.setSelectedIndex(1)
		
		databaseManager.saveData()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"CC2A75E9-00A1-446E-8D67-4E9C74894569"}
 */
function TOGGLE_elements(editAllow) {
	elements.btn_actions.enabled = editAllow
//	elements.btn_add.enabled = editAllow
	elements.btn_delete.visible = editAllow
//	elements.btn_down.enabled = editAllow
//	elements.btn_up.enabled = editAllow
	
	elements.fld_area.editable = editAllow
//	elements.fld_row_order.editable = editAllow
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"FA11DFD7-3450-4F75-9E96-49892AB2258F"}
 */
function RESIZE_beans(event) {
	var divOne = forms.WEB_0F_page__design__content.elements.bean_split_1
	var divTwo = forms.WEB_0F_page__design__content.elements.bean_split_2
	
	if (divOne.dividerSize || divTwo.dividerSize) {
		divOne.dividerSize = 0
		divTwo.dividerSize = 0
		
		forms.WEB_0F_page__design__content.elements.tab_area.setBorder('MatteBorder,0,0,1,0,#808080')
		forms.WEB_0F_page__design__content.elements.tab_block.setBorder('MatteBorder,0,0,0,0,#808080')
	}
	else {
		divOne.dividerSize = 8
		divTwo.dividerSize = 8
		
		forms.WEB_0F_page__design__content.elements.tab_area.setBorder('MatteBorder,0,1,1,0,#808080')
		forms.WEB_0F_page__design__content.elements.tab_block.setBorder('MatteBorder,1,1,0,0,#808080')		
	}
}
