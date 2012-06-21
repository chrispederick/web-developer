var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay										= WebDeveloper.Overlay || {};
WebDeveloper.Overlay.CSS								= WebDeveloper.Overlay.CSS || {};
WebDeveloper.Overlay.CSS.userStyleSheet = null;

// Adds a user style sheet to the page
WebDeveloper.Overlay.CSS.addUserStyleSheet = function(element)
{
	var addStyleSheet = !WebDeveloper.Common.convertToBoolean(element.getAttribute("checked"));
	var documents			= WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
	var i							= 0;
	var l							= 0;

	// If adding a style sheet
	if(addStyleSheet)
	{
		var filePicker = Components.classes["@mozilla.org/filepicker;1"].createInstance(Components.interfaces.nsIFilePicker);

		filePicker.appendFilter(WebDeveloper.Locales.getString("styleSheets"), "*.css");
		filePicker.init(window, WebDeveloper.Locales.getString("addUserStyleSheet"), filePicker.modeOpen);

		// If the user selected a style sheet
		if(filePicker.show() == filePicker.returnOK)
		{
			var inputStream			 = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
			var scriptableStream = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);

			inputStream.init(filePicker.file, parseInt(1, 16), parseInt(444, 8), null);
			scriptableStream.init(inputStream);

			WebDeveloper.Overlay.CSS.userStyleSheet = scriptableStream.read(scriptableStream.available());

			scriptableStream.close();
			inputStream.close();
		}
		else
		{
			addStyleSheet														= false;
			WebDeveloper.Overlay.CSS.userStyleSheet = null;
		}
	}

	// If adding a style sheet and the style sheet is not empty
	if(addStyleSheet && WebDeveloper.Overlay.CSS.userStyleSheet)
	{
		var contentDocument = null;
		var styleElement		= null;

		// Loop through the documents
		for(i = 0, l = documents.length; i < l; i++)
		{
			contentDocument = documents[i];
			styleElement		= contentDocument.createElement("style");

			styleElement.setAttribute("id", "web-developer-add-user-style-sheet");
			styleElement.appendChild(contentDocument.createTextNode(WebDeveloper.Overlay.CSS.userStyleSheet));

			WebDeveloper.Common.getDocumentHeadElement(contentDocument).appendChild(styleElement);
		}

		// If the feature is not active
		if(!WebDeveloper.Storage.isFeatureActive("add-user-style-sheet"))
		{
			WebDeveloper.Storage.toggleFeature("add-user-style-sheet");
		}
	}
	else
	{
		WebDeveloper.Overlay.CSS.userStyleSheet = null;

		// Loop through the documents
		for(i = 0, l = documents.length; i < l; i++)
		{
			WebDeveloper.Common.removeMatchingElements("#web-developer-add-user-style-sheet", documents[i]);
		}

		// If the feature is active
		if(WebDeveloper.Storage.isFeatureActive("add-user-style-sheet"))
		{
			WebDeveloper.Storage.toggleFeature("add-user-style-sheet");
		}
	}
};

// Disables all styles
WebDeveloper.Overlay.CSS.disableAllStyles = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.CSS.toggleAllStyles(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Disables the browser default styles
WebDeveloper.Overlay.CSS.disableBrowserDefaultStyles = function(element)
{
	WebDeveloper.CSS.toggleBrowserDefaultStyles(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Disables embedded styles
WebDeveloper.Overlay.CSS.disableEmbeddedStyles = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.CSS.toggleEmbeddedStyles(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Disables an individual style sheet
WebDeveloper.Overlay.CSS.disableIndividualStyleSheet = function(disableStyleSheetURL)
{
	var styleSheet		= null;
	var styleSheets	= WebDeveloper.Common.getContentDocument().styleSheets;
	var styleSheetURL = null;

	// Loop through the style sheets
	for(var i = 0, l = styleSheets.length; i < l; i++)
	{
		styleSheet		= styleSheets[i];
		styleSheetURL = styleSheet.href;

		// If this is the style sheet to disable
		if(styleSheetURL == disableStyleSheetURL)
		{
			styleSheet.disabled = !styleSheet.disabled;
		}
	}
};

// Disables inline styles
WebDeveloper.Overlay.CSS.disableInlineStyles = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.CSS.toggleInlineStyles(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Disables linked style sheets
WebDeveloper.Overlay.CSS.disableLinkedStyleSheets = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.CSS.toggleLinkedStyleSheets(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Disables print styles
WebDeveloper.Overlay.CSS.disablePrintStyles = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.CSS.togglePrintStyles(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays handheld styles
WebDeveloper.Overlay.CSS.displayHandheldStyles = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));
	var display	= !WebDeveloper.Storage.isFeatureActive(featureId);

	// If displaying handheld styles and print styles are being displayed
	if(display && WebDeveloper.Storage.isFeatureActive("display-print-styles"))
	{
		WebDeveloper.CSS.toggleMediaTypeStyles("print", false, WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
		WebDeveloper.Storage.toggleFeature("display-print-styles");
	}

	WebDeveloper.CSS.toggleMediaTypeStyles("handheld", display, WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
};

// Displays print styles
WebDeveloper.Overlay.CSS.displayPrintStyles = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));
	var display	= !WebDeveloper.Storage.isFeatureActive(featureId);

	// If displaying print styles and handheld styles are being displayed
	if(display && WebDeveloper.Storage.isFeatureActive("display-handheld-styles"))
	{
		WebDeveloper.CSS.toggleMediaTypeStyles("handheld", false, WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
		WebDeveloper.Storage.toggleFeature("display-handheld-styles");
	}

	WebDeveloper.CSS.toggleMediaTypeStyles("print", display, WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
};

// Displays style information for an element
WebDeveloper.Overlay.CSS.displayStyleInformation = function()
{
	var styleInformation = WebDeveloper.Locales.getString("styleInformation");

	// If style information is open in the dashboard
	if(WebDeveloper.Dashboard.isOpenInDashboard(styleInformation))
	{
		WebDeveloper.Dashboard.closeDashboardTab(styleInformation);
	}
	else if(WebDeveloper.Overlay.isDOMInspectorAvailable())
	{
		WebDeveloper.Dashboard.openInDashboard(styleInformation, "chrome://web-developer/content/dashboard/style-information.xul");
	}
	else
	{
		WebDeveloper.Common.displayURLMessage(WebDeveloper.Locales.getString("domInspectorRequired"), "@url@faq/#dom-inspector");
	}
};

// Edits the CSS of the page
WebDeveloper.Overlay.CSS.editCSS = function()
{
	var editCSS = WebDeveloper.Locales.getString("editCSS");

	// If edit CSS is open in the dashboard
	if(WebDeveloper.Dashboard.isOpenInDashboard(editCSS))
	{
		WebDeveloper.Dashboard.closeDashboardTab(editCSS);
	}
	else if(WebDeveloper.Common.pageHasFrames())
	{
		WebDeveloper.Common.displayError(editCSS, WebDeveloper.Locales.getString("framesNotSupported"));
	}
	else
	{
		WebDeveloper.Dashboard.openInDashboard(editCSS, "chrome://web-developer/content/dashboard/edit-css.xul");
	}
};

// Reloads linked style sheets
WebDeveloper.Overlay.CSS.reloadLinkedStyleSheets = function()
{
	WebDeveloper.CSS.reloadLinkedStyleSheets(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
};

// Updates the CSS menu
WebDeveloper.Overlay.CSS.updateCSSMenu = function(suffix)
{
	var command											= document.getElementById("web-developer-edit-css-command");
	var disableAllStyles						= WebDeveloper.Storage.isFeatureActive("disable-all-styles");
	var displayStyleInformationOpen = WebDeveloper.Dashboard.isOpenInDashboard(WebDeveloper.Locales.getString("styleInformation"));
	var editCSSOpen									= WebDeveloper.Dashboard.isOpenInDashboard(WebDeveloper.Locales.getString("editCSS"));
	var menu												= document.getElementById("web-developer-edit-css-" + suffix);

	WebDeveloper.Common.configureElement(command, "checked", editCSSOpen);
	WebDeveloper.Common.configureElement(command, "disabled", disableAllStyles);

	// If the menu exists
	if(menu)
	{
		// If edit CSS is not open and the page has frames
		if(!editCSSOpen && WebDeveloper.Common.pageHasFrames())
		{
			menu.setAttribute("class", "menuitem-iconic");
		}
		else if(menu.hasAttribute("class"))
		{
			menu.removeAttribute("class");
		}
	}

	command = document.getElementById("web-developer-display-style-information-command");
	menu		= document.getElementById("web-developer-display-style-information-" + suffix);

	WebDeveloper.Common.configureElement(command, "checked", displayStyleInformationOpen);
	WebDeveloper.Common.configureElement(command, "disabled", disableAllStyles);

	// If the menu exists
	if(menu)
	{
		// If display style information is not open and the DOM Inspector is not found
		if(!displayStyleInformationOpen && !WebDeveloper.Overlay.isDOMInspectorAvailable())
		{
			menu.setAttribute("class", "menuitem-iconic");
		}
		else if(menu.hasAttribute("class"))
		{
			menu.removeAttribute("class");
		}
	}

	WebDeveloper.Common.configureElement(document.getElementById("web-developer-add-user-style-sheet-command"), "disabled", disableAllStyles);
	WebDeveloper.Common.configureElement(document.getElementById("web-developer-display-styles-media-type-" + suffix), "disabled", disableAllStyles);
	WebDeveloper.Common.configureElement(document.getElementById("web-developer-reload-linked-style-sheets-command"), "disabled", disableAllStyles);
	WebDeveloper.Common.configureElement(document.getElementById("web-developer-use-border-box-model-command"), "disabled", disableAllStyles);
	WebDeveloper.Common.configureElement(document.getElementById("web-developer-view-css-command"), "disabled", disableAllStyles);
	WebDeveloper.Overlay.configureFeatureElement("web-developer-add-user-style-sheet-command", "checked");
	WebDeveloper.Overlay.configureFeatureElement("web-developer-use-border-box-model-command", "checked");
};

// Updates the disable individual style sheet menu
WebDeveloper.Overlay.CSS.updateDisableIndividualStyleSheetMenu = function(menu)
{
	var contentDocument = WebDeveloper.Common.getContentDocument();
	var menuItem				= null;
	var styleSheet			= null;
	var styleSheets			= contentDocument.styleSheets;
	var styleSheetURL		= null;

	WebDeveloper.Overlay.removeGeneratedMenuItems(menu);

	// Loop through the style sheets
	for(var i = 0, l = styleSheets.length; i < l; i++)
	{
		styleSheet		= styleSheets[i];
		styleSheetURL = styleSheet.href;

		// If this is a valid style sheet, is not an line style sheet and is not an alternate style sheet
		if(WebDeveloper.CSS.isValidStyleSheet(styleSheet) && styleSheetURL && styleSheetURL != contentDocument.documentURI)
		{
			menuItem = document.createElement("menuitem");

			menuItem.setAttribute("class", "web-developer-generated-menu");
			menuItem.setAttribute("label", WebDeveloper.Common.removeReloadParameterFromURL(styleSheetURL));
			menuItem.setAttribute("oncommand", "WebDeveloper.Overlay.CSS.disableIndividualStyleSheet('" + styleSheetURL + "')");
			menuItem.setAttribute("type", "checkbox");

			// If the style sheet is disabled
			if(!styleSheet.disabled)
			{
				menuItem.setAttribute("checked", true);
			}

			menu.appendChild(menuItem);
		}
	}

	// If the menu has no children
	if(!menu.hasChildNodes())
	{
		menuItem = document.createElement("menuitem");

		menuItem.setAttribute("class", "webdeveloper-generated-menu");
		menuItem.setAttribute("disabled", true);
		menuItem.setAttribute("label", WebDeveloper.Locales.getString("noStyleSheets"));
		menu.appendChild(menuItem);
	}
};

// Updates the disable styles menu
WebDeveloper.Overlay.CSS.updateDisableStylesMenu = function(suffix)
{
	var disableAllStyles = WebDeveloper.Storage.isFeatureActive("disable-all-styles");

	WebDeveloper.Common.configureElement(document.getElementById("web-developer-disable-browser-default-styles-command"), "disabled", disableAllStyles);
	WebDeveloper.Common.configureElement(document.getElementById("web-developer-disable-embedded-styles-command"), "disabled", disableAllStyles);
	WebDeveloper.Common.configureElement(document.getElementById("web-developer-disable-inline-styles-command"), "disabled", disableAllStyles);
	WebDeveloper.Common.configureElement(document.getElementById("web-developer-disable-linked-style-sheets-command"), "disabled", disableAllStyles);
	WebDeveloper.Common.configureElement(document.getElementById("web-developer-disable-print-styles-command"), "disabled", disableAllStyles);
	WebDeveloper.Common.configureElement(document.getElementById("web-developer-disable-individual-style-sheet-" + suffix), "disabled", disableAllStyles);
	WebDeveloper.Overlay.configureFeatureElement("web-developer-disable-all-styles-command", "checked");
	WebDeveloper.Overlay.configureFeatureElement("web-developer-disable-browser-default-styles-command", "checked");
	WebDeveloper.Overlay.configureFeatureElement("web-developer-disable-embedded-styles-command", "checked");
	WebDeveloper.Overlay.configureFeatureElement("web-developer-disable-inline-styles-command", "checked");
	WebDeveloper.Overlay.configureFeatureElement("web-developer-disable-linked-style-sheets-command", "checked");
	WebDeveloper.Overlay.configureFeatureElement("web-developer-disable-print-styles-command", "checked");
};

// Updates the display styles by media type menu
WebDeveloper.Overlay.CSS.updateDisplayStylesMediaTypeMenu = function()
{
	WebDeveloper.Overlay.configureFeatureElement("web-developer-display-handheld-styles-command", "checked");
	WebDeveloper.Overlay.configureFeatureElement("web-developer-display-print-styles-command", "checked");
};

// Uses the border box model
WebDeveloper.Overlay.CSS.useBorderBoxModel = function(element)
{
	WebDeveloper.CSS.useBorderBoxModel(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Displays the CSS
WebDeveloper.Overlay.CSS.viewCSS = function()
{
	var data = WebDeveloper.Content.getCSS();

	data.theme = WebDeveloper.Preferences.getExtensionStringPreference("syntax.highlight.theme");

	WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-css.html"), data, WebDeveloper.Overlay.CSS.getViewCSSLocale());
};
