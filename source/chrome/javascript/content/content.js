var WebDeveloper = WebDeveloper || {};

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

// Handles any content requests
WebDeveloper.Content.request = function(request, sender, sendResponse)
{
  // If the request type is to get anchors
  if(request.type == "get-anchors")
  {
    sendResponse(WebDeveloper.Content.getAnchors());
  }
  else if(request.type == "get-broken-images")
  {
    sendResponse(WebDeveloper.Content.getBrokenImages());
  }
  else if(request.type == "get-colors")
  {
    sendResponse(WebDeveloper.Content.getColors());
  }
  else if(request.type == "get-cookies")
  {
    sendResponse(WebDeveloper.Content.getCookies(request.allCookies));
  }
  else if(request.type == "get-css")
  {
    sendResponse(WebDeveloper.Content.getCSS());
  }
  else if(request.type == "get-document-details")
  {
    sendResponse(WebDeveloper.Content.getDocumentDetails());
  }
  else if(request.type == "get-document-outline")
  {
    sendResponse(WebDeveloper.Content.getDocumentOutline());
  }
  else if(request.type == "get-domain-cookies")
  {
    sendResponse(WebDeveloper.Content.getDomainCookies(request.allCookies));
  }
  else if(request.type == "get-duplicate-ids")
  {
    sendResponse(WebDeveloper.Content.getDuplicateIds());
  }
  else if(request.type == "get-forms")
  {
    sendResponse(WebDeveloper.Content.getForms());
  }
  else if(request.type == "get-images")
  {
    sendResponse(WebDeveloper.Content.getImages());
  }
  else if(request.type == "get-javascript")
  {
    sendResponse(WebDeveloper.Content.getJavaScript());
  }
  else if(request.type == "get-links")
  {
    sendResponse(WebDeveloper.Content.getLinks());
  }
  else if(request.type == "get-location-details")
  {
    sendResponse(WebDeveloper.Content.getLocationDetails());
  }
  else if(request.type == "get-meta-tags")
  {
    sendResponse(WebDeveloper.Content.getMetaTags());
  }
  else if(request.type == "get-path-cookies")
  {
    sendResponse(WebDeveloper.Content.getPathCookies(request.allCookies));
  }
  else if(request.type == "get-window-size")
  {
    sendResponse(WebDeveloper.Content.getWindowSize());
  }
  else
  {
    // Unknown request
    sendResponse({});
  }
};

chrome.extension.onRequest.addListener(WebDeveloper.Content.request);
