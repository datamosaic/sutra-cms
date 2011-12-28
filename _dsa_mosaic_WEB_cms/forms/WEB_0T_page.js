/**
 * @properties={typeid:35,uuid:"9369E074-5F4A-46A1-BFA4-741F442248F6"}
 */
var _scopePlatform = null;

/**
 * @properties={typeid:35,uuid:"AD05F666-8B75-40D6-BD00-B381C4C503B4"}
 */
var _scopeGroup = null;

/**
 * @properties={typeid:35,uuid:"3937DFE9-2396-4648-9CFC-22A6D98FC82E"}
 */
var _scopeLanguage = null;

/**
 * @properties={typeid:35,uuid:"D30001EE-2E04-408B-87BA-0DE1CFC32E23",variableType:-4}
 */
var _refresh = false;

/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f66"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"F33F8765-2F83-4103-8FF0-D067E37DC3FD"}
 */
function ACTIONS_list() {
	
	//custom page methods
		//MEMO: the relations below are sorted alphabetically so actions will be sorted that way too
	var pageActions = new Array()
	
	//a site is selected
	if (utils.hasRecords(forms.WEB_0F_site.foundset)) {
		//this site has blocks
		if (utils.hasRecords(forms.WEB_0F_site.web_site_to_block_type)) {
			for (var i = 1; i <= forms.WEB_0F_site.web_site_to_block_type.getSize(); i++) {
				var blockType = forms.WEB_0F_site.web_site_to_block_type.getRecord(i)
				
				//this block has client actions
				if (utils.hasRecords(blockType.web_block_type_to_block_action_client)) {
					for (var j = 1; j <= blockType.web_block_type_to_block_action_client.getSize(); j++) {
						var clientAction = blockType.web_block_type_to_block_action_client.getRecord(j)
						
						//only work with page actions
						if (clientAction.action_type == 'Page') {
							//create popup with action attached
							if (globals.CODE_servoy_object_exists(clientAction.method_name,blockType.form_name)) {
								pageActions.push(plugins.popupmenu.createMenuItem(((blockType.block_name) ? blockType.block_name.toUpperCase() : 'BLOCK') + ': ' + clientAction.input_name, forms[blockType.form_name][clientAction.method_name]))
							}
							//create popup without action attached and disable it
							else {
								pageActions.push(plugins.popupmenu.createMenuItem(((blockType.block_name) ? blockType.block_name.toUpperCase() : 'BLOCK') + ': ' + clientAction.input_name, ACTIONS_list_control))
								pageActions[pageActions.length - 1].setEnabled(false)
							}
						}
					}
				}
			}
		}
	}
	
	//list of actions
	var valueList = [
			'Duplicate record',
			'Refresh theme...',
			'-',
			'Expand nodes',
			'Collapse nodes',
			'-',
			'Scope',
			'-',
			'Delete record',
			'-',
//			'Delete all unnamed pages',
//			'-',
			'Flush client cache'
		]
	
	//get site record for this page; or the record selected on the site form; or blank
	var siteRec = utils.hasRecords(foundset) ? web_page_to_site.getSelectedRecord() : (utils.hasRecords(forms.WEB_0F_site.foundset) ? forms.WEB_0F_site.foundset.getSelectedRecord() : null)
	
	if (siteRec) {
		//loop over all platforms
		var platforms = new Array()
		for (var i = 1; i <= siteRec.web_site_to_site_platform.getSize(); i++) {
			var record = siteRec.web_site_to_site_platform.getRecord(i)
			
			//selected platform
			if (record.id_site_platform.toString() == _scopePlatform) {
				platforms.push(plugins.popupmenu.createCheckboxMenuItem(record.platform_name + "", ACTIONS_list_control))
				platforms[platforms.length - 1].setMethodArguments(6,'Platform',null)
				platforms[platforms.length - 1].setSelected(true)
			}
			//non-selected platform
			else {
				platforms.push(plugins.popupmenu.createMenuItem(record.platform_name + "", ACTIONS_list_control))
				platforms[platforms.length - 1].setMethodArguments(6,'Platform',record.id_site_platform.toString())
			}
		}
		
		//loop over all languages
		var languages = new Array()
		for (var i = 1; i <= siteRec.web_site_to_site_language.getSize(); i++) {
			var record = siteRec.web_site_to_site_language.getRecord(i)
			
			//selected language
			if (record.id_site_language.toString() == _scopeLanguage) {
				languages.push(plugins.popupmenu.createCheckboxMenuItem(record.language_name + "", ACTIONS_list_control))
				languages[languages.length - 1].setMethodArguments(6,'Language',null)
				languages[languages.length - 1].setSelected(true)
			}
			//non-selected language
			else {
				languages.push(plugins.popupmenu.createMenuItem(record.language_name + "", ACTIONS_list_control))
				languages[languages.length - 1].setMethodArguments(6,'Language',record.id_site_language.toString())
			}
		}
		
		//loop over all groups
		var groups = new Array()
		for (var i = 1; i <= siteRec.web_site_to_site_group.getSize(); i++) {
			var record = siteRec.web_site_to_site_group.getRecord(i)
			
			//selected group
			if (record.id_site_group.toString() == _scopeGroup) {
				groups.push(plugins.popupmenu.createCheckboxMenuItem(record.group_name + "", ACTIONS_list_control))
				groups[groups.length - 1].setMethodArguments(6,'Group',null)
				groups[groups.length - 1].setSelected(true)
			}
			//non-selected group
			else {
				groups.push(plugins.popupmenu.createMenuItem(record.group_name + "", ACTIONS_list_control))
				groups[groups.length - 1].setMethodArguments(6,'Group',record.id_site_group.toString())
			}
		}
		
		//list of scopes
		var scopes = new Array()
		scopes.push(plugins.popupmenu.createMenuItem('Platform', platforms))
		scopes.push(plugins.popupmenu.createMenuItem('Language', languages))
		scopes.push(plugins.popupmenu.createMenuItem('Group', groups))
	}
	//remove option for scoping
	else {
		var noScope = true
	}
	
	//build menu
	var menu = new Array()
	for ( var i = 0 ; i < valueList.length ; i++ ) {
		menu[i] = plugins.popupmenu.createMenuItem(valueList[i] + "", ACTIONS_list_control)
	}
	
	if (!noScope) {
		menu[6] = plugins.popupmenu.createMenuItem(valueList[6] + "", scopes)
	}
	
	//set menu method arguments
	var x = 0
	while (menu[x]) {
		//pass arguments
		menu[x].setMethodArguments(x)
		
		//disable dividers
		if (valueList[x] == '-' || valueList[x] == '----' ||
			//duplicate not an option until coding finished
			x == 0 ||
			//unauthorized to duplicate
			(x == 0 && !globals.WEBc_sutra_trigger('TRIGGER_registered_action_authenticate',['cms page duplicate'])) ||
			//unauthorized to delete
			((x == 9) && !globals.WEBc_sutra_trigger('TRIGGER_registered_action_authenticate',['cms page delete'])) ||
			//no page records, scoping isn't an option
			noScope && x == 6) {
			
			menu[x].setEnabled(false)
		}
		
		x++
	}
	
	//tack on custom page methods
	if (pageActions.length) {
		//divider
		menu.push(plugins.popupmenu.createMenuItem("-", ACTIONS_list_control))
		menu[menu.length - 1].setEnabled(false)
		
		//submenu with page actions
		menu.push(plugins.popupmenu.createMenuItem("Page actions", pageActions))
	}
	
	//pop up the popup menu
	var elem = elements[application.getMethodTriggerElementName()]
	if (elem != null) {
	    plugins.popupmenu.showPopupMenu(elem, menu)
	}

}

/**
 *
 * @properties={typeid:24,uuid:"C271B727-FA9C-49A1-BBFC-C1EABE4BEB36"}
 */
function ACTIONS_list_control(input,scopeType,scopeValue) {
	
	switch (input) {
		case 0: //duplicate record
			REC_duplicate()
			break
	
		case 1: //refresh theme
			var input = plugins.dialogs.showQuestionDialog(
						'Update theme',
						'Do you want to keep current data or reset to the theme\'s defaults?',
						'Keep data',
						'Reset data'
				)
				
			//update theme (no data deleted)
			if (input == 'Keep data') {
				forms.WEB_0F_page__design_1F_version_2L_area.AREA_add_missing()
			}
			//reset theme (deletes data)
			else if (input == 'Reset data') {
				forms.WEB_0F_page__design_1F_version_2L_area.AREA_reset()
			}
			break
			
		case 3: //toggle open
			TOGGLE_nodes(1)
			break
		
		case 4: //toggle closed
			TOGGLE_nodes(0)
			break
			
		case 6: //scoping
			//set appropriate globals
			switch (scopeType) {
				case 'Platform':
					_scopePlatform = scopeValue
					break
				case 'Language':
					_scopeLanguage = scopeValue
					break
				case 'Group':
					_scopeGroup = scopeValue
					break
			}
			
			//reload the tree
			TREE_refresh()
			
			//highlight correct record (things are firing too frequently here...if i comment out the selection path; 3 less rec_on_selects happen
			application.updateUI()
			elements.bean_tree.selectionPath = FIND_path(forms.WEB_0F_page.foundset.getSelectedRecord())
//			REC_on_select(forms.WEB_0F_page.foundset.getSelectedRecord().id_page.toString())
			
			break
			
		case 8:	//delete record
			REC_delete()
			break	
		
//		case 9: //delete all unnamed
//			//MEMO: this option was put in because blank pages were created when canceling a new page...this bug should be gone
//			var fsPages = forms.WEB_0F_site.web_site_to_page
//			
//			var input = plugins.dialogs.showQuestionDialog(
//						'Delete record?',
//						'Do you want to delete all unnamed records from this site?',
//						'Yes',
//						'No'
//				)
//			
//			if (input == 'Yes') {
//				var flagDidSomething
//				
//				for (var i = 1; i <= fsPages.getSize(); i++) {
//					var record = fsPages.getRecord(i)
//					
//					if (!record.display_page_name) {
//						REC_delete(record)
//						i--
//						flagDidSomething = true
//					}
//				}
//				
//				//reload tree view
//				if (flagDidSomething) {
//					TREE_refresh()
//				}
//			}
//			break
			
		case 10: //flush client cache
			//TODO: a progressbar indicator...better yet, spawn a headless client on the server
			globals.CODE_cursor_busy(true)
			var tables = databaseManager.getTableNames('sutra_cms')
			for (var i = 0; i < tables.length; i++) {
				plugins.rawSQL.flushAllClientsCache('sutra_cms', tables[i])
			}
			globals.CODE_cursor_busy(false)
			break
			
	}
}

/**
 *
 * @properties={typeid:24,uuid:"F7A1A519-2335-4471-8CDF-3BA8F7822C93"}
 */
function FIND_path(input) {
	
	/*
	 *	TITLE    :	FIND_path
	 *			  	
	 *	MODULE   :	wb_WEB_site
	 *			  	
	 *	ABOUT    :	find the full path to a tree node
	 *			  	- useful for selecting a record
	 *			  	
	 *	INPUT    :	a record
	 *			  	
	 *	OUTPUT   :	array of pks (tree down to passed in record)
	 *			  	
	 *	REQUIRES :	
	 *			  	
	 *	USAGE    :	FIND_path()
	 *			  	
	 *	MODIFIED :	August 30, 2009 -- Troy Elliott, Data Mosaic
	 *			  	
	 */
	
	if (input && input.id_page) {
		var thisPage = input
		var treePath = new Array()
		treePath.unshift(thisPage.id_page)
		
		while (utils.hasRecords(thisPage.web_page_to_page__parent)) {
			thisPage = thisPage.web_page_to_page__parent.getRecord(1)
			treePath.unshift(thisPage.id_page)
		}
		
		return treePath
	}


}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"7B82294C-C760-4E00-8CC6-071A0F16138C"}
 */
function FORM_on_load(event) {
	//this will get rid of the connecting lines on windows/linux
//	elements.bean_tree.putClientProperty("JTree.lineStyle", "None")
	
	var beanTree = elements.bean_tree.createBinding(controller.getServerName(),controller.getTableName()) 
	
	//name of field to show in tree
	beanTree.setTextDataprovider('page_name')
	
	// publish flag
	beanTree.setCheckBoxValueDataprovider('flag_publish')
	beanTree.setHasCheckBoxDataprovider('globals.CODE_constant_1')
	beanTree.setMethodToCallOnCheckBoxChange(REC_column_publish,'id_page')
	
	//relation to build tree on
	beanTree.setNRelationName('web_page_to_page__child')
	
	//sorting of children
	beanTree.setChildSortDataprovider('globals.WEB_page_sort')
	
	// Method to trigger when node is selected 
	beanTree.setCallBackInfo(REC_on_select,'id_page') 
	
	//load some data into the tree
	TREE_refresh(true)
	
	//force highlightion of first record unless called from duplicate rec
	if (utils.hasRecords(forms.WEB_0F_page.foundset) && event) {
		elements.bean_tree.selectionPath = FIND_path(forms.WEB_0F_page.foundset.getSelectedRecord())
	}
}

/**
 *
 * @properties={typeid:24,uuid:"A4A59C5A-C5A4-4159-94EB-8E4EEFE67773"}
 */
function FORM_on_show(firstShow,event) {
	//full refresh of bean requested
	if (_refresh) {
		_refresh = false
		TREE_refresh()
		
		//highlight selected record
		if (firstShow) {
			elements.bean_tree.selectionPath = FIND_path(forms.WEB_0F_page.foundset.getSelectedRecord())
		}
	}
	
	//not really form on show, just keeping form on load a bit cleaner
	if (firstShow) {
		// load tooltips from tooltip module
		// globals.WEBc_sutra_trigger('TRIGGER_tooltip_set')
	
		//check if can add record
		elements.btn_new.enabled = globals.WEBc_sutra_trigger('TRIGGER_registered_action_authenticate',['cms page add'])	
		
		//check on reordering
		var reorderOK = globals.WEBc_sutra_trigger('TRIGGER_registered_action_authenticate',['cms page reorder'])	
		elements.btn_in.enabled = reorderOK
		elements.btn_out.enabled = reorderOK
		elements.btn_up.enabled = reorderOK
		elements.btn_down.enabled = reorderOK
	}
	//return to sitemap subsequently
	else {
		//highlight selected record
		elements.bean_tree.selectionPath = FIND_path(forms.WEB_0F_page.foundset.getSelectedRecord())
	}
	
	//set record navigator to blank
	globals.WEBc_sutra_trigger('TRIGGER_toolbar_record_navigator_set',[false])
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"E1532D38-9035-46A2-883B-DE91C0A13BD1"}
 */
function FORM_on_hide(event) {
	//set record navigator to be enabled again
	globals.WEBc_sutra_trigger('TRIGGER_toolbar_record_navigator_set',[true])
}

/**
 *
 * @properties={typeid:24,uuid:"B80D64A8-60DD-49AD-9C6B-D58BB4466C49"}
 */
function MOVE_down() {
	
	MOVE_generic('down')
	
}

/**
 *
 * @properties={typeid:24,uuid:"421A6D06-74E9-413A-96A9-314C87694CAB"}
 */
function MOVE_generic(input) {
	
	/*
	 *	TITLE    :	MOVE_generic
	 *			  	
	 *	MODULE   :	wb_WEB_site
	 *			  	
	 *	ABOUT    :	move an item around
	 *			  	
	 *	INPUT    :	direction
	 *			  	- up, down, in, out
	 *			  	
	 *			  	
	 *	OUTPUT   :	
	 *			  	
	 *	REQUIRES :	
	 *			  	
	 *	USAGE    :	MOVE_generic()
	 *			  	
	 *	MODIFIED :	August 30, 2009 -- Troy Elliott, Data Mosaic
	 *			  	
	 */	//MEMO: within groupings, sort potentially breaks if there are more than 200 records
	//TODO: check and see if move is valid first, before creating the codable foundset
	
	var recMove = forms.WEB_0F_page.foundset.getSelectedRecord()
	
	//find current syblings
	var fsPeers = databaseManager.getFoundSet('sutra_cms','web_page')
	fsPeers.find()
	fsPeers.parent_id_page = (recMove.parent_id_page) ? recMove.parent_id_page : '^='
	fsPeers.id_site = forms.WEB_0F_site.id_site
	var results = fsPeers.search()
	
	if (results) {
		fsPeers.sort('order_by asc')
		fsPeers.selectRecord(recMove.id_page)
	}
	
	switch (input) {
		case 'up':
			//only move up if there are records above selected one
			if (fsPeers.getSelectedIndex() != 1) {
				//flag to redraw tree
				if (recMove.parent_id_page == null) {
					var redraw = true
				}
				
				//flag to select
				var reselect = true			
				
				//get previous record
				var recordPrev = fsPeers.getRecord(fsPeers.getSelectedIndex() - 1)
				
				//swap ordering
				recordPrev.order_by = recMove.order_by
				recMove.order_by --
			}
			else {
				return
			}
			break
		case 'down':
			//only move down if there are records below selected one
			if (fsPeers.getSelectedIndex() != databaseManager.getFoundSetCount(fsPeers)) {
				//flag to redraw tree
				if (recMove.parent_id_page == null) {
					var redraw = true
				}
				
				//flag to select
				var reselect = true
				
				//get next record
				var recordNext = fsPeers.getRecord(fsPeers.getSelectedIndex() + 1)
				
				//swap ordering
				recordNext.order_by = recMove.order_by
				recMove.order_by ++
			}
			else {
				return
			}
			break
		case 'in':
			//only move in if this record isn't the first in the group AND there are syblings
			if (fsPeers.getSelectedIndex() != 1 && fsPeers.getSize() > 1) {
				//flag to redraw tree
				if (recMove.parent_id_page == null) {
					var redraw = true
				}
				
				//flag to select
				var reselect = true
				
				//find new parent
				fsPeers.setSelectedIndex(fsPeers.getSelectedIndex() - 1)
				var idParent = fsPeers.id_page
				
				//find new syblings
				var fsPeersNew = databaseManager.getFoundSet('sutra_cms','web_page')
				fsPeersNew.find()
				fsPeersNew.parent_id_page = (idParent) ? idParent : '^='
				var results = fsPeersNew.search()
		
				if (results) {
					fsPeersNew.sort('order_by asc')
				}
				
				//re-order everybody below current record in old foundset
				for (var i = recMove.order_by + 1; i <= fsPeers.getSize(); i++) {
					var recReorder = fsPeers.getRecord(i)
					
					recReorder.order_by --
				}
				
				//add recMove to bottom of new foundset
				recMove.order_by = (utils.hasRecords(fsPeersNew)) ? fsPeersNew.getSize() + 1 : 1
				recMove.parent_id_page = idParent
				
			}
			else {
				return
			}
			break
		case 'out':
			//only move out if node level not 0
			if (recMove.parent_id_page) {
				//find new parent
				var idParent = recMove.web_page_to_page__parent.parent_id_page
				
				//flag to redraw tree
				if (idParent == null) {
					var redraw = true
				}
				
				//flag to select
				var reselect = true
				
				//find new syblings
				var fsPeersNew = databaseManager.getFoundSet(controller.getServerName(),controller.getTableName())
				fsPeersNew.find()
				fsPeersNew.parent_id_page = (idParent) ? idParent : '^='
				var results = fsPeersNew.search()
		
				if (results) {
					fsPeersNew.sort('order_by asc')
				}
				
				//re-order everybody below current record in old foundset
				for (var i = recMove.order_by + 1; i <= fsPeers.getSize(); i++) {
					var recReorder = fsPeers.getRecord(i)
					
					recReorder.order_by --
				}
				
				//re-order everybody below current record in new foundset
				for (var i = recMove.web_page_to_page__parent.order_by + 1; i <= fsPeersNew.getSize(); i++) {
					var recReorder = fsPeersNew.getRecord(i)
					
					recReorder.order_by ++
				}
				
				//insert recMove directly below former parent in new foundset
				recMove.order_by = recMove.web_page_to_page__parent.order_by + 1
				recMove.parent_id_page = idParent
				
			}
			else {
				return
			}		
			break
	}
	
	databaseManager.saveData()
	
	/*
	//a top level node was touched
	if (redraw) {
		TREE_refresh()
	}
	*/
	//MEMO: as it turns out, when resorting, we need to blow out the whole tree
	TREE_refresh()
	
	//need to reselect
	if (reselect) {
		REC_on_select(recMove.id_page)
		elements.bean_tree.selectionPath = FIND_path(recMove)
	}
}

/**
 *
 * @properties={typeid:24,uuid:"F5CF12AE-C77C-4541-9D4F-713F243AC1AA"}
 */
function MOVE_in() {
	
	MOVE_generic('in')
	
}

/**
 *
 * @properties={typeid:24,uuid:"92F98FEC-9427-49C9-B2CC-6F1A0008B5FF"}
 */
function MOVE_out() {
	
	MOVE_generic('out')
	
}

/**
 *
 * @properties={typeid:24,uuid:"665C4523-737A-42C7-8E1B-01E0C0227453"}
 */
function MOVE_up() {
	
	MOVE_generic('up')
	
}

/**
 *
 * @properties={typeid:24,uuid:"3B580755-B893-42F4-AE94-DF9F21A77783"}
 */
function REC_column_publish(pagePK) {
	var fsPage = databaseManager.getFoundSet('sutra_cms','web_page')
	fsPage.find()
	fsPage.id_page = pagePK
	var results = fsPage.search()
	
	//TODO: what to activate?
//	if (results) {
//		
//		var fsVersions = databaseManager.getFoundSet('sutra_cms','web_version')
//		
//		//get versions records
//		fsVersions.find()
//		fsVersions.id_platform = globals.WEB_page_platform
//		fsVersions.id_language = globals.WEB_page_language
//		fsVersions.id_group = globals.WEB_page_group
//		var results = fsVersions.search(false,true)
//		
//		if (utils.hasRecords(fsVersions)) {
//			if (!skipLoad) {
//				fsVersions.sort('version_number desc')
//			}
//			
//			for (var i = 1; i <= fsVersions.getSize(); i++) {
//				var recVersion = fsVersions.getRecord(i)
//				
//				vlReal.push(recVersion.id_version)
//				
//				var displayVal = ''
//				
//				if (recVersion.flag_active) {
//					displayVal += '<html><body><strong>ACTIVE</strong> '
//					var active = {
//						position: i,
//						record: recVersion
//					}
//				}
//				
//				if (!recVersion.flag_active && i == 1) {
//					displayVal += 'Working copy'
//				}
//				else {
//					displayVal += 'Version ' + recVersion.version_number + ' (' + globals.CODE_date_format(recVersion.rec_modified,'current') + ')'
//					
//					if (recVersion.version_name) {
//						displayVal += ': ' + recVersion.version_name
//					}
//				}	
//				vlDisplay.push(displayVal)
//			}
//		}
//		
//		
//		
//		
//		//if no active version, active working copy
//		for (var i = 1; i <= fsPage.web_page_to_version.getSize(); i++) {
//			var record = fsPage.web_page_to_version.getRecord(i)
//			
//			if (record.flag_active) {
//				var found = true
//			}
//		}
//		
//		//no active found, set working copy to be active
//		if (!found) {
//			var record = fsPage.web_page_to_version.getRecord(1)
//			record.flag_active = 1
//			
//			//re-draw the header area
//			forms.WEB_0F_page__design.SET_globals()
//			forms.WEB_0F_page__design_1F__header_display.FLD_data_change__version_selected()
//		}
//		else {
//			//flag_publish
//		}
//		
//		databaseManager.saveData()
//	}
}

/**
 *
 * @properties={typeid:24,uuid:"952D8326-37DC-44A3-B6E9-F2212C1A87BE"}
 */
function REC_delete(record) {
	
	function getKeys(relation,keyName) {
		var keys = new Array()
		
		for (var i = 1; i <= record[relation].getSize(); i++) {
			keys.push(record[relation].getRecord(i)[keyName])
		}
		
		return keys
	}
	
	if (utils.hasRecords(forms.WEB_0F_page.foundset) || typeof record == 'object') {
		
		if (typeof record == 'object' && record.id_page) {
			var delRec = 'Yes'
			var skipSelect = true
		}
		else {
			var delRec = plugins.dialogs.showWarningDialog(
								'Delete record',
								'Do you really want to delete this record?',
								'Yes',
								'No'
							)
			record = forms.WEB_0F_page.foundset.getSelectedRecord()
		}
		
		if (delRec == 'Yes') {
			
			if (utils.hasRecords(record,'web_page_to_page__child')) {
				var delRec = plugins.dialogs.showWarningDialog(
								'Delete child records',
								'This page has sub-pages. All will be deleted.\nContinue with delete?',
								'Yes',
								'No'
							)
				if (delRec != 'Yes') {
					return
				}
			}
			
			//busy on
			globals.CODE_cursor_busy(true)
			
			//where do we want to end up
			var parentID = record.parent_id_page
			var orderBy = record.order_by
			
			//delete all versions (doing on one of the three should get them all)
			//TODO: this has been removed...there will be workflow to clean up orphaned children
//			var fsVersions = databaseManager.getFoundSet('sutra_cms','web_version')
//			fsVersions.find()
//			fsVersions.id_platform = getKeys('web_page_to_platform','id_platform').join('||')
//			fsVersions.search(false,false)
//			fsVersions.deleteAllRecords()
//			fsVersions.find()
//			fsVersions.id_language = getKeys('web_page_to_language','id_language').join('||')
//			fsVersions.search(false,false)
//			fsVersions.deleteAllRecords()
//			fsVersions.find()
//			fsVersions.id_group = getKeys('web_page_to_platform','id_group').join('||')
//			fsVersions.search(false,false)
//			fsVersions.deleteAllRecords()
			
			//delete it
			record.deleteRecord()
			
			//find current syblings
			var fsPeers = databaseManager.getFoundSet(controller.getServerName(),controller.getTableName())
			fsPeers.find()
			fsPeers.parent_id_page = (parentID) ? parentID : '^='
			fsPeers.id_site = forms.WEB_0F_site.id_site
			var results = fsPeers.search()
			
			if (results) {
				fsPeers.sort('order_by asc')
				
				//re-order everybody below current record in old foundset
				for (var i = orderBy || fsPeers.getSize(); i <= fsPeers.getSize(); i++) {
					var recReorder = fsPeers.getRecord(i)
					
					recReorder.order_by --
				}
				
				//when called from mass-delete, don't update ui
				if (!skipSelect) {
					//go to one above current location
					if (orderBy != 1) {
						forms.WEB_0F_page.foundset.find()
						forms.WEB_0F_page.foundset.parent_id_page = parentID
						forms.WEB_0F_page.foundset.order_by = orderBy - 1
						var results = forms.WEB_0F_page.foundset.search()
					}
					else {
						forms.WEB_0F_page.foundset.find()
						forms.WEB_0F_page.foundset.id_page = parentID
						var results = forms.WEB_0F_page.foundset.search()
					}
					
					//refire rec on select to select this one
					REC_on_select(forms.WEB_0F_page.foundset.id_page)
					elements.bean_tree.selectionPath = FIND_path(forms.WEB_0F_page.foundset.getSelectedRecord())
				}
			}
			//dim out the lights
			else {
				controller.loadAllRecords()
				forms.WEB_0F_page__design_1F__button_tab.TAB_change(null,'tab_b1')
				forms.WEB_0F_page.FORM_on_show()
			}
			
			//busy off
			globals.CODE_cursor_busy(false)
		}
	}
	else {
		plugins.dialogs.showErrorDialog(
						'Error',
						'There are no records to delete'
				)
	}
}

/**
 *
 * @properties={typeid:24,uuid:"5B6856DD-D4F5-441D-AC03-E1847019B19C"}
 */
function REC_duplicate() {
	//TODO: need a better way to check than just by version number
	
	var srcRecord = forms.WEB_0F_page.foundset.getSelectedRecord()
	
	var thisVer = srcRecord.web_page_to_version.version_number
	
	//find current syblings
	var fsPeers = databaseManager.getFoundSet(controller.getServerName(),controller.getTableName())
	fsPeers.find()
	fsPeers.parent_id_page = (srcRecord.parent_id_page) ? srcRecord.parent_id_page : '^='
	var results = fsPeers.search()
	
	if (results) {
		fsPeers.sort('order_by asc')
		fsPeers.selectRecord(srcRecord.id_page)
	}
	
	//re-order everybody below current record in old foundset
	for (var i = srcRecord.order_by + 1; i <= fsPeers.getSize(); i++) {
		var recReorder = fsPeers.getRecord(i)
		
		recReorder.order_by ++
	}
	
	//copy selected version
	var destRecord = globals.CODE_record_duplicate(srcRecord,[
										"web_page_to_version.web_version_to_area.web_area_to_block.web_block_version_to_block_data",
										"web_page_to_attribute"
									])
	
	//delete all versions except selected one
	for (var i = 1; i <= destRecord.web_page_to_version.getSize(); i++) {
		var recVersion = destRecord.web_page_to_version.getRecord(i)
		
		if (recVersion.version_number != thisVer) {
			recVersion.deleteRecord()
			i--
		}
		else {
			thisVersionToDo = recVersion
		}
	}
	
	//clean up data
	destRecord.parent_id_page = srcRecord.parent_id_page
	destRecord.flag_publish = 0
	thisVersionToDo.flag_active = 0
	thisVersionToDo.flag_lock = 0
	thisVersionToDo.version_number = 1
	destRecord.order_by ++
	
	//add a path
	var fsPath = databaseManager.getFoundSet('sutra_cms','web_path')
	var relnPath = 'web_page_to_path'
	var siteID = forms.WEB_0F_site.id_site
	
	if (!utils.hasRecords(destRecord[relnPath])) {
		var pathNameWanted = destRecord.page_name
		pathNameWanted = pathNameWanted.toLowerCase()
		pathNameWanted = utils.stringReplace(pathNameWanted, ' ', '-')
		
		var pathName = pathNameWanted
		var cnt = 1
		var results = null
		
		while (results != 0) {
			fsPath.find()
			fsPath.id_site = siteID
			fsPath.path = pathName
			var results = fsPath.search()
			
			if (results) {
				pathName = pathNameWanted + cnt++
			}
		}
		
		var recPath = destRecord[relnPath].getRecord(destRecord[relnPath].newRecord(false,true))
		recPath.flag_default = 1
		recPath.path = pathName
		recPath.id_site = siteID
		
		databaseManager.saveData()
	}
	
	//rebuild our form
	TREE_refresh()
	
	//set selection path
	elements.bean_tree.selectionPath = FIND_path(destRecord)
}

/**
 * @properties={typeid:24,uuid:"8846804B-4C28-4043-AF36-CEA8DAADD480"}
 */
function REC_new() {
	//MEMO: note that any changes to this method must also happen upstream in the global version
	
	//check if can add record
	if (!globals.WEBc_sutra_trigger('TRIGGER_registered_action_authenticate',['cms page add'])) {
		plugins.dialogs.showErrorDialog(
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
		globals.CODE_cursor_busy(true)
		
		//how is this record getting added
		var webMode = globals.WEB_page_mode == 3
		
		//set flag that a new record getting created
		_addRecord = 1
		
		//get current location in the stack
		if (utils.hasRecords(forms.WEB_0F_page.foundset)) {
			_oldRecord = forms.WEB_0F_page.id_page
		}
		//no records created yet
		else {
			if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow) {
				//turn off disabled screen
				globals.WEB_lock_workflow(false)
				forms.WEB_TB__web_mode.controller.enabled = true
			}
			_oldRecord = null
		}
		
		//save outstanding data and then turn autosave off until we don't get cancelled
		databaseManager.saveData()
		databaseManager.setAutoSave(false)
		
		//where to create new page
		if (webMode) {
			var fsPage = forms.WEB_P_page.foundset
			
			//punch down site default
			forms.WEB_P_page._siteDefaults = siteDefaults
		}
		else {
			var fsPage = forms.WEB_0F_page.foundset
			
			//punch down site default
			forms.WEB_0F_page__design_1F__header_edit._siteDefaults = siteDefaults
		}
		
		//create new page
		var pageRec = fsPage.getRecord(fsPage.newRecord(false,true))
		pageRec.id_site = forms.WEB_0F_site.id_site
		pageRec.flag_publish = siteDefaults.record.flag_auto_publish
		
		//if in browser mode, FiD to define page
		if (webMode) {
			globals.CODE_cursor_busy(false)
			
			//let sleep for a second so doesn't crash
			application.sleep(1000)
			
			application.showFormInDialog(
						forms.WEB_P_page,
						-1,-1,-1,-1,
						' ',
						true,
						false,
						'cmsNewPage'
					)
		}
		//design mode
		else {
			//hide everything except the bare necessities
			forms.WEB_0F_page__design_1F__header_edit.TOGGLE_fields(0)
			
			//show pop-down
			forms.WEB_0F_page__design_1F__header_edit.REC_new()
//			globals.WEB_simple_edit('WEB_0F_page__design_1F__button_tab')
			
			globals.CODE_cursor_busy(false)
		}
	}
	//something wrong at the site level
	else {
		//not all defaults specified
		if (utils.hasRecords(forms.WEB_0F_page.foundset)) {
			plugins.dialogs.showErrorDialog(
							'Error',
							'The defaults are not set correctly for this site'
					)
		}
		//no site record
		else {
			plugins.dialogs.showErrorDialog(
							'Error',
							'You must add a site record first'
					)
		}
	}
}

/**
 *
 * @properties={typeid:24,uuid:"6C822BD6-4F1B-4B48-B0A2-C695A0DDC47B"}
 */
function REC_on_select(selectedRecord) {
	//make record clicked in tree be selected on foundset also
	if (selectedRecord && utils.hasRecords(forms.WEB_0F_page.foundset)) {
		//just select that pk
		forms.WEB_0F_page.foundset.selectRecord(selectedRecord)
	}
	else {
		forms.WEB_0F_page.foundset.loadAllRecords()
	}
	
	if (utils.hasRecords(forms.WEB_0F_page.foundset)) {
		//that record not already loaded, find it
		//TODO: this is where the error is
		if (forms.WEB_0F_page.foundset.getSelectedRecord().id_page != selectedRecord) {
			//foundset not working correctly
			if (forms.WEB_0F_page.foundset.find()) {
				forms.WEB_0F_page.foundset.id_page = selectedRecord
				var results = forms.WEB_0F_page.foundset.search()
			}
			else {
			//	application.output('ID ' + selectedRecord + ' not selected correctly')
			}
		}
	}
}

/**
 *
 * @properties={typeid:24,uuid:"78161277-FD3E-478D-8B5F-396BAB04ADF2"}
 */
function TOGGLE_nodes() {

	TREE_refresh()
	
	switch(arguments[0]) {
		case 1:
			//set expansion level open
			elements.bean_tree.setNodeLevelVisible(10,true)
			break
		
		case 0:
		default:
			//set expansion level closed
			elements.bean_tree.setNodeLevelVisible(1,false)
			break
	}

}

/**
 * @properties={typeid:35,uuid:"87F7463B-C4D2-4335-90C8-3D90D8A7607D",variableType:4}
 */
var _addRecord = null;

/**
 * @properties={typeid:35,uuid:"47BDFB27-EBF0-4C38-B435-7289D1C2CDEE",variableType:-4}
 */
var _oldRecord = null;

/**
 *
 * @properties={typeid:24,uuid:"DAE442BF-2FB3-4EA6-A964-E71EC173A19F"}
 */
function SET_page(pageID) {
	var fsPage = databaseManager.getFoundSet(controller.getServerName(),"web_page")
	fsPage.find()
	fsPage.url_param = pageID
	var results = fsPage.search()
	
	//called from headless client in browser bean
	if (results) {
		elements.bean_tree.selectionPath = FIND_path(fsPage.getRecord(1))
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"00D5F9DC-EFC1-45AD-8AB1-D7574EB41971"}
 */
function TABS_list(input) {
	//should just call this method, but need to do something different when chosen
//	globals.WEBc_sutra_trigger('TRIGGER_ul_tab_list',[event])
	
	function somethingDifferent() {
		//if ul tab chosen, load all records and select the chosen one
		if (globals.NAV_universal_selected_tab != 'WEB_0T_page') {
			globals.CODE_cursor_busy(true)
			
//			var fsPage = forms[forms[globals.NAV_universal_selected_tab].elements.tab_ul.getTabFormNameAt(forms[globals.NAV_universal_selected_tab].elements.tab_ul.tabIndex)].foundset
			var fsPage = databaseManager.getFoundSet('sutra_cms','web_page')
			var selected = forms.WEB_0F_page.foundset.getSelectedRecord()
			
			fsPage.find()
			fsPage.id_site = globals.WEB_site_find_restrict()
			var results = fsPage.search()
			
			//something was found, try to select this record
			if (results) {
				while (fsPage.getSelectedRecord().id_page != selected.id_page) {
					fsPage.selectRecord(selected.id_page)
				}
				
				//finding done on separate foundset and then reloaded in to eliminate screen flicker
					//MEMO: this is probably slower than with flicker
				forms.WEB_0F_page.foundset.loadRecords(fsPage)
			}
			
			globals.CODE_cursor_busy(false)
		}
	}
	
	//only run if meta-objects defined
	if (application.__parent__.navigationPrefs && application.__parent__.solutionPrefs) {
		//grab the actions to this
		var valueList = new Array()
		var formNames = new Array()
		for (var i = 0; i < navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID].universalList.buttons.tabs.length ; i++) {
			var actionItem = navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID].universalList.buttons.tabs[i]
			valueList.push(actionItem.menuName)
			formNames.push(actionItem.formToLoad)
		}
		
		//tack on the selected UL to the top of the pop-down
		valueList.unshift(navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID].universalList.displays[navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID].universalList.displays.displayPosn].listTitle || navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID].navigationItem.fwListTitle)
		formNames.unshift((navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID].listData.withButtons) ? 'NAV_T_universal_list' : 'NAV_T_universal_list__no_buttons')
		
		//called to depress menu
		if (input instanceof JSEvent) {
			var popForm = input.getFormName()
			var popElem = input.getElementName()
			
			//only show pop-up if there are enabled values
			if (valueList.length > 1) {
				
				//build menu, load tabs, and set menu method arguments
				var menu = new Array()
				for ( var i = 0 ; i < valueList.length ; i++ ) {
				    //set check on universal list
					if (formNames[i] == forms.DATASUTRA_0F_solution.elements.tab_content_B.getTabFormNameAt(forms.DATASUTRA_0F_solution.elements.tab_content_B.tabIndex)) {
						menu[i] = plugins.popupmenu.createCheckboxMenuItem(valueList[i] + "", TABS_list)
						menu[i].setSelected(true)
					}
					else {
						menu[i] = plugins.popupmenu.createMenuItem(valueList[i] + "", TABS_list)
					}
					
					//pass form name as parameter if that form is currently included
					if (forms[formNames[i]]) {
						menu[i].setMethodArguments(formNames[i],valueList[i])
					}
					else {
						menu[i].setEnabled(false)
					}
					
					//disable dividers
					if (valueList[i] == '-') {
						menu[i].setEnabled(false)
					}
				}
				
				//are we using a second element to get pop up to align correctly
				var btnInvisible = popElem + "_down"
				
				//push menu down to the header line
				if (forms[popForm].elements[btnInvisible]) {
					var elem = forms[popForm].elements[btnInvisible]
					
					var currentLocationX = elem.getLocationX()
					var currentLocationY = elem.getLocationY()
					
					elem.setLocation(currentLocationX, currentLocationY + 3)
				}
				else {
					var elem = forms[popForm].elements[popElem]
				}
				
				//popup menu
				if (elem != null) {
				    plugins.popupmenu.showPopupMenu(elem, menu)
				}
				
				//set invisible btn back to original location
				if (forms[popForm].elements[btnInvisible]) {
					elem.setLocation(currentLocationX, currentLocationY)
				}
			}
		}
		//menu shown and item chosen
		else {
			var formName = arguments[0]
			var itemName = arguments[1]
			var tabSelected = arguments[2]
			var baseForm = solutionPrefs.config.formNameBase
			var prefName = 'Custom tab ' + solutionPrefs.config.currentFormID + ': ' + formName
			
			if (forms[formName]) {
				//set global that end users use in their code
				globals.NAV_universal_selected_tab = formName
				
				//if not loaded, add tab
				if (formName != 'DATASUTRA_0F_solution__blank_2' && !navigationPrefs.byNavSetName.configPanes.itemsByName[prefName]) {
					
					//assign to list tab panel
					forms[baseForm].elements.tab_content_B.addTab(forms[formName],'',null,null,null,null)
					forms[baseForm].elements.tab_content_B.tabIndex = forms[baseForm].elements.tab_content_B.getMaxTabIndex()
					
					//save status info
					navigationPrefs.byNavSetName.configPanes.itemsByName[prefName] = new Object()
					navigationPrefs.byNavSetName.configPanes.itemsByName[prefName].listData = {
												tabNumber : forms[baseForm].elements.tab_content_B.tabIndex,
												dateAdded : application.getServerTimeStamp()
										}
					
				}
				//blank form, set to blank tab
				else if (formName == 'DATASUTRA_0F_solution__blank_2') {
					forms[baseForm].elements.tab_content_B.tabIndex = 1
				}
				//set tab to this preference
				else {
					forms[baseForm].elements.tab_content_B.tabIndex = navigationPrefs.byNavSetName.configPanes.itemsByName[prefName].listData.tabNumber
				}
				
				//using a custom tab, note which one it is
				if (tabSelected >= 0) {
					navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID].universalList.buttons.tabs.tabPosn = tabSelected
				}
				//using default list (UL or other)
				else if (navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID].universalList.buttons.tabs) {
					delete navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID].universalList.buttons.tabs.tabPosn
				}
				
				//LOG ul tab change
				globals.WEBc_sutra_trigger('TRIGGER_log_create',[
											'UL Tabs',
											itemName,
											formName
										])
				
				somethingDifferent()
			}
		}
	}
}

/**
 * @properties={typeid:24,uuid:"FF2A28E9-E80B-4ECE-B76D-34E9765F7640"}
 */
function TREE_refresh(firstLoad) {
	//disable record selection of page
	if (firstLoad) {
		forms.WEB_0F_page__design._skipSelect = true
	}
	
	//remove all roots from tree
	elements.bean_tree.removeAllRoots()
	
	//select the root nodes (the nodes without a parent) 
	if (forms.WEB_0F_page.foundset.find()) { 
		// search for null values 
		forms.WEB_0F_page.foundset.parent_id_page = '^='
		forms.WEB_0F_page.foundset.id_site = forms.WEB_0F_site.id_site
		if (_scopePlatform) {
			forms.WEB_0F_page.web_page_to_platform.id_site_platform = _scopePlatform
		}
		if (_scopeLanguage) {
			forms.WEB_0F_page.web_page_to_language.id_site_language = _scopeLanguage
		}
		if (_scopeGroup) {
			forms.WEB_0F_page.web_page_to_group.id_site_group = _scopeGroup
		}
		var results = forms.WEB_0F_page.foundset.search()
		
		//manage the sort of the top-level nodes
		if (results) {
			forms.WEB_0F_page.foundset.sort('order_by asc')
		}
		
		//load the foundset into the treeview 
		elements.bean_tree.addRoots(forms.WEB_0F_page.foundset)
	}
	
	//enable record selection of page
	if (firstLoad) {
		forms.WEB_0F_page__design._skipSelect = false
	}
}
