/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"64CDD89C-D4CF-4B05-ABE7-B913A7558558"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"4E76921E-71E9-4D07-AE77-5A85D8978F9D",variableType:-4}
 */
var BUILDER = {
	staticHTML	: { type: "staticHTML", order : null, 
						data : null },
	textBox		: { type: "textBox", order : null, required : null, repeatable: null, 
						label : null, wrapper : { pre : null, post : null }, chars : null, data : null },
	textArea	: { type: "textArea", order : null, required : null, repeatable: null, htmlAllow: null, markdown: null,
						label : null, wrapper : { pre : null, post : null }, data : null },
	valuelist	: { type: "valuelist", order : null, required : null, repeatable: null, values : null, display: 'combobox',
						label : null, wrapper : { pre : null, post : null }, data : null },
	image		: { type: "image", order : null, required : null, repeatable: null, 
						image : { label: null, wrapper : { pre : null, post : null }, attributes: null, data : null },
						link:  { label: null, wrapper : { pre : null, post : null }, attributes: null, data : null },
						resizing: { label: null, data : null } }, 
	fileDownload: { type: "fileDownload", order : null, required : null, repeatable: null,
						label : null, wrapper : { pre : null, post : null }, attributes: null, data : null },				
	pageLink	: { type: "pageLink", order : null, required : null, repeatable: null,
						link : { label : null, wrapper : { pre : null, post : null }, attributes: null, data : null },
						name : { label : null, wrapper : { pre : null, post : null }, data : null }},							
	externalURL : { type: "externalURL", order : null, required : null, repeatable: null, 
						link : { label : null, wrapper : { pre : null, post : null }, attributes: null, data : null },
						name : { label : null, wrapper : { pre : null, post : null }, data : null }},
	datePicker	: { type: "datePicker", order : null, required : null, repeatable: null, 
						label : null, wrapper : { pre : null, post : null }, format : null, data : null },
	tinyMCE		: { type: "tinyMCE", order : null, required : null, 
						label : null, wrapper : { pre : null, post : null }, data : null },
	table		: { type: "table", order : null, required : null, repeatable: 1, columns : 3, header : 1, 
						column1	: { label: null, wrapper : { pre : null, post : null }, data : null },
						column2	: { label: null, wrapper : { pre : null, post : null }, data : null },
						column3	: { label: null, wrapper : { pre : null, post : null }, data : null } },
};

/**
 * @properties={typeid:35,uuid:"3F8AFCDF-077F-4C93-8F3D-1DE8391925A9",variableType:-4}
 */
var _blockList = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"84026904-8F0E-409A-A20D-0ADF1747E6F1",variableType:4}
 */
var _blockSelected = null;

/**
 * @properties={typeid:24,uuid:"99A2CDA1-2F7F-490F-B51C-D753D76E724D"}
 */
function VIEW_default() {
	
	// order the inputs
	var instance = new Array()
	for (var i in globals.CMS.data.block_data) {
		// get object of data from database
		var fieldData = JSON.parse(globals.CMS.data.block_data[i])
		
		var order = fieldData.order
		var type = fieldData.type
		
		// there is a valid order, push into array
		if (typeof order == 'number') {
			instance[order] = {
						type : type,
						value: fieldData
					}
		}
	}

	// return markup by order and type
	var start = (instance[0]) ? 0 : 1
	var markup = ""
	for (var i = start; i < instance.length; i++) {
		var thisInstance = instance[i]
		
		if (thisInstance) {
			var method = 'MRKP_' + instance[i].type
			
			// this method exists
			if (solutionModel.getForm(controller.getName()).getFormMethod(method)) {
				markup += forms.WEB_0F__block_builder[method](instance[i].value) + '\n'
			}
		}
	}

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
 * @properties={typeid:24,uuid:"F1E25A12-9BF5-4C13-B2F6-0E14144AFFBD"}
 */
function INIT_block() {
	
	// main data object to build
	var block = {}
	
	// block record data
	block.record = {
	        block_name			: 'Block builder',
			block_description	: 'Your custom block',
			block_category		: scopes.CMS._constant.blockCategory.COLLECTION,
			form_name			: controller.getName(),
			form_name_display	: 'WEB_0F__block_builder_view'
		}
	
	// block views
	block.views = globals.WEBc_block_type_getMethods(controller.getName(),"VIEW")
	
	// block client actions - Block
	block.clientActionsBlock = globals.WEBc_block_type_getMethods(controller.getName(),"BLOCK")
	
	// block client actions - Page
	block.clientActionsPage = globals.WEBc_block_type_getMethods(controller.getName(),"PAGE")
	
	// block web actions
	block.webActions = globals.WEBc_block_type_getMethods(controller.getName(),"WEB")
	
	// block data points
	block.data = {
		           
	}
	
	// block configure data points
	block.blockConfigure = {
		
	}
	
	// block response data points
	block.blockResponse = {
		
	}
	
	return block
	
}

/**
 * @properties={typeid:24,uuid:"1745BEE8-D91F-45CF-86BB-BEB3FEB208E9"}
 */
function BLOCK_save(event) {
	for (var i = 1; i < _blockList.length; i++) {
		var blockItem = _blockList[i]
		
		if (blockItem) {
			globals.CMS.ui.setData(event,_blockList[i].key,JSON.stringify(_blockList[i].record,null,'\t'))
		}
	}
}

/**
 * @properties={typeid:24,uuid:"94FE1530-BF1F-4846-980A-ECB166477D91"}
 */
function BLOCK_cancel() {
	//refresh the data
	INIT_data()
}

/**
 * Update display as needed when block selected.
 *
 * @properties={typeid:24,uuid:"2EA92488-FC7A-460C-8FFF-9B35DF3616F5"}
 */
function INIT_data() {
	var fieldForm = 'WEB_0F__block_builder_1L__fields'
	
	//grab all data for this block
	var allFields = globals.CMS.ui.getData(controller.getName())
	
	_blockList = new Array()
	
	//build object for list to operate from
	for (var i in allFields) {
		var fieldData = JSON.parse(allFields[i])
		
		//we need order, type, and whatnot that may be buried in an array
		var order = fieldData.order
		var type = fieldData.type
		
		//create object to use for reference while on this block
		_blockList[order] = {
						key : i,
						type : type
					}
		
		//this is a repeatable field that hasn't been used before
		_blockList[order].record = fieldData
	}
	
	//build list
	var dataset = databaseManager.createEmptyDataSet(0,['data_key','row_order'])
	for (var i = 1; i < _blockList.length; i++) {
		var row = _blockList[i]
		
		if (row) {
			//don't show staticHTML as editable areas
			if (row.type != 'staticHTML') {
				dataset.addRow([row.key,i])
			}
		}
	}
	
	var dataSource = dataset.createDataSource('web_block_builder_data',[JSColumn.TEXT,JSColumn.INTEGER])
	
	//throw dataSource over onto my form (if it doesn't have one) and call it a day
	if (!elements.tab_list.getMaxTabIndex()) {
		elements.tab_list.removeAllTabs()
//		var success = history.removeForm(forms[fieldForm])
//		success = solutionModel.removeForm(fieldForm)
		
		solutionModel.getForm(fieldForm).dataSource = dataSource
		
		//assign this form back onto the tabpanel
		elements.tab_list.addTab(forms[fieldForm])
	}
}

/**
 * Markup for the static html field
 * 
 * @param {Object}	field The object with all meta data for this fieldset
 * 
 * @returns {String} The markup generated for this field
 * 
 * @properties={typeid:24,uuid:"81C01542-15EA-47E6-AAB5-059536851A4B"}
 */
function MRKP_staticHTML(field) {
	var markup = ''
	
	if (field) {
		markup += MRKP__null_check(field.data)
	}
	
	return markup
}

/**
 * Markup for the text box field
 * 
 * @param {Object[]}	fieldSet The object with all meta data for this fieldset
 * 
 * @returns {String} The markup generated for this field
 * 
 * @properties={typeid:24,uuid:"5CB846DE-A35E-4EFD-9C94-F050C54E1149"}
 */
function MRKP_textBox(fieldSet) {
	var markup = ''
	
	if (fieldSet) {
		if (!(fieldSet instanceof Array)) {
			fieldSet = new Array(fieldSet)
		}
		
		for (var i = 0; i < fieldSet.length; i++) {
			var field = fieldSet[i]
			
			// only use x amount of characters
			if (typeof field.chars == 'number' && field.data) {
				var text = field.data.substr(0,field.chars)
			}
			else {
				var text = MRKP__null_check(field.data)
			}
			
			// strip html characters
			text = globals.CMS.utils.stripHTML(text)
			
			markup += MRKP__null_check(field.wrapper.pre) + text + MRKP__null_check(field.wrapper.post)
		}
	}
	
	return markup
}

/**
 * Markup for the valuelist field
 * 
 * @param {Object[]}	fieldSet The object with all meta data for this fieldset
 * 
 * @returns {String} The markup generated for this field
 * 
 * @properties={typeid:24,uuid:"E9E27D76-B3C9-436D-B73F-3A9F474AE14E"}
 */
function MRKP_valuelist(fieldSet) {
	var markup = ''
	
	if (fieldSet) {
		if (!(fieldSet instanceof Array)) {
			fieldSet = new Array(fieldSet)
		}
		
		for (var i = 0; i < fieldSet.length; i++) {
			var field = fieldSet[i]
			
			var text = MRKP__null_check(field.data)
			
			// strip html characters
//			text = globals.CMS.utils.stripHTML(text)
			
			markup += MRKP__null_check(field.wrapper.pre) + text + MRKP__null_check(field.wrapper.post)
		}
	}
	
	return markup
}

/**
 * Markup for the text area field
 * 
 * @param {Object[]}	fieldSet The object with all meta data for this fieldset
 * 
 * @returns {String} The markup generated for this field
 * 
 * @properties={typeid:24,uuid:"7EA25A69-72AC-4A62-BAFE-F6D8AFA63FD2"}
 */
function MRKP_textArea(fieldSet) {
	var markup = ''
	
	if (fieldSet) {
		if (!(fieldSet instanceof Array)) {
			fieldSet = new Array(fieldSet)
		}
		
		for (var i = 0; i < fieldSet.length; i++) {
			var field = fieldSet[i]
			var text = MRKP__null_check(field.data)
			
			// strip html characters
			if (field.htmlAllow != 1) {
				text = globals.CMS.utils.stripHTML(text)
			}
			
			// convert markdown
			if (field.markdown == 1) {
				//if library available, actually do markdown conversion
				if (typeof org.pegdown.PegDownProcessor == 'function') {
					text = new org.pegdown.PegDownProcessor().markdownToHtml(text)
				}
				//show line breaks
				else {
					text = utils.stringReplace(text,'\n','<br />')
				}
			}
			
			markup += MRKP__null_check(field.wrapper.pre) + text + MRKP__null_check(field.wrapper.post)
		}
	}
	
	return markup
}

/**
 * Markup for the image field
 * 
 * @param {Object[]}	fieldSet The object with all meta data for this fieldset
 * 
 * @returns {String} The markup generated for this field
 * 
 * @properties={typeid:24,uuid:"88DD9433-9E2D-48CD-876F-71CD714A03D8"}
 */
function MRKP_image(fieldSet) {
	var markup = ''
	
	if (fieldSet) {
		if (!(fieldSet instanceof Array)) {
			fieldSet = new Array(fieldSet)
		}
		
		for (var i = 0; i < fieldSet.length; i++) {
			var field = fieldSet[i]
			
			var img = ''
			if (field.image && field.image.data) {
				img += MRKP__null_check(field.image.wrapper.pre) + '<img src="{DS:IMG_' + MRKP__null_check(field.image.data) + '}" ' + MRKP__null_check(field.image.attributes) + '/>'
				img += MRKP__null_check(field.image.wrapper.post)
			}
			if (field.link && field.link.data) {
				markup += MRKP__null_check(field.link.wrapper.pre) + '<a href="' + MRKP__null_check(field.link.data) + '" ' + MRKP__null_check(field.link.attributes) + '>'
				markup += img
				markup += '</a>' + MRKP__null_check(field.link.wrapper.post)
			}
			else {
				markup = img
			}
		}
	}
	
	return markup
}

/**
 * Markup for the file download field
 * 
 * @param {Object[]}	fieldSet The object with all meta data for this fieldset
 * 
 * @returns {String} The markup generated for this field
 * 
 * @properties={typeid:24,uuid:"20422267-B22F-45F2-8A07-A7F25860F2C8"}
 */
function MRKP_fileDownload(fieldSet) {
	var markup = ''
	
	if (fieldSet) {
		if (!(fieldSet instanceof Array)) {
			fieldSet = new Array(fieldSet)
		}
		
		for (var i = 0; i < fieldSet.length; i++) {
			var field = fieldSet[i]
			
		}
	}
	
	return markup
}

/**
 * Markup for the page link field
 * 
 * @param {Object[]}	fieldSet The object with all meta data for this fieldset
 * 
 * @returns {String} The markup generated for this field
 * 
 * @properties={typeid:24,uuid:"9E90340B-A333-42A2-BD34-3EBAA075037A"}
 */
function MRKP_pageLink(fieldSet) {
	var markup = ''
	
	if (fieldSet) {
		if (!(fieldSet instanceof Array)) {
			fieldSet = new Array(fieldSet)
		}
		
		for (var i = 0; i < fieldSet.length; i++) {
			var field = fieldSet[i]
			
			if (field.link && field.link.data) {
				markup += MRKP__null_check(field.link.wrapper.pre) + '<a href="' + '{DS:ID_' + MRKP__null_check(field.link.data) + '}" ' + MRKP__null_check(field.link.attributes) + '>'
				markup += MRKP__null_check(field.name.wrapper.pre) + MRKP__null_check(field.name.data,'{DS:NAME_' + MRKP__null_check(field.link.data) + '}') + MRKP__null_check(field.name.wrapper.post)
				markup += '</a>' + MRKP__null_check(field.link.wrapper.post)
			}
		}
	}
	
	return markup
}

/**
 * Markup for the external url field
 * 
 * @param {Object[]}	fieldSet The object with all meta data for this fieldset
 * 
 * @returns {String} The markup generated for this field
 * 
 * @properties={typeid:24,uuid:"1EF912C4-165D-4EDC-8AE3-5D7D8957F7DC"}
 */
function MRKP_externalURL(fieldSet) {
	var markup = ''
	
	if (fieldSet) {
		if (!(fieldSet instanceof Array)) {
			fieldSet = new Array(fieldSet)
		}
		
		for (var i = 0; i < fieldSet.length; i++) {
			var field = fieldSet[i]
			
			markup += MRKP__null_check(field.link.wrapper.pre) + '<a href="' + MRKP__null_check(field.link.data) + '" ' + MRKP__null_check(field.link.attributes) + '>'
			markup += MRKP__null_check(field.name.wrapper.pre) + MRKP__null_check(field.name.data,field.link.data) + MRKP__null_check(field.name.wrapper.post)
			markup += '</a>' + MRKP__null_check(field.link.wrapper.post)
		}
	}
	
	return markup
}

/**
 * Markup for the date picker field
 * 
 * @param {Object[]}	fieldSet The object with all meta data for this fieldset
 * 
 * @returns {String} The markup generated for this field
 * 
 * @properties={typeid:24,uuid:"DD0236AE-E982-4EE2-9FA9-2EC88DAE71AD"}
 */
function MRKP_datePicker(fieldSet) {
	var markup = ''
	
	if (fieldSet) {
		if (!(fieldSet instanceof Array)) {
			fieldSet = new Array(fieldSet)
		}
		
		for (var i = 0; i < fieldSet.length; i++) {
			var field = fieldSet[i]
		}
	}
	
	return markup
}

/**
 * Markup for the wysiwyg field
 * 
 * @param {Object}	field The object with all meta data for this fieldset
 * 
 * @returns {String} The markup generated for this field
 * 
 * @properties={typeid:24,uuid:"3F3C2EA8-7F35-4262-926D-67488BB9DA07"}
 */
function MRKP_tinyMCE(field) {
	var markup = ''
	
	if (field) {
		markup += MRKP__null_check(field.wrapper.pre) + MRKP__null_check(field.data) + MRKP__null_check(field.wrapper.post)
	}
	
	return markup
}

/**
 * Markup for the table field
 * 
 * @param {Object[]}	fieldSet The object with all meta data for this fieldset
 * 
 * @returns {String} The markup generated for this field
 * 
 * @properties={typeid:24,uuid:"F0384DF3-4128-4E5E-B9B7-2E4E7C68DF65"}
 */
function MRKP_table(fieldSet) {
	var markup = ''
	
	if (fieldSet) {
		if (!(fieldSet instanceof Array)) {
			fieldSet = new Array(fieldSet)
		}
		
		for (var i = 0; i < fieldSet.length; i++) {
			var field = fieldSet[i]
			
		}
	}
	
	return markup
}

/**
 * Replace null values with empty space
 * 
 * @param {String}	value The value to check for validity
 * @param {String|Number}	[defaultValue=""] Default value to use if value passed is null
 * 
 * @properties={typeid:24,uuid:"C44E51C7-FF2C-4144-A6CA-FA80F5249010"}
 */
function MRKP__null_check(value,defaultValue) {
	if (!defaultValue) {
		defaultValue = ''
	}
	
	return value || defaultValue
}

/**
 * Replace block builder variables with correct value
 * 
 * @param {String}	value The value to check for bb vars
 * @param {Object[]}	fieldSet The object with all meta data for this fieldset
 * 
 * @properties={typeid:24,uuid:"6D12618D-7B0A-4D3B-B0FA-AAC489648889"}
 */
function MRKP__var_replace(value,fieldSet) {
	var newValue = ''
	
	if (value) {
		newValue = value
		
		//
	}
	
	return newValue
}
