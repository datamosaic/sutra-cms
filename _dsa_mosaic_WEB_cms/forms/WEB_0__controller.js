/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f18"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * 
 * Entry point for all page requests. Returns all data and markup related to the 
 * requested page.
 * 
 * @param {Javax.servlet.http.ServletContext} app Data for all pages
 * @param {Javax.servlet.http.httpsession} session Data for user session
 * @param {Javax.servlet.http.httpservletrequest} request Data for page request
 * @param {Javax.servlet.http.httpservletresponse} response Data for page response
 * @param {String} mode URL parameter denoting whether in edit mode or not
 * 
 * @return {JSDataSet} results JSDataSet is cast to an IDataSet at the jsp level
 * 
 * @properties={typeid:24,uuid:"4C8B4BD7-E187-4A00-9A77-C58FD3971691"}
 */
function CONTROLLER(app, session, request, response, mode) {
	
	// initialize good dataset to return to jsp
	var results = databaseManager.createEmptyDataSet(0,["key","value"])
	results.addRow(["cmsVersion","Sutra CMS - 2.5 alpha 1"])
	
	// STEP 1: Setup
	var obj = CONTROLLER_setup(results, app, session, request, response, mode)
	
	// STEP 2: Session control
	if ( !obj.error.code ) {
		CONTROLLER_session(obj)
	}
	else {
		return CONTROLLER_error(obj)
	}
		
	// STEP 3: Page builder
	if ( !obj.error.code ) {
		CONTROLLER_builder(results, obj)
	}
	else {
		return CONTROLLER_error(obj)
	}
	
	// send results back to headless client
	if ( !obj.error.code ) {
		return results
	}
	else {
		return CONTROLLER_error(obj)
	}
}

/**
 *
 * Handles session management
 * 
 * @param {Object} obj Used to collect all data associated with the page record
 * 
 * @properties={typeid:24,uuid:"BD755ACA-11CF-4E17-9041-42853B2E14E4"}
 */
function CONTROLLER_session(obj) {

	// PROCESS: session management

	// if logging turned on, record session and page access
	if ( obj.site.record.flag_session ) {	

		// find matching session record 
		var sessionWeb = obj.session_web.record
	
		var sn = databaseManager.getFoundSet("sutra_cms","web_session")
		sn.find()
		sn.session_id = sessionWeb.getId()
		var count = sn.search()
		
		// get existing session record
		if (count == 1) {
			var sessionRec = sn.getRecord(1)
		}
		// create session record if it doens't already exist
		else {
			var sessionRec = sn.getRecord(sn.newRecord())
			// punch in created, modified and object
			sessionRec.rec_created = new Date(sessionWeb.getCreationTime())
			sessionRec.rec_modified = new Date(sessionWeb.getCreationTime())
			sessionRec.session_id = sessionWeb.getId()
			sessionRec.organization_id = obj.page.record.organization_id
			databaseManager.saveData(sessionRec)
		}
		
		obj.session_server.record = sessionRec
		
		// create session_access record
		var sessionAccessRec 					= sessionRec.web_session_to_session_access.getRecord(sessionRec.web_session_to_session_access.newRecord())
		sessionAccessRec.rec_created_client 	= new Date(sessionWeb.getLastAccessedTime())
		sessionAccessRec.rec_modified_client 	= new Date(sessionWeb.getLastAccessedTime())
		sessionAccessRec.organization_id		= obj.page.record.organization_id
		sessionAccessRec.referrer				= obj.request.record.getHeader("referer")
		sessionAccessRec.url					= obj.request.record.getRequestURL()
		sessionAccessRec.id_page				= obj.page.record.id_page
		sessionAccessRec.access_type			= "PAGE"
		databaseManager.saveData(sessionAccessRec)
	
	}		
}

/**
 * 
 * Collect all page data into "results" variable
 * 
 * @param {JSDataSet} results Object that will be returned to the jsp
 * @param {Object} obj Used to collect all data associated with the page record
 *   
 * @properties={typeid:24,uuid:"AFD23FBD-CE21-4C2C-BDA2-75C68969ACDB"}
 */
function CONTROLLER_builder(results, obj) {
	var markup = ''
	
	// AREA(S)	
	// refresh all areas from database
	if ( utils.hasRecords(obj.version.record,'web_version_to_area') ) {
		databaseManager.refreshRecordFromDatabase(obj.version.record.web_version_to_area, -1)
	}
	// send results back to headless client
	else {
		return results
	}
	
	// PROCESS: AREA
	for (var i = 1; i <= obj.version.record.web_version_to_area.getSize(); i++) {
		
		var areaMarkup = ""
		
		var area = obj.version.record.web_version_to_area.getRecord(i)
		
		// obj: area
		obj.area.record	= area
		obj.area.id		= area.id_area
		obj.area.name	= area.area_name
		
		// SCOPE(S)
		var scopes = area.web_area_to_scope
		databaseManager.refreshRecordFromDatabase(scopes, -1)
		
		// PROCESS: SCOPE
		for (var j = 1; j <= scopes.getSize(); j++) {
			var scope = scopes.getRecord(j)
			
			// the selected scope is published on the web or we're showing all blocks
			if (scope.flag_active || obj.allblocks) {
				
				// BLOCK(S)
				if (utils.hasRecords(scope.web_scope_to_block)) {
					databaseManager.refreshRecordFromDatabase(scope.web_scope_to_block, 0)
					var block = scope.web_scope_to_block.getSelectedRecord()
					
					// if no block, skip it
					if (!block) {
						if (obj.type == 'Edit') {
							areaMarkup += 'Error with block configuration\n<br />\n'
						}
						continue
					}
					// if no active version for this block, skip it
					else if (!utils.hasRecords(block,'web_block_to_block_version')) {
						if (obj.type == 'Edit') {
							var prettyBlock = block.block_name ? (' for "' + block.block_name + '" block') : ''
							areaMarkup += 'Error: No active block version' + prettyBlock + '\n<br />\n'
						}
						continue
					}
					
					// obj: block
					databaseManager.refreshRecordFromDatabase(block.web_block_to_block_version__all,-1)
					obj.block.record	= block
					obj.block.version	= block.web_block_to_block_version.getSelectedRecord()
					obj.block.id 		= block.id_block
					
					// BLOCK TYPE
					var type = obj.block.version.web_block_to_block_type
					databaseManager.refreshRecordFromDatabase(type,0)
					
					// BLOCK DATA
					var data = obj.block.version.web_block_version_to_block_data
					databaseManager.refreshRecordFromDatabase(data,-1)
					
					// obj: data
					if ( utils.hasRecords(data) ) {
						for (var k = 1; k <= data.getSize(); k++) {
							var point = data.getRecord(k)
							obj.data[point.data_key] = point.data_value
						}
					}
					
					// BLOCK CONFIGURATION
					var configureData = obj.block.version.web_block_version_to_block_data_configure
					databaseManager.refreshRecordFromDatabase(configureData,-1)
					
					// obj: configuration
					if ( utils.hasRecords(configureData) ) {
						for (var k = 1; k <= configureData.getSize(); k++) {
							var point = configureData.getRecord(k)
							obj.block_configure[point.data_key] = point.data_value
						}
					}
					
					// BLOCK RESPONSE
					var responseData = obj.block.version.web_block_version_to_block_data_response
					databaseManager.refreshRecordFromDatabase(responseData,-1)
					
					// obj: response
					if ( utils.hasRecords(responseData) ) {
						for (var k = 1; k <= responseData.getSize(); k++) {
							var point = responseData.getRecord(k)
							obj.block_response[point.data_key] = point.data_value
						}
					}
											
					// BLOCK DISPLAY
					var display = obj.block.version.web_block_to_block_display
					databaseManager.refreshRecordFromDatabase(display,0)
					
					// MARKUP CALL
					// edit mode (needs div wrappers)
					if ( obj.type == "Edit" ) {
						if (FX_method_exists(display.method_name,type.form_name)) {
							var markupedData = forms[type.form_name][display.method_name](obj, results) || "<br>"
						}
						else {
							var markupedData = 'Error with block configuration'
						}
						
						areaMarkup += '<div id="sutra-block-data-' + utils.stringReplace(block.id_block.toString(),'-','') + '">\n'
						areaMarkup += markupedData + '\n'
						areaMarkup += "</div>\n"
		
					}
					// deployed (no divs)
					else {
						if (FX_method_exists(display.method_name,type.form_name)) {
							areaMarkup += forms[type.form_name][display.method_name](obj, results) + '\n'
						}
						else {
							areaMarkup += 'Error with block configuration\n'
						}
					}	
					
					// obj: block...CLEAR
					obj.block.record	= ''
					obj.block.id 		= ''
					
					// obj: data...CLEAR
					obj.data = {}
				}
			}
		}

	
		// add area to the results object
		results.addRow([area.area_name, globals.WEBc_markup_link_internal(areaMarkup,obj.request.server,obj.type,area.id_area,obj)])
		
		// obj: area...CLEAR
		obj.area.record = ''
		obj.area.id = ''
		obj.area.name = ''
	
	}
	
}

/**
 *
 * Sets up the obj variable and gets all meta data for page.
 * 
 * @param {Object} obj Used to collect all data associated with the page record
 * 
 * @properties={typeid:24,uuid:"251216CD-208E-4A2A-8237-1196E2032EC1"}
 */
function CONTROLLER_setup(results, app, session, request, response, mode) {
	
	/* response object notes: can be used for creating HTTP Headers, creating cookies, setting content type and redirecting workflow
	* assign directly to response. ie:
	* 	response.sendRedirect("http://www.google.com") // will redirect to google
	* 	usefull for redirecting to login page if username/password fails
	* see also:
	* 	setContentType(), addCookie(Cookie), containsHeader(name), setHeader(name, value)
	*/

	/*
	 * INITIALIZE, SETUP, FORMS, COOKIES, PAGE DATA
	 */	
	
	// initialize data object passed to block markup methods
	var obj		= { site	: { record : '', path : '', id	: '', name	: '', tracking : ''},
	       		    page	: { record : '', id	: '', name	: '', parent : '', attribute	: {}},
	       		    platform: { record : '', id	: ''},
	       		    language: { record : '', id	: ''},
	       		    group	: { record : '', id	: ''},
	       		    version : { record : '', id : ''},
	       		    home	: { record : ''},
	       		    theme	: { directory : '', markup : { link : '' } },
	       		    area	: { record : '', id	: '', name	: ''},
	       		    block	: { record : '', version	: '', id	: ''},
	       		    data	: {},
	       		    block_configure : {},
	       		    block_response : {},
	       		    form	: { get : {}, post : {}, validate : { error : 0 },
	       		    			multipart : { field : {}, file : {} }
	       		    			},
	       		    request	: { record : request, server : request.getServerName(), URI : request.getRequestURI(), query : request.getQueryString() },
	       		    session_server : { record : ''},
	       		    session_web	: { record : session },
	       		    cookies : '',
	       		    response : { record : response },
	       		    app		: { record : app },
	       		    error	: { code : '', message : ''}
	}


	// directly expose some data points used in this method
	// TODO: remove some redundancy with obj
	var pageServer	= request.getServerName()
	var pageURI		= request.getRequestURI()
	var pageQuery	= request.getQueryString()
	var pagePath	= request.getParameter("path")
	var pageID 		= request.getParameter("id")
	
	// these paramaters will be passed in when index_edit used (only internal to browser mode now)
		// TODO: track group in session based on login and pass to dispatcher
		// TODO: may add in ability to see versions on a live server
	var platformID		= request.getParameter("platform")
	var languageID		= request.getParameter("language")
	var groupID		= request.getParameter("group")
	var versionID	= request.getParameter("version")
	
	// are we using rewrites or not
	var rewriteMode = globals.WEBc_install_getRewrite()
	
	// "get" form data (does not return "post" form data)
	var getPairs	= {}
	var items = (pageQuery) ? pageQuery.split("&") : new Array()
	for (var i = 0; i < items.length; i++) {
		var temp = (items[i]) ? items[i].split("=") : new Array()
		
		//there is something in the first slot, replace any remaining pluses with spaces
		if (temp[1]) {
			temp[1] = utils.stringReplace(temp[1], '+', ' ')
		}
		
		// don't include pretty or id parameters
		if (temp[0] != "pretty" && temp[0] != "id" && temp[0] != "") {
			// checkboxes pass in duplicate keys. if duplicate key, pass values as an array for that key
			if ( !getPairs[temp[0]]) {		
				getPairs[temp[0]] = unescape(temp[1])
			}
			else {
				var value = getPairs[temp[0]]
				// if value a string, convert to array, else add to array
				if ( typeof value == "string" ) {
					getPairs[temp[0]] = new Array(value, unescape(temp[1]))
				}
				else {
					value.push(unescape(temp[1]))	
				}
			}
		}
	}
	obj.form.get = getPairs
	
	// "post" form data (also returns "get" form data)
	var postParams  = request.getParameterNames()
	var postPairs	= {}
	while (postParams.hasMoreElements()) {
		var strParam = postParams.nextElement()
		//don't add in page navigation related paramaters
		if ( strParam != "pretty" && strParam != "id" && strParam != "" && request.getParameter(strParam)) {
	   		postPairs[strParam] = request.getParameter(strParam)
		}
	  }
	obj.form.post = postPairs

	
	// multipart form handling
	var contentType = request.getContentType()
	if ( (contentType != null) && (contentType.indexOf("multipart/form-data") >= 0) ) {
		
		var multipartField = {}
		var multipartFile	= {}
		
		var factory = new Packages.org.apache.commons.fileupload.disk.DiskFileItemFactory()
		var upload = new Packages.org.apache.commons.fileupload.servlet.ServletFileUpload(factory)
		var items = upload.parseRequest(request)
		
		var itr = items.iterator()
		while (itr.hasNext()) {
			var item = new Packages.org.apache.commons.fileupload.FileItem(itr.next())
			// check for checkbox match
			
			if (item.isFormField()) {
				// if checkbox, add to current value	
				if ( multipartField[item.getFieldName()] ) {
					multipartField[item.getFieldName()] += ", " + item.getString()
				}
				else {
					multipartField[item.getFieldName()] = item.getString()
				}
			}
			else {
				var fileName = item.getName()
				if ( fileName ) {
					multipartFile.file_name = fileName
					multipartFile.file_type = item.getContentType()	
		
					var tempFile = plugins.file.createTempFile(fileName.split('.')[0], fileName.split('.')[1])
					item.write(new java.io.File(tempFile))						
					multipartFile.file_blob = tempFile
					//					plugins.file.copyFile(multipartFile.file, "/Users/admin/Desktop/somethingPNGz.png")
				}
				else {
					multipartFile.file_blob = null
				}
			}
		}
		obj.form.multipart.field = multipartField
		obj.form.multipart.file = multipartFile
		
		
		/*
 		var inputStream = new java.io.DataInputStream(request.getInputStream());
		//we are taking the length of Content type data
		var formDataLength = request.getContentLength();
		
		var dataBytes =  new java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, formDataLength)	
		var byteRead = 0;
		var totalBytesRead = 0;
		//this loop converting the uploaded file into byte code
		while (totalBytesRead < formDataLength) {
			byteRead = inputStream.read(dataBytes, totalBytesRead, formDataLength);
			totalBytesRead += byteRead;
		}		
		
		var file = new java.lang.String(dataBytes);
		//for saving the file name
		var saveFile = file.substring(file.indexOf("filename=\"") + 10);
		saveFile = saveFile.substring(0, saveFile.indexOf("\n"));
		saveFile = saveFile.substring(saveFile.lastIndexOf("\\") + 1,saveFile.indexOf("\""));
		var lastIndex = contentType.lastIndexOf("=");
		var boundary = contentType.substring(lastIndex + 1,contentType.length);
		var pos;
		//extracting the index of file 
		pos = file.indexOf("filename=\"");
		pos = file.indexOf("\n", pos) + 1;
		pos = file.indexOf("\n", pos) + 1;
		pos = file.indexOf("\n", pos) + 1;
		var boundaryLocation = file.indexOf(boundary, pos) - 4;
//		var startPos = ((file.substring(0, pos)).getBytes()).length;
//		var endPos = ((file.substring(0, boundaryLocation)).getBytes()).length;
		var startPos = (file.substring(0, pos)).length;
		var endPos = (file.substring(0, boundaryLocation)).length;
		// creating a new file with the same name and writing the content in new file
		
		var fileOut = new java.io.FileOutputStream("/Users/admin/Desktop/somethingPNGi.png")
		fileOut.write(dataBytes, startPos, (endPos - startPos));
		fileOut.flush();
		fileOut.close();
		*/
		
		/*
		var tempFile = plugins.file.createTempFile('myfile','.rtf');
		var fos = java.io.FileOutputStream(tempFile.getAbsolutePath());
		*/

//		var multipartField = {}
//		var multipartFile	= {}
//		
//		var fu = new Packages.org.apache.commons.fileupload.DiskFileUpload()
//		fu.setSizeMax(5000000)
//		fu.setSizeThreshold(4096)
//		fu.setRepositoryPath("/tmp")
//		
//		var fileItems = fu.parseRequest(request)
//		var item = fileItems.iterator()
//		
//		while(item.hasNext()) {
//			var fi = new Packages.org.apache.commons.fileupload.FileItem(item.next())
//			if(fi.isFormField()) {
//				multipartField[fi.getFieldName()] = fi.getString()
//			}
//			else {
//						
//				var parts = fi.getName().split("/")
//				var fileName = parts[parts.length-1]	
//				
//				if ( fileName ) {
//					multipartFile.name = fileName
//					multipartFile.type = fi.getContentType()
//					var tempFile = plugins.file.createTempFile(fileName.split('.')[0], fileName.split('.')[1])
//					var savedFile = new java.io.File(tempFile)
//					fi.write(savedFile)		
//					multipartFile.file = savedFile
//				}
//				else {
//					multipartFile = null
//				}
//				
//			}
//		}
//		obj.form.multipart.field	= multipartField
//		obj.form.multipart.file		= multipartFile
		
		
		/*
		// get uploaded file
		var tempString = ""
		var c = 0	
		var i = 0
		var k = 100000000000
		var j = -1
		var m = 0
		var count = 0
		var eof = ""
		var fis = request.getInputStream()
		var byteArray = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 10000)
		while((c=fis.read())!=-1) {
			if ( k >= i ) {
				if ( i > 60 && c == 13 ) {
					count ++
					if ( count == 3 ) {
						k = i+1
					}	
				}
			}
			else {
				// TODO: trap for EOF instead of --
//				if ( c == 45 ) {
//					if ( (j + 1) == i) {
//						eof = "4545"
//					}
//					j = i
//				}
//				
//				if ( eof != "4545" ) {
//					fos.write(c)
//				}
				
				fos.write(c)		// binary file
				java.lang.reflect.Array.setByte(byteArray, m, c)
				// byteArray[m] = c
				m ++
			}
			tempString += utils.getUnicodeCharacter(c)  // txt file
			i++
		}
			
		var file = plugins.file.readFile(tempFile)
		
		plugins.file.writeFile("/Users/admin/Desktop/somethingPNG.png", file)
		
		// parse uploaded file data into multipart object
		var multipart = {}
		multipart.filename = utils.stringMiddle(tempString, 
			utils.stringPosition(tempString, '"', 0, 3) + 1, 
			(utils.stringPosition(tempString, '"', 0, 4)) - (utils.stringPosition(tempString, '"', 0, 3) + 1))
		multipart.contentType = utils.stringMiddle(tempString,
			utils.stringPosition(tempString, 'Type', 0, 1) + 6,
			(utils.stringPosition(tempString, '\n', 0, 3)) - (utils.stringPosition(tempString, 'Type', 0, 1) + 7))
		multipart.fileText = utils.stringMiddle(tempString,
			utils.stringPosition(tempString, '\n', 0, 4) + 1,
			1000000000)	
		multipart.fileBinary = file
		*/
	}

	
	// COOKIES
	// test cookie data
//	var cookies = request.getCookies()
//	for ( var i in cookies ) {
//		var x = cookies[i]
//	}
	
	obj.cookies = request.getCookies()

	
	// set flag that we're in edit mode
	if (mode && mode == 'Edit') {
		//this makes all links go through index_edit.jsp
		obj.type = 'Edit'
		
		//alert that we're in browser edit mode
		results.addRow(["cmsMode","Browser Edit Mode"])
		
		//edit mode is turned on
		if (getPairs.webmode == 'edit') {
			results.addRow(["cmsModeStatus","1"])
		}
		else {
			results.addRow(["cmsModeStatus","0"])
		}
		
		//variable for easy access
		var editMode = true
		
		// show all block datapoints
		obj.allblocks	= request.getParameter("showall") ? true : false
	}
	
	// PAGE
	if ( pageID ) {
		var page = databaseManager.getFoundSet("sutra_cms","web_page")
		page.find()
		page.url_param = pageID
		var count = page.search()
		if (count != 1) {
			obj.error.code = 404
			obj.error.message = "No page with supplied ID found"
			return obj
		}
		else {
			pageID = page.id_page
			databaseManager.refreshRecordFromDatabase(page, 0)
		}
	}
	else if (pagePath) {
		var site = databaseManager.getFoundSet("sutra_cms","web_site")
		site.find()
		site.url = pageServer //"%" + pageServer + "%"
		var count = site.search()
		if (count != 1) {
			obj.error.code = 500
			obj.error.message = "No site found"
			return obj
		}

		var path = databaseManager.getFoundSet("sutra_cms","web_path")
		path.find()
		path.path = pagePath
		path.id_site = site.id_site
		var count = path.search()
		if (count != 1) {
			obj.error.code = 404
			obj.error.message = "No web_path record found"
			return obj
		}
		var page = databaseManager.getFoundSet("sutra_cms","web_page")
		page.find()
		page.id_page = path.id_page
		var count = page.search()
		if (count != 1) {
			obj.error.code = 404
			obj.error.message = "No page with supplied path found"
			return obj
		}
		else {
			pageID = path.id_page
			databaseManager.refreshRecordFromDatabase(page, 0)
		}
	}
	// request home page as nothing specifically requested
	else {
		
		//if cms url left blank, assume localhost
		var findExt = false
		if (pageServer == 'localhost' || pageServer == '127.0.0.1') {
			findExt = true
		}
		
		var site = databaseManager.getFoundSet("sutra_cms","web_site")
		site.find()
		site.url = pageServer //"%" + pageServer + "%"
		var count = site.search()
		
		//try finding blank cms url
		if (!count && findExt) {
			site.find()
			site.url = '^='
			var count = site.search()
		}
		
		if (count != 1) {
			obj.error.code = 500
			obj.error.message = "No site found"
			return obj
		}
		
		var page = databaseManager.getFoundSet("sutra_cms","web_page")
		page.find()
		page.id_page = site.id_page__home
		var count = page.search()
		if (count != 1) {
			obj.error.code = 404
			obj.error.message = "No default page specified for this site"
			return obj
		}
		else {
			pageID = page.id_page
			databaseManager.refreshRecordFromDatabase(page, 0)
		}
	}
	
	// publishable...only matters for a live site
	if ( !editMode && !page.flag_publish ) {
		obj.error.code = 403
		obj.error.message = "Page not published"
		return obj
	}
		
	//if a folder, grab child page
	//keep traversing down the folder tree until first non-folder encountered
	while (page.page_type == 1) {
		if (page.flag_folder_children) {
			//refresh over all children in case one of them was activated
			databaseManager.refreshRecordFromDatabase(page.web_page_to_page__child,-1)
			
			//there is a published child page
			if (utils.hasRecords(page.web_page_to_page__child__publish)) {
				var pageID = page.web_page_to_page__child__publish.id_page
				
				page.find()
				page.id_page = pageID
				var count = page.search()
				
				databaseManager.refreshRecordFromDatabase(page, 0)
				
				platformID = null
				languageID = null
				groupID = null
				versionID = null		
			}
			else {
				obj.error.code = 404
				obj.error.message = "Folder has no children"
				return obj
			}
		}
		else {
			obj.error.code = 404
			obj.error.message = "Folder has no content"
			return obj
		}
	}
	
	//an external link, navigate there as a 301 response status
	if (page.page_type == 2) {
		if (page.page_link) {
			response.setStatus(301)
			response.setHeader("Location", page.page_link)
			response.setHeader("Connection", "close")
			
			//TODO: very important to not touch the response/results after connection closed; flagging this as error to make sure this doesn't happen...but we should trap for redirects as well
			obj.error.code = 301
			obj.type = true
//			obj.error.message = "Redirecting to external link"			
			return obj
		}
		else {
			obj.error.code = 404
			obj.error.message = "External link is blank"
			return obj
		}
	}
	//an internal link, go to that page
	else if (page.page_type == 3) {
		var fsPage = databaseManager.getFoundSet('sutra_cms','web_page')
		fsPage.find()
		fsPage.id_page = page.page_link_internal
		var count = fsPage.search()
		
		if (count && page.page_link_internal) {
			//this changes the url
			obj.response.record.sendRedirect(globals.WEBc_markup_link_page(page.page_link_internal))
		}
		else {
			obj.error.code = 404
			obj.error.message = "Internal link not valid"
				
			//this will show the error, comment out to go to default error/home page for this site
			obj.type = true
			return obj
		}
	}
	
	// obj: page
	obj.page.record	= page.getSelectedRecord()
	obj.page.id 	= page.id_page
	obj.page.parent	= page.parent_id_page
	
	// ATTRIBUTES
	if (utils.hasRecords(page.web_page_to_attribute)) {
		//refresh all attributes with latest data
		databaseManager.refreshRecordFromDatabase(page.web_page_to_attribute,-1)
		
		// obj: attributes
		for (var i = 1; i <= page.web_page_to_attribute.getSize(); i++) {
			var attribute = page.web_page_to_attribute.getRecord(i)
			obj.page.attribute[attribute.attribute_key] = attribute.attribute_value
		}
	}

	// obj: site
	databaseManager.refreshRecordFromDatabase(page.web_page_to_site,0)
	obj.site.record = page.web_page_to_site.getSelectedRecord()
	obj.site.id = page.id_site
	obj.site.name = page.web_page_to_site.site_name
	obj.site.tracking = page.web_page_to_site.google_tracking_code
	
	//need to set up google analytics for this page
	if (obj.site.tracking) {
		results.addRow(["cmsAnalytics",obj.site.tracking])
	}
	else {
		results.addRow(["cmsAnalytics",""])
	}
	
	// obj: home
	if ( utils.hasRecords(page.web_page_to_site.web_site_to_page__home )) {
		databaseManager.refreshRecordFromDatabase(page.web_page_to_site.web_site_to_page__home,0)
		obj.home.record = page.web_page_to_site.web_site_to_page__home.getSelectedRecord()
	}
	
	// PLATFORM
	// if not specified, use default platform
	var platformSite = databaseManager.getFoundSet("sutra_cms","web_site_platform")
	var platform = databaseManager.getFoundSet("sutra_cms","web_platform")
	
	// no platform specified
	if (!platformID) {
		platformSite.find()
		platformSite.id_site = page.id_site
		platformSite.flag_default = 1
		var count = platformSite.search()
		if (!count) {
			obj.error.code = 500
			obj.error.message = "No default site platform"
			return obj
		}
		else {
			platform.find()
			platform.id_site_platform = platformSite.id_site_platform
			platform.id_page = page.id_page
			var count = platform.search()
			
			// site default isn't present on this page, just grab the page default
			if (!count) {
				platform.find()
				platform.id_page = page.id_page
				var count = platform.search()
				
				if (count) {
					platform.sort('rec_created asc')
				}
			}
		}
	}
	// platform specified
	else {
		platform.find()
		platform.url_param = platformID
		var count = platform.search()
		
		//check to make sure that it is in the correct page
		if (!(count && platform.id_page == page.id_page)) {
			// return error that no such version
			obj.error.code = 500
			obj.error.message = "Platform requested does not exist"
			return obj
		}		
	}
	
	// obj: platform
	databaseManager.refreshRecordFromDatabase(platform,0)
	databaseManager.refreshRecordFromDatabase(platform.web_platform_to_theme,-1)
	databaseManager.refreshRecordFromDatabase(platform.web_platform_to_layout,-1)
	obj.platform.record = platform.getSelectedRecord()
	obj.platform.id = platform.id_platform
	
	
	// LANGUAGE
	// if not specified, use default language
	var languageSite = databaseManager.getFoundSet("sutra_cms","web_site_language")
	var language = databaseManager.getFoundSet("sutra_cms","web_language")
	
	// no language specified
	if (!languageID) {
		languageSite.find()
		languageSite.id_site = page.id_site
		languageSite.flag_default = 1
		var count = languageSite.search()
		if (!count) {
			obj.error.code = 500
			obj.error.message = "No default site language"
			return obj
		}
		else {
			language.find()
			language.id_site_language = languageSite.id_site_language
			language.id_page = page.id_page
			var count = language.search()
			
			// site default isn't present on this page, just grab the page default
			if (!count) {
				language.find()
				language.id_page = page.id_page
				var count = language.search()
				
				if (count) {
					language.sort('rec_created asc')
				}
			}
		}
	}
	// language specified
	else {
		language.find()
		language.url_param = languageID
		var count = language.search()
		
		//check to make sure that it is in the correct page
		if (!(count && language.id_page == page.id_page)) {
			// return error that no such version
			obj.error.code = 500
			obj.error.message = "Language requested does not exist"
			return obj
		}
	}
	
	// obj: language
	databaseManager.refreshRecordFromDatabase(language,0)
	obj.language.record = language.getSelectedRecord()
	obj.language.id = language.id_language
	obj.page.name 	= language.page_name
	
	
	// SECURITY GROUP
	// if not specified, use group from this session
	var groupSite = databaseManager.getFoundSet("sutra_cms","web_site_group")
	var group = databaseManager.getFoundSet("sutra_cms","web_group")
	
	// no group specified
	if (!groupID) {
		groupSite.find()
		groupSite.id_site = page.id_site
		groupSite.flag_default = 1
		var count = groupSite.search()
		if (!count) {
			obj.error.code = 500
			obj.error.message = "No default site group"
			return obj
		}
		else {
			group.find()
			group.id_site_group = groupSite.id_site_group
			group.id_page = page.id_page
			var count = group.search()
			
			// site default isn't present on this page, just grab the page default
			if (!count) {
				group.find()
				group.id_page = page.id_page
				var count = group.search()
				
				if (count) {
					group.sort('rec_created asc')
				}
			}
		}
	}
	// group specified
	else {
		group.find()
		group.url_param = groupID
		var count = group.search()
		
		//check to make sure that it is in the correct page
		if (!(count && group.id_page == page.id_page)) {
			// return error that no such version
			obj.error.code = 500
			obj.error.message = "Group requested does not exist"
			return obj
		}
	}
	
	// obj: group
	databaseManager.refreshRecordFromDatabase(group,0)
	obj.group.record = group.getSelectedRecord()
	obj.group.id = group.id_group
	
	
	// ACTIVE VERSION
	//if not specified, use active version
	var version = databaseManager.getFoundSet("sutra_cms","web_version")
	
	//version not specified (or incorrectly specified)
	if (!versionID) { 
		version.find()
		version.id_platform = platform.id_platform
		version.id_language = language.id_language
		version.id_group = group.id_group
		version.flag_active = 1
		var count = version.search()
		
		//check through all active languages to see if we have a different one to display
		if (count != 1) {
			version.find()
			version.id_platform = platform.id_platform
			version.id_group = group.id_group
			version.flag_active = 1
			var count = version.search()
			
			if (count != 1) {
				// TODO: insufficent access to view this page's content
				obj.error.code = 500
				obj.error.message = "No active version"
				return obj
			}
		}
	}
	//version was specified
	else {
		version.find()
		version.url_param = versionID
		var count = version.search()
		
		//check to make sure that it is in the correct page, platform, language, group
		if (!(count && utils.hasRecords(version.getSelectedRecord(),'web_version_to_platform') && 
			version.web_version_to_platform.id_page == page.id_page &&
			version.id_platform == platform.id_platform &&
			version.id_language == language.id_language &&
			version.id_group == group.id_group)) {
			
			// return error that no such version
			obj.error.code = 500
			obj.error.message = "Version requested does not exist"
			return obj
		}
	}
	
	// obj: version
	databaseManager.refreshRecordFromDatabase(version,0)
	obj.version.record	= version.getSelectedRecord()
	obj.version.id		= version.id_version
	
	// THEME
	if (!utils.hasRecords(obj.platform.record,'web_platform_to_theme')) {
		obj.error.code = 500
		obj.error.message = "No theme specified"
		return obj
	}
	
	// LAYOUT
	if (!utils.hasRecords(obj.platform.record,'web_platform_to_layout')) {
		obj.error.code = 500
		obj.error.message = "No layout specified"
		return obj
	}
	databaseManager.refreshRecordFromDatabase(obj.platform.record.web_platform_to_layout, 0)
	
	// theme directory with rewrites
	if (rewriteMode) {
		obj.theme.directory = "themes/" + obj.platform.record.web_platform_to_theme.theme_directory
	}
	// theme directory without rewrites
	else {
		obj.theme.directory = "sites/" + obj.site.record.directory + "/themes/" + obj.platform.record.web_platform_to_theme.theme_directory
	}
	
	obj.theme.markup.link = obj.theme.directory
	
	//theme will be included on html, so accessed by client (external)
	results.addRow(["cmsThemeDirectory", obj.theme.directory])
	//layout will be referenced from within jsp, so internal and needs full path
	results.addRow(["cmsLayout", "sites/" + obj.site.record.directory + "/themes/" + obj.platform.record.web_platform_to_theme.theme_directory + "/" + obj.platform.record.web_platform_to_layout.layout_path])
	
	// site directory with rewrites
	if (rewriteMode) {
		obj.site.path = ""
		results.addRow(["cmsSiteDirectory", obj.site.path])
	}
	// theme directory without rewrites
	else {
		obj.site.path = "sites/" + obj.site.record.directory
		results.addRow(["cmsSiteDirectory", obj.site.path])
	}
	
	// page-specific title
	if ( page.title_override ) {
		results.addRow(["cmsTitle",page.title_override])
	}
	// site-wide page name prefix
	else if ( obj.site.record.site_name_publish_flag ) {
		var windowTitle = ''
		if (obj.site.record.site_name) {
			windowTitle += obj.site.record.site_name
			
			// custom separator
			if (obj.site.record.site_name_publish_separator) {
				windowTitle += obj.site.record.site_name_publish_separator
			}
			// default separator
			else {
				windowTitle += ' '
			}
		}
		windowTitle += page.page_name
		
		results.addRow(["cmsTitle", windowTitle])
	}
	else {
		results.addRow(["cmsTitle",obj.page.name])
	}
	
	// HEAD & FOOT INCLUDE STRING (note: relative path "up" from template directory where it is included from)
	if (editMode) {
		results.addRow(["cmsHead", "../../../../controllers/head_edit.jsp"])
		results.addRow(["cmsFoot", "../../../../controllers/foot_edit.jsp"])
	}
	else {
		results.addRow(["cmsHead", "../../../../controllers/head.jsp"]) 
		results.addRow(["cmsFoot", "../../../../controllers/foot.jsp"])
	}
	
	// SEO
	if ( page.description )	{
		results.addRow(["seoDescription",page.description])
	}
	
	// go through all key value pairs for this particular language
		//TODO: modify the jsp to use only the ones passed in
	databaseManager.refreshRecordFromDatabase(obj.language.record.web_language_to_meta_data,-1)
	for (var i = 1; i <= obj.language.record.web_language_to_meta_data.getSize(); i++) {
		var record = obj.language.record.web_language_to_meta_data.getRecord(i)
		
		if (record.data_key) {
			var keyName = 'seo' + utils.stringInitCap(record.data_key)
			results.addRow([keyName,record.data_value])
		}
	}
	
	return obj
}

/**
 *
 * Gracefully handle page requests that don't resolve properly
 * 
 * @param {Object} obj Used to collect all data associated with the page record
 * 
 * @properties={typeid:24,uuid:"2421EBCC-CD1C-4ACF-BE86-02167F1EA742"}
 */
function CONTROLLER_error(obj) {

	var pageServer	= obj.request.server
	var message		= obj.error.message
	var mode		= obj.type

	// initialize bad dataset to return to the jsp
	var error =  databaseManager.createEmptyDataSet(0, ["error"])
	
	//display error message in edit mode or when running in developer
		//MEMO application.isInDeveloper doesn't work with headless client
	if (mode || (plugins.sutra && plugins.sutra.getWorkspace && plugins.sutra.getWorkspace())) {
		error.addRow([message])
		return error
	}
	//go to error page
	else {
		var site = databaseManager.getFoundSet("sutra_cms","web_site")
		site.find()
		site.url = "%" + pageServer + "%"
		var count = site.search()
		
		if (count != 1) {
			error.addRow(["No site found"])
			return error
		}
		
		if (!site.id_page__error) {
			error.addRow(["No error page specified for this site"])
			return error
		}
		
		// redirect to the error page
		obj.response.record.sendRedirect(globals.WEBc_markup_link_page(site.id_page__error, pageServer))
	}
}

/**
 *
 * @properties={typeid:24,uuid:"C719C418-AF46-4EC3-B634-12B40261D298"}
 */
function WEB_log_page()
{
	// log page
	var pageID 		= arguments[0]
	var identifier	= arguments[1]
	var loggedIn	= arguments[2]
}

/**
 * @properties={typeid:24,uuid:"41B5EBF3-8C67-40D3-9D33-F59D421623F0"}
 */
function FX_method_exists(methodName, formName) {
	//a method passed in to check
	if (methodName) {
		//a form specified
		if (formName) {
			//check for method existence on given form
			if (solutionModel.getForm(formName).getFormMethod(methodName)) {
				return true
			}
			else {
				return false
			}
		}
		//no form specified, at the global scope
		else {
			//check for global method existence
			if (solutionModel.getGlobalMethod(methodName)) {
				return true
			}
			else {
				return false
			}
		}
	}
	else {
		return false
	}
}
