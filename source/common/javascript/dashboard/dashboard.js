var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Dashboard          = WebDeveloper.Dashboard || {};
WebDeveloper.Dashboard.resizing = false;

// Adjusts the bottom margin of the body
WebDeveloper.Dashboard.adjustBodyBottomMargin = function(contentDocument, height)
{
  WebDeveloper.Common.getDocumentBodyElement(contentDocument).style.setProperty("margin-bottom", parseInt(height, 10) + 20 + "px", "important");
};

// Closes a dashboard tab
WebDeveloper.Dashboard.closeDashboardTab = function(tabId, contentDocument)
{
  var dashboardDocument = WebDeveloper.Dashboard.getDashboard(contentDocument).contentDocument;

  WebDeveloper.Common.removeMatchingElements("#" + tabId + "-panel, #" + tabId + "-tab", dashboardDocument);

  // If the last tab on the dashboard was closed
  if(dashboardDocument.querySelectorAll("#web-developer-dashboard-tabs > li").length === 0)
  {
    WebDeveloper.Dashboard.removeDashboard(contentDocument);
  }
};

// Converts a title to an id
WebDeveloper.Dashboard.convertTitleToId = function(title)
{
  return "web-developer-" + title.toLowerCase().replace(" ", "-");
};

// Create the dashboard
WebDeveloper.Dashboard.createDashboard = function(contentDocument, dashboardHTML)
{
  var dashboard         = contentDocument.createElement("iframe");
  var dashboardDocument = null;
  var resizer           = null;

  dashboard.setAttribute("id", "web-developer-dashboard");

  WebDeveloper.Common.getDocumentBodyElement(contentDocument).appendChild(dashboard);

  dashboardDocument                           = dashboard.contentDocument;
  window.WebDeveloperEvents                   = window.WebDeveloperEvents || {};
  window.WebDeveloperEvents.Dashboard         = window.WebDeveloperEvents.Dashboard || {};
  window.WebDeveloperEvents.Dashboard.mouseUp = WebDeveloper.Dashboard.mouseUp;

  WebDeveloper.Common.toggleStyleSheet("/dashboard/style-sheets/dashboard.css", "web-developer-dashboard-styles", contentDocument, false);
  WebDeveloper.Common.toggleStyleSheet("/dashboard/style-sheets/common.css", "web-developer-dashboard-styles", dashboardDocument, false);

  WebDeveloper.Common.getDocumentBodyElement(dashboardDocument).innerHTML = dashboardHTML;

  WebDeveloper.Common.includeJavaScript("/common/javascript/jquery/jquery.js", dashboardDocument, function()
  {
    WebDeveloper.Common.includeJavaScript("/common/javascript/bootstrap/tab.js", dashboardDocument, function()
    {
      WebDeveloper.Common.includeJavaScript("/dashboard/javascript/html/dashboard.js", dashboardDocument);
    });
  });

  resizer = dashboardDocument.getElementById("web-developer-dashboard-resizer");

  contentDocument.addEventListener("mouseup", window.WebDeveloperEvents.Dashboard.mouseUp, false);
  dashboardDocument.addEventListener("mousemove", WebDeveloper.Dashboard.mouseMove, false);
  dashboardDocument.addEventListener("mouseup", WebDeveloper.Dashboard.mouseUp, false);
  resizer.addEventListener("mousedown", WebDeveloper.Dashboard.resizerMouseDown, false);

  // Get the dashboard templates
  chrome.runtime.sendMessage({ item: "dashboard_height", type: "get-storage-item" }, function(response)
  {
    var height = response.value;

    // If the dashboard height value was returned
    if(height)
    {
      var pixels = height.indexOf("px");

      // If there are pixels in the height
      if(pixels != -1)
      {
        height = height.substring(0, pixels);
      }

      WebDeveloper.Dashboard.resize(height);
    }
  });
};

// Formats a URL
WebDeveloper.Dashboard.formatURL = function(url)
{
  // If the URL is set
  if(url)
  {
    var lastSlashIndex   = url.lastIndexOf("/");
    var queryStringIndex = url.indexOf("?", lastSlashIndex);

    // If there is no query string
    if(queryStringIndex == -1)
    {
      return url.substring(lastSlashIndex + 1);
    }

    return url.substring(lastSlashIndex + 1, queryStringIndex);
  }

  return url;
};

// Returns the dashboard
WebDeveloper.Dashboard.getDashboard = function(contentDocument)
{
  return contentDocument.getElementById("web-developer-dashboard");
};

// Handles the mouse move event
WebDeveloper.Dashboard.mouseMove = function(event)
{
  // If resizing the dashboard
  if(WebDeveloper.Dashboard.resizing)
  {
    WebDeveloper.Dashboard.resize(WebDeveloper.Dashboard.getDashboard(WebDeveloper.Common.getContentDocument()).offsetHeight - event.pageY);
  }
};

// Handles the mouse up event
WebDeveloper.Dashboard.mouseUp = function()
{
  WebDeveloper.Dashboard.resizing = false;
};

// Opens a dashboard tab
WebDeveloper.Dashboard.openDashboardTab = function(tabId, title, contentDocument, templates)
{
  var dashboard         = WebDeveloper.Dashboard.getDashboard(contentDocument);
  var dashboardDocument = null;
  var panels            = null;
  var tabs              = null;

  // If the dashboard does not already exist
  if(!dashboard)
  {
    WebDeveloper.Dashboard.createDashboard(contentDocument, templates.dashboard);

    dashboard = WebDeveloper.Dashboard.getDashboard(contentDocument);
  }

  dashboardDocument = dashboard.contentDocument;

  panels = dashboardDocument.getElementById("web-developer-dashboard-panels");
  tabs   = dashboardDocument.getElementById("web-developer-dashboard-tabs");

  WebDeveloper.Common.removeClass(panels.querySelector(".active"), "active");
  WebDeveloper.Common.removeClass(tabs.querySelector(".active"), "active");

  WebDeveloper.Common.appendHTML(templates.panel, panels, dashboardDocument);
  WebDeveloper.Common.appendHTML(templates.tab, tabs, dashboardDocument);

  return dashboardDocument.getElementById(tabId + "-panel");
};

// Removes the dashboard
WebDeveloper.Dashboard.removeDashboard = function(contentDocument)
{
  WebDeveloper.Common.removeMatchingElements("#web-developer-dashboard", contentDocument);
  WebDeveloper.Common.toggleStyleSheet("/dashboard/style-sheets/dashboard.css", "web-developer-dashboard-styles", contentDocument, false);

  contentDocument.removeEventListener("mouseup", window.WebDeveloperEvents.Dashboard.mouseUp, false);

  window.WebDeveloperEvents.Dashboard = null;
};

// Resizes the dashboard
WebDeveloper.Dashboard.resize = function(height)
{
  var contentDocument = WebDeveloper.Common.getContentDocument();
  var dashboard       = WebDeveloper.Dashboard.getDashboard(contentDocument);

  dashboard.style.setProperty("height", height + "px", "important");

  WebDeveloper.Dashboard.adjustBodyBottomMargin(contentDocument, height);
  WebDeveloper.EditCSS.resize(dashboard);
  WebDeveloper.ElementInformation.resize(dashboard);

  // Store the dashboard height
  chrome.runtime.sendMessage({ item: "dashboard_height", type: "set-storage-item", value: height }, function()
  {
    // Ignore
  });
};

// Handles the resizer mouse down event
WebDeveloper.Dashboard.resizerMouseDown = function(event)
{
  // If the click was not a right click
  if(event.button != 2)
  {
    WebDeveloper.Dashboard.resizing = true;
  }
};
