/**
 * @properties={typeid:35,uuid:"04fde543-69ac-4de9-af47-7f7c22221f18"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"85B4B595-6A2C-4A80-89FF-572D7754FA70"}
 */
var _rewriteSample = '<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE urlrewrite PUBLIC "-//tuckey.org//DTD UrlRewrite 2.6//EN"\n        "http://tuckey.org/res/dtds/urlrewrite2.6.dtd">\n\n<!--\n    Configuration file for Sutra CMS by Data Mosaic\n	http://www.data-mosaic.com/\n	\n	Rewriting provided by UrlRewriteFilter\n	http://tuckey.org/urlrewrite/\n-->\n\n\n<urlrewrite>\n\n<!--	generic top		-->\n	\n	<rule>\n		<name>Generic CMS .html inbound</name>\n		<note>All html files (any URL with ".html") will be fed into sutraCMS/index.jsp</note>\n		<from>^/(.*?).html(?:\?*)(.*)</from>\n		<to>/sutraCMS/index.jsp?pretty=$1&amp;$2</to>\n	</rule>\n\n	<rule>\n		<name>Generic CMS .jsp</name>\n		<note>All jsp files (any URL with ".jsp") served up from sutraCMS directory. NOTE: Exceptions should be added to this rule and then rewritten in a later rule.</note>\n		<from>(^.*.jsp.*$)</from>\n		<to>/sutraCMS/$1</to>\n	</rule>\n\n	<rule>\n		<name>Generic CMS home page</name>\n		<note>When no page specified, serve the default page for the requested domain</note>\n		<from>^/$</from>\n		<to>/sutraCMS/index.jsp</to>\n	</rule>	\n	\n<!--	site specifc	-->\n	\n	<rule>\n		<name>My cool site</name>\n		<note>Other files (non-html, non-jsp) pushed to site document root</note>\n		<condition name="host">\n			sitename\n		</condition>\n		<from>(^((?!^.*\b(html|jsp)\b.*$).)*)</from>\n		<to>/sutraCMS/sites/my_cool_site/$1</to>\n	</rule>\n\n\n</urlrewrite>';

/**
 * @properties={typeid:24,uuid:"BC2B89EA-1253-4CDF-9430-11670FB3D100"}
 */
function TOGGLE_sample_rewrite(input) {
	if (typeof input != 'boolean') {
		input = (rewrite_enabled) ? true : false
	}
	
	elements.lbl_rewriteSample.visible = input
	elements.var_rewriteSample.visible = input
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
 * @properties={typeid:24,uuid:"49C33D11-866C-4561-99E2-4A26E9DECC2F"}
 */
function FLD_data_change__rewrite_enabled(oldValue, newValue, event) {
	databaseManager.saveData()
	TOGGLE_sample_rewrite()
}
