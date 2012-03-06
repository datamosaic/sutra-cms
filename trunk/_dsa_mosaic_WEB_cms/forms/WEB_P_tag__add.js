/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f63",variableType:12}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"ab29c47e-17cd-478a-b8e1-d82c2de4c57d"}
 */
function ACTION_cancel()
{

/*
 *	TITLE    :	ACTION_cancel
 *			  	
 *	MODULE   :	rsrc_4COM_4_community
 *			  	
 *	ABOUT    :	close form in dialog
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	 
 *			  	
 *	MODIFIED :	March 3, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */

//not already ok to close, cancel
if (!globals.CODE_hide_form) {
	//rollback edited records
	databaseManager.rollbackEditedRecords()
	
	//turn autosave back on
	databaseManager.setAutoSave(true)
	
	//enaable closing the form
	globals.CODE_hide_form = 1
	
	application.closeFormDialog('tagAdd')
}
}

/**
 *
 * @properties={typeid:24,uuid:"c441ec70-0424-4455-83c6-68bcd0a6526f"}
 */
function ACTION_ok()
{

/*
 *	TITLE    :	ACTION_ok
 *			  	
 *	MODULE   :	rsrc_4COM_4_community
 *			  	
 *	ABOUT    :	close form in dialog
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	 
 *			  	
 *	MODIFIED :	March 3, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */

var formName = this._callingForm

if (true) {
	//choosing from pre-existing tags
	if (globals.WEB_tag_kind == 1) {
		//rollback edited records
		databaseManager.rollbackEditedRecords()
		
		var newTags = globals.WEB_tag_choose.split('\n')
		var oldTags = forms[formName].tags
		
		//there were existing tags, merge them
		if (oldTags) {
			oldTags = oldTags.split(', ')
			
			newTags = newTags.concat(oldTags)
			newTags.sort()
			
			//remove duplicates
			for (var i = 0; i < newTags.length - 1; i++) {
				if (newTags[i] == newTags[i + 1]) {
					newTags.splice(i,1)
					i--
				}
			}
		}
		
		//save down new tags into place
		forms[formName].tags = newTags.join(', ')
	}
	//adding new tag(s)
	else {
		var tagCreate = tag
		
		tagCreate = tagCreate.split(', ')
		
		if (tagCreate.length > 1) {
			tag = tagCreate[0]
			
			for (var i = 1; i < tagCreate.length; i++) {
				var record = foundset.getRecord(foundset.newRecord(false,true))
				
				record.tag = tagCreate[i]
			}
		}
		
		var oldTags = forms[formName].tags
		
		//there were existing tags, merge them
		if (oldTags) {
			oldTags = oldTags.split(', ')
			
			tagCreate = oldTags.concat(tagCreate)
			tagCreate.sort()
			
		}
		
		//save down new tags into place
		forms[formName].tags = tagCreate.join(', ')
	}
	
	//save data
	databaseManager.saveData()
	
	//turn autosave back on
	databaseManager.setAutoSave(true)
	
	//enable closing the form
	globals.CODE_hide_form = 1
	
	//close the form
	application.closeFormDialog('tagAdd')
}
else {
	plugins.dialogs.showErrorDialog(
				'Not enough data', 
				'You must fill out all of the fields in order to create a valuelist',
				'OK'
			)
}
}

/**
 *
 * @properties={typeid:24,uuid:"02f00df7-ec9d-4236-b3bd-f5e88e263c37"}
 */
function FLD_data_change__G_tag_type()
{

/*
 *	TITLE    :	FLD_data_change__G_tag_type
 *			  	
 *	MODULE   :	rsrc_4COM_4_community
 *			  	
 *	ABOUT    :	change displayed fields
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	
 *			  	
 *	MODIFIED :	March 3, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */

switch (globals.WEB_tag_kind) {
	case 1:
		elements.lbl_tag.text = 'Choose tags'
		elements.fld_tag.visible = false
		elements.fld_tag_check.visible = true
		break
	case 2:
		elements.lbl_tag.text = 'Tag name'
		elements.fld_tag.visible = true
		elements.fld_tag_check.visible = false
		
		//create a new record
		controller.newRecord(false)
		
		elements.fld_tag.requestFocus(false)
		break
}
}

/**
 *
 * @properties={typeid:24,uuid:"07fcb420-c194-430a-9929-d0486a2febac"}
 */
function FORM_on_load()
{

/*
 *	TITLE    :	FORM_on_load
 *			  	
 *	MODULE   :	rsrc_4COM_4_community
 *			  	
 *	ABOUT    :	form setup
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	
 *			  	
 *	MODIFIED :	March 3, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */


// load tooltips from tooltip module
globals.WEBc_sutra_trigger('TRIGGER_tooltip_set')
}

/**
 *
 * @properties={typeid:24,uuid:"1c2c68fd-523b-40d9-b583-a48127f419e6"}
 */
function FORM_on_show()
{

/*
 *	TITLE    :	FORM_on_show
 *			  	
 *	MODULE   :	rsrc_4COM_4_community
 *			  	
 *	ABOUT    :	disable closing of form
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	
 *			  	
 *	MODIFIED :	March 3, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */

//disable closing the form
globals.CODE_hide_form = 0

//set to already exists
globals.WEB_tag_kind = 1

//clear out selection
globals.WEB_tag_choose = null

//show correct fields
FLD_data_change__G_tag_type()


}
