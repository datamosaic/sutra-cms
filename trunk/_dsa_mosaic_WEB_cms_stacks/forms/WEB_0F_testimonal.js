/**
 * @properties={typeid:35,uuid:"1B532AD3-2C06-45AE-B88C-51C25653A4CA"}
 */
var sites = null;

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2390F015-19FB-468F-8DFF-BA432DAB3188"}
 */
function REC_on_select(event) {
	//redraw sites
	
	var fsMerge = web_testimonial_to_testimonial_site
	var display = new Array()
	
	if (utils.hasRecords(fsMerge)) {
		fsMerge.sort('web_testimonial_to_testimonial_site.site_name asc')
		
		for (var i = 1; i <= fsMerge.getSize(); i++) {
			var record = fsMerge.getRecord(i)
			display.push(record.id_site)
		}
	}
	
	//length is one, no \n
	if (display.length == 1) {
		sites = display[0]
	}
	//split with line breaks
	else if (display.length) {
		sites = display.join('\n')
	}
	//return empty string
	else {
		sites = ''
	}
	
	//update tinymce, if showing
		//TODO: prompt to save changes if unsaved ones exist
	if (elements.tab_detail.tabIndex == 2) {
		forms.WEB_R_tinymce.recLister = foundset.getSelectedRecord()
		
		forms.WEB_R_tinymce.elements.bn_tinymce.clearHtml()
		forms.WEB_R_tinymce.elements.bn_tinymce.html = body
		
		forms.WEB_R_tinymce.TOGGLE_buttons(false)
		forms.WEB_R_tinymce.elements.bn_tinymce.clearDirtyState()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"C0727D52-61AD-4B02-AD81-A274B3D97D3E"}
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
 * @properties={typeid:24,uuid:"168272E5-6971-44DA-8849-729B24C38808"}
 */
function REC_new() {
	controller.newRecord(false)
	
	//set default site
	if (utils.hasRecords(forms.WEB_0F_site.foundset) && forms.WEB_0F_site.foundset.getSize() == 1) {
		var mergeRec = web_testimonial_to_testimonial_site.getRecord(web_testimonial_to_testimonial_site.newRecord(false, true))
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
 * @properties={typeid:24,uuid:"9849F9A9-3858-4112-BB27-827719204A41"}
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
	
	var fsMerge = databaseManager.getFoundSet(web_testimonial_to_testimonial_site.getDataSource())
	
	//add sites
	for (var i = 0; i < siteAdd.length; i++) {
		var newRec = fsMerge.getRecord(fsMerge.newRecord(false,true))
		newRec.id_testimonial = id_testimonial
		newRec.id_site = siteAdd[i]
		databaseManager.saveData(newRec)
	}
	
	//remove sites
	for (var i = 0; i < siteRemove.length; i++) {
		fsMerge.find()
		fsMerge.id_site = siteRemove[i]
		fsMerge.id_testimonial = id_testimonial
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
 * @properties={typeid:24,uuid:"EB121E7F-25AB-4B8E-85EB-21ADA3613DBC"}
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
 * @properties={typeid:24,uuid:"38176A14-30B7-4E10-8D06-936CD9CBF60C"}
 */
function FORM_on_load(event) {
	
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"F0C93E08-E0AB-45BF-A685-E27EF5A7D368"}
 */
function FORM_on_show(firstShow, event) {
	//call tab change with pseudo event to load in easy mode
	if (firstShow) {
		TAB_change({getElementName : function () {return 'tab_d1'}})
	}
	//call tab changer to update tinymce data
	else {
		var tab = (elements.tab_detail.tabIndex == 2) ? 1 : 2
		
		TAB_change({getElementName : function () {return 'tab_d' + tab}})
	}	
	
	//hide site checkbox when only one site
	var showSite = (forms.WEB_0F_site.foundset.getSize() == 1) ? false : true
	elements.lbl_sites.visible = showSite
	elements.var_sites.visible = showSite
}
