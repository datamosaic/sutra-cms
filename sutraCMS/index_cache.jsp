<%@ page import = "java.util.*" %>
<%@ page import = "com.servoy.j2db.server.headlessclient.*" %>
<%@ page import = "com.servoy.j2db.util.*" %>
<%@ page import = "com.servoy.j2db.dataprocessing.IDataSet" %>
<%@ page errorPage="error.jsp" %>
<%@include file="controllers/servoy.jsp" %>
<%@include file="controllers/login.jsp" %>	
<%@include file="controllers/page_cache.jsp" %>
<% String layout = (String)request.getAttribute("layout");%>
<jsp:include page='<%= layout %>' />