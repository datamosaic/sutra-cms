/**
 *
 * @properties={typeid:24,uuid:"C329DAD4-97EE-4890-A041-8621081A6FDF"}
 * @AllowToRunInFind
 */
function REC_delete() {
	var input =	globals.DIALOGS.showWarningDialog(
				"Warning!",
				"Delete this record?",
				"Yes",
				"No")
	
	if (input == "Yes") {
		var recDelete = foundset.getSelectedRecord()
		
		var fsHook = databaseManager.getFoundSet(foundset.getDataSource())
		fsHook.find()
		fsHook.id_site = forms.WEB_0F_site.id_site
		if (fsHook.search()) {
			for (var i = 1; i <= fsHook.getSize(); i++) {
				var record = fsHook.getRecord(i)
				
				//only re-order things at the top-level; leave holes down stream
				if (record.order_by > recDelete.order_by) {
					record.order_by--
				}
			}
		}
		
		controller.deleteRecord()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"B5455E00-A332-4E11-BD0B-6842E9688B78"}
 */
function REC_on_select() {
	if (foundset.getSize()) {
		SET_forms()
		SET_methods()
	}
}

/**
*
* @properties={typeid:24,uuid:"A1E31F1D-E5FE-4593-9274-FFFB42A18E85"}
*/
function REC_new() {
	controller.newRecord(false)
	order_by = foundset.getSize()
}

/**
 *
 * @properties={typeid:24,uuid:"53862617-D78C-4E5F-A247-44549739CD07"}
 */
function SET_forms() {
	//only show forms from selected module when in top level form
	if (application.__parent__.solutionPrefs && foundset.getSize() && hook_module) {
		//get from repository via queries way
		if (!solutionPrefs.repository.api && solutionPrefs.repository.allForms) {
			//load formNames for report module
			var moduleForms = solutionPrefs.repository.allForms[hook_module]
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
			var moduleForms = solutionPrefs.repository.workspace[hook_module]
		
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
	application.setValueListItems('WEB_site_hook_form', formNames)
}

/**
 *
 * @properties={typeid:24,uuid:"90EECA64-5221-4C34-AA05-1993516A12E2"}
 */
function SET_methods() {
	databaseManager.saveData()
	
	if (utils.hasRecords(foundset) && hook_form && forms[hook_form]) {
		var allMethods = forms[hook_form].allmethods
		if (allMethods && allMethods.length) {
			application.setValueListItems('WEB_site_hook_method',allMethods)
		}
		else {
			application.setValueListItems('WEB_site_hook_method',new Array())
		}
	}
	else {
		application.setValueListItems('WEB_site_hook_method',new Array())
	}
}
/**
 * Fill module picker
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"F23746B9-2219-464A-9806-413501AC81FF"}
 */
function FORM_on_load(event) {
	var moduleNames = new Array()
	
	//running in serclipse using a workspace
	if (solutionPrefs.clientInfo.typeServoy == 'developer' && utils.stringToNumber(solutionPrefs.clientInfo.verServoy) >= 4) {
		//limit to included modules
		repositoryPrefs = null
		globals.CODE_workspace_module(['_dsa_mosaic_WEB_cms'])
		moduleNames = repositoryPrefs.allModules
	}
	//only get methods from repository in <= 3.5.x or >= 4.x client
	else if (!solutionPrefs.repository.api) {
		globals.NAV_meta_module_names(['_dsa_mosaic_WEB_cms'])
		
		for (var i in repositoryPrefs.allModules) {
			moduleNames.push(i)
		}
		moduleNames.sort()
	}
	
	application.setValueListItems('WEB_site_hook_module',moduleNames)
}

/**
*
* @properties={typeid:24,uuid:"4DB15F97-736F-489E-849C-A534749C3D29"}
*/
function DIR_down() {
	//if max index, exit
	if (foundset.getSelectedIndex() == foundset.getSize()) {
		return
	}
	
	//if index = 1, set flag to avoid glitch recSelected
	//TODO: find issue
	if (foundset.getSelectedIndex() == 1) {
		var recOne = true
	}
	else {
		var recOne = false
	}
	
	//get current record
	var recordCurr = foundset.getRecord(foundset.getSelectedIndex())
	
	//get next record
	var recordNext = foundset.getRecord(foundset.getSelectedIndex() + 1)
	
	//swap with next record
	recordCurr.order_by = recordNext.order_by
	recordNext.order_by --
	
	foundset.sort('order_by asc')
	
	//TODO: find issue
	if (recOne) {
		controller.setSelectedIndex(2)
	}
}

/**
*
* @properties={typeid:24,uuid:"8D754FB1-0313-4EDE-BBD6-E014904557EB"}
*/
function DIR_up() {
	//if index = 1, exit
	if (foundset.getSelectedIndex() == 1) {
		return
	}
	
	//get current record
	var recordCurr = foundset.getRecord(foundset.getSelectedIndex())
	
	//get previous record
	var recordPrev = foundset.getRecord(foundset.getSelectedIndex() - 1)
	
	//swap with previous record
	recordCurr.order_by = recordPrev.order_by
	recordPrev.order_by ++
	
	foundset.sort('order_by asc')
}