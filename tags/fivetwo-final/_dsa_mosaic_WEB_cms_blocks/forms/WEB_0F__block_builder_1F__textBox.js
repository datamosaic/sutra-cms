/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"FEE96157-F927-477F-B800-0522497672E4"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"27A71377-F68E-4445-82B5-DAB9503F3C07"}
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
 * @properties={typeid:24,uuid:"A620C9C7-36EF-43FD-83AC-A5EBBD2BD0C4"}
 */
function onDataChange(oldValue, newValue, event) {
	forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected].record.data = newValue
}

/**
 * @properties={typeid:24,uuid:"6FB5BFDF-6425-4BF1-8542-6B5EF59023A2"}
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
