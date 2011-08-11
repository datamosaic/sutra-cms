/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f59"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8F3EE159-96AD-4FC8-A978-BD2ABAD1F366"}
 */
function FORM_on_load(event) {
	//hide hider
	elements.lbl_folder.visible = false
	
	//set combobox to be small on os x
	globals.CODE_property_combobox(false, 'mini')
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean} valid value
 *
 * @properties={typeid:24,uuid:"55779490-C741-4400-AE16-B8A2F16C854A"}
 */
function FLD_data_change__version_selected(oldValue, newValue, event) {
	var fsVersions = forms.WEB_0F_page__design.web_page_to_version
	
	//quick loop to select correct item
	for (var i = 1; i <= fsVersions.getSize() ; i++) {
		if (fsVersions.getRecord(i).id_version == globals.WEB_version_selected) {
			var index = i
			fsVersions.setSelectedIndex(i)
		}
	}
	
	//disable edits if edit flag not set
	if (!fsVersions.flag_edit) {
			//disable edits for active or non-latest versions
			//utils.hasRecords(fsVersions) && fsVersions.version_number != fsVersions.getSize() || fsVersions.flag_active) {
		var editAllow = false
	}
	//enable edits
	else {
		var editAllow = true
	}
	
	//show correct checkbox/edit graphics
	elements.btn_check_on.visible = (fsVersions.flag_active) ? true : false
	elements.btn_check_off.visible = (fsVersions.flag_active) ? false : true
	elements.btn_edit_on.visible = (editAllow) ? true : false
	elements.btn_edit_off.visible = (editAllow) ? false : true			
	
	forms.WEB_0F_page__design__content_1L_area.TOGGLE_elements(editAllow)
	forms.WEB_0F_page__design__content_1L_block.TOGGLE_elements(editAllow)
	forms.WEB_0F_page__design__content_1F_block_data__textarea.TOGGLE_elements(editAllow)
	
	//guiLoading is not true, need to run
//	if (!forms.WEB_0F_page__design__content_1L_block._guiLoading) {
	
	//only run when clicked on...this won't fire frequently enough, but will get around running an extra time on load 
	if (event) {
		forms.WEB_0F_page__design__content_1L_block.ACTION_gui_mode_load()
	}
	
	return true
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EDA657C6-3547-40F8-956C-5E8541E4930C"}
 */
function FORM_on_show(firstShow, event) {
	if (firstShow) {
		//set up beans 1/3 to version, 2/9 to all else, unless screen size too large, then max for small and the rest to versions
		var fullWidth = elements.lbl_display.getWidth()
		var minWidth = 140
		var smallMax = (fullWidth * 2 / 9) > minWidth
		
		//fire several times to make sure splitpanes know how big they are
		var cnt = 3
		while (cnt) {
			elements.split_picker_2.dividerLocation = smallMax ? minWidth : fullWidth * 2 / 9
			
			elements.split_picker_3.dividerLocation = smallMax ? minWidth + 10 : (fullWidth * 2 / 9 + 10)
			
			elements.split_picker_1.dividerLocation = smallMax ? minWidth * 3 : fullWidth * 2 / 3
			cnt --
			
			application.updateUI()
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
 * @returns {Boolean} valid value
 *
 * @properties={typeid:24,uuid:"538FB1A3-85D8-430B-B901-0E28D3034A2B"}
 */
function FLD_data_change__group_selected(oldValue, newValue, event) {
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"F1039A0A-6835-4375-B4F2-E1E52F672E1A"}
 */
function NEW_version(event) {
	if (utils.hasRecords(forms.WEB_0F_page__design.foundset)) {
		//show form in dialog
		application.showFormInDialog(
						forms.WEB_P_version,
						-1,-1,-1,-1,
						' ',
						true,
						false,
						'cmsSnapshot'
					)		
		
		if (forms.WEB_P_version._fidAccept) {
			var srcRecord = forms.WEB_0F_page__design.web_page_to_version.getRecord(forms.WEB_0F_page__design.web_page_to_version.getSelectedIndex())
			var destRecord = globals.CODE_record_duplicate(srcRecord,["web_version_to_area.web_area_to_block.web_block_to_block_data"])
			
			srcRecord.version_name = globals.WEB_version_name
			srcRecord.version_description = globals.WEB_version_description
			srcRecord.flag_edit = 0
			
			destRecord.version_number = srcRecord.version_number + 1
			destRecord.flag_active = null
			
			databaseManager.saveData()
			
			//update versions valuelist
			forms.WEB_0F_page__design.REC_on_select()
		}
	}
	else {
		plugins.dialogs.showErrorDialog(
					'Error',
					'No page selected'
			)
	}	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"BA841370-FC0A-41E0-9D98-98EBA4D4A9C4"}
 */
function SET_active(event) {
	//find this version
	var fsVersion = databaseManager.getFoundSet(controller.getServerName(),'web_version')
	fsVersion.find()
	fsVersion.id_version = globals.WEB_version_selected
	fsVersion.search()
	
	if (utils.hasRecords(fsVersion) && !fsVersion.flag_active) {
		var input = plugins.dialogs.showQuestionDialog(
						'Activate?',
						'Do you want to set the selected snapshot active?\nNOTE: this will make it live on the web',
						'Yes',
						'No'
				)
		
		if (input == 'Yes') {
			//set all records to be inactive
			var fsUpdater = databaseManager.getFoundSetUpdater(forms.WEB_0F_page__design.web_page_to_version)
			fsUpdater.setColumn('flag_active',0)
			fsUpdater.performUpdate()		
			
			//find this version and set it active
			fsVersion.find()
			fsVersion.id_version = globals.WEB_version_selected
			fsVersion.search()
			
			fsVersion.flag_active = 1
			fsVersion.flag_edit = 0
			
			databaseManager.saveData()
			
			//create log record when snapshot set as active
			globals.TRIGGER_log_create(
								//type of log
								'Custom',
//								//dealing with cms snapshot
//								'CMS Snapshot',
//								//id_site
//								id_site,
//								//id_page
//								id_page,
								//id_version
								globals.WEB_version_selected
							)
			
			//update valuelist stating which is active
			forms.WEB_0F_page__design.REC_on_select()
		}
	}
	else {
		plugins.dialogs.showErrorDialog(
					'Error',
					'You cannot mark this as active'
			)
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"9AE6A24D-2DA7-4DA9-BB55-E113EEC4A73F"}
 */
function EDIT_version(event) {
	//if version is not working copy, allow edits
	
	//find this version
	var fsVersion = databaseManager.getFoundSet(controller.getServerName(),'web_version')
	fsVersion.find()
	fsVersion.id_version = globals.WEB_version_selected
	fsVersion.search()
	
	if (utils.hasRecords(fsVersion)) {
		//currently editable, prompt to turn off
		if (fsVersion.flag_edit) {
			//if top of the stack and more than one snapshot and not active, refuse to proceed
			if (fsVersion.id_version == web_page_to_version.getRecord(1).id_version && web_page_to_version.getSize() > 1 && !fsVersion.flag_active) {
				plugins.dialogs.showErrorDialog(
							'Error',
							'The working copy must be editable'
					)
			}
			else {
				fsVersion.flag_edit = 0
				databaseManager.saveData()
				TOGGLE_edit()
			}
		}
		//non-editable, prompt to make editable
		else {
			if (true) {		//globals.TRIGGER_registered_action_authenticate('cms edit snapshot')) {
				if (fsVersion.flag_active) {
					var input = plugins.dialogs.showQuestionDialog(
								'Edit?',
								'Do you want to allow edits to the active snapshot?',
								'Yes',
								'No'
						)
					
					if (input != 'Yes') {
						return
					}
				}
				
				fsVersion.flag_edit = 1
				databaseManager.saveData()
				TOGGLE_edit()
			}
		}
		
		//re-toggle editable elements
		FLD_data_change__version_selected()
	}
	else {
		plugins.dialogs.showErrorDialog(
					'Error',
					'No snapshot active'
			)
	}
}

/**
 *
 * @properties={typeid:24,uuid:"967D366C-A987-411F-8344-746E8CFE5089"}
 */
function TOGGLE_edit() {
	if (utils.hasRecords(foundset)) {
		elements.btn_edit_on.visible = (web_page_to_version.flag_edit) ? true : false
		elements.btn_edit_off.visible = (web_page_to_version.flag_edit) ? false : true
	}
	else {
		elements.btn_edit_on.visible = false
		elements.btn_edit_off.visible = false
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B79D6834-10BC-4129-9197-88BDD15DBBDE"}
 */
function NEW_group(event) {
	//find out which groups are as of yet unassigned
	var allGroups = forms.WEB_0F_site.web_site_to_group
	var dsGroups = databaseManager.getDataSetByQuery(
			controller.getServerName(), 
			'SELECT DISTINCT id_group FROM web_area where id_page = ? ',
			[id_page],
			-1
		)

	//dataset is valid
	if (dsGroups && dsGroups.getMaxRowIndex()) {
		var usedGroups = dsGroups.getColumnAsArray(1)
		
//					var filterSame = function(item) {
//						var missing = true
//						for (var i = 0; i < usedGroups.length; i++) {
//							if (usedGroups[i] == item) {
//								missing = false
//							}
//						}
//						return missing
//					}
//					
//					var diffGroups = allGroups.filter(filterSame)
		
		var vlDisplay = new Array()
		var vlReal = new Array()
		for (var i = 1; i <= allGroups.getSize(); i++) {
			var recGroup = allGroups.getRecord(i)
			
			vlReal.push(recGroup.id_group)
			vlDisplay.push(recGroup.group_name)
		}
		
		//whack those that do exist
		removeExisting:
		for (var i = 0; i < vlReal.length; i++) {
			for (var j = 0; j < usedGroups.length; j++) {
				if (vlReal[i] == usedGroups[j]) {
					vlReal.splice(i,1)
					vlDisplay.splice(i,1)
					
					i--
					continue removeExisting
				}
			}
		}
		
		if (vlDisplay && vlDisplay.length) {
			//show select dialog
			var newGroup = plugins.dialogs.showSelectDialog( 
						'Select group',
						'Choose a group to duplicate the current area to',
						vlDisplay
					)
			
			//find id for selected group
			if (newGroup) {
				for (var i = 0; i < vlDisplay.length; i++) {
					if (vlDisplay[i] == newGroup) {
						newGroup = vlReal[i]
						break
					}
				}
				
				var fsArea = forms.WEB_0F_page__design__content_1L_area.foundset
				//loop over all areas and duplicate to new group
				for (var i = 1; i <= fsArea.getSize(); i++) {
					var srcRecord = fsArea.getRecord(i)
					
					var destRecord = globals.CODE_record_duplicate(srcRecord,["web_area_to_block.web_block_to_block_data"])
					
					destRecord.id_group = newGroup
					databaseManager.saveData()
				}
			
				//select the newly created group
				globals.WEB_group_selected = newGroup
				
				//repopulate valuelist
				forms.WEB_0F_page__design.SET_groups()
			}
		}
		else {
			plugins.dialogs.showErrorDialog(
						'Error',
						'There are no unassigned groups'
				)
		}
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"FA57171D-D36D-4182-9DDB-DEBD402A71C1"}
 */
function CURTAIN_block(event) {
	//click through to external link when page_link type
	if (page_type == 2 && page_link) {
		globals.CODE_url_handler(page_link)
	}
	else if (page_type == 3 && page_link_internal) {
		globals.CODE_url_handler(globals.WEB_MRKUP_link_page(page_link_internal))
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"41ACF34C-2DCE-405F-A819-5658BCFD2293"}
 */
function ACTION_copy_link(event) {
	application.setClipboardContent(globals.WEB_MRKUP_link_page(id_page)/* + 
			"&group=" + globals.WEB_group_selected +
			"&snapshot=" + globals.WEB_version_selected*/)
}
