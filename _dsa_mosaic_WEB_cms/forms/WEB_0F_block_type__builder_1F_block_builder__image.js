/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E59D00A4-5C52-409F-B371-F536D07F1DFB"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"DE2821FF-27F2-44BB-B298-BC0E5331F0E5"}
 */
var _image_data = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1E48367A-269C-4758-8744-37EC14463F06"}
 */
var _image_label = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C4991583-13B9-4A3C-AF71-0E8EEAF9FE0A"}
 */
var _image_post = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2192DE0E-820D-4497-8FA8-BFACD82E2652"}
 */
var _image_pre = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"7951D469-D91E-4070-A6D0-48BB7D7D71D5"}
 */
var _link_data = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"9E0B2196-1CBD-4FF9-A94E-67983B201A02"}
 */
var _link_label = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"946C45E1-507E-4BD7-B13F-C038DE21F7E4"}
 */
var _link_post = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D4E55142-630D-45FD-B502-194E7BE15478"}
 */
var _link_pre = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"AD0552A9-2DF0-4887-A385-42E571D1C19A",variableType:4}
 */
var _repeatable = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"4ED493B9-04F2-47FD-8DDB-B665A2F2FAED",variableType:4}
 */
var _required = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1FDE3381-3439-426E-8D68-39B49F629287"}
 */
var _resizing_label = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"CE015D32-237D-4B70-B05E-A9C1FDD05D58",variableType:4}
 */
var _resizing_data = null;

/**
 * @properties={typeid:24,uuid:"1B086E7F-D228-4406-82A9-F4A6798794ED"}
 */
function INIT_data(row) {
	_required = row.required
	_repeatable = row.repeatable
	
	_image_data = row.image.data
	_image_label = row.image.label
	_image_pre = row.image.wrapper.pre
	_image_post = row.image.wrapper.post
	
	_link_data = row.link.data
	_link_label = row.link.label
	_link_pre = row.link.wrapper.pre
	_link_post = row.link.wrapper.post
	
	_resizing_label = row.resizing.label
	_resizing_data = row.resizing.data
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4D20E0A2-44EB-4D6C-94FE-7613B24C42BB"}
 */
function PICK_page(event) {
	// TODO Auto-generated method stub
}
