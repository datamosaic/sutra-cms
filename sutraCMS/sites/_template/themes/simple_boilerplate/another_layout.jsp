<%@ page import = "java.util.*" %>
<% HashMap pageData = (HashMap)request.getAttribute("pageData");%> 
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<!-- <title>HTML5 boilerplate—all you really need…</title> -->
	<link rel="stylesheet" type="text/css" href="<%=(String)request.getAttribute("themeDirectory")%>/css/style.css" />
	<!--[if IE]>
		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<jsp:include page='<%= (String)request.getAttribute("head") %>' /> 
</head>

<body id="home">
	<header>
	      <img src="<%=(String)request.getAttribute("themeDirectory")%>/images/inneroptics_dot_net_portland.jpg" />
	</header>

	<section>
		<article>
			<header>
				<%=pageData.get("Title")%>
			</header>
			<section>
				<%=pageData.get("Main")%>
			</section>		
		</article>
	</section>
	
	<footer>
		<%=pageData.get("Footer")%>
	</footer>
	
<jsp:include page='<%= (String)request.getAttribute("foot") %>' /> 
</body>
</html>