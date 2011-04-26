/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f31"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"03CAC318-572E-4E23-BC3E-ECA968E7D7E7",variableType:4}
 */
var _editLocation = 0;

/**
 * @properties={typeid:35,uuid:"B0EEAB05-9BF7-4E41-B5E3-519BB7278576",variableType:-4}
 */
var _dataRec = null;

/**
 * @properties={typeid:35,uuid:"CE5D34A7-41F1-4B14-A923-B7CB21F02EAE",variableType:4}
 */
var _dataID = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0B39A5C8-5A32-42A7-94D6-7B05FF235547"}
 */
function FID_cancel(event) {
	application.closeFormDialog('cmsEditHover')
}

/**
 * @properties={typeid:24,uuid:"30E2A735-8C43-4621-BC9F-7045807A8E8B"}
 */
function FID_save(event) {
	var content = databaseManager.getFoundSet(controller.getServerName(),"web_block_data")
	content.find()
	content.id_block = _dataID
	var count = content.search()
	
	// content.data_value = htmlEdit
	content.data_value = elements.bn_editor.html
	databaseManager.saveData()
	forms.WEB_0F_page__browser.elements.bn_browser.reload()
	application.closeFormDialog()
	application.sleep(500)
	// turn on jquery edit stuff
	forms.WEB_0F_page__browser.EDIT_on()
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4763A94A-B219-4DB9-95AF-311329BA5A23"}
 */
function FORM_on_show(firstShow, event) {
	//there is data to be edited
	if (_dataRec && utils.hasRecords(_dataRec.web_block_data_to_block) && utils.hasRecords(_dataRec.web_block_data_to_block.web_block_to_block_display)) {
		//type of data, set different tab active to edit
		switch (_dataRec.web_block_data_to_block.web_block_to_block_type.block_name) {
			//TODO: this block needs to be recoded to work with new assets
			case 'Image':
				//hard coded to form, split out
				forms.WEB_0F__image.blockData = _dataRec
				
				//foundset with image datapoints
				var fsBlockData = _dataRec
				
				//create object with all properties
				var objImage = new Object()
				for (var i = 1; i <= fsBlockData.getSize(); i++) {
					var record = fsBlockData.getRecord(i)
					objImage[record.data_key] = record.data_value
				}
				
				//no image set yet
				if (!objImage.image_name){
					var html = 	'<html><head></head><body>' +
								'No image chosen yet' +
								'</body></html>'
				}
				// image is set
				else { 
					var siteURL = _dataRec.web_block_data_to_block.web_block_to_area.web_area_to_version.web_version_to_page.web_page_to_site.url
					
					if (siteURL) {
						siteURL = 'http://' + siteURL
						
						var port = application.getServerURL()
						port = port.split(':')
						if (port.length > 2) {
							siteURL += ':' + port[2]
						}
					}
					else {
						var siteDirectory = _dataRec.web_block_data_to_block.web_block_to_area.web_area_to_version.web_version_to_page.web_page_to_site.directory
						
						siteURL = application.getServerURL() + '/' + siteDirectory
					}
					
					var html = 	'<html><head></head><body>' +
								'<img src="' + siteURL + '/' + 
								objImage.directory + '/' + objImage.image_name + 
								'" height="' + objImage.height + '" width="' + objImage.width +'"' + '>' +
								'</body></html>'
				}
				
				forms.WEB_0F__image.elements.bn_browser.html = html
				forms.WEB_0F__image.TOGGLE_buttons(true)
				
				elements.tab_edit.addTab(forms.WEB_0F__image)
				elements.tab_edit.tabIndex = 1
				
				//all loaded fine
				return true
			break
			
			//tinymce
			case 'Content':
				//hard coded to form, split out
				forms.WEB_0F__content._recBlockData = _dataRec
				forms.WEB_0F__content.elements.bn_tinymce.html = _dataRec.data_value
				
			/*
			 * see the following locations for removal and addition of heavyweight forms
			 * 
			 * WEB_0F_page__browser.BLOCK_edit
			 * WEB_0F_page.TRIGGER_mode_set
			 * 
			 */
				
				elements.tab_edit.addTab(forms.WEB_0F__content)
				elements.tab_edit.tabIndex = 1
				
				//all loaded fine
				return true
			break
			
			//tinymce
			default:
				plugins.dialogs.showInfoDialog(
							'Coming soon',
							'Real mode editing is not implemented for this type of block'
						)
				
				//alert that form not loaded in correctly
				return false
		}
	}
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean} allow hide
 *
 * @properties={typeid:24,uuid:"863A9ABA-9B3F-496A-BAFF-D9CC605DEE47"}
 */
function ACTION_hide(event) {
	
	plugins.sutra.busyCursor = true
	
	//split pane in main window
	forms.WEB_0F_page__browser.SPLIT_set(false)	
	elements.tab_edit.removeAllTabs()
	
	//refresh the browser bean
	forms.WEB_0F_page__browser.URL_update(true)
	
	plugins.sutra.busyCursor = false
	
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"68ED3839-F777-4C5A-9092-B58E93601221"}
 */
function ACTION_location(event) {
	switch (event.getElementName()) {
		//in bottom mode, flip to side
		case 'btn_orient_bottom':
			elements.btn_orient_bottom.visible = false
			elements.btn_orient_side.visible = true
			
			_editLocation = 1
			
			break
		//in side mode, flip to bottom
		case 'btn_orient_side':
			elements.btn_orient_bottom.visible = true
			elements.btn_orient_side.visible = false
			
			_editLocation = 0
			
			break			
	}
	
	forms.WEB_0F_page__browser.SPLIT_set(true)
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4E166179-724D-4F8A-9C28-DC8E646D8CC1"}
 */
function FORM_on_load(event) {
	elements.btn_orient_side.visible = false
}

/**
 *
 * @properties={typeid:24,uuid:"C8433090-6B03-449E-8D51-2FF01609A566"}
 */
function GET_modify() {
	//there is data to be edited
	if (_dataRec && utils.hasRecords(_dataRec.web_block_data_to_block) && utils.hasRecords(_dataRec.web_block_data_to_block.web_block_to_block_display)) {
		//type of data, set different tab active to edit
		switch (_dataRec.web_block_data_to_block.web_block_to_block_type.block_name) {
			case false:
				
			break
			
			//tinymce
			case 'Content':
				return forms.WEB_0F__content.elements.btn_save.enabled
		}
	}
}
