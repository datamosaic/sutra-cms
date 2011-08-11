/**
 * @properties={typeid:35,uuid:"4FDACEFD-6F66-46F7-827B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"FDC64E51-AC73-4E7D-B1F3-2BC7BF6F63BF"}
 */
var _formName = null;

/**
 * @properties={typeid:35,uuid:"7DD2021A-A84D-40C9-A5BB-C37BF4BDFF6C",variableType:-4}
 */
var _validBlocks = null;

/**
 * @properties={typeid:24,uuid:"97D00EE5-0E9B-42F7-9A6D-29BB2FE5055D"}
 */
function FLD_formName__data_change(oldValue, newValue, event) {
	_blockDescription = _validBlocks[_validBlocks[newValue]].block_description
	return true
}

/**
 * @properties={typeid:35,uuid:"F327F07C-338B-4311-BDA6-6B576EDB531D"}
 */
var _blockDescription = null;

/**
 * Action to close FiD
 * 
 * @author Data Mosaic (C)
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2ACC6C8F-7A32-47A3-94E9-09681D5308AB"}
 */
function ACTION_ok(event) {
	globals.CODE_hide_form = 1
	
	// punch form variable value into destination form as a "property" since can't access this form's vars from other form methods
	forms.WEB_0F_block_type._formName = _formName
	
	application.closeFormDialog('cmsBlockTypeNew')
}

/**
 *
 * @properties={typeid:24,uuid:"63FC4059-3825-4293-80EF-64B099DE9F60"}
 */
function ACTION_cancel()
{
	globals.CODE_hide_form = 1
	application.closeFormDialog('cmsBlockTypeNew')
}

/**
 *
 * @properties={typeid:24,uuid:"C0A6E5C8-6B2B-4F96-947A-75D00B7421D7"}
 */
function FORM_on_show(){

	forms.WEB_0F_block_type._formName = null
	_formName = null
	_blockDescription = null

}
