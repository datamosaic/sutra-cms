/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4FDACEFD-6F16-46A7-827B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * Perform sort.
 *
 * @param {String} dataProviderID element data provider
 * @param {Boolean} asc sort ascending [true] or descending [false]
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"C2954487-52D5-4BC8-A277-70026FF00A53"}
 */
function SORT(dataProviderID, asc, event) {
	controller.sort('rec_modified' + (asc ? ' asc' : ' desc'), false)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"700F86DF-F130-4CEF-A6B2-F5584F9D3FF0"}
 */
function REC_select(event) {
	foundset.setSelectedIndex(foundset.getSelectedIndex());
}
