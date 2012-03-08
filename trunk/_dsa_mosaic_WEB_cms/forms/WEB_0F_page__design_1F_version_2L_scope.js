/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4FDACEFD-6F16-46F7-827B-375E23824AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"176CC8B4-859B-4633-B39F-0B72FFF9EABE",variableType:-4}
 */
var _newBlocks = null;

/**
 *
 * @properties={typeid:24,uuid:"1480B246-ADDF-4A53-BBE8-C489910C1BAC"}
 */
function BLOCK_action_list() {
	if (utils.hasRecords(foundset)) {
		//menu items
		var valuelist = new Array(
							'Duplicate',
							'Refresh',
							'-',
							'Copy to...',
							'Promote to...'
						)		
		
		//type lists
		var vlDisplay = [
				'Page',
				'Site',
				'Install'
			]
		var vlReal = [1,2,3]
		
		if (utils.hasRecords(web_scope_to_block) && web_scope_to_block.scope_type) {
			var scrapScope = web_scope_to_block.scope_type
		}
		
		//copy to... menu
		var subMenu1 = new Array()
		for ( var i = 0 ; i < vlDisplay.length ; i++ ) {
			subMenu1[i] = plugins.popupmenu.createMenuItem(vlDisplay[i],BLOCK_scope)
			
			subMenu1[i].setMethodArguments(vlReal[i],true)
		}
		
		//what level is this block? (only allow promote to move up the chain)
		if (scrapScope) {
			vlDisplay = vlDisplay.slice(web_scope_to_block.scope_type)
			vlReal = vlReal.slice(web_scope_to_block.scope_type)
		}
		
		//promote to... menu
		var subMenu2 = new Array()
		for ( var i = 0 ; i < vlDisplay.length ; i++ ) {
			subMenu2[i] = plugins.popupmenu.createMenuItem(vlDisplay[i],BLOCK_scope)
			
			subMenu2[i].setMethodArguments(vlReal[i],null,true)
		}
		
		var mainMenu = new Array()
		mainMenu[0] = plugins.popupmenu.createMenuItem(valuelist[0],BLOCK_duplicate)
//		mainMenu[0].setMethodArguments(null,null,null,true)
		mainMenu[1] = plugins.popupmenu.createMenuItem(valuelist[1],BLOCK_refresh)
//		mainMenu[1].setMethodArguments(null,null,null,null,true)
		mainMenu[2] = plugins.popupmenu.createMenuItem(valuelist[2],BLOCK_action_list)
		mainMenu[3] = plugins.popupmenu.createMenuItem(valuelist[3],subMenu1)
		
		//don't show promote menu for install scrapbooks
		if (vlDisplay.length) {
			mainMenu[4] = plugins.popupmenu.createMenuItem(valuelist[4],subMenu2)
		}
		
		//when on scrapbook, offer to jump to scrapbook form for editing
			//TODO: make work for page-level scrapbook
		if (scrapScope) {
			var spacer = plugins.popupmenu.createMenuItem('-',BLOCK_action_list)
			var scrapJump = plugins.popupmenu.createMenuItem('Go to this scrapbook',BLOCK_goto)
			scrapJump.setMethodArguments(scrapScope)
			
			mainMenu.push(spacer,scrapJump)
		}
		
		//popup
		var elem = elements[application.getMethodTriggerElementName()]
		if (elem != null && mainMenu.length) {
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
			forms.WEB_0F_page__design_1F_version_2L_scope.REC_on_select(null,true)
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
function FORM_on_load() {
	elements.fld_id_block_display__field.visible = false
	elements.fld_id_block_display__combo.visible = true
	
	elements.btn_up.enabled = false
	elements.btn_down.enabled = false
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
 * @type {Boolean}
 *
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
				forms.WEB_0F_page__design_1F_version_2F_block__data.foundset.loadRecords(web_scope_to_block)
			}
			else if (globals.WEB_page_mode == 2) {
				forms.WEB_0F_page__design_1F_version_2F_block__gui.foundset.loadRecords(web_scope_to_block)
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
		if (forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.btn_data_actions.visible != editMode) {
			//move left
			if (editMode) {
				forms.WEB_0F_page__design_1F_version_2F_block__data.elements.lbl_scope.setLocation(forms.WEB_0F_page__design_1F_version_2F_block__data.elements.lbl_scope.getLocationX() - 30,forms.WEB_0F_page__design_1F_version_2F_block__data.elements.lbl_scope.getLocationY())
				forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.lbl_scope.setLocation(forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.lbl_scope.getLocationX() - 30,forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.lbl_scope.getLocationY())
			}
			//flush right
			else {
				forms.WEB_0F_page__design_1F_version_2F_block__data.elements.lbl_scope.setLocation(forms.WEB_0F_page__design_1F_version_2F_block__data.elements.lbl_scope.getLocationX() + 30,forms.WEB_0F_page__design_1F_version_2F_block__data.elements.lbl_scope.getLocationY())
				forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.lbl_scope.setLocation(forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.lbl_scope.getLocationX() + 30,forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.lbl_scope.getLocationY())
			}
		}
		
		//actions available
		forms.WEB_0F_page__design_1F_version_2F_block__data.elements.btn_data_actions.visible = editMode
		forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.btn_data_actions.visible = editMode
		
		//scrapbook warning labels
		forms.WEB_0F_page__design_1F_version_2F_block__data.elements.lbl_scrapbook.visible = editMode && web_scope_to_block.scope_type
		forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.lbl_scrapbook.visible = editMode && web_scope_to_block.scope_type
		
		var editScrap = '<html><strong>Warning!</strong> This is a scrapbook. Edits may affect other pages.</html>'
		var lockScrap = '<html>This scrapbook is locked. Editing not possible here.</html>'
		
		if (editMode && web_scope_to_block.web_block_to_block_version.flag_lock) {
			var scrapText = lockScrap
		}
		else if (editMode) {
			var scrapText = editScrap
		}
		
		forms.WEB_0F_page__design_1F_version_2F_block__data.elements.lbl_scrapbook.text = scrapText
		forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.lbl_scrapbook.text = scrapText
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
//		REC_on_select(null,true)
}

/**
 * @type {Boolean}
 *
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
//		application.output('WEB_0F_page__design_1F_version_2L_scope.ACTION_gui_mode_load(' + (utils.hasRecords(foundset) ? web_block_to_block_type.block_name : '') + ') #:' + this.someVar)
		
		var contextForm = 'WEB_0F_page__design_1F_version_2F_block__gui'
		var tabPanel = forms[contextForm].elements.tab_detail
		
		if (utils.hasRecords(web_scope_to_block)) {
			var recBlock = web_scope_to_block.getSelectedRecord()
			
			if (recBlock) {
				if (recBlock && utils.hasRecords(recBlock.web_block_to_block_type)) {
					var recBlockType = recBlock.web_block_to_block_type.getRecord(1)
				}
				
				//check to make sure the active block version is editable
				var flagEdit = forms.WEB_0F_page.ACTION_edit_get() && utils.hasRecords(recBlock,'web_block_to_block_version') && !recBlock.web_block_to_block_version.flag_lock
				
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
					forms[contextForm].elements.lbl_banner.text = (recBlockType.block_name || 'Unnamed') + ' block'
					
					//the form exists
					if (formName && solutionModel.getForm(formName)) {
						//load tab panel (relation not needed because we're manually filling the foundset)
						tabPanel.addTab(forms[formName])
						tabPanel.tabIndex = tabPanel.getMaxTabIndex()
						
						//force the gui to update
						if (solutionModel.getForm(formName) && solutionModel.getForm(formName).getFormMethod('INIT_data')) {
							if (forms[formName].foundset) {
								forms[formName].foundset.loadRecords(web_scope_to_block)
							}
							else {
								var restart = plugins.dialogs.showWarningDialog(
										'Warning',
										'Changes made in developer have caused foundsets to become unhooked.\nRestart?',
										'Yes',
										'No'
									)
								
								//restart
								if (restart == 'Yes') {
									application.exit()
								}
//								//allow this method to fire again
//								else {
//									_guiLoading = false
//								}
							}
							
							forms[formName].INIT_data()
						}
					}
					else {
						//clear out to blank form	//TODO: should probably be error message that form isn't included properly
						tabPanel.tabIndex = 1
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
				tabPanel.addTab(forms.WEB_0F_page__design_1F_version_2F_block__gui_3F__error)
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
		forms[contextForm].foundset.loadRecords(web_scope_to_block)
		tabPanel.tabIndex = 1
		
		forms[contextForm].elements.lbl_banner.text = "Content"
	}
}

/**
 *
 * @properties={typeid:24,uuid:"4EC7D16F-6935-4DC5-AE97-1F29D7C8E65B"}
 */
function TOGGLE_elements(editAllow) {
	var status = globals.WEBc_block_getEdit() && editAllow
	
	elements.btn_actions.enabled = status
	elements.btn_add.enabled = status
	elements.btn_delete.visible = status
	
	elements.fld_flag_active.enabled = status
	elements.fld_id_block_display__combo.visible = status
	elements.fld_id_block_display__field.visible = !status
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

/**
 * @properties={typeid:24,uuid:"17894357-47F0-4E05-A87C-4B3D15F3DA51"}
 */
function BLOCK_duplicate() {
	var blockRec = web_scope_to_block.getSelectedRecord()
	
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
	
	//punch in the current block type and display (so will show up on site scrapbook)
	destBlock.id_block_type = blockRec.id_block_type
	destBlock.id_block_display = blockRec.id_block_display
	
//create new scope record and hook together
	//turn off rec on select
	_skipSelect = true
	
	//disale/enable rec on select on the block type forms when creating scope
	globals.WEB_block_on_select = false
	
	var scopeRec = foundset.getRecord(foundset.newRecord(false,true))
	
	scopeRec.row_order = foundset.getSize()
	scopeRec.id_block = destBlock.id_block
	databaseManager.saveData()
	
	//disale/enable rec on select on the block type forms when creating scope
	globals.WEB_block_on_select = true
	
	//turn on rec on select
	_skipSelect = false
	
	//refire rec_on_select to get us in the right spot
	forms.WEB_0F_page__design_1F_version_2L_scope.REC_on_select(null,true)
	
//store this scope record into temp variable to delete if canceled
	if (scopeRec) {
		if (!_newBlocks instanceof Array) {
			_newBlocks = new Array()
		}
		_newBlocks.push(scopeRec)
	}
}

/**
 * @properties={typeid:24,uuid:"74308546-EBFE-425A-A9A6-3A3E4B450D22"}
 */
function BLOCK_goto(scope) {
	var blockRec = web_scope_to_block.getSelectedRecord()
	
	var question = plugins.dialogs.showQuestionDialog(
				'Leave edit mode?',
				'You must exit edit mode before viewing the scrapbook manager.\nAll changes will be saved.\nContinue?',
				'Yes',
				'No'
		)
	
	if (question == 'Yes') {
		var blockRec = web_scope_to_block.getSelectedRecord()
		
		//leave edit mode
		forms.WEB_A__page.ACTION_save()
		
		if (scope == '1') {
			var pageScrap = true
			var navForm = 'WEB_0F_block__scrapbook_1F_page__blocks_2L_block'
		}
		else if (scope == '2') {
			var navItem = 'CMS_scrapbook_site'
			var navForm = 'WEB_0F_block__site'
		}
		else if (scope == '3') {
			var navItem = 'CMS_scrapbook_install'
			var navForm = 'WEB_0F_block__install'
		}
		
		//site or install scrapbook
		if (navItem) {
			//not running in data sutra application framework, just show appropriate scrapbook form
			if (globals.WEBc_sutra_trigger('TRIGGER_navigation_set',[navItem]) == 'noSutra') {
				forms[navForm].controller.show()
			}
			
			//select this scrapbook (happens because of shared foundset)
//				application.updateUI(1000)
			forms[navForm].foundset.selectRecord(blockRec.id_block)
			
			//enter edit mode?
		}
		else if (pageScrap) {
			//go to scrapbook tab
			forms.WEB_0F_page__design_1F__button_tab.TAB_change(null,'tab_b3')
			
			//select this scrapbook
			forms[navForm].foundset.selectRecord(blockRec.id_block)
		}
	}
}

/**
 * @properties={typeid:24,uuid:"4F0C287E-8F02-4FE6-8EE7-6AC8F4163951"}
 */
function BLOCK_refresh() {
	var blockRec = web_scope_to_block.getSelectedRecord()
	
	if (utils.hasRecords(foundset.getSelectedRecord(),'web_scope_to_block.web_block_to_block_version')) {
		forms.WEB_0F_block__scrapbook.REC_refresh(web_scope_to_block.web_block_to_block_version__all,web_scope_to_block.web_block_to_block_version.getRecord(1))
		
		//refire rec_on_select to get us in the right spot
		REC_on_select(null,true)
	}
	else {
		plugins.dialogs.showErrorDialog(
				'Error',
				'The selected block cannot be updated.\nDelete and re-add.'
			)
	}
}

/**
 * @properties={typeid:24,uuid:"EB820E47-6901-417E-BE4D-90316690A027"}
 */
function BLOCK_scope(scope,copy,promote) {
	var blockRec = web_scope_to_block.getSelectedRecord()
	
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
