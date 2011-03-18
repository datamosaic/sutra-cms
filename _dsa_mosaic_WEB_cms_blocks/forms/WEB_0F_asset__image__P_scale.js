/**
 * @properties={typeid:35,uuid:"2DA2A657-C15E-4410-88E3-70BEE678FCA6"}
 */
var _image_directory = null;

/**
 * @properties={typeid:35,uuid:"4EFB8CEF-D85F-4F71-A3DD-AFD1EC625FFF",variableType:-4}
 */
var _asset = null;

/**
 * @properties={typeid:35,uuid:"5F128A57-DBA4-4A5D-9085-882513C4BCD6",variableType:-4}
 */
var _metaHeight = null;

/**
 * @properties={typeid:35,uuid:"B3A3E14C-6C9A-4F19-AFB9-BCD9C9E0BF0F",variableType:-4}
 */
var _metaWidth = null;

/**
 * @properties={typeid:35,uuid:"D4E60991-9F57-42B2-8E66-2B63EA7EEF04",variableType:4}
 */
var _image_height;

/**
 * @properties={typeid:35,uuid:"2991B6CB-D41C-4CE1-B24A-A66E60FBF67F",variableType:4}
 */
var _image_height_original;

/**
 * @properties={typeid:35,uuid:"5C8E4E38-9353-4E2F-A6B9-8FC41BA12C4E"}
 */
var _image_name = '';

/**
 * @properties={typeid:35,uuid:"2191C8D1-055C-4E69-AFF4-7953605E048A",variableType:4}
 */
var _image_width;

/**
 * @properties={typeid:35,uuid:"52C49500-DF07-4FC2-BC40-B098120B0353",variableType:4}
 */
var _image_width_original;

/**
 *
 * @properties={typeid:24,uuid:"ACFDBD46-1CA4-4144-95F4-CF79A315AB37"}
 */
function ACTION_cancel() {
	//not already ok to close, cancel
	if (!globals.CODE_hide_form) {
		//rollback and turn autosave on
		databaseManager.rollbackEditedRecords()
		databaseManager.setAutoSave(true)
		
		//enaable closing the form
		globals.CODE_hide_form = 1
		
		application.closeFormDialog('CMS_imageScale')
	}
}

/**
 * @properties={typeid:24,uuid:"EB14E732-B22C-46F8-B488-C62667F892A7"}
 */
function ACTION_ok() {
	//data save ok
	databaseManager.saveData()
	databaseManager.setAutoSave(true)

	//enable closing the form
	globals.CODE_hide_form = 1
	
	//close the form
	application.closeFormDialog('CMS_imageScale')

}

/**
 *
 * @properties={typeid:24,uuid:"76E42D60-8B7C-4C8A-BF89-0BFC652E03C5"}
 */
function ACTION_reset() {
	// reset to original image sizes
	_image_height = 
	_metaHeight.data_value =
		_image_height_original
	
	_image_width = 
	_metaWidth.data_value =
		_image_width_original
}

/**
 *
 * @properties={typeid:24,uuid:"7302C8F5-4ADA-47F8-B6FA-DC5669422414"}
 */
function FLD_change_height() {
	_metaHeight.data_value = _image_height
	_metaWidth.data_value = 
	_image_width = 
		(_image_height * _image_width_original)/_image_height_original
}

/**
 * @properties={typeid:24,uuid:"337A797D-0A8B-4948-A897-19A82E12384E"}
 */
function FLD_change_name(oldValue, newValue, event) {
	_asset.asset_title = _image_name
}

/**
 *
 * @properties={typeid:24,uuid:"89BD1453-04D7-4224-8FBB-31659B9C35B1"}
 */
function FLD_change_width() {
	_metaWidth.data_value = _image_width
	_metaHeight.data_value = 
	_image_height =
		(_image_width * _image_height_original) / _image_width_original
}

/**
 *
 * @properties={typeid:24,uuid:"CA804DFE-3B86-4C73-A529-5551D59A477F"}
 */
function FORM_on_load() {
	// set the tab order sequence programatically
	controller.setTabSequence(null)
}

/**
 *
 * @properties={typeid:24,uuid:"CD3098A8-06A0-4DF0-AEF5-7B105FEA967E"}
 */
function FORM_on_show() {
	//disable closing the form
	globals.CODE_hide_form = 0	
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"6986C6EB-E943-4C56-8C2C-D604BF35144F"}
 */
function FLD_change_directory(oldValue, newValue, event) {
	//make sure that ends in a slash
	if (newValue && newValue.charAt(newValue.length - 1) != '/') {
		_image_directory += '/'
	}
	
	_asset.asset_directory = _image_directory
}
