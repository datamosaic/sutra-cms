/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4FDACEFD-6F16-46F7-827B-375E25024AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {Boolean}
 * 
 * @properties={typeid:35,uuid:"3ED906AC-81E1-4E50-94AB-069BEA4F3EC0",variableType:-4}
 */
var _skipSelect = false;

/**
 *
 * @properties={typeid:24,uuid:"35FDA09F-74E0-45AF-9BC1-C682E4F0F549"}
 * @AllowToRunInFind
 */
function AREA_add_missing(versionStack, recLatest, recSelected, autoActivate) {
	//MEMO: only works on selected version stack (does not take into account multiple groups, languages, or platforms)
		//see forms.WEB_0F_theme.ACTIONS_list() for example with multi platform, language, group

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

		//if selected page is the active one
		if (selectedVersion.flag_active) {
			autoActivate = true
		}
	}

	var descriptor ='Add missing page areas.\n' +
					application.getValueListDisplayValue('WEB_themes',selectedVersion.id_theme) + '/' + application.getValueListDisplayValue('WEB_layouts',selectedVersion.id_layout)

	//halt additional on select firing
	if (!batchUpdate) {
		forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = true
	}

	//create new version
	var newVersion = fsVersion.getRecord(fsVersion.newRecord(1,true))
	newVersion.id_platform = selectedVersion.id_platform
	newVersion.id_language = selectedVersion.id_language
	newVersion.id_group = selectedVersion.id_group
	newVersion.version_number = latestVersion.version_number + 1
	newVersion.version_description = descriptor
	newVersion.id_theme = selectedVersion.id_theme
	newVersion.id_layout = selectedVersion.id_layout

	//lock selected version, activate newly created
	if (autoActivate) {
		//lock selected version
		selectedVersion.flag_lock = 1

		//de-activte currently activated version (should be selectedVersion, but may not be)
		var fsVersionDupe = fsVersion.duplicateFoundSet()
		fsVersionDupe.find()
		fsVersionDupe.flag_active = 1
		var results = fsVersionDupe.search(false,true)

		if (results) {
			fsVersionDupe.flag_active = 0
		}

		//activate new version
		newVersion.flag_active = 1
	}

	//save down this version as currently selected one
	newVersion.web_version_to_platform.web_platform_to_page.client_version_selected = newVersion.id_version.toString()

	if (!batchUpdate) {
		globals.WEB_page_version = newVersion.id_version

		//allow additional on select firing
		forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = false
	}

	if (selectedVersion) {
		var oldAreas = databaseManager.getFoundSetDataProviderAsArray(selectedVersion.web_version_to_area,'area_name')
	}
	else {
		var oldAreas = new Array()
	}

	// ERROR CHECK: THEME SELECTED FOR PAGE
	if ( !selectedVersion.id_theme ) {
		//only show pop-up dialog for one off blow in of missing areas
		if (!batchUpdate) {
			globals.DIALOGS.showErrorDialog(
							"Error",
							"No theme selected for this page"
						)
		}
		return 'No theme for selected page'
	}

	// get editable regions based on layout selected
	if (!(utils.hasRecords(selectedVersion,'web_version_to_layout.web_layout_to_editable'))) {
		//only show pop-up dialog for one off blow in of missing areas
		if (!batchUpdate) {
			globals.DIALOGS.showErrorDialog(
						"Error",
						"No editable regions set up in layout selected."
					)
		}
		return 'No editables for selected layout'
	}

	var fsRegions = selectedVersion.web_version_to_layout.web_layout_to_editable

	//create all areas for this layout, copying over existing content based on area name
	for (var i = 1; i <= fsRegions.getSize(); i++) {
		//new area to create
		var tempEditableRec = fsRegions.getRecord(i)
		//this area existed in the version we were copying from
		var oldAreaSameName = oldAreas.indexOf(tempEditableRec.editable_name)

		//create from defaults for area
		if (oldAreaSameName == -1) {
			var newArea = forms.WEB_0F_page__design_1F__header_display__version.AREA_new(tempEditableRec,newVersion,i)
		}
		//copy from chosen version
		else {
			var newArea = forms.WEB_0F_page__design_1F__header_display__version.AREA_copy(selectedVersion.web_version_to_area.getRecord(oldAreaSameName + 1),newVersion,i)
		}

		//make sure that selected index doesn't move around so much
		newArea.web_area_to_scope.setSelectedIndex(1)
	}

	// finish up
	databaseManager.saveData()

	newVersion.web_version_to_area.setSelectedIndex(1)

	//reload this page when not called from a batch
	if (!batchUpdate) {
		if (globals.WEB_page_mode == 3) {
			forms.WEB_TB__web_mode.ACTION_version_actions()
		}
		else {
			forms.WEB_0F_page__design.REC_on_select(true,true,1)
		}
		
		//warn when newly created version not activated
		if (!autoActivate) {
			globals.DIALOGS.showInfoDialog(
						'Success',
						'The theme has been updated.\nYou must activate this version to publish your changes.'
				)
		}
	}
}

/**
 * @properties={typeid:24,uuid:"340A4C68-CFF4-4CF1-A790-750511C79F9E"}
 * @AllowToRunInFind
 */
function AREA_reset(versionStack, recLatest, recSelected, autoActivate) {

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

		//if selected page is the active one
		if (selectedVersion.flag_active) {
			autoActivate = true
		}
	}

	//turn on busy buzzy bee
	globals.CODE_cursor_busy(true)

	var descriptor ='Reset page defaults.\n' +
					application.getValueListDisplayValue('WEB_themes',selectedVersion.id_theme) + '/' + application.getValueListDisplayValue('WEB_layouts',selectedVersion.id_layout)

	//halt additional on select firing
	if (!batchUpdate) {
		forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = true
	}

	//create new version
	var newVersion = fsVersion.getRecord(fsVersion.newRecord(1,true))
	newVersion.id_platform = selectedVersion.id_platform
	newVersion.id_language = selectedVersion.id_language
	newVersion.id_group = selectedVersion.id_group
	newVersion.version_number = latestVersion.version_number + 1
	newVersion.version_description = descriptor
	newVersion.id_theme = selectedVersion.id_theme
	newVersion.id_layout = selectedVersion.id_layout

	//lock selected version, activate newly created
	if (autoActivate) {
		//lock selected version
		selectedVersion.flag_lock = 1

		//de-activte currently activated version (should be selectedVersion, but may not be)
		var fsVersionDupe = fsVersion.duplicateFoundSet()
		fsVersionDupe.find()
		fsVersionDupe.flag_active = 1
		var results = fsVersionDupe.search(false,true)

		if (results) {
			fsVersionDupe.flag_active = 0
		}

		//activate new version
		newVersion.flag_active = 1
	}

	//save down this version as currently selected one
	newVersion.web_version_to_platform.web_platform_to_page.client_version_selected = newVersion.id_version.toString()

	if (!batchUpdate) {
		globals.WEB_page_version = newVersion.id_version

		//allow additional on select firing
		forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = false
	}

	// ERROR CHECK: THEME SELECTED FOR PAGE
	if ( !selectedVersion.id_theme ) {
		//only show pop-up dialog for one off reset
		if (!batchUpdate) {
			globals.DIALOGS.showErrorDialog(
							"Error",
							"No theme selected for this page"
						)
		}
		return 'No theme for selected page'
	}

	// get editable regions based on layout selected
	if (!(utils.hasRecords(selectedVersion,'web_version_to_layout.web_layout_to_editable'))) {
		//only show pop-up dialog for one off reset
		if (!batchUpdate) {
			globals.DIALOGS.showErrorDialog(
						"Error",
						"No editable regions set up in layout selected."
					)
		}
		return 'No editables for selected layout'
	}

	var fsRegions = selectedVersion.web_version_to_layout.web_layout_to_editable

	//create all areas for this layout, copying over existing content based on area name
	for (var i = 1; i <= fsRegions.getSize(); i++) {
		//new area to create
		var editable =  fsRegions.getRecord(i)

		//create new area
		var newArea = forms.WEB_0F_page__design_1F__header_display__version.AREA_new(editable,newVersion,i)

		//make sure that selected index doesn't move around so much
		newArea.web_area_to_scope.setSelectedIndex(1)
	}

	// finish up
	databaseManager.saveData()

	newVersion.web_version_to_area.setSelectedIndex(1)

	//reload this page when not called from a batch
	if (!batchUpdate) {
		if (globals.WEB_page_mode == 3) {
			forms.WEB_TB__web_mode.ACTION_version_actions()
		}
		else {
			forms.WEB_0F_page__design.REC_on_select(true,true,1)
		}
		globals.DIALOGS.showInfoDialog(
					'Success',
					'The theme has been updated.\nYou must activate this version to publish your changes.'
			)
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

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"C2B25248-577E-4241-B14F-323A1090B425"}
 */
function REC_on_select(event) {
	//need extra help keeping relations in sync
	if (!_skipSelect && globals.WEB_page_mode == 1 && application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT && !utils.hasRecords(web_area_to_scope) && !forms.WEB_0F_page__design_1F_version.foundset.isInFind()) {
		forms.WEB_0F_page__design_1F_version_2F_block__data.foundset.clear()
	}
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1678EE5B-7731-4DCD-B756-5108FAFD99B5"}
 */
function FORM_on_load(event) {
	if (application.getApplicationType() != APPLICATION_TYPES.WEB_CLIENT) {
		elements.btn_space_dividers.visible = true
	}
}
