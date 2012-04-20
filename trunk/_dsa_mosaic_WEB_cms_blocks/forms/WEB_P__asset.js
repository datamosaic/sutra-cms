/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4FDACEFD-6F16-47F7-827B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"CE572FF5-8795-41C4-972B-CED24975F685",variableType:-4}
 */
var _assetChosen = null;

/**
 *
 * @properties={typeid:24,uuid:"28E098A0-3AFB-45D5-974D-5097C511ED6E"}
 */
function ACTION_cancel()
{
	//not already ok to close, cancel
	if (!globals.CODE_hide_form) {
		//enable closing the form
		globals.CODE_hide_form = 1
		
		globals.CODE_form_in_dialog_close('CMS_assetChoose')
	}
}

/**
 * @properties={typeid:24,uuid:"F7D6A97F-52AD-47A0-A840-614BF18CC717"}
 */
function ACTION_ok() {
	//something selected
	if (utils.hasRecords(forms.WEB_P__asset_1L_asset_2L_asset_instance.foundset)) {
		// choose image from FiD
		var assetRec = forms.WEB_P__asset_1L_asset_2L_asset_instance.foundset.getSelectedRecord()
		
		//get meta data points we need
		var metaRows = new Object()
		for (var j = 1; j <= assetRec.web_asset_instance_to_asset_instance_meta.getSize(); j++) {
			var record = assetRec.web_asset_instance_to_asset_instance_meta.getRecord(j)
			metaRows[record.data_key] = record.data_value
		}
		
		// set record to form to be used elsewhere
		_assetChosen = {
				asset: assetRec,
				meta: metaRows
			}
	
		//enable closing the form
		globals.CODE_hide_form = 1
		
		//close the form
		globals.CODE_form_in_dialog_close('CMS_assetChoose')
	}
	//nothing selected
	else {
		plugins.dialogs.showErrorDialog(
					'Error',
					'Nothing chosen'
			)
	}
}

/**
 *	Only show the type of data interested in selecting
 * 
 * @param	{Integer}	assetType Type of asset to select (1 image, 2 file, etc)
 * 
 * @properties={typeid:24,uuid:"BE1F62DB-1D14-464C-96F5-1A8D252C761B"}
 * @AllowToRunInFind
 */
function LOAD_data(assetType) {
	var fsAsset = forms.WEB_P__asset_1L_asset.foundset
	
	//asset type specified, only show those records
	if (assetType) {
		//only load up requested assets, scope by site
		fsAsset.find()
		fsAsset.asset_type = assetType
		fsAsset.id_site = forms.WEB_0F_site.id_site
		var results = fsAsset.search()
		
		//set title text
		elements.lbl_heading.text = 'Choose ' + application.getValueListDisplayValue('WEB_asset_type',assetType)
		
		//show preview
		if (assetType == 1) {
			forms.WEB_P__asset_1L_asset.elements.fld_thumb.visible = true
		}
		//hide preview
		else {
			forms.WEB_P__asset_1L_asset.elements.fld_thumb.visible = false
		}
	}
	//no asset type specified, show everything all together
	else {
		fsAsset.loadAllRecords()
		
		//set title text
		elements.lbl_heading.text = 'Choose Asset'
		
		//show preview
		forms.WEB_P__asset_1L_asset.elements.fld_thumb.visible = true
	}
	
	//close form in dialog or warn if nothing
	if (!results) {
		
	}
}

/**
 *
 * @properties={typeid:24,uuid:"F9CB0AE8-38FD-48C2-82B8-1804803BDA80"}
 */
function FORM_on_show() {
	//disable closing the form
	globals.CODE_hide_form = 0
	
	//null out old values
	_assetChosen = null
}
