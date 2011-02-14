/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f18"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"4C8B4BD7-E187-4A00-9A77-C58FD3971691"}
 */
function CONTROLLER()
{
	// jsp implicit objects
	var app			= arguments[0]
	var session		= arguments[1]
	var request		= arguments[2]
	var response	= arguments[3]
	var mode		= arguments[4]
	
	// initialize good dataset to return to jsp
	var results = databaseManager.createEmptyDataSet(0,["key","value"])
	results.addRow(["cmsVersion","Sutra CMS - 2.0 alpha 1"])
	
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
 * @properties={typeid:24,uuid:"BD755ACA-11CF-4E17-9041-42853B2E14E4"}
 */
function CONTROLLER_session(obj) {

	// PROCESS: session management
	// TODO: do i need to punch session back in at the jsp level? don't think so
		// how to modify session in a block then? directly?

	// if logging turned on, record sesion and page access
	if ( obj.site.record.flag_logging ) {	

		// find matching session record 
		var session = obj.session.record
	
		var sn = databaseManager.getFoundSet("sutra_cms","web_session")
		sn.find()
		sn.session_id = session.getId()
		var count = sn.search()
		
		// get existing session record
		if (count == 1) {
			var record = sn.getRecord(1)
		}
		// create session record if it doens't already exist
		else {
			var record = sn.getRecord(sn.newRecord())
			// punch in created, modified and object
			record.rec_created = new Date(session.getCreationTime())
			record.rec_modified = new Date(session.getCreationTime())
			record.session_id = session.getId()
			record.organization_id = obj.page.record.organization_id
			databaseManager.saveData(record)
		}
		
		// create session_access record
		var recordSub 				= record.web_session_to_session_access.getRecord(record.web_session_to_session_access.newRecord())
		recordSub.rec_created 		= new Date(session.getLastAccessedTime())
		recordSub.rec_modified 		= new Date(session.getLastAccessedTime())
		recordSub.organization_id	= obj.page.record.organization_id
		recordSub.referrer			= obj.request.record.getHeader("referer")
		recordSub.url				= obj.request.record.getRequestURL()
		recordSub.id_page			= obj.page.record.id_page
		databaseManager.saveData(recordSub)
	
	}
		
}

/**
 *
 * @properties={typeid:24,uuid:"AFD23FBD-CE21-4C2C-BDA2-75C68969ACDB"}
 */
function CONTROLLER_builder(results, obj) {
	// AREA(S)	
	var markup = ''
	
	var areas = databaseManager.getFoundSet("sutra_cms","web_area")
	areas.find()
	areas.id_page = obj.page.record.id_page
	areas.id_group = obj.group.id
	areas.id_version = obj.snapshot.id
	var count = areas.search()
	if ( !count ) {
		// send results back to web client
		return results
	}
	else {
		areas.sort('row_order')
	}	

	// PROCESS: AREA
	for (var i = 0; i < areas.getSize(); i++) {
		
		var areaMarkup = ""
		
		databaseManager.refreshRecordFromDatabase(areas, i + 1)
		var area = areas.getRecord(i + 1)
		
		// obj: area
		obj.area.record	= area
		obj.area.id		= area.id_area
		obj.area.name	= area.area_name
		
		// BLOCK(S)
		var blocks = databaseManager.getFoundSet("sutra_cms","web_block")
		blocks.find()
		blocks.id_area = area.id_area
		var count = blocks.search()
		
		if ( count ) {
			blocks.sort("row_order")
		}
		
		// PROCESS: BLOCK
		for (var j = 0; j < blocks.getSize(); j++) {
			
			databaseManager.refreshRecordFromDatabase(blocks, j + 1)			
			var block = blocks.getRecord(j + 1)
			
			// obj: block
			obj.block.record	= block
			obj.block.id 		= block.id_block
			obj.block.params 	= block.params
			
			// BLOCK TYPE
			var type = databaseManager.getFoundSet("sutra_cms","web_block_type")
			type.find()
			type.id_block_type = block.id_block_type
			var count = type.search()
			
			//normal non-linked items
			if (!block.id_scrapbook) {
				// BLOCK DATA
				var data = databaseManager.getFoundSet("sutra_cms","web_block_data")
				data.find()
				data.id_block = block.id_block
				var count = data.search()
				
				// obj: data
				if (count) {
					for (var k = 0; k < data.getSize(); k++) {
						databaseManager.refreshRecordFromDatabase(data, k + 1)	
						var point = data.getRecord(k + 1)
						obj.data[point.data_key] = point.data_value
					}
				}
				
			}
			//this is a linked scrapbook
			else {
				
				//check for stuff
				if (utils.hasRecords(block.web_block_to_scrapbook) && utils.hasRecords(block.web_block_to_scrapbook.web_scrapbook_to_scrapbook_data)) {
					var data = block.web_block_to_scrapbook.web_scrapbook_to_scrapbook_data
					
					// obj: data
					for (var k = 0; k < data.getSize(); k++) {
						var point = data.getRecord(k + 1)
						obj.data[point.data_key] = point.data_value
					}
					
				}

			}
									
			// BLOCK DISPLAY
			var display = databaseManager.getFoundSet("sutra_cms","web_block_display")
			display.find()
			display.id_block_display = block.id_block_display
			var count = display.search()
			
			// MARKUP CALL
			// edit mode (needs div wrappers)
			if ( obj.type == "Edit" ) {
				var markupedData = forms[type.form_name][display.method_name](obj) || "<br>"
				areaMarkup += '<div id="sutra-block-data-' + block.id_block + '">\n'
				areaMarkup += markupedData + '\n'
				areaMarkup += "</div>\n"

			}
			// deployed (no divs)
			else {
				areaMarkup += forms[type.form_name][display.method_name](obj) + '\n'
			}	
			
			// obj: block...CLEAR
			obj.block.record	= ''
			obj.block.id 		= ''
			obj.block.params 	= ''
			
			// obj: data...CLEAR
			obj.data = {}
				
		}

	
		// add area to the results object
		results.addRow([area.area_name, globals.WEB_MRKUP_link_internal(areaMarkup,obj.request.server,obj.type,area.id_area)])
		
		// obj: area...CLEAR
		obj.area.record = ''
		obj.area.id = ''
		obj.area.name = ''
	
	}
	
}

/**
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
	var obj		= { site	: { record : '', id	: '', name	: '', tracking : ''},
	       		    group	: { record : '', id	: ''},
	       		    snapshot : { record : '', id : ''},
	       		    home	: { record : ''},
	       		    page	: { record : '', id	: '', name	: '', parent : '', attribute	: {}},
	       		    theme	: { directory : '', markup : { link : '' } },
	       		    area	: { record : '', id	: '', name	: ''},
	       		    block	: { record : '', id	: '', params : ''},   // TODO: allow for multiple params
	       		    data	: {},
	       		    form	: { get : {}, post : {}, validate : { error : 0 },
	       		    			multipart : { field : {}, file : {} }
	       		    			},
	       		    request	: { record : request, server : request.getServerName(), URI : request.getRequestURI(), query : request.getQueryString() },
	       		    session	: { record : session },
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
	var pageID 		= (request.getParameter("id")) ? utils.stringToNumber(request.getParameter("id")) : 0
	
	// these paramaters will be passed in when index_edit used (only internal to browser mode now)
		// TODO: track group in session based on login and pass to dispatcher
		// TODO: may add in ability to see snapshots on a live server
	var groupID		= (request.getParameter("group")) ? utils.stringToNumber(request.getParameter("group")) : 0
	var versionID	= (request.getParameter("snapshot")) ? utils.stringToNumber(request.getParameter("snapshot")) : 0
			
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

	
	// test cookie data
	var test = 0
	var cookies = request.getCookies()
	for ( var i in cookies ) {
		test ++
	}

	
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
	}
	
	// PAGE
	if ( pageID ) {
		var page = databaseManager.getFoundSet("sutra_cms","web_page")
		page.find()
		page.id_page = pageID
		var count = page.search()
		if (count != 1) {
			obj.error.code = 404
			obj.error.message = "No page with supplied ID found"
			return obj
		}
		else {
			databaseManager.refreshRecordFromDatabase(page, 1)
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
			databaseManager.refreshRecordFromDatabase(page, 1)
		}
		
		pageID = path.id_page
		
	}
	// request home page as nothing specifically requested
	else {
			
		var site = databaseManager.getFoundSet("sutra_cms","web_site")
		site.find()
		site.url = pageServer //"%" + pageServer + "%"
		var count = site.search()
		if (count != 1) {
			obj.error.code = 500
			obj.error.message = "No site found"
			return obj
		}
		
		var page = databaseManager.getFoundSet("sutra_cms","web_page")
		page.find()
		page.id_page = site.id_page
		var count = page.search()
		if (count != 1) {
			obj.error.code = 404
			obj.error.message = "No default page specified for this site"
			return obj
		}
		else {
			databaseManager.refreshRecordFromDatabase(page, 1)
		}
		
		pageID = page.id_page
	}
		
	//if a folder, grab child page
	if (page.page_type == 1) {
		//there is a published child page
		if (utils.hasRecords(page.web_page_to_page__child__publish)) {
			var pageID = page.web_page_to_page__child__publish.id_page
			
			page.find()
			page.id_page = pageID
			var count = page.search()
			
			groupID = 0
			versionID = 0			
		}
		else {
			obj.error.code = 404
			obj.error.message = "Folder has no children"
			return obj
		}
	}
	//a link, navigate there as a 301 response status
	else if (page.page_type == 2) {
		if (page.page_link) {
			var pageLink = page.page_link
		}
		else {
			obj.error.code = 404
			obj.error.message = "External link is blank"
			return obj
		}
		//		obj.response.record.sendRedirect(pageLink) // optional non-301 status redirect
		response.setStatus(301)
		response.setHeader("Location", pageLink)
		response.setHeader("Connection", "close")
	}
	
	// publishable...only matters for a live site
	if ( !editMode && !page.flag_publish ) {
		obj.error.code = 403
		obj.error.message = "Page not published"
		return obj
	}
	
	// obj: page
	obj.page.record	= page.getRecord(1)
	obj.page.id 	= page.id_page
	obj.page.name 	= page.page_name
	obj.page.parent	= page.parent_id_page
	
	// ATTRIBUTES
	var attributes = databaseManager.getFoundSet("sutra_cms","web_attribute")
	attributes.find()
	attributes.id_page = pageID
	var count = attributes.search()
	if (count) {
		// obj: attributes
		for (var i = 0; i < attributes.getSize(); i++) {
			databaseManager.refreshRecordFromDatabase(attributes, i + 1)
			var attribute = attributes.getRecord(i + 1)
			obj.page.attribute[attribute.attribute_key] = attribute.attribute_value
		}
	}

	// obj: site
	obj.site.record = page.web_page_to_site.getRecord(1)
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
		obj.home.record = page.web_page_to_site.web_site_to_page__home.getRecord(1)
	}
	
	// page title
	if ( page.title_override ) {
		results.addRow(["cmsTitle",page.title_override])
	}
	else if ( page.web_page_to_site.site_name_publish_flag ) {
			var windowTitle = ''
			if (page.web_page_to_site.site_name) {
				windowTitle += page.web_page_to_site.site_name
				
				if (page.web_page_to_site.site_name_publish_separator) {
					windowTitle += page.web_page_to_site.site_name_publish_separator
				}
				else {
					windowTitle += ' '
				}
			}
			windowTitle += page.page_name
			
			results.addRow(["cmsTitle", windowTitle])
		}
		else {
			results.addRow(["cmsTitle",page.page_name])
		}
	
	// HEAD & FOOTER INCLUDE STRING (note: relative path "up" from template directory where it is included from)
	if (editMode) {
		results.addRow(["cmsHead", "../../../../controllers/head_edit.jsp"])
		results.addRow(["cmsFooter", "../../../../controllers/footer_edit.jsp"])
	}
	else {
		results.addRow(["cmsHead", "../../../../controllers/head.jsp"]) 
		results.addRow(["cmsFooter", "../../../../controllers/footer.jsp"])
	}
	
	// SEO
	if ( page.description )	{
		results.addRow(["cmsDescription",page.description])
	}
	else {
		results.addRow(["cmsDescription",""])
	}
	if ( page.keywords ) {
		results.addRow(["cmsKeywords",page.keywords])
	}
	else {
		results.addRow(["cmsKeywords",""])
	}
	
	// SECURITY GROUP
	//if not specified, use group from this session
	var group = databaseManager.getFoundSet("sutra_cms","web_group")
	if (!groupID) {
		group.find()
		group.id_site = page.id_site
		var count = group.search()
		if (!count) {
			obj.error.code = 500
			obj.error.message = "No site groups setup"
			return obj
		}
		else {
			//put in order so oldest one is at top
			group.sort('rec_created asc')
			
			//select oldest one (aka everybody)
			group.setSelectedIndex(1)
			var groupID = group.id_group
		}
	}
	else {
		group.loadRecords(databaseManager.convertToDataSet([groupID]))
	}
	
	// obj: group
	obj.group.record = group.getRecord(1)
	obj.group.id = groupID
	
	// ACTIVE SNAPSHOT
	//if not specified, use active version
	var snapshot = databaseManager.getFoundSet("sutra_cms","web_version")
	if (!versionID) {
		snapshot.find()
		snapshot.id_page = page.id_page
		snapshot.flag_active = 1
		var count = snapshot.search()
		if (count != 1) {
			// TODO: insufficent access to view this page's content
			obj.error.code = 500
			obj.error.message = "No active snapshot"
			return obj
		}
		else {
			var versionID = snapshot.id_version
		}
	}
	else {
		snapshot.loadRecords(databaseManager.convertToDataSet([versionID]))
	}	
	
	obj.snapshot.record	= snapshot.getRecord(1)
	obj.snapshot.id		= versionID
	
	// THEME
	var theme = databaseManager.getFoundSet("sutra_cms","web_theme")
	theme.find()
	theme.id_theme = page.id_theme
	var count = theme.search()
	if (count != 1) {
		obj.error.code = 500
		obj.error.message = "No theme specified"
		return obj
	}
	
	// LAYOUT
	var layout = databaseManager.getFoundSet("sutra_cms","web_layout")
	layout.find()
	layout.id_layout = page.id_theme_layout
	var count = layout.search()
	if (count != 1) {
		obj.error.code = 500
		obj.error.message = "No layout specified"
		return obj
	}
	
	// theme directory with rewrites
	if (forms.WEB_0F_install.rewrite_enabled) {
		obj.theme.directory = "themes/" + theme.theme_directory
	}
	// theme directory without rewrites
	else {
		obj.theme.directory = "sites/" + page.web_page_to_site.directory + "/themes/" + theme.theme_directory
	}
	
	obj.theme.markup.link = obj.theme.directory
	
	//theme will be included on html, so accessed by client (external)
	results.addRow(["cmsThemeDirectory", obj.theme.directory])
	//layout will be referenced from within jsp, so internal and needs full path
	results.addRow(["cmsLayout", "sites/" + page.web_page_to_site.directory + "/themes/" + theme.theme_directory + "/" + layout.layout_path])
	
	return obj
}

/**
 *
 * @properties={typeid:24,uuid:"2421EBCC-CD1C-4ACF-BE86-02167F1EA742"}
 */
function CONTROLLER_error(obj) {

	var pageServer	= obj.request.server
	var message		= obj.error.message
	var mode		= obj.type

	// initialize bad dataset to return to the jsp
	var error =  databaseManager.createEmptyDataSet(0, ["error"])
	
	//display error message
	if (mode) {
		error.addRow([message])
		return error
	}
	//go to home page	//TODO: display error page
	else {
		var site = databaseManager.getFoundSet("sutra_cms","web_site")
		site.find()
		site.url = "%" + pageServer + "%"
		var count = site.search()
		
		if (count != 1) {
			error.addRow(["No site found"])
			return error
		}
		
		if (!site.id_page) {
			error.addRow(["No default page specified for this site"])
			return error
		}
		
		// redirect to the home page
		obj.response.record.sendRedirect(globals.WEB_MRKUP_link_page(site.id_page, pageServer))
		
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
 *
 * @properties={typeid:24,uuid:"08E5704D-04E5-4EFA-87C0-4D9CE6A46120"}
 */
function WEB_login()
{
	// user login, openID token received
	var token = arguments[0]
	                      
	// grab user info
	var post =	"https://rpxnow.com/api/v2/auth_info" +
				"?token=" + token +
				"&apiKey=3c6753884ce2f55648a64063c0e303fb31b427b9" +
				"&format=json"
	
	var json = plugins.http.getPageData(post)
	
	json += "}"
	
	var credentials = eval('(' + json + ')');
	
/* format example: success
{
  "profile": {
    "verifiedEmail": "datamosaic.david@gmail.com",
    "name": {
      "givenName": "David",
      "familyName": "Workman",
      "formatted": "David Workman"
    },
    "address": {
      "country": "United States"
    },
    "displayName": "datamosaic.david",
    "preferredUsername": "datamosaic.david",
    "providerName": "Google",
    "identifier": "https:\/\/www.google.com\/accounts\/o8\/id?id=AItOawk0E3ILNa1gMl4sHvtTLYT2JQUVjTEqyiY",
    "email": "datamosaic.david@gmail.com"
  },
  "stat": "ok"
}
*/
	
/* format example: success
{
  "err": {
    "msg": "Data not found",
    "code": 2
  },
  "stat": "fail"
}
*/
	
	// if no error
	if ( credentials.err ) {
		return credentials.err.msg
		// TODO: what happens to web page at this point?
	}
	
	// create user record if not found
	
	// return identifier (gets put in session)
	
	return token
}
