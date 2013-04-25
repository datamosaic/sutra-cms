/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"BC5B8925-DB30-4F0B-8522-06AB259BEBF0"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"A977E962-56ED-4147-AED7-DBEDC1EBA37A",variableType:4}
 */
var _repeatable = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"CF09E3FC-ADB9-498A-B3BA-7351A40C8865",variableType:4}
 */
var _required = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"EA64C3B3-CC79-4A58-BC76-B9BA7D9BED28"}
 */
var _link_attributes = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"EA64B3B3-CC79-4A58-BC76-B9BA7D9BED28"}
 */
var _link_data = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"328E51ED-3384-4BDF-8458-3250BBB83248"}
 */
var _link_data_display = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"3DB1E229-94CB-4EAC-8DE5-6DE998FD7E9B"}
 */
var _link_label = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1F7D5FA8-266E-4BCA-B206-291BE34851F6"}
 */
var _link_post = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D6F03743-93A9-4D55-A059-5B9BB00EF6B3"}
 */
var _link_pre = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A3D31116-ED78-4F1C-8CF8-86F08B853FCA"}
 */
var _name_data = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A3C39C59-F6BF-43DA-A86C-72F58BD63CDA"}
 */
var _name_label = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A21D5091-BB66-400E-93E5-2408822EDFF1"}
 */
var _name_post = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"AACF8868-A44A-4DB4-B6A3-C3261423FC6A"}
 */
var _name_pre = null;

/**
 * @properties={typeid:24,uuid:"AA125E2A-BA39-4D57-A9B5-D802FD882324"}
 * @AllowToRunInFind
 */
function INIT_data(row) {
	if (row.link.data) {
		var fsPage = databaseManager.getFoundSet('sutra_cms','web_page')
		fsPage.find()
		fsPage.id_page = row.link.data
		var results = fsPage.search()
		
		if (results) {
			var pageName = fsPage.page_name
		}
	}
	
	_required = row.required
	_repeatable = row.repeatable
	
	_link_attributes = row.link.attributes
	_link_data = row.link.data
	_link_data_display = pageName || ''
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
 *  @param {JSEvent} event the event that triggered the action
 *  @param {JSRecord<db:/sutra_cms/web_page>} [record]
 *
 * @properties={typeid:24,uuid:"1F26665C-5D17-4EEE-9289-1283AE8F3EF9"}
 */
function PICK_page(event,record) {
	if (event instanceof JSEvent) {
		globals.WEBc_page_picker(PICK_page,elements.var_link_wrapper_post)
	}
	else {
		//display
		_link_data = event
		_link_data_display = record.page_name
		
		//save in backend (see WEB_block_builder__data_change)
		var value = JSON.parse(column_value)
		value.link.data = _link_data
		column_value = JSON.stringify(value,null,'\t')
	}
}
