/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f19"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean} valid value
 *
 * @properties={typeid:24,uuid:"4FCD8412-C8D2-4B99-92FA-B1A96F9984E0"}
 * @AllowToRunInFind
 */
function FLD_data_change__block_name(oldValue, newValue, event) {

	var fsBlockType = databaseManager.getFoundSet(controller.getServerName(),controller.getTableName())
	fsBlockType.find()
	fsBlockType.id_site = forms.WEB_0F_site.id_site
	fsBlockType.block_name = newValue
	var results = fsBlockType.search()

	if (results > 1) {
		globals.DIALOGS.showErrorDialog(
					'Error',
					'This block name is not unique...rename'
			)
		block_name = oldValue
		return false
	}

	if (scopes.SLICK && scopes.SLICK.CONST.enabled) {
		scopes.SLICK.updateUL(oldValue,newValue,event)
	}

	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"7BD4A6A0-6B1F-44A7-B568-6DE0DE6B06E2"}
 */
function TAB_key_change(event) {
	globals.TAB_change_grid(null,null,'tab_key','tab_k','btn_key_add','btn_key_actions','btn_key_help')
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"BB3E7EFA-EE07-453A-8B1C-E4DEF897D44D"}
 */
function TAB_key_add(event) {
	globals.TAB_btn_rec_new(null,'tab_key')
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4FE94177-EF8D-49B1-855F-D9F35D57EB6E"}
 */
function REC_on_select(event) {
	var fsPages = forms.WEB_0F_block_type__block_1L_page.foundset

	//there is something to do on this page
	if (utils.hasRecords(foundset)) {
		globals.CODE_cursor_busy(true)

		var query =
"SELECT DISTINCT c.id_page FROM web_platform a, web_version b, web_page c WHERE  \
b.id_version IN ( \
SELECT DISTINCT c.id_version from web_block a, web_scope b, web_area c WHERE  \
c.id_area = b.id_area AND \
b.id_block = a.id_block AND \
a.id_block_type = ? \
) AND \
a.id_platform = b.id_platform AND \
a.id_page = c.id_page"

		var dataset = databaseManager.getDataSetByQuery(
					'sutra_cms',
					query,
					[id_block_type.toString()],
					-1
				)

		//load correct pages that this is used on
		fsPages.loadRecords(dataset)

		globals.CODE_cursor_busy(false)
	}
	//clear out the related pages link
	else {
		fsPages.clear()
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
 * @properties={typeid:24,uuid:"0102A5D3-E8AA-4536-B8D8-89C1CDA3C67A"}
 */
function FLD_data_change__form_name(oldValue, newValue, event) {
	//get methods for current form
	var formMethods = (form_name && forms[form_name]) ? forms[form_name].allmethods : new Array()

	application.setValueListItems('WEB_block_type_method', formMethods)
}
