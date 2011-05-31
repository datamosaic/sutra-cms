/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f58"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"2663ABEA-5268-43B2-B657-1575D5A41384",variableType:4}
 */
var _themeSet = null;

/**
 *
 * @properties={typeid:24,uuid:"74D490E2-0E2D-4AA6-A808-8D64A2B7640C"}
 */
function TAB_display() {
	//go back a tab
	var formName = 'PRJ_0F_project'
	var buttonsName = formName + '__button_tab'
	
	//offset
	var tabA = 55
	var tabB = 223
	var offset = tabB - tabA + 5 //the # is the space between tab_header_detail
	
	//set new size of this tab panel
	forms[formName].elements.tab_header_detail.setSize(forms[formName].elements.tab_header_button.getWidth(),tabA)
	
	//go to display-only fields
	forms[formName].elements.tab_header_detail.tabIndex = 1
	
	//move/resize other tab panels
	forms[formName].elements.tab_main.setLocation(0,forms[formName].elements.tab_main.getLocationY() - offset)
	forms[formName].elements.tab_main.setSize(forms[formName].elements.tab_header_button.getWidth(),forms[formName].elements.tab_main.getHeight() + offset)
	
	//flip graphic
	forms[buttonsName].elements.btn_cancel.visible = false
	forms[buttonsName].elements.btn_edit.visible = true
}

/**
 *
 * @properties={typeid:24,uuid:"F8DAAD9D-EB39-47DB-95FA-577776E143A5"}
 */
function TAB_sec_actions() {
	globals.TAB_btn_actions_list(null,'tab_secondary')
}

/**
 *
 * @properties={typeid:24,uuid:"1873D4E8-3D03-4431-A4EB-75099CA8459B"}
 */
function TAB_sec_add() {
	globals.TAB_btn_rec_new(null,'tab_secondary')
}

/**
 *
 * @properties={typeid:24,uuid:"16873BD8-29ED-433A-A66F-AA9EEF7C5644"}
 */
function TAB_sec_change() {
	globals.TAB_change_grid(null,null,'tab_secondary','tab_s','btn_sec_add','btn_sec_actions','btn_sec_help')
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"FA2FEA2B-DF7F-4CB8-BBDF-6A0D7F8C9CA2"}
 */
function FORM_on_show(firstShow, event) {
	
	if (firstShow) {
		elements.fld_page_link_internal.visible = false
		elements.btn_page_link_internal.visible = false
		
//		elements.split_link_internal.leftComponent = elements.fld_page_link_internal
//		elements.split_link_internal.rightComponent = elements.fld_page_link_param
//		elements.split_link_internal.setDividerLocation(0.5)
//		elements.split_link_internal.setResizeWeight(0.5)
//		
//		elements.split_link_internal.visible = false
//		
//		elements.fld_page_link_internal.visible = true
//		elements.fld_page_link_param.visible = true
	}
	
	if (!forms.WEB_0T_page._addRecord) {
		TOGGLE_fields(page_type)
	}
	
	elements.lbl_save_wait.visible = false
	elements.fld_page_name.requestFocus(false)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EB585F60-3597-44A6-AC80-E77B46CAE26E"}
 */
function ACTION_cancel() {
	//this will rollback and turn autoSave back on
	globals.WEB_simple_cancel()
	
	//MEMO: check WEB_P_page method too
	if (forms.WEB_0T_page._addRecord) {
		
		forms.WEB_0T_page._addRecord = null
		forms.WEB_0T_page._oldRecord = null
		_themeSet = null
		
	}
	
	//make sure correct stuff is showing
	TOGGLE_fields(page_type)
}

/**
 *
 * @properties={typeid:24,uuid:"2C217D68-302D-4F96-920E-E5145C9C19E9"}
 */
function ACTION_save() {
	globals.CODE_cursor_busy(true)
	
	//show label that this may take a while
	elements.lbl_save_wait.visible = true
	application.updateUI()
	
	//page was just created
	if (forms.WEB_0T_page._addRecord) {
		//turn on feedback indicator
		globals.TRIGGER_progressbar_start(null,'Creating new page...')
		
		//put this page in the correct place; there were other records
		if (forms.WEB_0T_page._oldRecord) {
			
			//find current syblings
			var fsPeers = databaseManager.getFoundSet(controller.getServerName(),controller.getTableName())
			fsPeers.loadRecords(forms.WEB_0T_page._oldRecord)
			
			var oldRecord = fsPeers.getSelectedRecord()
			
			fsPeers.find()
			fsPeers.parent_id_page = oldRecord.parent_id_page
			fsPeers.id_site = oldRecord.id_site
			var results = fsPeers.search()
			
			if (results) {
				fsPeers.sort('order_by asc')
				fsPeers.selectRecord(oldRecord.id_page)
			}
			
			//re-order everybody below current record in old foundset
			for (var i = oldRecord.order_by + 1; i <= fsPeers.getSize(); i++) {
				var recReorder = fsPeers.getRecord(i)
				
				recReorder.order_by ++
			}
			
			//non-top level record
			if (oldRecord.parent_id_page) {
				parent_id_page = oldRecord.parent_id_page
				order_by = oldRecord.order_by + 1
			}
			//top level record
			else {
				order_by = oldRecord.order_by + 1
				
				var treeReload = true
			}
		}
		//this is the first record
		else {
			order_by = 1
			
			var treeReload = true
		}
		
		//create one version
		var oneVersion = web_page_to_version.getRecord(web_page_to_version.newRecord(false,true))
		oneVersion.version_number = 1
		
		var fsPath = databaseManager.getFoundSet('sutra_cms','web_path')
		var siteID = id_site
		
		//add in path for this page
		var pathNameWanted = page_name || 'untitled-page'
		pathNameWanted = pathNameWanted.toLowerCase()
		pathNameWanted = utils.stringReplace(pathNameWanted, ' ', '-')
		
		var pathName = pathNameWanted
		var cnt = 1
		
		//we need to get into the loop
		results = null
		
		while (results != 0) {
			fsPath.find()
			fsPath.id_site = siteID
			fsPath.path = pathName
			var results = fsPath.search()
			
			if (results) {
				pathName = pathNameWanted + cnt++
			}
		}
		
		var recPath = web_page_to_path.getRecord(web_page_to_path.newRecord(false,true))
		recPath.flag_default = 1
		recPath.path = pathName
		recPath.id_site = siteID
		
		databaseManager.saveData()
		databaseManager.setAutoSave(true)
		
		var pageID = id_page
		
		//a full reload required
		if (treeReload) {
			forms.WEB_0T_page.TREE_refresh()
		}
		
		forms.WEB_0T_page.elements.bean_tree.refresh()
		forms.WEB_0T_page.REC_on_select(pageID)
		forms.WEB_0T_page.elements.bean_tree.selectionPath = forms.WEB_0T_page.FIND_path(foundset.getSelectedRecord())
		
		//reset flag
		var addedRecord = true
		forms.WEB_0T_page._addRecord = null
		
		//update valuelists, etc
		forms.WEB_0F_page__design.REC_on_select()
	}
	
	//MEMO: check WEB_P_page method too
	if (_themeSet) {
		_themeSet = null
		
		//don't prompt if creating page
		if (addedRecord) {
			var input = "Yes"
		}
		//prompt
		else {
			globals.CODE_cursor_busy(false)
			var input = plugins.dialogs.showWarningDialog(
							"Warning",
							"New theme layout selected. All current area records\nwill be deleted. Continue?", 
							"Yes", 
							"No"
						)
			globals.CODE_cursor_busy(true)
		}

		if ( input != "Yes") {
			return false
		}
		
		//group to create as
			//TODO: if they've sorted, this will not be the everybody/visitor group
		var recGroup = forms.WEB_0F_site.web_site_to_group.getRecord(1)
		
		var fsArea = databaseManager.getFoundSet('sutra_cms','web_area')
		fsArea.find()
		fsArea.id_group = recGroup.id_group
		fsArea.id_version = globals.WEB_version_selected
		var results = fsArea.search()
		
		// get editable regions based on layout selected
		if (!utils.hasRecords(foundset.getSelectedRecord(),'web_page_to_layout.web_layout_to_editable')) {
			return 'No editables for selected layout'
		}
		
		var fsRegions = web_page_to_layout.web_layout_to_editable
		
		// delete current area records
		if (utils.hasRecords(fsArea)) {
			fsArea.deleteAllRecords()
		}
	
		// create a page area record for each editable
		if (fsRegions.getSize()) {
			//sort
			fsRegions.sort('row_order asc')
			
			//still manually set the order in case web_editable is out of sync (kind of likely)
			var order = 1
			for (var i = 1; i <= fsRegions.getSize(); i++) {
				var tempEditableRec = fsRegions.getRecord(i)
				
				var areaRec = fsArea.getRecord(fsArea.newRecord(false, true))
				
				areaRec.area_name = tempEditableRec.editable_name
				areaRec.id_editable = tempEditableRec.id_editable
				areaRec.row_order = order ++ 
				areaRec.id_group = recGroup.id_group
				areaRec.id_version = globals.WEB_version_selected			
				
				//create a block record for each editable default
				for (var j = 1; j <= tempEditableRec.web_editable_to_editable_default.getSize(); j++ ) {
					var tempEditableDefaultRec = tempEditableRec.web_editable_to_editable_default.getRecord(j)
					
					var blockRec = areaRec.web_area_to_block.getRecord(areaRec.web_area_to_block.newRecord(false, true))
					
					blockRec.id_block_display = tempEditableDefaultRec.id_block_display
					blockRec.id_block_type = tempEditableDefaultRec.id_block_type
					blockRec.params = tempEditableDefaultRec.params
					blockRec.id_scrapbook = tempEditableDefaultRec.id_scrapbook
					blockRec.row_order = tempEditableDefaultRec.row_order
					
					// INPUT
					// create a block_data record for each block_input
					if ( utils.hasRecords(tempEditableDefaultRec.web_editable_default_to_block_input) ) {
						for (var k = 1; k <= tempEditableDefaultRec.web_editable_default_to_block_input.getSize(); k++) {
							var tempEditableDefaultDetailRec = tempEditableDefaultRec.web_editable_default_to_block_input.getRecord(k)
	
							var blockDataRec = blockRec.web_block_to_block_data.getRecord(blockRec.web_block_to_block_data.newRecord(false,true))
							blockDataRec.data_key = tempEditableDefaultDetailRec.column_name
						}
					}
					
					// CONFIG
					// create a block data configure record for each data point
					if ( utils.hasRecords(tempEditableDefaultRec.web_editable_default_to_block_configure) ) {
						for (var k = 1; k <= tempEditableDefaultRec.web_editable_default_to_block_configure.getSize(); k++) {
							var configTemplate = tempEditableDefaultRec.web_editable_default_to_block_configure.getRecord(k)
							
							var configRec = blockRec.web_block_to_block_data_configure.getRecord(blockRec.web_block_to_block_data_configure.newRecord(false, true))
							databaseManager.saveData(configRec)
						}
					}
				}
			}
		}
		
		//thrown in so that group data is properly filled...technically shouldn't save data until we're sure this won't be cancelled
		databaseManager.saveData()
		
		// finish up
		//fsArea.sort( "row_order asc" )
		fsArea.setSelectedIndex(1)
		
		//fill group global
		forms.WEB_0F_page__design.SET_groups()
	}
	
	//call datachange to update display of stuff
	TOGGLE_fields(page_type)
	
	//turn off feedback indicator if on
	if (globals.TRIGGER_progressbar_get() instanceof Array) {
		if (globals.TRIGGER_progressbar_get()[1] == 'Creating new page...') {
			globals.TRIGGER_progressbar_stop()
		}
	}
	
	//hide label that this may take a while
	elements.lbl_save_wait.visible = false
	globals.CODE_cursor_busy(false)
	
	return true
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
 * @properties={typeid:24,uuid:"5EB85F2D-6D13-4392-9A96-A8CAA31808F2"}
 */
function FLD_data_change__page_type(oldValue, newValue, event) {
	//turn things off/on
	TOGGLE_fields(newValue)
	
	return true
}

/**
 *
 * @properties={typeid:24,uuid:"6AC3202B-F934-4E51-9AF4-866A7F3A5B6C"}
 */
function TOGGLE_fields(pageType) {
	pageType = application.getValueListDisplayValue('WEB_page_type',pageType)
	
	var linkHeader = forms.WEB_0F_page__design__header_display.elements.lbl_link
	var folderHeader = forms.WEB_0F_page__design__header_display.elements.lbl_folder	
	linkHeader.visible = false
	folderHeader.visible = false
	
	var page = false
	var link = false
	var linkInternal = false
	
	var headerText = ''
	var headerToolTip = ''
	
	switch (pageType) {
		//we've got a page
		case 'Page':
			var page = true
			var link = false
			break
		case 'External link':
			var page = false
			var link = true
			linkHeader.visible = true
			
			if (page_link) {
				headerText = page_link
				headerToolTip = 'Click to open "' + page_link + '" in a browser'
			}
			
			break
		case 'Internal link':
			var page = false
			var link = false
			var linkInternal = true
			linkHeader.visible = true
			
			if (page_link_internal) {
				headerText = application.getValueListDisplayValue('WEB_pages',page_link_internal)
				headerToolTip = 'Click to open internal page "' + headerText + '" in a browser'
			}
			
			break
		case 'Folder':
			var page = false
			var link = false
			folderHeader.visible = true
			break
	}
	
	linkHeader.text = headerText
	linkHeader.toolTipText = headerToolTip
	
	if ( utils.hasRecords(foundset) ) {
		elements.lbl_id_theme.visible = page
		elements.fld_id_theme.visible = page
		elements.lbl_id_theme_layout.visible = page
		elements.fld_id_theme_layout.visible = page
		elements.lbl_page_link.visible = link || linkInternal
		elements.fld_page_link.visible = link
		
		elements.fld_page_link_internal.visible = linkInternal
		elements.btn_page_link_internal.visible = linkInternal
		
	}

	
	//when on content tab, switch as needed
	if (forms.WEB_0F_page__design__button_tab.elements.tab_button.tabIndex == 1) {
		//folder or link type of page or just creating a new record
		if (!page || forms.WEB_0T_page._addRecord) {
			forms.WEB_0F_page__design.elements.tab_main.tabIndex = 3
		}
		//normal type of page
		else {
			forms.WEB_0F_page__design__button_tab.TAB_change('WEB_0F_page__design__button_tab','tab_b1')
		}
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B3FEA49F-D80F-4DE4-9CC7-B4491F7BED84"}
 */
function PAGE_picker(event) {
	if (event instanceof JSEvent) {
		globals.WEB_page_tree_to_popup(PAGE_picker,elements[event.getElementName()])
	}
	else {
		page_link_internal = event
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
 * @properties={typeid:24,uuid:"97DEA334-AEAC-43AC-BB85-0D796AB05318"}
 */
function FLD_data_change__id_theme_layout(oldValue, newValue, event) {
	//different value than before and old value existed (not selecting for first time)
	if (oldValue != newValue) {
		_themeSet = 1
	}
}
