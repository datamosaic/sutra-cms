/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4FDACEFD-6F16-46F7-827B-375E23824AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {Array}
 * @properties={typeid:35,uuid:"176CC8B4-859B-4633-B39F-0B72FFF9EABE",variableType:-4}
 */
var _newBlocks = new Array();

/**
 * @type {Array}
 * @properties={typeid:35,uuid:"C1AEFA8A-41BF-45E5-9F88-1B1EC41F24E0",variableType:-4}
 */
var _deletedBlocks = new Array();

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
		globals.DIALOGS.showErrorDialog(
					'Error',
					'No block selected.  You must create/select a block first'
			)
	}
}

/**
 * @type {JSEvent|String} input
 * @return {JSRecord<db:/sutra_cms/web_block>}
 * @properties={typeid:24,uuid:"32ED93D4-CD10-47EF-B396-71C65FC962E7"}
 */
function BLOCK_new(input) {
	//method called not from a click on plus button; from web edit mode
	if (!(input instanceof JSEvent)) {
		function convertUUID(item) {
			if (item) {
				return item.substr(0,8) + '-' + item.substr(8,4) + '-' + item.substr(12,4) + '-' + item.substr(16,4)  + '-' + item.substr(20,12)
			}
		}
		
		var unmangle = input.split("-")
		var scopeID = convertUUID(unmangle[1])
		var areaID = convertUUID(unmangle[0])
		var slot = unmangle[2]
		
		//notify which area we're adding to when in real mode
		forms.WEB_P__block__new._calledFrom = 'Live'
		forms.WEB_P__block__new._areaID = areaID
		forms.WEB_P__block__new._scopeID = scopeID ? scopeID : null
		forms.WEB_P__block__new._scopeOrder = slot ? slot : null
	}
	else {
		forms.WEB_P__block__new._calledFrom = 'GUI'
	}
	
	//show FiD for adding a new block
	globals.CODE_form_in_dialog(
				forms.WEB_P__block__new,
				-1,-1,-1,-1,
				' ',
				true,
				false,
				'cmsBlockNew'
			)
	
	//start a continuation in wc
	scopes.DS.continuation.start(null,'WEB_P__block__new')
	
	//created a new record
	if (forms.WEB_P__block__new._success) {
		//update ordering for the things
		forms.WEB_0F_page__design_1F_version_2L_scope.SCOPE_sort(areaID)

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
 * @properties={typeid:24,uuid:"64E10B1C-C632-4B7D-92C5-F94DBA4C18BD"}
 */
function FORM_on_load() {
	elements.fld_id_block_display__field.visible = false
	elements.fld_id_block_display__combo.visible = true
}

/**
 * @param {JSRecord} recDelete
 * @param {Boolean} [silent=false]
 * @return {Boolean} true if record deleted
 * @properties={typeid:24,uuid:"7E59BE92-3022-4690-94E5-0AC5FD663ABA"}
 * @AllowToRunInFind
 */
function REC_delete(recDelete,silent) {
	//find all records in this area
	if (recDelete instanceof JSRecord) {
		/** @type {JSFoundSet<db:/sutra_cms/web_scope>} */
		var fsScope = databaseManager.getFoundSet(controller.getServerName(),"web_scope")
		fsScope.find()
		fsScope.id_area = recDelete.id_area
		fsScope.search()
		
		fsScope.selectRecord(recDelete.id_scope)
	}
	//get record to delete and foundset
	else {
		fsScope = foundset
	}
	recDelete = fsScope.getSelectedRecord()
	
	var message = 'Do you really want to delete this block?'
	if (utils.hasRecords(recDelete,'web_scope_to_scope__child')) {
		message = 'Do you really want to delete this block and all its children?'
	}
	
	/**
	 * @param {JSRecord<db:/sutra_cms/web_scope>} record
	 */
	function whichRecords(record) {
		if (utils.hasRecords(record.web_scope_to_scope__child)) {
			for (var i = 1; i <= record.web_scope_to_scope__child.getSize(); i++) {
				whichRecords(record.web_scope_to_scope__child.getRecord(i))
			}
		}
		_deletedBlocks.push(record)
	}
	
	if (!silent) {
		var delRec = globals.DIALOGS.showWarningDialog(
						'Delete record',
						message,
						'Yes',
						'No'
					)
	}
	
	if (silent || delRec == 'Yes') {
		for (var i = 1; i <= fsScope.getSize(); i++) {
			var record = fsScope.getRecord(i)
			
			//only re-order things at the top-level; leave holes down stream
			if (!recDelete.parent_id_scope && recDelete.parent_id_scope == record.parent_id_scope && record.row_order > recDelete.row_order) {
				record.row_order--
			}
		}
		
		//store all these records to be deleted so can undo if edits cancelled
		whichRecords(recDelete)
		
		var success = fsScope.deleteRecord(recDelete)
		
		//live mode
		if (arguments[0]) {
			SCOPE_sort(recDelete.id_area)
			//when silently deleting (create cancelled), url is updated upstream
			if (!silent) {
				var formName = application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT ? 'WEB_0F_page__live__web' : 'WEB_0F_page__browser'
				
				forms[formName].URL_update(true)
			}
		}
		//gui mode with no records left
		else if (!utils.hasRecords(foundset)) {
			REC_on_select()
		}
		
		return success
	}
	//live mode
	else if (arguments[0]) {
		plugins.WebClientUtils.executeClientSideJS(
				'bigIndicator(false);'
			)
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
		
		//give the triple-level relation forms a little extra help (not really legal...)
		try {
			if (utils.hasRecords(foundset)) {
				if (globals.WEB_page_mode == 1) {
					forms.WEB_0F_page__design_1F_version_2F_block__data.foundset.loadRecords(web_scope_to_block)
				}
				else if (globals.WEB_page_mode == 2) {
					forms.WEB_0F_page__design_1F_version_2F_block__gui.foundset.loadRecords(web_scope_to_block)
				}
			}
		}
		catch (e) {
			
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
		
		//set position of scope label because actions are showing differently in webclient
		if (forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.btn_data_actions.visible != editMode && application.getApplicationType() != APPLICATION_TYPES.WEB_CLIENT) {
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
					
					//check for webclient version of this block type
					if (application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT && solutionModel.getForm(formName + 'w')) {
						formName += 'w'
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
								var restart = globals.DIALOGS.showWarningDialog(
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
					//clear out to blank form
					else {
						//TODO: should probably be error message that form isn't included properly
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
				forms[contextForm].elements.lbl_banner.text = 'Block'
			}
			else {
				defaultForms()
			}
		}
		
		//method is done
		_guiLoading = false
	}
	
	function defaultForms() {
		try {
			forms[contextForm].foundset.loadRecords(web_scope_to_block)
		}
		catch (e) {}
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
	
	elements.fld_id_scope.visible = false
	elements.fld_parent_id_scope.visible = false
	elements.fld_row_order.visible = false
	elements.fld_row_order_order.visible = false
	elements.fld_sort_order.visible = false
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
 * @AllowToRunInFind
 */
function BLOCK_duplicate() {
	
	var oldScope = foundset.getSelectedRecord()
	//find current syblings
	/** @type {JSFoundSet<db:/sutra_cms/web_scope>} */
	var fsPeers = databaseManager.getFoundSet('sutra_cms','web_scope')
	fsPeers.find()
	fsPeers.parent_id_scope = (oldScope.parent_id_scope) ? oldScope.parent_id_scope : '^='
	fsPeers.id_area = oldScope.id_area
	var results = fsPeers.search()
	
	if (results) {
		fsPeers.sort('row_order asc')
	}
	
	var blockRec = oldScope.web_scope_to_block.getSelectedRecord()
	
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
	
	//disable/enable rec on select on the block type forms when creating scope
	globals.WEB_block_on_select = false
	
	var scopeRec = foundset.getRecord(foundset.newRecord(false,true))
	
	scopeRec.row_order = fsPeers.getRecord(fsPeers.getSize()).row_order + 1
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
	
	var question = globals.DIALOGS.showQuestionDialog(
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
		globals.DIALOGS.showErrorDialog(
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
	
	var input = globals.DIALOGS.showInputDialog(
					'Name',
					'Please (re)name the block you are working with',
					blockRec.block_name || ''
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
			forms.WEB_0F_page__design_1F__button_tab.elements.tab_b3.enabled = true
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
			forms.WEB_0F_page__design_1F__button_tab.elements.tab_b3.enabled = true
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

/**
 * @param {JSRecord<db:/sutra_cms/web_scope>} scope
 * @param {JSRecord<db:/sutra_cms/web_scope>} scopeParent
 * 
 * @properties={typeid:24,uuid:"8D0EF1CA-26AC-4D34-B793-6E9147C79DC9"}
 */
function BLOCK_layout(scope,scopeParent) {
	//re-order everything below scope
	
	//tack on scope to bottom of scope parent
	
	scope.parent_id_scope = scopeParent.id_scope
}

/**
 *
 * @properties={typeid:24,uuid:"189B8FFD-54F0-40A6-AD81-5008C88B27AC"}
 */
function MOVE_down() {
	
	MOVE_generic('down')
	
}

/**
 * Re-order blocks.  Only layout blocks can have children
 * 
 * @properties={typeid:24,uuid:"837FB023-249B-4465-9C44-8600A3A75AEF"}
 * @AllowToRunInFind
 */
function MOVE_generic(input) {
	var recMove = foundset.getSelectedRecord()

	//find current syblings
	/** @type {JSFoundSet<db:/sutra_cms/web_scope>} */
	var fsPeers = databaseManager.getFoundSet('sutra_cms','web_scope')
	fsPeers.find()
	fsPeers.parent_id_scope = (recMove.parent_id_scope) ? recMove.parent_id_scope : '^='
	fsPeers.id_area = recMove.id_area
	var results = fsPeers.search()

	if (results) {
		fsPeers.sort('row_order asc, row_order_order asc')
		fsPeers.selectRecord(recMove.id_scope)
	}

	switch (input) {
		case 'up':
			//only move up if there are records above selected one
			if (fsPeers.getSelectedIndex() != 1) {
				//get previous record
				var recordPrev = fsPeers.getRecord(fsPeers.getSelectedIndex() - 1)

				//swap ordering within well
				var tempOrder = recordPrev.row_order_order
				recordPrev.row_order_order = recMove.row_order_order
				recMove.row_order_order = tempOrder

				//swap ordering within layout
				if (recordPrev.row_order != recMove.row_order) {
					tempOrder = recordPrev.row_order
					recordPrev.row_order = recMove.row_order
					recMove.row_order = tempOrder
				}
			}
			else {
				return
			}
			break
		case 'down':
			//only move down if there are records below selected one
			if (fsPeers.getSelectedIndex() != databaseManager.getFoundSetCount(fsPeers)) {
				//get next record
				var recordNext = fsPeers.getRecord(fsPeers.getSelectedIndex() + 1)

				//swap ordering within well
				tempOrder = recordNext.row_order_order
				recordNext.row_order_order = recMove.row_order_order
				recMove.row_order_order = tempOrder

				//swap ordering within layout
				if (recordNext.row_order != recMove.row_order) {
					tempOrder = recordNext.row_order
					recordNext.row_order = recMove.row_order
					recMove.row_order = tempOrder

					//instead of swapping places, should be moving selected item to other side of first item in next well
//					recordNext.row_order_order = recMove.row_order_order
//					recMove.row_order_order = recordNext.row_order_order + 1

//					//re-order everybody below current record in new foundset
//					for (var i = fsPeers.getSelectedIndex() + 2; i <= fsPeers.getSize(); i++) {
//						var recReorder = fsPeers.getRecord(i)
//
//						if (recReorder.row_order == recordNext.row_order) {
//							recReorder.row_order_order ++
//						}
//					}
				}
			}
			else {
				return
			}
			break
		case 'in':
			//only move in if this record isn't the first in the group AND there are siblings AND new parent is a layout block
			if (fsPeers.getSelectedIndex() != 1 && fsPeers.getSize() > 1 && utils.hasRecords(fsPeers.getRecord(fsPeers.getSelectedIndex() - 1),'web_scope_to_block.web_block_to_block_type') && fsPeers.getRecord(fsPeers.getSelectedIndex() - 1).web_scope_to_block.web_block_to_block_type.block_category == scopes.CMS._constant.blockCategory.LAYOUT) {
				//find new parent
				fsPeers.setSelectedIndex(fsPeers.getSelectedIndex() - 1)
				var idParent = fsPeers.id_scope

				//find new syblings
				var fsPeersNew = databaseManager.getFoundSet('sutra_cms','web_scope')
				fsPeersNew.find()
				fsPeersNew.parent_id_scope = (idParent) ? idParent : '^='
				fsPeersNew.id_area = recMove.id_area
				var results = fsPeersNew.search()

				if (results) {
					fsPeersNew.sort('row_order asc, row_order_order asc')
				}

				//find current record index
				for (var i = 1; i <= fsPeers.getSize() && !currentIndex; i++) {
					if (globals.CODE_compare_object(globals.CODE_record_object(fsPeers.getRecord(i)),globals.CODE_record_object(recMove))) {
						var currentIndex = i
					}
				}
				//re-order everybody below current record in old foundset
				for (var i = currentIndex + 1; i <= fsPeers.getSize(); i++) {
					var recReorder = fsPeers.getRecord(i)

					//moving in within a well
					if (recMove.row_order == recReorder.row_order) {
						var internalMove = true
						recReorder.row_order_order --
					}
					//break out of loop
					else if (!internalMove) {
						recReorder.row_order --
					}
				}

				//add recMove to bottom of new foundset
				recMove.row_order = (utils.hasRecords(fsPeersNew)) ? fsPeersNew.getRecord(fsPeersNew.getSize()).row_order + 1 : 1
				recMove.row_order_order = 1
				recMove.parent_id_scope = idParent
			}
			else {
				return
			}
			break
		case 'out':
			//only move out if node level not 0
			if (recMove.parent_id_scope) {
				var fsPeersNew = databaseManager.getFoundSet(controller.getServerName(),controller.getTableName())
				fsPeersNew.find()
				fsPeersNew.id_scope = recMove.parent_id_scope
				fsPeersNew.search()

				//find new parent
				var parentRec = fsPeersNew.getSelectedRecord()
				var idParent = parentRec ? parentRec.parent_id_scope : null

				//find new syblings
				fsPeersNew.find()
				fsPeersNew.parent_id_scope = (idParent) ? idParent : '^='
				fsPeersNew.id_area = recMove.id_area
				var results = fsPeersNew.search()

				if (results) {
					fsPeersNew.sort('row_order asc, row_order_order asc')
				}

				//find current record index
				for (var i = 1; i <= fsPeers.getSize() && !currentIndex; i++) {
					if (globals.CODE_compare_object(globals.CODE_record_object(fsPeers.getRecord(i)),globals.CODE_record_object(recMove))) {
						var currentIndex = i
					}
				}
				//re-order everybody below current record in old foundset
				for (var i = currentIndex + 1; i <= fsPeers.getSize(); i++) {
					var recReorder = fsPeers.getRecord(i)

					//moving in within a well
					if (recMove.row_order == recReorder.row_order) {
						var internalMove = true
						recReorder.row_order_order --
					}
					//break out of loop
					else if (!internalMove) {
						recReorder.row_order --
					}
				}

				//re-order everybody below current record in new foundset
				currentIndex = null
				for (var i = 1; i <= fsPeersNew.getSize() && !currentIndex; i++) {
					if (globals.CODE_compare_object(globals.CODE_record_object(fsPeersNew.getRecord(i)),globals.CODE_record_object(recMove.web_scope_to_scope__parent.getSelectedRecord()))) {
						var currentIndex = i
					}
				}
				for (var i = currentIndex + 1; i <= fsPeersNew.getSize(); i++) {
					var recReorder = fsPeersNew.getRecord(i)

					recReorder.row_order ++
				}

				//insert recMove directly below former parent in new foundset
				recMove.row_order = parentRec ?  parentRec.row_order + 1 : 1
				recMove.row_order_order = 1
				recMove.parent_id_scope = idParent
			}
			else {
				return
			}
			break
	}
	databaseManager.saveData()

	//some moving happened, update the display sort order as well
	SCOPE_sort()

	//reselect same record
	foundset.selectRecord(recMove.id_scope)
}

/**
 *
 * @properties={typeid:24,uuid:"5F9D68F9-C105-4905-A209-1F8EDE453A08"}
 */
function MOVE_in() {
	
	MOVE_generic('in')
	
}

/**
 *
 * @properties={typeid:24,uuid:"B4FC919F-A2DC-4CE3-928B-60C6809CBAA8"}
 */
function MOVE_out() {
	
	MOVE_generic('out')
	
}

/**
 *
 * @properties={typeid:24,uuid:"67319AC7-CFE4-4EAC-A4B3-3B95ACFDE8DC"}
 */
function MOVE_up() {
	
	MOVE_generic('up')
	
}

/**
 * Punch in a sort value so that GUI mode can be sorted by parent-childness
 * 
 * @param {UUID} [idArea]
 * 
 * @properties={typeid:24,uuid:"006A6F60-2336-424C-BCF5-A3E349DAB413"}
 * @AllowToRunInFind
 */
function SCOPE_sort(idArea) {
	if (!(idArea instanceof UUID)) {
		idArea = id_area
		var localUpdate = true
	}
	
	/** @type {JSFoundSet<db:/sutra_cms/web_scope>} */
	var fsScope = databaseManager.getFoundSet('db:/sutra_cms/web_scope')
	fsScope.find()
	fsScope.id_area = idArea
	fsScope.parent_id_scope = '^='
	fsScope.search()
	fsScope.sort('row_order asc')
	
	/**
	 * @param {JSRecord<db:/sutra_cms/web_scope>} record
	 */
	function doRecord(record) {
		//set order of this record
		record.sort_order = orderHelper++
		
		//no sub order value, set to be 1
		if (record.row_order_order == null) {
			record.row_order_order = 1
		}

		//go through children
		if (utils.hasRecords(record,'web_scope_to_scope__child')) {
			record.web_scope_to_scope__child.sort('row_order asc, row_order_order asc')
			for (var i = 1; i <= record.web_scope_to_scope__child.getSize(); i++) {
				doRecord(record.web_scope_to_scope__child.getRecord(i))
			}
		}
	}
	
	var orderHelper = 1
	for (var j = 1; j <= fsScope.getSize(); j++) {
		doRecord(fsScope.getRecord(j))
	}
	
	if (localUpdate) {
		databaseManager.saveData(foundset)
		//double sort because it thinks that already asc, so doesn't do anything
		foundset.sort('sort_order desc')
		foundset.sort('sort_order asc')
//		forms.WEB_0F_page__design_1F_version_2L_area.web_area_to_scope.sort('sort_order asc')
	}
}