/**
 * @properties={typeid:35,uuid:"D055F5E5-A18B-459B-9D17-86A082C98715",variableType:-4}
 */
var WEB_block_page_mode = false;

/**
 * @properties={typeid:35,uuid:"669F48AD-6BF9-4038-A808-1A8530337316",variableType:-4}
 */
var WEB_block_on_select = true;

/**
 * Populate meta data for selected block.
 * 
 * @param	{String}	formName The block_type form.
 * @param	{String}	type The type of meta information we're interested in.
 * 
 * @returns	{JSObject}	Pretty names and methods for requested meta information.
 * 
 * @properties={typeid:24,uuid:"81DC790B-61A4-4895-BD4A-65F2BB1ABC21"}
 */
function WEBc_block_type_getMethods(formName, type) {
	var methods = forms[formName].allmethods
	
	var clientActionsBlock = {}
	var clientActionsPage = {}
	var webActions = {}
	var views = {}
	
	for (var i in methods) {
		if ( methods[i].substr(0,5) == "BLOCK" ) {
			clientActionsBlock[methods[i].substr(6,100)] = methods[i]
		}
		if ( methods[i].substr(0,4) == "PAGE" ) {
			clientActionsPage[methods[i].substr(5,100)] = methods[i]
		}
		else if ( methods[i].substr(0,3) == "WEB" ) {
			webActions[methods[i].substr(4,100)] = methods[i]
		}
		else if ( methods[i].substr(0,4) == "VIEW" ) {
			views[methods[i].substr(5,100)] = methods[i]
		}
		else if ( methods[i].substr(0,10) == "CONTROLLER" ) {
			views[methods[i].substr(11,100)] = methods[i]
		}
	}
	
	switch (type) {
		case "BLOCK":
			return clientActionsBlock
			break
		case "PAGE":
			return clientActionsPage
		case "WEB":
			return webActions
			break
		case "VIEW":
			return views
			break
		default:
			return {}
	}
}

/**
 * @properties={typeid:24,uuid:"2936E71A-50BF-4F06-A427-09EE918F273C"}
 */
function WEBc_block_form_refresh() {
//	//update display
//	if (globals.WEB_page_mode == 2) {
//		forms.WEB_0F_page__design_1F_version_2L_scope.ACTION_gui_mode_refresh()
//	}
//	else 
	if (globals.WEB_page_mode == 3) {
		forms.WEB_0F_page__browser_1F_block__editor.FORM_on_show()
	}
}

/**
 * (Dis)Allows the REC_on_select method to fire for a block.
 * 
 * @param {JSEvent} event Event that triggered onSelect of the block_type form.
 * 
 * @returns {Boolean} Run the method.
 * 
 * @properties={typeid:24,uuid:"E81AB531-F187-476A-9EE0-455D12DE6B5D"}
 */
function WEBc_block_enable(event) {
	
	var blockEnable = 
	//we're not in headless client
		application.getApplicationType() != APPLICATION_TYPES.HEADLESS_CLIENT &&
	//event is valid and called from a form
		event && event.getFormName && event.getFormName() && 
	//the foundset has records (don't fire when no block records)
		utils.hasRecords(forms[event.getFormName()].foundset) && 
	//selected block has a valid block type
		utils.hasRecords(forms[event.getFormName()].web_block_to_block_type) && 
	//either the edit form or the display form for said block type is calling the method (only run block_type code on correct block_type)
		(event.getFormName() == forms[event.getFormName()].web_block_to_block_type.form_name ||
		event.getFormName() == (forms[event.getFormName()].web_block_to_block_type.form_name_display || forms[event.getFormName()].web_block_to_block_type.form_name) ) &&
	//on_select not manually disabled
		globals.WEB_block_on_select
		
	return blockEnable
}

/**
 * Returns the correct web_block_data foundset to work with.
 * 
 * @param	{JSEvent}	event Event that triggered onSelect of the block_type form.
 * @param	{JSForm}	[formName] Scope where called from.
 * @param	{Object}	[obj] Object used to drive headless client.
 * 
 * @returns	{JSFoundset}	web_block_data foundset.
 * 
 * @properties={typeid:24,uuid:"C8DFEF81-D9D8-4742-96C3-3BA32FFCF62C"}
 */
function WEBc_block_getData(event, formName, obj) {
	//dummy foundset that will return 0 for size
	var fsBad = { getSize: function() {return 0}}
	
	//get from object (headless client)
	if (obj && obj.block && obj.block.record instanceof JSRecord) {
		/** @type {JSRecord<db:/sutra_cms/web_block_data>}*/
		return (utils.hasRecords(obj.block.record,'web_block_to_block_version.web_block_version_to_block_data')) ? obj.block.record.web_block_to_block_version.web_block_version_to_block_data : fsBad
	}
	//get from context (smart client)
	else {
		//get form from event
		if (!formName && event && event.getFormName) {
			formName = event.getFormName()
		}
		
		//we know where this is being called from
		if (formName) {
			//get the block record they were on
			/** @type {JSRecord<db:/sutra_cms/web_block>}*/
			var blockRec = forms[formName].foundset
			
			//on the page and not viewing page scrapbooks, just use active version
			if (globals.WEB_block_page_mode) {
				/** @type {JSRecord<db:/sutra_cms/web_block_data>}*/
				return (utils.hasRecords(blockRec,'web_block_to_block_version.web_block_version_to_block_data')) ? blockRec.web_block_to_block_version.web_block_version_to_block_data : fsBad
			}
			//on a scrapbook, go through all relation (selected index determines which version)
			else {
				/** @type {JSRecord<db:/sutra_cms/web_block_data>}*/
				return (utils.hasRecords(blockRec,'web_block_to_block_version__all.web_block_version_to_block_data')) ? blockRec.web_block_to_block_version__all.web_block_version_to_block_data : fsBad
			}
		}
		//return something empty so won't fail as hard
		else {
			return fsBad
		}
	}
}

/**
 * Returns the correct web_block_data_configure foundset to work with.
 * 
 * @param	{JSEvent}	event Event that triggered onSelect of the block_type form.
 * @param	{JSForm}	[formName] Scope where called from.
 * @param	{Object}	[obj] Object used to drive headless client.
 * 
 * @returns	{JSFoundset}	web_block_data_configure foundset.
 * 
 * @properties={typeid:24,uuid:"C8DFEF81-D9D7-4742-96C3-3BA32FFCF62C"}
 */
function WEBc_block_getConfig(event, formName, obj) {
	//dummy foundset that will return 0 for size
	var fsBad = { getSize: function() {return 0}}
	
	//get from object (headless client)
	if (obj && obj.block && obj.block.record instanceof JSRecord) {
		/** @type {JSRecord<db:/sutra_cms/web_block_data_configure>}*/
		return (utils.hasRecords(obj.block.record,'web_block_to_block_version.web_block_version_to_block_data_configure')) ? obj.block.record.web_block_to_block_version.web_block_version_to_block_data_configure : fsBad
	}
	//get from context (smart client)
	else {
		//get form from event
		if (!formName && event && event.getFormName) {
			formName = event.getFormName()
		}
		
		//we know where this is being called from
		if (formName) {
			//get the block record they were on
			/** @type {JSRecord<db:/sutra_cms/web_block>}*/
			var blockRec = forms[formName].foundset
			
			//on the page and not viewing page scrapbooks, just use active version
			if (globals.WEB_block_page_mode) {
				/** @type {JSRecord<db:/sutra_cms/web_block_data_configure>}*/
				return (utils.hasRecords(blockRec,'web_block_to_block_version.web_block_version_to_block_data_configure')) ? blockRec.web_block_to_block_version.web_block_version_to_block_data_configure : fsBad
			}
			//on a scrapbook, go through all relation (selected index determines which version)
			else {
				/** @type {JSRecord<db:/sutra_cms/web_block_data_configure>}*/
				return (utils.hasRecords(blockRec,'web_block_to_block_version__all.web_block_version_to_block_data_configure')) ? blockRec.web_block_to_block_version__all.web_block_version_to_block_data_configure : fsBad
			}
		}
		//return something empty so won't fail as hard
		else {
			return fsBad
		}
	}
}

/**
 * Returns the correct web_block_data_response foundset to work with.
 * 
 * @param	{JSEvent}	event Event that triggered onSelect of the block_type form.
 * @param	{JSForm}	[formName] Scope where called from.
 * @param	{Object}	[obj] Object used to drive headless client.
 * 
 * @returns	{JSFoundset}	web_block_data_response foundset.
 * 
 * @properties={typeid:24,uuid:"B0D3D289-08E8-4820-9998-70F18D96C9B0"}
 */
function WEBc_block_getResponse(event, formName, obj) {
	//dummy foundset that will return 0 for size
	var fsBad = { getSize: function() {return 0}}
	
	//get from object (headless client)
	if (obj && obj.block && obj.block.record instanceof JSRecord) {
		/** @type {JSRecord<db:/sutra_cms/web_block_data_response>}*/
		return (utils.hasRecords(obj.block.record,'web_block_to_block_version.web_block_version_to_block_data_response')) ? obj.block.record.web_block_to_block_version.web_block_version_to_block_data_response : fsBad
	}
	//get from context (smart client)
	else {
		//get form from event
		if (!formName && event && event.getFormName) {
			formName = event.getFormName()
		}
		
		//we know where this is being called from
		if (formName) {
			//get the block record they were on
			/** @type {JSRecord<db:/sutra_cms/web_block>}*/
			var blockRec = forms[formName].foundset
			
			//on the page and not viewing page scrapbooks, just use active version
			if (globals.WEB_block_page_mode) {
				/** @type {JSRecord<db:/sutra_cms/web_block_data_response>}*/
				return (utils.hasRecords(blockRec,'web_block_to_block_version.web_block_version_to_block_data_response')) ? blockRec.web_block_to_block_version.web_block_version_to_block_data_response : fsBad
			}
			//on a scrapbook, go through all relation (selected index determines which version)
			else {
				/** @type {JSRecord<db:/sutra_cms/web_block_data_response>}*/
				return (utils.hasRecords(blockRec,'web_block_to_block_version__all.web_block_version_to_block_data_response')) ? blockRec.web_block_to_block_version__all.web_block_version_to_block_data_response : fsBad
			}
		}
		//return something empty so won't fail as hard
		else {
			return fsBad
		}
	}
}

/**
 * @properties={typeid:24,uuid:"B82E9E1D-9201-47C8-8FF7-D606643DCD6A"}
 */
function WEBc_block_save() {
	//don't run when in real mode
	if (globals.WEB_page_mode != 3) {
		var formName = 'WEB_A__scrapbook'
		//on page gui detail
		if (globals.WEB_block_scope == 1 && globals.WEB_page_mode == 2 && forms.WEB_0F_page__design.elements.tab_main.tabIndex == 1) {
			formName = 'WEB_A__page'
		}
		
		//toggle upstream _editMode, but don't retrigger a save
		forms[formName].ACTION_save(null,true)
	}
}

/**
 * @properties={typeid:24,uuid:"44816F74-9845-4672-BE53-3D9C070DB6BC"}
 */
function WEBc_block_cancel() {
	//don't run when in real mode
	if (globals.WEB_page_mode != 3) {
		var formName = 'WEB_A__scrapbook'
		//on page gui detail
		if (globals.WEB_block_scope == 1 && globals.WEB_page_mode == 2 && forms.WEB_0F_page__design.elements.tab_main.tabIndex == 1) {
			formName = 'WEB_A__page'
		}
		
		//toggle upstream _editMode, but don't retrigger a save
		forms[formName].ACTION_cancel(null,true)
	}
}

/**
 * Can selected block be edited.
 * 
 * @returns {Boolean}	Edit-mode status.
 * 
 * @properties={typeid:24,uuid:"BDE6D35A-5AF8-43F4-9575-04EFC6594475"}
 */
function WEBc_block_getEdit() {
	//page scope
	if (globals.WEB_block_page_mode) {
		return forms.WEB_0F_page.ACTION_edit_get()
	}
	//scrapbook scope
	else {
		return forms.WEB_0F_block__scrapbook.ACTION_edit_get()
	}
}

/**
 * Return session data object given session ID and object key
 * 
 * @param {String} sessionID Pass in either session.getId() from web session object
 * or obj.session_server.record.session_id from controller object.
 * @param {String} dataKey Key name of data object to return
 * 
 * @returns {Object} Javascript object with your data or null.
 * 
 * @properties={typeid:24,uuid:"15B7A603-F30F-4772-9AF6-AA7BB70AAE83"}
 */
function WEBc_session_getData(sessionID, dataKey) {
	// get session	
	var snRec = globals.WEBc_session_getSession(sessionID)

	// find matching session data record 
	var sd = databaseManager.getFoundSet("sutra_cms","web_session_data")
	sd.find()
	sd.id_session = snRec.id_session
	sd.data_key = dataKey
	var count = sd.search()
	// get specified session data
	if (count == 1) {
		return sd.getRecord(1).data_value
	}
	else {
		return null
	}
}

/**
 * Store session data object given session ID and object key. Creates a record if needed.
 * 
 * @param {String} sessionID Pass in either session.getId() from web session object
 * or obj.session_server.record.session_id from controller object.
 * @param {String} dataKey Key name of data object to return
 * @param {Object} dataValue Javascript object to store
 * 
 * @returns {Object} Javascript object with your data.
 * 
 * @properties={typeid:24,uuid:"6839C1C3-962D-40B9-BE58-D22880BD5BBE"}
 */
function WEBc_session_setData(sessionID, dataKey, dataValue) {
	// get session	
	var snRec = globals.WEBc_session_getSession(sessionID)	
	
	// find matching session data record 
	var sd = databaseManager.getFoundSet("sutra_cms","web_session_data")
	sd.find()
	sd.id_session = snRec.id_session
	sd.data_key = dataKey
	var count = sd.search()	
	
	// get specified session data
	if (count != 1) {		
		// create session data record
		var sdRec = snRec.web_session_to_session_data.getRecord(snRec.web_session_to_session_data.newRecord())
		sdRec.data_key = dataKey
	}
	else {
		var sdRec = sd.getRecord(1)
	}
	// store data
	sdRec.data_value = dataValue
	databaseManager.saveData(sdRec)
	
	return dataValue
}

/**
 * Use this method from AJAX method calls where you know pass in session.getId().
 * Otherwise, pass in obj.session_server.record.session_id.
 * 
 * @param {Javax.servlet.http.httpsession} session Web session to pass in 
 * @returns {JSRecord} session record or null
 * 
 * @properties={typeid:24,uuid:"F2E852B4-71FA-4A91-A9BA-87781B082C6C"}
 */
function WEBc_session_getSession(sessionID) {
	
	// find matching session record 
	var sn = databaseManager.getFoundSet("sutra_cms","web_session")
	sn.find()
	sn.session_id = sessionID
	var count = sn.search()
	
	// get existing session record
	if (count == 1) {
		return sn.getRecord(1)
	}
	else {
		return null
	}	
}

/**
 * Delete cookie from response. Note that cookie still exists in current request.
 * 
 * @param {Javax.servlet.http.httpservletresponse} response implicit jsp response obj 
 * @param {String} name Name of cookie to delete
 * 
 * @properties={typeid:24,uuid:"69DE3CBB-B513-4C89-BEEA-C9CBFC2C41A8"}
 */
function WEBc_cookie_delete(response, name) {

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
function WEBc_cookie_setValue(response, name, value) {
	
	var cookie = new Packages.javax.servlet.http.Cookie(name, "")
	cookie.setValue(value)
	response.addCookie(cookie)
	return cookie

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
function WEBc_cookie_exists(request, name) {
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
function WEBc_cookie_new(response, name, value) {

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
function WEBc_cookie_getValue(request, name) {

	var cookies = request.getCookies()
	for ( var i in cookies ) {
		if (cookies[i].getName() == name) {
			return cookies[i].getValue()
		}
	}	
	return null

}

/**
 * @properties={typeid:24,uuid:"AFA318BF-7E29-4E7D-BE9D-CE4085851DF3"}
 */
function WEBc_markup_link_base(pageID, siteURL, siteLanguageRec) {
	//rewrite mode
	var rewriteMode = globals.WEBc_install_getRewrite()
	
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
	if (siteRec.url || (siteLanguageRec && siteLanguageRec.url)) {
		siteURL = siteRec.url
		
		//language as a domain
		if (siteLanguageRec && siteLanguageRec.url) {
			siteURL = siteLanguageRec.url
		}
	}
	//use whatever url the request came in on
	else {
		siteURL = (accessURL == '127.0.0.1') ? 'localhost' : accessURL
	}
	
//	//advanced apache setup, reference by correct url
//	if (siteRec.url_2) {
//		siteURL = siteRec.url_2
//		port = null
//	}
//	//take port into consideration
//		//MEMO: obviously, the port (if non-standard) is entered in the url_2 column above
//	else {
//		
//	}
	
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
	
	//language as a folder
	if (rewriteMode && siteLanguageRec && siteLanguageRec.directory && !siteLanguageRec.flag_default) {
		siteURL += '/' + siteLanguageRec.directory
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
function WEBc_markup_link_resources(pageID, siteURL, linkType) {
	var siteDirectory = ''
	
	//rewrite mode
	var rewriteMode = globals.WEBc_install_getRewrite()
	
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
function WEBc_markup_link_internal(markup,siteURL,linkType,areaID,obj) {
	
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
		newMarkup	+= globals.WEBc_markup_link_page(id,siteURL,linkType,null,obj)
		
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
			var areaString = utils.stringReplace(areaID.toString(),'-','')
			
			var newBlock = '<!-- add new block -->'
			newBlock += '<div id="sutra-block-add-' + areaString + '" class="block_new">'
			newBlock += '<a href="javascript:blockNew(\'' + areaString + '\')">' + area.area_name.toUpperCase() + ': Add block</a>'
			newBlock += '</div>'
				
			markup += newBlock
		}
	}
	
	return markup

}

/**
 * @param pageID ID of the page to link to
 * @properties={typeid:24,uuid:"8D473D49-2039-49AC-B633-72E88E736CA9"}
 */
function WEBc_markup_link_page(pageID, siteURL, linkType, webMode, obj) {
	//get page requested
	if (pageID) {
		//particular language specified
		if (typeof pageID == 'string') {
			var reference = pageID.split('_')
			pageID = reference[0]
			var languageID = reference[1]
		}
		
		var fsPage = databaseManager.getFoundSet("sutra_cms","web_page")
		fsPage.find()
		fsPage.id_page = pageID.toString()
		var count = fsPage.search()
	}
	
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
			//internal link deleted or not published, error out
			else {
				pageRec = siteRec.web_site_to_page__error.getRecord(1)
				siteRec = pageRec.web_page_to_site.getRecord(1)
			}
		}
	}
	//no site specified, try to fail gracefully
	else {
		var pageRec = new Object()
		var siteRec = new Object()
	}
	
	//specific language specified for this link
	if (languageID) {
		var fsLanguage = databaseManager.getFoundSet("sutra_cms","web_language")
		fsLanguage.find()
		fsLanguage.id_language = languageID
		var count = fsLanguage.search()
		
		if (count) {
			var pageLanguageRec = fsLanguage.getRecord(1)
			var siteLanguageRec = pageLanguageRec.web_language_to_site_language.getRecord(1)
		}
	}
	else {
		//get the site's language record
		if (obj && obj.language && obj.language.record && utils.hasRecords(obj.language.record.web_language_to_site_language)) {
			var siteLanguageRec = obj.language.record.web_language_to_site_language.getRecord(1)
		}
		
		//get the page's language record
		if (pageRec && utils.hasRecords(pageRec.web_page_to_language) && siteLanguageRec) {
			//loop to find selected language
			for (var i = 1; i <= pageRec.web_page_to_language.getSize(); i++) {
				var languageRec = pageRec.web_page_to_language.getRecord(i)
				
				if (languageRec.id_site_language == siteLanguageRec.id_site_language) {
					var pageLanguageRec = languageRec
					break
				}
			}
		}
	}
	
	//find default language
	pageRec.web_page_to_language.sort('rec_created asc')
	var pageLanguageDefaultRec =  pageRec.web_page_to_language.getRecord(1)
	
	//get url up to sutraCMS directory
	var pageLink = globals.WEBc_markup_link_base(pageID, siteURL, siteLanguageRec)
	
	//this is an external link type of page, pageLink == its link
	if (pageRec.page_type == 2 && pageRec.page_link) {
		pageLink = pageRec.page_link
	}
	//page/folder within the cms, generate link
	else {
		//rewrite mode
		var rewriteMode = globals.WEBc_install_getRewrite()
		
		//use default link type if none specified
		if (!linkType) {
			linkType = siteRec.pref_links
		}
		
		//rewrite mode turned off and not edit mode
		//or no url for site and site language and not edit mode, use index
		if ((!rewriteMode && linkType != 'Edit') ||
			(!siteRec.url && !siteLanguageRec.url && linkType != 'Edit')) {
			
			linkType = 'Index'
		}
		
		switch (linkType) {
			case "Index":
				pageLink += 'index.jsp?id=' + pageRec.url_param
				
				//rewrite mode turned off and language specified is not the default
				if (siteLanguageRec && !rewriteMode && !siteLanguageRec.flag_default) {
					
					//pull from page's specified language
					if (pageLanguageRec) {
						var param = pageLanguageRec.url_param
					}
					//pullfrom page's default language
					else if (pageLanguageDefaultRec) {
						var param = pageLanguageDefaultRec.url_param
					}
					
					//a language parameter specified
					if (param) {
						pageLink += '&language=' + param
					}
				}
				
				break
			case "Folder":
				//on home page, don't specify a path
				if (siteRec.id_page__home == pageRec.id_page) {
					break
				}
				
				//get page stack
				var pageStack = globals.WEBc_markup_pages_up(null,null,pageRec)
				
				var folder = ''
				pageLanguageRec = null
				pageLanguageDefaultRec = null
				
				//loop over page stack to get folder structure
				for (var h = 0; h < pageStack.length; h++) {
					var folderRec = pageStack[h]
					
					//get the page's language record
					if (folderRec && utils.hasRecords(folderRec.web_page_to_language) && siteLanguageRec) {
						//loop to find selected language
						for (var i = 1; i <= folderRec.web_page_to_language.getSize(); i++) {
							var languageRec = folderRec.web_page_to_language.getRecord(i)
							
							if (languageRec.id_site_language == siteLanguageRec.id_site_language) {
								pageLanguageRec = languageRec
								break
							}
						}
					}
					
					//find default language
					folderRec.web_page_to_language.sort('rec_created asc')
					pageLanguageDefaultRec =  folderRec.web_page_to_language.getRecord(1)
					
					//are there paths configured for this page/language
					if (pageLanguageRec && utils.hasRecords(pageLanguageRec.web_language_to_path)) {
						//loop to find default
						for (var i = 1; i <= pageLanguageRec.web_language_to_path.getSize(); i++) {
							var pathRec = pageLanguageRec.web_language_to_path.getRecord(i)
							
							if (pathRec.flag_default == 1) {
								folder += pathRec.path
								break
							}
						}
					}
					//pull path from default page's language
					else if (pageLanguageDefaultRec && utils.hasRecords(pageLanguageDefaultRec.web_language_to_path)) {
						//loop to find default
						for (var i = 1; i <= pageLanguageDefaultRec.web_language_to_path.getSize(); i++) {
							var pathRec = pageLanguageDefaultRec.web_language_to_path.getRecord(i)
							
							if (pathRec.flag_default == 1) {
								folder += pathRec.path
								break
							}
						}
					}
					
					//add slash to all but last occurence
					if ( h < pageStack.length - 1) {
						folder += '/'
					}
				}
				
				pageLink += folder
				break
			case "Pretty":
				//on home page, don't specify a path
				if (siteRec.id_page__home == pageRec.id_page) {
					break
				}
				
				//are there paths configured for this page/language
				if (pageLanguageRec && utils.hasRecords(pageLanguageRec.web_language_to_path)) {
					//loop to find default
					for (var i = 1; i <= pageLanguageRec.web_language_to_path.getSize(); i++) {
						var pathRec = pageLanguageRec.web_language_to_path.getRecord(i)
						
						if (pathRec.flag_default == 1) {
							var pretty = pathRec.path
							break
						}
					}
				}
				//pull path from default page's language
				else if (pageLanguageDefaultRec && utils.hasRecords(pageLanguageDefaultRec.web_language_to_path)) {
					//loop to find default
					for (var i = 1; i <= pageLanguageDefaultRec.web_language_to_path.getSize(); i++) {
						var pathRec = pageLanguageDefaultRec.web_language_to_path.getRecord(i)
						
						if (pathRec.flag_default == 1) {
							var pretty = pathRec.path
							break
						}
					}
				}
				
				var urlString = (pretty) ? pretty : 'error'
				
				pageLink += urlString
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
 * Gives a token that will represent a Sutra CMS object appropriately, given the context from which called.
 * 
 * @param {JSRecord|String|UUID}	input The thing to be tokenized.
 * @param {String}					[tokenType] Type of CMS object. When passed a JSRecord, tokenType will be automatically determined.
 * 
 * @returns	{String}	Token to reference a Sutra CMS object.
 * 
 * @properties={typeid:24,uuid:"9726B488-8A41-44E9-B0D0-02EABA98587C"}
 */
function WEBc_markup_token(input,tokenType) {
	var token = null
	
	var tokenPage = '{DS:ID_'
	var tokenAsset = '{DS:IMG_'
	
	//no type specified, try to determine
	if (!tokenType) {
		if (input instanceof JSRecord) {
			switch (input.foundset.getDataSource()) {
				case 'db:/sutra_cms/web_page':	//page record
					tokenType = 'page'
					break
				case 'db:/sutra_cms/web_asset_instance':	//asset record
					tokenType = 'asset'
					break
				default:	//passed in a record from strange foundset
					
			}
		}
		//default to page
		else {
			tokenType = 'page'
		}
	}
	
	//prefix for token
	switch (tokenType) {
		case 'page':
			token = tokenPage
			break
		case 'asset':
			token = tokenAsset
			break
		default:
			return token
	}
	
	//passed in a page record
	if (input instanceof JSRecord && input.foundset.getDataSource() == 'db:/sutra_cms/web_page' && input.id_page) {
		token += input.id_page.toString()
	}
	//passed in an asset instance record
	else if (input instanceof JSRecord && input.foundset.getDataSource() == 'db:/sutra_cms/web_asset_instance' && input.id_asset_instance) {
		token += input.id_asset_instance.toString()
	}
	//passed in a (uuid) string
	else if (typeof input == 'string') {
		token += input
	}
	//passed in a uuid
	else if (input && typeof input.toString == 'function' && input.toString() && application.getUUID(input.toString())) {
		token += input.toString()
	}
	
	//suffix for token
	token += '}'
	
	return token
}

/**
 *
 * @properties={typeid:24,uuid:"D05AA53E-5D46-4534-A2AC-A55D700F29C0"}
 */
function WEBc_page_picker(method,elem,showLanguage) {
	function GET_page(pageRec) {
		if (utils.hasRecords(pageRec[relnPage])) {
			//check to see what languages this page has; give option when more than one
			if (showLanguage && utils.hasRecords(pageRec.web_page_to_language) && pageRec.web_page_to_language.getSize() > 1) {
				var languageArray = new Array()
				
				var oldDate = application.getServerTimeStamp()
				var defaultLang = 1
				
				for (var j = 1; j <= pageRec.web_page_to_language.getSize(); j++) {
					var languageRec = pageRec.web_page_to_language.getRecord(j)
					
					if (languageRec.rec_created < oldDate) {
						oldData = languageRec.rec_created
						defaultLang = j
					}
					
					var language = plugins.popupmenu.createCheckboxMenuItem(languageRec.language_name + "", method)
					language.setMethodArguments(pageRec.id_page.toString() + '_' + languageRec.id_language.toString(),pageRec,event)
					
					languageArray.push(language)
				}
				
				//flag which language is the default
//				languageArray[defaultLang - 1].label = languageArray[defaultLang - 1].label + ' (default)'
				languageArray[defaultLang - 1].setSelected(true)
				
				var item = plugins.popupmenu.createMenuItem('Choose parent (' + pageRec.page_name + ')', languageArray)
			}
			//only one language, options not required
			else {
				var item = plugins.popupmenu.createMenuItem('Choose parent (' + pageRec.page_name + ')', method)
				item.setMethodArguments(pageRec.id_page.toString(),pageRec,event)	
			}
			
			var subArray = new Array()
			
			subArray.push(
						//choose this page
							item,
						//blank line
							plugins.popupmenu.createMenuItem('-', method)
					)
			
			// turn off '----'
			subArray[1].setEnabled(false)
			
			for (var j = 1; j <= pageRec[relnPage].getSize(); j++ ) {
				subArray.push(GET_page(pageRec[relnPage].getRecord(j)))
			}
			
			return plugins.popupmenu.createMenuItem(pageRec.page_name + "", subArray)
		}
		else {
			//check to see what languages this page has; give option when more than one
			if (showLanguage && utils.hasRecords(pageRec.web_page_to_language) && pageRec.web_page_to_language.getSize() > 1) {
				var languageArray = new Array()
				
				pageRec.web_page_to_language.sort('web_language_to_site_language.language_name asc')
				
				var oldDate = application.getServerTimeStamp()
				var defaultLang = 1
				
				for (var j = 1; j <= pageRec.web_page_to_language.getSize(); j++) {
					var languageRec = pageRec.web_page_to_language.getRecord(j)
					
					if (languageRec.rec_created < oldDate) {
						oldDate = languageRec.rec_created
						defaultLang = j
					}
					
					var language = plugins.popupmenu.createCheckboxMenuItem(languageRec.language_name + "", method)
					language.setMethodArguments(pageRec.id_page.toString() + '_' + languageRec.id_language.toString(),pageRec,event)
					
					languageArray.push(language)
				}
				
				//tack on spacer
				language = plugins.popupmenu.createCheckboxMenuItem('-', method)
				language.setEnabled(false)
				languageArray.push(language)
				
				//tack on option to not specify language
				language = plugins.popupmenu.createCheckboxMenuItem('Don\'t specify a language', method)
				language.setMethodArguments(pageRec.id_page.toString(),pageRec,event)
				languageArray.push(language)
				
				//flag which language is the default
//				languageArray[defaultLang - 1].label = languageArray[defaultLang - 1].label + ' (default)'
				languageArray[defaultLang - 1].setSelected(true)
				
				var item = plugins.popupmenu.createMenuItem(pageRec.page_name + "", languageArray)
			}
			//only one language, options not required
			else {
				var item = plugins.popupmenu.createMenuItem(pageRec.page_name + "", method)
				item.setMethodArguments(pageRec.id_page.toString(),pageRec,event)	
			}
			
			//disable dividers
			if (item.text == '-') {
				item.setEnabled(false)
			}
			
			return item
		}
	}
	
	//get the element from event
	if (elem instanceof JSEvent) {
		var event = elem
		var formName = event.getFormName()
		var elemName = event.getElementName()
		
		if (formName && elemName) {
			elem = forms[formName].elements[elemName]
		}
	}
	//otherwise try to get from deprecated calls
	if (!elem) {
		elem = forms[application.getMethodTriggerFormName()].elements[application.getMethodTriggerElementName()]
	}
	
	//there is an element for this popup to be attached, build!
	if (elem != null) {
		globals.CODE_cursor_busy(true)
		
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
			
			globals.CODE_cursor_busy(false)
			
			//pop up the popup menu
		    plugins.popupmenu.showPopupMenu(elem, menu);
		}
		else {
			globals.CODE_cursor_busy(false)
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
function WEBc_page_new(pageName,pageType,parentID,themeID,layoutID) {
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
	
	//default values for selected site
	var siteDefaults = forms.WEB_0F_site.ACTION_get_defaults()
	
	//TODO: prompt to modify defaults (for example, logged in as spanish, only allowed to create spanish)
	
	//we have enough information to create a record
	if (siteDefaults) {
		
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
		
		var pageRec = fsPage.getRecord(fsPage.newRecord(false,true))
		
		//put this page in the correct place; there were other records
		
		//find current syblings (of parent rec or at the top level)
		fsPage.find()
		fsPage.parent_id_page = (parentRec) ? parentRec.id_page : '^='
		fsPage.id_site = (parentRec) ? parentRec.id_site : forms.WEB_0F_site.id_site
		var results = fsPage.search()
		
		//fill in columns of page
		pageRec.page_type = pageType
		pageRec.parent_id_page = (parentRec) ? parentRec.id_page : null
		pageRec.order_by = (parentRec) ? parentRec.web_page_to_page__child.getSize() + 1 : results + 1
		pageRec.id_site = (parentRec) ? parentRec.id_site : forms.WEB_0F_site.id_site
		pageRec.flag_publish = siteDefaults.record.flag_auto_publish
		
		//create platform record (theme and layout)
		var platformRec = pageRec.web_page_to_platform.getRecord(pageRec.web_page_to_platform.newRecord(false,true))
		platformRec.id_site_platform = siteDefaults.platform.id_site_platform
		platformRec.id_theme = themeID
		platformRec.id_layout = layoutID
		
		//create language record (page name and seo)
		var languageRec = pageRec.web_page_to_language.getRecord(pageRec.web_page_to_language.newRecord(false,true))
		languageRec.id_site_language = siteDefaults.language.id_site_language
		languageRec.page_name = pageName
		
		//create group record (nothing now)
		var groupRec = pageRec.web_page_to_group.getRecord(pageRec.web_page_to_group.newRecord(false,true))
		groupRec.id_site_group = siteDefaults.group.id_site_group
		
		//create 1st version for this triumvirate
		var fsVersion = databaseManager.getFoundSet('sutra_cms','web_version')
		fsVersion.clear()
		var newVersion = fsVersion.getRecord(fsVersion.newRecord(false,true))
		newVersion.id_platform = platformRec.id_platform
		newVersion.id_language = languageRec.id_language
		newVersion.id_group = groupRec.id_group
		newVersion.version_number = 1
		newVersion.flag_active = 1
		newVersion.version_name = 'Initial version'
		
		var fsPath = databaseManager.getFoundSet('sutra_cms','web_path')
		var siteID = pageRec.id_site
		
		//add in path for this page
		var pathNameWanted = languageRec.page_name || 'untitled-page'
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
		
		var recPath = languageRec.web_language_to_path.getRecord(languageRec.web_language_to_path.newRecord(false,true))
		recPath.flag_default = 1
		recPath.path = pathName
		recPath.id_site = siteID
		recPath.id_page = pageRec.id_page
		
		databaseManager.saveData()
		
		// get editable regions based on layout selected
		if (!utils.hasRecords(platformRec,'web_platform_to_layout.web_layout_to_editable')) {
			globals.CODE_cursor_busy(false)
			return
		}
		
		var layout = platformRec.web_platform_to_layout.getSelectedRecord()
		
		//create all areas for this layout, copying over existing content based on area name
		for (var i = 1; i <= layout.web_layout_to_editable.getSize(); i++) {
			//new area to create
			var editable =  layout.web_layout_to_editable.getRecord(i)
			
			var newArea = forms.WEB_0F_page__design_1F__header_display__version.AREA_new(editable,newVersion,i)
		}
		
		// finish up
		databaseManager.saveData()
		
		//set flag that need to update tree view on next load
		forms.WEB_0T_page._refresh = true
		
		//turn off feedback indicator if on
		if (globals.TRIGGER_progressbar_get() instanceof Array) {
			if (globals.TRIGGER_progressbar_get()[1] == 'Creating new page...') {
				globals.TRIGGER_progressbar_stop()
			}
		}
		globals.CODE_cursor_busy(false)
		
		return pageRec
	}
	//something wrong at the site level
	else {
		//not all defaults specified
		if (utils.hasRecords(forms.WEB_0F_page.foundset)) {
			plugins.dialogs.showErrorDialog(
							'Error',
							'The defaults are not set correctly for this site'
					)
		}
		//no site record
		else {
			plugins.dialogs.showErrorDialog(
							'Error',
							'You must add a site record first'
					)
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
function WEBc_markup_pages_up(obj, order, pageRec, pathRec) {
	
	//given a path (language); get primed
	if (pathRec) {
		pageRec = pathRec.web_path_to_language.web_language_to_page.getSelectedRecord()
		var siteLanguageRec = pathRec.web_path_to_language.web_language_to_site_language.getSelectedRecord()
	}
	//no record specified, lookup from obj
	else if (!pageRec) {
		pageRec = obj.page.record
	}
	
	var pages = [pageRec]
	var order = (order == "desc") ? order : "asc"
		
	while ( pageRec.parent_id_page ) {
		
		// reasign record var
		pageRec = pageRec.web_page_to_page__parent.getRecord(1)
		
		// store in return array
		if ( order == "asc" ) {
			pages.unshift(pageRec)
		}
		else {
			pages.push(pageRec)
		}
	}
	
	return pages
}

/**
 * @properties={typeid:24,uuid:"3DB0FF72-EDE1-4F86-8F2A-BCB288586DB8"}
 */
function WEBc_markup_pages_down(obj, record) {
	
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
	
	return pages
}

/**
 * @returns	{Boolean}	Status of rewrite mode.  Note: must be in sync with urlrewrite.
 * 
 * @properties={typeid:24,uuid:"7593B3FF-C349-48C0-893B-35A63738535D"}
 */
function WEBc_install_getRewrite() {
	var fsInstall = databaseManager.getFoundSet('sutra_cms','web_install')
	fsInstall.loadAllRecords()
	databaseManager.refreshRecordFromDatabase(fsInstall,0)
	
	if (utils.hasRecords(fsInstall) && fsInstall.rewrite_enabled) {
		return true
	}
	else {
		return false
	}
}

/**
 * @properties={typeid:24,uuid:"E97E5A2E-734D-4D7C-B3FF-9FDA95493B8F"}
 */
function WEBc_sutra_trigger() {
	//any function that calls something in the CODE module comes through here first in the event that not running in data sutra framework
}
