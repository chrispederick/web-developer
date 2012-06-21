var WebDeveloper = WebDeveloper || {};

WebDeveloper.EditHTML									= WebDeveloper.EditHTML || {};
WebDeveloper.EditHTML.interval				= null;
WebDeveloper.EditHTML.oldHTML					= null;
WebDeveloper.EditHTML.selectedTab			= 0;
WebDeveloper.EditHTML.updateFrequency = 250;

// Applies the HTML
WebDeveloper.EditHTML.apply = function()
{
	var contentBody = WebDeveloper.Common.getDocumentBodyElement(WebDeveloper.Common.getContentDocument());
	var newHTML			= document.getElementById("web-developer-edit-html-browser").contentDocument.defaultView.WebDeveloper.Dashboard.getContent();

	// If the content body is set and the new HTML is not the same as the old HTML
	if(contentBody && newHTML != WebDeveloper.EditHTML.oldHTML)
	{
		contentBody.innerHTML					= newHTML;
		WebDeveloper.EditHTML.oldHTML = newHTML;
	}
};

// Clear the HTML
WebDeveloper.EditHTML.clear = function()
{
	document.getElementById("web-developer-edit-html-browser").contentDocument.defaultView.WebDeveloper.Dashboard.setContent("");
};

// Initializes the edit HTML dashboard
WebDeveloper.EditHTML.initialize = function()
{
	// Try to get the tab browser
	try
	{
		var tabBrowser = WebDeveloper.Common.getTabBrowser();

		// If the tab browser is set
		if(tabBrowser)
		{
			var tabContainer = tabBrowser.tabContainer;

			WebDeveloper.EditHTML.selectedTab = tabBrowser.mTabBox.selectedIndex;

			WebDeveloper.EditHTML.retrieveHTML();
			WebDeveloper.EditHTML.update();

			// If the tab container is set
			if(tabContainer)
			{
				tabContainer.addEventListener("TabSelect", WebDeveloper.EditHTML.tabSelect, false);
			}

			// If the theme is not set
			if(WebDeveloper.Preferences.getExtensionStringPreference("syntax.highlight.theme") == "none")
			{
				document.getElementById("web-developer-search").hidden = true;
			}
			else
			{
				document.getElementById("web-developer-search-dashboard-text").addEventListener("keypress", WebDeveloper.EditHTML.search, false);
			}

			tabBrowser.addEventListener("load", WebDeveloper.EditHTML.pageLoad, true);
		}
	}
	catch(exception)
	{
		// Ignore
	}
};

// Reinitializes the dashboard when the page changes
WebDeveloper.EditHTML.pageLoad = function(event)
{
	var originalTarget = event.originalTarget;

	// If the event came from an HTML document and it is not a frame
	if(originalTarget instanceof HTMLDocument && !originalTarget.defaultView.frameElement)
	{
		// If the page is generated
		if(originalTarget.documentURI == "about:blank")
		{
			WebDeveloper.EditHTML.stopUpdate();
			window.setTimeout(WebDeveloper.EditHTML.retrieveHTML, 1000);
			window.setTimeout(WebDeveloper.EditHTML.update, 1000);
		}
		else
		{
			WebDeveloper.EditHTML.retrieveHTML();
		}
	}
};

// Resets the edited HTML
WebDeveloper.EditHTML.reset = function()
{
	WebDeveloper.Common.getTabBrowser().reload();
};

// Retrieves the HTML
WebDeveloper.EditHTML.retrieveHTML = function()
{
	var contentBody = WebDeveloper.Common.getDocumentBodyElement(WebDeveloper.Common.getContentDocument());

	// If the content body is set
	if(contentBody)
	{
		var editor = document.getElementById("web-developer-edit-html-browser").contentDocument.defaultView.WebDeveloper.Dashboard;

		editor.initializeEditor("htmlmixed", WebDeveloper.Preferences.getExtensionStringPreference("syntax.highlight.theme"));
		editor.setContent(contentBody.innerHTML);
	}

	WebDeveloper.EditHTML.apply();
};

// Saves the HTML
WebDeveloper.EditHTML.save = function()
{
	var contentDocument = WebDeveloper.Common.getContentDocument();
	var filePicker			= Components.classes["@mozilla.org/filepicker;1"].createInstance(Components.interfaces.nsIFilePicker);
	var result					= null;
	var url							= Components.classes["@mozilla.org/network/standard-url;1"].createInstance(Components.interfaces.nsIURL);

	url.spec										= contentDocument.documentURI;
	filePicker.defaultExtension = url.fileExtension;
	filePicker.defaultString		= url.fileName;

	filePicker.init(window, WebDeveloper.Locales.getString("saveHTML"), filePicker.modeSave);

	result = filePicker.show();

	// If the user selected a file
	if(result == filePicker.returnOK || result == filePicker.returnReplace)
	{
		var file											 = filePicker.file;
		var webBrowserPersistInterface = Components.interfaces.nsIWebBrowserPersist;
		var webBrowserPersist					 = Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(webBrowserPersistInterface);

		webBrowserPersist.persistFlags = webBrowserPersistInterface.PERSIST_FLAGS_AUTODETECT_APPLY_CONVERSION | webBrowserPersistInterface.PERSIST_FLAGS_FROM_CACHE | webBrowserPersistInterface.PERSIST_FLAGS_REPLACE_EXISTING_FILES;

		// If the file does not exist
		if(!file.exists())
		{
			file.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, parseInt(644, 8));
		}

		webBrowserPersist.saveDocument(contentDocument, file, null, contentDocument.contentType, webBrowserPersistInterface.ENCODE_FLAGS_ENCODE_BASIC_ENTITIES, 0);
	}
};

// Searches the HTML
WebDeveloper.EditHTML.search = function(event)
{
	// If the event is not set or the event key code is set and is 13
	if(!event || (event.keyCode && event.keyCode == 13))
	{
		var query = document.getElementById("web-developer-search-dashboard-text").value;

		// If the query is set
		if(query)
		{
			document.getElementById("web-developer-edit-html-browser").contentDocument.defaultView.WebDeveloper.Dashboard.search(query);
		}
	}
};

// Stops the HTML updating
WebDeveloper.EditHTML.stopUpdate = function()
{
	// If the interval id is set
	if(WebDeveloper.EditHTML.interval)
	{
		window.clearInterval(WebDeveloper.EditHTML.intervalId);

		WebDeveloper.EditHTML.interval = null;
	}
};

// Handles a browser tab being selected
WebDeveloper.EditHTML.tabSelect = function(event)
{
	var tabBrowser	= WebDeveloper.Common.getTabBrowser();
	var selectedTab = tabBrowser.mTabBox.selectedIndex;

	// If the selected tab is different
	if(selectedTab != WebDeveloper.EditHTML.selectedTab)
	{
		tabBrowser.browsers[WebDeveloper.EditHTML.selectedTab].contentDocument.location.reload(false);

		WebDeveloper.EditHTML.selectedTab = selectedTab;

		WebDeveloper.EditHTML.retrieveHTML();
	}
};

// Uninitializes edit HTML
WebDeveloper.EditHTML.uninitialize = function()
{
	// Try to get the tab browser
	try
	{
		var tabBrowser = WebDeveloper.Common.getTabBrowser();

		WebDeveloper.EditHTML.stopUpdate();

		// If the tab browser is set
		if(tabBrowser)
		{
			var tabContainer = tabBrowser.tabContainer;

			document.getElementById("web-developer-search-dashboard-text").removeEventListener("keypress", WebDeveloper.EditHTML.search, false);
			tabBrowser.removeEventListener("load", WebDeveloper.EditHTML.pageLoad, true);
			tabBrowser.reload();

			// If the tab container is set
			if(tabContainer)
			{
				tabContainer.removeEventListener("TabSelect", WebDeveloper.EditHTML.tabSelect, false);
			}
		}
	}
	catch(exception)
	{
		// Ignore
	}
};

// Updates the HTML
WebDeveloper.EditHTML.update = function()
{
	// If the update frequency is greater than 0
	if(WebDeveloper.EditHTML.updateFrequency > 0)
	{
		WebDeveloper.EditHTML.interval = window.setInterval(WebDeveloper.EditHTML.apply, WebDeveloper.EditHTML.updateFrequency);
	}
};
