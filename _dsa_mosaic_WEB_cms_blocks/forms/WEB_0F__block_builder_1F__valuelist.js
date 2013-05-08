/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"584BA034-FE8A-4037-A57E-B443051E82B6"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"05D7DAFE-0827-4F92-9EF0-39B4EEDADCCD"}
 */
var _text = null;

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"E1EA9688-5805-4ECF-8004-D2382580517D"}
 */
function onDataChange(oldValue, newValue, event) {
	forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected].record.data = newValue
}

/**
 * @properties={typeid:24,uuid:"181E8BC0-888E-44DC-8EC9-647DFCF0DE58"}
 */
function INIT_data(data) {
	if (!(data instanceof Array)) {
		data = new Array(data)
	}
	
	for (var i = 0; i < data.length; i++) {
		var row = data[i]
		
		if (row) {
			_text = row.data
			elements.lbl_label.text = row.label || solutionModel.getForm(controller.getName()).getLabel('lbl_label').text
			
			//set valuelist (line break)
			var vlMixed = row.values.split('\n')
			var vlDisplay = new Array()
			var vlReal = new Array()
			
			//every item has a different real value, two columns
			if (vlMixed.filter(function(item){return utils.stringPatternCount(item,'|')}).length == vlMixed.length) {
				for (var i = 0; i < vlMixed.length; i++) {
					var vlRow = vlMixed[i].split('|')
					
					vlDisplay.push(vlRow[0])
					vlReal.push(vlRow[1])
				}
			}
			//same display as real
			else {
				vlDisplay =
				vlReal =
					vlMixed
			}
			
			application.setValueListItems('WEB_block_valuelist',vlDisplay,vlReal)
		}
	}
}
