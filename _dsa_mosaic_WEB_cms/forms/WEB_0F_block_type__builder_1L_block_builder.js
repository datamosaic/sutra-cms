/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"16944177-BBF9-4B13-A9C1-A09258BF70F6",variableType:12}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"8326A6DF-53B7-4F23-A84A-254F83AA139B",variableType:-4}
 */
var _skipSelect = false;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"191DDA92-D9C7-4A2A-AE0A-B44A6FA82F97",variableType:12}
 */
var _fieldType = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1E6D17A0-F533-4C69-8954-D2A83A92F4F8",variableType:12}
 */
var _fieldDescription = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"178F5EDE-E6E5-47EF-ADBA-B96AEB555BE2",variableType:12}
 */
var _fieldName = null;

/**
 * @properties={typeid:24,uuid:"6079E0FF-F11C-48C7-B7B4-F75C3DD88F86"}
 */
function REC_new() {
	//show FiD
	application.showFormInDialog(
			forms.WEB_P__block_builder__new,
			-1,-1,-1,-1,
			' ',
			true,
			false,
			'cmsBlockBuilderNew'
		)	
	
	//something chosen
	if (_fieldType) {
		//turn off record selection
		_skipSelect = true
		
		var record = foundset.getRecord(foundset.newRecord(false,true))
		var template = globals.CODE_copy_object(forms.WEB_0F__block_builder.BUILDER[_fieldType])
		
		record.row_order = foundset.getSize()
		template.order = record.row_order
		record.column_type = _fieldType
		record.column_name = _fieldName
		record.description = _fieldDescription
		record.column_value = plugins.serialize.toJSON(template)
		                                                          
		databaseManager.saveData(record)
		
		//enable record selection again
		_skipSelect = false
		REC_on_select()
	}
}

/**
 * @properties={typeid:24,uuid:"AD276C21-6A83-49FC-9F30-898970DB7ECA"}
 */
function REC_delete() {
	var delRec = plugins.dialogs.showWarningDialog(
						'Delete record',
						'Do you really want to delete this record?',
						'Yes',
						'No'
					)
	
	if (delRec == 'Yes') {
		//get record to delete
		var recDelete = foundset.getSelectedRecord()
		
		for (var i = 1; i <= foundset.getSize(); i++) {
			var record = foundset.getRecord(i)
			
			if (record.row_order > recDelete.row_order) {
				record.row_order--
			}
		}
		
		foundset.deleteRecord(recDelete)
		
		//last field removed, don't show any configuration options
		if (!utils.hasRecords(foundset)) {
			forms.WEB_0F_block_type__builder.ACTION_manage_view()
		}
	}
}

/**
 * Perform the element double-click action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2763EBA9-AEC6-460F-B0A6-8200C40FE9F8"}
 */
function TOGGLE_builder_object(event) {
	if (elements.lbl_heading.text == 'Description') {
		solutionModel.getForm(controller.getName()).getPart(JSPart.FOOTER).height = solutionModel.getForm(controller.getName()).getPart(JSPart.FOOTER).height + 100
		controller.recreateUI()
		
		elements.fld_description.visible = false
		elements.lbl_heading.text = 'Field config'
		elements.btn_down.setLocation(elements.btn_down.getLocationX(),elements.btn_down.getLocationY() + 100)
		elements.btn_up.setLocation(elements.btn_up.getLocationX(),elements.btn_up.getLocationY() + 100)
	}
	else {
		solutionModel.getForm(controller.getName()).getPart(JSPart.FOOTER).height = solutionModel.getForm(controller.getName()).getPart(JSPart.FOOTER).height - 100
		controller.recreateUI()
		
		elements.fld_column_value.visible = false
		
		//wiggle screen to make description show up
		application.setWindowSize(application.getWindowWidth(),application.getWindowHeight() - 1)
		application.setWindowSize(application.getWindowWidth(),application.getWindowHeight() + 1)
	}
	
	//reload foundset
	foundset.loadAllRecords()
}

/**
 *
 * @properties={typeid:24,uuid:"414400F7-ED90-49B2-A616-BAD31B41EFEC"}
 */
function DIR_down() {
	//if max index, exit
	if (foundset.getSelectedIndex() == foundset.getSize()) {
		return
	}
	
	foundset.sort('row_order asc')

	//if index = 1, set flag to avoid glitch recSelected
	//TODO: find issue
	if (foundset.getSelectedIndex() == 1) {
		var recOne = true
	}
	else {
		var recOne = false
	}

	//get current record
	var recordCurr = foundset.getRecord(foundset.getSelectedIndex())

	//get next record
	var recordNext = foundset.getRecord(foundset.getSelectedIndex() + 1)

	//swap with next record
	recordCurr.row_order = recordNext.row_order
	recordNext.row_order --
	
	var valueOne = plugins.serialize.fromJSON(recordCurr.column_value)
	valueOne.order = recordCurr.row_order
	recordCurr.column_value = plugins.serialize.toJSON(valueOne)
	var valueTwo = plugins.serialize.fromJSON(recordNext.column_value)
	valueTwo.order = recordNext.row_order
	recordNext.column_value = plugins.serialize.toJSON(valueTwo)

	foundset.sort('row_order asc')

	//TODO: find issue
	if (recOne) {
		controller.setSelectedIndex(2)
	}
}

/**
 *
 * @properties={typeid:24,uuid:"62AC953B-1A76-A958-BB92-4DE470F621F4"}
 */
function DIR_up() {
	//if index = 1, exit
	if (foundset.getSelectedIndex() == 1) {
		return
	}

	foundset.sort('row_order asc')
	
	//get current record
	var recordCurr = foundset.getRecord(foundset.getSelectedIndex())

	//get previous record
	var recordPrev = foundset.getRecord(foundset.getSelectedIndex() - 1)

	//swap with previous record
	recordCurr.row_order = recordPrev.row_order
	recordPrev.row_order ++
	
	var valueOne = plugins.serialize.fromJSON(recordCurr.column_value)
	valueOne.order = recordCurr.row_order
	recordCurr.column_value = plugins.serialize.toJSON(valueOne)
	var valueTwo = plugins.serialize.fromJSON(recordPrev.column_value)
	valueTwo.order = recordPrev.row_order
	recordPrev.column_value = plugins.serialize.toJSON(valueTwo)

	foundset.sort('row_order asc')
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"429FA00D-1A06-4164-93C3-2E5FB0C50C5F"}
 */
function REC_on_select(event) {
	if (!_skipSelect) {
		// load correct form up 
		var tabForm = 'WEB_0F_block_type__builder'
		
		//this is a block builder and we have data
		if (utils.hasRecords(foundset) && column_value) {
			//grab data for selected record
			var fieldData = plugins.serialize.fromJSON(column_value)
			
			var formName = tabForm + '_1F_block_builder__' + fieldData.type
			
			//load selected block type
			forms.WEB_0F_block_type__builder.ACTION_manage_view(formName,column_name,application.getValueListDisplayValue('WEB_block_builder_field_type',column_type))
			
			//punch data in
			forms[formName].INIT_data(fieldData)
		}
		//no data here
		else {
			forms[tabForm].elements.tab_detail.removeAllTabs()
		}
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8ADA43DC-2B16-475D-8650-10C46D93AA7C"}
 */
function FORM_on_show(firstShow, event) {
	elements.fld_column_value.visible = false
}
