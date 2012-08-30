var WebDeveloper = WebDeveloper || {};

WebDeveloper.ResizeWindow = WebDeveloper.ResizeWindow || {};

// Handles the resize window dialog being accepted
WebDeveloper.ResizeWindow.accept = function()
{
  var height = document.getElementById("web-developer-resize-height").value.replace(/px/gi, "").trim();
  var width  = document.getElementById("web-developer-resize-width").value.replace(/px/gi, "").trim();

  // If the width and height are valid
  if(width && height && (width == "*" || (parseInt(width, 10) == width && width > 0)) && (height == "*" || (parseInt(height, 10) == height && height > 0)))
  {
    var contentWindow = window.opener.content;
    var windowX       = window.opener.screenX;
    var windowY       = window.opener.screenY;

    // If resizing the view port
    if(document.getElementById("web-developer-resize-viewport").checked)
    {
      WebDeveloper.Preferences.setExtensionBooleanPreference("resize.viewport", true);

      // If the width is not a wildcard
      if(width != "*")
      {
        contentWindow.innerWidth = width;
      }

      // If the height is not a wildcard
      if(height != "*")
      {
        contentWindow.innerHeight = height;
      }
    }
    else
    {
      WebDeveloper.Preferences.deleteExtensionPreference("resize.viewport");

      // If the width is a wildcard
      if(width == "*")
      {
        width = contentWindow.outerWidth;
      }

      // If the height is a wildcard
      if(height == "*")
      {
        height = contentWindow.outerHeight;
      }

      window.opener.resizeTo(width, height);
    }

    window.opener.screenX = windowX;
    window.opener.screenY = windowY;

    return true;
  }
  else
  {
    // If the height is empty or not a number or less than zero
    if(!height || parseInt(height, 10) != height || height <= 0)
    {
      WebDeveloper.Common.displayError(WebDeveloper.Locales.getString("resizeWindow"), WebDeveloper.Locales.getString("invalidHeight"));
    }
    else
    {
      WebDeveloper.Common.displayError(WebDeveloper.Locales.getString("resizeWindow"), WebDeveloper.Locales.getString("invalidWidth"));
    }

    return false;
  }
};

// Initializes the resize dialog
WebDeveloper.ResizeWindow.initialize = function()
{
  var resizeViewport = WebDeveloper.Preferences.getExtensionBooleanPreference("resize.viewport");

  document.getElementById("web-developer-resize-viewport").checked = resizeViewport;

  // If resizing the viewport
  if(resizeViewport)
  {
    document.getElementById("web-developer-resize-width").value  = window.arguments[2];
    document.getElementById("web-developer-resize-height").value = window.arguments[3];
  }
  else
  {
    document.getElementById("web-developer-resize-width").value  = window.arguments[0];
    document.getElementById("web-developer-resize-height").value = window.arguments[1];
  }
};
