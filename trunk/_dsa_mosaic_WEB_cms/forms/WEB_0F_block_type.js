/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f19"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4581AF20-5EEC-4B8D-9F54-56EB4AE0D46C"}
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
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean} valid value
 *
 * @properties={typeid:24,uuid:"4FCD8412-C8D2-4B99-92FA-B1A96F9984E0"}
 */
function FLD_data_change__block_name(oldValue, newValue, event) {
	
	var fsBlockType = databaseManager.getFoundSet(controller.getServerName(),controller.getTableName())
	fsBlockType.find()
	fsBlockType.id_site = forms.WEB_0F_site.id_site
	fsBlockType.block_name = newValue
	var results = fsBlockType.search()
	
	if (results > 1) {
		plugins.dialogs.showErrorDialog(
					'Error',
					'This block name is not unique...rename'
			)
		block_name = oldValue
		return false
	}
	else {
		return true
	}
	
	return true
}

/**
 *
 * @properties={typeid:24,uuid:"4BC73EC6-1B92-4A66-92D8-8CB57957F0D4"}
 */
function BATCH_create() {
	//mapping for things to create
//	var mapping = new Array()
//	
//	var blockContent = {
//				block_name	: 'Content',
//				block_description	: 'Generic freeform content. HTML/CSS for structure and formatting.\n\nUses TinyMCE to edit content.',
//				form_name	: 'WEB_0B_content',
//				interaction	: '',
//				web_block_type_to_block_display	: [
//                               	   {
//							description	: '',
//							display_name	: 'Default',
//							flag_default	: 1,
//							method_name	: 'VIEW_default'
//						}
//						],
//				
//				web_block_type_to_block_input	: [
//                               	   {
//							column_name	: 'Content',
//							column_type	: 'Text',
//							description	: ''
//						}
//						]
//			}
//	mapping.push(blockContent)
//	
//	
//	var blockImage = {
//				block_name	: 'Image',
//				block_description	: '',
//				form_name	: 'WEB_0B_image',
//				interaction	: '',
//				web_block_type_to_block_display	: [
//                               	   {
//							description	: '',
//							display_name	: 'Default',
//							flag_default	: 1,
//							method_name	: 'VIEW_default'
//						},
//						      	   {
//							description	: '',
//							display_name	: 'FID',
//							flag_default	: 0,
//							method_name	: 'VIEW_fid'
//						}
//						],
//				
//				web_block_type_to_block_input	: [
//                               	   {
//							description	: '',
//							input_name	: 'Image import...',
//							method_name	: 'ACTION_import'
//						},
//						      	   {
//							description	: '',
//							input_name	: 'Scale image...',
//							method_name	: 'ACTION_image_scale'
//						},
//						      	   {
//							description	: '',
//							input_name	: 'Choose image...',
//							method_name	: 'ACTION_choose_image'
//						}
//						],	
//				
//				web_block_type_to_block_input	: [
//                               	   {
//							column_name	: 'image_name',
//							column_type	: 'text',
//							description	: ''
//						},
//						      	   {
//							column_name	: 'image_type',
//							column_type	: 'text',
//							description	: ''
//						},
//									{
//							column_name	: 'image_extension',
//							column_type	: 'text',
//							description	: ''
//						},
//						      	   {
//							column_name	: 'height',
//							column_type	: 'integer',
//							description	: ''
//						},
//									{
//							column_name	: 'width',
//							column_type	: 'integer',
//							description	: ''
//						},
//						      	   {
//							column_name	: 'rec_created',
//							column_type	: 'datetime',
//							description	: ''
//						},
//									{
//							column_name	: 'directory',
//							column_type	: 'text',
//							description	: ''
//						},
//						      	   {
//							column_name	: 'height_original',
//							column_type	: 'integer',
//							description	: ''
//						},
//									{
//							column_name	: 'width_original',
//							column_type	: 'integer',
//							description	: ''
//						}
//						]
//			}
//	mapping.push(blockImage)	
//	 
//	var blockNavigation = {
//				block_name	: 'Navigation',
//				block_description	: 'Different navigation setups',
//				form_name	: 'WEB_0B_page__navigation',
//				interaction	: '',
//				web_block_type_to_block_display	: [
//                               	   {
//							description	: 'Main navigation as a column list',
//							display_name	: 'Default',
//							flag_default	: 1,
//							method_name	: 'VIEW_default'
//						},
//						      	   {
//							description	: 'Navigation as a breadcrumb to current page',
//							display_name	: 'Breadcrumb',
//							flag_default	: 0,
//							method_name	: 'VIEW_breadcrumb'
//						}
//						]
//			}
//	mapping.push(blockNavigation)	
//	
//	
//	var blockPage = {
//				block_name	: 'Page List',
//				block_description	: 'Linked page list',
//				form_name	: 'WEB_0B_page__page_list',
//				interaction	: '',
//				web_block_type_to_block_display	: [
//                               	   {
//							description	: '',
//							display_name	: 'Default',
//							flag_default	: 1,
//							method_name	: 'VIEW_default'
//						}
//						]
//			}
//	mapping.push(blockPage)	
//	
//	//create blocks from mapping
//	for (var i = 0; i < mapping.length; i++) {
//		var thisItem = mapping[i]
//		
//		//create new block
//		var recBlock = foundset.getRecord(foundset.newRecord(false,true))
//		
//		//tie to site
//		recBlock.id_site = forms.WEB_0F_site.id_site
//		
//		//loop over all properties and create
//		for (var j in thisItem) {
//			//repeat
//			if (thisItem[j] instanceof Array) {
//				for (var k = 0; k < thisItem[j].length; k++) {
//					var subItem = thisItem[j][k]
//					
//					//add a record
//					var subRec = recBlock[j].getRecord(recBlock[j].newRecord(false,true))
//					
//					//fill values
//					for (var l in subItem) {
//						subRec[l] = subItem[l]
//					}
//				}
//			}
//			//fill value
//			else {
//				recBlock[j] = thisItem[j]
//			}
//		}
//	}

}

/**
 * Create (register) a new block. Requires a block init method (INIT_block) on block form
 * that returns properly structured meta data
 * 
 * @requires INIT_block() method on selected block form
 * @author Data Mosaic (C)
 * 
 * @param {boolean} flagRefresh refresh current block if true
 * @properties={typeid:24,uuid:"98C31479-A1EE-4A13-9F2F-0752680E3428"}
 */
function REC_new(flagRefresh) {
	if (utils.hasRecords(forms.WEB_0F_site.foundset)) {
		//no records created yet and interface locked
		if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow) {
			globals.WEB_lock_workflow(false)
		}
		
		if (!flagRefresh) {
			//get current list of forms that are valid
			var validForms = FIND_forms()
			
			if (validForms && validForms.length) {
//				var formName = plugins.dialogs.showSelectDialog(
//							'New block',
//							'Choose the form that describes the block you want to create',
//							validForms
//					)
				
				// 1) choose form to register as a block
				application.showFormInDialog(
									forms.WEB_P__block_type__new,
									-1,-1,-1,-1,
									' ',
									true,
									false,
									'cmsBlockTypeNew'
								)	
				
				//this should be forms.WEB_P__block_type__new._formName...some scoping issue (fid cancel hack...)
				if ( forms.WEB_0F_block_type._formName == undefined ) {
					return "Action cancelled"
				}	
				
				var formName = _formName
				
				//now delete _formName (.../fid cancel hack)
				delete forms.WEB_0F_block_type._formName
			}
			else {
				plugins.dialogs.showErrorDialog(
							'Error',
							'There are no unadded blocks in this solution'
					)
				return
			}
		}	
		else {
			// use current block type record
			var formName = form_name
			
			var oldBlockInput = new Array()
			var oldBlockConfig = new Array()
			
			for (var i = 1; i <= web_block_type_to_block_input.getSize(); i++) {
				var record = web_block_type_to_block_input.getRecord(i)
				oldBlockInput.push(record.column_name)
			}
			
			for (var i = 1; i <= web_block_type_to_block_configure.getSize(); i++) {
				var record = web_block_type_to_block_configure.getRecord(i)
				oldBlockConfig.push(record.column_name)
			}
		}

		
		//a form picked and it exists in the solution
		if (formName && forms[formName]) {
			
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
		
			// 2) get block init() and associated meta data to build data object
			if ( forms[formName] ) {
				//form not loaded yet, get solution model to check for method existence
				if (solutionModel.getForm(formName).getFormMethod('INIT_block')) {
					var obj = forms[formName].INIT_block()
				}
				else {
					plugins.dialogs.showErrorDialog( "Error", "Selected block does not have an INIT_block method")
					return
				}
			}
			
			// 3) create block and related data from data object
			var block = (!flagRefresh) ? foundset.getRecord(foundset.newRecord()) : foundset.getSelectedRecord()
			block.id_site = forms.WEB_0F_site.id_site
			var name = obj.record.block_name
			
			// ensure block name is unique
			if (!flagRefresh) {
				var incrementer = 1
				while ( uniqueNameCheck(name) ) {
					// increment name by 1 until unique name is found
					name = obj.record.block_name + " " + incrementer
					incrementer ++
				}
			}
			
			block.block_name = name
			block.block_description = obj.record.block_description
			block.form_name = obj.record.form_name
			block.form_name_display = obj.record.form_name_display	
			
			// remove related block records
			if (flagRefresh) {
				web_block_type_to_block_action_client.deleteAllRecords()
				web_block_type_to_block_action_web.deleteAllRecords()
				web_block_type_to_block_configure.deleteAllRecords()
//				web_block_type_to_block_display.deleteAllRecords()
				web_block_type_to_block_input.deleteAllRecords()
				web_block_type_to_block_response.deleteAllRecords()
			}
			
			// create object of existing displays so know what to do
			var displayCurrent = new Object()
			var displayDelete = new Array()
			
			for (var i = 1; i <= block.web_block_type_to_block_display.getSize(); i++) {
				var displayRec = block.web_block_type_to_block_display.getRecord(i)
				
				// needs to work with view and controller
				if (displayRec.method_name.substr(0,4) == 'VIEW') {
					displayCurrent[displayRec.method_name.substr(5,100)] = displayRec
				}
				else if (displayRec.method_name.substr(0,10) == 'CONTROLLER') {
					displayCurrent[displayRec.method_name.substr(11,100)] = displayRec
				}
				
				displayDelete.push(displayRec)
			}
			
			// block displays
			for (var i in obj.views) {
				//this display already exists, continue
				if (displayCurrent[i]) {
					//remove from delete array
					displayDelete.splice(displayDelete.indexOf(displayCurrent[i]),1)
					continue
				}
				
				//display doesn't exist
				var view = block.web_block_type_to_block_display.getRecord(block.web_block_type_to_block_display.newRecord())
				var name = i.split("_")
				for (var j = 0; j < name.length; j++) {
					if ( j == 0 ) {
						view.display_name = utils.stringInitCap(name[j])
					}
					else {
						view.display_name += " " + utils.stringInitCap(name[j])
					}	
				}
				view.method_name = obj.views[i]
				//flag default method as default
				view.flag_default = ( obj.views[i] == "VIEW_default" || obj.views[i] == "CONTROLLER_default") ? 1 : null
			}
			
			//if anything left in delete array, whack it 
			for (var i = 0; i < displayDelete.length; i++) {
				displayDelete[i].foundset.deleteRecord(displayDelete[i])
			}
			
			// block client actions - "Block"
			for (var i in obj.clientActionsBlock) {
				var actions = block.web_block_type_to_block_action_client.getRecord(block.web_block_type_to_block_action_client.newRecord())
				actions.action_type = "Block"
				var name = i.split("_")
				for (var j = 0; j < name.length; j++) {
					if ( j == 0 ) {
						actions.input_name = utils.stringInitCap(name[j])
					}
					else {
						actions.input_name += " " + utils.stringInitCap(name[j])
					}
				}
				actions.method_name = obj.clientActionsBlock[i]
			}
			
			// block client actions - "Page"
			for (var i in obj.clientActionsPage) {
				var actions = block.web_block_type_to_block_action_client.getRecord(block.web_block_type_to_block_action_client.newRecord())
				actions.action_type = "Page"
				var name = i.split("_")
				for (var j = 0; j < name.length; j++) {
					if ( j == 0 ) {
						actions.input_name = utils.stringInitCap(name[j])
					}
					else {
						actions.input_name += " " + utils.stringInitCap(name[j])
					}
				}
				actions.method_name = obj.clientActionsPage[i]
			}
			
			// block web actions
			for (var i in obj.webActions) {
				var actions = block.web_block_type_to_block_action_web.getRecord(block.web_block_type_to_block_action_web.newRecord())
				var name = i.split("_")
				for (var j = 0; j < name.length; j++) {
					if ( j == 0 ) {
						actions.display_name = utils.stringInitCap(name[j])
					}
					else {
						actions.display_name += " " + utils.stringInitCap(name[j])
					}
				}
				actions.method_name = obj.webActions[i]
			}
			
			// block data
			for (var i in obj.data) {
				var data = block.web_block_type_to_block_input.getRecord(block.web_block_type_to_block_input.newRecord())
				data.column_name = i
				data.column_type = obj.data[i]
			}
			
			// block configuration
			for (var i in obj.blockConfigure) {
				var configure = block.web_block_type_to_block_configure.getRecord(block.web_block_type_to_block_configure.newRecord())
				configure.column_name = i
				configure.column_type = obj.blockConfigure[i]
			}
			
			// block response
			for (var i in obj.blockResponse) {
				var response = block.web_block_type_to_block_response.getRecord(block.web_block_type_to_block_response.newRecord())
				response.column_name = i
				response.column_type = obj.blockConfigure[i]
			}
			
			databaseManager.saveData()
			
			if (flagRefresh) {
				plugins.dialogs.showInfoDialog(
							'Done',
							'Block successfully refreshed'
					)
				
				var changedData = false
					
				//check through input, config, response for new columns
				for (var i = 1; i <= block.web_block_type_to_block_input.getSize() && !changedData; i++) {
					var record = block.web_block_type_to_block_input.getRecord(i)
					if (oldBlockInput.indexOf(record.column_name) == -1) {
						changedData = true
					}
				}
				
				for (var i = 1; i <= web_block_type_to_block_configure.getSize() && !changedData; i++) {
					var record = web_block_type_to_block_configure.getRecord(i)
					if (oldBlockConfig.indexOf(record.column_name) == -1) {
						changedData = true
					}
				}
				
				for (var i = 1; i <= web_block_type_to_block_response.getSize() && !changedData; i++) {
					var record = web_block_type_to_block_response.getRecord(i)
					if (oldBlockResponse.indexOf(record.column_name) == -1) {
						changedData = true
					}
				}
				
				//alert that meta data has been modified
				if (changedData) {
					plugins.dialogs.showInfoDialog(
								'Done',
								'Block data changed. Currently used blocks on pages haven\'t been updated.\nYou will need to do this manually on each page.'
						)
				}
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
 * @properties={typeid:24,uuid:"8313F67E-2C06-4A31-B5AA-65ECB86C5801"}
 */
function FIND_forms() {
	var formNames = forms.allnames
	var blockNames = new Array()
	var blockInfo = new Array()
	
	//find all forms with INIT_block method
	for (var i = 0; i < formNames.length; i++) {
		var formName = formNames[i]
		
		if (!solutionModel.getForm(formName).getFormMethod('INIT_block') || formName == 'WEB_0F___starter_block') {
			formNames.splice(i,1)
			i--
		}
	}
	
	formNames = formNames.sort()
	
	//remove forms that exist as blocks already
	var fsBlockType = databaseManager.getFoundSet('sutra_cms','web_block_type')
	fsBlockType.find()
	fsBlockType.id_site = forms.WEB_0F_site.id_site
	var count = fsBlockType.search()
	
	if (count) {
		//grab array of form names
		var blockForms = databaseManager.getFoundSetDataProviderAsArray(fsBlockType,'form_name')
		
		//remove from options to add if already exists for this site
		for (var i = 0; i < blockForms.length; i++) {
			var posn = formNames.indexOf(blockForms[i],0)
			
			if (posn > -1) {
				formNames.splice(posn,1)
			}
		}
	}
	
	//we've got stuff, run init_block method to get form name
	if (formNames.length) {
		for (var i = 0; i < formNames.length; i++) {
			var block = forms[formNames[i]].INIT_block()
			
			//save down position as property along with full block info
			blockInfo[block.record.form_name] = blockInfo.length
			blockInfo.push(block.record)
			
			//save down block name for this form
			blockNames.push(block.record.block_name)
			
			//when running in data sutra, tack on module name prefix to each block name
			if (application.__parent__.solutionPrefs) {
				//look up this form based on it's datasource
				var dataSource = solutionModel.getForm(formNames[i]).dataSource
				
				if (dataSource) {
					var serverName = databaseManager.getDataSourceServerName(dataSource)
					var tableName = databaseManager.getDataSourceTableName(dataSource)
					var moduleName = solutionPrefs.repository.allFormsByTable[serverName][tableName][formNames[i]] ? solutionPrefs.repository.allFormsByTable[serverName][tableName][formNames[i]].moduleName : ''
				}
				else {
					var moduleName = solutionPrefs.repository.allFormsByTable["No datasource"][formNames[i]] ? solutionPrefs.repository.allFormsByTable["No datasource"][formNames[i]].moduleName : ''
				}
				
				//grab out unique identifier from module name
				var moduleNameParts = moduleName.split('_')
				for (var j = 0; j < moduleNameParts.length; j++) {
					//first letter is capitalized, this is the identifier
					if (moduleNameParts[j] && moduleNameParts[j].charAt(1) == moduleNameParts[j].toUpperCase().charAt(1)) {
						var moduleID = moduleNameParts[j]
						break
					}
				}
				
				//don't show 'WEB' prefix for 'Default' blocks or blocks added in since smart client opened (when in developer)
				if (moduleID == 'WEB' || moduleID == null) {
					continue
				}
				
				blockNames[blockNames.length - 1] = moduleID + ': ' + blockNames[blockNames.length - 1]
			}
		}
		
		//at this point we have formname and blockname arrays sorted by formname
	}
	
	//set valuelist
	application.setValueListItems('WEB_block_names', blockNames, formNames)	
	
	//save down info about valid blocks
	forms.WEB_P__block_type__new._validBlocks = blockInfo
	
	return blockNames
}

/**
 *
 * @properties={typeid:24,uuid:"10050C5D-2C00-4EEC-B0EE-189FBCA3CAFB"}
 */
function REC_delete() {
	var delRec = plugins.dialogs.showWarningDialog(
				'Delete record',
				'Do you really want to delete this record?',
				'Yes',
				'No'
			)

	if (delRec == 'Yes') {
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
 * @properties={typeid:24,uuid:"7BD4A6A0-6B1F-44A7-B568-6DE0DE6B06E2"}
 */
function TAB_key_change(event) {
	globals.TAB_change_grid(null,null,'tab_key','tab_k','btn_key_add','btn_key_actions','btn_key_help')
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"BB3E7EFA-EE07-453A-8B1C-E4DEF897D44D"}
 */
function TAB_key_add(event) {
	globals.TAB_btn_rec_new(null,'tab_key')
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4FE94177-EF8D-49B1-855F-D9F35D57EB6E"}
 */
function REC_on_select(event) {
	var fsPages = forms.WEB_0F_block_type_1L_page.foundset
	
	//there is something to do on this page
	if (utils.hasRecords(foundset)) {
		globals.CODE_cursor_busy(true)
		
		var query = 
"SELECT DISTINCT c.id_page FROM web_platform a, web_version b, web_page c WHERE  \
b.id_version IN ( \
SELECT DISTINCT c.id_version from web_block a, web_scope b, web_area c WHERE  \
c.id_area = b.id_area AND \
b.id_block = a.id_block AND \
a.id_block_type = ? \
) AND \
a.id_platform = b.id_platform AND \
a.id_page = c.id_page"
		
		var dataset = databaseManager.getDataSetByQuery(
					'sutra_cms', 
					query, 
					[id_block_type.toString()], 
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

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"0102A5D3-E8AA-4536-B8D8-89C1CDA3C67A"}
 */
function FLD_data_change__form_name(oldValue, newValue, event) {
	//get methods for current form
	var formMethods = (form_name && forms[form_name]) ? forms[form_name].allmethods : new Array()
	
	application.setValueListItems('WEB_block_type_method', formMethods)
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1B080D9F-62BC-4987-B9AA-F6B22B1E65E2"}
 */
function FORM_on_show(firstShow, event) {
	//only do this when not running in data sutra
	if (!application.__parent__.solutionPrefs) {
		FILTER_records(event)
	}
	
	if (!utils.hasRecords(foundset)) {
		globals.WEB_lock_workflow(true)
	}
	
	//restore last selected toolbar
	if (application.__parent__.solutionPrefs && !solutionPrefs.config.lockStatus && forms.WEB_0F_page._lastToolbar) {
		//make sure on whatever last toolbar was
		globals.TRIGGER_toolbar_set(forms.WEB_0F_page._lastToolbar)
		
		forms.WEB_0F_page._lastToolbar = null
	}
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"F43028E6-9A22-4FBB-980A-B415493E4E9E"}
 */
function FORM_on_hide(event) {
	if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow) {
		globals.WEB_lock_workflow(false)
	}
	
	return true
}

/**
 * @properties={typeid:24,uuid:"A7D084E6-19CD-4BC6-93F5-6BC9930B518B"}
 */
function REC_refresh() {
	// call with refresh flag
	REC_new(true)
}
