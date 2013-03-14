/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"320A5545-514D-4966-AE6E-2C8DE4DEC653"}
 */
var _assetName = null;

/**
 *
 * @properties={typeid:24,uuid:"578FDB75-DC03-4285-8786-11B0918F1319"}
 * @AllowToRunInFind
 */
function ACTION_filter()
{

var formName = 'WEB_P__asset_1L_asset'

//find on filtered values
forms[formName].controller.find()
	
	if (_assetName) {forms[formName].asset_name = '%' + _assetName + '%'}
	forms[formName].asset_type = forms.WEB_P__asset._assetType

var results = forms[formName].controller.search()

}

/**
 *
 * @properties={typeid:24,uuid:"EDB915D6-E8C7-49FB-93B4-0C354884EFD0"}
 * @AllowToRunInFind
 */
function FILTER_clear()
{
//	clear filters
	_assetName = null

	ACTION_filter()

}

/**
 *
 * @properties={typeid:24,uuid:"9749BCA7-D8EA-4F5D-A9F5-3B9FC38B4987"}
 */
function FORM_on_show(firstShow)
{

/*
 *	TITLE    :	FORM_on_show
 *			  	
 *	MODULE   :	rsrc_TIP_tooltip
 *			  	
 *	ABOUT    :	
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	FORM_on_show()
 *			  	
 *	MODIFIED :	March 8, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */

if (firstShow) {
	// make sure sutra_solution record is loaded
	
	FILTER_clear()
	
	
}
}
