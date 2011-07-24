/**
 * @properties={typeid:35,uuid:"8A2B5871-8938-48DF-AC6D-57FA0D4EF88C"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"7672B721-A546-4FD6-93C5-4E643BB3C08F"}
 */
function ACTION_mode(event) {
	//switch between gui and data mode
	forms.WEB_0F_scrapbook__header.TOGGLE_mode(event)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E22B7ED5-5CC9-4B8B-9234-94AE2FB5D174"}
 */
function ACTION_edit(event) {
	//toggle elements
	elements.btn_cancel.visible = true
	elements.btn_done.visible = true
	elements.btn_edit.visible = false
	
	//enter edit mode
	forms.WEB_0F_scrapbook.ACTION_edit_toggle(event)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B21EE2B3-F723-4BFE-B687-9F5B5C7EE33F"}
 */
function ACTION_cancel(event) {
	//cancel stuff
	forms.WEB_0F_scrapbook.ACTION_edit_toggle(event)
	
	//toggle elements
	elements.btn_cancel.visible = false
	elements.btn_done.visible = false
	elements.btn_edit.visible = true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"28631ED4-D06D-490B-B2C5-E02ED4C529A7"}
 */
function ACTION_save(event,noSave) {
	//save stuff down
	forms.WEB_0F_scrapbook.ACTION_edit_toggle(event,noSave)
	
	//toggle elements
	elements.btn_cancel.visible = false
	elements.btn_done.visible = false
	elements.btn_edit.visible = true
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E7077024-9767-4C11-A162-35D84FD43186"}
 */
function FORM_on_load(event) {
	//hide elements not shown for default state
	elements.btn_cancel.visible = false
	elements.btn_gui.visible = false
	elements.btn_done.visible = false
}
