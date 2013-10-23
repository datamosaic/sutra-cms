/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f26"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"1637C97D-08E7-4019-813B-FF8A07B35AB6",variableType:-4}
 */
var _skipSelect = false;

/**
 *
 * @properties={typeid:24,uuid:"022C11EE-D472-44B4-88EA-873A195E7136"}
 */
function REC_delete() {
	var input = globals.DIALOGS.showWarningDialog(
						'Delete',
						'Do you really want to delete this record?',
						'Yes',
						'No'
					)

	if (input == 'Yes') {
		//delete all assets when not a group
		if (asset_type != 3 && utils.hasRecords(web_asset_to_asset_instance)) {
			//grab directory name
			var directory = web_asset_to_asset_instance__initial.asset_directory
			var baseDirectory = forms.WEB_0F_install.ACTION_get_install() +
					'/application_server/server/webapps/ROOT/sutraCMS/sites/' +
					forms.WEB_0F_site.directory						
			var deleteThis		= {}
			deleteThis.directory	 	= baseDirectory + '/' + directory
			
			for (var i = 1; i <= web_asset_to_asset_instance.getSize(); i++) {
				forms.WEB_0F_asset_1F_2L_asset_instance.REC_delete(null,true,forms.WEB_0F_asset_1F_2L_asset_instance.foundset.getRecord(i))
			}
			
		//delete directory
			// developer version (use local file system method since headless client plugin bugged)
			if ( application.isInDeveloper() ) {
				forms.WEB_0C__file_stream.ASSET_delete(deleteThis)
			}
			// file streaming version when on a service
			else {
				var jsclient = plugins.headlessclient.createClient("_dsa_mosaic_WEB_cms", null, null, null)
				jsclient.queueMethod("WEB_0C__file_stream", "ASSET_delete", [deleteThis], null)
			}
		}
		
		scopes.SLICK.deleteRow()
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
		
		globals.CODE_form_in_dialog(
					forms.WEB_P_tag__add,
					400,-1,-1,-1,
					'Tags',
					true,
					false,
					'tagAdd'
				)
	}
	else {
		globals.DIALOGS.showErrorDialog(
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
		
		globals.CODE_form_in_dialog(
					forms.WEB_P_tag__remove,
					400,-1,-1,-1,
					'Tags',
					true,
					false,
					'tagDelete'
				)
	}
	else {
		globals.DIALOGS.showErrorDialog(
					'Error',
					'There is no record to remove tags from'
				)
	}

}

/**
 *
 * @properties={typeid:24,uuid:"FF5AF14C-E836-4D15-897E-FC174AA6C371"}
 */
function REC_new(assetType) {
	var input = globals.DIALOGS.showSelectDialog( 
					"Asset", 
					"Select asset type", 
					["Image","File","Group"]
				)
	
	//something selected, do the right kind of import
	switch ( input  ) {
		case 'Image':
			forms.WEB_0C__file_stream.IMAGE_import("images")
			break
		case 'File':
			forms.WEB_0C__file_stream.FILE_import("files")
			break
		case 'Group':
			// create asset record
			var fsAsset = foundset
			//disable on select method
			_skipSelect = true
			
			var assetRec = fsAsset.getRecord(fsAsset.newRecord(true,true))
			assetRec.id_site = forms.WEB_0F_site.id_site
			assetRec.asset_type = 3
			
			//enable on select method
			_skipSelect = false
			REC_on_select()
			break
	}
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"CFCBF7B5-C038-4D04-AFF3-41AEA18ED580"}
 * @AllowToRunInFind
 */
function FILTER_records(event) {
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
	//only do this when not running in data sutra
	if (!application.__parent__.solutionPrefs) {
		FILTER_records(event)
	}
	//don't run in headless or web client (they use whatever solution is activated as context)
	else if ((application.getApplicationType() == APPLICATION_TYPES.SMART_CLIENT || application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) &&
		//don't run if in a preload
		!(application.__parent__.solutionPrefs && solutionPrefs.config.prefs.formPreloading)) {
	
		if (!utils.hasRecords(foundset)) {
			//make sure that doesn't lock us out of left-side lists
			if (solutionPrefs.config.activeSpace == 'workflow') {
				solutionPrefs.config.activeSpace = 'standard'
			}
			
			globals.WEB_lock_workflow(true)
			
			//there are records in the pages used on list, clear
			if (utils.hasRecords(forms.WEB_0F_asset_1L_page.foundset)) {
				forms.WEB_0F_asset_1L_page.foundset.clear()
			}
		}
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
	if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow && !solutionPrefs.config.prefs.formPreloading) {
		globals.WEB_lock_workflow(false)
	}
	
	return true
}

/**
 * @param	{Number}	assetType What type of asset are we working with
 * 
 * @properties={typeid:24,uuid:"69916907-339D-4989-A21B-A53DD115E194"}
 */
function MAP_asset(assetType) {
	switch (assetType) {
		case 1:	//images
			return forms.WEB_0F_asset__image.INIT_asset()
			break
		case 2:	//files
			return forms.WEB_0F_asset__file.INIT_asset()
			break
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"750A29D4-2647-475B-BA2F-B86562F6C9B2"}
 */
function TAB_change(event) {
	globals.TAB_change_grid(null,null,'tab_list','tab_l')
	
	elements.btn_tag_add.visible = elements.tab_list.tabIndex == 2
	elements.btn_tag_delete.visible = elements.tab_list.tabIndex == 2
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"49E7AA78-EDBA-4820-BD16-BDB92BD63793"}
 */
function REC_on_select(event) {
	//disable select method when new asset created
	if (!_skipSelect) {
		//show appropriate buttons on asset instance list
		forms.WEB_0F_asset_1F.TOGGLE_elements(asset_type == 3)
		
		var fsPages = forms.WEB_0F_asset_1L_page.foundset
		
		//there is something to do on this page
		if (utils.hasRecords(foundset) && utils.hasRecords(web_asset_to_asset_instance)) {
			globals.CODE_cursor_busy(true)
			var args = [1,'id_asset_instance']
			
			var query = 
	"SELECT DISTINCT c.id_page FROM web_platform a, web_version b, web_page c WHERE b.id_version IN ( \
		SELECT DISTINCT c.id_version from web_block a, web_scope b, web_area c, web_block_version d, web_block_data e WHERE \
		c.id_area = b.id_area AND \
		b.id_block = a.id_block AND \
		d.id_block = a.id_block AND \
		e.id_block_version = d.id_block_version AND \
		d.flag_active = ? AND \
		e.data_key = ? AND \
		e.data_value IN ("
			for (var i = 1; i <= web_asset_to_asset_instance.getSize(); i++) {
				var record = web_asset_to_asset_instance.getRecord(i)
				//build up query
				query += '?'
				if (i < web_asset_to_asset_instance.getSize()) {
					query += ','
				}
				//tack on to arguments
				args.push(record.id_asset_instance.toString())
			}
	query += ") \
	) AND \
		a.id_platform = b.id_platform AND \
		a.id_page = c.id_page"
			
			var dataset = databaseManager.getDataSetByQuery(
						'sutra_cms', 
						query, 
						args, 
						-1
					)
			
			//load correct pages that this is used on
			fsPages.loadRecords(dataset)
			
			globals.CODE_cursor_busy(false)
		}
		//clear out the related pages link
		else {
			fsPages.clear()
		}
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2395AFBF-A96C-46AC-95BB-8055740BA1CD"}
 */
function ACTION_preview(event) {
	forms.WEB_0F_asset__image.ASSET_preview()
}
