/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"677AC4CD-7827-49A0-BCD6-6EEE5D3D33CC"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1F6CF598-4838-4641-86AC-D810EEC6718E"}
 */
function ACTIONS_list(event) {
	//hand off to asset's actions
	var template = forms.WEB_0F_asset.MAP_asset(asset_type)
	
	if (template && template.formName && solutionModel.getForm(template.formName).getFormMethod('ASSET_actions')) {
		
		forms[template.formName].ASSET_actions(event,foundset.getSelectedRecord())
	}
	else {
		globals.DIALOGS.showInformationDialog(
					'Alert',
					'This type of asset has no actions defined'
				)
	}
}

/**
 * @properties={typeid:24,uuid:"6B2F8112-92F0-485B-A0CF-33381A40AEB8"}
 */
function TOGGLE_elements(isGroup) {
	elements.btn_add.enabled = isGroup
	elements.btn_actions.enabled = !isGroup
}
