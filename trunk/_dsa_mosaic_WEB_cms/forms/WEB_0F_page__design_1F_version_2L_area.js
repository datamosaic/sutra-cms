/**
 * @properties={typeid:35,uuid:"4FDACEFD-6F16-46F7-827B-375E25024AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"35FDA09F-74E0-45AF-9BC1-C682E4F0F549"}
 */
function AREA_add_missing(versionStack, recLatest, recSelected) {
	//MEMO: does not take into account multiple groups, languages, or platforms
	
	if (versionStack && recLatest && recSelected) {
		//set flag that this is a batch update
		var batchUpdate = true
		
		//parameters were passed in
		var fsVersion = versionStack
		var latestVersion = recLatest
		var selectedVersion = recSelected
	}
	else {
		//get most recent and selected versions
		var fsVersion = forms.WEB_0F_page__design_1F_version.foundset
		var latestVersion = fsVersion.getRecord(1)
		var selectedVersion = fsVersion.getSelectedRecord()
	}
	
	var descriptor ='Add missing page areas.\n' +
					application.getValueListDisplayValue('WEB_themes',selectedVersion.web_version_to_platform.id_theme) + '/' + application.getValueListDisplayValue('WEB_layouts',selectedVersion.web_version_to_platform.id_layout)
	
	//halt additional on select firing
	forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = true
	
	//create new version
	var newVersion = fsVersion.getRecord(fsVersion.newRecord(1,true))
	newVersion.id_platform = selectedVersion.id_platform
	newVersion.id_language = selectedVersion.id_language
	newVersion.id_group = selectedVersion.id_group
	newVersion.version_number = latestVersion.version_number + 1
	newVersion.version_description = descriptor
	newVersion.id_theme = selectedVersion.id_theme
	newVersion.id_layout = selectedVersion.id_layout
	globals.WEB_page_version = newVersion.id_version
	
	//allow additional on select firing
	forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = false
	
	//existing areas
	var thisAreas = new Array()
	for (var i = 1; i <= foundset.getSize(); i++) {
		thisAreas.push(foundset.getRecord(i))
	}
	
	// ERROR CHECK: THEME SELECTED FOR PAGE
	if ( !forms.WEB_0F_page__design_1F__header_display_2F_platform._platform.id_theme ) {
		plugins.dialogs.showErrorDialog(
						"Error",
						"No theme selected for this page"
					)
		return
	}
	
	// get editable regions based on layout selected
	if (!(utils.hasRecords(selectedVersion,'web_version_to_platform.web_platform_to_layout.web_layout_to_editable'))) {
		//only show pop-up dialog for one off blow in of missing areas
		if (!batchUpdate) {
			plugins.dialogs.showErrorDialog( 
						"Error",
						"No editable regions set up in layout selected."
					)
		}
		return 'No editables for selected layout'
	}
	
	var fsRegions = selectedVersion.web_version_to_platform.web_platform_to_layout.web_layout_to_editable
	
	// create a page area record for each non-existing editable
	var order = 1
	outer:
	for (var i = 1; i <= fsRegions.getSize(); i++) {
		//new area to create
		var tempEditableRec = fsRegions.getRecord(i)
				
		//check to make sure doesn't exist yet
		for (var j = 0; j < thisAreas.length; j++) {
			//already exists, reset order, continue loop
			if (thisAreas[j].area_name == tempEditableRec.editable_name) {
				thisAreas[j].row_order = order ++
				continue outer
			}
		}
		
		//create from defaults for area
		var newArea = forms.WEB_0F_page__design_1F__header_display__version.AREA_new(tempEditableRec,newVersion,i)
		
		//make sure that selected index doesn't move around so much
		newArea.web_area_to_scope.setSelectedIndex(1)
	}
	
	// finish up
	databaseManager.saveData()
	
	newVersion.web_version_to_area.setSelectedIndex(1)
	
	//reload this page when not called from a batch
	if (!batchUpdate) {
		forms.WEB_0F_page__design.REC_on_select(true,true,1)
	}
}

/**
 * @properties={typeid:24,uuid:"340A4C68-CFF4-4CF1-A790-750511C79F9E"}
 */
function AREA_reset() {
	// check for editable regions
	var platformRec = forms.WEB_0F_page__design_1F__header_display_2F_platform._platform.getSelectedRecord()
	if (!utils.hasRecords(platformRec,'web_platform_to_layout.web_layout_to_editable')) {
		globals.CODE_cursor_busy(false)
		plugins.dialogs.showErrorDialog( 
					"Error",
					"No editable regions set up in layout selected."
				)
		return 'No editables for selected layout'
	}
	
	var delRec = plugins.dialogs.showWarningDialog(
					'Page reset',
					'This will reset the page to the defaults specified for the selected theme.\nProceed?',
					'Yes',
					'No'
				)

	if (delRec == 'Yes') {
		//turn on busy buzzy bee
		globals.CODE_cursor_busy(true)
		
		//get most recent and selected versions
		var fsVersion = forms.WEB_0F_page__design_1F_version.foundset
		var latestVersion = fsVersion.getRecord(1)
		var selectedVersion = fsVersion.getSelectedRecord()
		
		var descriptor ='Reset page defaults.\n' +
						application.getValueListDisplayValue('WEB_themes',selectedVersion.web_version_to_platform.id_theme) + '/' + application.getValueListDisplayValue('WEB_layouts',selectedVersion.web_version_to_platform.id_layout)
		
		//halt additional on select firing
		forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = true
		
		//create new version
		var newVersion = fsVersion.getRecord(fsVersion.newRecord(1,true))
		newVersion.id_platform = selectedVersion.id_platform
		newVersion.id_language = selectedVersion.id_language
		newVersion.id_group = selectedVersion.id_group
		newVersion.version_number = latestVersion.version_number + 1
		newVersion.version_description = descriptor
		globals.WEB_page_version = newVersion.id_version
		
		//allow additional on select firing
		forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = false
		
		//get layouts
		var layout = platformRec.web_platform_to_layout.getSelectedRecord()
		
		if (selectedVersion) {
			var oldAreas = databaseManager.getFoundSetDataProviderAsArray(selectedVersion.web_version_to_area,'area_name')
		}
		else {
			var oldAreas = new Array()
		}
		
		//create all areas for this layout, copying over existing content based on area name
		for (var i = 1; i <= layout.web_layout_to_editable.getSize(); i++) {
			//new area to create
			var editable =  layout.web_layout_to_editable.getRecord(i)
			//this area existed in the theme we were copying from
			var oldAreaSameName = oldAreas.indexOf(editable.editable_name)
			
			//create from defaults for area
//			if (oldAreaSameName == -1) {
				var newArea = forms.WEB_0F_page__design_1F__header_display__version.AREA_new(editable,newVersion,i)
//			}
			//copy from chosen version
//			else {
//				var newArea = forms.WEB_0F_page__design_1F__header_display__version.AREA_copy(selectedVersion.web_version_to_area.getRecord(oldAreaSameName + 1),newVersion,i)
//			}
			
			//make sure that selected index doesn't move around so much
			newArea.web_area_to_scope.setSelectedIndex(1)
		}
		
		// finish up
		databaseManager.saveData()
		
		newVersion.web_version_to_area.setSelectedIndex(1)
		
		forms.WEB_0F_page__design.REC_on_select(true,true,1)
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"FA11DFD7-3450-4F75-9E96-49892AB2258F"}
 */
function RESIZE_beans(event) {
	var divOne = forms.WEB_0F_page__design_1F_version.elements.bean_split_1
	var divTwo = forms.WEB_0F_page__design_1F_version.elements.bean_split_2
	
	//turn off
	if (divOne.dividerSize || divTwo.dividerSize) {
		divOne.dividerSize = 0
		divTwo.dividerSize = 0
		
		//set lefthand border to size
		forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.lbl_lefthand.setSize(
			forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.lbl_lefthand.getWidth(),
			forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.lbl_lefthand.getHeight() - 5
		)
		//set lefthand border to size on raw
		forms.WEB_0F_page__design_1F_version_2F_block__data.elements.lbl_lefthand.setSize(
			forms.WEB_0F_page__design_1F_version_2F_block__data.elements.lbl_lefthand.getWidth(),
			forms.WEB_0F_page__design_1F_version_2F_block__data.elements.lbl_lefthand.getHeight() - 5
		)
		
		forms.WEB_0F_page__design_1F_version.elements.tab_area.setBorder('MatteBorder,0,0,1,0,#808080')
		forms.WEB_0F_page__design_1F_version.elements.tab_block.setBorder('MatteBorder,0,0,0,0,#808080')
	}
	//turn on
	else {
		divOne.dividerSize = 8
		divTwo.dividerSize = 8
		
		//set lefthand border to size
		forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.lbl_lefthand.setSize(
			forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.lbl_lefthand.getWidth(),
			forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.lbl_lefthand.getHeight() + 5
		)
		//set lefthand border to size on raw
		forms.WEB_0F_page__design_1F_version_2F_block__data.elements.lbl_lefthand.setSize(
			forms.WEB_0F_page__design_1F_version_2F_block__data.elements.lbl_lefthand.getWidth(),
			forms.WEB_0F_page__design_1F_version_2F_block__data.elements.lbl_lefthand.getHeight() + 5
		)
		
		forms.WEB_0F_page__design_1F_version.elements.tab_area.setBorder('MatteBorder,0,1,1,0,#808080')
		forms.WEB_0F_page__design_1F_version.elements.tab_block.setBorder('MatteBorder,1,1,0,0,#808080')		
	}
}