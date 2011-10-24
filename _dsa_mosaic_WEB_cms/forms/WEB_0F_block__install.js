/**
 * @properties={typeid:35,uuid:"05AD2F46-2DB3-4588-AAAE-F7AB1C93C10B",variableType:-4}
 */
var _skipSelect = false;

/**
 * @properties={typeid:35,uuid:"4FDACEED-6F16-46F7-807B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"064EAE73-F4C1-4C3A-9A53-07F61AF2F316"}
 */
function FORM_on_load(event) {
	
}

/**
 * @properties={typeid:35,uuid:"A29A45BC-AF85-431C-9770-50DEE6E993BC"}
 */
var _selected = null;

/**
 * @properties={typeid:24,uuid:"B35419C5-A7AC-4548-B08F-C72388A80B4F"}
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
		
		globals.TRIGGER_navigation_filter_update(true)
		
//		if (_selected) {
//			foundset.selectRecord(application.getUUID(_selected))
//		}
//		
//		//ok to run rec_on_select
//		_skipSelect = false
	}
	
	//set global for site records
	globals.WEB_block_scope = 3

	//disable workflow form if no records
	if (!utils.hasRecords(foundset)) {
		globals.WEB_lock_workflow(true)
	}
	
	//refire rec on select
	forms.WEB_0F_block__scrapbook.REC_on_select()	
	
	//restore last selected toolbar
	if (application.__parent__.solutionPrefs && !solutionPrefs.config.lockStatus && forms.WEB_0F_page._lastToolbar) {
		//make sure on whatever last toolbar was
		globals.TRIGGER_toolbar_set(forms.WEB_0F_page._lastToolbar)
		
		forms.WEB_0F_page._lastToolbar = null
	}
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"7DA9C974-4445-403F-AB8E-3E749E23B079"}
 */
function REC_on_select(event) {
	//don't run too much at the beginning
	if (!_skipSelect) {
		_selected = id_block.toString()
	}
}

/**
 * @properties={typeid:24,uuid:"57648298-D5DB-4B84-90DA-FE29AAF766D1"}
 */
function FOUNDSET_restrict(noSutra) {
	return forms.WEB_0F_block__scrapbook.FOUNDSET_restrict(true, noSutra, 3)
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"2C6B0344-4096-4E8E-8D17-F9707FAEB21A"}
 */
function FORM_on_hide(event) {
	if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow) {
		globals.WEB_lock_workflow(false)
	}
	
	return true
}

/**
 * @properties={typeid:24,uuid:"8863C66D-CB58-44AF-BB28-7E3D36825E26"}
 */
function REC_new() {
	forms.WEB_0F_block__scrapbook.REC_new()
}

/**
 * @properties={typeid:24,uuid:"A5DEC027-0B50-487E-9B5A-518297598C05"}
 */
function REC_delete() {
	forms.WEB_0F_block__scrapbook.REC_delete()
	
	if (!utils.hasRecords(foundset)) {
		FORM_on_show()
	}
}
