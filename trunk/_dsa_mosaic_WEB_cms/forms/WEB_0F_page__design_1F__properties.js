/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f57"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"AFD9DE7F-B435-4E32-B9AA-E1B808A00BD3"}
 */
function UTIL_add_versioning(event) {
	var input = globals.DIALOGS.showWarningDialog(
					'Warning!',
					'You only need to press this button once. It will...\n' + 
					'1- Create an "Everybody" group for all existing pages,\n' +
					'2- Add all content on all pages to Version 1\n' +
					'\n\nDo you want to continue?',
					'Yes',
					'No'
			)
	
	if (input == 'Yes') {
		var fsSites = databaseManager.getFoundSet(controller.getServerName(),'web_site')
		fsSites.loadAllRecords()
		
		//loop through all sites
		for (var i = 1; i <= fsSites.getSize(); i++) {
			var siteRec = fsSites.getRecord(i)
			
			//create a group
			var allGroup = siteRec.web_site_to_site_group.getRecord(siteRec.web_site_to_site_group.newRecord(false,true))
			allGroup.group_name = 'Everybody'
			databaseManager.saveData()
			
			if (utils.hasRecords(siteRec.web_site_to_page)) {
				var fsPages = siteRec.web_site_to_page
				
				for (var j = 1; j <= fsPages.getSize(); j++) {
					var pageRec = fsPages.getRecord(j)
					
					//add a version to this record
					var oneVersion = pageRec.web_page_to_version.getRecord(pageRec.web_page_to_version.newRecord(false,true))
					oneVersion.version_number = 1
					oneVersion.flag_active = 1
					oneVersion.flag_lock = 0
					oneVersion.version_name = 'Initial version'
					databaseManager.saveData()
					
					//link all areas to newly created version and group
					for (var k = 1; k <= pageRec.web_page_to_area__allversions.getSize(); k++) {
						var areaRec = pageRec.web_page_to_area__allversions.getRecord(k)
						areaRec.id_version = oneVersion.id_version
						areaRec.id_group = allGroup.id_group
					}
					
					databaseManager.saveData()
				}
			}
		}
		
		globals.DIALOGS.showInfoDialog(
					'Complete',
					'Versioning has been successfully added'
			)
	}
}

/**
 *
 * @properties={typeid:24,uuid:"DDC0907D-C04A-4759-A049-2D547368944E"}
 */
function UTIL_link_area_editable() {
	var input = globals.DIALOGS.showWarningDialog(
					'Warning!',
					'You only need to press this button once. It will create\n' + 
					'a link from all existing areas to their editable template.' +
					'\n\nDo you want to continue?',
					'Yes',
					'No'
			)
	
	if (input == 'Yes') {
		var fsSite = databaseManager.getFoundSet(controller.getServerName(),'web_site')
		fsSite.loadAllRecords()
		
		//make big mapping object with all editable areas
		var objEdit = new Object()
		
		//all sites
		for (var i = 1; i <= fsSite.getSize(); i++) {
			var recSite = fsSite.getRecord(i)
			
			var thisSite = 
				objEdit[recSite.site_name] = 
						{
					siteName	: recSite.site_name,
					siteID		: recSite.id_site,
					layout		: new Object()
				}
			
			var fsEditable = databaseManager.getFoundSet(controller.getServerName(),'web_editable')
			fsEditable.loadRecords(
							'SELECT web_editable.id_editable FROM web_editable where web_editable.id_layout IN ' +
							'(SELECT web_layout.id_layout FROM web_layout where web_layout.id_theme IN ' +
							'(SELECT web_theme.id_theme FROM web_theme where web_theme.id_site = ?))',
							[thisSite.siteID]
						)
			
			//all editable areas for selected site
			for (var j = 1; j <= fsEditable.getSize(); j++) {
				var recEditable = fsEditable.getRecord(j)
				
				//create container for this theme layout
				if (!thisSite.layout[recEditable.id_layout]) {
					var edits = thisSite.layout[recEditable.id_layout] = new Array()
				}
				//select correct container
				else {
					var edits = thisSite.layout[recEditable.id_layout]
				}
				
				//array of editable records has property with name saying which position it is in
				edits[recEditable.editable_name] = edits.length
				edits.push(recEditable)
			}
			
		}
		
		//loop through all sites
		var cnt = 0
		for (var i = 1; i <= fsSite.getSize(); i++) {
			var siteRec = fsSite.getRecord(i)
			
			//loop over all pages
			for (var j = 1; j <= siteRec.web_site_to_page.getSize(); j++) {
				var pageRec = siteRec.web_site_to_page.getRecord(j)
				
				//loop over all areas
				for (var k = 1; k <= pageRec.web_page_to_area__allversions.getSize(); k++) {
					var areaRec = pageRec.web_page_to_area__allversions.getRecord(k)
					
					//only add id_editable if not already defined, and enough data
					if (!areaRec.id_editable && areaRec.area_name && (
						siteRec.site_name && objEdit[siteRec.site_name] &&
						pageRec.id_theme_layout && objEdit[siteRec.site_name].layout[pageRec.id_theme_layout] &&
						objEdit[siteRec.site_name].layout[pageRec.id_theme_layout][areaRec.area_name] &&
						objEdit[siteRec.site_name].layout[pageRec.id_theme_layout][areaRec.area_name] < objEdit[siteRec.site_name].layout[pageRec.id_theme_layout].length
						)) {
						
						areaRec.id_editable = objEdit[siteRec.site_name].layout[pageRec.id_theme_layout][objEdit[siteRec.site_name].layout[pageRec.id_theme_layout][areaRec.area_name]].id_editable
						cnt++
						databaseManager.saveData(areaRec)
					}
				}
			}
		}
		
		//show alert that completed
		globals.DIALOGS.showInfoDialog(
					'Completed',
					'Exactly ' + cnt + ' record(s) have linked.'
			)
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"CCA1ABBD-6ECE-4C54-A81A-D8FC33781F50"}
 */
function ACTION_edit(event) {
	forms.WEB_0F_page__design_1F__button_tab.ACTION_edit()
}

/**
 *
 * @properties={typeid:24,uuid:"E32CA06C-1455-473E-A6E4-88023932D9E7"}
 */
function UTIL_page_type() {
	
	//set all pages that don't have a type set to "Page"
	var fsPage = databaseManager.getFoundSet(controller.getServerName(),'web_page')
	fsPage.loadAllRecords()
	
	var cnt = 0
	//all sites
	for (var i = 1; i <= fsPage.getSize(); i++) {
		var record = fsPage.getRecord(i)
		
		if (!record.page_type) {
			record.page_type = 0
			databaseManager.saveData(record)
			
			cnt++
		}
	}
	
	//show alert that completed
	globals.DIALOGS.showInfoDialog(
				'Completed',
				'Exactly ' + cnt + ' page(s) have been updated.'
		)
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A07C3EAA-9D2B-4AAB-8FF5-25926ED8E8F6"}
 */
function FORM_on_load(event) {
	// set detail split
	if (!solutionPrefs.config.webClient) {
		elements.split_details.topComponent		= elements.tab_detail
		elements.split_details.bottomComponent	= elements.tab_detail_bottom
		elements.split_details.bottomComponent	= null
	}
}

/**
 * @properties={typeid:24,uuid:"18A5DA18-8E96-4E36-B92C-2BDC0BE065A6"}
 */
function TAB_change(event) {
	globals.TAB_change_grid()
	
	//on language, show bottom
	if (elements.tab_detail.tabIndex == 4) {
		elements.split_details.bottomComponent	= elements.tab_detail_bottom
		
		if (_splitDivider + 10 >= elements.split_details.getHeight()) {
			_splitDivider = 110
		}
		
		elements.split_details.dividerLocation = _splitDivider
		
		//set tabpanel bordering to be thinner
//		elements.tab_detail.setBorder('SpecialMatteBorder,1.0,1.0,1.0,1.0,#647B95,#A1B0CF,#A1B0CF,#A1B0CF,0.0,')
	}
	//bottom tab panel was showing
	else if (elements.split_details.bottomComponent) {
		elements.split_details.bottomComponent	= null
		
		//restore tabpanel bordering
//		elements.tab_detail.setBorder('SpecialMatteBorder,1.0,1.0,3.0,1.0,#647B95,#A1B0CF,#A1B0CF,#A1B0CF,0.0,')
	}
	
//	elements.tab_detail_bottom.tabIndex = elements.tab_detail.tabIndex
//	
//	if (elements.tab_used_on.tabIndex == 4) {
//		elements.btn_add_page_attrib.visible = true
//	}
//	else {
//		elements.btn_add_page_attrib.visible = false
//	}
//	
//	forms[elements.tab_detail.getTabFormNameAt(elements.tab_detail.tabIndex)].REC_on_select()
}

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"8FD80689-2C57-47BA-9E8C-FECF47A8CD19",variableType:4}
 */
var _splitDivider = 110;

/**
 * @properties={typeid:24,uuid:"90ABEFE5-34A2-4007-89FA-AF32062CD7F1"}
 */
function TOGGLE_elements(editAllow) {
	//this form
	elements.fld_flag_ssl.enabled = editAllow
	elements.fld_flag_folder_skip.enabled = editAllow
	elements.fld_title_override.editable = editAllow
	elements.fld_description.editable = editAllow
	elements.btn_add.enabled = editAllow
	elements.lbl_edit.visible = editAllow
	
	//attributes
	forms.WEB_0F_page__design_1F__properties_2L_attribute.elements.btn_delete.visible = editAllow
	forms.WEB_0F_page__design_1F__properties_2L_attribute.elements.fld_id_site_attribute.visible = editAllow
	forms.WEB_0F_page__design_1F__properties_2L_attribute.elements.fld_attribute_key.visible = !editAllow
	forms.WEB_0F_page__design_1F__properties_2L_attribute.elements.fld_attribute_value.editable = editAllow
	
	//versions
	forms.WEB_0F_page__design_1F__properties_2L_version.elements.btn_delete.visible = editAllow
	forms.WEB_0F_page__design_1F__properties_2L_version.elements.fld_version_name.editable = editAllow
	
	//platforms
	forms.WEB_0F_page__design_1F__properties_2L_platform.elements.btn_delete.visible = editAllow
	
	//languages
	forms.WEB_0F_page__design_1F__properties_2L_language.elements.fld_page_name.editable = editAllow
	forms.WEB_0F_page__design_1F__properties_2L_language.elements.btn_delete.visible = editAllow
	forms.WEB_0F_page__design_1F__properties_2F_language.elements.btn_add.visible = editAllow
	
	//paths
	forms.WEB_0F_page__design_1F__properties_2F_language_3L_path.elements.btn_delete.visible = editAllow
	forms.WEB_0F_page__design_1F__properties_2F_language_3L_path.elements.fld_path.editable = editAllow
	forms.WEB_0F_page__design_1F__properties_2F_language_3L_path.elements.fld_flag_default.enabled = editAllow
	
	//seo
	forms.WEB_0F_page__design_1F__properties_2F_language_3L_meta_data.elements.btn_delete.visible = editAllow
	forms.WEB_0F_page__design_1F__properties_2F_language_3L_meta_data.elements.edit_data_value.editable = editAllow
	forms.WEB_0F_page__design_1F__properties_2F_language_3L_meta_data.elements.fld_data_key.editable = editAllow
}
