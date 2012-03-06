/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2BE16D97-AA27-4310-9521-2BC0A229CF69",variableType:12}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"291F5C2D-F713-4EE3-B3CE-761675E9BF60"}
 */
function REC_delete() {
	var delRec = plugins.dialogs.showWarningDialog(
					'Delete record',
					'Warning! This will delete all localized info for this page.\nDo you really want to delete this record?',
					'Yes',
					'No'
				)
	
	//TODO: beef up delete
	if (delRec == 'Yes') {
		controller.deleteRecord()
	}
}
