/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"8993D89C-190E-4E4F-9642-ADBACCDA2423",variableType:12}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A4A91F1F-4E68-4416-A442-8247728A2052",variableType:12}
 */
var _data = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2EA8B157-B18D-4D38-98C3-96F4B25E632D",variableType:12}
 */
var _label = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"5205ADCB-2AEF-484B-9369-4A56F9DCE1CC",variableType:12}
 */
var _post = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"ABCAE8AD-797E-4928-8E37-1672E6091F34",variableType:12}
 */
var _pre = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"1609BC46-A148-46BA-9B6D-554FDECBFF57",variableType:4}
 */
var _required = null;

/**
 * @properties={typeid:24,uuid:"E2AD3436-AD20-4F10-A5B3-2A1B59DDDED0"}
 */
function INIT_data(row) {
	_data = row.data
	_label = row.label
	_pre = row.wrapper.pre
	_post = row.wrapper.post
	_required = row.required
}
