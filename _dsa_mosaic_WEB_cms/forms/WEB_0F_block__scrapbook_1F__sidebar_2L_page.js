/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"76462F92-66C1-4BD5-8BF2-514D99234191",variableType:12}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"EBBB9B5D-13A2-47D7-8684-A61E6DD0FADB",variableType:12}
 */
var _moshPit = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A26DE770-1FC5-4342-BA15-DB1E038A938C",variableType:12}
 */
var _area = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"AEF20EA7-6503-4FC5-834F-F00FB03E07BB",variableType:12}
 */
var _group = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D0B360CC-B333-4324-AB6D-42D7CA0E253A",variableType:12}
 */
var _language = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"5E9BBFFD-BB26-4E2B-A1A0-1E32E6AF5528",variableType:12}
 */
var _platform = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E5DCDB50-4E13-4376-88F0-061CDDD46183"}
 * @AllowToRunInFind
 */
function GOTO_page(event) {
	//not running in data sutra application framework, just show form
	if (globals.WEBc_sutra_trigger('TRIGGER_navigation_set',['CMS_page']) == 'noSutra') {
		forms.WEB_0F_page.controller.show()
	}
	
	forms.WEB_0F_page.foundset.find()
	forms.WEB_0F_page.foundset.id_page = id_page
	forms.WEB_0F_page.foundset.search()
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"77915DF9-D8E5-42A3-9E7F-4C5CDFACDE29"}
 */
function FORM_on_show(firstShow, event) {
	//load in the pages used on
	if (utils.hasRecords(foundset)) {
		forms.WEB_0F_block__scrapbook.LOAD_used_on()
	}
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"BA95BBF1-C1DC-4A18-A265-2622B7F2DF88"}
 */
function REC_on_select(event) {
	//grab triumvirate
	var query = "SELECT DISTINCT e.platform_name, f.language_name, g.group_name, h.area_name FROM web_version a, web_platform b, web_language c, web_group d, web_site_platform e, web_site_language f, web_site_group g, web_area h, web_page i WHERE  \
				a.id_version IN ( \
				SELECT DISTINCT c.id_version from web_block a, web_scope b, web_area c WHERE  \
				c.id_area = b.id_area AND \
				b.id_block = a.id_block AND \
				a.id_block = ? \
				) AND  \
				h.id_area IN ( \
				SELECT DISTINCT b.id_area from web_block a, web_scope b WHERE  \
				b.id_block = a.id_block AND \
				a.id_block = ? \
				) AND  \
				b.id_platform = a.id_platform AND \
				e.id_site_platform = b.id_site_platform AND  \
				c.id_language = a.id_language AND \
				f.id_site_language = c.id_site_language AND \
				d.id_group = a.id_group AND \
				g.id_site_group = d.id_site_group AND \
				i.id_page = ?"
	var dataset = databaseManager.getDataSetByQuery(
				'sutra_cms',
				query,
				[forms.WEB_0F_block__scrapbook.id_block.toString(),forms.WEB_0F_block__scrapbook.id_block.toString(),id_page.toString()],
				-1
			)
	
	//htmlicize
	var html = '<html><head>'
	html += '<style type="text/css" media="screen"><!--'
	html += 'table { table-layout: fixed; width: 100%; border-spacing: 0px; border: 0px; }'
	html += '.bold { font-weight: bold; text-align: right; }'
	html += '--></style></head>'
	html += '<body><table>'
	
	for (var i = 1; i <= dataset.getMaxRowIndex(); i++) {
		html += '<tr>'
		html += '<td>' + dataset.getValue(i,1) + ' ' + dataset.getValue(i,2) + ' ' + dataset.getValue(i,3) + ': ' + dataset.getValue(i,4) + '</td>'
		html += '</tr>'
	}
	
	html += '</table></body></html>'
	
	_moshPit = html
}
