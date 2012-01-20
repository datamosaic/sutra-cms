/**
 * @properties={typeid:35,uuid:"F9CF727A-000F-4981-9A35-993357C6788F"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"8CE03E61-230C-4C68-A01A-A4CFAF784508"}
 */
var _link = null;

/**
 * @properties={typeid:35,uuid:"BC5889C0-D828-4D62-810C-E1796A0530F9"}
 */
var _name = null;

/**
 * @properties={typeid:24,uuid:"CAD516B0-F50C-4DBC-AE3B-371FDE84BDE6"}
 */
function INIT_data(data) {
	if (data && data.link && data.name) {
		var pageName = ''
		
		_link = data.link.data
		_name = data.name.data
		
		elements.lbl_link.text = data.link.label || solutionModel.getForm(controller.getName()).getLabel('lbl_link').text
		elements.lbl_name.text = data.name.label || solutionModel.getForm(controller.getName()).getLabel('lbl_name').text
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
 * @properties={typeid:24,uuid:"80D0521C-D6DB-4186-9DBA-DB0DC89847AE"}
 */
function onDataChange(oldValue, newValue, event) {
	var elemName = event.getElementName().split('_')
	var varName = elemName[1]
	var posn = elemName[2]
	
	var data = forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected]
	data.data[varName].data = newValue
}
