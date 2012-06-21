var WebDeveloper = WebDeveloper || {};

WebDeveloper.EditCSS								 = WebDeveloper.EditCSS || {};
WebDeveloper.EditCSS.selectedBrowser = null;

// Adds a tab
WebDeveloper.EditCSS.addTab = function(title, styles, stylesURL, tabs, tabPanels, color)
{
	var browser  = document.createElement("browser");
	var load		 = null;
	var tab			 = document.createElement("tab");
	var tabPanel = document.createElement("tabpanel");
	var url			 = Components.classes["@mozilla.org/network/standard-url;1"].createInstance(Components.interfaces.nsIURL);

	url.spec = stylesURL;

	tab.setAttribute("label", title);
	tabs.appendChild(tab);

	browser.setAttribute("disablehistory", "true");
	browser.setAttribute("enablehistory", "false");
	browser.setAttribute("flex", "1");
	browser.setAttribute("src", "chrome://web-developer/content/dashboard/edit-css.html");
	browser.setAttribute("web-developer-base", url.directory);
	tabPanel.appendChild(browser);
	tabPanels.appendChild(tabPanel);

	load = (function(styleContent)
	{
		var handler = function(event)
		{
			var contentDocument = browser.contentDocument;
			var dispatchEvent		= contentDocument.createEvent("Events");
			var headElement			= WebDeveloper.Common.getDocumentHeadElement(contentDocument);

			dispatchEvent.initEvent("web-developer-dashboard-event", true, false);
			headElement.setAttribute("data-web-developer", JSON.stringify({ "content": styleContent, "theme": color }));
			headElement.dispatchEvent(dispatchEvent);

			browser.removeEventListener("load", handler, true);
		};

		return handler;
	})(styles);

	browser.addEventListener("load", load, true);
};

// Applies the CSS
WebDeveloper.EditCSS.apply = function()
{
	var stylesUpdated = WebDeveloper.EditCSS.applyCSS();

	// If the styles were updated
	if(stylesUpdated)
	{
		var body = WebDeveloper.Common.getDocumentBodyElement(WebDeveloper.Common.getContentDocument());

		// Hiding and showing the body forces a repaint in Firefox - needed for initial :first-letter changes
		body.style.display = "none";

		window.setTimeout(function() { body.style.display = "block"; }, 0);
	}
};

// Clear the CSS
WebDeveloper.EditCSS.clear = function()
{
	WebDeveloper.EditCSS.getSelectedBrowser().WebDeveloper.Dashboard.setContent("");
};

// Returns the selected panel
WebDeveloper.EditCSS.getSelectedBrowser = function()
{
	var selectedPanel = document.getElementById("web-developer-edit-css-tab-box").selectedPanel;

	// If the selected panel is not set
	if(!selectedPanel)
	{
		selectedPanel = document.getElementById("web-developer-edit-css-tab-panels").firstChild;
	}

	return selectedPanel.getElementsByTagName("browser")[0].contentDocument.defaultView;
};

// Returns the selected tab
WebDeveloper.EditCSS.getSelectedTab = function()
{
	var selectedTab = document.getElementById("web-developer-edit-css-tab-box").selectedTab;

	// If the selected tab is not set
	if(!selectedTab)
	{
		selectedTab = document.getElementById("web-developer-edit-css-tabs").firstChild;
	}

	return selectedTab;
};

// Returns the styles containers
WebDeveloper.EditCSS.getStylesContainers = function()
{
	return document.getElementById("web-developer-edit-css-tab-panels").getElementsByTagName("browser");
};

// Returns the styles in a container
WebDeveloper.EditCSS.getStylesFromContainer = function(stylesContainer)
{
	return stylesContainer.contentDocument.defaultView.WebDeveloper.Dashboard.getContent();
};

// Initializes the edit CSS dashboard
WebDeveloper.EditCSS.initialize = function()
{
	// Try to get the tab browser
	try
	{
		var tabBrowser = WebDeveloper.Common.getTabBrowser();

		// If the tab browser is set
		if(tabBrowser)
		{
			var contentDocument = WebDeveloper.Common.getContentDocument();
			var tabContainer		= tabBrowser.tabContainer;
			var theme						= WebDeveloper.Preferences.getExtensionStringPreference("syntax.highlight.theme");

			WebDeveloper.EditCSS.selectedBrowser = WebDeveloper.Common.getSelectedBrowser();

			WebDeveloper.EditCSS.updatePinButton();
			WebDeveloper.EditCSS.retrieveCSS(contentDocument, theme);
			WebDeveloper.CSS.toggleAllStyleSheets(true, contentDocument);
			WebDeveloper.EditCSS.update(contentDocument);

			// If the tab container is set
			if(tabContainer)
			{
				tabContainer.addEventListener("TabSelect", WebDeveloper.EditCSS.tabSelect, false);
			}

			// If the theme is not set
			if(theme == "none")
			{
				document.getElementById("web-developer-search").hidden = true;
			}
			else
			{
				document.getElementById("web-developer-search-dashboard-text").addEventListener("keypress", WebDeveloper.EditCSS.search, false);
			}

			tabBrowser.addEventListener("load", WebDeveloper.EditCSS.pageLoad, true);
		}
	}
	catch(exception)
	{
		// Ignore
	}
};

// Opens new CSS
WebDeveloper.EditCSS.open = function()
{
	var filePicker = Components.classes["@mozilla.org/filepicker;1"].createInstance(Components.interfaces.nsIFilePicker);

	filePicker.appendFilter(WebDeveloper.Locales.getString("styleSheetDescription"), "*.css");
	filePicker.init(window, WebDeveloper.Locales.getString("openStyleSheet"), filePicker.modeOpen);

	// If the user selected a style sheet
	if(filePicker.show() == filePicker.returnOK)
	{
		var inputStream			 = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
		var scriptableStream = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);

		inputStream.init(filePicker.file, parseInt(1, 16), parseInt(444, 8), null);
		scriptableStream.init(inputStream);

		WebDeveloper.EditCSS.getSelectedBrowser().setContent(scriptableStream.read(scriptableStream.available()));

		scriptableStream.close();
		inputStream.close();
	}
};

// Reinitializes the dashboard when the page changes
WebDeveloper.EditCSS.pageLoad = function(event)
{
	var originalTarget = event.originalTarget;

	// If the event came from an HTML document and it is not a frame
	if(originalTarget instanceof HTMLDocument && !originalTarget.defaultView.frameElement)
	{
		var contentDocument = WebDeveloper.Common.getContentDocument();

		WebDeveloper.EditCSS.stopUpdate();

		// If not pinning the CSS
		if(!WebDeveloper.Preferences.getExtensionBooleanPreference("edit.css.pin"))
		{
			WebDeveloper.Common.removeMatchingElements(".web-developer-edit-css-styles", contentDocument);
			WebDeveloper.EditCSS.retrieveCSS(contentDocument, WebDeveloper.Preferences.getExtensionStringPreference("syntax.highlight.theme"));
		}

		WebDeveloper.CSS.toggleAllStyleSheets(true, contentDocument);
		WebDeveloper.EditCSS.update(contentDocument);
	}
};

// Resets the CSS
WebDeveloper.EditCSS.reset = function()
{
	var contentDocument = WebDeveloper.Common.getContentDocument();

	WebDeveloper.EditCSS.stopUpdate();
	WebDeveloper.EditCSS.resetDocument(contentDocument);
	WebDeveloper.EditCSS.retrieveCSS(contentDocument);
	WebDeveloper.CSS.toggleAllStyleSheets(true, contentDocument);
	WebDeveloper.EditCSS.update(contentDocument);
};

// Retrieves the CSS for the document
WebDeveloper.EditCSS.retrieveCSS = function(contentDocument, theme)
{
	var documentCSS	 = WebDeveloper.Content.getDocumentCSS(contentDocument);
	var documentURL	 = contentDocument.documentURI;
	var errorMessage = "/* " + WebDeveloper.Locales.getString("couldNotLoadCSS") + " */";
	var styleSheet	 = null;
	var tabs				 = document.getElementById("web-developer-edit-css-tabs");
	var tabPanels		 = document.getElementById("web-developer-edit-css-tab-panels");

	WebDeveloper.Common.empty(tabs);
	WebDeveloper.Common.empty(tabPanels);

	// Loop through the style sheets
	for(var i = 0, l = documentCSS.styleSheets.length; i < l; i++)
	{
		styleSheet = documentCSS.styleSheets[i];

		WebDeveloper.EditCSS.addTab(WebDeveloper.Dashboard.formatURL(styleSheet), WebDeveloper.Common.getContentFromURL(styleSheet, errorMessage), styleSheet, tabs, tabPanels, theme);
	}

	// If there are embedded styles
	if(documentCSS.embedded)
	{
		WebDeveloper.EditCSS.addTab(WebDeveloper.Locales.getString("embeddedStyles"), documentCSS.embedded, documentURL, tabs, tabPanels, theme);
	}

	// If there is no CSS
	if(!documentCSS.styleSheets.length && !documentCSS.embedded)
	{
		WebDeveloper.EditCSS.addTab(WebDeveloper.Locales.getString("editCSS"), "", documentURL, tabs, tabPanels, theme);
	}

	document.getElementById("web-developer-edit-css-tabs").firstChild.setAttribute("selected", true);
};

// Saves the CSS
WebDeveloper.EditCSS.save = function()
{
	var css				 = WebDeveloper.EditCSS.getSelectedBrowser().WebDeveloper.Dashboard.getContent();
	var filePicker = Components.classes["@mozilla.org/filepicker;1"].createInstance(Components.interfaces.nsIFilePicker);
	var result		 = null;

	filePicker.defaultExtension = "css";
	filePicker.defaultString		= WebDeveloper.EditCSS.getSelectedTab().getAttribute("label");

	filePicker.appendFilter(WebDeveloper.Locales.getString("styleSheetDescription"), "*.css");
	filePicker.init(window, WebDeveloper.Locales.getString("saveStyleSheet"), filePicker.modeSave);

	result = filePicker.show();

	// If the user selected a style sheet
	if(result == filePicker.returnOK || result == filePicker.returnReplace)
	{
		var file				 = filePicker.file;
		var outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);

		// If the file does not exist
		if(!file.exists())
		{
			file.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, parseInt(644, 8));
		}

		outputStream.init(file, parseInt(4, 16) | parseInt(8, 16) | parseInt(20, 16), parseInt(644, 8), null);
		outputStream.write(css, css.length);
		outputStream.close();
	}
};

// Searches the CSS
WebDeveloper.EditCSS.search = function(event)
{
	// If the event is not set or the event key code is set and is 13
	if(!event || (event.keyCode && event.keyCode == 13))
	{
		var query = document.getElementById("web-developer-search-dashboard-text").value;

		// If the query is set
		if(query)
		{
			WebDeveloper.EditCSS.getSelectedBrowser().WebDeveloper.Dashboard.search(query);
		}
	}
};

// Handles a browser tab being selected
WebDeveloper.EditCSS.tabSelect = function(event)
{
	var selectedBrowser = WebDeveloper.Common.getSelectedBrowser();

	// If the selected tab is different
	if(selectedBrowser != WebDeveloper.EditCSS.selectedBrowser)
	{
		var contentDocument = WebDeveloper.Common.getContentDocument();

		// If not pinning the CSS
		if(!WebDeveloper.Preferences.getExtensionBooleanPreference("edit.css.pin"))
		{
			WebDeveloper.EditCSS.retrieveCSS(contentDocument);
		}

		WebDeveloper.CSS.toggleAllStyleSheets(true, contentDocument);
		WebDeveloper.EditCSS.update(contentDocument);
		WebDeveloper.EditCSS.resetDocument(WebDeveloper.EditCSS.selectedBrowser.contentDocument);

		WebDeveloper.EditCSS.selectedBrowser = selectedBrowser;
	}
};

// Toggles pinning of the CSS
WebDeveloper.EditCSS.togglePin = function()
{
	WebDeveloper.Preferences.setExtensionBooleanPreference("edit.css.pin", !WebDeveloper.Preferences.getExtensionBooleanPreference("edit.css.pin"));
	WebDeveloper.EditCSS.updatePinButton();
};

// Uninitializes edit CSS
WebDeveloper.EditCSS.uninitialize = function()
{
	// Try to get the tab browser
	try
	{
		var tabBrowser = WebDeveloper.Common.getTabBrowser();

		WebDeveloper.EditCSS.stopUpdate();
		WebDeveloper.EditCSS.resetDocument(WebDeveloper.Common.getContentDocument());

		// If the tab browser is set
		if(tabBrowser)
		{
			var tabContainer = tabBrowser.tabContainer;

			document.getElementById("web-developer-search-dashboard-text").removeEventListener("keypress", WebDeveloper.EditCSS.search, false);
			tabBrowser.removeEventListener("load", WebDeveloper.EditCSS.pageLoad, true);

			// If the tab container is set
			if(tabContainer)
			{
				tabContainer.removeEventListener("TabSelect", WebDeveloper.EditCSS.tabSelect, false);
			}
		}
	}
	catch(exception)
	{
		// Ignore
	}
};

// Updates the pin CSS button
WebDeveloper.EditCSS.updatePinButton = function()
{
	var pin				= WebDeveloper.Preferences.getExtensionBooleanPreference("edit.css.pin");
	var pinButton = document.getElementById("web-developer-pin-dashboard");
	var tooltip	= null;

	// If the pin button exists
	if(pinButton)
	{
		// If pinning the CSS
		if(pin)
		{
			tooltip = WebDeveloper.Locales.getString("unpinCSS");
		}
		else
		{
			tooltip = WebDeveloper.Locales.getString("pinCSS");
		}

		pinButton.checked = pin;

		pinButton.setAttribute("tooltiptext", tooltip);
	}
};
