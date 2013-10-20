/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f65"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"EA0C65CB-5F3E-4242-89BE-2DB1D762D828",variableType:4}
 */
var _pageTab = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"A2E9443D-D5F8-4C03-8558-EBC37B87A4CC",variableType:4}
 */
var _editMode = 0;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"7A1D15B5-ED63-436E-BF37-0F7B761D275A"}
 */
var _liveForm = null;

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
 * @param {JSEvent} [event] the event that triggered the action
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

	// when shift key held, make sure to do a bean refresh
	if (globals.CODE_key_pressed('shift') && _liveForm == 'WEB_0F_page__browser') {
		forms.WEB_0F_page__browser.elements.bn_browser.reload()
		application.sleep(500)
	}

//	shouldn't be possible to press this button when not in real mode	
//	// toggle to browser if not there already
//	if (globals.WEB_page_mode != 3) {
//		MODE_set("Live")
//	}

	globals.WEBc_log_create('page','page edit begin',forms.WEB_0F_page.id_site,'web_page',forms.WEB_0F_page.id_page)

	// turn on jquery edit stuff
	forms[_liveForm].EDIT_on()
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
		forms[_liveForm].URL_update()
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
function TOGGLE_resize(shown) {
	if (typeof shown != 'boolean') {
		shown = false
	}

	elements.btn_resize.visible = shown
	elements.lbl_resize.visible = shown
	elements.lbl_resize_tick.visible = shown
}

/**
 * @param {Boolean} [showVersion]
 * 
 * @properties={typeid:24,uuid:"530CE94C-E1F2-47D0-9BF9-C4FF4FD027DF"}
 */
function TOGGLE_version(showVersion) {
	if (typeof showVersion != 'boolean') {
		//only show button when more than one version
//		var versions = application.getValueListItems('WEB_page_version')
//		showVersion = (versions.getMaxRowIndex() > 1) ? true : false
		//need button to create versions even when only one
		showVersion = true
	}

	elements.btn_versions.visible = showVersion
	elements.lbl_versions.visible = showVersion
	elements.lbl_versions_tick.visible = showVersion
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} input the event that triggered the action
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

		//actions at the top of menu
			menu[0] = plugins.popupmenu.createMenuItem("Activate version",ACTION_version)
			if (forms.WEB_0F_page__design_1F_version.foundset.flag_active) {
				menu[0].setEnabled(false)
			}
			menu[0].setMethodArguments('Activate')

			if (forms.WEB_0F_page__design_1F_version.foundset.flag_lock) {
				menu[1] = plugins.popupmenu.createMenuItem("Unlock version",ACTION_version)
				if (!globals.WEBc_sutra_trigger('TRIGGER_registered_action_authenticate',['cms edit version'])) {
					menu[1].setEnabled(false)
				}
				menu[1].setMethodArguments('Unlock')
			}
			else {
				menu[1] = plugins.popupmenu.createMenuItem("Lock version",ACTION_version)
				if (!globals.WEBc_sutra_trigger('TRIGGER_registered_action_authenticate',['cms edit version'])) {
					menu[1].setEnabled(false)
				}
				menu[1].setMethodArguments('Lock')
			}

			menu.push(plugins.popupmenu.createMenuItem('---'))
			menu[2].setEnabled(false)

			menu[3] = plugins.popupmenu.createMenuItem("New version",ACTION_version)
			menu[3].setMethodArguments('New')

			menu.push(plugins.popupmenu.createMenuItem('-'))

		//hard code to only show 15 most recent versions
		for ( var i = 1 ; i <= fsVersions.getSize() && i < 15; i++ ) {
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

			if (application.__parent__.solutionPrefs && solutionPrefs.config.webClient) {
				displayVal = displayVal.replace(/(<([^>]+)>)/ig,'')
			}

			if (globals.WEB_page_version.toString() == recVersion.id_version.toString()) {
				menu[i + 4] = plugins.popupmenu.createCheckboxMenuItem(displayVal,ACTION_version)
				menu[i + 4].setSelected(true)
			}
			else {
				menu[i + 4] = plugins.popupmenu.createMenuItem(displayVal,ACTION_version)
			}

			menu[i + 4].setMethodArguments(recVersion.id_version)

			if (menu[i + 4].text == '-') {
				menu[i + 4].setEnabled(false)
			}
		}

		//popdown
		var elem = elements.lbl_versions
		if (elem != null && menu.length > 1) {
			plugins.popupmenu.showPopupMenu(elem, menu)
		}
	}
	//menu shown and item chosen
	else {
		//switch version
		if (input instanceof UUID) {
			//update selected version
			globals.WEB_page_version = input
		}
		//perform action
		else {
			var pseudoEvent = new Object()

			switch (input) {
				case 'New':
					forms.WEB_0F_page__design_1F__header_display__version.ADD_version()
					break
				case 'Lock':
					forms.WEB_0F_page__design_1F__header_display__version.LOCK_version()
					break
				case 'Unlock':
					forms.WEB_0F_page__design_1F__header_display__version.LOCK_version()
					break
				case 'Activate':
					pseudoEvent.getElementName = function() {return 'btn_check_off'}
					forms.WEB_0F_page__design_1F__header_display__version.ACTIVATE_version(pseudoEvent)
					break
			}
		}

		//show/hide edit button
		TOGGLE_edit()

		//regenerate html
		forms[_liveForm].URL_update()

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
		forms[_liveForm].REC_on_select(null,null,true)
	}
}


/**
 * Perform the element right-click action.
 *
 * @param {JSEvent} [event] the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E8F05192-65E5-4A40-9EB5-B423B34F8371"}
 */
function ACTION_version_actions(event) {
	//when right clicked, give a moment to grab focus elsewhere
	if (event instanceof JSEvent) {
		var elem = elements[event.getElementName()]

		var menu = plugins.window.createPopupMenu()
		var item

		item = menu.addMenuItem("Activate version")
		item.setMethod(ACTION_version_actions)
		item.enabled = !forms.WEB_0F_page__design_1F_version.foundset.flag_active
		item.methodArguments = ['Activate']

		if (forms.WEB_0F_page__design_1F_version.foundset.flag_lock) {
			item = menu.addMenuItem("Unlock version")
			item.setMethod(ACTION_version_actions)
			item.enabled = globals.WEBc_sutra_trigger('TRIGGER_registered_action_authenticate',['cms edit version'])
			item.methodArguments = ['Unlock']
		}
		else {
			item = menu.addMenuItem("Lock version")
			item.setMethod(ACTION_version_actions)
			item.enabled = globals.WEBc_sutra_trigger('TRIGGER_registered_action_authenticate',['cms edit version'])
			item.methodArguments = ['Lock']
		}

		menu.addSeparator()


		item = menu.addMenuItem("New version")
		item.setMethod(ACTION_version_actions)
		item.methodArguments = ['New']

		menu.show(elem)
	}
	else {
		var pseudoEvent = new Object()

		switch (arguments[5]) {
			case 'New':
				forms.WEB_0F_page__design_1F__header_display__version.ADD_version(event)
				break
			case 'Lock':
				forms.WEB_0F_page__design_1F__header_display__version.LOCK_version(event)
				break
			case 'Unlock':
				forms.WEB_0F_page__design_1F__header_display__version.LOCK_version(event)
				break
			case 'Activate':
				pseudoEvent.getElementName = function() {return 'btn_check_off'}
				forms.WEB_0F_page__design_1F__header_display__version.ACTIVATE_version(pseudoEvent)
				break
		}

		//show/hide edit button
		TOGGLE_edit()

		//regenerate html
		forms[_liveForm].URL_update()

		//assumption here is that foundset is in sync with this valuelist (convert version to reverse ordered record list)
		forms.WEB_0F_page__design_1F_version.foundset.selectRecord(globals.WEB_page_version)

		//update display and reload version valuelist; don't reload versions foundset
		forms[_liveForm].REC_on_select(null,null,true)
	}
}

/**
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2EFD8325-BF6F-40CC-8188-C445DAB04ECC"}
 */
function ACTION_resize(event) {
	//when right clicked, give a moment to grab focus elsewhere
	if (event instanceof JSEvent) {
		var menu = plugins.window.createPopupMenu()
		var item
		
		item = menu.addMenuItem("Phone small (320 x 480)")
		item.setMethod(ACTION_action)
		item.methodArguments = ['']
		item = menu.addMenuItem("Phone phablet (1920 x 1080)")
		item.setMethod(ACTION_action)
		item.methodArguments = ['']
		
		menu.addSeparator()

		item = menu.addMenuItem("Tablet 7\" (1024 x 600)")
		item.setMethod(ACTION_action)
		item.methodArguments = ['']
		item = menu.addMenuItem("iPad non-retina (1024 x 768)")
		item.setMethod(ACTION_action)
		item.methodArguments = ['']
		item = menu.addMenuItem("iPad retina (2048 x 1536)")
		item.setMethod(ACTION_action)
		item.methodArguments = ['']
		item = menu.addMenuItem("Tablet 4K (3840 x 2560)")
		item.setMethod(ACTION_action)
		item.methodArguments = ['']
		
		menu.addSeparator()

		item = menu.addMenuItem("Old computer (1024 x 768)")
		item.setMethod(ACTION_action)
		item.methodArguments = ['']
		item = menu.addMenuItem("Not that old computer (1280 x 1024)")
		item.setMethod(ACTION_action)
		item.methodArguments = ['']
		item = menu.addMenuItem("Current computer (1680 x 1050)")
		item.setMethod(ACTION_action)
		item.methodArguments = ['']
		item = menu.addMenuItem("Full HD (1920 x 1080)")
		item.setMethod(ACTION_action)
		item.methodArguments = ['']

		menu.show(elements.lbl_resize)
	}
	else {
		
	}
}

/**
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"FD3DEF73-7E36-42F6-AAA2-6F99837D21DE"}
 */
function ACTION_action(event) {
	//when right clicked, give a moment to grab focus elsewhere
	if (event instanceof JSEvent) {
		var menu = plugins.window.createPopupMenu()
		var item
		
		var subMenu = menu.addMenu('Visit...')
		item = subMenu.addMenuItem(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT ? 'Open web page' : 'Open default browser')
		item.setMethod(ACTION_action)
		item.methodArguments = ['Visit']
		item = subMenu.addMenuItem('Copy URL to clipboard')
		item.setMethod(ACTION_action)
		item.methodArguments = ['Copy to clipboard']
		
		if (globals.WEB_page_mode == 3) {
			item = menu.addMenuItem("Hard refresh page")
			item.setMethod(ACTION_action)
			item.methodArguments = ['Hard refresh']
		}
		
		menu.addSeparator()
		
		item = menu.addMenuItem("Refresh theme")
		item.setMethod(ACTION_action)
		item.methodArguments = ['Refresh theme']
		
		menu.addSeparator()

		subMenu = menu.addMenu('Import...')
		item = subMenu.addMenuItem("Image")
		item.setMethod(ACTION_action)
		item.methodArguments = ['Import image']
		item = subMenu.addMenuItem("File")
		item.setMethod(ACTION_action)
		item.methodArguments = ['Import file']

		menu.show(elements.lbl_action)
	}
	else {
		switch (arguments[5]) {
			case 'Visit':
				ACTION_visit()
				break
			case 'Copy to clipboard':
				ACTION_visit(null,null,true)
				break
			case 'Hard refresh':
				if (_liveForm == 'WEB_0F_page__browser') {
					forms.WEB_0F_page__browser.elements.bn_browser.reload()
					application.sleep(500)
				}
				else {
					forms.WEB_0F_page__live__web.URL_update(elements.highlighter.visible)
				}
				break
			case 'Refresh theme':
				forms.WEB_0F_page.THEME_refresh()
				break
			case 'Import image':
				forms.WEB_0C__file_stream.IMAGE_import("images")
				break
			case 'Import file':
				forms.WEB_0C__file_stream.FILE_import("files")
				break
			case 'Activate':
				pseudoEvent.getElementName = function() {return 'btn_check_off'}
				forms.WEB_0F_page__design_1F__header_display__version.ACTIVATE_version(pseudoEvent)
				break
		}
		
		//regenerate html
//		forms[_liveForm].URL_update()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"37CB81D0-259B-445E-9FDC-C15B3328574D"}
 */
function BREAD_update() {
	var simple = true

	var label = '<html><body><center>'
//	label += 'Group ' + application.getValueListDisplayValue('WEB_page_group',globals.WEB_page_group).substr(12) + '&nbsp;&nbsp;&nbsp;&nbsp;'
//
//	if (simple) {
//		label += '<br>'
//	}

	if (forms.WEB_0F_page__design_1F_version.foundset.flag_lock) {
		label += '<strong>LOCKED</strong><br />'
	}

	label += '' + application.getValueListDisplayValue('WEB_page_version',globals.WEB_page_version)

//	if (!simple) {
//		label += '<br>'
//		label += '<b>URL</b> ' + globals.WEB_preview_url + '<br>'
//	}

	label += '</center></body></html>'

	elements.lbl_detail.text = label
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
 * @properties={typeid:24,uuid:"A164DFE9-D04B-454E-B5B7-194AC642627F"}
 */
function ACTION_mode(event) {
	//don't enter if workflow form locked for some reason, in toolbar configurator, or not enough access
	if (application.__parent__.solutionPrefs && solutionPrefs.config.currentFormName != 'MGR_0F_toolbar' && !solutionPrefs.design.statusLockWorkflow && globals.WEBc_sutra_trigger('TRIGGER_registered_action_authenticate',['cms page mode toggle'])) {
		//what is the current mode
		var currentMode = globals.WEB_page_mode

		//turn off everything
		elements.lbl_edit.visible = false
		elements.btn_edit.visible = false
		elements.btn_save.visible = false
		elements.highlighter.visible = false
		elements.lbl_detail.visible = false
//		elements.lbl_action.visible = false
//		elements.lbl_action_tick.visible = false		
//		elements.btn_action.visible = false
//		TOGGLE_group(false)
		TOGGLE_version(false)
		TOGGLE_resize(false)

		//turn off all switches
		elements.gfx_switch_1.visible = false
		elements.gfx_switch_2.visible = false
		elements.gfx_switch_3.visible = false

		var mode = event.getElementName()

		//light switch clicked on, remap to label below
		if (utils.stringPatternCount(mode,'gfx')) {
			var whereClick = event.getX()
			if (whereClick > 73) {
				mode = 'lbl_mode_dev'
			}
			else if (whereClick < 37) {
				mode = 'lbl_mode_page'
			}
			else {
				mode = 'lbl_mode_edit'
			}
		}
		
		function siteMap() {
			//in wc try to get to sitemap
			if (solutionPrefs.config.webClient && !forms.WEB_0F_page._siteMap) {
				globals.WEBc_sutra_trigger('TRIGGER_ul_tab_list',[scopes.CMS.util.getTreeForm(),'Sitemap',0])
				forms.WEB_0F_page._siteMap = true
			}
		}

		switch (mode) {
			case 'lbl_mode_page':	//overview
				//go to non-real mode if not there already
				if (currentMode == 3) {
					//go to non-real mode
					forms.WEB_0F_page.elements.tab_main.removeTabAt(2)
					forms.WEB_0F_page.elements.tab_main.tabIndex = 1

					//reset enabled/disabled, etc.
					forms.WEB_0F_page__design.REC_on_select(null,true)

					//clear out browser bean
					if (!solutionPrefs.config.webClient) {
						forms.WEB_0F_page__browser.elements.bn_browser.html = '<html><body></body></html>'
					}
					
					//default to gui/data
					globals.WEB_page_mode = 2
				}

				//set mode
				elements.gfx_switch_1.visible = true
				
				//tabs
				forms.WEB_0F_page__design.elements.tab_header_button.tabIndex = 1
				forms.WEB_0F_page__design.elements.tab_main.tabIndex = _pageTab

				break
			case 'lbl_mode_dev':	//gui and data
				siteMap()
				
				//go to non-real mode if not there already
				if (currentMode == 3) {
					forms.WEB_0F_page.elements.tab_main.removeTabAt(2)
					forms.WEB_0F_page.elements.tab_main.tabIndex = 1

					//reset enabled/disabled, etc.
					forms.WEB_0F_page__design.REC_on_select(null,true)

					//clear out browser bean
					if (!solutionPrefs.config.webClient) {
						forms.WEB_0F_page__browser.elements.bn_browser.html = '<html><body></body></html>'
					}
					
					//data
					if (forms.WEB_0F_page__design_1F_version.elements.tab_content.tabIndex == 2) {
						//refire toggle
						forms.WEB_0F_page__design_1F__header_display__version.FLD_version__data_change()
						
						globals.WEB_page_mode = 1
					}
					//gui
					else {
						var fsArea = forms.WEB_0F_page__design_1F_version_2L_area.foundset
						//update sort order for all blocks
						for (var i = 1; i <= fsArea.getSize(); i++) {
							var areaRec = fsArea.getRecord(i)
	
							if (utils.hasRecords(areaRec.web_area_to_scope)) {
								areaRec.web_area_to_scope.sort('sort_order desc')
								areaRec.web_area_to_scope.sort('sort_order asc')
							}
						}
	
						//refire toggle (may fire too frequently)
//						forms.WEB_0F_page__design_1F_version_2L_scope.ACTION_gui_mode_load(true)
						globals.WEB_page_mode = 2					
					}
				}
				//save page mode location
				else if (forms.WEB_0F_page__design.elements.tab_header_button.tabIndex == 1 && forms.WEB_0F_page__design.elements.tab_main.tabIndex <= 4) {
					_pageTab = forms.WEB_0F_page__design.elements.tab_main.tabIndex
				}

				//set mode
				elements.gfx_switch_3.visible = true
				
				//tabs
				forms.WEB_0F_page__design.elements.tab_header_button.tabIndex = 2
				forms.WEB_0F_page__design.elements.tab_main.tabIndex = 5

				break
			case 'lbl_mode_edit':	//real mode (browser bean)
				siteMap()
				
				//go to real mode if not there already
				if (currentMode != 3) {
					//save page mode location
					if (forms.WEB_0F_page__design.elements.tab_header_button.tabIndex == 1 && forms.WEB_0F_page__design.elements.tab_main.tabIndex <= 4) {
						_pageTab = forms.WEB_0F_page__design.elements.tab_main.tabIndex
					}
					
					//set mode
					globals.WEB_page_mode = 3
					
					//flip tab panels
					forms.WEB_0F_page.elements.tab_main.addTab( forms[_liveForm] )
					forms.WEB_0F_page.elements.tab_main.tabIndex = 2

					//following line only needed when returning to web mode after not being in it full-time
					forms[_liveForm].REC_on_select(null,null,true)
				}
				
				//set mode
				elements.gfx_switch_2.visible = true
				
				//show breadcrumb url info
				elements.lbl_detail.visible = true

				//toggle edit, groups, versions
				TOGGLE_edit()
//				TOGGLE_group()
				TOGGLE_version()
				TOGGLE_resize(true)
				
//				elements.lbl_action.visible = true
//				elements.lbl_action_tick.visible = true
//				elements.btn_action.visible = true

				break
		}
	}
}

/**
 * @param {Boolean} [editMode]
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
 * @param {JSEvent} [event] the event that triggered the action
 *
 * @properties={typeid:24,uuid:"41EB5461-ACE2-4C29-B980-E6488AEFE199"}
 */
function ACTION_save(event) {
	//any unsaved changes?
	if (forms.WEB_0F_page__browser_1F_block__editor.GET_modify()) {
		var input = globals.DIALOGS.showWarningDialog(
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

	forms[_liveForm].EDIT_off()
}

/**
 *
 * @properties={typeid:24,uuid:"DDB53BF6-144F-4AF7-8963-21FD2C801A99"}
 */
function FORM_on_load() {
	TOGGLE_resize(false)

	//form name
	_liveForm ='WEB_0F_page__browser'

	//defaults to live mode in web or smart with a/c set
	if (application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT || false) {
		//form name
		_liveForm = 'WEB_0F_page__live__web'
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
	//don't know we need this....
	if (firstShow) {
		elements.gfx_switch_1.visible = true
		elements.gfx_switch_2.visible = false
		elements.gfx_switch_3.visible = false
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} [event] the event that triggered the action
 * @param {Boolean} [returnURL] return the url instead of navigating
 * @param {Boolean} [toClippy] copy directly to clipboard
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
		menu[1] = plugins.popupmenu.createMenuItem((application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT ? 'Open in new tab' : 'Open default browser'),ACTION_visit)

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
			globals.CODE_clipboard_set(urlString)
		}
		//go to page
		else {
			globals.CODE_url_handler(urlString,(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT ? '_blank' : null))
		}
	}
	else if (!returnURL) {
		globals.DIALOGS.showErrorDialog(
					'Error',
					'You must have a page selected in order to preview it'
			)
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"3DFBF4A6-2167-4F76-8D44-D51BF9289ED9"}
 */
function ACTION_import(event) {
	forms.WEB_0C__file_stream.IMAGE_import("images")
}