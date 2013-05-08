/**
 * Constants used in this scope (for code completion, etc)
 * 
 * @properties={typeid:35,uuid:"D46A7551-AA0B-4052-93BD-230E7CBC3555",variableType:-4}
 */
var _constant = {
	/** @type {{iso:String,url:String}} */
	url : {},
	/** @type {{iso:String,content:String}} */
	cache : {}
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
var utils = {
	/**
	 * Get a CMS page's cache attribute data.
	 * @return {_constant.cache[]|{code:String,message:String}}
	 * 
	 * @param {UUID|String|JSRecord<db:/sutra_cms/web_page>} page page to get
	 */
	getCache : function(page) {
		// get page record
		var pageRec = utils.getPageRecord(page)
		
		if ( pageRec.hasOwnProperty && pageRec.hasOwnProperty("code") ) {
			// error: problem with getting page record
			return pageRec
		}
		
		// get attribute record with key = "cache"
		if ( !application.__parent__.utils.hasRecords(pageRec,'web_page_to_attribute__cache')) {
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
//			//platform
//			var fsPlatform = page.web_page_to_site.web_site_to_site_platform
//			for (i = 1; i <= fsPlatform.getSize(); i++) {
//				var sitePlatform = fsPlatform.getRecord(i)
//				if (sitePlatform.flag_default) {
//					break
//				}
//			}
//			
//			//group
//			var fsGroup = page.web_page_to_site.web_site_to_site_group
//			for (i = 1; i <= fsGroup.getSize(); i++) {
//				var siteGroup = fsGroup.getRecord(i)
//				if (siteGroup.flag_default) {
//					break
//				}
//			}
			
			//loop over all languages
			for (i = 1; i <= page.web_page_to_language.getSize(); i++) {
				//language
				var pageLang = page.web_page_to_language.getRecord(i)
				var siteLang = pageLang.web_language_to_site_language.getSelectedRecord()
				
//				//grab active version for this language (default platform/group)
//				/** @type {JSFoundset<db:/sutra_cms/web_version>} */
//				var fsVersion = databaseManager.getFoundSet('db:/sutra_cms/web_version')
//				fsVersion.find()
//				fsVersion.id_language = pageLang.id_language
//				fsVersion.web_version_to_platform.id_site_platform = sitePlatform.id_site_platform
//				fsVersion.web_version_to_group.id_site_group = siteGroup.id_site_group
//				fsVersion.flag_active = 1
//				var results = fsVersion.search()
//				
//				//only use active version
//				if (results == 1) {
//					var pageVersion = fsVersion.getSelectedRecord()
//					
//					//base url for this site (may depend on language, so inside the loop)
//					var siteURL = globals.WEBc_markup_link_base(siteLang)
					
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
//				}
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
		var pageRec = utils.getPageRecord(page)
		
		if ( pageRec.hasOwnProperty && pageRec.hasOwnProperty("code") ) {
			// error: problem with getting page record
			return pageRec
		}
		
		// get URL
		var urls = utils.getURL(pageRec,true)
		
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
	}
}