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
				'Do you really want to delete this record?',
				'Yes',
				'No'
			)
	
	if (delRec == 'Yes') {
		//find all scope records and flag them with missing data?
		
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
			
			//refresh screen so i can put cursor into field
			application.updateUI(100)
			
			//set name of this block
			forms.WEB_0F_scrapbook__header.LBL_block_name__action()
			
			//additional request focus (at end of method stack)
			forms.WEB_0F_scrapbook__header.elements.fld_block_name.selectAll()
			forms.WEB_0F_scrapbook__header.elements.fld_block_name.requestFocus(false)
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
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"5281F4B0-6AF6-4782-A3D0-48C4F05F8828"}
 */
function FORM_on_show(firstShow, event) {
//	//hide bean lines on resource tabpanel forms
//	forms.WEB_0F_page__design__content_1F_block_data.elements.lbl_lefthand.visible = false
//	forms.WEB_0F_page__design__content_1F_block_data__raw.elements.lbl_lefthand.visible = false
//	
//	//show tabpanel bordering
//	forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.setBorder('SpecialMatteBorder,0.0,1.0,3.0,1.0,#647B95,#A1B0CF,#A1B0CF,#A1B0CF,0.0,')
//	forms.WEB_0F_page__design__content_1F_block_data__raw.elements.tab_detail.setBorder('SpecialMatteBorder,0.0,1.0,3.0,1.0,#647B95,#A1B0CF,#A1B0CF,#A1B0CF,0.0,')
	
//	//go to gui mode first
//	if (!firstShow) {
//		forms.WEB_0F_scrapbook__header.TOGGLE_mode(null,'gui')
//	}

	//make sure right things are showing
	if (firstShow) {
		forms.WEB_0F_scrapbook__header.TOGGLE_elements()
	}

	if (!utils.hasRecords(foundset)) {
		REC_on_select()
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"69B72F68-C6D4-4949-BEA5-2C2C8058CCE2"}
 */
function ACTION_edit_toggle(event,noSave) {
	if (event instanceof JSEvent) {
		var cancel = utils.stringPatternCount(event.getElementName(),'cancel')
		
		event = new Object()
		event.getFormName = function() {return controller.getName()}
	}
	
	if (!_editMode) {
		//enter pseudo-transaction
		databaseManager.saveData()
		databaseManager.setAutoSave(false)
		
		_editMode = true
		
//		elements.lbl_edit.text = 'Done'
//		elements.btn_edit.toolTipText = 'Click when finished editing'
			
//		forms.WEB_0F_scrapbook__header.elements.lbl_edit.text = 'd o n e'
//		forms.WEB_0F_scrapbook__header.elements.btn_edit.toolTipText = 'Click when finished editing'
		
		forms.WEB_0F_scrapbook__gui.elements.btn_data_actions.enabled = true
		forms.WEB_0F_scrapbook__data.elements.btn_data_actions.enabled = true
		
		//enable raw data mode fields for editing
		forms.WEB_0F_page__design__content_1F_block_data__raw_2L_block_data.elements.edit_data_value.editable = true
		forms.WEB_0F_page__design__content_1F_block_data__raw_2L_block_data_configure.elements.edit_data_value.editable = true
		forms.WEB_0F_page__design__content_1F_block_data__raw_2L_block_data_response.elements.edit_data_value.editable = true
		
		//allow to rename scrapbook
		forms.WEB_0F_scrapbook__header.LBL_block_name__action()
		
		//toggle elements
		forms.WEB_A__scrapbook.elements.btn_cancel.visible = true
		forms.WEB_A__scrapbook.elements.btn_done.visible = true
		forms.WEB_A__scrapbook.elements.btn_edit.visible = false
		
		//deleting
		forms.WEB_0F_scrapbook_1L_block_version.elements.btn_delete.visible = true
		forms.WEB_0F_scrapbook_1L_block_version.elements.fld_version_description.editable = true
	}
	else {
		//punch down the save button when not cancelled
		if (utils.hasRecords(foundset) && !cancel && !noSave) {
			//save the data
			databaseManager.saveData()
			
			//when in gui mode, save
			if (forms.WEB_0F_scrapbook.elements.tab_main.tabIndex == 1) {
				//load in correct gui representation for this block type
				var recScrapbook = foundset.getSelectedRecord()
		
				if (recScrapbook && utils.hasRecords(recScrapbook.web_block_to_block_type)) {
					var recBlockType = recScrapbook.web_block_to_block_type.getRecord(1)
				}
				
				//this block definition exists as does the form and it has a save method on it
				if (recBlockType && forms[recBlockType.form_name] && solutionModel.getForm(recBlockType.form_name).getFormMethod('BLOCK_save')) {
					forms[recBlockType.form_name].BLOCK_save(event)
				}
			}
		}
		//cancelled
		else if (cancel) {
			databaseManager.rollbackEditedRecords()
		}
		
		databaseManager.setAutoSave(true)
		
		_editMode = false
//		elements.lbl_edit.text = 'Edit'
//		elements.btn_edit.toolTipText = 'Click to begin editing...'
		
//		forms.WEB_0F_scrapbook__header.elements.lbl_edit.text = 'e d i t'
//		forms.WEB_0F_scrapbook__header.elements.btn_edit.toolTipText = 'Click to begin editing...'
		
		forms.WEB_0F_scrapbook__gui.elements.btn_data_actions.enabled = false
		forms.WEB_0F_scrapbook__data.elements.btn_data_actions.enabled = false
		
		forms.WEB_0F_page__design__content_1F_block_data__raw_2L_block_data.elements.edit_data_value.editable = false
		forms.WEB_0F_page__design__content_1F_block_data__raw_2L_block_data_configure.elements.edit_data_value.editable = false
		forms.WEB_0F_page__design__content_1F_block_data__raw_2L_block_data_response.elements.edit_data_value.editable = false
		
		forms.WEB_0F_scrapbook__header.FLD_block_name__save()
		
		//toggle elements
		forms.WEB_A__scrapbook.elements.btn_cancel.visible = false
		forms.WEB_A__scrapbook.elements.btn_done.visible = false
		forms.WEB_A__scrapbook.elements.btn_edit.visible = true
		
		//deleting
		forms.WEB_0F_scrapbook_1L_block_version.elements.btn_delete.visible = false
		forms.WEB_0F_scrapbook_1L_block_version.elements.fld_version_description.editable = false
	}
	
	//when toggled from the button or cancelled, redo the screen
	if (event || noSave) {
		REC_on_select()
	}
}

/**
 * @properties={typeid:24,uuid:"E5591A6B-12A1-4292-8A9A-446A59112031"}
 */
function REC_on_select(event) {
	if (!_skipSelect) {
		var fsPages = forms.WEB_0F_scrapbook_1L_page.foundset
		
		if (utils.hasRecords(foundset)) {
			//when record selection changes as opposed to when called programatically
			if (event) {
				//get pages where this block is used
				var query = "SELECT DISTINCT id_page FROM web_platform WHERE id_platform IN \
				(SELECT DISTINCT id_platform FROM web_version WHERE id_version IN \
					(SELECT DISTINCT id_version FROM web_area WHERE id_area IN \
						(SELECT DISTINCT id_area FROM web_scope WHERE id_block = ?)))"
				var dataset = databaseManager.getDataSetByQuery(
							'sutra_cms',
							query,
							[id_block.toString()],
							-1
						)
				
				//load correct pages that this is used on
				fsPages.loadRecords(dataset)
			}
		}
		else {
			fsPages.clear()	
		}
		
		//set versions
		var activeVersion = SET_versions()
		
		//put into non-editable mode when called from actual record selection
		//TODO: there is probably an issue here with it not saving the old record
		if (_editMode && event) {
			ACTION_edit_toggle(event)
		}
		
		//update version global for combobox (see forms.WEB_0F_scrapbook_1L_block_version.REC_on_select)
		if (forms.WEB_0F_scrapbook__sidebar.elements.tab_detail.tabIndex != 1) {
			globals.WEB_block_version = utils.hasRecords(web_block_to_block_version__all) ? web_block_to_block_version__all.id_block_version.toString() : null
		}
		
		//if edits aren't allowed, disable edit button
//		elements.lbl_edit.enabled = ACTION_edit_get()
		
		//status of the edit
		forms.WEB_0F_scrapbook__header.TOGGLE_elements()
		
		//load correct gui form
		ACTION_gui_mode_load()
	}
}

/**
 * @properties={typeid:24,uuid:"F0920424-5B3E-405D-B476-A205F6536D03"}
 */
function ACTION_gui_mode_load() {
	//load in correct gui representation for this block type
	var recScrapbook = foundset.getSelectedRecord()
	var contextForm = 'WEB_0F_scrapbook__gui'
	var tabPanel = forms[contextForm].elements.tab_detail
	
	if (recScrapbook && utils.hasRecords(recScrapbook.web_block_to_block_type)) {
		var recBlockType = recScrapbook.web_block_to_block_type.getRecord(1)
	}
	
	//this block definition exists as does the form and we're in gui mode
	if (recBlockType && forms[recBlockType.form_name] && elements.tab_main.tabIndex == 1) {
		//edits allowed
		if (_editMode) {
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
		
		forms.WEB_0F_scrapbook__header.TOGGLE_mode(null,'gui')
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
	if (!utils.hasRecords(web_block_to_block_version__all) || !web_block_to_block_version__all.flag_edit) {
		var editAllow = false
	}
	//enable edits
	else {
		var editAllow = true
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
			else if (i == 1) {
				displayVal += 'Working copy'
			}
			
			if (i > 1 || recVersion.flag_active) {
				displayVal += 'Version ' + recVersion.version_number + ' (' + globals.CODE_date_format(recVersion.rec_modified,'current') + ')'
				
				if (recVersion.version_name) {
					displayVal += ': ' + recVersion.version_name
				}
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
function FOUNDSET_restrict(returnContent, returnSite, noSutra, scrapbookScope) {
	//get parent form
	var formStack = controller.getFormContext()
	
	//this form is included on some other form
	if (formStack.getMaxRowIndex() > 1) {
		var formParent = formStack.getValue(formStack.getMaxRowIndex()-1,2)
	}
		
	//return what scope to find records in
	if (returnContent) {
		return scrapbookScope
	}
	//scope to site unless on install scope
	else if (returnSite && scrapbookScope != 3) {
		return utils.hasRecords(forms.WEB_0F_site.foundset) ? forms.WEB_0F_site.id_site : null
	}
	//when no data sutra, still try to work
	else if (noSutra) {
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
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"B6058009-92CF-486A-A193-0B1CB44C736B"}
 */
function FORM_on_hide(event) {
//	//show bean lines on resource tabpanel forms
//	forms.WEB_0F_page__design__content_1F_block_data.elements.lbl_lefthand.visible = true
//	forms.WEB_0F_page__design__content_1F_block_data__raw.elements.lbl_lefthand.visible = true
//	
//	//hide tab panel bordering
//	forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.setBorder('SpecialMatteBorder,0.0,0.0,0.0,0.0,#647B95,#A1B0CF,#A1B0CF,#A1B0CF,0.0,')
//	forms.WEB_0F_page__design__content_1F_block_data__raw.elements.tab_detail.setBorder('SpecialMatteBorder,0.0,0.0,0.0,0.0,#647B95,#A1B0CF,#A1B0CF,#A1B0CF,0.0,')
	
	return true
}

/**
 * @properties={typeid:24,uuid:"CB7E7C07-4E17-4542-B7BE-B59820F4E885"}
 */
function SPLIT_set(show) {
	elements.split_sidebar.topComponent	= elements.tab_blocks
	elements.split_sidebar.bottomComponent = elements.tab_versions
	
	if (show) {
		elements.split_sidebar.dividerLocation = 200
		forms.WEB_0F_scrapbook__sidebar.elements.bean_drag.visible = true
	}
	else {
		elements.split_sidebar.topComponent = null
		forms.WEB_0F_scrapbook__sidebar.elements.bean_drag.visible = false
	}
}
