<%@ page import = "java.util.*" %>
<%@ page import = "com.servoy.j2db.server.headlessclient.*" %>
<%@ page import = "com.servoy.j2db.util.*" %>

<%
	// start servoy session
	ISessionBean servoy_hc = (ISessionBean)application.getAttribute("servoy_cms");
	if (servoy_hc == null || !servoy_hc.setMainForm("WEB_0__controller") {
		// module
		String module = request.getParameter("svs");
		servoy_hc = HeadlessClientFactory.createSessionBean(request, module);
		application.setAttribute("servoy_cms",servoy_hc);
	}
	
	// form
	String form = request.getParameter("svf");	
	boolean ok = servoy_hc.setMainForm(form);
	if (!ok) {
		out.print("Error cannot work on required form");
		return;
	}
	
	// method
	String method = request.getParameter("svm");
	
	// arguments
	Object[] obj = new Object[]{session, request};
		
	String results = (String)servoy_hc.executeMethod(null, method, obj);
	out.print(results);
	
%>