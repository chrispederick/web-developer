var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.EditCSS                 = WebDeveloper.EditCSS || {};
WebDeveloper.EditCSS.contentDocument = null;
WebDeveloper.EditCSS.interval        = null;
WebDeveloper.EditCSS.updateFrequency = 500;

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

// Resets a document
WebDeveloper.EditCSS.resetDocument = function()
{
  WebDeveloper.Common.removeMatchingElements(".web-developer-edit-css-styles", WebDeveloper.EditCSS.contentDocument);
  WebDeveloper.CSS.toggleAllStyleSheets(false, WebDeveloper.EditCSS.contentDocument);
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
    WebDeveloper.EditCSS.interval = window.setInterval(WebDeveloper.EditCSS.apply, WebDeveloper.EditCSS.updateFrequency);
  }
};
