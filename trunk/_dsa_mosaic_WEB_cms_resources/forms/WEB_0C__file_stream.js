/**
 * @properties={typeid:35,uuid:"2DC677B3-626D-47FA-A92B-D13D32236BF6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"20E8E784-6FDA-4F70-8AF4-6C15634BBDD8",variableType:-4}
 */
var _elements = {};

/**
 * @properties={typeid:35,uuid:"B07736AF-EADE-4194-8F91-EBFB80BD34A0",variableType:4}
 */
var _elementsDone = 0;

/**
 * @properties={typeid:35,uuid:"DD57E988-7B31-4C21-8207-706F28A7F82B",variableType:-4}
 */
var _elementsLayoutSelected = [];

/**
 * @properties={typeid:35,uuid:"9AC35751-762E-41B0-AB63-18286CF90F09",variableType:4}
 */
var _elementsPathsIncrementer = 0;

/**
 * @properties={typeid:35,uuid:"77C979BD-3461-4E59-B2B6-2CECB34F7DB5",variableType:4}
 */
var _elementsProgressTotal = 0;

/**
 * @properties={typeid:35,uuid:"3F03274E-0C82-42F0-AD28-D2EF48944EFA",variableType:-4}
 */
var _elementsSelected = [];

/**
 * @properties={typeid:35,uuid:"9B2C8DC8-7ACA-4CFF-A8D4-10653376516B",variableType:-4}
 */
var _file = {};

/**
 * @properties={typeid:35,uuid:"3F0941BE-2D6B-42BA-A931-4910330A1CD8",variableType:-4}
 */
var _flagRefresh = false;

/**
 * @properties={typeid:35,uuid:"C8A1F8EC-713F-48B5-83B4-F7B5123DEE1C",variableType:-4}
 */
var _themes = {};

/**
 * @properties={typeid:35,uuid:"452A199F-D69C-414B-A5DF-A3A59E3CB4FD",variableType:4}
 */
var _themesDone = 0;

/**
 * @properties={typeid:35,uuid:"42B1F8AA-7119-4D5A-8BC2-80030261C615",variableType:-4}
 */
var _themesLayoutSelected = [];

/**
 * @properties={typeid:35,uuid:"8014240B-58DB-4A6D-A01E-F576C0EB72DE",variableType:-4}
 */
var _themesPaths = [];

/**
 * @properties={typeid:35,uuid:"BA6C15BF-9944-4627-83E7-14D3918E5A46",variableType:4}
 */
var _themesPathsIncrementer = 0;

/**
 * @properties={typeid:35,uuid:"91F892B5-039E-4A21-9DAC-A3610FFCA08A",variableType:4}
 */
var _themesProgressCount = 0;

/**
 * @properties={typeid:35,uuid:"5CCAB31D-9A98-4074-B8A3-40F9D9A5000B",variableType:4}
 */
var _themesProgressTotal = 0;

/**
 * @properties={typeid:35,uuid:"EB3C0879-5DEC-4BF1-8C46-2A4637DF3B97",variableType:-4}
 */
var _themesSelected = [];

/**
 * Since file streaming can be a real PITA to keep track of all the parts (form variables,
 * callbacks, updaters, multiple threads, etc), put all CMS file streaming here in one place
 * even if methods are hard-coded to a specific scope or situation.
 * 
 * Prefix hard-coded methods with scope for now and call from a method at the scope location.
 * 
 * Hopefully some patterns will emerge eventually that will allow us to abstract and condense
 * things a bit. At that point we won't have to go track down all the file streaming pieces
 * scattered everywhere.
 * 
 * @properties={typeid:24,uuid:"82C07EDB-1566-40FE-A0D3-ACA385AECBD6"}
 */
function _INFO() {}

/**
 * File streaming for CMS all in one place. One of these figure out generic file streaming functions.
 * 
 * 
 * @param {Integer} progress : used by streaming file callbacks to pass control back to this method
 * @param {boolean} _flagRefresh : sudo-parameter/form variable tracks if creating new theme or refreshing current theme
 * 
 * @properties={typeid:24,uuid:"63BDBFCB-609A-4735-A981-CF0DEE9C5BFC"}
 */
function THEME_new(progress) {
	var fsTheme = forms.WEB_0F_theme.foundset
	
	// *** STAGE #1: get available themes *** //
	if ( !progress ) { 
		
		// streaming file upload directory check
		if ( !FUNCTION_streaming_check() ) {
			plugins.dialogs.showErrorDialog( "Error", 'File streaming default folder needs to be set to operating system root ("/" or "C:\")')
			return 'File streaming default folder needs to be set to operating system root ("/" or "C:\")'
		}

		// build directory to current site's theme folder
		var install = forms.WEB_0F_install.FUNCTION_getInstallDirectory() 
		var theme = FUNCTION_theme_directory()
		
		//errorer out
		if (theme == "No theme site directory specified") {
			return
		}
		
		var directory = install + "/application_server/server/webapps/ROOT/sutraCMS/sites/" + theme + "/themes/"
		directory = utils.stringReplace(directory,"\\", "/")	// windows backslashes to js standard forward slashes
		
		// get theme directories and descriptor files
		var themesArray = plugins.file.getRemoteFolderContents(directory, null, 2)
		if (!themesArray || (themesArray instanceof Array && !themesArray.length)) {
			plugins.dialogs.showErrorDialog( 
							"Error", 
							'The directory specified does not exist\nCheck the installation and site directories.'
						)
			return 'The directory specified does not exist\nCheck the installation and site directories.'
		}
		
		// form variables needed to keep track of state and data while streaming
		_themes = {}					// main storage object
		_themesPaths = []				// track full path to theme
		_themesPathsIncrementer = 0		// increments each callback
		_themesDone = 0					// to determine last callback
		_themesProgressTotal = 0		// max bytes to transfer for progress monitor
		
		// build data needed for streaming: file arrays, state variables
		var incrementer = 0
		var tempArray = []
		var sourceArray = []
		for (var i = 0; i < themesArray.length; i++) {
			if ( themesArray[i].getName().charAt(0) != "." ) { // skip hidden directories
				// build list of description.txt files to stream
				if ( plugins.file.convertToRemoteJSFile(directory + themesArray[i].getName() + "/description.txt").exists() ) {  // description.txt file may not be present
					_themesPaths[incrementer] = directory + themesArray[i].getName()	
					sourceArray[incrementer] = directory + themesArray[i].getName() + "/description.txt"
					tempArray[incrementer] = plugins.file.createTempFile("description",".txt")
					_themesProgressTotal += plugins.file.convertToRemoteJSFile(_themesPaths[incrementer] + "/description.txt").size()
					incrementer ++
				}				
			}
		}
		// set total number of themes so last callback can return control
		_themesDone = incrementer
		
		if ( incrementer > 0 ) { // only stream if themes are present
			// if in Data Sutra: stream files with progress bar for monitor
			if ( application.__parent__.solutionPrefs ) {
				globals.WEBc_sutra_trigger('TRIGGER_progressbar_start',[0, "Streaming files...", null, 0, _themesProgressTotal])
				// callback method fires when streaming is done in separate thread
				var monitor = plugins.file.streamFilesFromServer( tempArray, sourceArray, THEME_callback_theme )
				if (monitor) {
					// progress monitor
					monitor.setProgressCallBack( THEME_progress, 1, (application.isInDeveloper() ? 100 : 0) )	
				}
			}
			else { // not in Data Sutra: stream files without monitor
				var monitor = plugins.file.streamFilesFromServer( tempArray, sourceArray, THEME_callback_theme )
			}
		}
		else {
			plugins.dialogs.showErrorDialog( "Error", "No themes available")
			return "No themes available"
		}
	}
	
	// *** STAGE #2: // get jsp files and build data object *** //
	else if ( progress == 2 ) { 
	
		var themes = []  // array for select dialog
		for (var i in _themes ) {
			themes.push(_themes[i].name)
		}
	
		// choose theme
		if ( !_flagRefresh ) {  // user choose theme
			var input =	plugins.dialogs.showSelectDialog("Themes", "Choose a theme to register", themes)
			if ( !input ) {
				globals.WEBc_sutra_trigger('TRIGGER_progressbar_stop')
				return "No theme selected"
			}
			// can't import theme with same name
			var names = databaseManager.getFoundSetDataProviderAsArray(
							fsTheme, "theme_name")
			if ( names.lastIndexOf(input, 0) > -1 ) {
				plugins.dialogs.showErrorDialog(
					"Error",  "Theme with same name not allowed")
				globals.WEBc_sutra_trigger('TRIGGER_progressbar_stop')
				return "Duplicate theme"
			}
		}
		else { // refresh current theme record
			if( themes.indexOf(fsTheme.theme_name) > -1 ) {
				var input = fsTheme.theme_name				
			}
			else {
				plugins.dialogs.showErrorDialog( "Error", "No matching theme found")
				globals.WEBc_sutra_trigger('TRIGGER_progressbar_stop')
				return "No matching theme"
			}
		}
		// get jsp files
		var jspArray = plugins.file.getRemoteFolderContents(_themes[input].path, null, 1)
		
		_themesDone = 0					// to determine last callback
		_themesPathsIncrementer = 0		// increments each callback
		_themesProgressTotal = 0		// max bytes to transfer for progress monitor
		_themesSelected = input			// tracks selected theme
		_themesLayoutSelected = []		// tracks current jsp name being processed for callback
		
		// build data needed for streaming: file arrays, state variables
		var incrementer = 0
		var tempArray = []
		var sourceArray = []
		for (var i = 0; i < jspArray.length; i++) {
			if ( jspArray[i].getName().search(/\.jsp$/) > 0 ) { // only get jsp files
				_themesLayoutSelected[incrementer] = jspArray[i].getName()
				sourceArray[incrementer] = jspArray[i]
				tempArray[incrementer] = plugins.file.createTempFile(jspArray[i].getName(),".txt")
				_themesProgressTotal += jspArray[i].size()
				incrementer ++				
			}
		}
		// set total number of themes so last callback can return control
		_themesDone = incrementer
		
		if ( incrementer > 0 ) {
			// if in Data Sutra: stream files with progress bar for monitor
			if ( application.__parent__.solutionPrefs ) {
				globals.WEBc_sutra_trigger('TRIGGER_progressbar_start',[0, "Streaming files...", null, 0, _themesProgressTotal])
				// callback method fires when streaming is done in separate thread
				var monitor = plugins.file.streamFilesFromServer( tempArray, sourceArray, THEME_callback_jsp )
				if (monitor) {
					// progress monitor
					monitor.setProgressCallBack( THEME_progress, 1, (application.isInDeveloper() ? 100 : 0) )	
				}
			}
			else { // not in Data Sutra: stream files without monitor
				var monitor = plugins.file.streamFilesFromServer( tempArray, sourceArray, THEME_callback_jsp )
			}	
		}
		else {
			//jump to stage 3
			THEME_new(3)
			
//			plugins.dialogs.showErrorDialog( "Error", "No theme files defined in selected theme")
//			globals.WEBc_sutra_trigger('TRIGGER_progressbar_stop')
//			return "No theme files defined in selected theme"
		}
	}
	
	
	// *** STAGE #3: // get jsp files from elements directory and build data object *** //
	
	else if ( progress == 3 ) {
		
		var jspArray = []
		
		//TODO: check if elements directory
		if ( plugins.file.convertToRemoteJSFile(_themes[_themesSelected].path + "/elements").exists() ) {
			var jspArray = plugins.file.getRemoteFolderContents(_themes[_themesSelected].path + "/elements", null, 1)	
		}
		else {
			application.output("no elements directory")   // keep processing main method though
		}
		
		_elements = {}						// reset elements object
		_elementsDone = 0					// to determine last callback
		_elementsPathsIncrementer = 0		// increments each callback
		_elementsProgressTotal = 0			// max bytes to transfer for progress monitor
		_elementsSelected = _themesSelected			// tracks selected element file
		_elementsLayoutSelected = []		// tracks current jsp name being processed for callback
		
		// build data needed for streaming: file arrays, state variables
		var incrementer = 0
		var tempArray = []
		var sourceArray = []
		for (var i = 0; i < jspArray.length; i++) {
			if ( jspArray[i].getName().search(/\.jspf$/) > 0 ) { // only get jsp files
				_elementsLayoutSelected[incrementer] = jspArray[i].getName()
				sourceArray[incrementer] = jspArray[i]
				tempArray[incrementer] = plugins.file.createTempFile(jspArray[i].getName(),".txt")
				_elementsProgressTotal += jspArray[i].size()
				incrementer ++				
			}
		}
		// set total number of themes so last callback can return control
		_elementsDone = incrementer
		
		if ( incrementer > 0 ) {
			// if in Data Sutra: stream files with progress bar for monitor
			if ( application.__parent__.solutionPrefs ) {
				globals.WEBc_sutra_trigger('TRIGGER_progressbar_start',[0, "Streaming files...", null, 0, _themesProgressTotal])
				// callback method fires when streaming is done in separate thread
				var monitor = plugins.file.streamFilesFromServer( tempArray, sourceArray, THEME_callback_element )
				if (monitor) {
					// progress monitor
					monitor.setProgressCallBack( THEME_progress, 1, (application.isInDeveloper() ? 100 : 0) )	
				}
			}
			else { // not in Data Sutra: stream files without monitor
				var monitor = plugins.file.streamFilesFromServer( tempArray, sourceArray, THEME_callback_element )
			}	
		}
		else {
			//jump to stage 4
			THEME_new(4)
		}		
	}	
	
	
	// *** STAGE #4: create theme, layouts and editable areas *** //
	else if ( progress == 4 ) {
		//no records created yet and interface locked
		if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow) {
			globals.WEB_lock_workflow(false)
		}
		
		// 1 get theme record 
		if ( !_flagRefresh ) {
			var theme = fsTheme.getRecord(fsTheme.newRecord())
		}
		else {
			var theme = fsTheme.getSelectedRecord()
		}
		theme.theme_name = _themes[_themesSelected].name
		theme.description = _themes[_themesSelected].description
		theme.id_site = forms.WEB_0F_site.id_site
		theme.activated = 1
		var themeDirectory = _themes[_themesSelected].path.split("/")
		theme.theme_directory = themeDirectory[themeDirectory.length - 1]
		databaseManager.saveData(theme)
		
		// progress bar
		if ( application.__parent__.solutionPrefs ) {
			var size = 0, key;
			for (key in _themes[_themesSelected].editables) {
				if (_themes[_themesSelected].editables.hasOwnProperty(key)) size++;
			}	
			application.sleep(200) // needed to clear other file streaming method threads that have progress bars
			globals.WEBc_sutra_trigger('TRIGGER_progressbar_start',[0, "Creating records...", null, 0, size])
		}		
		
		var layoutList = []
		var counter = 0
		for (var i in  _themes[_themesSelected].editables ) {			
			// update progress monitor
			if ( application.__parent__.solutionPrefs ) {
				globals.WEBc_sutra_trigger('TRIGGER_progressbar_set',[counter ++])
			}
			// 2 create layout record
			if ( !_flagRefresh ) {
				var layout = theme.web_theme_to_layout.getRecord(theme.web_theme_to_layout.newRecord())				
			}
			else {
				// see if layout with current path
				theme.web_theme_to_layout.find()
				theme.web_theme_to_layout.layout_path = i
				var count = theme.web_theme_to_layout.search()
				if ( count == 1 ) {
					var layout = theme.web_theme_to_layout.getRecord(1)	
					theme.web_theme_to_layout.loadAllRecords()
				}
				else {
					var layout = theme.web_theme_to_layout.getRecord(theme.web_theme_to_layout.newRecord())
				}
			}
			layout.layout_path = i
			
			var name = i.split(".")[0].split("_")
			for (var j = 0; j < name.length; j++) {
				if ( j == 0 ) {
					layout.layout_name = utils.stringInitCap(name[j])
				}
				else {
					layout.layout_name += " " + utils.stringInitCap(name[j])
				}	
			}
						
			if (i == "default.jsp") layout.flag_default = 1                                  
			databaseManager.saveData(layout)
			layoutList.push(layout.layout_name)
			
			// 3 create editable area record			
			var editablesList = []
			var order = 1
			for (var j in _themes[_themesSelected].editables[i] ) {
				if ( !_flagRefresh ) {
					var editable = layout.web_layout_to_editable.getRecord(layout.web_layout_to_editable.newRecord())
					editable.editable_name = _themes[_themesSelected].editables[i][j]
					editable.row_order = order++
				}
				else {
					// see if editable with current name
					layout.web_layout_to_editable.find()
					layout.web_layout_to_editable.editable_name = _themes[_themesSelected].editables[i][j]
					var count = layout.web_layout_to_editable.search()
					if ( count == 1 ) {
						var editable = layout.web_layout_to_editable.getRecord(1)
						editable.editable_name = _themes[_themesSelected].editables[i][j]
					}
					else {
						var editable = layout.web_layout_to_editable.getRecord(layout.web_layout_to_editable.newRecord())
						editable.editable_name = _themes[_themesSelected].editables[i][j]
						editable.row_order = order++
					}
					layout.web_layout_to_editable.loadAllRecords()
				}
				databaseManager.saveData(editable) 
				editablesList.push(_themes[_themesSelected].editables[i][j])
			}
			
			var order = layout.web_layout_to_editable.getSize() + 1
			for ( k in _themes[_themesSelected].includes[i] ) {
				// 4 create editable area record for all include files
				for ( m in _elements[_themesSelected].editables[_themes[_themesSelected].includes[i][k] + ".jspf"]) {
					if ( !_flagRefresh ) {
						var editable = layout.web_layout_to_editable.getRecord(layout.web_layout_to_editable.newRecord())
						editable.editable_name = _elements[_themesSelected].editables[_themes[_themesSelected].includes[i][k] + ".jspf"][m]
						editable.row_order = order++
					}
					else {
						// see if editable with current name
						layout.web_layout_to_editable.find()
						layout.web_layout_to_editable.editable_name = _elements[_themesSelected].editables[_themes[_themesSelected].includes[i][k] + ".jspf"][m]
						var count = layout.web_layout_to_editable.search()
						if ( count == 1 ) {
							var editable = layout.web_layout_to_editable.getRecord(1)
							editable.editable_name = _elements[_themesSelected].editables[_themes[_themesSelected].includes[i][k] + ".jspf"][m]
						}
						else {
							var editable = layout.web_layout_to_editable.getRecord(layout.web_layout_to_editable.newRecord())
							editable.editable_name = _elements[_themesSelected].editables[_themes[_themesSelected].includes[i][k] + ".jspf"][m]
							editable.row_order = order++
						}
						layout.web_layout_to_editable.loadAllRecords()
						editablesList.push(_elements[_themesSelected].editables[_themes[_themesSelected].includes[i][k] + ".jspf"][m])
					}
					databaseManager.saveData(editable) 
				}
			}
			// remove editables no longer appearing in theme when refreshing
			if ( _flagRefresh ) {
				
				// remove editables
				for (var l = 0; l < layout.web_layout_to_editable.getSize(); l++) {
					var tempEditable = layout.web_layout_to_editable.getRecord(l + 1)
					if ( editablesList.indexOf(tempEditable.editable_name, 0) == -1 ) {
						tempEditable.foundset.deleteRecord(l + 1)
						var loop = l + 1
						while (loop <= layout.web_layout_to_editable.getSize()) {
							var nextRec = layout.web_layout_to_editable.getRecord(loop)				
							nextRec.row_order--
							loop++
						}						
						l--
					}
				}			
			}
			
			
			// sort editables by row_order
			forms.WEB_0F_theme_1L_layout.web_layout_to_editable.sort( "row_order asc" )
		}
		
		// remove editables no longer appearing in theme when refreshing
		if ( _flagRefresh ) {
			for (var l = 0; l < theme.web_theme_to_layout.getSize(); l++) {
				var tempLayout = theme.web_theme_to_layout.getRecord(l + 1)
				if ( layoutList.indexOf(tempLayout.layout_name, 0) == -1) {
					tempLayout.foundset.deleteRecord(l + 1)
					l--
				}
			}		
		}
		
		//just reloop over editables and reset the order
		for (var m = 1; m <= theme.web_theme_to_layout.getSize(); m++) {
			layout = theme.web_theme_to_layout.getRecord(m)
			
			for (var n = 1; n <= layout.web_layout_to_editable.getSize(); n++) {
				var layoutRec = layout.web_layout_to_editable.getRecord(n)
				layoutRec.row_order = n
				
				databaseManager.saveData(layoutRec)
			}
		}
		
		// stop progress bar
		if ( application.__parent__.solutionPrefs ) {	
			globals.WEBc_sutra_trigger('TRIGGER_progressbar_stop')	
		}
		// reset flag
		_flagRefresh = false
	}
}

/**
 * Checks that site theme directory is configured correctly on the site form.
 * 
 * @properties={typeid:24,uuid:"BB2409B5-CAF7-4773-9A20-972511821E49"}
 */
function FUNCTION_theme_directory() {
	var error = null
	if ( forms.WEB_0F_site.directory ) {
		return forms.WEB_0F_site.directory
	}
	else {
		error = "No theme site directory specified. Please check your site record."
	}
	
	if ( error ) {
		plugins.dialogs.showErrorDialog( "Error", error )
		return error
	}
	
}

/**
 * Reads the description.txt file in the theme directory for meta information.
 * 
 * @properties={typeid:24,uuid:"C66AFE31-3D3F-4E7A-A39D-874A1C9A634F"}
 */
function THEME_callback_theme(result, e) {
	if (e) {
		//TODO: how to handle potential streaming error?
	} else {			
		// file stream done
		var fileData = plugins.file.readTXTFile( result )
		if (fileData) { // if description.txt exists read it and store
			var fileName = fileData.split("\n")[0]
			var description = fileData.slice(fileData.search(/\n/) + 1, 100000)   
			_themes[fileName] = { "name" : fileName,
			                      "description" : description,
			                      "path" : _themesPaths[_themesPathsIncrementer]} 
			_themesPathsIncrementer ++
		}
		else {
			_themesPathsIncrementer ++
		}
		// last callback: return control to orignator method
		if ( _themesPathsIncrementer == _themesDone ) {
			THEME_new( 2 )  // return to main method stage #2
		}
	}	
}

/**
 * Reads jsp files from theme directory and pulls out editable regions.
 * 
 * @properties={typeid:24,uuid:"A2FDED2C-31EB-49D6-8360-FCBB015B76D3"}
 */
function THEME_callback_jsp(result, e) {
	if (e) {
		//TODO: how to handle potential streaming error?
	} else {			
		// file stream done
		var fileData = plugins.file.readTXTFile( result )
		if (fileData) { 
			
			// #1 find and store editable regions			                        		
			var regexp = /pageData\.get\(\"(.*)\"/gi   // match: <%=pageData.get("Sidebar")%>, any combination of letters, numbers, spaces and undersores
			var occurrence = null;
			var editables = []
			while (occurrence = regexp.exec( fileData )){	
				editables.push(occurrence[1])
			}
			
			if ( !_themes[_themesSelected].editables ) {
				_themes[_themesSelected].editables = {}
			}
			_themes[_themesSelected].editables[_themesLayoutSelected[_themesPathsIncrementer]] = editables	
			
			// #2 find and store includes			                        		
			var regexp = /include file\=\"elements\/(.*)\.jspf/gi   // match: <%@ include file="elements/header_home.jspf" %>, any combination of letters, numbers, spaces and undersores
			var occurrence = null;
			var includes = []
			while (occurrence = regexp.exec( fileData )){	
				includes.push(occurrence[1])
			}
						
			if ( !_themes[_themesSelected].includes ) {
				_themes[_themesSelected].includes = {}
			}
			_themes[_themesSelected].includes[_themesLayoutSelected[_themesPathsIncrementer]] = includes				
			
			
		}
		_themesPathsIncrementer ++
		// last callback: return control to orignator method
		if ( _themesPathsIncrementer == _themesDone ) {
			THEME_new( 3 )  // return to main method stage #3
		}
	}	
}

/**
 * @properties={typeid:24,uuid:"12D7AE07-6340-499C-B177-35AF92D4A2B5"}
 */
function THEME_progress(monitor) {
	globals.WEBc_sutra_trigger('TRIGGER_progressbar_set',[monitor.getTotalTransferredBytes(), " Streaming " + monitor.getTotalTransferredBytes() + " of " + _themesProgressTotal])
}

/**
 * Reads jspf files from theme > elements directory and pulls out editable regions.
 * 
 * @properties={typeid:24,uuid:"C8E09221-BF8E-405F-8F7E-69A08854162C"}
 */
function THEME_callback_element(result, e) {
	if (e) {
		//TODO: how to handle potential streaming error?
	} else {			
		// file stream done
		var fileData = plugins.file.readTXTFile( result )
		if (fileData) { 
			
			// #1 find and store editable regions			                        		
			var regexp = /pageData\.get\(\"(.[^"]*)\"/gi   // match: <%=pageData.get("Sidebar")%>, any combination of letters, numbers, spaces and undersores
			var occurrence = null;
			var editables = []
			while (occurrence = regexp.exec( fileData )){	
				editables.push(occurrence[1])
			}
			
			if ( !_elements[_elementsSelected] ) {
				_elements[_elementsSelected] = {}
				if ( !_elements[_elementsSelected].editables ) {
					_elements[_elementsSelected].editables = {}
				}				
			}
			_elements[_elementsSelected].editables[_elementsLayoutSelected[_elementsPathsIncrementer]] = editables	
			
		}
		_elementsPathsIncrementer ++
		// last callback: return control to orignator method
		if ( _elementsPathsIncrementer == _elementsDone ) {
			THEME_new( 4 )  // return to main method stage #3
		}
	}
}

/**
 * Updates theme to current state of the jsp files.
 * 
 * @properties={typeid:24,uuid:"3A84F0ED-C00C-4359-87A6-24910130E8E3"}
 */
function THEME_refresh() {
	_flagRefresh = true
	THEME_new()
}

/**
 * Checks to make sure the file streaming plugin is setup properly in the server plugins page.
 * 
 * @properties={typeid:24,uuid:"4BC9593E-CD40-41C0-A28F-0B2F865F76C5"}
 */
function FUNCTION_streaming_check() {
	// TODO: not sure C:\\ is the correct string for a windows server. may just be "/" due to auto java translation
	if ( plugins.file.getDefaultUploadLocation() == "/" || plugins.file.getDefaultUploadLocation() == "C:\\") {
		return true
	}
	else {
		return false
	}
}

/**
 * @properties={typeid:24,uuid:"21DA8183-8F34-4363-AC99-5AD696827909"}
 */
function IMAGE_import(directory) {
	// scope to unique directory for this asset instance
	directory += "/" + application.getUUID().toString()
	_file.directory = directory
	
	// root directory for this site
	var baseDirectory = forms.WEB_0F_install.ACTION_get_install() +
						'/application_server/server/webapps/ROOT/sutraCMS/sites/' +
						forms.WEB_0F_site.directory + '/'
	
	// prompt for input image
	var file = plugins.file.showFileOpenDialog()
	if (!file) {
		return "No file selected"	
	}
	
	// error check for images only
	if ( file.getContentType() != null ) {
		if ( file.getContentType().split("/")[0] != "image" ) {
			plugins.dialogs.showErrorDialog( "Error",  
				"Only image file types can be imported")
			IMAGE_import()
			return "Incorrect file type selected"
		}
	}
	else {
		plugins.dialogs.showErrorDialog( "Error",  
				"Only image file types can be imported")
			IMAGE_import()
			return "Incorrect file type selected"
	}
	
	// setup upload image
	var uploadFile = baseDirectory + directory + "/" + file.getName().replace(/ /g, "_")
	
	// grab file stats
	_file.size = file.size()
	var imageTemp =  plugins.images.getImage(file.getBytes())
	if (file.width > 200 || file.height > 200) {
		_file.thumbnail		= imageTemp.resize((200*file.width) / file.height, 200)
	}
	else {
		_file.thumbnail		= imageTemp
	}
	_file.width = imageTemp.getWidth()
	_file.height = imageTemp.getHeight()
	
	// stream to server
	if ( application.__parent__.solutionPrefs ) {
		globals.WEBc_sutra_trigger('TRIGGER_progressbar_start',[null, "Streaming file to server..."])
		
		//only upload picture if directory tree exists
		if (ASSET_directory_tree(directory)) {
			var monitor = plugins.file.streamFilesToServer(file, uploadFile, IMAGE_import_callback)
		}
		else {
			plugins.dialogs.showErrorDialog(
					'Error',
					'Directory specified does not exist'
			)
			globals.WEBc_sutra_trigger('TRIGGER_progressbar_stop')
		}
	}
	else {
		//only upload picture if directory tree exists
		if (ASSET_directory_tree(directory)) {
			var monitor = plugins.file.streamFilesToServer(file, uploadFile, IMAGE_import_callback)
		}
	}
	
}

/**
 * @properties={typeid:24,uuid:"1EAFF07F-DE7A-4271-B1CB-138ED45A1BFE"}
 */
function IMAGE_import_callback(result, e) {
	
	if (e) {
		plugins.dialogs.showErrorDialog("Error", "Error with image upload to server")
		globals.WEBc_sutra_trigger('TRIGGER_progressbar_stop')
		return "Error with image upload to server"
	}
	
	// create asset record
	var fsAsset = forms.WEB_0F_asset.foundset
	//disable on select method
	forms.WEB_0F_asset._skipSelect = true
	
	var assetRec = fsAsset.getRecord(fsAsset.newRecord(true,true))
	assetRec.id_site = forms.WEB_0F_site.id_site
	assetRec.asset_type = 1
	
	//enable on select method
	forms.WEB_0F_asset._skipSelect = false
	
	//create asset instance record
	var assetInstanceRec = assetRec.web_asset_to_asset_instance.getRecord(assetRec.web_asset_to_asset_instance.newRecord(false,true))
	
	//get template for this type of asset
	var template = forms.WEB_0F_asset.MAP_asset(assetRec.asset_type)

	//add all meta data rows
	for (var i in template.meta) {
		var metaRec = assetInstanceRec.web_asset_instance_to_asset_instance_meta.getRecord(assetInstanceRec.web_asset_instance_to_asset_instance_meta.newRecord(false,true))
		metaRec.data_key = i
		metaRec.data_type = template.meta[i]
		switch (i) {
			case "width":
				metaRec.data_value = _file.width
				break
			case "height":
				metaRec.data_value = _file.height
				break
		}
		databaseManager.saveData(metaRec)
	}
	
	assetRec.asset_file_type = result.getContentType()
	assetRec.asset_extension = (result.getName().search(/./) != -1) ? result.getName().split('.')[result.getName().split('.').length - 1].toLowerCase() : null
	assetRec.asset_name = result.getName().replace(/ /g, "_")	
	assetRec.thumbnail		= _file.thumbnail
	assetInstanceRec.asset_title = result.getName().replace(/ /g, "_")
	assetInstanceRec.asset_size = _file.size
	assetInstanceRec.asset_directory = _file.directory
	assetInstanceRec.flag_initial = 1	
	
	databaseManager.saveData()
	
	// stream to server
	if ( application.__parent__.solutionPrefs ) {
		globals.WEBc_sutra_trigger('TRIGGER_progressbar_stop')
	}
	
	plugins.dialogs.showInfoDialog("Image",  "Image uploaded")
	
	//no records created yet and interface locked
	if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow) {
		globals.WEB_lock_workflow(false)
	}
}

/**
 * @properties={typeid:24,uuid:"4A3BA365-3E63-4789-8256-54365B865356"}
 */
function IMAGE_import_monitor() {
	// TODO Auto-generated method stub
}

/**
 * @properties={typeid:24,uuid:"29BE1270-988B-4D4D-BF2C-A13382E05870"}
 */
function ASSET_delete(filePathObj) {
	if (filePathObj && filePathObj.file) {
		if (plugins.file.deleteFile(filePathObj.file)) {
			return true
		}
		else {
			return false
		}
	}
	else {
		return false
	}
}

/**
 * Make sure directory tree requested is valid.
 * 
 * @param {String}	directory The path to verify
 * @param {Boolean}	[autoCreate=true] Create path if non-existent
 * 
 * @returns {Boolean} valid path
 * 
 * @properties={typeid:24,uuid:"60603A08-569D-4217-99CD-F2ED6BE69FCE"}
 */
function ASSET_directory_tree(directory,autoCreate) {
	//unless specified false, auto create
	if (!(typeof autoCreate == 'boolean')) {
		autoCreate = true
	}
	
	//developer
	if (application.isInDeveloper()) {
		// root directory for this site
		var baseDirectory = forms.WEB_0F_install.ACTION_get_install() +
							'/application_server/server/webapps/ROOT/sutraCMS/sites/' +
							forms.WEB_0F_site.directory + '/' + directory
		
		var jsFile = plugins.file.convertToJSFile(baseDirectory)
		
		if (jsFile.exists()) {
			return true
		}
		//create directory structure up to this point
		else if (autoCreate) {
			var tree = baseDirectory.split('/')
			//remove first empty element
			tree.splice(0,1)
			
			for (var i = 0; i < tree.length; i++) {
				var path = '/' + tree.slice(0,i+1).join('/')
				
				var jsFile = plugins.file.convertToJSFile(path)
				
				if (!jsFile.exists()) {
					var success = plugins.file.createFolder(path)
					
					//could not create this directory, something didn't work right
					if (!success) {
						return false
					}
				}
			}
			
			//completed loop, directory is now available
			return true
		}
		
		//directory not found
		return false
	}
	//live server
	else {
		// root directory for this site
		var baseDirectory = '/application_server/server/webapps/ROOT/sutraCMS/sites/' +
							forms.WEB_0F_site.directory + '/' + directory
		
		var jsFile = plugins.file.convertToRemoteJSFile(baseDirectory)
		
		if (jsFile.exists()) {
			return true
		}
		//create directory structure up to this point
		else if (autoCreate) {
			var tree = baseDirectory.split('/')
			//remove first empty element
			tree.splice(0,1)
			
			for (var i = 0; i < tree.length; i++) {
				//probably don't want to prefix with /
				var path = '/' + tree.slice(0,i+1).join('/')
				
				var jsFile = plugins.file.convertToRemoteJSFile(path)
				
				if (!jsFile.exists()) {
					var success = plugins.file.createFolder(path)
					
					//could not create this directory, something didn't work right
					if (!success) {
						return false
					}
				}
			}
			
			//completed loop, directory is now available
			return true
		}
		
		//directory not found
		return false
	}
}

/**
 * @properties={typeid:24,uuid:"11DA8183-8F34-4363-AC99-5AD696827909"}
 */
function FILE_import(directory) {
	// directory for this file
	if (!directory) {
		directory = 'files'
	}
	
	// scope to unique directory for this asset instance
	directory += "/" + application.getUUID().toString()
	_file.directory = directory
	
	// root directory for this site
	var baseDirectory = forms.WEB_0F_install.ACTION_get_install() +
						'/application_server/server/webapps/ROOT/sutraCMS/sites/' +
						forms.WEB_0F_site.directory + '/'
	
	// prompt for input file
	var file = plugins.file.showFileOpenDialog()
	if (!file) {
		return "No file selected"	
	}
	
	// setup upload file
	var uploadFile = baseDirectory + directory + "/" + file.getName().replace(/ /g, "_")
	
	// grab file stats
	_file.size = file.size()
	
	// stream to server
	if ( application.__parent__.solutionPrefs ) {
		globals.WEBc_sutra_trigger('TRIGGER_progressbar_start',[null, "Streaming file to server..."])
		
		//only upload file if directory tree exists
		if (ASSET_directory_tree(directory)) {
			var monitor = plugins.file.streamFilesToServer(file, uploadFile, FILE_import_callback)
		}
		else {
			plugins.dialogs.showErrorDialog(
					'Error',
					'Directory specified does not exist'
			)
			globals.WEBc_sutra_trigger('TRIGGER_progressbar_stop')
		}
	}
	else {
		//only upload picture if directory tree exists
		if (ASSET_directory_tree(directory)) {
			var monitor = plugins.file.streamFilesToServer(file, uploadFile, FILE_import_callback)
		}
	}
	
}

/**
 * @properties={typeid:24,uuid:"2EAFF07F-DE7A-4271-B1CB-138ED45A1BFE"}
 */
function FILE_import_callback(result, e) {
	
	if (e) {
		plugins.dialogs.showErrorDialog("Error", "Error with file upload to server")
		globals.WEBc_sutra_trigger('TRIGGER_progressbar_stop')
		return "Error with file upload to server"
	}
	
	// create asset record
	var fsAsset = forms.WEB_0F_asset.foundset
	//disable on select method
	forms.WEB_0F_asset._skipSelect = true
	
	var assetRec = fsAsset.getRecord(fsAsset.newRecord(true,true))
	assetRec.id_site = forms.WEB_0F_site.id_site
	assetRec.asset_type = 2
	
	//enable on select method
	forms.WEB_0F_asset._skipSelect = false

	//create asset instance record
	var assetInstanceRec = assetRec.web_asset_to_asset_instance.getRecord(assetRec.web_asset_to_asset_instance.newRecord(false,true))

	//get template for this type of asset
	var template = forms.WEB_0F_asset.MAP_asset(assetRec.asset_type)

	//add all meta data rows
	for (var i in template.meta) {
		var metaRec = assetInstanceRec.web_asset_instance_to_asset_instance_meta.getRecord(assetInstanceRec.web_asset_instance_to_asset_instance_meta.newRecord(false,true))
		metaRec.data_key = i
		metaRec.data_type = template.meta[i]
		databaseManager.saveData(metaRec)
	}
	
	assetRec.asset_file_type = result.getContentType()
	assetRec.asset_extension = (result.getName().search(/./) != -1) ? result.getName().split('.')[1].toLowerCase() : null
	assetRec.asset_name = result.getName().replace(/ /g, "_")	
	assetInstanceRec.asset_title = result.getName().replace(/ /g, "_")
	assetInstanceRec.asset_size = _file.size
	assetInstanceRec.asset_directory = _file.directory
	assetInstanceRec.flag_initial = 1	
	
	databaseManager.saveData()
	
	// stream to server
	if ( application.__parent__.solutionPrefs ) {
		globals.WEBc_sutra_trigger('TRIGGER_progressbar_stop')
	}
	
	plugins.dialogs.showInfoDialog("File",  "File uploaded")
	
	//no records created yet and interface locked
	if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow) {
		globals.WEB_lock_workflow(false)
	}
}

/**
 * @properties={typeid:24,uuid:"1A3BA365-3E63-4789-8256-54365B865356"}
 */
function FILE_import_monitor() {
	// TODO Auto-generated method stub
}
