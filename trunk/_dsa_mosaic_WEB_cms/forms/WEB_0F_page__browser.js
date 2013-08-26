/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"F678A359-39E0-4470-BF81-FA6D7EAC02CB"}
 */
function FORM_on_show(firstShow, event) {
	_super.FORM_on_show(firstShow, event)
	
	if (firstShow && globals.WEB_preview_url) {
		elements.bn_browser.navigateTo(globals.WEB_preview_url)
	}
}

/**
*
* @properties={typeid:24,uuid:"FDEA259E-D465-4608-B1C1-8F53E7962AED"}
*/
function SPLIT_set(editMode) {
	
	var editLocation = forms.WEB_0F_page__browser_1F_block__editor._editLocation
	
	//edit mode on
	if (editMode) {
		//show it; only requierd one time when edit mode first shown
		if (!elements.tab_editor.visible) {
			elements.tab_editor.visible = true
		}
		
		//only switch orientation if needed
		if (elements.bean_split.orientation != editLocation) {
			elements.bean_split.orientation = editLocation
		}
		
		//side-wise location
		if (editLocation) {
			elements.bean_split.leftComponent	= elements.bn_browser
			elements.bean_split.rightComponent	= elements.tab_editor
			elements.bean_split.dividerLocation	= elements.bean_split.getWidth() - 400
		}
		//bottom location
		else {
			elements.bean_split.topComponent	= elements.bn_browser
			elements.bean_split.bottomComponent	= elements.tab_editor
			elements.bean_split.dividerLocation	= elements.bean_split.getHeight() / 2
		}
		
		elements.bean_split.dividerSize = 8
	}
	//edit mode off
	else {
		//side-wise location
		if (elements.bean_split.orientation) {
			elements.bean_split.leftComponent	= elements.bn_browser
			elements.bean_split.rightComponent	= null
		}
		//bottom location
		else {
			elements.bean_split.topComponent	= elements.bn_browser
			elements.bean_split.bottomComponent	= null
		}
		
		elements.bean_split.dividerSize = 0
	}
}

/**
*
* @properties={typeid:24,uuid:"CB9940A5-6AA6-4463-BB61-33DA0D5C4563"}
*/
function EDIT_on() {
	if (elements.bn_browser) {
		elements.bn_browser.executeJavaScript("editOn();")
	}
	else {
		globals.WEBc_browser_error()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"A21BD645-1554-448E-9BB8-DCAC38B35E4D"}
 */
function EDIT_off() {
	if (elements.bn_browser) {
		elements.bn_browser.executeJavaScript("editOff();")
	}
	else {
		globals.WEBc_browser_error()
	}
	
	if (elements.bean_split.bottomComponent) {
		SPLIT_set(false)
	}
}

/**
 * Smart client (browser bean specific version of URL update)
 * @param webMode
 *
 * @properties={typeid:24,uuid:"94F9C3EA-174B-4BC8-84A1-433F6B788A95"}
 */
function URL_update(webMode) {
	//see forms.WEB_0F_page__design__buton_tab__content.VISIT_page
	
	if (!elements.bn_browser) {
		globals.WEBc_browser_error()
	}
	
	//build up what we are going to show
	var placeholder = _super.URL_update(webMode)
	
	if (placeholder) {
		elements.bn_browser.html = placeholder
	}
	else {
		elements.bn_browser.navigateTo(globals.WEB_preview_url)
	}
	
	//wiggle window by 1px to force refresh (good to remove)
	var mainWindow = application.getWindow()
	mainWindow.setSize(mainWindow.getWidth(), mainWindow.getHeight() - 1)
	mainWindow.setSize(mainWindow.getWidth(), mainWindow.getHeight() + 1)
}