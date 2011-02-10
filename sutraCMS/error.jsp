<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<%@ page import = "java.io.*" %>
<%@ page isErrorPage="true" %>
<html>
<head>
	<title>Error</title>
</head>
<body text="#000000" bgcolor="#ffffff">
Access is denied or Error occurred
<br>
<br>
<font face="Courier, New" color="#ffffff" size="1">
Exception:&nbsp;<br>
<% 
	if (exception != null)
	{
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		PrintWriter pw = new PrintWriter(bos);
		exception.fillInStackTrace();
		exception.printStackTrace(pw);
		pw.flush();
		String s = new String(bos.toByteArray());
		out.println("<pre>");
		out.println(s);
		out.println("</pre>");
	} 
%>
</font>
</body>
</html>