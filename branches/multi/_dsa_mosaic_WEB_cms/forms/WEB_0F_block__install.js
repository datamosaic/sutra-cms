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
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B35419C5-A7AC-4548-B08F-C72388A80B4F"}
 */
function FORM_on_show(firstShow, event) {
	if (firstShow) {
		//not running in frameworks, scope appropriately
		if (!application.__parent__.solutionPrefs) {
			FOUNDSET_restrict(null,null,true)
		}
	}
	
	//set global for site records
	globals.WEB_block_scope = 3

	//disable workflow form if no records
	if (!utils.hasRecords(foundset)) {
		globals.WEB_lock_workflow(true)
	}
}

/**
 * @properties={typeid:24,uuid:"57648298-D5DB-4B84-90DA-FE29AAF766D1"}
 */
function FOUNDSET_restrict() {
	forms.WEB_0F_scrapbook.FOUNDSET_restrict(returnContent, returnSite, noSutra)
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
	forms.WEB_0F_scrapbook.REC_new()
}

/**
 * @properties={typeid:24,uuid:"A5DEC027-0B50-487E-9B5A-518297598C05"}
 */
function REC_delete() {
	forms.WEB_0F_scrapbook.REC_delete()
}
