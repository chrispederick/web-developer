var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.EditCSS                 = WebDeveloper.EditCSS || {};
WebDeveloper.EditCSS.contentDocument = null;
WebDeveloper.EditCSS.interval        = null;
WebDeveloper.EditCSS.updateFrequency = 500;

// Adds a tab
WebDeveloper.EditCSS.addTab = function(title, css, tabs, panels, position)
{
  var active    = "";
  var templates = "";

  // If the position is 1
  if(position == 1)
  {
    active = "active";
  }

  // Get the edit CSS tab templates
  templates = WebDeveloper.EditCSS.getEditCSSTabTemplates({ active: active, css: css, position: position, title: title });

  WebDeveloper.Common.appendHTML(templates.panel, panels);
  WebDeveloper.Common.appendHTML(templates.tab, tabs);
};

// Applies the CSS
WebDeveloper.EditCSS.apply = function()
{
  // If the content document is set
  if(WebDeveloper.EditCSS.contentDocument)
  {
    WebDeveloper.EditCSS.applyCSS();
  }
};

// Applies the CSS
WebDeveloper.EditCSS.applyCSS = function()
{
  var headElement      = WebDeveloper.Common.getDocumentHeadElement(WebDeveloper.EditCSS.contentDocument);
  var styleBase        = null;
  var styleElement     = null;
  var styles           = null;
  var stylesContainer  = null;
  var stylesContainers = WebDeveloper.EditCSS.getStylesContainers();
  var stylesUpdated    = false;

  // Loop through the styles containers
  for(var i = 0, l = stylesContainers.length; i < l; i++)
  {
    styleElement    = WebDeveloper.EditCSS.contentDocument.getElementById("web-developer-edit-css-styles-" + i);
    stylesContainer = stylesContainers[i];
    styles          = WebDeveloper.EditCSS.getStylesFromContainer(stylesContainer);

    // If the style element does not exist
    if(!styleElement)
    {
      styleBase    = stylesContainer.getAttribute("web-developer-base");
      styleElement = WebDeveloper.EditCSS.contentDocument.createElement("style");

      styleElement.setAttribute("id", "web-developer-edit-css-styles-" + i);
      styleElement.setAttribute("class", "web-developer-edit-css-styles");

      // If the style base is set
      if(styleBase)
      {
        styleElement.setAttribute("xml:base", styleBase);
      }

      headElement.appendChild(styleElement);
    }

    // If the styles have changed
    if(styleElement.textContent != styles)
    {
      styleElement.textContent = styles;
      stylesUpdated            = true;
    }
  }

  return stylesUpdated;
};

// Edits the CSS of the page
WebDeveloper.EditCSS.editCSS = function(edit, contentDocument, locale)
{
  // If editing the CSS
  if(edit)
  {
    var dashboardPanel = null;
    var templates      = WebDeveloper.EditCSS.getEditCSSDashboardTemplates({ dashboardTitle: locale.dashboardTitle, tabId: "edit-css", title: locale.editCSS });

    WebDeveloper.EditCSS.contentDocument = contentDocument;

    dashboardPanel = WebDeveloper.Dashboard.openDashboardTab("edit-css", locale.editCSS, WebDeveloper.EditCSS.contentDocument, templates, locale.dashboardTitle);

    WebDeveloper.EditCSS.retrieveCSS(dashboardPanel, templates.editCSS, locale);
    WebDeveloper.CSS.toggleAllStyleSheets(true, WebDeveloper.EditCSS.contentDocument);
    WebDeveloper.EditCSS.update();
  }
  else
  {
    WebDeveloper.EditCSS.contentDocument = contentDocument;

    WebDeveloper.EditCSS.stopUpdate();
    WebDeveloper.EditCSS.resetDocument();
    WebDeveloper.Dashboard.closeDashboardTab("edit-css", contentDocument);

    WebDeveloper.EditCSS.contentDocument = null;
  }
};

// Returns the edit CSS dashboard HTML template
WebDeveloper.EditCSS.getEditCSSDashboardTemplates = function(parameters)
{
  var dashboardTemplates = {};

  dashboardTemplates.editCSS = '<ul id="web-developer-edit-css-tabs" class="nav nav-tabs"></ul><div id="web-developer-edit-css-panels" class="tab-content"></div>';
  dashboardTemplates.panel   = '<div id="' + parameters.tabId + '-panel" class="active ps-1 pt-1 tab-pane"></div>';
  dashboardTemplates.tab     = '<li id="' + parameters.tabId + '-tab" class="nav-item"><a href="#' + parameters.tabId + '-panel" class="active nav-link" data-bs-target="#' + parameters.tabId + '-panel" data-bs-toggle="tab">' + parameters.title + "</a></li>";

  return dashboardTemplates;
};

// Returns the edit CSS tab HTML template
WebDeveloper.EditCSS.getEditCSSTabTemplates = function(parameters)
{
  var tabTemplates = {};

  tabTemplates.panel = '<div id="edit-css-panel-' + parameters.position + '" class="tab-pane ' + parameters.active + '"><textarea class="font-monospace form-control">' + parameters.css + "</textarea></div>";
  tabTemplates.tab   = '<li id="edit-css-tab-' + parameters.position + '" class="nav-item"><a href="#edit-css-panel-' + parameters.position + '" class="nav-link ' + parameters.active + '" data-bs-target="#edit-css-panel-' + parameters.position + '" data-bs-toggle="tab">' + parameters.title + "</a></li>";

  return tabTemplates;
};

// Returns the styles containers
WebDeveloper.EditCSS.getStylesContainers = function()
{
  var dashboard        = WebDeveloper.Dashboard.getDashboard(WebDeveloper.EditCSS.contentDocument);
  var stylesContainers = [];

  // If the dashboard was found
  if(dashboard)
  {
    stylesContainers = dashboard.contentDocument.getElementById("edit-css-panel").getElementsByTagName("textarea");
  }

  return stylesContainers;
};

// Returns the styles in a container
WebDeveloper.EditCSS.getStylesFromContainer = function(stylesContainer)
{
  return stylesContainer.value;
};

// Resets a document
WebDeveloper.EditCSS.resetDocument = function()
{
  WebDeveloper.Common.removeMatchingElements(".web-developer-edit-css-styles", WebDeveloper.EditCSS.contentDocument);
  WebDeveloper.CSS.toggleAllStyleSheets(false, WebDeveloper.EditCSS.contentDocument);
};

// Resizes the edit CSS elements
WebDeveloper.EditCSS.resize = function(dashboard)
{
  var editCSSPanels = dashboard.contentDocument.getElementById("web-developer-edit-css-panels");

  // If the edit CSS panels exist
  if(editCSSPanels)
  {
    editCSSPanels.style.height = dashboard.offsetHeight - editCSSPanels.offsetTop - 2 + "px";
  }
};

// Retrieves the CSS for the document
WebDeveloper.EditCSS.retrieveCSS = function(dashboardPanel, editCSSPanel, locale)
{
  var documentCSS = WebDeveloper.Content.getDocumentCSS(WebDeveloper.EditCSS.contentDocument, true);

  dashboardPanel.insertAdjacentHTML("beforeend", editCSSPanel);

  chrome.runtime.sendMessage({ errorMessage: "/* " + locale.couldNotLoadCSS + " */", type: "get-url-contents", urls: documentCSS.styleSheets }, function(response)
  {
    var dashboardDocument = WebDeveloper.Dashboard.getDashboard(WebDeveloper.EditCSS.contentDocument).contentDocument;
    var panels            = dashboardDocument.getElementById("web-developer-edit-css-panels");
    var position          = 1;
    var styleSheet        = null;
    var tabs              = dashboardDocument.getElementById("web-developer-edit-css-tabs");

    // Loop through the style sheets
    for(var i = 0, l = response.length; i < l; i++)
    {
      styleSheet = response[i];

      WebDeveloper.EditCSS.addTab(WebDeveloper.Dashboard.formatURL(styleSheet.url), styleSheet.content, tabs, panels, position);

      position++;
    }

    // If there are embedded styles
    if(documentCSS.embedded)
    {
      WebDeveloper.EditCSS.addTab(locale.embeddedStyles, documentCSS.embedded, tabs, panels, position);
    }

    // If there is no CSS
    if(!documentCSS.styleSheets.length && !documentCSS.embedded)
    {
      WebDeveloper.EditCSS.addTab(locale.editCSS, "", tabs, panels, position);
    }

    window.setTimeout(function() { WebDeveloper.EditCSS.resize(WebDeveloper.Dashboard.getDashboard(WebDeveloper.EditCSS.contentDocument)); }, 100);
  });
};

// Stops the CSS updating
WebDeveloper.EditCSS.stopUpdate = function()
{
  // If the interval id is set
  if(WebDeveloper.EditCSS.interval)
  {
    window.clearInterval(WebDeveloper.EditCSS.interval);

    WebDeveloper.EditCSS.interval = null;
  }
};

// Updates the CSS
WebDeveloper.EditCSS.update = function()
{
  // If the update frequency is greater than 0
  if(WebDeveloper.EditCSS.updateFrequency > 0)
  {
    WebDeveloper.EditCSS.interval = window.setInterval(function() { WebDeveloper.EditCSS.apply(); }, WebDeveloper.EditCSS.updateFrequency);
  }
};

// Fixes a non-structured-clonable data error in Firefox
""; // eslint-disable-line no-unused-expressions
