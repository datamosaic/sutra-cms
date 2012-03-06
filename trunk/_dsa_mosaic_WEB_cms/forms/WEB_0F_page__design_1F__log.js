/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"11749CF6-FF5F-4737-B582-B56DBF8B4FCB",variableType:12}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:24,uuid:"574DBBB5-3179-40C0-BCCF-85CD3A4E069C"}
 */
function TAB_change(event) {
	globals.TAB_change_grid()
	
	//do correct find
	LOAD_records()
}

/**
 * @properties={typeid:24,uuid:"48D16638-53D8-4135-9F73-E5DC861AFA09"}
 * @AllowToRunInFind
 */
function LOAD_records() {
	var fsLog = forms.WEB_0F_page__design_1F__log_2L_log.foundset
	fsLog.find()
	fsLog.log_type = 'page'
	fsLog.record_id = id_page
	switch (elements.tab_detail.tabIndex) {
		case 1: //all
			
			break
		case 2: //edit
			fsLog.log_message = 'page edit%'
			break
		case 3: //reorder
			fsLog.log_message = 'page reorder%'
			break
		case 4: //versions
			fsLog.log_message = 'page version%'
			break
	}
	var results = fsLog.search()
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"5EEFD605-FDDD-4449-99AA-2EB7211C7EB6"}
 */
function FORM_on_show(firstShow, event) {
	LOAD_records()
}
