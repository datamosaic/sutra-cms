/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"95F8EC42-61FB-4F2A-ACB7-4EBE41C89EBB"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"604E8D87-5665-4199-9163-734E7F667C5B"}
 */
function REC_delete() {
	var delRec = globals.DIALOGS.showWarningDialog(
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
