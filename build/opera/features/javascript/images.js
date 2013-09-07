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

WebDeveloper.Images                         = WebDeveloper.Images || {};
WebDeveloper.Images.imageDimensionsLocale   = null;
WebDeveloper.Images.imageDimensionsTimeout  = null;
WebDeveloper.Images.imageDimensionsUpdating = false;

// Displays alt attributes for all images
WebDeveloper.Images.displayAltAttributes = function(display, documents)
{
  var contentDocument = null;
  var image           = null;
  var images          = null;
  var spanElement     = null;
  var text            = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If displaying the alt attributes
    if(display)
    {
      images = contentDocument.querySelectorAll("img[alt], input[type=image][alt]");

      // Loop through the images
      for(var j = 0, m = images.length; j < m; j++)
      {
        image       = images[j];
        spanElement = contentDocument.createElement("span");
        text        = 'alt="' + image.getAttribute("alt") + '"';

        spanElement.setAttribute("class", "web-developer-display-alt-attributes");
        spanElement.appendChild(contentDocument.createTextNode(text));
        image.parentNode.insertBefore(spanElement, image);
      }
    }
    else
    {
      WebDeveloper.Common.removeMatchingElements(".web-developer-display-alt-attributes", contentDocument);
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-alt-attributes", contentDocument, false);
  }
};

// Displays the dimensions for all images
WebDeveloper.Images.displayImageDimensions = function(display, documents, locale)
{
  var contentDocument = null;

  // If displaying the image dimensions
  if(display)
  {
    WebDeveloper.Images.imageDimensionsLocale = locale;

    window.addEventListener("resize", WebDeveloper.Images.resizeImageDimensions, false);
  }
  else
  {
    WebDeveloper.Images.imageDimensionsLocale = null;

    window.removeEventListener("resize", WebDeveloper.Images.resizeImageDimensions, false);
  }

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If displaying the image dimensions
    if(display)
    {
      WebDeveloper.Images.updateImageDimensions(contentDocument);
    }
    else
    {
      WebDeveloper.Common.removeMatchingElements(".web-developer-display-image-dimensions", contentDocument);
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-image-dimensions-before", contentDocument, false);
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/display-image-dimensions.css", "web-developer-display-image-dimensions", contentDocument, false);
  }
};

// Displays the paths for all images
WebDeveloper.Images.displayImagePaths = function(display, documents)
{
  var contentDocument = null;
  var image           = null;
  var images          = null;
  var imageSrc        = null;
  var linkElement     = null;
  var spanElement     = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If displaying the alt attributes
    if(display)
    {
      images = contentDocument.images;

      // Loop through the images
      for(var j = 0, m = images.length; j < m; j++)
      {
        image       = images[j];
        imageSrc    = image.src;
        linkElement = contentDocument.createElement("a");
        spanElement = contentDocument.createElement("span");

        linkElement.setAttribute("href", imageSrc);
        linkElement.appendChild(contentDocument.createTextNode('src="' + imageSrc + '"'));

        spanElement.setAttribute("class", "web-developer-display-image-paths");
        spanElement.appendChild(linkElement);
        image.parentNode.insertBefore(spanElement, image);
      }
    }
    else
    {
      WebDeveloper.Common.removeMatchingElements(".web-developer-display-image-paths", contentDocument);
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-image-paths", contentDocument, false);
  }
};

// Hides the background images on a page
WebDeveloper.Images.hideBackgroundImages = function(documents)
{
  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/hide-background-images.css", "web-developer-hide-background-images", documents[i], false);
  }
};

// Hides all the images
WebDeveloper.Images.hideImages = function(hide, documents)
{
  var contentDocument = null;
  var inputElement    = null;
  var inputElements   = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];
    inputElements   = contentDocument.getElementsByTagName("input");

    // Loop through all the input tags
    for(var j = 0, m = inputElements.length; j < m; j++)
    {
      inputElement = inputElements[j];

      // If hiding images and the input element is of type image
      if(hide && inputElement.hasAttribute("type") && inputElement.getAttribute("type").toLowerCase() == "image")
      {
        inputElement.setAttribute("web-developer-hide-images", true);
        inputElement.setAttribute("type", "submit");
      }
      else if(inputElement.hasAttribute("web-developer-hide-images"))
      {
        inputElement.removeAttribute("web-developer-hide-images");
        inputElement.setAttribute("type", "image");
      }
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/hide-images.css", "web-developer-hide-images", contentDocument, false);
  }
};

// Makes all images full size
WebDeveloper.Images.makeImagesFullSize = function(documents)
{
  var alteredImages = 0;
  var image         = null;
  var images        = null;
  var naturalHeight = null;
  var naturalWidth  = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    images = documents[i].images;

    // Loop through the images
    for(var j = 0, m = images.length; j < m; j++)
    {
      image         = images[j];
      naturalHeight = image.naturalHeight;
      naturalWidth  = image.naturalWidth;

      // If the height or width is not the full size
      if((naturalHeight && image.height != naturalHeight) || (naturalWidth && image.width != naturalWidth))
      {
        image.height = image.naturalHeight;
        image.width = image.naturalWidth;

        alteredImages++;
      }
    }
  }

  // If one image was made full size
  if(alteredImages == 1)
  {
    WebDeveloper.Common.displayNotification("makeImagesFullSizeSingleResult");
  }
  else
  {
    WebDeveloper.Common.displayNotification("makeImagesFullSizeMultipleResult", [alteredImages]);
  }
};

// Makes all images invisible
WebDeveloper.Images.makeImagesInvisible = function(invisible, documents)
{
  var contentDocument = null;
  var image           = null;
  var imageInput      = null;
  var imageInputs     = null;
  var images          = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];
    imageInputs     = contentDocument.querySelectorAll("input[type=image], input[web-developer-make-images-invisible]");
    images          = contentDocument.images;

    // Loop through the image input tags
    for(var j = 0, m = imageInputs.length; j < m; j++)
    {
      imageInput = imageInputs[j];

      // If making images invisible
      if(invisible)
      {
        imageInput.setAttribute("web-developer-make-images-invisible", true);
        imageInput.setAttribute("type", "submit");
      }
      else if(imageInput.hasAttribute("web-developer-make-images-invisible"))
      {
        imageInput.removeAttribute("web-developer-make-images-invisible");
        imageInput.setAttribute("type", "image");
      }
    }

    // Loop through the images
    for(j = 0, m = images.length; j < m; j++)
    {
      image = images[j];

      // If making images invisible
      if(invisible)
      {
        // If the image width is not set and the image is not broken
        if(!image.hasAttribute("width") && image.naturalWidth)
        {
          image.setAttribute("width", image.naturalWidth);
        }

        // If the image height is not set and the image is not broken
        if(!image.hasAttribute("height") && image.naturalHeight)
        {
          image.setAttribute("height", image.naturalHeight);
        }

        image.setAttribute("web-developer-make-images-invisible", image.getAttribute("src"));
        image.setAttribute("src", WebDeveloper.Common.getChromeURL("features/style-sheets/images/transparent.png"));
      }
      else
      {
        image.setAttribute("src", image.getAttribute("web-developer-make-images-invisible"));
        image.removeAttribute("web-developer-make-images-invisible");
      }
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/make-images-invisible.css", "web-developer-make-images-invisible", contentDocument, false);
  }
};

// Outlines all images
WebDeveloper.Images.outlineAllImages = function(documents)
{
  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/outline-all-images.css", "web-developer-outline-all-images", documents[i], false);
  }
};

// Outlines all background images
WebDeveloper.Images.outlineBackgroundImages = function(outline, documents)
{
  var backgroundImage  = null;
  var backgroundImages = null;
  var contentDocument  = null;
  var cssURI           = CSSPrimitiveValue.CSS_URI;
  var node             = null;
  var treeWalker       = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If outlining background images
    if(outline)
    {
      treeWalker = contentDocument.createTreeWalker(WebDeveloper.Common.getDocumentBodyElement(contentDocument), NodeFilter.SHOW_ELEMENT, null, false);

      // While the tree walker has more nodes
      while((node = treeWalker.nextNode()) !== null)
      {
        backgroundImage = WebDeveloper.Common.getCSSProperty(node.ownerDocument.defaultView.getComputedStyle(node, null).getPropertyCSSValue("background-image"));

        // If this element has a background image and it is a URL
        if(backgroundImage && backgroundImage.primitiveType == cssURI)
        {
          WebDeveloper.Common.addClass(node, "web-developer-outline-background-images");
        }
      }
    }
    else
    {
      backgroundImages = contentDocument.getElementsByClassName("web-developer-outline-background-images");

      // While there are background images
      while(backgroundImages.length > 0)
      {
        WebDeveloper.Common.removeClass(backgroundImages[0], "web-developer-outline-background-images");
      }
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/outline-background-images.css", "web-developer-outline-background-images", contentDocument, false);
  }
};

// Outlines all images with adjusted dimensions
WebDeveloper.Images.outlineImagesWithAdjustedDimensions = function(outline, documents)
{
  var contentDocument              = null;
  var image                        = null;
  var images                       = null;
  var imagesWithAdjustedDimensions = null;
  var naturalHeight                = null;
  var naturalWidth                 = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If outlining images with adjusted dimensions
    if(outline)
    {
      images = contentDocument.images;

      // Loop through the images
      for(var j = 0, m = images.length; j < m; j++)
      {
        image         = images[j];
        naturalHeight = image.naturalHeight;
        naturalWidth  = image.naturalWidth;

        // If the height or width has been adjusted
        if((naturalHeight && image.height != naturalHeight) || (naturalWidth && image.width != naturalWidth))
        {
          WebDeveloper.Common.addClass(image, "web-developer-outline-images-with-adjusted-dimensions");
        }
      }
    }
    else
    {
      imagesWithAdjustedDimensions = contentDocument.getElementsByClassName("web-developer-outline-images-with-adjusted-dimensions");

      // While there are images with adjusted dimensions
      while(imagesWithAdjustedDimensions.length > 0)
      {
        WebDeveloper.Common.removeClass(imagesWithAdjustedDimensions[0], "web-developer-outline-images-with-adjusted-dimensions");
      }
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/outline-images-with-adjusted-dimensions.css", "web-developer-outline-images-with-adjusted-dimensions", contentDocument, false);
  }
};

// Outlines all images with empty alt attributes
WebDeveloper.Images.outlineImagesWithEmptyAltAttributes = function(documents)
{
  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/outline-images-with-empty-alt-attributes.css", "web-developer-outline-images-with-empty-alt-attributes", documents[i], false);
  }
};

// Outlines all images with oversized dimensions
WebDeveloper.Images.outlineImagesWithOversizedDimensions = function(outline, documents)
{
  var contentDocument               = null;
  var image                         = null;
  var images                        = null;
  var imagesWithOversizedDimensions = null;
  var naturalHeight                 = null;
  var naturalWidth                  = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If outlining images with oversized dimensions
    if(outline)
    {
      images = contentDocument.images;

      // Loop through the images
      for(var j = 0, m = images.length; j < m; j++)
      {
        image         = images[j];
        naturalHeight = image.naturalHeight;
        naturalWidth  = image.naturalWidth;

        // If the height or width has been oversized
        if((naturalHeight && image.height > naturalHeight) || (naturalWidth && image.width > naturalWidth))
        {
          WebDeveloper.Common.addClass(image, "web-developer-outline-images-with-oversized-dimensions");
        }
      }
    }
    else
    {
      imagesWithOversizedDimensions = contentDocument.getElementsByClassName("web-developer-outline-images-with-oversized-dimensions");

      // While there are images with oversized dimensions
      while(imagesWithOversizedDimensions.length > 0)
      {
        WebDeveloper.Common.removeClass(imagesWithOversizedDimensions[0], "web-developer-outline-images-with-oversized-dimensions");
      }
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/outline-images-with-oversized-dimensions.css", "web-developer-outline-images-with-oversized-dimensions", contentDocument, false);
  }
};

// Outlines all images without alt attributes
WebDeveloper.Images.outlineImagesWithoutAltAttributes = function(documents)
{
  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/outline-images-without-alt-attributes.css", "web-developer-outline-images-without-alt-attributes", documents[i], false);
  }
};

// Outlines all images without dimensions
WebDeveloper.Images.outlineImagesWithoutDimensions = function(documents)
{
  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/outline-images-without-dimensions.css", "web-developer-outline-images-without-dimensions", documents[i], false);
  }
};

// Reloads the images in a document
WebDeveloper.Images.reloadImages = function(documents)
{
  var computedStyle   = null;
  var contentDocument = null;
  var cssURI          = CSSPrimitiveValue.CSS_URI;
  var imageURL        = null;
  var node            = null;
  var styleImage      = null;
  var treeWalker      = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];
    treeWalker      = contentDocument.createTreeWalker(contentDocument, NodeFilter.SHOW_ELEMENT, null, false);

    // While the tree walker has more nodes
    while((node = treeWalker.nextNode()) !== null)
    {
      // If this is an image element
      if(node.tagName.toLowerCase() == "img" || (node.tagName.toLowerCase() == "input" && node.src && node.type && node.type.toLowerCase() == "image"))
      {
        imageURL = node.src;

        // If this is not a chrome image
        if(imageURL.indexOf("chrome://") !== 0)
        {
          node.src = WebDeveloper.Images.updateReloadImageURL(imageURL);
        }
      }
      else if(node.tagName.toLowerCase() == "link" && node.href && node.href.indexOf("chrome://") !== 0 && node.rel && node.rel.indexOf("icon") != -1)
      {
        node.href = WebDeveloper.Images.updateReloadImageURL(node.href);
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
            imageURL = styleImage.getStringValue();

            // If this is not a chrome image
            if(imageURL.indexOf("chrome://") !== 0)
            {
              node.style.backgroundImage = WebDeveloper.Images.updateReloadImageURL(imageURL);
            }
          }

          styleImage = computedStyle.getPropertyCSSValue("list-style-image");

          // If this element has a background image and it is a URI
          if(styleImage && styleImage.primitiveType == cssURI)
          {
            imageURL = styleImage.getStringValue();

            // If this is not a chrome image
            if(imageURL.indexOf("chrome://") !== 0)
            {
              node.style.listStyleImage = WebDeveloper.Images.updateReloadImageURL(imageURL);
            }
          }
        }
      }
    }
  }

  WebDeveloper.Common.displayNotification("reloadImagesResult");
};

// Replaces all images with alt attributes
WebDeveloper.Images.replaceImagesWithAltAttributes = function(replace, documents)
{
  var contentDocument = null;
  var image           = null;
  var images          = null;
  var spanElement     = null;
  var text            = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If replacing the images
    if(replace)
    {
      images = contentDocument.images;

      // Loop through the images
      for(var j = 0, m = images.length; j < m; j++)
      {
        image       = images[j];
        spanElement = contentDocument.createElement("span");
        text        = image.getAttribute("alt");

        spanElement.setAttribute("class", "web-developer-replace-images-with-alt-attributes");
        spanElement.appendChild(contentDocument.createTextNode(text));
        image.parentNode.insertBefore(spanElement, image);
      }
    }
    else
    {
      WebDeveloper.Common.removeMatchingElements(".web-developer-replace-images-with-alt-attributes", contentDocument);
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/hide-images.css", "web-developer-replace-images-with-alt-attributes", contentDocument, false);
  }
};

// Resizes the dimensions for all images
WebDeveloper.Images.resizeImageDimensions = function()
{
  // If there is a timeout set
  if(WebDeveloper.Images.imageDimensionsTimeout)
  {
    window.clearTimeout(WebDeveloper.Images.imageDimensionsTimeout);

    WebDeveloper.Images.imageDimensionsTimeout = null;
  }

  // If the image dimensions are not already updating
  if(!WebDeveloper.Images.imageDimensionsUpdating)
  {
    var documents = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());

    // Loop through the documents
    for(var i = 0, l = documents.length; i < l; i++)
    {
      WebDeveloper.Images.updateImageDimensions(documents[i]);
    }
  }
  else
  {
    WebDeveloper.Images.imageDimensionsTimeout = window.setTimeout(WebDeveloper.Images.resizeImageDimensions, 0);
  }
};

// Updates the dimensions for all images
WebDeveloper.Images.updateImageDimensions = function(contentDocument)
{
  var image       = null;
  var images      = contentDocument.images;
  var spanElement = null;
  var text        = null;

  WebDeveloper.Images.imageDimensionsUpdating = true;

  WebDeveloper.Common.removeMatchingElements(".web-developer-display-image-dimensions", contentDocument);

  // Loop through the images
  for(var i = 0, l = images.length; i < l; i++)
  {
    image = images[i];
    text  = WebDeveloper.Common.formatDimensions(image.width, image.height, WebDeveloper.Images.imageDimensionsLocale);

    // If the text is set
    if(text)
    {
      spanElement = contentDocument.createElement("span");

      spanElement.setAttribute("class", "web-developer-display-image-dimensions");
      spanElement.appendChild(contentDocument.createTextNode(text));
      image.parentNode.insertBefore(spanElement, image);
    }
  }

  WebDeveloper.Images.imageDimensionsUpdating = false;
};

// Updates a reload image URL
WebDeveloper.Images.updateReloadImageURL = function(imageURL)
{
  var newImageURL = WebDeveloper.Common.removeReloadParameterFromURL(imageURL);

  // If the image URL does not have query parameters
  if(newImageURL.indexOf("?") == -1)
  {
    newImageURL += "?";
  }
  else
  {
    newImageURL += "&";
  }

  return newImageURL + "web-developer-reload=" + new Date().getTime();
};
