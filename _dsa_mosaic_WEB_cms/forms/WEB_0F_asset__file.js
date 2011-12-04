/**
 * @properties={typeid:35,uuid:"70C9A8A9-DF72-4450-B242-EF06129E6956"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
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
//	//menu items
//	var valuelist = new Array(
//					'Scale image'
//				)
//	
//	//called to depress menu
//	if (input instanceof JSEvent) {
//		//set up menu with arguments
//		var menu = new Array()
//		
//		for ( var i = 0 ; i < valuelist.length ; i++ ) {
//			menu[i] = plugins.popupmenu.createMenuItem(valuelist[i],ASSET_actions)
//			
//			menu[i].setMethodArguments(i,assetRecord)
//			
//			if (menu[i].text == '----') {
//				menu[i].setEnabled(false)
//			}
//		}
//		//popup
//		var elem = forms[input.getFormName()].elements[input.getElementName()]
//		if (elem != null) {
//			plugins.popupmenu.showPopupMenu(elem, menu)
//		}
//	}
//	//menu shown and item chosen
//	else {
//		switch( input ) {
//			case 0:	//
//				ASSET_scale(assetRecord)
//				break
//		}
//	}
}
