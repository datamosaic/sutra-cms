/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f68"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"3CF34834-3DD2-4A79-A731-3642C26847D7"}
 */
function REC_delete()
{

/*
 *	TITLE    :	REC_delete
 *			  	
 *	MODULE   :	start_CRM_mosaic
 *			  	
 *	ABOUT    :	prompts to delete the currently selected record
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	REC_delete()
 *			  	
 *	MODIFIED :	July 31, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

var delRec = plugins.dialogs.showWarningDialog(
'Delete record',
'Do you really want to delete this record?',
'Yes',
'No')

if (delRec == 'Yes') {

controller.deleteRecord()


}

}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"6F0AA1A4-48AE-4305-AFC1-CA4F8B4BDE1A"}
 */
function REC_new(event) {
	forms.WEB_0F_theme.ACTION_new_editable()
}

/**
 *
 * @properties={typeid:24,uuid:"414400F7-ED90-49B2-9616-BAD31B41EFEC"}
 */
function DIR_down()
{
	/*
	 *	TITLE:		DIR_down
	 *
	 *	MODULE:		fw_NAV_navigation_standard
	 *
	 *	ABOUT:		Move navigation_item down in list
	 *
	 *	MODIFIED:	Aug 27, 2007 - Troy Elliott, Data Mosaic
	 *
	 */

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
 * @properties={typeid:24,uuid:"62AC953B-1A76-4958-BB92-4DE470F621F4"}
 */
function DIR_up()
{
	/*
	 *	TITLE:		DIR_up
	 *
	 *	MODULE:		fw_NAV_navigation_standard
	 *
	 *	ABOUT:		Move navigation_item up in list
	 *
	 *	MODIFIED:	Aug 27, 2007 - Troy Elliott, Data Mosaic
	 *
	 */

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