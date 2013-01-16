/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"10F238F1-C92B-4BD6-B6C7-2579557A00E7"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"ADFD8A3F-81DE-4173-93C3-CC18525D8DC9",variableType:4}
 */
var _fidAccept = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"5BC98740-0B8A-4435-94C6-94ECD3597505"}
 */
var _versionDescription = null;

/**
 * @properties={typeid:35,uuid:"9DCA415B-83EC-4E26-A0F3-0D0DB8DDE447",variableType:-4}
 */
var _versionName = null;

/**
 *
 * @properties={typeid:24,uuid:"B3C7BD86-8EC9-4F33-94B2-19608DA7293D"}
 */
function ACTION_cancel() {
	//null out all fields
	_versionName = null
	_versionDescription = null
	
	//enable closing the form
	globals.CODE_hide_form = 1
	
	globals.CODE_form_in_dialog_close('cmsBlockVersion')

}

/**
 *
 * @properties={typeid:24,uuid:"C4E1BC60-4302-4F88-A0D3-37FFC24C0436"}
 */
function ACTION_ok() {

	//enaable closing the form
	globals.CODE_hide_form = 1
	
	//accept
	_fidAccept = 1
	
	globals.CODE_form_in_dialog_close('cmsBlockVersion')

}

/**
 *
 * @properties={typeid:24,uuid:"2253587D-6BB9-40F1-ABDA-D74F8F060D64"}
 */
function FORM_on_show() {
	
	//disable closing the form
	globals.CODE_hide_form = 0
	
	//reset acceptance status
	_fidAccept = null
	
	//reset other fields
	_versionName = null
	_versionDescription = null
	
	//request focus in first field
	application.updateUI()
	elements.var_versionName.requestFocus()

}
