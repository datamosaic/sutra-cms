
/**
 * Match attribute key of "cache". Used in left side of relations.
 * @type {String}
 *
 * @protected 
 * @properties={typeid:35,uuid:"F1EB3EF6-6AA3-4D87-9EE3-5F714A25F285"}
 */
var _cache = "cache"

/**
 * Error object template
 * 
 * @protected 
 * @properties={typeid:35,uuid:"DBE7242D-E0BA-4D80-A66B-F47C0D7E02BD",variableType:-4}
 */
var _error = { code : null, message : null }

/**
 * @properties={typeid:35,uuid:"0B1825E6-59F2-4139-98C1-1F4A306BAA7B",variableType:-4}
 */
var utils = {
	
	/**
	 * Get a CMS page's cache attribute data.
	 * @returns {Object|{code:String,message:String}}
	 * 	
	 * @param {UUID|String|JSRecord<db:/sutra_cms/web_page>} page page to get
	 */
	getCache : function(page) {
		
		// get page record
		var pageRec = scopes.CMS.utils.getPageRecord(page)
		
		if ( "error" instanceof pageRec ) {
			// error: problem with getting page record
			return pageRec
		}
		
		// get attribute record with key = "cache"
		if ( pageRec.web_page_to_attribute__cache.getSize() == 0 ) {
			// error: attribute with key of "cache" doesn't exist for this page
			_error.code		= "412"
			_error.message	= "Precondition Failed"
			return _error
		}
		
		// return cache
		/** {{iso:String,content:String}} */
		var stored = JSON.parse(pageRec.web_page_to_attribute__cache.attribute_value)
		return stored
		
	},
	/**
	 * Get all resolving URLs for a page.
 	 * @returns {object[]|{code:String,message:String}}
	 * 	
	 * @param {JSRecord<db:/sutra_cms/web_page>} page page to get	
	 */
	getURL : function(page) {
		
		// 1. get page record
		// 2. get page paths
		// 3. get urls somehow from record and paths and whatever else
		
		return [{ iso: "en", url: "http://www.google.com"}]

	},
	/**
	 * Get page record
 	 * @returns {JSRecord<db:/sutra_cms/web_page>|{code:String,message:String}}
	 * 	
	 * @param {UUID|String|JSRecord<db:/sutra_cms/web_page>} page page to get	
	 */
	getPageRecord : function(page) {

		// error setup
		var isString 	= (typeof page == "string")
		var isUUID		= (!isString && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(page) )
		var isRecord	= (!isUUID && typeof page == "object" && page.foundset.getDataSource() == 'db:/sutra_cms/web_page')
		
		// init pageRec
		var pageRec
		
		if ( isString || isUUID || isRecord  ) {
			if ( isRecord ) {
				pageRec = page
			}
			else {
				// find page record
				var pageFS = databaseManager.getFoundSet("sutra_cms","web_page")
				pageFS.find()
				pageFS.id_page = page
				var count = pageFS.search()
				if (count == 1) {
					pageRec = pageFS.getRecord(1)
				}
				else {
					// error: page record not found
					_error.code 		= "404"
					_error.message 	= "Not found"
					return _error
				}
			}
		}
		else {
			// error: bad input
			_error.code = "400"
			_error.message = "Bad request"
			return _error
		}
		
		return pageRec
		
	},
	/**
	 * Run a CMS page and save results in the page's cache attribute.
 	 * @returns {Boolean|{code:String,message:String}}
	 * 	
	 * @param {UUID|String|JSRecord<db:/sutra_cms/web_page>} page page to get	
	 */
	setCache : function(page) {
		
		/** {{JSRecord<db:/sutra_cms/web_page>}} */
		var pageRec = scopes.CMS.utils.getPageRecord(page)
		
		if ( "error" instanceof pageRec ) {
			// error: problem with getting page record
			return pageRec
		}
		
		// get URL (TODO: active for each language)
		/** @type {object[]|{code:String,message:String}} */
		var urls = scopes.CMS.utils.getURL(pageRec)
		
		if ( "error" instanceof urls ) {
			// error: no urls
			return urls
		}
		
		// TODO: store pageData for each page language
		var store = {}
//		for (var i = 0; i < urls.length; i++) {
//			// get page data
//			try {
//				store[urls[i].iso] = plugins.http.getPageData(urls[i].url)
//			} catch (e) {
//				// error: something happened grabbing page
//				_error.code		= "303"
//				_error.message	= "Problem with http page request"
//				return _error
//			}	
//		}
		
		// get cache attribute record, create if needed
		var cacheRec
		if ( pageRec.web_page_to_attribute__cache.getSize() == 0 ) {
			cacheRec = pageRec.web_page_to_attribute__cache.getRecord(pageRec.web_page_to_attribute__cache.newRecord())
		}
		else {
			cacheRec = pageRec.web_page_to_attribute__cache.getRecord(1)
		}
		
		// temp object until languages implemented
		store[urls[0].iso] = plugins.http.getPageData(urls[0].url)
		cacheRec.attribute_value = JSON.stringify(store)
		databaseManager.saveData(cacheRec)
		
		return true
	}
}

