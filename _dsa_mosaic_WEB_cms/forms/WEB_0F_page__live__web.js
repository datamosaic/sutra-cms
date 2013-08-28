/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"088C38EF-99DE-4BB0-A5D1-BC5CD159EDFB"}
 */
function FORM_on_show(firstShow, event) {
	_super.FORM_on_show(firstShow, event)
	
//	SETUP_porthole()
	//this shows page; right now disabled to aide with debugging
	URL_update()
}

/**
 * Set up porthole on the data sutra application platform to the CMS page
 * This method moved into data sutra core; possible should bring it back sometime
 * 
 * @properties={typeid:24,uuid:"64FB15B3-40DA-4D65-941F-FF8280BD4D65"}
 */
function SETUP_porthole() {
	plugins.WebClientUtils.executeClientSideJS(
			//set up method to listen to child iframe
			'var cmsMethod = window.addEventListener ? "addEventListener" : "attachEvent";' +
			'var cmsCall = window[eventMethod];' +
			'var cmsEvent = cmsMethod == "attachEvent" ? "onmessage" : "message";' +
			'cmsCall(cmsEvent,function(e) {' +
				'sendNSCommand(e.data.method,e.data.arg);' +
				//trash this listener once it has been fired (better if not needed, but hard to trap for page refresh)
//				'if (cmsMethod == "addEventListener") {' +
//					'this.removeEventListener(cmsMethod,arguments.callee);' +
//				'}' +
			'},false);'
		)
}

/**
 * Set up porthole on the data sutra application platform to the CMS page
 * 
 * @param {String} [method]
 * @param {String} [arg]
 * 
 * @properties={typeid:24,uuid:"5C649393-88D2-4213-8E24-71868DE9AC84"}
 */
function CMS_call(method,arg) {
	//get function ready to call for this page
	if (!arguments.length || arguments[0] instanceof JSEvent) {
		var callback = plugins.WebClientUtils.generateCallbackScript(CMS_call, ['method', 'arg'], false) //.replace('wcall','wcall3')
		var jsCallback = 'function sendNSCommand(method, arg){' + callback + '}'
		plugins.WebClientUtils.executeClientSideJS('callbackConfig(' + jsCallback + ');')
	}
	//run method with arguments passed
	else {
		method = method.split('.')
		var methodName = method.pop()
		var formName = method.pop()
		
		if (formName) {
			//call with correct context
			switch (formName) {
				case 'WEB_0F_page__browser':
					formName = controller.getName()
					break
				case 'WEB_0T_page':
					formName = 'WEB_0T_page__web'
					break
			}
			
			forms[formName][methodName](arg)
		}
		else {
			globals[methodName](arg)
		}
		
		//reset listener everytime (don't really need to do, but if the page was refreshed, we need to make sure that there is a porthole)
//		SETUP_porthole()
	}
}

/**
 * Web client, slight delay in actually doing stuff because need to wait for it to get pumped in
 * @param webMode
 *
 * @properties={typeid:24,uuid:"1686E658-5F01-4DD7-BDD3-5250CE890665"}
 */
function URL_update(webMode) {
	//build up what we are going to show
	var placeholder = _super.URL_update(webMode)
	
	var id = plugins.WebClientUtils.getElementMarkupId(elements.lbl_page)
	
	//replace with placeholder html
	if (placeholder) {
		var regex = new RegExp(/<body\b[^>]*>(.*?)<\/body>/)
		var results = regex.exec(placeholder)
			
		plugins.WebClientUtils.executeClientSideJS(
				'setTimeout(function(){$("#' + id + '").replaceWith("<div id=\'' + id + '\'>' + results[1] + '</div>");bigIndicator(false,50);},500);'
			)
	}
	//set source of iframe to this url
	else {
		plugins.WebClientUtils.executeClientSideJS(
				'$("#' + id + '").fadeOut("medium");\
				setTimeout(function(){$("#' + id + '").replaceWith("<iframe id=\'' + id + '\' src=\'' + globals.WEB_preview_url + '\' width=\'100%\' height=\'100%\' scrolling=\'yes\' frameborder=\'0\' style=\'display:none;\'></iframe>");\
				setTimeout(function(){$("#' + id + '").fadeIn("slow")},750);\
				bigIndicator(false,500);},750);'
			)
	}
	
	//make sure that the callback is available for this page
	CMS_call()
}

/**
 * @properties={typeid:24,uuid:"E1D222F8-97A7-493C-8F48-BDBB94BDC6E9"}
 */
function EDIT_on() {
	var id = plugins.WebClientUtils.getElementMarkupId(elements.lbl_page)
	
	plugins.WebClientUtils.executeClientSideJS(
			'setTimeout(function(){if ($("iframe#' + id + '").length) {' + 
				'window.frames["' + id + '"].postMessage({method:"editOn"},"*");' + 
				//just to make sure that indicator not stuck on
				'bigIndicator(false,500);' +
			'}},1000);'
		)
}

/**
 * @properties={typeid:24,uuid:"DEAB7BA2-EB16-46D3-817D-D934405ADEB2"}
 */
function EDIT_off() {
	var id = plugins.WebClientUtils.getElementMarkupId(elements.lbl_page)
	
	plugins.WebClientUtils.executeClientSideJS(
			'setTimeout(function(){if ($("iframe#' + id + '").length) {' + 
				'window.frames["' + id + '"].postMessage({method:"editOff"},"*");' + 
				//just to make sure that indicator not stuck on
				'bigIndicator(false,500);' +
			'}},1000);'
		)
}