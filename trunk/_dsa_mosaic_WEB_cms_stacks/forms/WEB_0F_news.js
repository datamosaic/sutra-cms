/**
 * @properties={typeid:35,uuid:"755025CA-5447-4B24-BBB2-4E62E2337684"}
 */
var sites = null;

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0A286C45-BC21-4859-89F7-9699756BC6F2"}
 */
function REC_on_select(event) {
	//redraw sites
	
	var fsMerge = web_news_to_news_site
	var display = new Array()
	
	if (utils.hasRecords(fsMerge)) {
		fsMerge.sort('web_news_site_to_site.site_name asc')
		
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
 * @properties={typeid:24,uuid:"B377512F-8D08-4D37-9C88-0646C99E1E7C"}
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
 * @properties={typeid:24,uuid:"0F2CB28D-4270-4E42-92AC-43AABC63621A"}
 */
function REC_new() {
	controller.newRecord(false)
	
	//set default site
	if (utils.hasRecords(forms.WEB_0F_site.foundset) && forms.WEB_0F_site.foundset.getSize() == 1) {
		var mergeRec = web_news_to_news_site.getRecord(web_news_to_news_site.newRecord(false, true))
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
 * @properties={typeid:24,uuid:"D8FD2C43-65F8-417A-934D-1D6C0E4186F4"}
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
	
	var fsMerge = databaseManager.getFoundSet(web_news_to_news_site.getDataSource())
	
	//add sites
	for (var i = 0; i < siteAdd.length; i++) {
		var newRec = fsMerge.getRecord(fsMerge.newRecord(false,true))
		newRec.id_news = id_news
		newRec.id_site = siteAdd[i]
		databaseManager.saveData(newRec)
	}
	
	//remove sites
	for (var i = 0; i < siteRemove.length; i++) {
		fsMerge.find()
		fsMerge.id_site = siteRemove[i]
		fsMerge.id_news = id_news
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
 * @properties={typeid:24,uuid:"FB082BDC-ACE9-411D-9482-1D67776D8B05"}
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
 * @properties={typeid:24,uuid:"B94C29B1-DEC5-4697-9CD7-48B95BA56734"}
 */
function FORM_on_load(event) {
	
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"100E7727-11EE-458B-BAFF-1CBDC8428E41"}
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

/**
 * @properties={typeid:24,uuid:"B532E528-FC09-47A4-9CB6-59103A9A5EC1"}
 */
function ACTION_create_detail_page() {
	//see methods: forms.WEB_0T_page.REC_new, forms.WEB_0F_page__design__header_edit.ACTION_save
	
	if (id_page) {
		var input = plugins.dialogs.showQuestionDialog(
					'Existing detail',
					'You have already created a detail page.\nContinue anyway?',
					'Yes',
					'No'
			)
		
		if (input != 'Yes') {
			return
		}
	}
	
	//get parent page record
	var fsParent = databaseManager.getFoundSet('sutra_cms','web_page')
	fsParent.find()
	fsParent.id_page = forms.WEB_0F_site.news_id_parent
	var results = fsParent.search()
	if (results != 1) {
		return "Parent news folder setup incorrectly"
	}
	else {
		var recParent = fsParent.getRecord(1)
	}
	
	//there is a parent folder/page, continue
	if (1 == 1) {
		
		var fsPage = databaseManager.getFoundSet('sutra_cms','web_page')
		var recPage = fsPage.getRecord(fsPage.newRecord(false,true))
		recPage.parent_id_page = fsParent.id_page
		databaseManager.saveData(recPage)
		
		recPage.order_by = recParent.web_page_to_page__child.getSize()
		recPage.id_site = recParent.id_site
		recPage.flag_publish = 1
		
		//create one version, set as active and non-editable
		var oneVersion = recPage.web_page_to_version.getRecord(recPage.web_page_to_version.newRecord(false,true))
		oneVersion.version_number = 1
		oneVersion.flag_active = 1
		oneVersion.flag_edit = 0
		
		//set theme
		recPage.id_theme = forms.WEB_0F_site.news_id_theme
		
		//set layout
		recPage.id_theme_layout = forms.WEB_0F_site.news_id_layout
		
		//set name
		recPage.page_name = title
		
		//create all child records
		var recGroup = forms.WEB_0F_site.web_site_to_group.getRecord(1)
		
		var fsArea = databaseManager.getFoundSet('sutra_cms','web_area')
		
		// get editable regions based on layout selected
		var fsRegions = recPage.web_page_to_layout.web_layout_to_editable
				
		// create a page area record for each editable
		var order = 1
		for (var i = 1; i <= fsRegions.getSize(); i++) {
			var tempEditableRec = fsRegions.getRecord(i)
			
			var areaRec = fsArea.getRecord(fsArea.newRecord(false, true))
			
			areaRec.area_name = tempEditableRec.editable_name
			areaRec.id_editable = tempEditableRec.id_editable
			areaRec.row_order = order ++ 
			areaRec.id_group = recGroup.id_group
			areaRec.id_version = oneVersion.id_version			
			
			//create a block record for each editable default
			for (var j = 1; j <= tempEditableRec.web_editable_to_editable_default.getSize(); j++ ) {
				var tempEditableDefaultRec = tempEditableRec.web_editable_to_editable_default.getRecord(j)
				
				var blockRec = areaRec.web_area_to_block.getRecord(areaRec.web_area_to_block.newRecord(false, true))
				
				blockRec.id_block_display = tempEditableDefaultRec.id_block_display
				blockRec.id_block_type = tempEditableDefaultRec.id_block_type
				blockRec.id_scrapbook = tempEditableDefaultRec.id_scrapbook
				// set id_news to block parameter. note "xxx" must be string in theme > .. > default > params field
				if ( tempEditableDefaultRec.params == "xxx" ) {
					blockRec.params = id_news
				}
				blockRec.row_order = j
				
				//create a block_data record for each editable_default
				if ( tempEditableDefaultRec.web_editable_default_to_block_meta ) {
					for (var k = 1; k <= tempEditableDefaultRec.web_editable_default_to_block_meta.getSize(); k++) {
						var tempEditableDefaultDetailRec = tempEditableDefaultRec.web_editable_default_to_block_meta.getRecord(k)
						
						var blockDataRec = blockRec.web_block_to_block_data.getRecord(blockRec.web_block_to_block_data.newRecord(false,true))
						
	//					blockDataRec.id_block_display = tempEditableDefaultDetailRec.id_block_meta
	//					blockDataRec.id_block_type = tempEditableDefaultDetailRec.id_block_type
						blockDataRec.data_key = tempEditableDefaultDetailRec.column_name
	//					blockDataRec.params = tempEditableDefaultDetailRec.column_type
	//					blockDataRec.row_order = k
						
					}
				}
			}
			
			databaseManager.saveData()
		}
		
		// finish up
		fsArea.setSelectedIndex(1)		
		
		var fsPath = databaseManager.getFoundSet('sutra_cms','web_path')
		var siteID = recPage.id_site
		
		//add in path for this page
		var pathNameWanted = recPage.page_name
		pathNameWanted = pathNameWanted.toLowerCase()
		pathNameWanted = utils.stringReplace(pathNameWanted, ' ', '-')
		
		var pathName = pathNameWanted
		var cnt = 1
		
		//we need to get into the loop
		results = null
		
		while (results != 0) {
			fsPath.find()
			fsPath.id_site = siteID
			fsPath.path = pathName
			var results = fsPath.search()
			
			if (results) {
				pathName = pathNameWanted + cnt++
			}
		}
		
		var recPath = recPage.web_page_to_path.getRecord(recPage.web_page_to_path.newRecord(false,true))
		recPath.flag_default = 1
		recPath.path = pathName
		recPath.id_site = siteID
		
		//punch in page id to news record
		id_page = recPage.id_page
		
		databaseManager.saveData()
	}
	//throw error
	else {
		plugins.dialogs.showErrorDialog(
					'Error',
					'A valid parent page for news items does not exist.\nSee the site record to fix.'
			)
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"511065D8-7681-4FEB-93ED-993FBD44A564"}
 */
function GOTO_page(event) {
	if (id_page) {
		globals.TRIGGER_navigation_set('pages')
		forms.WEB_0T_page.FORM_on_load(event)
		forms.WEB_0T_page.SET_page(id_page)
	}
	else {
		plugins.dialogs.showErrorDialog(
					'Error',
					'No page configured for this news item'
			)
	}
}
