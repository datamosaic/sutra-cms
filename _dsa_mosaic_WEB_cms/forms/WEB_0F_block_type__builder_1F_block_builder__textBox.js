/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1E256446-5720-4637-9FCB-AC0BD88C1218"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"79D3BC3A-FA39-4539-B294-44025409B130"}
 */
var _data = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6459A7B6-6096-4B5F-934E-972B54947037"}
 */
var _label = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1DA47DF9-6D78-43A5-AD7A-875F76A04CC5"}
 */
var _post = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"351A4B8F-1944-4B77-9891-B0D0CF1EC461"}
 */
var _pre = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"279F3ABE-7545-4F7D-CABC-C686E75A6305",variableType:4}
 */
var _chars = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"279F3ABE-7545-4F7D-BABC-C686E75A6305",variableType:4}
 */
var _repeatable = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"A5A79513-59D6-4604-B1B1-A9E81B99C2FB",variableType:4}
 */
var _required = null;

/**
 * @properties={typeid:24,uuid:"D2CB230B-F9B3-41CE-B4BC-46CA9E55C1DE"}
 */
function INIT_data(row) {
	_data = row.data
	_label = row.label
	_pre = row.wrapper.pre
	_post = row.wrapper.post
	_required = row.required
	_repeatable = row.repeatable
	_chars = row.chars
}
