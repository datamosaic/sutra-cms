<%@ page import = "java.util.*" %>
<% HashMap pageData = (HashMap)request.getAttribute("pageData");%>
<title><%=pageData.get("cmsTitle")%></title>
<meta name="description" content="<%=request.getAttribute("description")%>" />
<meta name="generator" content="<%=request.getAttribute("version")%>" />

<!-- site resources -->
<script src="resources/js/jquery-1.4.min.js" language="JavaScript" type="text/javascript"></script>
<link href="resources/css/cms.css" rel="StyleSheet" type="text/css">

<!-- editable browser stuff -->
<script type="text/javascript">

	show_highlighter = function(domID) {
		var hilite = $("#cmsHilite");
		var divObj = $(domID);

		var offset = divObj.offset();

		// put highlighter over item via dimensions plugin
		hilite.css("width", divObj.outerWidth());
		hilite.css("height", divObj.outerHeight());
		hilite.css("top", offset.top);
		hilite.css("left", offset.left);
		hilite.css("display", "block");

		hilite.unbind('click');
		hilite.click(
			function(e) {
				//put secondary hover craft over the whole mothership
				var hiliteTwo = $("#cmsOverlay");
				hiliteTwo.css("display", "block");
				
				//tell servoy which block we want to edit
				sendNSCommand("WEB_0F_page__browser.BLOCK_edit",domID);
			}
		);
	};

	hide_highlighter = function() {
		$("#cmsHilite").css('display', 'none');
		$("#cmsOverlay").css('display', 'none');
	}

	function editOn(divPrefix) {
		//make all editable areas clickable and show rollover highlightion
		$("div[id^='" + divPrefix + "'],p[id^='" + divPrefix + "']").mouseover(function(e) {
			show_highlighter('#' + this.id);
		});
		$("div[id^='" + divPrefix + "'],p[id^='" + divPrefix + "']").addClass("editable");
		
		//show new block
		$("div[id^='sutra-block-add-']").css("display","block");
		$("div[id^='sutra-block-add-']").mouseover(function(e) {
			hide_highlighter();
		});
	}

	function editOff(divPrefix) {
		hide_highlighter();
		
		//existing blocks
		$("div[id^='" + divPrefix + "'],p[id^='" + divPrefix + "']").unbind("mouseover");
		$("div[id^='" + divPrefix + "'],p[id^='" + divPrefix + "']").removeClass("editable");
		
		//hide new block
		$("div[id^='sutra-block-add-']").css("display","none");
	}
	
	function blockNew(areaID) {
		//put secondary hover craft over the whole mothership
		var hiliteTwo = $("#cmsOverlay");
		hiliteTwo.css("display", "block");
		
		//tell servoy which area is getting a new block appended
		sendNSCommand("WEB_0F_page__browser.BLOCK_new",areaID);
	}
	
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
	
	<% 
		//if flag set, auto-enter page in edit mode
		//TODO: flag
		if ((pageData.get("cmsModeStatus").equals("1"))) {
			out.print("\t//auto-enter page in edit mode\n");
			out.print("\t\teditOn('sutra-block-data-');\n");
		}
	%>
	});
	
</script>