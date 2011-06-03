/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f64"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"09571115-F1B2-459B-904A-92F03A7F5554",variableType:4}
 */
var _themeSet = null;

/**
 *
 * @properties={typeid:24,uuid:"1D963961-FD45-4A02-87B8-E57B4A214AD4"}
 */
function ACTION_cancel() {
	
	if (!globals.CODE_hide_form) {
		//MEMO: check WEB_0F_page__design__header_edit method too
		if (forms.WEB_0T_page._addRecord) {
			forms.WEB_0T_page._addRecord = null
			forms.WEB_0T_page._oldRecord = null
			_themeSet = null
		}
		
		//enable closing the form
		globals.CODE_hide_form = 1
		
		application.closeFormDialog('cmsNewPage')
	}

}

/**
 *
 * @properties={typeid:24,uuid:"836DDC99-6CFF-499B-8949-E79373BD1DFB"}
 */
function ACTION_ok() {
	//enaable closing the form
	globals.CODE_hide_form = 1
	
	application.closeFormDialog('cmsNewPage')
	
	globals.CODE_cursor_busy(true)
	
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
//	forms.WEB_0F_page__design.REC_on_select()
	
	//MEMO: check WEB_0F_page__design__header_edit method too
	if (_themeSet) {
		_themeSet = null
		
		//don't prompt if creating page (only creating page here, should get rid of checks)
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
		var recGroup = forms.WEB_0F_site.web_site_to_group.getRecord(1)
		
		var fsArea = databaseManager.getFoundSet('sutra_cms','web_area')//forms.WEB_0F_page__design__content_1L_area.foundset
		fsArea.clear()
		
		// get editable regions based on layout selected
		if (!utils.hasRecords(web_page_to_layout.web_layout_to_editable)) {
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
				areaRec.id_version = oneVersion.id_version			
				
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
					//create a block_data record for each block_input
					if ( tempEditableDefaultRec.web_editable_default_to_block_input ) {
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
	
	//turn off feedback indicator if on
	if (globals.TRIGGER_progressbar_get() instanceof Array) {
		if (globals.TRIGGER_progressbar_get()[1] == 'Creating new page...') {
			globals.TRIGGER_progressbar_stop()
		}
	}
	
	globals.CODE_cursor_busy(false)
	
	//return true
	
	//refresh browser bean with new content
	forms.WEB_0F_page__browser.REC_selected(null,true)	

}

/**
 *
 * @properties={typeid:24,uuid:"C344B26D-6EEF-4AC0-8762-CB520CCB37C3"}
 */
function FORM_on_show()
{


/*
 *	TITLE    :	FORM_on_show
 *			  	
 *	MODULE   :	ds_AC_access_control
 *			  	
 *	ABOUT    :	get current rules for passwords, show FiD
 *			  	
 *	INPUT    :	1) id_user for user record to be modified
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	
 *			  	
 *	MODIFIED :	Mar 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

//disable closing the form
globals.CODE_hide_form = 0

//request focus in first field
application.updateUI()
elements.fld_page_name.requestFocus()

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
 * @properties={typeid:24,uuid:"8D993FAB-49C8-4256-8B99-B6F7588AA255"}
 */
function FLD_data_change__id_theme_layout(oldValue, newValue, event) {
	//different value than before and old value existed (not selecting for first time)
	if (oldValue != newValue) {
		_themeSet = 1
	}
}
