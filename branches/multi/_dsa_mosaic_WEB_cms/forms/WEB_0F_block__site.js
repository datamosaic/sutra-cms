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
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2FE1C8C9-8C64-47A2-9887-66A5C2FF1BC7"}
 */
function FORM_on_show(firstShow, event) {
	//not running in frameworks, scope appropriately
	if (!application.__parent__.solutionPrefs) {
		FOUNDSET_restrict(true)
	}
	
	//set global for site records
	globals.WEB_block_scope = 2

	//disable workflow form if no records
	if (!utils.hasRecords(foundset)) {
		globals.WEB_lock_workflow(true)
	}
	
	//refire rec on select
	forms.WEB_0F_scrapbook.REC_on_select()
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
	forms.WEB_0F_scrapbook.REC_new()
}

/**
 * @properties={typeid:24,uuid:"C6370DDA-EC65-4BE2-9127-A873867C2674"}
 */
function REC_delete() {
	forms.WEB_0F_scrapbook.REC_delete()
}

/**
 * @properties={typeid:24,uuid:"DF8736B4-8AF2-4D25-9AA1-B92968C11944"}
 */
function FOUNDSET_restrict(noSutra) {
	return forms.WEB_0F_scrapbook.FOUNDSET_restrict(true, noSutra, 2)
}
