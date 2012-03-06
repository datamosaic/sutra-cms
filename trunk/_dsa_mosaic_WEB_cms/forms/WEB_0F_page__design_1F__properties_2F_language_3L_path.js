/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f55",variableType:12}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"F0C56D84-0838-42EB-8B26-729DB50C69B0"}
 */
function REC_delete()
{

/*
 *	TITLE    :	REC_delete
 *			  	
 *	MODULE   :	start_CRM_mosaic
 *			  	
 *	ABOUT    :	prompts to delete the currently selected record
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	REC_delete()
 *			  	
 *	MODIFIED :	July 31, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */	//TODO: renumber the remaining versions

if (utils.hasRecords(foundset)) {
	//can't delete default
	if (flag_default) {
		plugins.dialogs.showErrorDialog(
					'Error',
					'The default path cannot be deleted'
			)
	}
	else {
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
}
else {
	plugins.dialogs.showErrorDialog(
					'Error',
					'No records'
			)
}

}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean} valid value
 *
 * @properties={typeid:24,uuid:"78190F65-DF35-4799-8B72-97BE0FF8D983"}
 */
function FLD_data_change__flag_default(oldValue, newValue, event) {
//	if (!newValue && typeof oldValue == 'number') {
//		var record = foundset.getRecord(foundset.getSelectedIndex())
//		
//		databaseManager.saveData()
//		
//		if (record.flag_default) {
//			var fsUpdater = databaseManager.getFoundSetUpdater(foundset)
//			fsUpdater.setColumn('flag_default',0)
//			fsUpdater.performUpdate()
//			record.flag_default = 1
//		}
//		else {
//			plugins.dialogs.showErrorDialog(
//						'Error',
//						'There must always be a default'
//				)
//			record.flag_default = 1
//		}
//		
//		databaseManager.saveData()
//	}
//	return true

	var record = foundset.getRecord(foundset.getSelectedIndex())
	
	if (newValue) {
		for (var i = 1; i <= foundset.getSize(); i++) {
			var tempRecord = foundset.getRecord(i)
			
			if (tempRecord.id_path != record.id_path) {
				tempRecord.flag_default = null
			}
		}
	}
	else {
		plugins.dialogs.showErrorDialog(
						'Error',
						'There must always be a default'
				)
			record.flag_default = 1
	}
	
	return true
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean} valid value
 *
 * @properties={typeid:24,uuid:"C6F355D7-2CB8-4D6B-92DA-3560FC12EC57"}
 * @AllowToRunInFind
 */
function FLD_data_change__path(oldValue, newValue, event) {
	newValue = utils.stringReplace(newValue,' ','-')
	
	var fsPath = databaseManager.getFoundSet(controller.getServerName(),'web_path')
	fsPath.clear()
	fsPath.find()
	fsPath.id_site = forms.WEB_0F_site.id_site
	fsPath.path = newValue
	var results = fsPath.search()
	
	//the path is not unique for this site
	if (results > 1) {
		plugins.dialogs.showErrorDialog(
					'Error',
					'The path is not unique'
			)
		return false
	}
	else {
		path = newValue
		return true
	}
}

/**
 *
 * @properties={typeid:24,uuid:"5D46A409-C29A-422B-9800-3E5D1BA6D773"}
 */
function REC_new() {
	controller.newRecord(false)
	id_site = forms.WEB_0F_site.id_site
	
	if (foundset.getSize() == 1) {
		flag_default = 1
	}
	
	elements.fld_path.requestFocus(false)
}
