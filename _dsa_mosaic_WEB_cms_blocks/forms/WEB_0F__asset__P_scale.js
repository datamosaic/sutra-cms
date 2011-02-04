/**
 * @properties={typeid:35,uuid:"D4E60991-9F57-42B2-8E66-2B63EA7EEF04",variableType:4}
 */
var f_image_height;

/**
 * @properties={typeid:35,uuid:"2991B6CB-D41C-4CE1-B24A-A66E60FBF67F",variableType:4}
 */
var f_image_height_original;

/**
 * @properties={typeid:35,uuid:"5C8E4E38-9353-4E2F-A6B9-8FC41BA12C4E"}
 */
var f_image_name = '';

/**
 * @properties={typeid:35,uuid:"2191C8D1-055C-4E69-AFF4-7953605E048A",variableType:4}
 */
var f_image_width;

/**
 * @properties={typeid:35,uuid:"52C49500-DF07-4FC2-BC40-B098120B0353",variableType:4}
 */
var f_image_width_original;

/**
 *
 * @properties={typeid:24,uuid:"ACFDBD46-1CA4-4144-95F4-CF79A315AB37"}
 */
function ACTION_cancel()
{

//not already ok to close, cancel
if (!globals.CODE_hide_form) {
	
	//enaable closing the form
	globals.CODE_hide_form = 1
	
	application.closeFormDialog('imageScale')
}
}

/**
 *
 * @properties={typeid:24,uuid:"EB14E732-B22C-46F8-B488-C62667F892A7"}
 */
function ACTION_ok()
{
	
	// write new height and width back to data points

// grab data record
	var data = forms.WEB_0F_page__design.web_page_to_block_data_by_area_by_block
	
	// fill data records from FiD values
	for (var i = 0; i < data.getSize(); i++) {
		var record = data.getRecord(i + 1)
		switch (record.data_key) {
				case "width":
					record.data_value = f_image_width
					break;
				case "height":
					record.data_value = f_image_height
				default:
			break;
		}
	}

	//enable closing the form
	globals.CODE_hide_form = 1
	
	//close the form
	application.closeFormDialog('imageScale')

}

/**
 *
 * @properties={typeid:24,uuid:"76E42D60-8B7C-4C8A-BF89-0BFC652E03C5"}
 */
function ACTION_reset()
{
	// reset to original image sizes
	f_image_height = f_image_height_original
	f_image_width = f_image_width_original
}

/**
 *
 * @properties={typeid:24,uuid:"7302C8F5-4ADA-47F8-B6FA-DC5669422414"}
 */
function FLD_change_height()
{
	databaseManager.saveData()
	f_image_width = (f_image_height * f_image_width_original)/f_image_height_original
	databaseManager.saveData()
	application.updateUI()
}

/**
 *
 * @properties={typeid:24,uuid:"89BD1453-04D7-4224-8FBB-31659B9C35B1"}
 */
function FLD_change_width()
{
	databaseManager.saveData()
	f_image_height = (f_image_width * f_image_height_original)/f_image_width_original
	databaseManager.saveData()
	application.updateUI()
}

/**
 *
 * @properties={typeid:24,uuid:"CA804DFE-3B86-4C73-A529-5551D59A477F"}
 */
function FORM_on_load()
{
	// set the tab order sequence programatically
	controller.setTabSequence(null);
}

/**
 *
 * @properties={typeid:24,uuid:"CD3098A8-06A0-4DF0-AEF5-7B105FEA967E"}
 */
function FORM_on_show()
{
	//disable closing the form
	globals.CODE_hide_form = 0
	
	// grab data record
	var data = forms.WEB_0F_page__design.web_page_to_block_data_by_area_by_block
	
	// fill FiD values from data records
	for (var i = 0; i < data.getSize(); i++) {
		var record = data.getRecord(i + 1)
		switch (record.data_key) {
				case "image_name":
					f_image_name = record.data_value
					break;
				case "width":
					f_image_width = record.data_value
					break;
				case "width_original":
					f_image_width_original = record.data_value
					break;
				case "height":
					f_image_height = record.data_value
				case "height_original":
					f_image_height_original = record.data_value
				default:
			break;
		}
	}	
}
