/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f32"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2F7F3445-277A-4DA8-948D-58099A1B41C3"}
 */
function FORM_on_show(firstShow, event) {
	forms.WEB_0F_page__design__content_1L_area.REC_selected()
}

/**
 *
 * @properties={typeid:24,uuid:"2A684B84-9416-419A-B6EC-6F91209B4DA1"}
 */
function TAB_header_size() {
	
	var input = arguments[0]
	
	switch (input) {
		case 'A':
			return 44
			break
		case 'B':
			return 200
			break
		default:
		case 'space':
			return 5
			break
	}

}

/**
 *
 * @properties={typeid:24,uuid:"23B7AC31-3444-4F11-BDE4-748066C79D30"}
 */
function REC_on_select() {
	//turn off REC_on_select for newly added page
	if (!forms.WEB_0T_page._addRecord) {
	 	//set version junks
		var vlReal = SET_globals()
		
		//set active version active
		globals.WEB_version_selected = (vlReal.length) ? vlReal[0] : 0	
		
		//update editable/non stuff
		forms.WEB_0F_page__design__header_display.FLD_data_change__version_selected()
		
		//fill groups value list
		SET_groups()
		
		//page type ui differences
		PAGE_type_display()
		
		//set tooltip of visit with link
		forms.WEB_0F_page__design__button_tab__content.elements.btn_visit.toolTipText = globals.WEB_MRKUP_link_page(id_page)
	}
}

/**
 *
 * @properties={typeid:24,uuid:"D40BE6AF-FEC6-47BB-BB60-1AC7EE4869B2"}
 */
function SET_groups() {
	var vlDisplay = new Array()
	var vlReal = new Array()
	var fsGroups = forms.WEB_0F_site.web_site_to_group
	
	//groups used throughout this page
	var dsGroups = databaseManager.getDataSetByQuery(
						controller.getServerName(), 
						'SELECT DISTINCT id_group FROM web_area where id_page = ? ',
						[id_page],
						-1
					)
	
	//this site has groups
	if (utils.hasRecords(fsGroups)) {
		//dataset is valid and contains non-null value
		if (dsGroups && dsGroups.getMaxRowIndex() && !(dsGroups.getMaxRowIndex() == 1 && dsGroups.getValue(1,1) == null)) {
			var usedGroups = dsGroups.getColumnAsArray(1)
			
			//go through all used groups and find their name
			groupLoop:
			for (var h = 0; h < usedGroups.length; h++) {
				
				for (var i = 1; i <= fsGroups.getSize(); i++) {
					var recGroup = fsGroups.getRecord(i)
					
					//match found, go to next item
					if (recGroup.id_group == usedGroups[h]) {
						vlReal.push(recGroup.id_group)
						vlDisplay.push(recGroup.group_name)
						
						continue groupLoop
					}
				}
			}
		}
		//dataset is not valid, put in default option
		else {
			var recGroup = fsGroups.getRecord(1)
			
			vlReal.push(recGroup.id_group)
			vlDisplay.push(recGroup.group_name)
		}
	}
	
	//sort groups alphabetically?
	
	application.setValueListItems('WEB_group',vlDisplay,vlReal)
	
	//if current group global does not exist in the globals valuelist, reset to first group
	if (vlReal.filter(function(item) { return item == globals.WEB_group_selected; }).length < 1) {
		globals.WEB_group_selected = vlReal[0]
	}
}

/**
 *
 * @properties={typeid:24,uuid:"7853ABD5-E8E0-41C7-BDB7-C552BB9BF299"}
 */
function SET_globals() {
	//fill versions value list
	var fsVersions = web_page_to_version
	
	var vlReal = new Array()
	var vlDisplay = new Array()	
	
	if (utils.hasRecords(fsVersions)) {
//		fsVersions.sort('version_number desc')
		
		for (var i = 1; i <= fsVersions.getSize(); i++) {
			var recVersion = fsVersions.getRecord(i)
			
			vlReal.push(recVersion.id_version)
			
			var displayVal = ''
			
			if (recVersion.flag_active) {
				displayVal += '<html><body><strong>ACTIVE</strong> '
			}
			
			if (!recVersion.flag_active && i == 1) {
				displayVal += 'Working copy'
			}
			else {
				displayVal += 'Snapshot ' + recVersion.version_number + ' (' + globals.CODE_date_format(recVersion.rec_modified,'current') + ')'
				
				if (recVersion.version_name) {
					displayVal += ': ' + recVersion.version_name
				}
			}	
			vlDisplay.push(displayVal)
		}
	}
	
	application.setValueListItems('WEB_snapshot',vlDisplay,vlReal)
	
	return vlReal
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"CBA4256A-1CF7-42E4-A265-237E6AB08408"}
 */
function BLOCK_click(event) {
	
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0F8B8765-1036-412D-88DB-7C65A6C6710C"}
 */
function FORM_on_load(event) {
	elements.gfx_curtain.visible = false
}

/**
 * @properties={typeid:24,uuid:"D5C2AE5A-0CE4-42D3-AAF1-B277E73B748A"}
 */
function PAGE_type_display() {
	if (!forms.WEB_0T_page._addRecord) {
		forms.WEB_0F_page__design__header_edit.TOGGLE_fields(page_type)
	}
}
