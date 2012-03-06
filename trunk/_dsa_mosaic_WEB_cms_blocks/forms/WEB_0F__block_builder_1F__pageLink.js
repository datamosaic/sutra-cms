/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C7D81C36-DD36-4C76-9F11-B462B1CEFB4F",variableType:12}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"346FEC3F-F398-4D41-AAED-610CCBB58F0B",variableType:12}
 */
var _link = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"346FEC3F-F398-6D41-AAED-610CCBB58F0B",variableType:12}
 */
var _name = null;

/**
 * @properties={typeid:24,uuid:"6E5DBDB8-F58E-40AB-9E1F-CF96F2CAD453"}
 * @AllowToRunInFind
 */
function INIT_data(data) {
	if (!(data instanceof Array)) {
		data = new Array(data)
	}
	
	for (var i = 0; i < data.length; i++) {
		var row = data[i]
		
		if (row && row.link && row.name) {
			var pageName = ''
			
			if (row.link.data) {
				var fsPage = databaseManager.getFoundSet('sutra_cms','web_page')
				fsPage.find()
				fsPage.id_page = row.link.data
				var results = fsPage.search()
				
				if (results) {
					pageName = fsPage.page_name
				}
			}
			
			_link = pageName
			_name = (row.name.data) ? row.name.data : pageName
			
			elements.lbl_link.text = row.link.label || solutionModel.getForm(controller.getName()).getLabel('lbl_link').text
			elements.lbl_name.text = row.name.label || solutionModel.getForm(controller.getName()).getLabel('lbl_name').text
		}
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B106DA14-241E-41A0-946A-FCB31366D1DE"}
 */
function PAGE_picker(event,record) {
	if (event instanceof JSEvent) {
		globals.WEBc_page_picker(PAGE_picker,elements.lbl_link)
	}
	else {
		//if page name was same as old page selected, update display with new page name
		if (_link == _name || !_name) {
			var resetName = true
		}
		
		//actual page
		forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected].record.link.data = event
		_link = record.page_name
		
		//display value for page
		if (resetName) {
			forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected].record.name.data = record.page_name
			_name = record.page_name
		}
	}
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
 * @properties={typeid:24,uuid:"A330C9C7-36EF-43FD-83AC-A5EBBD2BD0C4"}
 */
function onDataChange(oldValue, newValue, event) {
	forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected].record.name.data = newValue
}
