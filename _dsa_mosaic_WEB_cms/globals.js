/**
 * @properties={typeid:35,uuid:"59111D71-665C-4CE1-BBEF-EA4B1ADB6F0D",variableType:4}
 */
var WEB_block_scope__new = null;

/**
 * @properties={typeid:35,uuid:"484C4F77-B18E-4B39-89C7-59BFCFB5B6E5"}
 */
var WEB_block_version = null;

/**
 * @properties={typeid:35,uuid:"24385EA8-9C3C-4666-8A71-239F22D067E5",variableType:4}
 */
var WEB_block_scope = null;

/**
 * @properties={typeid:35,uuid:"24fde543-69cc-4de9-af47-7f7c22221f17"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"B1FA121E-7FCE-4CD5-97D2-AE0E75D79440"}
 */
var WEB_page_group = null;

/**
 * @properties={typeid:35,uuid:"17B52E70-9BEE-4FB1-9130-4230482F07B4"}
 */
var WEB_site_attribute_selected = null;

/**
 * @properties={typeid:35,uuid:"86AA4208-BDF9-4D86-8267-C3EB48EC6C32"}
 */
var WEB_page_platform = null;

/**
 * @properties={typeid:35,uuid:"BF6E24CB-9B98-4241-B8C2-CBE4CB520D6A",variableType:-4}
 */
var WEB_page_version = null;

/**
 * @properties={typeid:35,uuid:"5DDBD6FC-A0E1-4395-B10B-6154C12B4285"}
 */
var WEB_page_language = null;

/**
 * @properties={typeid:35,uuid:"9B43706E-FC30-4C33-92A2-DF039DBB4661"}
 */
var WEB_CONSTANT_DIRECTORY_CSS = '/site/css/';

/**
 * @properties={typeid:35,uuid:"70FADC68-5914-4719-99FF-09C1AC510F00"}
 */
var WEB_CONSTANT_DIRECTORY_FILES = '/site/files/';

/**
 * @properties={typeid:35,uuid:"7F3C6EDF-06EB-4E6F-8DAC-281576B7F5BA"}
 */
var WEB_CONSTANT_DIRECTORY_IMAGES = '/site/images/';

/**
 * @properties={typeid:35,uuid:"E84BDBC5-7F23-4857-AA61-5ADFD2CD5A04"}
 */
var WEB_CONSTANT_DIRECTORY_JS = '/site/js/';

/**
 * @properties={typeid:35,uuid:"C926688D-5B93-42A2-B288-0E2ADF9116BC"}
 */
var WEB_CONSTANT_DIRECTORY_THEMES = '/site/themes/';

/**
 * @properties={typeid:35,uuid:"DD53BF5B-DD20-4B47-911A-41051101A010",variableType:4}
 */
var WEB_page_mode = 2;

/**
 * @properties={typeid:35,uuid:"F5BD30C1-1A0F-436A-9320-9812076B6B72"}
 */
var WEB_page_sort = 'order_by asc';

/**
 * @properties={typeid:35,uuid:"14FD6120-E9BF-4EC2-973D-9790A6F6903F"}
 */
var WEB_preview_url = null;

/**
 * @properties={typeid:35,uuid:"87BE1F80-1634-4DC2-B9DA-29CB5B7CF054"}
 */
var WEB_site_display = null;

/**
 * @properties={typeid:35,uuid:"15313654-99B2-4BCA-9D6F-0D37F917C5DD"}
 */
var WEB_tag_choose = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"523C0FEA-E636-4CBF-930C-5C4D7B8F601B"}
 */
function WEB_simple_edit(event) {

	var append = '_1F__button_tab'
	var buttonsName = (event.getFormName) ? event.getFormName() : event
	var formName = buttonsName.substring(0,buttonsName.length - append.length)
	
	//get offset from forms
	var tabA = (forms[formName].TAB_header_size) ? forms[formName].TAB_header_size('A') : 40
	var tabB = (forms[formName].TAB_header_size) ? forms[formName].TAB_header_size('B') :  250
	var offset = tabB - tabA - ((forms[formName].TAB_header_size) ? forms[formName].TAB_header_size('space') : 10)
	
	//only go to edit if currently on display
	if (forms[formName].elements.tab_header_detail.tabIndex != 2) {
		//allowed to roll-down header area?
			//MEMO: this global method only used on pages screen; so modifcations ok
		if (!forms.WEB_0T_page._addRecord && forms.WEB_0F_page.page_type == 0 && !utils.hasRecords(forms.WEB_0F_page__design_1F_version.foundset)) {
			plugins.dialogs.showQuestionDialog(
						'Error',
						'No version selected'
				)
			return
		}
		
		//turn autosave off
		databaseManager.setAutoSave(false)
		
		//set new size of this tab panel
		forms[formName].elements.tab_header_detail.setSize(forms[formName].elements.tab_header_button.getWidth(),tabB)
		
		//go to editable fields
		forms[formName].elements.tab_header_detail.tabIndex = 2
		
		//move/resize other tab panels
		forms[formName].elements.tab_main.setLocation(0,forms[formName].elements.tab_main.getLocationY() + offset)
		forms[formName].elements.tab_main.setSize(forms[formName].elements.tab_header_button.getWidth(),forms[formName].elements.tab_main.getHeight() - offset)
		
		//flip graphic
		forms[buttonsName].elements.btn_cancel.visible = true
		forms[buttonsName].elements.btn_edit.visible = false
		
		//freeze screen
		globals.TRIGGER_interface_lock(true)
		
		if (forms[formName] && forms[formName].elements.gfx_curtain) {
			forms[formName].elements.gfx_curtain.visible = true
		}
	}
	//prompt to cancel current edits
	else {
	
	//	var answer = plugins.dialogs.showWarningDialog(
	//							'Cancel?',
	//							'Cancel all header edits?',
	//							'Yes',
	//							'No'
	//						)
		
		if (true) {//answer == 'Yes') {
			//rollback edited records
			databaseManager.rollbackEditedRecords()
			
			//turn autosave back on
			databaseManager.setAutoSave(true)
			
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
			
			//unfreeze screen
			if (solutionPrefs.config.lockStatus) {
				globals.TRIGGER_interface_lock(false)
			}
			
			//hack to re-lock up the page screen
			if (solutionPrefs.config.currentFormName == 'WEB_0F_page') {
				forms.WEB_A__page.TOGGLE_edit_mode(false)
			}
			
			if (forms[formName] && forms[formName].elements.gfx_curtain) {
				forms[formName].elements.gfx_curtain.visible = false
			}
		}
	}
}

/**
 * @properties={typeid:35,uuid:"791D7FA7-752E-42BD-9BD8-90FDC1548242",variableType:4}
 */
var WEB_tag_kind = null;

/**
 *
 * @properties={typeid:24,uuid:"73565A5D-1041-4CB5-99AD-6F5263680E13"}
 */
function WEB_simple_save() {
	var proceed = true
	
	//if method on calling form, execute it
	var formName = application.getMethodTriggerFormName()
	if (formName && forms[formName] && forms[formName].ACTION_save) {
		var proceed = forms[formName].ACTION_save()
	}
	
	//if false returned from custom method, don't save
	if ((typeof proceed == 'boolean') ? proceed : true) {
		var suffix = '_1F__header_edit'
		var parentForm = formName.substring(0,formName.length - suffix.length)
		
		//get offset from forms
		var tabA = (forms[parentForm].TAB_header_size) ? forms[parentForm].TAB_header_size('A') : 40
		var tabB = (forms[parentForm].TAB_header_size) ? forms[parentForm].TAB_header_size('B') :  250
		var offset = tabB - tabA - ((forms[parentForm].TAB_header_size) ? forms[parentForm].TAB_header_size('space') : 10)
		
		//save outstanding data
		databaseManager.saveData()
		
		//turn autosave back on
		databaseManager.setAutoSave(true)
		
		//set new size of this tab panel
		forms[parentForm].elements.tab_header_detail.setSize(forms[parentForm].elements.tab_header_button.getWidth(),tabA)
		
		//go to display-only fields
		forms[parentForm].elements.tab_header_detail.tabIndex = 1
		
		//move/resize other tab panels
		forms[parentForm].elements.tab_main.setLocation(0,forms[parentForm].elements.tab_main.getLocationY() - offset)
		forms[parentForm].elements.tab_main.setSize(forms[parentForm].elements.tab_header_button.getWidth(),forms[parentForm].elements.tab_main.getHeight() + offset)
		
		//flip graphic
		forms[parentForm + '_1F__button_tab'].elements.btn_cancel.visible = false
		forms[parentForm + '_1F__button_tab'].elements.btn_edit.visible = true
		
		//unfreeze screen if locked
		if (solutionPrefs.config.lockStatus) {
			globals.TRIGGER_interface_lock(false)
		}
		
		//hack to re-lock up the page screen
		if (solutionPrefs.config.currentFormName == 'WEB_0F_page') {
			forms.WEB_A__page.TOGGLE_edit_mode(false)
		}
		
		if (forms[parentForm] && forms[parentForm].elements.gfx_curtain) {
			forms[parentForm].elements.gfx_curtain.visible = false
		}
	}
}

/**
 *
 * @properties={typeid:24,uuid:"1A173034-4601-40F4-8017-9F4151F86C0E"}
 */
function WEB_simple_cancel() {
	
	var callingForm = application.getMethodTriggerFormName()
	
	var suffix = '_1F__header_edit'
	
	var formName = callingForm.substring(0,callingForm.length - suffix.length)
	
	var buttonsForm = formName + '_1F__button_tab'
	
	globals.WEB_simple_edit(buttonsForm)


}

/**
 * @properties={typeid:24,uuid:"47BC6C70-6E6A-4095-9614-B925C3716083"}
 */
function WEB_lock_workflow(lockWorkflow,lockList) {
	
/*
 *	TITLE    :	WEB_lock_workflow
 *			  	
 *	MODULE   :	
 *			  	
 *	ABOUT    :	lock the workflow form (opposite of globals.TRIGGER_interface_lock)
 *			  	
 *	INPUT    :	1- true/false to lock/unlock the workflow
 *			  	2- true/false to lock/unlock the list area
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	DEV_lock_workflow([lockWorkflow], [lockList]) Locks the workflow and/or list areas; when called without arguments, refires current state
 *			  	
 *	MODIFIED :	February 27, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */

if (application.__parent__.solutionPrefs) {
	//old version
	if (solutionModel.getForm('DATASUTRA_0F_solution') && forms.DATASUTRA_0F_solution.elements.gfx_curtain_2) {
		lockWorkflow = (typeof lockWorkflow == 'boolean') ? lockWorkflow : solutionPrefs.design.statusLockWorkflow
		lockList = (typeof lockList == 'boolean') ? lockList : solutionPrefs.design.statusLockList
		
		var baseForm = solutionPrefs.config.formNameBase
		
		//lock the workflow
		if (lockWorkflow) {
			
			var x = 0
			var y = 44		//offset for design mode and normal header
			var divider = 8
			
			var x2 = 0
			var y2 = 44
			
			//figure out location of curtain
			switch (solutionPrefs.config.activeSpace) {
				case 'standard':
					y2 += solutionPrefs.screenAttrib.spaces.standard.currentVertical
					
					if (solutionPrefs.config.flexibleSpace) {
						y2 += divider
					}
				case 'standard flip':
					x += solutionPrefs.screenAttrib.spaces.standard.currentHorizontal
					
					if (solutionPrefs.config.flexibleSpace) {
						x += divider
					}
					break
					
				case 'list':
				case 'list flip':
					x += solutionPrefs.screenAttrib.spaces.list.currentHorizontal
					
					if (solutionPrefs.config.flexibleSpace) {
						x += divider
					}
					
					if (solutionPrefs.config.activeSpace == 'list flip') {
						var nonList = true
					}
					break
					
				case 'vertical':
					x2 += solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalOne
					
					if (solutionPrefs.config.flexibleSpace) {
						x2 += divider
					}
				case 'vertical flip':
					x += solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalOne + solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalTwo
					
					if (solutionPrefs.config.flexibleSpace) {
						x += divider
					}
					break
					
				case 'centered':
					x2 += application.getWindowWidth(null) - solutionPrefs.screenAttrib.spaces.centered.currentHorizontalTwo
					
					if (solutionPrefs.config.flexibleSpace) {
						x2 += divider
					}
				case 'centered flip':
					x += solutionPrefs.screenAttrib.spaces.centered.currentHorizontalOne
					
					if (solutionPrefs.config.flexibleSpace) {
						x += divider
					}
					
					break
					
				case 'classic':
					x2 += solutionPrefs.screenAttrib.spaces.classic.currentHorizontal
					
					if (solutionPrefs.config.flexibleSpace) {
						x2 += divider
					}
				case 'classic flip':
					x += solutionPrefs.screenAttrib.spaces.classic.currentHorizontal
					y += solutionPrefs.screenAttrib.spaces.classic.currentVertical
					
					if (solutionPrefs.config.flexibleSpace) {
						x += divider
						y += divider
					}
					break
					
				case 'wide':
					x2 += solutionPrefs.screenAttrib.spaces.wide.currentHorizontal
					
					if (solutionPrefs.config.flexibleSpace) {
						x2 += divider
					}
				case 'wide flip':
					y += solutionPrefs.screenAttrib.spaces.wide.currentVertical
					
					if (solutionPrefs.config.flexibleSpace) {
						y += divider
					}
					break
					
				case 'workflow':
					if (solutionPrefs.config.activeSpace == 'workflow') {
						var nonList = true
					}
					break
					
				case 'workflow flip':
					if (!lockList) {
						forms[baseForm].elements.gfx_curtain.visible = false
						forms[baseForm].elements.gfx_curtain_2.visible = false
						return
					}
					else {
						nonList = true
					}
					break
			}
			
		//CURTAIN ONE
			//set location
			forms[baseForm].elements.gfx_curtain.setLocation(x,y)
			//set size
			forms[baseForm].elements.gfx_curtain.setSize(
									forms[baseForm].elements.tab_content_C.getWidth(),
									forms[baseForm].elements.tab_content_C.getHeight()
								)
			
			//turn on curtain
			forms[baseForm].elements.gfx_curtain.visible = true
		
		//CURTAIN TWO
			if (lockList && !nonList) {
				//set location
				forms[baseForm].elements.gfx_curtain_2.setLocation(x2,y2)
				//set size
				forms[baseForm].elements.gfx_curtain_2.setSize(
										forms[baseForm].elements.tab_content_B.getWidth(),
										forms[baseForm].elements.tab_content_B.getHeight()
									)
				
				//turn on curtain
				forms[baseForm].elements.gfx_curtain_2.visible = true
			}
			else {
				//turn off curtain
				forms[baseForm].elements.gfx_curtain_2.visible = false
			}
			
	//		//turn off tabpanel
	//		forms[baseForm].elements.tab_content_C.enabled = false
	//				
	//		//there is a form in tab panel
	//		if (forms[baseForm].elements.tab_content_C.tabIndex) {
	//			var formName = forms[baseForm].elements.tab_content_C.getTabFormNameAt(forms[baseForm].elements.tab_content_C.tabIndex)
	//			
	//			//if a subheader present, turn it on
	//			if (forms[formName].elements.gfx_subheader) {
	//				forms[formName].elements.gfx_subheader.enabled = true
	//			}
	//		}
		}
		//unlock the workflow
		else {
			//turn off curtains
			forms[baseForm].elements.gfx_curtain.visible = false
			forms[baseForm].elements.gfx_curtain_2.visible = false
			
	//		//turn on tabpanel
	//		forms[baseForm].elements.tab_content_C.enabled = true
		}
		
		//track state of workflow lockedness
		solutionPrefs.design.statusLockWorkflow = lockWorkflow
		solutionPrefs.design.statusLockList = lockWorkflow && lockList
	}
	//most recent version
	else {
		globals.DEV_lock_workflow(lockWorkflow,lockList)
	}
}
}

/**
 * @properties={typeid:24,uuid:"48FC5C3F-2354-442E-BE6A-4963B953E080"}
 */
function WEB_startup_hack() {
	//disable rec_on_select of the block type form
	globals.WEB_block_on_select = false
	
	//show all forms with browser beans so they don't error out on initial view
	forms.WEB_0F__image.controller.show()
	forms.WEB_0F__html.controller.show()
	forms.WEB_0F__code.controller.show()
	forms.WEB_0F__content.controller.show()
	application.sleep(1500)
	forms.WEB_0F__content_view.controller.show()
	forms.WEB_0F_page__browser.controller.show()
	
	//hit up headless client so get zooming effect on first load
//	plugins.http.getPageData(globals.WEBc_markup_link_base() + 'index.jsp')
	
	forms.DATASUTRA_0F_solution.controller.show()
}

/**
 * @properties={typeid:24,uuid:"88B20E7F-82B4-4235-87EE-C291469E681A"}
 */
function WEB_browser_error() {
	var input = plugins.dialogs.showErrorDialog(
				'Error',
				'The Browser Suite did not initialize properly.\nRestart client now.',
				'Yes',
				'No'
		)
	
	if (input == 'Yes') {
		application.exit()
	}
}

/**
 * @properties={typeid:24,uuid:"CEE8177B-36B3-47A5-9CD7-574FDEBA51ED"}
 */
function WEB_site_find_restrict() {
	return forms.WEB_0F_site.id_site
}
