/**
 * @properties={typeid:35,uuid:"DB2E3513-5FD7-40DA-98A7-76C6FD83A9AF",variableType:4}
 */
var f_image_height;

/**
 * @properties={typeid:35,uuid:"CB5A1B5E-795B-43FB-B833-E1BF93CC7AFF",variableType:4}
 */
var f_image_height_original;

/**
 * @properties={typeid:35,uuid:"0A54709B-F7DE-4F73-A634-4F35BC2DF638"}
 */
var f_image_name = '';

/**
 * @properties={typeid:35,uuid:"E8819D9B-4972-40C9-B29D-D34547E8D47B",variableType:4}
 */
var f_image_width;

/**
 * @properties={typeid:35,uuid:"FDD5E89A-8E9D-47E9-8969-010615568DAB",variableType:4}
 */
var f_image_width_original;

/**
 * @properties={typeid:35,uuid:"104B9C5D-260A-4CBC-9B4E-0A5518EA83B0",variableType:4}
 */
var linkImage = null;

/**
 * @properties={typeid:35,uuid:"B6B3FC85-8DB1-4FEC-A999-FD71414ABAFA",variableType:-4}
 */
var recImage = null;

/**
 *
 * @properties={typeid:24,uuid:"8B931B10-1A24-4593-B224-BF6B25E56755"}
 */
function ACTION_cancel()
{

//not already ok to close, cancel
if (!globals.CODE_hide_form) {
	
	//enaable closing the form
	globals.CODE_hide_form = 1
	linkImage = null
	
	application.closeFormDialog('chooseImage')
}
}

/**
 * @properties={typeid:24,uuid:"86FC5255-7DA5-47D5-BFD6-2CA7D2DEB7DD"}
 */
function ACTION_ok()
{
	
	// choose image from FiD
	var record = forms.WEB_0F__image__P_choose_1L.foundset.getRecord(forms.WEB_0F__image__P_choose_1L.foundset.getSelectedIndex())
	
	// set image details object
	var fileOBJ = {}
	fileOBJ.image_name	= record.image_title
	fileOBJ.image_type	= record.image_type
	fileOBJ.image_extension	= record.image_extension
	fileOBJ.width		= record.width
	fileOBJ.height		= record.height
	fileOBJ.width_original		= record.width
	fileOBJ.height_original		= record.height
	fileOBJ.directory	= record.directory
	fileOBJ.rec_created = new Date()
	
	// set record to form to be used elsewhere
	if (linkImage) {
		recImage = record
	}
	// copy image details to block data points
	else {
		//structure mode
		if (forms.WEB_0F_page.TRIGGER_mode_set() == "DESIGN") {
			var data = forms.WEB_0F_page__design.web_page_to_block_data_by_area_by_block
		}
		//browser mode
		else {
			var data = forms.WEB_0F_page__browser__editor.dataRec
		}
		
		for (var i = 0; i < data.getSize(); i++) {
			var record = data.getRecord(i + 1)
			record.data_value = fileOBJ[record.data_key]
		}
	}

	//enable closing the form
	globals.CODE_hide_form = 1
	linkImage = null
	
	//close the form
	application.closeFormDialog('chooseImage')

}

/**
 *
 * @properties={typeid:24,uuid:"D666ED3E-928A-4A34-AA06-54F955E5DF0F"}
 */
function FORM_on_load()
{
	// set the tab order sequence programatically
	controller.setTabSequence(null);
}

/**
 *
 * @properties={typeid:24,uuid:"854A00F4-2221-4A42-A6DD-5C40ACE70231"}
 */
function FORM_on_show()
{
	//disable closing the form
	globals.CODE_hide_form = 0
	
	//null out old values
	recImage = null
}
