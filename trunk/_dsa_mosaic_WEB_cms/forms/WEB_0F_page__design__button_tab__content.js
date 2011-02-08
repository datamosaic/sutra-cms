/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f34"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"68F79827-95F6-44A8-903D-5975FBD5BA5A"}
 */
function RESIZE_beans(event) {
	var divOne = forms.WEB_0F_page__design__content.elements.bean_split_1
	var divTwo = forms.WEB_0F_page__design__content.elements.bean_split_2
	
	if (divOne.dividerSize || divTwo.dividerSize) {
		divOne.dividerSize = 0
		divTwo.dividerSize = 0
		
		forms.WEB_0F_page__design__content.elements.tab_area.setBorder('MatteBorder,0,0,1,0,#808080')
		forms.WEB_0F_page__design__content.elements.tab_block.setBorder('MatteBorder,0,0,0,0,#808080')
	}
	else {
		divOne.dividerSize = 8
		divTwo.dividerSize = 8
		
		forms.WEB_0F_page__design__content.elements.tab_area.setBorder('MatteBorder,0,1,1,0,#808080')
		forms.WEB_0F_page__design__content.elements.tab_block.setBorder('MatteBorder,1,1,0,0,#808080')		
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1D1948A1-1B87-4EE3-8F48-C5B6DDE609D0"}
 */
function REC_snapshot(event) {
	
	if (utils.hasRecords(forms.WEB_0F_page__design.foundset)) {
		//prompt for snapshot name
		var input = plugins.dialogs.showInputDialog(
						'Enter name',
						'Describe this snapshot (optional)'
				)
		
		var srcRecord = forms.WEB_0F_page__design.web_page_to_version.getRecord(1)
		var destRecord = globals.CODE_record_duplicate(srcRecord,["web_version_to_area.web_area_to_block.web_block_to_block_data"])
		
		srcRecord.version_name = input
		destRecord.version_number = srcRecord.version_number + 1
		destRecord.flag_active = null
		
		databaseManager.saveData()
		
		//update versions valuelist
		forms.WEB_0F_page__design.REC_on_select()
		
	}
	else {
		plugins.dialogs.showErrorDialog(
					'Error',
					'No page selected'
			)
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A8C65166-2D82-4306-969D-D9B1FCA5502C"}
 */
function SNAP_active(event) {
	var input = plugins.dialogs.showQuestionDialog(
					'Activate?',
					'Do you want to set the selected version active?\nNOTE: this will make it live on the web',
					'Yes',
					'No'
			)
	
	if (input == 'Yes') {
		//set all records to be inactive
		var fsUpdater = databaseManager.getFoundSetUpdater(forms.WEB_0F_page__design.web_page_to_version)
		fsUpdater.setColumn('flag_active',0)
		fsUpdater.performUpdate()		
		
		//find this version and set it active
		var fsVersion = databaseManager.getFoundSet(controller.getServerName(),'web_version')
		fsVersion.find()
		fsVersion.id_version = globals.WEB_version_selected
		fsVersion.search()
		
		fsVersion.flag_active = 1
		
		databaseManager.saveData()
		
		//update valuelist stating which is active
		forms.WEB_0F_page__design.REC_on_select()
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2C69D26C-0E92-4BCB-9A39-DDF0E66B8CF7"}
 */
function TOGGLE_display(event) {
	switch (event.getElementName()) {
		case 'btn_on':
			
			if (forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.getTabFormNameAt(2) == 'WEB_0F__content') {
				forms.WEB_0F__content.BLOCK_cancel()
			}			
			
			elements.btn_on.visible = false
			elements.btn_off.visible = true
			
			globals.WEB_page_mode = 1
			forms.WEB_0F_page__design__content.elements.tab_content.tabIndex = 1
			break
		case 'btn_off':
			//tinymce showing with edits, prompt to cancel
				//TODO: abstract to work with all content types
			if (forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.getTabFormNameAt(2) == 'WEB_0F__content' &&
				forms.WEB_0F__content.elements.btn_save.enabled) {
				
				var input = plugins.dialogs.showWarningDialog(
							'Unsaved changes',
							'There are unsaved changes.  Continue without saving?',
							'Yes',
							'No'
					)
				
				if (input != 'Yes') {
					break
				}
			}
			
			elements.btn_on.visible = true
			elements.btn_off.visible = false
			
			globals.WEB_page_mode = 2
			forms.WEB_0F_page__design__content.elements.tab_content.tabIndex = 2
			
			break			
	}
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"CB8ADEDF-333A-4B2D-80A1-FCC8E3F0C7D3"}
 */
function FORM_on_load(event) {
	//hide advanced mode status
	elements.btn_on.visible = false
	
	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"05C77F09-34C3-42BD-8C77-F6B090C5FCD0"}
 */
function VISIT_page(event) {
	//see forms.WEB_0F_page__browser.URL_update
	
	var fsPage = forms.WEB_0F_page.foundset
	
	if (utils.hasRecords(fsPage)) {
		
		var siteURL = globals.WEB_MRKUP_link_page(fsPage.id_page)
		
		globals.CODE_url_handler(siteURL)
	}
	else {
		plugins.dialogs.showErrorDialog(
					'Error',
					'You must have a page selected in order to preview it'
			)
	}
}
