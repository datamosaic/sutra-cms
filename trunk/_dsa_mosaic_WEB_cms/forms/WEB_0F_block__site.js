/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4FDACEFD-6F16-46F7-807A-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"6AD885C6-45C7-40AF-A500-F2B862DC9BE0"}
 */
function FORM_on_load(event) {
	
}

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"7B4A5AEA-D362-44CA-ACAE-0C27B6AB7B1C"}
 */
var _selected = null;

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"78D5C064-054C-442E-8C40-8B5DD85EA121",variableType:-4}
 */
var _skipSelect = false;

/**
 * @properties={typeid:24,uuid:"2FE1C8C9-8C64-47A2-9887-66A5C2FF1BC7"}
 */
function FORM_on_show(firstShow, event) {
	//not running in frameworks, scope appropriately
	if (!application.__parent__.solutionPrefs) {
		FOUNDSET_restrict(true)
	}
	//in sutra, re-fire restriction enzyme
	else {
//		//don't run rec_on_select until we're done
//		_skipSelect = true
		
		globals.WEBc_sutra_trigger('TRIGGER_navigation_filter_update',[true])
		
//		if (_selected) {
//			foundset.selectRecord(application.getUUID(_selected))
//		}
//		
//		//ok to run rec_on_select
//		_skipSelect = false
	}
	
	//set global for site records
	globals.WEB_block_scope = 2

	//disable workflow form if no records
	if (!utils.hasRecords(foundset)) {
		//make sure that doesn't lock us out of left-side lists
		if (solutionPrefs.config.activeSpace == 'workflow') {
			solutionPrefs.config.activeSpace = 'standard'
		}
		
		globals.WEB_lock_workflow(true)
	}
	
	//refire rec on select
	forms.WEB_0F_block__scrapbook.REC_on_select()
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"A7E8E770-A7AC-469E-AE39-43D84BA38A3F"}
 */
function FORM_on_hide(event) {
	if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow) {
		globals.WEB_lock_workflow(false)
	}
	
	return true
}

/**
 * @properties={typeid:24,uuid:"CD3AFEB7-E52F-41CE-A386-1B1ADD6DBCDA"}
 */
function REC_new() {
	forms.WEB_0F_block__scrapbook.REC_new()
}

/**
 * @properties={typeid:24,uuid:"C6370DDA-EC65-4BE2-9127-A873867C2674"}
 */
function REC_delete() {
	forms.WEB_0F_block__scrapbook.REC_delete()
	
	if (!utils.hasRecords(foundset)) {
		FORM_on_show()
	}
}

/**
 * @properties={typeid:24,uuid:"DF8736B4-8AF2-4D25-9AA1-B92968C11944"}
 */
function FOUNDSET_restrict(noSutra) {
	return forms.WEB_0F_block__scrapbook.FOUNDSET_restrict(true, noSutra, 2)
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"5AAC0E7A-8481-4E72-BC31-E52BE86D409D"}
 */
function REC_on_select(event) {
	//don't run too much at the beginning
	if (!_skipSelect) {
		_selected = id_block.toString()
		
		if (elements.tab_detail.tabIndex == 2) {
			forms.WEB_0F_block__scrapbook__log.LOAD_records()
		}
	}
}

/**
 * @properties={typeid:24,uuid:"7A045E30-3221-4ACA-8566-8AA0EDDD7FD5"}
 */
function REC_refresh() {
	forms.WEB_0F_block__scrapbook.REC_refresh()
}
