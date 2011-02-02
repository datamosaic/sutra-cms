/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f61"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"0DB8F194-B241-4646-8A35-6F27D096B1B5",variableType:4}
 */
var fidAccept = null;

/**
 *
 * @properties={typeid:24,uuid:"A7A0B29B-6185-4CC5-9EE9-B8DE9442FC9D"}
 */
function ACTION_cancel()
{


/*
 *	TITLE    :	ACTION_cancel
 *			  	
 *	MODULE   :	ds_NAV_engine
 *			  	
 *	ABOUT    :	close form in dialog
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	MODIFIED :	Jan 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */


//enaable closing the form
globals.CODE_hide_form = 1

application.closeFormDialog('cmsSnapshot')

}

/**
 *
 * @properties={typeid:24,uuid:"9950D7B6-C125-48E1-B369-7FE039649CDE"}
 */
function ACTION_ok()
{


/*
 *	TITLE    :	ACTION_ok
 *			  	
 *	MODULE   :	ds_AC_access_control
 *			  	
 *	ABOUT    :	check password, save md5, close form in dialog
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	MODIFIED :	Mar 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */


//enaable closing the form
globals.CODE_hide_form = 1

//accept
fidAccept = 1

application.closeFormDialog('cmsSnapshot')

}

/**
 *
 * @properties={typeid:24,uuid:"CC5E6398-EEAC-4202-BAD9-F0F93CA205D5"}
 */
function FORM_on_show()
{


/*
 *	TITLE    :	FORM_on_show
 *			  	
 *	MODULE   :	ds_AC_access_control
 *			  	
 *	ABOUT    :	get current rules for passwords, show FiD
 *			  	
 *	INPUT    :	1) id_user for user record to be modified
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	
 *			  	
 *	MODIFIED :	Mar 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

//disable closing the form
globals.CODE_hide_form = 0

//reset acceptance status
fidAccept = null

//null out all fields
globals.WEB_version_name = null
globals.WEB_version_description = null

//request focus in first field
application.updateUI()
elements.fld_WEB_version_name.requestFocus()

}
