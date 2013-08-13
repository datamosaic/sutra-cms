/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B6CBB451-8EB3-4AFE-A3CA-BB7ACA55A56A"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
*
* @properties={typeid:24,uuid:"C729EF63-F185-4CF0-AF80-10241A2DB90F"}
*/
function TOGGLE_elements(editAllow) {
	var status = globals.WEBc_block_getEdit() && editAllow
	
//	elements.btn_actions.enabled = status
	elements.btn_add.enabled = status
	elements.btn_delete.visible = status
	elements.fld_row_name.editable = status
}

/**
*
* @properties={typeid:24,uuid:"15AF973A-AAB9-4F3A-8E39-52F50FB3338F"}
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

	 foundset.sort('row_order asc')

	 //TODO: find issue
	 if (recOne) {
		 controller.setSelectedIndex(2)
	 }
}

/**
*
* @properties={typeid:24,uuid:"44CB3B92-DD1C-41E9-85EE-2B96D89B8CB2"}
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

	 foundset.sort('row_order asc')
}

/**
*
* @properties={typeid:24,uuid:"F8C46552-99FC-4993-90B2-D77C1F2B2C84"}
*/
function FORM_on_load() {
	elements.btn_up.enabled = false
	elements.btn_down.enabled = false
}

/**
*
* @properties={typeid:24,uuid:"E5E65F8B-027B-420B-8DBE-D67866216CD0"}
*/
function REC_delete() {
	
	var delRec = globals.DIALOGS.showWarningDialog(
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
		
		//TODO: disable/enable rec on select on the block type forms when deleting?
		foundset.deleteRecord(recDelete)
	}
}
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"6EBCEAD5-B798-4CB2-B8E1-8AFD0B046C4A"}
 */
function REC_new(event) {
	foundset.getRecord(foundset.newRecord(false,true)).row_order = foundset.getSize()
	elements.fld_row_name.requestFocus()
}
