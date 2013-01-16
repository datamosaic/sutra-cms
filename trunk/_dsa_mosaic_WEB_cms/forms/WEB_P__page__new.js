/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"18AAA150-08B9-4A02-B666-B765ECEC7A46"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"1A6968FF-F0E2-47A5-94AE-E611A159DF84",variableType:-4}
 */
var _callbackMethod = null;

/**
 * @properties={typeid:35,uuid:"E8FC61D5-4F2B-4154-9E43-226990A10B11",variableType:-4}
 */
var _thisID = null;

/**
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D3AF69AF-11AD-4409-8F46-3B337110C535"}
 */
function ACTION_save(event) {
	//not already ok to close, cancel
	if (!globals.CODE_hide_form) {
		//run callback method
		var proceed = _callbackMethod()
		
		//if false returned from callback, don't close
		if ((typeof proceed == 'boolean') ? proceed : true) {
			//enable closing the form
			globals.CODE_hide_form = 1
			
			//go back to gui mode if there
			if (_guiMode) {
				var guiEvent = new Object()
				guiEvent.getElementName = function() {
						return 'lbl_mode_gui'
					}
				
				forms.WEB_TB__web_mode.ACTION_mode(guiEvent)
				
				_guiMode = false
			}
		}
		
		return proceed
	}
}

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"2048AA44-3094-40EB-9022-028BF3409693",variableType:-4}
 */
var _guiMode = false;

/**
 * @properties={typeid:24,uuid:"BC31C54E-43A4-4974-8EF4-68019C06FF06"}
 */
function ACTION_cancel() {
	//not already ok to close, cancel
	if (!globals.CODE_hide_form) {
		//clear out callback method
		_callbackMethod = null
		
		//enable closing the form
		globals.CODE_hide_form = 1
		
		//go back to gui mode if there
		if (_guiMode) {
			var guiEvent = new Object()
			guiEvent.getElementName = function() {
					return 'lbl_mode_gui'
				}
			
			forms.WEB_TB__web_mode.ACTION_mode(guiEvent)
			
			_guiMode = false
		}
	}
}

/**
 *
 * @properties={typeid:24,uuid:"96E4CD9B-837E-44AC-AEC5-69A57725E76C"}
 */
function FORM_on_show() {
	globals.CODE_hide_form = 0
	_thisID = null
}
