/**
 * @properties={typeid:35,uuid:"A93B2937-07EF-4D98-900A-03670B87BE7F",variableType:-4}
 */
var _flagRefresh = false;

/**
 * @properties={typeid:35,uuid:"A54A1570-67C0-4483-8297-257CFA07C7F5",variableType:-4}
 */
var _elements = {};

/**
 * @properties={typeid:35,uuid:"7AE439CD-9A40-42C7-93ED-C0E0A73DCD0A",variableType:-4}
 */
var _elementsLayoutSelected = [];

/**
 * @properties={typeid:35,uuid:"9C377FD4-9471-47A7-A964-5F92707A3478",variableType:-4}
 */
var _elementsSelected = [];

/**
 * @properties={typeid:35,uuid:"6C1C3646-D6BD-49D3-BF86-BFE0E9CA4F6F",variableType:4}
 */
var _elementsProgressTotal = 0;

/**
 * @properties={typeid:35,uuid:"A48A461A-64DF-4483-9E9B-3777231B95F6",variableType:4}
 */
var _elementsPathsIncrementer = 0;

/**
 * @properties={typeid:35,uuid:"0554ECE9-051E-4327-B18D-E2CAB4805CEB",variableType:4}
 */
var _themesPathsIncrementer = 0;

/**
 * @properties={typeid:35,uuid:"B6F9030C-6D6F-49E5-833C-84BA10D0C982",variableType:4}
 */
var _elementsDone = 0;

/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f42"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"1E47C10C-B99F-4515-A4B9-B7B9E6C21C32",variableType:-4}
 */
var _themesLayoutSelected = [];

/**
 * @properties={typeid:35,uuid:"F4A4D331-DC9D-4A88-92BA-1C3DB491C91E",variableType:-4}
 */
var _themesSelected = [];

/**
 * @properties={typeid:35,uuid:"FBEF5A88-6127-4EB8-B47C-1E98E64213DF",variableType:4}
 */
var _themesProgressTotal = 0;

/**
 * @properties={typeid:35,uuid:"BF4E5E80-2FAA-4433-A737-EF8364AD273E",variableType:4}
 */
var _themesProgressCount = 0;

/**
 * @properties={typeid:35,uuid:"91FDF507-D6E2-4E87-BF0D-C0D2A6946A57",variableType:4}
 */
var _themesDone = 0;

/**
 * @properties={typeid:35,uuid:"563E0740-3E65-4C43-84B2-5EE80C9D81C3",variableType:-4}
 */
var _themesPaths = [];

/**
 * @properties={typeid:35,uuid:"CA483216-ED90-4FD6-8D30-292E98567DD0",variableType:-4}
 */
var _themes = {};

/**
 *
 * @properties={typeid:24,uuid:"8F31151F-873E-4BA0-A904-7533753AB256"}
 */
function ACTION_new_layout()
{	
	if (utils.hasRecords(foundset)) {
		web_theme_to_layout.newRecord(false, true)
		databaseManager.saveData()
		if (web_theme_to_layout.getSize() == 1) {
			web_theme_to_layout.flag_default = 1
		}
		web_theme_to_layout.layout_name = ''
		forms.WEB_0F_theme_1L_layout.elements.fld_layout_name.requestFocus(false)
		application.updateUI()
	}
	else {
		plugins.dialogs.showErrorDialog(
					'Error',
					'No theme selected.'
			)
	}	
}

/**
 *
 * @properties={typeid:24,uuid:"65163F29-D176-461F-AA37-9C27BCBB5D94"}
 */
function ACTION_set_path()
{
	// TODO: Currently only works from client on a server. Implement server directory browsing.
	var input = plugins.dialogs.showInfoDialog(	"Note",
	"Currently only works from client running on the Server.",
	"Continue", "Cancel")
	if ( input == "Continue") {
		var folder = plugins.file.showDirectorySelectDialog()
	}
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"7EC1827E-0F69-47EB-B222-2971B81C2728"}
 */
function FORM_on_load(event) {
	// set split 2
	elements.bean_split_2.leftComponent = elements.tab_editable
	elements.bean_split_2.rightComponent = elements.tab_editable_default
	elements.bean_split_2.dividerLocation = 200	
	
	// set split 1
	elements.bean_split_1.leftComponent = elements.tab_layout
	elements.bean_split_1.rightComponent = elements.bean_split_2
	elements.bean_split_1.dividerLocation = 300
	
	// set split 4
	elements.bean_split_4.leftComponent = elements.lbl_slide_2
	elements.bean_split_4.rightComponent = elements.lbl_slide_3
	elements.bean_split_4.dividerLocation = 200	
	
	// set split 3
	elements.bean_split_3.leftComponent = elements.lbl_slide_1
	elements.bean_split_3.rightComponent = elements.bean_split_4
	elements.bean_split_3.dividerLocation = 300
	
	
}

/**
 *
 * @properties={typeid:24,uuid:"A0A26AD2-C1ED-4D39-B923-4901B33B9CF6"}
 */
function REC_delete()
{
	var delRec = plugins.dialogs.showWarningDialog(
				'Delete record',
				'Do you really want to delete this record?',
				'Yes',
				'No'
			)

	if (delRec == 'Yes') {
		controller.deleteRecord()
		
		//dim out the lights
		if (!utils.hasRecords(foundset)) {
			FORM_on_show()
		}
	}
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
 * @properties={typeid:24,uuid:"F0F3FB67-B1E6-4D1F-9AE5-940B22838CE7"}
 */
function FLD_data_change__flag_default(oldValue, newValue, event) {
	var record = foundset.getRecord(foundset.getSelectedIndex())
	
	var fsTheme = databaseManager.getFoundSet('sutra_cms','web_theme')
	
	fsTheme.find()
	fsTheme.id_site = record.id_site
	fsTheme.search()
	
	if (newValue) {
		
		//fsupdater broken as of 5.1.4??
//		var fsUpdater = databaseManager.getFoundSetUpdater(fsTheme)
//		fsUpdater.setColumn('flag_default',0)
//		fsUpdater.performUpdate()
//
//		record.flag_default = 1
		
		for (var i = 1; i <= fsTheme.getSize(); i++) {
			var recTheme = fsTheme.getRecord(i)
			
			if (recTheme.id_theme != record.id_theme) {
				recTheme.flag_default = 0
			}
		}
		
		databaseManager.saveData()
	}
	else {
		plugins.dialogs.showErrorDialog(
					'Error',
					'There must be a default theme set'
			)
		
		record.flag_default = 1
	}
	
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"896936DD-2542-4E87-8D01-3D058BCBC274"}
 */
function LAYOUTS_action_list(event) {
	if (utils.hasRecords(foundset)) {
		//menu items
		var valuelist = new Array('Duplicate layout'/*,'-','Re-order editables on pages using selected layout'*/)
		
		//set up menu with arguments
		var menu = new Array()
		for ( var i = 0 ; i < valuelist.length ; i++ ) {
			menu[i] = plugins.popupmenu.createMenuItem(valuelist[i],LAYOUTS_action_list_control)
		
			menu[i].setMethodArguments(valuelist[i])
		
			if (menu[i].text == '----' || i == 1) {
				menu[i].setEnabled(false)
			}
		}
		
		//popup
		var elem = forms[event.getFormName()].elements[event.getElementName()]
		if (elem != null && valuelist.length) {
			plugins.popupmenu.showPopupMenu(elem, menu)
		}
	}
	else {
		plugins.dialogs.showErrorDialog(
					'Error',
					'No theme selected.'
			)
	}
}

/**
 * @properties={typeid:24,uuid:"332C7622-77A2-42B8-A8EB-B4135890E333"}
 */
function LAYOUTS_action_list_control(selected) {
	switch (selected) {
		case "Duplicate layout":  // duplicate layout, areas and blocks
			if (utils.hasRecords(web_theme_to_layout)) {
				var record = web_theme_to_layout.getRecord(web_theme_to_layout.getSelectedIndex())	
				var relations = new Array("web_layout_to_editable.web_editable_to_editable_default")
				var override = new Array(null,true,true)
				
				var dupRecord = globals.CODE_record_duplicate(record, relations, override)
				dupRecord.flag_default = null
				
				plugins.dialogs.showInfoDialog("Complete", "Layout duplicated")
			}
			break
		case "Re-order editables on pages using selected layout":
			if (utils.hasRecords(forms.WEB_0F_theme_1L_layout)) {
				var fsPages = databaseManager.getFoundSet('sutra_cms','web_page')
				
				fsPages.find()
				fsPages.id_site = forms.WEB_0F_site.id_site
				fsPages.id_theme = id_theme
				fsPages.id_theme_layout = forms.WEB_0F_theme_1L_layout.id_layout
				var results = fsPages.search()
				
				//prompt to continue
				if (results) {
					var input = plugins.dialogs.showQuestionDialog(
								'Re-order?',
								results + ' pages will be updated in this site. Proceed?',
								'Yes',
								'No'
						)
					
					if (input == 'Yes') {
						for (var i = 1; i <= fsPages.getSize(); i++) {
							var thePage = fsPages.getRecord(i)
							
							//TODO: set global variabls for group/version combo where id_version >= the active version
//							forms.WEB_0F_page__design_1F_version_2L_area.AREA_reorder(thePage)
						}
					}
				}
				else {
					plugins.dialogs.showInfoDialog(
									'Nothing to do',
									'No pages found in current site using this layout'
							)
				}
			}
			else {
				plugins.dialogs.showInfoDialog(
							'No layouts',
							'There are no layouts for the selected theme'
					)
			}
			break
	}
}

/**
 * @param {Integer} progress : used by streaming file callbacks to pass control back to this method
 * @param {boolean} _flagRefresh : sudo-parameter/form variable tracks if creating new theme or refreshing current theme
 * 
 * @properties={typeid:24,uuid:"B757D4CF-18E5-4D51-8A9B-9E4D5686530D"}
 */
function REC_new(progress) {
	// call file streaming functionality
	forms.WEB_0C__file_stream.THEME_new(0)
}

/**
 * Handle focus element loosing focus.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"E1AF70C2-4087-41C1-A588-5F413DD0FD5A"}
 */
function FIELD_directory_onLost(event) {
	// don't allow trailing "/"
	databaseManager.saveData()
	if ( theme_directory.search(/\/*$/) > 0 ) {
		theme_directory = theme_directory.replace(/\/*$/, "")
		databaseManager.saveData()
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"6A6517C7-831B-4579-A192-2ED134AEBB4C"}
 */
function FORM_on_show(firstShow, event) {
	if (firstShow) {
		//set divider locations
		var aThird = (controller.getFormWidth() - 22) / 3
		elements.bean_split_1.dividerLocation = aThird
		elements.bean_split_2.dividerLocation = aThird
		elements.bean_split_3.dividerLocation = aThird
		elements.bean_split_4.dividerLocation = aThird
	}
	
	//only do this when not running in data sutra
	if (!application.__parent__.solutionPrefs) {
		FILTER_records(event)
	}
	
	if (!utils.hasRecords(foundset)) {
		//make sure that doesn't lock us out of left-side lists
		if (solutionPrefs.config.activeSpace == 'workflow') {
			solutionPrefs.config.activeSpace = 'standard'
		}
		
		globals.WEB_lock_workflow(true)
	}
}

/**
 * @param {JSEvent} event the event that triggered the action
 * 
 * @properties={typeid:24,uuid:"A7C0E994-A29D-4BBA-9677-8F7608F29578"}
 */
function FILTER_records(event) {
	//find stuff for the selected site
	if (utils.hasRecords(forms.WEB_0F_site.foundset)) {
		foundset.find()
		foundset.id_site = forms.WEB_0F_site.id_site
		var results = foundset.search()
	}
	else {
		foundset.clear()
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D7D1CE91-8C52-4808-BE77-DA406B1D8B8B"}
 */
function ACTION_new_block(event) {
	forms.WEB_0F_theme_1L_editable_default.BLOCK_new()
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"C8199313-FD5E-49CD-BC36-6971DF267DAF"}
 */
function FORM_on_hide(event) {
	if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow) {
		globals.WEB_lock_workflow(false)
	}
	
	return true
}

/**
 * @properties={typeid:24,uuid:"B7A53703-B978-4BE6-8A0F-DA32B03BE60F"}
 */
function REC_refresh() {
	// call file streaming functionality
	forms.WEB_0C__file_stream._flagRefresh = true
	forms.WEB_0C__file_stream.THEME_new(0)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} input the event that triggered the action
 *
 * @properties={typeid:24,uuid:"229D5D35-E92C-4629-8759-6AAD67F19B95"}
 */
function ACTIONS_list(input) {
	//menu items
	var valuelist = new Array(
					'Refresh all pages'
				)
	
	//called to depress menu
	if (input instanceof JSEvent) {
		//set up menu with arguments
		var menu = new Array()
		
		for ( var i = 0 ; i < valuelist.length ; i++ ) {
			menu[i] = plugins.popupmenu.createMenuItem(valuelist[i],ACTIONS_list)
			
			menu[i].setMethodArguments(i)
			
			if (menu[i].text == '----') {
				menu[i].setEnabled(false)
			}
		}
		
		//popup
		var elem = forms[input.getFormName()].elements[input.getElementName()]
		if (elem != null) {
			plugins.popupmenu.showPopupMenu(elem, menu)
		}
	}
	else {
		if (globals.TRIGGER_registered_action_authenticate('cms theme layout page update')) {
			var refreshType = plugins.dialogs.showQuestionDialog(
						'Update layout',
						'Do you want to keep current data or reset to the theme\'s defaults?',
						'Keep data',
						'Reset data'
				)
				
			if (refreshType) {
				input = plugins.dialogs.showQuestionDialog(
							'Auto-activate?',
							'Should the updated versions be activated?',
							'Yes',
							'No'
					)
				
				var autoActivate = input == 'Yes'
				var pagesActivated = 0
				
				//get foundsets
				var fsPages = forms.WEB_0F_theme_1L_page.foundset
				var fsVersions = databaseManager.getFoundSet('sutra_cms','web_version')
				
				//maximum number of pages
				var maxPages = databaseManager.getFoundSetCount(fsPages)
				
				globals.CODE_cursor_busy(true)
				globals.TRIGGER_progressbar_start(0,'Refreshing pages...',null,0,maxPages)
				
				//loop over pages
				for (var i = 1; i <= fsPages.getSize(); i++) {
					var pageRec = fsPages.getRecord(i)
					
					globals.TRIGGER_progressbar_set(i)
					
					//loop all combinations of platform/language/group version stack
					for (var j = 1; j <= pageRec.web_page_to_platform.getSize(); j++) {
						var platformRec = pageRec.web_page_to_platform.getRecord(j)
						
						for (var k = 1; k <= pageRec.web_page_to_language.getSize(); k++) {
							var languageRec = pageRec.web_page_to_language.getRecord(k)
							
							for (var m = 1; m <= pageRec.web_page_to_group.getSize(); m++) {
								var groupRec = pageRec.web_page_to_group.getRecord(m)
								
								fsVersions.find()
								fsVersions.id_platform = platformRec.id_platform
								fsVersions.id_language = languageRec.id_language
								fsVersions.id_group = groupRec.id_group
								var results = fsVersions.search()
								
								if (results) {
									fsVersions.sort('version_number desc')
									
									var latestVersion = fsVersions.getRecord(1)
									
									//check to see that most recent version is actually on the correct layout
									if (latestVersion.id_layout == forms.WEB_0F_theme_1L_layout.id_layout) {
										//update theme (no data deleted)
										if (refreshType == 'Keep data') {
											forms.WEB_0F_page__design_1F_version_2L_area.AREA_add_missing(fsVersions,latestVersion,latestVersion,autoActivate)
										}
										//reset theme (deletes data)
										else if (refreshType == 'Reset data') {
											forms.WEB_0F_page__design_1F_version_2L_area.AREA_reset(fsVersions,latestVersion,latestVersion,autoActivate)
										}
										
										//record progress
										pagesActivated ++
									}
								}
							}
						}
					}		
				}
				
				plugins.dialogs.showInfoDialog(
							'Success',
							'The selected layout has been updated on ' + pagesActivated + ' page' + (pagesActivated == 1 ? '' : 's')  + '.'
					)
				
				globals.TRIGGER_progressbar_stop()
				globals.CODE_cursor_busy(false)
			}
		}
	}	
}
