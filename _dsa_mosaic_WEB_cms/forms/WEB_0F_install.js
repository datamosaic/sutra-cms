/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f27"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"85B4B595-6A2C-4A80-89FF-572D7754FA70"}
 */
var rewriteSample = '<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE urlrewrite PUBLIC "-//tuckey.org//DTD UrlRewrite 2.6//EN"\n        "http://tuckey.org/res/dtds/urlrewrite2.6.dtd">\n\n<!--\n    Configuration file for Sutra CMS by Data Mosaic\n	http://www.data-mosaic.com/\n	\n	Rewriting provided by UrlRewriteFilter\n	http://tuckey.org/urlrewrite/\n-->\n\n\n<urlrewrite>\n\n<!--	generic top		-->\n	\n	<rule>\n		<name>Generic CMS .html inbound</name>\n		<note>All html files (any URL with ".html") will be fed into sutraCMS/index.jsp</note>\n		<from>^/(.*?).html(?:\?*)(.*)</from>\n		<to>/sutraCMS/index.jsp?pretty=$1&amp;$2</to>\n	</rule>\n\n	<rule>\n		<name>Generic CMS .jsp</name>\n		<note>All jsp files (any URL with ".jsp") served up from sutraCMS directory. NOTE: Exceptions should be added to this rule and then rewritten in a later rule.</note>\n		<from>(^.*.jsp.*$)</from>\n		<to>/sutraCMS/$1</to>\n	</rule>\n\n	<rule>\n		<name>Generic CMS home page</name>\n		<note>When no page specified, serve the default page for the requested domain</note>\n		<from>^/$</from>\n		<to>/sutraCMS/index.jsp</to>\n	</rule>	\n	\n<!--	site specifc	-->\n	\n	<rule>\n		<name>My cool site</name>\n		<note>Other files (non-html, non-jsp) pushed to site document root</note>\n		<condition name="host">\n			sitename\n		</condition>\n		<from>(^((?!^.*\b(html|jsp)\b.*$).)*)</from>\n		<to>/sutraCMS/sites/my_cool_site/$1</to>\n	</rule>\n\n\n</urlrewrite>';

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"4212DD65-CD73-428B-93F1-BF5190DECD1F"}
 */
function FLD_data_change__type_server(oldValue, newValue, event) {
	
	switch (newValue) {
		case 'Mac':
			elements.fld_directory_linux.visible = false
			elements.fld_directory_mac.visible = true
			elements.fld_directory_windows.visible = false
			break
		case 'Windows':
			elements.fld_directory_linux.visible = false
			elements.fld_directory_mac.visible = false
			elements.fld_directory_windows.visible = true
			break
		case 'Linux':
			elements.fld_directory_linux.visible = true
			elements.fld_directory_mac.visible = false
			elements.fld_directory_windows.visible = false
			break
		default:
			elements.fld_directory_linux.visible = false
			elements.fld_directory_mac.visible = false
			elements.fld_directory_windows.visible = false
	}
	
	return true
}

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
		FLD_data_change__type_server(null,type_server)	
	}
	
	TOGGLE_sample_rewrite()
	
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
 * @properties={typeid:24,uuid:"BC2B89EA-1253-4CDF-9430-11670FB3D100"}
 */
function TOGGLE_sample_rewrite(input) {
	if (typeof input != 'boolean') {
		input = (rewrite_enabled) ? true : false
	}
	
	elements.lbl_rewriteSample.visible = input
	elements.var_rewriteSample.visible = input
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
	if ( event.getElementName() == "fld_directory_windows") {
		if ( this[provider] && this[provider].search(/\/*$/) > 0 ) {
			this[provider] = this[provider].replace(/\\*$/, "")
			databaseManager.saveData()		
		}
	}
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"49C33D11-866C-4561-99E2-4A26E9DECC2F"}
 */
function FLD_data_change__rewrite_enabled(oldValue, newValue, event) {
	databaseManager.saveData()
	TOGGLE_sample_rewrite()
}
