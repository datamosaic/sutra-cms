/**
 * @properties={typeid:35,uuid:"24fde543-69cc-4de9-af47-7f7c22221f17"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"17B52E70-9BEE-4FB1-9130-4230482F07B4",variableType:4}
 */
var WEB_site_attribute_selected = null;

/**
 * @properties={typeid:35,uuid:"E3045B2B-BCFD-4C94-9CFA-2A03A15D4A86",variableType:-4}
 */
var WEB_site_group_selected = null;

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
 * @properties={typeid:35,uuid:"0A87FF80-7B76-4698-BE1D-BB2EA4BD64A8",variableType:4}
 */
var WEB_group_selected = null;

/**
 * @properties={typeid:35,uuid:"D6D519FE-CA06-4692-8E6A-839D67E42030",variableType:4}
 */
var WEB_layout_selected = null;

/**
 * @properties={typeid:35,uuid:"1119B023-A721-4730-B9BB-2A84E23BD49A",variableType:4}
 */
var WEB_page_id_area_selected = null;

/**
 * @properties={typeid:35,uuid:"F8DC6E97-B0B2-428F-B81D-DDED2F72899E",variableType:4}
 */
var WEB_page_id_block_selected = null;

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
 * @properties={typeid:35,uuid:"791D7FA7-752E-42BD-9BD8-90FDC1548242",variableType:4}
 */
var WEB_tag_kind = null;

/**
 * @properties={typeid:35,uuid:"7FD6CC67-86A3-4FAE-AB16-4DE9EFF77C50"}
 */
var WEB_version_description = null;

/**
 * @properties={typeid:35,uuid:"3C355CBF-793A-419E-8E2E-706F342BF920",variableType:-4}
 */
var WEB_version_name = null;

/**
 * @properties={typeid:35,uuid:"67573874-7FDD-44E8-AB32-C98860B9650C",variableType:4}
 */
var WEB_version_selected = null;

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
		globals.TRIGGER_interface_lock(false)
		
		if (forms[formName] && forms[formName].elements.gfx_curtain) {
			forms[formName].elements.gfx_curtain.visible = false
		}
	}
}

	
}

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
		
		//unfreeze screen
		globals.TRIGGER_interface_lock(false)
		
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
	
	//this is a link type of page, pageLink == its link
	if (pageRec.page_type == 2 && pageRec.page_link) {
		pageLink = pageRec.page_link
	}
	//normal page, generate link
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
				pageLink += 'index.jsp?id=' + pageID
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
				pageLink += 'index_edit.jsp?id=' + pageID
				
				if (webMode) {
					pageLink += '&webmode=edit'
				}
				
				break
			default:
				pageLink += 'index.jsp?id=' + pageID
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
			subArray[0].setMethodArguments(pageRec.id_page)
					
			// turn off '----'
			subArray[1].setEnabled(false)
			
			for (var j = 1; j <= pageRec[relnPage].getSize(); j++ ) {
				subArray.push(GET_page(pageRec[relnPage].getRecord(j)))
			}
			
			return plugins.popupmenu.createMenuItem(pageRec.page_name + "", subArray)
		}
		else {
			var item = plugins.popupmenu.createMenuItem(pageRec.page_name + "", method)
			item.setMethodArguments(pageRec.id_page,pageRec)
			
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
	fsPages.parent_id_page = 0
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
		//get the parent record
		if (parentID) {
			//find parent rec
			var fsPage = databaseManager.getFoundSet('sutra_cms','web_page')
			fsPage.find()
			fsPage.id_page = parentID
			var results = fsPage.search()
			
			if (results) {
				var parentRec = fsPage.getRecord(1)
			}
		}
		
		var newRecord = fsPage.getRecord(fsPage.newRecord(false,true))
		
		newRecord.page_name = pageName
		newRecord.page_type = pageType
		newRecord.parent_id_page = (parentRec) ? parentRec.id_page : 0
		newRecord.order_by = (parentRec) ? parentRec.web_page_to_page__child.getSize() + 1 : 1
		newRecord.id_site = (parentRec) ? parentRec.id_site : forms.WEB_0F_site.id_site
		
		//create one version
		var oneVersion = newRecord.web_page_to_version.getRecord(newRecord.web_page_to_version.newRecord(false,true))
		oneVersion.version_number = 1
		
		//update valuelists
		forms.WEB_0F_page__design.REC_on_select()
		
		//set theme
		newRecord.id_theme = themeID
		newRecord.id_theme_layout = layoutID
		
		databaseManager.saveData()
		
		//only create editable if enough information specified
		if (utils.hasRecords(newRecord,'web_page_to_layout.web_layout_to_editable')) {
			//group to create as
			//TODO: if they've sorted, this will not be the everybody/visitor group
			var recGroup = newRecord.web_page_to_site.web_site_to_group.getRecord(1)
			
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
						blockRec.params = tempEditableDefaultRec.params
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
								
								var configRec = tempEditableDefaultRec.web_editable_default_to_block_configure.getRecord(tempEditableDefaultRec.web_editable_default_to_block_configure.newRecord(false, true))
								databaseManager.saveData(configRec)
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
		
		//set flag that need to update tree view on next load
		forms.WEB_0T_page._refresh = 1
		
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
 *
 * @properties={typeid:24,uuid:"51A1F298-56F1-4D79-962F-795D222ED3CC"}
 */
function TEMP_replace_src_string() {
	
	// siteID input
	var siteID = forms.WEB_0D_site.id_site
	
	if (!siteID) return "no site selected"
	
	// grab the content data for specified site
	var dataset = databaseManager.getDataSetByQuery(
			"sutra_cms",
			"SELECT web_block_data.id_block_data FROM web_block_data, web_block, web_area, web_page, web_site \
			where web_block_data.id_block = web_block.id_block and \
			web_block.id_area = web_area.id_area and \
			web_area.id_page = web_page.id_page and \
			web_page.id_site = ?",
			[siteID],-1)
			
	if (!dataset.getMaxRowIndex()) return "no data found"
	
	// convert to foundset
	var fsBlockData = databaseManager.getFoundSet('sutra_cms', 'web_block_data')
	fsBlockData.loadRecords(dataset)
	
	// iterate over dataset
	for (var i = 1; i <= fsBlockData.getSize(); i++) {
		var record = fsBlockData.getRecord(i)
		if (record.data_value && record.data_value.search(/src="site\//) >= 0) {
			// replace regexp		
			record.data_value = record.data_value.replace(/src="site\//gi, 'src="sites/' + forms.WEB_0D_site.directory + '/')
			databaseManager.saveData(record)
		}
	}
	
	// cleanup
	plugins.dialogs.showInfoDialog( "Done", "Done")
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
//	forms.WEB_0F__content.controller.show()
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
