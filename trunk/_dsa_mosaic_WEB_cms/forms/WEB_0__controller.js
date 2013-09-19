/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f18"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * Entry point for all Sutra CMS page requests.
 * Returns all data and markup related to the requested page.
 *
 * @param {Javax.servlet.http.ServletContext} app Data for all pages.
 * @param {Javax.servlet.http.httpsession} session Data for user session.
 * @param {Javax.servlet.http.httpservletrequest} request Data for page request.
 * @param {Javax.servlet.http.httpservletresponse} response Data for page response.
 * @param {String} [mode] URL parameter denoting whether in edit mode or not.
 *
 * @return {JSDataSet} The JSDataSet is cast to an IDataSet at the jsp level.
 *
 * @properties={typeid:24,uuid:"4C8B4BD7-E187-4A00-9A77-C58FD3971691"}
 */
function CONTROLLER(app, session, request, response, mode) {
	// initialize CMS variable (would be nice if this worked correctly)
//	globals.CMS = eval(solutionModel.getGlobalVariable('CMS').defaultValue)

	// CMS Version
	var cmsVersion = "4.0b1"

	// initialize good dataset to return to jsp
	var results = databaseManager.createEmptyDataSet(0,["key","value"])
	results.addRow(["cmsVersion", "Sutra CMS - " + cmsVersion])

	// STEP 1: Setup
	CONTROLLER_setup(results, app, session, request, response, mode, cmsVersion)

	// STEP 2: Session control
	if ( !globals.CMS.data.error.code ) {
		CONTROLLER_session()
	}
	else {
		return CONTROLLER_error()
	}

	// STEP 3: Page builder
	if ( !globals.CMS.data.error.code ) {
		CONTROLLER_builder(results)
	}
	else {
		return CONTROLLER_error()
	}

	// send results back to headless client
	if ( !globals.CMS.data.error.code ) {
		// clear out obj
		delete globals.CMS.data

		return results
	}
	else {
		return CONTROLLER_error()
	}
}

/**
 *
 * Handles session management
 *
 * @properties={typeid:24,uuid:"BD755ACA-11CF-4E17-9041-42853B2E14E4"}
 * @AllowToRunInFind
 */
function CONTROLLER_session() {
	// assign main CMS object for easier reference
	var obj = globals.CMS.data

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
 * Collect all page data into "results" variable
 *
 * @param {JSDataSet}	results Dataset that will be returned to the jsp.
 *
 * @properties={typeid:24,uuid:"AFD23FBD-CE21-4C2C-BDA2-75C68969ACDB"}
 * @AllowToRunInFind
 */
function CONTROLLER_builder(results) {
	// assign main CMS object for easier reference
	/** @type {scopes.CMS._constant.objData} */
	var obj = globals.CMS.data

	// AREA(S)
	// refresh all areas from database
	if ( utils.hasRecords(obj.version.record,'web_version_to_area') ) {
		databaseManager.refreshRecordFromDatabase(obj.version.record.web_version_to_area, -1)
	}
	// don't proceed with markup; send results back to headless client
	else {
		return
	}

	/**
	 * Get markup for requested block.
	 *
	 * @param {JSRecord<db:/sutra_cms/web_scope>} scopeRec
	 *
	 * @return {String|undefined}
	 */
	function getMarkup(scopeRec) {
		var markupData = ''

		// the selected scope is !( published on the web or we're showing all blocks)
		if (!(scopeRec.flag_active || obj.allblocks)) {
			return markupData
		}
		else {
			// BLOCK(S)
			if (utils.hasRecords(scopeRec.web_scope_to_block)) {
				databaseManager.refreshRecordFromDatabase(scopeRec.web_scope_to_block, 0)
				var block = scopeRec.web_scope_to_block.getSelectedRecord()

				// if no block, skip it
				if (!block) {
					if (obj.type == 'Edit') {
						markupData += 'Error with block configuration\n<br />\n'
					}
					return markupData
				}
				// if no active version for this block, skip it
				else if (!utils.hasRecords(block,'web_block_to_block_version')) {
					if (obj.type == 'Edit') {
						var prettyBlock = block.block_name ? (' for "' + block.block_name + '" block') : ''
						markupData += 'Error: No active block version' + prettyBlock + '\n<br />\n'
					}
					return markupData
				}

				// obj: block
				databaseManager.refreshRecordFromDatabase(block.web_block_to_block_version__all,-1)
				obj.block.record	= block
				obj.block.version	= block.web_block_to_block_version.getSelectedRecord()
				obj.block.id 		= block.id_block

				// BLOCK TYPE
				var type = obj.block.record.web_block_to_block_type
				databaseManager.refreshRecordFromDatabase(type,0)
				var layout = type && type.block_category == scopes.CMS._constant.blockCategory.LAYOUT
				var builder = type && type.block_type == scopes.CMS._constant.blockType.BLOCKBUILDER

				// BLOCK DATA
				var blockData = obj.block.version.web_block_version_to_block_data
				databaseManager.refreshRecordFromDatabase(blockData,-1)

				// obj: data
				if ( utils.hasRecords(blockData) ) {
					for (var k = 1; k <= blockData.getSize(); k++) {
						var point = blockData.getRecord(k)
						obj.block_data[point.data_key] = point.data_value
					}
				}

				// BLOCK CONFIGURATION
				var configureData = obj.block.version.web_block_version_to_block_data_configure
				databaseManager.refreshRecordFromDatabase(configureData,-1)

				// obj: configuration
				if ( utils.hasRecords(configureData) ) {
					for (k = 1; k <= configureData.getSize(); k++) {
						point = configureData.getRecord(k)
						obj.block_configure[point.data_key] = point.data_value
					}
				}

				// BLOCK RESPONSE
				var responseData = obj.block.record.web_block_to_block_type.web_block_type_to_block_response
				databaseManager.refreshRecordFromDatabase(responseData,-1)

				// obj: response
				if ( utils.hasRecords(responseData) ) {
					for (k = 1; k <= responseData.getSize(); k++) {
						point = responseData.getRecord(k)
						// get data based on request type
						var data = ''
						if ( obj.form.get[point.column_name] ) {
							data = obj.form.get[point.column_name]
						}
						else if ( obj.form.post[point.column_name] ) {
							data = obj.form.post[point.column_name]
						}
						else if ( obj.form.multipart.field[point.column_name] ) {
							data = obj.form.multipart.field[point.column_name]
						}
						// assign data to response slot
						obj.block_response[point.column_name] = data
					}
				}

				// BLOCK DISPLAY
				var display = obj.block.version.web_block_version_to_block_display
				databaseManager.refreshRecordFromDatabase(display,0)

				// MARKUP CALL
				// edit mode (needs div wrappers)
				if ( obj.type == "Edit" ) {
					if (FX_method_exists(display.method_name,type.form_name)) {
						/** @type {String} */
						markupData = forms[type.form_name][display.method_name](obj, results) || "<br>"
					}
					else {
						markupData = 'Error with block configuration'
					}

					var blockString = utils.stringReplace(scopeRec.id_scope.toString(),'-','') + '-' + utils.stringReplace(block.id_block.toString(),'-','')

					//wrap as a scrapbook
					if (block.scope_type) {
						var description = '<span class="scopeDescription" title="' + application.getValueListDisplayValue('WEB_scope_type',block.scope_type) + ' scrapbook' + '">' + (block.block_name ? block.block_name : 'Scrapbook') + '</span>'
						//technically a layout can be a scrapbook
						if (layout) {
							description = '<span class="layoutDescription">' + display.display_name + '</span>' + description
						}
//						blockString = utils.stringReplace(scopeRec.id_scope.toString(),'-','')
						markupData = '<div id="sutra-block-data-' + blockString + '" scrapbook="true">' + description + '<a href="javascript:blockDelete(\'' + blockString + '\')" title="Delete layout" class="blockDelete"></a>' + markupData + '\n</div>'
					}
					//wrap as a layout
					else if (layout) {
						markupData = '<div id="sutra-block-data-' + blockString + '" layout="true"><span class="layoutDescription">' + (builder ? type.block_name : display.display_name) + '</span><a href="javascript:blockDelete(\'' + blockString + '\')" title="Delete layout" class="blockDelete"></a>' + markupData + '\n</div>'
					}
					//wrap as a block
					else {
						markupData = '<div id="sutra-block-data-' + blockString + '"><a href="javascript:blockDelete(\'' + blockString + '\')" title="Delete block" class="blockDelete"></a>\n' + markupData + '\n</div>'
					}
				}
				// deployed (no divs)
				else {
					if (FX_method_exists(display.method_name,type.form_name)) {
						markupData += forms[type.form_name][display.method_name](obj, results)
					}
					else {
						markupData += 'Error with block configuration'
					}
				}

				// if layout block return markup and merge with 'children'
				if (layout) {
					//get number of iterations for this layout block
					var loopSize = utils.stringPatternCount(markupData,'<<BLOCK>>')
					var blocks = new Array()

					//loop through all child scopes
					var parentScope = scopeRec
					for (var m = 1; m <= parentScope.web_scope_to_scope__child.getSize(); m++) {
						scopeRec = parentScope.web_scope_to_scope__child.getRecord(m)

						//block is active
						if (scopeRec.flag_active) {
							// obj: block...CLEAR
							obj.block.record	= null
							obj.block.id 		= null

							// obj: data...CLEAR
							obj.block_data = {}
							obj.block_configure = {}
							obj.block_response = {}

							var markup = getMarkup(scopeRec)

							//which slot does this go into?
							blocks[scopeRec.row_order - 1] = markup
						}
					}

					//fill empty slots in this block formatter
					for (m = 0; m < loopSize; m++) {
						//fill empty blocks with new button
						if ( obj.type == "Edit" ) {
							var areaScope = utils.stringReplace(areaRec.id_area.toString(),'-','') + '-' + utils.stringReplace(parentScope.id_scope.toString(),'-','') + '-' + (m + 1)

							var newBlock = '<!-- add new block -->'
							var breadcrumb = 'Add block to ' + display.display_name
							newBlock += '<div id="sutra-block-add-' + areaScope + '" class="block_new" style="min-width:' + (100/loopSize - 2) + '%">\n'
							newBlock += '<a href="javascript:blockNew(\'' + areaScope + '\')" title="' + breadcrumb + '">New block</a>'
							newBlock += '</div>\n'
						}
						//non-null value
						else {
							newBlock = ''
						}

						//there isn't anything in this slot, put in a new block button
						if (blocks[m] == null) {
							blocks[m] = newBlock
						}
					}

					//fill in the slots
					var regex= /<<BLOCK>>/g
					var matches
					m = 0
					while (matches = regex.exec(markupData)) {
						markupData = utils.stringIndexReplace(markupData,matches.index,10,blocks[m++])
					}
				}
				// return and continue
				else {
					markupData += '\n'

					// obj: block...CLEAR
					obj.block.record	= null
					obj.block.id 		= null

					// obj: data...CLEAR
					obj.block_data = {}
					obj.block_configure = {}
					obj.block_response = {}
				}

				return markupData
			}
			//scope disconnected from block, skip and keep on going
			else {
				return markupData
			}
		}
	}

	// PROCESS: AREA
	for (var i = 1; i <= obj.version.record.web_version_to_area.getSize(); i++) {

		var areaMarkup = ""

		var areaRec = obj.version.record.web_version_to_area.getRecord(i)

		// obj: area
		obj.area.record	= areaRec
		obj.area.id		= areaRec.id_area
		obj.area.name	= areaRec.area_name

		// SCOPE(S) only parent scopes
		/** @type {JSFoundSet<db:/sutra_cms/web_scope>} */
		var fsScope = databaseManager.getFoundSet('db:/sutra_cms/web_scope')
		fsScope.find()
		fsScope.id_area = areaRec.id_area
		fsScope.parent_id_scope = '^='
		fsScope.search()
		databaseManager.refreshRecordFromDatabase(fsScope, -1)
		fsScope.sort('row_order asc')

		// PROCESS: SCOPE
//		var j = 1
//		while (j <= fsScope.getSize()) {
		for (var j = 1; j <= fsScope.getSize(); j++) {
			var scopeRec = fsScope.getRecord(j)

			//kick in the first time
			var markup = getMarkup(scopeRec)

			//only add this markup if something is there
			if (markup) {
				areaMarkup += markup
			}
		}

		//tack on add new block button if editable
		//this is linked up to a theme editable and set to allow records to be created
		if (obj.type == 'Edit' && utils.hasRecords(areaRec.web_area_to_editable) && areaRec.web_area_to_editable.flag_new_block) {
			var areaString = utils.stringReplace(areaRec.id_area.toString(),'-','')

			var newBlock = '<!-- add new block -->'
			var breadcrumb = 'Add block to ' + globals.CODE_text_initial_caps(areaRec.area_name)
			newBlock += '<div id="sutra-block-add-' + areaString + '" class="block_new">\n'
			newBlock += '<a href="javascript:blockNew(\'' + areaString + '\')" title="' + breadcrumb + '">New block</a>'
			newBlock += '</div>\n'

			areaMarkup += newBlock
		}

		// replace out place holders (DS_* links)
		areaMarkup = globals.WEBc_markup_link_internal(areaMarkup,obj.request.server,obj.type,areaRec.id_area,obj)

		// add area to the results object
		results.addRow([areaRec.area_name, areaMarkup])

		// obj: area...CLEAR
		obj.area.record = ''
		obj.area.id = ''
		obj.area.name = ''
	}
}

/**
 * Sets up the globals.CMS.data variable and gets all meta data for page.
 *
 * @param {JSDataSet}	results Dataset that will be returned to the jsp.
 * @param {Javax.servlet.http.ServletContext} app Data for all pages.
 * @param {Javax.servlet.http.httpsession} session Data for user session.
 * @param {Javax.servlet.http.httpservletrequest} request Data for page request.
 * @param {Javax.servlet.http.httpservletresponse} response Data for page response.
 * @param {String} [mode] URL parameter denoting whether in edit mode or not.
 * @param {String} cmsVersion cms current version number
 *
 * @properties={typeid:24,uuid:"251216CD-208E-4A2A-8237-1196E2032EC1"}
 * @AllowToRunInFind
 */
function CONTROLLER_setup(results, app, session, request, response, mode, cmsVersion) {

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
	var obj =
		globals.CMS.data = {
					site	: { record : '', path : '', id	: '', name	: '', tracking : ''},
	       		    page	: { record : '', id	: '', name	: '', parent : '', attribute	: {}},
	       		    platform: { record : '', id	: ''},
	       		    language: { record : '', id	: ''},
	       		    group	: { record : '', id	: ''},
	       		    version : { record : '', id : ''},
	       		    home	: { record : ''},
	       		    theme	: { directory : '', markup : { link : '' } },
	       		    area	: { record : '', id	: '', name	: ''},
	       		    block	: { record : '', version	: '', id	: ''},
	       		    block_data		: {},
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
	       		    error	: { code : '', message : ''},
	       		    cmsVersion : cmsVersion,
					type	: ''
			}

	// directly expose some data points used in this method
	var pageServer	= request.getServerName()
	var pageURI		= request.getRequestURI()
	var pageQuery	= request.getQueryString()
	var pagePath	= (request.getAttribute("path")) ? request.getAttribute("path").replace(/\/$/,'') : null // strip trailing forward slash
	var pageID 		= request.getParameter("id")
	var platformID	= request.getParameter("platform")
	var languageID	= request.getParameter("language")
	var languageName= request.getAttribute("language")
	// TODO: track group in session based on login and pass to dispatcher
	var groupID		= request.getParameter("group")
	// TODO: may add in ability to see versions on a live server
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


	// set flag that we're in edit/cache mode
	if (mode) {
		if (mode == 'Edit') {
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
		else if (mode == 'Cache') {
			//variable for easy access
			var cacheMode = true
		}
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
			return
		}
		else {
			pageID = page.id_page
			databaseManager.refreshRecordFromDatabase(page, 0)
		}
	}
	else if (pagePath) {
		var site = databaseManager.getFoundSet("sutra_cms","web_site")
		site.find()
		site.url = pageServer
		var count = site.search()

		//no site found, but we know what language this is requested on
		if (languageName && count != 1) {
			var siteLanguage = databaseManager.getFoundSet("sutra_cms","web_site_language")
			siteLanguage.find()
			siteLanguage.language_code = languageName
			var count = siteLanguage.search()

			if (count != 1) {
				obj.error.code = 500
				obj.error.message = "No site found"
				return
			}
			else {
				site.loadRecords([siteLanguage.id_site])
			}
		}
		//no site found
		else if (count != 1) {
			obj.error.code = 500
			obj.error.message = "No site found"
			return
		}

		//if first character is a slash (it will be), trim
		if (pagePath[0] == '/') {
			pagePath = pagePath.substr(1)
		}

		//get last page in folder tree
		var pagePathPages = pagePath.split('/')

		//find all pages that have the same path as the last page requested
		var path = databaseManager.getFoundSet("sutra_cms","web_path")
		path.find()
		path.path = pagePathPages[pagePathPages.length - 1]
		path.id_site = site.id_site
		var count = path.search()

		//TODO: step through this code and make more restrictive (will catch too many paths that don't exist)
		//loop over found pages to find one at the correct place in the hierarchy
		loop_potential:
		for (var i = 1; i <= path.getSize(); i++) {
			var record = path.getRecord(i)
			var pageFound = false

			//get page stack
			var pageStack = globals.WEBc_markup_pages_up(null,null,null,record)

			//comapre all possible paths for this page with this slot in pagePathPages
			loop_page:
			for (var j = 0; j < pageStack.length; j++) {
				var pathPageRec = pageStack[j]
				var pathFound = false

				loop_language:
				for (var k = 1; k <= pathPageRec.web_page_to_language.getSize(); k++) {
					var pathLanguageRec = pathPageRec.web_page_to_language.getRecord(k)

					loop_path:
					for (var l = 1; l <= pathLanguageRec.web_language_to_path.getSize(); l++) {
						var pathPathRec = pathLanguageRec.web_language_to_path.getRecord(l)

						//if (pathPathRec.path == pagePathPages[j]) {
						if (pathPathRec.path == pagePathPages[pagePathPages.length - 1]) {
							pathFound = true
							continue loop_page
						}
					}
				}
			}

			if (j == pageStack.length && pathFound) {
				pageID = pathPageRec.id_page
			}
		}

		if (!pageID) {
			obj.error.code = 404
			obj.error.message = "No web_path record found"
			return
		}

		var page = databaseManager.getFoundSet("sutra_cms","web_page")
		page.find()
		page.id_page = pageID
		var count = page.search()

		if (count != 1) {
			obj.error.code = 404
			obj.error.message = "No page with supplied path found"
			return
		}
		else {
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
		site.url = pageServer
		var count = site.search()

		//try finding blank cms url
		if (!count && findExt) {
			site.find()
			site.url = '^='
			var count = site.search()
		}

		//no site found, but we know what language this is requested on
		if (languageName && count != 1) {
			var siteLanguage = databaseManager.getFoundSet("sutra_cms","web_site_language")
			siteLanguage.find()
			siteLanguage.language_code = languageName
			var count = siteLanguage.search()

			if (count != 1) {
				obj.error.code = 500
				obj.error.message = "No site found"
				return
			}
			else {
				site.loadRecords([siteLanguage.id_site])
			}
		}
		else if (count != 1) {
			var siteLanguage = databaseManager.getFoundSet("sutra_cms","web_site_language")
			siteLanguage.find()
			siteLanguage.url = '%' + pageServer + '%'
			var count = siteLanguage.search()

			//if there is any language record with the requested url, try it
			if (count == 1) {
				site.loadRecords([siteLanguage.id_site])
			}
			else {
				obj.error.code = 500
				obj.error.message = "No site found"
				return
			}
		}

		var page = databaseManager.getFoundSet("sutra_cms","web_page")
		page.find()
		page.id_page = site.id_page__home
		var count = page.search()
		if (count != 1) {
			obj.error.code = 404
			obj.error.message = "No default page specified for this site"
			return
		}
		else {
			pageID = page.id_page
			databaseManager.refreshRecordFromDatabase(page, 0)
		}
	}

	// publishable...only matters for a live site
	if ( !(editMode || cacheMode) && !page.flag_publish ) {
		obj.error.code = 403
		obj.error.message = "Page not published"
		return
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
				return
			}
		}
		else {
			obj.error.code = 404
			obj.error.message = "Folder has no content"
			return
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
			return
		}
		else {
			obj.error.code = 404
			obj.error.message = "External link is blank"
			return
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
			return
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
	databaseManager.refreshRecordFromDatabase(page.web_page_to_site.web_site_to_site_language,-1)
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
			return
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
			return
		}
	}

	// obj: platform
	databaseManager.refreshRecordFromDatabase(platform,0)
	obj.platform.record = platform.getSelectedRecord()
	obj.platform.id = platform.id_platform


	// LANGUAGE
	// if not specified, use default language
	var languageSite = databaseManager.getFoundSet("sutra_cms","web_site_language")
	var language = databaseManager.getFoundSet("sutra_cms","web_language")

	// language specified by parameter
	if (languageID) {
		language.find()
		language.url_param = languageID
		var count = language.search()

		//check to make sure that it is in the correct page
		if (!(count && language.id_page == page.id_page)) {
			// return error that no such version
			obj.error.code = 500
			obj.error.message = "Language requested does not exist"
			return
		}
	}
	// language specified by folder/domain
	else if (languageName) {
		languageSite.find()
		languageSite.id_site = page.id_site
		languageSite.language_code = languageName
		var count = languageSite.search()
		if (!count) {
			obj.error.code = 500
			obj.error.message = "Site language \"" + languageName + "\" does not exist"
			return
		}
		else {
			language.find()
			language.id_site_language = languageSite.id_site_language
			language.id_page = page.id_page
			var count = language.search()

			// requested language isn't present on this page, just grab the page's default language
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
	// no language specified
	else {
		languageSite.find()
		languageSite.id_site = page.id_site
		languageSite.flag_default = 1
		var count = languageSite.search()
		if (!count) {
			obj.error.code = 500
			obj.error.message = "No default site language"
			return
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
			return
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
			return
		}
	}

	// obj: group
	databaseManager.refreshRecordFromDatabase(group,0)
	obj.group.record = group.getSelectedRecord()
	obj.group.id = group.id_group

	// obj: home
	if ( utils.hasRecords(page.web_page_to_site.web_site_to_page__home )) {
		databaseManager.refreshRecordFromDatabase(page.web_page_to_site.web_site_to_page__home,0)
		obj.home.record = page.web_page_to_site.web_site_to_page__home.getSelectedRecord()

		results.addRow(["cmsHomePage",globals.WEBc_markup_link_page(obj.home.record.id_page,pageServer,(editMode ? 'Edit' : ''),null,obj)])
	}

	//if page requested is using different link type (folder, pretty, index), send redirect so site is uniform
	var goodLink = globals.WEBc_markup_link_page(page.id_page, null, (editMode ? 'Edit' : null), null, obj)
	var thisLink = request.getAttribute("javax.servlet.forward.request_uri") || pageURI
	if (!utils.stringPatternCount(goodLink,thisLink) && !cacheMode) {
		obj.response.record.sendRedirect(goodLink)
	}

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
				return
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
			return
		}
	}

	// obj: version
	databaseManager.refreshRecordFromDatabase(version,0)
	databaseManager.refreshRecordFromDatabase(version.web_version_to_theme,-1)
	databaseManager.refreshRecordFromDatabase(version.web_version_to_layout,-1)
	obj.version.record	= version.getSelectedRecord()
	obj.version.id		= version.id_version

	// THEME
	if (!utils.hasRecords(obj.version.record,'web_version_to_theme')) {
		obj.error.code = 500
		obj.error.message = "No theme specified"
		return
	}

	// LAYOUT
	if (!utils.hasRecords(obj.version.record,'web_version_to_layout')) {
		obj.error.code = 500
		obj.error.message = "No layout specified"
		return
	}

	// theme directory with rewrites
	if (rewriteMode) {
		obj.theme.directory = "/themes/" + obj.version.record.web_version_to_theme.theme_directory
	}
	// theme directory without rewrites
	else {
		obj.theme.directory = "sites/" + obj.site.record.directory + "/themes/" + obj.version.record.web_version_to_theme.theme_directory
	}

	obj.theme.markup.link = obj.theme.directory

	//theme will be included on html, so accessed by client (external)
	results.addRow(["cmsThemeDirectory", obj.theme.directory])
	//layout will be referenced from within jsp, so internal and needs full path
	results.addRow(["cmsLayout", "sites/" + obj.site.record.directory + "/themes/" + obj.version.record.web_version_to_theme.theme_directory + "/" + obj.version.record.web_version_to_layout.layout_path])

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
	if (utils.hasRecords(obj.language.record,'web_language_to_meta_data')) {
		for (var i = 1; i <= obj.language.record.web_language_to_meta_data.getSize(); i++) {
			var record = obj.language.record.web_language_to_meta_data.getRecord(i)

			if (record.data_key) {
				var keyName = 'seo' + utils.stringInitCap(record.data_key)
				results.addRow([keyName,record.data_value])
			}
		}
	}

	// flag the data sutra install location for cross-domain communication
		// order: 1) data sutra webclient 2) site swc block 3) instal swc block
	var fsSutra = databaseManager.getFoundSet('sutra','sutra_solution')
	fsSutra.loadAllRecords()
	databaseManager.refreshRecordFromDatabase(fsSutra,0)
	var fsInstall = databaseManager.getFoundSet('sutra_cms','web_install')
	fsInstall.loadAllRecords()
	databaseManager.refreshRecordFromDatabase(fsInstall,0)
	results.addRow(["dsDomain", fsSutra.webclient_url || page.web_page_to_site.url_servlet || fsInstall.url_install])

	//TODO: only set this if character encoding not specified in the header
	// set connection to use utf
	response.characterEncoding = "UTF-8"
}

/**
 *
 * Gracefully handle page requests that don't resolve properly
 *
 * @properties={typeid:24,uuid:"2421EBCC-CD1C-4ACF-BE86-02167F1EA742"}
 * @AllowToRunInFind
 */
function CONTROLLER_error() {
	// assign main CMS object for easier reference
	var obj = globals.CMS.data

	var pageServer	= obj.request.server
	var message		= obj.error.message
	var mode		= obj.type

	// initialize bad dataset to return to the jsp
	var error =  databaseManager.createEmptyDataSet(0, ["error"])

	//display error message in edit mode or when running in developer
		//MEMO application.isInDeveloper doesn't work with headless client
	if (mode || (plugins.sutra && plugins.sutra.getWorkspace && plugins.sutra.getWorkspace())) {
		// clear out obj
		delete globals.CMS.data

		error.addRow([message])
		return error
	}
	//go to error page
	else {
		var site = databaseManager.getFoundSet("sutra_cms","web_site")
		site.find()
		site.url = pageServer
		var count = site.search()

		//no site found, but we know what language this is requested on
		if (obj.language.record && count != 1) {
			var siteLanguage = databaseManager.getFoundSet("sutra_cms","web_site_language")
			siteLanguage.find()
			siteLanguage.id_site_language = obj.language.record.id_site_language
			var count = siteLanguage.search()

			if (count != 1) {
				// clear out obj
				delete globals.CMS.data

				error.addRow(["No site found"])
				return error
			}
			else {
				site.loadRecords([siteLanguage.id_site])
			}
		}
		//no site found
		else if (count != 1) {
			// clear out obj
			delete globals.CMS.data

			error.addRow(["No site found"])
			return error
		}

		if (!site.id_page__error) {
			// clear out obj
			delete globals.CMS.data

			error.addRow(["No error page specified for this site"])
			return error
		}

		// redirect to the error page
		obj.response.record.sendRedirect(globals.WEBc_markup_link_page(site.id_page__error, pageServer))
	}

	// clear out obj
	delete globals.CMS.data
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
 * @type {String} methodName
 * @type {String} [formName]
 * @properties={typeid:24,uuid:"41B5EBF3-8C67-40D3-9D33-F59D421623F0"}
 */
function FX_method_exists(methodName, formName) {
	//a method passed in to check
	if (methodName) {
		//a form specified
		if (formName && solutionModel.getForm(formName)) {
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
