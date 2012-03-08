/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"82F37744-B94F-4CC1-A946-CC10742B4B9B"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"A1B6A2AD-D3DF-44B9-90D3-46084CD47D94"}
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

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1BD138DD-BFB0-4A88-B463-13E8D1D3CB25"}
 */
function REC_on_select(event) {
	
}
