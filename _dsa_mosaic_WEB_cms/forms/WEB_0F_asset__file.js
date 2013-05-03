/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"70C9A8A9-DF72-4450-B242-EF06129E6956"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:24,uuid:"4C05C95F-1431-4C01-9912-26708524802D"}
 */
function INIT_asset() {
	
	// main data object to build
	var asset = new Object()
	
	// form with info about this asset
	asset.formName = controller.getName()
	
	// meta rows
	asset.meta = {
//		height : 'INTEGER',
//		width : 'INTEGER'
	}
	
	return asset
}

/**
 * @properties={typeid:24,uuid:"8B9BBDD7-FB8F-4B2D-9790-E308D20CFB40"}
 */
function ASSET_actions(input,assetRecord) {
	//menu items
	var valuelist = new Array(
					'Copy link'
				)
	
	//called to depress menu
	if (input instanceof JSEvent) {
		//set up menu with arguments
		var menu = new Array()
		
		for ( var i = 0 ; i < valuelist.length ; i++ ) {
			menu[i] = plugins.popupmenu.createMenuItem(valuelist[i],ASSET_actions)
			
			menu[i].setMethodArguments(i,assetRecord)
			
			if (menu[i].text == '----') {
				menu[i].setEnabled(false)
			}
		}
		//popup
		var elem = forms[input.getFormName()].elements[input.getElementName()]
		if (elem != null) {
			plugins.popupmenu.showPopupMenu(elem, menu)
		}
	}
	//menu shown and item chosen
	else {
		switch( input ) {
			case 0:	//
				ASSET_copy_link(assetRecord)
				break
		}
	}
}


/**
 * @param	{JSRecord}	[assetRecord] Record that we are working with
 * @param	{Boolean}	[editMode] Save data or leave in pseudo-transaction
 * 
 * @properties={typeid:24,uuid:"C37CDF64-0B6B-4908-9DD2-52593E9A0F1D"}
 */
function ASSET_copy_link(assetRecord,editMode) {
	
	if (!assetRecord instanceof JSRecord) {
		assetRecord = foundset.getSelectedRecord()
	}
	
	if (editMode) {
		_editMode = true
	}
	else {
		_editMode = false
	}
	
	//save outstanding data and turn autosave off
	if (!_editMode) {
		databaseManager.saveData()
		databaseManager.setAutoSave(false)
	}
	
	//get default asset instance
	var srcAsset = assetRecord.web_asset_to_asset_instance__initial.getRecord(1)

	var template 	= '/{{path}}/{{name}}'
	var data		= { path : srcAsset.asset_directory, name : srcAsset.asset_title }
	var link		= globals.CMS.markup.merge(template,data)
	
	application.setClipboardContent(link)
}

