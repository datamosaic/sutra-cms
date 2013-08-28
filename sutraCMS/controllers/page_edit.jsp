<%
	Object[] obj = new Object[]{application, session, request, response, "Edit"};
	
	IDataSet results = (IDataSet)servoy_hc.executeMethod(null,"CONTROLLER", obj);

	HashMap pageData = new HashMap();

	if (results.getRowCount() > 1) {
		// convert IDataSet to HashMap
		for (int i = 0 ; i < results.getRowCount() ; i++) {
			pageData.put(results.getRow(i)[0], results.getRow(i)[1]);
		}

		// store page data for retrieval by the template
		request.setAttribute("pageData",pageData);

		// loop over HashMap and set attributes as needed
		Iterator it = pageData.entrySet().iterator();
		while (it.hasNext()) {
			Map.Entry pairs = (Map.Entry)it.next();

			String keyName = (String)pairs.getKey();
			//this is for debugging to see what we actually have
			// out.print("<h3>" + keyName + "</h3> " + (String)pairs.getValue() + "<br /><br /><br />");
			
			//remove the "cms" prefix and make the remaining string lowercase
				//this will leave all "seoKeywords" in tact
			if (keyName.substring(0,3).equals("cms")) {

				keyName = (String)keyName.substring(3,4).toLowerCase() + (String)keyName.substring(4);
			}

			request.setAttribute(keyName,(String)pairs.getValue());
		}

	}
	else {	
		// page not found	
		// TODO: pass string to template alpha area. template to retain gamma area (navigation)
		out.print(results.getRow(0)[0]);
		return;
	}
%>