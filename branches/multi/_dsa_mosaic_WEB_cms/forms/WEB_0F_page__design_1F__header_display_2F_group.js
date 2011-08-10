/**
 * @properties={typeid:35,uuid:"04fde549-69cc-4de9-af47-7f7c22221f18"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"BD5FE2EA-F2A6-4567-BABE-0AF6206F5164",variableType:-4}
 */
var _group = databaseManager.getFoundSet('sutra_cms','web_group');

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EFCD9794-A953-4189-BAB1-F7D6F1642B47"}
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
 * @properties={typeid:24,uuid:"7475668E-9941-4A79-A3A2-34BD1BF73668"}
 */
function FLD_group__data_change(oldValue, newValue, event) {
	//area name
	if (utils.hasRecords(forms.WEB_0F_page__design_1F_version_2L_area.foundset)) {
		var areaName = forms.WEB_0F_page__design_1F_version_2L_area.area_name
		
		//block index
		if (utils.hasRecords(forms.WEB_0F_page__design_1F_version_2L_scope.foundset)) {
			var blockIndex = forms.WEB_0F_page__design_1F_version_2L_scope.foundset.getSelectedIndex()
		}
	}
	
	//call method that reloads up appropriate records
	forms.WEB_0F_page__design.REC_on_select(null,null,null,null,areaName,blockIndex)
	
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"983C44BC-606D-49E2-A8E2-A49DAAC9DCCA"}
 */
function ADD_group(event) {
	//get all possible groups
	var fsGroupAll = web_page_to_site.web_site_to_site_group
	
	//get all configured groups
	var fsGroup = web_page_to_group
	
	//no more to add
	if (fsGroup.getSize() == fsGroupAll.getSize()) {
		//show info that logout canceled
		plugins.dialogs.showWarningDialog(
				'Warning',
				'No more groups to add'
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
		var keysGroup = databaseManager.getFoundSetDataProviderAsArray(fsGroup, 'id_site_group')
		keysGroup = keysGroup.map(function(item) {return item.toString()})
		
		var vlDisplay = new Array()
		var vlReal = new Array()
		
		//loop all possible groups
		for (var i = 1; i <= fsGroupAll.getSize(); i++) {
			var record = fsGroupAll.getRecord(i)
			
			//this value doesn't exist on the page yet
			if (keysGroup.indexOf(record.id_site_group.toString()) == -1) {
				vlDisplay.push(record.group_name)
				vlReal.push(record.id_site_group)
			}
		}
		
		//set valuelist
		application.setValueListItems('WEB_page_stuff',vlDisplay,vlReal)
		
		//set callback method
		forms.WEB_P__page__new._callbackMethod = CREATE_group
		
		//figure where the clicked component is (2nd split, 1st tabpanel)
		var refTab = forms.WEB_0F_page__design_1F__header_display.elements.tab_group
		var refSplit = forms.WEB_0F_page__design_1F__header_display.elements.split_picker_1
		var refSplitSub = forms.WEB_0F_page__design_1F__header_display.elements.split_picker_2
		//(tab panel position, plus width, minus offset to center of graphic) plus space offset
		var x = refSplit.getX() + refSplitSub.dividerLocation + refTab.getLocationX() + (refTab.getWidth() - 12) + 200
		//position plus header plus (if toolbars showing) plus offset to top of workflow form
		var y = elements.fld_group.getLocationY() + 44 + 40 + refTab.getLocationY() + forms.WEB_0F_page__design.elements.tab_header_detail.getLocationY()
		
		//show the form
		globals.TRIGGER_dialog_small(
					true,
					'touch',
					'WEB_P__page__new',
					false,
					x,y,
					null,null,
					'Add group',
					'Cancel',
					null,
					true,
					0
				)
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D778D699-75AA-405E-AF4A-1DEAEDD92D3C"}
 */
function DEL_group(event) {
	//cannot delete last group
	if (web_page_to_group.getSize() > 1) {
		var delRec = plugins.dialogs.showWarningDialog(
						'Delete record',
						'Do you really want to delete this record?',
						'Yes',
						'No'
					)
	
		if (delRec == 'Yes') {
			//halt additional on select firing; gets turned back on in forms.WEB_0F_page__design.REC_on_select(true)
			forms.WEB_0F_page__design_1F_version_2L_scope._skipSelect = true
			
			//turn on feedback indicators
			var progressText = 'Deleting group "' + application.getValueListDisplayValue('WEB_page_group__all',globals.WEB_page_group) + '" from page...'
			globals.TRIGGER_progressbar_start(null,progressText)
			globals.CODE_cursor_busy(true)
			
			//select this group
			web_page_to_group.selectRecord(globals.WEB_page_group)
			
			//whack it
			web_page_to_group.deleteRecord()
			
			//delete all versions for this group
			var fsVersion = databaseManager.getFoundSet('sutra_cms','web_version')
			fsVersion.find()
			fsVersion.id_group = globals.WEB_page_group.toString()
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
				'There must always be one group'
			)
	}
}

/**
 * @properties={typeid:24,uuid:"8D0AF549-81D3-494B-AA4F-80BEBBD8A8B9"}
 */
function CREATE_group(versionOld) {
	
	var thisID = globals.WEB_page_group
	
	//something selected
	if (thisID) {
		//turn on feedback indicators
		globals.CODE_cursor_busy(true)
		
		//this page
		var pageRec = forms.WEB_0F_page__design.foundset.getSelectedRecord()
		
		//create group record
		var groupNew = pageRec.web_page_to_group.getRecord(pageRec.web_page_to_group.newRecord(false,true))
		groupNew.id_site_group = thisID
		databaseManager.saveData(groupNew)
		
		//save this record onto the form
		_group.loadRecords(groupNew.id_group)
		
		//turn off feedback indicators if on
		globals.CODE_cursor_busy(false)
		
		return 'Group "' + groupNew.group_name + '" added.\n'
	}
	else {
		plugins.dialogs.showErrorDialog(
					'Error',
					'Group not selected'
			)
		return false
	}
}

/**
 * @properties={typeid:24,uuid:"E795E963-DACD-4EB6-84B9-6EDF5BEE8170"}
 */
function SET_tooltip() {
	if (utils.hasRecords(_group)) {
		elements.fld_group.toolTipText = 'ID: ' + _group.url_param
	}
	else {
		elements.fld_group.toolTipText = ''
	}
}
