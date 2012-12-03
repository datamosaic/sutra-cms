<%@ page import = "java.util.*" %>

<title><%=request.getAttribute("title")%></title>
	<meta name="generator" content="<%=request.getAttribute("version")%>" />
<%
	//grab all seo attributes for the selected page's language
	for (Enumeration e = request.getAttributeNames(); e.hasMoreElements(); ) {
		String attribute = (String)e.nextElement();
		
		//only output seo stuff
		if (attribute.substring(0,3).equals("seo")) {
			String attributeName = attribute.substring(3).toLowerCase();
			out.print("\t<meta name=\"" + attributeName + "\" content=\"" + request.getAttribute(attribute) + "\" />\n");
		}
	}
%>

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