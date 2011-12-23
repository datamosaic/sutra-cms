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
//	elements.btn_groups.visible = false
//	elements.lbl_groups.visible = false	
//	elements.lbl_groups_tick.visible = false		
	elements.btn_save.visible = true	
//	elements.lbl_save.visible = true
//	elements.btn_versions.visible = false
//	elements.lbl_versions.visible = false	
//	elements.lbl_versions_tick.visible = false		
	
	elements.highlighter.setLocation(elements.btn_edit.getLocationX() - 5,0)
	elements.highlighter.visible = true
	
	// toggle to browser if not there already
	if (globals.WEB_page_mode != 3) {
		MODE_set("Real")
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
	if (input instanceof JSEvent) {
		//menu items
		var siteGroups = application.getValueListItems('WEB_page_group')
		var vlDisplay = siteGroups.getColumnAsArray(1)
		var vlReal = siteGroups.getColumnAsArray(2)
		
		//set up menu with arguments
		var menu = new Array()
		for ( var i = 0 ; i < vlDisplay.length ; i++ ) {
			if (globals.WEB_page_group == vlReal[i]) {
				menu[i] = plugins.popupmenu.createCheckboxMenuItem(vlDisplay[i],ACTION_group)
				menu[i].setSelected(true)
			}
			else {
				menu[i] = plugins.popupmenu.createMenuItem(vlDisplay[i],ACTION_group)
			}
			
			menu[i].setMethodArguments(vlReal[i])
			
			if (menu[i].text == '-') {
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
		globals.WEB_page_group = input
		
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
//	
//	if (typeof showGroups != 'boolean') {
//		var pageGroups = application.getValueListItems('WEB_page_group')
//		showGroups = (pageGroups.getMaxRowIndex() > 1) ? true : false
//	}
//	
//	elements.btn_groups.visible = showGroups
//	elements.lbl_groups.visible = showGroups
//	elements.lbl_groups_tick.visible = showGroups
}

/**
 * @properties={typeid:24,uuid:"30E954F0-D7BF-414B-943A-CEBBB16148BB"}
 */
function TOGGLE_visit(shown) {
	
	if (typeof shown != 'boolean') {
		shown = false
	}
	
	elements.btn_visit.visible = shown
	elements.lbl_visit.visible = shown
}

/**
 *
 * @properties={typeid:24,uuid:"530CE94C-E1F2-47D0-9BF9-C4FF4FD027DF"}
 */
function TOGGLE_version(showVersion) {
//	
//	if (typeof showVersion != 'boolean') {
//		var versions = application.getValueListItems('WEB_page_version')
//		showVersion = (versions.getMaxRowIndex() > 1) ? true : false
//	}
//	
//	elements.btn_versions.visible = showVersion
//	elements.lbl_versions.visible = showVersion
//	elements.lbl_versions_tick.visible = showVersion
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
	if (input instanceof JSEvent) {
		//menu items
//		var versions = application.getValueListItems('WEB_page_version')
//		var vlDisplay = versions.getColumnAsArray(1)
//		var vlReal = versions.getColumnAsArray(2)
		var fsVersions = forms.WEB_0F_page__design_1F_version.foundset
		
		//set up menu with arguments
		var menu = new Array()
		for ( var i = 1 ; i <= fsVersions.getSize() ; i++ ) {
			var recVersion = fsVersions.getRecord(i)
			
			var displayVal = ''
			
			if (recVersion.flag_active) {
				displayVal += '<html><body><strong>ACTIVE</strong> '
			}
			else if (i == 1) {
				displayVal += 'Working copy'
			}
			
			if (i > 1 || recVersion.flag_active) {
				displayVal += 'Version ' + recVersion.version_number + ' (' + globals.CODE_date_format(recVersion.rec_modified,'current') + ')'
				
				if (recVersion.version_name) {
					displayVal += ': ' + recVersion.version_name
				}
			}
			
			if (globals.WEB_page_version.toString() == recVersion.id_version.toString()) {
				menu[i] = plugins.popupmenu.createCheckboxMenuItem(displayVal,ACTION_version)
				menu[i].setSelected(true)
			}
			else {
				menu[i] = plugins.popupmenu.createMenuItem(displayVal,ACTION_version)
			}
			
			menu[i].setMethodArguments(recVersion.id_version)
			
			if (menu[i].text == '-') {
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
		//update selected version
		globals.WEB_page_version = input
		
		//show/hide edit button
		TOGGLE_edit()
		
		//regenerate html
		forms.WEB_0F_page__browser.URL_update()
		
//		//compare value in global with valuelist
//		var dataset = application.getValueListItems('WEB_page_version')
//		var vlReal = dataset.getColumnAsArray(2)
//		for (var i = 0; i < vlReal.length; i++) {
//			if (vlReal[i] == newValue) {
//				break
//			}
//		}
//		
//		//match found
//		var displayVal = dataset.getValue(i + 1,1)
//		
//		//use display value to track down actual record
//		if (displayVal == 'Working copy') {
//			var ver = forms.WEB_0F_page__design_1F_version.foundset.getSize()
//		}
//		else {
//			var ver = utils.stringToNumber(utils.stringMiddle(displayVal,utils.stringPosition(displayVal,'Version ',0,1) + 8,utils.stringPosition(displayVal,'(',0,1) - utils.stringPosition(displayVal,'Version ',0,1) - 8))
//		}
	
		//assumption here is that foundset is in sync with this valuelist (convert version to reverse ordered record list)
		forms.WEB_0F_page__design_1F_version.foundset.selectRecord(globals.WEB_page_version)
		
		//update display and reload version valuelist; don't reload versions foundset
		forms.WEB_0F_page__browser.REC_on_select(null,null,true)
	}
}

/**
 *
 * @properties={typeid:24,uuid:"37CB81D0-259B-445E-9FDC-C15B3328574D"}
 */
function BREAD_update() {
//	var simple = true
//	
//	var label = '<html><body><center>'
//	label += 'Group ' + application.getValueListDisplayValue('WEB_page_group',globals.WEB_page_group).substr(12) + '&nbsp;&nbsp;&nbsp;&nbsp;'
//	
//	if (simple) {
//		label += '<br>'
//	}
//	
//	label += '' + application.getValueListDisplayValue('WEB_page_version',globals.WEB_page_version)
//	
//	if (!simple) {
//		label += '<br>'
//		label += '<b>URL</b> ' + globals.WEB_preview_url + '<br>'
//	}
//	
//	label += '</center></body></html>'
	
//	elements.lbl_detail.text = label
//	elements.lbl_detail.toolTipText = '<html><body>Click to copy URL to clipboard<br>' + globals.WEB_preview_url
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"11FEB286-BF39-4E8D-8276-C3A3DBE71FAF"}
 */
function BREAD_url_clipboard(event) {
	if (globals.CODE_key_pressed('shift')) {
		globals.CODE_url_handler(globals.WEB_preview_url)
	}
	else {
		application.setClipboardContent(globals.WEB_preview_url)
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"95133A53-BDB0-4591-8709-20EAEC851693"}
 */
function ACTION_dashboard(event) {
//	//don't enter if workflow form locked for some reason or not enough access
//	if (application.__parent__.solutionPrefs && !solutionPrefs.design.statusLockWorkflow && globals.TRIGGER_registered_action_authenticate('cms page mode toggle')) {
//		
//		//in edit mode with unsaved changes
//		if (elements.btn_save.visible && forms.WEB_0F_page__browser_1F_block__editor.GET_modify()) {
//			var input = plugins.dialogs.showWarningDialog(
//						'Unsaved changes',
//						'There are unsaved changes.  Continue without saving?',
//						'Yes',
//						'No'
//				)
//			
//			if (input != 'Yes') {
//				return
//			}
//		}
//		
//		if (globals.WEB_page_mode == 3) {
//			MODE_set("Design")
//			
//			elements.lbl_edit.visible = false
//			elements.btn_edit.visible = false
//			elements.btn_save.visible = false
//			
//			elements.highlighter_dash.visible = false
//			elements.highlighter.visible = false
//			elements.lbl_detail.visible = false
//			
//			TOGGLE_group(false)
//			TOGGLE_version(false)
//			
//			//refire toggle
//			forms.WEB_0F_page__design_1F__header_display.FLD_data_change__version_selected()
//		}
//		else {
//			elements.highlighter_dash.visible = true
//			elements.lbl_detail.visible = true
//			
////			forms.WEB_0F_page__browser.elements.bn_browser.reload()
//			MODE_set("Real")	
//			
//			//toggle edit, groups, versions
//			TOGGLE_edit()
//			TOGGLE_group()
//			TOGGLE_version()		
//		}
//	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A164DFE9-D04B-454E-B5B7-194AC642627F"}
 */
function ACTION_mode(event) {
	
	//don't enter if workflow form locked for some reason or not enough access
	if (application.__parent__.solutionPrefs && !solutionPrefs.design.statusLockWorkflow && globals.TRIGGER_registered_action_authenticate('cms page mode toggle')) {
		
		//what is the current mode
		var currentMode = globals.WEB_page_mode
		
//		//in real mode with unsaved changes OR
//		if ((currentMode == 'BROWSER' && elements.btn_save.visible && forms.WEB_0F_page__browser_1F_block__editor.GET_modify()) ||
//		//in gui mode with unsaved changes (//TODO: abstract to work with all content types)
//			(currentMode == 'DESIGN' && forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.tab_detail.getTabFormNameAt(2) == 'WEB_0F__content' &&
//			forms.WEB_0F__content.elements.btn_save.enabled)) {
//			
//			var input = plugins.dialogs.showWarningDialog(
//						'Unsaved changes',
//						'There are unsaved changes.  Continue without saving?',
//						'Yes',
//						'No'
//				)
//			
//			//they want to keep their changes, abort
//			if (input != 'Yes') {
//				return
//			}
//		}
		
		//turn off everything
		elements.lbl_edit.visible = false
		elements.btn_edit.visible = false
		elements.btn_save.visible = false
		elements.highlighter.visible = false
//		elements.lbl_detail.visible = false
//		TOGGLE_group(false)
//		TOGGLE_version(false)
		TOGGLE_visit(false)
		
		//turn off all switches
		elements.gfx_switch_1.visible = false
		elements.gfx_switch_2.visible = false
		elements.gfx_switch_3.visible = false
		
		var mode = event.getElementName()
		
		//light switch clicked on, remap to label below
		if (utils.stringPatternCount(mode,'gfx')) {
			var whereClick = event.getX()
			if (whereClick > 73) {
				mode = 'lbl_mode_real'
			}
			else if (whereClick < 37) {
				mode = 'lbl_mode_data'
			}
			else {
				mode = 'lbl_mode_gui'
			}
		}
		
		switch (mode) {
			case 'lbl_mode_data':
				//go to non-real mode if not there already
				if (currentMode == 3) {
					//go to non-real mode
					MODE_set("Design")
								
					//refire toggle
					forms.WEB_0F_page__design_1F__header_display__version.FLD_version__data_change()
				}
				
				//set mode
				globals.WEB_page_mode = 1
				elements.gfx_switch_1.visible = true
				
				//show data
				forms.WEB_0F_page__design_1F_version.elements.tab_content.tabIndex = 2
				
				break
			case 'lbl_mode_gui':
				//go to non-real mode if not there already
				if (currentMode == 3) {
					//go to non-real mode
					MODE_set("Design")
					
					//refire toggle (may fire too frequently)
					forms.WEB_0F_page__design_1F_version_2L_scope.ACTION_gui_mode_load(true)
				}
				
				//set mode
				globals.WEB_page_mode = 2
				elements.gfx_switch_2.visible = true
				
				//reset pretty form (//TODO: make work for all block types)
//				if (forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.tab_detail.getTabFormNameAt(forms.WEB_0F_page__design_1F_version_2F_block__gui.elements.tab_detail.tabIndex) == 'WEB_0F__content') {
//					forms.WEB_0F__content.BLOCK_cancel(event)
//				}			
				
				//show gui
				forms.WEB_0F_page__design_1F_version.elements.tab_content.tabIndex = 1
				
				break
			case 'lbl_mode_real':
				//go to real mode if not there already
				if (currentMode != 3) {
					//set mode
					globals.WEB_page_mode = 3
					elements.gfx_switch_3.visible = true
					MODE_set("Real")
					
					//show breadcrumb url info
//					elements.lbl_detail.visible = true
					
					//toggle edit, groups, versions
					TOGGLE_edit()
//					TOGGLE_group()
//					TOGGLE_version()	
					TOGGLE_visit(true)
				}
				
				break
		}	
	}
}

/**
 *
 * @properties={typeid:24,uuid:"0E2D3D14-9796-4F16-880A-22F672A2E6A4"}
 */
function TOGGLE_edit(editMode) {
	//disable edits if edit flag not set
	if (!utils.hasRecords(forms.WEB_0F_page__design_1F_version.foundset) || forms.WEB_0F_page__design_1F_version.flag_lock) {
			//disable edits for active or non-latest versions
			//utils.hasRecords(fsVersions) && fsVersions.version_number != fsVersions.getSize() || fsVersions.flag_active) {
		editMode = false
	}
	//toggle edits (unless passed in false)
	else if (typeof editMode != 'boolean') {
		editMode = true
	}
	
	//set status of edit button
	elements.lbl_edit.visible = editMode
	elements.btn_edit.visible = editMode
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
	if (forms.WEB_0F_page__browser_1F_block__editor.GET_modify()) {
		var input = plugins.dialogs.showWarningDialog(
					'Unsaved changes',
					'There are unsaved changes.  Continue without saving?',
					'Yes',
					'No'
			)
		
		if (input != 'Yes') {
			return
		}
//		else {
//			forms.WEB_0F_page__browser_1F_block__editor._dataRec = null
//		}
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
//	elements.btn_groups.visible = false
//	elements.lbl_groups.visible = false	
//	elements.lbl_groups_tick.visible = false		
	elements.btn_save.visible = false	
//	elements.btn_versions.visible = false
//	elements.lbl_versions.visible = false
//	elements.lbl_versions_tick.visible = false	
	elements.btn_edit.visible = false
	elements.lbl_edit.visible = false
	TOGGLE_visit(false)
	
//	var modeToggle = globals.TRIGGER_registered_action_authenticate('cms page mode toggle')
//	elements.btn_dashboard.visible = modeToggle
//	elements.lbl_dashboard.visible = modeToggle
//	elements.btn_sitemap.visible = !modeToggle
//	elements.lbl_sitemap.visible = !modeToggle
//	elements.lbl_detail.visible = !modeToggle
	
	elements.gfx_switch_1.visible = false
	elements.gfx_switch_2.visible = true
	elements.gfx_switch_3.visible = false
	
	//hide highlighter
	elements.highlighter.visible = false
//	elements.highlighter_dash.visible = false
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"CA41B609-7116-4C2E-8C07-56BD3D16EADD"}
 */
function ACTION_sitemap(event) {
//	//don't enter if workflow form locked for some reason or not enough access
//	if (application.__parent__.solutionPrefs && !solutionPrefs.design.statusLockWorkflow) {// && globals.TRIGGER_registered_action_authenticate('cms page sitemap')) {
//		
//		//in edit mode with unsaved changes
//		if (elements.btn_save.visible && forms.WEB_0F_page__browser_1F_block__editor.GET_modify()) {
//			var input = plugins.dialogs.showWarningDialog(
//						'Unsaved changes',
//						'There are unsaved changes.  Continue without saving?',
//						'Yes',
//						'No'
//				)
//			
//			if (input != 'Yes') {
//				return
//			}
//		}
//		
//		//switch space to sitemap
//		if (!elements.highlighter_dash.visible) {
//			globals.TRIGGER_spaces_set('list')
//			elements.highlighter_dash.visible = true
//		}
//		//switch space to browser only
//		else {
//			globals.TRIGGER_spaces_set('workflow')
//			elements.highlighter_dash.visible = false
//		}
//	}
}

/**
 * @properties={typeid:24,uuid:"8BF29838-56DB-4911-B5B0-D9A24C8231B8"}
 */
function MODE_set(mode) {
	switch (mode) {
		case "Design":	
			forms.WEB_0F_page.elements.tab_main.removeTabAt(2)
			forms.WEB_0F_page.elements.tab_main.tabIndex = 1
			
			//reset enabled/disabled, etc.
			forms.WEB_0F_page__design.REC_on_select(null,true)
			
			//clear out browser bean
			forms.WEB_0F_page__browser.elements.bn_browser.html = '<html><body></body></html>'
			
			break;
		case "Real":	
			//following line only needed when returning to web mode after not being in it fulltime
			forms.WEB_0F_page__browser.REC_on_select(null,null,true)
			
			forms.WEB_0F_page.elements.tab_main.addTab( forms.WEB_0F_page__browser )
			forms.WEB_0F_page.elements.tab_main.tabIndex = 2
			break;
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4917AF30-667D-4A3E-BAE1-0A82F2A8CA25"}
 */
function FORM_on_show(firstShow, event) {
	//don't know why my edit button is showing...turn it off
	if (firstShow) {
		TOGGLE_edit(false)
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E30919EF-E82C-47A2-AAF8-CA1C8C015D64"}
 */
function ACTION_visit(event,returnURL,toClippy) {
	//see forms.WEB_0F_page__browser.URL_update
	
	//shift-click copies to clipboard
	if (globals.CODE_key_pressed('shift')) {
		toClippy = true
	}
	//right-click shows menu
	else if (event && event.getType() == JSEvent.RIGHTCLICK) {
		//set up menu with arguments
		var menu = new Array()
		
		menu[0] = plugins.popupmenu.createMenuItem('Copy to clipboard',ACTION_visit)
		menu[0].setMethodArguments(null,null,true)
		menu[1] = plugins.popupmenu.createMenuItem('Open default browser',ACTION_visit)
		
		plugins.popupmenu.showPopupMenu(elements.btn_visit, menu)
		
		return
	}
	
	var fsPage = forms.WEB_0F_page.foundset
	
	if (utils.hasRecords(fsPage)) {
		//only tack on exact specifier when not an external link
		if (fsPage.page_type != 2) {
			//specify index-style so parameters of platform, language, group, version guaranteed to work
				//will be re-directed to correctlyu url by controller
			var urlString = globals.WEBc_markup_link_page(fsPage.id_page.toString() + '_' + forms.WEB_0F_page__design_1F__header_display_2F_language._language.id_language.toString(),null,'Index')
			
			if (utils.hasRecords(forms.WEB_0F_page__design_1F__header_display_2F_platform._platform)) {
				urlString += "&platform=" + forms.WEB_0F_page__design_1F__header_display_2F_platform._platform.url_param
			}
			
			if (utils.hasRecords(forms.WEB_0F_page__design_1F__header_display_2F_language._language)) {
				urlString += "&language=" + forms.WEB_0F_page__design_1F__header_display_2F_language._language.url_param
			}
			
			if (utils.hasRecords(forms.WEB_0F_page__design_1F__header_display_2F_group._group)) {
				urlString += "&group=" + forms.WEB_0F_page__design_1F__header_display_2F_group._group.url_param
			}
			
			if (utils.hasRecords(forms.WEB_0F_page__design_1F_version.foundset)) {
				urlString += "&version=" + forms.WEB_0F_page__design_1F_version.url_param
			}
		}
		
		//return url
		if (returnURL) {
			return urlString
		}
		//put on clipboard
		else if (toClippy) {
			application.setClipboardContent(urlString)
		}
		//go to page
		else {
			globals.CODE_url_handler(urlString)
		}
	}
	else if (!returnURL) {
		plugins.dialogs.showErrorDialog(
					'Error',
					'You must have a page selected in order to preview it'
			)
	}
}
