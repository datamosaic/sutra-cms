<%
	Object[] obj = new Object[]{application, session, request, response};
		
	IDataSet results = (IDataSet)servoy_hc.executeMethod(null,"CONTROLLER", obj);

	HashMap pageData = new HashMap();
	
	if (results.getRowCount() > 1) {
		// convert IDataSet to HashMap
		for (int i = 0 ; i < results.getRowCount() ; i++) {
			pageData.put(results.getRow(i)[0], results.getRow(i)[1]);
		}
		
		// loop over HashMap and set attributes as needed
		Iterator it = pageData.entrySet().iterator();
		while (it.hasNext()) {
			Map.Entry pairs = (Map.Entry)it.next();
			
			String keyName = (String)pairs.getKey();
			//remove the "cms" prefix and make the remaining string lowercase
				//this will leave all "seoKeywords" in tact
			if (keyName.substring(0,3).equals("cms")) {
				keyName = (String)keyName.substring(3).toLowerCase();
				//keyName = (String)keyName.substring(3,1).toLowerCase() + (String)keyName.substring(4);
				//keyName = (String)keyName.substring(3,1).toLowerCase().concat((String)keyName.substring(4));
			}
			
			request.setAttribute(keyName,(String)pairs.getValue());
		}
		
		// page title	
//		request.setAttribute("title",(String)pageData.get("cmsTitle"));	
		
		// head include	
//		request.setAttribute("head",(String)pageData.get("cmsHead"));
		
		// footer include	
//		request.setAttribute("footer",(String)pageData.get("cmsFoot"));	
		
		// theme directory
		request.setAttribute("themeDirectory",(String)pageData.get("cmsThemeDirectory"));
		
		// site directory
		request.setAttribute("siteDirectory",(String)pageData.get("cmsSiteDirectory"));
		
		// page layout
//		request.setAttribute("layout",(String)pageData.get("cmsLayout"));
		
		// SEO
//		request.setAttribute("description",(String)pageData.get("seoDescription"));
//		request.setAttribute("keywords",(String)pageData.get("seoKeywords"));
		
		// analytics
//		request.setAttribute("analytics",(String)pageData.get("cmsAnalytics"));
		
		// generator
//		request.setAttribute("version",(String)pageData.get("cmsVersion"));
		
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