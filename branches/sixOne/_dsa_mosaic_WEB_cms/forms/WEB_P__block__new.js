/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"9D831A70-C8CC-47D2-AA16-62C3DF71093C"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"8AFFF4F0-4E67-4D20-9052-BC413C3A7667"}
 */
var _search = null;

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"658ECA76-12FB-4935-96EC-E3210C1DB583",variableType:-4}
 */
var _success = false;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"FC3CD649-29A4-47F3-ABE1-DECC13F777FE",variableType:4}
 */
var _scope = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B2836A0B-B9E9-4B7F-A4BF-4B815CCC5E94"}
 */
var _areaID = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D1A3FA4E-6361-4889-9A11-742B137EBBCB"}
 */
var _blockID = null;

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
 * @AllowToRunInFind
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
	
	ACTION_search()
	
	return true
}

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"7763A650-5938-48BD-8252-6B21A0FFFA94",variableType:-4}
 */
var _calledFrom = false;

/**
 * @param {JSEvent} event the event that triggered the action
 * 
 * @properties={typeid:24,uuid:"6B93DF03-DE1C-4104-A956-D2A4D99E1B59"}
 * @AllowToRunInFind
 */
function ACTION_ok(event) {
	//set flag to copy scrapbook instead of connecting it
	if (event && event.getElementName() == 'btn_copy') {
		var copyScrapbook = true
	}
	
	function closeFID() {
		//enable closing the form
		globals.CODE_hide_form = 1
		
		//close it
		globals.CODE_form_in_dialog_close('cmsBlockNew')
	}
	
	//not already ok to close, continue
	if (!globals.CODE_hide_form) {
		
		//get parent form
		var formStack = forms.WEB_0F_block__scrapbook.controller.getFormContext()
		
		//this form is included on some other form
		if (formStack.getMaxRowIndex() > 1) {
			var formParent = formStack.getValue(formStack.getMaxRowIndex()-1,2)
			var fsBlock = forms[formParent].foundset
		}
		if (!formParent || formParent == 'WEB_0F_page__design') {
			var fsBlock = databaseManager.getFoundSet('sutra_cms','web_block')
		}
		
		//get what is chosen (scrapbook)
		if (globals.WEB_block_scope__new) {
			
			//something chosen
			if (utils.hasRecords(forms.WEB_P__block__new_1L_block.foundset)) {
				closeFID()
				
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
							forms.WEB_0F_block__scrapbook._skipSelect = true
							forms.WEB_0F_block__scrapbook_1F__sidebar_2L_block_version._skipSelect = true
							
							//choose context where to create scrapbook
//							var fsBlock = forms[formParent].foundset
							
							var blockRec = fsBlock.getRecord(fsBlock.newRecord(true,true))
							blockRec.block_name = scrapbookRec.block_name + ' (copy)'
							
							_blockID = blockRec.id_block.toString()
							
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
							forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = true
							
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
								var fsScope = forms.WEB_0F_page__design_1F_version_2L_scope.foundset
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
							forms.WEB_0F_block__scrapbook_1F__sidebar_2L_block_version._skipSelect = false
							forms.WEB_0F_block__scrapbook._skipSelect = false
						}
						//resume normal operations for page
						else {
							forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = false
						}
						
						databaseManager.saveData()
					}
					// connect selected scrapbook
					else {
						//turn off rec on select
						forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = true
						
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
							var fsScope = forms.WEB_0F_page__design_1F_version_2L_scope.foundset
							var scopeRec = fsScope.getRecord(fsScope.newRecord(false,true))
							
							scopeRec.row_order = fsScope.getSize()
							databaseManager.saveData(scopeRec)
						}
						
						//disale/enable rec on select on the block type forms when creating scope
						globals.WEB_block_on_select = true
						
						scopeRec.id_block = scrapbookRec.id_block
						
						//resume normal operations for page
						forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = false
						
						databaseManager.saveData()
					}
				}
			}
			else {
				globals.DIALOGS.showErrorDialog(
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
				closeFID()
				
				var blockTypeRec = forms.WEB_P__block__new_1L_block_type.foundset.getSelectedRecord()
				var blockDisplayRec = utils.hasRecords(blockTypeRec.web_block_type_to_block_display__default) ? blockTypeRec.web_block_type_to_block_display__default.getSelectedRecord() : {}
				
				//called from theme form
				if (_calledFrom == 'Theme') {
					// create editable default record
					var fsEditableDefault = forms.WEB_0F_theme_1L_editable_default.foundset
					var record = fsEditableDefault.getRecord(fsEditableDefault.newRecord(false, true))
					record.id_block_type = blockTypeRec.id_block_type
					record.id_block_display = blockTypeRec.client_id_block_display
					record.row_order = fsEditableDefault.getSize()
					databaseManager.saveData(record)
				}
				//called from page form
				else {
					
					//create block record on scrapbook form
					if (_calledFrom == 'Scrapbook') {
						//turn off rec on select
						forms.WEB_0F_block__scrapbook._skipSelect = true
						forms.WEB_0F_block__scrapbook_1F__sidebar_2L_block_version._skipSelect = true
						
						//choose context where to create scrapbook
//						var fsBlock = forms[formParent].foundset
						
						var blockRec = fsBlock.getRecord(fsBlock.newRecord(true,true))
						
						_blockID = blockRec.id_block.toString()
						
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
						forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = true
						
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
							var fsScope = forms.WEB_0F_page__design_1F_version_2L_scope.foundset
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
					blockVersionRec.id_block_display = blockTypeRec.client_id_block_display
					databaseManager.saveData(blockVersionRec)
					
					databaseManager.saveData(blockRec)
					
					// create a block data record for each data point
					if (utils.hasRecords(blockRec,'web_block_to_block_type.web_block_type_to_block_input')) {
						for (var i = 1; i <= blockRec.web_block_to_block_type.web_block_type_to_block_input.getSize(); i++) {
							var blockInputRec = blockRec.web_block_to_block_type.web_block_type_to_block_input.getRecord(i)
							
							var blockDataRec = blockVersionRec.web_block_version_to_block_data.getRecord(blockVersionRec.web_block_version_to_block_data.newRecord(false, true))
							blockDataRec.data_key = blockInputRec.column_name
							blockDataRec.data_value = blockInputRec.column_value
							
							databaseManager.saveData(blockInputRec)
						}
					}
					
					// create a block data configure record for each data point
					if (utils.hasRecords(blockRec,'web_block_to_block_type.web_block_type_to_block_configure')) {
						for (var i = 1; i <= blockRec.web_block_to_block_type.web_block_type_to_block_configure.getSize(); i++) {
							var configTemplate = blockVersionRec.web_block_to_block_type.web_block_type_to_block_configure.getRecord(i)
							
							var blockConfigRec = blockVersionRec.web_block_version_to_block_data_configure.getRecord(blockVersionRec.web_block_version_to_block_data_configure.newRecord(false, true))
							blockConfigRec.data_key = configTemplate.column_name
							blockConfigRec.data_value = configTemplate.column_value
							
							databaseManager.saveData(blockConfigRec)
						}
					}
					
					
					// finish up
					blockVersionRec.web_block_version_to_block_data.setSelectedIndex(1)
					blockVersionRec.web_block_version_to_block_data_configure.setSelectedIndex(1)
					
					//resume normal operations for scrapbook
					if (_calledFrom == 'Scrapbook') {
						forms.WEB_0F_block__scrapbook_1F__sidebar_2L_block_version._skipSelect = false
						forms.WEB_0F_block__scrapbook._skipSelect = false
					}
					//resume normal operations for page
					else {
						forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = false
					}
					
					databaseManager.saveData()
				}
			}
			else {
				globals.DIALOGS.showErrorDialog(
							'Error',
							'No block chosen'
					)
				return
			}
		}
		
		//save data
		databaseManager.saveData()
		
		//a record was created
		_success = blockRec
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
		
		globals.CODE_form_in_dialog_close('cmsBlockNew')
	}
}

/**
 *
 * @properties={typeid:24,uuid:"66AE2E3A-567C-4B68-BA0F-CDBF20F6EA04"}
 */
function FORM_on_show() {
	globals.CODE_hide_form = 0
	
	_success = false
	_blockID = null
	
	var fsBlockType = forms.WEB_P__block__new_1L_block_type.foundset
	
	//reset to block types and select content
	globals.WEB_block_scope__new = 0
	_search = null
	var results = ACTION_search()
	
	if (results) {
		//sort by block type
		fsBlockType.sort('block_name asc')
		
		for (var i = 1; i <= fsBlockType.getSize(); i++) {
			var record = fsBlockType.getRecord(i)
			
			//prefill default view for each block type
			record.client_id_block_display = record.web_block_type_to_block_display__default.id_block_display
			
			//highlight content block
			if (record.block_name == 'Content') {
				fsBlockType.setSelectedIndex(i)
			}
		}
	}
	
	elements.tab_detail.tabIndex = 1
	
	//show correct buttons
	TOGGLE_buttons()
	
	//only show combobox when called from page or theme
	if (_calledFrom == 'Real' || _calledFrom == 'GUI' || _calledFrom == 'Theme') {
		elements.lbl_scope.visible = true
		elements.fld_scope.visible = true
		
		//only move search box if not in correct place
		if (elements.lbl_search.getLocationY() != 63) {
			elements.lbl_search.setLocation(elements.lbl_search.getLocationX(), 63)
			elements.var_search.setLocation(elements.var_search.getLocationX(), 63)
		}
		
		//only move tabpanel if it's been moved before
		if (elements.tab_detail.getLocationY() != 90) {
			elements.tab_detail.setLocation(0, 90)
			elements.tab_detail.setSize(elements.tab_detail.getWidth(),elements.tab_detail.getHeight() - 25)
		}
	}
	//hide combobox
	else {
		elements.lbl_scope.visible = false
		elements.fld_scope.visible = false
		
		//only move search box if not in correct place
		if (elements.lbl_search.getLocationY() != 38) {
			elements.lbl_search.setLocation(elements.lbl_search.getLocationX(), 38)
			elements.var_search.setLocation(elements.var_search.getLocationX(), 38)
		}
		
		//only move tabpanel if it's not here yet
		if (elements.tab_detail.getLocationY() != 65) {
			elements.tab_detail.setLocation(0, 65)
			elements.tab_detail.setSize(elements.tab_detail.getWidth(),elements.tab_detail.getHeight() + 25)
		}
	}
	
	//page is not an option when on theme
	if (_calledFrom == 'Theme') {
		var vlDisplay = ['Unique','Site','Install']
		var vlReal = [0,2,3]
	}
	else {
		var vlDisplay = ['Unique','Page','Site','Install']
		var vlReal = [0,1,2,3]
	}
	application.setValueListItems('WEB_scope_type',vlDisplay,vlReal)
	
	elements.var_search.requestFocus(false)
	
	//somehow bind enter to accept whatever selection is chosen
//	plugins.window.createShortcut('ENTER',forms.WEB_P__block__new.ACTION_ok,'WEB_P__block__new')
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

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4ED1E729-218B-428E-8F5D-1F1DE6EF2893"}
 * @AllowToRunInFind
 */
function ACTION_search(event) {
	//finding on block types
	if (globals.WEB_block_scope__new == 0) {
		var fs = forms.WEB_P__block__new_1L_block_type.foundset
		
		//load up everything
		fs.loadAllRecords()
		
		//restrict based on search criteria, site, and availability
		fs.find()
		fs.id_site = forms.WEB_0F_site.id_site
		fs.flag_unavailable = '^='
		if (_search) {
			fs.block_name = '%' + _search + '%'
		}
		var results = fs.search(false,true)
	}
	//finding within scrapbooks
	else if (globals.WEB_block_scope__new) {
		var fs = forms.WEB_P__block__new_1L_block.foundset
		
		//load up everything
		fs.loadAllRecords()
		
		//restrict based on search criteria
		fs.find()
		fs.scope_type = globals.WEB_block_scope__new
		if (_search) {
			fs.block_name = '%' + _search + '%'
		}
		//find correct records
		switch (globals.WEB_block_scope__new) {
			case 1: //scope to current page unless empty foundset, then clear
				fs.id_page = utils.hasRecords(forms.WEB_0F_page.foundset) ? forms.WEB_0F_page.id_page : application.getUUID()
				break
			case 2: //scope to current site unless empty foundset, then clear
				fs.id_site = utils.hasRecords(forms.WEB_0F_site.foundset) ? forms.WEB_0F_site.id_site : application.getUUID()
				break
		}
		var results = fs.search(false,true)
	}
	
	//re-enter the search field
	if (event instanceof java.awt.event.KeyEvent) {
		elements.var_search.requestFocus(false)
	}
	//return results
	else {
		return results
	}
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A94FD046-59AF-4B54-AC04-2E6261F9C982"}
 */
function FORM_on_load(event) {
	if (plugins.keyListeners) {
		plugins.keyListeners.addKeyListener(elements.var_search, ACTION_search, 'keyPressed')
	}
}

/**
 * Callback method when form is destroyed.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D81E5E28-BD64-4781-8555-7FB7D565B535"}
 */
function FORM_on_unload(event) {
	if (plugins.keyListeners) {
		plugins.keyListeners.removeKeyListener(elements.var_search)
	}
}