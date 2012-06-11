/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4632A298-A4A0-41FC-9679-A819B9C47A2A"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"09605113-059F-46C8-BC7E-43A17A7509F9"}
 */
var _html = null;

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"A630C9C7-36EF-43FD-83AC-A5EBBD2BD0C4"}
 */
function onDataChange(oldValue, newValue, event) {
	forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected].record.data = newValue
}

/**
 * @properties={typeid:24,uuid:"6FB5BBDF-6425-4BF1-8542-6B5EF59023A2"}
 */
function INIT_data(data) {
	if (data) {
		_html = data.data
	}
}
