/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f22"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:24,uuid:"29DE3DC1-9D88-4FE8-B600-1C846174AA37"}
 */
function FLD_default()
{
	// set the default display view method for this block type
	// flag_display
	
	databaseManager.saveData()

	if (flag_default) {
		var fsUpdater = databaseManager.getFoundSetUpdater(foundset)
		fsUpdater.setColumn('flag_default',0)
		fsUpdater.performUpdate()
		flag_default = 1
	}
	
	databaseManager.saveData()
	
	//flag that blocks updated so new must refresh block default display
	forms.WEB_P__block__new._refreshBlockDefault = true
}

/**
 * @properties={typeid:24,uuid:"E01A4EC7-9399-49B4-81D7-547D5BADE4B9"}
 */
function REC_delete() {
	var delRec = globals.DIALOGS.showWarningDialog(
			'Delete record',
			'Do you really want to delete this record?',
			'Yes',
			'No'
		)
	
	if (delRec == 'Yes') {
		controller.deleteRecord()
	}
}

/**
 * @properties={typeid:24,uuid:"370B6D46-FA41-414E-95F8-B6ACF5432FDD"}
 */
function REC_new() {
	controller.newRecord(false)
	databaseManager.saveData()
}
