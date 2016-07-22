var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Common = WebDeveloper.Common || {};

// Clears a notification
WebDeveloper.Common.clearNotification = function()
{
  var notificationBox      = WebDeveloper.Common.getTabBrowser().getNotificationBox();
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
  var message         = null;
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

// Handles the completion of a file size request
WebDeveloper.Common.fileSizeRequestComplete = function(fileSize, fileSizeRequest, configuration)
{
  fileSizeRequest.fileObject.size = fileSize;

  configuration.fileSizeRequestsRemaining--;

  // If there are no file size requests remaining
  if(configuration.fileSizeRequestsRemaining === 0)
  {
    configuration.callback();
  }
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

    return fileSize + " " + bytesLocale;
  }

  return "";
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

// Returns the compressed file size
WebDeveloper.Common.getCompressedFileSize = function(fileSize, fileSizeRequest, configuration, callback)
{
  var url = fileSizeRequest.url;

  // Gets the file from the cache
  WebDeveloper.Common.getFileFromCache(url, function(file)
  {
    // If the file is set
    if(file)
    {
      fileSize.size = file.dataSize;

      callback(file);
    }
    else
    {
      var ioService = null;

      // Try to download the file
      try
      {
        ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);

        fileSize.size = ioService.newChannelFromURI2(ioService.newURI(url, null, null), null, null, null, 0, 1).open().available();
      }
      catch(exception)
      {
        // Try to download the file
        try
        {
          ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);

          fileSize.size = ioService.newChannelFromURI(ioService.newURI(url, null, null)).open().available();
        }
        catch(exception2)
        {
          fileSize.size = null;
        }
      }

      callback();
    }
  });
};

// Returns the current content document
WebDeveloper.Common.getContentDocument = function()
{
  return WebDeveloper.Common.getSelectedBrowser().contentDocument;
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

// Returns a file from the cache
WebDeveloper.Common.getFileFromCache = function(url, callback)
{
  var cacheSession = null;

  // Try to get the file from the cache
  try
  {
    cacheSession                      = Components.classes["@mozilla.org/network/cache-service;1"].getService(Components.interfaces.nsICacheService).createSession("HTTP", 0, true);
    cacheSession.doomEntriesIfExpired = false;

    /* eslint-disable indent */
    // Open the cache entry asynchronously
    cacheSession.asyncOpenCacheEntry(url, Components.interfaces.nsICache.ACCESS_READ,
    {
      // Handles the cache entry being available
      onCacheEntryAvailable: function(descriptor)
      {
        callback(descriptor);
      }
    });
    /* eslint-enable indent */
  }
  catch(exception)
  {
    callback();
  }
};

// Returns the size of a file
WebDeveloper.Common.getFileSize = function(fileSizeRequest, configuration)
{
  var fileSize = {};

  // Get the compressed file size
  WebDeveloper.Common.getCompressedFileSize(fileSize, fileSizeRequest, configuration, function(file)
  {
    // If including the uncompressed size and the file is compressed
    if(fileSizeRequest.includeUncompressed && WebDeveloper.Common.isFileCompressed(file))
    {
      WebDeveloper.Common.getUncompressedFileSize(fileSize, fileSizeRequest, configuration);
    }
    else
    {
      WebDeveloper.Common.fileSizeRequestComplete(fileSize, fileSizeRequest, configuration);
    }
  });
};

// Returns the file sizes of the given files
WebDeveloper.Common.getFileSizes = function(fileSizeRequests, callback)
{
  var fileSizeRequestsRemaining = fileSizeRequests.length;
  var configuration             = { callback: callback, fileSizeRequestsRemaining: fileSizeRequestsRemaining };

  // Loop through the file size requests
  for(var i = 0, l = fileSizeRequests.length; i < l; i++)
  {
    WebDeveloper.Common.getFileSize(fileSizeRequests[i], configuration);
  }
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

  return tabBrowser.tabContainer.getItemAtIndex(tabBrowser.getBrowserIndexForDocument(documentElement));
};

// Gets the uncompressed size of a file
WebDeveloper.Common.getUncompressedFileSize = function(fileSize, fileSizeRequest, configuration)
{
  // Requests the URL content
  WebDeveloper.Common.requestURLContent(fileSizeRequest.url, "", function(urlContent)
  {
    // If the URL content is set and is larger than the compressed size
    if(urlContent && urlContent.length > fileSize.size)
    {
      fileSize.uncompressedSize = urlContent.length;
    }

    WebDeveloper.Common.fileSizeRequestComplete(fileSize, fileSizeRequest, configuration);
  });
};

// Gets the content from a URL
WebDeveloper.Common.getURLContent = function(urlContentRequest, errorMessage, configuration)
{
  var url = urlContentRequest.url;

  // If the URL is not entirely generated
  if(url.indexOf("wyciwyg://") !== 0)
  {
    var content = null;

    // Gets the file from the cache
    WebDeveloper.Common.getFileFromCache(url, function(file)
    {
      // If the file is set and is not compressed
      if(file && !WebDeveloper.Common.isFileCompressed(file))
      {
        // Try to load the content from the file
        try
        {
          var inputStream      = file.openInputStream(0);
          var scriptableStream = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);

          scriptableStream.init(inputStream);

          content = scriptableStream.read(scriptableStream.available());

          scriptableStream.close();
          inputStream.close();
        }
        catch(exception)
        {
          content = null;
        }
      }

      // If the content has been loaded
      if(content)
      {
        WebDeveloper.Common.urlContentRequestComplete(content, urlContentRequest, configuration);
      }
      else
      {
        // Requests the URL content
        WebDeveloper.Common.requestURLContent(url, errorMessage, function(urlContent)
        {
          WebDeveloper.Common.urlContentRequestComplete(urlContent, urlContentRequest, configuration);
        });
      }
    });
  }
};

// Returns true if the file is compressed
WebDeveloper.Common.isFileCompressed = function(file)
{
  // If there is a file
  if(file)
  {
    var encoding        = null;
    var responseHeaders = null;

    // Try to get the cache encoding
    try
    {
      // Specific case-sensitive required
      encoding = file.getMetaDataElement("request-Accept-Encoding");
    }
    catch(exception4)
    {
      encoding = null;

      // Try to get the response headers
      try
      {
        // Specific case-sensitive required
        responseHeaders = file.getMetaDataElement("response-head");
      }
      catch(exception5)
      {
        responseHeaders = null;
      }
    }

    // If the cache is not GZIP encoded
    if((!encoding || encoding.indexOf("gzip") == -1) && (!responseHeaders || responseHeaders.indexOf("Content-Encoding: deflate") == -1 && responseHeaders.indexOf("Content-Encoding: gzip") == -1))
    {
      return false;
    }
  }

  return true;
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
  var newTab     = tabBrowser.addTab(url);

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

// Requests the URL content
WebDeveloper.Common.requestURLContent = function(url, errorMessage, callback)
{
  // Try to request the URL
  try
  {
    var request = new XMLHttpRequest();

    request.timeout = WebDeveloper.Common.requestTimeout;

    request.onreadystatechange = function()
    {
      // If the request completed
      if(request.readyState == 4)
      {
        callback(request.responseText);
      }
    };

    request.ontimeout = function()
    {
      callback(errorMessage);
    };

    request.open("get", url);
    request.send(null);
  }
  catch(exception)
  {
    callback(errorMessage);
  }
};
