var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.CSS = WebDeveloper.CSS || {};

// Formats a style property
WebDeveloper.CSS.formatStyleProperty = function(styleProperty)
{
  // Switch on the style property
  switch(styleProperty)
  {
    case "margin-bottom-value":
      return "margin-bottom";
    case "margin-left-value":
      return "margin-left";
    case "margin-right-value":
      return "margin-right";
    case "margin-top-value":
      return "margin-top";
    case "padding-bottom-value":
      return "padding-bottom";
    case "padding-left-value":
      return "padding-left";
    case "padding-right-value":
      return "padding-right";
    case "padding-top-value":
      return "padding-top";
    case "-x-background-x-position":
      return "background-x-position";
    case "-x-background-y-position":
      return "background-y-position";
    default:
      return styleProperty;
  }
};

// Formats a style value
WebDeveloper.CSS.formatStyleValue = function(styleValue)
{
  // If the style value is set
  if(styleValue)
  {
    var rgbRegularExpression = new RegExp("rgb\\((\\d{1,3}),\\s(\\d{1,3}),\\s(\\d{1,3})\\)", "gi");
    var styleValueColor      = rgbRegularExpression.exec(styleValue);

    // If the style value is a color
    if(styleValueColor)
    {
      var blue  = parseInt(styleValueColor[3], 10).toString(16);
      var green = parseInt(styleValueColor[2], 10).toString(16);
      var red   = parseInt(styleValueColor[1], 10).toString(16);

      // If the blue color is only 1 character long
      if(blue.length == 1)
      {
        blue = "0" + blue;
      }

      // If the green color is only 1 character long
      if(green.length == 1)
      {
        green = "0" + green;
      }

      // If the red color is only 1 character long
      if(red.length == 1)
      {
        red = "0" + red;
      }

      return "#" + red + green + blue;
    }
  }

  return styleValue;
};

// Returns an array of style sheets imported in the given style sheet
WebDeveloper.CSS.getImportedStyleSheets = function(styleSheet)
{
  var styleSheets = [];

  // If the style sheet is set
  if(styleSheet)
  {
    // Try to access the style sheet rules
    try
    {
      var cssRules = styleSheet.cssRules;

      // If there are CSS rules
      if(cssRules)
      {
        var cssRule            = null;
        var importedStyleSheet = null;

        // Loop through the style sheet rules
        for(var i = 0, l = cssRules.length; i < l; i++)
        {
          cssRule = cssRules[i];

          // If this is an import rule
          if(cssRule.type == 3)
          {
            importedStyleSheet = cssRule.styleSheet;

            // If this style sheet is valid
            if(WebDeveloper.CSS.isValidStyleSheet(importedStyleSheet))
            {
              styleSheets.push(importedStyleSheet.href);

              styleSheets = styleSheets.concat(WebDeveloper.CSS.getImportedStyleSheets(importedStyleSheet));
            }
          }
        }
      }
    }
    catch(exception)
    {
      WebDeveloper.Common.log("Could not access the style sheet rules for " + styleSheet.href + ".", exception);
    }
  }

  return styleSheets;
};

// Returns true if this is an alternate style sheet
WebDeveloper.CSS.isAlternateStyleSheet = function(styleSheet)
{
  // If the style sheet is set
  if(styleSheet)
  {
    var ownerNode = styleSheet.ownerNode;

    // If the owner node is set
    if(ownerNode)
    {
      // If the owner node is a processing instruction
      if(ownerNode.nodeType == Node.PROCESSING_INSTRUCTION_NODE)
      {
        // If the processing instruction data contains alternate="yes"
        if(ownerNode.data.indexOf('alternate="yes"') != -1)
        {
          return true;
        }
      }
      else if(ownerNode.hasAttribute("rel") && ownerNode.getAttribute("rel").toLowerCase() == "alternate stylesheet")
      {
        return true;
      }
    }
  }

  return false;
};

// Returns true if this style sheet is for this media type
WebDeveloper.CSS.isMediaStyleSheet = function(styleSheet, mediaType)
{
  // If the style sheet and media type are set
  if(styleSheet && mediaType)
  {
    var media               = styleSheet.media;
    var mediaLength         = media.length;
    var styleSheetMediaType = null;

    // If there is no media
    if(mediaLength === 0)
    {
      return true;
    }

    // Loop through the media
    for(var i = 0; i < mediaLength; i++)
    {
      styleSheetMediaType = media.item(i).toLowerCase();

      // If the style sheet media type is all or matches the media type
      if(styleSheetMediaType == "all" || styleSheetMediaType == mediaType)
      {
        return true;
      }
    }
  }

  return false;
};

// Returns true if this is a valid rule style
WebDeveloper.CSS.isValidRuleStyle = function(ruleStyles, ruleStyle)
{
  // If the rule style is set
  if(ruleStyle)
  {
    // If the rule style is an invalid rule style
    if(ruleStyle.indexOf("-moz-") === 0 || ruleStyle.indexOf("-x-") === 0 || ruleStyles.getPropertyValue(ruleStyle).indexOf("-moz-") === 0 || ((ruleStyle.indexOf("-ltr-source") !== 0 || ruleStyle.indexOf("-rtl-source") !== 0) && ruleStyles.getPropertyValue(ruleStyle) === "physical")) // eslint-disable-line no-extra-parens
    {
      return false;
    }

    return true;
  }

  return false;
};

// Returns true if this is a valid style sheet
WebDeveloper.CSS.isValidStyleSheet = function(styleSheet)
{
  // If the style sheet is set
  if(styleSheet)
  {
    var styleSheetHref = styleSheet.href;

    // If the style sheet href is not set or this is not a chrome or data style sheet
    if(!styleSheetHref || styleSheetHref.indexOf("about:") !== 0 && styleSheetHref.indexOf("chrome://") !== 0 && styleSheetHref.indexOf("chrome-extension://") !== 0 && styleSheetHref.indexOf("data:") !== 0 && styleSheetHref.indexOf("resource://") !== 0)
    {
      return true;
    }
  }

  return false;
};

// Toggles all the style sheets in a document
WebDeveloper.CSS.toggleAllStyleSheets = function(disable, contentDocument)
{
  var styleSheet  = null;
  var styleSheets = contentDocument.styleSheets;

  // Loop through the style sheets
  for(var i = 0, l = styleSheets.length; i < l; i++)
  {
    styleSheet = styleSheets[i];

    // If this is a valid style sheet and is not an alternate style sheet or style sheets are being disabled
    if(WebDeveloper.CSS.isValidStyleSheet(styleSheet) && (!WebDeveloper.CSS.isAlternateStyleSheet(styleSheet) || disable))
    {
      styleSheet.disabled = disable;
    }
  }
};
