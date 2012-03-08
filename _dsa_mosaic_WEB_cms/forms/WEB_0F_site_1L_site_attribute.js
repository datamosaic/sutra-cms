/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f43"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"DEF34869-664B-4878-93F5-CDA46C3C9A35"}
 */
function REC_delete()
{
	var delRec = plugins.dialogs.showWarningDialog(
					'Delete record',
					'Do you really want to delete this record?',
					'Yes',
					'No'
				)

	if (delRec == 'Yes') {
		controller.deleteRecord()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"A44B71A5-5245-41EA-842A-BBB5D6806D9B"}
 */
function REC_new() {
	controller.newRecord(false)
	elements.fld_attribute_key.requestFocus(false)
}

/**
 * @properties={typeid:24,uuid:"34A876C0-FB80-441B-A845-9FB3F9CFF5A4"}
 * @AllowToRunInFind
 */
function REC_on_select() {
	var fsAttribute = forms.WEB_0F_site_1L_attribute.foundset
	
	if (utils.hasRecords(foundset)) {
		fsAttribute.find()
		fsAttribute.id_site_attribute = id_site_attribute
		var results = fsAttribute.search()
	}
	else {
		fsAttribute.clear()
	}
}
