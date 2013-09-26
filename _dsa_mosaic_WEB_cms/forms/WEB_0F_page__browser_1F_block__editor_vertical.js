/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6A58CC4A-058E-4536-ACCC-5AF8F100A27C"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"6D9749B0-1D35-446D-8388-F5254E34892D"}
 */
function ACTION_location(event) {
	forms.WEB_0F_page__browser_1F_block__editor.ACTION_location(event.getElementName())
}

/**
 * @properties={typeid:24,uuid:"0F305AC6-38A0-4851-BA0A-3126871FE3E7"}
 */
function EDIT_save() {
	//which form are we on (smart/web)
	var formStack = controller.getFormContext()
	if (formStack.getMaxRowIndex() > 1) {
		var parentForm = formStack.getValue(formStack.getMaxRowIndex()-1,2)
	}
	
	var blockForm = forms[parentForm].elements.tab_edit.getTabFormNameAt(forms[parentForm].elements.tab_edit.tabIndex)
	
	//custom save implemented
	if (forms[blockForm].BLOCK_save) {
		forms[blockForm].BLOCK_save()
	}
	//generic save
	else {
		globals.CMS.ui.save()
	}
}

/**
 * @properties={typeid:24,uuid:"968655FE-5CFA-43AC-B60D-4DC2FC842F14"}
 */
function EDIT_cancel() {
	//which form are we on (smart/web)
	var formStack = controller.getFormContext()
	if (formStack.getMaxRowIndex() > 1) {
		var parentForm = formStack.getValue(formStack.getMaxRowIndex()-1,2)
	}
	
	var blockForm = forms[parentForm].elements.tab_edit.getTabFormNameAt(forms[parentForm].elements.tab_edit.tabIndex)
	
	//custom cancel implemented
	if (forms[blockForm].BLOCK_cancel) {
		forms[blockForm].BLOCK_cancel()
	}
	//generic cancel
	else {
		globals.CMS.ui.cancel()
	}
}

/**
 * @properties={typeid:24,uuid:"54AF6F64-A2CA-43E4-AFC7-1529F91A751D"}
 */
function EDIT_delete() {
	//which form are we on (smart/web)
	var formStack = controller.getFormContext()
	if (formStack.getMaxRowIndex() > 1) {
		var parentForm = formStack.getValue(formStack.getMaxRowIndex()-2,2)
	}
	
	//record successfully deleted, hide 
	if (forms[parentForm].BLOCK_delete(utils.stringReplace(forms.WEB_0F_page__browser_1F_block__editor._scopeID,'-',''))) {
		forms.WEB_0F_page__browser_1F_block__editor.ACTION_hide()
	}
	else {
		EDIT_cancel()
	}
}
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"78231BB0-5E37-479D-8624-01D45CA612B3"}
 */
function ACTION_list(event) {
	if (event instanceof JSEvent) {
		var elem = elements[event.getElementName()]
		
		var menu = plugins.window.createPopupMenu()
		var item
	
		item = menu.addMenuItem("Save")
		item.setMethod(EDIT_save)
		
		item = menu.addMenuItem("Cancel")
		item.setMethod(EDIT_cancel)
		
		menu.addSeparator()
		
		item = menu.addMenuItem("Delete")
		item.setMethod(EDIT_delete)
		
		menu.show(elem)
	}
}

