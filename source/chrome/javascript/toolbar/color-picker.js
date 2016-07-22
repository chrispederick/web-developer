var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.ColorPicker                 = WebDeveloper.ColorPicker || {};
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
WebDeveloper.ColorPicker.createColorPicker = function(contentDocument, toolbarHTML)
{
  var colorPickerToolbar = contentDocument.createElement("iframe");
  var styleSheet         = null;

  colorPickerToolbar.setAttribute("id", "web-developer-color-picker-toolbar");
  colorPickerToolbar.setAttribute("class", "web-developer-toolbar");

  WebDeveloper.Common.getDocumentBodyElement(contentDocument).appendChild(colorPickerToolbar);

  WebDeveloper.ColorPicker.toolbarDocument        = colorPickerToolbar.contentDocument;
  styleSheet                                      = WebDeveloper.ColorPicker.toolbarDocument.createElement("link");
  window.WebDeveloperEvents                       = window.WebDeveloperEvents || {};
  window.WebDeveloperEvents.ColorPicker           = window.WebDeveloperEvents.ColorPicker || {};
  window.WebDeveloperEvents.ColorPicker.click     = WebDeveloper.ColorPicker.click;
  window.WebDeveloperEvents.ColorPicker.mouseMove = WebDeveloper.ColorPicker.mouseMove;

  styleSheet.setAttribute("rel", "stylesheet");
  styleSheet.setAttribute("href", WebDeveloper.Common.getChromeURL("toolbar/color-picker-toolbar.css"));
  WebDeveloper.Common.getDocumentHeadElement(WebDeveloper.ColorPicker.toolbarDocument).appendChild(styleSheet);

  WebDeveloper.Common.getDocumentBodyElement(WebDeveloper.ColorPicker.toolbarDocument).innerHTML = toolbarHTML;

  WebDeveloper.ColorPicker.toolbarDocument.querySelector("img").setAttribute("src", WebDeveloper.Common.getChromeURL("toolbar/images/logo.png"));
  contentDocument.addEventListener("click", window.WebDeveloperEvents.ColorPicker.click, true);
  contentDocument.addEventListener("mousemove", window.WebDeveloperEvents.ColorPicker.mouseMove, false);
};

// Displays the color picker
WebDeveloper.ColorPicker.displayColorPicker = function(display, contentDocument, toolbarHTML)
{
  // If displaying the color picker
  if(display)
  {
    WebDeveloper.ColorPicker.createColorPicker(contentDocument, toolbarHTML);
  }
  else
  {
    WebDeveloper.ColorPicker.removeColorPicker(contentDocument);
  }

  WebDeveloper.Common.toggleStyleSheet("toolbar/color-picker.css", "web-developer-color-picker-styles", contentDocument, false);
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
        chrome.extension.sendMessage({ type: "get-color", x: event.clientX, y: event.clientY, eventType: type });
      }
    }
  }
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
