/**
 * @properties={typeid:35,uuid:"B959CE00-5A5D-47FD-BC5B-4050B21049CE",variableType:-4}
 */
var _editMode = false;

/**
 * @properties={typeid:35,uuid:"EB4C7E20-176B-4986-AFB4-E135BBFC5172"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"C1C07757-6C1F-4833-BC03-73B4F3E725FC"}
 */
function ACTION_edit(event) {
	//toggle elements
//	elements.btn_cancel.visible = true
//	elements.btn_done.visible = true
//	elements.btn_edit.visible = false
	
	//enter edit mode
	TOGGLE_edit_mode(true)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D5876A87-E0EE-4FFD-A5A9-CEF098FDA60F"}
 */
function ACTION_cancel(event) {
	//leave edit mode without saving
	TOGGLE_edit_mode()
	
	//toggle elements
//	elements.btn_cancel.visible = false
//	elements.btn_done.visible = false
//	elements.btn_edit.visible = true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EA4BF701-A1BA-44F5-98BF-F5D550B45F0A"}
 */
function ACTION_save(event) {
	//leave edit mode and save
	TOGGLE_edit_mode(null,true)
	
	//toggle elements
//	elements.btn_cancel.visible = false
//	elements.btn_done.visible = false
//	elements.btn_edit.visible = true
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E73B27E7-8247-410F-B28F-73DB3B9A581A"}
 */
function FORM_on_load(event) {
	//hide elements not shown for default state
	elements.btn_cancel.visible = false
	elements.btn_done.visible = false
}

/**
 * @properties={typeid:24,uuid:"6DD30A2F-C575-426F-9017-EFABA1087533"}
 */
function TOGGLE_edit_mode(editMode,saveData) {
	var currentState = _editMode
	
	if (typeof editMode == 'boolean') {
		_editMode = editMode
	}
	else {
		//disable edits if edit flag not set
		if (!utils.hasRecords(forms.WEB_0F_page__design__content.foundset) || forms.WEB_0F_page__design__content.flag_lock) {
				//disable edits for active or non-latest versions
				//utils.hasRecords(fsVersions) && fsVersions.version_number != fsVersions.getSize() || fsVersions.flag_active) {
			_editMode = false
		}
		//toggle edits
		else {
			_editMode = !_editMode
		}
	}
	
	//entering edit mode
	if (_editMode) {
		//enter pseudo-transaction
		databaseManager.saveData()
		databaseManager.setAutoSave(false)
		
		//lock the screen
		globals.TRIGGER_interface_lock(true)
		
		//toggle elements
		elements.btn_cancel.visible = true
		elements.btn_done.visible = true
		elements.btn_edit.visible = false
		
		//set up storage place for all newly created blocks
		forms.WEB_0F_page__design__content_1L_block._newBlocks = new Array()
	}
	//exiting edit mode
	else if (currentState) {
		//save the data
		if (saveData) {
			//when in gui mode, save
			if (globals.WEB_page_mode == 2 && utils.hasRecords(forms.WEB_0F_page__design__content_1L_block.foundset.getSelectedRecord(),'web_scope_to_block')) {
				var recBlock = forms.WEB_0F_page__design__content_1L_block.web_scope_to_block.getSelectedRecord()
		
				if (recBlock && utils.hasRecords(recBlock.web_block_to_block_type)) {
					var recBlockType = recBlock.web_block_to_block_type.getRecord(1)
				}
				
				//this block definition exists as does the form and it has a save method on it
				if (recBlockType && forms[recBlockType.form_name] && solutionModel.getForm(recBlockType.form_name).getFormMethod('BLOCK_save')) {
					//pseudo-event comes from the scope of where this is fired
					var pseudoEvent = new Object()
					pseudoEvent.getFormName = function() {return recBlockType.form_name}
					
					forms[recBlockType.form_name].BLOCK_save(pseudoEvent)
				}
			}
			
			//update modification date on this record
			if (utils.hasRecords(forms.WEB_0F_page__design__content.foundset)) {
				forms.WEB_0F_page__design__content.rec_modified = application.getServerTimeStamp()
			}
			
			//redo valuelist for versions
			forms.WEB_0F_page__design.SET_versions(true)
			
			databaseManager.saveData()
		}
		//rollback the data if we were in edit mode
		else if (!databaseManager.getAutoSave()) {
			databaseManager.rollbackEditedRecords()
			
			//delete all newly created scope records
			if (forms.WEB_0F_page__design__content_1L_block._newBlocks instanceof Array) {
				while (forms.WEB_0F_page__design__content_1L_block._newBlocks.length) {
					var record = forms.WEB_0F_page__design__content_1L_block._newBlocks.pop()
					record.foundset.deleteRecord(record)
				}
			}
			
			//update version valuelist (if version activated, need to undo)
			forms.WEB_0F_page__design.SET_versions(true)
		}
		
		databaseManager.setAutoSave(true)
		
		//unlock the screen
		globals.TRIGGER_interface_lock(false)
		
		//toggle elements
		elements.btn_cancel.visible = false
		elements.btn_done.visible = false
		elements.btn_edit.visible = true
	}
	
	//set elements appropriately
	forms.WEB_0F_page__design__header_display__version.TOGGLE_elements()
	forms.WEB_0F_page__design__content_1L_area.TOGGLE_elements(_editMode)
	forms.WEB_0F_page__design__content_1L_block.TOGGLE_elements(_editMode)
	forms.WEB_0F_page__design__content_1F_block_data__raw.TOGGLE_elements(_editMode)
	forms.WEB_0F_page__design__properties.TOGGLE_elements(_editMode)
	forms.WEB_0F_page__design__content_1L_block.REC_on_select(null,true)
	
	//hide actions (can remove when upgrade sutra core)
	forms.WEB_0F_scrapbook__gui.elements.btn_data_actions.enabled = false
	forms.WEB_0F_scrapbook__data.elements.btn_data_actions.enabled = false
}
