var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Overlay        = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Resize = WebDeveloper.Overlay.Resize || {};

// Cancels resizing the window
WebDeveloper.Overlay.Resize.cancelResizeWindow = function()
{
  document.getElementById("resize-window-dialog").classList.add("d-none");
  document.querySelector(".tab-content").classList.remove("d-none");
};

// Resizes the window to a custom size
WebDeveloper.Overlay.Resize.customResizeWindow = function(event)
{
  var eventTarget = event.target;

  // If the event target is a custom resize window option
  if(eventTarget && eventTarget.classList.contains("custom-resize-window"))
  {
    WebDeveloper.Overlay.Resize.resizeWindow(eventTarget.getAttribute("data-height"), eventTarget.getAttribute("data-width"));
  }
};

// Displays the resize dialog
WebDeveloper.Overlay.Resize.displayResizeDialog = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, { type: "get-window-size" }, function(response)
      {
        WebDeveloper.Overlay.Resize.resetResizeDialog(response);
        WebDeveloper.Overlay.closeConfirmation();
        WebDeveloper.Overlay.closeNotification();
        document.querySelector(".tab-content").classList.add("d-none");
        document.getElementById("resize-window-dialog").classList.remove("d-none");
        document.getElementById("resize-window-width").focus();
      });
    }
  });
};

// Displays the window size
WebDeveloper.Overlay.Resize.displayWindowSize = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, { type: "get-window-size" }, function(response)
      {
        WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getFormattedString("displayWindowSizeResult", [response.outerWidth, response.outerHeight, response.innerWidth, response.innerHeight]), "info");
      });
    }
  });
};

// Opens the options to edit the resize dimensions
WebDeveloper.Overlay.Resize.editResizeDimensions = function()
{
  chrome.runtime.openOptionsPage();
  WebDeveloper.Overlay.close();
};

// Returns the locale for the view responsive layouts feature
WebDeveloper.Overlay.Resize.getViewResponsiveLayoutsLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.layouts           = WebDeveloper.Locales.getString("layouts");
  locale.reloadLayouts     = WebDeveloper.Locales.getString("reloadLayouts");
  locale.responsiveLayouts = WebDeveloper.Locales.getString("responsiveLayouts");

  return locale;
};

// Initializes the resize overlay
WebDeveloper.Overlay.Resize.initialize = function()
{
  var displayWindowSizeMenu     = document.getElementById("display-window-size");
  var editResizeDimensionsMenu  = document.getElementById("edit-resize-dimensions");
  var resizeWindowCancel        = document.getElementById("resize-window-cancel");
  var resizeWindowDialog        = document.getElementById("resize-window-dialog");
  var resizeWindowHeight        = document.getElementById("resize-window-height");
  var resizeWindowMenu          = document.getElementById("resize-window");
  var resizeWindowSubmit        = document.getElementById("resize-window-submit");
  var resizeWindowWidth         = document.getElementById("resize-window-width");
  var viewResponsiveLayoutsMenu = document.getElementById("view-responsive-layouts");

  document.querySelector('[for="resize-window-height"]').append(WebDeveloper.Locales.getString("height"));
  document.querySelector('[for="resize-window-width"]').append(WebDeveloper.Locales.getString("width"));
  displayWindowSizeMenu.append(WebDeveloper.Locales.getString("displayWindowSize"));
  editResizeDimensionsMenu.append(WebDeveloper.Locales.getString("editResizeDimensions"));
  resizeWindowCancel.append(WebDeveloper.Locales.getString("cancel"));
  resizeWindowDialog.querySelector("legend").append(WebDeveloper.Locales.getString("resizeWindow"));
  resizeWindowMenu.append(WebDeveloper.Locales.getString("resizeWindowMenu"));
  resizeWindowSubmit.append(WebDeveloper.Locales.getString("resize"));
  viewResponsiveLayoutsMenu.append(WebDeveloper.Locales.getString("viewResponsiveLayouts"));

  resizeWindowHeight.setAttribute("placeholder", WebDeveloper.Locales.getString("heightPlaceholder"));
  resizeWindowWidth.setAttribute("placeholder", WebDeveloper.Locales.getString("widthPlaceholder"));

  document.getElementById("custom-resize-options").addEventListener("click", WebDeveloper.Overlay.Resize.customResizeWindow);
  displayWindowSizeMenu.addEventListener("click", WebDeveloper.Overlay.Resize.displayWindowSize);
  editResizeDimensionsMenu.addEventListener("click", WebDeveloper.Overlay.Resize.editResizeDimensions);
  resizeWindowCancel.addEventListener("click", WebDeveloper.Overlay.Resize.cancelResizeWindow);
  resizeWindowDialog.addEventListener("submit", function(event) { event.preventDefault(); });
  resizeWindowHeight.addEventListener("keypress", WebDeveloper.Overlay.Resize.resizeWindowKeyPress);
  resizeWindowMenu.addEventListener("click", WebDeveloper.Overlay.Resize.displayResizeDialog);
  resizeWindowSubmit.addEventListener("click", WebDeveloper.Overlay.Resize.submitResizeWindow);
  resizeWindowWidth.addEventListener("keypress", WebDeveloper.Overlay.Resize.resizeWindowKeyPress);
  viewResponsiveLayoutsMenu.addEventListener("click", WebDeveloper.Overlay.Resize.viewResponsiveLayouts);

  WebDeveloper.Overlay.Resize.setupCustomResizeOptions();
};

// Resets the add cookie dialog
WebDeveloper.Overlay.Resize.resetResizeDialog = function(response)
{
  var resizeWindowHeight = document.getElementById("resize-window-height");
  var resizeWindowWidth  = document.getElementById("resize-window-width");

  resizeWindowHeight.value = response.outerHeight;
  resizeWindowWidth.value  = response.outerWidth;

  resizeWindowHeight.classList.remove("is-invalid");
  resizeWindowWidth.classList.remove("is-invalid");
};

// Resizes the window
WebDeveloper.Overlay.Resize.resizeWindow = function(height, width)
{
  WebDeveloper.Overlay.getSelectedWindow(function(selectedWindow)
  {
    var size = {};

    // Set the window state to normal before resizing the window
    size.state = "normal";

    // If the height is not a wildcard
    if(height != "*")
    {
      size.height = parseInt(height, 10);
    }

    // If the width is not a wildcard
    if(width != "*")
    {
      size.width = parseInt(width, 10);
    }

    chrome.windows.update(selectedWindow.id, size, function()
    {
      WebDeveloper.Overlay.close();
    });
  });
};

// Handles a key press when resizing the window
WebDeveloper.Overlay.Resize.resizeWindowKeyPress = function(event)
{
  // If the enter key was pressed
  if(event.keyCode == 13)
  {
    WebDeveloper.Overlay.Resize.submitResizeWindow();
  }
};

// Sets up the custom resize options
WebDeveloper.Overlay.Resize.setupCustomResizeOptions = function()
{
  var customResizeOptionTemplate = document.getElementById("custom-resize-option").innerHTML;
  var editResizeDimensions       = document.getElementById("edit-resize-dimensions").parentElement;

  Mustache.parse(customResizeOptionTemplate);

  WebDeveloper.Storage.getItem("resize_count", function(resizeOptionCount)
  {
    var resizeStorageOptionKeys = [];

    // Loop through the resize options
    for(var i = 1, l = resizeOptionCount; i <= l; i++)
    {
      resizeStorageOptionKeys.push("resize_" + i + "_description", "resize_" + i + "_height", "resize_" + i + "_width");
    }

    WebDeveloper.Storage.getItems(resizeStorageOptionKeys, function(resizeStorageOptions)
    {
      var description  = null;
      var height       = 0;
      var resizeOption = null;
      var width        = 0;

      // Loop through the resize options in reverse to allow insertAdjacentHTML to insert in the correct order
      for(i = resizeOptionCount, l = 0; i > l; i--)
      {
        description = resizeStorageOptions["resize_" + i + "_description"];
        height      = resizeStorageOptions["resize_" + i + "_height"];
        width       = resizeStorageOptions["resize_" + i + "_width"];

        // If the description, height and width are set
        if(description && height > 0 && width > 0)
        {
          resizeOption = {};

          resizeOption.description = description;
          resizeOption.height      = height;
          resizeOption.width       = width;

          editResizeDimensions.insertAdjacentHTML("afterbegin", Mustache.render(customResizeOptionTemplate, resizeOption));
        }
      }
    });
  });
};

// Resizes the window
WebDeveloper.Overlay.Resize.submitResizeWindow = function()
{
  // If the dialog is valid
  if(WebDeveloper.Overlay.Resize.validateResizeDialog())
  {
    WebDeveloper.Overlay.Resize.resizeWindow(document.getElementById("resize-window-height").value.trim(), document.getElementById("resize-window-width").value.trim());
  }
};

// Returns true if the resize dialog is valid
WebDeveloper.Overlay.Resize.validateResizeDialog = function()
{
  var height      = document.getElementById("resize-window-height");
  var heightValue = height.value.trim();
  var valid       = true;
  var width       = document.getElementById("resize-window-width");
  var widthValue  = width.value.trim();

  // If the height is not set
  if(heightValue == "")
  {
    document.getElementById("resize-window-height-invalid").replaceChildren(WebDeveloper.Locales.getString("heightCannotBeEmpty"));
    height.classList.add("is-invalid");

    valid = false;
  }
  else if(heightValue != "*" && (parseInt(heightValue, 10) != heightValue || heightValue <= 0))
  {
    document.getElementById("resize-window-height-invalid").replaceChildren(WebDeveloper.Locales.getString("heightNotValid"));
    height.classList.add("is-invalid");

    valid = false;
  }
  else
  {
    height.classList.remove("is-invalid");
  }

  // If the width is not set
  if(widthValue == "")
  {
    document.getElementById("resize-window-width-invalid").replaceChildren(WebDeveloper.Locales.getString("widthCannotBeEmpty"));
    width.classList.add("is-invalid");

    valid = false;
  }
  else if(widthValue != "*" && (parseInt(widthValue, 10) != widthValue || widthValue <= 0))
  {
    document.getElementById("resize-window-width-invalid").replaceChildren(WebDeveloper.Locales.getString("widthNotValid"));
    width.classList.add("is-invalid");

    valid = false;
  }
  else
  {
    width.classList.remove("is-invalid");
  }

  return valid;
};

// Displays the responsive layouts for the page
WebDeveloper.Overlay.Resize.viewResponsiveLayouts = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var data = {};

      data.layouts = [];
      data.pageURL = tab.url;

      WebDeveloper.Storage.getItem("responsive_layout_count", function(responsiveLayoutOptionCount)
      {
        var responsiveLayoutStorageOptionKeys = [];

        // Loop through the tools
        for(var i = 1, l = responsiveLayoutOptionCount; i <= l; i++)
        {
          responsiveLayoutStorageOptionKeys.push("responsive_layout_" + i + "_description", "responsive_layout_" + i + "_height", "responsive_layout_" + i + "_width");
        }

        WebDeveloper.Storage.getItems(responsiveLayoutStorageOptionKeys, function(responsiveLayoutStorageOptions)
        {
          var description = null;
          var height      = 0;
          var layout      = null;
          var width       = 0;

          // Loop through the tools
          for(i = 1, l = responsiveLayoutOptionCount; i <= l; i++)
          {
            description = responsiveLayoutStorageOptions["responsive_layout_" + i + "_description"];
            height      = responsiveLayoutStorageOptions["responsive_layout_" + i + "_height"];
            width       = responsiveLayoutStorageOptions["responsive_layout_" + i + "_width"];

            // If the description, height and width are set
            if(description && height > 0 && width > 0)
            {
              layout             = {};
              layout.description = description;
              layout.height      = height;
              layout.width       = width;

              data.layouts.push(layout);
            }
          }

          WebDeveloper.Overlay.openGeneratedTab(chrome.runtime.getURL("/generated/view-responsive-layouts.html"), tab.index, data, WebDeveloper.Overlay.Resize.getViewResponsiveLayoutsLocale());
        });
      });
    }
  });
};

// If the document is still loading
if(document.readyState === "loading")
{
  document.addEventListener("DOMContentLoaded", WebDeveloper.Overlay.Resize.initialize);
}
else
{
  WebDeveloper.Overlay.Resize.initialize();
}
