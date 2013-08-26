/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f32"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"CBA4256A-1CF7-42E4-A265-237E6AB08408"}
 */
function BLOCK_click(event) {
	
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2F7F3445-277A-4DA8-948D-58099A1B41C3"}
 */
function FORM_on_show(firstShow, event) {
	//set global to load in page records
	globals.WEB_block_scope = 1
	
	//show the block picker pane
	forms.WEB_0F_block__scrapbook.SPLIT_set(true)
	
	//things to do on first showing
	if (firstShow) {
		//enter non-edit mode
		forms.WEB_A__page.TOGGLE_edit_mode(false)
		
		//make sure on first tab
		if (elements.tab_main.tabIndex != 1) {
			REC_on_select()
		}
	}
	//re-fire the selected block gui method
		//MEMO: when coming to page after viewing a scrapbook, this doesn't get updated
	else {
//		forms.WEB_0F_page__design_1F_version_2L_scope.ACTION_gui_mode_load()
	}
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"C9BACEDC-DE86-4198-9361-D096BBCC4A15"}
 */
function FORM_on_hide(event) {
	forms.WEB_0F_block__scrapbook.SPLIT_set(false)
	
	return true
}

/**
 *
 * @properties={typeid:24,uuid:"2A684B84-9416-419A-B6EC-6F91209B4DA1"}
 */
function TAB_header_size(input) {
	
	switch (input) {
		case 'A':
			return 44
			break
		case 'B':
			return 200
			break
		default:
		case 'space':
			return 3
			break
	}

}

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"C2767F81-E228-4D18-9BE6-D9DC2B921123",variableType:-4}
 */
var _skipSelect = false;

/**
 * Method that is in charge of setting up the PAGE view of the page.
 * 
 * @param	{JSEvent}	[event] The event that triggered the action.
 * @param	{Boolean}	[skipLoad=false] Find correct version stack or use the existing one.
 * @param	{Number}	[verIndex] The version to select (by index).
 * @param	{Boolean}	[fireSelect=false] Manually fire the REC_on_select on the selected block type's form.
 * 
 * @properties={typeid:24,uuid:"23B7AC31-3444-4F11-BDE4-748066C79D30"}
 */
function REC_on_select(event,skipLoad,verIndex,fireSelect,areaName,blockIndex) {
//	if (!this.someVar) {
//		this.someVar = 1
//	}
//	else {
//		this.someVar ++
//	}
//	
//	//log how many times run and how
//	application.output('WEB_0F_page__design.REC_on_select(' + url_param + '/' + display_page_name + ') #:' + this.someVar + ' ' + (event ? '(e)' : '') + (skipLoad ? ' (skipLoad)' : ''))
	
	//wrapper to keep from firing too much on initial load
	if (!_skipSelect) {
		//when in data sutra and notifications enabled (and they're not already on, do them)
		if (application.__parent__.solutionPrefs && solutionPrefs.config && solutionPrefs.config.currentFormName) {
			var formName = solutionPrefs.config.currentFormName
			var serverName = forms[formName].controller.getServerName()
			var tableName = forms[formName].controller.getTableName()
			var currentNavItem = solutionPrefs.config.currentFormID
			var rowSelected = forms[formName].foundset.getSelectedIndex()
			
			if (utils.hasRecords(forms[formName].foundset)) {
				//show busy indicator while changing record
				if (navigationPrefs.byNavItemID[currentNavItem].navigationItem.ulBusyIndicator) {
					var busyIndicator = true
					
					globals.CODE_cursor_busy(true)
					application.updateUI()
				}
				
				//LOG record navigation
				//only run when using query based way to hit repository
				if (solutionPrefs.repository && solutionPrefs.repository.allFormsByTable && solutionPrefs.repository.allFormsByTable[serverName] && solutionPrefs.repository.allFormsByTable[serverName][tableName] && solutionPrefs.repository.allFormsByTable[serverName][tableName].primaryKey) {
					var pkName = solutionPrefs.repository.allFormsByTable[serverName][tableName].primaryKey
					var pkActedOn = forms[formName][pkName]
				}
				else {
					var pkName = 'repositoryAPINotImplemented'
					var pkActedOn = 0
				}
				
				//record not clicked on before, throw up busy bar and busy cursor
				var record = forms[formName].foundset.getRecord(rowSelected)
				if (navigationPrefs.byNavItemID[currentNavItem].navigationItem.initialRecord && !navigationPrefs.byNavItemID[currentNavItem].listData.visitedPKs[record[pkName]]) {
					var recNotLoaded = true
					
					//don't turn busy indicator on if it is already on
					if (!busyIndicator) {
						globals.CODE_cursor_busy(true)
					}
					globals.WEBc_sutra_trigger('TRIGGER_progressbar_start',[-273, navigationPrefs.byNavItemID[currentNavItem].navigationItem.initialRecordLabel])
				}
				
				//save currently selected index
				navigationPrefs.byNavItemID[currentNavItem].listData.index.selected = rowSelected
				
				//save time when pk of this record last accessed
				navigationPrefs.byNavItemID[currentNavItem].listData.visitedPKs[(forms[formName][pkName] != 'repositoryAPINotImplemented') ? forms[formName][pkName] : 0] = application.getServerTimeStamp()
			}
		}
		
		_skipSelect = true
	
		//when newly added page, skip this
		if (!forms[scopes.CMS.util.getTreeForm()]._addRecord) {
			//halt additional on select firing
			forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = true
			
			//select page version of tri globals
		 	forms.WEB_0F_page.SET_globals()
			
			//set up valuelists for tri globals
			var pageValid = forms.WEB_0F_page.SET_valuelists()
			
			//set version junks
			var activeInfo = SET_versions(skipLoad,!pageValid)
			
			//if no versions, flag page as invalid
			if (!utils.hasRecords(forms.WEB_0F_page__design_1F_version.foundset)) {
				pageValid = false
			}
			
			//check to see if last selected version is in current version stack
			if (client_version_selected) {
				var versionStack = databaseManager.getFoundSetDataProviderAsArray(forms.WEB_0F_page__design_1F_version.foundset,'id_version')
				versionStack = versionStack.map(function (item) {return item.toString()})
				
				var versionPosn = versionStack.indexOf(client_version_selected)
				
				if (versionPosn != -1) {
					var clientVersion = true
				}
			}
			
			//don't change anything if we're not loading in the versions
			if (!skipLoad) {
				//specified index to be selected
				if (verIndex) {
					//set selected index
					forms.WEB_0F_page__design_1F_version.foundset.setSelectedIndex(verIndex)
					
					//set version to be whatever was specified
					globals.WEB_page_version = forms.WEB_0F_page__design_1F_version.id_version
				}
				//try to stay on last selected version in version stack
				else if (clientVersion) {
					//set selected index
					forms.WEB_0F_page__design_1F_version.foundset.setSelectedIndex(versionPosn + 1)
					
					//set version to be the last edited one
					globals.WEB_page_version = application.getUUID(client_version_selected)
				}
				//there is info about the active version
				else if (activeInfo) {
					//set selected index
					forms.WEB_0F_page__design_1F_version.foundset.setSelectedIndex(activeInfo.position)
					
					//set version to be the active one
					globals.WEB_page_version = activeInfo.record.id_version
				}
				//set to first thing in the list (most recent)
				else {
					globals.WEB_page_version = application.getValueListItems('WEB_page_version').getValue(1,2)
				}
				
				//store the version we're currently on
				client_version_selected = globals.WEB_page_version ? globals.WEB_page_version.toString() : null
			}
			
			//area name
			if (areaName && utils.hasRecords(forms.WEB_0F_page__design_1F_version_2L_area.foundset)) {
				var newAreas = databaseManager.getFoundSetDataProviderAsArray(forms.WEB_0F_page__design_1F_version_2L_area.foundset,'area_name')
				
				//an area with the same name as the record we were just on exists
				var areaSameName = newAreas.indexOf(areaName)
				if (areaSameName != -1) {
					forms.WEB_0F_page__design_1F_version_2L_area.foundset.setSelectedIndex(areaSameName + 1)
					
					//the block index is less than or equal to the number of block records present
					if (blockIndex && utils.hasRecords(forms.WEB_0F_page__design_1F_version_2L_scope.foundset) && blockIndex <= forms.WEB_0F_page__design_1F_version_2L_scope.foundset.getSize()) {
						forms.WEB_0F_page__design_1F_version_2L_scope.foundset.setSelectedIndex(blockIndex)
					}
				}
			}
			
		 	//when called from event (not programatically) update tooltip on visit button
//			if (event) {
//			 	//set tooltip of visit with link
//				forms.WEB_0F_page__design_1F__button_tab.elements.btn_visit.toolTipText = forms.WEB_0F_page__design_1F__button_tab.VISIT_page(null,true)
//			}
			
			//page type ui differences
			PAGE_type_display(!pageValid ? 'Page invalid' : null)
			forms.WEB_0F_page__design_1F__header_display__version.TOGGLE_elements()
			
			//allow additional on select firing
			forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = false
			
			//may fire too frequently
			forms.WEB_0F_page__design_1F_version_2L_scope.ACTION_gui_mode_load(fireSelect)
		}
		
		//update log view
		if (elements.tab_main.tabIndex == 5) {
			forms.WEB_0F_page__design_1F__log.LOAD_records()
		}
		
		//record was not in memory, turn off busy bar and busy cursor
		if (recNotLoaded) {
			globals.WEBc_sutra_trigger('TRIGGER_progressbar_stop')
			globals.CODE_cursor_busy(false)	
		}
		//changing record, finished turn off busy indicatar
		else if (busyIndicator) {
			globals.CODE_cursor_busy(false)	
		}
		
		//allow to fire again
		_skipSelect = false
	}
}

/**
 *
 * @properties={typeid:24,uuid:"7853ABD5-E8E0-41C7-BDB7-C552BB9BF299"}
 * @AllowToRunInFind
 */
function SET_versions(skipLoad,pageInvalid) {
	//fill versions value list
	
	var vlReal = new Array()
	var vlDisplay = new Array()	
	var fsVersions = forms.WEB_0F_page__design_1F_version.foundset
	
	//clear versions
	if (pageInvalid) {
		fsVersions.clear()
		forms.WEB_0F_page__design_1F__properties_2L_version.foundset.clear()
	}
	//get versions records loaded
	else if (!skipLoad) {
		fsVersions.find()
		fsVersions.id_platform = forms.WEB_0F_page__design_1F__header_display_2F_platform._platform.id_platform.toString()
		fsVersions.id_language = forms.WEB_0F_page__design_1F__header_display_2F_language._language.id_language.toString()
		fsVersions.id_group = forms.WEB_0F_page__design_1F__header_display_2F_group._group.id_group.toString()
		var results = fsVersions.search()
		
		if (results) {
			fsVersions.sort('version_number desc')
		}
		
		forms.WEB_0F_page__design_1F__properties_2L_version.foundset.loadRecords(fsVersions)
	}
	
	//we've got a version stack
	if (utils.hasRecords(fsVersions)) {
		//hide the bolded version when no records
		forms.WEB_0F_page__design_1F__header_display__version.elements.btn_new_bold.visible = false
		
		if (!skipLoad) {
			fsVersions.sort('version_number desc')
		}
		
		for (var i = 1; i <= fsVersions.getSize(); i++) {
			var recVersion = fsVersions.getRecord(i)
			
			vlReal.push(recVersion.id_version)
			
			var displayVal = ''
			
			if (recVersion.flag_active) {
				displayVal += '<html><body><strong>ACTIVE</strong> '
				var active = {
					position: i,
					record: recVersion
				}
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
	//prompt to create version
	else {
		vlDisplay.push('<html><body><font color="#B00D00">Click <strong>+</strong> button to create a version</font>')
		vlReal.push(null)
		
		//show bolded version of plus button
		forms.WEB_0F_page__design_1F__header_display__version.elements.btn_new_bold.visible = true
	}
	
	if (application.__parent__.solutionPrefs && solutionPrefs.config.webClient) {
		vlDisplay = vlDisplay.map(function(item){return item.replace(/(<([^>]+)>)/ig,'')})
	}
	
	application.setValueListItems('WEB_page_version',vlDisplay,vlReal)
	
	return active
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0F8B8765-1036-412D-88DB-7C65A6C6710C"}
 */
function FORM_on_load(event) {
	elements.gfx_curtain.visible = false
}

/**
 * @properties={typeid:24,uuid:"D5C2AE5A-0CE4-42D3-AAF1-B277E73B748A"}
 */
function PAGE_type_display(pageType) {
	if (!forms[scopes.CMS.util.getTreeForm()]._addRecord) {
		forms.WEB_0F_page__design_1F__header_edit.TOGGLE_fields(pageType || page_type)
	}
}
