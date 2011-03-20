/**
 *
 * @properties={typeid:24,uuid:"8B931B10-1A24-4593-B224-BF6B25E56755"}
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
 * @properties={typeid:35,uuid:"104B9C5D-260A-4CBC-9B4E-0A5518EA83B0",variableType:4}
 */
var _imageLink = null;

/**
 * @properties={typeid:35,uuid:"B6B3FC85-8DB1-4FEC-A999-FD71414ABAFA",variableType:-4}
 */
var _imageChosen = null;

/**
 * @properties={typeid:24,uuid:"86FC5255-7DA5-47D5-BFD6-2CA7D2DEB7DD"}
 */
function ACTION_ok() {
	//something selected
	if (utils.hasRecords(forms.WEB_0F_asset__image__P_choose_1L_asset_group_2L_asset.foundset)) {
		// choose image from FiD
		var assetRec = forms.WEB_0F_asset__image__P_choose_1L_asset_group_2L_asset.foundset.getSelectedRecord()
		
		//get meta data points we need
		var metaRows = new Object()
		for (var j = 1; j <= assetRec.web_asset_to_asset_meta.getSize(); j++) {
			var record = assetRec.web_asset_to_asset_meta.getRecord(j)
			metaRows[record.data_key] = record
		}
		
		_imageChosen = {
					asset: assetRec,
					meta: metaRows
				}
		
		// set record to form to be used elsewhere
		if (_imageLink) {
			_imageChosen = record
		}
		// copy image details to block data points
		else {
			//real mode
			if (globals.WEB_page_mode == 3) {
				var data = forms.WEB_0F_page__browser__editor.dataRec
			}
			//structure (data or gui) mode
			else {
				var data = forms.WEB_0F_page__design.web_page_to_block_data_by_area_by_block
			}
			
			//see WEB_0F_asset__image.INIT_block for all block keys; WEB_0F_asset__image.INIT_asset for all asset keys
			for (var i = 1; i <= data.getSize(); i++) {
				var record = data.getRecord(i)
				switch (record.data_key) {
					case 'height':
					case 'width':
						record.data_value = _imageChosen.meta[record.data_key].data_value
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
 * @properties={typeid:24,uuid:"D666ED3E-928A-4A34-AA06-54F955E5DF0F"}
 */
function FORM_on_load() {
	//only load up images
	forms.WEB_0F_asset__image__P_choose_1L_asset_group.foundset.find()
	forms.WEB_0F_asset__image__P_choose_1L_asset_group.foundset.asset_type = 'Image'
	var results = forms.WEB_0F_asset__image__P_choose_1L_asset_group.foundset.search()
	
	//close form in dialog
	if (!results) {
		
	}
}

/**
 *
 * @properties={typeid:24,uuid:"854A00F4-2221-4A42-A6DD-5C40ACE70231"}
 */
function FORM_on_show()
{
	//disable closing the form
	globals.CODE_hide_form = 0
	
	//null out old values
	_imageChosen = null
}
