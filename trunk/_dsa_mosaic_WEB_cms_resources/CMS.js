/**
 * Sutra CMS Configuration
 * 
 * @properties={typeid:35,uuid:"0016790E-70BB-4B13-B6FE-39E641E98126",variableType:-4}
 */
var init = new function() {
	/**
	 * App name
	 * @return {String}
	 */
	this.name = new function() {
		return 'Sutra CMS'
	}
		
	/**
	 * App description
	 * return {String}
	 */
	this.description = new function() {
		return 'Sutra CMS is full featured CMS with SaaS, multi-site, blogging, versioning, content per groups, login, image management, tight integration with Servoy\'s web client, and all kinds of other good stuff baked into the core feature set.'
	}
		
	/**
	 * App unique identifier
	 * return {UUID}
	 */
	this.uuid = new function() {
		return application.getUUID('0016790E-70BB-4B13-B6FE-39E641E98120')
	}
	
	//setup
		//navset, valuelists, messages, actions
	
	/**
	 * Registry actions for app
	 * 
	 * @return {Object[]}
	 */
	this.items =  new function() {
		return [
			{name: 'Block version editable', registry: 'cms edit block version', description: 'Allow scrapbook versions to be re-opened for editing', uuid: '0016790E-70BB-4B13-B6FE-39E641E98121'},
			{name: 'Page version editable', registry: 'cms edit version', description: 'Allow versions to be re-opened for editing', uuid: '0016790E-70BB-4B13-B6FE-39E641E98122'},
			{name: 'Add a new page', registry: 'cms page add', description: 'Allow a new page to be created', uuid: '0016790E-70BB-4B13-B6FE-39E641E98123'},
			{name: 'Delete selected page', registry: 'cms page delete', description: 'Allow the selected page to be deleted', uuid: '0016790E-70BB-4B13-B6FE-39E641E98124'},
			{name: 'Create duplicate of selected page', registry: 'cms page duplicate', description: 'Allow duplication of selected page', uuid: '0016790E-70BB-4B13-B6FE-39E641E98125'},
			{name: 'Page setup: Real mode v. GUI', registry: 'cms page mode toggle', description: 'Allow viewing the selected page as it will appear on the web', uuid: '0016790E-70BB-4B13-B6FE-39E641E98126'},
			{name: 'Reorder pages within a site', registry: 'cms page reorder', description: 'Allow the positionment of pages within a site to be changed', uuid: '0016790E-70BB-4B13-B6FE-39E641E98127'},
			{name: 'Only show full-screen page', registry: 'cms page sitemap', description: 'Show sitemap only when needed', uuid: '0016790E-70BB-4B13-B6FE-39E641E98128'},
			{name: 'Update all pages', registry: 'cms site page update', description: 'Add missing areas to all pages in a site. Useful for when a major template change occurs.', uuid: '0016790E-70BB-4B13-B6FE-39E641E98129'},
			{name: 'Refresh all theme pages', registry: 'cms theme layout page update', description: 'Update all pages using a theme', uuid: '0016790E-70BB-4B13-B6FE-39E641E9812A'}
		]
	}
}

/**
 * Constants used in this scope (for code completion, etc)
 * 
 * @properties={typeid:35,uuid:"D46A7551-AA0B-4052-93BD-230E7CBC3555",variableType:-4}
 */
var _constant = {
	/** @type {{iso:String,url:String}} */
	url : {},
	/** @type {{iso:String,content:String}} */
	cache : {},
	/** 
	 * globals.CMS.data object that is passed around in the building of blocks to display on a page.
	 * @type {{
	 * site : {[record] : JSRecord<db:/sutra_cms/web_site>, [path]: String, [id]: UUID, [name]: String, [tracking]: String},
	 * page : {[record] : JSRecord<db:/sutra_cms/web_page>, [id]: UUID, [name]: String, [parent]: String, [attribute]: Object},
	 * platform : {[record] : JSRecord<db:/sutra_cms/web_platform>, [id]: UUID},
	 * language : {[record] : JSRecord<db:/sutra_cms/web_language>, [id]: UUID},
	 * group : {[record] : JSRecord<db:/sutra_cms/web_group>, [id]: UUID},
	 * version : {[record] : JSRecord<db:/sutra_cms/web_version>, [id]: UUID},
	 * home : {[record] : JSRecord<db:/sutra_cms/web_page>},
	 * theme : {[directory]: String, [markup]: {link: String}},
	 * area : {[record] : JSRecord<db:/sutra_cms/web_area>, [id]: UUID, [name]: String},
	 * block: {[record] : JSRecord<db:/sutra_cms/web_block>, [id]: UUID, [version]: JSRecord<db:/sutra_cms/web_block_version>},
	 * block_data: Object,
	 * block_configure: Object,
	 * block_response: {[UUID]: UUID},
	 * form: {[get]: Object, [post]: Object, [validate]: {[error]: Number}, [multipart]: {[field]: Object, [file]: Object}},
	 * request: {[record]: javax.servlet.http.httpservletrequest, [server]: String, [URI]: String, [query]: String},
	 * session_server: {[record]: JSRecord<db:/sutra_cms/web_session>},
	 * session_web: {[record]: javax.servlet.http.httpsession},
	 * cookies: javax.servlet.http.Cookie[],
	 * response: {[record]: javax.servlet.http.httpservletresponse|org.tuckey.web.filters.urlrewrite},
	 * app: {[record]: javax.servlet.http.ServletContext},
	 * error: {[code]: String, [message]: String},
	 * cmsVersion: String,
	 * [type]: String
	 * }}
	 */
	objData : {},
	/** Block categories */
	blockCategory : {
		/** 
		 * Constant for block category <strong>content</strong> 
		 * @protected 
		 * @type {Number}
		 */
		CONTENT:0,
		/** 
		 * Constant for block category <strong>collection</strong> 
		 * @protected 
		 * @type {Number}
		 */
		COLLECTION:1,
		/** 
		 * Constant for block category <strong>layout</strong> 
		 * @protected 
		 * @type {Number}
		 */
		LAYOUT:2,
		/** 
		 * Constant for block category <strong>app</strong> 
		 * @protected 
		 * @type {Number}
		 */
		APP:3
	},
	/** Block types */
	blockType : {
		/** 
		 * Constant for block type <strong>Design time</strong> 
		 * @protected 
		 * @type {Number}
		 */
		DESIGNTIME:0,
		/** 
		 * Constant for block type <strong>Block builder</strong> 
		 * @protected 
		 * @type {Number}
		 */
		BLOCKBUILDER:1,
		/** 
		 * Constant for block type <strong>Form builder</strong> 
		 * @protected 
		 * @type {Number}
		 */
		FORMBUILDER:2
	},
	/** @type 
	 * {{record: {block_name: String, [block_description]: String, [block_category]: Number, [block_type]: Number, form_name: String, [form_name_display]: String},
	 * views: Object, [defaultView]: String, clientActionsBlock: Object, clientActionsPage: Object, webActions: Object, data: Object, [blockConfigure]: Object, [blockResponse]: Object}}
	 */
	blockInit: {}
}

/**
 * Error object template
 * @type {{code:String,message:String}}
 * 
 * @protected 
 * @properties={typeid:35,uuid:"DBE7242D-E0BA-4D80-A66B-F47C0D7E02BD",variableType:-4}
 */
var _error = {
		code : null, 
		message : null,
		/** 
		 * Reset error object to default state
		 * 
		 * @param {String} [code] Error code
		 * @param {String} [message] Error message
		 */ 
		set : function(code, message) {
			//grab default values
			/** @type {{code:String,message:String}} */
			var defaultError = {code: null, message: null}
				//should be the following, but functions in params mess up the eval
//				eval(solutionModel.getGlobalVariable('CMS','_error').defaultValue)
			
			//set values of error code
			_error.code = code || defaultError.code
			_error.message = message || defaultError.message
		}
	}

/**
 * Utilities node for all things CMS.
 * 
 * @properties={typeid:35,uuid:"0B1825E6-59F2-4139-98C1-1F4A306BAA7B",variableType:-4}
 */
var util = {
	/**
	 * Get a CMS page's cache attribute data.
	 * @return {_constant.cache[]|{code:String,message:String}}
	 * 
	 * @param {UUID|String|JSRecord<db:/sutra_cms/web_page>} page page to get
	 */
	getCache : function(page) {
		// get page record
		var pageRec = util.getPageRecord(page)
		
		if ( pageRec.hasOwnProperty && pageRec.hasOwnProperty("code") ) {
			// error: problem with getting page record
			return pageRec
		}
		
		// get attribute record with key = "cache"
		if ( !utils.hasRecords(pageRec,'web_page_to_attribute__cache')) {
			// error: attribute with key of "cache" doesn't exist for this page
			_error.set("412","Cache does not exist for requested page")
			return _error
		}
		
		// return cache
		/** @type {_constant.cache[]} */
		var stored = JSON.parse(pageRec.web_page_to_attribute__cache.attribute_value)
		return stored
		
	},
	
	/**
	 * Get all resolving URLs for a page.
 	 * @return {_constant.url[]|{code:String,message:String}}
	 * 	
	 * @param {JSRecord<db:/sutra_cms/web_page>} page page to get
	 * @param {Boolean} [cache=false] Get page URLs for caching
	 */
	getURL : function(page,cache) {
		//TODO: lots of commented out code will allow for group/platform to be specified down the line
		var langURLs = new Array()
		var i
		
		if (page) {
	
			//loop over all languages
			for (i = 1; i <= page.web_page_to_language.getSize(); i++) {
				//language
				var pageLang = page.web_page_to_language.getRecord(i)
				var siteLang = pageLang.web_language_to_site_language.getSelectedRecord()
				
				/** @type {{iso: String, url: String}} */
				var urlLang = {
					iso: siteLang.language_code
				}
				
				//want to send through cache
				if (cache) {
					urlLang.url = globals.WEBc_markup_link_page(page.id_page.toString() + '_' + pageLang.id_language.toString(),null,'Cache')
				}
				//grab pretty/folder/index version of url
				else {
					urlLang.url = globals.WEBc_markup_link_page(page.id_page.toString() + '_' + pageLang.id_language.toString())
				}
				
				langURLs.push(urlLang)

			}
		}
		
		return langURLs
	},
	
	/**
	 * Get page record
 	 * @return {JSRecord<db:/sutra_cms/web_page>|{code:String,message:String}}
	 * 	
	 * @param {UUID|String|JSRecord<db:/sutra_cms/web_page>} page page to get	
	 */
	getPageRecord : function(page) {
		// error setup
		var isString 	= (typeof page == "string")
		var isUUID		= (page instanceof UUID)
		var isRecord	= (page instanceof JSRecord && page.foundset.getDataSource() == 'db:/sutra_cms/web_page')
		
		// init pageRec
		var pageRec
		
		if ( isString || isUUID || isRecord  ) {
			if ( isRecord ) {
				pageRec = page
			}
			else {
				// find page record
				/** @type {JSFoundSet<db:/sutra_cms/web_page>} */
				var pageFS = databaseManager.getFoundSet('db:/sutra_cms/web_page')
				pageFS.find()
				pageFS.id_page = page
				var count = pageFS.search()
				if (count == 1) {
					pageRec = pageFS.getSelectedRecord()
				}
				else {
					// error: page record not found
					_error.set("404","Not found")
					return _error
				}
			}
		}
		else {
			// error: bad input
			_error.set("400","Bad request")
			return _error
		}
		return pageRec
	},
	
	/**
	 * Run a CMS page and save results in the page's cache attribute.
 	 * @return {Boolean|{code:String,message:String}}
	 * 	
	 * @param {UUID|String|JSRecord<db:/sutra_cms/web_page>} page page to get	
	 */
	setCache : function(page) {
		var pageRec = util.getPageRecord(page)
		
		if ( pageRec.hasOwnProperty && pageRec.hasOwnProperty("code") ) {
			// error: problem with getting page record
			return pageRec
		}
		
		// get URL
		var urls = util.getURL(pageRec,true)
		
		if ( urls.hasOwnProperty && urls.hasOwnProperty("code") ) {
			// error: no urls
			return urls
		}
			
		// store pageData for each page language
		var store = new Object()
		for (var i = 0; i < urls.length; i++) {
			// get page data
			try {
				var pageData = plugins.http.getPageData(urls[i].url)
				
				//don't store page data if inactive
				if (pageData != 'No active version') {
					store[urls[i].iso] = pageData
				}
			} catch (e) {
				// error: something happened grabbing page
				_error.set("303","Problem with http page request")
				return _error
			}	
		}
		
		// get cache attribute record, create if needed
		var cacheRec
		if ( pageRec.web_page_to_attribute__cache.getSize() == 0 ) {
			cacheRec = pageRec.web_page_to_attribute__cache.getRecord(pageRec.web_page_to_attribute__cache.newRecord())
		}
		else {
			cacheRec = pageRec.web_page_to_attribute__cache.getSelectedRecord()
		}
		
		cacheRec.attribute_value = JSON.stringify(store)
		databaseManager.saveData(cacheRec)
		
		return true
	},
	
	/**
	 * Form used to display tree (different for smart/web client)
	 * 
	 * @return {String} Form name of the tree view
	 */
	getTreeForm : function() {
		return solutionPrefs.config.webClient ? 'WEB_0T_page__web' : 'WEB_0T_page'
	},
	
	/**
	 * @param {String} category Which hooks to run
	 * @param {JSRecord<db:/sutra_cms/web_site>} [siteRec]
	 * 
	 * @properties={typeid:24,uuid:"ECDE620A-1A34-4DAC-A312-24003A9D0600"}
	 */
	runHook : function(category,siteRec) {
		//something to run
		if (category) {
			//no site record passed in, get from context
			if (!(siteRec instanceof JSRecord)) {
				siteRec = forms.WEB_0F_site.foundset.getSelectedRecord()
			}
			
			if (utils.hasRecords(siteRec,'web_site_to_site_hook')) {
				siteRec.web_site_to_site_hook.sort('order_by asc')
				
				//loop over all site hooks
				for (var i = 1; i <= siteRec.web_site_to_site_hook.getSize(); i++) {
					var record = siteRec.web_site_to_site_hook.getRecord(i)
					
					//is correct type of hook and exists, run
					if (record.hook_category == category && globals.CODE_servoy_object_exists(record.hook_method,record.hook_form)) {
						if (record.hook_form) {
							forms[record.hook_form][record.hook_method](record.hook_argument)
						}
						else {
							globals[record.hook_method](record.hook_argument)
						}
					}
				}
			}
		}
	}
}