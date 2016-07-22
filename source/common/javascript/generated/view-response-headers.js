var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Generated                = WebDeveloper.Generated || {};
WebDeveloper.Generated.requestTimeout = 10000;

// Displays the headers
WebDeveloper.Generated.displayHeaders = function(url, headers, status, statusText)
{
  var childElement = document.createElement("a");
  var content      = document.getElementById("content");
  var element      = document.createElement("h2");

  childElement.appendChild(document.createTextNode(url));
  childElement.setAttribute("href", url);
  element.appendChild(childElement);
  content.appendChild(element);

  element = document.createElement("pre");

  element.appendChild(document.createTextNode(headers + "\n" + status + " " + statusText));
  content.appendChild(element);
};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
  var request = null;
  var url     = data.pageURL;

  WebDeveloper.Generated.emptyContent();
  WebDeveloper.Generated.localizeHeader(locale);
  WebDeveloper.Generated.setPageTitle(locale.responseHeaders, data, locale);

  // Try to get the response headers
  try
  {
    request         = new XMLHttpRequest();
    request.timeout = WebDeveloper.Generated.requestTimeout;

    request.onreadystatechange = function()
    {
      // If the request completed
      if(request.readyState == 4)
      {
        WebDeveloper.Generated.displayHeaders(url, request.getAllResponseHeaders(), request.status, request.statusText);
      }
    };

    request.ontimeout = function()
    {
      WebDeveloper.Generated.displayHeaders(url, locale.couldNotLoadResponseHeaders, "", "");
    };

    request.open("get", url);
    request.send(null);
  }
  catch(exception)
  {
    WebDeveloper.Generated.displayHeaders(url, locale.couldNotLoadResponseHeaders, "", "");
  }
};
