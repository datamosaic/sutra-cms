/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f61"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"9E607ECD-C191-4A4E-ABA3-4CBC5040FC5B",variableType:4}
 */
var _versionType = 1;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6A9C8F70-07D8-489F-831C-AD9B6611F5C5"}
 */
var _versionDescription = null;

/**
 * @properties={typeid:35,uuid:"71FFE866-5196-4C61-867A-382AE863F955",variableType:-4}
 */
var _versionName = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"0DB8F194-B241-4646-8A35-6F27D096B1B5",variableType:4}
 */
var _fidAccept = null;

/**
 *
 * @properties={typeid:24,uuid:"A7A0B29B-6185-4CC5-9EE9-B8DE9442FC9D"}
 */
function ACTION_cancel() {
	//null out all fields
	_versionName = null
	_versionDescription = null
	
	//enable closing the form
	globals.CODE_hide_form = 1
	
	application.closeFormDialog('cmsPageVersion')

}

/**
 *
 * @properties={typeid:24,uuid:"9950D7B6-C125-48E1-B369-7FE039649CDE"}
 */
function ACTION_ok() {

	//enaable closing the form
	globals.CODE_hide_form = 1
	
	//accept
	_fidAccept = 1
	
	application.closeFormDialog('cmsPageVersion')

}

/**
 *
 * @properties={typeid:24,uuid:"CC5E6398-EEAC-4202-BAD9-F0F93CA205D5"}
 */
function FORM_on_show() {
	
	//disable closing the form
	globals.CODE_hide_form = 0
	
	//reset acceptance status
	_fidAccept = null
	
	//reset other fields
	_versionName = null
	_versionDescription = null
	_versionType = 1
	
	//request focus in first field
	application.updateUI()
	elements.var_versionName.requestFocus()

}
