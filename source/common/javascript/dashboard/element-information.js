var WebDeveloper = WebDeveloper || {};

WebDeveloper.ElementInformation                 = WebDeveloper.ElementInformation || {};
WebDeveloper.ElementInformation.currentElement  = null;
WebDeveloper.ElementInformation.selfClosingTags = ["area", "br", "col", "hr", "img", "input", "param"];

// Adds a CSS property
WebDeveloper.ElementInformation.addCSSProperty = function(element, property, contentDocument)
{
  var cssProperty = contentDocument.defaultView.getComputedStyle(element, null).getPropertyCSSValue(property);

  // If the CSS property is set
  if(cssProperty)
  {
    return property + ": " + cssProperty.cssText + ";\n";
  }

  return "";
};

// Handles the click event
WebDeveloper.ElementInformation.click = function(event)
{
  // If the click was not a right click
  if(event.button != 2)
  {
    var eventTarget = event.target;

    // If the event target is set
    if(eventTarget)
    {
      var tagName = eventTarget.tagName;

      // If the event target is not a scrollbar
      if(tagName && tagName.toLowerCase() != "scrollbar")
      {
        WebDeveloper.ElementInformation.currentElement = eventTarget;

        WebDeveloper.ElementInformation.displayElementInformation(eventTarget);
      }

      event.stopPropagation();
      event.preventDefault();
    }
  }
};

// Handles the click event inside the output
WebDeveloper.ElementInformation.clickOutput = function(event)
{
  // If the click was not a right click
  if(event.button != 2)
  {
    var eventTarget = event.target;

    // If the event target is set
    if(eventTarget)
    {
      // If the event target is the copy ancestor path button
      if(eventTarget.hasAttribute("id") && eventTarget.getAttribute("id") == "web-developer-copy-ancestor-path")
      {
        WebDeveloper.ElementInformation.copyAncestorPath();
      }
      else
      {
        var tagName = eventTarget.tagName;

        // If the event target is a link
        if(tagName && tagName.toLowerCase() == "a")
        {
          var tagClasses = eventTarget.className;

          // If the event target is an ancestor
          if(tagClasses.indexOf("web-developer-ancestor") != -1)
          {
            WebDeveloper.ElementInformation.selectParentElement(eventTarget);
          }
          else if(tagClasses.indexOf("web-developer-child") != -1)
          {
            WebDeveloper.ElementInformation.selectChildElement(eventTarget);
          }

          event.preventDefault();
        }
      }
    }
  }
};

// Generates ancestor information for an element
WebDeveloper.ElementInformation.generateAncestorInformation = function(element, contentDocument)
{
  var ancestorInformation = contentDocument.createElement("div");
  var ancestorList        = contentDocument.createElement("ul");
  var hasAncestors        = false;
  var heading             = contentDocument.createElement("h3");
  var parentElement       = null;

  heading.appendChild(contentDocument.createTextNode(WebDeveloper.ElementInformation.getLocaleString("ancestors")));

  // While there is a parent element
  while((parentElement = element.parentNode) !== null)
  {
    element      = parentElement;
    hasAncestors = true;

    WebDeveloper.Common.insertAsFirstChild(ancestorList, WebDeveloper.ElementInformation.getElementDescription(element, contentDocument, "web-developer-ancestor"));
  }

  ancestorInformation.setAttribute("class", "web-developer-section web-developer-ancestors");
  ancestorInformation.appendChild(heading);

  // If there are ancestors
  if(hasAncestors)
  {
    var lastItem = contentDocument.createElement("li");

    lastItem.setAttribute("class", "last");
    ancestorList.appendChild(lastItem);
    ancestorInformation.appendChild(ancestorList);
  }

  return ancestorInformation;
};

// Generates children information for an element
WebDeveloper.ElementInformation.generateChildrenInformation = function(element, contentDocument)
{
  var childList           = contentDocument.createElement("ul");
  var childNodes          = element.childNodes;
  var childrenInformation = contentDocument.createElement("div");
  var elementDescription  = null;
  var hasChildren         = false;
  var heading             = contentDocument.createElement("h3");

  heading.appendChild(contentDocument.createTextNode(WebDeveloper.ElementInformation.getLocaleString("children")));

  // Loop through the child nodes
  for(var i = 0, l = childNodes.length; i < l; i++)
  {
    elementDescription = WebDeveloper.ElementInformation.getElementDescription(childNodes[i], contentDocument, "web-developer-child");

    // If the element description is set
    if(elementDescription)
    {
      hasChildren = true;

      childList.appendChild(elementDescription);
    }
  }

  childrenInformation.setAttribute("class", "web-developer-section web-developer-children");
  childrenInformation.appendChild(heading);

  // If there are children
  if(hasChildren)
  {
    childrenInformation.appendChild(childList);
  }

  return childrenInformation;
};

// Generates DON information for an element
WebDeveloper.ElementInformation.generateDOMInformation = function(element, contentDocument)
{
  var attribute      = null;
  var attributeName  = null;
  var attributes     = element.attributes;
  var attributeValue = null;
  var childElement   = contentDocument.createElement("h3");
  var domInformation = contentDocument.createElement("div");
  var domContent     = "<";
  var tagName        = element.tagName.toLowerCase();

  childElement.appendChild(contentDocument.createTextNode(WebDeveloper.ElementInformation.getLocaleString("dom")));

  domInformation.setAttribute("class", "web-developer-section");
  domInformation.appendChild(childElement);

  childElement = contentDocument.createElement("pre");

  childElement.setAttribute("class", "web-developer-syntax-highlight");
  childElement.setAttribute("data-line-numbers", "false");
  childElement.setAttribute("data-type", "htmlmixed");

  domContent += tagName;

  // Loop through the attributes
  for(var i = 0, l = attributes.length; i < l; i++)
  {
    attribute     = attributes[i];
    attributeName = attribute.name;

    // If this is the style attribute
    if(attributeName == "style")
    {
      // If the element has the Web Developer outline attribute
      if(element.hasAttribute("data-web-developer-element-ancestors-outline"))
      {
        attributeValue = WebDeveloper.Common.removeSubstring(attribute.value, "outline-width: 1px; outline-style: solid; outline-color: rgb(185, 74, 72);").trim();
        attributeValue = WebDeveloper.Common.removeSubstring(attributeValue, "outline: 1px solid rgb(185, 74, 72);").trim();
        attributeValue = WebDeveloper.Common.removeSubstring(attributeValue, "outline: rgb(185, 74, 72) solid 1px;").trim();

        // If the attribute value is set
        if(attributeValue)
        {
          domContent += " " + attributeName + '="' + attributeValue + '"';
        }
      }
      else
      {
        domContent += " " + attributeName + '="' + attribute.value + '"';
      }
    }
    else if(attributeName != "data-web-developer-element-ancestors-outline")
    {
      domContent += " " + attributeName + '="' + attribute.value + '"';
    }
  }

  domContent += ">";

  // If this is not a self-closing tag
  if(!WebDeveloper.Common.inArray(tagName, WebDeveloper.ElementInformation.selfClosingTags))
  {
    domContent += "\n...\n";
    domContent += "</" + tagName + ">";
  }

  childElement.appendChild(contentDocument.createTextNode(domContent));

  domInformation.appendChild(childElement);

  return domInformation;
};

// Generates the information for an element
WebDeveloper.ElementInformation.generateElementInformation = function(element, contentDocument, generatedDocument, theme)
{
  var divElement         = generatedDocument.createElement("div");
  var elementInformation = generatedDocument.createDocumentFragment();

  elementInformation.appendChild(WebDeveloper.ElementAncestors.generateAncestorInformation(element, generatedDocument));
  divElement.appendChild(WebDeveloper.ElementInformation.generateDOMInformation(element, generatedDocument, theme));
  divElement.appendChild(WebDeveloper.ElementInformation.generateLayoutInformation(element, generatedDocument));
  divElement.appendChild(WebDeveloper.ElementInformation.generatePositionInformation(element, contentDocument, generatedDocument));
  divElement.appendChild(WebDeveloper.ElementInformation.generateTextInformation(element, contentDocument, generatedDocument));
  divElement.appendChild(WebDeveloper.ElementInformation.generateAncestorInformation(element, generatedDocument));
  divElement.appendChild(WebDeveloper.ElementInformation.generateChildrenInformation(element, generatedDocument));
  elementInformation.appendChild(divElement);

  return elementInformation;
};

// Generates layout information for an element
WebDeveloper.ElementInformation.generateLayoutInformation = function(element, contentDocument)
{
  var childElement      = contentDocument.createElement("h3");
  var layoutInformation = contentDocument.createElement("div");

  childElement.appendChild(contentDocument.createTextNode(WebDeveloper.ElementInformation.getLocaleString("layout")));

  layoutInformation.setAttribute("class", "web-developer-section web-developer-css");
  layoutInformation.appendChild(childElement);

  childElement = contentDocument.createElement("pre");

  childElement.setAttribute("class", "web-developer-syntax-highlight");
  childElement.setAttribute("data-line-numbers", "false");
  childElement.setAttribute("data-type", "css");

  childElement.appendChild(contentDocument.createTextNode("height: " + element.offsetHeight + "px;\nwidth: " + element.offsetWidth + "px;"));

  layoutInformation.appendChild(childElement);

  return layoutInformation;
};

// Generates position information for an element
WebDeveloper.ElementInformation.generatePositionInformation = function(element, contentDocument, generatedDocument)
{
  var childElement        = generatedDocument.createElement("h3");
  var positionInformation = generatedDocument.createElement("div");
  var positionContent     = "";

  childElement.appendChild(generatedDocument.createTextNode(WebDeveloper.ElementInformation.getLocaleString("position")));
  positionInformation.setAttribute("class", "web-developer-section web-developer-css");
  positionInformation.appendChild(childElement);

  childElement = generatedDocument.createElement("pre");

  childElement.setAttribute("class", "web-developer-syntax-highlight");
  childElement.setAttribute("data-line-numbers", "false");
  childElement.setAttribute("data-type", "css");

  positionContent += WebDeveloper.ElementInformation.addCSSProperty(element, "display", contentDocument);
  positionContent += WebDeveloper.ElementInformation.addCSSProperty(element, "float", contentDocument);
  positionContent += WebDeveloper.ElementInformation.addCSSProperty(element, "position", contentDocument);

  // If the position content was set
  if(positionContent)
  {
    positionContent = positionContent.trim();
  }

  childElement.appendChild(generatedDocument.createTextNode(positionContent));
  positionInformation.appendChild(childElement);

  return positionInformation;
};

// Generates text information for an element
WebDeveloper.ElementInformation.generateTextInformation = function(element, contentDocument, generatedDocument)
{
  var childElement    = generatedDocument.createElement("h3");
  var textInformation = generatedDocument.createElement("div");
  var textContent     = "";

  childElement.appendChild(contentDocument.createTextNode(WebDeveloper.ElementInformation.getLocaleString("text")));

  textInformation.setAttribute("class", "web-developer-section web-developer-css");
  textInformation.appendChild(childElement);

  childElement = generatedDocument.createElement("pre");

  childElement.setAttribute("class", "web-developer-syntax-highlight");
  childElement.setAttribute("data-line-numbers", "false");
  childElement.setAttribute("data-type", "css");

  textContent += WebDeveloper.ElementInformation.addCSSProperty(element, "font-family", contentDocument);
  textContent += WebDeveloper.ElementInformation.addCSSProperty(element, "font-size", contentDocument);
  textContent += WebDeveloper.ElementInformation.addCSSProperty(element, "line-height", contentDocument);

  // If the text content was set
  if(textContent)
  {
    textContent = textContent.trim();
  }

  childElement.appendChild(contentDocument.createTextNode(textContent));
  textInformation.appendChild(childElement);

  return textInformation;
};

// Returns the element description
WebDeveloper.ElementInformation.getElementDescription = function(element, contentDocument)
{
  var description = null;

  // If the element and tag name are set
  if(element && element.tagName)
  {
    var classList = element.className.split(" ");
    var link      = contentDocument.createElement("a");
    var linkText  = element.tagName.toLowerCase();

    description = contentDocument.createElement("li");

    link.setAttribute("class", "type");
    link.setAttribute("href", "#");

    // If the element has an id attribute
    if(element.hasAttribute("id"))
    {
      linkText += "#" + element.getAttribute("id");
    }

    // If the element has an class attribute
    if(element.hasAttribute("class"))
    {
      var className = null;

      // Loop through the classes
      for(var i = 0, l = classList.length; i < l; i++)
      {
        className = classList[i].trim();

        // If the class name is set
        if(className)
        {
          linkText += "." + className;
        }
      }
    }

    link.appendChild(contentDocument.createTextNode(linkText));

    description.appendChild(link);
  }

  return description;
};

// Handles a child element being selected
WebDeveloper.ElementInformation.selectChildElement = function(eventTarget)
{
  var childCount    = 0;
  var childNodes    = WebDeveloper.ElementInformation.currentElement.childNodes;
  var counter       = 0;
  var element       = eventTarget.parentNode;
  var ownerDocument = eventTarget.ownerDocument;

  // Loop through the previous siblings
  while((element = element.previousSibling) !== null)
  {
    childCount++;
  }

  // Loop through the child nodes
  for(var i = 0, l = childNodes.length; i < l; i++)
  {
    element = childNodes[i];

    // If the element and tag name are set
    if(element && element.tagName)
    {
      // If the counter matches the child count
      if(counter == childCount)
      {
        WebDeveloper.ElementInformation.displayElementInformation(element);

        // If the owner document is set
        if(ownerDocument)
        {
          element = ownerDocument.getElementById("element-information-panel");

          // If the element is found
          if(element)
          {
            element.scrollTop = 0;
          }
        }

        break;
      }

      counter++;
    }
  }
};

// Handles a parent element being selected
WebDeveloper.ElementInformation.selectParentElement = function(eventTarget)
{
  var ancestorCount = 0;
  var element       = eventTarget.parentNode;
  var ownerDocument = eventTarget.ownerDocument;
  var parentElement = WebDeveloper.ElementInformation.currentElement;

  // Loop through the next siblings
  while((element = element.nextSibling) !== null)
  {
    ancestorCount++;
  }

  // Loop through the ancestors
  for(var i = 0; i < ancestorCount; i++)
  {
    parentElement = parentElement.parentNode;
  }

  WebDeveloper.ElementInformation.displayElementInformation(parentElement);

  // If the owner document is set
  if(ownerDocument)
  {
    element = ownerDocument.getElementById("element-information-panel");

    // If the element is found
    if(element)
    {
      element.scrollTop = 0;
    }
  }
};
