var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Overlay       = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Tools = WebDeveloper.Overlay.Tools || {};

$(function()
{
  $("#edit-tools").append(WebDeveloper.Locales.getString("editTools")).on("click", WebDeveloper.Overlay.Tools.editTools);
  $("#tools-menu").on("click", ".custom-tool", WebDeveloper.Overlay.Tools.customTool);
  $("#validate-local-css").append(WebDeveloper.Locales.getString("validateLocalCSS")).on("click", WebDeveloper.Overlay.Tools.validateLocalCSS);
  $("#validate-local-html").append(WebDeveloper.Locales.getString("validateLocalHTML")).on("click", WebDeveloper.Overlay.Tools.validateLocalHTML);
  $("#view-source").append(WebDeveloper.Locales.getString("viewSource")).on("click", WebDeveloper.Overlay.Tools.viewSource);

  WebDeveloper.Overlay.Tools.setupCustomTools();
});

// Opens a custom tool
WebDeveloper.Overlay.Tools.customTool = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    WebDeveloper.Overlay.openTab(featureItem.data("url") + tab.url);
  });
};

// Opens the options to edit the tools
WebDeveloper.Overlay.Tools.editTools = function()
{
  WebDeveloper.Overlay.openTab(chrome.extension.getURL("options/options.html#tools-tab"));
};

// Sets up the custom tools
WebDeveloper.Overlay.Tools.setupCustomTools = function()
{
  var description = null;
  var editTools   = $("#edit-tools").closest("li");
  var storage     = chrome.extension.getBackgroundPage().WebDeveloper.Storage;
  var tool        = null;
  var url         = 0;

  $(".custom-tool", $("#custom-tools")).remove();

  // Loop through the tools
  for(var i = 1, l = storage.getItem("tool_count"); i <= l; i++)
  {
    description = storage.getItem("tool_" + i + "_description");
    url         = storage.getItem("tool_" + i + "_url");

    // If the description and url are set
    if(description && url)
    {
      tool = {};

      tool.description = description;
      tool.url         = url;

      editTools.before(ich.customTool(tool));
    }
  }
};

// Validates the CSS of the local page
WebDeveloper.Overlay.Tools.validateLocalCSS = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, { type: "get-css" }, function(data)
      {
        chrome.extension.getBackgroundPage().WebDeveloper.Background.validateLocalCSS(chrome.extension.getURL("validation/css.html"), tab.index, data);
      });
    }
  });
};

// Validates the HTML of the local page
WebDeveloper.Overlay.Tools.validateLocalHTML = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.extension.getBackgroundPage().WebDeveloper.Background.validateLocalHTML(chrome.extension.getURL("validation/html.html"), tab.index, tab.url);
    }
  });
};

// Displays the source of the page
WebDeveloper.Overlay.Tools.viewSource = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    WebDeveloper.Overlay.openTab("view-source:" + tab.url);
  });
};
