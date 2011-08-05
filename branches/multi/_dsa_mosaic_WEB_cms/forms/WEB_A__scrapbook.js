/**
 * @properties={typeid:35,uuid:"8A2B5871-8938-48DF-AC6D-57FA0D4EF88C"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"7672B721-A546-4FD6-93C5-4E643BB3C08F"}
 */
function ACTION_mode(event) {
	//switch between gui and data mode
	forms.WEB_0F_scrapbook__header.TOGGLE_mode(event)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E22B7ED5-5CC9-4B8B-9234-94AE2FB5D174"}
 */
function ACTION_edit(event) {
	//enter edit mode
	TOGGLE_edit_mode(true)
}

/**
 * @properties={typeid:35,uuid:"6B48B7DF-25C0-46A1-8E67-27DE3A805002",variableType:-4}
 */
var _editMode = false;

/**
 * @properties={typeid:24,uuid:"D86AE8C3-59CF-4EFF-8906-597DB6DE7B22"}
 */
function TOGGLE_edit_mode(editMode,saveData) {
	var currentState = _editMode
	
	//passed the mode to go to
	if (typeof editMode == 'boolean') {
		_editMode = editMode
	}
	//toggle current state of edit mode
	else {
		_editMode = !_editMode
	}
	
	//no records, cannot enter edit mode
	if (_editMode && !utils.hasRecords(forms.WEB_0F_scrapbook.foundset)) {
		_editMode = false
		
		plugins.dialogs.showErrorDialog(
						'Error',
						'You must have a scrapbook in order to enter edit mode'
				)
		
		return
	}
	
	//entering edit mode
	if (_editMode) {
		//enter pseudo-transaction
		databaseManager.saveData()
		databaseManager.setAutoSave(false)
		
		//lock the screen
		globals.TRIGGER_interface_lock(true)
		
		//show actions
		forms.WEB_0F_scrapbook__gui.elements.btn_data_actions.enabled = true
		forms.WEB_0F_scrapbook__data.elements.btn_data_actions.enabled = true
		
		//enable raw data mode fields for editing
		forms.WEB_0F_page__design__content_1F_block_data__raw_2L_block_data.elements.edit_data_value.editable = true
		forms.WEB_0F_page__design__content_1F_block_data__raw_2L_block_data_configure.elements.edit_data_value.editable = true
		forms.WEB_0F_page__design__content_1F_block_data__raw_2L_block_data_response.elements.edit_data_value.editable = true
		
		//allow to rename scrapbook
		forms.WEB_0F_scrapbook__header.LBL_block_name__action()
		
		//toggle elements
		elements.btn_cancel.visible = true
		elements.btn_done.visible = true
		elements.btn_edit.visible = false
		
		//deleting
		forms.WEB_0F_scrapbook__blocks.elements.btn_add.visible = true
		forms.WEB_0F_scrapbook_1L_block.elements.btn_delete.visible = true
		forms.WEB_0F_scrapbook_1L_block_version.elements.btn_delete.visible = true
		forms.WEB_0F_scrapbook_1L_block_version.elements.fld_version_description.editable = true
		
		//enable changing the view for this block
		forms.WEB_0F_scrapbook__header.elements.fld_view.enabled = true
	}
	//exiting edit mode
	else if (currentState) {
		//save the data
		if (saveData) {
			//when in gui mode, save
			if (forms.WEB_0F_scrapbook.elements.tab_main.tabIndex == 1) {
				//load in correct gui representation for this block type
				var recScrapbook = forms.WEB_0F_scrapbook.foundset.getSelectedRecord()
		
				if (recScrapbook && utils.hasRecords(recScrapbook.web_block_to_block_type)) {
					var recBlockType = recScrapbook.web_block_to_block_type.getRecord(1)
				}
				
				//this block definition exists as does the form and it has a save method on it
				if (recBlockType && forms[recBlockType.form_name] && solutionModel.getForm(recBlockType.form_name).getFormMethod('BLOCK_save')) {
					var pseudoEvent = new Object()
					pseudoEvent.getFormName = function() {return recBlockType.form_name}
					
					forms[recBlockType.form_name].BLOCK_save(pseudoEvent)
				}
			}
			
			//update modification date on this record
			forms.WEB_0F_scrapbook.web_block_to_block_version.rec_modified = application.getServerTimeStamp()
			
			databaseManager.saveData()
		}
		//rollback the data if we were in edit mode
		else if (!databaseManager.getAutoSave()) {
			databaseManager.rollbackEditedRecords()
		}
		
		databaseManager.setAutoSave(true)
		
		//unlock the screen
		globals.TRIGGER_interface_lock(false)
		
		//hide actions
		forms.WEB_0F_scrapbook__gui.elements.btn_data_actions.enabled = false
		forms.WEB_0F_scrapbook__data.elements.btn_data_actions.enabled = false
		
		//disable raw data mode fields for editing
		forms.WEB_0F_page__design__content_1F_block_data__raw_2L_block_data.elements.edit_data_value.editable = false
		forms.WEB_0F_page__design__content_1F_block_data__raw_2L_block_data_configure.elements.edit_data_value.editable = false
		forms.WEB_0F_page__design__content_1F_block_data__raw_2L_block_data_response.elements.edit_data_value.editable = false
		
		//save scrapbook name
		forms.WEB_0F_scrapbook__header.FLD_block_name__save()
		
		//toggle elements
		forms.WEB_A__scrapbook.elements.btn_cancel.visible = false
		forms.WEB_A__scrapbook.elements.btn_done.visible = false
		forms.WEB_A__scrapbook.elements.btn_edit.visible = true
		
		//deleting
		forms.WEB_0F_scrapbook__blocks.elements.btn_add.visible = false
		forms.WEB_0F_scrapbook_1L_block.elements.btn_delete.visible = false
		forms.WEB_0F_scrapbook_1L_block_version.elements.btn_delete.visible = false
		forms.WEB_0F_scrapbook_1L_block_version.elements.fld_version_description.editable = false
		
		//disable changing the view for this block
		forms.WEB_0F_scrapbook__header.elements.fld_view.enabled = false
		
		//set elements appropriately (can remove when update sutra core)
		forms.WEB_0F_page__design__header_display__version.TOGGLE_elements()
		forms.WEB_0F_page__design__content_1L_area.TOGGLE_elements(_editMode)
		forms.WEB_0F_page__design__content_1L_block.TOGGLE_elements(_editMode)
		forms.WEB_0F_page__design__content_1F_block_data__raw.TOGGLE_elements(_editMode)
		forms.WEB_0F_page__design__properties.TOGGLE_elements(_editMode)
		forms.WEB_0F_page__design__content_1L_block.REC_on_select(null,true)
	}
	
	//redo the screen
	forms.WEB_0F_scrapbook.REC_on_select()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B21EE2B3-F723-4BFE-B687-9F5B5C7EE33F"}
 */
function ACTION_cancel(event) {
	//leave edit mode without saving
	TOGGLE_edit_mode()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"28631ED4-D06D-490B-B2C5-E02ED4C529A7"}
 */
function ACTION_save(event) {
	//leave edit mode and save
	TOGGLE_edit_mode(null,true)
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E7077024-9767-4C11-A162-35D84FD43186"}
 */
function FORM_on_load(event) {
	//hide elements not shown for default state
	elements.btn_cancel.visible = false
	elements.btn_gui.visible = false
	elements.btn_done.visible = false
}
