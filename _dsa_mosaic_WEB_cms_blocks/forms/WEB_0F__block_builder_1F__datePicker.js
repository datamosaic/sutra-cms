/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"140ABA3A-E0C0-47F8-93F5-43876E7EE198"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"792C18B7-A33A-443A-A1E6-2AA6A40E53C4",variableType:93}
 */
var _data = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E73AF2EF-6EF8-4565-802B-4F4154E0FE41"}
 */
var _format = null;

/**
 * @properties={typeid:24,uuid:"2D5C9A8E-7DE3-49E1-9E0D-985646DD2167"}
 * @AllowToRunInFind
 */
function INIT_data(data) {
	if (!(data instanceof Array)) {
		data = new Array(data)
	}
	
	for (var i = 0; i < data.length; i++) {
		var row = data[i]
		
		if (row && row.data) {
			_data = new Date(row.data)
			_format = row.format
			
			elements.lbl_data.text = row.label || solutionModel.getForm(controller.getName()).getLabel('lbl_data').text
//			elements.lbl_format.text = row.name.label || solutionModel.getForm(controller.getName()).getLabel('lbl_format').text
		}
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
 * @properties={typeid:24,uuid:"EB4CCA1A-E3AF-473F-9EF9-5DD5B29137EA"}
 */
function onDataChange(oldValue, newValue, event) {
	var elemName = event.getElementName().split('_')
	var varName = elemName[1]
	var posn = elemName[2]

	var data = forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected]
	
	if (varName == 'data' && newValue instanceof Date) {
		data.record[varName] = newValue.getTime()
	}
	else {
		data.record[varName] = newValue
	}
}
