/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"8D5C8FCA-9D3D-46EA-A42F-AD49AEB2D65E"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4581AF20-5EEC-4B8D-9F54-56EB4AE0D46C"}
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
 *
 * @properties={typeid:24,uuid:"4BC73EC6-1B92-4A66-92D8-8CB57957F0D4"}
 */
function BATCH_create(fs) {
	REC_new(null,'WEB_0F__content',fs)
	REC_new(null,'WEB_0F__image',fs)
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
function REC_new(flagRefresh,formName,fs) {
	//specific foundset not passed in, use current one
	if (!fs) {
		fs = foundset
		var nonBatch = true
	}
	
	if (utils.hasRecords(forms.WEB_0F_site.foundset)) {
		//no records created yet and interface locked
		if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow) {
			globals.WEB_lock_workflow(false)
		}
		
		//form not specified, prompt to add new block or refresh current
		if (!formName) {
			if (!flagRefresh) {
				//get current list of forms that are valid
				var validForms = FIND_forms()
				
				if (validForms && validForms.length) {
	//				var formName = globals.DIALOGS.showSelectDialog(
	//							'New block',
	//							'Choose the form that describes the block you want to create',
	//							validForms
	//					)
					
					// 1) choose form to register as a block
					globals.CODE_form_in_dialog(
										forms.WEB_P__block_type__new,
										-1,-1,-1,-1,
										' ',
										true,
										false,
										'cmsBlockTypeNew'
									)	
					
					//this should be forms.WEB_P__block_type__new._formName...some scoping issue (fid cancel hack...)
					if ( forms.WEB_0F_block_type__block._formName == undefined ) {
						return "Action cancelled"
					}	
					
					var formName = forms.WEB_0F_block_type__block._formName
					var blockName = forms.WEB_0F_block_type__block._blockName
					var blockDescription = forms.WEB_0F_block_type__block._blockDescription
					
					//now delete _formName (.../fid cancel hack)
					delete forms.WEB_0F_block_type__block._formName
					delete forms.WEB_0F_block_type__block._blockName
					delete forms.WEB_0F_block_type__block._blockDescription
				}
				else {
					globals.DIALOGS.showErrorDialog(
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
				var oldBlockResponse = new Array()
			
				for (var i = 1; i <= web_block_type_to_block_input.getSize(); i++) {
					var record = web_block_type_to_block_input.getRecord(i)
					oldBlockInput.push(record.column_name)
				}
				
				for (var i = 1; i <= web_block_type_to_block_configure.getSize(); i++) {
					var record = web_block_type_to_block_configure.getRecord(i)
					oldBlockConfig.push(record.column_name)
				}
				
				for (var i = 1; i <= web_block_type_to_block_response.getSize(); i++) {
					var record = web_block_type_to_block_response.getRecord(i)
					oldBlockResponse.push(record.column_name)
				}
			}
		}
		
		//a form picked and it exists in the solution
		if (formName && forms[formName]) {
			
			function uniqueNameCheck(name) {  // returns true if duplicate name detected
				var nameArray = []
				var result = false
				for (var i = 0; i < fs.getSize(); i++) {
					nameArray.push(fs.getRecord(i + 1).block_name)
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
					var objBlock = forms[formName].INIT_block()
				}
				else {
					globals.DIALOGS.showErrorDialog( "Error", "Selected block does not have an INIT_block method")
					return
				}
			}
			
			//set flag for type
			if (objBlock.record.form_name == 'WEB_0F__block_builder') {
				var blockType = 1
			}
			
			//turn on notification when called directly from block type workflow form
			if (nonBatch) {
				globals.WEBc_sutra_trigger('TRIGGER_progressbar_start',[null,(flagRefresh ? 'Refreshing' : 'Registering') + ' block: ' + objBlock.record.block_name + '.  Please wait...'])
			}
			
			// 3) create block and related data from data object
			var block = (!flagRefresh) ? fs.getRecord(fs.newRecord()) : fs.getSelectedRecord()
			block.id_site = forms.WEB_0F_site.id_site
			var nameBase = blockName || objBlock.record.block_name
			var name = blockName || objBlock.record.block_name
			
			// ensure block name is unique
			if (!flagRefresh) {
				var incrementer = 1
				while ( uniqueNameCheck(name) ) {
					// increment name by 1 until unique name is found
					name = nameBase + " " + incrementer
					incrementer ++
				}
			}
			
			block.block_name = name
			block.block_description = blockDescription || objBlock.record.block_description
			block.form_name = objBlock.record.form_name
			block.form_name_display = objBlock.record.form_name_display	
			
			//dealing with a builder...bob, perhaps?
			if (blockType) {
				//set flag that this is a block builder form
				block.block_type = blockType
				
				//mark as inactive until published
				block.flag_unavailable = 1
			}
			
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
			for (var i in objBlock.views) {
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
				view.method_name = objBlock.views[i]
				//flag default method as default
				view.flag_default = ( objBlock.views[i] == "VIEW_default" || objBlock.views[i] == "CONTROLLER_default") ? 1 : null
			}
			
			//if anything left in delete array, whack it 
			for (var i = 0; i < displayDelete.length; i++) {
				displayDelete[i].fs.deleteRecord(displayDelete[i])
			}
			
			// block client actions - "Block"
			for (var i in objBlock.clientActionsBlock) {
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
				actions.method_name = objBlock.clientActionsBlock[i]
			}
			
			// block client actions - "Page"
			for (var i in objBlock.clientActionsPage) {
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
				actions.method_name = objBlock.clientActionsPage[i]
			}
			
			// block web actions
			for (var i in objBlock.webActions) {
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
				actions.method_name = objBlock.webActions[i]
			}
			
			// block data
			for (var i in objBlock.data) {
				var data = block.web_block_type_to_block_input.getRecord(block.web_block_type_to_block_input.newRecord())
				data.column_name = i
				data.column_type = objBlock.data[i]
			}
			
			// block configuration
			for (var i in objBlock.blockConfigure) {
				var configure = block.web_block_type_to_block_configure.getRecord(block.web_block_type_to_block_configure.newRecord())
				configure.column_name = i
				configure.column_type = objBlock.blockConfigure[i]
			}
			
			// block response
			for (var i in objBlock.blockResponse) {
				var response = block.web_block_type_to_block_response.getRecord(block.web_block_type_to_block_response.newRecord())
				response.column_name = i
				response.column_type = objBlock.blockConfigure[i]
			}
			
			databaseManager.saveData()
			
			if (flagRefresh) {
				globals.DIALOGS.showInfoDialog(
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
					globals.DIALOGS.showInfoDialog(
								'Done',
								'Block data changed. Currently used blocks on pages haven\'t been updated.\nYou will need to do this manually on each page.'
						)
				}
			}
			
			if (nonBatch) {
				//turn off notification when called directly from block type workflow form
				globals.WEBc_sutra_trigger('TRIGGER_progressbar_stop')
				
				//update button status
				REC_on_select()
				
				//go to configure tab for either of the builders
				if (blockType) {
					//go to correct tab
					TAB_change(null,blockType + 1)
				}
			}
		}
	}
	else {
		globals.DIALOGS.showErrorDialog(
						'Error',
						'You must add a site record first'
				)
	}
}

/**
 * @properties={typeid:24,uuid:"8313F67E-2C06-4A31-B5AA-65ECB86C5801"}
 * @AllowToRunInFind
 */
function FIND_forms() {
	var formNames = forms.allnames
	var blockNames = new Array()
	var blockInfo = new Array()
	
	//find all forms with INIT_block method
	for (var i = 0; i < formNames.length; i++) {
		var formName = formNames[i]
		
		if (!solutionModel.getForm(formName).getFormMethod('INIT_block') || formName == 'WEB_0F___boiler_plate' || formName == 'WEB_0F__block_builder') {
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
	
	//add on block builder as first option (always available)
	var blockBuilder = forms.WEB_0F__block_builder.INIT_block().record
	blockInfo[blockBuilder.form_name] = blockInfo.length
	blockInfo.push(blockBuilder)
	
	if (formNames.length) {
		blockNames.unshift(blockBuilder.block_name,'-')
		formNames.unshift(blockBuilder.form_name,'null')
	}
	else {
		blockNames.push(blockBuilder.block_name)
		formNames.push(blockBuilder.form_name)
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
			
	var delRec = globals.DIALOGS.showWarningDialog(
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
	
	if (!utils.hasRecords(foundset) && !solutionPrefs.config.prefs.formPreloading) {
		//make sure that doesn't lock us out of left-side lists
		if (solutionPrefs.config.activeSpace == 'workflow') {
			solutionPrefs.config.activeSpace = 'standard'
		}
		
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
 * @properties={typeid:24,uuid:"F43028E6-9A22-4FBB-980A-B415493E4E9E"}
 */
function FORM_on_hide(event) {
	if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow && !solutionPrefs.config.prefs.formPreloading) {
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

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4A701DEE-F683-45CC-B1FC-72DEDEE5B73B"}
 */
function TAB_change(event,tabNumber) {
	if (!tabNumber && event) {
		tabNumber = utils.stringToNumber(event.getElementName().split('_')[1])
	}
	
	//1st tab ok for all types, other ones not so much
	if (block_type == tabNumber - 1 || tabNumber == 1) {
		globals.TAB_change_inline(controller.getName(),'tab_d' + tabNumber)
		
		client_tab_selected = tabNumber
	}
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"38B83400-18B2-404D-B6F7-0C7D6AF7C837"}
 */
function REC_on_select(event) {
	//set enablement of tabs
	elements.tab_d2.enabled = false
//	elements.tab_d3.enabled = false
	
	if (block_type == 1) {
		elements.tab_d2.enabled = true
	}
//	else if (block_type == 2) {
//		elements.tab_d3.enabled = true
//	}
	
	//return to last used tab on this record
	if (client_tab_selected && client_tab_selected != elements.tab_detail.tabIndex) {
		TAB_change(null,client_tab_selected)
	}
}
