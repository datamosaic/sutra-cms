/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f32"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

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
	forms.WEB_0F_scrapbook.SPLIT_set(true)
	
	//things to do on first showing
	if (firstShow) {
		//enter non-edit mode
		forms.WEB_A__page.TOGGLE_edit_mode(false)
		
		//make sure on first tab
		if (elements.tab_main.tabIndex != 1) {
			REC_on_select()
		}
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
	forms.WEB_0F_scrapbook.SPLIT_set(false)
	
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
		_skipSelect = true
	
		//when newly added page, skip this
		if (!forms.WEB_0T_page._addRecord) {
			//halt additional on select firing
			forms.WEB_0F_page__design__content_1L_block._skipSelect = true
			
			//select page version of tri globals
		 	forms.WEB_0F_page.SET_globals()
			
			//set up valuelists for tri globals
			var pageValid = forms.WEB_0F_page.SET_valuelists()
			
			//set version junks
			var activeInfo = SET_versions(skipLoad,!pageValid)
			
			//don't change anything if we're not loading in the versions
			if (!skipLoad) {
				//specified index to be selected
				if (verIndex) {
					//set selected index
					forms.WEB_0F_page__design__content.foundset.setSelectedIndex(verIndex)
				}
				//there is info about the active version
				else if (activeInfo) {
					//set selected index
					forms.WEB_0F_page__design__content.foundset.setSelectedIndex(activeInfo.position)
					
					//set version to be the active one
					globals.WEB_page_version = activeInfo.record.id_version
				}
				//set to first thing in the list (most recent)
				else {
					globals.WEB_page_version = application.getValueListItems('WEB_page_version').getValue(1,2)
				}
			}
			
			//area name
			if (areaName && utils.hasRecords(forms.WEB_0F_page__design__content_1L_area.foundset)) {
				var newAreas = databaseManager.getFoundSetDataProviderAsArray(forms.WEB_0F_page__design__content_1L_area.foundset,'area_name')
				
				//an area with the same name as the record we were just on exists
				var areaSameName = newAreas.indexOf(areaName)
				if (areaSameName != -1) {
					forms.WEB_0F_page__design__content_1L_area.foundset.setSelectedIndex(areaSameName + 1)
					
					//the block index is less than or equal to the number of block records present
					if (blockIndex && utils.hasRecords(forms.WEB_0F_page__design__content_1L_block.foundset) && blockIndex <= forms.WEB_0F_page__design__content_1L_block.foundset.getSize()) {
						forms.WEB_0F_page__design__content_1L_block.foundset.setSelectedIndex(blockIndex)
					}
				}
			}
			
		 	//when called from event (not programatically) update tooltip on visit button
			if (event) {
			 	//set tooltip of visit with link
				forms.WEB_0F_page__design__button_tab__content.elements.btn_visit.toolTipText = forms.WEB_0F_page__design__button_tab__content.VISIT_page(null,true)
			}
			
			//page type ui differences
			PAGE_type_display(!pageValid ? 'Page invalid' : null)
			forms.WEB_0F_page__design__header_display__version.TOGGLE_elements()
			
			//allow additional on select firing
			forms.WEB_0F_page__design__content_1L_block._skipSelect = false
			
			//may fire too frequently
			forms.WEB_0F_page__design__content_1L_block.ACTION_gui_mode_load(fireSelect)
		}
		
		//allow to fire again
		_skipSelect = false
	}
}

/**
 *
 * @properties={typeid:24,uuid:"7853ABD5-E8E0-41C7-BDB7-C552BB9BF299"}
 */
function SET_versions(skipLoad,pageInvalid) {
	//fill versions value list
	
	var vlReal = new Array()
	var vlDisplay = new Array()	
	var fsVersions = forms.WEB_0F_page__design__content.foundset
	
	//clear versions
	if (pageInvalid) {
		fsVersions.clear()
	}
	//get versions records loaded
	else if (!skipLoad) {
		fsVersions.find()
		fsVersions.id_platform = forms.WEB_0F_page__design__header_display__platform._platform.id_platform.toString()
		fsVersions.id_language = forms.WEB_0F_page__design__header_display__language._language.id_language.toString()
		fsVersions.id_group = forms.WEB_0F_page__design__header_display__group._group.id_group.toString()
		var results = fsVersions.search()
		
		forms.WEB_0F_page__design__properties_1L_version.foundset.loadRecords(fsVersions)
	}
	
	//we've got a version stack
	if (utils.hasRecords(fsVersions)) {
		//hide the bolded version when no records
		forms.WEB_0F_page__design__header_display__version.elements.btn_new_bold.visible = false
		
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
		forms.WEB_0F_page__design__header_display__version.elements.btn_new_bold.visible = true
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
	if (!forms.WEB_0T_page._addRecord) {
		forms.WEB_0F_page__design__header_edit.TOGGLE_fields(pageType || page_type)
	}
}
