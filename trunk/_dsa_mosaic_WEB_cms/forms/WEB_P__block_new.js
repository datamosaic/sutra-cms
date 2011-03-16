/**
 * @properties={typeid:35,uuid:"FDC64E51-AC73-4E7D-B1F3-2BC7BF6F63BF"}
 */
var _formName = null;

/**
 * @properties={typeid:35,uuid:"F327F07C-338B-4311-BDA6-6B576EDB531D"}
 */
var _moduleName = null;

/**
 * Action to close FiD
 * 
 * @author Data Mosaic (C)
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2ACC6C8F-7A32-47A3-94E9-09681D5308AB"}
 */
function ACTION_ok(event) {
	globals.CODE_hide_form = 1
	// punch form variable value into destination form as a "property" since can't access this form's vars from other form methods
	if (application.__parent__.solutionPrefs && solutionPrefs.config.currentFormName) {
		forms[solutionPrefs.config.currentFormName]._formName = _formName
	}
	// only work for new blocks....should also work for assets
	else {
		forms.WEB_0F_block_type._formName = _formName
	}
	
	application.closeFormDialog('cmsBlockNew')
}

/**
 *
 * @properties={typeid:24,uuid:"63FC4059-3825-4293-80EF-64B099DE9F60"}
 */
function ACTION_cancel()
{
	globals.CODE_hide_form = 1
	application.closeFormDialog('cmsBlockNew')
}

/**
 *
 * @properties={typeid:24,uuid:"C0A6E5C8-6B2B-4F96-947A-75D00B7421D7"}
 */
function FORM_on_show()
{

//update label appropriately
if (application.__parent__.solutionPrefs && solutionPrefs.config.currentFormName) {
	switch (solutionPrefs.config.currentFormName) {
		case 'WEB_0F_asset_type':
			var labelName = 'New asset type'
			break
		case 'WEB_0F_block_type':
			var labelName = 'New block'
			break
	}
}
else {
	var labelName = 'New Block'
}

elements.lbl_header.text = labelName

globals.CODE_hide_form = 0

if (application.__parent__.solutionPrefs && solutionPrefs.config.currentFormName) {
	forms[solutionPrefs.config.currentFormName]._formName = null
}
// only work for new blocks....should also work for assets
else {
	forms.WEB_0F_block_type._formName = null
}

_formName = null
//_moduleName = null

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
 * @properties={typeid:24,uuid:"8BFD93DE-CEAD-4B0F-84D2-889EFE6BAF09"}
 */
function FLD_moduleName__data_change(oldValue, newValue, event) {
	//only show forms from selected module when in top level form
if (application.__parent__.solutionPrefs && _moduleName) {
	//get from repository via queries way
	if (!solutionPrefs.repository.api) {
		//load formNames for report module
		var moduleForms = solutionPrefs.repository.allForms[_moduleName]
		var formNames = new Array()
		var j = 0
		
		//check to make sure that there are forms in the report module
		if (moduleForms) {
			for (var i in moduleForms) {
				formNames[j++] = moduleForms[i].formName
			}
		}
	}
	//get from the workspace
	else if (solutionPrefs.repository.workspace) {
		var moduleForms = solutionPrefs.repository.workspace[_moduleName]
	
		var formNames = new Array()
		var j = 0
		
		if (moduleForms) { //check to make sure module_filter has a loaded value (they chose something)
			for (var i in moduleForms) {
				formNames[j++] = i
			}
		}
	}
}
//when in reporting module, show forms anyway
else {
	var formNames = forms.allnames
}

formNames = formNames.sort()

//set valuelist
application.setValueListItems('WEB_form_names', formNames)

}
