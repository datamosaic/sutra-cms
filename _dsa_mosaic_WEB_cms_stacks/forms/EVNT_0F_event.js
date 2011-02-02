/**
 * @properties={typeid:35,uuid:"565D390F-8539-4226-9EAA-B8FFB62F031E"}
 */
var DTEND_am_pm = "AM";

/**
 * @properties={typeid:35,uuid:"558623AF-01CC-4F83-A191-685873533058"}
 */
var DTEND_minute = "00";

/**
 * @properties={typeid:35,uuid:"19B2A39D-1A58-477F-B217-67C28700265E"}
 */
var DTEND_hour = "00";

/**
 * @properties={typeid:35,uuid:"6A7CBCED-B9E4-49BB-892D-72DC9143AB70"}
 */
var DTEND_day = "00";

/**
 * @properties={typeid:35,uuid:"E506B554-2ECE-4AF1-85AB-455A2596295E"}
 */
var DTEND_month = "00";

/**
 * @properties={typeid:35,uuid:"36ED48DA-B18C-4B54-9F84-501AEAEB0419"}
 */
var DTEND_year = "0000";

/**
 * @properties={typeid:35,uuid:"518ED928-F7EA-4034-8B36-A3AFA5EAEADD"}
 */
var DTSTART_am_pm = "AM";

/**
 * @properties={typeid:35,uuid:"73A78770-64DA-4873-B1CD-0C55EFC4E07F"}
 */
var DTSTART_minute = "00";

/**
 * @properties={typeid:35,uuid:"D78A6A67-74B7-4FCE-8D80-45E9E8BE5860"}
 */
var DTSTART_hour = "00";

/**
 * @properties={typeid:35,uuid:"404DE2CB-C6E8-417D-BB67-88E07D86032E"}
 */
var DTSTART_day = "00";

/**
 * @properties={typeid:35,uuid:"5868A27D-51C4-4C26-9941-321E7F8CBE2B"}
 */
var DTSTART_month = "00";

/**
 * @properties={typeid:35,uuid:"B739038C-B169-456C-9C32-6E8A8D8DB3A6"}
 */
var DTSTART_year = "0000";

/**
 * @properties={typeid:35,uuid:"CACD19ED-7E21-4AE5-B7F6-6036C2D2A1E3"}
 */
var sites = null;

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"6C4E43EF-BBB6-4693-8143-61C1AF47D927"}
 */
function REC_selected(event) {
	
	HELPER_dates()	

//	//redraw sites
//	
//	var fsMerge = web_event_to_event_site
//	var display = new Array()
//	
//	if (utils.hasRecords(fsMerge)) {
//		fsMerge.sort('web_event_to_event_site.site_name asc')
//		
//		for (var i = 1; i <= fsMerge.getSize(); i++) {
//			var record = fsMerge.getRecord(i)
//			display.push(record.id_site)
//		}
//	}
//	
//	//length is one, no \n
//	if (display.length == 1) {
//		sites = display[0]
//	}
//	//split with line breaks
//	else if (display.length) {
//		sites = display.join('\n')
//	}
//	//return empty string
//	else {
//		sites = ''
//	}
//	
//	//update tinymce, if showing
//		//TODO: prompt to save changes if unsaved ones exist
//	if (elements.tab_detail.tabIndex == 2) {
//		forms.WEB_R_tinymce.recLister = foundset.getSelectedRecord()
//		
//		forms.WEB_R_tinymce.elements.bn_tinymce.clearHtml()
//		forms.WEB_R_tinymce.elements.bn_tinymce.html = body
//		
//		forms.WEB_R_tinymce.TOGGLE_buttons(false)
//		forms.WEB_R_tinymce.elements.bn_tinymce.clearDirtyState()
//	}
}

/**
 *
 * @properties={typeid:24,uuid:"53E044AF-BEC1-4A6F-928C-D48769F2FC13"}
 */
function REC_delete()
{
	var delRec = plugins.dialogs.showWarningDialog(
				'Delete record',
				'Do you really want to delete this record?',
				'Yes',
				'No'
			)

	if (delRec == 'Yes') {
		controller.deleteRecord()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"02F915B7-9D81-4846-9524-6CA14B6AD216"}
 */
function REC_new() {
	controller.newRecord(false)
	
	//set default site
	if (utils.hasRecords(forms.WEB_0F_site.foundset) && forms.WEB_0F_site.foundset.getSize() == 1) {
		var mergeRec = web_event_to_event_site.getRecord(web_event_to_event_site.newRecord(false, true))
		mergeRec.id_site = forms.WEB_0F_site.id_site
		
		FLD_data_change__sites()
	}
	
	controller.focusFirstField()
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"EB1E95E6-5037-46EF-9255-E049E26E6ED7"}
 */
function FLD_data_change__sites(oldValue, newValue, event) {
	//[]
	if (typeof newValue == 'number') {
		newValue = utils.numberFormat(newValue,'#')
	}
	newValue = (newValue) ? newValue.split('\n') : new Array()	
	//[5]
	if (typeof oldValue == 'number') {
		oldValue = utils.numberFormat(oldValue,'#')
	}
	oldValue = (oldValue) ? oldValue.split('\n') : new Array()
	
	function newValues(item) {	
		if (oldValue.indexOf(item) == -1) {
			return true
		}
		else {
			return false
		}
	}
	var siteAdd = newValue.filter(newValues)
	
	function oldValues(item) {	
		if (newValue.indexOf(item) == -1) {
			return true
		}
		else {
			return false
		}
	}
	var siteRemove = oldValue.filter(oldValues)
	
	var fsMerge = databaseManager.getFoundSet(web_event_to_event_site.getDataSource())
	
	//add sites
	for (var i = 0; i < siteAdd.length; i++) {
		var newRec = fsMerge.getRecord(fsMerge.newRecord(false,true))
		newRec.id_event = id_event
		newRec.id_site = siteAdd[i]
		databaseManager.saveData(newRec)
	}
	
	//remove sites
	for (var i = 0; i < siteRemove.length; i++) {
		fsMerge.find()
		fsMerge.id_site = siteRemove[i]
		fsMerge.id_event = id_event
		var results = fsMerge.search()
		
		if (results) {
			fsMerge.deleteRecord(1)
		}
	}
	
	//display doesn't need to be updated
	
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"9DE92640-85B3-4F55-9916-32FB39E26C3D"}
 */
function TAB_change(event) {
	var buttonName = event.getElementName()
	var tabPanelName = 'tab_detail'
	var prefix = 'tab_d'
	var tabTotal = 2
	
	//get currently highlighted tab
	var currentTab = (elements[tabPanelName].getMaxTabIndex() == 2) ? 1 : 2
	
	//get foreground/background color
	var foreSelect = elements[prefix + currentTab].fgcolor
	var backSelect = elements[prefix + currentTab].bgcolor
	//if not tab 1, get from itself and previous
	if (currentTab > 1) {
		var foreUnselect = elements[prefix + (currentTab - 1)].fgcolor
		var backUnselect = elements[prefix + (currentTab - 1)].bgcolor
	}
	//if not last tab, get from itself and next
	else if (currentTab < tabTotal) {
		var foreUnselect = elements[prefix + (currentTab + 1)].fgcolor
		var backUnselect = elements[prefix + (currentTab + 1)].bgcolor
	}
	//only one tab, do not need unselected values
	else if (currentTab == tabTotal && currentTab == 1) {
		var foreUnselect = elements[prefix + currentTab].fgcolor
		var backUnselect = elements[prefix + currentTab].bgcolor
	}
	//break out of method, something is not set up correctly
	else {
		return
	}
	
	//get font string (font,normal/bold/italic/bolditalic,size)
	if (application.__parent__.solutionPrefs) {
		//on a mac
		if (solutionPrefs.clientInfo.typeOS == 'Mac OS X') {
			var fontSelect = 'Verdana,1,10'
			var fontUnselect = 'Verdana,0,10'
		}
		//on windows, linux, etc.
		else {
			var fontSelect = 'Tahoma,1,11'
			var fontUnselect = 'Tahoma,0,11'	
		}
	}
	//use mac settings when not running in the shell //TODO: change to windows settings when deployed
	else {
		var fontSelect = 'Verdana,1,10'
		var fontUnselect = 'Verdana,0,10'
	}

	switch (buttonName) {
		case 'tab_d1':
			//set color and font
			elements.tab_d1.fgcolor = foreSelect
			elements.tab_d1.bgcolor = backSelect
			elements.tab_d1.setFont(fontSelect)
			elements.tab_d2.fgcolor = foreUnselect
			elements.tab_d2.bgcolor = backUnselect
			elements.tab_d2.setFont(fontUnselect)
			
			//fill data
			forms.WEB_R_tinymce.recLister = foundset.getSelectedRecord()
			
			forms.WEB_R_tinymce.elements.bn_tinymce.clearHtml()
			forms.WEB_R_tinymce.elements.bn_tinymce.html = body
			
			//load up tinymce
			if (elements.tab_detail.getMaxTabIndex() != 2) {
				elements.tab_detail.addTab(forms.WEB_R_tinymce)
				elements.tab_detail.tabIndex = 2
			}
			break
		case 'tab_d2':
			//set color and font
			elements.tab_d1.fgcolor = foreUnselect
			elements.tab_d1.bgcolor = backUnselect
			elements.tab_d1.setFont(fontUnselect)
			elements.tab_d2.fgcolor = foreSelect
			elements.tab_d2.bgcolor = backSelect
			elements.tab_d2.setFont(fontSelect)
			
			//remove tinymce
			elements.tab_detail.removeTabAt(2)
			elements.tab_detail.tabIndex = 1
			break
	}
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"6141D664-1C7F-4EC4-8C48-4268BE94D1EB"}
 */
function FORM_on_load(event) {

	
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"39DBEEF2-20BA-4BA5-AF68-566C6CDC026A"}
 */
function FORM_on_show(firstShow, event) {

}

/**
 * Handle focus element loosing focus.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"F2C97E90-A84F-4746-B5D3-096216FD5891"}
 */
function FLD_dtstart(event) {
	// save dtstart into vcal format "00000000T000000"
	vevent_dtstart = 
		DTSTART_year +
		DTSTART_month +
		DTSTART_day +
		"T" +
		(( DTSTART_am_pm == "PM" ) ? (utils.stringToNumber(DTSTART_hour) + 12) : DTSTART_hour) +
		DTSTART_minute +
		"00"
	databaseManager.saveData()
}

/**
 * @properties={typeid:24,uuid:"358E6094-0382-44A9-A404-4AA34F04F02C"}
 */
function HELPER_dates() {
	
	// retrieve dtstart form variables
	var startDate 	= vevent_dtstart
	DTSTART_year	= utils.stringMiddle(startDate, 1, 4)
	DTSTART_month	= utils.stringMiddle(startDate, 5, 2)
	DTSTART_day		= utils.stringMiddle(startDate, 7, 2)
	if ( utils.stringMiddle(startDate, 10, 2) > "12" ) {
		DTSTART_hour	= utils.numberFormat(utils.stringMiddle(startDate, 10, 2) - 12, "#")
		DTSTART_am_pm	= "PM"
	}
	else {
		DTSTART_hour	= utils.stringMiddle(startDate, 10, 2)
		DTSTART_am_pm	= "AM"
	}
	DTSTART_minute	= utils.stringMiddle(startDate, 12, 2)
	
	// retrieve dtend form variables
	var endDate 	= vevent_dtend
	DTEND_year	= utils.stringMiddle(endDate, 1, 4)
	DTEND_month	= utils.stringMiddle(endDate, 5, 2)
	DTEND_day		= utils.stringMiddle(endDate, 7, 2)
	if ( utils.stringMiddle(endDate, 10, 2) > "12" ) {
		DTEND_hour	= utils.numberFormat(utils.stringMiddle(endDate, 10, 2) - 12, "#")
		DTEND_am_pm	= "PM"
	}
	else {
		DTEND_hour	= utils.stringMiddle(endDate, 10, 2)
		DTEND_am_pm	= "AM"
	}
	DTEND_minute	= utils.stringMiddle(endDate, 12, 2)	
	
	
}

/**
 * Handle focus element loosing focus.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"87AB2C59-7209-4E05-8471-C9AF59D94C3D"}
 */
function FLD_dtend(event) {
	// save dtend into vcal format "00000000T000000"
	vevent_dtend = 
		DTEND_year +
		DTEND_month +
		DTEND_day +
		"T" +
		(( DTEND_am_pm == "PM" ) ? (utils.stringToNumber(DTEND_hour) + 12) : DTEND_hour) +
		DTEND_minute +
		"00"
	databaseManager.saveData()

}
