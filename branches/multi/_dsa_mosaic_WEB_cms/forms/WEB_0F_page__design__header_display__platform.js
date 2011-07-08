/**
 * @properties={typeid:35,uuid:"ABFD0EB1-0F74-4CF1-B2B2-F2E1FF0D80B9",variableType:-4}
 */
var _platform = databaseManager.getFoundSet('sutra_cms','web_platform');

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8AF8FFC8-7E48-4314-8FD9-D599644A8A4F"}
 */
function FORM_on_load(event) {
	//set combobox to be small on os x
	globals.CODE_property_combobox(false, 'mini')
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
 * @properties={typeid:24,uuid:"71AFFAAB-6812-4E03-B635-3145809A6D05"}
 */
function FLD_platform__data_change(oldValue, newValue, event) {
	//call method that reloads up appropriate records
	forms.WEB_0F_page__design.REC_on_select()
	
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"48C22B92-4169-492E-8D4C-C882E79CEC4B"}
 */
function ADD_platform(event) {
	//get all possible platforms
	var fsPlatformAll = web_page_to_site.web_site_to_site_platform
	
	//get all configured platforms
	var fsPlatform = web_page_to_platform
	
	//no more to add
	if (fsPlatform.getSize() == fsPlatformAll.getSize()) {
		//show info that logout canceled
		plugins.dialogs.showWarningDialog(
				'Warning',
				'No more platforms to add'
			)
	}
	else {
		//make sure on data mode so no heavyweights underneath
		if (globals.WEB_page_mode == 2) {
			var dataEvent = new Object()
			dataEvent.getElementName = function() {
					return 'lbl_mode_data'
				}
			
			forms.WEB_TB__web_mode.ACTION_mode(dataEvent)
			
			forms.WEB_P__page__new._guiMode = true
		}
		
		//figure out which ones to show
		var keysPlatform = databaseManager.getFoundSetDataProviderAsArray(fsPlatform, 'id_site_platform')
		keysPlatform = keysPlatform.map(function(item) {return item.toString()})
		
		var vlDisplay = new Array()
		var vlReal = new Array()
		
		//loop all possible platforms
		for (var i = 1; i <= fsPlatformAll.getSize(); i++) {
			var record = fsPlatformAll.getRecord(i)
			
			//this value doesn't exist on the page yet
			if (keysPlatform.indexOf(record.id_site_platform.toString()) == -1) {
				vlDisplay.push(record.platform_name)
				vlReal.push(record.id_site_platform)
			}
		}
		
		//set valuelist
		application.setValueListItems('WEB_page_stuff',vlDisplay,vlReal)
		
		//set callback method
		forms.WEB_P__page__new._callbackMethod = CREATE_platform
		
		//figure where the clicked component is (1st split, 1st tabpanel)
		var refTab = forms.WEB_0F_page__design__header_display.elements.tab_platform
		var refSplit = forms.WEB_0F_page__design__header_display.elements.split_picker_1
		var refSplitSub = forms.WEB_0F_page__design__header_display.elements.split_picker_2
		//(tab panel position, plus width, minus offset to center of graphic) plus space offset
		var x = refSplit.getX() + refSplitSub.getX() + refTab.getLocationX() + (refTab.getWidth() - 12) + 200
		//position plus header plus (if toolbars showing) plus offset to top of workflow form
		var y = elements.fld_platform.getLocationY() + 44 + 40 + refTab.getLocationY() + forms.WEB_0F_page__design.elements.tab_header_detail.getLocationY()
		
		//show the form
		globals.TRIGGER_dialog_small(
					true,
					'touch',
					'WEB_P__page__new',
					false,
					x,y,
					null,null,
					'Add platform',
					'Cancel',
					null,
					true,
					0
				)
	}
}

/**
 * @properties={typeid:24,uuid:"D4D9C306-4D18-4CE3-96F0-0D2CAB40BE75"}
 */
function CREATE_platform(versionOld) {
	var thisID = globals.WEB_page_platform
	
	//something selected
	if (thisID) {
		//turn on feedback indicators
		globals.CODE_cursor_busy(true)
		
		//this page
		var pageRec = forms.WEB_0F_page__design.foundset.getSelectedRecord()
		
		//current platform
		var fsPlatform = databaseManager.getFoundSet('sutra_cms','web_platform')
		fsPlatform.loadRecords([versionOld.id_platform])
		var platformOld = fsPlatform.getSelectedRecord()
		
		//create platform record (theme and layout)
		var platformNew = pageRec.web_page_to_platform.getRecord(pageRec.web_page_to_platform.newRecord(false,true))
		platformNew.id_site_platform = thisID
		platformNew.id_theme = platformOld.id_theme
		platformNew.id_layout = platformOld.id_layout
		databaseManager.saveData()
		
		//save this record onto the form
		_platform.loadRecords(platformNew.id_platform)
		
		//turn off feedback indicators if on
		globals.CODE_cursor_busy(false)
		
		return 'Platform "' + platformNew.platform_name + '" added.\n'
	}
	else {
		plugins.dialogs.showErrorDialog(
					'Error',
					'Platform not selected'
			)
		return false
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A4236D3E-DFCE-4102-8025-C98164A63BD2"}
 */
function DEL_platform(event) {
	//cannot delete last platform
	if (web_page_to_platform.getSize() > 1) {
		var delRec = plugins.dialogs.showWarningDialog(
						'Delete record',
						'Do you really want to delete this record?',
						'Yes',
						'No'
					)
	
		if (delRec == 'Yes') {
			//halt additional on select firing; gets turned back on in forms.WEB_0F_page__design.REC_on_select(true)
			forms.WEB_0F_page__design__content_1L_block._skipSelect = true
			
			//turn on feedback indicators
			var progressText = 'Deleting platform "' + application.getValueListDisplayValue('WEB_page_platform__all',globals.WEB_page_platform) + '" from page...'
			globals.TRIGGER_progressbar_start(null,progressText)
			globals.CODE_cursor_busy(true)
			
			//select this platform
			web_page_to_platform.selectRecord(globals.WEB_page_platform)
			
			//whack it
			web_page_to_platform.deleteRecord()
			
			//delete all versions for this platform
			var fsVersion = databaseManager.getFoundSet('sutra_cms','web_version')
			fsVersion.find()
			fsVersion.id_platform = globals.WEB_page_platform.toString()
			fsVersion.search()
			fsVersion.deleteAllRecords()
			
			//re-set up the page
			forms.WEB_0F_page__design.REC_on_select(true)
			
			//turn off feedback indicators if on
			globals.CODE_cursor_busy(false)
			globals.TRIGGER_progressbar_stop()
		}
	}
	else {
		plugins.dialogs.showWarningDialog(
				'Warning',
				'There must always be one platform'
			)
	}
}

/**
 * @properties={typeid:24,uuid:"DA7D66D4-4D7A-4396-88A2-9F999ECABD33"}
 */
function SET_tooltip() {
	if (utils.hasRecords(_platform)) {
		elements.fld_platform.toolTipText = 'ID: ' + _platform.url_param
	}
	else {
		elements.fld_platform.toolTipText = ''
	}
}
