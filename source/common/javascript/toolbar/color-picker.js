var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.ColorPicker                 = WebDeveloper.ColorPicker || {};
WebDeveloper.ColorPicker.getColorLastRun = 0;
WebDeveloper.ColorPicker.getColorLimit   = 1;
WebDeveloper.ColorPicker.getColorTimeout = null;
WebDeveloper.ColorPicker.toolbarDocument = null;

// Handles the click event
WebDeveloper.ColorPicker.click = function(event)
{
  // If the click was not a right click
  if(event.button != 2)
  {
    WebDeveloper.ColorPicker.getColor(event, "selected");

    event.stopPropagation();
    event.preventDefault();
  }
};

// Creates the color picker
WebDeveloper.ColorPicker.createColorPicker = function(contentDocument, locale)
{
  var colorPickerToolbar = contentDocument.createElement("iframe");
  var styleSheet         = null;

  colorPickerToolbar.setAttribute("id", "web-developer-color-picker-toolbar");
  colorPickerToolbar.setAttribute("class", "web-developer-toolbar");

  WebDeveloper.Common.getDocumentBodyElement(contentDocument).appendChild(colorPickerToolbar);
  colorPickerToolbar.contentWindow.stop();

  WebDeveloper.ColorPicker.toolbarDocument        = colorPickerToolbar.contentDocument;
  styleSheet                                      = WebDeveloper.ColorPicker.toolbarDocument.createElement("link");
  window.WebDeveloperEvents                       = window.WebDeveloperEvents || {};
  window.WebDeveloperEvents.ColorPicker           = window.WebDeveloperEvents.ColorPicker || {};
  window.WebDeveloperEvents.ColorPicker.click     = WebDeveloper.ColorPicker.click;
  window.WebDeveloperEvents.ColorPicker.mouseMove = WebDeveloper.ColorPicker.mouseMove;

  styleSheet.setAttribute("rel", "stylesheet");
  styleSheet.setAttribute("href", WebDeveloper.Common.getChromeURL("toolbar/color-picker-toolbar.css"));
  WebDeveloper.Common.getDocumentHeadElement(WebDeveloper.ColorPicker.toolbarDocument).appendChild(styleSheet);

  WebDeveloper.Common.getDocumentBodyElement(WebDeveloper.ColorPicker.toolbarDocument).innerHTML = WebDeveloper.ColorPicker.getColorPickerTemplate(locale);

  WebDeveloper.ColorPicker.toolbarDocument.querySelector("img").setAttribute("src", WebDeveloper.Common.getChromeURL("toolbar/images/logo.png"));
  contentDocument.addEventListener("click", window.WebDeveloperEvents.ColorPicker.click, true);
  contentDocument.addEventListener("mousemove", window.WebDeveloperEvents.ColorPicker.mouseMove, false);
};

// Displays the color picker
WebDeveloper.ColorPicker.displayColorPicker = function(display, contentDocument, locale)
{
  // If displaying the color picker
  if(display)
  {
    WebDeveloper.ColorPicker.createColorPicker(contentDocument, locale);
  }
  else
  {
    WebDeveloper.ColorPicker.removeColorPicker(contentDocument);
  }

  WebDeveloper.Common.toggleStyleSheet("/toolbar/color-picker.css", "web-developer-color-picker-styles", contentDocument, false);
};

// Converts an RGB color into a hex color
WebDeveloper.ColorPicker.convertRGBToHex = function(rgb)
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

// Gets the color
WebDeveloper.ColorPicker.getColor = function(event, type)
{
  var eventTarget = event.target;

  // If the event target is set
  if(eventTarget)
  {
    var ownerDocument = eventTarget.ownerDocument;

    // If the owner document is set
    if(ownerDocument)
    {
      var colorPicker = ownerDocument.getElementById("web-developer-color-picker-toolbar");
      var tagName     = eventTarget.tagName;

      // If the event target is not the color picker, the color picker is not an ancestor of the event target and the event target is not a scrollbar
      if(eventTarget != colorPicker && !WebDeveloper.Common.isAncestor(eventTarget, colorPicker) && tagName && tagName.toLowerCase() != "scrollbar")
      {
        var currentTime = new Date().getTime();

        // If there is a timeout
        if(WebDeveloper.ColorPicker.getColorTimeout)
        {
          clearTimeout(WebDeveloper.ColorPicker.getColorTimeout);

          WebDeveloper.ColorPicker.getColorTimeout = null;
        }

        // If there has been more time than the limit since the last call to get the color
        if(currentTime - WebDeveloper.ColorPicker.getColorLastRun > WebDeveloper.ColorPicker.getColorLimit)
        {
          WebDeveloper.ColorPicker.getColorDetails(event, type);
        }
        else
        {
          WebDeveloper.ColorPicker.getColorTimeout = setTimeout(function() { WebDeveloper.ColorPicker.getColorDetails(event, type); }, WebDeveloper.ColorPicker.getColorLastRun + WebDeveloper.ColorPicker.getColorLimit - currentTime);
        }
      }
    }
  }
};

// Gets the color details
WebDeveloper.ColorPicker.getColorDetails = function(event, type)
{
  WebDeveloper.ColorPicker.getColorLastRun = new Date().getTime();

  chrome.runtime.sendMessage({ type: "get-visible-tab" }, function(response)
  {
    // If there is a valid response
    if(response.dataUrl)
    {
      var image = new Image();

      image.src                              = response.dataUrl;
      WebDeveloper.ColorPicker.getColorLimit = 1000 / response.maximumPerSecond + 1;

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

        color = WebDeveloper.ColorPicker.convertRGBToHex(context.getImageData(event.clientX * devicePixelRatio, event.clientY * devicePixelRatio, 1, 1).data);

        WebDeveloper.ColorPicker.setColor(color, type);
      };
    }
  });
};

// Returns the color picker template
WebDeveloper.ColorPicker.getColorPickerTemplate = function(locale)
{
  return "<span>" + locale.hoverColor + '</span><span id="web-developer-color-picker-hover-color"></span><span id="web-developer-color-picker-hover-hex"></span><span>' + locale.selectedColor + '</span><span id="web-developer-color-picker-selected-color"></span><span id="web-developer-color-picker-selected-hex"></span><img width="16" height="16" alt=""><h1>' + locale.title + "</h1>";
};

// Handles the mouse move event
WebDeveloper.ColorPicker.mouseMove = function(event)
{
  WebDeveloper.ColorPicker.getColor(event, "hover");
};

// Removes the color picker
WebDeveloper.ColorPicker.removeColorPicker = function(contentDocument)
{
  WebDeveloper.Common.removeMatchingElements("#web-developer-color-picker-toolbar", contentDocument);

  contentDocument.removeEventListener("click", window.WebDeveloperEvents.ColorPicker.click, true);
  contentDocument.removeEventListener("mousemove", window.WebDeveloperEvents.ColorPicker.mouseMove, false);

  window.WebDeveloperEvents.ColorPicker = null;
};

// Sets the color
WebDeveloper.ColorPicker.setColor = function(color, type)
{
  WebDeveloper.ColorPicker.toolbarDocument.getElementById("web-developer-color-picker-" + type + "-color").setAttribute("style", "background-color: " + color);

  WebDeveloper.ColorPicker.toolbarDocument.getElementById("web-developer-color-picker-" + type + "-hex").textContent = color;
};
