/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0FEDFD05-A2A6-4032-9D2E-9B184B2B76BD"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"465C7830-170A-4A48-8964-C2AF4C5C2CC2",variableType:-4}
 */
var _assetMeta = null;

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0A274E4B-8669-4287-97D5-81A3CB5FBC75"}
 */
function REC_on_select(event) {
	//record passed in
	if (event instanceof JSRecord) {
		var asset = new Object()
		asset.parentRec = event
	}
	else {
		var asset = 
			_assetMeta = new Object()
		
		asset.parentRec = foundset.getSelectedRecord()
	}
	
	//bundle up pseudo-record of meta rows so easier to access
	if (asset.parentRec && utils.hasRecords(asset.parentRec.web_asset_instance_to_asset_instance_meta)) {
		for (var i = 1; i <= asset.parentRec.web_asset_instance_to_asset_instance_meta.getSize(); i++) {
			var record = asset.parentRec.web_asset_instance_to_asset_instance_meta.getRecord(i)
			asset[record.data_key] = record
		}
	}
	
	return asset
}

/**
 *
 * @properties={typeid:24,uuid:"F2373AA4-4FB7-4DF7-8809-A0277D3CFCBC"}
 * @AllowToRunInFind
 */
function REC_delete(event,batch,record) {
	if (!record) {
		record = foundset.getSelectedRecord()
	}
	
	var fsAssetInstance = databaseManager.getFoundSet('sutra_cms','web_asset_instance')
	
	// root directory for this site
	var baseDirectory = forms.WEB_0F_install.ACTION_get_install() +
						'/application_server/server/webapps/ROOT/sutraCMS/sites/' +
						forms.WEB_0F_site.directory						
	var deleteThis		= {}
	deleteThis.file	 	= baseDirectory + '/' + record.asset_directory + '/' + record.asset_title
	
	if (!batch) {
		var input = plugins.dialogs.showWarningDialog(
						'Delete record',
						'Do you really want to delete this record?',
						'Yes',
						'No'
					)
	}
	
	if (batch || input == 'Yes') {
		// developer version (use local file system method since headless client plugin bugged)
		if ( application.isInDeveloper() ) {
			//delete all related records for non-groups
			if (record.web_asset_instance_to_asset.asset_type != 3) {
				//shoe FiD
				if (!batch) {
					if ( forms.WEB_0C__file_stream.ASSET_delete(deleteThis) ) {
						plugins.dialogs.showInfoDialog("Success","Record deleted")
					}
					//file not deleted
					else {
						plugins.dialogs.showWarningDialog("Warning","File not found; record deleted")
					}
				}
				
				//hunt for all other asset instances pointing to the same location
				fsAssetInstance.find()
				fsAssetInstance.asset_directory = record.asset_directory
				fsAssetInstance.asset_title = record.asset_title
				var results = fsAssetInstance.search()
				
				if (results) {
					fsAssetInstance.deleteAllRecords()
				}
			}
			//just delete selected record
			else {
				foundset.deleteRecord(record)
			}
		}
		// file streaming version when on a service
		else {
			var jsclient = plugins.headlessclient.createClient("_dsa_mosaic_WEB_cms", null, null, null)
			
			//delete all related records for non-groups
			if (record.web_asset_instance_to_asset.asset_type != 3) {
				//no FiD
				if (batch) {
					jsclient.queueMethod("WEB_0C__file_stream", "ASSET_delete", [deleteThis], null)
				}
				//show FiD when done
				else {
					jsclient.queueMethod("WEB_0C__file_stream", "ASSET_delete", [deleteThis], REC_delete_callback)
				}
				
				//hunt for all other asset instances pointing to the same location
				fsAssetInstance.find()
				fsAssetInstance.asset_directory = record.asset_directory
				var results = fsAssetInstance.search()
				
				if (results) {
					fsAssetInstance.deleteAllRecords()
				}
			}
			//just delete selected record
			else {
				foundset.deleteRecord(record)
			}
		}
	}
}

/**
 * @properties={typeid:24,uuid:"E6D98BA1-59D4-4944-B212-119CE8F0982D"}
 */
function REC_new() {
	//load all asset types
	forms.WEB_P__asset.LOAD_data()
		
	//show asset chooser
	globals.CODE_form_in_dialog(
					forms.WEB_P__asset,
					-1,-1,-1,-1,
					" ",
					true,
					false,
					"CMS_assetChoose"
				)
	
	//something chosen, duplicate asset here
	if (forms.WEB_P__asset._assetChosen) {
		var newAssetInstance = foundset.getRecord(foundset.newRecord(false,true))
		databaseManager.copyMatchingColumns(forms.WEB_P__asset._assetChosen.asset,newAssetInstance)
		databaseManager.saveData(newAssetInstance)
		
		for (var i in forms.WEB_P__asset._assetChosen.meta) {
			var newMeta = newAssetInstance.web_asset_instance_to_asset_instance_meta.getRecord(newAssetInstance.web_asset_instance_to_asset_instance_meta.newRecord(false,true))
			newMeta.data_key = i
			newMeta.data_value = forms.WEB_P__asset._assetChosen.meta[i]
		}
		
		databaseManager.saveData()
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
 * @properties={typeid:24,uuid:"5D8061CC-162E-40E1-9893-481EE26F9981"}
 */
function FLD_data_change__flag_initial(oldValue, newValue, event) {
	var selected = foundset.getSelectedRecord()
	
	for (var i = 1; i <= foundset.getSize(); i++) {
		var record = foundset.getRecord(i)
		record.flag_initial = 0
	}
	
	selected.flag_initial = newValue
	
	databaseManager.saveData()
	
	return true
}

/**
 * @properties={typeid:24,uuid:"897AE672-F733-424D-AF42-110E1C7AB43C"}
 */
function REC_delete_callback(callback) {
	if ( callback.data ) {
		plugins.dialogs.showInfoDialog("Success","Record deleted")
	}
	else {
		plugins.dialogs.showWarningDialog("Warning","File not found; record deleted")
	}
}
