/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4FDB2EFD-6F16-46F7-827B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011-2013 Data Mosaic \
									MIT Licensed';

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
