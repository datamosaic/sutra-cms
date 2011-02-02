/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f67"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"EA28AB57-2A96-4E3A-A738-91F1E2A2B4E9"}
 */
function BLOCK_new() {
	// no editable area selected
	if (!utils.hasRecords(forms.WEB_0F_theme_1F_layout_2L_editable.foundset)) {
		return
	}
	
	// get blocks
	var dataset = databaseManager.getDataSetByQuery(
				controller.getServerName(),
				"SELECT id_block_type, block_name FROM web_block_type WHERE id_site = ?",
				[forms.WEB_0F_site.id_site], 
				-1
			)
	
	// ERROR CHECK: NO BLOCKS INSTALLED
	if ( !dataset ) {
		return
	}
	
	// setup associative array
	var IDs = dataset.getColumnAsArray(1)
	var values = dataset.getColumnAsArray(2)
	var valueListObj = {}
	for (var i = 0; i < IDs.length; i++) {
		valueListObj[values[i]] = IDs[i]
	}
	
	// add scrapbook option
	values.push("---", "Scrapbook connect...")
	
	// choose block type
	var selection = plugins.dialogs.showSelectDialog(
	"Select",
	"Choose block type", 
	values)
	
	// ERROR CHECK: NO SELECTED
	if ( !selection ) {
		return
	}
	
	if (! utils.stringPatternCount(selection,"Scrapbook")) {
	
		// get block data points
		var dataset = databaseManager.getDataSetByQuery(
		controller.getServerName(),
		"select display_name, method_name, " +
			"(select id_block_display from web_block_display where id_block_type = ? and flag_default = 1) as display " +
		"from web_block_display where id_block_type = ?",
//		"select column_name, column_type, " +
//			"(select id_block_display from web_block_display where id_block_type = ? and flag_default = 1) as display " +
//		"from web_block_meta where id_block_type = ?",
		new Array(valueListObj[selection],valueListObj[selection]), -1)
		
//		var dataNames = dataset.getColumnAsArray(1)
		var display = dataset.getValue(1,3)
		
		// create block record
		if (utils.hasRecords(forms.WEB_0F_theme_1F_layout_2L_editable.foundset)) {
			var count = foundset.getSize()
			var record = forms.WEB_0F_theme_1F_layout_2L_editable.web_editable_to_editable_default.getRecord(forms.WEB_0F_theme_1F_layout_2L_editable.web_editable_to_editable_default.newRecord(false, true))
			record.id_block_type = valueListObj[selection]
			record.id_block_display = ( display ) ? display : null
			record.row_order = count + 1
			databaseManager.saveData()
		}
		/*
		// create a block data record for each data point
		for (var i = 0; i < dataNames.length; i++) {
			var record = web_page_to_block_data_by_area_by_block.getRecord(web_page_to_block_data_by_area_by_block.newRecord(false, true))
			record.data_key = dataNames[i]
			databaseManager.saveData()
		}
		*/
		// finish up
//		web_page_to_block_data_by_area_by_block.setSelectedIndex(1)
		
	}
	else {
		forms.WEB_0F_scrapbook_1P__choose.f_source = "Theme"
		if (selection == "Scrapbook copy...") {
			forms.WEB_0F_scrapbook_1P__choose.f_type = 0
		}
		else if (selection == "Scrapbook connect...") {
			forms.WEB_0F_scrapbook_1P__choose.f_type = 1
		}
		
		application.showFormInDialog(forms.WEB_0F_scrapbook_1P__choose,-1,-1,-1,-1,"Scrapbook", false, false, "chooseScrapbook")

		
	}
}

/**
 *
 * @properties={typeid:24,uuid:"414400F7-ED90-49B2-9616-BAD31B41EFEB"}
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
 * @properties={typeid:24,uuid:"62AC953B-1A76-4958-BB92-4DE470F621F3"}
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

/**
 *
 * @properties={typeid:24,uuid:"D40F7369-AF4A-422B-8BEC-89702306EE63"}
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
					'No'
				)

if (delRec == 'Yes') {
	
	var recSelect = controller.getSelectedIndex()

	controller.deleteRecord()
		
	var loop = recSelect
	while (loop <= controller.getMaxRecordIndex()) {
		controller.setSelectedIndex(loop)
		row_order--
		loop++
	}	
	controller.sort('row_order asc')
	controller.setSelectedIndex(recSelect)
		
}


}
