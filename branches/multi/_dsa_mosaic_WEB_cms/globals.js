/**
 * @properties={typeid:35,uuid:"953FF820-B3B4-4DCB-822D-E37FBD911426"}
 */
var WEB_page_id_block_selected = null;

/**
 * @properties={typeid:35,uuid:"B8BD989F-8261-4359-A449-507E164E8BF9",variableType:-4}
 */
var WEB_selected_language = null;

/**
 * @properties={typeid:35,uuid:"24fde543-69cc-4de9-af47-7f7c22221f17"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"B1FA121E-7FCE-4CD5-97D2-AE0E75D79440"}
 */
var WEB_page_group = null;

/**
 * @properties={typeid:35,uuid:"17B52E70-9BEE-4FB1-9130-4230482F07B4"}
 */
var WEB_site_attribute_selected = null;

/**
 * @properties={typeid:35,uuid:"86AA4208-BDF9-4D86-8267-C3EB48EC6C32"}
 */
var WEB_page_platform = null;

/**
 * @properties={typeid:35,uuid:"BF6E24CB-9B98-4241-B8C2-CBE4CB520D6A",variableType:-4}
 */
var WEB_page_version = null;

/**
 * @properties={typeid:35,uuid:"5DDBD6FC-A0E1-4395-B10B-6154C12B4285"}
 */
var WEB_page_language = null;

/**
 * @properties={typeid:35,uuid:"9B43706E-FC30-4C33-92A2-DF039DBB4661"}
 */
var WEB_CONSTANT_DIRECTORY_CSS = '/site/css/';

/**
 * @properties={typeid:35,uuid:"70FADC68-5914-4719-99FF-09C1AC510F00"}
 */
var WEB_CONSTANT_DIRECTORY_FILES = '/site/files/';

/**
 * @properties={typeid:35,uuid:"7F3C6EDF-06EB-4E6F-8DAC-281576B7F5BA"}
 */
var WEB_CONSTANT_DIRECTORY_IMAGES = '/site/images/';

/**
 * @properties={typeid:35,uuid:"E84BDBC5-7F23-4857-AA61-5ADFD2CD5A04"}
 */
var WEB_CONSTANT_DIRECTORY_JS = '/site/js/';

/**
 * @properties={typeid:35,uuid:"C926688D-5B93-42A2-B288-0E2ADF9116BC"}
 */
var WEB_CONSTANT_DIRECTORY_THEMES = '/site/themes/';

/**
 * @properties={typeid:35,uuid:"DD53BF5B-DD20-4B47-911A-41051101A010",variableType:4}
 */
var WEB_page_mode = 2;

/**
 * @properties={typeid:35,uuid:"F5BD30C1-1A0F-436A-9320-9812076B6B72"}
 */
var WEB_page_sort = 'order_by asc';

/**
 * @properties={typeid:35,uuid:"14FD6120-E9BF-4EC2-973D-9790A6F6903F"}
 */
var WEB_preview_url = null;

/**
 * @properties={typeid:35,uuid:"87BE1F80-1634-4DC2-B9DA-29CB5B7CF054"}
 */
var WEB_site_display = null;

/**
 * @properties={typeid:35,uuid:"15313654-99B2-4BCA-9D6F-0D37F917C5DD"}
 */
var WEB_tag_choose = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"523C0FEA-E636-4CBF-930C-5C4D7B8F601B"}
 */
function WEB_simple_edit(event) {
	
/*
 *	TITLE    :	COM4_simple_cancel
 *			  	
 *	MODULE   :	rsrc_4COM_4_community
 *			  	
 *	ABOUT    :	go to editable tab
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	MODIFIED :	October 29, 2009 -- Troy Elliott, Data Mosaic	
 *			  	
 */	

var append = '__button_tab'
var buttonsName = (event.getFormName) ? event.getFormName() : event
var formName = buttonsName.substring(0,buttonsName.length - append.length)

//get offset from forms
var tabA = (forms[formName].TAB_header_size) ? forms[formName].TAB_header_size('A') : 40
var tabB = (forms[formName].TAB_header_size) ? forms[formName].TAB_header_size('B') :  250
var offset = tabB - tabA - ((forms[formName].TAB_header_size) ? forms[formName].TAB_header_size('space') : 10)

//only go to edit if currently on display
if (forms[formName].elements.tab_header_detail.tabIndex == 1) {
	//turn autosave off
	databaseManager.setAutoSave(false)
	
	//set new size of this tab panel
	forms[formName].elements.tab_header_detail.setSize(forms[formName].elements.tab_header_button.getWidth(),tabB)
	
	//go to editable fields
	forms[formName].elements.tab_header_detail.tabIndex = 2
	
	//move/resize other tab panels
	forms[formName].elements.tab_main.setLocation(0,forms[formName].elements.tab_main.getLocationY() + offset)
	forms[formName].elements.tab_main.setSize(forms[formName].elements.tab_header_button.getWidth(),forms[formName].elements.tab_main.getHeight() - offset)
	
	//flip graphic
	forms[buttonsName].elements.btn_cancel.visible = true
	forms[buttonsName].elements.btn_edit.visible = false
	
	//freeze screen
	globals.TRIGGER_interface_lock(true)
	
	if (forms[formName] && forms[formName].elements.gfx_curtain) {
		forms[formName].elements.gfx_curtain.visible = true
	}
}
//prompt to cancel current edits
else {

	var answer = plugins.dialogs.showWarningDialog(
							'Cancel?',
							'Cancel all header edits?',
							'Yes',
							'No'
						)
	
	if (answer == 'Yes') {
		//rollback edited records
		databaseManager.rollbackEditedRecords()
		
		//turn autosave back on
		databaseManager.setAutoSave(true)
		
		//set new size of this tab panel
		forms[formName].elements.tab_header_detail.setSize(forms[formName].elements.tab_header_button.getWidth(),tabA)
		
		//go to display-only fields
		forms[formName].elements.tab_header_detail.tabIndex = 1
		
		//move/resize other tab panels
		forms[formName].elements.tab_main.setLocation(0,forms[formName].elements.tab_main.getLocationY() - offset)
		forms[formName].elements.tab_main.setSize(forms[formName].elements.tab_header_button.getWidth(),forms[formName].elements.tab_main.getHeight() + offset)
		
		//flip graphic
		forms[buttonsName].elements.btn_cancel.visible = false
		forms[buttonsName].elements.btn_edit.visible = true
		
		//unfreeze screen
		if (solutionPrefs.config.lockStatus) {
			globals.TRIGGER_interface_lock(false)
		}
		
		if (forms[formName] && forms[formName].elements.gfx_curtain) {
			forms[formName].elements.gfx_curtain.visible = false
		}
	}
}

	
}

/**
 * @properties={typeid:35,uuid:"791D7FA7-752E-42BD-9BD8-90FDC1548242",variableType:4}
 */
var WEB_tag_kind = null;

/**
 *
 * @properties={typeid:24,uuid:"73565A5D-1041-4CB5-99AD-6F5263680E13"}
 */
function WEB_simple_save() {
	var proceed = true
	
	//if method on calling form, execute it
	var formName = application.getMethodTriggerFormName()
	if (formName && forms[formName] && forms[formName].ACTION_save) {
		var proceed = forms[formName].ACTION_save()
	}
	
	//if false returned from custom method, don't save
	if ((typeof proceed == 'boolean') ? proceed : true) {
		var suffix = '__header_edit'
		var parentForm = formName.substring(0,formName.length - suffix.length)
		
		//get offset from forms
		var tabA = (forms[parentForm].TAB_header_size) ? forms[parentForm].TAB_header_size('A') : 40
		var tabB = (forms[parentForm].TAB_header_size) ? forms[parentForm].TAB_header_size('B') :  250
		var offset = tabB - tabA - ((forms[parentForm].TAB_header_size) ? forms[parentForm].TAB_header_size('space') : 10)
		
		//save outstanding data
		databaseManager.saveData()
		
		//turn autosave back on
		databaseManager.setAutoSave(true)
		
		//set new size of this tab panel
		forms[parentForm].elements.tab_header_detail.setSize(forms[parentForm].elements.tab_header_button.getWidth(),tabA)
		
		//go to display-only fields
		forms[parentForm].elements.tab_header_detail.tabIndex = 1
		
		//move/resize other tab panels
		forms[parentForm].elements.tab_main.setLocation(0,forms[parentForm].elements.tab_main.getLocationY() - offset)
		forms[parentForm].elements.tab_main.setSize(forms[parentForm].elements.tab_header_button.getWidth(),forms[parentForm].elements.tab_main.getHeight() + offset)
		
		//flip graphic
		forms[parentForm + '__button_tab'].elements.btn_cancel.visible = false
		forms[parentForm + '__button_tab'].elements.btn_edit.visible = true
		
		//unfreeze screen if locked
		if (solutionPrefs.config.lockStatus) {
			globals.TRIGGER_interface_lock(false)
		}
		
		if (forms[parentForm] && forms[parentForm].elements.gfx_curtain) {
			forms[parentForm].elements.gfx_curtain.visible = false
		}
	}
}

/**
 *
 * @properties={typeid:24,uuid:"1A173034-4601-40F4-8017-9F4151F86C0E"}
 */
function WEB_simple_cancel() {
	
	var callingForm = application.getMethodTriggerFormName()
	
	var suffix = '__header_edit'
	
	var formName = callingForm.substring(0,callingForm.length - suffix.length)
	
	var buttonsForm = formName + '__button_tab'
	
	globals.WEB_simple_edit(buttonsForm)


}

/**
 * @param pageID ID of the page to link to
 * @properties={typeid:24,uuid:"8D473D49-2039-49AC-B633-72E88E736CA9"}
 */
function WEB_MRKUP_link_page(pageID, siteURL, linkType, webMode) {
	//get url up to sutraCMS directory
	var pageLink = globals.WEB_MRKUP_link_base(pageID, siteURL, linkType)
	
	//get page requested
	var fsPage = databaseManager.getFoundSet("sutra_cms","web_page")
	fsPage.find()
	fsPage.id_page = pageID.toString()
	//when in developer, all pages are valid for our purposes
	if (!application.isInDeveloper()) {
		fsPage.flag_publish = 1
	}
	var count = fsPage.search()
	
	//this page exists, get its site
	if (count && utils.hasRecords(fsPage.web_page_to_site)) {
		var pageRec = fsPage.getRecord(1)
		var siteRec = pageRec.web_page_to_site.getRecord(1)
		
		//this is an internal link type of page
		while (pageRec.page_type == 3 && pageRec.page_link_internal) {
			fsPage.find()
			fsPage.id_page = pageRec.page_link_internal
			fsPage.flag_publish = 1
			var count = fsPage.search()
			
			//the internal link exists
			if (count) {
				pageRec = fsPage.getRecord(1)
				siteRec = pageRec.web_page_to_site.getRecord(1)
			}
			//internal link deleted or not published, error out (go home)
			else {
				return pageLink
			}
		}
	}
	//no site specified, try to fail gracefully
	else {
		var pageRec = new Object()
		var siteRec = new Object()
	}
	
	//this is an external link type of page, pageLink == its link
	if (pageRec.page_type == 2 && pageRec.page_link) {
		pageLink = pageRec.page_link
	}
	//page/folder within the cms, generate link
	else {
		//rewrite mode
		var fsInstall = databaseManager.getFoundSet('sutra_cms','web_install')
		fsInstall.loadAllRecords()
		if (utils.hasRecords(fsInstall)) {
			var rewriteMode = fsInstall.rewrite_enabled
		}
		
		//use default link type if none specified
		if (!linkType) {
			linkType = siteRec.pref_links
		}
		
		//if rewrite mode turned off and not edit mode
		//or no url for site and not edit mode, use index
		if ((!rewriteMode && linkType != 'Edit') ||
			(!siteRec.url && linkType != 'Edit')) {
			
			linkType = 'Index'
		}
		
		switch (linkType) {
			case "Index":
				pageLink += 'index.jsp?id=' + pageRec.url_param
				break
			case "Folder":
				
				break
			case "Pretty":
				//are there paths configured for this page?
				if (pageRec && utils.hasRecords(pageRec.web_page_to_path)) {
					//loop to find default
					for (var i = 1; i <= pageRec.web_page_to_path.getSize(); i++) {
						var pathRec = pageRec.web_page_to_path.getRecord(i)
						
						if (pathRec.flag_default == 1) {
							break
						}
					}
				}
				
				var urlString = (pathRec) ? pathRec.path : 'error'
				
				pageLink += urlString + '.html'
				break
			case "Edit":
				//selection set in site tree which will trigger a loading in the main workflow
				//jQuery changes index_edits to fire servoy callbacks on form load
				pageLink += 'index_edit.jsp?id=' + pageRec.url_param
				
				if (webMode) {
					pageLink += '&webmode=edit'
				}
				
				break
			default:
				pageLink += 'index.jsp?id=' + pageRec.url_param
		}
	}
	
	//full url for a page requested
	return pageLink
}

/**
 * @properties={typeid:24,uuid:"AFA318BF-7E29-4E7D-BE9D-CE4085851DF3"}
 */
function WEB_MRKUP_link_base(pageID, siteURL) {
	//rewrite mode
	var fsInstall = databaseManager.getFoundSet('sutra_cms','web_install')
	fsInstall.loadAllRecords()
	if (utils.hasRecords(fsInstall)) {
		var rewriteMode = fsInstall.rewrite_enabled
	}
	
	//get page requested
	var fsPage = databaseManager.getFoundSet("sutra_cms","web_page")
	fsPage.find()
	fsPage.id_page = pageID
	var count = fsPage.search()
	
	//this page exists, get the site
	if (count && utils.hasRecords(fsPage.web_page_to_site)) {
		var pageRec = fsPage.getRecord(1)
		var siteRec = pageRec.web_page_to_site.getRecord(1)
	}
	//no site specified, try to fail gracefully
	else {
		var pageRec = new Object()
		var siteRec = new Object()
	}
	
	//how requested
	var appServer = application.getServerURL()
	appServer = appServer.split(':')
	var accessURL = appServer[1].slice(2)
	if (appServer.length > 2) {
		var port = utils.stringToNumber(appServer[2])
	}
	
	//url specified
	if (siteRec.url) {
		siteURL = siteRec.url
	}
	//use whatever url the request came in on
	else {
		siteURL = accessURL
	}
	
	//advanced apache setup, reference by correct url
	if (siteRec.url_2) {
		siteURL = siteRec.url_2
		port = null
	}
	//take port into consideration
		//MEMO: obviously, the port (if non-standard) is entered in the url_2 column above
	else {
		
	}
	
	//force to be secure
	if (pageRec.flag_ssl) {
		siteURL = 'https://' + siteURL
	}
	//default non-secure
	else {
		siteURL = 'http://' + siteURL
	}
	
	if (port && port != 80) {
		siteURL += ':' + port
	}
	
	//no url rewrite OR running off localhost and site name not specified as localhost
	if (!rewriteMode ||
		(utils.stringPatternCount(siteURL,"localhost") > 0 && siteRec.url != "localhost") || 
		(utils.stringPatternCount(siteURL,"127.0.0.1") > 0 && siteRec.url != "127.0.0.1")) {
		
		siteURL += '/sutraCMS'
	}
	
	//returns url that will launch things in the sutraCMS directory
	return siteURL + '/'
}

/**
 * @properties={typeid:24,uuid:"CF88AF63-45F2-4BC4-95BC-8E6D653A58BC"}
 */
function WEB_MRKUP_link_resources(pageID, siteURL, linkType) {
	var siteDirectory = ''
	
	//rewrite mode
	var fsInstall = databaseManager.getFoundSet('sutra_cms','web_install')
	fsInstall.loadAllRecords()
	if (utils.hasRecords(fsInstall)) {
		var rewriteMode = fsInstall.rewrite_enabled
	}
	
	//get page requested
	var fsPage = databaseManager.getFoundSet("sutra_cms","web_page")
	fsPage.find()
	fsPage.id_page = pageID
	var count = fsPage.search()
	
	//this page exists, get its site
	if (count && utils.hasRecords(fsPage.web_page_to_site)) {
		var pageRec = fsPage.getRecord(1)
		var siteRec = pageRec.web_page_to_site.getRecord(1)
	}
	//no site specified, try to fail gracefully
	else {
		var pageRec = new Object()
		var siteRec = new Object()
	}
	
	//no url rewrite OR running off localhost and site name not specified as localhost
	if (!rewriteMode ||
		(utils.stringPatternCount(siteURL,"localhost") > 0 && siteRec.url != "localhost") || 
		(utils.stringPatternCount(siteURL,"127.0.0.1") > 0 && siteRec.url != "127.0.0.1")) {
		
		siteDirectory = 'sutraCMS/sites/' + siteRec.directory + '/'
	}
	
	//url relative to server root (urlrewrite affect this)
	return siteDirectory
}

/**
 * @param markup text that contain internal page link keys
 * @properties={typeid:24,uuid:"19AD8258-86F2-48AB-AA1B-713A2D08D77D"}
 */
function WEB_MRKUP_link_internal(markup,siteURL,linkType,areaID) {
	
	while ( utils.stringPosition(markup, "{DS:ID_", 0, 0) >= 0 ) {
		var newMarkup = ''
		
		var pos = utils.stringPosition(markup, "{DS:ID_", 0, 0)
		newMarkup += utils.stringLeft(markup, pos-1 )
		markup = utils.stringMiddle(markup, pos, 100000)
		var start 	= utils.stringPosition(markup, "_", 0, 0) + 1
		var end		= utils.stringPosition(markup, "}", 0, 0)
		var length	= end - start
		var id		= utils.stringMiddle(markup, start, length)
		markup 		= utils.stringMiddle(markup, end + 1, 100000)
		
		// add markup link
		newMarkup	+= globals.WEB_MRKUP_link_page(id,siteURL,linkType)
		
		markup		= newMarkup + markup
		
	}
	
	//tack on add new record button if editable
	if (linkType == 'Edit') {
		var area = databaseManager.getFoundSet("sutra_cms","web_area")
		area.find()
		area.id_area = areaID
		var count = area.search()
		
		//this is linked up to a theme editable and set to allow records to be created
		if (count && utils.hasRecords(area.web_area_to_editable) && area.web_area_to_editable.flag_new_block) {
			
			var newBlock = '<!-- add new block -->'
			newBlock += '<div id="sutra-block-add-' + areaID + '" class="block_new">'
			newBlock += '<a href="javascript:blockNew(\'' + areaID + '\')">' + area.area_name.toUpperCase() + ': Add block</a>'
			newBlock += '</div>'
				
			markup += newBlock
		}
	}
	
	return markup

}

/**
 *
 * @properties={typeid:24,uuid:"D05AA53E-5D46-4534-A2AC-A55D700F29C0"}
 */
function WEB_page_tree_to_popup(method,elem) {
	function GET_page(pageRec) {
		if (utils.hasRecords(pageRec[relnPage])) {
			var subArray = new Array()
			
			subArray.push(
						//choose this page
							plugins.popupmenu.createMenuItem('Choose parent (' + pageRec.page_name + ')', method),
						//blank line
							plugins.popupmenu.createMenuItem('-', method)
					)
			
			// set arguments
			subArray[0].setMethodArguments(pageRec.id_page.toString(),pageRec)
					
			// turn off '----'
			subArray[1].setEnabled(false)
			
			for (var j = 1; j <= pageRec[relnPage].getSize(); j++ ) {
				subArray.push(GET_page(pageRec[relnPage].getRecord(j)))
			}
			
			return plugins.popupmenu.createMenuItem(pageRec.page_name + "", subArray)
		}
		else {
			var item = plugins.popupmenu.createMenuItem(pageRec.page_name + "", method)
			item.setMethodArguments(pageRec.id_page.toString(),pageRec)
			
			//disable dividers
			if (item.text == '----') {
				item.setEnabled(false)
			}
			
			return item
		}
	}
	
	if (!elem) {
		elem = forms[application.getMethodTriggerFormName()].elements[application.getMethodTriggerElementName()]
	}
	
	var fsPages = databaseManager.getFoundSet('sutra_cms', 'web_page')
	var relnPage = 'web_page_to_page__child'
	
	fsPages.find()
	fsPages.parent_id_page = '^='
	fsPages.id_site = forms.WEB_0F_site.id_site
	var results = fsPages.search()
	
	if (results) {
		fsPages.sort('order_by asc')
		
		//make array
		var menu = new Array()
		
		for (var i = 1 ; i <= fsPages.getSize() ; i++) {
			menu.push(GET_page(fsPages.getRecord(i)))
		}
		
		//pop up the popup menu
		if (elem != null) {
		    plugins.popupmenu.showPopupMenu(elem, menu);
		}
	}
}

/**
 * @param	{String}	pageName Name for new page.
 * @param	{Number}	[pageType=1] Type of page to create (see WEB_page_types valuelist).
 * @param	{Number}	[parentID] Parent page primary key.
 * @param	{Number}	[themeID] Theme primary key for page.
 * @param	{Number}	[layoutID] Layout primary key for page.
 * 
 * @returns	{JSRecord}	Newly created page record.
 * 
 * @properties={typeid:24,uuid:"A7F7C059-3707-498F-A0B6-C1334EDA6A10"}
 */
function WEB_page_new(pageName,pageType,parentID,themeID,layoutID) {
	if (!pageName) {
		pageName = 'Untitled page'
	}
	
	if (!pageType) {
		pageType = 0
	}
	
	//check if can add record
	if (!globals.TRIGGER_registered_action_authenticate('cms page add')) {
		plugins.dialogs.showErrorDialog(
						'Error',
						'You are not authorized to add new pages'
				)
		return
	}
	
	//there are sites
	if (utils.hasRecords(forms.WEB_0F_site.foundset)) {
		
		//turn on feedback indicator
		globals.CODE_cursor_busy(true)
		
		//turn on progressbar if not already on
		if (!globals.TRIGGER_progressbar_get()) {
			globals.TRIGGER_progressbar_start(null,'Creating new page...')
		}
		
		var fsPage = databaseManager.getFoundSet('sutra_cms','web_page')
		fsPage.clear()
		
		//parent record specified
		if (parentID) {
			fsPage.find()
			fsPage.id_page = parentID
			var results = fsPage.search()
			
			//get the parent record
			if (results) {
				var parentRec = fsPage.getRecord(1)
			}
		}
		
		var newRecord = fsPage.getRecord(fsPage.newRecord(false,true))
		
		//put this page in the correct place; there were other records
		
		//find current syblings (of parent rec or at the top level)
		fsPage.find()
		fsPage.parent_id_page = (parentRec) ? parentRec.id_page : 0
		fsPage.id_site = (parentRec) ? parentRec.id_site : forms.WEB_0F_site.id_site
		var results = fsPage.search()
		
		newRecord.page_name = pageName
		newRecord.page_type = pageType
		newRecord.parent_id_page = (parentRec) ? parentRec.id_page : 0
		newRecord.order_by = (parentRec) ? parentRec.web_page_to_page__child.getSize() + 1 : results + 1
		newRecord.id_site = (parentRec) ? parentRec.id_site : forms.WEB_0F_site.id_site
		
		//create one version
		var oneVersion = newRecord.web_page_to_version.getRecord(newRecord.web_page_to_version.newRecord(false,true))
		oneVersion.version_number = 1
		
		var fsPath = databaseManager.getFoundSet('sutra_cms','web_path')
		var siteID = newRecord.id_site
		
		//add in path for this page
		var pathNameWanted = newRecord.page_name
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
		
		var recPath = newRecord.web_page_to_path.getRecord(newRecord.web_page_to_path.newRecord(false,true))
		recPath.flag_default = 1
		recPath.path = pathName
		recPath.id_site = siteID		
		
//		//reset flag
//		var addedRecord = true
//		forms.WEB_0T_page._addRecord = null		
		
		//update valuelists
//		forms.WEB_0F_page__design.REC_on_select()
		
		//set theme
		newRecord.id_theme = themeID
		newRecord.id_theme_layout = layoutID
		
		databaseManager.saveData()
		
		//only create editable if enough information specified
		if (utils.hasRecords(newRecord,'web_page_to_layout.web_layout_to_editable')) {
			//group to create as
			//TODO: if they've sorted, this will not be the everybody/visitor group
			var recGroup = newRecord.web_page_to_site.web_site_to_site_group.getRecord(1)
			
			var fsArea = databaseManager.getFoundSet('sutra_cms','web_area')
			
			// get editable regions based on layout selected
			var fsRegions = newRecord.web_page_to_layout.web_layout_to_editable
			
			// create a page area record for each editable
			if (fsRegions.getSize()) {
				//sort
				fsRegions.sort('row_order asc')
				
				//still manually set the order in case web_editable is out of sync (kind of likely)
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
						blockRec.row_order = tempEditableDefaultRec.row_order
						
						// INPUT
						//create a block_data record for each block_input
						if ( tempEditableDefaultRec.web_editable_default_to_block_input ) {
							for (var k = 1; k <= tempEditableDefaultRec.web_editable_default_to_block_input.getSize(); k++) {
								var tempEditableDefaultDetailRec = tempEditableDefaultRec.web_editable_default_to_block_input.getRecord(k)
		
								var blockDataRec = blockRec.web_block_to_block_data.getRecord(blockRec.web_block_to_block_data.newRecord(false,true))
								blockDataRec.data_key = tempEditableDefaultDetailRec.column_name
							}
						}
						
						// CONFIG
						// create a block data configure record for each data point
						if ( utils.hasRecords(tempEditableDefaultRec.web_editable_default_to_block_configure) ) {
							for (var k = 1; k <= tempEditableDefaultRec.web_editable_default_to_block_configure.getSize(); k++) {
								var configTemplate = tempEditableDefaultRec.web_editable_default_to_block_configure.getRecord(k)
								
								var configRec = blockRec.web_block_to_block_data_configure.getRecord(blockRec.web_block_to_block_data_configure.newRecord(false, true))
								configRec.data_key = configTemplate.columnName
							}
						}
					}
				}
			}
			
			//thrown in so that group data is properly filled...technically shouldn't save data until we're sure this won't be cancelled
			databaseManager.saveData()
			
			// finish up
			//fsArea.sort( "row_order asc" )
			fsArea.setSelectedIndex(1)
		}
	
		//set flag that need to update tree view on next load
		forms.WEB_0T_page._refresh = 1
		
		//turn off feedback indicator if on
		if (globals.TRIGGER_progressbar_get() instanceof Array) {
			if (globals.TRIGGER_progressbar_get()[1] == 'Creating new page...') {
				globals.TRIGGER_progressbar_stop()
			}
		}
		globals.CODE_cursor_busy(false)
		
		return newRecord
	}
	else {
		plugins.dialogs.showErrorDialog(
						'Error',
						'You must add a site record first'
				)
	}
}

/**
 * @properties={typeid:24,uuid:"47BC6C70-6E6A-4095-9614-B925C3716083"}
 */
function WEB_lock_workflow(lockWorkflow,lockList) {
	
/*
 *	TITLE    :	WEB_lock_workflow
 *			  	
 *	MODULE   :	
 *			  	
 *	ABOUT    :	lock the workflow form (opposite of globals.TRIGGER_interface_lock)
 *			  	
 *	INPUT    :	1- true/false to lock/unlock the workflow
 *			  	2- true/false to lock/unlock the list area
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	DEV_lock_workflow([lockWorkflow], [lockList]) Locks the workflow and/or list areas; when called without arguments, refires current state
 *			  	
 *	MODIFIED :	February 27, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */
	
if (application.__parent__.solutionPrefs) {
	globals.DEV_lock_workflow(lockWorkflow,lockList)
}
}

/**
 * @properties={typeid:24,uuid:"48FC5C3F-2354-442E-BE6A-4963B953E080"}
 */
function WEB_startup_hack() {
	//show all forms with browser beans so they don't error out on initial view
	forms.WEB_0F__image.controller.show()
	forms.WEB_0F__html.controller.show()
	forms.WEB_0F__code.controller.show()
	forms.WEB_0F__content.controller.show()
	application.sleep(1500)
	forms.WEB_0F__content_view.controller.show()
	
	forms.DATASUTRA_0F_solution.controller.show()
}

/**
 * @properties={typeid:24,uuid:"C14078C4-8D87-4207-83F2-0490E4719E5F"}
 */
function WEB_MRKUP_refresh(obj,scope) {
	//no scope specified; send to default
	if (!scope) {
		scope = new Array(1)
	}
	
	for (var i = 0; i < scope.length; i++) {
		switch (scope[i]) {
			case 'site':	//refresh site record
				if (obj && obj.site && obj.site.record) {
					databaseManager.refreshRecordFromDatabase(obj.site.record.foundset,-1)
				}
				break
			default:	//just refresh the current page
				if (obj && obj.page && obj.page.record) {
					databaseManager.refreshRecordFromDatabase(obj.page.record.foundset,-1)
				}
		}
	}
}

/**
 * 
 * Return array of parent page records in order from current page to top level page
 * 
 * @param {Object} obj Sutra CMS controller obj
 * @param {String} order "asc" or "desc". "asc" is default
 * @param {JSRecord} record Page record to lookup (overrides whatever page is in obj)
 * 
 * @properties={typeid:24,uuid:"541905F0-9B0C-474D-968C-F85408B3B05A"}
 */
function WEB_MRKUP_pages_up(obj, order, record) {
	
	//no record specified, lookup from obj
	if (!record) {
		record = obj.page.record
	}
	
	var pages = [record]
	var order = (order == "desc") ? order : "asc"
		
	while ( record.parent_id_page ) {
		
		// reasign record var
		record = record.web_page_to_page__parent.getRecord(1)
		
		// store in return array
		if ( order == "asc" ) {
			pages.unshift(record)
		}
		else {
			pages.push(record)
		}
	}
	
	return pages
}

/**
 * @properties={typeid:24,uuid:"3DB0FF72-EDE1-4F86-8F2A-BCB288586DB8"}
 */
function WEB_MRKUP_pages_down(obj, record) {
	
	// no record specified, lookup from obj
	if (!record) {
		record = obj.page.record
	}
	
	// initialize result
	var pages = []
	
	function iterate(foundset, pages) {
		for (var i = 0; i < foundset.getSize(); i++) {
			var record = foundset.getRecord(i + 1)			
			if ( utils.hasRecords(record.web_page_to_page__child__publish) ) {
				pages = iterate(record.web_page_to_page__child__publish, pages)
			}	
			else if ( record.page_type == 0) {
				pages.push(record)			
			}
		}	
		return pages
	}
			
	if ( utils.hasRecords( record.web_page_to_page__child__publish ) ) {
		pages = iterate(record.web_page_to_page__child__publish, pages)
	}
	else {
		pages = null
	}

	return pages
}

/**
 * Tests if cookie exists in request.
 * 
 * @param {Javax.servlet.http.httpservletrequest} request implicit jsp request object
 * @param {String} name Name of cookie to see if exists
 * @return {boolean} 
 * 
 * @properties={typeid:24,uuid:"AE3EDE76-B244-4E00-A845-18DC3A640D36"}
 */
function WEB_COOKIE_exists(request, name) {
	var cookies = request.getCookies()
	for ( var i in cookies ) {
		if (cookies[i].getName() == name) {
			return true
		}
	}	
	return false
}

/**
 * Creates a new cookie and adds to the implicit jsp response object.
 * 
 * @param {Javax.servlet.http.httpservletresponse} response implicit jsp response object
 * @param {String} name name of cookie
 * 
 * @return {javax.servlet.http.Cookie} pointer to specific cookie
 * 
 * @properties={typeid:24,uuid:"3CAB37EB-875D-41EB-B802-A2AFB50D3436"}
 */
function WEB_COOKIE_new(response, name, value) {

	var cookie = new Packages.javax.servlet.http.Cookie(name,value)
	cookie.setMaxAge(365 * 24 * 60 * 60)	// default to one year
	response.addCookie(cookie)
	
	return cookie

}

/**
 * Get cookie value from request by name.
 * 
 * @param {Javax.servlet.http.httpservletrequest} request implicit jsp request object
 * @param {String} name Name of cookie to see if exists
 * 
 * @return {String} value of cookie
 * 
 * @properties={typeid:24,uuid:"D7F75042-ACFA-4BFC-984D-F3F26FB3DDC2"}
 */
function WEB_COOKIE_value_get(request, name) {

	var cookies = request.getCookies()
	for ( var i in cookies ) {
		if (cookies[i].getName() == name) {
			return cookies[i].getValue()
		}
	}	
	return null

}

/**
 * Delete cookie from response. Note that cookie still exists in current request.
 * 
 * @param {Javax.servlet.http.httpservletresponse} response implicit jsp response obj 
 * @param {String} name Name of cookie to delete
 * 
 * @properties={typeid:24,uuid:"69DE3CBB-B513-4C89-BEEA-C9CBFC2C41A8"}
 */
function WEB_COOKIE_delete(response, name) {

	var cookie = new Packages.javax.servlet.http.Cookie(name,"")
	cookie.setMaxAge(0)
	response.addCookie(cookie)
	return cookie

}

/**
 * Set cookie with new value. Note that cookies still retains old value in current request.
 * 
 * @param {Javax.servlet.http.httpservletrequest} request Implicit jsp request object cookie is a part of
 * @param {javax.servlet.http.Cookie} cookie Cookie object to change
 * @param {String} value Set cookie value to this
 * 
 * @return {javax.servlet.http.Cookie} pointer to specific cookie or null
 * 
 * @properties={typeid:24,uuid:"EB605EF7-FEC4-4DE3-BC5F-52680CAB3A7B"}
 */
function WEB_COOKIE_value_set(response, name, value) {
	
	var cookie = new Packages.javax.servlet.http.Cookie(name, "")
	cookie.setValue(value)
	response.addCookie(cookie)
	return cookie

}

/**
 * @properties={typeid:24,uuid:"E97E5A2E-734D-4D7C-B3FF-9FDA95493B8F"}
 */
function WEB_sutra_trigger() {
	//any function that calls something in the CODE module comes through here first in the event that not running in data sutra framework
}
