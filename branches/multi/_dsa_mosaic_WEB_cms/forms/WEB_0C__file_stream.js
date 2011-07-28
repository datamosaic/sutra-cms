/**
 * @properties={typeid:35,uuid:"D5AB1086-3B0E-468D-96B2-E47D8B21FDED",variableType:-4}
 */
var _file = {};

/**
 * @properties={typeid:35,uuid:"C0455562-E667-45D4-936D-7E5884B674FC",variableType:-4}
 */
var _elements = {};

/**
 * @properties={typeid:35,uuid:"6E2128F9-6215-42BD-8A89-124205655A10",variableType:4}
 */
var _elementsDone = 0;

/**
 * @properties={typeid:35,uuid:"4976B3A3-A3CE-4C4A-8921-2AFEB51C0A05",variableType:-4}
 */
var _elementsLayoutSelected = [];

/**
 * @properties={typeid:35,uuid:"0B5D9B8E-C86F-4203-910C-648ECA362CB2",variableType:4}
 */
var _elementsPathsIncrementer = 0;

/**
 * @properties={typeid:35,uuid:"25D00E0F-7808-4283-8405-8F6668CB4006",variableType:4}
 */
var _elementsProgressTotal = 0;

/**
 * @properties={typeid:35,uuid:"135A561B-F56B-4425-B08E-611AC591E7EC",variableType:-4}
 */
var _elementsSelected = [];

/**
 * @properties={typeid:35,uuid:"159BE25F-A531-4EA5-B7A9-6B38DEFD1713",variableType:-4}
 */
var _flagRefresh = false;

/**
 * @properties={typeid:35,uuid:"BD990BD6-3C82-4670-A5BD-593C88A13AB9"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"ABF70BA3-27E4-4349-8D8D-F920230F78CF",variableType:-4}
 */
var _themes = {};

/**
 * @properties={typeid:35,uuid:"BE8C2962-2621-4972-A538-E429F228853B",variableType:4}
 */
var _themesDone = 0;

/**
 * @properties={typeid:35,uuid:"28183069-F592-450E-89BF-A291C2279ABC",variableType:-4}
 */
var _themesLayoutSelected = [];

/**
 * @properties={typeid:35,uuid:"F5637AEC-3D96-4837-98F5-41762D8B5E16",variableType:-4}
 */
var _themesPaths = [];

/**
 * @properties={typeid:35,uuid:"245F0E8F-0717-4905-9D9C-16E8F1ECDE96",variableType:4}
 */
var _themesPathsIncrementer = 0;

/**
 * @properties={typeid:35,uuid:"2AACACE5-B607-4404-8CE5-EBBE091AF0EF",variableType:4}
 */
var _themesProgressCount = 0;

/**
 * @properties={typeid:35,uuid:"FA4A5665-233E-424B-9BE2-279E6D364B06",variableType:4}
 */
var _themesProgressTotal = 0;

/**
 * @properties={typeid:35,uuid:"7515CCB8-7FBE-450F-B6B4-98253A1FB2CB",variableType:-4}
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
 * @properties={typeid:24,uuid:"B29F02FA-D1FF-4C34-B9A0-7A45ABB87481"}
 */
function _INFO() {}

/**
 * File streaming for CMS all in one place. One of these figure out generic file streaming functions.
 * 
 * 
 * @param {Integer} progress : used by streaming file callbacks to pass control back to this method
 * @param {boolean} _flagRefresh : sudo-parameter/form variable tracks if creating new theme or refreshing current theme
 * 
 * @properties={typeid:24,uuid:"EFF6D177-1783-4E8D-8D31-92B7838AEB68"}
 */
function THEME_new(progress) {
	
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
				globals.TRIGGER_progressbar_start(0, "Streaming files...", null, 0, _themesProgressTotal)
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
				globals.TRIGGER_progressbar_stop()
				return "No theme selected"
			}
			// can't import theme with same name
			var names = databaseManager.getFoundSetDataProviderAsArray(
							foundset, "theme_name")
			if ( names.lastIndexOf(input, 0) > -1 ) {
				plugins.dialogs.showErrorDialog(
					"Error",  "Theme with same name not allowed")
				globals.TRIGGER_progressbar_stop()
				return "Duplicate theme"
			}
		}
		else { // refresh current theme record
			if( themes.indexOf(theme_name) > -1 ) {
				var input = theme_name				
			}
			else {
				plugins.dialogs.showErrorDialog( "Error", "No matching theme found")
				globals.TRIGGER_progressbar_stop()
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
				globals.TRIGGER_progressbar_start(0, "Streaming files...", null, 0, _themesProgressTotal)
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
//			globals.TRIGGER_progressbar_stop()
//			return "No theme files defined in selected theme"
		}
	}
	
	
	// *** STAGE #3: // get jsp files from elements directory and build data object *** //
	
	else if ( progress == 3 ) {
		
		//TODO: check if elements directory
		if ( plugins.file.convertToRemoteJSFile(_themes[_themesSelected].path + "/elements").exists() ) {
			var jspArray = plugins.file.getRemoteFolderContents(_themes[_themesSelected].path + "/elements", null, 1)	
		}
		else {
			return "no elements directory"   // keep processing main method though
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
				globals.TRIGGER_progressbar_start(0, "Streaming files...", null, 0, _themesProgressTotal)
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
			var theme = forms.WEB_0F_theme.foundset.getRecord(forms.WEB_0F_theme.foundset.newRecord())
		}
		else {
			var theme = foundset.getRecord(foundset.getSelectedIndex())
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
			globals.TRIGGER_progressbar_start(0, "Creating records...", null, 0, size)
		}		
		
		var layoutList = []
		var counter = 0
		for (var i in  _themes[_themesSelected].editables ) {			
			// update progress monitor
			if ( application.__parent__.solutionPrefs ) {
				globals.TRIGGER_progressbar_set(counter ++)
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
			globals.TRIGGER_progressbar_stop()	
		}
		// reset flag
		_flagRefresh = false
	}
}

/**
 * Checks that site theme directory is configured correctly on the site form.
 * 
 * @properties={typeid:24,uuid:"6FEBD6FA-495C-4293-822D-74C86ABAAE59"}
 */
function FUNCTION_theme_directory() {
	var error = null
	if ( forms.WEB_0F_site.directory ) {
		return forms.WEB_0F_site.directory
	}
	else {
		error = "No theme site directory specified"
	}
	
	if ( error ) {
		plugins.dialogs.showErrorDialog( "Error", error )
		return error
	}
	
}

/**
 * Reads the description.txt file in the theme directory for meta information.
 * 
 * @properties={typeid:24,uuid:"FCDE08CA-4845-4E93-BF4F-1295D7C3F53E"}
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
 * @properties={typeid:24,uuid:"A13091A4-F352-4C85-ABE7-EBA77267DBDB"}
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
 * @properties={typeid:24,uuid:"5B8D4CEC-E6F2-4379-9AF4-D1B10625CA37"}
 */
function THEME_progress(monitor) {
	globals.TRIGGER_progressbar_set(monitor.getTotalTransferredBytes(), " Streaming " + monitor.getTotalTransferredBytes() + " of " + _themesProgressTotal)
}

/**
 * Reads jspf files from theme > elements directory and pulls out editable regions.
 * 
 * @properties={typeid:24,uuid:"8D39371D-3291-4A63-87A0-083520BBF659"}
 */
function THEME_callback_element(result, e) {
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
 * @properties={typeid:24,uuid:"CB4B934D-310E-4EDF-8BB5-BC84C6026857"}
 */
function THEME_refresh() {
	_flagRefresh = true
	THEME_new()
}

/**
 * Checks to make sure the file streaming plugin is setup properly in the server plugins page.
 * 
 * @properties={typeid:24,uuid:"0895C240-7F52-4FB7-889F-C6D81DD558AD"}
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
 * @properties={typeid:24,uuid:"D7EA9BAE-E97A-4828-821E-08FA8E96E5B2"}
 */
function IMAGE_import(directory) {
	
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
		globals.TRIGGER_progressbar_start(null, "Streaming file to server...")
		var monitor = plugins.file.streamFilesToServer(file, uploadFile, IMAGE_import_callback)
	}
	else {
		var monitor = plugins.file.streamFilesToServer(file, uploadFile, IMAGE_import_callback)
	}

}

/**
 * @properties={typeid:24,uuid:"91369FAF-0A56-47C2-A198-DB6A17187DC8"}
 */
function IMAGE_import_callback(result, e) {
	
	if (e) {
		plugins.dialogs.showErrorDialog("Error", "Error with image upload to server")
		globals.TRIGGER_progressbar_stop()
		return "Error with image upload to server"
	}
	
	// create asset record
	var fsAsset = databaseManager.getFoundSet('sutra_cms','web_asset')
	var assetRec = fsAsset.getRecord(fsAsset.newRecord(false,true))
	assetRec.id_site = forms.WEB_0F_site.id_site
	assetRec.asset_type = 1

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
	assetRec.asset_extension = (result.getName().search(/./) != -1) ? result.getName().split('.')[1].toLowerCase() : null
	assetRec.asset_name = result.getName().replace(/ /g, "_")	
	assetRec.thumbnail		= _file.thumbnail
	assetInstanceRec.asset_title = result.getName().replace(/ /g, "_")
	assetInstanceRec.asset_size = _file.size
	assetInstanceRec.asset_directory = "images"
	assetInstanceRec.flag_initial = 1	
	
	databaseManager.saveData()
	
	// stream to server
	if ( application.__parent__.solutionPrefs ) {
		globals.TRIGGER_progressbar_stop()
	}
	
	plugins.dialogs.showInfoDialog("Image",  "Image uploaded")
	
	//TODO: select the correct record (won't work when more than 200 assets)
	forms.WEB_0F_asset.controller.loadAllRecords()
	forms.WEB_0F_asset.controller.setSelectedIndex(forms.WEB_0F_asset.controller.getMaxRecordIndex())
	
	//no records created yet and interface locked
	if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow) {
		globals.WEB_lock_workflow(false)
	}
}

/**
 * @properties={typeid:24,uuid:"4B77F240-2EA9-4162-ADE0-5750CD297757"}
 */
function IMAGE_import_monitor() {
	// TODO Auto-generated method stub
}

/**
 * @properties={typeid:24,uuid:"9CA1DB85-58BC-4FF9-8F16-1EE81CFB4706"}
 */
function IMAGE_delete(filePathObj) {
	
	if (plugins.file.deleteFile(filePathObj.file)) {
		return true
	}
	else {
		return false
	}
}
