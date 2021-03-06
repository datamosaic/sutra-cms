/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D072FE06-F043-40B1-BC91-16FC59C25141"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"AEC789AF-347B-4B45-9CF4-42A388F12E85"}
 */
function FORM_on_load(event) {
	//set combobox to be small on os x
	globals.CODE_property_combobox(false, 'mini')
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"07B455FB-6F16-47FA-A87C-1B033E822CD1"}
 */
function FORM_on_show(firstShow, event) {
	elements.fld_block_name.visible = false
	elements.lbl_block_name.visible = false
	elements.lbl_display.visible = true
	
	//make sure correct things turned on first time this form is viewed
	if (firstShow) {
		TOGGLE_elements()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"EFFE2C50-EF5F-4E81-89D2-E53352F68CEF"}
 */
function TOGGLE_elements() {
	if (utils.hasRecords(foundset)) {
		//set active button to correct state
		var flagActive = web_block_to_block_version__all.flag_active ? true : false
		elements.btn_check_on.visible = flagActive
		elements.btn_check_off.visible = !flagActive
		
		//set edit button to correct state
		var flagLock = web_block_to_block_version__all.flag_lock ? true : false
		
		elements.btn_lock_on.visible = flagLock
		elements.btn_lock_off.visible = !flagLock
		
		//set actions wheelies
		forms.WEB_0F_block__scrapbook_1F__gui.elements.btn_data_actions.enabled = forms.WEB_0F_block__scrapbook._editMode
		forms.WEB_0F_block__scrapbook_1F__data.elements.btn_data_actions.enabled = forms.WEB_0F_block__scrapbook._editMode
	}
	else {
		//set active button to correct state
		elements.btn_check_on.visible = false
		elements.btn_check_off.visible = true
		
		//set edit button to correct state
		elements.btn_lock_on.visible = false
		elements.btn_lock_off.visible = true
		
		//set actions wheelies
		forms.WEB_0F_block__scrapbook_1F__gui.elements.btn_data_actions.enabled = false
		forms.WEB_0F_block__scrapbook_1F__data.elements.btn_data_actions.enabled = false
	}
}

/**
 * @properties={typeid:24,uuid:"B1DFF93B-E2A2-4719-9873-32A7B0D4232D"}
 */
function LBL_block_name__action() {
	elements.fld_block_name.visible = true
	elements.lbl_block_name.visible = true
	elements.lbl_display.visible = false
	
//	elements.fld_block_name.requestFocus(false)
}

/**
 * Handle focus element loosing focus.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"B2FD8CB6-90D1-4DB3-8B4E-A7C20E09A89F"}
 */
function FLD_block_name__save(event) {
	elements.fld_block_name.visible = false
	elements.lbl_block_name.visible = false
	elements.lbl_display.visible = true
	
	return true
}

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"DB559203-AC24-45A2-A583-C0284CAE558C",variableType:-4}
 */
var _guiLoading = false;

/**
 * @properties={typeid:24,uuid:"37F654F0-FF9E-4F8B-BAEA-D7B2665F308C"}
 */
function TOGGLE_mode(event,mode) {
	if (mode || event.getElementName()) {
		mode = mode || event.getElementName().split('_')[1]
		
		//go to gui if not already there
		if (mode == 'gui' && forms.WEB_0F_block__scrapbook.elements.tab_main.tabIndex != 1) {
			
			//show correct data buttons
			forms.WEB_A__scrapbook.elements.btn_data.visible = true
			forms.WEB_A__scrapbook.elements.btn_gui.visible = false
			
			forms.WEB_0F_block__scrapbook.elements.tab_main.tabIndex = 1
			
			//refire rec on select if called from a (pseudo)event
			if (event) {
				forms.WEB_0F_block__scrapbook.REC_on_select()
			}
		}
		//go to data if not already there
		else if (mode == 'data' && forms.WEB_0F_block__scrapbook.elements.tab_main.tabIndex != 2) {
			//if we're in edit mode, exit
			if (forms.WEB_0F_block__scrapbook._editMode) {
				//TODO: track down edit mode
//				forms.WEB_0F_block__scrapbook.ACTION_edit_toggle(event)
			}
			
			forms.WEB_0F_block__scrapbook.elements.tab_main.tabIndex = 2
			
			//show correct data buttons
			forms.WEB_A__scrapbook.elements.btn_data.visible = false
			forms.WEB_A__scrapbook.elements.btn_gui.visible = true
		}
	}
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"49F53A53-FD82-4D47-BAD0-0D08C7593803"}
 */
function FLD_version__data_change(oldValue, newValue, event) {
	//trigger on select
	forms.WEB_0F_block__scrapbook_1F__sidebar_2L_block_version.foundset.selectRecord(application.getUUID(newValue))
	
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"41B1CA43-A985-4FA2-A028-B590248E3160"}
 */
function ACTION_duplicate(event) {
	//there is a block
	if (utils.hasRecords(foundset)) {
		//do we have any versions?
		var fsVersion = web_block_to_block_version__all
		
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
			
			//get selected version
			var selectedVersion = fsVersion.getSelectedRecord()
			
			//show form in dialog
			globals.CODE_form_in_dialog(
							forms.WEB_P__version__block,
							-1,-1,-1,-1,
							' ',
							true,
							false,
							'cmsBlockVersion'
						)		
			
			if (forms.WEB_P__version__block._fidAccept) {
				//turn on feedback indicators
				var progressText = 'Creating new version...'
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
				newVersion.version_name = forms.WEB_P__version__block._versionName
				newVersion.version_description = forms.WEB_P__version__block._versionDescription
				newVersion.flag_active = null
				newVersion.flag_lock = 0
				
				//set datapoints on old block version
				selectedVersion.flag_lock = 1
				
				databaseManager.saveData(newVersion)
				
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
				
				//redo content view
				forms.WEB_0F_block__scrapbook.REC_on_select()
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
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0B7443CA-CD8A-4DA7-85CB-65E580BFE0BF"}
 */
function ACTION_activate(event) {
	var selectedVersion = web_block_to_block_version__all.getSelectedRecord()
	
	switch (event.getElementName()) {
		case 'btn_check_on':
			selectedVersion.flag_active = 0
			databaseManager.saveData(selectedVersion)
			
			//redo version valuelist and update all elements
			forms.WEB_0F_block__scrapbook.REC_on_select(event)
			TOGGLE_elements()
			
			break
		case 'btn_check_off':
			var fsVersion = web_block_to_block_version__all
			if (utils.hasRecords(fsVersion) && !selectedVersion.flag_active) {
//				var input = globals.DIALOGS.showQuestionDialog(
//								'Activate?',
//								'Activating this version will make it live on the web if the page is published.\nContinue?',
//								'Yes',
//								'No'
//						)
				var input = 'Yes'
				if (input == 'Yes') {
					//set all records to be inactive
					for (var i = 1; i <= fsVersion.getSize(); i++) {
						fsVersion.getRecord(i).flag_active = 0
					}
					
					//set selected version as active
					selectedVersion.flag_active = 1
					selectedVersion.flag_lock = 1
					
					databaseManager.saveData()
					
					//create log record when version set as active
					globals.WEBc_log_create('scrapbook','scrapbook version activated',forms.WEB_0F_site.id_site,'web_block',selectedVersion.id_block,'web_block_version',selectedVersion.id_block_version)
					
					//redo version valuelist and update all elements
					forms.WEB_0F_block__scrapbook.REC_on_select()
					TOGGLE_elements()
				}
			}
			else {
				globals.DIALOGS.showErrorDialog(
							'Error',
							'You cannot mark this as active'
					)
			}
			break
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"AB987B67-2BEB-416D-8975-14FB58AF42EA"}
 */
function ACTION_lock(event) {
	//find this version
	var version = web_block_to_block_version__all.getSelectedRecord()
	
	if (version) {
		//currently editable, prompt to turn off
		if (!version.flag_lock) {
//			//if top of the stack and more than one version and not active, refuse to proceed
//			if (forms.WEB_0F_page__design_1F_version.foundset.getSelectedIndex() == 1 && forms.WEB_0F_page__design_1F_version.foundset.getSize() > 1 && !version.flag_active) {
//				globals.DIALOGS.showErrorDialog(
//							'Error',
//							'The working copy must be editable'
//					)
//			}
//			else {
				version.flag_lock = 1
//				databaseManager.saveData(version)
//			}
		}
		//non-editable, prompt to make editable
		else {
			if (globals.WEBc_sutra_trigger('TRIGGER_registered_action_authenticate',['cms edit block version'])) {
				if (version.flag_active) {
					var input = globals.DIALOGS.showQuestionDialog(
								'Edit?',
								'Do you want to allow edits to the active version?',
								'Yes',
								'No'
						)
					
					if (input != 'Yes') {
						return
					}
				}
				
				version.flag_lock = 0
//				databaseManager.saveData(version)
			}
			else {
				globals.DIALOGS.showErrorDialog(
							'Insufficient access',
							'You are not allowed to change the editability of a scrapbook'
					)
			}
		}
		
		//update the edit button
		TOGGLE_elements()
		
		//redo version valuelist without touching the foundset
		forms.WEB_0F_block__scrapbook.REC_on_select()
	}
	else {
		globals.DIALOGS.showErrorDialog(
					'Error',
					'No version active'
			)
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"070C9D4F-3BD7-42B2-9880-42EDFDAC65F6"}
 */
function TOGGLE_edit(event) {
	//switch modes
	forms.WEB_0F_block__scrapbook.ACTION_edit_toggle(event)
}
