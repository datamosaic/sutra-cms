/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f65"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"6963A7EB-B2F7-4485-9AD8-491BD890CF28"}
 */
function ACTION_add(event) {
	// TODO Auto-generated method stub
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B65C434D-3CCF-4DD9-9A78-3D45859DC0A0"}
 */
function ACTION_edit(event) {
	// button setup
//	elements.btn_add.visible = false
//	elements.lbl_add.visible = false	
	elements.btn_edit.visible = false	
//	elements.lbl_edit.visible = false
	elements.btn_groups.visible = false
	elements.lbl_groups.visible = false	
	elements.lbl_groups_tick.visible = false		
	elements.btn_save.visible = true	
//	elements.lbl_save.visible = true
	elements.btn_versions.visible = false
	elements.lbl_versions.visible = false	
	elements.lbl_versions_tick.visible = false		
	
	elements.highlighter.setLocation(elements.btn_edit.getLocationX() - 5,0)
	elements.highlighter.visible = true
	
	// toggle to browser if not there already
	if (forms.WEB_0F_page.TRIGGER_mode_set() == "DESIGN") {
		forms.WEB_0F_page.TRIGGER_mode_set("BROWSER")
	}
	
	// turn on jquery edit stuff
	forms.WEB_0F_page__browser.EDIT_on()
	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"970B75AD-2B4F-4916-9C7E-4FF9FD591844"}
 */
function ACTION_group(input) {
	
	//called to depress menu
	if (typeof input != 'number') {
		//menu items
		var siteGroups = application.getValueListItems('WEB_group')
		var vlDisplay = siteGroups.getColumnAsArray(1)
		var vlReal = siteGroups.getColumnAsArray(2)
		
		//set up menu with arguments
		var menu = new Array()
		for ( var i = 0 ; i < vlDisplay.length ; i++ ) {
			if (globals.WEB_group_selected == vlReal[i]) {
				menu[i] = plugins.popupmenu.createCheckboxMenuItem(vlDisplay[i],ACTION_group)
				menu[i].setSelected(true)
			}
			else {
				menu[i] = plugins.popupmenu.createMenuItem(vlDisplay[i],ACTION_group)
			}
			
			menu[i].setMethodArguments(vlReal[i])
			
			if (menu[i].text == '----') {
				menu[i].setEnabled(false)
			}
		}
		
		//popdown
		var elem = elements[application.getMethodTriggerElementName()]
		if (elem != null && menu.length > 1) {
			plugins.popupmenu.showPopupMenu(elem, menu)
		}
	}
	//menu shown and item chosen
	else {
		//update selected group
		globals.WEB_group_selected = input
		
		//show/hide edit button
		TOGGLE_edit()		
		
		//regenerate html
		forms.WEB_0F_page__browser.URL_update()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"B84F01FA-8EB2-4E74-8095-947C184EB422"}
 */
function TOGGLE_group(showGroups) {
	
	if (typeof showGroups != 'boolean') {
		var pageGroups = application.getValueListItems('WEB_group')
		showGroups = (pageGroups.getMaxRowIndex() > 1) ? true : false
	}
	
	elements.btn_groups.visible = showGroups
	elements.lbl_groups.visible = showGroups
	elements.lbl_groups_tick.visible = showGroups
}

/**
 *
 * @properties={typeid:24,uuid:"530CE94C-E1F2-47D0-9BF9-C4FF4FD027DF"}
 */
function TOGGLE_version(showSnapshots) {
	
	if (typeof showSnapshots != 'boolean') {
		var snapshots = application.getValueListItems('WEB_snapshot')
		showSnapshots = (snapshots.getMaxRowIndex() > 1) ? true : false
	}
	
	elements.btn_versions.visible = showSnapshots
	elements.lbl_versions.visible = showSnapshots
	elements.lbl_versions_tick.visible = showSnapshots
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"96F08190-4E9C-47EE-9FA2-638627C39748"}
 */
function ACTION_version(input) {
	//called to depress menu
	if (typeof input != 'number') {
		//menu items
		var snapshots = application.getValueListItems('WEB_snapshot')
		var vlDisplay = snapshots.getColumnAsArray(1)
		var vlReal = snapshots.getColumnAsArray(2)
		
		//set up menu with arguments
		var menu = new Array()
		for ( var i = 0 ; i < vlDisplay.length ; i++ ) {
			if (globals.WEB_version_selected == vlReal[i]) {
				menu[i] = plugins.popupmenu.createCheckboxMenuItem(vlDisplay[i],ACTION_version)
				menu[i].setSelected(true)
			}
			else {
				menu[i] = plugins.popupmenu.createMenuItem(vlDisplay[i],ACTION_version)
			}
			
			menu[i].setMethodArguments(vlReal[i])
			
			if (menu[i].text == '----') {
				menu[i].setEnabled(false)
			}
		}
		
		//popdown
		var elem = elements[application.getMethodTriggerElementName()]
		if (elem != null && menu.length > 1) {
			plugins.popupmenu.showPopupMenu(elem, menu)
		}
	}
	//menu shown and item chosen
	else {
		//update selected group
		globals.WEB_version_selected = input
		
		//show/hide edit button
		TOGGLE_edit()
		
		//regenerate html
		forms.WEB_0F_page__browser.URL_update()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"37CB81D0-259B-445E-9FDC-C15B3328574D"}
 */
function BREAD_update() {
	var simple = true
	
	var label = '<html><body><center>'
	label += '<b>Group</b> ' + application.getValueListDisplayValue('WEB_group',globals.WEB_group_selected) + '&nbsp;&nbsp;&nbsp;&nbsp;'
	
	if (simple) {
		label += '<br>'
	}
	
	label += '<b>Snapshot</b> ' + application.getValueListDisplayValue('WEB_snapshot',globals.WEB_version_selected)
	
	if (!simple) {
		label += '<br>'
		label += '<b>URL</b> ' + globals.WEB_preview_url + '<br>'
	}
	
	label += '</center></body></html>'
	
	elements.lbl_detail.text = label
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"11FEB286-BF39-4E8D-8276-C3A3DBE71FAF"}
 */
function BREAD_url_clipboard(event) {
	application.setClipboardContent(globals.WEB_preview_url)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"95133A53-BDB0-4591-8709-20EAEC851693"}
 */
function ACTION_dashboard(event) {
	//don't enter if workflow form locked for some reason or not enough access
	if (!solutionPrefs.design.statusLockWorkflow && globals.TRIGGER_registered_action_authenticate('cms page mode toggle')) {
		
		//in edit mode with unsaved changes
		if (elements.btn_save.visible && forms.WEB_0F_page__browser__editor.GET_modify()) {
			var input = plugins.dialogs.showWarningDialog(
						'Unsaved changes',
						'There are unsaved changes.  Continue without saving?',
						'Yes',
						'No'
				)
			
			if (input != 'Yes') {
				return
			}
		}
		
		if (forms.WEB_0F_page.TRIGGER_mode_set() == "BROWSER") {
			forms.WEB_0F_page.TRIGGER_mode_set("DESIGN")
			
			elements.lbl_edit.visible = false
			elements.btn_edit.visible = false
			elements.btn_save.visible = false
			
			elements.highlighter_dash.visible = false
			elements.highlighter.visible = false
			elements.lbl_detail.visible = false
			
			TOGGLE_group(false)
			TOGGLE_version(false)
			
			//refire toggle
			forms.WEB_0F_page__design__header_display.FLD_data_change__version_selected()
		}
		else {
			elements.highlighter_dash.visible = true
			elements.lbl_detail.visible = true
			
//			forms.WEB_0F_page__browser.elements.bn_browser.reload()
			forms.WEB_0F_page.TRIGGER_mode_set("BROWSER")	
			
			//toggle edit, groups, snapshots
			TOGGLE_edit()
			TOGGLE_group()
			TOGGLE_version()		
		}
	}
}

/**
 *
 * @properties={typeid:24,uuid:"0E2D3D14-9796-4F16-880A-22F672A2E6A4"}
 */
function TOGGLE_edit() {
	//find this version
	var fsVersion = databaseManager.getFoundSet('sutra_cms','web_version')
	fsVersion.find()
	fsVersion.id_version = globals.WEB_version_selected
	var results = fsVersion.search()	
	
	if (results) {
		//if version editable
		if (fsVersion.flag_edit) {
			elements.lbl_edit.visible = true
			elements.btn_edit.visible = true
		}
		else {
			elements.lbl_edit.visible = false
			elements.btn_edit.visible = false
		}
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"41EB5461-ACE2-4C29-B980-E6488AEFE199"}
 */
function ACTION_save(event) {
	//any unsaved changes?
	if (forms.WEB_0F_page__browser__editor.GET_modify()) {
		var input = plugins.dialogs.showWarningDialog(
					'Unsaved changes',
					'There are unsaved changes.  Continue without saving?',
					'Yes',
					'No'
			)
		
		if (input != 'Yes') {
			return
		}
		else {
			forms.WEB_0F_page__browser__editor.dataRec = null
		}
	}
		
	elements.btn_edit.visible = true
	elements.btn_save.visible = false	
	
	TOGGLE_edit()
	TOGGLE_group()
	TOGGLE_version()
	
	elements.highlighter.visible = false
	
	forms.WEB_0F_page__browser.EDIT_off()
}

/**
 *
 * @properties={typeid:24,uuid:"DDB53BF6-144F-4AF7-8963-21FD2C801A99"}
 */
function FORM_on_load() {
	elements.btn_groups.visible = false
	elements.lbl_groups.visible = false	
	elements.lbl_groups_tick.visible = false		
	elements.btn_save.visible = false	
	elements.btn_versions.visible = false
	elements.lbl_versions.visible = false
	elements.lbl_versions_tick.visible = false	
	elements.btn_edit.visible = false
	elements.lbl_edit.visible = false
	
	var modeToggle = globals.TRIGGER_registered_action_authenticate('cms page mode toggle')
	elements.btn_dashboard.visible = modeToggle
	elements.lbl_dashboard.visible = modeToggle
	elements.btn_sitemap.visible = !modeToggle
	elements.lbl_sitemap.visible = !modeToggle
	elements.lbl_detail.visible = !modeToggle
	
	//hide highlighter
	elements.highlighter.visible = false
	elements.highlighter_dash.visible = false
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"CA41B609-7116-4C2E-8C07-56BD3D16EADD"}
 */
function ACTION_sitemap(event) {
	//don't enter if workflow form locked for some reason or not enough access
	if (!solutionPrefs.design.statusLockWorkflow) {// && globals.TRIGGER_registered_action_authenticate('cms page sitemap')) {
		
		//in edit mode with unsaved changes
		if (elements.btn_save.visible && forms.WEB_0F_page__browser__editor.GET_modify()) {
			var input = plugins.dialogs.showWarningDialog(
						'Unsaved changes',
						'There are unsaved changes.  Continue without saving?',
						'Yes',
						'No'
				)
			
			if (input != 'Yes') {
				return
			}
		}
		
		//switch space to sitemap
		if (!elements.highlighter_dash.visible) {
			globals.TRIGGER_spaces_set('list')
			elements.highlighter_dash.visible = true
		}
		//switch space to browser only
		else {
			globals.TRIGGER_spaces_set('workflow')
			elements.highlighter_dash.visible = false
		}
	}
}
