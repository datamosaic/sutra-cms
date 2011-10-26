/**
 * @properties={typeid:35,uuid:"04fde543-69cc-40e9-af47-7f7c22221f18"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

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
		var ver = forms.WEB_0F_page__design_1F_version.foundset.getSize()
	}
	else {
		var ver = utils.stringToNumber(utils.stringMiddle(displayVal,utils.stringPosition(displayVal,'Version ',0,1) + 8,utils.stringPosition(displayVal,'(',0,1) - utils.stringPosition(displayVal,'Version ',0,1) - 8))
	}
	
	//area name
	if (utils.hasRecords(forms.WEB_0F_page__design_1F_version_2L_area.foundset)) {
		var areaName = forms.WEB_0F_page__design_1F_version_2L_area.area_name
		
		//block index
		if (utils.hasRecords(forms.WEB_0F_page__design_1F_version_2L_scope.foundset)) {
			var blockIndex = forms.WEB_0F_page__design_1F_version_2L_scope.foundset.getSelectedIndex()
		}
	}
	
	//assumption here is that foundset is in sync with this valuelist (convert version to reverse ordered record list)
	forms.WEB_0F_page__design_1F_version.foundset.setSelectedIndex(forms.WEB_0F_page__design_1F_version.foundset.getSize() - ver + 1)
	
	//save down this version as last selected one
	forms.WEB_0F_page.client_version_selected = forms.WEB_0F_page__design_1F_version.id_version.toString()
	
	//update display and reload version valuelist; don't reload versions foundset
	forms.WEB_0F_page__design.REC_on_select(null,true,null,null,areaName,blockIndex)
	
	return true
}

/**
 * @properties={typeid:24,uuid:"F7FCCB63-BE93-49DB-A292-873DD6399A16"}
 */
function TOGGLE_elements() {
	//show correct checkbox/edit graphics
	elements.btn_check_on.visible = (forms.WEB_0F_page__design_1F_version.flag_active) ? true : false
	elements.btn_check_off.visible = (forms.WEB_0F_page__design_1F_version.flag_active) ? false : true
	elements.btn_lock_on.visible = (forms.WEB_0F_page__design_1F_version.flag_lock) ? true : false
	elements.btn_lock_off.visible = (forms.WEB_0F_page__design_1F_version.flag_lock) ? false : true
			
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
	//disable pop-ups
	var input = 'Yes'
	
	//there is a page
	if (utils.hasRecords(forms.WEB_0F_page__design.foundset)) {
		//do we have any versions?
		var fsVersion = forms.WEB_0F_page__design_1F_version.foundset
		var hasVersions = utils.hasRecords(fsVersion)
		
		//check for existence of all page-level records if empty version stack
		if (!hasVersions) {
			var platformRec = forms.WEB_0F_page__design_1F__header_display_2F_platform._platform.getSelectedRecord()
			var languageRec = forms.WEB_0F_page__design_1F__header_display_2F_language._language.getSelectedRecord()
			var groupRec = forms.WEB_0F_page__design_1F__header_display_2F_group._group.getSelectedRecord()
			
			var validPlatform = platformRec && platformRec.id_site_platform.toString() == globals.WEB_page_platform
			var validLanguage = languageRec && languageRec.id_site_language.toString() == globals.WEB_page_language
			var validGroup = groupRec && groupRec.id_site_group.toString() == globals.WEB_page_group
			
			function allPKs(fs) {
				var returnVal = ''
				
				for (var i = 1; i <= fs.getSize(); i++) {
					returnVal += fs.getRecord(i).id_platform.toString()
					
					if (i != fs.getSize()) {
						returnVal += '||'
					}
				}
				
				return returnVal
			}
			
			//check for any valid versions for this page
			var fsVersions = databaseManager.getFoundSet('sutra_cms','web_version')
			fsVersions.find()
			fsVersions.id_platform = allPKs(forms.WEB_0F_page__design_1F__header_display_2F_platform.foundset)
			var results = fsVersions.search()
			
			//no page versions, create from selected platform
			if (!results) {
				//get editable regions based on layout selected
				if (utils.hasRecords(platformRec,'web_platform_to_layout.web_layout_to_editable')) {
					var layout = platformRec.web_platform_to_layout.getSelectedRecord()
					
					//create new record
					var newVersion = fsVersions.getRecord(fsVersions.newRecord(false,true))
					newVersion.flag_lock = 0
					newVersion.id_platform = platformRec.id_platform
					newVersion.id_language = languageRec.id_language
					newVersion.id_group = groupRec.id_group
					newVersion.version_number = 1
					newVersion.version_name = 'Initial version'
					newVersion.flag_active = forms.WEB_0F_site.flag_auto_publish
					
					//create all areas for this layout, copying over existing content based on area name
					for (var i = 1; i <= layout.web_layout_to_editable.getSize(); i++) {
						//new area to create
						var editable =  layout.web_layout_to_editable.getRecord(i)
						
						//create from defaults for area
						var newArea = AREA_new(editable,newVersion,i)
						
						//make sure that selected index doesn't move around so much
						newArea.web_area_to_scope.setSelectedIndex(1)
					}
					
					// finish up
					databaseManager.saveData()
					
					newVersion.web_version_to_area.setSelectedIndex(1)
					
					//update versions valuelist
					forms.WEB_0F_page__design.REC_on_select()
				}
				else {
					plugins.dialogs.showInfoDialog(
								'Error',
								'No editables for selected layout'
						)
				}
				
				//stop rest of method from running
				return
			}
			
			//prompt to create platform, language, group as needed
//			var dialogText = ''
//			
//			if (!validPlatform) {
//				dialogText += 'platform'
//			}
//			if (!validLanguage) {
//				if (dialogText.length) {
//					dialogText += ', '
//					var multi = true
//				}
//				dialogText += 'language'
//			}
//			if (!validGroup) {
//				if (dialogText.length) {
//					dialogText += ', '
//					var multi = true
//				}
//				dialogText += 'group'
//			}
//			
//			if (dialogText.length) {
//				dialogText = 'Add selected ' + dialogText + ' record' + (multi ? 's' : '') + ' and create new version?'
//			}
//			else {
//				dialogText = 'Create new version?'
//			}
//			
//			var input = 'Yes'
			
//			var input = plugins.dialogs.showQuestionDialog(
//							'Empty version stack',
//							dialogText,
//							'Yes',
//							'No'
//					)
		}
		//version stack exists
		else {
			//get most recent and selected versions
			var latestVersion = fsVersion.getRecord(1)
			var selectedVersion = fsVersion.getSelectedRecord()
			
			//ok to proceed
			var input = 'Yes'
		}
		
		if (input == 'Yes') {
			//prompt for version name
			application.showFormInDialog(
							forms.WEB_P__version,
							-1,-1,-1,-1,
							' ',
							true,
							false,
							'cmsVersionDupe'
						)
			
			if (forms.WEB_P__version._fidAccept) {
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
					
					//version that was selected
					var selectedVersion = forms.WEB_P_page__version._fsVersion.getRecord(forms.WEB_P_page__version._posnVersion)
					
					//first version in the stack
					if (!hasVersions) {
						var info = ''
						//create prerequisite page-level records
						if (!validPlatform) {
							info += forms.WEB_0F_page__design_1F__header_display_2F_platform.CREATE_platform(selectedVersion)
						}
						if (!validLanguage) {
							info += forms.WEB_0F_page__design_1F__header_display_2F_language.CREATE_language(selectedVersion)
						}
						if (!validGroup) {
							info += forms.WEB_0F_page__design_1F__header_display_2F_group.CREATE_group(selectedVersion)
						}
						
						info += '\nBased on: version ' + selectedVersion.version_number + ' (' + selectedVersion.version_name + ') of \n' +
							'Platform: ' + selectedVersion.web_version_to_platform.platform_name + ', ' + 
							'Language: ' + selectedVersion.web_version_to_language.language_name + ', ' + 
							'Group: ' + selectedVersion.web_version_to_group.group_name
					}
					
					//the new platform has a theme/layout specified
					if (utils.hasRecords(selectedVersion,'web_version_to_layout')) {
						var layout = selectedVersion.web_version_to_layout.getSelectedRecord()
						
						var oldAreas = databaseManager.getFoundSetDataProviderAsArray(selectedVersion.web_version_to_area,'area_name')
						
						//create new record
						var destVersion = fsVersion.getRecord(fsVersion.newRecord(false,true))
						
						//create all areas for this layout, copying over existing content based on area name
						for (var i = 1; i <= layout.web_layout_to_editable.getSize(); i++) {
							//new area to create
							var editable =  layout.web_layout_to_editable.getRecord(i)
							//this area existed in the theme we were copying from
							var oldAreaSameName = oldAreas.indexOf(editable.editable_name)
							
							//create from defaults for area
							if (oldAreaSameName == -1) {
								var newArea = AREA_new(editable,destVersion,i)
							}
							//copy from chosen version
							else {
								var newArea = AREA_copy(selectedVersion.web_version_to_area.getRecord(oldAreaSameName + 1),destVersion,i)
							}
							
							//reset scope index to be at top
							destVersion.web_version_to_area.web_area_to_scope.setSelectedIndex(1)
						}
						
						//common data points for new and subsequent versions
						destVersion.flag_lock = 0
						destVersion.id_platform = forms.WEB_0F_page__design_1F__header_display_2F_platform._platform.id_platform
						destVersion.id_language = forms.WEB_0F_page__design_1F__header_display_2F_language._language.id_language
						destVersion.id_group = forms.WEB_0F_page__design_1F__header_display_2F_group._group.id_group
						
						//version stack exists
						if (hasVersions) {
							//disable edits on old version when 
							if (!selectedVersion.flag_lock) {
								selectedVersion.flag_lock = 1
							}
							
							//save down information for new version
							destVersion.version_number = latestVersion.version_number + 1
							destVersion.version_name = forms.WEB_P__version._versionName
							destVersion.version_description = forms.WEB_P__version._versionDescription
							destVersion.flag_active = null
							destVersion.id_theme = selectedVersion.id_theme
							destVersion.id_layout = selectedVersion.id_layout
							
							databaseManager.saveData()
							
							//update versions valuelist
							forms.WEB_0F_page__design.REC_on_select(null,null,1)
						}
						//no version stack
						else {
							//save down information for new version
							destVersion.version_number = 1
							destVersion.version_name = 'Initial version'
							destVersion.version_description = info
							destVersion.flag_active = forms.WEB_0F_site.flag_auto_publish
							
							databaseManager.saveData()
							
							//update versions valuelist
							forms.WEB_0F_page__design.REC_on_select()
						}
						
						//update selected version in combobox
						globals.WEB_page_version = destVersion.id_version
						
						//reset area index to be at top
						destVersion.web_version_to_area.setSelectedIndex(1)
					}
					else {
						plugins.dialogs.showErrorDialog(
									'Error',
									'There is not a layout for the chosen platform'
							)
					}
					
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
 * @properties={typeid:24,uuid:"A0FF2F3C-AAFA-41B6-B113-B460680B15E4"}
 */
function AREA_new(editable,destVersion,rowOrder) {
	var areaRec = destVersion.web_version_to_area.getRecord(destVersion.web_version_to_area.newRecord(false,true))
	
	areaRec.area_name = editable.editable_name
	areaRec.id_editable = editable.id_editable
	areaRec.row_order = rowOrder
	
	//create a block record for each editable default
	for (var j = 1; j <= editable.web_editable_to_editable_default.getSize(); j++ ) {
		var tempEditableDefaultRec = editable.web_editable_to_editable_default.getRecord(j)
		
		//disale/enable rec on select on the block type forms when creating scope
		globals.WEB_block_on_select = false
		
		//create scope record
		var scopeRec = areaRec.web_area_to_scope.getRecord(areaRec.web_area_to_scope.newRecord(false, true))
		scopeRec.row_order = j
		
		//disable/enable rec on select on the block type forms when creating scope
		globals.WEB_block_on_select = true
		
		//this is a scrapbook, just connect
		if (tempEditableDefaultRec.id_block) {
			scopeRec.id_block = tempEditableDefaultRec.id_block
		}
		//unique block
		else {
			//create block record
			var fsBlock = databaseManager.getFoundSet('sutra_cms','web_block')
			var blockRec = fsBlock.getRecord(fsBlock.newRecord(false,true))
			
			scopeRec.id_block = blockRec.id_block
			
			//create first block version record
			var blockVersionRec = blockRec.web_block_to_block_version__all.getRecord(blockRec.web_block_to_block_version__all.newRecord(false,true))
			blockVersionRec.flag_active = 1
			blockVersionRec.version_number = 1
			blockVersionRec.id_block_type = tempEditableDefaultRec.id_block_type
			blockVersionRec.id_block_display = tempEditableDefaultRec.id_block_display
			
			// INPUT
			// create a block_data record for each block_input
			if ( utils.hasRecords(tempEditableDefaultRec.web_editable_default_to_block_input) ) {
				for (var k = 1; k <= tempEditableDefaultRec.web_editable_default_to_block_input.getSize(); k++) {
					var tempEditableDefaultDetailRec = tempEditableDefaultRec.web_editable_default_to_block_input.getRecord(k)

					var blockDataRec = blockVersionRec.web_block_version_to_block_data.getRecord(blockVersionRec.web_block_version_to_block_data.newRecord(false,true))
					blockDataRec.data_key = tempEditableDefaultDetailRec.column_name
				}
			}
			
			// CONFIG
			// create a block data configure record for each data point
			if ( utils.hasRecords(tempEditableDefaultRec.web_editable_default_to_block_configure) ) {
				for (var k = 1; k <= tempEditableDefaultRec.web_editable_default_to_block_configure.getSize(); k++) {
					var configTemplate = tempEditableDefaultRec.web_editable_default_to_block_configure.getRecord(k)
					
					var configRec = blockVersionRec.web_block_version_to_block_data_configure.getRecord(blockVersionRec.web_block_version_to_block_data_configure.newRecord(false, true))
					configRec.data_key = configTemplate.columnName
				}
			}
		}
	}
	
	return areaRec
}

/**
 * @properties={typeid:24,uuid:"231F2D51-281C-4503-9471-BC562D3E91B3"}
 */
function AREA_copy(srcArea,destVersion,rowOrder) {
	//grab this area and duplicate it
	var destArea = destVersion.web_version_to_area.getRecord(destVersion.web_version_to_area.newRecord(false,true))
	databaseManager.copyMatchingColumns(srcArea,destArea)
	
	destArea.row_order = rowOrder
	
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
				
				//get active source block version
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
				
				//make sure that meta data columns are in sync with current block type definition
				forms.WEB_0F_block__scrapbook.REC_refresh_synchronize(destBlockVer)
			}
		}
	}
	
	return destArea
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"DAFB8B47-5EE4-4FC6-9661-34D670A373BB"}
 */
function LOCK_version(event) {
	//find this version
	var version = forms.WEB_0F_page__design_1F_version.foundset.getSelectedRecord()
	
	if (version) {
		//currently editable, prompt to turn off
		if (!version.flag_lock) {
			version.flag_lock = 1
			
			//save data when not in edit mode
			if (!forms.WEB_A__page._editMode) {
				databaseManager.saveData(version)
			}
			
			//redo what is displayed to take into account
			forms.WEB_A__page.TOGGLE_edit_mode(forms.WEB_A__page._editMode)
		}
		//non-editable, prompt to make editable
		else {
			if (globals.TRIGGER_registered_action_authenticate('cms edit version')) {
				if (version.flag_active) {
					var input = plugins.dialogs.showQuestionDialog(
								'Unlock',
								'Do you want to allow edits to the active version?',
								'Yes',
								'No'
						)
					
					if (input != 'Yes') {
						return
					}
				}
				
				version.flag_lock = 0
				
				//save data when not in edit mode
				if (!forms.WEB_A__page._editMode) {
					databaseManager.saveData(version)
				}
				
				//redo what is displayed to take into account
				forms.WEB_A__page.TOGGLE_edit_mode(forms.WEB_A__page._editMode)
			}
			else {
				plugins.dialogs.showErrorDialog(
							'Insufficient access',
							'You are not allowed to change the lockedness of a page'
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
	var fsVersion = forms.WEB_0F_page__design_1F_version.foundset
	var selectedVersion = fsVersion.getSelectedRecord()	
	
	switch (event.getElementName()) {
		case 'btn_check_on':
			selectedVersion.flag_active = 0
			
			//save data when not in edit mode
			if (!forms.WEB_A__page._editMode) {
				databaseManager.saveData(selectedVersion)
			}
			
			//redo version valuelist without touching the foundset
			forms.WEB_0F_page__design.SET_versions(true)
			TOGGLE_elements()
			
			break
		case 'btn_check_off':
			if (utils.hasRecords(fsVersion) && !fsVersion.flag_active) {
//				var input = plugins.dialogs.showQuestionDialog(
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
//					selectedVersion.flag_lock = 1
					
					//save data when not in edit mode
					if (!forms.WEB_A__page._editMode) {
						databaseManager.saveData(selectedVersion)
					}
					
					//create log record when version set as active
					globals.TRIGGER_log_create(
										//type of log
										'CMS page version activated',
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
