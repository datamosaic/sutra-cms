<%
// AUTHENTICATION

/*
(session object does not contain identifier)	{
	(request.token)	{
		1. grab user info
		2. record user info based on token identifier if user (identifier) not already in system
		3. log page request (session UID + identifier)
		3. put identifier into session
	}
	else {
		session not initialized
	}
}
else {
	session is initialized
	1. log page request (session UID + identifier)
}
*/

// if session object does not contain identifier
if (session.getAttribute("identifier") == null) {
	// out.print("1st if<br />");
	// see if just logged in
	if (request.getParameter("token") != null) {
		// out.print("2nd if<br />");
		// record user details
		Object[] token = new Object[]{request.getParameter("token")};
		String userID = (String)servoy_hc.executeMethod(null,"WEB_login", token);
		
		// initialize session tracking for logged in user
		session.setAttribute("identifier", userID);
		
		// log page request
		Object[] logInfo = new Object[]{request.getParameter("id"), session.getAttribute("identifier"), true};
		servoy_hc.executeMethod(null,"WEB_log_page", logInfo);
		
	}
	else {
		// out.print("1st else<br />");
		// anonymous user
		Object[] logInfo = new Object[]{request.getParameter("id"), session.getId(), false};
		servoy_hc.executeMethod(null,"WEB_log_page", logInfo);	
	}	
}
else {
	// log page request
	// out.print("2nd else<br />");
	Object[] logInfo = new Object[]{request.getParameter("id"), session.getAttribute("identifier"), true};
	servoy_hc.executeMethod(null,"WEB_log_page", logInfo);
}
// session.invalidate();
%>