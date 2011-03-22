/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f26"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"022C11EE-D472-44B4-88EA-873A195E7136"}
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
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0DFCEC6C-DF14-4E2B-BE6A-A5F986F8375C"}
 */
function TAG_add(event) {
	if (utils.hasRecords(foundset)) {
		//turn autosave off
		databaseManager.setAutoSave(false)
		
		forms.WEB_P_tag__add._callingForm = controller.getName()
		
		application.showFormInDialog(
					forms.WEB_P_tag__add,
					400,-1,-1,-1,
					'Tags',
					true,
					false,
					'tagAdd'
				)
	}
	else {
		plugins.dialogs.showErrorDialog(
						'Error',
						'There is no record to add tags to'
					)
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8372B4E8-DA55-4B6A-8F4F-4B7C787F286C"}
 */
function TAG_delete(event) {
	if (utils.hasRecords(foundset)) {
		//turn autosave off
		databaseManager.setAutoSave(false)
		
		forms.WEB_P_tag__remove._callingForm = controller.getName()
		
		application.showFormInDialog(
					forms.WEB_P_tag__remove,
					400,-1,-1,-1,
					'Tags',
					true,
					false,
					'tagDelete'
				)
	}
	else {
		plugins.dialogs.showErrorDialog(
						'Error',
						'There is no record to remove tags from'
					)
	}

}

/**
 *
 * @properties={typeid:24,uuid:"FF5AF14C-E836-4D15-897E-FC174AA6C371"}
 */
function REC_new() {
	if (utils.hasRecords(forms.WEB_0F_site.foundset)) {
		//no records created yet and interface locked
		if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow) {
			globals.WEB_lock_workflow(false)
		}
		
		//save down data
		databaseManager.saveData()
		databaseManager.setAutoSave(false)
		controller.newRecord()
		id_site = forms.WEB_0F_site.id_site
		var assetID = id_asset
		
		//prompt for type of asset
		application.showFormInDialog(
					forms.WEB_P_asset,
					-1,-1,-1,-1,
					' ',
					false,
					false,
					'cmsAssetNew'
				)
		
		//new record not cancelled
		if (assetID == id_asset) {
			//create asset
			var assetRecord = web_asset_to_asset_instance.getRecord(web_asset_to_asset_instance.newRecord(false,true))
			
			//get template for this type of asset
			var template = globals.WEB_asset_map(asset_type)
			
			//add all meta data rows
			for (var i in template.meta) {
				var metaRec = assetRecord.web_asset_instance_to_asset_instance_meta.getRecord(assetRecord.web_asset_instance_to_asset_instance_meta.newRecord(false,true))
				
				metaRec.data_key = i
				metaRec.data_type = template.meta[i]
				
				databaseManager.saveData(metaRec)
			}
			
			//pseudo-record
			var assetMeta = forms.WEB_0F_asset_1F_2L_asset_instance.REC_on_select(assetRecord)
			
			//check to see if this form is available and we can run an ASSET_import method on it
			if ( template.formName && forms[template.formName] ) {
				//form not loaded yet, get solution model to check for method existence
				if (forms[template.formName] == '<Form ' + template.formName + ' not loaded yet>' && solutionModel.getForm(template.formName).getFormMethod('ASSET_import')) {
					var hasInit = true
				}
				//check for method existence on form
				else if (forms[template.formName].ASSET_import) {
					var hasInit = true
				}
				
				//show correct FiD for chosen asset type
				if ( hasInit ) {
					forms[template.formName].ASSET_import(assetMeta)
					foundset.selectRecord(assetRecord.id_asset)
				}
				else {
					plugins.dialogs.showErrorDialog( "Error", "Selected block does not have a ASSET_import method")
				}
			}
		}
		else {
			if (!utils.hasRecords(foundset)) {
				globals.WEB_lock_workflow(true)
			}
		}
	}
	else {
		plugins.dialogs.showErrorDialog(
						'Error',
						'You must add a site record first'
				)
	}
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"CFCBF7B5-C038-4D04-AFF3-41AEA18ED580"}
 */
function FORM_on_load(event) {
	//find stuff for the selected site
	if (utils.hasRecords(forms.WEB_0F_site.foundset)) {
		foundset.find()
		foundset.id_site = forms.WEB_0F_site.id_site
		var results = foundset.search()
	}
	else {
		foundset.clear()
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"16C7820E-528E-495C-A409-E0EA923E2429"}
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
 * @properties={typeid:24,uuid:"6F9735E5-4802-4370-9526-80C07653820B"}
 */
function FORM_on_hide(event) {
	if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow) {
		globals.WEB_lock_workflow(false)
	}
	
	return true
}
