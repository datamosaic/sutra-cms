/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"16944177-BBF9-4B13-A9B1-A09258BF70F6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean} valid value
 *
 * @properties={typeid:24,uuid:"D518D5BC-C7C5-4F36-AF63-863736B76CDE"}
 * @AllowToRunInFind
 */
function FLD_data_change__block_name(oldValue, newValue, event) {
	
	var fsBlockType = databaseManager.getFoundSet(controller.getServerName(),controller.getTableName())
	fsBlockType.find()
	fsBlockType.id_site = forms.WEB_0F_site.id_site
	fsBlockType.block_name = newValue
	var results = fsBlockType.search()
	
	if (results > 1) {
		globals.DIALOGS.showErrorDialog(
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
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"BB3E7EFA-EE07-453A-3B1C-E4DEF897D44D"}
 */
function TAB_list_add(event) {
	globals.TAB_btn_rec_new(null,'tab_list')
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4E77B51D-461D-4829-8F63-D866E4184E66"}
 */
function ACTION_publish(event) {
	if (utils.hasRecords(web_block_type_to_block_input)) {
		var input = globals.DIALOGS.showQuestionDialog(
				'Builder already published',
				'Re-publishing the builder will not update existing blocks.\nProceed?',
				'Yes',
				'No'
			)
		
		if (input == 'Yes') {
			web_block_type_to_block_input.deleteAllRecords()
		}
		else {
			return
		}
	}
	
	// create block inputs from block builder
	for (var i = 1; i <= web_block_type_to_block_builder.getSize(); i++) {
		var record = web_block_type_to_block_builder.getRecord(i)
		
		var data = web_block_type_to_block_input.getRecord(web_block_type_to_block_input.newRecord(false,true))
		data.id_block_builder = record.id_block_builder
		data.column_name = record.column_name
		data.column_type = record.column_type
		//TODO: process a bit (set up arrays for holding values)
//			//this is a repeatable field that hasn't been used before
//			if (!(fieldData instanceof Array) && fieldData.repeatable) {
//				blockList[order].data = new Array(fieldData)
//			}
//			//this isn't a repeatable field or it has already been array-ized
//			else {
//				blockList[order].data = fieldData
//			}
		data.column_value = record.column_value
	}
	
	//mark as published and switch to tab 1
	flag_unavailable = null
	forms.WEB_0F_block_type.TAB_change(null,1)
	
	databaseManager.saveData()
	
	web_block_type_to_block_input.setSelectedIndex(1)
	
	REC_on_select()
	
	globals.DIALOGS.showInfoDialog(
					'Done',
					'Block builder published'
			)
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"3A258EDC-F6F4-40A7-9FB0-B687FD712F7D"}
 */
function REC_on_select(event) {
	if (!utils.hasRecords(web_block_type_to_block_builder)) {
		forms.WEB_0F_block_type__builder.ACTION_manage_view()
	}
}

/**
 * @param {String}	formName
 * @param {String}	fieldName
 * @param {String}	fieldType
 * 
 * @properties={typeid:24,uuid:"1E324CC8-BAF2-44E1-8F15-6DFF84EA0CC6"}
 */
function ACTION_manage_view(formName,fieldName,fieldType) {
	var labelLeft = 'Setup'
	var labelRight = ''
		
	//set up tab panel
	if (elements.tab_detail.getTabFormNameAt(elements.tab_detail.tabIndex) != formName) {
		elements.tab_detail.removeAllTabs()
		
		if (formName) {
			elements.tab_detail.addTab(forms[formName],null,null,null,null,null,null,web_block_type_to_block_builder)
		}
	}
	
	//set up labels
	if (fieldName) {
		labelLeft += ': ' + fieldName
	}
	elements.lbl_field_name.text = labelLeft
	if (fieldType) {
		labelRight = fieldType
	}
	elements.lbl_field_type.text = labelRight
}
