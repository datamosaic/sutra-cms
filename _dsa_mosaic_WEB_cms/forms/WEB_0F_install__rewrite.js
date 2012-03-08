/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"04fde543-69ac-4de9-af47-7f7c22221f18"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011, 2012 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"85B4B595-6A2C-4A80-89FF-572D7754FA70"}
 */
var _rewriteSample = '<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE urlrewrite \n\t\tPUBLIC "-//tuckey.org//DTD UrlRewrite 2.6//EN"\n\t\t"http://www.tuckey.org/res/dtds/urlrewrite2.6.dtd">\n\n<!--\n\tConfiguration file for Sutra CMS by Data Mosaic\n\thttp://www.data-mosaic.com/sutra-cms\n\n\tRewriting provided by UrlRewriteFilter\n\thttp://www.tuckey.org/urlrewrite/\n-->\n\n<urlrewrite>\n\n<!-- \tServoy clients (smart, web, headless, admin) accessible ONLY from these addresses -->\n\n\t<rule>\n\t\t<name>Servoy servlets</name>\n\t\t<note>Smart-client, web-client, headless-client, and servoy-admin will only work when accessed from this host. Any other thing that is served up by Tomcat you do not want pushed into sutraCMS should be manually specified here (or duplicate this rule and put there). NOTE: This rule must be the first one.</note>\n\t\t<condition name="host" next="or">\n\t\t\tservlets\n\t\t</condition>\n\t\t<condition name="host">\n\t\t\tservlets.example.com\n\t\t</condition>\n\t\t<from>^(.*)</from>\n\t\t<to last="true">$1</to>\n\t</rule>\n\t\n\n<!--\tLanguage based redirects (1 rule per domain, 1 rule per folder) -->\n\n\t<!--\tExample site\t\t-->\n\t\t<rule enabled="true">\n\t\t\t<name>Example lang.d::belgian</name>\n\t\t\t<note>Belgian version of Example as a domain</note>\n\t\t\t<condition name="host">\n\t\t\t\texample.be\n\t\t\t</condition>\n\t\t\t<from>^(.*)</from>\n\t\t\t<set name="language">be</set>\n\t\t\t<to last="false">$1</to>\n\t\t</rule>\n\t\t\n\t\t<rule enabled="false">\n\t\t\t<name>Example lang.d::english</name>\n\t\t\t<note>English version of Example as a domain</note>\n\t\t\t<condition name="host">\n\t\t\t\texample\n\t\t\t</condition>\n\t\t\t<from>^(.*)</from>\n\t\t\t<set name="language">en</set>\n\t\t\t<to last="false">$1</to>\n\t\t</rule>\n\t\t\n\t\t<rule enabled="true">\n\t\t\t<name>Example lang.f::english</name>\n\t\t\t<note>English version of Example as a folder</note>\n\t\t\t<condition name="host">\n\t\t\t\texample\n\t\t\t</condition>\n\t\t\t<from>^/english/?(.*)</from>\n\t\t\t<set name="language">en</set>\n\t\t\t<to last="false">/$1</to>\n\t\t</rule>\n\n\t\t<rule enabled="false">\n\t\t\t<name>Example lang.d::russian</name>\n\t\t\t<note>Russian version of Example as a domain</note>\n\t\t\t<condition name="host">\n\t\t\t\texample.ru\n\t\t\t</condition>\n\t\t\t<from>^(.*)</from>\n\t\t\t<set name="language">ru</set>\n\t\t\t<to last="false">$1</to>\n\t\t</rule>\n\n\t\t<rule enabled="true">\n\t\t\t<name>Example lang.f::russian</name>\n\t\t\t<note>Russian version of Example as a folder</note>\n\t\t\t<condition name="host">\n\t\t\t\texample\n\t\t\t</condition>\n\t\t\t<from>^/russian/?(.*)</from>\n\t\t\t<set name="language">ru</set>\n\t\t\t<to last="false">/$1</to>\n\t\t</rule>\n\n\n<!-- \tSame for all CMS sites -->\n\n\t<rule>\n\t\t<name>Generic CMS entry .jsp</name>\n\t\t<note>All CMS jsp files served up from sutraCMS directory</note>\n\t\t<from>^/(\\b(index|index_edit|error)\\b.jsp.*)$</from>\n\t\t<to last="true">/sutraCMS/$1</to>\n\t</rule>\n\n\t<rule>\n\t\t<name>Generic CMS home page</name>\n\t\t<note>When no page specified, serve the default page for the requested domain</note>\n\t\t<from>^/$</from>\n\t\t<to last="true">/sutraCMS/index.jsp</to>\n\t</rule>\t\n\n\t<rule>\n\t\t<name>Generic CMS controllers</name>\n\t\t<note>Push controllers into sutraCMS starting directory</note>\n\t\t<from>^/controllers/(.*)$</from>\n\t\t<to last="true">/sutraCMS/controllers/$1</to>\n\t</rule>\n\n\t<rule>\n\t\t<name>Generic CMS resources</name>\n\t\t<note>Push resources into sutraCMS starting directory</note>\n\t\t<from>^/resources/(.*)$</from>\n\t\t<to last="true">/sutraCMS/resources/$1</to>\n\t</rule>\n\n\t<rule>\n\t\t<name>Generic CMS paths (folder and pretty)</name>\n\t\t<note>Feed requested path (anything without an extension) into sutraCMS/index.jsp</note>\n\t\t<from>^(?:(?:/sutraCMS)/index.jsp)?(.*/(?!.*\\.)(?!.*/).*?)(?:\\?|$)(?:\\?*)(.*)</from>\n\t\t<set name="path">$1</set>\n\t\t<to last="true">/sutraCMS/index.jsp?$2</to>\n\t</rule>\n\n\n<!--\tSite resources (1 rule per site)\t\t-->\n\t\n\t<rule>\n\t\t<name>Example resources</name>\n\t\t<note>If we get this far, it is a file with an extension, serve it from site directory</note>\n\t\t<condition name="host" next="or">\n\t\t\texample\n\t\t</condition>\n\t\t<from>^/(.*)</from>\n\t\t<to>/sutraCMS/sites/default/$1</to>\n\t</rule>\n\n</urlrewrite>';

/**
 * @properties={typeid:24,uuid:"BC2B89EA-1253-4CDF-9430-11670FB3D100"}
 */
function TOGGLE_sample_rewrite(input) {
	if (typeof input != 'boolean') {
		input = (rewrite_enabled) ? true : false
	}
	
	elements.lbl_url_install.visible = input
	elements.fld_url_install.visible = input
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
