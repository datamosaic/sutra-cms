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
var WEB_page_mode = 1;

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
 *
 * @properties={typeid:24,uuid:"0F1400C1-BD99-489E-B073-2E99A49076C3"}
 */
function globalTestFunction(msg,btnLabel) {

	plugins.dialogs.showInfoDialog("Global callback",msg,btnLabel);

}

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
 * Calculate the row background color.
 *
 * @param {Number} index row index
 * @param {Boolean} selected is the row selected
 * @param {String} elementType element type
 * @param {String} dataProviderID element data provider
 * @param {String} formName form name
 * @param {JSRecord} record selected record
 * @param {Boolean} edited is the record edited
 *
 * @returns {Color} row background color
 *
 * @properties={typeid:24,uuid:"100DFFE0-8CFA-4206-AE0C-51193FBFCE79"}
 */
function WEB_row_background(index, selected, elementType, dataProviderID, formName, record, edited) {
	//white/tan with medium blue highlighter

	var index = arguments[0]
	var selected = arguments[1]

	if (selected) {
		return '#BED7F7'
	}
	else {
		if (index % 2 == 0) {
			return '#F7F8EF'
		}
		else {
			return '#FFFFFF'
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
function WEB_MRKUP_link_page(pageID, siteURL, linkType) {
	
	var rewriteMode = forms.WEB_0F_install.rewrite_enabled
	
	//force to be index when rewrites disabled
	if (!rewriteMode) {
		linkType = 'Index'
	}
	
	var page = databaseManager.getFoundSet("sutra_cms","web_page")
	page.find()
	page.id_page = pageID
	var count = page.search()
	
	if (count && utils.hasRecords(page.web_page_to_site)) {
		
		//how requested
		var appServer = application.getServerURL()
		appServer = appServer.split(':')
		var accessURL = appServer[1].slice(2)
		if (appServer.length > 2) {
			var port = appServer[2]
		}
		
		//siteURL to use
		if (page.web_page_to_site.url) {
			siteURL = page.web_page_to_site.url
		}
		//fill localhost
		else {
			siteURL = accessURL //'localhost'
			
			//need to be going on index; edit always does this already
			if (linkType != 'Edit') {
				linkType = 'Index'
			}
		}
		
		//advanced apache setup, reference by correct url
		if (page.web_page_to_site.url_2) {
			siteURL = page.web_page_to_site.url_2
			port = null
		}
		//take port into consideration
			//MEMO: obviously, the port (if non-standard) is entered in the url_2 column above
		else {
			
		}
		
		if (page.flag_ssl) {
			siteURL = 'https://' + siteURL
		}
		else {
			siteURL = 'http://' + siteURL
		}
		
		if (port) {
			siteURL += ':' + port
		}
		
		//no url rewrite OR running off localhost and site name not specified as localhost
		if (!rewriteMode ||
			(utils.stringPatternCount(siteURL,"localhost") && page.web_page_to_site.url != "localhost") || 
			(utils.stringPatternCount(siteURL,"127.0.0.1") && page.web_page_to_site.url != "127.0.0.1")) {
			siteURL += '/sutraCMS'
		}
		
		var pageLink = siteURL + '/'
		
		//this is a link type of page, pageLink == its link
		if (page.page_type == 2 && page.page_link) {
			pageLink = page.page_link
		}
		//normal page, generate link
		else {
			if (!linkType) {
				linkType = page.web_page_to_site.pref_links
			}
			switch (linkType) {
				case "Index":
					pageLink += 'index.jsp?id=' + pageID
					break
				case "Folder":
					
					break
				case "Pretty":
					var fsPath = databaseManager.getFoundSet('sutra_cms','web_path')
					fsPath.find()
					fsPath.id_page = pageID
					fsPath.flag_default = 1
					var results = fsPath.search()
					
					if (!results) {
						fsPath.find()
						fsPath.id_page = pageID
						var results = fsPath.search()
					}
					
					var urlString = (results) ? fsPath.path : 'error'
					
					pageLink += urlString + '.html'
					break
				case "Edit":
					//selection set in site tree which will trigger a loading in the main workflow
					//jQuery changes on load
					pageLink += 'index_edit.jsp?id=' + pageID
					break
				default:
					pageLink += 'index.jsp?id=' + pageID
			}
		}
	}
	//TODO: call a general error page
	else {
		//trap for http(s) and tack on here to for consistency
		pageLink += 'error.html'
	}
	
	return pageLink
}

/**
 * @properties={typeid:24,uuid:"CF88AF63-45F2-4BC4-95BC-8E6D653A58BC"}
 */
function WEB_MRKUP_link_resources(obj) {
	//generate first part of url
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
		if (false && count && utils.hasRecords(area.web_area_to_editable) && area.web_area_to_editable.flag_new_block) {
			
			var newBlock = '<!-- add new block -->'
			newBlock += '<div id="add-' + areaID + '" class="block_new">'
			newBlock += '<a href="javascript:blockNew(\'' + areaID + '\')">Add block to ' + area.area_name + ' area</a>'
//			newBlock += '<form>'
//			newBlock += '<button onclick="blockNew(\'' + areaID + '\');return false;">New block</button>'
//			newBlock += '</form>'
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
			item.setMethodArguments(pageRec.id_page)
			
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
 * @properties={typeid:24,uuid:"CAFFDEF4-E756-44DD-95EB-11CFD202BE77"}
 */
function WEB_streaming_check() {
	if ( plugins.file.getDefaultUploadLocation() == "/" || plugins.file.getDefaultUploadLocation() == "C:\\") {
		return true
	}
	else {
		return false
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
	
	lockWorkflow = (typeof lockWorkflow == 'boolean') ? lockWorkflow : solutionPrefs.design.statusLockWorkflow
	lockList = (typeof lockList == 'boolean') ? lockList : solutionPrefs.design.statusLockList
	
	var baseForm = solutionPrefs.config.formNameBase
	
	//lock the workflow
	if (lockWorkflow) {
		
		var x = 0
		var y = 44		//offset for design mode and normal header
		var divider = 8
		
		var x2 = 0
		var y2 = 44
		
		//figure out location of curtain
		switch (solutionPrefs.config.activeSpace) {
			case 'standard':
				y2 += solutionPrefs.screenAttrib.spaces.standard.currentVertical
				
				if (solutionPrefs.config.flexibleSpace) {
					y2 += divider
				}
			case 'standard flip':
				x += solutionPrefs.screenAttrib.spaces.standard.currentHorizontal
				
				if (solutionPrefs.config.flexibleSpace) {
					x += divider
				}
				break
				
			case 'list':
			case 'list flip':
				x += solutionPrefs.screenAttrib.spaces.list.currentHorizontal
				
				if (solutionPrefs.config.flexibleSpace) {
					x += divider
				}
				
				if (solutionPrefs.config.activeSpace == 'list flip') {
					var nonList = true
				}
				break
				
			case 'vertical':
				x2 += solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalOne
				
				if (solutionPrefs.config.flexibleSpace) {
					x2 += divider
				}
			case 'vertical flip':
				x += solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalOne + solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalTwo
				
				if (solutionPrefs.config.flexibleSpace) {
					x += divider
				}
				break
				
			case 'centered':
				x2 += application.getWindowWidth(null) - solutionPrefs.screenAttrib.spaces.centered.currentHorizontalTwo
				
				if (solutionPrefs.config.flexibleSpace) {
					x2 += divider
				}
			case 'centered flip':
				x += solutionPrefs.screenAttrib.spaces.centered.currentHorizontalOne
				
				if (solutionPrefs.config.flexibleSpace) {
					x += divider
				}
				
				break
				
			case 'classic':
				x2 += solutionPrefs.screenAttrib.spaces.classic.currentHorizontal
				
				if (solutionPrefs.config.flexibleSpace) {
					x2 += divider
				}
			case 'classic flip':
				x += solutionPrefs.screenAttrib.spaces.classic.currentHorizontal
				y += solutionPrefs.screenAttrib.spaces.classic.currentVertical
				
				if (solutionPrefs.config.flexibleSpace) {
					x += divider
					y += divider
				}
				break
				
			case 'wide':
				x2 += solutionPrefs.screenAttrib.spaces.wide.currentHorizontal
				
				if (solutionPrefs.config.flexibleSpace) {
					x2 += divider
				}
			case 'wide flip':
				y += solutionPrefs.screenAttrib.spaces.wide.currentVertical
				
				if (solutionPrefs.config.flexibleSpace) {
					y += divider
				}
				break
				
			case 'workflow':
				if (solutionPrefs.config.activeSpace == 'workflow') {
					var nonList = true
				}
				break
				
			case 'workflow flip':
				if (!lockList) {
					forms[baseForm].elements.gfx_curtain.visible = false
					forms[baseForm].elements.gfx_curtain_2.visible = false
					return
				}
				else {
					nonList = true
				}
				break
		}
		
	//CURTAIN ONE
		//set location
		forms[baseForm].elements.gfx_curtain.setLocation(x,y)
		//set size
		forms[baseForm].elements.gfx_curtain.setSize(
								forms[baseForm].elements.tab_content_C.getWidth(),
								forms[baseForm].elements.tab_content_C.getHeight()
							)
		
		//turn on curtain
		forms[baseForm].elements.gfx_curtain.visible = true
	
	//CURTAIN TWO
		if (lockList && !nonList) {
			//set location
			forms[baseForm].elements.gfx_curtain_2.setLocation(x2,y2)
			//set size
			forms[baseForm].elements.gfx_curtain_2.setSize(
									forms[baseForm].elements.tab_content_B.getWidth(),
									forms[baseForm].elements.tab_content_B.getHeight()
								)
			
			//turn on curtain
			forms[baseForm].elements.gfx_curtain_2.visible = true
		}
		else {
			//turn off curtain
			forms[baseForm].elements.gfx_curtain_2.visible = false
		}
		
//		//turn off tabpanel
//		forms[baseForm].elements.tab_content_C.enabled = false
//				
//		//there is a form in tab panel
//		if (forms[baseForm].elements.tab_content_C.tabIndex) {
//			var formName = forms[baseForm].elements.tab_content_C.getTabFormNameAt(forms[baseForm].elements.tab_content_C.tabIndex)
//			
//			//if a subheader present, turn it on
//			if (forms[formName].elements.gfx_subheader) {
//				forms[formName].elements.gfx_subheader.enabled = true
//			}
//		}
	}
	//unlock the workflow
	else {
		//turn off curtains
		forms[baseForm].elements.gfx_curtain.visible = false
		forms[baseForm].elements.gfx_curtain_2.visible = false
		
//		//turn on tabpanel
//		forms[baseForm].elements.tab_content_C.enabled = true
	}
	
	//track state of workflow lockedness
	solutionPrefs.design.statusLockWorkflow = lockWorkflow
	solutionPrefs.design.statusLockList = lockWorkflow && lockList
}
}
