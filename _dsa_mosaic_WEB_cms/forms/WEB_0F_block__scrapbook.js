/**
 * @properties={typeid:35,uuid:"EECFB2A2-AB6E-4059-B9B9-2D18C2C450CD",variableType:-4}
 */
var _skipSelect = false;

/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f51"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"6E70A90A-35E2-488D-92AD-0D5F99E8CEE4",variableType:-4}
 */
var _editMode = false;

/**
 *
 * @properties={typeid:24,uuid:"69CCDB89-DD7A-46C7-BF3D-F1BD0BC5BF7F"}
 */
function REC_delete() {
	var delRec = plugins.dialogs.showWarningDialog(
				'Delete record',
				'Deleting a scrapbook will remove it from all pages.\nDo you really want to delete this record?',
				'Yes',
				'No'
			)
	
	if (delRec == 'Yes') {
		//find all scope records and flag as having missing data
		var fsScope = databaseManager.getFoundSet('sutra_cms','web_scope')
		fsScope.find()
		fsScope.id_block = id_block
		var results = fsScope.search()
		
		if (results) {
			var fsUpdater = databaseManager.getFoundSetUpdater(fsScope)
			fsUpdater.setColumn('flag_active',0)
			fsUpdater.performUpdate()
		}
		
		controller.deleteRecord()
		
		//dim out the lights
		if (!utils.hasRecords(foundset)) {
			FORM_on_show()
		}
	}
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A17B8FB8-4920-4F9A-92F8-6B9C7F3B4E0D"}
 */
function FORM_on_load(event) {
	//set up split bean
	SPLIT_set(false)
	
	//MEMO: the list of blocks is shown/hidden from the page form tab controller
}

/**
 * @properties={typeid:24,uuid:"95D93344-A2EB-41E0-B6C9-E52A54EED328"}
 */
function FILTER_records() {
	//only do this when not running in data sutra
	if (!application.__parent__.solutionPrefs) {
		FILTER_records(event)
	}
}

/**
 *
 * @properties={typeid:24,uuid:"81BCE4C0-7411-4947-8D02-0A5025D053CD"}
 */
function REC_new() {
	if (utils.hasRecords(forms.WEB_0F_site.foundset)) {
		//TODO: don't lock interface when on install content area
		//no records created yet and interface locked
		if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow) {
			globals.WEB_lock_workflow(false)
		}
		
		forms.WEB_P__block__new._calledFrom = 'Scrapbook'
		
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
			//refire version onSelect method (disabled during record creation)
			globals.WEB_block_version = utils.hasRecords(web_block_to_block_version__all) ? web_block_to_block_version__all.id_block_version.toString() : null
			REC_on_select()
			
			//enter edit mode
			forms.WEB_A__scrapbook.ACTION_edit()
			
			//refresh screen so i can put cursor into field
			application.updateUI(250)
			
			//set name of this block
//			forms.WEB_0F_block__scrapbook__header.LBL_block_name__action()
			
			//additional request focus (at end of method stack)
			forms.WEB_0F_block__scrapbook__header.elements.fld_block_name.selectAll()
			forms.WEB_0F_block__scrapbook__header.elements.fld_block_name.requestFocus(false)
		}
	}
	else {
		plugins.dialogs.showErrorDialog(
						'Error',
						'You must add a site record first'
				)
	}
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"35F6C3C6-F764-4864-8624-2F19A13FB579"}
 */
function FORM_on_hide(event) {
	if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow) {
		globals.WEB_lock_workflow(false)
	}
	
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"69B72F68-C6D4-4949-BEA5-2C2C8058CCE2"}
 */
function ACTION_toggle(event) {
	if (!_editMode) {
		_editMode = 1
		elements.lbl_edit.text = 'Done'
		elements.btn_edit.toolTipText = 'Click when finished editing'
	}
	else {
		//punch down the save button
		if (utils.hasRecords(foundset)) {
			//load in correct gui representation for this block type
			var recScrapbook = foundset.getSelectedRecord()
	
			if (recScrapbook && utils.hasRecords(recScrapbook.web_scrapbook_to_block_type)) {
				var recBlockType = recScrapbook.web_scrapbook_to_block_type.getRecord(1)
			}
			
			//editable status
			var flagEdit = (_editMode) ? true : false
			
			//this block definition exists as does the form
			if (recBlockType && forms[recBlockType.form_name]) {
				//check for method existence on form
				if (solutionModel.getForm(recBlockType.form_name).getFormMethod('BLOCK_save')) {
					var hasInit = true
				}
				
				//there is a custom form to show
				if (hasInit) {
					forms[recBlockType.form_name].BLOCK_save()
				}
			}
		}
		
		_editMode = 0
		elements.lbl_edit.text = 'Edit'
		elements.btn_edit.toolTipText = 'Click to begin editing...'
	}
	
	//when toggled from the button, redo the screen
	if (event) {
		REC_on_select()
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"5281F4B0-6AF6-4782-A3D0-48C4F05F8828"}
 */
function FORM_on_show(firstShow, event) {
//	//hide bean lines on resource tabpanel forms
//	forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.lbl_lefthand.visible = false
//	forms.WEB_0F_page__design_1F_version_2F_block__data.elements.lbl_lefthand.visible = false
//	
//	//show tabpanel bordering
//	forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.tab_detail.setBorder('SpecialMatteBorder,0.0,1.0,3.0,1.0,#647B95,#A1B0CF,#A1B0CF,#A1B0CF,0.0,')
//	forms.WEB_0F_page__design_1F_version_2F_block__data.elements.tab_detail.setBorder('SpecialMatteBorder,0.0,1.0,3.0,1.0,#647B95,#A1B0CF,#A1B0CF,#A1B0CF,0.0,')
	
//	//go to gui mode first
//	if (!firstShow) {
//		forms.WEB_0F_block__scrapbook__header.TOGGLE_mode(null,'gui')
//	}

	//make sure right things are showing
	if (firstShow) {
		forms.WEB_0F_block__scrapbook__header.TOGGLE_elements()
	}
	
	//only do this when not running in data sutra
	if (!application.__parent__.solutionPrefs) {
		FILTER_records(event)
	}

	if (!utils.hasRecords(foundset)) {
		REC_on_select()
	}
}

/**
 * @properties={typeid:24,uuid:"E5591A6B-12A1-4292-8A9A-446A59112031"}
 */
function REC_on_select(event) {
	if (!_skipSelect) {
		var fsPages = forms.WEB_0F_block__scrapbook_1F__sidebar_2L_page.foundset
		
		//clear html used for details (if there are no pages used on)
		forms.WEB_0F_block__scrapbook_1F__sidebar_2L_page._moshPit = null
		
		if (utils.hasRecords(foundset)) {
			//when record selection changes as opposed to when called programatically
			if (event && forms.WEB_0F_block__scrapbook_1F__sidebar.elements.tab_detail.tabIndex == 2) {
				LOAD_used_on()
			}
		}
		else {
			fsPages.clear()	
		}
		
		//set versions
			//TODO: could use this activeVersion record to set globals.WEB_block_version
		var activeVersion = SET_versions()
		
		//update version global for combobox (see forms.WEB_0F_block__scrapbook_1F__sidebar_2L_block_version.REC_on_select)
		if (forms.WEB_0F_block__scrapbook_1F__sidebar.elements.tab_detail.tabIndex != 1) {
			globals.WEB_block_version = utils.hasRecords(web_block_to_block_version__all) ? web_block_to_block_version__all.id_block_version.toString() : null
		}
		
		//status of the edit
		forms.WEB_0F_block__scrapbook__header.TOGGLE_elements()
		
		//load correct gui form
		ACTION_gui_mode_load()
	}
}

/**
 * @properties={typeid:24,uuid:"6DFEB9F4-738D-4E24-B2B6-467FA545370D"}
 */
function LOAD_used_on() {
	var fsPages = forms.WEB_0F_block__scrapbook_1F__sidebar_2L_page.foundset
	
	globals.CODE_cursor_busy(true)
	
	//get pages where this block is used
	var query = "SELECT DISTINCT c.id_page FROM web_platform a, web_version b, web_page c WHERE  \
				b.id_version IN ( \
				SELECT DISTINCT c.id_version from web_block a, web_scope b, web_area c WHERE  \
				c.id_area = b.id_area AND \
				b.id_block = a.id_block AND \
				a.id_block = ? \
				) AND \
				a.id_platform = b.id_platform AND \
				a.id_page = c.id_page"
	var dataset = databaseManager.getDataSetByQuery(
				'sutra_cms',
				query,
				[id_block.toString()],
				-1
			)
	
	//load correct pages that this is used on
	fsPages.loadRecords(dataset)
	
	globals.CODE_cursor_busy(false)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8990F4CA-2618-4392-9AB6-ABE40B6A2626"}
 */
function TAB_change(event,elemName) {
	globals.TAB_change_grid(null,elemName)
	
	//on first tab now and it's not blank or raw, refresh
	if (elements.tab_detail.tabIndex == 1 && (elements.tab_detail.getTabFormNameAt(1) != 'CODE__blank' || elements.tab_detail.getTabFormNameAt(1) != 'WEB_0F_scrapbook_1L_scrapbook_data')) {
		if (utils.hasRecords(foundset)) {
			//load in correct gui representation for this block type
			var recScrapbook = foundset.getSelectedRecord()
	
			if (recScrapbook && utils.hasRecords(recScrapbook.web_scrapbook_to_block_type)) {
				var recBlockType = recScrapbook.web_scrapbook_to_block_type.getRecord(1)
			}
			
			//editable status
			var flagEdit = (_editMode) ? true : false
			
			//this block definition exists as does the form
			if (recBlockType && forms[recBlockType.form_name]) {
				//check for method existence on form
				if (solutionModel.getForm(recBlockType.form_name).getFormMethod('LOADER_refresh')) {
					var hasInit = true
				}
				
				//there is a custom form to show
				if (hasInit) {
					forms[recBlockType.form_name].LOADER_refresh(
														recScrapbook.web_scrapbook_to_scrapbook_data,
														flagEdit
													)
	
				}
			}
		}
	}
}

/**
 * @properties={typeid:24,uuid:"F0920424-5B3E-405D-B476-A205F6536D03"}
 */
function ACTION_gui_mode_load() {
	//load in correct gui representation for this block type
	var recScrapbook = foundset.getSelectedRecord()
	var contextForm = 'WEB_0F_block__scrapbook_1F__gui'
	var tabPanel = forms[contextForm].elements.tab_detail
	
	if (recScrapbook && utils.hasRecords(recScrapbook.web_block_to_block_type)) {
		var recBlockType = recScrapbook.web_block_to_block_type.getRecord(1)
	}
	
	//this block definition exists as does the form and we're in gui mode
	if (recBlockType && forms[recBlockType.form_name] && elements.tab_main.tabIndex == 1) {
		//edits allowed
		if (ACTION_edit_get()) {
			var formName = recBlockType.form_name
		}
		//no edits
		else {
			var formName = recBlockType.form_name_display || recBlockType.form_name
		}
		
		forms[contextForm].elements.lbl_banner.text = (recBlockType.block_name || 'Unnamed') + ' block'
		
		//the form exists and it isn't in the currently selected tab
		if (formName && forms[formName] && formName != tabPanel.getTabFormNameAt(tabPanel.tabIndex)) {
			var relationName = solutionModel.getForm(formName).dataSource == 'db:/sutra_cms/web_block' ? 'web_block_to_block' : null
			
			//load tab panel
			tabPanel.addTab(forms[formName],null,null,null,null,null,null,relationName)
			tabPanel.tabIndex = tabPanel.getMaxTabIndex()
		}
		else {
			tabPanel.tabIndex = tabPanel.getMaxTabIndex()
		}
		
		//refire the onSelect method to force the gui to update
		if (solutionModel.getForm(formName).onRecordSelection) {
			//pseudo-event comes from the scope of where this is fired
			var pseudoEvent = new Object()
			pseudoEvent.getFormName = function() {return controller.getName()}
	
			forms[formName][solutionModel.getForm(formName).onRecordSelection.getName()](pseudoEvent,true)
		}
		
		forms.WEB_0F_block__scrapbook__header.TOGGLE_mode(null,'gui')
	}
	else {
		tabPanel.tabIndex = 1
	}
}

/**
 * @properties={typeid:24,uuid:"EC4DC0E5-96AB-4FD3-B384-930DD34E439D"}
 */
function ACTION_edit_get() {
	//disable edits if edit flag not set
	if (!utils.hasRecords(web_block_to_block_version__all) || web_block_to_block_version__all.flag_lock) {
		var editAllow = false
	}
	//enable edits if in edit mode
	else if (forms.WEB_A__scrapbook._editMode) {
		var editAllow = true
	}
	else {
		var editAllow = false
	}
	
	return editAllow
}

/**
 * @properties={typeid:24,uuid:"197D93CB-71D3-4E19-9730-849500F4CA1C"}
 */
function SET_versions() {
	//fill versions value list
	var vlReal = new Array()
	var vlDisplay = new Array()	
	var fsVersions = web_block_to_block_version__all
	
	//we've got a version stack
	if (utils.hasRecords(fsVersions)) {
		//resort by version number desc if not already there
		if (fsVersions.getCurrentSort() != 'version_number desc') {
			fsVersions = fsVersions.duplicateFoundSet()
			fsVersions.sort('version_number desc',true)
		}
		
		for (var i = 1; i <= fsVersions.getSize(); i++) {
			var recVersion = fsVersions.getRecord(i)
			
			vlReal.push(recVersion.id_block_version.toString())
			
			var displayVal = ''
			
			if (recVersion.flag_active) {
				displayVal += '<html><body><strong>ACTIVE</strong> '
				var active = recVersion
			}
			
			displayVal += 'Version ' + recVersion.version_number + ' '
			
			if (recVersion.rec_created || recVersion.rec_modified) {
				displayVal += '('
				
				if (recVersion.rec_created) {
					displayVal += globals.CODE_date_format(recVersion.rec_created,'current')
				}
				
				//modified created is same, don't display second
				var dateCreated = new Date(recVersion.rec_created)
				var dateModified = new Date(recVersion.rec_modified)
				if (dateCreated && dateModified && 
					!(dateCreated.getMonth() == dateModified.getMonth() &&
					dateCreated.getYear() == dateModified.getYear() &&
					dateCreated.getDate() == dateModified.getDate())) {
					
					if (recVersion.rec_created && recVersion.rec_modified) {
						displayVal += ' / '
					}
					
					if (recVersion.rec_modified) {
						displayVal += globals.CODE_date_format(recVersion.rec_modified,'current')
					}
				}
				
				displayVal += ')'
			}
			
			if (recVersion.version_name) {
				displayVal += ': ' + recVersion.version_name
			}
			
			vlDisplay.push(displayVal)
		}
	}
	
	application.setValueListItems('WEB_block_version',vlDisplay,vlReal)
	
	return active
}

/**
 * @properties={typeid:24,uuid:"573F36C0-638A-494B-80D5-C24DD8BC1688"}
 */
function FOUNDSET_restrict(returnContent, noSutra, scrapbookScope) {
	//get parent form
	var formStack = controller.getFormContext()
	
	//this form is included on some other form
	if (formStack.getMaxRowIndex() > 1) {
		var formParent = formStack.getValue(formStack.getMaxRowIndex()-1,2)
	}
	
	//when no data sutra, still try to work
	if (noSutra) {
		//find stuff for the selected site
		if (utils.hasRecords(forms.WEB_0F_site.foundset)) {
			forms[formParent].foundset.find()
			//scope to selected site unless viewing the install level
			if (scrapbookScope != 3) {
				forms[formParent].foundset.id_site = forms.WEB_0F_site.id_site
			}
			forms[formParent].foundset.scrapbook_type = scrapbookScope
			var results = forms[formParent].foundset.search()
		}
		else {
			forms[formParent].foundset.clear()
		}
	}
	
	//return what scope to find records in
	if (returnContent) {
		return scrapbookScope
	}
}

/**
 * @properties={typeid:24,uuid:"CB7E7C07-4E17-4542-B7BE-B59820F4E885"}
 */
function SPLIT_set(show) {
	elements.split_sidebar.topComponent	= elements.tab_blocks
	elements.split_sidebar.bottomComponent = elements.tab_versions
	
	if (show) {
		elements.split_sidebar.dividerLocation = 200
		forms.WEB_0F_block__scrapbook_1F__sidebar.elements.bean_drag.visible = true
	}
	else {
		elements.split_sidebar.topComponent = null
		forms.WEB_0F_block__scrapbook_1F__sidebar.elements.bean_drag.visible = false
	}
}
