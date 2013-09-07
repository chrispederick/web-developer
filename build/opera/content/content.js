var WebDeveloper = WebDeveloper || {};

WebDeveloper.Common                = WebDeveloper.Common || {};
WebDeveloper.Common.requestTimeout = 10000;

// Adds a class to an element
WebDeveloper.Common.addClass = function(element, className)
{
  // If the element and class name are set and the element does not already have this class
  if(element && className && !WebDeveloper.Common.hasClass(element, className))
  {
    element.className = (element.className + " " + className).trim();
  }
};

// Adjusts the position of the given element
WebDeveloper.Common.adjustElementPosition = function(element, xPosition, yPosition, offset)
{
  // If the element is set
  if(element)
  {
    var contentWindow = WebDeveloper.Common.getContentWindow();
    var innerHeight   = contentWindow.innerHeight;
    var innerWidth    = contentWindow.innerWidth;
    var offsetHeight  = element.offsetHeight;
    var offsetWidth   = element.offsetWidth;
    var offsetX       = contentWindow.pageXOffset;
    var offsetY       = contentWindow.pageYOffset;

    // If the x position is less than 0
    if(xPosition < 0)
    {
      xPosition = 0;
    }

    // If the y position is less than 0
    if(yPosition < 0)
    {
      yPosition = 0;
    }

    // If the element will fit at the x position
    if((xPosition + offsetWidth + offset + 5) < (innerWidth + offsetX))
    {
      element.style.left = xPosition + offset + "px";
    }
    else
    {
      element.style.left = (innerWidth + offsetX - offsetWidth - offset) + "px";
    }

    // If the element will fit at the y position
    if((yPosition + offsetHeight + offset + 5) < (innerHeight + offsetY))
    {
      element.style.top = yPosition + offset + "px";
    }
    else
    {
      element.style.top = (innerHeight + offsetY - offsetHeight - offset) + "px";
    }
  }
};

// Returns true if the array contains the element
WebDeveloper.Common.contains = function(array, element)
{
  // If the array and element are set
  if(array && element)
  {
    try
    {
      // If the element does not exist in the array
      if(array.indexOf(element) == -1)
      {
        return false;
      }
      else
      {
        return true;
      }
    }
    catch(exception)
    {
      // Loop through the array
      for(var i = 0, l = array.length; i < l; i++)
      {
        // If the element is found
        if(array[i] == element)
        {
          return true;
        }
      }
    }
  }

  return false;
};

// Removes all child elements from an element
WebDeveloper.Common.empty = function(element)
{
  // If the element is set
  if(element)
  {
    var childElements = element.childNodes;

    // Loop through the child elements
    while(childElements.length)
    {
      element.removeChild(childElements[0]);
    }
  }
};

// Returns true if a string ends with another string
WebDeveloper.Common.endsWith = function(string, endsWith)
{
  return new RegExp(endsWith + "$").test(string);
};

// Formats dimensions
WebDeveloper.Common.formatDimensions = function(width, height, locale)
{
  // If the width and height are set
  if(width && height)
  {
    return locale.width + " = " + width + "px " + locale.height + " = " + height + "px";
  }
  else if(width)
  {
    return locale.width + " = " + width + "px";
  }
  else if(height)
  {
    return locale.height + " = " + height + "px";
  }

  return "";
};

// Returns the document body element
WebDeveloper.Common.getDocumentBodyElement = function(contentDocument)
{
  // If there is a body element
  if(contentDocument.body)
  {
    return contentDocument.body;
  }
  else
  {
    var bodyElement = contentDocument.querySelector("body");

    // If there is a body element
    if(bodyElement)
    {
      return bodyElement;
    }
  }

  return contentDocument.documentElement;
};

// Returns the document head element
WebDeveloper.Common.getDocumentHeadElement = function(contentDocument)
{
  var headElement = contentDocument.querySelector("head");

  // If there is a head element
  if(headElement)
  {
    return headElement;
  }

  return contentDocument.documentElement;
};

// Returns all of the images in the document
WebDeveloper.Common.getDocumentImages = function(contentDocument)
{
  var uniqueImages = [];

  // If the content document is set
  if(contentDocument)
  {
    var computedStyle   = null;
    var cssURI          = CSSPrimitiveValue.CSS_URI;
    var image           = null;
    var images          = [];
    var node            = null;
    var styleImage      = null;
    var treeWalker      = contentDocument.createTreeWalker(contentDocument, NodeFilter.SHOW_ELEMENT, null, false);

    // While the tree walker has more nodes
    while((node = treeWalker.nextNode()) !== null)
    {
      // If this is an image element
      if(node.tagName.toLowerCase() == "img")
      {
        images.push(node);
      }
      else if(node.tagName.toLowerCase() == "input" && node.src && node.type && node.type.toLowerCase() == "image")
      {
        image     = new Image();
        image.src = node.src;

        // If this is not a chrome image
        if(image.src.indexOf("chrome://") !== 0)
        {
          images.push(image);
        }
      }
      else if(node.tagName.toLowerCase() == "link" && node.href && node.href.indexOf("chrome://") !== 0 && node.rel && node.rel.indexOf("icon") != -1)
      {
        image     = new Image();
        image.src = node.href;

        images.push(image);
      }
      else
      {
        computedStyle = node.ownerDocument.defaultView.getComputedStyle(node, null);

        // If the computed style is set
        if(computedStyle)
        {
          styleImage = WebDeveloper.Common.getCSSProperty(computedStyle.getPropertyCSSValue("background-image"));

          // If this element has a background image and it is a URI
          if(styleImage && styleImage.primitiveType == cssURI)
          {
            image     = new Image();
            image.src = styleImage.getStringValue();

            // If this is not a chrome image
            if(image.src.indexOf("chrome://") !== 0)
            {
              images.push(image);
            }
          }

          styleImage = computedStyle.getPropertyCSSValue("list-style-image");

          // If this element has a background image and it is a URI
          if(styleImage && styleImage.primitiveType == cssURI)
          {
            image     = new Image();
            image.src = styleImage.getStringValue();

            // If this is not a chrome image
            if(image.src.indexOf("chrome://") !== 0)
            {
              images.push(image);
            }
          }
        }
      }
    }

    images.sort(WebDeveloper.Common.sortImages);

    // Loop through the images
    for(var i = 0, l = images.length; i < l; i++)
    {
      image = images[i];

      // If this is not the last image and the image is the same as the next image
      if(i + 1 < l && image.src == images[i + 1].src)
      {
        continue;
      }

      uniqueImages.push(image);
    }
  }

  return uniqueImages;
};

// Get the position of an element
WebDeveloper.Common.getElementPosition = function(element, xPosition)
{
  var position = 0;

  // If the element is set
  if(element)
  {
    var elementOffsetParent = element.offsetParent;

    // If the element has an offset parent
    if(elementOffsetParent)
    {
      // While there is an offset parent
      while((elementOffsetParent = element.offsetParent) !== null)
      {
        // If getting the x position
        if(xPosition)
        {
          position += element.offsetLeft;
        }
        else
        {
          position += element.offsetTop;
        }

        element = elementOffsetParent;
      }
    }
    else
    {
      // If getting the x position
      if(xPosition)
      {
        position = element.offsetLeft;
      }
      else
      {
        position = element.offsetTop;
      }
    }
  }

  return position;
};

// Get the x position of an element
WebDeveloper.Common.getElementPositionX = function(element)
{
  return WebDeveloper.Common.getElementPosition(element, true);
};

// Get the y position of an element
WebDeveloper.Common.getElementPositionY = function(element)
{
  return WebDeveloper.Common.getElementPosition(element, false);
};

// Returns the text from an element
WebDeveloper.Common.getElementText = function(element)
{
  var elementText = "";

  // If the element is set
  if(element)
  {
    var childNode     = null;
    var childNodes    = element.childNodes;
    var childNodeType = null;

    // Loop through the child nodes
    for(var i = 0, l = childNodes.length; i < l; i++)
    {
      childNode   = childNodes[i];
      childNodeType = childNode.nodeType;

      // If the child node type is an element
      if(childNodeType == Node.ELEMENT_NODE)
      {
        elementText += WebDeveloper.Common.getElementText(childNode);
      }
      else if(childNodeType == Node.TEXT_NODE)
      {
        elementText += childNode.nodeValue + " ";
      }
    }
  }

  return elementText;
};

// Returns the contents of the given URLs
WebDeveloper.Common.getURLContents = function(urlContentRequests, errorMessage, callback)
{
  var urlContentRequestsRemaining = urlContentRequests.length;
  var configuration               = { "callback": callback, "urlContentRequestsRemaining": urlContentRequestsRemaining };

  // Loop through the URL content requests
  for(var i = 0, l = urlContentRequests.length; i < l; i++)
  {
    WebDeveloper.Common.getURLContent(urlContentRequests[i], errorMessage, configuration);
  }
};

// Returns true if an element has the specified class
WebDeveloper.Common.hasClass = function(element, className)
{
  // If the element and class name are set
  if(element && className)
  {
    var classes = element.className.split(" ");

    // Loop through the classes
    for(var i = 0, l = classes.length; i < l; i++)
    {
      // If the classes match
      if(className == classes[i])
      {
        return true;
      }
    }
  }

  return false;
};

// Returns true if the item is in the array
WebDeveloper.Common.inArray = function(item, array)
{
  return WebDeveloper.Common.positionInArray(item, array) != -1;
};

// Includes JavaScript in a document
WebDeveloper.Common.includeJavaScript = function(url, contentDocument, callback)
{
  var scriptElement = contentDocument.createElement("script");

  // If a callback is set
  if(callback)
  {
    var load = (function(callbackFunction)
    {
      var handler = function()
      {
        callbackFunction();

        scriptElement.removeEventListener("load", handler, true);
      };

      return handler;
    })(callback);

    scriptElement.addEventListener("load", load, true);
  }

  scriptElement.setAttribute("src", WebDeveloper.Common.getChromeURL(url));
  WebDeveloper.Common.getDocumentBodyElement(contentDocument).appendChild(scriptElement);
};

// Inserts the given child after the element
WebDeveloper.Common.insertAfter = function(child, after)
{
  // If the child and after are set
  if(child && after)
  {
    var nextSibling = after.nextSibling;
    var parent      = after.parentNode;

    // If the element has a next sibling
    if(nextSibling)
    {
      parent.insertBefore(child, nextSibling);
    }
    else
    {
      parent.appendChild(child);
    }
  }
};

// Inserts the given element as the first child of the element
WebDeveloper.Common.insertAsFirstChild = function(element, child)
{
  // If the element and child are set
  if(element && child)
  {
    // If the element has child nodes
    if(element.hasChildNodes())
    {
      element.insertBefore(child, element.firstChild);
    }
    else
    {
      element.appendChild(child);
    }
  }
};

// Returns true if the ancestor element is an ancestor of the element
WebDeveloper.Common.isAncestor = function(element, ancestorElement)
{
  // If the element and ancestor element are set
  if(element && ancestorElement)
  {
    var parentElement = null;

    // Loop through the parent elements
    while((parentElement = element.parentNode) !== null)
    {
      // If the parent element is the ancestor element
      if(parentElement == ancestorElement)
      {
        return true;
      }
      else
      {
        element = parentElement;
      }
    }
  }

  return false;
};

// Returns the position if the item is in the array or -1 if it is not
WebDeveloper.Common.positionInArray = function(item, array)
{
  // If the array is set
  if(array)
  {
    // Loop through the array
    for(var i = 0, l = array.length; i < l; i++)
    {
      // If the item is in the array
      if(array[i] == item)
      {
        return i;
      }
    }
  }

  return -1;
};

// Removes a class from an element
WebDeveloper.Common.removeClass = function(element, className)
{
  // If the element and class name are set
  if(element && className)
  {
    var classes = element.className.split(" ");

    // Loop through the classes
    for(var i = 0, l = classes.length; i < l; i++)
    {
      // If the classes match
      if(className == classes[i])
      {
        classes.splice(i, 1);

        element.className = classes.join(" ").trim();

        break;
      }
    }
  }
};

// Removes all matching elements from a document
WebDeveloper.Common.removeMatchingElements = function(selector, contentDocument)
{
  var matchingElement  = null;
  var matchingElements = contentDocument.querySelectorAll(selector);

  // Loop through the matching elements
  for(var i = 0, l = matchingElements.length; i < l; i++)
  {
    matchingElement = matchingElements[i];

    // If the matching element has a parent node
    if(matchingElement.parentNode)
    {
      matchingElement.parentNode.removeChild(matchingElement);
    }
  }
};

// Removes the reload parameter from a URL
WebDeveloper.Common.removeReloadParameterFromURL = function(url)
{
  // If the URL is set
  if(url)
  {
    return url.replace(/(&|\?)web-developer-reload=\d+/, "");
  }

  return null;
};

// Removes a substring from a string
WebDeveloper.Common.removeSubstring = function(string, substring)
{
  // If the string and substring are not empty
  if(string && substring)
  {
    var substringStart = string.indexOf(substring);

    // If the substring is found in the string
    if(substring && substringStart != -1)
    {
      return string.substring(0, substringStart) + string.substring(substringStart + substring.length, string.length);
    }

    return string;
  }

  return "";
};

// Sorts two images
WebDeveloper.Common.sortImages = function(imageOne, imageTwo)
{
  // If both images are set
  if(imageOne && imageTwo)
  {
    var imageOneSrc = imageOne.src;
    var imageTwoSrc = imageTwo.src;

    // If the images are equal
    if(imageOneSrc == imageTwoSrc)
    {
      return 0;
    }
    else if(imageOneSrc < imageTwoSrc)
    {
      return -1;
    }
  }

  return 1;
};

// Toggles a class on an element
WebDeveloper.Common.toggleClass = function(element, className, value)
{
  // If the value is set
  if(value)
  {
    WebDeveloper.Common.addClass(element, className);
  }
  else
  {
    WebDeveloper.Common.removeClass(element, className);
  }
};

// Toggles a style sheet in a document
WebDeveloper.Common.toggleStyleSheet = function(url, id, contentDocument, insertFirst)
{
  var styleSheet = contentDocument.getElementById(id);

  // If the style sheet is already in the document
  if(styleSheet)
  {
    WebDeveloper.Common.removeMatchingElements("#" + id, contentDocument);
  }
  else
  {
    var headElement = WebDeveloper.Common.getDocumentHeadElement(contentDocument);
    var firstChild  = headElement.firstChild;
    var linkElement = contentDocument.createElement("link");

    linkElement.setAttribute("href", WebDeveloper.Common.getChromeURL(url));
    linkElement.setAttribute("id", id);
    linkElement.setAttribute("rel", "stylesheet");

    // If there is a first child
    if(insertFirst && firstChild)
    {
      headElement.insertBefore(linkElement, firstChild);
    }
    else
    {
      headElement.appendChild(linkElement);
    }
  }
};

// Handles the completion of a URL content request
WebDeveloper.Common.urlContentRequestComplete = function(content, urlContentRequest, configuration)
{
  urlContentRequest.content = content;

  configuration.urlContentRequestsRemaining--;

  // If there are no URL content requests remaining
  if(configuration.urlContentRequestsRemaining === 0)
  {
    configuration.callback();
  }
};
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Common = WebDeveloper.Common || {};

// Adjusts the position of the given element
WebDeveloper.Common.appendHTML = function(html, element, contentDocument)
{
  // If the HTML, element and content document are set
  if(html && element && contentDocument)
  {
    var htmlElement = contentDocument.createElement("div");

    htmlElement.innerHTML = html;

    // While there children of the HTML element
    while(htmlElement.firstChild)
    {
      element.appendChild(htmlElement.firstChild);
    }
  }
};

// Returns a chrome URL
WebDeveloper.Common.getChromeURL = function(url)
{
  return chrome.extension.getURL(url);
};

// Returns the current content document
WebDeveloper.Common.getContentDocument = function()
{
  return document;
};

// Returns the current content window
WebDeveloper.Common.getContentWindow = function()
{
  return window;
};

// Returns a CSS property
WebDeveloper.Common.getCSSProperty = function(property)
{
  return property;
};

// Gets the content from a URL
WebDeveloper.Common.getURLContent = function(urlContentRequest, errorMessage, configuration)
{
  var url = urlContentRequest.url;

  // If the URL is not entirely generated
  if(url.indexOf("wyciwyg://") !== 0)
  {
    // Try to download the file
    try
    {
      var request = new XMLHttpRequest();

      request.timeout = WebDeveloper.Common.requestTimeout;

      request.onreadystatechange = function()
      {
        // If the request completed
        if(request.readyState == 4)
        {
          WebDeveloper.Common.urlContentRequestComplete(request.responseText, urlContentRequest, configuration);
        }
      };

      request.ontimeout = function()
      {
        WebDeveloper.Common.urlContentRequestComplete(errorMessage, urlContentRequest, configuration);
      };

      request.open("get", url);
      request.send(null);
    }
    catch(exception)
    {
      WebDeveloper.Common.urlContentRequestComplete(errorMessage, urlContentRequest, configuration);
    }
  }
};
var WebDeveloper = WebDeveloper || {};

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
  }

  return styleProperty;
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

// Returns true if this is a valid rule style
WebDeveloper.CSS.isValidRuleStyle = function(ruleStyles, ruleStyle)
{
  // If the rule style is set
  if(ruleStyle)
  {
    // If the rule style is an invalid rule style
    if(ruleStyle.indexOf("-moz-") === 0 || ruleStyle.indexOf("-x-") === 0 || ruleStyles.getPropertyValue(ruleStyle).indexOf("-moz-") === 0 || ((ruleStyle.indexOf("-ltr-source") !== 0 || ruleStyle.indexOf("-rtl-source") !== 0) && ruleStyles.getPropertyValue(ruleStyle) === "physical"))
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
    if(!styleSheetHref || (styleSheetHref.indexOf("about:") !== 0 && styleSheetHref.indexOf("chrome://") !== 0 && styleSheetHref.indexOf("chrome-extension://") !== 0 && styleSheetHref.indexOf("data:") !== 0 && styleSheetHref.indexOf("resource://") !== 0))
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
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Content = WebDeveloper.Content || {};

// Adds the color of the specified property to the list
WebDeveloper.Content.addColor = function(node, property, colors)
{
  // If the node, property and colors are set
  if(node && property && colors)
  {
    var color = node.ownerDocument.defaultView.getComputedStyle(node, null).getPropertyCSSValue(property);

    // If the color is set and it is a color
    if(color && color.primitiveType == CSSPrimitiveValue.CSS_RGBCOLOR)
    {
      var cssNumber = CSSPrimitiveValue.CSS_NUMBER;

      color = color.getRGBColorValue();

      colors.push("#" + WebDeveloper.Content.formatColor(color.red.getFloatValue(cssNumber)) + WebDeveloper.Content.formatColor(color.green.getFloatValue(cssNumber)) + WebDeveloper.Content.formatColor(color.blue.getFloatValue(cssNumber)));
    }
  }
};

// Filters cookies based on the parameters
WebDeveloper.Content.filterCookies = function(allCookies, host, path, sort)
{
  var filteredCookies = [];

  // If the cookies and host are set
  if(allCookies && host)
  {
    var cookie     = null;
    var cookieHost = null;
    var cookiePath = null;

    // Loop through the cookies
    for(var i = 0, l = allCookies.length; i < l; i++)
    {
      cookie = allCookies[i];

      cookieHost = cookie.host;
      cookiePath = cookie.path;

      // If there is a host and path for this cookie
      if(cookieHost && cookiePath)
      {
        // If the cookie host starts with '.'
        if(cookieHost.charAt(0) == ".")
        {
          cookieHost = cookieHost.substring(1);
        }

        // If the host and cookie host and path and cookie path match
        if((host == cookieHost || WebDeveloper.Common.endsWith(host, "." + cookieHost)) && (path == cookiePath || cookiePath.indexOf(path) === 0))
        {
          filteredCookies.push(cookie);
        }
      }
    }

    // If sorting cookies
    if(sort)
    {
      filteredCookies.sort(WebDeveloper.Content.sortCookies);
    }
  }

  return filteredCookies;
};

// Formats a CSS color
WebDeveloper.Content.formatColor = function(color)
{
  var formattedColor = color.toString(16);

  // If the formatted color is less than 2 characters long
  if(formattedColor.length < 2)
  {
    return "0" + formattedColor;
  }

  return formattedColor;
};

// Returns any anchors in the document
WebDeveloper.Content.getAnchors = function()
{
  var anchor             = null;
  var anchors            = {};
  var contentDocument    = WebDeveloper.Common.getContentDocument();
  var contentDocuments   = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var documentAllAnchors = null;
  var documentAnchors    = null;
  var nonUniqueAnchors   = null;

  anchors.documents = [];
  anchors.pageTitle = contentDocument.title;
  anchors.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument         = contentDocuments[i];
    documentAllAnchors      = contentDocument.querySelectorAll("[id]");
    documentAnchors         = {};
    documentAnchors.anchors = [];
    documentAnchors.url     = contentDocument.documentURI;
    nonUniqueAnchors        = [];

    // Loop through the id anchors
    for(var j = 0, m = documentAllAnchors.length; j < m; j++)
    {
      nonUniqueAnchors.push(documentAllAnchors[j].getAttribute("id"));
    }

    documentAllAnchors = contentDocument.querySelectorAll("a[name]");

    // Loop through the name anchors
    for(j = 0, m = documentAllAnchors.length; j < m; j++)
    {
      nonUniqueAnchors.push(documentAllAnchors[j].getAttribute("name"));
    }

    nonUniqueAnchors.sort();

    // Loop through the anchors
    for(j = 0, m = nonUniqueAnchors.length; j < m; j++)
    {
      anchor = nonUniqueAnchors[j];

      // If this is not the last anchor and the anchor is the same as the next anchor
      if(j + 1 < m && anchor == nonUniqueAnchors[j + 1])
      {
        continue;
      }

      documentAnchors.anchors.push(anchor);
    }

    anchors.documents.push(documentAnchors);
  }

  return anchors;
};

// Returns any broken images in the document
WebDeveloper.Content.getBrokenImages = function()
{
  var brokenImages      = {};
  var contentDocument   = WebDeveloper.Common.getContentDocument();
  var contentDocuments  = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var documentAllImages = null;
  var documentImages    = null;
  var image             = null;

  brokenImages.documents = [];
  brokenImages.pageTitle = contentDocument.title;
  brokenImages.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument       = contentDocuments[i];
    documentAllImages     = WebDeveloper.Common.getDocumentImages(contentDocument);
    documentImages        = {};
    documentImages.images = [];
    documentImages.url    = contentDocument.documentURI;

    // Loop through the images
    for(var j = 0, m = documentAllImages.length; j < m; j++)
    {
      image = documentAllImages[j];

      // If the image is broken
      if(!image.naturalWidth && !image.naturalHeight)
      {
        documentImages.images.push(image.src);
      }
    }

    brokenImages.documents.push(documentImages);
  }

  return brokenImages;
};

// Returns all the colors used on the page
WebDeveloper.Content.getColors = function()
{
  var colors           = {};
  var contentDocument  = WebDeveloper.Common.getContentDocument();
  var contentDocuments = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var documentColors   = null;

  colors.documents = [];
  colors.pageTitle = contentDocument.title;
  colors.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument       = contentDocuments[i];
    documentColors        = {};
    documentColors.colors = WebDeveloper.Content.getDocumentColors(contentDocument);
    documentColors.url    = contentDocument.documentURI;

    colors.documents.push(documentColors);
  }

  return colors;
};

// Returns all the cookies for the document
WebDeveloper.Content.getCookies = function(allCookies)
{
  var contentDocument  = WebDeveloper.Common.getContentDocument();
  var contentDocuments = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var cookies          = {};
  var documentCookies  = null;
  var host             = null;

  cookies.documents = [];
  cookies.pageTitle = contentDocument.title;
  cookies.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument         = contentDocuments[i];
    documentCookies         = {};
    documentCookies.cookies = [];
    documentCookies.url     = contentDocument.documentURI;
    host                    = null;

    // Try to get the host
    try
    {
      host = contentDocument.location.hostname;
    }
    catch(exception)
    {
      // Ignore
    }

    documentCookies.cookies = WebDeveloper.Content.filterCookies(allCookies, host, "/", true);

    cookies.documents.push(documentCookies);
  }

  return cookies;
};

// Returns all the CSS for the document
WebDeveloper.Content.getCSS = function()
{
  var contentDocument  = WebDeveloper.Common.getContentDocument();
  var contentDocuments = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var css              = {};

  css.documents = [];
  css.pageTitle = contentDocument.title;
  css.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    css.documents.push(WebDeveloper.Content.getDocumentCSS(contentDocuments[i]));
  }

  return css;
};

// Returns all the colors used in the document
WebDeveloper.Content.getDocumentColors = function(contentDocument)
{
  var colors     = [];
  var node       = null;
  var treeWalker = contentDocument.createTreeWalker(WebDeveloper.Common.getDocumentBodyElement(contentDocument), NodeFilter.SHOW_ELEMENT, null, false);

  // While the tree walker has more nodes
  while((node = treeWalker.nextNode()) !== null)
  {
    WebDeveloper.Content.addColor(node, "background-color", colors);
    WebDeveloper.Content.addColor(node, "border-bottom-color", colors);
    WebDeveloper.Content.addColor(node, "border-left-color", colors);
    WebDeveloper.Content.addColor(node, "border-right-color", colors);
    WebDeveloper.Content.addColor(node, "border-top-color", colors);
    WebDeveloper.Content.addColor(node, "color", colors);
  }

  colors = WebDeveloper.Content.tidyColors(colors);

  return colors;
};


// Returns the CSS for the specified document
WebDeveloper.Content.getDocumentCSS = function(contentDocument, screenOnly)
{
  var documentCSS     = {};
  var embeddedStyles  = "";
  var styleSheet      = null;
  var styleSheets     = contentDocument.getElementsByTagName("style");
  var styleSheetSheet = null;
  var styleSheetURL   = null;

  documentCSS.url         = contentDocument.documentURI;
  documentCSS.styleSheets = [];

  // Loop through the embedded style sheets
  for(var i = 0, l = styleSheets.length; i < l; i++)
  {
    styleSheet      = styleSheets[i];
    styleSheetSheet = styleSheet.sheet;

    // If this is a valid style sheet and not returning media screen only or this is an active screen style sheet
    if(WebDeveloper.CSS.isValidStyleSheet(styleSheetSheet) && (!screenOnly || WebDeveloper.CSS.isMediaStyleSheet(styleSheetSheet, "screen")))
    {
      embeddedStyles += styleSheet.textContent.trim() + "\n\n";

      documentCSS.styleSheets = documentCSS.styleSheets.concat(WebDeveloper.CSS.getImportedStyleSheets(styleSheetSheet));
    }
  }

  styleSheets = contentDocument.styleSheets;

  // Loop through the style sheets
  for(i = 0, l = styleSheets.length; i < l; i++)
  {
    styleSheet    = styleSheets[i];
    styleSheetURL = styleSheet.href;

    // If this is a valid style sheet, is not an inline style sheet or disabled and not returning media screen only or this is an active screen style sheet
    if(WebDeveloper.CSS.isValidStyleSheet(styleSheet) && styleSheetURL && styleSheetURL != contentDocument.documentURI && !styleSheet.disabled && (!screenOnly || (WebDeveloper.CSS.isMediaStyleSheet(styleSheet, "screen") && !WebDeveloper.CSS.isAlternateStyleSheet(styleSheet))))
    {
      documentCSS.styleSheets.push(WebDeveloper.Common.removeReloadParameterFromURL(styleSheetURL));

      documentCSS.styleSheets = documentCSS.styleSheets.concat(WebDeveloper.CSS.getImportedStyleSheets(styleSheet));
    }
  }

  // If there are embedded styles
  if(embeddedStyles)
  {
    documentCSS.embedded = embeddedStyles;
  }

  return documentCSS;
};

// Returns the details for the document
WebDeveloper.Content.getDocumentDetails = function()
{
  var contentDocument = WebDeveloper.Common.getContentDocument();
  var documentDetails = {};

  documentDetails.pageTitle = contentDocument.title;
  documentDetails.pageURL   = contentDocument.documentURI;

  return documentDetails;
};

// Returns the outline for a document
WebDeveloper.Content.getDocumentOutline = function()
{
  var contentDocument     = WebDeveloper.Common.getContentDocument();
  var contentDocuments    = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var documentAllHeadings = null;
  var documentHeading     = null;
  var documentOutline     = null;
  var heading             = null;
  var headingImages       = null;
  var headingText         = null;
  var outline             = {};

  outline.documents = [];
  outline.pageTitle = contentDocument.title;
  outline.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument          = contentDocuments[i];
    documentAllHeadings      = contentDocument.querySelectorAll("h1, h2, h3, h4, h5, h6");
    documentOutline          = {};
    documentOutline.headings = [];
    documentOutline.url      = contentDocument.documentURI;

    // Loop through the headers
    for(var j = 0, m = documentAllHeadings.length; j < m; j++)
    {
      documentHeading       = {};
      heading               = documentAllHeadings[j];
      headingText           = WebDeveloper.Common.getElementText(heading).trim();
      documentHeading.level = parseInt(heading.tagName.toLowerCase().substring(1), 10);

      // If there is no heading text
      if(!headingText)
      {
        headingImages = heading.querySelectorAll("img[alt]");

        // Loop through the heading images
        for(var k = 0, n = headingImages.length; k < n; k++)
        {
          headingText += headingImages[k].getAttribute("alt") + " ";
        }

        headingText = headingText.trim();

        // If there is heading text
        if(headingText)
        {
          headingText = "(" + headingText + ")";
        }
      }

      documentHeading.text = headingText;

      documentOutline.headings.push(documentHeading);
    }

    outline.documents.push(documentOutline);
  }

  return outline;
};

// Returns all the documents under a frame
WebDeveloper.Content.getDocuments = function(frame)
{
  var documents = [];

  // If the frame is set
  if(frame)
  {
    var frames = frame.frames;

    // If the frame document exists
    if(frame.document)
    {
      documents.push(frame.document);
    }

    // Loop through the frames
    for(var i = 0, l = frames.length; i < l; i++)
    {
      documents = documents.concat(WebDeveloper.Content.getDocuments(frames[i]));
    }
  }

  return documents;
};

// Returns any duplicate ids in the document
WebDeveloper.Content.getDuplicateIds = function()
{
  var contentDocument      = WebDeveloper.Common.getContentDocument();
  var contentDocuments     = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var documentAllIds       = null;
  var documentDuplicateIds = null;
  var duplicateIds         = {};
  var id                   = null;
  var nonDuplicateIds    = null;

  duplicateIds.documents = [];
  duplicateIds.pageTitle = contentDocument.title;
  duplicateIds.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument          = contentDocuments[i];
    documentAllIds           = contentDocument.querySelectorAll("[id]");
    documentDuplicateIds     = {};
    documentDuplicateIds.ids = [];
    documentDuplicateIds.url = contentDocument.documentURI;
    nonDuplicateIds          = [];

    // Loop through the ids
    for(var j = 0, m = documentAllIds.length; j < m; j++)
    {
      nonDuplicateIds.push(documentAllIds[j].getAttribute("id"));
    }

    nonDuplicateIds.sort();

    // Loop through the ids
    for(j = 0, m = nonDuplicateIds.length; j < m; j++)
    {
      id = nonDuplicateIds[j];

      // If this is the same as the previous id and it is not already in the duplicate ids array
      if(id == nonDuplicateIds[j - 1] && !WebDeveloper.Common.inArray(id, documentDuplicateIds.ids))
      {
        documentDuplicateIds.ids.push(id);
      }
    }

    duplicateIds.documents.push(documentDuplicateIds);
  }

  return duplicateIds;
};

// Returns any forms in the document
WebDeveloper.Content.getForms = function()
{
  var allForms            = null;
  var contentDocument     = WebDeveloper.Common.getContentDocument();
  var contentDocuments    = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var documentForm        = null;
  var documentFormElement = null;
  var documentForms       = null;
  var elementType         = null;
  var form                = null;
  var formElement         = null;
  var formElementId       = null;
  var formElements        = null;
  var forms               = {};
  var labelElement        = null;

  forms.documents = [];
  forms.pageTitle = contentDocument.title;
  forms.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument     = contentDocuments[i];
    allForms            = contentDocument.forms;
    documentForms       = {};
    documentForms.forms = [];
    documentForms.url   = contentDocument.documentURI;

    // Loop through the forms
    for(var j = 0, m = allForms.length; j < m; j++)
    {
      documentForm          = {};
      documentForm.elements = [];
      form                  = allForms[j];
      formElements          = form.elements;

      // If the form has an action attribute
      if(form.hasAttribute("action"))
      {
        documentForm.action = form.getAttribute("action");
      }

      // If the form has an id attribute
      if(form.hasAttribute("id"))
      {
        documentForm.id = form.getAttribute("id");
      }

      // If the form has a method attribute
      if(form.hasAttribute("method"))
      {
        documentForm.method = form.getAttribute("method");
      }

      // If the form has a name attribute
      if(form.hasAttribute("name"))
      {
        documentForm.name = form.getAttribute("name");
      }

      // Loop through the form elements
      for(var k = 0, n = formElements.length; k < n; k++)
      {
        documentFormElement = {};
        formElement         = formElements[k];
        elementType         = formElement.tagName.toLowerCase();
        formElementId       = formElement.getAttribute("id");
        labelElement        = formElement.parentNode;

        // If this is an input element
        if(elementType == "input")
        {
          documentFormElement.value = formElement.value;

          // If the form element has a type attribute
          if(formElement.hasAttribute("type"))
          {
            elementType = formElement.getAttribute("type");
          }
        }
        else if(elementType == "select" || elementType == "textarea")
        {
          documentFormElement.value = formElement.value;
        }

        // If the parent element is a label
        if(labelElement.tagName.toLowerCase() == "label")
        {
          documentFormElement.label = labelElement.textContent.trim();
        }

        // If the form element has an id attribute
        if(formElementId)
        {
          documentFormElement.id = formElementId;

          // If the label is not already set
          if(!documentFormElement.label)
          {
            labelElement = contentDocument.querySelector("label[for=" + formElementId + "]");

            // If a label element was found
            if(labelElement)
            {
              documentFormElement.label = labelElement.textContent.trim();
            }
          }
        }

        // If the form element has a maxlength attribute
        if(formElement.hasAttribute("maxlength"))
        {
          documentFormElement.maximumLength = formElement.getAttribute("maxlength");
        }

        // If the form element has a name attribute
        if(formElement.hasAttribute("name"))
        {
          documentFormElement.name = formElement.getAttribute("name");
        }

        // If the form element has a size attribute
        if(formElement.hasAttribute("size"))
        {
          documentFormElement.size = formElement.getAttribute("size");
        }

        documentFormElement.type = elementType;

        documentForm.elements.push(documentFormElement);
      }

      documentForms.forms.push(documentForm);
    }

    forms.documents.push(documentForms);
  }

  return forms;
};

// Returns any images in the document
WebDeveloper.Content.getImages = function()
{
  var allImages        = null;
  var contentDocument  = WebDeveloper.Common.getContentDocument();
  var contentDocuments = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var documentImage    = null;
  var documentImages   = null;
  var image            = null;
  var images           = {};

  images.documents = [];
  images.pageTitle = contentDocument.title;
  images.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument       = contentDocuments[i];
    allImages             = WebDeveloper.Common.getDocumentImages(contentDocument);
    documentImages        = {};
    documentImages.images = [];
    documentImages.url    = contentDocument.documentURI;

    // Loop through the images
    for(var j = 0, m = allImages.length; j < m; j++)
    {
      documentImage = {};
      image         = allImages[j];

      // If the image has an alt attribute
      if(image.hasAttribute("alt"))
      {
        documentImage.alt = image.getAttribute("alt");
      }

      documentImage.height = image.naturalHeight;
      documentImage.src    = image.src;
      documentImage.width  = image.naturalWidth;

      documentImages.images.push(documentImage);
    }

    images.documents.push(documentImages);
  }

  return images;
};

// Returns any JavaScript for the document
WebDeveloper.Content.getJavaScript = function()
{
  var contentDocument    = WebDeveloper.Common.getContentDocument();
  var contentDocuments   = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var documentJavaScript = null;
  var embeddedJavaScript = null;
  var javaScript         = {};
  var script             = null;
  var scripts            = null;

  javaScript.documents = [];
  javaScript.pageTitle = contentDocument.title;
  javaScript.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument    = contentDocuments[i];
    documentJavaScript = {};
    embeddedJavaScript = "";
    scripts            = contentDocument.getElementsByTagName("script");

    documentJavaScript.url        = contentDocument.documentURI;
    documentJavaScript.javaScript = [];

    // Loop through the scripts
    for(var j = 0, m = scripts.length; j < m; j++)
    {
      script = scripts[j];

      // If this is a valid external script
      if(script.src)
      {
        documentJavaScript.javaScript.push(script.src);
      }
      else
      {
        embeddedJavaScript += script.textContent.trim() + "\n\n";
      }
    }

    // If there is embedded JavaScript
    if(embeddedJavaScript)
    {
      documentJavaScript.embedded = embeddedJavaScript;
    }

    javaScript.documents.push(documentJavaScript);
  }

  return javaScript;
};

// Returns any links in the document
WebDeveloper.Content.getLinks = function()
{
  var contentDocument  = WebDeveloper.Common.getContentDocument();
  var contentDocuments = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var documentAllLinks = null;
  var documentLinks    = null;
  var link             = null;
  var links            = {};
  var nonUniqueLinks   = null;

  links.documents = [];
  links.pageTitle = contentDocument.title;
  links.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument     = contentDocuments[i];
    documentAllLinks    = contentDocument.links;
    documentLinks       = {};
    documentLinks.links = [];
    documentLinks.url   = contentDocument.documentURI;
    nonUniqueLinks      = [];

    // Loop through the links
    for(var j = 0, m = documentAllLinks.length; j < m; j++)
    {
      nonUniqueLinks.push(documentAllLinks[j].href);
    }

    nonUniqueLinks.sort();

    // Loop through the links
    for(j = 0, m = nonUniqueLinks.length; j < m; j++)
    {
      link = nonUniqueLinks[j];

      // If this is not the last link and the link is the same as the next link
      if(j + 1 < m && link == nonUniqueLinks[j + 1])
      {
        continue;
      }

      documentLinks.links.push(link);
    }

    links.documents.push(documentLinks);
  }

  return links;
};

// Returns any meta tags in the document
WebDeveloper.Content.getMetaTags = function()
{
  var contentDocument     = WebDeveloper.Common.getContentDocument();
  var contentDocuments    = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var documentAllMetaTags = null;
  var documentMetaTag     = null;
  var documentMetaTags    = null;
  var metaTag             = null;
  var metaTags            = {};

  metaTags.documents = [];
  metaTags.pageTitle = contentDocument.title;
  metaTags.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument           = contentDocuments[i];
    documentAllMetaTags       = contentDocument.getElementsByTagName("meta");
    documentMetaTags          = {};
    documentMetaTags.metaTags = [];
    documentMetaTags.url      = contentDocument.documentURI;

    // Loop through the meta tags
    for(var j = 0, m = documentAllMetaTags.length; j < m; j++)
    {
      documentMetaTag = {};
      metaTag         = documentAllMetaTags[j];

      // If the meta tag has a name attribute
      if(metaTag.hasAttribute("name"))
      {
        documentMetaTag.content = metaTag.getAttribute("content");
        documentMetaTag.name    = metaTag.getAttribute("name");
      }
      else if(metaTag.hasAttribute("charset"))
      {
        documentMetaTag.content = metaTag.getAttribute("charset");
        documentMetaTag.name    = "charset";
      }
      else if(metaTag.hasAttribute("http-equiv"))
      {
        documentMetaTag.content = metaTag.getAttribute("content");
        documentMetaTag.name    = metaTag.getAttribute("http-equiv");
      }
      else if(metaTag.hasAttribute("property"))
      {
        documentMetaTag.content = metaTag.getAttribute("content");
        documentMetaTag.name    = metaTag.getAttribute("property");
      }

      documentMetaTags.metaTags.push(documentMetaTag);
    }

    metaTags.documents.push(documentMetaTags);
  }

  return metaTags;
};

// Returns the window size
WebDeveloper.Content.getWindowSize = function()
{
  var size = {};

  size.innerHeight = window.innerHeight;
  size.innerWidth  = window.innerWidth;
  size.outerHeight = window.outerHeight;
  size.outerWidth  = window.outerWidth;

  return size;
};

// Sorts two cookies
WebDeveloper.Content.sortCookies = function(cookieOne, cookieTwo)
{
  // If cookie one and cookie two are set
  if(cookieOne && cookieTwo)
  {
    var cookieOneHost = cookieOne.host;
    var cookieOneName = cookieOne.name;
    var cookieTwoHost = cookieTwo.host;
    var cookieTwoName = cookieTwo.name;

    // If the cookies are equal
    if(cookieOneHost == cookieTwoHost && cookieOneName == cookieTwoName)
    {
      return 0;
    }
    else if(cookieOneHost < cookieTwoHost || (cookieOneHost == cookieTwoHost && cookieOneName < cookieTwoName))
    {
      return -1;
    }
  }

  return 1;
};

// Tidies a list of colors by removing duplicates and sorting
WebDeveloper.Content.tidyColors = function(colors)
{
  var color      = null;
  var tidiedColors = [];

  colors.sort();

  // Loop through the colors
  for(var i = 0, l = colors.length; i < l; i++)
  {
    color = colors[i];

    // If this is not the last color and the color is the same as the next color
    if(i + 1 < l && color == colors[i + 1])
    {
      continue;
    }

    tidiedColors.push(color);
  }

  return tidiedColors;
};
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Content = WebDeveloper.Content || {};

// Returns any domain cookies
WebDeveloper.Content.getDomainCookies = function(allCookies)
{
  var documents     = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var domainCookies = [];

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    // Try to get the host
    try
    {
      domainCookies = domainCookies.concat(WebDeveloper.Content.filterCookies(allCookies, documents[i].location.hostname, "/", false));
    }
    catch(exception)
    {
      // Ignore
    }
  }

  return domainCookies;
};

// Returns the details for the location
WebDeveloper.Content.getLocationDetails = function()
{
  var windowLocation  = WebDeveloper.Common.getContentWindow().location;
  var locationDetails = {};

  locationDetails.host = windowLocation.hostname;
  locationDetails.path = windowLocation.pathname;

  return locationDetails;
};

// Returns any path cookies
WebDeveloper.Content.getPathCookies = function(allCookies)
{
  var contentDocument = null;
  var documents       = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var pathCookies     = [];

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // Try to get the host and path
    try
    {
      pathCookies = pathCookies.concat(WebDeveloper.Content.filterCookies(allCookies, contentDocument.location.hostname, contentDocument.location.pathname, false));
    }
    catch(exception)
    {
      // Ignore
    }
  }

  return pathCookies;
};

// Handles any content messages
WebDeveloper.Content.message = function(message, sender, sendResponse)
{
  // If the message type is to get anchors
  if(message.type == "get-anchors")
  {
    sendResponse(WebDeveloper.Content.getAnchors());
  }
  else if(message.type == "get-broken-images")
  {
    sendResponse(WebDeveloper.Content.getBrokenImages());
  }
  else if(message.type == "get-colors")
  {
    sendResponse(WebDeveloper.Content.getColors());
  }
  else if(message.type == "get-cookies")
  {
    sendResponse(WebDeveloper.Content.getCookies(message.allCookies));
  }
  else if(message.type == "get-css")
  {
    sendResponse(WebDeveloper.Content.getCSS());
  }
  else if(message.type == "get-document-details")
  {
    sendResponse(WebDeveloper.Content.getDocumentDetails());
  }
  else if(message.type == "get-document-outline")
  {
    sendResponse(WebDeveloper.Content.getDocumentOutline());
  }
  else if(message.type == "get-domain-cookies")
  {
    sendResponse(WebDeveloper.Content.getDomainCookies(message.allCookies));
  }
  else if(message.type == "get-duplicate-ids")
  {
    sendResponse(WebDeveloper.Content.getDuplicateIds());
  }
  else if(message.type == "get-forms")
  {
    sendResponse(WebDeveloper.Content.getForms());
  }
  else if(message.type == "get-images")
  {
    sendResponse(WebDeveloper.Content.getImages());
  }
  else if(message.type == "get-javascript")
  {
    sendResponse(WebDeveloper.Content.getJavaScript());
  }
  else if(message.type == "get-links")
  {
    sendResponse(WebDeveloper.Content.getLinks());
  }
  else if(message.type == "get-location-details")
  {
    sendResponse(WebDeveloper.Content.getLocationDetails());
  }
  else if(message.type == "get-meta-tags")
  {
    sendResponse(WebDeveloper.Content.getMetaTags());
  }
  else if(message.type == "get-path-cookies")
  {
    sendResponse(WebDeveloper.Content.getPathCookies(message.allCookies));
  }
  else if(message.type == "get-window-size")
  {
    sendResponse(WebDeveloper.Content.getWindowSize());
  }
  else
  {
    // Unknown message
    sendResponse({});
  }
};

chrome.extension.onMessage.addListener(WebDeveloper.Content.message);
