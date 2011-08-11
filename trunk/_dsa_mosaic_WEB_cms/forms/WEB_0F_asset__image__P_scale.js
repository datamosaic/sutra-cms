/**
 * @properties={typeid:35,uuid:"4FDACEFD-6F16-4AF7-827B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"AB9FAA9A-CA9E-4DAB-B064-4FD6ECDFA06F",variableType:-4}
 */
var _asset = null;

/**
 * @properties={typeid:35,uuid:"9D1E13BE-D265-43E2-90D3-DF3A9AF7711C"}
 */
var _imageDirectory = null;

/**
 * @properties={typeid:35,uuid:"BBF85050-880D-46FA-A902-8D865AE0A6B0",variableType:4}
 */
var _imageHeight;

/**
 * @properties={typeid:35,uuid:"87838003-3F09-4715-85C6-D5B9D5D0C85C",variableType:4}
 */
var _imageHeightOriginal;

/**
 * @properties={typeid:35,uuid:"A675E356-EFB7-4083-96A6-2E279FDDF35C"}
 */
var _imageName = '';

/**
 * @properties={typeid:35,uuid:"8343D9E3-CDBD-42C2-B659-FF8DB0F38812",variableType:4}
 */
var _imageWidth;

/**
 * @properties={typeid:35,uuid:"37FBF760-FFAE-46AA-B30B-2C4F45A79C37",variableType:4}
 */
var _imageWidthOriginal;

/**
 * @properties={typeid:35,uuid:"F262390E-37DE-45C2-9499-6EFD984B44B1",variableType:-4}
 */
var _metaHeight = null;

/**
 * @properties={typeid:35,uuid:"73367840-F066-41BA-8687-3CC49DD23A16",variableType:-4}
 */
var _metaWidth = null;

/**
 *
 * @properties={typeid:24,uuid:"B4323DCD-A9DE-4E86-B7F1-E44F5F089721"}
 */
function ACTION_cancel() {
	//not already ok to close, cancel
	if (!globals.CODE_hide_form) {
		
		//rollback and turn autosave on
//		if (!forms.WEB_0F_asset__image._editMode) {
			databaseManager.rollbackEditedRecords()
			databaseManager.setAutoSave(true)
//		}
		
		//enaable closing the form
		globals.CODE_hide_form = 1
		
		application.closeFormDialog('CMS_imageScale')
	}
}

/**
 * @properties={typeid:24,uuid:"A5ECC811-C7AF-47CE-A55E-FAC258D11AE3"}
 */
function ACTION_ok() {
	//data save ok
//	if (!forms.WEB_0F_asset__image._editMode) {
		databaseManager.saveData()
		databaseManager.setAutoSave(true)
//	}
	
	//enable closing the form
	globals.CODE_hide_form = 1
	
	//close the form
	application.closeFormDialog('CMS_imageScale')

}

/**
 *
 * @properties={typeid:24,uuid:"4E142D9A-C078-4C70-A8A5-68403621F67A"}
 */
function ACTION_reset() {
	// reset to original image sizes
	_imageHeight = 
	_metaHeight.data_value =
		_imageHeightOriginal
	
	_imageWidth = 
	_metaWidth.data_value =
		_imageWidthOriginal
	_imageName = 
	_asset.asset_title = FX_set_name(_imageWidth, _imageHeight)
}

/**
 *
 * @properties={typeid:24,uuid:"958E0C67-D164-455A-97BB-7D2B0A570A5A"}
 */
function FLD_change_height() {
	_metaHeight.data_value = _imageHeight
	_metaWidth.data_value = 
	_imageWidth = 
		utils.numberFormat(((_imageHeight * _imageWidthOriginal)/_imageHeightOriginal),'#')
	_imageName = 
	_asset.asset_title = FX_set_name(_imageWidth, _imageHeight)
}

/**
 * @properties={typeid:24,uuid:"1CA650B8-4DA7-447F-BC5B-DA76208B6EC8"}
 */
function FLD_change_name(oldValue, newValue, event) {
	_asset.asset_title = _imageName
}

/**
 *
 * @properties={typeid:24,uuid:"B4DC8FF8-ABE6-43EC-916B-07D4AF0777FF"}
 */
function FLD_change_width() {
	_metaWidth.data_value = _imageWidth
	_metaHeight.data_value = 
	_imageHeight =
		utils.numberFormat(((_imageWidth * _imageHeightOriginal) / _imageWidthOriginal),'#')
	_imageName = 
	_asset.asset_title = FX_set_name(_imageWidth, _imageHeight)
}

/**
 *
 * @properties={typeid:24,uuid:"EE7598EC-67A3-4CF8-A71F-4873AD30F1EF"}
 */
function FORM_on_load() {
	// set the tab order sequence programatically
	controller.setTabSequence(null)
}

/**
 *
 * @properties={typeid:24,uuid:"C15FA26A-9AE9-4F22-BE22-E8236FA15AB5"}
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
 * @properties={typeid:24,uuid:"18E4F151-BCEF-4ACB-9431-9569882A1B98"}
 */
function FLD_change_directory(oldValue, newValue, event) {
	//make sure that ends in a slash
	if (newValue && newValue.charAt(newValue.length - 1) == '/') {
		_imageDirectory = newValue.substring(0, newValue.length - 1)
	}
	
	_asset.asset_directory = _imageDirectory
}

/**
 * @properties={typeid:24,uuid:"18DA2CA9-54B0-4589-9ECA-32877FBCAF5F"}
 */
function FX_set_name(width, height) {
	// get extension
	var temp = _imageName.split(".")
	var extension = temp.pop()
	// get name without size part
	temp = temp.join('.').split("__")
	var name = temp.shift()
	// return name with new size
	return name + "__" + width + "x" + height + "." + extension
	                                
}
