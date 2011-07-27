/**
 * @properties={typeid:35,uuid:"658ECA76-12FB-4935-96EC-E3210C1DB583",variableType:-4}
 */
var _success = false;

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
	if (utils.stringToNumber(newValue)) {
		var fsBlock = forms.WEB_P__block__new_1L_block.foundset
		
		fsBlock.find()
		fsBlock.scope_type = globals.WEB_block_scope__new
		
		//find correct records
		switch (globals.WEB_block_scope__new) {
			case 1: //scope to current page unless empty foundset, then clear
				fsBlock.id_page = utils.hasRecords(forms.WEB_0F_page.foundset) ? forms.WEB_0F_page.id_page : application.getUUID()
				break
			case 2: //scope to current site unless empty foundset, then clear
				fsBlock.id_site = utils.hasRecords(forms.WEB_0F_site.foundset) ? forms.WEB_0F_site.id_site : application.getUUID()
				break
		}
		
		var results = fsBlock.search()
		
		elements.tab_detail.tabIndex = 2
		
		TOGGLE_buttons()
	}
	//create new block
	else if (elements.tab_detail.tabIndex != 1) {
		elements.tab_detail.tabIndex = 1
		
		TOGGLE_buttons()
	}
	
	return true
}

/**
 * @properties={typeid:35,uuid:"7763A650-5938-48BD-8252-6B21A0FFFA94",variableType:-4}
 */
var _calledFrom = false;

/**
 * @param {JSEvent} event the event that triggered the action
 * 
 * @properties={typeid:24,uuid:"6B93DF03-DE1C-4104-A956-D2A4D99E1B59"}
 */
function ACTION_ok(event) {
	//set flag to copy scrapbook instead of connecting it
	if (event && event.getElementName() == 'btn_copy') {
		var copyScrapbook = true
	}
	
	//not already ok to close, cancel
	if (!globals.CODE_hide_form) {
		//get parent form
		var formStack = forms.WEB_0F_scrapbook.controller.getFormContext()
		
		//this form is included on some other form
		if (formStack.getMaxRowIndex() > 1) {
			var formParent = formStack.getValue(formStack.getMaxRowIndex()-1,2)
		}
		else {
			var formParent = 'WEB_0F_scrapbook'
		}
		
		//get what is chosen (scrapbook)
		if (globals.WEB_block_scope__new) {
			
			//something chosen
			if (utils.hasRecords(forms.WEB_P__block__new_1L_block.foundset)) {
				var scrapbookRec = forms.WEB_P__block__new_1L_block.foundset.getSelectedRecord()
				
				//called from theme form, connect
				if (_calledFrom == 'Theme') {
					// create editable default record
					var fsEditableDefault = forms.WEB_0F_theme_1L_editable_default.foundset
					var record = fsEditableDefault.getRecord(fsEditableDefault.newRecord(false, true))
					
					record.id_block = scrapbookRec.id_block
					record.id_block_type = scrapbookRec.id_block_type
					record.id_block_display = scrapbookRec.id_block_display
					record.row_order = fsEditableDefault.getSize()
					databaseManager.saveData(record)
				}
				//called from page or scrapbook form
				else {
					// unhook the scrapbook and make a copy of the active version
					if (copyScrapbook) {
						
						//create block record on scrapbook form
						if (_calledFrom == 'Scrapbook') {
							//turn off rec on select
							forms.WEB_0F_scrapbook._skipSelect = true
							forms.WEB_0F_scrapbook_1L_block_version._skipSelect = true
							
							//choose context where to create scrapbook
							var fsBlock = forms[formParent].foundset
							
							var blockRec = fsBlock.getRecord(fsBlock.newRecord(true,true))
							blockRec.block_name = scrapbookRec.block_name + ' (copy)'
							
							//fill in the scope
							blockRec.scope_type = globals.WEB_block_scope
							if (globals.WEB_block_scope == 1) {
								blockRec.id_page = forms.WEB_0F_page.id_page
							}
							else if (globals.WEB_block_scope == 2) {
								blockRec.id_site = forms.WEB_0F_site.id_site
							}
						}
						//create scope and block on page form
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
								
								scopeRec.row_order = fsScope.getSize()
								databaseManager.saveData(scopeRec)
							}
							
							//disale/enable rec on select on the block type forms when creating scope
							globals.WEB_block_on_select = true
							
							var fsBlock = databaseManager.getFoundSet('sutra_cms','web_block')
							var blockRec = fsBlock.getRecord(fsBlock.newRecord(false,true))
							
							scopeRec.id_block = blockRec.id_block
						}
						
						//create first block version record
						var blockVersionRec = blockRec.web_block_to_block_version__all.getRecord(blockRec.web_block_to_block_version__all.newRecord(false,true))
						blockVersionRec.flag_active = 1
						blockVersionRec.version_number = 1
						blockVersionRec.version_name = 'Initial version'
						blockVersionRec.version_description = 'Copied: ' + application.getValueListDisplayValue('WEB_scope_type',globals.WEB_block_scope) + ' content\n' +
							'"' + scrapbookRec.block_name + '", version ' + scrapbookRec.web_block_to_block_version.version_number + '\n' +
							'ID: ' + scrapbookRec.id_block.toString()
						blockVersionRec.id_block_type = scrapbookRec.id_block_type
						blockVersionRec.id_block_display = scrapbookRec.id_block_display
						databaseManager.saveData(blockVersionRec)
						
						databaseManager.saveData(blockRec)
						
						// copy block data records
						if (utils.hasRecords(scrapbookRec,'web_block_to_block_version.web_block_version_to_block_data')) {
							for (var i = 1; i <= scrapbookRec.web_block_to_block_version.web_block_version_to_block_data.getSize(); i++) {
								var scrapbookDataRec = scrapbookRec.web_block_to_block_version.web_block_version_to_block_data.getRecord(i)
								
								var blockDataRec = blockVersionRec.web_block_version_to_block_data.getRecord(blockVersionRec.web_block_version_to_block_data.newRecord(false, true))
								blockDataRec.data_key = scrapbookDataRec.data_key
								blockDataRec.data_value = scrapbookDataRec.data_value
								
								databaseManager.saveData(blockDataRec)
							}
						}
						
						// copy block data configure records
						if (utils.hasRecords(scrapbookRec,'web_block_to_block_version.web_block_version_to_block_data_configure')) {
							for (var i = 1; i <= scrapbookRec.web_block_to_block_version.web_block_version_to_block_data_configure.getSize(); i++) {
								var scrapbookConfigaRec = scrapbookRec.web_block_to_block_version.web_block_version_to_block_data_configure.getRecord(i)
								
								var blockConfigRec = blockVersionRec.web_block_version_to_block_data_configure.getRecord(blockVersionRec.web_block_version_to_block_data_configure.newRecord(false, true))
								blockConfigRec.data_key = scrapbookConfigaRec.data_key
								blockConfigRec.data_value = scrapbookConfigaRec.data_value
								
								databaseManager.saveData(blockConfigRec)
							}
						}
						
						// finish up
						blockVersionRec.web_block_version_to_block_data.setSelectedIndex(1)
						blockVersionRec.web_block_version_to_block_data_configure.setSelectedIndex(1)
						
						//resume normal operations for scrapbook
						if (_calledFrom == 'Scrapbook') {
							forms.WEB_0F_scrapbook_1L_block_version._skipSelect = false
							forms.WEB_0F_scrapbook._skipSelect = false
						}
						//resume normal operations for page
						else {
							forms.WEB_0F_page__design__content_1L_block._skipSelect = false
						}
						
						databaseManager.saveData()
					}
					// connect selected scrapbook
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
							
							scopeRec.row_order = fsScope.getSize()
							databaseManager.saveData(scopeRec)
						}
						
						//disale/enable rec on select on the block type forms when creating scope
						globals.WEB_block_on_select = true
						
						scopeRec.id_block = scrapbookRec.id_block
						
						//resume normal operations for page
						forms.WEB_0F_page__design__content_1L_block._skipSelect = false
						
						databaseManager.saveData()
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
					
					//create block record on scrapbook form
					if (_calledFrom == 'Scrapbook') {
						//turn off rec on select
						forms.WEB_0F_scrapbook._skipSelect = true
						forms.WEB_0F_scrapbook_1L_block_version._skipSelect = true
						
						//choose context where to create scrapbook
						var fsBlock = forms[formParent].foundset
						
						var blockRec = fsBlock.getRecord(fsBlock.newRecord(true,true))
						
						//fill in the scope
						blockRec.scope_type = globals.WEB_block_scope
						if (globals.WEB_block_scope == 1) {
							blockRec.id_page = forms.WEB_0F_page.id_page
						}
						else if (globals.WEB_block_scope == 2) {
							blockRec.id_site = forms.WEB_0F_site.id_site
						}
					}
					//create scope and block on page form
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
							
							scopeRec.row_order = fsScope.getSize()
							databaseManager.saveData(scopeRec)
						}
						
						//disale/enable rec on select on the block type forms when creating scope
						globals.WEB_block_on_select = true
						
						var fsBlock = databaseManager.getFoundSet('sutra_cms','web_block')
						var blockRec = fsBlock.getRecord(fsBlock.newRecord(false,true))
						
						scopeRec.id_block = blockRec.id_block
					}
					
					//create first block version record
					var blockVersionRec = blockRec.web_block_to_block_version__all.getRecord(blockRec.web_block_to_block_version__all.newRecord(false,true))
					blockVersionRec.flag_active = 1
					blockVersionRec.version_number = 1
					blockVersionRec.version_name = 'Initial version'
					blockVersionRec.id_block_type = blockTypeRec.id_block_type
					blockVersionRec.id_block_display = blockDisplayRec.id_block_display
					databaseManager.saveData(blockVersionRec)
					
					databaseManager.saveData(blockRec)
					
					// create a block data record for each data point
					if (utils.hasRecords(blockRec,'web_block_to_block_type.web_block_type_to_block_input')) {
						for (var i = 1; i <= blockRec.web_block_to_block_type.web_block_type_to_block_input.getSize(); i++) {
							var blockInputRec = blockRec.web_block_to_block_type.web_block_type_to_block_input.getRecord(i)
							
							var blockDataRec = blockVersionRec.web_block_version_to_block_data.getRecord(blockVersionRec.web_block_version_to_block_data.newRecord(false, true))
							blockDataRec.data_key = blockInputRec.column_name
							
							databaseManager.saveData(blockInputRec)
						}
					}
					
					// create a block data configure record for each data point
					if (utils.hasRecords(blockRec,'web_block_to_block_type.web_block_type_to_block_configure')) {
						for (var i = 1; i <= blockRec.web_block_to_block_type.web_block_type_to_block_configure.getSize(); i++) {
							var configTemplate = blockVersionRec.web_block_to_block_type.web_block_type_to_block_configure.getRecord(i)
							
							var blockConfigRec = blockVersionRec.web_block_version_to_block_data_configure.getRecord(blockVersionRec.web_block_version_to_block_data_configure.newRecord(false, true))
							blockConfigRec.data_key = configTemplate.column_name
							
							databaseManager.saveData(blockConfigRec)
						}
					}
					
					// finish up
					blockVersionRec.web_block_version_to_block_data.setSelectedIndex(1)
					blockVersionRec.web_block_version_to_block_data_configure.setSelectedIndex(1)
					
					//resume normal operations for scrapbook
					if (_calledFrom == 'Scrapbook') {
						forms.WEB_0F_scrapbook_1L_block_version._skipSelect = false
						forms.WEB_0F_scrapbook._skipSelect = false
					}
					//resume normal operations for page
					else {
						forms.WEB_0F_page__design__content_1L_block._skipSelect = false
					}
					
					databaseManager.saveData()
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
		
		//a record was created
		_success = blockRec
		
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
	
	_success = false
	
	//reset to block types and select content
	globals.WEB_block_scope__new = 0
	for (var i = 1; i <= forms.WEB_P__block__new_1L_block_type.foundset.getSize(); i++) {
		var record = forms.WEB_P__block__new_1L_block_type.foundset.getRecord(i)
		
		if (record.block_name == 'Content') {
			forms.WEB_P__block__new_1L_block_type.foundset.setSelectedIndex(i)
			break
		}
	}
	elements.tab_detail.tabIndex = 1
	
	//show correct buttons
	TOGGLE_buttons()
}

/**
 * @properties={typeid:24,uuid:"47AD4A6B-0726-46D2-8BB6-15F58561C055"}
 */
function TOGGLE_buttons() {
	//when on scrapbook tabs, copy/connect; otherwise ok
	var okShow = elements.tab_detail.tabIndex == 1 ? true : false
	
	elements.btn_ok.visible = okShow
	elements.btn_connect.visible = !okShow
	elements.btn_copy.visible = !okShow
	
	//when adding to scrapbook, hide connect and only show copy
	if (!okShow) {
		if (_calledFrom == 'Scrapbook') {
			elements.btn_connect.visible = false
			elements.btn_copy.setLocation(application.getWindowWidth('cmsBlockNew') - 80, elements.btn_copy.getLocationY())
		}
		else {
			elements.btn_copy.setLocation(application.getWindowWidth('cmsBlockNew') - 150, elements.btn_copy.getLocationY())
		}
	}
	
	//called from theme form, copy not an option
	if (_calledFrom == 'Theme') {
		elements.btn_copy.visible = false
	}
}
