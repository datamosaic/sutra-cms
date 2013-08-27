/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f31"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"03CAC318-572E-4E23-BC3E-ECA968E7D7E7",variableType:4}
 */
var _editLocation = 0;

/**
 * @properties={typeid:35,uuid:"B0EEAB05-9BF7-4E41-B5E3-519BB7278576",variableType:-4}
 */
var _dataRec = null;

/**
 * Block ID being edited
 * @type {String}
 *
 * @properties={typeid:35,uuid:"CE5D34A7-41F1-4B14-A923-B7CB21F02EAE"}
 */
var _dataID = null;

/**
 * Scope ID for block being edited (where is the block connected to)
 * @type {String}
 *
 * @properties={typeid:35,uuid:"98C55605-13F3-4259-943B-A0C220ECF124"}
 */
var _scopeID = null;

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4763A94A-B219-4DB9-95AF-311329BA5A23"}
 */
function FORM_on_show(firstShow, event) {
	var contextForm = controller.getName()
	var tabPanel = forms[contextForm].elements.tab_edit
	
	var recBlock = foundset.getSelectedRecord()
			
	if (recBlock) {
		//TODO: remove!
		//is this a scrapbook
		if (recBlock.scope_type) {
			globals.DIALOGS.showWarningDialog(
						'Warning',
						'Scrapbooks cannot be edited when in real mode.'
					)
			
			return false
		}
		
		if (recBlock && utils.hasRecords(recBlock.web_block_to_block_type)) {
			var recBlockType = recBlock.web_block_to_block_type.getRecord(1)
		}
		
		//check to make sure the active block version is editable
		var flagEdit = forms.WEB_0F_page.ACTION_edit_get() && utils.hasRecords(recBlock,'web_block_to_block_version') && !recBlock.web_block_to_block_version.flag_lock
		
		//this block definition exists
		if (recBlockType) {
			var formName = recBlockType.form_name
			
			//set heading for this tab panel
			forms[contextForm].elements.lbl_banner.text = (recBlockType.block_name || 'Unnamed') + ' block'
			
			//the form exists and it isn't in the currently selected tab
			if (formName && forms[formName] && formName != tabPanel.getTabFormNameAt(tabPanel.tabIndex)) {
				//check this form to see if even anything to edit
				var smForm = solutionModel.getForm(formName)
				var allElems = smForm.getComponents()
				var hasFields = false
				allElems.forEach(function(item) {
					if (item.displayType) {
						hasFields = true
					}
				})
				
				if (!hasFields) {
					return false
				}
				
				//load tab panel
				tabPanel.addTab(forms[formName])
				tabPanel.tabIndex = tabPanel.getMaxTabIndex()
				
				//force the gui to update
				if (solutionModel.getForm(formName) && solutionModel.getForm(formName).getFormMethod('INIT_data')) {
					if (forms[formName].foundset) {
						forms[formName].foundset.loadRecords(foundset)
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
					}
					
					forms[formName].INIT_data()
				}
			}
			else {
				//clear out to blank form	//TODO: should probably be error message that form isn't included properly
				tabPanel.tabIndex = 1
			}
			
			return true
		}
		else {
			//alert that form not loaded in correctly
			return false
		}
	}
	else {
		//alert that form not loaded in correctly
		return false
	}
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean} allow hide
 *
 * @properties={typeid:24,uuid:"863A9ABA-9B3F-496A-BAFF-D9CC605DEE47"}
 */
function ACTION_hide(event) {
	
	globals.CODE_cursor_busy(true)
	
	//split pane in main window
	forms.WEB_0F_page__browser.SPLIT_set(false)
	elements.tab_edit.removeAllTabs()
	
	//refresh the browser bean
	forms.WEB_0F_page__browser.URL_update(true)
	
	//wiggle window by 1px to force refresh
	var mainWindow = application.getWindow()
	mainWindow.setSize(mainWindow.getWidth(), mainWindow.getHeight() - 1)
	mainWindow.setSize(mainWindow.getWidth(), mainWindow.getHeight() + 1)
	
	globals.CODE_cursor_busy(false)
	
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"68ED3839-F777-4C5A-9092-B58E93601221"}
 */
function ACTION_location(event) {
	switch (event.getElementName()) {
		//in bottom mode, flip to side
		case 'btn_orient_bottom':
			elements.btn_orient_bottom.visible = false
			elements.btn_orient_side.visible = true
			
			_editLocation = 1
			
			break
		//in side mode, flip to bottom
		case 'btn_orient_side':
			elements.btn_orient_bottom.visible = true
			elements.btn_orient_side.visible = false
			
			_editLocation = 0
			
			break			
	}
	
	forms.WEB_0F_page__browser.SPLIT_set(true)
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4E166179-724D-4F8A-9C28-DC8E646D8CC1"}
 */
function FORM_on_load(event) {
	elements.btn_orient_side.visible = false
}

/**
 *
 * @properties={typeid:24,uuid:"C8433090-6B03-449E-8D51-2FF01609A566"}
 */
function GET_modify() {
	//there is data to be edited
	if (_dataRec && utils.hasRecords(_dataRec.web_block_data_to_block) && utils.hasRecords(_dataRec.web_block_data_to_block.web_block_to_block_display)) {
		//type of data, set different tab active to edit
		switch (_dataRec.web_block_data_to_block.web_block_to_block_type.block_name) {
			//tinymce
			case 'Content':
				return forms.WEB_0F__content.elements.btn_save.enabled
			
			default:
			case false:
				
				break
		}
	}
}
