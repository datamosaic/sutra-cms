/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f27"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011, 2012 Data Mosaic \
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
			
			type_server = 'Mac'
			directory_linux = '/opt/servoy'
			directory_mac = '/Applications/Servoy'
			directory_windows = '/Servoy'
		}
	
		//on first show of form, show correct field
		forms.WEB_0F_install__setup.FLD_data_change__type_server(null,type_server)
	}
	
	forms.WEB_0F_install__rewrite.TOGGLE_sample_rewrite()
	
	globals.WEBc_sutra_trigger('TRIGGER_toolbar_record_navigator_set',[false])
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
	globals.WEBc_sutra_trigger('TRIGGER_toolbar_record_navigator_set',[true])
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
