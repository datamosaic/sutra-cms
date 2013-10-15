/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4FDB2EFD-6F16-46F7-827B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"F7F9D3DF-AFAE-4488-A574-25DF56C57DD0",variableType:-4}
 */
var CMSb = {
	/**
	 * Try to toggle specified elemental property
	 * @param elem Form element
	 * @param {String} property Name of element property
	 * @param {Boolean} [toggle] Way to toggle property
	 * 
	 * @properties={typeid:24,uuid:"51A72755-473E-4D4A-914D-AFFD2960C6BD"}
	 */
	propCheck : function(elem,property,toggle) {
			return WEBb_element_toggle(elem,property,toggle)
		},
	/**
	 * Display preview of a given block
	 * @param elem Form element
	 * @param {String} html Code to be shoved into iframe
	 * 
	 * @properties={typeid:24,uuid:"1238003A-85E2-4993-8B43-2E8734CC1556"}
	 */
	preview : function(elem, html) {
			return WEBb_block_preview(elem, html)
		}
}

/**
 * Helper method that switches all page links around to be driven from the tree view sitemap
 * 
 * @param {UUID} [pageID]
 * 
 * @properties={typeid:24,uuid:"EEED49FF-6E80-44F4-8701-FE69D60E9FA7"}
 */
function WEBb_index_edit(pageID) {
	if (!pageID) {
		pageID = forms.WEB_0F_page.id_page
	}
	
	var baseHREF = globals.WEBc_markup_link_base(pageID)
	
	var head = <head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<base href={baseHREF} />
		<script src="/resources/js/jquery-1.4.min.js" language="JavaScript" type="text/javascript">//</script>
		<script type="text/javascript">
		//<![CDATA[
			$(function() {
				//on load method that attaches callback to every index_edit link
				$("a[href*='index_edit.jsp']").click(function(event){
					
					//stop default browser behavior
					event.preventDefault();
				
					//find pageID
					var hashes = this.href.slice(this.href.indexOf('?') + 1).split('&');
					for (var i = 0; i < hashes.length; i++) {
						var hash = hashes[i].split('=');
						if (hash[0] == 'id') {
							var pageID = hash[1];
							break
						}
					}
					
					//set page in Servoy, triggering refresh, etc
					sendNSCommand("WEB_0T_page.SET_page",pageID);
				});
			});
		//]]>
		</script>
	</head>
	
	var sanitize = head.toXMLString()
	
	//cdata linebreak issue
	var regex = new RegExp('(//)(\\s*)(<!\\[CDATA\\[)')
	var match = regex.exec(sanitize)
	sanitize = utils.stringReplace(sanitize,match[0],match[1] + match[3] + '\n')
	
	return sanitize
}

/**
 * Try to toggle specified elemental property
 * @param elem Form element
 * @param {String} property Name of element property
 * @param {Boolean} [toggle] Way to toggle property
 * 
 * @properties={typeid:24,uuid:"51A72755-473E-4D4A-914D-AFFD2960C6BD"}
 */
function WEBb_element_toggle(elem,property,toggle) {
	if (elem && property && !(typeof elem[property] == 'function' || (typeof elem[property] == 'object' && !elem[property]))) {
		//specific state passed in for this property
		if (typeof toggle == 'boolean' || toggle) {
			elem[property] = toggle
		}
		//current value is a boolean, flip the state
		else if (typeof elem[property] == 'boolean') {
			elem[property] = !elem[property]
		}
	}
}

/**
 * Display preview of a given block
 * @param elem Form element
 * @param {String} html Code to be shoved into iframe
 * 
 * @properties={typeid:24,uuid:"1238003A-85E2-4993-8B43-2E8734CC1556"}
 */
function WEBb_block_preview(elem, html) {
	var id = plugins.WebClientUtils.getElementMarkupId(elem)
	html = (typeof html == 'string') ? html.replace(/\'/g, '\\\'') : ''
	var iframe = '<iframe id="' + id + '" srcdoc=\\\'' + html + '\\\' width="100%" height="100%" scrolling="yes" frameborder="0" seamless sandbox></iframe>'
	plugins.WebClientUtils.executeClientSideJS(
			'setTimeout(function(){$("#' + id + '").replaceWith(\'' + iframe + '\');\
			},750);'
		)
}
