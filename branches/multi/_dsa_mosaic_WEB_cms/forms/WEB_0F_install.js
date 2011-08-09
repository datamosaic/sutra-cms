/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f27"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"AA87953D-FECC-4DFD-A81E-783EBC4E875D"}
 */
function FORM_on_load(event) {
}

/**
 * @properties={typeid:24,uuid:"76B2ACAE-4C52-4779-9E61-71CE1C8AB97B"}
 */
function TAB_change()
{

/*
 *	TITLE    :	TAB_change
 *			  	
 *	MODULE   :	wf_PRJ_project
 *			  	
 *	ABOUT    :	changes tab, shows correct buttons, shows/hides edit arrow
 *			  	
 *	INPUT    :	1- (optional) tab to navigate to
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	TAB_change
 *			  	
 *	MODIFIED :	January 21, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */
	
	//MEMO: need to somehow put this section in a Function of it's own
	//running in Tano...strip out jsevents for now
	if (utils.stringToNumber(application.getVersion()) >= 5) {
		//cast Arguments to array
		var Arguments = new Array()
		for (var i = 0; i < arguments.length; i++) {
			Arguments.push(arguments[i])
		}
		
		//reassign arguments without jsevents
		arguments = Arguments.filter(globals.CODE_jsevent_remove)
	}
	
	//tab clicked on
	var elemName = (arguments[0]) ? 'tab_b' + arguments[0] : null
	var formName = (elemName) ? controller.getName() : null
	
	globals.TAB_change_inline(formName,elemName,'tab_main','tab_b')
	
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B580294F-7BFD-4588-9235-36CD85B9D067"}
 */
function FORM_on_show(firstShow, event) {
	//if there aren't any records, make one
	if (firstShow) {
		if (!utils.hasRecords(foundset)) {
			controller.newRecord()
		}
	
		//on first show of form, show correct field
		forms.WEB_0F_install__setup.FLD_data_change__type_server(null,type_server)
	}
	forms.WEB_0F_install__rewrite.TOGGLE_sample_rewrite()
	globals.TRIGGER_toolbar_record_navigator_set(false)
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"FF2B5DFA-942F-4BB5-A8C6-EAFF6672B439"}
 */
function FORM_on_hide(event) {
	globals.TRIGGER_toolbar_record_navigator_set(true)
}

/**
 * @properties={typeid:24,uuid:"4F279C02-A6B1-4827-B8D0-9CAF7CEB4B9D"}
 */
function ACTION_get_install() {
	if (utils.hasRecords(foundset)) {
		switch (type_server) {
			case 'Mac':
				return directory_mac
				break
			case 'Windows':
				return directory_windows
				break
			case 'Linux':
				return directory_linux
				break
			default:
				return ''
		}
	}
}

/**
 * @properties={typeid:24,uuid:"F463DC1E-D199-40F4-A256-E0A39F2072B9"}
 */
function ACTION_get_server() {
	if (utils.hasRecords(foundset)) {
		return type_server
	}
}

/**
 * @properties={typeid:24,uuid:"6A6EC81E-EC01-4277-B8D8-F3D06627EC7C"}
 */
function FUNCTION_getInstallDirectory() {
	var error = null
	
	if ( type_server ) {
		switch (type_server) {
			case "Mac":	
				if ( directory_mac ) {
					return directory_mac
				}
				else {
					error = "Install directory not specified"
				}
			break;
			case "Windows":
				if ( directory_windows ) {
					return directory_windows
				}
				else {
					error = "Install directory not specified"
				}
			break
			case "Linux":	
				if ( directory_linux ) {
					return directory_linux
				}
				else {
					error = "Install directory not specified"
				}
			break
		}
	}
	else {
		error = "Installation record not setup"
	}
	
	if ( error ) {
		plugins.dialogs.showErrorDialog( "Error", error )
		return error
	}
}

/**
 * Handle focus element loosing focus.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"051111AA-C22E-4FC5-8586-D26223A2327F"}
 */
function FIELD_directory_onLost(event) {
	// don't allow trailing "/"
	databaseManager.saveData()
	var provider = elements[event.getElementName()].getDataProviderID()
	
	if ( this[provider] && this[provider].search(/\/*$/) > 0 ) {
		this[provider] = this[provider].replace(/\/*$/, "")
		databaseManager.saveData()
	}
	// don't allow trailing "\\"
	if ( event.getElementName() == "fld_directory_windows" &&
		 this[provider] && this[provider].search(/\/*$/) > 0 ) {
		
		this[provider] = this[provider].replace(/\\*$/, "")
		databaseManager.saveData()		
	}
}
