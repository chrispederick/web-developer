WebDeveloper.CSS = {};

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

    // If there is no media and the match media type is screen
    if(mediaLength === 0 && mediaType == "screen")
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

// Returns true if this is a valid style sheet
WebDeveloper.CSS.isValidStyleSheet = function(styleSheet)
{
  // If the style sheet is set
  if(styleSheet)
  {
    var styleSheetHref = styleSheet.href;

    // If the style sheet href is not set or this is not a chrome style sheet
    if(!styleSheetHref || (styleSheetHref.indexOf("chrome://") !== 0 && styleSheetHref.indexOf("chrome-extension://") !== 0))
    {
      return true;
    }
  }

  return false;
};
