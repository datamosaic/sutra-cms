/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"24fde543-69cc-4de9-af47-7f7c22221f17"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {Object}
 * 
 * @properties={typeid:35,uuid:"047CD542-9062-4012-8397-5B6B2290D120",variableType:-4}
 */
var WEB_swc_arguments = new Object();

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"59111D71-665C-4CE1-BBEF-EA4B1ADB6F0D",variableType:4}
 */
var WEB_block_scope__new = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"59111D71-665C-4CE2-BBEF-EA4B1ADB6F0D",variableType:4}
 */
var WEB_block_category__new = null;


/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"484C4F77-B18E-4B39-89C7-59BFCFB5B6E5"}
 */
var WEB_block_version = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"24385EA8-9C3C-4666-8A71-239F22D067E5",variableType:4}
 */
var WEB_block_scope = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B1FA121E-7FCE-4CD5-97D2-AE0E75D79440"}
 */
var WEB_page_group = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"86AA4208-BDF9-4D86-8267-C3EB48EC6C32"}
 */
var WEB_page_platform = null;

/**
 * @properties={typeid:35,uuid:"BF6E24CB-9B98-4241-B8C2-CBE4CB520D6A",variableType:-4}
 */
var WEB_page_version = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"5DDBD6FC-A0E1-4395-B10B-6154C12B4285"}
 */
var WEB_page_language = null;

/**
 * @type {Number}
 *
 * Default to GUI mode on page (Data|1, GUI|2, Real|3)
 * 
 * @properties={typeid:35,uuid:"DD53BF5B-DD20-4B47-911A-41051101A010",variableType:4}
 */
var WEB_page_mode = 2;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F5BD30C1-1A0F-436A-9320-9812076B6B72"}
 */
var WEB_page_sort = 'order_by asc';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"14FD6120-E9BF-4EC2-973D-9790A6F6903F"}
 */
var WEB_preview_url = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"87BE1F80-1634-4DC2-B9DA-29CB5B7CF054"}
 */
var WEB_site_display = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"15313654-99B2-4BCA-9D6F-0D37F917C5DD"}
 */
var WEB_tag_choose = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"791D7FA7-752E-42BD-9BD8-90FDC1548242",variableType:4}
 */
var WEB_tag_kind = null;

/**
 * @properties={typeid:24,uuid:"47BC6C70-6E6A-4095-9614-B925C3716083"}
 */
function WEB_lock_workflow(lockWorkflow,lockList) {
	
/*
 *	TITLE    :	WEB_lock_workflow
 *			  	
 *	MODULE   :	
 *			  	
 *	ABOUT    :	lock the workflow form (opposite of globals.TRIGGER_interface_lock)
 *			  	
 *	INPUT    :	1- true/false to lock/unlock the workflow
 *			  	2- true/false to lock/unlock the list area
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	DEV_lock_workflow([lockWorkflow], [lockList]) Locks the workflow and/or list areas; when called without arguments, refires current state
 *			  	
 *	MODIFIED :	February 27, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */

if (application.__parent__.solutionPrefs) {
	//old version
	if (solutionModel.getForm('DATASUTRA_0F_solution') && forms.DATASUTRA_0F_solution.elements.gfx_curtain_2) {
		lockWorkflow = (typeof lockWorkflow == 'boolean') ? lockWorkflow : solutionPrefs.design.statusLockWorkflow
		lockList = (typeof lockList == 'boolean') ? lockList : solutionPrefs.design.statusLockList
		
		var baseForm = solutionPrefs.config.formNameBase
		
		//lock the workflow
		if (lockWorkflow) {
			
			var x = 0
			var y = 44		//offset for design mode and normal header
			var divider = 8
			
			var x2 = 0
			var y2 = 44
			
			//figure out location of curtain
			switch (solutionPrefs.config.activeSpace) {
				case 'standard':
					y2 += solutionPrefs.screenAttrib.spaces.standard.currentVertical
					
					if (solutionPrefs.config.flexibleSpace) {
						y2 += divider
					}
				case 'standard flip':
					x += solutionPrefs.screenAttrib.spaces.standard.currentHorizontal
					
					if (solutionPrefs.config.flexibleSpace) {
						x += divider
					}
					break
					
				case 'list':
				case 'list flip':
					x += solutionPrefs.screenAttrib.spaces.list.currentHorizontal
					
					if (solutionPrefs.config.flexibleSpace) {
						x += divider
					}
					
					if (solutionPrefs.config.activeSpace == 'list flip') {
						var nonList = true
					}
					break
					
				case 'vertical':
					x2 += solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalOne
					
					if (solutionPrefs.config.flexibleSpace) {
						x2 += divider
					}
				case 'vertical flip':
					x += solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalOne + solutionPrefs.screenAttrib.spaces.vertical.currentHorizontalTwo
					
					if (solutionPrefs.config.flexibleSpace) {
						x += divider
					}
					break
					
				case 'centered':
					x2 += application.getWindowWidth(null) - solutionPrefs.screenAttrib.spaces.centered.currentHorizontalTwo
					
					if (solutionPrefs.config.flexibleSpace) {
						x2 += divider
					}
				case 'centered flip':
					x += solutionPrefs.screenAttrib.spaces.centered.currentHorizontalOne
					
					if (solutionPrefs.config.flexibleSpace) {
						x += divider
					}
					
					break
					
				case 'classic':
					x2 += solutionPrefs.screenAttrib.spaces.classic.currentHorizontal
					
					if (solutionPrefs.config.flexibleSpace) {
						x2 += divider
					}
				case 'classic flip':
					x += solutionPrefs.screenAttrib.spaces.classic.currentHorizontal
					y += solutionPrefs.screenAttrib.spaces.classic.currentVertical
					
					if (solutionPrefs.config.flexibleSpace) {
						x += divider
						y += divider
					}
					break
					
				case 'wide':
					x2 += solutionPrefs.screenAttrib.spaces.wide.currentHorizontal
					
					if (solutionPrefs.config.flexibleSpace) {
						x2 += divider
					}
				case 'wide flip':
					y += solutionPrefs.screenAttrib.spaces.wide.currentVertical
					
					if (solutionPrefs.config.flexibleSpace) {
						y += divider
					}
					break
					
				case 'workflow':
					if (solutionPrefs.config.activeSpace == 'workflow') {
						var nonList = true
					}
					break
					
				case 'workflow flip':
					if (!lockList) {
						forms[baseForm].elements.gfx_curtain.visible = false
						forms[baseForm].elements.gfx_curtain_2.visible = false
						return
					}
					else {
						nonList = true
					}
					break
			}
			
		//CURTAIN ONE
			//set location
			forms[baseForm].elements.gfx_curtain.setLocation(x,y)
			//set size
			forms[baseForm].elements.gfx_curtain.setSize(
									forms[baseForm].elements.tab_content_C.getWidth(),
									forms[baseForm].elements.tab_content_C.getHeight()
								)
			
			//turn on curtain
			forms[baseForm].elements.gfx_curtain.visible = true
		
		//CURTAIN TWO
			if (lockList && !nonList) {
				//set location
				forms[baseForm].elements.gfx_curtain_2.setLocation(x2,y2)
				//set size
				forms[baseForm].elements.gfx_curtain_2.setSize(
										forms[baseForm].elements.tab_content_B.getWidth(),
										forms[baseForm].elements.tab_content_B.getHeight()
									)
				
				//turn on curtain
				forms[baseForm].elements.gfx_curtain_2.visible = true
			}
			else {
				//turn off curtain
				forms[baseForm].elements.gfx_curtain_2.visible = false
			}
			
	//		//turn off tabpanel
	//		forms[baseForm].elements.tab_content_C.enabled = false
	//				
	//		//there is a form in tab panel
	//		if (forms[baseForm].elements.tab_content_C.tabIndex) {
	//			var formName = forms[baseForm].elements.tab_content_C.getTabFormNameAt(forms[baseForm].elements.tab_content_C.tabIndex)
	//			
	//			//if a subheader present, turn it on
	//			if (forms[formName].elements.gfx_subheader) {
	//				forms[formName].elements.gfx_subheader.enabled = true
	//			}
	//		}
		}
		//unlock the workflow
		else {
			//turn off curtains
			forms[baseForm].elements.gfx_curtain.visible = false
			forms[baseForm].elements.gfx_curtain_2.visible = false
			
	//		//turn on tabpanel
	//		forms[baseForm].elements.tab_content_C.enabled = true
		}
		
		//track state of workflow lockedness
		solutionPrefs.design.statusLockWorkflow = lockWorkflow
		solutionPrefs.design.statusLockList = lockWorkflow && lockList
	}
	//most recent version
	else {
		DEV_lock_workflow(lockWorkflow,lockList)
	}
}
}

/**
 * @properties={typeid:24,uuid:"48FC5C3F-2354-442E-BE6A-4963B953E080"}
 */
function WEB_startup() {
	//hacks to load in all browser bean forms
	if (application.getApplicationType() == APPLICATION_TYPES.SMART_CLIENT || application.getApplicationType() == APPLICATION_TYPES.RUNTIME_CLIENT) {
		return
		//disable rec_on_select of the block type form
		WEB_block_on_select = false
		
		//show all forms with browser beans so they don't error out on initial view
//		forms.WEB_0F__image.controller.show()
//		forms.WEB_0F__html.controller.show()
//		forms.WEB_0F__code.controller.show()
//		forms.WEB_0F__content.controller.show()
//		application.sleep(1500)
//		forms.WEB_0F__content_view.controller.show()
//		//also hits up headless client so get zooming effect on first load
//		forms.WEB_0F_page__browser.controller.show()
		
		var browserForms = WEB_browser_forms()
		var tinyMCEForms = WEB_browser_forms('net.stuff.servoy.browser.beans.ServoyHtmlEditor')
		for (var i = 0; i < browserForms.length; i++) {
			var showForm = browserForms[i]
			
			//this form is in a solution that is included in the currently activated solution
			if (solutionModel.getForm(showForm)) {
				application.setStatusText('Pre-loading form: ' + showForm)
				
				forms[showForm].controller.show()
				
				//wait a little bit extra for tinymce
				if (tinyMCEForms.indexOf(showForm) != -1) {
//					application.sleep(1500)
//					application.updateUI(1500)
					
					//hard code to pre-load our tinymce form
					if (showForm == 'WEB_0F__content') {
						forms.WEB_0F__content.elements.bn_tinymce.setCustomConfiguration(forms.WEB_0F__content.TINYMCE_init('simple'))
					}
				}
			}
		}
		
		application.setStatusText(null)
		
		//return to main data sutra form when using the data sutra framework
		if (solutionModel.getForm('DATASUTRA_0F_solution')) {
			forms.DATASUTRA_0F_solution.controller.show()
		}
		//go to blank form when running standalone
		else {
			forms.WEB_0__startup.controller.show()
		}
	}
	else if (application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
		
	}
	
	//register user manager plugin
	if (plugins.UserManager) {
		plugins.UserManager.register( "Data Mosaic", "q9SA5eCyb085cvATVO8s9onGe3iBzJyC2ws9Qzcl6TQ7UxJMQQuHWHpFlzrNV3Rc" );
	}
}

/**
 * @properties={typeid:24,uuid:"577656F1-7609-4521-AABD-A8A3D7A026F2"}
 */
function WEB_servoy_wc_controller(startup, args) {
	// TODO: error checking
	
	//TODO: need to pick up the requested style override from downstream
	var styleName = 'harjo_alternate'
	
	//over ride style for webclient (if not already overridden)
	if (application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT && application.getClientProperty(APP_WEB_PROPERTY.WEBCLIENT_TEMPLATES_DIR) != styleName) {
		application.putClientProperty(APP_WEB_PROPERTY.WEBCLIENT_TEMPLATES_DIR, styleName)
	}
	
	//when running in developer, to avoid needing the cms module activated
	function checkForm(formName) {
		//form available; run
		if (forms[formName]) {
			return true
		}
		//form not available, save things to use later
		else {
			WEB_swc_arguments = args
		}
	}
	
	function findMethod(formName, methodName) {
		if (formName && methodName) {
			var smForm = solutionModel.getForm(formName)
			var smFormParent = smForm.extendsForm
			
			if (smForm.getFormMethod('CMS_iFrame_load')) {
				//run method if form is available; otherwise, it will get caught in web client startup (developer only issue)
				if (checkForm(formName)) {
					forms[formName][methodName](args)
				}
				return true
			}
			else if (smFormParent) {
				return findMethod(smFormParent.name, methodName)
			}
		}
	}
	
	// do something if the form requested is present
	if (args && args.form && solutionModel.getForm(args.form)) {
		// call iFrame loader if there is a method on the form specified
		if (findMethod(args.form,'CMS_iFrame_load')) {
			
		}
		// show the form without changing the url
		else {
			//run method if form is available; otherwise, it will get caught in web client startup (developer only issue)
			if (checkForm(args.form)) {
				forms[args.form].controller.show()
			}
		}
	}
	//show blank page because something not configured correctly
	else {
		forms.WEB_0__startup.controller.show()
	}
	
	//get login
	var login = WEBc_session_getData(args.server_session, args.login_object)
	
	if ( login ) {
		//make sure that login knows the id of this webclient
		if (login.swcID != plugins.sutra.getClientID()) {
			login.swcID = plugins.sutra.getClientID()
			CMS.session.setData(args.server_session, args.login_object,login)
		}
	}
}

/**
 * @properties={typeid:24,uuid:"CEE8177B-36B3-47A5-9CD7-574FDEBA51ED"}
 */
function WEB_site_find_restrict() {
	return forms.WEB_0F_site.id_site
}

/**
 * @properties={typeid:24,uuid:"CEE42540-FD8E-4717-A281-71CC6941C1D6"}
 * @AllowToRunInFind
 */
function WEB_upgrade() {
	//check to see what state form is in
	if (!utils.hasRecords(forms.WEB_0F_site.foundset)) {
		var nowLocked = true
	}
	
	var fsOldInstall = databaseManager.getFoundSet('sutra_cms_v1','web_install')
	
	//check for upgrade server (will be null if no db server by that name)
	if (fsOldInstall) {
		fsOldInstall.loadAllRecords()
		
		var fsOldSite = databaseManager.getFoundSet('sutra_cms_v1','web_site')
		fsOldSite.loadAllRecords()
		
		//prompt for which site to import
		if (utils.hasRecords(fsOldSite)) {
			fsOldSite.sort('site_name asc')
			
			var theSite = DIALOGS.showSelectDialog(
					'Import',
					'Choose site to import',
					databaseManager.getFoundSetDataProviderAsArray(fsOldSite,'site_name')
				)
			
			if (theSite) {
				for (var i = 1; i <= fsOldSite.getSize(); i++) {
					var record = fsOldSite.getRecord(i)
					
					if (record.site_name == theSite) {
						var oldSite = record
						break
					}
				}
				
				//a site has been selected
				if (oldSite) {
					
					WEBc_sutra_trigger('TRIGGER_progressbar_start',[0,'Importing "' + oldSite.site_name + '". Please wait....'])
					
					//mapping object for pages
					var mapping = {
							siteAtt : {},
							blockType : {},
							blockDisplay : {},
							blockInput : {},
							blockActionClient : {},
							blockActionWeb : {},
							theme : {},
							themeLayout : {},
							themeEditable : {},
							themeEditableDefault : {},
							image : {},
							scrapbook : {},
							page : {}
						}
					
					//all newly created blocks
					var allBlocks = new Array()
					
					//get mapping from old int to new uuid pks
					function getMap(oldValue,location) {
						if (oldValue && location) {
							var newValue = location[oldValue]
						}
						
						return newValue || null
					}
					
					//temporarily store int as uuid for later reference
					function uuidConvert(input) {
						if (typeof input == 'number') {
							var base = '00000000-1234-0000-0000-'
							
							input = input + ''
							
							while (input.length < 12) {
								input = '0' + input
							}
							
							return application.getUUID(base + input)
						}
						else {
							input = input.toString()
							input = input.substring(24,36)
							
							while (input.indexOf(0) == 0) {
								input = input.substr(1)
							}
							
							if (input) {
								return parseInt(input)
							}
							else {
								return null
							}
						}
					}
					
					//site columns
					var fsNewSite = databaseManager.getFoundSet('sutra_cms','web_site')
//					var newSite = forms.WEB_0F_site.foundset.getRecord(1)	//here to give me code completion in 5.x
					var newSite = fsNewSite.getRecord(fsNewSite.newRecord(false,true))
					
					databaseManager.copyMatchingColumns(oldSite,newSite,['organization_id'])
					
					WEBc_sutra_trigger('TRIGGER_progressbar_set',[5])
					
					//site attribute columns
					var fsOldSiteAttribute = databaseManager.getFoundSet('sutra_cms_v1','web_site_attribute')
					fsOldSiteAttribute.find()
					fsOldSiteAttribute.id_site = oldSite.id_site
					var results = fsOldSiteAttribute.search()
					
					if (results) {
						for (var i = 1; i <= fsOldSiteAttribute.getSize(); i++) {
							var oldSiteAttribute = fsOldSiteAttribute.getRecord(i)
							var newSiteAttribute = newSite.web_site_to_site_attribute.getRecord(newSite.web_site_to_site_attribute.newRecord(false,true))
							
							databaseManager.copyMatchingColumns(oldSiteAttribute,newSiteAttribute,['organization_id','id_site'])
							
							mapping.siteAtt[oldSiteAttribute.id_site_attribute] = newSiteAttribute.id_site_attribute
						}
					}
					
					//site group columns
					var fsOldSiteGroup = databaseManager.getFoundSet('sutra_cms_v1','web_group')
					fsOldSiteGroup.find()
					fsOldSiteGroup.id_site = oldSite.id_site
					var results = fsOldSiteGroup.search()
					
					if (results) {
						for (var i = 1; i <= fsOldSiteGroup.getSize(); i++) {
							var oldSiteGroup = fsOldSiteGroup.getRecord(i)
							var newSiteGroup = newSite.web_site_to_site_group.getRecord(newSite.web_site_to_site_group.newRecord(false,true))
							
							databaseManager.copyMatchingColumns(oldSiteGroup,newSiteGroup,['organization_id','id_site'])
							
							//set first group to be default for site (there should only be one group anyways)
							if (i == 1) {
								newSiteGroup.flag_default = 1
							}
						}
					}
					
					//site language
					var newSiteLanguage = newSite.web_site_to_site_language.getRecord(newSite.web_site_to_site_language.newRecord(false,true))
					newSiteLanguage.flag_default = 1
					newSiteLanguage.language_name = 'English'
					newSiteLanguage.language_code = 'en'
					newSiteLanguage.url = oldSite.url_2
					
					//site platform
					var newSitePlatform = newSite.web_site_to_site_platform.getRecord(newSite.web_site_to_site_platform.newRecord(false,true))
					newSitePlatform.flag_default = 1
					newSitePlatform.platform_name = 'Web'
					
					WEBc_sutra_trigger('TRIGGER_progressbar_set',[10,'Importing block types for "' + oldSite.site_name + '". Please wait....'])
					
					//blocks
					var fsOldBlockType = databaseManager.getFoundSet('sutra_cms_v1','web_block_type')
					var fsOldBlockActionWeb = databaseManager.getFoundSet('sutra_cms_v1','web_block_action')
					var fsOldBlockDisplay = databaseManager.getFoundSet('sutra_cms_v1','web_block_display')
					var fsOldBlockActionClient = databaseManager.getFoundSet('sutra_cms_v1','web_block_input')
					var fsOldBlockInput = databaseManager.getFoundSet('sutra_cms_v1','web_block_meta')
					
					fsOldBlockType.find()
					fsOldBlockType.id_site = oldSite.id_site
					var results = fsOldBlockType.search()
					
					if (results) {
						var mod = 5 / fsOldBlockType.getSize()
						
						for (var i = 1; i <= fsOldBlockType.getSize(); i++) {
							WEBc_sutra_trigger('TRIGGER_progressbar_set',[10 + i * mod,'Importing block types for "' + oldSite.site_name + '". Please wait....'])
							
							var oldBlockType = fsOldBlockType.getRecord(i)
							var newBlockType = newSite.web_site_to_block_type.getRecord(newSite.web_site_to_block_type.newRecord(false,true))
							
							databaseManager.copyMatchingColumns(oldBlockType,newBlockType,['organization_id','id_site'])
							
							mapping.blockType[oldBlockType.id_block_type] = newBlockType.id_block_type
							
							//check for content block
							if (newBlockType.form_name == 'WEB_0B_content') {
								newBlockType.form_name = 'WEB_0F__content'
								newBlockType.form_name_display = 'WEB_0F__content_view'
							}
							//check for image block
							else if (newBlockType.form_name == 'WEB_0B_image') {
								newBlockType.form_name = 'WEB_0F__image'
							}
							
							//displays
							fsOldBlockDisplay.find()
							fsOldBlockDisplay.id_block_type = oldBlockType.id_block_type
							var results = fsOldBlockDisplay.search()
							
							if (results) {
								for (var j = 1; j <= fsOldBlockDisplay.getSize(); j++) {
									var oldRecord = fsOldBlockDisplay.getRecord(j)
									var newRecord = newBlockType.web_block_type_to_block_display.getRecord(newBlockType.web_block_type_to_block_display.newRecord(false,true))
									
									databaseManager.copyMatchingColumns(oldRecord,newRecord,['organization_id','id_block_type'])
									
									mapping.blockDisplay[oldRecord.id_block_display] = newRecord.id_block_display
								}
							}
							
							//client actions
							fsOldBlockActionClient.find()
							fsOldBlockActionClient.id_block_type = oldBlockType.id_block_type
							var results = fsOldBlockActionClient.search()
							
							if (results) {
								for (var j = 1; j <= fsOldBlockActionClient.getSize(); j++) {
									var oldRecord = fsOldBlockActionClient.getRecord(j)
									var newRecord = newBlockType.web_block_type_to_block_action_client.getRecord(newBlockType.web_block_type_to_block_action_client.newRecord(false,true))
									
									databaseManager.copyMatchingColumns(oldRecord,newRecord,['organization_id','id_block_type'])
									newRecord.action_type = 'Block'
									
									mapping.blockActionClient[oldRecord.id_block_input] = newRecord.id_block_action_client
								}
							}
							
							//web actions
							fsOldBlockActionWeb.find()
							fsOldBlockActionWeb.id_block_type = oldBlockType.id_block_type
							var results = fsOldBlockActionWeb.search()
							
							if (results) {
								for (var j = 1; j <= fsOldBlockActionWeb.getSize(); j++) {
									var oldRecord = fsOldBlockActionWeb.getRecord(j)
									var newRecord = newBlockType.web_block_type_to_block_action_web.getRecord(newBlockType.web_block_type_to_block_action_web.newRecord(false,true))
									
									databaseManager.copyMatchingColumns(oldRecord,newRecord,['organization_id','id_block_type'])
									
									mapping.blockActionWeb[oldRecord.id_block_action] = newRecord.id_block_action_web
								}
							}
							
							//input columns
							fsOldBlockInput.find()
							fsOldBlockInput.id_block_type = oldBlockType.id_block_type
							var results = fsOldBlockInput.search()
							
							if (results) {
								for (var j = 1; j <= fsOldBlockInput.getSize(); j++) {
									var oldRecord = fsOldBlockInput.getRecord(j)
									var newRecord = newBlockType.web_block_type_to_block_input.getRecord(newBlockType.web_block_type_to_block_input.newRecord(false,true))
									
									databaseManager.copyMatchingColumns(oldRecord,newRecord,['organization_id','id_block_type'])
									
									mapping.blockInput[oldRecord.id_block_meta] = newRecord.id_block_input
								}
							}
						}
					}
					
					//scrapbooks
					var fsOldScrapbook = databaseManager.getFoundSet('sutra_cms_v1','web_scrapbook')
					var fsOldScrapbookData = databaseManager.getFoundSet('sutra_cms_v1','web_scrapbook_data')
					var fsNewBlock = databaseManager.getFoundSet('sutra_cms','web_block')
					
					fsOldScrapbook.find()
					fsOldScrapbook.id_site = oldSite.id_site
					var results = fsOldScrapbook.search()
					
					if (results) {
						var mod = 5 / fsOldScrapbook.getSize()
						
						for (var i = 1; i <= fsOldScrapbook.getSize(); i++) {
							WEBc_sutra_trigger('TRIGGER_progressbar_set',[15 + i * mod,'Importing scrapbooks for "' + oldSite.site_name + '". Please wait....'])
							
							var oldRecord = fsOldScrapbook.getRecord(i)
							var newRecord = fsNewBlock.getRecord(fsNewBlock.newRecord(false,true))
							
							mapping.scrapbook[oldRecord.id_scrapbook] = newRecord.id_block
							
							//scope to site-level
							newRecord.scope_type = 2
							newRecord.id_site = newSite.id_site
							
							//create first block version record
							var blockVersionRec = newRecord.web_block_to_block_version__all.getRecord(newRecord.web_block_to_block_version__all.newRecord(false,true))
							blockVersionRec.flag_active = 1
							blockVersionRec.version_number = 1
							blockVersionRec.version_name = 'Initial version'
							blockVersionRec.id_block_type = getMap(oldRecord.id_block_type,mapping.blockType)
							blockVersionRec.id_block_display = getMap(oldRecord.id_block_display,mapping.blockDisplay)
							
							//input columns
							fsOldScrapbookData.find()
							fsOldScrapbookData.id_scrapbook = oldRecord.id_scrapbook
							var results = fsOldScrapbookData.search()
							
							//create a block data record for each data point
							if (results) {
								for (var j = 1; j <= fsOldScrapbookData.getSize(); j++) {
									var scrapbookData = fsOldScrapbookData.getRecord(j)
									
									var blockDataRec = blockVersionRec.web_block_version_to_block_data.getRecord(blockVersionRec.web_block_version_to_block_data.newRecord(false, true))
									blockDataRec.data_key = scrapbookData.data_key
									blockDataRec.data_value = scrapbookData.data_data
									
									//keep track of blocks created
									allBlocks.push(blockDataRec)
								}
							}
						}
					}
					
					//themes
					var fsOldTheme = databaseManager.getFoundSet('sutra_cms_v1','web_theme')
					var fsOldLayout = databaseManager.getFoundSet('sutra_cms_v1','web_layout')
					var fsOldEditable = databaseManager.getFoundSet('sutra_cms_v1','web_editable')
					var fsOldEditableDefault = databaseManager.getFoundSet('sutra_cms_v1','web_editable_default')
					
					fsOldTheme.find()
					fsOldTheme.id_site = oldSite.id_site
					var results = fsOldTheme.search()
					
					if (results) {
						var mod = 10 / fsOldTheme.getSize()
						
						for (var i = 1; i <= fsOldTheme.getSize(); i++) {
							WEBc_sutra_trigger('TRIGGER_progressbar_set',[20 + i * mod,'Importing themes for "' + oldSite.site_name + '". Please wait....'])
							
							var oldTheme = fsOldTheme.getRecord(i)
							var newTheme = newSite.web_site_to_theme.getRecord(newSite.web_site_to_theme.newRecord(false,true))
							
							databaseManager.copyMatchingColumns(oldTheme,newTheme,['organization_id','id_site'])
							
							mapping.theme[oldTheme.id_theme] = newTheme.id_theme
							
							//punch down default theme to platform record
							if (oldTheme.flag_default) {
								newSitePlatform.id_theme = newTheme.id_theme
							}
							
							//layouts
							fsOldLayout.find()
							fsOldLayout.id_theme = oldTheme.id_theme
							var results = fsOldLayout.search()
							
							if (results) {
								for (var j = 1; j <= fsOldLayout.getSize(); j++) {
									var oldLayout = fsOldLayout.getRecord(j)
									var newLayout = newTheme.web_theme_to_layout.getRecord(newTheme.web_theme_to_layout.newRecord(false,true))
									
									databaseManager.copyMatchingColumns(oldLayout,newLayout,['organization_id','id_theme'])
									
									mapping.themeLayout[oldLayout.id_layout] = newLayout.id_layout
									
									//punch down default layout to platform record
									if (oldTheme.flag_default && oldLayout.flag_default) {
										newSitePlatform.id_layout = newLayout.id_layout
									}
									
									//editables
									fsOldEditable.find()
									fsOldEditable.id_layout = oldLayout.id_layout
									var results = fsOldEditable.search()
									
									if (results) {
										fsOldEditable.sort('row_order asc')
										
										for (var k = 1; k <= fsOldEditable.getSize(); k++) {
											var oldEditable = fsOldEditable.getRecord(k)
											var newEditable = newLayout.web_layout_to_editable.getRecord(newLayout.web_layout_to_editable.newRecord(false,true))
											
											databaseManager.copyMatchingColumns(oldEditable,newEditable,['organization_id','id_layout'])
											
											newEditable.row_order = k
											
											mapping.themeEditable[oldEditable.id_editable] = newEditable.id_editable
											
											//editable defaults
											fsOldEditableDefault.find()
											fsOldEditableDefault.id_editable = oldEditable.id_editable
											var results = fsOldEditableDefault.search()
											
											if (results) {
												for (var h = 1; h <= fsOldEditableDefault.getSize(); h++) {
													var oldRecord = fsOldEditableDefault.getRecord(h)
													var newRecord = newEditable.web_editable_to_editable_default.getRecord(newEditable.web_editable_to_editable_default.newRecord(false,true))
													
													databaseManager.copyMatchingColumns(oldRecord,newRecord,['organization_id','id_editable'])
													
													mapping.themeEditableDefault[oldRecord.id_editable_default] = newRecord.id_editable_default
													
													//fill in appropriate keys
													newRecord.id_block_type = getMap(oldRecord.id_block_type,mapping.blockType)
													newRecord.id_block_display = getMap(oldRecord.id_block_display,mapping.blockDisplay)
													newRecord.id_block = getMap(oldRecord.id_scrapbook,mapping.scrapbook)
												}
											}
										}
									}
								}
							}
						}
					}
					
					//images
					//TODO: create new asset instances for differently sized images used through solution?
					var fsOldImage = databaseManager.getFoundSet('sutra_cms_v1','web_image')
					
					fsOldImage.find()
					fsOldImage.id_site = oldSite.id_site
					var results = fsOldImage.search()
					
					if (results) {
						var mod = 5 / fsOldImage.getSize()
						
						for (var i = 1; i <= fsOldImage.getSize(); i++) {
							WEBc_sutra_trigger('TRIGGER_progressbar_set',[30 + i * mod,'Importing images for "' + oldSite.site_name + '". Please wait....'])
							
							var oldAsset = fsOldImage.getRecord(i)
							var newAsset = newSite.web_site_to_asset.getRecord(newSite.web_site_to_asset.newRecord(false,true))
							
							newAsset.asset_extension = oldAsset.image_extension
							newAsset.asset_file_type = oldAsset.image_type
							newAsset.asset_name = oldAsset.image_title
							newAsset.asset_type = 1	//this is an image
							newAsset.rec_created = oldAsset.rec_created
							newAsset.rec_modified = oldAsset.rec_modified
							newAsset.tags = oldAsset.tags
							newAsset.thumbnail = oldAsset.thumbnail
							
							mapping.image[oldAsset.id_image] = newAsset.id_asset
							
							//try to get the image referenced
							var oldImage = fsOldInstall.directory_mac +
											'/application_server/server/webapps/ROOT/sutraCMS/' + oldAsset.directory + oldAsset.image_title
							
							var jsFile = plugins.file.convertToJSFile(oldImage)
							if (jsFile.exists()) {
								var assetSize = jsFile.size()
							}
							
							//re-scope the directory
							var oldDirectory = 'sites/' + oldSite.directory + '/'
							var newDirectory = oldAsset.directory
							if (newDirectory.indexOf(oldDirectory) >= 0) {
								newDirectory = newDirectory.substr(oldDirectory.length,newDirectory.length - oldDirectory.length - 1)
							}
							
							//asset instance
							var assetInstance = newAsset.web_asset_to_asset_instance.getRecord(newAsset.web_asset_to_asset_instance.newRecord(false,true))
							assetInstance.flag_initial = 1
							assetInstance.rec_created = oldAsset.rec_created
							assetInstance.rec_modified = oldAsset.rec_modified
							assetInstance.asset_title = oldAsset.image_title
							assetInstance.asset_size = assetSize
							assetInstance.asset_directory = newDirectory
							
							//meta records
							var width = assetInstance.web_asset_instance_to_asset_instance_meta.getRecord(assetInstance.web_asset_instance_to_asset_instance_meta.newRecord(false,true))
							width.data_key = 'width'
							width.data_type = 'INTEGER'
							width.data_value = oldAsset.width
							width.rec_created = oldAsset.rec_created
							width.rec_modified = oldAsset.rec_modified
							
							var height = assetInstance.web_asset_instance_to_asset_instance_meta.getRecord(assetInstance.web_asset_instance_to_asset_instance_meta.newRecord(false,true))
							height.data_key = 'height'
							height.data_type = 'INTEGER'
							height.data_value = oldAsset.height
							height.rec_created = oldAsset.rec_created
							height.rec_modified = oldAsset.rec_modified
						}
					}
					
					//pages
					var fsOldPage = databaseManager.getFoundSet('sutra_cms_v1','web_page')
					var fsOldPath = databaseManager.getFoundSet('sutra_cms_v1','web_path')
					var fsOldVersion = databaseManager.getFoundSet('sutra_cms_v1','web_version')
					var fsOldArea = databaseManager.getFoundSet('sutra_cms_v1','web_area')
					var fsOldBlock = databaseManager.getFoundSet('sutra_cms_v1','web_block')
					var fsOldBlockData = databaseManager.getFoundSet('sutra_cms_v1','web_block_data')
					var fsVersion = databaseManager.getFoundSet('sutra_cms','web_version')
					var fsBlock = databaseManager.getFoundSet('sutra_cms','web_block')
					
					fsOldPage.find()
					fsOldPage.id_site = oldSite.id_site
					var results = fsOldPage.search()
					
					if (results) {
						var mod = 40 / fsOldPage.getSize()
						
						for (var i = 1; i <= fsOldPage.getSize(); i++) {
							WEBc_sutra_trigger('TRIGGER_progressbar_set',[35 + i * mod,'Importing pages for "' + oldSite.site_name + '". Please wait....'])
							
							var oldPage = fsOldPage.getRecord(i)
							var newPage = newSite.web_site_to_page.getRecord(newSite.web_site_to_page.newRecord(false,true))
							
							databaseManager.copyMatchingColumns(oldPage,newPage,['organization_id','id_site','parent_id_page'])
							
							mapping.page[oldPage.id_page] = newPage.id_page
							
							//MEMO: if importing into a non-blank sutra_cms connection, this could give duplicate url_params
							newPage.url_param = oldPage.id_page
							newPage.parent_id_page = uuidConvert(oldPage.parent_id_page)
							
							//create platform record (theme and layout)
							var platformRec = newPage.web_page_to_platform.getRecord(newPage.web_page_to_platform.newRecord(false,true))
							platformRec.id_site_platform = newSitePlatform.id_site_platform
							platformRec.id_theme = getMap(oldPage.id_theme,mapping.theme)
							platformRec.id_layout = getMap(oldPage.id_theme_layout,mapping.themeLayout)
							
							//create language record (page name and seo)
							var languageRec = newPage.web_page_to_language.getRecord(newPage.web_page_to_language.newRecord(false,true))
							languageRec.id_site_language = newSiteLanguage.id_site_language
							languageRec.page_name = oldPage.page_name
							
							//create group record (nothing now)
							var groupRec = newPage.web_page_to_group.getRecord(newPage.web_page_to_group.newRecord(false,true))
							groupRec.id_site_group = newSiteGroup.id_site_group
							
							//paths
							fsOldPath.find()
							fsOldPath.id_page = oldPage.id_page
							var results = fsOldPath.search()
							
							if (results) {
								for (var j = 1; j <= fsOldPath.getSize(); j++) {
									var oldRecord = fsOldPath.getRecord(j)
									var newRecord = languageRec.web_language_to_path.getRecord(languageRec.web_language_to_path.newRecord(false,true))
									
									databaseManager.copyMatchingColumns(oldRecord,newRecord,['organization_id','id_site','id_page'])
									
									newRecord.id_site = newSite.id_site
									newRecord.id_page = newPage.id_page
								}
							}
							
							databaseManager.saveData()
							
							//versions
							fsOldVersion.find()
							fsOldVersion.id_page = oldPage.id_page
							var results = fsOldVersion.search()
							
							if (results) {
								fsOldVersion.sort('version_number asc')
								
								for (var j = 1; j <= fsOldVersion.getSize(); j++) {
									var oldVersion = fsOldVersion.getRecord(j)
									var newVersion = fsVersion.getRecord(fsVersion.newRecord(false,true))
									
									databaseManager.copyMatchingColumns(oldVersion,newVersion,['organization_id'])
									
									newVersion.id_platform = platformRec.id_platform
									newVersion.id_language = languageRec.id_language
									newVersion.id_group = groupRec.id_group
									newVersion.flag_lock = (oldVersion.flag_edit) ? 0 : 1
									newVersion.url_param = oldVersion.id_version
									
									//areas
									fsOldArea.find()
									fsOldArea.id_page = oldPage.id_page
									var results = fsOldArea.search()
									
									if (results) {
										fsOldArea.sort('row_order asc')
										
										for (var k = 1; k <= fsOldArea.getSize(); k++) {
											var oldArea = fsOldArea.getRecord(k)
											var newArea = newVersion.web_version_to_area.getRecord(newVersion.web_version_to_area.newRecord(false,true))
											
											databaseManager.copyMatchingColumns(oldArea,newArea,['organization_id','id_version','id_editable'])
											
											newArea.id_editable = getMap(oldArea.id_editable,mapping.themeEditable)
											
											//blocks
											fsOldBlock.find()
											fsOldBlock.id_area = oldArea.id_area
											var results = fsOldBlock.search()
											
											if (results) {
												fsOldBlock.sort('row_order asc')
												
												for (var m = 1; m <= fsOldBlock.getSize(); m++) {
													var oldBlock = fsOldBlock.getRecord(m)
													var newScope = newArea.web_area_to_scope.getRecord(newArea.web_area_to_scope.newRecord(false,true))
													
													databaseManager.copyMatchingColumns(oldBlock,newScope,['organization_id','id_block','id_area'])
													
													//this is a scrapbook
													if (oldBlock.id_scrapbook) {
														newScope.id_block = getMap(oldBlock.id_scrapbook,mapping.scrapbook)
													}
													//one-off block
													else {
														var newBlock = fsBlock.getRecord(fsBlock.newRecord(false,true))
														
														newBlock.rec_created = oldBlock.rec_created
														newBlock.rec_modified = oldBlock.rec_modified														
														
														newScope.id_block = newBlock.id_block
														
														//create first block version record
														var blockVersionRec = newBlock.web_block_to_block_version__all.getRecord(newBlock.web_block_to_block_version__all.newRecord(false,true))
														blockVersionRec.flag_active = 1
														blockVersionRec.version_number = 1
														blockVersionRec.version_name = 'Initial version'
														blockVersionRec.id_block_type = getMap(oldBlock.id_block_type,mapping.blockType)
														blockVersionRec.id_block_display = getMap(oldBlock.id_block_display,mapping.blockDisplay)
														blockVersionRec.rec_created = oldBlock.rec_created
														blockVersionRec.rec_modified = oldBlock.rec_modified
														
														//make sure version has the type/display
														newBlock.id_block_type = getMap(oldBlock.id_block_type,mapping.blockType)
														newBlock.id_block_display = getMap(oldBlock.id_block_display,mapping.blockDisplay)
														
														//block data
														fsOldBlockData.find()
														fsOldBlockData.id_block = oldBlock.id_block
														var results = fsOldBlockData.search()
														
														//create a block data record for each data point
														if (results) {
															for (var n = 1; n <= fsOldBlockData.getSize(); n++) {
																var oldRecord = fsOldBlockData.getRecord(n)
																var newRecord = blockVersionRec.web_block_version_to_block_data.getRecord(blockVersionRec.web_block_version_to_block_data.newRecord(false, true))
																
																newRecord.data_key = oldRecord.data_key
																newRecord.data_value = oldRecord.data_data
																newRecord.rec_created = oldRecord.rec_created
																newRecord.rec_modified = oldRecord.rec_modified
																
																//keep track of blocks created
																allBlocks.push(newRecord)
															}
														}
													}
												}
											}
											databaseManager.saveData()
										}
									}
								}
							}
							
							databaseManager.saveData()
						}
					}
					
					//re-loop through pages and update parent_id_page appropriately
					WEBc_sutra_trigger('TRIGGER_progressbar_set',[80,'Processing pages. Please wait....'])
					for (var i = 1; i <= newSite.web_site_to_page.getSize(); i++) {
						var record = newSite.web_site_to_page.getRecord(i)
						
						record.parent_id_page = getMap(uuidConvert(record.parent_id_page),mapping.page)
					}
					
					//clean up progress indicator
					var mod = Math.ceil(allBlocks.length / 5)
					
					//loop all blocks and replace out image and page references
					for (var i = 0; i < allBlocks.length; i++) {
						if (!(i % 5)) {
							WEBc_sutra_trigger('TRIGGER_progressbar_set',[85 + mod,'Processing blocks. Please wait....'])
						}
						var item = allBlocks[i]
						var markup = item.data_value
						
						//page ids
						while ( utils.stringPosition(markup, "{DS:ID_", 0, 0) >= 0 ) {
							var newMarkup = ''
							
							var pos = utils.stringPosition(markup, "{DS:ID_", 0, 0)
							
							//get out of loop if bad data
							if (markup[pos + 6] == '}') {
								break
							}
							
							newMarkup += utils.stringLeft(markup, pos+6 )
							markup = utils.stringMiddle(markup, pos, 100000)
							var start 	= utils.stringPosition(markup, "_", 0, 0) + 1
							var end		= utils.stringPosition(markup, "}", 0, 0)
							var length	= end - start
							var id		= utils.stringMiddle(markup, start, length)
							markup 		= utils.stringMiddle(markup, end, 100000)
							
							// add markup link
							newMarkup	+= getMap(id,mapping.page)
							
							markup		= newMarkup + markup
						}
						
						
						//image ids
						while ( utils.stringPosition(markup, "{DS:IMG_", 0, 0) >= 0 ) {
							var newMarkup = ''
							
							var pos = utils.stringPosition(markup, "{DS:IMG_", 0, 0)
							
							//get out of loop if bad data
							if (markup[pos + 7] == '}') {
								break
							}
							
							newMarkup += utils.stringLeft(markup, pos+7 )
							markup = utils.stringMiddle(markup, pos, 100000)
							var start 	= utils.stringPosition(markup, "_", 0, 0) + 1
							var end		= utils.stringPosition(markup, "}", 0, 0)
							var length	= end - start
							var id		= utils.stringMiddle(markup, start, length)
							markup 		= utils.stringMiddle(markup, end, 100000)
							
							// add markup link
							newMarkup	+= getMap(id,mapping.image)
							
							markup		= newMarkup + markup
						}
						
						item.data_value = markup
						
						databaseManager.saveData(item)
					}
					
					WEBc_sutra_trigger('TRIGGER_progressbar_set',[100,'Finishing import of "' + oldSite.site_name + '". Please wait....'])
					
					//revisit site (home/error pages)
					newSite.id_page__home = getMap(oldSite.id_page,mapping.page)
					newSite.id_page__error = getMap(oldSite.id_page_error,mapping.page)
					
					var fsPage = databaseManager.getFoundSet('sutra_cms','web_page')
					fsPage.find()
					fsPage.id_page = (newSite.id_page__home) ? newSite.id_page__home.toString() : '^='
					var results = fsPage.search()
					
					if (results) {
						newSite.id_page__home__display = fsPage.page_name
					}
					
					fsPage.find()
					fsPage.id_page = (newSite.id_page__error) ? newSite.id_page__error.toString() : '^='
					var results = fsPage.search()
					
					if (results) {
						newSite.id_page__error__display = fsPage.page_name
					}
					
					databaseManager.saveData()
					forms.WEB_0F_site.controller.loadAllRecords()
					forms.WEB_0F_site.foundset.selectRecord(newSite.id_site)
					WEBc_sutra_trigger('TRIGGER_progressbar_stop')
					
					//enable form if was disabled
					if (nowLocked) {
						WEB_lock_workflow(false)
					}
				}
			}
		}
		//no sites
		else {
			DIALOGS.showErrorDialog(
					'Error',
					'There are no sites to import'
				)
		}
	}
	//no connection
	else {
		DIALOGS.showErrorDialog(
				'Error',
				'You do not have a database connection "sutra_cms_v1" defined.'
			)
	}
}

/**
 * @properties={typeid:24,uuid:"E73C84DA-538D-4E7C-9229-7E550AE96B5A"}
 */
function WEB_browser_forms(beanType) {
	//default to all browser beans if type not specified
	if (!beanType) {
		beanType = 'net.stuff.servoy.browser.beans'
	}
	
	var browserForms = new Array()
	
	//only preload forms when the sutra plugin is available
	if (plugins.sutra && plugins.sutra.getWorkspace && plugins.sutra.getWorkspace()) {
		var workspace = plugins.sutra.getWorkspace().substr(5)
		var modules = plugins.file.getFolderContents(workspace, null, 2)
		
		for (var i = 0; i < modules.length; i++) {
			var module = modules[i]
			
			var theForms = plugins.file.getFolderContents(module.getAbsolutePath() + '/forms', '.frm', 1)
			
			//if this 'module' has forms, proceed
			if (theForms.length) {
				//fill it
				for (var j = 0; j < theForms.length; j++) {
					var thisForm = theForms[j]
					var nameForm = thisForm.getName().substr(0,thisForm.getName().length - 4)
					
					var aboutForm = plugins.file.readTXTFile(thisForm)
					
					if (utils.stringPatternCount(aboutForm,beanType)) {
						browserForms.push(nameForm)
					}
				}
			}
		}
	}
	
	return browserForms
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
 * @properties={typeid:24,uuid:"DB478DF1-A3C2-4D4D-BF6E-7A40B23E4F5D"}
 */
function WEB_block_builder__data_change(oldValue, newValue, event) {
	var location = 'value'
	var formName = event.getFormName()
	var elemName = event.getElementName()
	var colArray = elemName.split('_')
	
	//get rid of 'var_' prefix
	colArray.shift()
	
	//get string that will put us into
	if (colArray.length > 1) {
		var point = colArray.pop()
		location += '.' + colArray.join('.')
	}
	else {
		var point = colArray[0]
	}
	
	//change this data point
	var value = JSON.parse(forms[formName].column_value)
	eval(location)[point] = newValue
	forms[formName].column_value = JSON.stringify(value,null,'\t')
}

/**
 * @param {JSRecord<db:/sutra_cms/web_site>} siteRec
 * @properties={typeid:24,uuid:"51E6CE76-C75F-49AC-90B4-831ABDDEFA32"}
 * @AllowToRunInFind
 */
function WEB_convert__category(siteRec) {
	var input = globals.DIALOGS.showQuestionDialog('Upgrade blocks?', 'Upgrade selected site\'s blocks?', 'Yes', 'No')

	if (input == 'Yes') {
		var updated = 0
		if (utils.hasRecords(siteRec, 'web_site_to_block_type')) {
			for (var i = 1; i <= siteRec.web_site_to_block_type.getSize(); i++) {
				var blockRec = siteRec.web_site_to_block_type.getRecord(i)

				if (typeof blockRec.block_category != 'number') {
					blockRec.block_category = 0
					updated++
					databaseManager.saveData(blockRec)
				}
			}
		}

		globals.DIALOGS.showInfoDialog('Conversion complete', updated + ' blocks categorized')
	}
}

/**
 * Update ordering on scope
 * 
 * @param {JSRecord<db:/sutra_cms/web_site>} siteRec
 * @properties={typeid:24,uuid:"47810354-4E0C-4510-A3B3-85814334239A"}
 * @AllowToRunInFind
 */
function WEB_convert__scope(siteRec) {
	var input = globals.DIALOGS.showQuestionDialog(
			'Upgrade blocks?',
			'Upgrade selected site so scopes can be nested?',
			'Yes',
			'No'
		)
	
	if (input == 'Yes') {
		var updatedAreas = 0
		
		if (utils.hasRecords(siteRec,'web_site_to_page')) {
			for (var i = 1; i <= siteRec.web_site_to_page.getSize(); i++) {
				var pageRec = siteRec.web_site_to_page.getRecord(i)
				
				/** @type {JSFoundSet<db:/sutra_cms/web_version>} */
				var fsVersion = databaseManager.getFoundSet('db:/sutra_cms/web_version')
				fsVersion.find()
				fsVersion.web_version_to_language.id_page = pageRec.id_page
				var results = fsVersion.search()
				
				if (results) {
					for (var j = 1; j <= fsVersion.getSize(); j++) {
						var versionRec = fsVersion.getRecord(j)
						
						for (var k = 1; k <= versionRec.web_version_to_area.getSize(); k++) {
							var areaRec = versionRec.web_version_to_area.getRecord(k)
							updatedAreas++
							
							forms.WEB_0F_page__design_1F_version_2L_scope.SCOPE_sort(areaRec.id_area)
						}
					}
				}
				
				databaseManager.saveData()
			}
		}
		
		globals.DIALOGS.showInfoDialog(
				'Conversion complete',
				updatedAreas + ' areas updated'
			)
	}
}

/**
 * Create sample data records for CMS
 * 
 * @param {JSRecord} [org] The organization under which all records are created
 * 
 * @properties={typeid:24,uuid:"5AAEC756-B282-4733-BFBB-3971B2D369A6"}
 */
function WEB_sample_site(org) {
	//a specific organization requested
	if (org && org.id_organization != AC_current_organization) {
		var diffOrg = true
		var oldOrg = AC_current_organization
		AC_current_organization = org.id_organization
	}
	
	//companies
	/** @type {JSFoundSet<db:/sutra_example/companies>} */
	var fsCompany = databaseManager.getFoundSet('sutra_example','companies')
	
	
	var newCompany = fsCompany.getRecord(fsCompany.newRecord(false,true))
	newCompany.company_category = 'Retail'
	newCompany.company_description = 'Rentfield is a company that rents equipment online.'
	newCompany.company_email = 'sales@rentfield.com'
	newCompany.company_industry = 'Rental Equipment'
	newCompany.company_name = 'Rentfield Enterprises'
//	newCompany.company_notes = 
	newCompany.company_type_id = 1
	newCompany.company_url = 'http://www.rentfield.com'
	newCompany.is_active = 1
		
		//addressess
		var newAddress1 = newCompany.crm_companies_to_addresses.getRecord(newCompany.crm_companies_to_addresses.newRecord(false,true))
		newAddress1.address_type_id = 3
		newAddress1.city = 'Somewhere'
		newAddress1.country = 'US'
//		newAddress1.county = 
//		newAddress1.email = 
//		newAddress1.fax = 
//		newAddress1.is_active = 
		newAddress1.line_1 = '516 Andover Street'
		newAddress1.line_2 = 'Suite 265'
//		newAddress1.line_3 = 
//		newAddress1.line_4 = 
//		newAddress1.line_5 = 
//		newAddress1.phone = 
//		newAddress1.phone_format = 
		newAddress1.select_address = '516 Andover Street - Somewhere, ME 10056'
		newAddress1.state = 'ME'
		newAddress1.zipcode = '10056'
			
		//contacts
		var newContact1 = newCompany.crm_companies_to_contacts.getRecord(newCompany.crm_companies_to_contacts.newRecord(false,true))
		newContact1.contact_notes = 'Notes on Darryl'
		newContact1.contact_type_id = 9
		newContact1.email = 'darryl.aestover@rentfield.com'
		newContact1.fax_direct = '214-598-8548'
		newContact1.is_active = 1
		newContact1.job_title = 'CEO'
		newContact1.mail_address_id = newAddress1.address_id
		newContact1.mail_use_company = 0
//		newContact1.mail_use_country = 
		newContact1.name_first = 'Darryl'
		newContact1.name_last = 'Notes on Darryl'
		newContact1.name_prefix = 'Mr.'
//		newContact1.name_suffix = 
//		newContact1.phone_cell = 
		newContact1.phone_direct = '214-555-2145'
	
		//orders
		var newOrder = newCompany.crm_companies_to_orders.getRecord(newCompany.crm_companies_to_orders.newRecord(false,true))
		newOrder.amt_discount = 0
		newOrder.amt_shipping = 3.95
		newOrder.amt_tax = 0
		newOrder.bill_address_id = newAddress1.address_id
		newOrder.contact_id = newContact3.contact_id
		newOrder.is_active = 1
//		newOrder.is_paid = 
//		newOrder.notes = 
		newOrder.order_date = new Date()
		newOrder.order_month_year = 2106
		newOrder.order_number = 1002
		newOrder.order_subtotal = 21.95
		newOrder.order_total = 25.95
//		newOrder.paid_date = 
//		newOrder.paid_number = 
//		newOrder.pct_discount = 
//		newOrder.pct_tax = 
//		newOrder.po_number = 
		newOrder.ship_address_id = newAddress1.address_id
//		newOrder.ship_fob = 
		newOrder.ship_via = 'Ground'
		newOrder.terms = 'Due Upon Receipt'
			
			//order items
			var newOrderItem = newOrder.crm_orders_to_order_items.getRecord(newOrder.crm_orders_to_order_items.newRecord(false,true))
			newOrderItem.cost_each = 6.65
			newOrderItem.description = 'Book - "Dynamic Living"'
			newOrderItem.extended_price = 21.95
			newOrderItem.price_each = 21.95
			newOrderItem.product_id = newProduct2.product_id
			newOrderItem.quantity = 1
				
			
	databaseManager.saveData()
	
	//reset global SaaS to original value
	if (diffOrg) {
		AC_current_organization = oldOrg
	}
}
