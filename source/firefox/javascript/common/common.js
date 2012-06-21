var WebDeveloper = WebDeveloper || {};

WebDeveloper.Common = WebDeveloper.Common || {};

// Clears a notification
WebDeveloper.Common.clearNotification = function()
{
	var notificationBox			 = WebDeveloper.Common.getTabBrowser().getNotificationBox();
	var existingNotification = notificationBox.getNotificationWithValue("web-developer-notification");

	// If there is an existing notification
	if(existingNotification)
	{
		notificationBox.removeNotification(existingNotification);
	}
};

// Configures the element with the given attribute and value
WebDeveloper.Common.configureElement = function(element, attribute, value)
{
	// If the element exists
	if(element)
	{
		element.setAttribute(attribute, value);
	}
};

// Converts a value to a boolean
WebDeveloper.Common.convertToBoolean = function(value)
{
	// If the value is false
	if(value == "false")
	{
		return false;
	}

	return Boolean(value).valueOf();
};

// Displays an error message
WebDeveloper.Common.displayError = function(title, message)
{
	Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService).alert(null, title, message);
};

// Displays a notification
WebDeveloper.Common.displayNotification = function(notification, substitutes)
{
	var message					= null;
	var notificationBox = WebDeveloper.Common.getTabBrowser().getNotificationBox();

	// If there are substitutes
	if(substitutes)
	{
		message = WebDeveloper.Locales.getFormattedString(notification, substitutes);
	}
	else
	{
		message = WebDeveloper.Locales.getString(notification);
	}

	WebDeveloper.Common.clearNotification();
	notificationBox.appendNotification(message, "web-developer-notification", "chrome://web-developer/skin/button.png", notificationBox.PRIORITY_INFO_HIGH, null);
};

// Displays a message with a URL
WebDeveloper.Common.displayURLMessage = function(message, url)
{
	window.openDialog("chrome://web-developer/content/dialogs/message.xul", "web-developer-message-dialog", "centerscreen,chrome,modal", message, url);
};

// Formats a file size
WebDeveloper.Common.formatFileSize = function(fileSize, bytesLocale, kilobytesLocale)
{
	// If the file size is set
	if(fileSize)
	{
		// If the file size is greater than a kilobyte
		if(fileSize > 1024)
		{
			return Math.round(fileSize / 1024) + " " + kilobytesLocale;
		}
		else
		{
			return fileSize + " " + bytesLocale;
		}
	}
	else
	{
		return "";
	}
};

// Returns a chrome URL
WebDeveloper.Common.getChromeURL = function(url)
{
	return "chrome://web-developer/content/" + url;
};

// Returns the id for a command
WebDeveloper.Common.getCommandId = function(id)
{
	// If the id is set
	if(id)
	{
		return "web-developer-" + id + "-command";
	}

	return "";
};

// Returns the current content document
WebDeveloper.Common.getContentDocument = function()
{
	return WebDeveloper.Common.getSelectedBrowser().contentDocument;
};

// Gets the content from a URL
WebDeveloper.Common.getContentFromURL = function(url, errorMessage)
{
	var content = null;

	// If the URL is not entirely generated
	if(url.indexOf("wyciwyg://") !== 0)
	{
		var cacheService = Components.classes["@mozilla.org/network/cache-service;1"].getService(Components.interfaces.nsICacheService);
		var cacheSession = null;
		var file				 = null;
		var readAccess	 = Components.interfaces.nsICache.ACCESS_READ;

		// Try to get the file from the HTTP cache
		try
		{
			cacheSession											= cacheService.createSession("HTTP", 0, true);
			cacheSession.doomEntriesIfExpired = false;
			file															= cacheSession.openCacheEntry(url, readAccess, false);
		}
		catch(exception)
		{
			// Try to get the file from the FTP cache
			try
			{
				cacheSession											= cacheService.createSession("FTP", 0, true);
				cacheSession.doomEntriesIfExpired = false;
				file															= cacheSession.openCacheEntry(url, readAccess, false);
			}
			catch(exception2)
			{
				file = null;
			}
		}

		// If there is a file
		if(file)
		{
			var encoding				= null;
			var responseHeaders = null;

			// Try to get the cache encoding
			try
			{
				// Specific case-sensitive required
				encoding = file.getMetaDataElement("request-Accept-Encoding");
			}
			catch(exception3)
			{
				encoding = null;

				// Try to get the response headers
				try
				{
					// Specific case-sensitive required
					responseHeaders = file.getMetaDataElement("response-head");
				}
				catch(exception4)
				{
					responseHeaders = null;
				}
			}

			// If the cache is not GZIP encoded
			if((!encoding || encoding.indexOf("gzip") == -1) && (!responseHeaders || (responseHeaders.indexOf("Content-Encoding: deflate") == -1 && responseHeaders.indexOf("Content-Encoding: gzip") == -1)))
			{
				var inputStream			 = file.openInputStream(0);
				var scriptableStream = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);

				scriptableStream.init(inputStream);

				content = scriptableStream.read(scriptableStream.available());

				scriptableStream.close();
				inputStream.close();
			}
		}

		// If the content has not been loaded
		if(!content)
		{
			// Try to load the URL
			try
			{
				var request = new XMLHttpRequest();

				request.open("get", url, false);
				request.send(null);

				content = request.responseText;
			}
			catch(exception5)
			{
				content = errorMessage;
			}
		}
	}

	return content;
};

// Returns the current content window
WebDeveloper.Common.getContentWindow = function()
{
	return WebDeveloper.Common.getSelectedBrowser().contentWindow;
};

// Returns a CSS property
WebDeveloper.Common.getCSSProperty = function(property)
{
	// If the property is set
	if(property)
	{
		return property[0];
	}

	return null;
};

// Returns the id for a feature
WebDeveloper.Common.getFeatureId = function(id)
{
	// If the id is set
	if(id)
	{
		return id.replace("web-developer-", "").replace("-command", "");
	}

	return "";
};

// Gets the size of a file
WebDeveloper.Common.getFileSize = function(url)
{
	var cacheService = Components.classes["@mozilla.org/network/cache-service;1"].getService(Components.interfaces.nsICacheService);
	var cacheSession = null;
	var file				 = null;
	var fileSize		 = null;
	var readAccess	 = Components.interfaces.nsICache.ACCESS_READ;

	// Try to get the file size from the HTTP cache
	try
	{
		cacheSession											= cacheService.createSession("HTTP", 0, true);
		cacheSession.doomEntriesIfExpired = false;
		file															= cacheSession.openCacheEntry(url, readAccess, false);

		// If there is a file
		if(file)
		{
			fileSize = file.dataSize;
		}
	}
	catch(exception)
	{
		// Try to get the file size from the FTP cache
		try
		{
			cacheSession											= cacheService.createSession("FTP", 0, true);
			cacheSession.doomEntriesIfExpired = false;
			file															= cacheSession.openCacheEntry(url, readAccess, false);

			// If there is a file
			if(file)
			{
				fileSize = file.dataSize;
			}
		}
		catch(exception2)
		{
			fileSize = null;
		}
	}

	// If the file size could not be retrieved from the cache
	if(!fileSize)
	{
		// Try to download the file
		try
		{
			var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);

			fileSize = ioService.newChannelFromURI(ioService.newURI(url, null, null)).open().available();
		}
		catch(exception3)
		{
			fileSize = null;
		}
	}

	return fileSize;
};

// Returns the main window
WebDeveloper.Common.getMainWindow = function()
{
	return Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
};

// Returns the selected browser
WebDeveloper.Common.getSelectedBrowser = function()
{
	return WebDeveloper.Common.getTabBrowser().selectedBrowser;
};

// Returns the tab browser
WebDeveloper.Common.getTabBrowser = function()
{
	return WebDeveloper.Common.getMainWindow().gBrowser;
};

// Returns the tab that contains the given document
WebDeveloper.Common.getTabForDocument = function(documentElement)
{
	var tabBrowser = WebDeveloper.Common.getTabBrowser();

	// If the tabs are set (requires Firefox 3.6)
	if(tabBrowser.tabs)
	{
		return tabBrowser.tabs[tabBrowser.getBrowserIndexForDocument(documentElement)];
	}
	else
	{
		return tabBrowser.tabContainer.getItemAtIndex(tabBrowser.getBrowserIndexForDocument(documentElement));
	}
};

// Returns true if the extension is running on a Mac
WebDeveloper.Common.isMac = function()
{
	// If the OS is set to Darwin
	if(Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).OS == "Darwin")
	{
		return true;
	}

	return false;
};

// Logs a message
WebDeveloper.Common.log = function(message)
{
	// If the message is not set
	if(!message)
	{
		message = "null";
	}

	Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService).logStringMessage(message);
};

// Opens the URL in a new tab
WebDeveloper.Common.openURL = function(url)
{
	var tabBrowser = WebDeveloper.Common.getTabBrowser();
	var newTab		 = tabBrowser.addTab(url);

	tabBrowser.selectedTab = newTab;

	return newTab;
};

// Returns true if the page has frames
WebDeveloper.Common.pageHasFrames = function()
{
	// If the content document has a frame element
	if(WebDeveloper.Common.getContentDocument().getElementsByTagName("frame").length > 0)
	{
		return true;
	}

	return false;
};

// Removes the given attribute from an element
WebDeveloper.Common.removeElementAttribute = function(element, attribute)
{
	// If the element exists
	if(element)
	{
		element.removeAttribute(attribute);
	}
};
