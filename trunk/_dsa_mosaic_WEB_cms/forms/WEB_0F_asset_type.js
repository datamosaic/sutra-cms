/**
 * @properties={typeid:35,uuid:"0FECFD05-A2A6-4032-9D2E-9B184B2B76BD"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"318C4DD9-3041-42B5-B75C-83F7232684AA"}
 */
function REC_delete()
{
	var input = plugins.dialogs.showWarningDialog(
						'Delete',
						'Do you really want to delete this record?',
						'Yes',
						'No'
					)

	if (input == 'Yes') {
		controller.deleteRecord()
		
		//dim out the lights
		if (!utils.hasRecords(foundset)) {
			FORM_on_show()
		}
	}
}

/**
 *
 * @properties={typeid:24,uuid:"C0341B42-F4A7-4FB6-83A5-4E47155447BE"}
 */
function REC_new() {
	//unimplemented refresh at this point
	var flagRefresh
	
	//no records created yet and interface locked
	if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow) {
		globals.WEB_lock_workflow(false)
	}
	
	// 1) choose form to register as an asset
	application.showFormInDialog(
						forms.WEB_P__block_new,
						-1,-1,-1,-1,
						' ',
						false,
						false,
						'cmsBlockNew'
					)
	
	//this should be forms.WEB_P__block_new._formName...some scoping issue (fid cancel hack...)
	if ( forms.WEB_0F_asset_type._formName == undefined ) {
		FORM_on_show()
		return "Action cancelled"
	}	
	var formName = _formName
	
	//a form picked and it exists in the solution
	if (formName && forms[formName]) {
		
		if (!flagRefresh) {	
			function uniqueNameCheck(name) {  // returns true if duplicate name detected
				var nameArray = []
				var result = false
				for (var i = 0; i < foundset.getSize(); i++) {
					nameArray.push(foundset.getRecord(i + 1).block_name)
				}
				for (var j in nameArray) {
					if ( nameArray[j] == name ) {
						result = true
						break
					}
				}
				return result
			}
		}
		
		// 2) get asset init and associated meta data to build data object
		if ( forms[formName] ) {
			//form not loaded yet, get solution model to check for method existence
			if (forms[formName] == '<Form ' + formName + ' not loaded yet>' && solutionModel.getForm(formName).getFormMethod('INIT_asset')) {
				var hasInit = true
			}
			//check for method existence on form
			else if (forms[formName].INIT_asset) {
				var hasInit = true
			}
			if ( hasInit ) {
				var obj = forms[formName].INIT_asset()
			}
			else {
				plugins.dialogs.showErrorDialog( "Error", "No INIT_block method on selected form")
				return
			}
		}
		

		// 3) create asset and related data from data object
		var assetRecord = (!flagRefresh) ? foundset.getRecord(foundset.newRecord(false,true)) : foundset.getSelectedRecord()
		var name = obj.record.asset_type
		
		// ensure asset name is unique
		if (!flagRefresh) {
			var incrementer = 1
			while ( uniqueNameCheck(name) ) {
				// increment name by 1 until unique name is found
				name = obj.record.asset_type + " " + incrementer
				incrementer += 1
			}
		}
		assetRecord.asset_type = name
		assetRecord.description = obj.record.asset_description
		assetRecord.form_name = obj.record.form_name
		
		// remove related asset records
		if (flagRefresh) {
			web_asset_type_to_asset_type_meta.deleteAllRecords()
		}
		
		// asset data
		for (var i in obj.data) {
			var data = assetRecord.web_asset_type_to_asset_type_meta.getRecord(assetRecord.web_asset_type_to_asset_type_meta.newRecord())
			data.data_key = i
			data.data_type = obj.data[i]
		}
		
		databaseManager.saveData()
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0CD1A1C3-66C7-4F73-BE11-0233DA4D44CE"}
 */
function FORM_on_show(firstShow, event) {
	if (!utils.hasRecords(foundset)) {
		globals.WEB_lock_workflow(true)
	}
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"FD0EFA0E-ED5D-48C9-9047-0C28719AFA69"}
 */
function FORM_on_hide(event) {
	if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow) {
		globals.WEB_lock_workflow(false)
	}
	
	return true
}
