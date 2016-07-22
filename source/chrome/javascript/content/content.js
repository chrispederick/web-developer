var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Content = WebDeveloper.Content || {};

// Returns any domain cookies
WebDeveloper.Content.getDomainCookies = function(allCookies)
{
  var documents     = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var domainCookies = [];

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    // Try to get the host
    try
    {
      domainCookies = domainCookies.concat(WebDeveloper.Content.filterCookies(allCookies, documents[i].location.hostname, "/", false));
    }
    catch(exception)
    {
      // Ignore
    }
  }

  return domainCookies;
};

// Returns the details for the location
WebDeveloper.Content.getLocationDetails = function()
{
  var windowLocation  = WebDeveloper.Common.getContentWindow().location;
  var locationDetails = {};

  locationDetails.host = windowLocation.hostname;
  locationDetails.path = windowLocation.pathname;

  return locationDetails;
};

// Returns any path cookies
WebDeveloper.Content.getPathCookies = function(allCookies)
{
  var contentDocument = null;
  var documents       = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var pathCookies     = [];

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // Try to get the host and path
    try
    {
      pathCookies = pathCookies.concat(WebDeveloper.Content.filterCookies(allCookies, contentDocument.location.hostname, contentDocument.location.pathname, false));
    }
    catch(exception)
    {
      // Ignore
    }
  }

  return pathCookies;
};

// Handles any content messages
WebDeveloper.Content.message = function(message, sender, sendResponse)
{
  // If the message type is to get anchors
  if(message.type == "get-anchors")
  {
    sendResponse(WebDeveloper.Content.getAnchors());
  }
  else if(message.type == "get-broken-images")
  {
    sendResponse(WebDeveloper.Content.getBrokenImages());
  }
  else if(message.type == "get-colors")
  {
    sendResponse(WebDeveloper.Content.getColors());
  }
  else if(message.type == "get-cookies")
  {
    sendResponse(WebDeveloper.Content.getCookies(message.allCookies));
  }
  else if(message.type == "get-css")
  {
    sendResponse(WebDeveloper.Content.getCSS());
  }
  else if(message.type == "get-document-details")
  {
    sendResponse(WebDeveloper.Content.getDocumentDetails());
  }
  else if(message.type == "get-document-outline")
  {
    sendResponse(WebDeveloper.Content.getDocumentOutline());
  }
  else if(message.type == "get-domain-cookies")
  {
    sendResponse(WebDeveloper.Content.getDomainCookies(message.allCookies));
  }
  else if(message.type == "get-duplicate-ids")
  {
    sendResponse(WebDeveloper.Content.getDuplicateIds());
  }
  else if(message.type == "get-forms")
  {
    sendResponse(WebDeveloper.Content.getForms());
  }
  else if(message.type == "get-images")
  {
    sendResponse(WebDeveloper.Content.getImages());
  }
  else if(message.type == "get-javascript")
  {
    sendResponse(WebDeveloper.Content.getJavaScript());
  }
  else if(message.type == "get-links")
  {
    sendResponse(WebDeveloper.Content.getLinks());
  }
  else if(message.type == "get-location-details")
  {
    sendResponse(WebDeveloper.Content.getLocationDetails());
  }
  else if(message.type == "get-meta-tags")
  {
    sendResponse(WebDeveloper.Content.getMetaTags());
  }
  else if(message.type == "get-path-cookies")
  {
    sendResponse(WebDeveloper.Content.getPathCookies(message.allCookies));
  }
  else if(message.type == "get-window-size")
  {
    sendResponse(WebDeveloper.Content.getWindowSize());
  }
  else
  {
    // Unknown message
    sendResponse({});
  }
};

chrome.extension.onMessage.addListener(WebDeveloper.Content.message);
