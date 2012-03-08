/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"BB643F4C-1851-4C61-843B-B6054292A02F"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"27678C93-5131-4413-B408-D0DBCFBBC8F4"}
 */
function REC_delete() {

	if (utils.hasRecords(foundset)) {
		var delRec = plugins.dialogs.showWarningDialog(
				'Delete record',
				'Do you really want to delete this record?',
				'Yes',
				'No'
			)
				
		if (delRec == 'Yes') {
			controller.deleteRecord()
		}
	}
	else {
		plugins.dialogs.showErrorDialog(
						'Error',
						'No records'
				)
	}

}

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"D03A8E32-9737-4B22-83B7-18620A7D5420",variableType:-4}
 */
var _skipSelect = false;

/**
 * @properties={typeid:24,uuid:"B3A82B25-CCEE-4B57-B592-95E139D28649"}
 */
function REC_on_select(event) {
	if (!_skipSelect) {
		//disable on select
		forms.WEB_0F_block__scrapbook._skipSelect = true
		
		//save down selected version
		globals.WEB_block_version = utils.hasRecords(foundset) ? id_block_version.toString() : null
		
		//enable on select
		forms.WEB_0F_block__scrapbook._skipSelect = false
		
		//load up data when different version clicked on
		if (event) {
			forms.WEB_0F_block__scrapbook.REC_on_select()
		}
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
 * @properties={typeid:24,uuid:"016F9AF0-9FFA-4E94-9EE9-927015397A5C"}
 */
function FLD_version_name__data_change(oldValue, newValue, event) {
	//regenerate valuelist when clicked on
	if (event) {
		forms.WEB_0F_block__scrapbook.SET_versions()
	}
	
	return true
}
