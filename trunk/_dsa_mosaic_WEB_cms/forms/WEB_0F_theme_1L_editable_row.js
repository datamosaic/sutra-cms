/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"54E7E451-4CF1-4CDA-BA41-0EAA0BC2BB5B"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"E56850D1-4B04-4C4C-A2C9-27DA6630814A"}
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
		
		foundset.deleteRecord(recDelete)	
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D775DEAC-5795-4AE5-AE4B-0B0E43EBEB62"}
 */
function REC_new(event) {
	var newRecord = foundset.getRecord(foundset.newRecord(false,true))
	newRecord.row_order = foundset.getSize()
	elements.fld_row_name.requestFocus()
}

/**
 *
 * @properties={typeid:24,uuid:"7B5F8556-68C2-49C0-A00A-05B45E69EBE7"}
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

	 foundset.sort('row_order asc') //need to order by id_navigation_item and category first?

	 //TODO: find issue
	 if (recOne) {
		 controller.setSelectedIndex(2)
	 }
}

/**
 *
 * @properties={typeid:24,uuid:"F94D093B-29A1-434D-8578-09E5900C726E"}
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
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2BD7DCF2-FBC1-49F9-B124-862D42479917"}
 */
function REC_on_select(event) {
	//give the triple-level relation forms a little extra help
	if (utils.hasRecords(foundset)) {
//		forms.WEB_0F_theme_1L_editable_default.foundset.loadRecords(web_editable_to_editable_default)
	}
}
