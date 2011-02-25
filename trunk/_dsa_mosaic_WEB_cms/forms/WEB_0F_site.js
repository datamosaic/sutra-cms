/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f47"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"F4E09655-F0E2-402A-907F-B5B944590FA8"}
 */
function REC_on_select(event) {
	var fsGroups = web_site_to_group
	
	//set group valuelist
	var vlReal = new Array()
	var vlDisplay = new Array()	
	
	if (utils.hasRecords(fsGroups)) {
		for (var i = 1; i <= fsGroups.getSize(); i++) {
			var recGroup = fsGroups.getRecord(i)
			
//			vlReal.push(recGroup.id_group)
//			vlDisplay.push(recGroup.group_name)
			
			if (recGroup.group_name == 'Everybody') {
				//set group to everybody
				globals.WEB_group_selected = recGroup.id_group
			}
		}
	}
	
	//find site-specific stuff
	forms.WEB_0F_asset.FORM_on_load()
	forms.WEB_0F_block_type.FORM_on_load()
	forms.WEB_0F_scrapbook.FORM_on_load()
	forms.WEB_0F_theme.FORM_on_load()
	forms.WEB_0T_page.FORM_on_load()
	
//	application.setValueListItems('WEB_group',vlDisplay,vlReal)
	
	//set global with site info
	globals.WEB_site_display = 'Site: ' + site_name
	
	//null out used-on page foundset if selected tab doesn't have any records
	if ((elements.tab_detail.tabIndex == 1 && !utils.hasRecords(web_site_to_group)) ||
		(elements.tab_detail.tabIndex == 2 && !utils.hasRecords(web_site_to_site_attribute))) {
		
		forms.WEB_0F_site_1L_page.foundset.clear()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"5F06FB01-8EE2-4283-A5F5-E2C1E4802045"}
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
		globals.WEB_site_display = null
		controller.deleteRecord()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"D99C1241-A9B8-4124-9279-7C04869AE230"}
 */
function REC_new() {
	controller.newRecord(false)
	
	//create a group
	var allGroup = web_site_to_group.getRecord(web_site_to_group.newRecord(false,true))
	allGroup.group_name = 'Everybody'
	
	//save
	databaseManager.saveData()
	
	//blow in default block types
//	forms.WEB_0F_block_type.BATCH_create()	
	
	//refire on select
	REC_on_select()
	
	elements.fld_site_name.requestFocus()
}

/**
 *
 * @properties={typeid:24,uuid:"DE93701D-6639-40BE-B977-D24295C1932F"}
 */
function ACTION_blow_in_missing_areas_to_all_pages() {
if (globals.TRIGGER_registered_action_authenticate('cms site page update')) {
	var input = plugins.dialogs.showWarningDialog(
					'Continue?',
					'Are you sure you want to modify all pages.\nWarning! This is irreversible.',
					'Yes',
					'No'
			)
	
	if (input == 'Yes') {
		//go to page layout
		forms.WEB_0F_page.controller.show()
		
		forms.WEB_0F_page.controller.find()
		forms.WEB_0F_page.id_site = id_site
		forms.WEB_0F_page.controller.search()
		
//		if (globals.TRIGGER_navigation_set('CMS_page',true,web_site_to_page)) {
			application.updateUI(4000)
			
			
			//loop over all pages in site
			for (var i = 1; i <= forms.WEB_0F_page.controller.getMaxRecordIndex(); i++) {
//				var input = plugins.dialogs.showQuestionDialog(
//							'Continue ' + i + '?',
//							'Meh.',
//							'Yes',
//							'No'
//					)
//				
//				if (input == 'No') {
//					return
//				}
//				else if (input == 'Yes') {
					//set selected index
					forms.WEB_0F_page.controller.setSelectedIndex(i)
					
					//run area diff method
					forms.WEB_0F_page__design__content_1L_area.AREA_add_missing()
//				}
//				
//				input = 'No'
			}
//		}
	}
}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"C79053B1-CA2A-4820-A7D3-65D2AD816FA3"}
 */
function ACTION_path_generate(event) {
	var input = plugins.dialogs.showWarningDialog(
					'Continue?',
					'This will add pretty URLs to all pages in this site\nthat do not have a default pretty URL',
					'Yes',
					'No'
			)
	
	if (input == 'Yes') {
		var fsPath = databaseManager.getFoundSet('sutra_cms','web_path')
		var fsPages = web_site_to_page
		var relnPath = 'web_page_to_path'
		
		var siteID = id_site
		
		//loop over all pages
		for (var i = 1; i <= fsPages.getSize(); i++) {
			var pageRec = fsPages.getRecord(i)
			
			//no paths, create
			if (!utils.hasRecords(pageRec[relnPath])) {
				var pathNameWanted = pageRec.page_name
				
				pathNameWanted = (pathNameWanted) ? pathNameWanted.toLowerCase() : 'blank'
				pathNameWanted = utils.stringReplace(pathNameWanted, ' ', '-')
				
				var pathName = pathNameWanted
				var cnt = 1
				var results = null
				
				while (results != 0) {
					fsPath.find()
					fsPath.id_site = siteID
					fsPath.path = pathName
					var results = fsPath.search()
					
					if (results) {
						pathName = pathNameWanted + cnt++
					}
				}
				
				var recPath = pageRec[relnPath].getRecord(pageRec[relnPath].newRecord(false,true))
				recPath.flag_default = 1
				recPath.path = pathName
				recPath.id_site = siteID
				
				databaseManager.saveData()
			}
		}
		
		plugins.dialogs.showInfoDialog(
					'Completed',
					'All pages for this site now have pretty urls'
			)
	}
}

/**
 * Perform the element default action.
 * @param method callback method to trigger when tree item is selected
 *
 * @properties={typeid:24,uuid:"FE1B37B7-F621-48C8-B232-E078047FED9E"}
 */
function SITE_tree(method) {
	
	function GET_page(pageRec) {
		if (utils.hasRecords(pageRec[relnPage])) {
			var subArray = new Array()
			
			subArray.push(
						//choose this page
							plugins.popupmenu.createMenuItem('Choose parent (' + pageRec.page_name + ')', method),
						//blank line
							plugins.popupmenu.createMenuItem('-', method)
					)
			
			// set arguments
			subArray[0].setMethodArguments(pageRec.id_page)
					
			// turn off '----'
			subArray[1].setEnabled(false)
			
			for (var j = 1; j <= pageRec[relnPage].getSize(); j++ ) {
				subArray.push(GET_page(pageRec[relnPage].getRecord(j)))
			}
			
			return plugins.popupmenu.createMenuItem(pageRec.page_name + "", subArray)
		}
		else {
			var item = plugins.popupmenu.createMenuItem(pageRec.page_name + "", method)
			item.setMethodArguments(pageRec.id_page)
			
			//disable dividers
			if (item.text == '----') {
				item.setEnabled(false)
			}
			
			return item
		}
	}
	
	var fsPages = databaseManager.getFoundSet(controller.getServerName(), 'web_page')
	var relnPage = 'web_page_to_page__child'
	
	fsPages.find()
	fsPages.parent_id_page = 0
	fsPages.id_site = id_site
	var results = fsPages.search()
	
	if (results) {
		fsPages.sort('order_by asc')
		
		//make array
		var menu = new Array()
		
		for (var i = 1 ; i <= fsPages.getSize() ; i++) {
			menu.push(GET_page(fsPages.getRecord(i)))
		}
		
		//pop up the popup menu
		var elem = forms[application.getMethodTriggerFormName()].elements[application.getMethodTriggerElementName()]
		if (elem != null) {
		    plugins.popupmenu.showPopupMenu(elem, menu);
		}
		
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EA6CC115-5079-415E-8E35-5B2FA942814C"}
 */
function ACTION_choose_home(event) {
	globals.WEB_page_tree_to_popup(forms.WEB_0F_site.ACTION_set_home)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EA6CC115-5079-415E-8E36-5B2FA942814C"}
 */
function ACTION_choose_error(event) {
	globals.WEB_page_tree_to_popup(forms.WEB_0F_site.ACTION_set_error)
}

/**
 *
 * @properties={typeid:24,uuid:"28287505-5072-4F40-BDBF-C3A0717BB35A"}
 */
function ACTION_set_home(inputID) {
	if (inputID) {
		id_page = inputID
		databaseManager.saveData()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"28287505-5072-4F40-BEBF-C3A0717BB35A"}
 */
function ACTION_set_error(inputID) {
	if (inputID) {
		id_page_error = inputID
		databaseManager.saveData()
	}
}

/**
 * @properties={typeid:24,uuid:"E27281B4-BC5B-46C5-8993-51C3F9CBE5BC"}
 */
function ACTION_attribute_update() {
	var input = plugins.dialogs.showWarningDialog(
				'Continue?',
				'This will link all page attributes to specific site attributes.\nYou must first define the attributes below.\n\nNote: this must be run once per site.',
				'Yes',
				'No'
		)
	
	if (input == 'Yes') {
		var fsAttribute = web_site_to_site_attribute
		var fsPages = web_site_to_page
		
		//build mapping of all attributes
		var mapAttrib = new Object()
		for (var i = 1; i <= fsAttribute.getSize(); i++) {
			var siteAttribRec = fsAttribute.getRecord(i)
			
			if (siteAttribRec.attribute_key) {
				mapAttrib[siteAttribRec.attribute_key] = siteAttribRec.id_site_attribute
			}
		}
		
		//loop over all pages
		for (var i = 1; i <= fsPages.getSize(); i++) {
			var pageRec = fsPages.getRecord(i)
			
			for (var j = 1; j <= pageRec.web_page_to_attribute.getSize(); j++) {
				var attribRec = pageRec.web_page_to_attribute.getRecord(j)
				
				if (attribRec.attribute_key && mapAttrib[attribRec.attribute_key]) {
					attribRec.id_site_attribute = mapAttrib[attribRec.attribute_key]
					databaseManager.saveData(attribRec)
				}
			}
		}
		
		plugins.dialogs.showInfoDialog(
					'Completed',
					'All page attributes on this site are now linked'
			)
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"3C6862A7-E141-4E96-B76D-8839FB10FD7C"}
 */
function TAB_change(event) {
	globals.TAB_change_grid()
	
	elements.tab_used_on.tabIndex = elements.tab_detail.tabIndex
	
	if (elements.tab_used_on.tabIndex == 2) {
		elements.btn_add_page_attrib.visible = true
	}
	else {
		elements.btn_add_page_attrib.visible = false
	}
	
	forms[elements.tab_detail.getTabFormNameAt(elements.tab_detail.tabIndex)].REC_on_select()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"DAB70AE4-3ABC-407F-A59C-ED21E3DD28E2"}
 */
function TAB_sec_add(event) {
	globals.TAB_btn_actions_list(null,'tab_used_on')
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A7337614-806A-4452-B0DC-18DEA06A0005"}
 */
function FORM_on_load(event) {
	elements.btn_add_page_attrib.visible = false
}

/**
 * Handle focus element loosing focus.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"A6977F22-63A1-4823-AE8D-C43D5A7A6B16"}
 */
function FIELD_directory_onLost(event) {
	// don't allow trailing "/"
	databaseManager.saveData()
	var provider = elements[event.getElementName()].getDataProviderID()
	if ( this[provider] && this[provider].search(/\/*$/) > 0 ) {
		this[provider] = this[provider].replace(/\/*$/, "")
		databaseManager.saveData()
	}
	// don't allow trailing "\\"
	if ( event.getElementName() == "fld_directory_windows" &&
		 this[provider] && this[provider].search(/\/*$/) > 0 ) {
		
		this[provider] = this[provider].replace(/\\*$/, "")
		databaseManager.saveData()
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8FE70347-AA8A-458C-B751-C0AE5E0B0254"}
 */
function FORM_on_show(firstShow, event) {
	if (forms.WEB_0F_install.rewrite_enabled) {
		elements.fld_pref_links.enabled = true
	}
	else {
		elements.fld_pref_links.enabled = false
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
 * @properties={typeid:24,uuid:"0407EBE6-09B2-4760-95D7-B1AE7491269A"}
 */
function FIELD_publish() {
	databaseManager.saveData()
	if ( site_name_publish_flag ) {
		if ( !site_name_publish_separator ) {
			site_name_publish_separator = " | "
		}
	}
}
