/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f62"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"ADFFFDE6-E494-4907-BEA8-9D5054BA7793"}
 */
var callingForm = null;

/**
 *
 * @properties={typeid:24,uuid:"27a84c20-e836-4d84-b9fc-9f0b5e23c324"}
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
	
	application.closeFormDialog('tagDelete')
}
}

/**
 *
 * @properties={typeid:24,uuid:"5c44a219-5ff9-403f-8f94-4b458c29a1bd"}
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

var formName = this.callingForm

if (globals.WEB_tag_choose) {
	var removeTags = globals.WEB_tag_choose.split('\n')
	var oldTags = forms[formName].tags
	
	//there were existing tags, merge them
	if (oldTags) {
		oldTags = oldTags.split(', ')
		
		removeTags.sort()
		oldTags.sort()
		
		var removeCnt = 0
		//remove removeTags from oldTags
		for (var i = 0; i < oldTags.length; i++) {
			if (oldTags[i] == removeTags[removeCnt]) {
				oldTags.splice(i,1)
				i--
				removeCnt++
			}
		}
	}
	
	//save down new tags into place
	forms[formName].tags = oldTags.join(', ')
}

//save data
databaseManager.saveData()

//turn autosave back on
databaseManager.setAutoSave(true)

//enable closing the form
globals.CODE_hide_form = 1

//close the form
application.closeFormDialog('tagDelete')
}

/**
 *
 * @properties={typeid:24,uuid:"1cd72c20-ab06-49e3-99c1-c300c8120ca3"}
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
globals.TRIGGER_tooltip_set()
}

/**
 *
 * @properties={typeid:24,uuid:"e21db1bc-c2d4-4b85-8073-7cb807990953"}
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

//clear out selection
globals.WEB_tag_choose = null

//set valuelist
var formName = this.callingForm
var options = forms[formName].tags

if (options) {
	options = options.split(', ')
}
else {
	options = new Array()
}

application.setValueListItems('WEB_tag_selected',options)
}
