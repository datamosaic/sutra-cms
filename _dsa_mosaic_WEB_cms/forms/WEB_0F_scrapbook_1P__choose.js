/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f49"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"D8C19E99-2B7C-4817-A164-F70B373AA629"}
 */
var f_source = null;

/**
 * @properties={typeid:35,uuid:"D7A14B12-10BF-4CD3-A787-1EFA743CC4B3",variableType:4}
 */
var f_type = null;

/**
 * @properties={typeid:35,uuid:"673A3550-672F-4BC6-8AC6-05651ECF2748",variableType:4}
 */
var _image_height;

/**
 * @properties={typeid:35,uuid:"36C6A5EF-CEA5-4BCA-ACB5-DA136CFC846B",variableType:4}
 */
var _image_height_original;

/**
 * @properties={typeid:35,uuid:"9F566459-641E-4480-A03F-D5F5C26729A8"}
 */
var _image_name = '';

/**
 * @properties={typeid:35,uuid:"FA6C4219-3296-4236-90E6-A8034B035448",variableType:4}
 */
var _image_width;

/**
 * @properties={typeid:35,uuid:"84469BA6-5E23-4859-926E-489A142290C6",variableType:4}
 */
var _image_width_original;

/**
 *
 * @properties={typeid:24,uuid:"5FE9F8AD-D8D0-49D8-950E-9210ED801F45"}
 */
function ACTION_cancel()
{

//not already ok to close, cancel
if (!globals.CODE_hide_form) {
	
	//enaable closing the form
	globals.CODE_hide_form = 1
	
	// clear form variables
	forms.WEB_0F_scrapbook_1P__choose.f_source = null
	
	application.closeFormDialog('chooseScrapbook')
}
}

/**
 *
 * @properties={typeid:24,uuid:"16FEA56C-FBFE-4640-B46C-B032CC439907"}
 */
function ACTION_ok()
{
	// called from page
	if ( f_source == "Page" ) {
		//this is a connection, set up link
		if (f_type) {
			// duplicate scrapbook to page>area>new block
			var source 		= forms.WEB_0F_scrapbook_1P__choose_2L.foundset.getRecord(forms.WEB_0F_scrapbook_1P__choose_2L.foundset.getSelectedIndex())
			var destination	= forms.WEB_0F_page__design.web_page_to_block_by_area.getRecord(forms.WEB_0F_page__design.web_page_to_block_by_area.newRecord(false, true))
			var success		= databaseManager.copyMatchingColumns(source, destination)
			destination.row_order = forms.WEB_0F_page__design.web_page_to_block_by_area.getSize()
			destination.id_scrapbook = source.id_scrapbook	
			databaseManager.saveData()
		
		}
		//copy stuff over directly
		else {
			// duplicate scrapbook to page>area>new block
			var source 		= forms.WEB_0F_scrapbook_1P__choose_2L.foundset.getRecord(forms.WEB_0F_scrapbook_1P__choose_2L.foundset.getSelectedIndex())
			var destination	= forms.WEB_0F_page__design.web_page_to_block_by_area.getRecord(forms.WEB_0F_page__design.web_page_to_block_by_area.newRecord(false, true))
			var success		= databaseManager.copyMatchingColumns(source, destination)
			destination.row_order = forms.WEB_0F_page__design.web_page_to_block_by_area.getSize()
			
			destination.id_scrapbook = null		
			databaseManager.saveData()
			
			// duplicate scrapbook_data to block_data
			var source		= forms.WEB_0F_scrapbook_1P__choose_2L.web_scrapbook_to_scrapbook_data
			
			for (var i = 0; i < source.getSize(); i++) {
				var record		= source.getRecord(i + 1)
				var destination	= forms.WEB_0F_page__design.web_page_to_block_data_by_area_by_block.getRecord(forms.WEB_0F_page__design.web_page_to_block_data_by_area_by_block.newRecord(false, true))
				var success		= databaseManager.copyMatchingColumns(record,destination)
				databaseManager.saveData()
			}
		}
	}
		// called from theme
	if ( f_source == "Theme" ) {
		//this is a connection, set up link
		if (f_type) {
			// duplicate scrapbook to theme>layout>editable>new editable_default
			var source 		= forms.WEB_0F_scrapbook_1P__choose_2L.foundset.getRecord(forms.WEB_0F_scrapbook_1P__choose_2L.foundset.getSelectedIndex())
			//var destination	= forms.WEB_0F_page__design.web_page_to_block_by_area.getRecord(forms.WEB_0F_page__design.web_page_to_block_by_area.newRecord(false, true))
			var destination	= forms.WEB_0F_theme_1L_layout.web_layout_to_editable__selected.web_editable_to_editable_default.getRecord(forms.WEB_0F_theme_1L_layout.web_layout_to_editable__selected.web_editable_to_editable_default.newRecord(false,true))
			var success		= databaseManager.copyMatchingColumns(source, destination)
			destination.id_scrapbook = source.id_scrapbook	
			destination.row_order = forms.WEB_0F_theme_1L_layout.web_layout_to_editable__selected.web_editable_to_editable_default.getSize()
			databaseManager.saveData()
		
		}
		/* (data_value not implemented with theme defaults yet)
		 //copy stuff over directly
		else {
			// duplicate scrapbook to page>area>new block
			var source 		= forms.WEB_0F_scrapbook_1P__choose_2L.foundset.getRecord(forms.WEB_0F_scrapbook_1P__choose_2L.foundset.getSelectedIndex())
			var destination	= forms.WEB_0F_theme_1L_layout.web_layout_to_editable.web_editable_to_editable_default.getRecord(forms.WEB_0F_theme_1L_layout.web_layout_to_editable.web_editable_to_editable_default.newRecord(false,true))
			var success		= databaseManager.copyMatchingColumns(source, destination)
			destination.row_order = forms.WEB_0F_theme_1L_layout.web_layout_to_editable.web_editable_to_editable_default.getSize()
			
			destination.id_scrapbook = null		
			databaseManager.saveData()
			
			// duplicate scrapbook_data to block_data
			var source		= forms.WEB_0F_scrapbook_1P__choose_2L.web_scrapbook_to_scrapbook_data
			
			for (var i = 0; i < source.getSize(); i++) {
				var record		= source.getRecord(i + 1)
				var destination	= forms.WEB_0F_page__design.web_page_to_block_data_by_area_by_block.getRecord(forms.WEB_0F_page__design.web_page_to_block_data_by_area_by_block.newRecord(false, true))
				var success		= databaseManager.copyMatchingColumns(record,destination)
				databaseManager.saveData()
			}
		}
		*/
	}
	
	// clear form variables
	forms.WEB_0F_scrapbook_1P__choose.f_source = null
	
	//enable closing the form
	globals.CODE_hide_form = 1
	
	//close the form
	application.closeFormDialog('chooseScrapbook')

}

/**
 *
 * @properties={typeid:24,uuid:"663DDE4D-B043-4E0C-A223-BCF78DD5BA35"}
 */
function FORM_on_load()
{
	// set the tab order sequence programatically
	controller.setTabSequence(null);
}

/**
 *
 * @properties={typeid:24,uuid:"A59730E5-68FF-4005-97AB-069F89C9A448"}
 */
function FORM_on_show()
{
	//disable closing the form
	globals.CODE_hide_form = 0
}
