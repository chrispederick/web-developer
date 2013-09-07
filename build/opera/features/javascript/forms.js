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

WebDeveloper.Forms = WebDeveloper.Forms || {};

// Clears all form fields
WebDeveloper.Forms.clearFormFields = function(documents)
{
  var clearedForms = 0;
  var elementType  = null;
  var formElement  = null;
  var formElements = null;
  var forms        = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    forms = documents[i].forms;

    // Loop through the forms
    for(var j = 0, m = forms.length; j < m; j++)
    {
      formElements = forms[j].elements;

      // Loop through the form elements
      for(var k = 0, n = formElements.length; k < n; k++)
      {
        formElement = formElements[k];
        elementType = formElement.tagName.toLowerCase();

        // If this is an input element
        if(elementType == "input")
        {
          // If the form element has a type attribute
          if(formElement.hasAttribute("type"))
          {
            elementType = formElement.getAttribute("type");

            // If the element type is checkbox or radio
            if(elementType == "checkbox" || elementType == "radio")
            {
              formElement.checked = false;
            }
            else if(elementType != "hidden" && elementType != "reset" && elementType != "submit")
            {
              formElement.value = "";
            }
          }
          else
          {
            formElement.value = "";
          }
        }
        else if(elementType == "select")
        {
          formElement.selectedIndex = -1;
        }
        else if(elementType == "textarea")
        {
          formElement.value = "";
        }
      }

      clearedForms++;
    }
  }

  // If one form was cleared
  if(clearedForms == 1)
  {
    WebDeveloper.Common.displayNotification("clearFormFieldsSingleResult");
  }
  else
  {
    WebDeveloper.Common.displayNotification("clearFormFieldsMultipleResult", [clearedForms]);
  }
};

// Clears all radio buttons
WebDeveloper.Forms.clearRadioButtons = function(documents)
{
  var clearedRadioButtons = 0;
  var radioButtons        = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    radioButtons = documents[i].querySelectorAll("input[type=radio]");

    // Loop through the radio buttons
    for(var j = 0, m = radioButtons.length; j < m; j++)
    {
      radioButtons[j].checked = false;

      clearedRadioButtons++;
    }
  }

  // If one radio button was cleared
  if(clearedRadioButtons == 1)
  {
    WebDeveloper.Common.displayNotification("clearRadioButtonsSingleResult");
  }
  else
  {
    WebDeveloper.Common.displayNotification("clearRadioButtonsMultipleResult", [clearedRadioButtons]);
  }
};

// Converts the methods of all forms
WebDeveloper.Forms.convertFormMethods = function(method, documents)
{
  var convertedForms = 0;
  var form           = null;
  var forms          = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    forms = documents[i].forms;

    // Loop through all the forms
    for(var j = 0, m = forms.length; j < m; j++)
    {
      form = forms[j];

      // If this form is not already the right method
      if((!form.hasAttribute("method") && method == "post") || (form.hasAttribute("method") && form.getAttribute("method").toLowerCase() != method))
      {
        form.setAttribute("method", method);

        convertedForms++;
      }
    }
  }

  // If one form was converted
  if(convertedForms == 1)
  {
    WebDeveloper.Common.displayNotification("convertFormMethodsSingleResult", [method]);
  }
  else
  {
    WebDeveloper.Common.displayNotification("convertFormMethodsMultipleResult", [convertedForms, method]);
  }
};

// Converts select elements to text inputs
WebDeveloper.Forms.convertSelectElementsToTextInputs = function(documents)
{
  var contentDocument         = null;
  var convertedSelectElements = 0;
  var inputElement            = null;
  var parentNode              = null;
  var selectElement           = null;
  var selectElements          = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];
    selectElements  = contentDocument.getElementsByTagName("select");

    // While there are select elements
    while(selectElements.length > 0)
    {
      inputElement  = contentDocument.createElement("input");
      selectElement = selectElements[0];
      parentNode    = selectElement.parentNode;

      inputElement.value = selectElement.value;

      // If the select element has an id attribute
      if(selectElement.hasAttribute("id"))
      {
        inputElement.setAttribute("id", selectElement.getAttribute("id"));
      }

      // If the select element has a name attribute
      if(selectElement.hasAttribute("name"))
      {
        inputElement.setAttribute("name", selectElement.getAttribute("name"));
      }

      parentNode.insertBefore(inputElement, selectElement);
      parentNode.removeChild(selectElement);

      convertedSelectElements++;
    }
  }

  // If one select element was converted
  if(convertedSelectElements == 1)
  {
    WebDeveloper.Common.displayNotification("convertSelectElementsToTextInputsSingleResult");
  }
  else
  {
    WebDeveloper.Common.displayNotification("convertSelectElementsToTextInputsMultipleResult", [convertedSelectElements]);
  }
};

// Converts text inputs to textareas
WebDeveloper.Forms.convertTextInputsToTextareas = function(documents)
{
  var contentDocument     = null;
  var convertedTextInputs = 0;
  var elementType         = null;
  var inputElement        = null;
  var inputElements       = null;
  var parentNode          = null;
  var textareaElement     = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // Uses query selector all so that it is not a live node list
    inputElements = contentDocument.querySelectorAll("input");

    // Loop through the input tags
    for(var j = 0, m = inputElements.length; j < m; j++)
    {
      inputElement = inputElements[j];
      elementType  = inputElement.getAttribute("type");

      // If the form element does not have a type attribute or it is not a text input
      if(!elementType || (elementType != "button" && elementType != "checkbox" && elementType != "file" && elementType != "hidden" && elementType != "image" && elementType != "radio" && elementType != "reset" && elementType != "submit"))
      {
        textareaElement = contentDocument.createElement("textarea");
        parentNode      = inputElement.parentNode;

        textareaElement.value = inputElement.value;

        // If the select element has an id attribute
        if(inputElement.hasAttribute("id"))
        {
          textareaElement.setAttribute("id", inputElement.getAttribute("id"));
        }

        // If the select element has a name attribute
        if(inputElement.hasAttribute("name"))
        {
          textareaElement.setAttribute("name", inputElement.getAttribute("name"));
        }

        parentNode.insertBefore(textareaElement, inputElement);
        parentNode.removeChild(inputElement);

        convertedTextInputs++;
      }
    }
  }

  // If one text input was converted
  if(convertedTextInputs == 1)
  {
    WebDeveloper.Common.displayNotification("convertTextInputsToTextareasSingleResult");
  }
  else
  {
    WebDeveloper.Common.displayNotification("convertTextInputsToTextareasMultipleResult", [convertedTextInputs]);
  }
};

// Displays the details about all forms
WebDeveloper.Forms.displayFormDetails = function(display, documents)
{
  var contentDocument = null;
  var inputElement    = null;
  var inputElements   = null;
  var spanElement     = null;
  var text            = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];
    inputElements   = contentDocument.getElementsByTagName("input");

    // Loop through the input tags
    for(var j = 0, m = inputElements.length; j < m; j++)
    {
      inputElement = inputElements[j];

      // If displaying the form details
      if(display)
      {
        spanElement = contentDocument.createElement("span");
        text        = "<input";

        // If the element is hidden
        if(inputElement.hasAttribute("type") && inputElement.getAttribute("type").toLowerCase() == "hidden")
        {
          inputElement.setAttribute("web-developer-unhidden", true);
          inputElement.removeAttribute("type");
        }

        // If the element has an autocomplete attribute
        if(inputElement.hasAttribute("autocomplete"))
        {
          text += ' autocomplete="' + inputElement.getAttribute("autocomplete") + '"';
        }

        // If the element has an id attribute
        if(inputElement.hasAttribute("id"))
        {
          text += ' id="' + inputElement.getAttribute("id") + '"';
        }

        // If the element has a maxlength attribute
        if(inputElement.hasAttribute("maxlength"))
        {
          text += ' maxlength="' + inputElement.getAttribute("maxlength") + '"';
        }

        // If the element has an name attribute
        if(inputElement.hasAttribute("name"))
        {
          text += ' name="' + inputElement.getAttribute("name") + '"';
        }

        // If the element has a size attribute
        if(inputElement.hasAttribute("size"))
        {
          text += ' size="' + inputElement.getAttribute("size") + '"';
        }

        // If the element has a type attribute
        if(inputElement.hasAttribute("type"))
        {
          text += ' type="' + inputElement.getAttribute("type") + '"';

          // If the element is a checkbox or radio button
          if(inputElement.getAttribute("type").toLowerCase() == "checkbox" || inputElement.getAttribute("type").toLowerCase() == "radio")
          {
            text += ' value="' + inputElement.value + '"';
          }
        }

        text += ">";

        spanElement.setAttribute("class", "web-developer-display-form-details");
        spanElement.appendChild(contentDocument.createTextNode(text));
        inputElement.parentNode.insertBefore(spanElement, inputElement);
      }
      else
      {
        // If the input element was un-hidden
        if(inputElement.hasAttribute("web-developer-unhidden"))
        {
          inputElement.removeAttribute("web-developer-unhidden");
          inputElement.setAttribute("type", "hidden");
        }
      }
    }

    // If displaying the form details
    if(display)
    {
      var buttonElement    = null;
      var buttonElements   = contentDocument.getElementsByTagName("button");
      var selectElement    = null;
      var selectElements   = contentDocument.getElementsByTagName("select");
      var textAreaElement  = null;
      var textAreaElements = contentDocument.getElementsByTagName("textarea");

      // Loop through the button tags
      for(j = 0, m = buttonElements.length; j < m; j++)
      {
        buttonElement = buttonElements[j];
        spanElement = contentDocument.createElement("span");
        text          = "<button";

        // If the element has an id attribute
        if(buttonElement.hasAttribute("id"))
        {
          text += ' id="' + buttonElement.getAttribute("id") + '"';
        }

        // If the element has an name attribute
        if(buttonElement.hasAttribute("name"))
        {
          text += ' name="' + buttonElement.getAttribute("name") + '"';
        }

        // If the element has a value
        if(buttonElement.value)
        {
          text += ' value="' + buttonElement.value + '"';
        }

        text += ">";

        spanElement.setAttribute("class", "web-developer-display-form-details");
        spanElement.appendChild(contentDocument.createTextNode(text));
        buttonElement.parentNode.insertBefore(spanElement, buttonElement);
      }

      // Loop through the select tags
      for(j = 0, m = selectElements.length; j < m; j++)
      {
        selectElement = selectElements[j];
        spanElement = contentDocument.createElement("span");
        text          = "<select";

        // If the element has an id attribute
        if(selectElement.hasAttribute("id"))
        {
          text += ' id="' + selectElement.getAttribute("id") + '"';
        }

        // If the element has an name attribute
        if(selectElement.hasAttribute("name"))
        {
          text += ' name="' + selectElement.getAttribute("name") + '"';
        }

        // If the element has a value
        if(selectElement.value)
        {
          text += ' value="' + selectElement.value + '"';
        }

        text += ">";

        spanElement.setAttribute("class", "web-developer-display-form-details");
        spanElement.appendChild(contentDocument.createTextNode(text));
        selectElement.parentNode.insertBefore(spanElement, selectElement);
      }

      // Loop through the textarea tags
      for(j = 0, m = textAreaElements.length; j < m; j++)
      {
        textAreaElement = textAreaElements[j];
        spanElement     = contentDocument.createElement("span");
        text            = "<textarea";

        // If the element has an id attribute
        if(textAreaElement.hasAttribute("id"))
        {
          text += ' id="' + textAreaElement.getAttribute("id") + '"';
        }

        // If the element has a maxlength attribute
        if(textAreaElement.hasAttribute("maxlength"))
        {
          text += ' maxlength="' + textAreaElement.getAttribute("maxlength") + '"';
        }

        // If the element has an name attribute
        if(textAreaElement.hasAttribute("name"))
        {
          text += ' name="' + textAreaElement.getAttribute("name") + '"';
        }

        text += ">";

        spanElement.setAttribute("class", "web-developer-display-form-details");
        spanElement.appendChild(contentDocument.createTextNode(text));
        textAreaElement.parentNode.insertBefore(spanElement, textAreaElement);
      }
    }
    else
    {
      WebDeveloper.Common.removeMatchingElements(".web-developer-display-form-details", contentDocument);
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-form-details-before", contentDocument, false);
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/forms/display-form-details.css", "web-developer-display-form-details", contentDocument, false);
  }
};

// Displays all passwords
WebDeveloper.Forms.displayPasswords = function(documents)
{
  var displayedPasswords = 0;
  var passwords          = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    passwords = documents[i].querySelectorAll("input[type=password]");

    // Loop through the passwords
    for(var j = 0, m = passwords.length; j < m; j++)
    {
      passwords[j].removeAttribute("type");

      displayedPasswords++;
    }
  }

  // If one password displayed
  if(displayedPasswords == 1)
  {
    WebDeveloper.Common.displayNotification("displayPasswordsSingleResult");
  }
  else
  {
    WebDeveloper.Common.displayNotification("displayPasswordsMultipleResult", [displayedPasswords]);
  }
};

// Enables auto completion on all elements
WebDeveloper.Forms.enableAutoCompletion = function(documents)
{
  var autoCompleteElements = null;
  var enabledElements      = 0;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    autoCompleteElements = documents[i].querySelectorAll("[autocomplete]");

    // Loop through the auto complete elements
    for(var j = 0, m = autoCompleteElements.length; j < m; j++)
    {
      autoCompleteElements[j].removeAttribute("autocomplete");

      enabledElements++;
    }
  }

  // If one element was enabled
  if(enabledElements == 1)
  {
    WebDeveloper.Common.displayNotification("enableAutoCompletionSingleResult");
  }
  else
  {
    WebDeveloper.Common.displayNotification("enableAutoCompletionMultipleResult", [enabledElements]);
  }
};

// Enables the form elements
WebDeveloper.Forms.enableFormElements = function(formElements)
{
  var enabledElements = 0;
  var formElement     = null;

  // Loop through the form elements
  for(var i = 0, l = formElements.length; i < l; i++)
  {
    formElement = formElements[i];

    // If the form element is disabled
    if(formElement.disabled)
    {
      formElement.disabled = false;

      enabledElements++;
    }
  }

  return enabledElements;
};

// Enables all form fields
WebDeveloper.Forms.enableFormFields = function(documents)
{
  var contentDocument = null;
  var enabledFields   = 0;
  var forms           = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];
    forms           = contentDocument.forms;

    // Loop through the forms
    for(var j = 0, m = forms.length; j < m; j++)
    {
      enabledFields += WebDeveloper.Forms.enableFormElements(forms[j].elements);
    }

    enabledFields += WebDeveloper.Forms.enableFormElements(contentDocument.querySelectorAll("input[type=image]"));
  }

  // If one field was enabled
  if(enabledFields == 1)
  {
    WebDeveloper.Common.displayNotification("enableFormFieldsSingleResult");
  }
  else
  {
    WebDeveloper.Common.displayNotification("enableFormFieldsMultipleResult", [enabledFields]);
  }
};

// Expands all select elements
WebDeveloper.Forms.expandSelectElements = function(documents)
{
  var selectElement    = null;
  var selectElements   = null;
  var selectLength     = null;
  var selectSize       = null;
  var expandedElements = 0;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    selectElements = documents[i].querySelectorAll("select");

    // Loop through the select elements
    for(var j = 0, m = selectElements.length; j < m; j++)
    {
      selectElement = selectElements[j];
      selectLength  = selectElement.options.length;
      selectSize    = selectElement.getAttribute("size");

      // If the select size is not set and the select has more than one option or the select has more options than it's size
      if((!selectSize && selectLength > 1) || (selectLength > selectSize))
      {
        selectElement.setAttribute("size", selectLength);

        expandedElements++;
      }
    }
  }

  // If one element was expanded
  if(expandedElements == 1)
  {
    WebDeveloper.Common.displayNotification("expandSelectElementsSingleResult");
  }
  else
  {
    WebDeveloper.Common.displayNotification("expandSelectElementsMultipleResult", [expandedElements]);
  }
};

// Makes all form fields writable
WebDeveloper.Forms.makeFormFieldsWritable = function(documents)
{
  var readOnlyElements = null;
  var writableElements = 0;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    readOnlyElements = documents[i].querySelectorAll("[readonly]");

    // Loop through the read only elements
    for(var j = 0, m = readOnlyElements.length; j < m; j++)
    {
      readOnlyElements[j].removeAttribute("readonly");

      writableElements++;
    }
  }

  // If one element was enabled
  if(writableElements == 1)
  {
    WebDeveloper.Common.displayNotification("makeFormFieldsWritableSingleResult");
  }
  else
  {
    WebDeveloper.Common.displayNotification("makeFormFieldsWritableMultipleResult", [writableElements]);
  }
};

// Outlines all form fields without labels
WebDeveloper.Forms.outlineFormFieldsWithoutLabels = function(outline, documents)
{
  var contentDocument         = null;
  var formElement             = null;
  var formElementId           = null;
  var formElements            = null;
  var formFieldsWithoutLabels = null;
  var forms                   = null;
  var labelElement            = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If outlining form fields without labels
    if(outline)
    {
      forms = contentDocument.forms;

      // Loop through the forms
      for(var j = 0, m = forms.length; j < m; j++)
      {
        formElements = forms[j].elements;

        // Loop through the form elements
        for(var k = 0, n = formElements.length; k < n; k++)
        {
          formElement  = formElements[k];
          labelElement = formElement.parentNode;

          // If the parent element is not a label
          if(labelElement.tagName.toLowerCase() != "label")
          {
            formElementId = formElement.getAttribute("id");

            // If the form element has an id attribute
            if(formElementId)
            {
              labelElement = contentDocument.querySelector("label[for=" + formElementId + "]");

              // If no label element was found
              if(!labelElement)
              {
                WebDeveloper.Common.addClass(formElement, "web-developer-outline-form-fields-without-labels");
              }
            }
          }
        }
      }
    }
    else
    {
      formFieldsWithoutLabels = contentDocument.getElementsByClassName("web-developer-outline-form-fields-without-labels");

      // While there are form fields without labels
      while(formFieldsWithoutLabels.length > 0)
      {
        WebDeveloper.Common.removeClass(formFieldsWithoutLabels[0], "web-developer-outline-form-fields-without-labels");
      }
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/forms/outline-form-fields-without-labels.css", "web-developer-outline-form-fields-without-labels", contentDocument, false);
  }
};

// Populates all form fields
WebDeveloper.Forms.populateFormFields = function(documents, emailAddress, password)
{
  var contentDocument          = null;
  var date                     = new Date();
  var dateString               = date.toISOString().split('T')[0];
  var day                      = date.getDay();
  var inputElement             = null;
  var inputElementMaxlength    = null;
  var inputElementName         = null;
  var inputElements            = null;
  var inputElementType         = null;
  var maximumValue             = 0;
  var minimumValue             = 0;
  var month                    = dateString.split('-');
  var option                   = null;
  var options                  = null;
  var populatedFormFields      = 0;
  var selectElement            = null;
  var selectElements           = null;
  var textAreaElement          = null;
  var textAreaElements         = null;
  var textAreaElementMaxlength = null;
  var time                     = date.getHours() + ':' + date.getMinutes();
  var localDateTime            = dateString + 'T' + time;
  var week                     = null;
  var weekDate                 = new Date();
  var weekNumber               = null;
  var year                     = weekDate.getFullYear();

  month.pop();

  month = month.join('-');

  // If the day is not set
  if(day === 0)
  {
    day = 7;
  }

  weekDate.setDate(weekDate.getDate() + (4 - day));

  weekNumber = 1 + Math.floor(Math.floor((weekDate.getTime() - new Date(year, 0, 1, -6)) / 86400000) / 7);
  week       = date.getFullYear() + '-W' + weekNumber;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument  = documents[i];
    inputElements    = contentDocument.getElementsByTagName("input");
    selectElements   = contentDocument.getElementsByTagName("select");
    textAreaElements = contentDocument.getElementsByTagName("textarea");

    // Loop through the input tags
    for(var j = 0, m = inputElements.length; j < m; j++)
    {
      inputElement = inputElements[j];

      // If the input element is not disabled
      if(!inputElement.disabled)
      {
        inputElementType = inputElement.getAttribute("type");

        // If the input element value is not set and the type is not set or is one of the supported types
        if(!inputElement.value.trim() && (!inputElementType || inputElementType.toLowerCase() == "color" || inputElementType.toLowerCase() == "date" || inputElementType.toLowerCase() == "datetime" || inputElementType.toLowerCase() == "datetime-local" || inputElementType.toLowerCase() == "email" || inputElementType.toLowerCase() == "month" || inputElementType.toLowerCase() == "number" || inputElementType.toLowerCase() == "password" || inputElementType.toLowerCase() == "search" || inputElementType.toLowerCase() == "tel" || inputElementType.toLowerCase() == "text" || inputElementType.toLowerCase() == "time" || inputElementType.toLowerCase() == "url" || inputElementType.toLowerCase() == "week"))
        {
          inputElementName      = inputElement.getAttribute("name");
          inputElementMaxlength = inputElement.getAttribute("maxlength");

          // If the input element type is set and is color
          if(inputElementType && inputElementType.toLowerCase() == "color")
          {
            inputElement.value = "#ff0000";

            populatedFormFields++;
          }
          else if(inputElementType && inputElementType.toLowerCase() == "date")
          {
            inputElement.value = dateString;

            populatedFormFields++;
          }
          else if(inputElementType && (inputElementType.toLowerCase() == "datetime" || inputElementType.toLowerCase() == "datetime-local"))
          {
            inputElement.value = localDateTime;

            populatedFormFields++;
          }
          else if((inputElementType && inputElementType.toLowerCase() == "email") || ((!inputElementType || inputElementType == "text") && inputElementName && inputElementName.toLowerCase().indexOf("email") >= 0))
          {
            inputElement.value = emailAddress;

            populatedFormFields++;
          }
          else if(inputElementType && inputElementType.toLowerCase() == "month")
          {
            inputElement.value = month;

            populatedFormFields++;
          }
          else if(inputElementType && inputElementType.toLowerCase() == "password")
          {
            inputElement.value = password;

            populatedFormFields++;
          }
          else if(inputElementType && inputElementType.toLowerCase() == "number")
          {
            maximumValue = parseInt(inputElement.max, 10);
            minimumValue = parseInt(inputElement.min, 10);

            // If the maximum value is not a number
            if(isNaN(maximumValue))
            {
              maximumValue = 1;
            }

            // If the minimum value is not a number
            if(isNaN(minimumValue))
            {
              minimumValue = 0;
            }

            inputElement.value = Math.round(Math.random() * (maximumValue - minimumValue));

            populatedFormFields++;
          }
          else if((inputElementType && inputElementType.toLowerCase() == "tel") || (inputElementName && (inputElementName.toLowerCase().indexOf("phone") >= 0 || inputElementName && inputElementName.toLowerCase().indexOf("tel") >= 0)) )
          {
            inputElement.value = "1234567890";

            populatedFormFields++;
          }
          else if(inputElementType && inputElementType.toLowerCase() == "time")
          {
            inputElement.value = time;

            populatedFormFields++;
          }
          else if(inputElementType && inputElementType.toLowerCase() == "url")
          {
            inputElement.value = "http://localhost/";

            populatedFormFields++;
          }
          else if(inputElementType && inputElementType.toLowerCase() == "week")
          {
            inputElement.value = week;

            populatedFormFields++;
          }
          else if(inputElementName && inputElementName.toLowerCase().indexOf("zip") >= 0)
          {
            inputElement.value = "90210";

            populatedFormFields++;
          }
          else if(inputElementName)
          {
            inputElement.value = inputElementName;

            populatedFormFields++;
          }
          else
          {
            inputElement.value = "Web Developer";

            populatedFormFields++;
          }

          // If the input element has a maxlength attribute
          if(inputElementMaxlength && inputElement.value > inputElementMaxlength)
          {
            inputElement.value = inputElement.value.substr(0, inputElementMaxlength);
          }
        }
        else if(inputElementType && (inputElementType.toLowerCase() == "checkbox" || inputElementType.toLowerCase() == "radio"))
        {
          inputElement.checked = true;

          populatedFormFields++;
        }
      }
    }

    // Loop through the select tags
    for(j = 0, m = selectElements.length; j < m; j++)
    {
      selectElement = selectElements[j];

      // If the select element is not disabled and the value is not set
      if(!selectElement.disabled && !selectElement.value.trim())
      {
        options = selectElement.options;

        // Loop through the options
        for(var k = 0, n = options.length; k < n; k++)
        {
          option = options.item(k);

          // If the option is set and the option text and option value are not empty
          if(option && option.text.trim() && option.value.trim())
          {
            selectElement.selectedIndex = k;

            populatedFormFields++;

            break;
          }
        }
      }
    }

    // Loop through the text area tags
    for(j = 0, m = textAreaElements.length; j < m; j++)
    {
      textAreaElement = textAreaElements[j];

      // If the text area element is not disabled and the value is not set
      if(!textAreaElement.disabled && !textAreaElement.value.trim())
      {
        textAreaElementMaxlength = textAreaElement.getAttribute("maxlength");
        textAreaElement.value    = textAreaElement.getAttribute("name");

        populatedFormFields++;

        // If the text area element has a maxlength attribute
        if(textAreaElementMaxlength && textAreaElement.value > textAreaElementMaxlength)
        {
          textAreaElement.value = textAreaElement.value.substr(0, textAreaElementMaxlength);
        }
      }
    }
  }

  // If one form field was populated
  if(populatedFormFields == 1)
  {
    WebDeveloper.Common.displayNotification("populateFormFieldsSingleResult");
  }
  else
  {
    WebDeveloper.Common.displayNotification("populateFormFieldsMultipleResult", [populatedFormFields]);
  }
};

// Removes maximum lengths from all elements
WebDeveloper.Forms.removeMaximumLengths = function(documents)
{
  var alteredElements       = 0;
  var maximumLengthElements = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    maximumLengthElements = documents[i].querySelectorAll("[maxlength]");

    // Loop through the maximum length elements
    for(var j = 0, m = maximumLengthElements.length; j < m; j++)
    {
      maximumLengthElements[j].removeAttribute("maxlength");

      alteredElements++;
    }
  }

  // If one element was altered
  if(alteredElements == 1)
  {
    WebDeveloper.Common.displayNotification("removeMaximumLengthsSingleResult");
  }
  else
  {
    WebDeveloper.Common.displayNotification("removeMaximumLengthsMultipleResult", [alteredElements]);
  }
};

// Toggles all checkboxes
WebDeveloper.Forms.toggleCheckboxes = function(check, documents)
{
  var checkboxes = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    checkboxes = documents[i].querySelectorAll("input[type=checkbox]");

    // Loop through the checkboxes
    for(var j = 0, m = checkboxes.length; j < m; j++)
    {
      checkboxes[j].checked = check;
    }
  }
};
