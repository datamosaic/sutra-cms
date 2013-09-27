/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6A2C10CE-B496-416F-8CC6-B72C725A2C91"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"2D662C1B-C059-40EA-9A90-63866E81FCDE",variableType:4}
 */
var _pageOnly = null;

/**
 * Return <select> with valid language options
 * 
 * @param {scopes.CMS._constant.objData} obj Data object passed to all markup methods
 * 
 * @return {String} markup for this block
 * 
 * @properties={typeid:24,uuid:"EC903152-AFA9-4E19-A516-0ABE95C673C6"}
 * @AllowToRunInFind
 */
function VIEW_default(obj) {
	/** @type {JSFoundSet<db:/sutra_cms/web_version>} */
	var fsVersion = databaseManager.getFoundSet('db:/sutra_cms/web_version')
	
	var markup = '<form name="pageLanguage"><select name="langSwitcher" title="View page in different language" onChange="window.document.location.href=this.options[this.selectedIndex].value;" value="GO">'
	
	//do we want only active page languages?
	if (obj.block_configure.pageOnly) {
		databaseManager.refreshRecordFromDatabase(obj.page.record.web_page_to_language,-1)
		
		obj.page.record.web_page_to_language.sort('web_language_to_site_language.language_name asc')
		
		for (var i = 1; i <= obj.page.record.web_page_to_language.getSize(); i++) {
			var record = obj.page.record.web_page_to_language.getRecord(i)
			
			fsVersion.find()
			fsVersion.id_language = record.id_language
			fsVersion.id_group = obj.group.record.id_group
			fsVersion.id_platform = obj.platform.record.id_platform
			fsVersion.flag_active = 1
			if (fsVersion.search()) {
				var tokenID = obj.page.record.id_page.toString() + '_' + record.id_language.toString()
				markup += '<option value="{DS:ID_' + tokenID + '}"' + (record.id_language == obj.language.record.id_language ? ' selected="selected"' : '') +'>' + record.web_language_to_site_language.language_name + '</option>'
			}
		}
	}
	//get all languages for this site
	else {
		obj.site.record.web_site_to_site_language.sort('language_name asc')
		for (i = 1; i <= obj.site.record.web_site_to_site_language.getSize(); i++) {
			record = obj.site.record.web_site_to_site_language.getRecord(i)
			
			tokenID = obj.page.record.id_page.toString() + '__' + record.id_site_language.toString()
			markup += '<option value="{DS:ID_' + tokenID + '}"' + (record.id_site_language == obj.language.record.id_site_language ? ' selected="selected"' : '') +'>' + record.language_name + '</option>'
		}
	}
	
	markup += '</select></form>'
	
	//combobox
	return markup
}

/**
 * Return <ul> with valid language options.  First option is selected language
 * 
 * @param {scopes.CMS._constant.objData} obj Data object passed to all markup methods
 * 
 * @return {String} markup for this block
 * 
 * @properties={typeid:24,uuid:"F4958932-EA27-43DB-A61D-206766B9EFB1"}
 * @AllowToRunInFind
 */
function VIEW_ul(obj) {
	/** @type {JSFoundSet<db:/sutra_cms/web_version>} */
	var fsVersion = databaseManager.getFoundSet('db:/sutra_cms/web_version')
	
	var lang = new Array()
	
	//do we want only active page languages?
	if (obj.block_configure.pageOnly) {
		databaseManager.refreshRecordFromDatabase(obj.page.record.web_page_to_language,-1)
		
		obj.page.record.web_page_to_language.sort('web_language_to_site_language.language_name asc')
		
		for (var i = 1; i <= obj.page.record.web_page_to_language.getSize(); i++) {
			var record = obj.page.record.web_page_to_language.getRecord(i)
			
			fsVersion.find()
			fsVersion.id_language = record.id_language
			fsVersion.id_group = obj.group.record.id_group
			fsVersion.id_platform = obj.platform.record.id_platform
			fsVersion.flag_active = 1
			if (fsVersion.search()) {
				var tokenID = obj.page.record.id_page.toString() + '_' + record.id_language.toString()
				var link = '<li><a href="{DS:ID_' + tokenID + '}" title="' + record.web_language_to_site_language.language_name + '" class="' + record.web_language_to_site_language.language_code +'">' + record.web_language_to_site_language.language_name + '</a></li>'
				
				//selected language must be first
				if (record.id_language == obj.language.record.id_language) {
					lang.unshift(link)
				}
				//go in alphabetical
				else {
					lang.push(link)
				}
			}
		}
	}
	//get all languages for this site
	else {
		obj.site.record.web_site_to_site_language.sort('language_name asc')
		for (i = 1; i <= obj.site.record.web_site_to_site_language.getSize(); i++) {
			record = obj.site.record.web_site_to_site_language.getRecord(i)
			
			tokenID = obj.page.record.id_page.toString() + '__' + record.id_site_language.toString()
			link = '<li><a href="{DS:ID_' + tokenID + '}" title="' + record.language_name + '" class="' + record.language_code +'">' + record.language_name + '</a></li>'
			
			//selected language must be first
			if (record.id_site_language == obj.language.record.id_site_language) {
				lang.unshift(link)
			}
			//go in alphabetical
			else {
				lang.push(link)
			}
		}
	}
	
	//attach to our markup
	var markup = '<ul class="langSwitcher">'
	lang.forEach(function(item) {markup += item})
	markup += '</ul>'
	
	//combobox
	return markup
}

/**
 * Build a data object that defines this block. Called when creating a new block.
 * Used to create all meta data associated with this block (register a block in the CMS)
 * 
 * @returns {scopes.CMS._constant.blockInit} Data object that is used to register a block
 * 
 * @author &copy; Data Mosaic
 * 
 * @properties={typeid:24,uuid:"B391EEC2-C5CB-403A-A070-C665453E3DA3"}
 */
function INIT_block() {
	
	// main data object to build
	/** @type {scopes.CMS._constant.blockInit} */
	var block = {}
	
	// block record data
	block.record = {
	        block_name			: 'Language switcher',
			block_description	: 'Combobox to switch between different languages available',
			block_category		: scopes.CMS._constant.blockCategory.CONTENT,
			block_type			: scopes.CMS._constant.blockType.DESIGNTIME,
			form_name			: controller.getName()
		}
	
	// block views
	block.views = globals.CMS.ui.getMethods(controller.getName(), "VIEW")
	
	// block client actions - Block
	block.clientActionsBlock = globals.CMS.ui.getMethods(controller.getName(), "BLOCK")
	
	// block client actions - Page
	block.clientActionsPage = globals.CMS.ui.getMethods(controller.getName(), "PAGE")
	
	// block web actions
	block.webActions = globals.CMS.ui.getMethods(controller.getName(), "WEB")
	
	// block data points
	block.data = {
		
	}
	
	// block configure data points
	block.blockConfigure = {
		pageOnly : 'INTEGER'
	}
	
	// block response data points
	block.blockResponse = {
		
	}
	
	return block
	
}

/**
 * @properties={typeid:24,uuid:"D4FEE69A-3F8C-4A57-B861-CFDD9844D458"}
 */
function BLOCK_save() {
	// your code goes here
}

/**
 * @properties={typeid:24,uuid:"32D756CC-69C2-43B3-AA76-31CB5DC6A899"}
 */
function BLOCK_cancel() {
	// your code goes here
}

/**
 * Update display as needed when block selected.
 *
 * @properties={typeid:24,uuid:"4FFC6F25-6A20-4BF1-8FF5-3307946D2B32"}
 */
function INIT_data() {
	//save down form variables so records can be changed
	_pageOnly = globals.CMS.ui.getConfig(controller.getName()).pageOnly
}
