/**
 * @properties={typeid:35,uuid:"176CC8B4-859B-4633-B39F-0B72FFF9EABE",variableType:-4}
 */
var _newBlocks = null;

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
		//type lists
		var vlDisplay = [
				'Page',
				'Site',
				'Install'
			]
		var vlReal = [1,2,3]
		
		//what level is this block?
		if (utils.hasRecords(web_scope_to_block) && web_scope_to_block.scope_type) {
			vlDisplay = vlDisplay.slice(web_scope_to_block.scope_type)
			vlReal = vlReal.slice(web_scope_to_block.scope_type)
		}
		
		//menu items
		var valuelist = new Array('Duplicate','-','Copy to...','Promote to...')
		
		//set up menu with arguments
		var subMenu1 = new Array()
		var subMenu2 = new Array()
		for ( var i = 0 ; i < vlDisplay.length ; i++ ) {
			subMenu1[i] = plugins.popupmenu.createMenuItem(vlDisplay[i],BLOCK_action_list_control)
			subMenu2[i] = plugins.popupmenu.createMenuItem(vlDisplay[i],BLOCK_action_list_control)
			
			subMenu1[i].setMethodArguments(vlReal[i],true)
			subMenu2[i].setMethodArguments(vlReal[i],null,true)
		}
		
		var mainMenu = new Array()
		mainMenu[0] = plugins.popupmenu.createMenuItem(valuelist[0],BLOCK_action_list_control)
		mainMenu[0].setMethodArguments(null,null,null,true)
		mainMenu[1] = plugins.popupmenu.createMenuItem(valuelist[1],BLOCK_action_list_control)
		mainMenu[2] = plugins.popupmenu.createMenuItem(valuelist[2],subMenu1)
		mainMenu[3] = plugins.popupmenu.createMenuItem(valuelist[3],subMenu2)
		
		//popup
		var elem = elements[application.getMethodTriggerElementName()]
		if (elem != null && vlDisplay.length) {
			plugins.popupmenu.showPopupMenu(elem, mainMenu)
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
function BLOCK_action_list_control(scope,copy,promote,dupe) {
	var blockRec = web_scope_to_block.getSelectedRecord()
	
	//duplicate selected block
	if (dupe) {
		//create new block record
		var fsBlock = databaseManager.getFoundSet('sutra_cms','web_block')
		var destBlock = fsBlock.getRecord(fsBlock.newRecord(false,true))
		
		//get source block version
		var srcBlockVer = blockRec.web_block_to_block_version.getRecord(1)
		
		//create destination block version record
		var destBlockVer = globals.CODE_record_duplicate(srcBlockVer,[
											"web_block_version_to_block_data",
											"web_block_version_to_block_data_configure"
										])
		
		//set datapoints on new block version
		destBlockVer.id_block = destBlock.id_block
		destBlockVer.flag_active = 1
		destBlockVer.version_number = 1
		destBlockVer.version_name = 'Initial version'
		destBlockVer.version_description = 'Duplicated from: ' + 
			'"' + blockRec.block_name + '", version ' + blockRec.web_block_to_block_version.version_number + '\n' +
			'ID: ' + blockRec.id_block.toString()
		
		//assign scope to the newly copied record
		destBlock.scope_type = blockRec.scope_type
		destBlock.block_name = blockRec.block_name
		
		//punch in the current block type and display so will show up on site scrapbook
		destBlock.id_block_type = blockRec.id_block_type
		destBlock.id_block_display = blockRec.id_block_display
		
	//create new scope record and hook together
		//turn off rec on select
		_skipSelect = true
		
		//disale/enable rec on select on the block type forms when creating scope
		globals.WEB_block_on_select = false
		
		var scopeRec = foundset.getRecord(foundset.newRecord(false,true))
		
		scopeRec.row_order = foundset.getSize()
		databaseManager.saveData(scopeRec)
		
		//disale/enable rec on select on the block type forms when creating scope
		globals.WEB_block_on_select = true
		
		scopeRec.id_block = destBlock.id_block
	}
	//copy or promote
	else if (scope) {
		var input = plugins.dialogs.showInputDialog(
						'Name',
						'Please (re)name the block you are working with',
						blockRec.block_name
				)
		
		//make a copy of this block
		if (copy) {
			//create new block record
			var fsBlock = databaseManager.getFoundSet('sutra_cms','web_block')
			var destBlock = fsBlock.getRecord(fsBlock.newRecord(false,true))
			
			//get source block version
			var srcBlockVer = blockRec.web_block_to_block_version.getRecord(1)
			
			//create destination block version record
			var destBlockVer = globals.CODE_record_duplicate(srcBlockVer,[
												"web_block_version_to_block_data",
												"web_block_version_to_block_data_configure"
											])
			
			//set datapoints on new block version
			destBlockVer.id_block = destBlock.id_block
			destBlockVer.flag_active = 1
			destBlockVer.version_number = 1
			destBlockVer.version_name = 'Initial version'
			destBlockVer.version_description = 'Copied: ' + application.getValueListDisplayValue('WEB_scope_type',blockRec.scope_type) + ' content\n' +
				'"' + blockRec.block_name + '", version ' + blockRec.web_block_to_block_version.version_number + '\n' +
				'ID: ' + blockRec.id_block.toString()
			
			//assign scope to the newly copied record
			destBlock.scope_type = scope
			destBlock.block_name = input
			
			//punch in the current block type and display so will show up on site scrapbook
			destBlock.id_block_type = blockRec.id_block_type
			destBlock.id_block_display = blockRec.id_block_display
			
			if (scope == 1) {
				destBlock.id_page = forms.WEB_0F_page.id_page
			}
			else if (scope == 2) {
				destBlock.id_site = forms.WEB_0F_page.id_site
			}
		}
		//assign this a little bit higher
		else if (promote) {
			blockRec.scope_type = scope
			blockRec.block_name = input
			
			if (scope == 1) {
				blockRec.id_page = forms.WEB_0F_page.id_page
			}
			else if (scope == 2) {
				blockRec.id_site = forms.WEB_0F_page.id_site
			}
			else if (scope == 3) {
				blockRec.id_page = null
				blockRec.id_site = null
			}
		}
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
		
		//notify which area we're adding to when in real mode
		forms.WEB_P__block__new._calledFrom = 'Real'
		forms.WEB_P__block__new._areaID = convertUUID(input)
	}
	else {
		forms.WEB_P__block__new._calledFrom = 'GUI'
	}
	
	//show FiD for adding a new block
	application.showFormInDialog(
				forms.WEB_P__block__new,
				-1,-1,-1,-1,
				' ',
				true,
				false,
				'cmsBlockNew'
			)
	
	//created a new record
	if (forms.WEB_P__block__new._success) {
		// refire when in gui mode
		if (globals.WEB_page_mode == 2) {
			//store this scope record into temp variable to delete if canceled
			if (!_newBlocks instanceof Array) {
				_newBlocks = new Array()
			}
			_newBlocks.push(foundset.getSelectedRecord())
			
			//update display
			forms.WEB_0F_page__design__content_1L_block.REC_on_select(null,true)
		}
		// or real mode
		else if (globals.WEB_page_mode == 3) {
			//_success holds the actual block record created
			return forms.WEB_P__block__new._success
		}
	}
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
		//get record to delete
		var recDelete = foundset.getSelectedRecord()
		
		for (var i = 1; i <= foundset.getSize(); i++) {
			var record = foundset.getRecord(i)
			
			if (record.row_order > recDelete.row_order) {
				record.row_order--
			}
		}
		
		//TODO: disable/enable rec on select on the block type forms when deleting?
		foundset.deleteRecord(recDelete)
		
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
		
		if (utils.hasRecords(web_scope_to_block)) {
//			//normal non-linked items
//			if (!web_scope_to_block.scope_type) {
				//there are actions actions available	//TODO: are there any "block" actions?
				if (utils.hasRecords(foundset.getSelectedRecord(),'web_scope_to_block.web_block_to_block_type.web_block_type_to_block_action_client')) {
					buttonStatus(true)
				}
				//no actions available
				else {
					buttonStatus(false)		
				}
//			}
//			//this is a linked scrapbook
//			else {
//				//no actions available
//				buttonStatus(false)
//			}
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
		var editMode = forms.WEB_0F_page.ACTION_edit_get() && state
		
		//set position of scope label because actions are showing differently
		if (forms.WEB_0F_page__design__content_1F_block_data.elements.btn_data_actions.visible != editMode) {
			
			//move left
			if (editMode) {
				forms.WEB_0F_page__design__content_1F_block_data__raw.elements.lbl_scope.setLocation(forms.WEB_0F_page__design__content_1F_block_data__raw.elements.lbl_scope.getLocationX() - 30,forms.WEB_0F_page__design__content_1F_block_data__raw.elements.lbl_scope.getLocationY())
				forms.WEB_0F_page__design__content_1F_block_data.elements.lbl_scope.setLocation(forms.WEB_0F_page__design__content_1F_block_data.elements.lbl_scope.getLocationX() - 30,forms.WEB_0F_page__design__content_1F_block_data.elements.lbl_scope.getLocationY())
			}
			//flush right
			else {
				forms.WEB_0F_page__design__content_1F_block_data__raw.elements.lbl_scope.setLocation(forms.WEB_0F_page__design__content_1F_block_data__raw.elements.lbl_scope.getLocationX() + 30,forms.WEB_0F_page__design__content_1F_block_data__raw.elements.lbl_scope.getLocationY())
				forms.WEB_0F_page__design__content_1F_block_data.elements.lbl_scope.setLocation(forms.WEB_0F_page__design__content_1F_block_data.elements.lbl_scope.getLocationX() + 30,forms.WEB_0F_page__design__content_1F_block_data.elements.lbl_scope.getLocationY())
			}
		}
		
		//actions available
		forms.WEB_0F_page__design__content_1F_block_data__raw.elements.btn_data_actions.visible = editMode
		forms.WEB_0F_page__design__content_1F_block_data.elements.btn_data_actions.visible = editMode
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
	//in the event that a scrapbook change was made, we need to refresh again
	//switch tabpanel based on type of form and hide/show action wheel
		REC_on_select(null,true)
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
				
				var flagEdit = forms.WEB_0F_page.ACTION_edit_get()
				
				//check to make sure the active scrapbook version is editable
				if (flagScrapbook) {
					flagEdit = flagEdit && !recBlock.web_block_to_block_version.flag_lock
				}
				
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
					
//					//set heading for this tab panel
//					var scrap = ''
//					switch (recBlock.scope_type) {
//						case 1:	//page
//							scrap = 'CONTENT (page): '
//							break
//						case 2:	//site
//							scrap = 'SCRAPBOOK (site): '
//							break
//						case 3:	//install
//							scrap = 'STACK (install): '
//							break
//					}
					
					forms[contextForm].elements.lbl_banner.text = (recBlockType.block_name || 'Unnamed') + ' block'
					
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
					if (fireSelect && solutionModel.getForm(formName).onRecordSelection) {
						//pseudo-event comes from the scope of where this is fired
						var pseudoEvent = new Object()
						pseudoEvent.getFormName = function() {return formName}
						
						forms[formName][solutionModel.getForm(formName).onRecordSelection.getName()](pseudoEvent,true)
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
			//scope's block record has been deleted
			if (utils.hasRecords(foundset)) {
				tabPanel.addTab(forms.WEB_0F_page__design__content_1F_block_data_2F__error)
				tabPanel.tabIndex = tabPanel.getMaxTabIndex()
				forms[contextForm].foundset.loadRecords(web_scope_to_block)
			}
			else {
				defaultForms()
			}
		}
		
		//method is done
		_guiLoading = false
	}
	
	function defaultForms() {
		//this should only be the case on the first load of the form or when we're on a blank form already
//		if (fireSelect) {// || tabPanel.getTabFormNameAt(tabPanel.tabIndex) == 'WEB_0F_page__design__content_1F_block_data_2F_blank') {
			forms[contextForm].foundset.loadRecords(web_scope_to_block)
			tabPanel.tabIndex = 1
//		}
//		//tack on to the end like every other block
//		else {
//			tabPanel.addTab(forms.WEB_0F_page__design__content_1F_block_data_2F_blank)
//			tabPanel.tabIndex = tabPanel.getMaxTabIndex()
//		}
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
	elements.fld_flag_active.enabled = editAllow
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
	//save data when autosave on
	if (databaseManager.getAutoSave()) {
		databaseManager.saveData()
	}
	
	return true
}
