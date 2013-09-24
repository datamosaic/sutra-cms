<%@ page import = "java.util.*" %>
<% HashMap pageData = (HashMap)request.getAttribute("pageData");%>
	<title><%=request.getAttribute("title")%></title>
	<meta name="generator" content="<%=request.getAttribute("version")%>" />

<!-- site resources -->
<script src="resources/js/jquery-1.10.2.min.js" language="JavaScript" type="text/javascript"></script>
<link href="resources/css/cms.css" rel="StyleSheet" type="text/css">

<!-- editable browser stuff -->
<script type="text/javascript">

	show_highlighter = function(domID,type) {
		var divObj = $(domID);
		
		divObj.click(
			function(e) {
				//don't bubble up
				e.stopPropagation();
				
				//make sure that this stays highlighted
				divObj.addClass("block_editing");
				
				//put secondary hover craft over the whole mothership
				var hiliteTwo = $("#cmsOverlay");
				hiliteTwo.css("display", "block");
				
				//tell servoy which block we want to edit (get rid of sutra-block-data and just return ids interested in)
				callServoy("WEB_0F_page__browser.BLOCK_edit",domID.split('-').slice(3).join('-'));
			}
		);
	};

	hide_highlighter = function() {
		// $("#cmsRowHilite").css('display', 'none');
		// $("#cmsBlockHilite").css('display', 'none');
		// $("#cmsOverlay").css('display', 'none');
	}

	function editOn() {
		//make all block editable areas clickable and show rollover highlightion
		$("div[id^='sutra-block-data-'],p[id^='sutra-block-data-']").mouseover(function(e) {
			//don't bubble up
			e.stopPropagation();
			
			//show highlighter here
			show_highlighter('#' + this.id,'block');
		});
		$("div[id^='sutra-block-data-'],p[id^='sutra-block-data-']").mouseout(function(e) {
			//don't bubble up
			e.stopPropagation();
			
			//unbind click from this div
			$('#' + this.id).unbind('click');
			
			//hide highlighter
			hide_highlighter();
		});
		$("div[id^='sutra-block-data-']:not([layout]),p[id^='sutra-block-data-']:not([layout])").addClass("block_editable");
		$("div[id^='sutra-block-data-'][layout],p[id^='sutra-block-data-'][layout]").addClass("layout_editable");
		
		//show new block buttons
		$("div[id^='sutra-block-add-']").css("display","block");
		$("div[id^='sutra-block-add-']").mouseover(function(e) {
			hide_highlighter();
		});
	}

	function editOff() {
		hide_highlighter();
		
		$(".block_editing").removeClass('block_editing');
		
		//existing rows/blocks
		$("div[id^='sutra-row-'],p[id^='sutra-row-']").unbind("mouseover");
		$("div[id^='sutra-row-'],p[id^='sutra-row-']").removeClass("row_editable");
		
		$("div[id^='sutra-block-data-'],p[id^='sutra-block-data-']").unbind("mouseover");
		$("div[id^='sutra-block-data-'],p[id^='sutra-block-data-']").removeClass("block_editable layout_editable");
		
		//hide new row/block buttons
		$("div[id^='sutra-row-add-']").css("display","none");
		$("div[id^='sutra-row-add-']").unbind("mouseover");
		
		$("div[id^='sutra-block-add-']").css("display","none");
		$("div[id^='sutra-block-add-']").unbind("mouseover");
	}
	
	function blockNew(areaID) {
		//put secondary hover craft over the whole mothership
		var hiliteTwo = $("#cmsOverlay");
		hiliteTwo.css("display", "block");
		
		//tell servoy which area is getting a new block appended
		callServoy("WEB_0F_page__browser.BLOCK_new",areaID);
	}
	
	function blockDelete(blockID) {
		//tell servoy which block to delete
		callServoy("WEB_0F_page__browser.BLOCK_delete",blockID);
	}
	
	function callServoy(method, arg) {
		//running in webclient or smart client (browsa-bean)
		if (window.parent == window) {
			sendNSCommand(method,arg);
		}
		else {
			parent.postMessage({
				method: method,
				arg: arg
			},'*');
		}
	}
	
	// var windowProxy;
	$(function() {
		// windowProxy = new Porthole.WindowProxy('http://<%=pageData.get("dsDomain")%>/external/proxy.html');
		// 
		// windowProxy.addEventListener(function(event) { 
		// 	// handle event
		// });
		
		var portholeMethodOn = window.addEventListener ? "addEventListener" : "attachEvent";
		var portholeMethodOff = window.addEventListener ? "removeEventListener" : "detachEvent";
		var portholeEvent = portholeMethodOn == "attachEvent" ? "onmessage" : "message";
	
		function portholeSetup(e) {
			if (e.data.method && window[e.data.method]) {
				window[e.data.method](e.data.arg);
			}
		}
		window[portholeMethodOn](portholeEvent,portholeSetup,false);
		
		//on load method that disables all links when in edit mode
		$("a:not([href*='index_edit.jsp'],[href*='javascript'],.blockDelete)").click(function(event) {
			if ($("#cmsBlockHilite:visible").length) {
				event.preventDefault();
			}
		});
		
		//on load method that attaches callback to every index_edit link
		$("a[href*='index_edit.jsp']").click(function(event) {
			
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
			callServoy("WEB_0T_page.SET_page",pageID);
		});
		
		//allow delete block a link to work insdie of clickable div
		$('a.blockDelete').click(function(e) {
			e.stopPropagation();
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