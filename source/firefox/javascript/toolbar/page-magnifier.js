var WebDeveloper = WebDeveloper || {};

WebDeveloper.PageMagnifier = WebDeveloper.PageMagnifier || {};

// Creates the page magnifier
WebDeveloper.PageMagnifier.createPageMagnifier = function()
{
  var browserBoxObject = WebDeveloper.Common.getSelectedBrowser().boxObject;
  var container        = document.getElementById("web-developer-page-magnifier-container");

  WebDeveloper.PageMagnifier.update(0, 0);

  container.addEventListener("DOMMouseScroll", WebDeveloper.PageMagnifier.mouseScroll, true);
  window.addEventListener("mousemove", WebDeveloper.PageMagnifier.mouseMove, false);

  container.style.left = (browserBoxObject.x + 50) + "px";
  container.style.top  = (browserBoxObject.y + 50) + "px";
  container.hidden     = false;
};

// Creates the page magnifier toolbar
WebDeveloper.PageMagnifier.createToolbar = function()
{
  document.getElementById("web-developer-magnification-level").value = WebDeveloper.Preferences.getExtensionStringPreference("magnification.level");

  WebDeveloper.Common.configureElement(document.getElementById("web-developer-page-magnifier-toolbar"), "hidden", false);
};

// Displays a page magnifier
WebDeveloper.PageMagnifier.displayPageMagnifier = function(display)
{
  // If displaying a page magnifier
  if(display)
  {
    WebDeveloper.PageMagnifier.createPageMagnifier();
    WebDeveloper.PageMagnifier.createToolbar();
  }
  else
  {
    WebDeveloper.PageMagnifier.removePageMagnifier();
    WebDeveloper.PageMagnifier.removeToolbar();
  }
};

// Handles the mouse move event
WebDeveloper.PageMagnifier.mouseMove = function(event)
{
  var canvas      = document.getElementById("web-developer-page-magnifier");
  var eventTarget = event.target;

  // If the canvas and event target are set and the canvas is the event target
  if(canvas && eventTarget && canvas == eventTarget)
  {
    var container = document.getElementById("web-developer-page-magnifier-container");

    // If the container is set
    if(container)
    {
      var browserBoxObject   = WebDeveloper.Common.getSelectedBrowser().boxObject;
      var browserXPosition   = browserBoxObject.x;
      var browserYPosition   = browserBoxObject.y;
      var canvasHalfHeight   = canvas.height / 2;
      var canvasHalfWidth    = canvas.width / 2;
      var containerXPosition = event.clientX - canvasHalfWidth;
      var containerYPosition = event.clientY - canvasHalfHeight;
      var documentElement    = WebDeveloper.Common.getContentDocument().documentElement;
      var magnificationLevel = parseFloat(WebDeveloper.Preferences.getExtensionStringPreference("magnification.level"));
      var magnifierXPosition = event.clientX - browserXPosition - (canvasHalfWidth / magnificationLevel) + documentElement.scrollLeft;
      var magnifierYPosition = event.clientY - browserYPosition - (canvasHalfHeight / magnificationLevel) + documentElement.scrollTop;

      // If the container X position is less than the browser X position
      if(containerXPosition < browserXPosition)
      {
        containerXPosition = browserXPosition;
      }

      // If the container Y position is less than the browser Y position
      if(containerYPosition < browserYPosition)
      {
        containerYPosition = browserYPosition;
      }

      // If the magnifier X position is less than 0
      if(magnifierXPosition < 0)
      {
        magnifierXPosition = 0;
      }

      // If the magnifier Y position is less than 0
      if(magnifierYPosition < 0)
      {
        magnifierYPosition = 0;
      }

      container.style.left = containerXPosition + "px";
      container.style.top  = containerYPosition + "px";

      WebDeveloper.PageMagnifier.update(magnifierXPosition, magnifierYPosition);
    }
  }
};

// Handles the mouse scroll event
WebDeveloper.PageMagnifier.mouseScroll = function(event)
{
  var eventDetail = event.detail;

  // If the event detail is set
  if(eventDetail)
  {
    var magnificationLevel = parseFloat(WebDeveloper.Preferences.getExtensionStringPreference("magnification.level"));

    // If the event detail is greater than zero (scroll down)
    if(eventDetail > 0)
    {
      // If the magnification level is greater than one
      if(magnificationLevel > 1)
      {
        magnificationLevel -= 1;
      }
    }
    else
    {
      magnificationLevel += 1;
    }

    document.getElementById("web-developer-magnification-level").value = magnificationLevel;

    WebDeveloper.Preferences.setExtensionStringPreference("magnification.level", magnificationLevel);
    WebDeveloper.PageMagnifier.update(0, 0);

    event.stopPropagation();
    event.preventDefault();
  }
};

// Removes the page magnifier
WebDeveloper.PageMagnifier.removePageMagnifier = function()
{
  var container = document.getElementById("web-developer-page-magnifier-container");

  container.removeEventListener("DOMMouseScroll", WebDeveloper.PageMagnifier.mouseScroll, true);
  window.removeEventListener("mousemove", WebDeveloper.PageMagnifier.mouseMove, false);

  container.hidden = true;
};

// Removes the page magnifier toolbar
WebDeveloper.PageMagnifier.removeToolbar = function()
{
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-page-magnifier-toolbar"), "hidden", true);
};

// Updates the magnification level
WebDeveloper.PageMagnifier.updateMagnificationLevel = function(element)
{
  var magnificationLevel = element.value;

  // If the magnification level is empty or not a number or less than zero
  if(!magnificationLevel || parseFloat(magnificationLevel) != magnificationLevel || magnificationLevel <= 0)
  {
    WebDeveloper.Common.displayError(WebDeveloper.Locales.getString("displayPageMagnifier"), WebDeveloper.Locales.getString("invalidMagnificationLevel"));
  }
  else
  {
    WebDeveloper.Preferences.setExtensionStringPreference("magnification.level", magnificationLevel);
    WebDeveloper.PageMagnifier.update(0, 0);
  }
};

// Updates the page magnifier
WebDeveloper.PageMagnifier.update = function(xPosition, yPosition)
{
  var canvas = document.getElementById("web-developer-page-magnifier");

  // If the canvas was found
  if(canvas)
  {
    var context            = canvas.getContext("2d");
    var height             = canvas.height;
    var magnificationLevel = parseFloat(WebDeveloper.Preferences.getExtensionStringPreference("magnification.level"));
    var width              = canvas.width;

    // If the magnification level is not valid
    if(typeof magnificationLevel == "number" && isNaN(magnificationLevel))
    {
      magnificationLevel = 2;
    }

    context.save();
    context.scale(magnificationLevel, magnificationLevel);
    context.drawWindow(WebDeveloper.Common.getContentWindow(), xPosition, yPosition, (xPosition + width) / magnificationLevel, (yPosition + height) / magnificationLevel, "rgb(255, 255, 255)");
    context.restore();
  }
};
