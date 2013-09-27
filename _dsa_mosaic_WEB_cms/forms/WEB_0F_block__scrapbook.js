/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"EECFB2A2-AB6E-4059-B9B9-2D18C2C450CD",variableType:-4}
 */
var _skipSelect = false;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f51"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"6E70A90A-35E2-488D-92AD-0D5F99E8CEE4",variableType:-4}
 */
var _editMode = false;

/**
 *
 * @properties={typeid:24,uuid:"69CCDB89-DD7A-46C7-BF3D-F1BD0BC5BF7F"}
 * @AllowToRunInFind
 */
function REC_delete() {
	var delRec = globals.DIALOGS.showWarningDialog(
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
	//set up split pane
	SPLIT_set(false)
	
	elements.split.continuousLayout = true
	
	//MEMO: the list of blocks is shown/hidden from the page form tab controller
}

/**
 * @properties={typeid:24,uuid:"95D93344-A2EB-41E0-B6C9-E52A54EED328"}
 */
function FILTER_records(event) {
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
			
			//refire version onSelect method (disabled during record creation)
			globals.WEB_block_version = forms.WEB_P__block__new._blockID//utils.hasRecords(web_block_to_block_version__all) ? web_block_to_block_version__all.id_block_version.toString() : null
			forms.WEB_0F_block__scrapbook_1F_page__blocks_2L_block.foundset.selectRecord(application.getUUID(globals.WEB_block_version))
			REC_on_select()
			
			//enter edit mode
			forms.WEB_A__scrapbook.ACTION_edit()
			
			//refresh screen so i can put cursor into field
			application.updateUI(250)
			
			//additional request focus (at end of method stack)
			forms.WEB_0F_block__scrapbook__header.elements.fld_block_name.selectAll()
			forms.WEB_0F_block__scrapbook__header.elements.fld_block_name.requestFocus(false)
		}
	}
	else {
		globals.DIALOGS.showErrorDialog(
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
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"EDE9AF18-8F05-4163-9E69-9FF8493B92D3",variableType:-4}
 */
var _guiLoading = false;

/**
 * @properties={typeid:24,uuid:"F0920424-5B3E-405D-B476-A205F6536D03"}
 */
function ACTION_gui_mode_load() {
	//only start up this method if not already running
	if (!_guiLoading) {
		//method is beginning
		_guiLoading = true
		
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
			//clear out to blank form
			else {
				tabPanel.tabIndex = 1
			}
			
			forms.WEB_0F_block__scrapbook__header.TOGGLE_mode(null,'gui')
		}
		else {
			tabPanel.tabIndex = 1
		}
		
		//method is done
		_guiLoading = false
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
		//duplicate foundset so we don't go switching records
		fsVersions = fsVersions.duplicateFoundSet()
		
		//resort by version number desc if not already there
		if (fsVersions.getCurrentSort() != 'version_number desc') {
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
	
	if (application.__parent__.solutionPrefs && solutionPrefs.config.webClient) {
		vlDisplay = vlDisplay.map(function(item){return item.replace(/(<([^>]+)>)/ig,'')})
	}
	
	application.setValueListItems('WEB_block_version',vlDisplay,vlReal)
	
	return active
}

/**
 * @properties={typeid:24,uuid:"6A5E7546-310A-453E-850A-6E2E4DB0CC82"}
 */
function REC_refresh(allVersions, selectedVersion) {
	
	if (allVersions && selectedVersion) {
		var progressText = 'Refreshing block meta data...'
	}
	else {
		var progressText = 'Refreshing scrapbook meta data...'
	}
	
	//there is a block
	if ((allVersions && selectedVersion) || utils.hasRecords(foundset)) {
		//do we have any versions?
		var fsVersion = allVersions || web_block_to_block_version__all
		
		if (utils.hasRecords(fsVersion)) {
			//get most recent version
			if (fsVersion.getCurrentSort() != 'version_number desc') {
				var fsVersionSort = fsVersion.duplicateFoundSet()
				fsVersionSort.sort('version_number desc')
				var latestVersion = fsVersionSort.getRecord(1)
			}
			//foundset already sorted, grab top record
			else {
				var latestVersion = fsVersion.getRecord(1)
			}
			
			//get selected version if not passed in
			if (!selectedVersion) {
				selectedVersion = fsVersion.getSelectedRecord()
			}
			
			//turn on feedback indicators
			globals.WEBc_sutra_trigger('TRIGGER_progressbar_start',[null,progressText])
			globals.CODE_cursor_busy(true)
			
			//create destination block version record
			var newVersion = globals.CODE_record_duplicate(selectedVersion,[
												"web_block_version_to_block_data",
												"web_block_version_to_block_data_configure"
											])
			
			
			//set datapoints on new block version
			newVersion.id_block = selectedVersion.id_block
			newVersion.version_number = latestVersion.version_number + 1
			newVersion.version_name = null//forms.WEB_P__version._versionName
			newVersion.version_description = null//forms.WEB_P__version._versionDescription
			newVersion.flag_active = 1
			newVersion.flag_lock = 0
			
			//set datapoints on old block version
			selectedVersion.flag_active = 0
			selectedVersion.flag_lock = 1
			
			//make sure that meta data columns are in sync with current block type definition
			REC_refresh_synchronize(newVersion)
			
			databaseManager.saveData()
			
			//resort version list
			fsVersion.sort('version_number desc')
			fsVersion.setSelectedIndex(1)
			
			//turn off feedback indicators if on
			globals.CODE_cursor_busy(false)
			if (globals.WEBc_sutra_trigger('TRIGGER_progressbar_get') instanceof Array) {
				if (globals.WEBc_sutra_trigger('TRIGGER_progressbar_get')[1] == progressText) {
					globals.WEBc_sutra_trigger('TRIGGER_progressbar_stop')
				}
			}
			
			//redo content view when called from scrapbook form
			if (!allVersions) {
				REC_on_select()
			}
		}
		else {
			globals.DIALOGS.showErrorDialog(
						'Error',
						'No content version selected'
				)
		}
	}
	else {
		globals.DIALOGS.showErrorDialog(
					'Error',
					'No content selected'
			)
	}
}

/**
 * @properties={typeid:24,uuid:"6CA4A6DF-76E8-49C2-BA1D-F986D7ED7632"}
 */
function REC_refresh_synchronize(newVersion) {
// map existing data so know what to do
	var blockDataCurrent = new Object()
	var blockDataDelete = new Array()
	var blockConfigCurrent = new Object()
	var blockConfigDelete = new Array()
	
// block data
	for (var i = 1; i <= newVersion.web_block_version_to_block_data.getSize(); i++) {
		var record = newVersion.web_block_version_to_block_data.getRecord(i)
		
		blockDataCurrent[record.data_key] = record
		blockDataDelete.push(record)
	}
	
	// compare block data against template
	if (utils.hasRecords(newVersion.web_block_to_block_type)) {
		for (var i = 1; i <= newVersion.web_block_to_block_type.web_block_type_to_block_input.getSize(); i++) {
			var record = newVersion.web_block_to_block_type.web_block_type_to_block_input.getRecord(i)
			
			//this input already exists, continue
			if (blockDataCurrent[record.column_name]) {
				//remove from delete array
				blockDataDelete.splice(blockDataDelete.indexOf(blockDataCurrent[record.column_name]),1)
				continue
			}
			
			//input doesn't exist
			var input = newVersion.web_block_version_to_block_data.getRecord(newVersion.web_block_version_to_block_data.newRecord())
			input.data_key = record.column_name
			input.data_value = record.column_value
		}
	}
	
	//if anything left in delete array, whack it 
	for (var i = 0; i < blockDataDelete.length; i++) {
		blockDataDelete[i].foundset.deleteRecord(blockDataDelete[i])
	}
	
// block config data
	for (var i = 1; i <= newVersion.web_block_version_to_block_data_configure.getSize(); i++) {
		var record = newVersion.web_block_version_to_block_data_configure.getRecord(i)
		
		blockConfigCurrent[record.data_key] = record
		blockConfigDelete.push(record)
	}
	
	// compare block data against template
	if (utils.hasRecords(newVersion.web_block_to_block_type)) {
		for (var i = 1; i <= newVersion.web_block_to_block_type.web_block_type_to_block_configure.getSize(); i++) {
			var record = newVersion.web_block_to_block_type.web_block_type_to_block_configure.getRecord(i)
			
			//this input already exists, continue
			if (blockConfigCurrent[record.column_name]) {
				//remove from delete array
				blockConfigDelete.splice(blockConfigDelete.indexOf(blockConfigCurrent[record.column_name]),1)
				continue
			}
			
			//input doesn't exist
			var input = newVersion.web_block_version_to_block_data_configure.getRecord(newVersion.web_block_version_to_block_data_configure.newRecord())
			input.data_key = record.column_name
			input.data_value = record.column_value
		}
	}
	
	//if anything left in delete array, whack it 
	for (var i = 0; i < blockConfigDelete.length; i++) {
		blockConfigDelete[i].foundset.deleteRecord(blockConfigDelete[i])
	}
}

/**
 * @properties={typeid:24,uuid:"573F36C0-638A-494B-80D5-C24DD8BC1688"}
 * @AllowToRunInFind
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
	
	if (show) {
		elements.split.dividerLocation = 200
		elements.split.dividerSize = 8
		elements.split.bgcolor = '#ffffff'
	}
	else {
		elements.split.dividerLocation = 0
		elements.split.dividerSize = 0
	}
}
