var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Overlay       = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Tools = WebDeveloper.Overlay.Tools || {};

// Opens a custom tool
WebDeveloper.Overlay.Tools.customTool = function(event)
{
  var eventTarget = event.target;

  // If the event target is a custom tool
  if(eventTarget && eventTarget.classList.contains("custom-tool"))
  {
    WebDeveloper.Overlay.getSelectedTab(function(tab)
    {
      WebDeveloper.Overlay.openTab(eventTarget.getAttribute("data-url") + encodeURIComponent(tab.url));
    });
  }
};

// Opens the options to edit the tools
WebDeveloper.Overlay.Tools.editTools = function()
{
  chrome.runtime.openOptionsPage();
  WebDeveloper.Overlay.close();
};

// Initializes the tools overlay
WebDeveloper.Overlay.Tools.initialize = function()
{
  var editToolsMenu         = document.getElementById("edit-tools");
  var validateLocalCSSMenu  = document.getElementById("validate-local-css");
  var validateLocalHTMLMenu = document.getElementById("validate-local-html");
  var viewSourceMenu        = document.getElementById("view-source");

  editToolsMenu.append(WebDeveloper.Locales.getString("editTools"));
  validateLocalCSSMenu.append(WebDeveloper.Locales.getString("validateLocalCSS"));
  validateLocalHTMLMenu.append(WebDeveloper.Locales.getString("validateLocalHTML"));
  viewSourceMenu.append(WebDeveloper.Locales.getString("viewSource"));

  document.getElementById("custom-tools").addEventListener("click", WebDeveloper.Overlay.Tools.customTool);
  editToolsMenu.addEventListener("click", WebDeveloper.Overlay.Tools.editTools);
  validateLocalCSSMenu.addEventListener("click", WebDeveloper.Overlay.Tools.validateLocalCSS);
  validateLocalHTMLMenu.addEventListener("click", WebDeveloper.Overlay.Tools.validateLocalHTML);
  viewSourceMenu.addEventListener("click", WebDeveloper.Overlay.Tools.viewSource);

  WebDeveloper.Overlay.Tools.setupCustomTools();
};

// Sets up the custom tools
WebDeveloper.Overlay.Tools.setupCustomTools = function()
{
  var customToolTemplate = document.getElementById("custom-tool").innerHTML;
  var editTools          = document.getElementById("edit-tools").parentElement;

  Mustache.parse(customToolTemplate);

  WebDeveloper.Storage.getItem("tool_count", function(toolsCount)
  {
    var toolsStorageOptionKeys = [];

    // Loop through the tools
    for(var i = 1, l = toolsCount; i <= l; i++)
    {
      toolsStorageOptionKeys.push("tool_" + i + "_description", "tool_" + i + "_url");
    }

    WebDeveloper.Storage.getItems(toolsStorageOptionKeys, function(toolsStorageOptions)
    {
      var description = null;
      var tool        = null;
      var url         = null;

      // Loop through the tools in reverse to allow insertAdjacentHTML to insert in the correct order
      for(i = toolsCount, l = 0; i > l; i--)
      {
        description = toolsStorageOptions["tool_" + i + "_description"];
        url         = toolsStorageOptions["tool_" + i + "_url"];

        // If the description and url are set
        if(description && url)
        {
          tool = {};

          tool.description = description;
          tool.url         = url;

          editTools.insertAdjacentHTML("afterbegin", DOMPurify.sanitize(Mustache.render(customToolTemplate, tool)));
        }
      }
    });
  });
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
        var contentDocument = null;
        var styles          = "";
        var documents       = data.documents;
        var styleSheets     = [];

        // Loop through the documents
        for(var i = 0, l = documents.length; i < l; i++)
        {
          contentDocument = documents[i];
          styleSheets     = styleSheets.concat(contentDocument.styleSheets);

          // If there are embedded styles
          if(contentDocument.embedded)
          {
            styles += contentDocument.embedded;
          }
        }

        chrome.runtime.sendMessage({ errorMessage: "", type: "get-url-contents", urls: styleSheets }, function(urlContents)
        {
          // Loop through the URL contents
          for(i = 0, l = urlContents.length; i < l; i++)
          {
            styles += urlContents[i].content;
          }

          WebDeveloper.Overlay.openValidationTab(chrome.runtime.getURL("/generated/validate-local-css.html"), tab.index, styles);
        });
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
      chrome.runtime.sendMessage({ errorMessage: "", type: "get-url-contents", urls: [tab.url] }, function(data)
      {
        WebDeveloper.Overlay.openValidationTab(chrome.runtime.getURL("/generated/validate-local-html.html"), tab.index, data[0].content);
      });
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

// If the document is still loading
if(document.readyState === "loading")
{
  document.addEventListener("DOMContentLoaded", WebDeveloper.Overlay.Tools.initialize);
}
else
{
  WebDeveloper.Overlay.Tools.initialize();
}
