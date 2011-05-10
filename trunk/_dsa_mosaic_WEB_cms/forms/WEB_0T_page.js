/**
 * @properties={typeid:35,uuid:"D30001EE-2E04-408B-87BA-0DE1CFC32E23",variableType:4}
 */
var _refresh = null;

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
function ACTIONS_list()
{

/*
 *	TITLE    :	ACTIONS_list
 *			  	
 *	MODULE   :	wb_WEB_site
 *			  	
 *	ABOUT    :	manage web page actions
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	
 *			  	
 *	MODIFIED :	August 30, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */

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
						pageActions.push(plugins.popupmenu.createMenuItem(((blockType.block_name) ? blockType.block_name.toUpperCase() : 'BLOCK') + ': ' + clientAction.input_name, forms[blockType.form_name][clientAction.method_name]))
						
						//disable if that method or form isn't available
						if (!forms[blockType.form_name] || !forms[blockType.form_name][clientAction.method_name]) {
							pageActions[pageActions.length - 1].setEnabled(false)
						}
					}
				}
			}
		}
	}
}

	
//get menu list from a value list
var valueList = [
		'Duplicate record',
		'Update theme',
		'-',
		'Toggle open',
		'Toggle closed',
		'-',
		'Delete record',
		'-',
		'Delete all unnamed pages'
	]

//build menu
var menu = new Array
for ( var i = 0 ; i < valueList.length ; i++ ) {
	menu[i] = plugins.popupmenu.createMenuItem(valueList[i] + "", ACTIONS_list_control)
}

//set menu method arguments
var x = 0
while (menu[x]) {
	//pass arguments
	menu[x].setMethodArguments(x)
	
	//disable dividers
	if (valueList[x] == '-' || valueList[x] == '----' ||
		(x == 0 && !globals.TRIGGER_registered_action_authenticate('cms page duplicate')) ||
		((x == 5 || x == 7) && !globals.TRIGGER_registered_action_authenticate('cms page delete')) ) {
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
function ACTIONS_list_control()
{

/*
 *	TITLE    :	ACTIONS_list_control
 *			  	
 *	MODULE   :	wb_WEB_site
 *			  	
 *	ABOUT    :	manage web page actions
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	
 *			  	
 *	MODIFIED :	August 30, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */

switch (arguments[0]) {
	case 0: //duplicate record
		REC_duplicate()
		break

	case 1: //update theme
		forms.WEB_0F_page__design__content_1L_area.AREA_add_missing()
		break
		
	case 3: //toggle open
		TOGGLE_nodes(1)
		break
	
	case 4: //toggle closed
		TOGGLE_nodes(0)
		break
	
	case 6:	//delete record
		REC_delete()
		break	
	
	case 8: //delete all unnamed
		var fsPages = forms.WEB_0F_site.web_site_to_page
		
		var input = plugins.dialogs.showQuestionDialog(
					'Delete record?',
					'Do you want to delete all unnamed records from this site?',
					'Yes',
					'No'
			)
		
		if (input == 'Yes') {
			var flagDidSomething
			
			for (var i = 1; i <= fsPages.getSize(); i++) {
				var record = fsPages.getRecord(i)
				
				if (!record.page_name) {
					REC_delete(record)
					i--
					flagDidSomething = true
				}
			}
			
			//reload tree view
			if (flagDidSomething) {
				FORM_on_load(true)
			}
		}
		break
}
}

/**
 *
 * @properties={typeid:24,uuid:"F7A1A519-2335-4471-8CDF-3BA8F7822C93"}
 */
function FIND_path(input)
{

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
	//remove all existing bindings, if not called the first time
	//if (!event) {
	if (elements && elements.bean_tree) {
		elements.bean_tree.removeAllRoots()
	}
	
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
	
	//select the root nodes (the nodes without a parent) 
	if (foundset.find()) { 
		// search for null values 
		foundset.parent_id_page = '^='
		foundset.id_site = forms.WEB_0F_site.id_site
		var results = foundset.search()
		
		//manage the sort of the top-level nodes
		if (results) {
			foundset.sort('order_by asc')
		}
		
		//load the foundset into the treeview 
		elements.bean_tree.addRoots(foundset)
	} 
	
	//force highlightion of first record unless called from duplicate rec
	if (utils.hasRecords(foundset) && event) {
		elements.bean_tree.selectionPath = FIND_path(foundset.getRecord(1))
	}
}

/**
 *
 * @properties={typeid:24,uuid:"A4A59C5A-C5A4-4159-94EB-8E4EEFE67773"}
 */
function FORM_on_show(firstShow,event) {
	//not really form on show, just keeping form on load a bit cleaner
	if (firstShow) {
		// load tooltips from tooltip module
		// globals.TRIGGER_set_tooltips()
	
		//check if can add record
		elements.btn_new.enabled = globals.TRIGGER_registered_action_authenticate('cms page add')	
		
		//check on reordering
		var reorderOK = globals.TRIGGER_registered_action_authenticate('cms page reorder')	
		elements.btn_in.enabled = reorderOK
		elements.btn_out.enabled = reorderOK
		elements.btn_up.enabled = reorderOK
		elements.btn_down.enabled = reorderOK
	}
	//return to sitemap subsequently
	else {
		//full refresh of bean requested
		if (_refresh) {
			_refresh = null
			FORM_on_load()
		}
		//highlight selected record
		else {
			elements.bean_tree.selectionPath = FIND_path(forms.WEB_0F_page.foundset.getSelectedRecord())
		}
	}
	
	//set record navigator to blank
	globals.TRIGGER_toolbar_record_navigator_set(false)
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
	globals.TRIGGER_toolbar_record_navigator_set(true)
}

/**
 *
 * @properties={typeid:24,uuid:"B80D64A8-60DD-49AD-9C6B-D58BB4466C49"}
 */
function MOVE_down()
{

/*
 *	TITLE    :	MOVE_down
 *			  	
 *	MODULE   :	wb_WEB_site
 *			  	
 *	ABOUT    :	re order selected item
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	MOVE_down()
 *			  	
 *	MODIFIED :	August 30, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */

MOVE_generic('down')


}

/**
 *
 * @properties={typeid:24,uuid:"421A6D06-74E9-413A-96A9-314C87694CAB"}
 */
function MOVE_generic()
{

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

var input = arguments[0]

var recMove = foundset.getRecord(foundset.getSelectedIndex())

//find current syblings
var fsPeers = databaseManager.getFoundSet(controller.getServerName(),controller.getTableName())
fsPeers.find()
fsPeers.parent_id_page = recMove.parent_id_page
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
			if (recMove.parent_id_page == 0) {
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
			if (recMove.parent_id_page == 0) {
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
			if (recMove.parent_id_page == 0) {
				var redraw = true
			}
			
			//flag to select
			var reselect = true
			
			//find new parent
			fsPeers.setSelectedIndex(fsPeers.getSelectedIndex() - 1)
			var idParent = fsPeers.id_page
			
			//find new syblings
			var fsPeersNew = databaseManager.getFoundSet(controller.getServerName(),controller.getTableName())
			fsPeersNew.find()
			fsPeersNew.parent_id_page = idParent
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
		if (recMove.parent_id_page != 0) {
			//find new parent
			var idParent = recMove['web_page_to_page__parent'].parent_id_page
			
			//flag to redraw tree
			if (idParent == 0) {
				var redraw = true
			}
			
			//flag to select
			var reselect = true
			
			//find new syblings
			var fsPeersNew = databaseManager.getFoundSet(controller.getServerName(),controller.getTableName())
			fsPeersNew.find()
			fsPeersNew.parent_id_page = idParent
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
			for (var i = recMove['web_page_to_page__parent'].order_by + 1; i <= fsPeersNew.getSize(); i++) {
				var recReorder = fsPeersNew.getRecord(i)
				
				recReorder.order_by ++
			}
			
			//insert recMove directly below former parent in new foundset
			recMove.order_by = recMove['web_page_to_page__parent'].order_by + 1
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
	FORM_on_load()
}
*/
//MEMO: as it turns out, when resorting, we need to blow out the whole tree
FORM_on_load()


//need to reselect
if (reselect) {
//	elements.bean_tree.setExpandNode([recMove.parent_id_page],true)
	elements.bean_tree.selectionPath = FIND_path(recMove)
}


}

/**
 *
 * @properties={typeid:24,uuid:"F5CF12AE-C77C-4541-9D4F-713F243AC1AA"}
 */
function MOVE_in()
{

/*
 *	TITLE    :	MOVE_in
 *			  	
 *	MODULE   :	wb_WEB_site
 *			  	
 *	ABOUT    :	re order selected item
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	MOVE_in()
 *			  	
 *	MODIFIED :	August 30, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */

MOVE_generic('in')


}

/**
 *
 * @properties={typeid:24,uuid:"92F98FEC-9427-49C9-B2CC-6F1A0008B5FF"}
 */
function MOVE_out()
{

/*
 *	TITLE    :	MOVE_out
 *			  	
 *	MODULE   :	wb_WEB_site
 *			  	
 *	ABOUT    :	re order selected item
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	MOVE_out()
 *			  	
 *	MODIFIED :	August 30, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */

MOVE_generic('out')


}

/**
 *
 * @properties={typeid:24,uuid:"665C4523-737A-42C7-8E1B-01E0C0227453"}
 */
function MOVE_up()
{

/*
 *	TITLE    :	MOVE_up
 *			  	
 *	MODULE   :	wb_WEB_site
 *			  	
 *	ABOUT    :	re order selected item
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	MOVE_up()
 *			  	
 *	MODIFIED :	August 30, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */

MOVE_generic('up')


}

/**
 *
 * @properties={typeid:24,uuid:"3B580755-B893-42F4-AE94-DF9F21A77783"}
 */
function REC_column_publish(pagePK)
{
	var fsPage = databaseManager.getFoundSet('sutra_cms','web_page')
	fsPage.find()
	fsPage.id_page = pagePK
	var results = fsPage.search()
	
	if (results) {
		//if no active snapshot, active working copy
		for (var i = 1; i <= fsPage.web_page_to_version.getSize(); i++) {
			var record = fsPage.web_page_to_version.getRecord(i)
			
			if (record.flag_active) {
				var found = true
			}
		}
		
		//no active found, set working copy to be active
		if (!found) {
			var record = fsPage.web_page_to_version.getRecord(1)
			record.flag_active = 1
			
			//re-draw the header area
			forms.WEB_0F_page__design.SET_globals()
			forms.WEB_0F_page__design__header_display.FLD_data_change__version_selected()
		}
		else {
			//flag_publish
		}
		
		databaseManager.saveData()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"952D8326-37DC-44A3-B6E9-F2212C1A87BE"}
 */
function REC_delete(record)
{

/*
 *	TITLE    :	REC_delete
 *			  	
 *	MODULE   :	wb_WEB_site
 *			  	
 *	ABOUT    :	delete record
 *			  	
 *	INPUT    :	(both optional)
 *			  	1- record to delete
 *			  	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	REC_delete()
 *			  	
 *	MODIFIED :	August 30, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */

if (utils.hasRecords(foundset) || typeof record == 'object') {
	
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
		record = foundset.getRecord(foundset.getSelectedIndex())
	}
	
	if (delRec == 'Yes') {
		//busy on
		globals.CODE_cursor_busy(true)
		
		//where do we want to end up
		var parentID = record.parent_id_page
		var orderBy = record.order_by
		
		//delete it
		record.deleteRecord()
		
		//find current syblings
		var fsPeers = databaseManager.getFoundSet(controller.getServerName(),controller.getTableName())
		fsPeers.find()
		fsPeers.parent_id_page = parentID
		fsPeers.id_site = forms.WEB_0F_site.id_site
		var results = fsPeers.search()
		
		if (results) {
			fsPeers.sort('order_by asc')
			
			//re-order everybody below current record in old foundset
			for (var i = orderBy; i <= fsPeers.getSize(); i++) {
				var recReorder = fsPeers.getRecord(i)
				
				recReorder.order_by --
			}
			
			//when called from mass-delete, don't update ui
			if (!skipSelect) {
				//go to one above current location
				if (orderBy != 1) {
					foundset.find()
					foundset.parent_id_page = parentID
					foundset.order_by = orderBy - 1
					var results = foundset.search()
				}
				else {
					foundset.find()
					foundset.id_page = parentID
					var results = foundset.search()
				}
				
				//refire rec on select to select this one
				REC_on_select(foundset.id_page)
				elements.bean_tree.selectionPath = FIND_path(foundset.getRecord(foundset.getSelectedIndex()))
			}
		}
		//dim out the lights
		else {
			controller.loadAllRecords()
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
function REC_duplicate()
{

/*
 *	TITLE    :	REC_duplicate
 *			  	
 *	MODULE   :	wb_WEB_site
 *			  	
 *	ABOUT    :	delete record
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	REC_duplicate()
 *			  	
 *	MODIFIED :	August 30, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */	//TODO: need a better way to check than just by version number

var srcRecord = foundset.getRecord(foundset.getSelectedIndex())

var thisVer = srcRecord.web_page_to_version.version_number

//find current syblings
var fsPeers = databaseManager.getFoundSet(controller.getServerName(),controller.getTableName())
fsPeers.find()
fsPeers.parent_id_page = srcRecord.parent_id_page
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
									"web_page_to_version.web_version_to_area.web_area_to_block.web_block_to_block_data",
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
thisVersionToDo.flag_edit = 1
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
FORM_on_load()

//set selection path
elements.bean_tree.selectionPath = FIND_path(destRecord)


}

/**
 * @properties={typeid:35,uuid:"87F7463B-C4D2-4335-90C8-3D90D8A7607D",variableType:4}
 */
var _addRecord = null;

/**
 * @properties={typeid:24,uuid:"8846804B-4C28-4043-AF36-CEA8DAADD480"}
 */
function REC_new() {
	//MEMO: note that any changes to this method must also happen upstream in the global version
	
	//check if can add record
	if (!globals.TRIGGER_registered_action_authenticate('cms page add')) {
		plugins.dialogs.showErrorDialog(
						'Error',
						'You are not authorized to add new pages'
				)
		return
	}
	
	if (utils.hasRecords(forms.WEB_0F_site.foundset)) {
		//how is this record getting added
		var webMode = forms.WEB_0F_page.TRIGGER_mode_set() == 'BROWSER'
		
		//set flag that a new record getting created
		_addRecord = 1
		
		//get current location in the stack
		if (utils.hasRecords(foundset)) {
			
			var oldRecord = foundset.getRecord(foundset.getSelectedIndex())
			
			//find current syblings
			var fsPeers = databaseManager.getFoundSet(controller.getServerName(),controller.getTableName())
			fsPeers.find()
			fsPeers.parent_id_page = oldRecord.parent_id_page
			fsPeers.id_site = oldRecord.id_site
			var results = fsPeers.search()
			
			if (results) {
				fsPeers.sort('order_by asc')
				fsPeers.selectRecord(oldRecord.id_page)
			}
			
			//turn off autosave
				//TODO: some kind of an error here
			//databaseManager.setAutoSave(false)
			
			//re-order everybody below current record in old foundset
			for (var i = oldRecord.order_by + 1; i <= fsPeers.getSize(); i++) {
				var recReorder = fsPeers.getRecord(i)
				
				recReorder.order_by ++
			}
			
			//non-top level record
			if (oldRecord.parent_id_page) {
				var newRecord = foundset.getRecord(foundset.newRecord(false,true))
				
				newRecord.parent_id_page = oldRecord.parent_id_page
				newRecord.order_by = oldRecord.order_by + 1
				newRecord.id_site = oldRecord.id_site		
			}
			//top level record
			else {
				var newRecord = foundset.getRecord(foundset.newRecord(false,true))
				
				newRecord.order_by = oldRecord.order_by + 1
				newRecord.id_site = oldRecord.id_site
				
				FORM_on_load()
			}
		}
		//no records created yet
		else {
			var newRecord = foundset.getRecord(foundset.newRecord(false,true))
			
			newRecord.order_by = 1
			newRecord.id_site = forms.WEB_0F_site.id_site
			
			if (application.__parent__.solutionPrefs && solutionPrefs.design.statusLockWorkflow) {
				globals.WEB_lock_workflow(false)
			}
			
			FORM_on_load()
		}
		
		//create one version
		var oneVersion = newRecord.web_page_to_version.getRecord(newRecord.web_page_to_version.newRecord(false,true))
		oneVersion.version_number = 1
		
		//update valuelists
		forms.WEB_0F_page__design.REC_on_select()
		
		databaseManager.saveData()
		
		var pageID = newRecord.id_page
		elements.bean_tree.refresh()
		REC_on_select(pageID)
		elements.bean_tree.selectionPath = FIND_path(newRecord)
		
		//fill in defaults
		if (utils.hasRecords(newRecord.web_page_to_site.web_site_to_theme__default)) {
			//set theme
			newRecord.id_theme = newRecord.web_page_to_site.web_site_to_theme__default.id_theme
			
			//set layout
			if (utils.hasRecords(newRecord.web_page_to_site.web_site_to_theme__default.web_theme_to_layout__default)) {
				newRecord.id_theme_layout = newRecord.web_page_to_site.web_site_to_theme__default.web_theme_to_layout__default.id_layout
			}
			
			//set flag that theme has been set and all areas should be blown in
			if (webMode) {
				forms.WEB_P_page._themeSet = 1
			}
			else {
				forms.WEB_0F_page__design__header_edit._themeSet = 1
			}
		}
		
		//if in browser mode, FiD to define page
		if (webMode) {
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
		//design mode, show pop-down
		else {
			globals.WEB_simple_edit('WEB_0F_page__design__button_tab')
		}
	}
	else {
		plugins.dialogs.showErrorDialog(
						'Error',
						'You must add a site record first'
				)
	}
}

/**
 *
 * @properties={typeid:24,uuid:"6C822BD6-4F1B-4B48-B0A2-C695A0DDC47B"}
 */
function REC_on_select()
{

//record clicked
var selectedRecord = arguments[0]

//make record clicked in tree be selected on foundset also
if (selectedRecord && utils.hasRecords(foundset)) {
	//just select that pk
	foundset.selectRecord(selectedRecord)
}
else {
	foundset.loadAllRecords()
}

//that record not already loaded, find it
//TODO: this is where the error is
if (foundset.getSelectedRecord().id_page != selectedRecord) {
	//foundset not working correctly
	if (foundset.find()) {
		foundset.id_page = selectedRecord
		var results = foundset.search()
	}
	else {
	//	application.output('ID ' + selectedRecord + ' not selected correctly')
	}
}
}

/**
 *
 * @properties={typeid:24,uuid:"58BFEA50-4193-4A12-BF5D-774EBD93BE45"}
 */
function TEST_on_click()
{


var input = arguments[0]

application.setStatusText('Fired by: '+application.getMethodTriggerElementName() + ' PK: ' + input)
}

/**
 *
 * @properties={typeid:24,uuid:"78161277-FD3E-478D-8B5F-396BAB04ADF2"}
 */
function TOGGLE_nodes()
{

FORM_on_load()

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
 *
 * @properties={typeid:24,uuid:"DAE442BF-2FB3-4EA6-A964-E71EC173A19F"}
 */
function SET_page(pageID) {
	var fsPage = databaseManager.getFoundSet(controller.getServerName(),"web_page")
	fsPage.find()
	fsPage.id_page = pageID
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
function TABS_list(event) {
	globals.TRIGGER_ul_tab_list(event)
}
