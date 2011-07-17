/**
 * @properties={typeid:35,uuid:"FC3CD649-29A4-47F3-ABE1-DECC13F777FE",variableType:4}
 */
var _scope = null;

/**
 * @properties={typeid:35,uuid:"B2836A0B-B9E9-4B7F-A4BF-4B815CCC5E94"}
 */
var _areaID = null;

/**
 * @properties={typeid:35,uuid:"9D831A70-C8CC-47D2-AA16-62C3DF71093C"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"9315BD82-99D4-4F0E-980B-A8A3EC282A6D"}
 */
function FLD_scope__data_change(oldValue, newValue, event) {
	//show scrapbooks
	if (newValue) {
		elements.tab_detail.tabIndex = 2
		globals.WEB_block_scope = newValue
	}
	//create new block
	else {
		elements.tab_detail.tabIndex = 1
	}
	
	return true
}

/**
 * @properties={typeid:35,uuid:"7763A650-5938-48BD-8252-6B21A0FFFA94",variableType:-4}
 */
var _calledFrom = false;

/**
 * @properties={typeid:24,uuid:"6B93DF03-DE1C-4104-A956-D2A4D99E1B59"}
 */
function ACTION_ok(event) {
	var webEdit
	
	//not already ok to close, cancel
	if (!globals.CODE_hide_form) {
		//get what is chosen (scrapbook)
		if (_scope) {
			//something chosen
			if (utils.hasRecords(forms.WEB_P__block__new_1L_block.foundset)) {
				var blockRec = forms.WEB_P__block__new_1L_block.foundset.getSelectedRecord()
			}
			else {
				plugins.dialogs.showErrorDialog(
							'Error',
							'No block chosen'
					)
				return
			}
		}
		//get block type to create from
		else {
			//something chosen
			if (utils.hasRecords(forms.WEB_P__block__new_1L_block_type.foundset)) {
				var blockTypeRec = forms.WEB_P__block__new_1L_block_type.foundset.getSelectedRecord()
				var blockDisplayRec = utils.hasRecords(blockTypeRec.web_block_type_to_block_display__default) ? blockTypeRec.web_block_type_to_block_display__default.getSelectedRecord() : {}
				
				//called from theme form
				if (_calledFrom == 'Theme') {
					// create editable default record
					var fsEditableDefault = forms.WEB_0F_theme_1L_editable_default.foundset
					var record = fsEditableDefault.getRecord(fsEditableDefault.newRecord(false, true))
					record.id_block_type = blockTypeRec.id_block_type
					record.id_block_display = blockDisplayRec.id_block_display
					record.row_order = fsEditableDefault.getSize()
					databaseManager.saveData(record)
				}
				//called from page form
				else {
				
					//turn off rec on select
					forms.WEB_0F_page__design__content_1L_block._skipSelect = true
					
					//disale/enable rec on select on the block type forms when creating scope
					globals.WEB_block_on_select = false
					
					//create scope record in real mode
					if (_calledFrom == 'Real') {
						var fsScope = databaseManager.getFoundSet('sutra_cms','web_scope')
						var scopeRec = fsScope.getRecord(fsScope.newRecord(false,true))
						
						fsScope.find()
						fsScope.id_area = _areaID
						fsScope.search()
						
						scopeRec.id_area = _areaID
						scopeRec.row_order = fsScope.getSize() + 1
						databaseManager.saveData(scopeRec)
					}
					//create scope record in gui mode
					else if (_calledFrom == 'GUI') {
						var fsScope = forms.WEB_0F_page__design__content_1L_block.foundset
						var scopeRec = fsScope.getRecord(fsScope.newRecord(false,true))
						
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
					blockVersionRec.id_block_type = blockTypeRec.id_block_type
					blockVersionRec.id_block_display = blockDisplayRec.id_block_display
					databaseManager.saveData(blockVersionRec)
					
					// create a block data record for each data point
					if (utils.hasRecords(blockRec,'web_block_to_block_type.web_block_type_to_block_input')) {
						for (var i = 1; i <= blockRec.web_block_to_block_type.web_block_type_to_block_input.getSize(); i++) {
							var blockInputRec = blockRec.web_block_to_block_type.web_block_type_to_block_input.getRecord(i)
							
							var blockDataRec = blockVersionRec.web_block_version_to_block_data.getRecord(blockVersionRec.web_block_version_to_block_data.newRecord(false, true))
							record.data_key = blockInputRec.column_name
							
							databaseManager.saveData(blockInputRec)
						}
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
					forms.WEB_0F_page__design__content_1L_block._skipSelect = false
					
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
				plugins.dialogs.showErrorDialog(
							'Error',
							'No block chosen'
					)
				return
			}
		}
		
		//save data
		databaseManager.saveData()
		
		//enaable closing the form
		globals.CODE_hide_form = 1
		
		application.closeFormDialog('cmsBlockNew')
	}
}

/**
 *
 * @properties={typeid:24,uuid:"F4AD3FFB-4880-4F6E-90C3-64A0C375ABA9"}
 */
function ACTION_cancel() {
	//not already ok to close, cancel
	if (!globals.CODE_hide_form) {
		//enaable closing the form
		globals.CODE_hide_form = 1
		
		application.closeFormDialog('cmsBlockNew')
	}
}

/**
 *
 * @properties={typeid:24,uuid:"66AE2E3A-567C-4B68-BA0F-CDBF20F6EA04"}
 */
function FORM_on_show() {
	globals.CODE_hide_form = 0
	
	//reset to block types
	_scope = 0
	elements.tab_detail.tabIndex = 1
}
