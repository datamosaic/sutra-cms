/**
 * @properties={typeid:35,uuid:"4FDACEFD-6F16-47F7-827B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"CE572FF5-8795-41C4-972B-CED24975F685",variableType:-4}
 */
var _imageChosen = null;

/**
 * @properties={typeid:35,uuid:"24F8A309-8314-45BF-80FF-1345BD27C909",variableType:4}
 */
var _imageLink = null;

/**
 *
 * @properties={typeid:24,uuid:"28E098A0-3AFB-45D5-974D-5097C511ED6E"}
 */
function ACTION_cancel()
{
	//not already ok to close, cancel
	if (!globals.CODE_hide_form) {
		
		//enaable closing the form
		globals.CODE_hide_form = 1
		_imageLink = null
		
		application.closeFormDialog('CMS_imageChoose')
	}
}

/**
 * @properties={typeid:24,uuid:"F7D6A97F-52AD-47A0-A840-614BF18CC717"}
 */
function ACTION_ok() {
	//something selected
	if (utils.hasRecords(forms.WEB_0F__image__P_choose_1L_asset_2L_asset_instance.foundset)) {
		// choose image from FiD
		var assetRec = forms.WEB_0F__image__P_choose_1L_asset_2L_asset_instance.foundset.getSelectedRecord()
		
		//get meta data points we need
		var metaRows = new Object()
		for (var j = 1; j <= assetRec.web_asset_instance_to_asset_instance_meta.getSize(); j++) {
			var record = assetRec.web_asset_instance_to_asset_instance_meta.getRecord(j)
			metaRows[record.data_key] = record
		}
		
		// set record to form to be used elsewhere
		if (_imageLink) {
			_imageChosen = {
					asset: assetRec,
					meta: metaRows
				}
		}
		// copy image details to block data points
		else {
			//the data we're working with here
			var data = forms.WEB_0F__image.web_block_version_to_block_data
			
			//see WEB_0F__image.INIT_block for all keys
			for (var i = 1; i <= data.getSize(); i++) {
				var record = data.getRecord(i)
				switch (record.data_key) {
					case 'height':
					case 'width':
						record.data_value = metaRows[record.data_key].data_value
						break
					case 'image_name':
						record.data_value = assetRec.asset_title
						break
					case 'directory':
						record.data_value = assetRec.asset_directory
						break
					default:
						record.data_value = assetRec[record.data_key]
				}
			}
			
			databaseManager.saveData()
		}
	
		//enable closing the form
		globals.CODE_hide_form = 1
		_imageLink = null
		
		//close the form
		application.closeFormDialog('CMS_imageChoose')
		
		//refresh the block
		forms.WEB_0F__image.REC_on_select(null,true)
	}
	//nothing selected
	else {
		plugins.dialogs.showErrorDialog(
					'Error',
					'No image chosen'
			)
	}
}

/**
 *
 * @properties={typeid:24,uuid:"BE1F62DB-1D14-464C-96F5-1A8D252C761B"}
 */
function FORM_on_load() {
	//only load up images
	forms.WEB_0F__image__P_choose_1L_asset.foundset.find()
	forms.WEB_0F__image__P_choose_1L_asset.foundset.asset_type = 'Image'
	var results = forms.WEB_0F__image__P_choose_1L_asset.foundset.search()
	
	//close form in dialog
	if (!results) {
		
	}
}

/**
 *
 * @properties={typeid:24,uuid:"F9CB0AE8-38FD-48C2-82B8-1804803BDA80"}
 */
function FORM_on_show()
{
	//disable closing the form
	globals.CODE_hide_form = 0
	
	//null out old values
	_imageChosen = null
}
