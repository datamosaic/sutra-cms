/**
 * @properties={typeid:35,uuid:"4FDACEFD-6F16-46F7-827B-375E23824AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

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
		case 0:  // set flag for type of scrapbook
//			
//			var input = plugins.dialogs.showInputDialog(
//					'Enter name',
//					'What is the name for this scrapbook entry?'
//			)
//			
//			if (input) {
//				// block to scrapbook
//				var source 		= foundset.getRecord(foundset.getSelectedIndex())
//				var destination	= forms.WEB_0F_scrapbook.foundset.getRecord(forms.WEB_0F_scrapbook.foundset.newRecord(true,true))
//				var success		= databaseManager.copyMatchingColumns(source,destination)
//				destination.scrapbook_name = input
//				destination.id_site = forms.WEB_0F_site.id_site
//				databaseManager.saveData()
//				
//				// block_data to scrapbook data
//				var fsSource		= source.web_block_version_to_block_data
//				
//				for (var i = 0; i < fsSource.getSize(); i++) {
//					var record		= fsSource.getRecord(i + 1)
//					var destination	= forms.WEB_0F_scrapbook.web_scrapbook_to_scrapbook_data.getRecord(forms.WEB_0F_scrapbook.web_scrapbook_to_scrapbook_data.newRecord(true,true))
//					databaseManager.copyMatchingColumns(record,destination)
//				}
//				databaseManager.saveData()
//				
//				// block_data_configure to scrapbook_configure
//				var fsSource		= source.web_block_version_to_block_data_configure
//				
//				for (var i = 0; i < fsSource.getSize(); i++) {
//					var record		= fsSource.getRecord(i + 1)
//					var destination	= forms.WEB_0F_scrapbook.web_scrapbook_to_scrapbook_configure.getRecord(forms.WEB_0F_scrapbook.web_scrapbook_to_scrapbook_configure.newRecord(true,true))
//					databaseManager.copyMatchingColumns(record,destination)
//				}
//				databaseManager.saveData()
//				
//				// block_data_response to scrapbook_response
//				var fsSource		= source.web_block_version_to_block_data_response
//				
//				for (var i = 0; i < fsSource.getSize(); i++) {
//					var record		= fsSource.getRecord(i + 1)
//					var destination	= forms.WEB_0F_scrapbook.web_scrapbook_to_scrapbook_response.getRecord(forms.WEB_0F_scrapbook.web_scrapbook_to_scrapbook_response.newRecord(true,true))
//					databaseManager.copyMatchingColumns(record,destination)
//				}
//				databaseManager.saveData()
//				
//			}
//			else {
//				plugins.dialogs.showErrorDialog(
//							'Error',
//							'No name entered for scrapbook'
//					)
//			}
			break;
		default:
			break;
	}

}

/**
 *
 * @properties={typeid:24,uuid:"32ED93D4-CD10-47EF-B396-71C65FC962E7"}
 */
function BLOCK_new(input) {
	//method called not from a click on plus button; from web edit mode
	if (!(input instanceof JSEvent)) {
		function convertUUID(item) {
			return item.substr(0,8) + '-' + item.substr(8,4) + '-' + item.substr(12,4) + '-' + item.substr(16,4)  + '-' + item.substr(20,12)
		}
		
		var webEdit = true
		var areaID = convertUUID(input)
	}
	
	// get blocks
	var dataset = databaseManager.getDataSetByQuery(
				controller.getServerName(),
				"SELECT id_block_type, block_name FROM web_block_type WHERE id_site = ? ORDER BY block_name ASC",
				[forms.WEB_0F_site.id_site.toString()], 
				-1
			)
	
	// ERROR CHECK: NO BLOCKS INSTALLED
	if ( !dataset ) {
		plugins.dialogs.showErrorDialog(
					'Error',
					'There are no blocks installed for this site.'
			)
		return
	}
	
	// setup associative array
	var IDs = dataset.getColumnAsArray(1)
	var values = dataset.getColumnAsArray(2)
	var valueListObj = {}
	for (var i = 0; i < IDs.length; i++) {
		valueListObj[values[i]] = IDs[i]
	}
	
	// add scrapbook options
		//scrapbook temporarily disabled on add block
//	if (!webEdit) {
//		values.push("---", "Scrapbook copy...", "Scrapbook connect...")
//	}
	
	// choose block type
	var selection = plugins.dialogs.showSelectDialog(
							"Select",
							"Choose block type", 
							values
						)
	
	// ERROR CHECK: NO SELECTED
	if ( !selection ) {
		return false
	}
	
	if (! utils.stringPatternCount(selection,"Scrapbook")) {
	
		// get block display
		var dataset = databaseManager.getDataSetByQuery(
							controller.getServerName(),
							"select display_name, method_name, " +
								"(select id_block_display from web_block_display where id_block_type = ? and flag_default = 1) as display " +
							"from web_block_display where id_block_type = ?",
							new Array(valueListObj[selection],valueListObj[selection]), 
							-1
						)
		
		var display = dataset.getValue(1,3)
		
		// create block record
		if (utils.hasRecords(forms.WEB_0F_page__design__content_1L_area.foundset)) {
			//turn off rec on select
			_skipSelect = true
			
			//disale/enable rec on select on the block type forms when creating scope
			globals.WEB_block_on_select = false
			
			//create scope record //TODO: needs to work from real mode also
			if (webEdit) {
				var fsScope = databaseManager.getFoundSet('sutra_cms','web_scope')
				var scopeRec = fsScope.getRecord(fsScope.newRecord(false,true))
				
				fsScope.find()
				fsScope.id_area = areaID
				fsScope.search()
				
				scopeRec.id_area = areaID
				scopeRec.row_order = fsScope.getSize() + 1
				databaseManager.saveData(scopeRec)
			}
			else {
				var scopeRec = foundset.getRecord(foundset.newRecord(false,true))
				scopeRec.row_order = foundset.getSize()
				databaseManager.saveData(scopeRec)
			}
			
			//disale/enable rec on select on the block type forms when creating scope
			globals.WEB_block_on_select = true
			
			var fsBlock = databaseManager.getFoundSet('sutra_cms','web_block')
			var blockRec = fsBlock.getRecord(fsBlock.newRecord(false,true))
			
			//create block record
			var fsBlock = databaseManager.getFoundSet('sutra_cms','web_block')
			var blockRec = fsBlock.getRecord(fsBlock.newRecord(false,true))
			
			scopeRec.id_block = blockRec.id_block
			
			//create first block version record
			var blockVersionRec = blockRec.web_block_to_block_version__all.getRecord(blockRec.web_block_to_block_version__all.newRecord(false,true))
			blockVersionRec.flag_active = 1
			blockVersionRec.version_number = 1
			blockVersionRec.id_block_type = valueListObj[selection]
			blockVersionRec.id_block_display = ( display ) ? display : null
			databaseManager.saveData(blockVersionRec)
			
			// get block data points
			var dataset = databaseManager.getDataSetByQuery(
								controller.getServerName(),
								"select column_name, column_type, " +
									"(select id_block_display from web_block_display where id_block_type = ? and flag_default = 1) as display " +
								"from web_block_input where id_block_type = ?",
								new Array(valueListObj[selection],valueListObj[selection]), 
								-1
							)
			
			var dataNames = dataset.getColumnAsArray(1)
			
			// create a block data record for each data point
			for (var i = 0; i < dataNames.length; i++) {
				var record = blockVersionRec.web_block_version_to_block_data.getRecord(blockVersionRec.web_block_version_to_block_data.newRecord(false, true))
				record.data_key = dataNames[i]
				
				databaseManager.saveData(record)
			}
			
			// create a block data configure record for each data point
			if (utils.hasRecords(blockRec,'web_block_to_block_type.web_block_type_to_block_configure')) {
				for (var i = 1; i <= blockRec.web_block_to_block_type.web_block_type_to_block_configure.getSize(); i++) {
					var configTemplate = blockVersionRec.web_block_to_block_type.web_block_type_to_block_configure.getRecord(i)
					var configRec = blockVersionRec.web_block_version_to_block_data_configure.getRecord(blockVersionRec.web_block_version_to_block_data_configure.newRecord(false, true))
					configRec.data_key = configTemplate.column_name
					
					databaseManager.saveData(configRec)
				}
			}
			
			// finish up
			blockVersionRec.web_block_version_to_block_data.setSelectedIndex(1)
			blockVersionRec.web_block_version_to_block_data_configure.setSelectedIndex(1)
			
			//turn on rec on select
			_skipSelect = false
			
			databaseManager.saveData()
			
			// set global with first blockID of this set
			if (webEdit) {
				globals.WEB_selected_block = blockRec.id_block.toString()
			}
			// update screen in non-web edit
			else {
				forms.WEB_0F_page__design__content_1L_block.REC_on_select()
			}
			
		}
	}
	else {
		forms.WEB_0F_scrapbook_1P__choose._source = "Page"
		if (selection == "Scrapbook copy...") {
			forms.WEB_0F_scrapbook_1P__choose._typeScrapbook = 0
		}
		else if (selection == "Scrapbook connect...") {
			forms.WEB_0F_scrapbook_1P__choose._typeScrapbook = 1
		}
		
		application.showFormInDialog(
				forms.WEB_0F_scrapbook_1P__choose,
				-1,-1,-1,-1,
				"Scrapbook", 
				false, 
				false, 
				"chooseScrapbook"
			)

	}
	
	return blockRec
}

/**
 *
 * @properties={typeid:24,uuid:"08244641-DE34-4206-8FD6-CD1C1332B408"}
 */
function DIR_down() {
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

	 foundset.sort('row_order asc')

	 //TODO: find issue
	 if (recOne) {
		 controller.setSelectedIndex(2)
	 }
}

/**
 *
 * @properties={typeid:24,uuid:"54708E3B-2B4E-4871-B2B6-D36A7FFFB9DC"}
 */
function DIR_up() {
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
function FORM_on_load()
{
	elements.fld_id_block_display__field.visible = false
	elements.fld_id_block_display__combo.visible = true
}

/**
 *
 * @properties={typeid:24,uuid:"7E59BE92-3022-4690-94E5-0AC5FD663ABA"}
 */
function REC_delete() {
	
	var delRec = plugins.dialogs.showWarningDialog(
						'Delete record',
						'Do you really want to delete this record?',
						'Yes',
						'No'
					)
	
	if (delRec == 'Yes') {
		
		var recSelect = controller.getSelectedIndex()
		
		//disale/enable rec on select on the block type forms when deleting
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
 * @properties={typeid:35,uuid:"FF646EF2-49F9-4BB9-B941-28E24ADB67D2",variableType:-4}
 */
var _skipSelect = false;

/**
 * @properties={typeid:24,uuid:"BFBF2B28-E3BA-4CF7-807D-DADFF29D20F3"}
 */
function REC_on_select(event,fireSelect) {
	//we're not intentially skipping this method, run it
	if (!_skipSelect) {
		
		//give the triple-level relation forms a little extra help
		if (utils.hasRecords(foundset)) {
			if (globals.WEB_page_mode == 1) {
				forms.WEB_0F_page__design__content_1F_block_data__raw.foundset.loadRecords(web_scope_to_block)
			}
			else if (globals.WEB_page_mode == 2) {
				forms.WEB_0F_page__design__content_1F_block_data.foundset.loadRecords(web_scope_to_block)
			}
		}
		else {
//			if (globals.WEB_page_mode == 1) {
//				forms.WEB_0F_page__design__content_1F_block_data__raw.foundset.clear()
//			}
//			else if (globals.WEB_page_mode == 2) {
//				forms.WEB_0F_page__design__content_1F_block_data.foundset.clear()
//			}
		}
		
		if (utils.hasRecords(web_scope_to_block)) {
			//normal non-linked items
			if (!web_scope_to_block.scope_type) {
				// input method names for block type
				var params = [web_scope_to_block.id_block_type]
				var sql =	"select input_name, method_name from web_block_action_client where " +
								"web_block_action_client.id_block_type = ?"
				var dataset = databaseManager.getDataSetByQuery(
								controller.getServerName(), sql, params, -1)
			
				if ( dataset.getMaxRowIndex() ) {
					//there are actions actions available
					buttonStatus(true)
				}
				else {
					//no actions available
					buttonStatus(false)		
				}
			}
			//this is a linked scrapbook
			else {
				//no actions available
				buttonStatus(false)
			}
		}
		else {
			//no actions available
			buttonStatus(false)
		}
		
		//gui view
		if (globals.WEB_page_mode == 2) {
			//switch tabpanel based on type of form
			ACTION_gui_mode_load(fireSelect)
		}
		//data view
		else {
			
		}
	}
	
	function buttonStatus(state) {
		//no actions available
		forms.WEB_0F_page__design__content_1F_block_data__raw.elements.btn_data_actions.visible = state
		forms.WEB_0F_page__design__content_1F_block_data.elements.btn_data_actions.visible = state
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"C6205B0F-FC44-45FA-928F-57AC405CE483"}
 */
function FORM_on_show(firstShow, event) {
	//first time we come in on the page after launching the client we need to fire the selected block an extra time
	if (firstShow && globals.WEB_page_mode == 2) {
		//switch tabpanel based on type of form and hide/show action wheel
		REC_on_select(null,true)
	}
}

/**
 * @properties={typeid:35,uuid:"1C9EB357-1747-4330-B3CF-CF5D5F2F1559",variableType:-4}
 */
var _guiLoading = false;

/**
 * @properties={typeid:24,uuid:"39CC4D1D-2547-4F23-85E9-63C434B95F70"}
 */
function ACTION_gui_mode_load(fireSelect) {
	//only start up this method if not already running
	if (!_guiLoading) {
		//method is beginning
		_guiLoading = true
		
//		if (!this.someVar) {
//			this.someVar = 1
//		}
//		else {
//			this.someVar ++
//		}
//		
//		//log how many times run and how
//		application.output('WEB_0F_page__design__content_1L_block.ACTION_gui_mode_load(' + (utils.hasRecords(foundset) ? web_block_to_block_type.block_name : '') + ') #:' + this.someVar)
		
		var contextForm = 'WEB_0F_page__design__content_1F_block_data'
		var tabPanel = forms[contextForm].elements.tab_detail
		
		if (utils.hasRecords(web_scope_to_block)) {
			var recBlock = web_scope_to_block.getSelectedRecord()
			
			if (recBlock) {
				//is this a scrapbook of any kind?
				var flagScrapbook = recBlock.scope_type ? true : false
				
				if (recBlock && utils.hasRecords(recBlock.web_block_to_block_type)) {
					var recBlockType = recBlock.web_block_to_block_type.getRecord(1)
				}
				
				//editable status (scrapbooks not editable, has versions and selected version is editable)
//				var flagEdit = (!flagScrapbook && forms.WEB_0F_page.ACTION_edit_get()) ? true : false
				//no reason for scrapbooks to be non-editable at this point
				var flagEdit = (forms.WEB_0F_page.ACTION_edit_get()) ? true : false
				
				//this block definition exists
				if (recBlockType) {
					//edits allowed
					if (flagEdit) {
						var formName = recBlockType.form_name
					}
					//no edits
					else {
						var formName = recBlockType.form_name_display || recBlockType.form_name
					}
					
					//set heading for this tab panel
					var scrap = ''
					switch (recBlock.scope_type) {
						case 1:	//page
							scrap = 'CONTENT (page): '
							break
						case 2:	//site
							scrap = 'SCRAPBOOK (site): '
							break
						case 3:	//install
							scrap = 'STACK (install): '
							break
					}
					
					forms[contextForm].elements.lbl_banner.text = scrap + (recBlockType.block_name || 'Unnamed') + ' block'
					
					//the form exists and it isn't in the currently selected tab
					if (formName && forms[formName] && formName != tabPanel.getTabFormNameAt(tabPanel.tabIndex)) {
						var relationName = solutionModel.getForm(formName).dataSource == 'db:/sutra_cms/web_block' ? 'web_scope_to_block' : null
						
						//load tab panel
						tabPanel.addTab(forms[formName],null,null,null,null,null,null,relationName)
						tabPanel.tabIndex = tabPanel.getMaxTabIndex()
					}
					else {
						tabPanel.tabIndex = tabPanel.getMaxTabIndex()
					}
					
					//refire the onSelect method to force the gui to update
						//MEMO: this will fire every time; only need to run it if the REC_on_select didn't fire...could do with timers
					if (fireSelect && solutionModel.getForm(formName).onRecordSelection) {
						forms[formName][solutionModel.getForm(formName).onRecordSelection.getName()](null,true)
					}
				}
				else {
					defaultForms()
				}
			}
			else {
				defaultForms()
			}
		}
		else {
			defaultForms()
		}
		
		//method is done
		_guiLoading = false
	}
	
	function defaultForms() {
		//this should only be the case on the first load of the form or when we're on a blank form already
		if (fireSelect || tabPanel.getTabFormNameAt(tabPanel.tabIndex) == 'WEB_0F_page__design__content_1F_block_data_2F_blank') {
			tabPanel.tabIndex = 1
		}
		//tack on to the end like every other block
		else {
			tabPanel.addTab(forms.WEB_0F_page__design__content_1F_block_data_2F_blank)
			tabPanel.tabIndex = tabPanel.getMaxTabIndex()
		}
		forms[contextForm].elements.lbl_banner.text = "Content"
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
//	elements.fld_params.editable = editAllow	
//	elements.fld_row_order.editable = editAllow
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0152F895-931B-4B2F-8290-A777DB27EF74"}
 */
function FLD_id_block_display(event) {
	elements.fld_id_block_type.requestFocus()
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"52D40AE1-4066-438F-BDF9-AF794DCCE2C6"}
 */
function FLD_flag_active__data_change(oldValue, newValue, event) {
	databaseManager.saveData()
	return true
}
