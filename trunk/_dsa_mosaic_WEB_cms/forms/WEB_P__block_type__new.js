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
 * @properties={typeid:35,uuid:"E79487C0-C11D-4CC7-BA29-7984FED6089F"}
 */
var _blockName = null;

/**
 * @properties={typeid:35,uuid:"F327F07C-338B-4311-BDA6-6B576EDB531D"}
 */
var _blockDescription = null;

/**
 * @properties={typeid:35,uuid:"7DD2021A-A84D-40C9-A5BB-C37BF4BDFF6C",variableType:-4}
 */
var _validBlocks = null;

/**
 * @properties={typeid:24,uuid:"97D00EE5-0E9B-42F7-9A6D-29BB2FE5055D"}
 */
function FLD_formName__data_change(oldValue, newValue, event) {
	//block builder, show name/description fields
	if (newValue == 'WEB_0F__block_builder') {
		TOGGLE_elements(true)
		
		_blockDescription = _validBlocks[_validBlocks[newValue]].block_description
		_blockName = 'Specify block name'
		elements.var_blockName.selectAll()
		elements.var_blockName.requestFocus()
	}
	else {
		TOGGLE_elements()
		
		_blockDescription = _validBlocks[_validBlocks[newValue]].block_description
		_blockName = null
	}
}

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
	forms.WEB_0F_block_type._blockName = _blockName
	forms.WEB_0F_block_type._blockDescription = _blockDescription
	
	application.closeFormDialog('cmsBlockTypeNew')
}

/**
 *
 * @properties={typeid:24,uuid:"63FC4059-3825-4293-80EF-64B099DE9F60"}
 */
function ACTION_cancel() {
	globals.CODE_hide_form = 1
	application.closeFormDialog('cmsBlockTypeNew')
}

/**
 *
 * @properties={typeid:24,uuid:"C0A6E5C8-6B2B-4F96-947A-75D00B7421D7"}
 */
function FORM_on_show(firstShow){
	//make sure not showing block builder stuff initially
	TOGGLE_elements()
	
	//instantiate variables on block_type form
	forms.WEB_0F_block_type._formName = null
	forms.WEB_0F_block_type._blockName = null
	forms.WEB_0F_block_type._blockDescription = null
	
	_formName = null
	_blockDescription = null
	_blockName = null

}

/**
 * Toggle block builder data entry
 * 
 * @param {Boolean}	[state=false] Show/hide elements for naming a block
 * 
 * @properties={typeid:24,uuid:"4AFFFB3A-4765-428C-8DF7-661CC7F32062"}
 */
function TOGGLE_elements(state) {
	if (typeof state != 'boolean') {
		state = false
	}
	
	//block builder, show name/description fields
	if (state && !elements.lbl_name.visible) {
		elements.lbl_name.visible = true
		elements.var_blockName.visible = true
		
		elements.lbl_description.setLocation(elements.lbl_description.getLocationX(),elements.lbl_description.getLocationY() + 50)
		elements.var_blockDescription.setSize(elements.var_blockDescription.getWidth(),elements.var_blockDescription.getHeight() - 50)
		elements.var_blockDescription.setLocation(elements.var_blockDescription.getLocationX(),elements.var_blockDescription.getLocationY() + 50)
		elements.var_blockDescription.editable = true
	}
	else if (!state && elements.lbl_name.visible) {
		elements.lbl_name.visible = false
		elements.var_blockName.visible = false
		
		elements.lbl_description.setLocation(elements.lbl_description.getLocationX(),elements.lbl_description.getLocationY() - 50)
		elements.var_blockDescription.setLocation(elements.var_blockDescription.getLocationX(),elements.var_blockDescription.getLocationY() - 50)
		elements.var_blockDescription.setSize(elements.var_blockDescription.getWidth(),elements.var_blockDescription.getHeight() + 50)
		elements.var_blockDescription.editable = false
	}
}
