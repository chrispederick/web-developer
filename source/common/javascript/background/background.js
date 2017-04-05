var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Background = WebDeveloper.Background || {};

// Converts an RGB color into a hex color
WebDeveloper.Background.convertRGBToHex = function(rgb)
{
  var blue  = parseInt(rgb[2], 10).toString(16).toLowerCase();
  var green = parseInt(rgb[1], 10).toString(16).toLowerCase();
  var red   = parseInt(rgb[0], 10).toString(16).toLowerCase();

  // If the color is only 1 character
  if(blue.length == 1)
  {
    blue = "0" + blue;
  }

  // If the color is only 1 character
  if(green.length == 1)
  {
    green = "0" + green;
  }

  // If the color is only 1 character
  if(red.length == 1)
  {
    red = "0" + red;
  }

  return "#" + red + green + blue;
};

// Gets the current color
WebDeveloper.Background.getColor = function(x, y, eventType)
{
  chrome.tabs.captureVisibleTab(null, function(dataUrl)
  {
    var image = new Image();

    image.src = dataUrl;

    image.onload = function()
    {
      var canvas           = document.createElement("canvas");
      var color            = null;
      var context          = canvas.getContext("2d");
      var devicePixelRatio = window.devicePixelRatio;

      canvas.height = image.naturalHeight;
      canvas.width  = image.naturalWidth;

      context.clearRect(0, 0, image.naturalWidth, image.naturalHeight);
      context.drawImage(image, 0, 0);

      color = WebDeveloper.Background.convertRGBToHex(context.getImageData(x * devicePixelRatio, y * devicePixelRatio, 1, 1).data);

      chrome.tabs.executeScript(null, { code: "WebDeveloper.ColorPicker.setColor('" + color + "', '" + eventType + "')" });
    };
  });

  return {};
};

// Returns the edit CSS dashboard HTML template
WebDeveloper.Background.getEditCSSDashboardTemplates = function(parameters)
{
  return { dashboard: ich.dashboard(parameters, true), editCSS: ich.editCSSPanel(parameters, true), panel: ich.dashboardPanel(parameters, true), tab: ich.dashboardTab(parameters, true) };
};

// Returns the edit CSS tab HTML template
WebDeveloper.Background.getEditCSSTabTemplates = function(parameters)
{
  return { panel: ich.editCSSTabPanel(parameters, true), tab: ich.editCSSTab(parameters, true) };
};

// Returns the element information dashboard HTML template
WebDeveloper.Background.getElementInformationDashboardTemplates = function(parameters)
{
  return { dashboard: ich.dashboard(parameters, true), elementInformation: ich.elementInformationPanel(parameters, true), panel: ich.dashboardPanel(parameters, true), tab: ich.dashboardTab(parameters, true) };
};

// Gets the styles from CSS
WebDeveloper.Background.getStylesFromCSS = function(cssDocuments)
{
  var contentDocument = null;
  var cssContent      = null;
  var styles          = "";
  var documents       = cssDocuments.documents;
  var styleSheets     = [];

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];
    styleSheets     = styleSheets.concat(contentDocument.styleSheets);

    // If there are embedded styles
    if(contentDocument.embedded)
    {
      styles += contentDocument.embedded;
    }
  }

  cssContent = WebDeveloper.Background.getURLContents(styleSheets, "");

  // Loop through the CSS content
  for(i = 0, l = cssContent.length; i < l; i++)
  {
    styles += cssContent[i].content;
  }

  return { css: styles };
};

// Gets the content from a URL
WebDeveloper.Background.getURLContent = function(url, errorMessage)
{
  var content = null;

  // Try to get the content
  try
  {
    var request = new XMLHttpRequest();

    // Chrome no longer allows a timeout set on synchronous requests
    // request.timeout = WebDeveloper.Common.requestTimeout;

    request.ontimeout = function()
    {
      content = errorMessage;
    };

    request.open("get", url, false);
    request.send(null);

    content = request.responseText;
  }
  catch(exception)
  {
    content = errorMessage;
  }

  return content;
};

// Gets the content from a set of URLs
WebDeveloper.Background.getURLContents = function(urls, errorMessage)
{
  var url         = null;
  var urlContents = [];

  // Loop through the urls
  for(var i = 0, l = urls.length; i < l; i++)
  {
    url = urls[i];

    urlContents.push({ content: WebDeveloper.Background.getURLContent(url, errorMessage), url: url });
  }

  return urlContents;
};

// Initializes a generated tab
WebDeveloper.Background.initializeGeneratedTab = function(url, data, locale)
{
  var extensionTab = null;
  var tabs         = chrome.extension.getViews({ type: "tab" });

  // Loop through the tabs
  for(var i = 0, l = tabs.length; i < l; i++)
  {
    extensionTab = tabs[i];

    // If the tab has a matching URL and has not been initialized
    if(extensionTab.location.href == url && !extensionTab.WebDeveloper.Generated.initialized)
    {
      extensionTab.WebDeveloper.Generated.initialized = true;

      extensionTab.WebDeveloper.Generated.initialize(data, locale);
    }
  }
};

// Initializes a validation tab
WebDeveloper.Background.initializeValidationTab = function(url, data)
{
  var extensionTab = null;
  var tabs         = chrome.extension.getViews({ type: "tab" });

  // Loop through the tabs
  for(var i = 0, l = tabs.length; i < l; i++)
  {
    extensionTab = tabs[i];

    // If the tab has a matching URL and has not been initialized
    if(extensionTab.location.href == url && !extensionTab.WebDeveloper.Validation.initialized)
    {
      extensionTab.WebDeveloper.Validation.initialized = true;

      extensionTab.WebDeveloper.Validation.initialize(data);
    }
  }
};

// Handles any background messages
WebDeveloper.Background.message = function(message, sender, sendResponse)
{
  // If the message type is to get the current color
  if(message.type == "get-color")
  {
    sendResponse(WebDeveloper.Background.getColor(message.x, message.y, message.eventType));
  }
  else if(message.type == "get-edit-css-dashboard-templates")
  {
    sendResponse(WebDeveloper.Background.getEditCSSDashboardTemplates({ dashboardTitle: message.dashboardTitle, tabId: message.tabId, title: message.title }));
  }
  else if(message.type == "get-edit-css-tab-templates")
  {
    sendResponse(WebDeveloper.Background.getEditCSSTabTemplates({ active: message.active, css: message.css, position: message.position, title: message.title }));
  }
  else if(message.type == "get-element-information-dashboard-templates")
  {
    sendResponse(WebDeveloper.Background.getElementInformationDashboardTemplates({ dashboardTitle: message.dashboardTitle, selectAnElementDisplayInformation: message.selectAnElementDisplayInformation, tabId: message.tabId, title: message.title }));
  }
  else if(message.type == "get-storage-item")
  {
    sendResponse({ value: WebDeveloper.Storage.getItem(message.item) });
  }
  else if(message.type == "get-url-contents")
  {
    sendResponse(WebDeveloper.Background.getURLContents(message.urls, message.errorMessage));
  }
  else if(message.type == "set-storage-item")
  {
    WebDeveloper.Storage.setItem(message.item, message.value);

    // No response required
    sendResponse({});
  }
};

// Opens a generated tab
WebDeveloper.Background.openGeneratedTab = function(tabURL, tabIndex, data, locale)
{
  chrome.tabs.create({ index: tabIndex + 1, url: tabURL }, function(openedTab)
  {
    var tabLoaded = function(tabId, tabInformation)
    {
      // If this is the opened tab and it finished loading
      if(tabId == openedTab.id && tabInformation.status && tabInformation.status == "complete")
      {
        WebDeveloper.Background.initializeGeneratedTab(tabURL, data, locale);

        chrome.tabs.onUpdated.removeListener(tabLoaded);
      }
    };

    chrome.tabs.onUpdated.addListener(tabLoaded);
  });
};

// Validates the CSS of the local page
WebDeveloper.Background.validateLocalCSS = function(tabURL, tabIndex, css)
{
  chrome.tabs.create({ index: tabIndex + 1, url: tabURL }, function(openedTab)
  {
    var tabLoaded = function(tabId, tabInformation)
    {
      // If this is the opened tab and it finished loading
      if(tabId == openedTab.id && tabInformation.status == "complete")
      {
        WebDeveloper.Background.initializeValidationTab(tabURL, WebDeveloper.Background.getStylesFromCSS(css));

        chrome.tabs.onUpdated.removeListener(tabLoaded);
      }
    };

    chrome.tabs.onUpdated.addListener(tabLoaded);
  });
};

// Validates the HTML of the local page
WebDeveloper.Background.validateLocalHTML = function(tabURL, tabIndex, validateURL)
{
  chrome.tabs.create({ index: tabIndex + 1, url: tabURL }, function(openedTab)
  {
    var tabLoaded = function(tabId, tabInformation)
    {
      // If this is the opened tab and it finished loading
      if(tabId == openedTab.id && tabInformation.status == "complete")
      {
        WebDeveloper.Background.initializeValidationTab(tabURL, WebDeveloper.Background.getURLContents([validateURL], ""));

        chrome.tabs.onUpdated.removeListener(tabLoaded);
      }
    };

    chrome.tabs.onUpdated.addListener(tabLoaded);
  });
};

chrome.runtime.onMessage.addListener(WebDeveloper.Background.message);
