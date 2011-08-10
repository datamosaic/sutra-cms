/**
 * @properties={typeid:35,uuid:"4FDACEFD-6F16-46F7-827B-375E25024AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"35FDA09F-74E0-45AF-9BC1-C682E4F0F549"}
 */
function AREA_add_missing() {
	//MEMO: does not take into account multiple groups, languages, or platforms
	
	//this page
	var pageRec = forms.WEB_0F_page.foundset.getSelectedRecord()
	
	//existing areas
	var thisAreas = new Array()
	for (var i = 1; i <= foundset.getSize(); i++) {
		thisAreas.push(foundset.getRecord(i))
	}
	
	// ERROR CHECK: THEME SELECTED FOR PAGE
	if ( !forms.WEB_0F_page__design_1F__header_display_2F_platform._platform.id_theme ) {
		plugins.dialogs.showErrorDialog(
						"Error",
						"No theme selected for this page"
					)
		return
	}
	
	// get editable regions based on layout selected
	if (!(forms.WEB_0F_page__design_1F__header_display_2F_platform._platform && utils.hasRecords(forms.WEB_0F_page__design_1F__header_display_2F_platform._platform,'web_platform_to_layout.web_layout_to_editable'))) {
		plugins.dialogs.showErrorDialog( 
					"Error",
					"No editable regions set up in layout selected."
				)
		return 'No editables for selected layout'
	}
	
	var fsRegions = forms.WEB_0F_page__design_1F__header_display_2F_platform._platform.web_platform_to_layout.web_layout_to_editable
	
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
		areaRec.id_version = globals.WEB_page_version
		
		databaseManager.saveData()
		
		//create a block record for each editable default
		for (var k = 1; k <= tempEditableRec.web_editable_to_editable_default.getSize(); k++ ) {
			var tempEditableDefaultRec = tempEditableRec.web_editable_to_editable_default.getRecord(k)
			
			//disale/enable rec on select on the block type forms when creating scope
			globals.WEB_block_on_select = false
			
			//create scope record
			var scopeRec = areaRec.web_area_to_scope.getRecord(areaRec.web_area_to_scope.newRecord(false, true))
			scopeRec.row_order = k
			
			//disale/enable rec on select on the block type forms when creating scope
			globals.WEB_block_on_select = true
			
			//create block record
			var fsBlock = databaseManager.getFoundSet('sutra_cms','web_block')
			var blockRec = fsBlock.getRecord(fsBlock.newRecord(false,true))
			
			scopeRec.id_block = blockRec.id_block
			
			//create first block version record
			var blockVersionRec = blockRec.web_block_to_block_version__all.getRecord(blockRec.web_block_to_block_version__all.newRecord(false,true))
			blockVersionRec.flag_active = 1
			blockVersionRec.version_number = 1
			blockVersionRec.id_block_type = tempEditableDefaultRec.id_block_type
			blockVersionRec.id_block_display = tempEditableDefaultRec.id_block_display
			
			// INPUT
			// create a block_data record for each block_input
			if ( utils.hasRecords(tempEditableDefaultRec.web_editable_default_to_block_input) ) {
				for (var k = 1; k <= tempEditableDefaultRec.web_editable_default_to_block_input.getSize(); k++) {
					var tempEditableDefaultDetailRec = tempEditableDefaultRec.web_editable_default_to_block_input.getRecord(k)

					var blockDataRec = blockVersionRec.web_block_version_to_block_data.getRecord(blockVersionRec.web_block_version_to_block_data.newRecord(false,true))
					blockDataRec.data_key = tempEditableDefaultDetailRec.column_name
				}
			}
			
			// CONFIG
			// create a block data configure record for each data point
			if ( utils.hasRecords(tempEditableDefaultRec.web_editable_default_to_block_configure) ) {
				for (var k = 1; k <= tempEditableDefaultRec.web_editable_default_to_block_configure.getSize(); k++) {
					var configTemplate = tempEditableDefaultRec.web_editable_default_to_block_configure.getRecord(k)
					
					var configRec = blockVersionRec.web_block_version_to_block_data_configure.getRecord(blockVersionRec.web_block_version_to_block_data_configure.newRecord(false, true))
					configRec.data_key = configTemplate.columnName
				}
			}
		}
	}

	// finish up
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
function FORM_on_load()
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
		REC_on_select()
	}
}
	
	
	
}

/**
 *
 * @properties={typeid:24,uuid:"735FD557-C0C7-419E-95D5-7A6B5110B99D"}
 */
function REC_on_select() {
	
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
		if (!(forms.WEB_0F_page__design_1F__header_display_2F_platform._platform && utils.hasRecords(forms.WEB_0F_page__design_1F__header_display_2F_platform._platform,'web_platform_to_layout.web_layout_to_editable'))) {
			plugins.dialogs.showErrorDialog( 
						"Error",
						"No editable regions set up in layout selected."
					)
			return 'No editables for selected layout'
		}
		
		var fsRegions = forms.WEB_0F_page__design_1F__header_display_2F_platform._platform.web_platform_to_layout.web_layout_to_editable
		
		var fsArea = databaseManager.getFoundSet('sutra_cms','web_area')
		
		// create a page area record for each editable
		var order = 1
		for (var i = 1; i <= fsRegions.getSize(); i++) {
			var tempEditableRec = fsRegions.getRecord(i)
			
			var areaRec = fsArea.getRecord(fsArea.newRecord(false, true))
			
			areaRec.area_name = tempEditableRec.editable_name
			areaRec.id_editable = tempEditableRec.id_editable
			areaRec.row_order = order ++ 
			areaRec.id_version = globals.WEB_page_version
			
			databaseManager.saveData()
			
			//create a block record for each editable default
			for (var j = 1; j <= tempEditableRec.web_editable_to_editable_default.getSize(); j++ ) {
				var tempEditableDefaultRec = tempEditableRec.web_editable_to_editable_default.getRecord(j)
				
				//disale/enable rec on select on the block type forms when creating scope
				globals.WEB_block_on_select = false
				
				//create scope record
				var scopeRec = areaRec.web_area_to_scope.getRecord(areaRec.web_area_to_scope.newRecord(false, true))
				scopeRec.row_order = j
				
				//disale/enable rec on select on the block type forms when creating scope
				globals.WEB_block_on_select = true
				
				//create block record
				var fsBlock = databaseManager.getFoundSet('sutra_cms','web_block')
				var blockRec = fsBlock.getRecord(fsBlock.newRecord(false,true))
				
				scopeRec.id_block = blockRec.id_block
				
				//create first block version record
				var blockVersionRec = blockRec.web_block_to_block_version__all.getRecord(blockRec.web_block_to_block_version__all.newRecord(false,true))
				blockVersionRec.flag_active = 1
				blockVersionRec.version_number = 1
				blockVersionRec.id_block_type = tempEditableDefaultRec.id_block_type
				blockVersionRec.id_block_display = tempEditableDefaultRec.id_block_display
				
				// INPUT
				// create a block_data record for each block_input
				if ( utils.hasRecords(tempEditableDefaultRec.web_editable_default_to_block_input) ) {
					for (var k = 1; k <= tempEditableDefaultRec.web_editable_default_to_block_input.getSize(); k++) {
						var tempEditableDefaultDetailRec = tempEditableDefaultRec.web_editable_default_to_block_input.getRecord(k)

						var blockDataRec = blockVersionRec.web_block_version_to_block_data.getRecord(blockVersionRec.web_block_version_to_block_data.newRecord(false,true))
						blockDataRec.data_key = tempEditableDefaultDetailRec.column_name
					}
				}
				
				// CONFIG
				// create a block data configure record for each data point
				if ( utils.hasRecords(tempEditableDefaultRec.web_editable_default_to_block_configure) ) {
					for (var k = 1; k <= tempEditableDefaultRec.web_editable_default_to_block_configure.getSize(); k++) {
						var configTemplate = tempEditableDefaultRec.web_editable_default_to_block_configure.getRecord(k)
						
						var configRec = blockVersionRec.web_block_version_to_block_data_configure.getRecord(blockVersionRec.web_block_version_to_block_data_configure.newRecord(false, true))
						configRec.data_key = configTemplate.columnName
					}
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
//	elements.btn_actions.enabled = editAllow
//	elements.btn_add.enabled = editAllow
//	elements.btn_delete.visible = editAllow
//	elements.btn_down.enabled = editAllow
//	elements.btn_up.enabled = editAllow
	
//	elements.fld_area.editable = editAllow
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
	var divOne = forms.WEB_0F_page__design_1F_version.elements.bean_split_1
	var divTwo = forms.WEB_0F_page__design_1F_version.elements.bean_split_2
	
	//turn off
	if (divOne.dividerSize || divTwo.dividerSize) {
		divOne.dividerSize = 0
		divTwo.dividerSize = 0
		
		//set lefthand border to size
		forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.lbl_lefthand.setSize(
			forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.lbl_lefthand.getWidth(),
			forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.lbl_lefthand.getHeight() - 5
		)
		//set lefthand border to size on raw
		forms.WEB_0F_page__design_1F_version_2F_block__data.elements.lbl_lefthand.setSize(
			forms.WEB_0F_page__design_1F_version_2F_block__data.elements.lbl_lefthand.getWidth(),
			forms.WEB_0F_page__design_1F_version_2F_block__data.elements.lbl_lefthand.getHeight() - 5
		)
		
		forms.WEB_0F_page__design_1F_version.elements.tab_area.setBorder('MatteBorder,0,0,1,0,#808080')
		forms.WEB_0F_page__design_1F_version.elements.tab_block.setBorder('MatteBorder,0,0,0,0,#808080')
	}
	//turn on
	else {
		divOne.dividerSize = 8
		divTwo.dividerSize = 8
		
		//set lefthand border to size
		forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.lbl_lefthand.setSize(
			forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.lbl_lefthand.getWidth(),
			forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.lbl_lefthand.getHeight() + 5
		)
		//set lefthand border to size on raw
		forms.WEB_0F_page__design_1F_version_2F_block__data.elements.lbl_lefthand.setSize(
			forms.WEB_0F_page__design_1F_version_2F_block__data.elements.lbl_lefthand.getWidth(),
			forms.WEB_0F_page__design_1F_version_2F_block__data.elements.lbl_lefthand.getHeight() + 5
		)
		
		forms.WEB_0F_page__design_1F_version.elements.tab_area.setBorder('MatteBorder,0,1,1,0,#808080')
		forms.WEB_0F_page__design_1F_version.elements.tab_block.setBorder('MatteBorder,1,1,0,0,#808080')		
	}
}
