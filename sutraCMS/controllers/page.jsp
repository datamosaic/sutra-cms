<%
	Object[] obj = new Object[]{application, session, request, response};
		
	IDataSet results = (IDataSet)servoy_hc.executeMethod(null,"CONTROLLER", obj);

	HashMap pageData = new HashMap();
	
	if (results.getRowCount() > 1) {
		// convert IDataSet to HashMap
		for (int i = 0 ; i < results.getRowCount() ; i++) {
			pageData.put(results.getRow(i)[0], results.getRow(i)[1]);
		}
		
		// page title	
		request.setAttribute("title",(String)pageData.get("cmsTitle"));	
		
		// head include	
		request.setAttribute("head",(String)pageData.get("cmsHead"));
		
		// footer include	
		request.setAttribute("footer",(String)pageData.get("cmsFooter"));	
		
		// theme directory
		request.setAttribute("themeDirectory",(String)pageData.get("cmsThemeDirectory"));
		
		// page layout
		request.setAttribute("layout",(String)pageData.get("cmsLayout"));
		
		// SEO
		request.setAttribute("description",(String)pageData.get("cmsDescription"));
		request.setAttribute("keywords",(String)pageData.get("cmsKeywords"));
		
		// analytics
		request.setAttribute("analytics",(String)pageData.get("cmsAnalytics"));
		
		// generator
		request.setAttribute("version",(String)pageData.get("cmsVersion"));
		
		// store page data for retrieval by the template
		request.setAttribute("pageData",pageData);				
	}
	else {	
		// page not found	
		// TODO: pass string to template alpha area. template to retain gamma area (navigation)
		out.print(results.getRow(0)[0]);
		return;
	}
%>