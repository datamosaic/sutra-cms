/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"6CAEE31D-DADE-4F09-AA8A-BE48BAFD6F30",variableType:4}
 */
var _dividerVert = 300;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"711F5C47-F95F-4712-9D2E-0B52163649A6",variableType:4}
 */
var _dividerHoriz = 300;

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
 *
 * @param {Boolean} toggle Turn on edit mode
 * @param {Boolean} storeLoc Remember the location of the divider being hidden
 *
 * Set the split screen to show appropriately
 * @properties={typeid:24,uuid:"790C5249-DE77-4FD0-918F-CDE7B1FFD0E0"}
 */
function SPLIT_set(toggle,storeLoc) {
	var editLocation = forms.WEB_0F_page__browser_1F_block__editor._editLocation

	if (typeof toggle != 'boolean') {
		toggle = false
	}

	if (true) {
		//remember where we are
		if (storeLoc && !elements.tab_view.visible) {
			if (editLocation) {
				_dividerVert = elements.tab_vertical.getHeight() - elements.tab_vertical.dividerLocation
			}
			else {
				_dividerHoriz = elements.tab_horizontal.getWidth() - elements.tab_horizontal.dividerLocation
			}
		}

		RESET_tabs()

		//show vertical/horizontal splitty
		if (toggle) {
			SPLIT_toggle(editLocation)
		}
		else {
			elements.tab_view.addTab(forms.WEB_0F_page__live__web__view)
			elements.tab_view.visible = true
		}

		URL_update(forms.WEB_TB__web_mode.elements.highlighter.visible)
	}
}

/**
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"D581CF4F-3B11-4742-8EE8-5F417AE89C1E"}
 */
function FORM_on_load(event) {
	//create blanks to slot in on each split location
	var formNames = 'WEB_0F_page__live__web__horiz1 WEB_0F_page__live__web__horiz2 WEB_0F_page__live__web__vert1 WEB_0F_page__live__web__vert2'.split(' ')

	for (var i = 0; i < formNames.length; i++) {
		solutionModel.cloneForm(formNames[i],solutionModel.getForm('CODE__blank'))
	}

//	RESET_tabs()
	SPLIT_set(false)

//	return _super.FORM_on_load(event)
}

/**
 * @properties={typeid:24,uuid:"FBE9CD70-9F0D-43ED-B8B4-9FCD7DCD5223"}
 */
function RESET_tabs() {
	elements.tab_horizontal.visible = false
	elements.tab_vertical.visible = false
	elements.tab_view.visible = false

	forms.WEB_0F_page__browser_1F_block__editor.elements.lbl_split_side.visible = false
	forms.WEB_0F_page__browser_1F_block__editor.elements.lbl_split_top.visible = false
	forms.WEB_0F_page__live__web__view.elements.lbl_split_side.visible = false
	forms.WEB_0F_page__live__web__view.elements.lbl_split_top.visible = false

	elements.tab_horizontal.setLeftForm(forms.WEB_0F_page__live__web__horiz1)
	elements.tab_horizontal.setRightForm(forms.WEB_0F_page__live__web__horiz2)
	elements.tab_vertical.setLeftForm(forms.WEB_0F_page__live__web__vert1)
	elements.tab_vertical.setRightForm(forms.WEB_0F_page__live__web__vert2)
	elements.tab_view.removeAllTabs()
}

/**
 * @properties={typeid:24,uuid:"3F32419E-E121-49A6-A0D2-5964F2B3AFFC"}
 */
function SPLIT_toggle(leftRight) {
	//when toggling the split
	if (elements.tab_horizontal.getLeftForm().controller.getName() == 'WEB_0F_page__live__web__view' || elements.tab_vertical.getLeftForm().controller.getName() == 'WEB_0F_page__live__web__view') {
		RESET_tabs()
	}

	if (leftRight) {
		elements.tab_horizontal.setLeftForm(forms.WEB_0F_page__live__web__view)
		elements.tab_horizontal.setRightForm(forms.WEB_0F_page__browser_1F_block__editor)

		elements.tab_horizontal.dividerSize = 4
		elements.tab_horizontal.dividerLocation = forms.DATASUTRA_WEB_0F__workflow.elements.tab_workflow.getWidth() - _dividerHoriz + 4
		elements.tab_horizontal.continuousLayout = true
		elements.tab_horizontal.resizeWeight = 1

		elements.tab_horizontal.visible = true

		forms.WEB_0F_page__browser_1F_block__editor.elements.lbl_split_side.visible = true
		forms.WEB_0F_page__live__web__view.elements.lbl_split_side.visible = true
	}
	else {
		elements.tab_vertical.setLeftForm(forms.WEB_0F_page__live__web__view)
		elements.tab_vertical.setRightForm(forms.WEB_0F_page__browser_1F_block__editor)

		elements.tab_vertical.continuousLayout = true
		elements.tab_vertical.dividerLocation = forms.DATASUTRA_WEB_0F__main.elements.tab_main.getHeight() - _dividerVert + 4
		elements.tab_vertical.dividerSize = 4
		elements.tab_vertical.resizeWeight = 1

		elements.tab_vertical.visible = true

		forms.WEB_0F_page__browser_1F_block__editor.elements.lbl_split_top.visible = true
		forms.WEB_0F_page__live__web__view.elements.lbl_split_top.visible = true
	}
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
	var checkXDomain = placeholder == 'CMSexternal'

	var id = plugins.WebClientUtils.getElementMarkupId(forms.WEB_0F_page__live__web__view.elements.lbl_page)

	//replace with placeholder html
	if (!checkXDomain && placeholder) {
		var regex = new RegExp(/<body\b[^>]*>(.*?)<\/body>/)
		var results = regex.exec(placeholder)
		if (results && results.length) {
			results = results[1]
		}
		else {
			results = placeholder
		}

		plugins.WebClientUtils.executeClientSideJS(
				'bigIndicator(true);\
				setTimeout(function(){\
					$("#' + id + '").replaceWith("<div id=\'' + id + '\'>' + results + '</div>");\
					bigIndicator(false,500);}\
				,750);'
			)
	}
	//set source of iframe to this url
	else {
		var width = '100%'
		var height = '100%'
		//get dimensions of currently selected resolution
		var resDims = forms.WEB_TB__web_mode.ACTION_resize(null,null,null,null,null,null,null,null,true)
		if (resDims) {
			width = resDims.width
			height = resDims.height
		}
		
		//set up check to see if loads in ok
		var xdomain = ''
		if (checkXDomain) {
			xdomain = "\n\
				var iframe = $('<iframe />', {\n\
				src: '" + globals.WEB_preview_url + "',\n\
				name: 'xdomainCheck',\n\
				id:   'xdomainCheck',\n\
				sandbox: 'allow-same-origin allow-scripts allow-popups allow-forms',\n\
				ready: function() {\n\
							setTimeout(function(){\
								var sor = $('#xdomainCheck');\
								if (sor.length) {\n\
									try {\n\
										sor.get(0).contentWindow.document;\n\
									}\n\
									catch(e) {\n\
										if(e.message.indexOf('frame at \"null\"') != -1){\n\
											$('#" + id + "_cms').replaceWith('<iframe id=\"" + id + "_cms\" srcdoc=\"<p>This external link cannot be previewed.</p><p>Open <a href=\\'" + globals.WEB_preview_url + "\\' target=\\'_blank\\'>" + forms.WEB_0F_page.web_page_to_language__selected.page_name + "</a> in a new tab/window.</p>\" width=\"" + width +"\" height=\"" + height +"\" frameborder=\"0\" seamless=\"seamless\" style=\"display:none;\"></iframe>');\
											setTimeout(function(){\n\
												$('#" + id + "_cms').fadeIn('fast')\n\
											},750);\n\
										}\n\
									}\n\
									sor.remove();\n\
								}\n\
							},3000)\n\
						}\n\
			}).appendTo('body');"
		}
		
		plugins.WebClientUtils.executeClientSideJS(xdomain +
				'bigIndicator(true);\
				$("#' + id + '").fadeOut("medium");\
				setTimeout(function(){$("#' + id + '").replaceWith("<div id=\'' + id + '\' class=\'gfxGrunge\' style=\'display:none;\'><iframe id=\'' + id + '_cms\' src=\'' + globals.WEB_preview_url + '\' width=\'' + width +'\' height=\'' + height +'\' frameborder=\'0\' seamless=\'seamless\'></iframe></div>");\
					setTimeout(function(){$("#' + id + '").fadeIn("slow")},750);\
					bigIndicator(false,500);}\
				,750);'
			)
	}

	//make sure that the callback is available for this page
	CMS_call()
}

/**
 * @properties={typeid:24,uuid:"E1D222F8-97A7-493C-8F48-BDBB94BDC6E9"}
 */
function EDIT_on() {
	var id = plugins.WebClientUtils.getElementMarkupId(forms.WEB_0F_page__live__web__view.elements.lbl_page)

	plugins.WebClientUtils.executeClientSideJS(
			'setTimeout(function(){if ($("iframe#' + id + '_cms").length) {' +
				'window.frames["' + id + '_cms"].postMessage({method:"editOn"},"*");' +
				//just to make sure that indicator not stuck on
				'bigIndicator(false,500);' +
			'}' +
			//iframe borked, pull it in again
			'else {' +
				'sendNSCommand("WEB_0F_page__live__web.URL_update",true)' +
			'}},1000);'
		)
}

/**
 * @properties={typeid:24,uuid:"DEAB7BA2-EB16-46D3-817D-D934405ADEB2"}
 */
function EDIT_off() {
	var id = plugins.WebClientUtils.getElementMarkupId(forms.WEB_0F_page__live__web__view.elements.lbl_page)

	//editor still showing, hide it
	if (!elements.tab_view.visible) {
		SPLIT_set(false)
	}
	//just toggle edit mode on the page
	else {
		plugins.WebClientUtils.executeClientSideJS(
			'setTimeout(function(){if ($("iframe#' + id + '_cms").length) {' +
				'window.frames["' + id + '_cms"].postMessage({method:"editOff"},"*");' +
				//just to make sure that indicator not stuck on
				'bigIndicator(false,500);' +
			'}' +
			//iframe borked, pull it in again
			'else {' +
				'sendNSCommand("WEB_0F_page__live__web.URL_update")' +
			'}},1000);'
		)
	}
}