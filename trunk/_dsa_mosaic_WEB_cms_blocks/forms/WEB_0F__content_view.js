/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"46DACEFD-6F16-46F7-827B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

/**
 * Update display as needed when block selected.
 * 
 * @properties={typeid:24,uuid:"C4FCD4BB-E90B-46E1-BDDA-890B883963D4"}
 */
function INIT_data() {
	var data = globals.CMS.ui.getData(controller.getName())
	var baseHREF = globals.WEBc_markup_link_base(forms.WEB_0F_page.id_page)
	
	var html = '<html>'
	var head = <head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<base href={baseHREF} />
		<script src="/resources/js/jquery-1.4.min.js" language="JavaScript" type="text/javascript">//</script>
		<script type="text/javascript">
		//<![CDATA[
			$(function() {
				//on load method that attaches callback to every index_edit link
				$("a[href*='index_edit.jsp']").click(function(event){
					
					//stop default browser behaviour
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
	
	html += sanitize + '<body>'
	if (data.Content) {
		// replace out place holders (DS_* links)
		var markup = globals.WEBc_markup_link_internal(data.Content,null,'Edit')
		
		html += markup
	}
	html += '</body></html>'
	
	if (elements.bn_browser && !solutionPrefs.config.webClient) {
		elements.bn_browser.html = html
	}
	else {
		globals.WEBc_browser_error()
	}
}
