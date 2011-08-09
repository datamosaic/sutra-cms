<%@ page import = "java.util.*" %>
<% HashMap pageData = (HashMap)request.getAttribute("pageData");%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/2000/REC-xhtml1-20000126/DTD/xhtml1-transitional.dtd"> 
<html lang="en"> 
<head> 
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" /> 
	
	<style type="text/css" media="screen">
	@import url("<%=(String)request.getAttribute("themeDirectory")%>/css/main.css");
	@import url("<%=(String)request.getAttribute("themeDirectory")%>/css/av-typography.css");
	</style>
 
	<jsp:include page='<%= (String)request.getAttribute("head") %>' />
 
</head> 
<body> 
			
<div id="page"> 
	<div id="headerSpacer"></div> 
	<div id="header"> 
					
		<div id="headerNav"> 
			<%=pageData.get("Header Nav")%>
		</div> 
		<h1 id="logo"><a href="/concrete5/">Data Sutra</a></h1> 
		
		<div class="spacer"></div> 
 
		<div id="header-area"> 
			<div class="divider"></div> 
			<div id="header-area-inside"> 
				<%=pageData.get("Header")%>
			</div>			
		</div> 
	</div>			
	<div id="central"> 
		<div id="sidebar"> 
			<%=pageData.get("Sidebar")%>		
		</div> 
		
		<div class="spacer">&nbsp;</div>		
	</div> 
 
	<div id="footer"> 
			<span class="powered-by">Built with  <a href="http://www.concrete5.org">Sutra CMS</a>.</span> 
						&copy; 2010 <a href="/concrete5/">Concrete5</a>.
			&nbsp;&nbsp;
			All rights reserved.	            
	</div> 
 
</div> 
 
 
</body> 
</html>