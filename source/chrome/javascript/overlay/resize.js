var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay        = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Resize = WebDeveloper.Overlay.Resize || {};

$(function()
{
  var resizeWindowHeight = $("#resize-window-height");
  var resizeWindowWidth  = $("#resize-window-width");

  $("#display-window-size").append(WebDeveloper.Locales.getString("displayWindowSize")).on("click", WebDeveloper.Overlay.Resize.displayWindowSize);
  $("#edit-resize-dimensions").append(WebDeveloper.Locales.getString("editResizeDimensions")).on("click", WebDeveloper.Overlay.Resize.editResizeDimensions);
  $("#resize-menu").on("click", ".custom-resize-window", WebDeveloper.Overlay.Resize.customResizeWindow);
  $("#resize-window").append(WebDeveloper.Locales.getString("resizeWindowMenu")).on("click", WebDeveloper.Overlay.Resize.displayResizeDialog);
  $("#view-responsive-layouts").append(WebDeveloper.Locales.getString("viewResponsiveLayouts")).on("click", WebDeveloper.Overlay.Resize.viewResponsiveLayouts);

  $("#resize-window-cancel").on("click", WebDeveloper.Overlay.Resize.cancelResizeWindow);
  $("#resize-window-dialog").on("submit", function(event) { event.preventDefault(); });
  $("#resize-window-submit").on("click", WebDeveloper.Overlay.Resize.submitResizeWindow);

  $("legend", $("#resize-window-dialog")).text(WebDeveloper.Locales.getString("resizeWindow"));
  $("#resize-window-cancel").text(WebDeveloper.Locales.getString("cancel"));
  $("#resize-window-submit").append(WebDeveloper.Locales.getString("resize"));
  $('[for="resize-window-height"]').text(WebDeveloper.Locales.getString("height"));
  $('[for="resize-window-width"]').text(WebDeveloper.Locales.getString("width"));

  resizeWindowHeight.attr("placeholder", WebDeveloper.Locales.getString("heightPlaceholder"));
  resizeWindowWidth.attr("placeholder", WebDeveloper.Locales.getString("widthPlaceholder"));
  resizeWindowHeight.add(resizeWindowWidth).on("keypress", WebDeveloper.Overlay.Resize.resizeWindowKeyPress);

  WebDeveloper.Overlay.Resize.setupCustomResizeOptions();
});

// Cancels resizing the window
WebDeveloper.Overlay.Resize.cancelResizeWindow = function()
{
  $("#resize-window-dialog").slideUp(WebDeveloper.Overlay.animationSpeed, function()
  {
    $(".tabbable").slideDown(WebDeveloper.Overlay.animationSpeed);
  });
};

// Resizes the window to a custom size
WebDeveloper.Overlay.Resize.customResizeWindow = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.Resize.resizeWindow(featureItem.data("height"), featureItem.data("width"));
};

// Displays the resize dialog
WebDeveloper.Overlay.Resize.displayResizeDialog = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, {type: "get-window-size"}, function(response)
      {
        var resizeWindowDialog = $("#resize-window-dialog");

        $("#resize-window-height").val(response.outerHeight);
        $("#resize-window-width").val(response.outerWidth).focus();

        WebDeveloper.Overlay.Resize.resetResizeDialog(resizeWindowDialog);

        $(".tabbable, #confirmation, #notification").slideUp(WebDeveloper.Overlay.animationSpeed, function()
        {
          resizeWindowDialog.slideDown(WebDeveloper.Overlay.animationSpeed);
        });
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
      chrome.tabs.sendMessage(tab.id, {type: "get-window-size"}, function(response)
      {
        WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getFormattedString("displayWindowSizeResult", [response.outerWidth, response.outerHeight, response.innerWidth, response.innerHeight]), "info");
      });
    }
  });
};

// Opens the options to edit the resize dimensions
WebDeveloper.Overlay.Resize.editResizeDimensions = function()
{
  WebDeveloper.Overlay.openTab(chrome.extension.getURL("options/options.html#resize-tab"));
};

// Resets the add cookie dialog
WebDeveloper.Overlay.Resize.resetResizeDialog = function(resizeDialog)
{
  $(".has-error", resizeDialog).removeClass("has-error");
  $(".help-block", resizeDialog).text("");
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
  var description          = null;
  var editResizeDimensions = $("#edit-resize-dimensions").closest("li");
  var height               = 0;
  var resizeOption         = null;
  var storage              = chrome.extension.getBackgroundPage().WebDeveloper.Storage;
  var width                = 0;

  $(".custom-resize-window", $("#custom-resize-options")).remove();

  // Loop through the resize options
  for(var i = 1, l = storage.getItem("resize_count"); i <= l; i++)
  {
    description = storage.getItem("resize_" + i + "_description");
    height      = storage.getItem("resize_" + i + "_height");
    width       = storage.getItem("resize_" + i + "_width");

    // If the description, height and width are set
    if(description && height > 0 && width > 0)
    {
      resizeOption = {};

      resizeOption.description = description;
      resizeOption.height      = height;
      resizeOption.width       = width;

      editResizeDimensions.before(ich.customResizeOption(resizeOption));
    }
  }
};

// Resizes the window
WebDeveloper.Overlay.Resize.submitResizeWindow = function()
{
  // If the dialog is valid
  if(WebDeveloper.Overlay.Resize.validateResizeDialog())
  {
    WebDeveloper.Overlay.Resize.resizeWindow($("#resize-window-height").val(), $("#resize-window-width").val());
  }
};

// Returns true if the resize dialog is valid
WebDeveloper.Overlay.Resize.validateResizeDialog = function()
{
  var height      = $("#resize-window-height");
  var heightValue = height.val().trim();
  var width       = $("#resize-window-width");
  var widthValue  = width.val().trim();
  var valid       = true;

  WebDeveloper.Overlay.Resize.resetResizeDialog($("#resize-window-dialog"));

  // If the height is not set
  if(!heightValue)
  {
    height.closest(".form-group").addClass("has-error");
    height.closest(".input-group").next(".help-block").text(WebDeveloper.Locales.getString("heightCannotBeEmpty"));

    valid = false;
  }
  else if(heightValue != "*" && (parseInt(heightValue, 10) != heightValue || heightValue <= 0))
  {
    height.closest(".form-group").addClass("has-error");
    height.closest(".input-group").next(".help-block").text(WebDeveloper.Locales.getString("heightNotValid"));

    valid = false;
  }

  // If the width is not set
  if(!widthValue)
  {
    width.closest(".form-group").addClass("has-error");
    width.closest(".input-group").next(".help-block").text(WebDeveloper.Locales.getString("widthCannotBeEmpty"));

    valid = false;
  }
  else if(widthValue != "*" && (parseInt(widthValue, 10) != widthValue || widthValue <= 0))
  {
    width.closest(".form-group").addClass("has-error");
    width.closest(".input-group").next(".help-block").text(WebDeveloper.Locales.getString("widthNotValid"));

    valid = false;
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
      var data        = {};
      var description = null;
      var height      = null;
      var layout      = null;
      var storage     = chrome.extension.getBackgroundPage().WebDeveloper.Storage;
      var width       = null;

      data.layouts = [];
      data.pageURL = tab.url;

      // Loop through the possible responsive options
      for(var i = 1, l = storage.getItem("responsive_layout_count"); i <= l; i++)
      {
        description = storage.getItem("responsive_layout_" + i + "_description");
        height      = storage.getItem("responsive_layout_" + i + "_height");
        width       = storage.getItem("responsive_layout_" + i + "_width");

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

      chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-responsive-layouts.html"), tab.index, data, WebDeveloper.Overlay.Resize.getViewResponsiveLayoutsLocale());
    }
  });
};
