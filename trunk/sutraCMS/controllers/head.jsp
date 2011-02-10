<%@ page import = "java.util.*" %>
<% HashMap pageData = (HashMap)request.getAttribute("pageData");%>
<title><%=pageData.get("cmsTitle")%></title>
<meta name="generator" content="<%=request.getAttribute("version")%>" />
<% if ( !request.getAttribute("description").equals("") ) {%>
	<meta name="description" content="<%=request.getAttribute("description")%>" />
<%}%>
<% if ( !request.getAttribute("keywords").equals("") ) {%>
	<meta name="keywords" content="<%=request.getAttribute("keywords")%>" />
<%}%>
<% if ( !request.getAttribute("analytics").equals("") ) {%>
<script type="text/javascript">

	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-<%=request.getAttribute("analytics")%>']);
	_gaq.push(['_trackPageview']);

	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();

</script>
<%}%>