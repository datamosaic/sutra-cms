/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D60589C6-7BC7-492B-8238-E4AE740E7100"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"291DDA92-D9C7-4A2A-AE0A-B44A6FA82F97"}
 */
var _fieldType = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"EE6D17A0-F533-4C69-8954-D2A83A92F4F8"}
 */
var _fieldDescription = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A78F5EDE-E6E5-47EF-ADBA-B96AEB555BE2"}
 */
var _fieldName = null;

/**
 * Action to close FiD
 * 
 * @author Data Mosaic (C)
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D617947B-912F-4AFF-8999-A3FC97D56836"}
 */
function ACTION_ok(event) {
	if (_fieldType && _fieldName) {
		if (_fieldType == 'table') {
			globals.DIALOGS.showErrorDialog('Error','Table type is not implemented yet')
			return
		}
		
		globals.CODE_hide_form = 1
		
		// punch form variable value into destination form as a "property" since can't access this form's vars from other form methods
		forms.WEB_0F_block_type__builder_1L_block_builder._fieldType = _fieldType
		forms.WEB_0F_block_type__builder_1L_block_builder._fieldName = _fieldName
		forms.WEB_0F_block_type__builder_1L_block_builder._fieldDescription = _fieldDescription
		
		globals.CODE_form_in_dialog_close('cmsBlockBuilderNew')
	}
	else {
		globals.DIALOGS.showErrorDialog('Error','Please select a type and provide a name')
	}
}

/**
 *
 * @properties={typeid:24,uuid:"FDE0DC48-8E56-4FF7-B2BE-DC922E32BD22"}
 */
function ACTION_cancel() {
	globals.CODE_hide_form = 1
	globals.CODE_form_in_dialog_close('cmsBlockBuilderNew')
}

/**
 *
 * @properties={typeid:24,uuid:"73E42518-D9C9-4481-A464-7AADBC834A3F"}
 */
function FORM_on_show(firstShow){
	//null out everything
	forms.WEB_0F_block_type__builder_1L_block_builder._fieldType = null
	forms.WEB_0F_block_type__builder_1L_block_builder._fieldName = null
	forms.WEB_0F_block_type__builder_1L_block_builder._fieldDescription = null
	
	_fieldType = null
	_fieldDescription = null
	_fieldName = null

}
