/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"545F6D39-300E-4A0E-BABD-9626D7A32990"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"FB8FA72A-56E6-49F6-9888-9D4D26810EB6",variableType:4}
 */
var _htmlAllow = 0;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"747239F5-DF26-4669-B2A8-100AA85DBB25"}
 */
var _display = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6B637BF1-0435-460C-B17C-257A3F7ECA6A"}
 */
var _label = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"3719F225-3514-47E1-A185-74522673A654",variableType:4}
 */
var _repeatable = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"104C7171-7191-492B-95A4-620A5990D901",variableType:4}
 */
var _required = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"DB705841-2CF9-47F4-ADDE-FF9229A88250"}
 */
var _pre = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E9274D2D-9F45-48E1-82B1-29F4D82D8E41"}
 */
var _post = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1B9D7E68-ED3E-4665-B445-04A0C5835975"}
 */
var _data = null;

/**
 * @properties={typeid:24,uuid:"A06C4958-08A0-4885-9C70-50A376DD8804"}
 */
function INIT_data(row) {
	_data = row.data
//	_htmlAllow = row.htmlAllow
	_label = row.label
	_pre = row.wrapper.pre
	_post = row.wrapper.post
	_required = row.required
	_repeatable = row.repeatable
	_display = row.htmlAllow ? 'htmlAllow' : row.markdown ? 'markdown' : 'text'
}

/**
 * @param {Number} oldValue old value
 * @param {Number} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E0D4C38D-A54F-4A5C-8AA8-CDEC4711CBC2"}
 */
function RADIO__data_change(oldValue, newValue, event) {
	var value = JSON.parse(column_value)
	
	//reset
	value.htmlAllow = 0
	value.markdown = 0
	
	//for now, these two are mutually exclusive
	if (newValue == 'htmlAllow') {
		value.htmlAllow = 1
	}
	if (newValue == 'markdown') {
		value.markdown = 1
	}
	
	column_value = JSON.stringify(value,null,'\t')
}
