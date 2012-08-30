var WebDeveloper = WebDeveloper || {};

WebDeveloper.CSS = WebDeveloper.CSS || {};

// Reloads the linked style sheets in a document
WebDeveloper.CSS.reloadLinkedStyleSheets = function(documents)
{
  var contentDocument = null;
  var ownerNode       = null;
  var styleSheet      = null;
  var styleSheets     = null;
  var styleSheetURL   = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];
    styleSheets     = contentDocument.styleSheets;

    // Loop through the style sheets
    for(var j = 0, m = styleSheets.length; j < m; j++)
    {
      styleSheet    = styleSheets[j];
      styleSheetURL = styleSheet.href;

      // If this is a valid style sheet, is not an inline style sheet and is not an alternate style sheet or style sheets are being disabled
      if(WebDeveloper.CSS.isValidStyleSheet(styleSheet) && styleSheetURL && styleSheetURL != contentDocument.documentURI && !styleSheet.disabled && !WebDeveloper.CSS.isAlternateStyleSheet(styleSheet))
      {
        ownerNode     = styleSheet.ownerNode;
        styleSheetURL = WebDeveloper.Common.removeReloadParameterFromURL(styleSheetURL);

        // If the style sheet URL does not have query parameters
        if(styleSheetURL.indexOf("?") == -1)
        {
          styleSheetURL += "?";
        }
        else
        {
          styleSheetURL += "&";
        }

        // If the owner node is set
        if(ownerNode)
        {
          ownerNode.href = styleSheetURL + "web-developer-reload=" + new Date().getTime();
        }
      }
    }
  }

  WebDeveloper.Common.displayNotification("reloadLinkedStyleSheetsResult");
};

// Toggles all the styles in a document
WebDeveloper.CSS.toggleAllStyles = function(disable, documents)
{
  var contentDocument = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    WebDeveloper.CSS.toggleAllStyleSheets(disable, contentDocument);
    WebDeveloper.CSS.toggleElementInlineStyles(contentDocument.documentElement, disable);
  }
};

// Toggles the browser default styles in a document
WebDeveloper.CSS.toggleBrowserDefaultStyles = function(documents)
{
  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/css/disable-browser-default-styles.css", "web-developer-disable-browser-default-styles", documents[i], true);
  }
};

// Toggles all the inline styles in elements under an element
WebDeveloper.CSS.toggleElementInlineStyles = function(node, disable)
{
  // If the node exists and is an element
  if(node && node.nodeType == Node.ELEMENT_NODE)
  {
    var childNodes = node.childNodes;

    // If disabling styles and the node has a style attribute
    if(disable && node.hasAttribute("style"))
    {
      node.setAttribute("web-developer-inline-style", node.getAttribute("style"));
      node.removeAttribute("style");
    }
    else if(!disable && node.hasAttribute("web-developer-inline-style"))
    {
      node.setAttribute("style", node.getAttribute("web-developer-inline-style"));
      node.removeAttribute("web-developer-inline-style");
    }

    // Loop through the child nodes
    for(var i = 0, l = childNodes.length; i < l; i++)
    {
      WebDeveloper.CSS.toggleElementInlineStyles(childNodes[i], disable);
    }
  }
};

// Toggles all the embedded styles in a document
WebDeveloper.CSS.toggleEmbeddedStyles = function(disable, documents)
{
  var styleSheet  = null;
  var styleSheets = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    styleSheets = documents[i].getElementsByTagName("style");

    // Loop through all the stylesheets
    for(var j = 0, m = styleSheets.length; j < m; j++)
    {
      styleSheet = styleSheets[j].sheet;

      // If this is a valid style sheet
      if(WebDeveloper.CSS.isValidStyleSheet(styleSheet))
      {
        styleSheet.disabled = disable;
      }
    }
  }
};

// Toggles all the inline styles in elements in a document
WebDeveloper.CSS.toggleInlineStyles = function(disable, documents)
{
  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    WebDeveloper.CSS.toggleElementInlineStyles(documents[i].documentElement, disable);
  }
};

// Toggles all the linked style sheets in a document
WebDeveloper.CSS.toggleLinkedStyleSheets = function(disable, documents)
{
  var contentDocument = null;
  var styleSheet      = null;
  var styleSheets   = null;
  var styleSheetURL = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];
    styleSheets   = contentDocument.styleSheets;

    // Loop through the style sheets
    for(var j = 0, m = styleSheets.length; j < m; j++)
    {
      styleSheet    = styleSheets[j];
      styleSheetURL = styleSheet.href;

      // If this is a valid style sheet, is not an inline style sheet and is not an alternate style sheet or style sheets are being disabled
      if(WebDeveloper.CSS.isValidStyleSheet(styleSheet) && styleSheetURL && styleSheetURL != contentDocument.documentURI && (!WebDeveloper.CSS.isAlternateStyleSheet(styleSheet) || disable))
      {
        styleSheet.disabled = disable;
      }
    }
  }
};

// Toggles all the styles for this media type in a document
WebDeveloper.CSS.toggleMediaTypeStyles = function(mediaType, display, documents)
{
  var media       = null;
  var styleSheet  = null;
  var styleSheets = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    styleSheets = documents[i].styleSheets;

    // Loop through the style sheets
    for(var j = 0, m = styleSheets.length; j < m; j++)
    {
      styleSheet = styleSheets[j];

      // If the style sheet is valid and not an alternate style sheet
      if(WebDeveloper.CSS.isValidStyleSheet(styleSheet) && !WebDeveloper.CSS.isAlternateStyleSheet(styleSheet))
      {
        media = styleSheet.media;

        // If displaying the styles for this media type
        if(display)
        {
          // If the style sheet matches this media type
          if(WebDeveloper.CSS.isMediaStyleSheet(styleSheet, mediaType))
          {
            // If the style sheet does not have the screen media type
            if(!WebDeveloper.CSS.isMediaStyleSheet(styleSheet, "screen"))
            {
              media.appendMedium("web-developer-appended-screen");
              media.appendMedium("screen");
            }
          }
          else if(WebDeveloper.CSS.isMediaStyleSheet(styleSheet, "screen"))
          {
            // If the media length is not 0
            if(media.length !== 0)
            {
              media.deleteMedium("screen");
            }

            media.appendMedium("web-developer-deleted-screen");
          }
        }
        else
        {
          // If the style sheet has the web-developer-appended-screen media
          if(WebDeveloper.CSS.isMediaStyleSheet(styleSheet, "web-developer-appended-screen"))
          {
            media.deleteMedium("web-developer-appended-screen");
            media.deleteMedium("screen");
          }
          else if(WebDeveloper.CSS.isMediaStyleSheet(styleSheet, "web-developer-deleted-screen"))
          {
            media.appendMedium("screen");
            media.deleteMedium("web-developer-deleted-screen");
          }
        }

        // Force the styles to reapply by disabling and enabling the style sheet
        styleSheet.disabled = true;
        styleSheet.disabled = false;
      }
    }
  }
};

// Toggles all the print styles in a document
WebDeveloper.CSS.togglePrintStyles = function(disable, documents)
{
  var styleSheet  = null;
  var styleSheets = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    styleSheets = documents[i].styleSheets;

    // Loop through the style sheets
    for(var j = 0, m = styleSheets.length; j < m; j++)
    {
      styleSheet = styleSheets[j];

      // If this is a valid style sheet, is not an inline style sheet, is not an alternate style sheet or style sheets are being disabled and is a print style sheet, but not a screen style sheet
      if(WebDeveloper.CSS.isValidStyleSheet(styleSheet) && (!WebDeveloper.CSS.isAlternateStyleSheet(styleSheet) || disable) && WebDeveloper.CSS.isMediaStyleSheet(styleSheet, "print") && !WebDeveloper.CSS.isMediaStyleSheet(styleSheet, "screen"))
      {
        styleSheet.disabled = disable;
      }
    }
  }
};

// Uses the border box model
WebDeveloper.CSS.useBorderBoxModel = function(documents)
{
  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/css/use-border-box-model.css", "web-developer-use-border-box-model", documents[i], false);
  }
};
