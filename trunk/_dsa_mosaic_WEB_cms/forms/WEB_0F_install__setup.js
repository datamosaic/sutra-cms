/**
 * @properties={typeid:35,uuid:"00fde543-69cc-4de9-af47-7f7c22221f18"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"4212DD65-CD73-428B-93F1-BF5190DECD1F"}
 */
function FLD_data_change__type_server(oldValue, newValue, event) {
	
	switch (newValue) {
		case 'Mac':
			elements.fld_directory_linux.visible = false
			elements.fld_directory_mac.visible = true
			elements.fld_directory_windows.visible = false
			break
		case 'Windows':
			elements.fld_directory_linux.visible = false
			elements.fld_directory_mac.visible = false
			elements.fld_directory_windows.visible = true
			break
		case 'Linux':
			elements.fld_directory_linux.visible = true
			elements.fld_directory_mac.visible = false
			elements.fld_directory_windows.visible = false
			break
		default:
			elements.fld_directory_linux.visible = false
			elements.fld_directory_mac.visible = false
			elements.fld_directory_windows.visible = false
	}
	
	return true
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
 * @properties={typeid:24,uuid:"051111AA-C22E-4FC5-8586-D26223A2327F"}
 */
function FLD_data_change__directory(oldValue, newValue, event) {
	
	databaseManager.saveData()
	var provider = elements[event.getElementName()].getDataProviderID()
	
	// don't allow trailing "/"
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
	
	return true
}
