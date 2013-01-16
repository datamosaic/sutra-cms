/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B7F38EDE-DDC0-49BB-8518-DF2F5ED8DC97"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"55A44613-5877-4E30-B453-E093F9B8F9A0"}
 */
var _format = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"62E233B5-46BD-40CF-8921-5B6510328B1E"}
 */
var _data = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"80B84C22-3ADC-482F-A586-CCD77CEDEB4A"}
 */
var _label = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C1F80EE2-8D65-4157-B719-4A168D8B7D4B"}
 */
var _post = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"FC0ACC3F-7D01-42F6-893D-2DF8E0FB4CC1"}
 */
var _pre = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"0D131223-7F2F-4A7C-841E-007E5715F42D",variableType:4}
 */
var _repeatable = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"EC28F4A6-810E-4C3A-9CD8-47819C070D93",variableType:4}
 */
var _required = null;

/**
 * @properties={typeid:24,uuid:"FD6CDD43-50AE-4F8F-9644-8D538CFF868E"}
 */
function INIT_data(row) {
	_data = row.data
	_label = row.label
	_pre = row.wrapper.pre
	_post = row.wrapper.post
	_required = row.required
	_repeatable = row.repeatable
	_format = row.format
}
