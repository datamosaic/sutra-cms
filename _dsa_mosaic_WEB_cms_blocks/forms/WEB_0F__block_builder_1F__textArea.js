/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"54BBB373-B684-4D3F-831C-BFD77693C0A3"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C587651D-0798-41C6-9FE7-B2CCB314CB53"}
 */
var _text = null;

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"664BFF42-14AF-4AD0-81D1-00466EC79732"}
 */
function onDataChange(oldValue, newValue, event) {
	forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected].record.data = newValue
}

/**
 * @properties={typeid:24,uuid:"0CE014BE-3DDD-4AFC-BB81-0B8EC87B6518"}
 */
function INIT_data(data) {
	if (!(data instanceof Array)) {
		data = new Array(data)
	}
	
	for (var i = 0; i < data.length; i++) {
		var row = data[i]
		               
		if (row) {
			_text = row.data
			elements.lbl_label.text = row.label || solutionModel.getForm(controller.getName()).getLabel('lbl_label').text
		}
	}
}
