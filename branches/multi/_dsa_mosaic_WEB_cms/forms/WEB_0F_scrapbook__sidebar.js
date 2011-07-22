/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"AF296BB5-57E7-4DD2-B161-06415B2262BC"}
 */
function FORM_on_load(event) {
	elements.bean_drag.cursor = Packages.java.awt.Cursor.getPredefinedCursor(Packages.java.awt.Cursor.N_RESIZE_CURSOR)
	elements.bean_drag.addMouseMotionListener(new Packages.java.awt.event.MouseMotionAdapter({mouseDragged:dragDivider}))
}

/**
 * @properties={typeid:24,uuid:"B44B045B-4CB7-4488-BD97-2ACCC41C66CF"}
 */
function dragDivider(mouseEvent) {
	var splitPane = forms.WEB_0F_scrapbook.elements.split_sidebar
	
	splitPane.dividerLocation = splitPane.dividerLocation + mouseEvent.getY()
}
