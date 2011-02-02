/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f19"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"FCCF12F4-B862-4400-A801-4CB29CBBFD3F"}
 */
function DISPLAY_new_record()
{
	web_block_type_to_block_display.newRecord()
	databaseManager.saveData()
}

/**
 *
 * @properties={typeid:24,uuid:"49A1070B-839F-4794-BB2D-CF17E53C5C87"}
 */
function INPUT_new_record()
{
	web_block_type_to_block_input.newRecord()
	databaseManager.saveData()
}

/**
 *
 * @properties={typeid:24,uuid:"584F660B-4EC4-4F29-AFB2-2ACB0B23BE71"}
 */
function META_new_record()
{
	web_block_type_to_block_meta.newRecord()
	databaseManager.saveData()
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4581AF20-5EEC-4B8D-9F54-56EB4AE0D46C"}
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
	var mapping = new Array()
	
	var blockContent = {
				block_name	: 'Content',
				block_description	: 'Generic freeform content. HTML/CSS for structure and formatting.\n\nUses TinyMCE to edit content.',
				form_name	: 'WEB_0B_content',
				interaction	: '',
				web_block_type_to_block_display	: [
                               	   {
							description	: '',
							display_name	: 'Default',
							flag_default	: 1,
							method_name	: 'VIEW_default'
						}
						],
				
				web_block_type_to_block_meta	: [
                               	   {
							column_name	: 'Content',
							column_type	: 'Text',
							description	: ''
						}
						]
			}
	mapping.push(blockContent)
	
	
	var blockImage = {
				block_name	: 'Image',
				block_description	: '',
				form_name	: 'WEB_0B_image',
				interaction	: '',
				web_block_type_to_block_display	: [
                               	   {
							description	: '',
							display_name	: 'Default',
							flag_default	: 1,
							method_name	: 'VIEW_default'
						},
						      	   {
							description	: '',
							display_name	: 'FID',
							flag_default	: 0,
							method_name	: 'VIEW_fid'
						}
						],
				
				web_block_type_to_block_input	: [
                               	   {
							description	: '',
							input_name	: 'Image import...',
							method_name	: 'ACTION_import'
						},
						      	   {
							description	: '',
							input_name	: 'Scale image...',
							method_name	: 'ACTION_image_scale'
						},
						      	   {
							description	: '',
							input_name	: 'Choose image...',
							method_name	: 'ACTION_choose_image'
						}
						],	
				
				web_block_type_to_block_meta	: [
                               	   {
							column_name	: 'image_name',
							column_type	: 'text',
							description	: ''
						},
						      	   {
							column_name	: 'image_type',
							column_type	: 'text',
							description	: ''
						},
									{
							column_name	: 'image_extension',
							column_type	: 'text',
							description	: ''
						},
						      	   {
							column_name	: 'height',
							column_type	: 'integer',
							description	: ''
						},
									{
							column_name	: 'width',
							column_type	: 'integer',
							description	: ''
						},
						      	   {
							column_name	: 'rec_created',
							column_type	: 'datetime',
							description	: ''
						},
									{
							column_name	: 'directory',
							column_type	: 'text',
							description	: ''
						},
						      	   {
							column_name	: 'height_original',
							column_type	: 'integer',
							description	: ''
						},
									{
							column_name	: 'width_original',
							column_type	: 'integer',
							description	: ''
						}
						]
			}
	mapping.push(blockImage)	
	 
	var blockNavigation = {
				block_name	: 'Navigation',
				block_description	: 'Different navigation setups',
				form_name	: 'WEB_0B_page__navigation',
				interaction	: '',
				web_block_type_to_block_display	: [
                               	   {
							description	: 'Main navigation as a column list',
							display_name	: 'Default',
							flag_default	: 1,
							method_name	: 'VIEW_default'
						},
						      	   {
							description	: 'Navigation as a breadcrumb to current page',
							display_name	: 'Breadcrumb',
							flag_default	: 0,
							method_name	: 'VIEW_breadcrumb'
						}
						]
			}
	mapping.push(blockNavigation)	
	
	
	var blockPage = {
				block_name	: 'Page List',
				block_description	: 'Linked page list',
				form_name	: 'WEB_0B_page__page_list',
				interaction	: '',
				web_block_type_to_block_display	: [
                               	   {
							description	: '',
							display_name	: 'Default',
							flag_default	: 1,
							method_name	: 'VIEW_default'
						}
						]
			}
	mapping.push(blockPage)	
	
	//create blocks from mapping
	for (var i = 0; i < mapping.length; i++) {
		var thisItem = mapping[i]
		
		//create new block
		var recBlock = foundset.getRecord(foundset.newRecord(false,true))
		
		//tie to site
		recBlock.id_site = forms.WEB_0F_site.id_site
		
		//loop over all properties and create
		for (var j in thisItem) {
			//repeat
			if (thisItem[j] instanceof Array) {
				for (var k = 0; k < thisItem[j].length; k++) {
					var subItem = thisItem[j][k]
					
					//add a record
					var subRec = recBlock[j].getRecord(recBlock[j].newRecord(false,true))
					
					//fill values
					for (var l in subItem) {
						subRec[l] = subItem[l]
					}
				}
			}
			//fill value
			else {
				recBlock[j] = thisItem[j]
			}
		}
	}

}

/**
 * Create (register) a new block. Requires a block init method (INIT_block) on block form
 * that returns properly structured meta data
 * 
 * @requires INIT_block() method on selected block form
 * @author Data Mosaic (C)
 * 
 * @properties={typeid:24,uuid:"98C31479-A1EE-4A13-9F2F-0752680E3428"}
 */
function REC_new() {
	
	// OPT 1: create block record for data entry by hand
	if (globals.CODE_key_pressed('shift')) {
		
		controller.newRecord(true)
		id_site = forms.WEB_0F_site.id_site
		elements.fld_block_name.requestFocus(false)
		
	}
	// OPT 2: create block record with meta data automatically
	else {
		// 1) choose form to register as a block
		application.showFormInDialog(
							forms.WEB_P__block_new,
							-1,-1,-1,-1,
							' ',
							false,
							false,
							'cmsBlockNew'
						)
		
		//a form picked and it exists in the solution
		if (_formName && forms[_formName]) {
			
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
			if ( forms[_formName] ) {
				//form not loaded yet, get solution model to check for method existence
				if (forms[_formName] == '<Form ' + _formName + ' not loaded yet>' && solutionModel.getForm(_formName).getFormMethod('LOADER_init')) {
					var hasInit = true
				}
				//check for method existence on form
				else if (forms[_formName].LOADER_init) {
					var hasInit = true
				}
				if ( hasInit ) {
					var obj = forms[_formName].INIT_block()
				}
				else {
					plugins.dialogs.showErrorDialog( "Error", "Selected block does not have an INIT_block method")
					return
				}
			}
			
	
			// 3) create block and related data from data object
			var block = foundset.getRecord(foundset.newRecord())
			block.id_site = forms.WEB_0F_site.id_site
			// ensure block name is unique
			var name = obj.record.block_name
			var incrementer = 1
			while ( uniqueNameCheck(name) ) {
				// increment name by 1 until unique name is found
				name = obj.record.block_name + " " + incrementer
				incrementer += 1
			}
			block.block_name = name
			block.block_description = obj.record.block_description
			block.form_name = obj.record.form_name
			block.form_name_display = obj.record.form_name_display
			// block displays
			for (var i in obj.views) {
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
			}
			// block data
			for (var i in obj.data) {
				var data = block.web_block_type_to_block_meta.getRecord(block.web_block_type_to_block_meta.newRecord())
				data.column_name = i
				data.column_type = obj.data[i]
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
			// block configuration
			for (var i in obj.blockConfigure) {
				var configure = block.web_block_type_to_block_configure.getRecord(block.web_block_type_to_block_configure.newRecord())
				configure.data_key = i
				configure.data_value = obj.blockConfigure[i]
			}
			databaseManager.saveData()
		}
	}
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
	}
}
