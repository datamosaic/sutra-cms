/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1F3E9055-815C-4431-9A27-4598037BEBE2",variableType:12}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:24,uuid:"16EFF9D5-4060-4114-A127-26B46B634753"}
 */
function TAB_change(event) {
	globals.TAB_change_grid()
	
	//do correct find
	LOAD_records()
}

/**
 * @properties={typeid:24,uuid:"F2E07645-B906-4323-AE18-19548E88B542"}
 * @AllowToRunInFind
 */
function LOAD_records() {
	var fsLog = forms.WEB_0F_page__design_1F__log_2L_log.foundset
	fsLog.find()
	fsLog.log_type = 'scrapbook'
	fsLog.record_id = id_block
	switch (elements.tab_detail.tabIndex) {
		case 1: //all
			
			break
		case 2: //edit
			fsLog.log_message = 'scrapbook edit%'
			break
		case 3: //reorder
			fsLog.log_message = 'scrapbook reorder%'
			break
		case 4: //versions
			fsLog.log_message = 'scrapbook version%'
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
 * @properties={typeid:24,uuid:"135F6F9F-43CE-4DC4-9543-33C591771AF7"}
 */
function FORM_on_show(firstShow, event) {
	LOAD_records()
}
