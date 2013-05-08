/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"7DAE0464-7C78-4D6F-A28D-1F54807FA5B5"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"54679EE4-FEDA-4144-9A12-9F3955871C2A"}
 */
var _data = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A55D6602-9F76-4E43-9DF9-FE60F27ACF0F"}
 */
var _values = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0FC6812F-2D61-442B-8891-6D9FC6363405"}
 */
var _display = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4F7FE897-1971-4E2F-B5C4-C46D548706DC"}
 */
var _label = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"45971B95-8DAE-4B22-BF9F-799E5EEC9276"}
 */
var _post = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E62EA1C2-4099-4124-A273-4A91433BBB00"}
 */
var _pre = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"8F64155C-18BA-4D34-AEB4-BFD65ACBA07A",variableType:4}
 */
var _repeatable = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"4B54BAFD-03B1-4D4C-BB77-52FB3C7B838C",variableType:4}
 */
var _required = null;

/**
 * @properties={typeid:24,uuid:"B6C1BA57-D133-4AB5-9B82-46CB8961A4AF"}
 */
function INIT_data(row) {
	_data = row.data
	_display = row.display
	_label = row.label
	_pre = row.wrapper.pre
	_post = row.wrapper.post
	_required = row.required
	_repeatable = row.repeatable
	_values = row.values
}
