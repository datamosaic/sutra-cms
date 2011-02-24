<%@ page import = "java.util.*" %>
<% HashMap pageData = (HashMap)request.getAttribute("pageData");%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" media="all"  href="<%=(String)request.getAttribute("themeDirectory")%>/css/layout.css" />
<jsp:include page='<%= (String)request.getAttribute("head") %>' />
</head>
<body>
<div class="page">
	<div class="head">
		<%=pageData.get("Head")%>
	</div>
	<div class="body">
		<div class="leftCol">
			<%=pageData.get("Left Column")%>
		</div>
		<div class="main">
			<%=pageData.get("Main")%>
		</div>
	</div>
	<div class="foot">
		<%=pageData.get("Footer")%>
	</div>
</div>
<jsp:include page='<%= (String)request.getAttribute("footer") %>' />
</body>
</html>
