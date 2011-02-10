<%
	// start servoy session
	ISessionBean servoy_hc = (ISessionBean)application.getAttribute("servoy");
	if (servoy_hc == null) {
		servoy_hc = HeadlessClientFactory.createSessionBean(request,"_dsa_mosaic_WEB_cms");
		application.setAttribute("servoy",servoy_hc);
	}
	boolean ok = servoy_hc.setMainForm("WEB_0__controller");
	if (!ok) {
		out.print("Error cannot work on required form");
		return;
	}
%>