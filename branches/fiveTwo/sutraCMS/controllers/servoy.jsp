<%
	// start servoy session
	ISessionBean servoy_hc = (ISessionBean)application.getAttribute("servoy_cms");
	if (servoy_hc == null || !servoy_hc.setMainForm("WEB_0__controller")) {
		servoy_hc = HeadlessClientFactory.createSessionBean(request,"_dsa_mosaic_WEB_cms");
		application.setAttribute("servoy_cms",servoy_hc);
	}
	boolean ok = servoy_hc.setMainForm("WEB_0__controller");
	if (!ok) {
		out.print("Error cannot work on required form");
		return;
	}
%>