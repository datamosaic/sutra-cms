/**
 *
 * @properties={typeid:24,uuid:"FFE14AC8-BECE-4D27-9AC1-0EE22A0032FF"}
 */
function BLOCK_choose()
{
	application.showFormInDialog(forms.WEB_0F__image__P_choose,-1,-1,-1,-1,"Image", false, false, "chooseImage")
	
	//update display
	if (forms.WEB_0F_page.TRIGGER_mode_set() == "DESIGN") {
		forms.WEB_0F_page__design__content_1L_block.ACTION_set_simple_display()
	}
	else {
		forms.WEB_0F_page__browser__editor.FORM_on_show()
	}
}

/**
 *
 * @properties={typeid:24,uuid:"43C94817-C701-46EF-809A-33BE2CFC738C"}
 */
function BLOCK_scale()
{
	application.showFormInDialog(forms.WEB_0F__image__P_scale,-1,-1,-1,-1,"Image", false, false, "imageScale")
	
	//update display
	if (forms.WEB_0F_page.TRIGGER_mode_set() == "DESIGN") {
		forms.WEB_0F_page__design__content_1L_block.ACTION_set_simple_display()
	}
	else {
		forms.WEB_0F_page__browser__editor.FORM_on_show()
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A1AAE46C-FB9C-4B17-9F80-3684F7D8F81B"}
 */
function ACTION_scale(event) {
	forms.WEB_0B_image.ACTION_image_scale()
}

/**
 *
 * @properties={typeid:24,uuid:"D5507344-C123-4997-A29D-32181865B93F"}
 */
function BLOCK_import()
{
	// TODO: handle reading text files
	
	// input file	  
	var file = plugins.file.showFileOpenDialog()
	if ( !file ) {
		return "Selection cancelled"
	}
	
	var imageTemp =  plugins.images.getImage(file)
	
	var ext = file.getName().split('.')
	//file has an extension
	if (ext && ext.length > 1) {
		var fileExt = ext[ext.length-1].toLowerCase()
	}
	
	// set image details object
	var fileOBJ = {}
	fileOBJ.image_name	= file.getName().replace(/ /g, "_")
	fileOBJ.image_type	= file.getContentType()
	fileOBJ.image_extension	= fileExt
	fileOBJ.width		= imageTemp.getWidth()
	fileOBJ.height		= imageTemp.getHeight()
	fileOBJ.width_original		= imageTemp.getWidth()
	fileOBJ.height_original		= imageTemp.getHeight()
	fileOBJ.directory	= "sites/" + forms.WEB_0F_site.directory + "/images/"
	fileOBJ.rec_created = new Date()
	
	/* copy image details to block data points
	var data = forms.WEB_0F_page__design.web_page_to_block_data_by_area_by_block
	for (var i = 0; i < data.getSize(); i++) {
		var record = data.getRecord(i + 1)
		record.data_value = fileOBJ[record.data_key]
	}
	*/
	
	// create image record
	var record = forms.WEB_0F_image.foundset.getRecord(forms.WEB_0F_image.foundset.newRecord(true,true))
	record.image_title		= fileOBJ.image_name
	record.image_type		= fileOBJ.image_type
	record.image_size		= plugins.file.getFileSize(file)
	record.directory		= fileOBJ.directory
	record.image_extension	= fileExt
	record.width			= fileOBJ.width
	record.height			= fileOBJ.height
	record.thumbnail		= imageTemp.resize((40*fileOBJ.width)/fileOBJ.height, 40)  // scale to 40px height
	record.id_site			= forms.WEB_0F_site.id_site
	
	// save file
	// TODO: stream image upload to server from client
	
	var outputImage			= forms.WEB_0F_install.ACTION_get_install() +
							'/application_server/server/webapps/ROOT/sutraCMS/sites/' +
							forms.WEB_0F_site.directory + '/images/' + fileOBJ.image_name
				
	// application_server/server/webapps/ROOT/sutraCMS/sites/4community				
				
	if (forms.WEB_0F_install.ACTION_get_server() == "Windows"){
		outputImage		= outputImage.replace(/\//g, "\\")
	}
	var success = plugins.file.copyFile(file, outputImage)
	if ( !success ) {
		return "File save error"
	}
	plugins.dialogs.showInfoDialog("Image",  "Image uploaded")
}

/**
 * param {} obj Data object passed to all markup methods
 * @properties={typeid:24,uuid:"5AABEBFD-5C92-42EA-9C3D-B0135AA33FC8"}
 */
function VIEW_default(obj)
{
	
	// template					
	var markup = 	'<p id="data-<<id_block>>"><img width="<<width>>" height="<<height>>" border="0"' +
					'src="<<directory>><<image_name>>"' +
					'alt="" /></p>'
	
	// replace
	markup = markup.replace(/<<id_block>>/ig, obj.block.id)
	markup = markup.replace(/<<width>>/ig, obj.data.width)
	markup = markup.replace(/<<height>>/ig, obj.data.height)
	markup = markup.replace(/<<image_name>>/ig, obj.data.image_name)
	markup = markup.replace(/<<directory>>/ig, obj.data.directory)
	
	
	// return
	return markup	
}

/**
 * @properties={typeid:24,uuid:"D177F9D8-57D4-4E9C-BC4B-D87BF04B1B00"}
 */
function VIEW_download()
{
}

/**
 * @properties={typeid:24,uuid:"FFB42F41-3AB3-4F26-A006-9FDF03BE1CF7"}
 */
function VIEW_lightbox()
{
}

/**
 *
 * @properties={typeid:24,uuid:"C3D50AA7-5A76-484F-BF22-E86C40042A94"}
 */
function FORM_on_load() {

	/* moved
		var url = "http://localhost:8080" + directory + image_name
		elements.bn_browser.navigateTo(url)
	*/

}

/**
 *
 * @properties={typeid:24,uuid:"581D1472-7339-4669-A110-353A1904B241"}
 */
function TOGGLE_buttons(editStatus) {
	elements.btn_choose.enabled = editStatus
	elements.btn_import.enabled = editStatus
	elements.btn_scale.enabled = editStatus
	elements.lbl_choose.enabled = editStatus
	elements.lbl_import.enabled = editStatus
	elements.lbl_scale.enabled = editStatus
}

/**
 * @properties={typeid:24,uuid:"E9062B39-C69D-4841-A367-94BDC60849FF"}
 */
function LOADER_init(recBlock,flagEdit) {
	//foundset with image datapoints
	var fsBlockData = recBlock.web_block_to_block_data
	
	//create object with all properties
	var objImage = new Object()
	for (var i = 1; i <= fsBlockData.getSize(); i++) {
		var record = fsBlockData.getRecord(i)
		objImage[record.data_key] = record.data_value
	}
	
	//no image set yet
	if (!objImage.image_name){
		var html = 	'<html><head></head><body>' +
					'No image chosen yet' +
					'</body></html>'
	}
	// image is set
	else { 
		var siteURL = recBlock.web_block_to_area.web_area_to_version.web_version_to_page.web_page_to_site.url
		
		if (siteURL) {
			siteURL = 'http://' + siteURL
			
			var port = application.getServerURL()
			port = port.split(':')
			if (port.length > 2) {
				siteURL += ':' + port[2]
			}
		}
		else {
			var siteDirectory = recBlock.web_block_to_area.web_area_to_version.web_version_to_page.web_page_to_site.directory
			
			siteURL = application.getServerURL() + '/' + siteDirectory
		}
		
		var html = 	'<html><head></head><body>' +
					'<img src="' + siteURL + '/' + 
					objImage.directory + '/' + objImage.image_name + 
					'" height="' + objImage.height + '" width="' + objImage.width +'"' + '>' +
					'</body></html>'
	}
	
	forms.WEB_0F__image.elements.bn_browser.html = html
	forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.removeTabAt(2)
	forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.addTab(forms.WEB_0F__image)
	forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail.tabIndex = 2
	
	forms.WEB_0F__image.TOGGLE_buttons(flagEdit)
}

/**
 * @properties={typeid:24,uuid:"5896D844-D8AA-4C31-84B2-D77EAE012F1D"}
 */
function INIT_block() {
	
	// main data object to build
	var block = {}
	
	// function to read methods on this form. naming conventions supply method categories and names
	function getMethods(type) {
		var methods = allmethods
		var clientActionsBlock = {}
		var clientActionsPage = {}
		var webActions = {}
		var views = {}
		for (var i in methods) {
			if ( methods[i].substr(0,5) == "BLOCK" ) {
				clientActionsBlock[methods[i].substr(6,100)] = methods[i]
			}
			if ( methods[i].substr(0,4) == "PAGE" ) {
				clientActionsPage[methods[i].substr(5,100)] = methods[i]
			}
			else if ( methods[i].substr(0,3) == "WEB" ) {
				webActions[methods[i].substr(4,100)] = methods[i]
			}
			else if ( methods[i].substr(0,4) == "VIEW" ) {
				views[methods[i].substr(5,100)] = methods[i]
			}
		}	
		switch (type) {
			case "BLOCK":
				return clientActionsBlock
				break
			case "PAGE":
				return clientActionsPage
			case "WEB":
				return webActions
				break
			case "VIEW":
				return views
				break
			default:
				return null
				break
		}
	}
	
	// block record data
	block.record = {
			block_name			: 'Image',
			block_description	: 'Images resource library',		
			form_name			: 'WEB_0F__image'
		}
	
	// block views
	block.views = getMethods("VIEW")
	
	
	// block data points
	block.data = {
		image_name : 'TEXT',
		image_type : 'TEXT',
		image_extension : 'TEXT',
		height : 'INTEGER',
		width : 'INTEGER',
		directory : 'TEXT',
		height_original : 'INTEGER',
		width_original : 'INTEGER'
	}
	
	// block client actions - Block
	block.clientActionsBlock = getMethods("BLOCK")
	
	// block client actions - Page
	block.clientActionsPage = getMethods("PAGE")
	
	// block web actions
	block.webActions = getMethods("WEB")
	
	// block configure data points
	block.blockConfigure = {
		Test : 'TEXT'
	}   
	
	return block
	
}
