/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"41B9D5FB-285D-4BEA-9960-5CB22DDB49B9"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"DA804FC6-D16B-4AB4-9D94-4092FA40DA9A"}
 */
var _link = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E5AF89D8-1D07-450C-BC98-0249D6D5947A"}
 */
var _file = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E5AF89D8-1D07-450C-BC98-0249D6A5947A"}
 */
var _directory = null;

/**
 * @properties={typeid:24,uuid:"4120637D-415B-49C7-B796-2EA7C8DC4524"}
 * @AllowToRunInFind
 */
function INIT_data(data,html) {
	if (!(data instanceof Array)) {
		data = new Array(data)
	}
	
	for (var i = 0; i < data.length; i++) {
		var row = data[i]
		
		if (row) {
			var fileFound = false
		    
		    if (row.data) {
				var fsAssetInstance = databaseManager.getFoundSet('sutra_cms','web_asset_instance')
				fsAssetInstance.find()
				fsAssetInstance.id_asset_instance = row.image.data
				var fileFound = fsAssetInstance.search()
			}
		    
		    _file = (fileFound) ? fsAssetInstance.asset_title : ''
		    _directory = (fileFound) ? fsAssetInstance.asset_directory : ''
		    
		    elements.lbl_link.text = row.link.label || solutionModel.getForm(controller.getName()).getLabel('lbl_link').text
			elements.lbl_image.text = row.image.label || solutionModel.getForm(controller.getName()).getLabel('lbl_image').text
		}
	}
	
	if (!html) {
		html = IMAGE_preview()
	}
	
	TOGGLE_buttons()
	
	if (elements.bn_browser) {
		elements.bn_browser.html = html
	}
	else {
		globals.WEBc_browser_error()
	}
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
 * @properties={typeid:24,uuid:"FDBE875B-D3D9-4FF1-992E-C3AC6D444B81"}
 */
function onDataChange(oldValue, newValue, event) {
	var elemName = event.getElementName().split('_')
	var varName = elemName[1]
	var posn = elemName[2]
	
	var data = forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected]
	data.record[varName].data = newValue
}

/**
 * @properties={typeid:24,uuid:"1EBC2AB3-AF73-4611-B65C-E8E832FFCD36"}
 */
function IMAGE_preview() {
	//no image set yet
	if (!_file){
		var html = 	'<html><head></head><body>' +
					'No image chosen yet' +
					'</body></html>'
	}
	// image is set
	else {
		//both the base and resource url methods will return with "sutraCMS/"; need to remove from one so no doubling
		var siteURL = utils.stringReplace(globals.WEBc_markup_link_base(forms.WEB_0F_page.id_page),'sutraCMS/','') + globals.WEBc_markup_link_resources(forms.WEB_0F_page.id_page)
		
		var html = 	'<html><head></head><body>' +
					'<img src="' + siteURL + 
					_directory + '/' + _file + 
					'">' +
					'</body></html>'
	}
	
	return html
}

/**
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"FFE14AB8-BECE-4D27-9AC1-0EE22A0032FF"}
 */
function BLOCK_choose(event) {
	//only run in edit mode
	if (true || globals.CMS.ui.getEdit()) {
		forms.WEB_P__asset.LOAD_data(1)
		
		//show image chooser
		globals.CODE_form_in_dialog(
						forms.WEB_P__asset,
						-1,-1,-1,-1,
						" ",
						true,
						false,
						"CMS_assetChoose"
					)
		
		//something chosen, choose the image
		if (forms.WEB_P__asset._assetChosen) {
			var assetRec = forms.WEB_P__asset._assetChosen.asset
		
			if (assetRec) {
				application.updateUI()
				forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected].record.image.data = assetRec.id_asset_instance.toString()
				_file = assetRec.asset_title
				_directory = assetRec.asset_directory
				 
				var html = IMAGE_preview()
				
				INIT_data(null,html)
			}
		}
	}
}

/**
 * @properties={typeid:24,uuid:"83B2DAF9-EA17-425F-A6CC-A3A5AD0E5F25"}
 */
function TOGGLE_buttons(state) {
	var editStatus = globals.CMS.ui.getEdit()
	
//	elements.btn_choose.enabled = editStatus
//	elements.lbl_choose.enabled = editStatus
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B4AF30EB-4B88-4D14-BBD6-CBACE23624EE"}
 */
function FORM_on_show(firstShow, event) {
	if (firstShow) {
		TOGGLE_buttons()
	}
}
