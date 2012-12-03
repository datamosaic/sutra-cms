/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2F354E60-3FD4-4156-8580-47CF8B945CCD"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"5EB60DEA-554D-4DF2-91A7-0ABAACBB1B32"}
 */
var _link_data = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"8C19A6C7-F4B1-49E9-9B8E-C23D22CA9E78"}
 */
var _link_label = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"7E9A9A92-263D-45E0-A134-5C7C10607EBE"}
 */
var _link_post = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"68395AFC-BF1F-4FF3-8017-3F0467250656"}
 */
var _link_pre = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C7F794EF-225D-4252-9480-044E1CDA6397"}
 */
var _name_data = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"EDBFD039-BD59-499D-A9E6-7A285FDF55B9"}
 */
var _name_label = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D6A7B556-45FB-451A-AF80-CFD89A59EEF0"}
 */
var _name_post = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F4A0AE40-460B-44B0-A005-EF0BE0DABA6F"}
 */
var _name_pre = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"DB567D39-9EBF-4A01-916C-B33B7EA77CF8",variableType:4}
 */
var _repeatable = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"2E98A16C-BA3B-4E11-9227-AC2CCB6A5A41",variableType:4}
 */
var _required = null;

/**
 * @properties={typeid:24,uuid:"C289F95F-1443-4B94-B79D-76A42DA4D693"}
 */
function INIT_data(row) {
	_required = row.required
	_repeatable = row.repeatable
	
	_link_data = row.link.data
	_link_label = row.link.label
	_link_pre = row.link.wrapper.pre
	_link_post = row.link.wrapper.post
	
	_name_data = row.name.data
	_name_label = row.name.label
	_name_pre = row.name.wrapper.pre
	_name_post = row.name.wrapper.post
	
	//
	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E72857FE-9FC1-4B41-A78D-4E254491A5CA"}
 */
function PICK_page(event) {
	// TODO Auto-generated method stub
}
