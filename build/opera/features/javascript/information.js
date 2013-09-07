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

// Displays a notification
WebDeveloper.Common.displayNotification = function(message, parameters)
{
  chrome.extension.sendMessage({"message": message, "parameters": parameters, "type": "display-notification" });
};
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Information                       = WebDeveloper.Information || {};
WebDeveloper.Information.divDimensionsLocale   = null;
WebDeveloper.Information.divDimensionsTimeout  = null;
WebDeveloper.Information.divDimensionsUpdating = false;

// Displays the abbreviations on a page
WebDeveloper.Information.displayAbbreviations = function(documents)
{
  var contentDocument = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-abbreviations-before", contentDocument, false);
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/information/display-abbreviations.css", "web-developer-display-abbreviations", contentDocument, false);
  }
};

// Displays the access keys on a page
WebDeveloper.Information.displayAccessKeys = function(display, documents)
{
  var accessKeyElement  = null;
  var accessKeyElements = null;
  var contentDocument = null;
  var spanElement       = null;
  var text              = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    WebDeveloper.Common.removeMatchingElements(".web-developer-display-access-keys", contentDocument);

    // If displaying the access keys
    if(display)
    {
      accessKeyElements = contentDocument.querySelectorAll("[accesskey]");

      // Loop through the access key elements
      for(var j = 0, m = accessKeyElements.length; j < m; j++)
      {
        accessKeyElement = accessKeyElements[j];
        spanElement      = contentDocument.createElement("span");
        text             = 'accesskey="' + accessKeyElement.getAttribute("accesskey") + '"';

        spanElement.setAttribute("class", "web-developer-display-access-keys");
        spanElement.appendChild(contentDocument.createTextNode(text));
        accessKeyElement.parentNode.insertBefore(spanElement, accessKeyElement);
      }
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-access-keys", contentDocument, false);
  }
};

// Displays the anchors on a page
WebDeveloper.Information.displayAnchors = function(display, documents)
{
  var anchorElement    = null;
  var anchorElements   = null;
  var contentDocument  = null;
  var documentLocation = null;
  var anchorLocation   = null;
  var linkElement      = null;
  var spanElement      = null;
  var text             = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    WebDeveloper.Common.removeMatchingElements(".web-developer-display-anchors", contentDocument);

    // If displaying the anchors
    if(display)
    {
      anchorElements   = contentDocument.querySelectorAll("[id], [name]");
      documentLocation = contentDocument.location;
      anchorLocation   = documentLocation.pathname + documentLocation.search;

      // Loop through the anchor elements
      for(var j = 0, m = anchorElements.length; j < m; j++)
      {
        anchorElement = anchorElements[j];

        // If the anchor element is not the document root element
        if(anchorElement != contentDocument.documentElement)
        {
          linkElement = contentDocument.createElement("a");
          spanElement = contentDocument.createElement("span");
          text        = anchorLocation;

          // If the anchor element has an id attribute
          if(anchorElement.hasAttribute("id"))
          {
            text = "#" + anchorElement.getAttribute("id");
          }
          else if(anchorElement.hasAttribute("name"))
          {
            text = "#" + anchorElement.getAttribute("name");
          }

          linkElement.setAttribute("href", text);
          linkElement.appendChild(contentDocument.createTextNode(text));

          spanElement.setAttribute("class", "web-developer-display-anchors");
          spanElement.appendChild(linkElement);
          anchorElement.parentNode.insertBefore(spanElement, anchorElement);
        }
      }
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-anchors", contentDocument, false);
  }
};

// Displays the ARIA roles on a page
WebDeveloper.Information.displayARIARoles = function(documents)
{
  var contentDocument = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-aria-roles-before", contentDocument, false);
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/information/display-aria-roles.css", "web-developer-display-aria-roles", contentDocument, false);
  }
};

// Displays the dimensions for divs on a page
WebDeveloper.Information.displayDivDimensions = function(display, documents, locale)
{
  var contentDocument = null;

  // If displaying the div dimensions
  if(display)
  {
    WebDeveloper.Information.divDimensionsLocale = locale;

    window.addEventListener("resize", WebDeveloper.Information.resizeDivDimensions, false);
  }
  else
  {
    WebDeveloper.Information.divDimensionsLocale = null;

    window.removeEventListener("resize", WebDeveloper.Information.resizeDivDimensions, false);
  }

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If displaying the div size
    if(display)
    {
      WebDeveloper.Information.updateDivDimensions(contentDocument);
    }
    else
    {
      WebDeveloper.Common.removeMatchingElements(".web-developer-display-div-dimensions", contentDocument);
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-div-dimensions-before", contentDocument, false);
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/information/display-div-dimensions.css", "web-developer-display-div-dimensions", contentDocument, false);
  }
};

// Displays the order of the divs on a page
WebDeveloper.Information.displayDivOrder = function(display, documents)
{
  var contentDocument  = null;
  var div              = null;
  var divs             = null;
  var spanElement      = null;
  var text             = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If displaying the div order
    if(display)
    {
      divs = contentDocument.getElementsByTagName("div");

      // Loop through the divs
      for(var j = 0, m = divs.length; j < m; j++)
      {
        div         = divs[j];
        spanElement = contentDocument.createElement("span");
        text        = WebDeveloper.Information.getElementDescription(div) + " " + (j + 1);

        spanElement.setAttribute("class", "web-developer-display-div-order");
        spanElement.appendChild(contentDocument.createTextNode(text));

        WebDeveloper.Common.insertAsFirstChild(div, spanElement);
      }
    }
    else
    {
      WebDeveloper.Common.removeMatchingElements(".web-developer-display-div-order", contentDocument);
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-div-order-before", contentDocument, false);
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/information/display-div-order.css", "web-developer-display-div-order", contentDocument, false);
  }
};

// Displays the id and class details for a page
WebDeveloper.Information.displayIdClassDetails = function(display, documents)
{
  var contentDocument = null;
  var idClassElement  = null;
  var idClassElements = null;
  var spanElement     = null;
  var text            = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If displaying the id and class details
    if(display)
    {
      idClassElements = contentDocument.querySelectorAll("[class], [id]");

      // Loop through the id and class elements
      for(var j = 0, m = idClassElements.length; j < m; j++)
      {
        idClassElement = idClassElements[j];

        // If the id class element is not the document root element or a Web Developer element
        if(idClassElement != contentDocument.documentElement && ((idClassElement.hasAttribute("class") && idClassElement.getAttribute("class").indexOf("web-developer-") !== 0) || (idClassElement.hasAttribute("id") && idClassElement.getAttribute("id").indexOf("web-developer-") !== 0)))
        {
          spanElement = contentDocument.createElement("span");
          text         = WebDeveloper.Information.getElementDescription(idClassElement);

          spanElement.setAttribute("class", "web-developer-id-class-details");
          spanElement.appendChild(contentDocument.createTextNode(text));
          idClassElement.parentNode.insertBefore(spanElement, idClassElement);
        }
      }
    }
    else
    {
      WebDeveloper.Common.removeMatchingElements(".web-developer-id-class-details", contentDocument);
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-id-class-details", contentDocument, false);
  }
};

// Displays the details for the links on a page
WebDeveloper.Information.displayLinkDetails = function(documents)
{
  var contentDocument = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-link-details-before", contentDocument, false);
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/information/display-link-details.css", "web-developer-display-link-details", contentDocument, false);
  }
};

// Displays the information for objects on a page
WebDeveloper.Information.displayObjectInformation = function(display, documents)
{
  var contentDocument  = null;
  var divElement       = null;
  var object           = null;
  var objectAttributes = null;
  var objects          = null;
  var param            = null;
  var paramAttributes  = null;
  var params           = null;
  var pElement         = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If displaying the object information
    if(display)
    {
      objects = contentDocument.getElementsByTagName("object");

      // Loop through the objects
      for(var j = 0, m = objects.length; j < m; j++)
      {
        divElement       = contentDocument.createElement("div");
        object           = objects[j];
        objectAttributes = "";
        params           = object.getElementsByTagName("param");
        pElement         = contentDocument.createElement("p");

        // If the object has an width attribute
        if(object.hasAttribute("width"))
        {
          objectAttributes += ' width="' + object.getAttribute("width") + '"';
        }

        // If the object has an height attribute
        if(object.hasAttribute("height"))
        {
          objectAttributes += ' height="' + object.getAttribute("height") + '"';
        }

        // If the object has an archive attribute
        if(object.hasAttribute("archive"))
        {
          objectAttributes += ' archive="' + object.getAttribute("archive") + '"';
        }

        // If the object has an classid attribute
        if(object.hasAttribute("classid"))
        {
          objectAttributes += ' classid="' + object.getAttribute("classid") + '"';
        }

        // If the object has an codebase attribute
        if(object.hasAttribute("codebase"))
        {
          objectAttributes += ' codebase="' + object.getAttribute("codebase") + '"';
        }

        // If the object has an codetype attribute
        if(object.hasAttribute("codetype"))
        {
          objectAttributes += ' codetype="' + object.getAttribute("codetype") + '"';
        }

        // If the object has an data attribute
        if(object.hasAttribute("data"))
        {
          objectAttributes += ' data="' + object.getAttribute("data") + '"';
        }

        // If the object has an standby attribute
        if(object.hasAttribute("standby"))
        {
          objectAttributes += ' standby="' + object.getAttribute("standby") + '"';
        }

        // If the object has an type attribute
        if(object.hasAttribute("type"))
        {
          objectAttributes += ' type="' + object.getAttribute("type") + '"';
        }

        pElement.appendChild(contentDocument.createTextNode("<object" + objectAttributes + ">"));
        divElement.appendChild(pElement);

        // Loop through the params
        for(j = 0, m = params.length; j < m; j++)
        {
          param           = params[j];
          paramAttributes = "";
          pElement        = contentDocument.createElement("p");

          // If the param has a name attribute
          if(param.hasAttribute("name"))
          {
            paramAttributes += ' name="' + param.getAttribute("name") + '"';
          }

          // If the param has a value attribute
          if(param.hasAttribute("value"))
          {
            paramAttributes += ' value="' + param.getAttribute("value") + '"';
          }

          pElement.appendChild(contentDocument.createTextNode("<param" + paramAttributes + ">"));
          pElement.setAttribute("class", "web-developer-object-information-param");
          divElement.appendChild(pElement);
        }

        pElement = contentDocument.createElement("p");

        pElement.appendChild(contentDocument.createTextNode("</object>"));
        divElement.appendChild(pElement);

        divElement.setAttribute("class", "web-developer-display-object-information");
        object.parentNode.insertBefore(divElement, object);
      }
    }
    else
    {
      WebDeveloper.Common.removeMatchingElements(".web-developer-display-object-information", contentDocument);
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-object-information-before", contentDocument, false);
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/information/display-object-information.css", "web-developer-display-object-information", contentDocument, false);
  }
};

// Displays the stack levels on a page
WebDeveloper.Information.displayStackLevels = function(display, documents)
{
  var contentDocument = null;
  var node            = null;
  var spanElement     = null;
  var text            = null;
  var treeWalker      = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If displaying the stack levels
    if(display)
    {
      treeWalker = contentDocument.createTreeWalker(WebDeveloper.Common.getDocumentBodyElement(contentDocument), NodeFilter.SHOW_ELEMENT, WebDeveloper.Information.stackLevelFilter, false);

      // While the tree walker has more nodes
      while((node = treeWalker.nextNode()) !== null)
      {
        spanElement = contentDocument.createElement("span");
        text        = WebDeveloper.Information.getElementDescription(node) + ' z-index="' + node.ownerDocument.defaultView.getComputedStyle(node, null).getPropertyCSSValue("z-index").cssText + '"';

        spanElement.setAttribute("class", "web-developer-display-stack-levels");
        spanElement.appendChild(contentDocument.createTextNode(text));

        node.parentNode.insertBefore(spanElement, node);
      }
    }
    else
    {
      WebDeveloper.Common.removeMatchingElements(".web-developer-display-stack-levels", contentDocument);
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-stack-levels", contentDocument, false);
  }
};

// Displays the tab indices on a page
WebDeveloper.Information.displayTabIndex = function(display, documents)
{
  var contentDocument  = null;
  var spanElement      = null;
  var tabIndexElement  = null;
  var tabIndexElements = null;
  var text             = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If displaying the tab indices
    if(display)
    {
      tabIndexElements = contentDocument.querySelectorAll("[tabindex]");

      // Loop through the tab index elements
      for(var j = 0, m = tabIndexElements.length; j < m; j++)
      {
        spanElement     = contentDocument.createElement("span");
        tabIndexElement = tabIndexElements[j];
        text            = 'tabindex="' + tabIndexElement.getAttribute("tabindex") + '"';

        spanElement.setAttribute("class", "web-developer-display-tab-index");
        spanElement.appendChild(contentDocument.createTextNode(text));
        tabIndexElement.parentNode.insertBefore(spanElement, tabIndexElement);
      }
    }
    else
    {
      WebDeveloper.Common.removeMatchingElements(".web-developer-display-tab-index", contentDocument);
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-tab-index", contentDocument, false);
  }
};

// Displays the information for a table cell
WebDeveloper.Information.displayTableCellInformation = function(tableCell, contentDocument)
{
  var divElement = contentDocument.createElement("div");
  var pElement   = null;

  // If the table cell has an abbr attribute
  if(tableCell.hasAttribute("abbr"))
  {
    pElement = contentDocument.createElement("p");

    pElement.appendChild(contentDocument.createTextNode('abbr="' + tableCell.getAttribute("abbr") + '"'));
    divElement.appendChild(pElement);
  }

  // If the table cell has an axis attribute
  if(tableCell.hasAttribute("axis"))
  {
    pElement = contentDocument.createElement("p");

    pElement.appendChild(contentDocument.createTextNode('axis="' + tableCell.getAttribute("axis") + '"'));
    divElement.appendChild(pElement);
  }

  // If the table cell has a headers attribute
  if(tableCell.hasAttribute("headers"))
  {
    pElement = contentDocument.createElement("p");

    pElement.appendChild(contentDocument.createTextNode('headers="' + tableCell.getAttribute("headers") + '"'));
    divElement.appendChild(pElement);
  }

  // If the table cell has a scope attribute
  if(tableCell.hasAttribute("scope"))
  {
    pElement = contentDocument.createElement("p");

    pElement.appendChild(contentDocument.createTextNode('scope="' + tableCell.getAttribute("scope") + '"'));
    divElement.appendChild(pElement);
  }

  // If the div element has child nodes
  if(divElement.childNodes.length > 0)
  {
    divElement.setAttribute("class", "web-developer-display-table-information");
    WebDeveloper.Common.insertAsFirstChild(tableCell, divElement);
  }
};

// Displays the depth of all tables on a page
WebDeveloper.Information.displayTableDepth = function(display, documents, depth)
{
  var contentDocument = null;
  var spanElement     = null;
  var table           = null;
  var tables          = null;
  var text            = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If displaying the tab indices
    if(display)
    {
      tables = contentDocument.getElementsByTagName("table");

      // Loop through the table elements
      for(var j = 0, m = tables.length; j < m; j++)
      {
        spanElement = contentDocument.createElement("span");
        table       = tables[j];
        text        = depth + " = " + WebDeveloper.Information.getTableDepth(table);

        spanElement.setAttribute("class", "web-developer-display-table-depth");
        spanElement.appendChild(contentDocument.createTextNode(text));
        table.parentNode.insertBefore(spanElement, table);
      }
    }
    else
    {
      WebDeveloper.Common.removeMatchingElements(".web-developer-display-table-depth", contentDocument);
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-table-depth", contentDocument, false);
  }
};

// Displays the information for tables on a page
WebDeveloper.Information.displayTableInformation = function(display, documents)
{
  var contentDocument = null;
  var divElement      = null;
  var table           = null;
  var tableCells      = null;
  var tables          = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If displaying the table information
    if(display)
    {
      tables = contentDocument.getElementsByTagName("table");

      // Loop through the table elements
      for(var j = 0, m = tables.length; j < m; j++)
      {
        table      = tables[j];
        tableCells = table.getElementsByTagName("th");

        // If the table has a summary attribute
        if(table.hasAttribute("summary"))
        {
          divElement = contentDocument.createElement("div");

          divElement.setAttribute("class", "web-developer-display-table-information");
          divElement.appendChild(contentDocument.createTextNode('summary="' + table.getAttribute("summary") + '"'));
          table.parentNode.insertBefore(divElement, table);
        }

        // Loop through the cell elements
        for(var k = 0, n = tableCells.length; k < n; k++)
        {
          WebDeveloper.Information.displayTableCellInformation(tableCells[k], contentDocument);
        }

        tableCells = table.getElementsByTagName("td");

        // Loop through the cell elements
        for(k = 0, n = tableCells.length; k < n; k++)
        {
          WebDeveloper.Information.displayTableCellInformation(tableCells[k], contentDocument);
        }
      }
    }
    else
    {
      WebDeveloper.Common.removeMatchingElements(".web-developer-display-table-information", contentDocument);
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-table-information-before", contentDocument, false);
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/information/display-table-information.css", "web-developer-display-table-information", contentDocument, false);
  }
};

// Displays the title attributes on a page
WebDeveloper.Information.displayTitleAttributes = function(display, documents)
{
  var contentDocument        = null;
  var spanElement            = null;
  var text                   = null;
  var titleAttributeElement  = null;
  var titleAttributeElements = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If displaying the title attributes
    if(display)
    {
      titleAttributeElements = contentDocument.querySelectorAll("[title]");

      // Loop through the title attribute elements
      for(var j = 0, m = titleAttributeElements.length; j < m; j++)
      {
        spanElement           = contentDocument.createElement("span");
        titleAttributeElement = titleAttributeElements[j];
        text                  = 'title="' + titleAttributeElement.getAttribute("title") + '"';

        spanElement.setAttribute("class", "web-developer-display-title-attributes");
        spanElement.appendChild(contentDocument.createTextNode(text));
        titleAttributeElement.parentNode.insertBefore(spanElement, titleAttributeElement);
      }
    }
    else
    {
      WebDeveloper.Common.removeMatchingElements(".web-developer-display-title-attributes", contentDocument);
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-title-attributes", contentDocument, false);
  }
};

// Displays the topographic information for a page
WebDeveloper.Information.displayTopographicInformation = function(documents)
{
  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/information/display-topographic-information.css", "web-developer-display-topographic-information", documents[i], false);
  }
};

// Returns the description for an element
WebDeveloper.Information.getElementDescription = function(element)
{
  var description = "";

  // If the element has an id attribute
  if(element.hasAttribute("id"))
  {
    description += "#" + element.getAttribute("id");
  }

  // If the element has a class attribute
  if(element.hasAttribute("class"))
  {
    var classes = element.getAttribute("class").split(" ");

    // Loop through the element classes
    for(var i = 0, l = classes.length; i < l; i++)
    {
      description += "." + classes[i].trim();
    }
  }

  return description;
};

// Returns the depth of the table
WebDeveloper.Information.getTableDepth = function(table)
{
  var depth = 1;

  // If the table is set
  if(table)
  {
    var element       = table;
    var parentElement = null;
    var tagName       = null;

    // While there is a parent element
    while((parentElement = element.parentNode) !== null)
    {
      element = parentElement;
      tagName = element.tagName;

      // If the tag name is set and equals table
      if(tagName && tagName.toLowerCase() == "table")
      {
        depth++;
      }
    }
  }

  return depth;
};

// Resizes the dimensions for divs on a page
WebDeveloper.Information.resizeDivDimensions = function()
{
  // If there is a timeout set
  if(WebDeveloper.Information.divDimensionsTimeout)
  {
    window.clearTimeout(WebDeveloper.Information.divDimensionsTimeout);

    WebDeveloper.Information.divDimensionsTimeout = null;
  }

  // If the div dimensions are not already updating
  if(!WebDeveloper.Information.divDimensionsUpdating)
  {
    var documents = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());

    // Loop through the documents
    for(var i = 0, l = documents.length; i < l; i++)
    {
      WebDeveloper.Information.updateDivDimensions(documents[i]);
    }
  }
  else
  {
    WebDeveloper.Information.divDimensionsTimeout = window.setTimeout(WebDeveloper.Information.resizeDivDimensions, 0);
  }
};

// Filter for the stack level tree walker
WebDeveloper.Information.stackLevelFilter = function(node)
{
  // If the node does not have a class attribute or it does not start with web-developer
  if(node && (!node.hasAttribute("class") || node.getAttribute("class").indexOf("web-developer-") !== 0))
  {
    var zIndex = node.ownerDocument.defaultView.getComputedStyle(node, null).getPropertyCSSValue("z-index").cssText;

    // If the node has a z-index and it is not set to auto
    if(zIndex && zIndex != "auto")
    {
      return NodeFilter.FILTER_ACCEPT;
    }
  }

  return NodeFilter.FILTER_SKIP;
};

// Updates the dimensions for divs on a page
WebDeveloper.Information.updateDivDimensions = function(contentDocument)
{
  var div         = null;
  var divs        = contentDocument.getElementsByTagName("div");
  var spanElement = null;
  var text        = null;

  WebDeveloper.Information.divDimensionsUpdating = true;

  WebDeveloper.Common.removeMatchingElements(".web-developer-display-div-dimensions", contentDocument);

  // Loop through the divs
  for(var i = 0, l = divs.length; i < l; i++)
  {
    div         = divs[i];
    spanElement = contentDocument.createElement("span");
    text        = WebDeveloper.Information.getElementDescription(div) + " " + WebDeveloper.Common.formatDimensions(div.offsetWidth, div.offsetHeight, WebDeveloper.Information.divDimensionsLocale);

    spanElement.style.left     = div.offsetLeft + "px";
    spanElement.style.position = "absolute";
    spanElement.style.top      = div.offsetTop + "px";

    spanElement.setAttribute("class", "web-developer-display-div-dimensions");
    spanElement.appendChild(contentDocument.createTextNode(text));

    WebDeveloper.Common.insertAsFirstChild(div, spanElement);
  }

  WebDeveloper.Information.divDimensionsUpdating = false;
};
