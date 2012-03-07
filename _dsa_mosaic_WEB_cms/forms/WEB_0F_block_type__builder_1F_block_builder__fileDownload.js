/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"18AF9A8D-5CEA-4B16-A8C8-508E8B738A6B"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4A4BF373-4DAA-4C77-B2A1-4967314ED01A"}
 */
var _data = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"73FBCF68-95DD-4694-8CE2-9EFDCCA43055"}
 */
var _label = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F2363694-A2D5-4DCC-980B-14F8FA250219"}
 */
var _post = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"5A6F7C3D-B05D-41F9-8764-20FFB9EC0A70"}
 */
var _pre = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"226DD634-9398-4305-A71B-75CD1FEA3F8D",variableType:4}
 */
var _repeatable = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"AC582741-F462-40BF-BDE7-0CA0BC49FC58",variableType:4}
 */
var _required = null;

/**
 * @properties={typeid:24,uuid:"1ABDC5A1-D0C8-453C-B994-D2E04E56DC17"}
 */
function INIT_data(row) {
	_data = row.data
	_label = row.label
	_pre = row.wrapper.pre
	_post = row.wrapper.post
	_required = row.required
	_repeatable = row.repeatable
}
