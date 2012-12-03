/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2DC677B3-626D-47FA-A92B-A13D32236BF6"}
 */
var _license_dsa_mosaic_WEB_cms_resources = 'Module: _dsa_mosaic_WEB_cms_resources \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"D055F5E5-A18B-459B-9D17-86A082C98715",variableType:-4}
 */
var WEB_block_page_mode = false;

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"669F48AD-6BF9-4038-A808-1A8530337316",variableType:-4}
 */
var WEB_block_on_select = true;

/**
 * The Sutra CMS api variable contains calls to commonly used functions.
 * Everything you need to call should be available below.
 * 
 * @properties={typeid:35,uuid:"669F47AD-6BF9-4038-A808-1A8530337316",variableType:-4}
 */
var CMS = {
		cookie : new Object(),
		//see forms.WEB_0__controller.CONTROLLER_setup() for how this data point is constructed
		data : new Object(),
		markup : {
				getAsset : function(/**String*/ assetInstanceID) {
						return globals.WEBc_markup_link_asset(assetInstanceID, globals.CMS.data, null, null, globals.CMS.data)
					},
				getErrorPage : function(/**JSRecord<db:/sutra_cms/web_site>*/ siteRec) {
						return globals.WEBc_markup_link_error(siteRec)
					},
				getHomePage : function(/**JSRecord<db:/sutra_cms/web_site>*/ siteRec) {
						return globals.WEBc_markup_link_home(siteRec)
					},
				getLanguages : function() {
						return globals.WEBc_markup_site_languages(globals.CMS.data)
					},
				getPagesAttribute : function(/**String*/ att) {
						return globals.WEBc_markup_pages_attribute(globals.CMS.data, att)
					},
				getPagesDown : function(/**JSRecord<db:/sutra_cms/web_page>*/pageRec, /**JSRecord<db:/sutra_cms/web_path>*/ pathRec) {
						return globals.WEBc_markup_pages_down(null, pageRec, pathRec)
					},
				getPagesUp : function(/**JSRecord<db:/sutra_cms/web_page>*/pageRec, /**JSRecord<db:/sutra_cms/web_path>*/ pathRec, /**String*/ order) {
						return globals.WEBc_markup_pages_up(null, order, pageRec, pathRec)
					},
				getSiteDirectory : function(/**String*/ pageID) {
						//check if globals.CMS.data is defined to get language
						if (globals.CMS.data && globals.CMS.data.language && globals.CMS.data.language.record && utils.hasRecords(globals.CMS.data.language.record,'web_language_to_site_language')) {
							var siteLanguageRec = globals.CMS.data.language.record.web_language_to_site_language.getSelectedRecord()
						}
						
						//check if page specified; pass in object if not
						if (!pageID) {
							pageID = globals.CMS.data
						}
						
						//both the base and resource url methods will return with "sutraCMS/"; need to remove from one so no doubling
						return utils.stringReplace(globals.WEBc_markup_link_base(pageID,null,siteLanguageRec),'sutraCMS/','') + globals.WEBc_markup_link_resources(pageID)
					},
				saveResponseData : function() {
						return globals.WEBc_markup_block_saveResponse(globals.CMS.data)
					}
			},
		session : {
				clearData : function(/**String*/ sessionID, /**String*/ dataKey) {
						return globals.WEBc_session_deleteData(sessionID,dataKey)
					},
				getData : function(/**String*/ sessionID, /**String*/ dataKey) {
						return globals.WEBc_session_getData(sessionID,dataKey)
					},
				getSession : function(/**String*/ sessionID) {
						return globals.WEBc_session_getSession(sessionID)
					},
				setData : function(/**String*/ sessionID, /**String*/ dataKey, /**Object*/ dataValue) {
						return globals.WEBc_session_setData(sessionID, dataKey, dataValue)
					}
			},
		token : {
				getFile : function(/**JSRecord|String|UUID*/ input) {
						return {
							link : globals.WEBc_markup_token(input, 'file'),
							name : globals.WEBc_markup_token(input, 'fileName')
						}
					},
				getImage : function(/**JSRecord|String|UUID*/ input) {
						return {
							link : globals.WEBc_markup_token(input, 'image'),
							name : globals.WEBc_markup_token(input, 'imageName')
						}
					},
				getPage : function(/**JSRecord|String|UUID*/ input) {
						return {
							link : globals.WEBc_markup_token(input, 'page'),
							name : globals.WEBc_markup_token(input, 'pageName')
						}
					}
			},
		ui : {
				getData : function(/**JSForm*/ formName) {
						return globals.WEBc_block_getData(formName)
					},
				setData : function(/**JSEvent*/ event, /**String*/ key, /**String*/ value, /**JSForm*/ formName) {
						return globals.WEBc_block_setData(event,key,value,formName)
					},
				getConfig : function(/**JSForm*/ formName) {
						return globals.WEBc_block_getConfig(formName)
					},
				setConfig : function(/**JSEvent*/ event, /**String*/ key, /**String*/ value, /**JSForm*/ formName) {
						return globals.WEBc_block_setConfig(event,key,value,formName)
					},
				getResponse : function(/**JSForm*/ formName) {
						return globals.WEBc_block_getResponse(formName)
					},
				setResponse : function() {
						return globals.WEBc_markup_block_saveResponse(globals.CMS.data)
					},
				getDisplay : function(/**JSForm*/ formName) {
						return globals.WEBc_block_getDisplay(formName)
					},
				getEdit : function() {
						return globals.WEBc_block_getEdit()
					}
			},
		"utils" : {
				stripHTML : function(/**String*/ str) {
						return WEBc_data_strip_html(str)
					},
				stripCommonWords : function(/**String*/ str) {
						return WEBc_data_strip_common_words(str)
					},
				stripPunctuation : function(/**String*/ str) {
						return WEBc_data_strip_punctuation(str)
					},
				getCMSVersion : function() {
						return globals.CMS.data.cmsVersion
					},
				log : function(/**String*/ logType, /**String*/ message, /**String|UUID*/ sitePK, /**String*/ tableName, /**String|UUID*/ tablePK, /**String*/ tableName2, /**String|UUID*/ tablePK2 ) {
						return globals.WEBc_log_create(logType,message,sitePK,tableName,tablePK,tableName2,tablePK2)
					}
			}
	};

/**
 * @properties={typeid:24,uuid:"88B20E7F-82B4-4235-87EE-C291469E681A"}
 */
function WEBc_browser_error() {
	var input = globals.DIALOGS.showErrorDialog(
				'Error',
				'The Browser Suite did not initialize properly.\nRestart client now.',
				'Yes',
				'No'
		)
	
	if (input == 'Yes') {
		application.exit()
	}
}

/**
 * Populate meta data for selected block.
 * 
 * @param	{String}	formName The block_type form.
 * @param	{String}	type The type of meta information we're interested in.
 * 
 * @returns	{Object}	Pretty names and methods for requested meta information.
 * 
 * @properties={typeid:24,uuid:"81DC790B-61A4-4895-BD4A-65F2BB1ABC21"}
 */
function WEBc_block_type_getMethods(formName, type) {
	var methods = forms[formName].allmethods
	
	var clientActionsBlock = {}
	var clientActionsPage = {}
	var webActions = {}
	var views = {}
	
	for (var i in methods) {
		if ( methods[i].substr(0,5) == "BLOCK" ) {
			clientActionsBlock[methods[i].substr(6,100)] = methods[i]
		}
		if ( methods[i].substr(0,4) == "PAGE" ) {
			clientActionsPage[methods[i].substr(5,100)] = methods[i]
		}
		else if ( methods[i].substr(0,3) == "WEB" ) {
			webActions[methods[i].substr(4,100)] = methods[i]
		}
		else if ( methods[i].substr(0,4) == "VIEW" ) {
			views[methods[i].substr(5,100)] = methods[i]
		}
		else if ( methods[i].substr(0,10) == "CONTROLLER" ) {
			views[methods[i].substr(11,100)] = methods[i]
		}
	}
	
	switch (type) {
		case "BLOCK":
			return clientActionsBlock
			break
		case "PAGE":
			return clientActionsPage
		case "WEB":
			return webActions
			break
		case "VIEW":
			return views
			break
		default:
			return {}
	}
}

/**
 * @properties={typeid:24,uuid:"2936E71A-50BF-4F06-A427-09EE918F273C"}
 */
function WEBc_block_form_refresh() {
//	//update display
//	if (globals.WEB_page_mode == 2) {
//		forms.WEB_0F_page__design_1F_version_2L_scope.ACTION_gui_mode_refresh()
//	}
//	else 
	if (globals.WEB_page_mode == 3) {
		forms.WEB_0F_page__browser_1F_block__editor.FORM_on_show()
	}
}

/**
 * (Dis)Allows the REC_on_select method to fire for a block.
 * 
 * @param {JSEvent} event Event that triggered onSelect of the block_type form.
 * 
 * @returns {Boolean} Run the method.
 * 
 * @properties={typeid:24,uuid:"E81AB531-F187-476A-9EE0-455D12DE6B5D"}
 */
function WEBc_block_enable(event) {
	
	var blockEnable = 
	//we're not in headless client
		application.getApplicationType() != APPLICATION_TYPES.HEADLESS_CLIENT &&
	//event is valid and called from a form
		event && event.getFormName && event.getFormName() && 
	//the foundset has records (don't fire when no block records)
		utils.hasRecords(forms[event.getFormName()].foundset) && 
	//selected block has a valid block type
		utils.hasRecords(forms[event.getFormName()].web_block_to_block_type) && 
	//either the edit form or the display form for said block type is calling the method (only run block_type code on correct block_type)
		(event.getFormName() == forms[event.getFormName()].web_block_to_block_type.form_name ||
		event.getFormName() == (forms[event.getFormName()].web_block_to_block_type.form_name_display || forms[event.getFormName()].web_block_to_block_type.form_name) ) &&
	//on_select not manually disabled
		globals.WEB_block_on_select
		
	return blockEnable
}

/**
 * Returns the correct web_block_data key value pair object.
 * 
 * @param	{String}	formName Scope where called from.
 * 
 * @returns	{Object}	key value pair object.
 * 
 * @properties={typeid:24,uuid:"C8DFEF81-D9D8-4742-96C3-3BA32FFCF62C"}
 */
function WEBc_block_getData(formName) {
	//object with key/value pairs
	var keyValue = new Object()
	
	//we know where this is being called from
	if (formName) {
		//get the block record they were on
		/** @type {JSRecord<db:/sutra_cms/web_block>}*/
		var blockRec = forms[formName].foundset.getSelectedRecord()
		
		//on the page and not viewing page scrapbooks, just use active version
		if (globals.WEB_block_page_mode) {
			if (utils.hasRecords(blockRec,'web_block_to_block_version.web_block_version_to_block_data')) {
				/** @type {JSFoundSet<db:/sutra_cms/web_block_data>}*/
				var fsBlockData = blockRec.web_block_to_block_version.web_block_version_to_block_data
				
				for (var i = 1; i <= fsBlockData.getSize(); i++) {
					var record = fsBlockData.getRecord(i)
					keyValue[record.data_key] = record.data_value
				}
			}
		}
		//on a scrapbook, go through all relation (selected index determines which version)
		else {
			if (utils.hasRecords(blockRec,'web_block_to_block_version__all.web_block_version_to_block_data')) {
				/** @type {JSFoundSet<db:/sutra_cms/web_block_data>}*/
				var fsBlockData = blockRec.web_block_to_block_version__all.web_block_version_to_block_data
				
				for (var i = 1; i <= fsBlockData.getSize(); i++) {
					var record = fsBlockData.getRecord(i)
					keyValue[record.data_key] = record.data_value
				}
			}
		}
	}
	
	//return key/value mapping
	return keyValue
}

/**
 * Set new web_block_data value for given key.
 * 
 * @param	{JSEvent}	event Event that triggered onSelect of the block_type form.
 * @param	{String}	key Key to update.
 * @param	{String}	value New value for key.
 * @param	{String}	[formName] Scope where called from.
 * 
 * @returns	{Boolean}	new value successfully set.
 * 
 * @properties={typeid:24,uuid:"C8DFDF81-D9D7-4742-96C3-4BA32FFCF62C"}
 */
function WEBc_block_setData(event, key, value, formName) {
	//get form from event
	if (!formName && event && event.getFormName) {
		formName = event.getFormName()
	}
	
	//we know where this is being called from
	if (formName) {
		//get the block foundset
		/** @type {JSRecord<db:/sutra_cms/web_block>}*/
		var blockRec = forms[formName].foundset.getSelectedRecord()
		
		//on the page and not viewing page scrapbooks, just use active version
		if (globals.WEB_block_page_mode) {
			if (utils.hasRecords(blockRec,'web_block_to_block_version.web_block_version_to_block_data')) {
				/** @type {JSFoundSet<db:/sutra_cms/web_block_data>}*/
				var fsBlockData = blockRec.web_block_to_block_version.web_block_version_to_block_data
				
				for (var i = 1; i <= fsBlockData.getSize(); i++) {
					var record = fsBlockData.getRecord(i)
					
					//found key, set data
					if (record.data_key == key) {
						record.data_value = value
						
						//data found and changed
						return true
					}
				}
			}
		}
		//on a scrapbook, go through all relation (selected index determines which version)
		else {
			if (utils.hasRecords(blockRec,'web_block_to_block_version__all.web_block_version_to_block_data')) {
				/** @type {JSFoundSet<db:/sutra_cms/web_block_data>}*/
				var fsBlockData = blockRec.web_block_to_block_version__all.web_block_version_to_block_data
				
				for (var i = 1; i <= fsBlockData.getSize(); i++) {
					var record = fsBlockData.getRecord(i)
					
					//found key, set data
					if (record.data_key == key) {
						record.data_value = value
						
						//data found and changed
						return true
					}
				}
			}
		}
	}
	
	//no data change
	return false
}

/**
 * Returns the correct web_block_data_configure key value pair object.
 * 
 * @param	{String}	formName Scope where called from.
 * 
 * @returns	{Object}	key value pair object.
 * 
 * @properties={typeid:24,uuid:"C8DFEF81-D9D7-4742-96C3-3BA32FFCF62C"}
 */
function WEBc_block_getConfig(formName) {
	//object with key/value pairs
	var keyValue = new Object()
	
	//we know where this is being called from
	if (formName) {
		//get the block record they were on
		/** @type {JSRecord<db:/sutra_cms/web_block>}*/
		var blockRec = forms[formName].foundset.getSelectedRecord()
		
		//on the page and not viewing page scrapbooks, just use active version
		if (globals.WEB_block_page_mode) {
			if (utils.hasRecords(blockRec,'web_block_to_block_version.web_block_version_to_block_data_configure')) {
				/** @type {JSFoundSet<db:/sutra_cms/web_block_data_configure>}*/
				var fsBlockData = blockRec.web_block_to_block_version.web_block_version_to_block_data_configure
				
				for (var i = 1; i <= fsBlockData.getSize(); i++) {
					var record = fsBlockData.getRecord(i)
					keyValue[record.data_key] = record.data_value
				}
			}
		}
		//on a scrapbook, go through all relation (selected index determines which version)
		else {
			if (utils.hasRecords(blockRec,'web_block_to_block_version__all.web_block_version_to_block_data_configure')) {
				/** @type {JSFoundSet<db:/sutra_cms/web_block_data_configure>}*/
				var fsBlockData = blockRec.web_block_to_block_version__all.web_block_version_to_block_data_configure
				
				for (var i = 1; i <= fsBlockData.getSize(); i++) {
					var record = fsBlockData.getRecord(i)
					keyValue[record.data_key] = record.data_value
				}
			}
		}
	}
	
	//return key/value mapping
	return keyValue
}

/**
 * Set new block_data_configure value for given key.
 * 
 * @param	{JSEvent}	event Event that triggered onSelect of the block_type form.
 * @param	{String}	key Key to update.
 * @param	{String}	value New value for key.
 * @param	{String}	[formName] Scope where called from.
 * 
 * @returns	{Boolean}	new value successfully set.
 * 
 * @properties={typeid:24,uuid:"C8DFDF81-D9D7-4742-96C3-3BA32FFCF62C"}
 */
function WEBc_block_setConfig(event, key, value, formName) {
	//get form from event
	if (!formName && event && event.getFormName) {
		formName = event.getFormName()
	}
	
	//we know where this is being called from
	if (formName) {
		//get the block foundset
		/** @type {JSRecord<db:/sutra_cms/web_block>}*/
		var blockRec = forms[formName].foundset.getSelectedRecord()
		
		//on the page and not viewing page scrapbooks, just use active version
		if (globals.WEB_block_page_mode) {
			if (utils.hasRecords(blockRec,'web_block_to_block_version.web_block_version_to_block_data_configure')) {
				/** @type {JSFoundSet<db:/sutra_cms/web_block_data_configure>}*/
				var fsBlockData = blockRec.web_block_to_block_version.web_block_version_to_block_data_configure
				
				for (var i = 1; i <= fsBlockData.getSize(); i++) {
					var record = fsBlockData.getRecord(i)
					
					//found key, set data
					if (record.data_key == key) {
						record.data_value = value
						
						//data found and changed
						return true
					}
				}
			}
		}
		//on a scrapbook, go through all relation (selected index determines which version)
		else {
			if (utils.hasRecords(blockRec,'web_block_to_block_version__all.web_block_version_to_block_data_configure')) {
				/** @type {JSFoundSet<db:/sutra_cms/web_block_data_configure>}*/
				var fsBlockData = blockRec.web_block_to_block_version__all.web_block_version_to_block_data_configure
				
				for (var i = 1; i <= fsBlockData.getSize(); i++) {
					var record = fsBlockData.getRecord(i)
					
					//found key, set data
					if (record.data_key == key) {
						record.data_value = value
						
						//data found and changed
						return true
					}
				}
			}
		}
	}
	
	//no data change
	return false
}

/**
 * Returns the correct web_block_data_response key value pair object.
 * 
 * @param	{String}	formName Scope where called from.
 * 
 * @returns	{Object}	key value pair object.
 * 
 * @properties={typeid:24,uuid:"B0D3D289-08E8-4820-9998-70F18D96C9B0"}
 */
function WEBc_block_getResponse(formName) {
	//object with key/value pairs
	var keyValue = new Object()
	
	//we know where this is being called from
	if (formName) {
		//get the block record they were on
		/** @type {JSRecord<db:/sutra_cms/web_block>}*/
		var blockRec = forms[formName].foundset.getSelectedRecord()
		
		//on the page and not viewing page scrapbooks, just use active version
		if (globals.WEB_block_page_mode) {
			if (utils.hasRecords(blockRec,'web_block_to_block_version.web_block_version_to_block_data_response')) {
				/** @type {JSFoundSet<db:/sutra_cms/web_block_data_response>}*/
				var fsBlockData = blockRec.web_block_to_block_version.web_block_version_to_block_data_response
				
				for (var i = 1; i <= fsBlockData.getSize(); i++) {
					var record = fsBlockData.getRecord(i)
					keyValue[record.data_key] = record.data_value
				}
			}
		}
		//on a scrapbook, go through all relation (selected index determines which version)
		else {
			if (utils.hasRecords(blockRec,'web_block_to_block_version__all.web_block_version_to_block_data_response')) {
				/** @type {JSFoundSet<db:/sutra_cms/web_block_data_response>}*/
				var fsBlockData = blockRec.web_block_to_block_version__all.web_block_version_to_block_data_response
				
				for (var i = 1; i <= fsBlockData.getSize(); i++) {
					var record = fsBlockData.getRecord(i)
					keyValue[record.data_key] = record.data_value
				}
			}
		}
	}
	
	//return key/value mapping
	return keyValue
}

/**
 * Returns the correct web_block_display record.
 * 
 * @param	{String}	formName Scope where called from.
 * 
 * @returns	{JSRecord<db:/sutra_cms/web_block_display>}}
 * 
 * @properties={typeid:24,uuid:"CEEF8DFC-D7D1-494A-B813-15DC41640DAC"}
 */
function WEBc_block_getDisplay(formName) {
	//display record
	var recDisplay
	
	//we know where this is being called from
	if (formName) {
		//get the block record they were on
		/** @type {JSRecord<db:/sutra_cms/web_block>}*/
		var blockRec = forms[formName].foundset.getSelectedRecord()
		
		//on the page and not viewing page scrapbooks, just use active version
		if (globals.WEB_block_page_mode) {
			if (utils.hasRecords(blockRec,'web_block_to_block_version.web_block_version_to_block_data_response')) {
				/** @type {JSRecord<db:/sutra_cms/web_block_display>}*/
				recDisplay = blockRec.web_block_to_block_display.getSelectedRecord()
			}
		}
		//on a scrapbook, go through all relation (selected index determines which version)
		else {
			if (utils.hasRecords(blockRec,'web_block_to_block_version__all.web_block_version_to_block_display')) {
				/** @type {JSRecord<db:/sutra_cms/web_block_display>}*/
				recDisplay = blockRec.web_block_to_block_version__all.web_block_version_to_block_display.getSelectedRecord()
			}
		}
	}
	
	//return record mapping
	return recDisplay
}

/**
 * Saves data submitted by web forms into block response data points.
 * 
 * @param	{Object}	obj Object used to drive headless client.
 * 
 * @returns	{Boolean}	minimal error checking  
 * 
 * @properties={typeid:24,uuid:"69A38608-4A48-4654-8309-810AEDEFDC5E"}
 */
function WEBc_markup_block_saveResponse(obj) {
	
	// tag block response rows with a UUID for this submission
	var instanceUUID = application.getUUID()
		
	// save submitted data
	for ( var i in obj.block_response ) {
		var blockVersionRec = obj.block.version
		responseRecord = blockVersionRec.web_block_version_to_block_data_response.getRecord(blockVersionRec.web_block_version_to_block_data_response.newRecord(false, true))

		// save specific data points
		responseRecord.data_key 	= i
		responseRecord.data_value 	= obj.form.post[i]
		responseRecord.id_instance 	= instanceUUID
		responseRecord.organization_id = blockVersionRec.organization_id
		
		// save associations
		responseRecord.id_page 			= obj.page.record.id_page
		responseRecord.id_block_type	= obj.block.record.web_block_to_block_type.id_block_type
		responseRecord.session_id		= obj.session_server.record.session_id
		responseRecord.id_session_access = obj.session_server.record.web_session_to_session_access.id_session_access
	
		databaseManager.saveData(responseRecord)
	}
	
	if (i) {
		// save UUID to block response data
		globals.CMS.data.block_response.UUID = instanceUUID
		return instanceUUID
	}
	else {
		return null
	}
}

/**
 * @properties={typeid:24,uuid:"B82E9E1D-9201-47C8-8FF7-D606643DCD6A"}
 */
function WEBc_block_save() {
//	//don't run when in real mode
//	if (globals.WEB_page_mode != 3) {
//		var formName = 'WEB_A__scrapbook'
//		//on page gui detail
//		if (globals.WEB_block_scope == 1 && globals.WEB_page_mode == 2 && forms.WEB_0F_page__design.elements.tab_main.tabIndex == 1) {
//			formName = 'WEB_A__page'
//		}
//		
//		//toggle upstream _editMode, but don't retrigger a save
//		forms[formName].ACTION_save(null,true)
//	}
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
 * @properties={typeid:24,uuid:"1F9B9D43-3D26-4D27-A28A-BD00655990A6"}
 */
function WEBc_block_fld_data_change__data(oldValue, newValue, event) {
	var key = event.getSource().getDataProviderID().substr(1)
	
	globals.WEBc_block_setData(event,key,newValue)
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
 * @properties={typeid:24,uuid:"E220DA63-D0DA-48FD-8531-BB7489C01F49"}
 */
function WEBc_block_fld_data_change__config(oldValue, newValue, event) {
	var key = event.getSource().getDataProviderID().substr(1)
	
	globals.WEBc_block_setConfig(event,key,newValue)
}

/**
 * @properties={typeid:24,uuid:"44816F74-9845-4672-BE53-3D9C070DB6BC"}
 */
function WEBc_block_cancel() {
//	//don't run when in real mode
//	if (globals.WEB_page_mode != 3) {
//		var formName = 'WEB_A__scrapbook'
//		//on page gui detail
//		if (globals.WEB_block_scope == 1 && globals.WEB_page_mode == 2 && forms.WEB_0F_page__design.elements.tab_main.tabIndex == 1) {
//			formName = 'WEB_A__page'
//		}
//		
//		//toggle upstream _editMode, but don't retrigger a save
//		forms[formName].ACTION_cancel(null,true)
//	}
}

/**
 * Can selected block be edited.
 * 
 * @returns {Boolean}	Edit-mode status.
 * 
 * @properties={typeid:24,uuid:"BDE6D35A-5AF8-43F4-9575-04EFC6594475"}
 */
function WEBc_block_getEdit() {
	//page scope
	if (globals.WEB_block_page_mode) {
		return forms.WEB_0F_page.ACTION_edit_get()
	}
	//scrapbook scope
	else {
		return forms.WEB_0F_block__scrapbook.ACTION_edit_get()
	}
}

/**
 * Return session data object given session ID and object key
 * 
 * @param {String} sessionID Pass in either session.getId() from web session object
 * or obj.session_server.record.session_id from controller object.
 * @param {String} dataKey Key name of data object to return
 * 
 * @returns {Object} Javascript object with your data or null.
 * 
 * @properties={typeid:24,uuid:"15B7A603-F30F-4772-9AF6-AA7BB70AAE83"}
 * @AllowToRunInFind
 */
function WEBc_session_getData(sessionID, dataKey) {
	// get session	
	var snRec = globals.WEBc_session_getSession(sessionID)

	// find matching session data record 
	var sd = databaseManager.getFoundSet("sutra_cms","web_session_data")
	sd.find()
	sd.id_session = snRec.id_session
	sd.data_key = dataKey
	var count = sd.search()
	// get specified session data
	if (count == 1) {
		return sd.getRecord(1).data_value
	}
	else {
		return null
	}
}

/**
 * Store session data object given session ID and object key. Creates a record if needed.
 * 
 * @param {String} sessionID Pass in either session.getId() from web session object
 * or obj.session_server.record.session_id from controller object.
 * @param {String} dataKey Key name of data object to return
 * @param {Object} dataValue Javascript object to store
 * 
 * @returns {Object} Javascript object with your data.
 * 
 * @properties={typeid:24,uuid:"6839C1C3-962D-40B9-BE58-D22880BD5BBE"}
 * @AllowToRunInFind
 */
function WEBc_session_setData(sessionID, dataKey, dataValue) {
	// get session	
	var snRec = globals.WEBc_session_getSession(sessionID)	
	
	// find matching session data record 
	var sd = databaseManager.getFoundSet("sutra_cms","web_session_data")
	sd.find()
	sd.id_session = snRec.id_session
	sd.data_key = dataKey
	var count = sd.search()	
	
	// get specified session data
	if (count != 1) {		
		// create session data record
		var sdRec = snRec.web_session_to_session_data.getRecord(snRec.web_session_to_session_data.newRecord())
		sdRec.data_key = dataKey
	}
	else {
		var sdRec = sd.getRecord(1)
	}
	// store data
	sdRec.data_value = dataValue
	databaseManager.saveData(sdRec)
	
	return dataValue
}

/**
 * Delete session data object given session ID and object key
 * 
 * @param {String} sessionID Pass in either session.getId() from web session object
 * or obj.session_server.record.session_id from controller object.
 * @param {String} dataKey Key name of data object to return
 * 
 * @returns {Object} Javascript object with your data or null.
 * 
 * @properties={typeid:24,uuid:"35B7A603-F30F-4772-9AF6-AA7BB70AAE83"}
 * @AllowToRunInFind
 */
function WEBc_session_deleteData(sessionID, dataKey) {
	// get session	
	var snRec = globals.WEBc_session_getSession(sessionID)

	// find matching session data record 
	var sd = databaseManager.getFoundSet("sutra_cms","web_session_data")
	sd.find()
	sd.id_session = snRec.id_session
	sd.data_key = dataKey
	var count = sd.search()
	// delete specified session record
	if (count == 1) {
		// delete and return true or false depending on delete success
		return sd.deleteRecord(1)
	}
	else {
		// no record found
		return null
	}
}

/**
 * Use this method from AJAX method calls where you know pass in session.getId().
 * Otherwise, pass in obj.session_server.record.session_id.
 * 
 * @param {Javax.servlet.http.httpsession} session Web session to pass in 
 * @returns {JSRecord} session record or null
 * 
 * @properties={typeid:24,uuid:"F2E852B4-71FA-4A91-A9BA-87781B082C6C"}
 * @AllowToRunInFind
 */
function WEBc_session_getSession(sessionID) {
	
	// find matching session record 
	var sn = databaseManager.getFoundSet("sutra_cms","web_session")
	sn.find()
	sn.session_id = sessionID
	var count = sn.search()
	
	// get existing session record
	if (count == 1) {
		return sn.getRecord(1)
	}
	else {
		return null
	}	
}

/**
 * Delete cookie from response. Note that cookie still exists in current request.
 * 
 * @param {Javax.servlet.http.httpservletresponse} response implicit jsp response obj 
 * @param {String} name Name of cookie to delete
 * 
 * @return {Javax.servlet.http.Cookie} Cookie deleted
 * 
 * @properties={typeid:24,uuid:"69DE3CBB-B513-4C89-BEEA-C9CBFC2C41A8"}
 */
function WEBc_cookie_delete(response, name) {
	return
//	var cookie = new Packages.javax.servlet.http.Cookie(name,"")
//	cookie.setMaxAge(0)
//	response.addCookie(cookie)
//	return cookie

}

/**
 * Set cookie with new value. Note that cookies still retains old value in current request.
 * 
 * @param {Javax.servlet.http.httpservletrequest} request Implicit jsp request object cookie is a part of
 * @param {javax.servlet.http.Cookie} cookie Cookie object to change
 * @param {String} value Set cookie value to this
 * 
 * @return {javax.servlet.http.Cookie} pointer to specific cookie or null
 * 
 * @properties={typeid:24,uuid:"EB605EF7-FEC4-4DE3-BC5F-52680CAB3A7B"}
 */
function WEBc_cookie_setValue(response, name, value) {
	
	var cookie = new Packages.javax.servlet.http.Cookie(name, "")
	cookie.setValue(value)
	response.addCookie(cookie)
	return cookie

}

/**
 * Tests if cookie exists in request.
 * 
 * @param {Javax.servlet.http.httpservletrequest} request Implicit jsp request object.
 * @param {String} name Name of cookie to see if exists.
 * 
 * @return {Boolean} Cookie existance.
 * 
 * @properties={typeid:24,uuid:"AE3EDE76-B244-4E00-A845-18DC3A640D36"}
 */
function WEBc_cookie_exists(request, name) {
	var cookies = request.getCookies()
	for ( var i in cookies ) {
		if (cookies[i].getName() == name) {
			return true
		}
	}	
	return false
}

/**
 * Creates a new cookie and adds to the implicit jsp response object.
 * 
 * @param {Javax.servlet.http.httpservletresponse} response Implicit jsp response object.
 * @param {String} name Name of the cookie.
 * @param {String} value Value to assign cookie.
 * 
 * @return {javax.servlet.http.Cookie} Pointer to specific cookie
 * 
 * @properties={typeid:24,uuid:"3CAB37EB-875D-41EB-B802-A2AFB50D3436"}
 */
function WEBc_cookie_new(response, name, value) {

	var cookie = new Packages.javax.servlet.http.Cookie(name,value)
	cookie.setMaxAge(365 * 24 * 60 * 60)	// default to one year
	response.addCookie(cookie)
	
	return cookie

}

/**
 * Get cookie value from request by name.
 * 
 * @param {Javax.servlet.http.httpservletrequest} request Implicit jsp request object.
 * @param {String} name Name of cookie to see if exists.
 * 
 * @return {String} Value of cookie
 * 
 * @properties={typeid:24,uuid:"D7F75042-ACFA-4BFC-984D-F3F26FB3DDC2"}
 */
function WEBc_cookie_getValue(request, name) {

	var cookies = request.getCookies()
	for ( var i in cookies ) {
		if (cookies[i].getName() == name) {
			return cookies[i].getValue()
		}
	}	
	return null

}

/**
 * Return the domain for a page
 * 
 * @param {UUID|String|Object} pageID The page requested.
 * @param {String}	[siteURL] Domain name request came in on.
 * @param {JSRecord<db:/sutra_cms/web_site_language>}	[siteLanguageRec] Specify a particular language (will default to the default site language).
 * 
 * @return {String} Domain (and folder, if specified) for a site.
 * 
 * @properties={typeid:24,uuid:"AFA318BF-7E29-4E7D-BE9D-CE4085851DF3"}
 * @AllowToRunInFind
 */
function WEBc_markup_link_base(pageID, siteURL, siteLanguageRec) {
	
	// if obj passed instead of UUID for pageID
	if ( !(pageID instanceof UUID) && pageID && pageID.page && pageID.page.id ) {
		pageID = pageID.page.id
	}
	
	//rewrite mode
	var rewriteMode = globals.WEBc_install_getRewrite()
	
	//get page requested
	var fsPage = databaseManager.getFoundSet("sutra_cms","web_page")
	fsPage.find()
	fsPage.id_page = pageID
	var count = fsPage.search()
	
	//this page exists, get the site
	if (count && utils.hasRecords(fsPage.web_page_to_site)) {
		var pageRec = fsPage.getRecord(1)
		var siteRec = pageRec.web_page_to_site.getRecord(1)
		
		//grab default language for this site
		if (!siteLanguageRec) {
			for (var i = 1; i <= siteRec.web_site_to_site_language.getSize(); i++) {
				var siteLangRec = siteRec.web_site_to_site_language.getRecord(i)
				if (siteLangRec.flag_default) {
					siteLanguageRec = siteLangRec
					break
				}
			}
		}
	}
	//no site specified, try to fail gracefully
	else {
		var pageRec = new Object()
		var siteRec = new Object()
		var siteLanguageRec = new Object()
	}
	
	//how requested
	var appServer = application.getServerURL()
	appServer = appServer.split(':')
	var accessURL = appServer[1].slice(2)
	if (appServer.length > 2) {
		var port = utils.stringToNumber(appServer[2])
	}
	
	//url specified
	if (siteRec.url || (siteLanguageRec && siteLanguageRec.url)) {
		siteURL = siteRec.url
		
		//language as a domain or advanced apache setup
			//MEMO: obviously, the port (if non-standard) is entered in the siteLanguageRec.url column
		if (siteLanguageRec && siteLanguageRec.url) {
			siteURL = siteLanguageRec.url
			port = null
		}
	}
	//use whatever url the request came in on
	else {
		siteURL = (accessURL == '127.0.0.1') ? 'localhost' : accessURL
	}
	
	//force to be secure
	if (pageRec.flag_ssl) {
		siteURL = 'https://' + siteURL
	}
	//default non-secure
	else {
		siteURL = 'http://' + siteURL
	}
	
	if (port && port != 80) {
		siteURL += ':' + port
	}
	
	//language as a folder
	if (rewriteMode && siteLanguageRec && siteLanguageRec.directory && !siteLanguageRec.flag_default) {
		siteURL += '/' + siteLanguageRec.directory
	}
	
	//no url rewrite OR running off localhost and site name not specified as localhost
	if (!rewriteMode ||
		(utils.stringPatternCount(siteURL,"localhost") > 0 && siteRec.url != "localhost") || 
		(utils.stringPatternCount(siteURL,"127.0.0.1") > 0 && siteRec.url != "127.0.0.1")) {
		
		siteURL += '/sutraCMS'
	}
	
	//returns url that will launch things in the sutraCMS directory
	return siteURL + '/'
}

/**
 * Return the path to the site resources directory (not including domain)
 * 
 * @param {UUID|String|Object} pageID The page requested.
 * @param {String}	[siteURL] Domain name request came in on.
 * @param {String}	[linkType] Style of URLs (index, folder, pretty).
 * 
 * @return {String} Path to land in the site directory (no domain).
 * 
 * @properties={typeid:24,uuid:"CF88AF63-45F2-4BC4-95BC-8E6D653A58BC"}
 * @AllowToRunInFind
 */
function WEBc_markup_link_resources(pageID, siteURL, linkType) {
	
	// if obj passed instead of UUID for pageID
	if ( !(pageID instanceof UUID) && pageID && pageID.page && pageID.page.id ) {
		pageID = pageID.page.id
	}
	
	var siteDirectory = ''
	
	//rewrite mode
	var rewriteMode = globals.WEBc_install_getRewrite()
	
	//get page requested
	var fsPage = databaseManager.getFoundSet("sutra_cms","web_page")
	fsPage.find()
	fsPage.id_page = pageID
	var count = fsPage.search()
	
	//this page exists, get its site
	if (count && utils.hasRecords(fsPage.web_page_to_site)) {
		var pageRec = fsPage.getRecord(1)
		var siteRec = pageRec.web_page_to_site.getRecord(1)
	}
	//no site specified, try to fail gracefully
	else {
		var pageRec = new Object()
		var siteRec = new Object()
	}
	
	//no url rewrite OR running off localhost and site name not specified as localhost
	if (!rewriteMode ||
		(utils.stringPatternCount(siteURL,"localhost") > 0 && siteRec.url != "localhost") || 
		(utils.stringPatternCount(siteURL,"127.0.0.1") > 0 && siteRec.url != "127.0.0.1")) {
		
		siteDirectory = 'sutraCMS/sites/' + siteRec.directory + '/'
	}
	
	//url relative to server root (urlrewrite affect this)
	return siteDirectory
}

/**
 * Replace tokens with correct references to items referenced by the tokens.
 * 
 * @param {String}	markup Text for a particular area (and all activated blocks) that may contain tokens.
 * @param {String}	[siteURL] Domain name request came in on.
 * @param {String}	[linkType] Style of URLs (index, folder, pretty).
 * @param {String}	[areaID] The ID of the areas markup we're working with.
 * @param {Object}	[obj] Object used to drive headless client.
 * 
 * @return {String} URL for a page.
 * 
 * @properties={typeid:24,uuid:"19AD8258-86F2-48AB-AA1B-713A2D08D77D"}
 * @AllowToRunInFind
 */
function WEBc_markup_link_internal(markup,siteURL,linkType,areaID,obj) {
	// object not passed in, grab it
	if (!obj) {
		obj = globals.CMS.data
	}
	
	// page link
	while ( utils.stringPosition(markup, "{DS:ID_", 0, 0) >= 0 ) {
		var newMarkup = ''
		
		var pos = utils.stringPosition(markup, "{DS:ID_", 0, 0)
		newMarkup += utils.stringLeft(markup, pos-1 )
		markup = utils.stringMiddle(markup, pos, 100000)
		var start 	= utils.stringPosition(markup, "_", 0, 0) + 1
		var end		= utils.stringPosition(markup, "}", 0, 0)
		var length	= end - start
		var id		= utils.stringMiddle(markup, start, length)
		markup 		= utils.stringMiddle(markup, end + 1, 100000)
		
		// add markup link
		newMarkup	+= globals.WEBc_markup_link_page(id,siteURL,linkType,null,obj)
		
		markup		= newMarkup + markup
	}
	
	// page name
	while ( utils.stringPosition(markup, "{DS:NAME_", 0, 0) >= 0 ) {
		var newMarkup = ''
		
		var pos = utils.stringPosition(markup, "{DS:NAME_", 0, 0)
		newMarkup += utils.stringLeft(markup, pos-1 )
		markup = utils.stringMiddle(markup, pos, 100000)
		var start 	= utils.stringPosition(markup, "_", 0, 0) + 1
		var end		= utils.stringPosition(markup, "}", 0, 0)
		var length	= end - start
		var id		= utils.stringMiddle(markup, start, length)
		markup 		= utils.stringMiddle(markup, end + 1, 100000)
		
		// add markup link
		newMarkup	+= globals.WEBc_markup_page_name(id,siteURL,linkType,null,obj)
		
		markup		= newMarkup + markup
	}
	
	// images
	while ( utils.stringPosition(markup, "{DS:IMG_", 0, 0) >= 0 ) {
		var newMarkup = ''
		
		var pos = utils.stringPosition(markup, "{DS:IMG_", 0, 0)
		newMarkup += utils.stringLeft(markup, pos-1 )
		markup = utils.stringMiddle(markup, pos, 100000)
		var start 	= utils.stringPosition(markup, "_", 0, 0) + 1
		var end		= utils.stringPosition(markup, "}", 0, 0)
		var length	= end - start
		var id		= utils.stringMiddle(markup, start, length)
		markup 		= utils.stringMiddle(markup, end + 1, 100000)
		
		// add markup link
		newMarkup	+= globals.WEBc_markup_link_asset(id,obj.page.id,siteURL,linkType,obj).link
		
		markup		= newMarkup + markup
	}
	
	// files
	while ( utils.stringPosition(markup, "{DS:FILE_", 0, 0) >= 0 ) {
		var newMarkup = ''
		
		var pos = utils.stringPosition(markup, "{DS:FILE_", 0, 0)
		newMarkup += utils.stringLeft(markup, pos-1 )
		markup = utils.stringMiddle(markup, pos, 100000)
		var start 	= utils.stringPosition(markup, "_", 0, 0) + 1
		var end		= utils.stringPosition(markup, "}", 0, 0)
		var length	= end - start
		var id		= utils.stringMiddle(markup, start, length)
		markup 		= utils.stringMiddle(markup, end + 1, 100000)
		
		// add markup link
		newMarkup	+= globals.WEBc_markup_link_asset(id,obj.page.id,siteURL,linkType,obj).link
		
		markup		= newMarkup + markup
	}
	
	//tack on add new record button if editable
	if (linkType == 'Edit') {
		var area = databaseManager.getFoundSet("sutra_cms","web_area")
		area.find()
		area.id_area = areaID
		var count = area.search()
		
		//this is linked up to a theme editable and set to allow records to be created
		if (count && utils.hasRecords(area.web_area_to_editable) && area.web_area_to_editable.flag_new_block) {
			var areaString = utils.stringReplace(areaID.toString(),'-','')
			
			var newBlock = '<!-- add new block -->'
			newBlock += '<div id="sutra-block-add-' + areaString + '" class="block_new">'
			newBlock += '<a href="javascript:blockNew(\'' + areaString + '\')">' + area.area_name.toUpperCase() + ': Add block</a>'
			newBlock += '</div>'
				
			markup += newBlock
		}
	}
	
	return markup

}

/**
 * Return the address for a page (including domain)
 * 
 * @param {UUID|String|Object} pageID The page (language can be specified) requested.
 * @param {String}	[siteURL] Domain name request came in on.
 * @param {String}	[linkType] Style of URLs (index, folder, pretty).
 * @param {String}	[webMode] Editing the page in Real Mode (only an option from the admin interface).
 * @param {Object}	[obj] Object used to drive headless client.
 * 
 * @return {String} URL for a page.
 * 
 * @properties={typeid:24,uuid:"8D473D49-2039-49AC-B633-72E88E736CA9"}
 * @AllowToRunInFind
 */
function WEBc_markup_link_page(pageID, siteURL, linkType, webMode, obj) {
	
	// if obj passed instead of UUID for pageID
	if ( !(pageID instanceof UUID) && pageID && pageID.page && pageID.page.id ) {
		pageID = pageID.page.id
	}
	
	// object not passed in, grab it
	if (!obj) {
		obj = globals.CMS.data
	}
	
	//get page requested
	if (pageID) {
		//particular language specified
		if (typeof pageID == 'string') {
			var reference = pageID.split('_')
			pageID = reference[0]
			var languageID = reference[1]
		}
		
		var fsPage = databaseManager.getFoundSet("sutra_cms","web_page")
		fsPage.find()
		fsPage.id_page = pageID.toString()
		var count = fsPage.search()
	}
	
	//something amiss, try to fail gracefully
	var pageRec = new Object()
	var siteRec = new Object()
	var siteLanguageRec = new Object()
	
	//this page exists, get its site
	if (count && utils.hasRecords(fsPage.web_page_to_site)) {
		var pageRec = fsPage.getRecord(1)
		var siteRec = pageRec.web_page_to_site.getRecord(1)
		
		//this is an internal link type of page
		while (pageRec.page_type == 3 && pageRec.page_link_internal) {
			fsPage.find()
			fsPage.id_page = pageRec.page_link_internal
			fsPage.flag_publish = 1
			var count = fsPage.search()
			
			//the internal link exists
			if (count) {
				pageRec = fsPage.getRecord(1)
				siteRec = pageRec.web_page_to_site.getRecord(1)
			}
			//internal link deleted or not published, error out
			else {
				pageRec = siteRec.web_site_to_page__error.getRecord(1)
				siteRec = pageRec.web_page_to_site.getRecord(1)
			}
		}
	}
	
	//specific language specified for this link
	if (languageID) {
		var fsLanguage = databaseManager.getFoundSet("sutra_cms","web_language")
		fsLanguage.find()
		fsLanguage.id_language = languageID
		var count = fsLanguage.search()
		
		if (count) {
			var pageLanguageRec = fsLanguage.getRecord(1)
			var siteLanguageRec = pageLanguageRec.web_language_to_site_language.getRecord(1)
		}
	}
	else {
		//get the site's language record
		if (obj && obj.language && obj.language.record && utils.hasRecords(obj.language.record.web_language_to_site_language)) {
			var siteLanguageRec = obj.language.record.web_language_to_site_language.getRecord(1)
		}
		
		//get the page's language record
		if (pageRec && utils.hasRecords(pageRec.web_page_to_language) && siteLanguageRec) {
			//loop to find selected language
			for (var i = 1; i <= pageRec.web_page_to_language.getSize(); i++) {
				var languageRec = pageRec.web_page_to_language.getRecord(i)
				
				if (languageRec.id_site_language == siteLanguageRec.id_site_language) {
					var pageLanguageRec = languageRec
					break
				}
			}
		}
	}
	
	//find default language
	if (utils.hasRecords(pageRec,'web_page_to_language')) {
		pageRec.web_page_to_language.sort('rec_created asc')
		var pageLanguageDefaultRec =  pageRec.web_page_to_language.getRecord(1)
	}
	
	//get url up to sutraCMS directory
	var pageLink = globals.WEBc_markup_link_base(pageID, siteURL, siteLanguageRec)
	
	//this is an external link type of page, pageLink == its link
	if (pageRec.page_type == 2 && pageRec.page_link) {
		pageLink = pageRec.page_link
	}
	//page/folder within the cms, generate link
	else {
		//rewrite mode
		var rewriteMode = globals.WEBc_install_getRewrite()
		
		//use default link type if none specified
		if (!linkType) {
			linkType = siteRec.pref_links
		}
		
		//rewrite mode turned off and not edit mode
		//or no url for site and site language and not edit mode, use index
		if ((!rewriteMode && linkType != 'Edit') ||
			(!siteRec.url && !siteLanguageRec.url && linkType != 'Edit')) {
			
			linkType = 'Index'
		}
		
		switch (linkType) {
			case "Index":
				pageLink += 'index.jsp?id=' + pageRec.url_param
				
				//rewrite mode turned off and language specified is not the default
				if (siteLanguageRec && !rewriteMode && !siteLanguageRec.flag_default) {
					
					//pull from page's specified language
					if (pageLanguageRec) {
						var param = pageLanguageRec.url_param
					}
					//pullfrom page's default language
					else if (pageLanguageDefaultRec) {
						var param = pageLanguageDefaultRec.url_param
					}
					
					//a language parameter specified
					if (param) {
						pageLink += '&language=' + param
					}
				}
				
				break
			case "Folder":
				//on home page, don't specify a path
				if (siteRec.id_page__home == pageRec.id_page) {
					break
				}
				
				//get page stack
				var pageStack = globals.WEBc_markup_pages_up(null,null,pageRec)
				
				var folder = ''
				pageLanguageRec = null
				pageLanguageDefaultRec = null
				
				//loop over page stack to get folder structure
				for (var h = 0; h < pageStack.length; h++) {
					var folderRec = pageStack[h]
					
					//skip this folder if path to be skipped...unless final page
					if (folderRec.flag_folder_skip && h != pageStack.length - 1) {
						continue
					}
					
					//get the page's language record
					if (folderRec && utils.hasRecords(folderRec.web_page_to_language) && siteLanguageRec) {
						//loop to find selected language
						for (var i = 1; i <= folderRec.web_page_to_language.getSize(); i++) {
							var languageRec = folderRec.web_page_to_language.getRecord(i)
							
							if (languageRec.id_site_language == siteLanguageRec.id_site_language) {
								pageLanguageRec = languageRec
								break
							}
						}
					}
					
					//find default language
					folderRec.web_page_to_language.sort('rec_created asc')
					pageLanguageDefaultRec =  folderRec.web_page_to_language.getRecord(1)
					
					//are there paths configured for this page/language
					if (pageLanguageRec && utils.hasRecords(pageLanguageRec.web_language_to_path)) {
						//loop to find default
						for (var i = 1; i <= pageLanguageRec.web_language_to_path.getSize(); i++) {
							var pathRec = pageLanguageRec.web_language_to_path.getRecord(i)
							
							if (pathRec.flag_default == 1) {
								folder += pathRec.path
								break
							}
						}
					}
					//pull path from default page's language
					else if (pageLanguageDefaultRec && utils.hasRecords(pageLanguageDefaultRec.web_language_to_path)) {
						//loop to find default
						for (var i = 1; i <= pageLanguageDefaultRec.web_language_to_path.getSize(); i++) {
							var pathRec = pageLanguageDefaultRec.web_language_to_path.getRecord(i)
							
							if (pathRec.flag_default == 1) {
								folder += pathRec.path
								break
							}
						}
					}
					
					//add slash unless on last occurence or already ends with a slash
					if ( h < pageStack.length - 1 && folder.substr(folder.length, 1) != '/') {
						folder += '/'
					}
				}
				
				pageLink += folder
				break
			case "Pretty":
				//on home page, don't specify a path
				if (siteRec.id_page__home == pageRec.id_page) {
					break
				}
				
				//are there paths configured for this page/language
				if (pageLanguageRec && utils.hasRecords(pageLanguageRec.web_language_to_path)) {
					//loop to find default
					for (var i = 1; i <= pageLanguageRec.web_language_to_path.getSize(); i++) {
						var pathRec = pageLanguageRec.web_language_to_path.getRecord(i)
						
						if (pathRec.flag_default == 1) {
							var pretty = pathRec.path
							break
						}
					}
				}
				//pull path from default page's language
				else if (pageLanguageDefaultRec && utils.hasRecords(pageLanguageDefaultRec.web_language_to_path)) {
					//loop to find default
					for (var i = 1; i <= pageLanguageDefaultRec.web_language_to_path.getSize(); i++) {
						var pathRec = pageLanguageDefaultRec.web_language_to_path.getRecord(i)
						
						if (pathRec.flag_default == 1) {
							var pretty = pathRec.path
							break
						}
					}
				}
				
				var urlString = (pretty) ? pretty : 'error'
				
				pageLink += urlString
				break
			case "Edit":
				//selection set in site tree which will trigger a loading in the main workflow
				//jQuery changes index_edits to fire servoy callbacks on form load
				pageLink += 'index_edit.jsp?id=' + pageRec.url_param
				
				if (webMode) {
					pageLink += '&webmode=edit'
				}
				
				break
			default:
				pageLink += 'index.jsp?id=' + pageRec.url_param
		}
	}
	
	//full url for a page requested
	return pageLink
}

/**
 * Gives a token that will represent a Sutra CMS object appropriately, given the context from which called.
 * Note: This is the only method that should be used from a normal markup VIEW or CONTROLLER method. (AJAX calls behave differently)
 * 
 * @param {JSRecord|String|UUID}	input The thing to be tokenized.  Can be a record or pk for the record.
 * @param {String}					[tokenType] Type of CMS object. When passed a JSRecord, tokenType will be automatically determined.
 * 
 * @returns	{String}	Token to reference a Sutra CMS object, the file name for the requested asset.
 * 
 * @properties={typeid:24,uuid:"9726B488-8A41-44E9-B0D0-02EABA98587C"}
 */
function WEBc_markup_token(input,tokenType) {
	var token = null
	
	var tokenPageLink = '{DS:ID_'
	var tokenPageName = '{DS:NAME_'
	var tokenImage = '{DS:IMG_'
	var tokenFile = '{DS:FILE_'
	
	//no type specified, try to determine
	if (!tokenType) {
		if (input instanceof JSRecord) {
			switch (input.foundset.getDataSource()) {
				case 'db:/sutra_cms/web_page':	//page record
					//treat as a link if we can't tell what it is
					tokenType = 'page'
					break
				case 'db:/sutra_cms/web_asset_instance':	//asset record
					//look at asset table and figure out what type this asset is
					if (utils.hasRecords(input.web_asset_instance_to_asset)) {
						//check to see if this is an image, file, etc
						switch (input.web_asset_instance_to_asset.asset_type) {
							case 1:	//image
								tokenType = 'image'
								break
							case 2:	//file
								tokenType = 'file'
								break
						}
					}
					//treat as a file if we can't tell what it is
					else {
						tokenType = 'file'
					}
					break
				default:	//passed in a record from strange foundset
					
			}
		}
		//default to page link
		else {
			tokenType = 'page'
		}
	}
	
	//prefix for token
	switch (tokenType) {
		case 'page':
			token = tokenPageLink
			break
		case 'pageName':
			token = tokenPageName
			break
		case 'image':
			token = tokenImage
			break
		case 'file':
			token = tokenFile
			break
		default:
			return token
	}
	
	//passed in a page record
	if (input instanceof JSRecord && input.foundset.getDataSource() == 'db:/sutra_cms/web_page' && input.id_page) {
		token += input.id_page.toString()
	}
	//passed in an asset instance record
	else if (input instanceof JSRecord && input.foundset.getDataSource() == 'db:/sutra_cms/web_asset_instance' && input.id_asset_instance) {
		token += input.id_asset_instance.toString()
		
		//we don't want the token, just give the filename
		if (tokenType == 'imageName' || tokenType == 'fileName') {
			return input.asset_title
		}
	}
	//passed in a (uuid) string
	else if (typeof input == 'string') {
		token += input
	}
	//passed in a uuid
	else if (input && typeof input.toString == 'function' && input.toString() && application.getUUID(input.toString())) {
		token += input.toString()
	}
	
	//suffix for token
	token += '}'
	
	return token
}

/**
 * Show a popupmenu with all of the curretly selected site's pages
 * 
 * @param {JSMethod} method Name of method to run when menu item selected.
 * @param {JSEvent|Element} elem The element from which to pop open the menu.
 * @param {Boolean} [showLanguage=false] Allow to target a specific page's language.
 *
 * @properties={typeid:24,uuid:"D05AA53E-5D46-4534-A2AC-A55D700F29C0"}
 * @AllowToRunInFind
 */
function WEBc_page_picker(method,elem,showLanguage) {
	function GET_page(pageRec) {
		if (utils.hasRecords(pageRec[relnPage])) {
//			//check to see what languages this page has; give option when more than one
//			if (showLanguage && utils.hasRecords(pageRec.web_page_to_language) && pageRec.web_page_to_language.getSize() > 1) {
//				var languageArray = new Array()
//				
//				var oldDate = application.getServerTimeStamp()
//				var defaultLang = 1
//				
//				for (var j = 1; j <= pageRec.web_page_to_language.getSize(); j++) {
//					var languageRec = pageRec.web_page_to_language.getRecord(j)
//					
//					if (languageRec.rec_created < oldDate) {
//						oldData = languageRec.rec_created
//						defaultLang = j
//					}
//					
//					var language = plugins.popupmenu.createCheckboxMenuItem(languageRec.language_name + "", method)
//					language.setMethodArguments(pageRec.id_page.toString() + '_' + languageRec.id_language.toString(),pageRec,event)
//					
//					languageArray.push(language)
//				}
//				
//				//flag which language is the default
////				languageArray[defaultLang - 1].label = languageArray[defaultLang - 1].label + ' (default)'
//				languageArray[defaultLang - 1].setSelected(true)
//				
//				var item = plugins.popupmenu.createMenuItem('Choose parent (' + pageRec.page_name + ')', languageArray)
//			}
//			//only one language, options not required
//			else {
				var item = plugins.popupmenu.createMenuItem('Choose parent (' + pageRec.page_name + ')', method)
				item.setMethodArguments(pageRec.id_page.toString(),pageRec,event)	
//			}
			
			var subArray = new Array()
			
			subArray.push(
						//choose this page
							item,
						//blank line
							plugins.popupmenu.createMenuItem('-', method)
					)
			
			// turn off '----'
			subArray[1].setEnabled(false)
			
			for (var j = 1; j <= pageRec[relnPage].getSize(); j++ ) {
				subArray.push(GET_page(pageRec[relnPage].getRecord(j)))
			}
			
			return plugins.popupmenu.createMenuItem(pageRec.page_name + "", subArray)
		}
		else {
//			//check to see what languages this page has; give option when more than one
//			if (showLanguage && utils.hasRecords(pageRec.web_page_to_language) && pageRec.web_page_to_language.getSize() > 1) {
//				var languageArray = new Array()
//				
//				pageRec.web_page_to_language.sort('web_language_to_site_language.language_name asc')
//				
//				var oldDate = application.getServerTimeStamp()
//				var defaultLang = 1
//				
//				for (var j = 1; j <= pageRec.web_page_to_language.getSize(); j++) {
//					var languageRec = pageRec.web_page_to_language.getRecord(j)
//					
//					if (languageRec.rec_created < oldDate) {
//						oldDate = languageRec.rec_created
//						defaultLang = j
//					}
//					
//					var language = plugins.popupmenu.createCheckboxMenuItem(languageRec.language_name + "", method)
//					language.setMethodArguments(pageRec.id_page.toString() + '_' + languageRec.id_language.toString(),pageRec,event)
//					
//					languageArray.push(language)
//				}
//				
//				//tack on spacer
//				language = plugins.popupmenu.createCheckboxMenuItem('-', method)
//				language.setEnabled(false)
//				languageArray.push(language)
//				
//				//tack on option to not specify language
//				language = plugins.popupmenu.createCheckboxMenuItem('Don\'t specify a language', method)
//				language.setMethodArguments(pageRec.id_page.toString(),pageRec,event)
//				languageArray.push(language)
//				
//				//flag which language is the default
////				languageArray[defaultLang - 1].label = languageArray[defaultLang - 1].label + ' (default)'
//				languageArray[defaultLang - 1].setSelected(true)
//				
//				var item = plugins.popupmenu.createMenuItem(pageRec.page_name + "", languageArray)
//			}
//			//only one language, options not required
//			else {
				var item = plugins.popupmenu.createMenuItem(pageRec.page_name + "", method)
				item.setMethodArguments(pageRec.id_page.toString(),pageRec,event)	
//			}
			
			//disable dividers
			if (item.text == '-') {
				item.setEnabled(false)
			}
			
			return item
		}
	}
	
	//get the element from event
	if (elem instanceof JSEvent) {
		var event = elem
		var formName = event.getFormName()
		var elemName = event.getElementName()
		
		if (formName && elemName) {
			elem = forms[formName].elements[elemName]
		}
	}
	//otherwise try to get from deprecated calls
	if (!elem) {
		elem = forms[application.getMethodTriggerFormName()].elements[application.getMethodTriggerElementName()]
	}
	
	//there is an element for this popup to be attached, build!
	if (elem != null) {
		globals.CODE_cursor_busy(true)
		
		var fsPages = databaseManager.getFoundSet('sutra_cms', 'web_page')
		var relnPage = 'web_page_to_page__child'
		
		fsPages.find()
		fsPages.parent_id_page = '^='
		fsPages.id_site = forms.WEB_0F_site.id_site
		var results = fsPages.search()
		
		if (results) {
			fsPages.sort('order_by asc')
			
			//make array
			var menu = new Array()
			
			for (var i = 1 ; i <= fsPages.getSize() ; i++) {
				menu.push(GET_page(fsPages.getRecord(i)))
			}
			
			globals.CODE_cursor_busy(false)
			
			//pop up the popup menu
		    plugins.popupmenu.showPopupMenu(elem, menu);
		}
		else {
			globals.CODE_cursor_busy(false)
		}
	}
}

/**
 * @param	{String}	pageName Name for new page.
 * @param	{Number}	[pageType=1] Type of page to create (see WEB_page_types valuelist).
 * @param	{Number}	[parentID] Parent page primary key.
 * @param	{Number}	[themeID] Theme primary key for page.
 * @param	{Number}	[layoutID] Layout primary key for page.
 * 
 * @returns	{JSRecord}	Newly created page record.
 * 
 * @properties={typeid:24,uuid:"A7F7C059-3707-498F-A0B6-C1334EDA6A10"}
 * @AllowToRunInFind
 */
function WEBc_page_new(pageName,pageType,parentID,themeID,layoutID) {
	if (!pageName) {
		pageName = 'Untitled page'
	}
	
	if (!pageType) {
		pageType = 0
	}
	
	//check if can add record
	
	if (!globals.WEBc_sutra_trigger('TRIGGER_registered_action_authenticate',['cms page add'])) {
		globals.DIALOGS.showErrorDialog(
						'Error',
						'You are not authorized to add new pages'
				)
		return
	}
	
	//default values for selected site
	var siteDefaults = forms.WEB_0F_site.ACTION_get_defaults()
	
	//TODO: prompt to modify defaults (for example, logged in as spanish, only allowed to create spanish)
	
	//we have enough information to create a record
	if (siteDefaults) {
		
		//turn on feedback indicator
		globals.CODE_cursor_busy(true)
		
		//turn on progressbar if not already on
		if (!globals.WEBc_sutra_trigger('TRIGGER_progressbar_get')) {
			globals.WEBc_sutra_trigger('TRIGGER_progressbar_start',[null,'Creating new page...'])
		}
		
		var fsPage = databaseManager.getFoundSet('sutra_cms','web_page')
		fsPage.clear()
		
		//parent record specified
		if (parentID) {
			fsPage.find()
			fsPage.id_page = parentID
			var results = fsPage.search()
			
			//get the parent record
			if (results) {
				var parentRec = fsPage.getRecord(1)
			}
		}
		
		var pageRec = fsPage.getRecord(fsPage.newRecord(false,true))
		
		//put this page in the correct place; there were other records
		
		//find current syblings (of parent rec or at the top level)
		fsPage.find()
		fsPage.parent_id_page = (parentRec) ? parentRec.id_page : '^='
		fsPage.id_site = (parentRec) ? parentRec.id_site : forms.WEB_0F_site.id_site
		var results = fsPage.search()
		
		//fill in columns of page
		pageRec.page_type = pageType
		pageRec.parent_id_page = (parentRec) ? parentRec.id_page : null
		pageRec.order_by = (parentRec) ? parentRec.web_page_to_page__child.getSize() + 1 : results + 1
		pageRec.id_site = (parentRec) ? parentRec.id_site : forms.WEB_0F_site.id_site
		pageRec.flag_publish = siteDefaults.record.flag_auto_publish
		
		//create platform record (theme and layout)
		var platformRec = pageRec.web_page_to_platform.getRecord(pageRec.web_page_to_platform.newRecord(false,true))
		platformRec.id_site_platform = siteDefaults.platform.id_site_platform
		platformRec.id_theme = themeID
		platformRec.id_layout = layoutID
		
		//create language record (page name and seo)
		var languageRec = pageRec.web_page_to_language.getRecord(pageRec.web_page_to_language.newRecord(false,true))
		languageRec.id_site_language = siteDefaults.language.id_site_language
		languageRec.page_name = pageName
		
		//create group record (nothing now)
		var groupRec = pageRec.web_page_to_group.getRecord(pageRec.web_page_to_group.newRecord(false,true))
		groupRec.id_site_group = siteDefaults.group.id_site_group
		
		//create 1st version for this triumvirate
		var fsVersion = databaseManager.getFoundSet('sutra_cms','web_version')
		fsVersion.clear()
		var newVersion = fsVersion.getRecord(fsVersion.newRecord(false,true))
		newVersion.id_platform = platformRec.id_platform
		newVersion.id_language = languageRec.id_language
		newVersion.id_group = groupRec.id_group
		newVersion.version_number = 1
		newVersion.flag_active = 1
		newVersion.version_name = 'Initial version'
		
		var fsPath = databaseManager.getFoundSet('sutra_cms','web_path')
		var siteID = pageRec.id_site
		
		//add in path for this page
		var pathNameWanted = languageRec.page_name || 'untitled-page'
		pathNameWanted = pathNameWanted.toLowerCase()
		pathNameWanted = utils.stringReplace(pathNameWanted, ' ', '-')
		//replace two consecutive dashes with one
		while (utils.stringPatternCount(pathNameWanted,'--')) {
			pathNameWanted = utils.stringReplace(pathNameWanted, '--', '-')
		}
		
		var pathName = pathNameWanted
		var cnt = 1
		
		//we need to get into the loop
		results = null
		
		while (results != 0) {
			fsPath.find()
			fsPath.id_site = siteID
			fsPath.path = pathName
			var results = fsPath.search()
			
			if (results) {
				pathName = pathNameWanted + cnt++
			}
		}
		
		var recPath = languageRec.web_language_to_path.getRecord(languageRec.web_language_to_path.newRecord(false,true))
		recPath.flag_default = 1
		recPath.path = pathName
		recPath.id_site = siteID
		recPath.id_page = pageRec.id_page
		
		databaseManager.saveData()
		
		// get editable regions based on layout selected
		if (!utils.hasRecords(platformRec,'web_platform_to_layout.web_layout_to_editable')) {
			globals.CODE_cursor_busy(false)
			return
		}
		
		var layout = platformRec.web_platform_to_layout.getSelectedRecord()
		
		//create all areas for this layout, copying over existing content based on area name
		for (var i = 1; i <= layout.web_layout_to_editable.getSize(); i++) {
			//new area to create
			var editable =  layout.web_layout_to_editable.getRecord(i)
			
			var newArea = forms.WEB_0F_page__design_1F__header_display__version.AREA_new(editable,newVersion,i)
		}
		
		// finish up
		databaseManager.saveData()
		
		//set flag that need to update tree view on next load
		forms.WEB_0T_page._refresh = true
		
		//turn off feedback indicator if on
		if (globals.WEBc_sutra_trigger('TRIGGER_progressbar_get') instanceof Array) {
			if (globals.WEBc_sutra_trigger('TRIGGER_progressbar_get')[1] == 'Creating new page...') {
				globals.WEBc_sutra_trigger('TRIGGER_progressbar_stop')
			}
		}
		globals.CODE_cursor_busy(false)
		
		return pageRec
	}
	//something wrong at the site level
	else {
		//not all defaults specified
		if (utils.hasRecords(forms.WEB_0F_page.foundset)) {
			globals.DIALOGS.showErrorDialog(
							'Error',
							'The defaults are not set correctly for this site'
					)
		}
		//no site record
		else {
			globals.DIALOGS.showErrorDialog(
							'Error',
							'You must add a site record first'
					)
		}
	}
}

/**
 * Return array of parent page records in order from current page to top level page
 * 
 * @param {Object}		obj Sutra CMS controller obj.
 * @param {String} 		[order="asc"] Order in which pages are sorted. "asc" puts current page first, "desc" puts current page last.
 * @param {JSRecord<db:/sutra_cms/web_page>}	[pageRec=obj.page.record] Page record to lookup (overrides whatever page is in obj).
 * @param {JSRecord<db:/sutra_cms/web_path>}	[pathRec] Specify path (language) to use.
 * 
 * @returns {JSRecord<db:/sutra_cms/web_page>[]}	Array of parent records from given record
 * 
 * @properties={typeid:24,uuid:"541905F0-9B0C-474D-968C-F85408B3B05A"}
 */
function WEBc_markup_pages_up(obj, order, pageRec, pathRec) {
	// object not passed in, grab it
	if (!obj) {
		obj = globals.CMS.data
	}
	
	//given a path (language); get primed
	if (pathRec && utils.hasRecords(pathRec,'web_path_to_language.web_language_to_page') && utils.hasRecords(pathRec,'web_path_to_language.web_language_to_site_language')) {
		pageRec = pathRec.web_path_to_language.web_language_to_page.getSelectedRecord()
		var siteLanguageRec = pathRec.web_path_to_language.web_language_to_site_language.getSelectedRecord()
	}
	//no record specified, lookup from obj
	else if (!pageRec && obj && obj.page) {
		pageRec = obj.page.record
	}
	
	//default to "asc" order if none passed in
	order = order || "asc"
	
	//array of pages to return
	var pages = new Array()
	
	//we have enough information to do stuff
	if (pageRec) {
		//add in initial record
		pages.push(pageRec)
		
		//loop up the sitemap
		while ( pageRec.parent_id_page ) {
			//reasign record var
			pageRec = pageRec.web_page_to_page__parent.getRecord(1)
			
			//store in return array
			if ( order == "asc" ) {
				pages.unshift(pageRec)
			}
			else {
				pages.push(pageRec)
			}
		}
	}
	
	return pages
}

/**
 * Return array of site language records
 * 
 * @param {Object}		obj Sutra CMS controller obj.
 * 
 * @returns {JSRecord<db:/sutra_cms/web_page>[]}	Array of language records for current site
 * 
 * @properties={typeid:24,uuid:"69D28FAB-CD7D-4A2D-85B3-24037D00B135"}
 */
function WEBc_markup_site_languages(obj) {
	var languages = []
	var recs = globals.CMS.data.site.record.web_site_to_site_language
	for (var i = 0; i < recs.getSize(); i++) {
		languages.push(recs.getRecord(i + 1))
	}
	return languages
}

/**
 * Return array of published child pages beginning with current page
 * 
 * @param {Object}		obj Sutra CMS controller obj.
 * @param {JSRecord<db:/sutra_cms/web_page>}	[pageRec=obj.page.record] Page record to lookup (overrides whatever page is in obj).
 * @param {JSRecord<db:/sutra_cms/web_path>}	[pathRec] Specify path (language) to use.
 * 
 * @returns {JSRecord<db:/sutra_cms/web_page>[]}	Array of parent records from given record
 * 
 * @properties={typeid:24,uuid:"3DB0FF72-EDE1-4F86-8F2A-BCB288586DB8"}
 */
function WEBc_markup_pages_down(obj, pageRec, pathRec) {
	// object not passed in, grab it
	if (!obj) {
		obj = globals.CMS.data
	}
	
	//given a path (language); get primed
	if (pathRec && utils.hasRecords(pathRec,'web_path_to_language.web_language_to_page') && utils.hasRecords(pathRec,'web_path_to_language.web_language_to_site_language')) {
		pageRec = pathRec.web_path_to_language.web_language_to_page.getSelectedRecord()
		var siteLanguageRec = pathRec.web_path_to_language.web_language_to_site_language.getSelectedRecord()
	}
	//no record specified, lookup from obj
	else if (!pageRec && obj && obj.page) {
		pageRec = obj.page.record
	}
	
	//array of pages to return
	var pages = new Array()
	
	function iterate(foundset, pages) {
		for (var i = 0; i < foundset.getSize(); i++) {
			var record = foundset.getRecord(i + 1)			
			if ( utils.hasRecords(record.web_page_to_page__child__publish) ) {
				pages = iterate(record.web_page_to_page__child__publish, pages)
			}	
			else if ( record.page_type == 0) {
				pages.push(record)			
			}
		}	
		return pages
	}
	
	//there are published children
	if ( utils.hasRecords( pageRec.web_page_to_page__child__publish ) ) {
		pages = iterate(pageRec.web_page_to_page__child__publish, pages)
	}
	
	return pages
}

/**
 * @returns	{Boolean}	Status of rewrite mode.  Note: must be in sync with urlrewrite processing.
 * 
 * @properties={typeid:24,uuid:"7593B3FF-C349-48C0-893B-35A63738535D"}
 */
function WEBc_install_getRewrite() {
	var fsInstall = databaseManager.getFoundSet('sutra_cms','web_install')
	fsInstall.loadAllRecords()
	databaseManager.refreshRecordFromDatabase(fsInstall,0)
	
	if (utils.hasRecords(fsInstall) && fsInstall.rewrite_enabled) {
		return true
	}
	else {
		return false
	}
}

/**
 * Return array of published child pages beginning with current page
 * 
 * @param {Object}	obj Sutra CMS controller obj.
 * @param {String}	[siteID=obj.site.record] Specify the site.
 * 
 * @returns {JSRecord<db:/sutra_cms/web_page>[]}	Array of parent records from given record
 * 
 * @properties={typeid:24,uuid:"CFD41FEB-A2F8-4CC3-87B9-3458CA5E74F3"}
 * @AllowToRunInFind
 */
function WEBc_markup_link_servlet(obj,siteID) {
	// object not passed in, grab it
	if (!obj) {
		obj = globals.CMS.data
	}
	
	//how requested
	var appServer = application.getServerURL()
	appServer = appServer.split(':')
	var accessURL = appServer[1].slice(2)
	var requestURL = (accessURL == '127.0.0.1') ? 'localhost' : accessURL
	if (appServer.length > 2) {
		var port = utils.stringToNumber(appServer[2])
		requestURL += ':' + port
	}
	
	var fsInstall = databaseManager.getFoundSet('sutra_cms','web_install')
	fsInstall.loadAllRecords()
	databaseManager.refreshRecordFromDatabase(fsInstall,0)
	
	//grab site
	if (siteID) {
		var fsSite = databaseManager.getFoundSet('sutra_cms','web_site')
		fsSite.find()
		fsSite.id_site = siteID
		var results = fsSite.search()
		
		//this site exists
		if (results == 1) {
			var siteRec = fsSite.getRecord(1)
		}
		//site specified doesn't exist, try to fail gracefully
		else {
			var siteRec = new Object()
		}
	}
	else if (obj && obj.site && obj.site.record){
		var siteRec = obj.site.record
	}
	//no site, try to fail gracefully
	else {
		var siteRec = new Object()
	}
	
	//url specified
	var siteURL = ''
	if (siteRec.url_servlet) {
		siteURL = siteRec.url_servlet
	}
	
	//if rewrites on
	if (utils.hasRecords(fsInstall) && fsInstall.rewrite_enabled) {
		//check to see if servlet url specified for site
		if (siteURL) {
			return siteURL
		}
		//use default install servlet url
		else if (fsInstall.url_install) {
			return fsInstall.url_install
		}
		//use whatever url the request came in on
		else {
			return requestURL
		}
	}
	//rewrites off
	else {
		return requestURL
	}
}

/**
 * Any function that calls something in the data sutra CODE module comes through 
 * here first in the event that not running in Data Sutra framework or no code module
 * 
 * @param {String}	method Name of method to check against.
 * @param {Something[]} [arguments] Array of arguments to pass in to method (max of 10 arguments).
 * 
 * @returns	{String|Boolean|Object|etc}	Something or nothing
 * 
 * @properties={typeid:24,uuid:"E97E5A2E-734D-4D7C-B3FF-9FDA95493B8F"}
 */
function WEBc_sutra_trigger(method,arguments) {
	//do we have the method requested and are we in the data sutra application framework
	if (solutionModel.getGlobalMethod(method) && application.__parent__.solutionPrefs) {
		if (arguments && arguments.length) {
			return globals[method](arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7],arguments[8],arguments[9])
		}
		else {
			return globals[method]()
		}
	}
	//look up how to fail
	else {
		switch (method) {
			case 'TRIGGER_registered_action_authenticate':	//check action for logged in user
				//allow all actions
				return true
				break
			case 'TRIGGER_progressbar_set':					//set status of progress bar
				//no return
				break
			case 'TRIGGER_progressbar_get':					//check status of progress bar
				//[progressValue,explanationText,explanationToolTip,progressMaxValue]
				return [0,'','',100]
				break
			case 'TRIGGER_progressbar_start':				//start progress bar
				//sets some stuff; no return
				break
			case 'TRIGGER_progressbar_stop':				//stop progress bar
				//no return
				break
			case 'TRIGGER_interface_lock':					//lock everything except the workflow form
				return false
				break
			case 'TRIGGER_toolbar_set':						//set toolbar in top center of frame
				return false
				break
			case 'TRIGGER_toolbar_toggle':					//set the state of a toolbar in top center of frame
				//sets some stuff; no return
				break
			case 'TRIGGER_navigation_filter_update':		//filter navigation item per meta data
				return false
				break
			case 'TRIGGER_navigation_set':					//move to specified navigation item
				return 'noSutra'
				break
			case 'TRIGGER_toolbar_record_navigator_set':	//turn off record navigator toolbar
				//no return
				break
			case 'TRIGGER_ul_tab_list':						//go between universal and custom lists
				//no return
				break
			case 'TRIGGER_tooltip_set':						//set tooltips per meta data on calling form
				//no return
				break
			case 'TRIGGER_spaces_set':						//go to specific space
				return false
				break
//			case '':
//				
//				break
//			case '':
//				
//				break
//			case '':
//				
//				break
			default:
				return false
		}
	}
}

/**
 * Return all pages for current site that contain given attribute or 0 if no pages found
 *
 * @param {Object} obj CMS object
 * @param {String} att Look for pages that have this attribute
 *
 * @returns {JSFoundset|Integer} Foundset of pages that have attribute
 * 
 * @properties={typeid:24,uuid:"66B67CD6-DBF9-4EF4-B330-EC7562A8E415"}
 * @AllowToRunInFind
 */
function WEBc_markup_pages_attribute(obj, att) {
    // find pages with supplied attribute
	if ( att ) {
    	var pages = databaseManager.getFoundSet("sutra_cms", "web_page")
	    pages.find()
	    pages.id_site = obj.site.id
	    pages.web_page_to_attribute.attribute_key = att
	    pages.flag_publish = 1
	    var count = pages.search()
		return (count) ? pages : 0
	}
	else return 0
}

/**
 * Return some attribute about an asset
 * 
 * @param {String} assetInstanceID The asset we need to get information about.
 * @param {UUID|String|Object} [pageID] The page requested.
 * @param {String}	[siteURL] Domain name request came in on.
 * @param {String}	[linkType] Style of URLs (index, folder, pretty).
 * @param {Object}	[obj] Object used to drive headless client.
 * 
 * @return {String} URL for a page.
 * 
 * @properties={typeid:24,uuid:"22E8DF83-30A3-4D46-A7A6-5464F76E1FAE"}
 * @AllowToRunInFind
 */
function WEBc_markup_link_asset(assetInstanceID, pageID, siteURL, linkType, obj) {
	var returnObj = new Object()
	
	// if obj passed instead of UUID for pageID
	if ( !(pageID instanceof UUID) && pageID && pageID.page && pageID.page.id ) {
		pageID = pageID.page.id
	}
	
	// object not passed in, grab it
	if (!obj) {
		obj = globals.CMS.data
	}

	//get page requested
	if (assetInstanceID) {
		var fsAssetInstance = databaseManager.getFoundSet("sutra_cms","web_asset_instance")
		fsAssetInstance.find()
		fsAssetInstance.id_asset_instance = assetInstanceID
		var count = fsAssetInstance.search()
	}
	
	//this asset exists, derive site
	if (count) {
		var assetInstanceRec = fsAssetInstance.getRecord(1)
		var assetRec = fsAssetInstance.web_asset_instance_to_asset.getRecord(1)
		var fsSite = databaseManager.getFoundSet('sutra_cms','web_site')
		fsSite.loadRecords(assetRec.id_site)
		var siteRec = fsSite.getRecord(1)
		//grab default language for this site
		for (var i = 1; i <= siteRec.web_site_to_site_language.getSize(); i++) {
			var siteLangRec = siteRec.web_site_to_site_language.getRecord(i)
			if (siteLangRec.flag_default) {
				var siteLanguageRec = siteLangRec
				break
			}
		}
	}
	//no site specified, try to fail gracefully
	else {
		var assetInstanceRec = new Object()
		var assetRec = new Object()
		var siteRec = new Object()
		var siteLanguageRec = new Object()
	}
	
	//get the site's language record from markup call
	if (obj && obj.language && obj.language.record && utils.hasRecords(obj.language.record.web_language_to_site_language)) {
		var siteLanguageRec = obj.language.record.web_language_to_site_language.getRecord(1)
	}
	
	//get url up to files directory
	var pageLink = utils.stringReplace(globals.WEBc_markup_link_base(pageID, siteURL, siteLanguageRec),'sutraCMS/','') + globals.WEBc_markup_link_resources(pageID,siteURL,linkType)
	
	//tack on directory and file name
	pageLink += assetInstanceRec.asset_directory + '/' + assetInstanceRec.asset_title
	
	//build object with pertinent asset information
	returnObj.link = pageLink
	returnObj.name = assetInstanceRec.asset_title
	returnObj.title = assetRec.asset_name
	returnObj.description = assetRec.description
	
	//full url for a page requested
	return returnObj
}

/**
 * Log an event in the Sutra CMS log table.
 * 
 * @param {String}	logType Type of event being logged.
 * @param {String}	message Description of event. 
 * @param {String}	[siteID] What site is this affecting.
 * @param {String}	[pkTable] What table is this affecting.
 * @param {String}	[pkID] The primary key of the affected table.
 * @param {String}	[pk2Table] What table is this affecting.
 * @param {String}	[pk2ID] The primary key of the affected table.
 * 
 * @properties={typeid:24,uuid:"928202F6-F074-4A6D-BD74-4C1A8324801B"}
 */
function WEBc_log_create(logType,message,siteID,pkTable,pkID,pk2Table,pk2ID) {
	if (logType) {
		var fsLog = databaseManager.getFoundSet('sutra_cms','web_log')
		var logRec = fsLog.getRecord(fsLog.newRecord(false,true))
		
		logRec.log_type = logType
		logRec.log_message = message
		logRec.id_site = siteID
		logRec.record_table = pkTable
		logRec.record_id = pkID
		logRec.record_2_table = pk2Table
		logRec.record_2_id = pk2ID
		
		databaseManager.saveData(logRec)
	}
}

/**
 * Return the name of a page
 * 
 * @param {UUID|String|Object} pageID The page (language can be specified) requested.
 * @param {String}	[siteURL] Domain name request came in on.
 * @param {String}	[linkType] Style of URLs (index, folder, pretty).
 * @param {String}	[webMode] Editing the page in Real Mode (only an option from the admin interface).
 * @param {Object}	[obj] Object used to drive headless client.
 * 
 * @return {String} URL for a page.
 * 
 * @properties={typeid:24,uuid:"F1467DE2-99B2-49CE-8D67-278946FAEC9F"}
 * @AllowToRunInFind
 */
function WEBc_markup_page_name(pageID, siteURL, linkType, webMode, obj) {
	
	// if obj passed instead of UUID for pageID
	if ( !(pageID instanceof UUID) && pageID && pageID.page && pageID.page.id ) {
		pageID = pageID.page.id
	}
	
	// object not passed in, grab it
	if (!obj) {
		obj = globals.CMS.data
	}
	
	//get page requested
	if (pageID) {
		//particular language specified
		if (typeof pageID == 'string') {
			var reference = pageID.split('_')
			pageID = reference[0]
			var languageID = reference[1]
		}
		
		var fsPage = databaseManager.getFoundSet("sutra_cms","web_page")
		fsPage.find()
		fsPage.id_page = pageID.toString()
		var count = fsPage.search()
	}
	
	//something amiss, try to fail gracefully
	var pageRec = new Object()
	var siteRec = new Object()
	var siteLanguageRec = new Object()
	
	//this page exists, get its site
	if (count && utils.hasRecords(fsPage.web_page_to_site)) {
		var pageRec = fsPage.getRecord(1)
		var siteRec = pageRec.web_page_to_site.getRecord(1)
		
		//this is an internal link type of page
		while (pageRec.page_type == 3 && pageRec.page_link_internal) {
			fsPage.find()
			fsPage.id_page = pageRec.page_link_internal
			fsPage.flag_publish = 1
			var count = fsPage.search()
			
			//the internal link exists
			if (count) {
				pageRec = fsPage.getRecord(1)
				siteRec = pageRec.web_page_to_site.getRecord(1)
			}
			//internal link deleted or not published, error out
			else {
				pageRec = siteRec.web_site_to_page__error.getRecord(1)
				siteRec = pageRec.web_page_to_site.getRecord(1)
			}
		}
	}
	
	//specific language specified for this link
	if (languageID) {
		var fsLanguage = databaseManager.getFoundSet("sutra_cms","web_language")
		fsLanguage.find()
		fsLanguage.id_language = languageID
		var count = fsLanguage.search()
		
		if (count) {
			var pageLanguageRec = fsLanguage.getRecord(1)
			var siteLanguageRec = pageLanguageRec.web_language_to_site_language.getRecord(1)
		}
	}
	else {
		//get the site's language record
		if (obj && obj.language && obj.language.record && utils.hasRecords(obj.language.record.web_language_to_site_language)) {
			var siteLanguageRec = obj.language.record.web_language_to_site_language.getRecord(1)
		}
		
		//get the page's language record
		if (pageRec && utils.hasRecords(pageRec.web_page_to_language) && siteLanguageRec) {
			//loop to find selected language
			for (var i = 1; i <= pageRec.web_page_to_language.getSize(); i++) {
				var languageRec = pageRec.web_page_to_language.getRecord(i)
				
				if (languageRec.id_site_language == siteLanguageRec.id_site_language) {
					var pageLanguageRec = languageRec
					break
				}
			}
		}
	}
	
	//find default language
	if (utils.hasRecords(pageRec,'web_page_to_language')) {
		pageRec.web_page_to_language.sort('rec_created asc')
		var pageLanguageDefaultRec =  pageRec.web_page_to_language.getRecord(1)
	}
	
	
	//grab this page's name based on language
	if (pageLanguageRec) {
		return pageLanguageRec.page_name
	}
	//pull path from default page's language
	else if (pageLanguageDefaultRec) {
		return pageLanguageDefaultRec.page_name
	}
	//filler text
	else {
		return 'Unnamed page'
	}
}

/**
 * Return link to the home page for a site
 * 
 * @param {JSRecord<db:/sutra_cms/web_site>}	[siteRec] Specify site to get home page for.
 * 
 * @returns {String} Page token.
 * 
 * @properties={typeid:24,uuid:"47E905E8-CAF4-495C-B08B-F8A4D3320386"}
 */
function WEBc_markup_link_home(siteRec) {
	var token = ''
		
	if (!siteRec && globals.CMS && globals.CMS.data && globals.CMS.data.site && globals.CMS.data.site.record) {
		siteRec = globals.CMS.data.site.record
	}
	
	//check to see if there is a home page specified for the requested site
	if (utils.hasRecords(siteRec,'web_site_to_page__home')) {
		token = globals.WEBc_markup_token(siteRec.web_site_to_page__home.getSelectedRecord())
	}
	
	return token
}

/**
 * Return link to the home page for a site
 * 
 * @param {JSRecord<db:/sutra_cms/web_site>}	[siteRec] Specify site to get home page for.
 * 
 * @returns {String} Page token.
 * 
 * @properties={typeid:24,uuid:"47E905E8-C7F4-495C-B08B-F8A4D3320386"}
 */
function WEBc_markup_link_error(siteRec) {
	var token = ''
		
	if (!siteRec && globals.CMS && globals.CMS.data && globals.CMS.data.site && globals.CMS.data.site.record) {
		siteRec = globals.CMS.data.site.record
	}
	
	//check to see if there is a home page specified for the requested site
	if (utils.hasRecords(siteRec,'web_site_to_page__error')) {
		token = globals.WEBc_markup_token(siteRec.web_site_to_page__error.getSelectedRecord())
	}
	
	return token
}

/**
 * Removes html tags and entities from a string
 * 
 * @param {String} str Data with html tags
 * 
 * @returns {String} Data with html tags and entities removed
 * 
 * @properties={typeid:24,uuid:"D8577ED0-FCFC-43DB-A3BA-D32E5928F72A"}
 */
function WEBc_data_strip_html(str) {

  // strip tags
  var results = str.replace(/<.*?>/g, "")
  
  // strip entities
  results = results.replace(/&(nbsp|amp|quot|lt|gt|reg);/g, "")
  
  return results

}

/**
 * Removes common words from a string
 * 
 * @param {String} str Data with common words
 * 
 * @returns {String} Data without with common words removed
 * 
 * @properties={typeid:24,uuid:"3E4F86B7-B485-4A51-97EA-3A15591C652C"}
 */
function WEBc_data_strip_common_words(str) {
  
  var results = str
  var commonWords = ['at','the','and','of','in']
  for (var i = 0; i < commonWords.length; i++) {
    var regexp = new RegExp(" " + commonWords[i] + " ", "gi")
    results = results.replace(regexp, " ")
  }      
  return results

}

/**
 * 
 * Removes punctuation from a string
 * 
 * @param {String} str Data with punctuation
 * 
 * @returns {String} Data without with punctuation removed
 * 
 * @properties={typeid:24,uuid:"3DE38F3B-9979-4B35-B09D-440AE7EE0F3A"}
 */
function WEBc_data_strip_punctuation(str) {

  var results = str.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")
     
  return results

}
