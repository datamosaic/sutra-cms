/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f51"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"6E70A90A-35E2-488D-92AD-0D5F99E8CEE4",variableType:4}
 */
var _editMode = 0;

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
	//find stuff for the selected site
	if (utils.hasRecords(forms.WEB_0F_site.foundset)) {
		foundset.find()
		foundset.id_site = forms.WEB_0F_site.id_site
		var results = foundset.search()
	}
	else {
		foundset.clear()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"81BCE4C0-7411-4947-8D02-0A5025D053CD"}
 */
function REC_new() {
	if (utils.hasRecords(forms.WEB_0F_site.foundset)) {
		//no records created yet and interface locked
		if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow) {
			globals.WEB_lock_workflow(false)
		}
		
		controller.newRecord(true)
		id_site = forms.WEB_0F_site.id_site
		elements.fld_scrapbook_name.requestFocus(false)
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
	if (!utils.hasRecords(foundset)) {
		globals.WEB_lock_workflow(true)
	}
	
	//update display if the GUI has been used elsewhere
	if (!firstShow && elements.tab_detail.tabIndex == 1) {
		REC_on_select()
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
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E5591A6B-12A1-4292-8A9A-446A59112031"}
 */
function REC_on_select(event) {
	var fsPages = forms.WEB_0F_scrapbook_1L_page.foundset
	
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
			if (solutionModel.getForm(recBlockType.form_name).getFormMethod('LOADER_init')) {
				var hasInit = true
			}
			
			//there is a custom form to show
			if (hasInit) {
				forms[recBlockType.form_name].LOADER_init(
													recScrapbook.web_scrapbook_to_scrapbook_data,
													flagEdit,
													false,
													controller.getName()
												)
				TAB_change(null,'tab_d1')
			}
			//something not right, show default form
			else {
				if (elements.tab_detail.getMaxTabIndex() == 2) {
					elements.tab_detail.removeTabAt(1)
					elements.tab_detail.addTab(forms.CODE__blank,null,null,null,null,null,null,null,0)
				}
				TAB_change(null,'tab_d2')
			}
		}
		else {
			if (elements.tab_detail.getMaxTabIndex() == 2) {
				elements.tab_detail.removeTabAt(1)
				elements.tab_detail.addTab(forms.CODE__blank,null,null,null,null,null,null,null,0)
			}
			TAB_change(null,'tab_d2')
		}
		
		//load correct pages that this is used on
		fsPages.find()
		fsPages.web_page_to_area__allversions.web_area_to_block.id_scrapbook = id_scrapbook
		var results = fsPages.search()
	}
	else {
		fsPages.clear()
	}
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
