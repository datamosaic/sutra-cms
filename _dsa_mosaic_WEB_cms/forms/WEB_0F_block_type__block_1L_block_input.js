/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f24"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"DCD54C23-2835-40BC-9354-CEEEBCFD83AD"}
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
 *
 * @properties={typeid:24,uuid:"B4F57706-28E9-452B-AC38-E364B22EA870"}
 */
function REC_new() {
	controller.newRecord(false)
	databaseManager.saveData()
}

/**
 * Perform the element double-click action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2763EEA9-AEC6-460F-B0A6-8200C40FE9F8"}
 */
function TOGGLE_builder_object(event) {
	if (elements.lbl_heading.text == 'Description') {
		
		
		solutionModel.getForm(controller.getName()).getPart(JSPart.FOOTER).height = solutionModel.getForm(controller.getName()).getPart(JSPart.FOOTER).height + 100
		controller.recreateUI()
		
		elements.fld_description.visible = false
		elements.lbl_heading.text = 'Block builder config'
	}
	else {
		elements.fld_description.visible = true
		
		solutionModel.getForm(controller.getName()).getPart(JSPart.FOOTER).height = solutionModel.getForm(controller.getName()).getPart(JSPart.FOOTER).height - 100
		controller.recreateUI()
			
		//wiggle screen to make description show up
		var mainWindow = application.getWindow()
		mainWindow.setSize(mainWindow.getWidth(), mainWindow.getHeight() - 1)
		mainWindow.setSize(mainWindow.getWidth(), mainWindow.getHeight() + 1)
	}
	
	//reload foundset
	foundset.loadAllRecords()
}
