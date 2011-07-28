/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8EFEBE94-C1C1-43E9-8EE2-E3A5DE27CAAB"}
 */
function FORM_on_load(event) {
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
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"1A839919-BFA6-430E-B101-41D09279345A"}
 */
function FLD_version__data_change(oldValue, newValue, event) {
	//our uuids are byte[] and i can't convert back to uuid, so here's a hacky way to figure out which version we're on

	//compare value in global with valuelist
	var dataset = application.getValueListItems('WEB_page_version')
	var vlReal = dataset.getColumnAsArray(2)
	for (var i = 0; i < vlReal.length; i++) {
		if (vlReal[i] == newValue) {
			break
		}
	}
	
	//match found
	var displayVal = dataset.getValue(i + 1,1)
	
	//use display value to track down actual record
	if (displayVal == 'Working copy') {
		var ver = forms.WEB_0F_page__design__content.foundset.getSize()
	}
	else {
		var ver = utils.stringToNumber(utils.stringMiddle(displayVal,utils.stringPosition(displayVal,'Version ',0,1) + 8,utils.stringPosition(displayVal,'(',0,1) - utils.stringPosition(displayVal,'Version ',0,1) - 8))
	}

	//assumption here is that foundset is in sync with this valuelist (convert version to reverse ordered record list)
	forms.WEB_0F_page__design__content.foundset.setSelectedIndex(forms.WEB_0F_page__design__content.foundset.getSize() - ver + 1)
	
	//update display and reload version valuelist; don't reload versions foundset
	forms.WEB_0F_page__design.REC_on_select(null,true)
	
	return true
}

/**
 * @properties={typeid:24,uuid:"F7FCCB63-BE93-49DB-A292-873DD6399A16"}
 */
function TOGGLE_elements() {
	//show correct checkbox/edit graphics
	elements.btn_check_on.visible = (forms.WEB_0F_page__design__content.flag_active) ? true : false
	elements.btn_check_off.visible = (forms.WEB_0F_page__design__content.flag_active) ? false : true
	elements.btn_edit_on.visible = (forms.WEB_0F_page__design__content.flag_edit) ? true : false
	elements.btn_edit_off.visible = (forms.WEB_0F_page__design__content.flag_edit) ? false : true
			
	//toggle enabled state of combobox based on value
	if (application.getValueListDisplayValue('WEB_page_version',null) == '<html><body>Click <strong>+</strong> button to create a version') {
		elements.fld_version.enabled = false
//		elements.btn_check_off.enabled = false
//		elements.btn_edit_off.enabled = false
//		elements.btn_remove.enabled = false
	}
	else {
		elements.fld_version.enabled = true
//		elements.btn_check_off.enabled = true
//		elements.btn_edit_off.enabled = true
//		elements.btn_remove.enabled = true
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"3EDEB7C9-1778-4C96-ABF2-A5F21035BF98"}
 */
function ADD_version(event) {
	//there is a page
	if (utils.hasRecords(forms.WEB_0F_page__design.foundset)) {
		//do we have any versions?
		var fsVersion = forms.WEB_0F_page__design__content.foundset
		
		if (utils.hasRecords(fsVersion)) {
			//get most recent and selected versions
			var latestVersion = fsVersion.getRecord(1)
			var selectedVersion = fsVersion.getSelectedRecord()
			
			//show form in dialog
			application.showFormInDialog(
							forms.WEB_P_version,
							-1,-1,-1,-1,
							' ',
							true,
							false,
							'cmsVersionDupe'
						)		
			
			if (forms.WEB_P_version._fidAccept) {
				//turn on feedback indicators
				var progressText = 'Creating new version...'
				globals.TRIGGER_progressbar_start(null,progressText)
				globals.CODE_cursor_busy(true)
				
				//duplicate selectedVersion and put at top of stack
				var destVersion = fsVersion.getRecord(fsVersion.duplicateRecord(fsVersion.getSelectedIndex(),true,true))
				//manually duplicating all records because depending on type of block, may not need to be duplicated
				for (var i = 1; i <= selectedVersion.web_version_to_area.getSize(); i++) {
					//grab this area and duplicate it
					var srcArea = selectedVersion.web_version_to_area.getRecord(i)
					var destArea = destVersion.web_version_to_area.getRecord(destVersion.web_version_to_area.newRecord(false,true))
					databaseManager.copyMatchingColumns(srcArea,destArea)
					
					//go through scopes
					for (var j = 1; j <= srcArea.web_area_to_scope.getSize(); j++) {
						var srcScope = srcArea.web_area_to_scope.getRecord(j)
						var destScope = destArea.web_area_to_scope.getRecord(destArea.web_area_to_scope.newRecord(false,true))
						databaseManager.copyMatchingColumns(srcScope,destScope)
						
						//there is a block attached to this scope
						if (utils.hasRecords(srcScope.web_scope_to_block)) {
							var srcBlock = srcScope.web_scope_to_block.getRecord(1)
							
							//block is a scrapbook, don't duplicate
							if (srcBlock.scope_type) {
								//don't need to do anything as the copyMatchingColumns in scope already hooked it up
							}
							//block is unique, duplicate
							else {
								//create new block record
								var fsBlock = databaseManager.getFoundSet('sutra_cms','web_block')
								var destBlock = fsBlock.getRecord(fsBlock.newRecord(false,true))
								
								//re-hook this unique block back in to the current scope
								destScope.id_block = destBlock.id_block
								
								//get source block version
								var srcBlockVer = srcBlock.web_block_to_block_version.getRecord(1)
								
								//create destination block version record
								var destBlockVer = globals.CODE_record_duplicate(srcBlockVer,[
																	"web_block_version_to_block_data",
																	"web_block_version_to_block_data_configure"
																])
								
								//set datapoints on new block version
								destBlockVer.id_block = destBlock.id_block
								destBlockVer.flag_active = 1
								destBlockVer.version_number = 1
							}
						}
					}
				}
				
				//disable edits on old version
				if (selectedVersion.flag_edit) {
					selectedVersion.flag_edit = 0
				}
				
				//save down information for new version
				destVersion.version_name = forms.WEB_P_version._versionName
				destVersion.version_description = forms.WEB_P_version._versionDescription
				destVersion.version_number = latestVersion.version_number + 1
				destVersion.flag_active = null
				destVersion.flag_edit = 1
				globals.WEB_page_version = destVersion.id_version
				
				databaseManager.saveData()
				
				//update versions valuelist
				forms.WEB_0F_page__design.REC_on_select(null,null,1)
				
				//set selected index
				forms.WEB_0F_page__design__content_1L_area.foundset.setSelectedIndex(1)
				forms.WEB_0F_page__design__content_1L_block.foundset.setSelectedIndex(1)
				
				//turn off feedback indicators if on
				globals.CODE_cursor_busy(false)
				if (globals.TRIGGER_progressbar_get() instanceof Array) {
					if (globals.TRIGGER_progressbar_get()[1] == progressText) {
						globals.TRIGGER_progressbar_stop()
					}
				}
			}
		}
		else {
			//do we have all page-level records
			var platformRec = forms.WEB_0F_page__design__header_display__platform._platform.getSelectedRecord()
			var languageRec = forms.WEB_0F_page__design__header_display__language._language.getSelectedRecord()
			var groupRec = forms.WEB_0F_page__design__header_display__group._group.getSelectedRecord()
			
			var validPlatform = platformRec && platformRec.id_site_platform.toString() == globals.WEB_page_platform
			var validLanguage = languageRec && languageRec.id_site_language.toString() == globals.WEB_page_language
			var validGroup = groupRec && groupRec.id_site_group.toString() == globals.WEB_page_group
			
			var dialogText = ''
			
			if (!validPlatform) {
				dialogText += 'platform'
			}
			if (!validLanguage) {
				if (dialogText.length) {
					dialogText += ', '
					var multi = true
				}
				dialogText += 'language'
			}
			if (!validGroup) {
				if (dialogText.length) {
					dialogText += ', '
					var multi = true
				}
				dialogText += 'group'
			}
			
			if (dialogText.length) {
				dialogText = 'Add selected ' + dialogText + ' record' + (multi ? 's' : '') + ' and create new version?'
			}
			else {
				dialogText = 'Create new version?'
			}
			
			var input = plugins.dialogs.showQuestionDialog(
							'Empty version stack',
							dialogText,
							'Yes',
							'No'
					)
			
			if (input == 'Yes') {
				//prompt for which version to copy from
				application.showFormInDialog(
								forms.WEB_P_page__version,
								-1,-1,-1,-1,
								' ',
								true,
								false,
								'cmsVersionNew'
							)		
				
				if (forms.WEB_P_page__version._fidAccept) {
					//turn on feedback indicators
					var progressText = 'Creating new version...'
					globals.TRIGGER_progressbar_start(null,progressText)
					globals.CODE_cursor_busy(true)
					
					var selectedVersion = forms.WEB_P_page__version._fsVersion.getRecord(forms.WEB_P_page__version._posnVersion)
					
					var info = ''
					//create prerequisite page-level records
					if (!validPlatform) {
						info += forms.WEB_0F_page__design__header_display__platform.CREATE_platform(selectedVersion)
					}
					if (!validLanguage) {
						info += forms.WEB_0F_page__design__header_display__language.CREATE_language(selectedVersion)
					}
					if (!validGroup) {
						info += forms.WEB_0F_page__design__header_display__group.CREATE_group(selectedVersion)
					}
					
					info += '\nBased on: version ' + selectedVersion.version_number + ' (' + selectedVersion.version_name + ') of \n' +
						'Platform: ' + forms.WEB_0F_page__design__header_display__platform._platform.platform_name + ', ' + 
						'Language: ' + forms.WEB_0F_page__design__header_display__language._language.language_name + ', ' + 
						'Group: ' + forms.WEB_0F_page__design__header_display__group._group.group_name
					
					//create new record
					var destVersion = fsVersion.getRecord(fsVersion.newRecord(false,true))
					
					//manually duplicating all records because depending on type of block, may not need to be duplicated
					for (var i = 1; i <= selectedVersion.web_version_to_area.getSize(); i++) {
						//grab this area and duplicate it
						var srcArea = selectedVersion.web_version_to_area.getRecord(i)
						var destArea = destVersion.web_version_to_area.getRecord(destVersion.web_version_to_area.newRecord(false,true))
						databaseManager.copyMatchingColumns(srcArea,destArea)
						
						//go through scopes
						for (var j = 1; j <= srcArea.web_area_to_scope.getSize(); j++) {
							var srcScope = srcArea.web_area_to_scope.getRecord(j)
							var destScope = destArea.web_area_to_scope.getRecord(destArea.web_area_to_scope.newRecord(false,true))
							databaseManager.copyMatchingColumns(srcScope,destScope)
							
							//there is a block attached to this scope
							if (utils.hasRecords(srcScope.web_scope_to_block)) {
								var srcBlock = srcScope.web_scope_to_block.getRecord(1)
								
								//block is a scrapbook, don't duplicate
								if (srcBlock.scope_type) {
									//don't need to do anything as the copyMatchingColumns in scope already hooked it up
								}
								//block is unique, duplicate
								else {
									//create new block record
									var fsBlock = databaseManager.getFoundSet('sutra_cms','web_block')
									var destBlock = fsBlock.getRecord(fsBlock.newRecord(false,true))
									
									//re-hook this unique block back in to the current scope
									destScope.id_block = destBlock.id_block
									
									//get source block version
									var srcBlockVer = srcBlock.web_block_to_block_version.getRecord(1)
									
									//create destination block version record
									var destBlockVer = globals.CODE_record_duplicate(srcBlockVer,[
																		"web_block_version_to_block_data",
																		"web_block_version_to_block_data_configure"
																	])
									
									//set datapoints on new block version
									destBlockVer.id_block = destBlock.id_block
									destBlockVer.flag_active = 1
									destBlockVer.version_number = 1
								}
							}
						}
					}
					
					destVersion.version_number = 1
					destVersion.version_name = 'Initial version'
					destVersion.version_description = info
					destVersion.flag_active = forms.WEB_0F_site.flag_auto_publish
					destVersion.flag_edit = 1
					destVersion.id_platform = forms.WEB_0F_page__design__header_display__platform._platform.id_platform
					destVersion.id_language = forms.WEB_0F_page__design__header_display__language._language.id_language
					destVersion.id_group = forms.WEB_0F_page__design__header_display__group._group.id_group
					globals.WEB_page_version = destVersion.id_version
					
					databaseManager.saveData()
					
					//update versions valuelist
					forms.WEB_0F_page__design.REC_on_select()
					
					//set selected index
					forms.WEB_0F_page__design__content_1L_area.foundset.setSelectedIndex(1)
					forms.WEB_0F_page__design__content_1L_block.foundset.setSelectedIndex(1)
					
					//turn off feedback indicators if on
					globals.CODE_cursor_busy(false)
					if (globals.TRIGGER_progressbar_get() instanceof Array) {
						if (globals.TRIGGER_progressbar_get()[1] == progressText) {
							globals.TRIGGER_progressbar_stop()
						}
					}
				}
			}
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
 * @properties={typeid:24,uuid:"DAFB8B47-5EE4-4FC6-9661-34D670A373BB"}
 */
function EDIT_version(event) {
	//find this version
	var version = forms.WEB_0F_page__design__content.foundset.getSelectedRecord()
	
	if (version) {
		//currently editable, prompt to turn off
		if (version.flag_edit) {
			//if top of the stack and more than one version and not active, refuse to proceed
			if (forms.WEB_0F_page__design__content.foundset.getSelectedIndex() == 1 && forms.WEB_0F_page__design__content.foundset.getSize() > 1 && !version.flag_active) {
				plugins.dialogs.showErrorDialog(
							'Error',
							'The working copy must be editable'
					)
			}
			else {
				version.flag_edit = 0
//				databaseManager.saveData(version)
			}
		}
		//non-editable, prompt to make editable
		else {
			if (globals.TRIGGER_registered_action_authenticate('cms edit version')) {
				if (version.flag_active) {
					var input = plugins.dialogs.showQuestionDialog(
								'Edit?',
								'Do you want to allow edits to the active version?',
								'Yes',
								'No'
						)
					
					if (input != 'Yes') {
						return
					}
				}
				
				version.flag_edit = 1
//				databaseManager.saveData(version)
			}
			else {
				plugins.dialogs.showErrorDialog(
							'Insufficient access',
							'You are not allowed to change the editability of a page'
					)
			}
		}
		
		//redo version valuelist without touching the foundset
		forms.WEB_0F_page__design.REC_on_select(null,true,null,true)
	}
	else {
		plugins.dialogs.showErrorDialog(
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
 * @properties={typeid:24,uuid:"9CA51902-3FF5-4C02-AB93-16FF1B9C0512"}
 */
function ACTIVATE_version(event) {
	var fsVersion = forms.WEB_0F_page__design__content.foundset
	var selectedVersion = fsVersion.getSelectedRecord()	
	
	switch (event.getElementName()) {
		case 'btn_check_on':
			selectedVersion.flag_active = 0
//			databaseManager.saveData(selectedVersion)
			
			//redo version valuelist without touching the foundset
			forms.WEB_0F_page__design.SET_versions(true)
			TOGGLE_elements(selectedVersion.flag_edit)
			
			break
		case 'btn_check_off':
			if (utils.hasRecords(fsVersion) && !fsVersion.flag_active) {
				var input = plugins.dialogs.showQuestionDialog(
								'Activate?',
								'Do you want to flag the selected version as active?\nNOTE: this will make it live on the web',
								'Yes',
								'No'
						)
				
				if (input == 'Yes') {
					//set all records to be inactive
					for (var i = 1; i <= fsVersion.getSize(); i++) {
						fsVersion.getRecord(i).flag_active = 0
					}
					
					//set selected version as active
					selectedVersion.flag_active = 1
					selectedVersion.flag_edit = 0
					
//					databaseManager.saveData()
					
					//create log record when version set as active
					globals.TRIGGER_log_create(
										//type of log
										'CMS Page version created',
		//								//id_site
		//								id_site,
		//								//id_page
		//								id_page,
										//id_version
										selectedVersion.id_version.toString()
									)
					
					//redo version valuelist without touching the foundset
					forms.WEB_0F_page__design.SET_versions(true)
					
					//redo what is displayed to take into account
					forms.WEB_A__page.TOGGLE_edit_mode(forms.WEB_A__page._editMode)
				}
			}
			else {
				plugins.dialogs.showErrorDialog(
							'Error',
							'You cannot mark this as active'
					)
			}
			break
	}		
}
