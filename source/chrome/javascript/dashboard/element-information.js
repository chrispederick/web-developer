var WebDeveloper = WebDeveloper || {};

WebDeveloper.ElementInformation        = WebDeveloper.ElementInformation || {};
WebDeveloper.ElementInformation.locale = null;

// Displays the information for an element
WebDeveloper.ElementInformation.displayElementInformation = function(element)
{
  var contentDocument    = WebDeveloper.Common.getContentDocument();
  var generatedDocument  = WebDeveloper.Dashboard.getDashboard(contentDocument).contentDocument;
  var elementInformation = generatedDocument.getElementById("element-information-content");
  var dispatchEvent      = generatedDocument.createEvent("Events");

  WebDeveloper.Common.empty(elementInformation);
  elementInformation.appendChild(WebDeveloper.ElementInformation.generateElementInformation(element, contentDocument, generatedDocument, "none"));

  dispatchEvent.initEvent("web-developer-initialize-ancestors-event", true, false);
  generatedDocument.querySelector("#element-information-content .breadcrumb").dispatchEvent(dispatchEvent);
};

// Returns a string from the locale
WebDeveloper.ElementInformation.getLocaleString = function(name)
{
  return WebDeveloper.ElementInformation.locale[name];
};

// Initializes the display element information dashboard
WebDeveloper.ElementInformation.initialize = function(display, contentDocument, locale)
{
  // If displaying the element information dashboard
  if(display)
  {
    WebDeveloper.ElementInformation.locale                 = locale;
    window.WebDeveloperEvents                              = window.WebDeveloperEvents || {};
    window.WebDeveloperEvents.ElementInformation           = window.WebDeveloperEvents.ElementInformation || {};
    window.WebDeveloperEvents.ElementInformation.click     = WebDeveloper.ElementInformation.click;
    window.WebDeveloperEvents.ElementInformation.mouseOver = WebDeveloper.ElementAncestors.mouseOver;

    WebDeveloper.ElementInformation.loadDashboardTemplates(contentDocument, locale);

    contentDocument.addEventListener("click", window.WebDeveloperEvents.ElementInformation.click, true);
    contentDocument.addEventListener("mouseover", window.WebDeveloperEvents.ElementInformation.mouseOver, false);
  }
  else
  {
    WebDeveloper.Dashboard.closeDashboardTab("element-information", contentDocument);

    contentDocument.removeEventListener("click", window.WebDeveloperEvents.ElementInformation.click, true);
    contentDocument.removeEventListener("mouseover", window.WebDeveloperEvents.ElementInformation.mouseOver, false);
    WebDeveloper.ElementAncestors.removeOutline(contentDocument);

    window.WebDeveloperEvents.ElementInformation = null;
  }

  WebDeveloper.Common.toggleStyleSheet("toolbar/element-ancestors.css", "web-developer-element-information-styles", contentDocument, false);
};

// Loads the dashboard templates
WebDeveloper.ElementInformation.loadDashboardTemplates = function(contentDocument, locale)
{
  // Get the dashboard templates
  chrome.extension.sendMessage({ "dashboardTitle": locale.dashboardTitle, "selectAnElementDisplayInformation": locale.selectAnElementDisplayInformation, "tabId": "element-information", "title": locale.elementInformation, "type": "get-element-information-dashboard-templates" }, function(response)
  {
    // If the dashboard template was returned - sometimes this fails
    if(response.dashboard)
    {
      var dashboardPanel = WebDeveloper.Dashboard.openDashboardTab("element-information", locale.elementInformation, contentDocument, response);

      dashboardPanel.innerHTML = response.elementInformation;

      dashboardPanel.addEventListener("click", WebDeveloper.ElementInformation.clickOutput, false);

      window.setTimeout(function() { WebDeveloper.ElementInformation.resize(WebDeveloper.Dashboard.getDashboard(contentDocument)); }, 100);
    }
    else
    {
      WebDeveloper.ElementInformation.loadDashboardTemplates(contentDocument, locale);
    }
  });
};

// Resizes the element information elements
WebDeveloper.ElementInformation.resize = function(dashboard)
{
  var elementInformationPanel = dashboard.contentDocument.getElementById("element-information-panel");

  // If the element information panel exists
  if(elementInformationPanel)
  {
    elementInformationPanel.style.height = (dashboard.offsetHeight - elementInformationPanel.offsetTop - 38) + "px";
  }
};

