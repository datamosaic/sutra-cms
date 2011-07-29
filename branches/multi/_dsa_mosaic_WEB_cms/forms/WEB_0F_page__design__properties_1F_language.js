/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"AC60CFEB-E487-4A8F-983D-6A9043552BAA"}
 */
function FORM_on_load(event) {
	elements.bean_drag.cursor = Packages.java.awt.Cursor.getPredefinedCursor(Packages.java.awt.Cursor.N_RESIZE_CURSOR)
	elements.bean_drag.addMouseMotionListener(new Packages.java.awt.event.MouseMotionAdapter({mouseDragged:dragDivider}))
}

/**
 * @properties={typeid:24,uuid:"E82F50B3-07D4-425C-8059-E5B8988B2C22"}
 */
function dragDivider(mouseEvent) {
	var splitPane = forms.WEB_0F_page__design__properties.elements.split_details
	
	splitPane.dividerLocation = splitPane.dividerLocation + mouseEvent.getY()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"9E8FCA21-C145-4CDD-ABD6-AEC851E91994"}
 */
function TAB_change(event) {
	globals.TAB_change_grid()
	
	elements.btn_add.enabled = forms.WEB_A__page._editMode
}
