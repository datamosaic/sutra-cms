/**
 * @properties={typeid:35,uuid:"04fde543-69ac-4de9-af47-7f7c22221f18"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"85B4B595-6A2C-4A80-89FF-572D7754FA70"}
 */
var _rewriteSample = '<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE urlrewrite \n\t\tPUBLIC "-//tuckey.org//DTD UrlRewrite 2.6//EN"\n\t\t"http://tuckey.org/res/dtds/urlrewrite2.6.dtd">\n\n<!--\n\tConfiguration file for Sutra CMS by Data Mosaic\n\thttp://www.data-mosaic.com/sutra-cms\n\n\tRewriting provided by UrlRewriteFilter\n\thttp://tuckey.org/urlrewrite/\n-->\n\n<urlrewrite>\n\n<!-- \tServoy clients (smart, web, headless, admin) accessible ONLY from these addresses -->\n\n\t<rule>\n\t\t<name>Servoy servlets</name>\n\t\t<note>Smart-client, web-client, headless-client, and servoy-admin will only work when accessed from this host. Any other thing that is served up by Tomcat you do not want pushed into sutraCMS should be manually specified here (or duplicate this rule and put there). NOTE: This rule must be the first one.</note>\n\t\t<condition name="host" next="or">\n\t\t\tservlets\n\t\t</condition>\n\t\t<condition name="host">\n\t\t\tservlets.example.com\n\t\t</condition>\n\t\t<from>^(.*)</from>\n\t\t<to>$1</to>\n\t</rule>\n\t\n<!--\tLanguage based redirects -->\n\t\n\t<!--\tExample site\t\t-->\n\t\t<rule enabled="true">\n\t\t\t<name>Example lang.d::english</name>\n\t\t\t<note>English version of Example as a domain</note>\n\t\t\t<condition name="host">\n\t\t\t\texample\n\t\t\t</condition>\n\t\t\t<from>^(.*)</from>\n\t\t\t<set name="language">en</set>\n\t\t\t<to last="false">$1</to>\n\t\t</rule>\n\t\n\t\t<rule enabled="true">\n\t\t\t<name>Example language::russian</name>\n\t\t\t<note>Russian version of Example as a domain</note>\n\t\t\t<condition name="host">\n\t\t\t\texample.ru\n\t\t\t</condition>\n\t\t\t<from>^(.*)</from>\n\t\t\t<set name="language">ru</set>\n\t\t\t<to last="false">$1</to>\n\t\t</rule>\n\t\n\t\t<rule enabled="true">\n\t\t\t<name>Example lang.d::belgian</name>\n\t\t\t<note>Belgian version of Example as a domain</note>\n\t\t\t<condition name="host">\n\t\t\t\texample.be\n\t\t\t</condition>\n\t\t\t<from>^(.*)</from>\n\t\t\t<set name="language">be</set>\n\t\t\t<to last="false">$1</to>\n\t\t</rule>\n\t\n\t\t<rule>\n\t\t\t<name>Example lang.f::english</name>\n\t\t\t<note>English version of Example as a folder</note>\n\t\t\t<condition name="host">\n\t\t\t\texample\n\t\t\t</condition>\n\t\t\t<from>^/en/(.*)</from>\t\t<!-- there is the trailing slash problem here.... example/en/ resolves, example/en doesn\'t -->\n\t\t\t<set name="language">en</set>\n\t\t\t<to last="false">/$1</to>\n\t\t</rule>\n\t\n\t\t<rule>\n\t\t\t<name>Example lang.f::russian</name>\n\t\t\t<note>Russian version of Example as a folder</note>\n\t\t\t<condition name="host">\n\t\t\t\texample\n\t\t\t</condition>\n\t\t\t<from>^/ru/(.*)</from>\t\t<!-- there is the trailing slash problem here.... example/en/ resolves, example/en doesn\'t -->\n\t\t\t<set name="language">ru</set>\n\t\t\t<to last="false">/$1</to>\n\t\t</rule>\n\t\n<!-- \tSame for all CMS sites -->\n\t\n\t<rule>\n\t\t<name>Generic CMS entry .jsp</name>\n\t\t<note>All CMS jsp files served up from sutraCMS directory. NOTE: Exceptions should be added to this rule and then rewritten in a later rule.</note>\n\t\t<from>(^.*\\b(index|index_edit|error)\\b.jsp.*$)</from>\n\t\t<to>/sutraCMS/$1</to>\n\t</rule>\n\n\t<rule>\n\t\t<name>Generic CMS home page</name>\n\t\t<note>When no page specified, serve the default page for the requested domain</note>\n\t\t<from>^/$</from>\n\t\t<to>/sutraCMS/index.jsp</to>\n\t</rule>\t\n\t\n\t<rule>\n\t\t<name>Generic CMS controllers</name>\n\t\t<note>Push controllers into sutraCMS starting directory</note>\n\t\t<from>^/controllers/(.*)$</from>\n\t\t<to>/sutraCMS/controllers/$1</to>\n\t</rule>\n\t\n\t<rule>\n\t\t<name>Generic CMS resources</name>\n\t\t<note>Push resources into sutraCMS starting directory</note>\n\t\t<from>^/resources/(.*)$</from>\n\t\t<to>/sutraCMS/resources/$1</to>\n\t</rule>\n\t\n\t<rule>\n\t\t<name>Generic CMS .html</name>\n\t\t<note>All html files (any URL with ".html") will be fed into sutraCMS/index.jsp</note>\n\t\t<from>^/(.*?).html(?:\\?*)(.*)</from>\n\t\t<to>/sutraCMS/index.jsp?path=$1&amp;$2</to>\n\t</rule>\n\n<!--\tExample site\t\t-->\n\t<rule>\n\t\t<name>Example resources</name>\n\t\t<note>Other files (non-html, non-sutraCMS-jsp) pushed to site document root</note>\n\t\t<condition name="host" next="or">\n\t\t\texample\n\t\t</condition>\n\t\t<condition name="host" next="or">\n\t\t\texample.ru\n\t\t</condition>\n\t\t<condition name="host">\n\t\t\texample.be\n\t\t</condition>\n\t\t<from>(^((?!^.*\\b(html|jsp)\\b.*$).)*)</from>\n\t\t<to>/sutraCMS/sites/default/$1</to>\n\t</rule>\n\n\n</urlrewrite>';

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
