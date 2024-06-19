var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.ElementAncestors                          = WebDeveloper.ElementAncestors || {};
WebDeveloper.ElementAncestors.ancestorSingleLineHeight = 25;
WebDeveloper.ElementAncestors.element                  = null;

// Adjusts the ancestors
WebDeveloper.ElementAncestors.adjustAncestors = function(ancestors, adjustor)
{
  // If the ancestors are set
  if(ancestors)
  {
    // Loop through the ancestors
    ancestors.forEach((ancestor) =>
    {
      adjustor(ancestor);
    });
  }
};

// Displays the ancestors of an element
WebDeveloper.ElementAncestors.displayElementAncestors = function(element)
{
  var dashboard = WebDeveloper.Dashboard.getDashboard(WebDeveloper.Common.getContentDocument());

  // If the dashboard exists
  if(dashboard)
  {
    // If the element is not the dashboard
    if(!element.hasAttribute("id") || element.getAttribute("id") != dashboard.getAttribute("id"))
    {
      var generatedDocument = dashboard.contentDocument;
      var elementAncestors  = generatedDocument.getElementById("current-element-ancestors");

      WebDeveloper.Common.empty(elementAncestors);
      elementAncestors.appendChild(WebDeveloper.ElementAncestors.getAncestorInformation(element, generatedDocument, true));
      WebDeveloper.ElementAncestors.resize();
    }
  }
};

// Generates ancestor information for an element
WebDeveloper.ElementAncestors.generateAncestorInformation = function(element, contentDocument)
{
  var ancestorInformation = contentDocument.createElement("div");

  ancestorInformation.setAttribute("class", "bg-body-secondary my-2 p-2 rounded");
  ancestorInformation.setAttribute("id", "web-developer-ancestors");
  ancestorInformation.appendChild(WebDeveloper.ElementAncestors.getAncestorInformation(element, contentDocument, false));

  return ancestorInformation;
};

// Returns the ancestor information for an element
WebDeveloper.ElementAncestors.getAncestorInformation = function(element, contentDocument, secondary)
{
  var ancestorInformation = contentDocument.createElement("ol");
  var parentElement       = null;

  ancestorInformation.setAttribute("class", "breadcrumb mb-0");
  ancestorInformation.setAttribute("style", "--bs-breadcrumb-divider: '>';");
  WebDeveloper.Common.insertAsFirstChild(ancestorInformation, WebDeveloper.ElementAncestors.getElementDescription(element, contentDocument, true, secondary));

  // While there is a parent element
  while((parentElement = element.parentNode) !== null)
  {
    element = parentElement;

    WebDeveloper.Common.insertAsFirstChild(ancestorInformation, WebDeveloper.ElementAncestors.getElementDescription(element, contentDocument, false, secondary));
  }

  return ancestorInformation;
};

// Returns the description for an element
WebDeveloper.ElementAncestors.getElementDescription = function(element, contentDocument, active, secondary)
{
  var description = null;

  // If the element and tag name are set
  if(element && element.tagName)
  {
    var classList = element.className.split(" ");

    description = contentDocument.createElement("li");

    // If this is the active element
    if(active)
    {
      description.setAttribute("class", "active breadcrumb-item");
    }
    else
    {
      description.setAttribute("class", "breadcrumb-item");
    }

    description.setAttribute("data-web-developer-element-tag", element.tagName.toLowerCase());

    // If the element has an id attribute
    if(element.hasAttribute("id"))
    {
      description.setAttribute("data-web-developer-element-id", "#" + element.getAttribute("id"));
    }

    // If the element has an class attribute
    if(element.hasAttribute("class"))
    {
      var className = null;
      var classes   = "";

      // Loop through the classes
      for(var i = 0, l = classList.length; i < l; i++)
      {
        className = classList[i].trim();

        // If the class name is set
        if(className)
        {
          classes += "." + className;
        }
      }

      description.setAttribute("data-web-developer-element-classes", classes);
    }

    // If this is not the active element
    if(!active)
    {
      var childElement   = contentDocument.createElement("a");
      var classAttribute = "web-developer-ancestor";

      // If the display should be secondary
      if(secondary)
      {
        classAttribute = "text-secondary " + classAttribute;
      }

      childElement.setAttribute("href", "#");
      childElement.setAttribute("class", classAttribute);
      description.appendChild(childElement);
    }
  }

  return description;
};

// Hides ancestors from the middle of the path
WebDeveloper.ElementAncestors.hideAncestors = function(ancestorContainer)
{
  var middleAncestor   = ancestorContainer.querySelector(".web-developer-middle-ancestor");
  var nextSiblings     = WebDeveloper.Common.getNextSiblings(middleAncestor, ":not(.d-none)");
  var previousSiblings = WebDeveloper.Common.getPreviousSiblings(middleAncestor, ":not(.d-none)");

  // If there are previous siblings
  if(previousSiblings)
  {
    previousSiblings.slice(-1)[0].classList.add("d-none");
  }

  // If there are next siblings
  if(nextSiblings)
  {
    nextSiblings[0].classList.add("d-none");
  }
};

// Handles the mouse over event
WebDeveloper.ElementAncestors.mouseOver = function(event)
{
  var eventTarget = event.target;

  // If the event target is set
  if(eventTarget)
  {
    var ownerDocument = eventTarget.ownerDocument;

    // If the owner document is set
    if(ownerDocument)
    {
      // If the event target is not the element
      if(eventTarget != WebDeveloper.ElementAncestors.element)
      {
        // If the event target has a string class name and style property
        if(eventTarget.className.split && eventTarget.style)
        {
          WebDeveloper.ElementAncestors.removeOutline(ownerDocument);

          eventTarget.style.outline             = "1px solid #b94a48";
          WebDeveloper.ElementAncestors.element = eventTarget;

          WebDeveloper.ElementAncestors.displayElementAncestors(eventTarget);

          // Needed for Chrome to keep track of
          eventTarget.setAttribute("data-web-developer-element-ancestors-outline", "true");
        }
      }
    }
  }
};

// Removes the outline
WebDeveloper.ElementAncestors.removeOutline = function(contentDocument)
{
  var element = contentDocument.querySelector("[data-web-developer-element-ancestors-outline=true]");

  // If the element is set
  if(element)
  {
    element.style.outline = "";

    // If the element has an empty style attribute
    if(element.hasAttribute("style") && element.getAttribute("style").trim() === "")
    {
      element.removeAttribute("style");
    }

    // Needed for Chrome to keep track of
    element.removeAttribute("data-web-developer-element-ancestors-outline");
  }
};

// Resizes the ancestors
WebDeveloper.ElementAncestors.resize = function()
{
  var generatedDocument = WebDeveloper.Dashboard.getDashboard(WebDeveloper.Common.getContentDocument()).contentDocument;

  WebDeveloper.ElementAncestors.resizeAncestors(generatedDocument.querySelector("#current-element-ancestors .breadcrumb"));
  WebDeveloper.ElementAncestors.resizeAncestors(generatedDocument.querySelector("#web-developer-ancestors .breadcrumb"));
};

// Resizes the ancestors
WebDeveloper.ElementAncestors.resizeAncestors = function(ancestorContainer)
{
  // If the ancestor container is set
  if(ancestorContainer)
  {
    var ancestors      = ancestorContainer.querySelectorAll("li");
    var currentHeight  = 0;
    var previousHeight = 0;

    WebDeveloper.ElementAncestors.toggleMiddleAncestor(ancestorContainer, ancestors, true);

    WebDeveloper.ElementAncestors.adjustAncestors(ancestors, function(ancestor) { WebDeveloper.ElementAncestors.setAncestorDescription(ancestor, true, true, 0); });

    // If the ancestors are wrapping
    if(ancestorContainer.offsetHeight > WebDeveloper.ElementAncestors.ancestorSingleLineHeight)
    {
      WebDeveloper.ElementAncestors.adjustAncestors(ancestors, function(ancestor) { WebDeveloper.ElementAncestors.setAncestorDescription(ancestor, true, true, 30); });
    }

    // If the ancestors are wrapping
    if(ancestorContainer.offsetHeight > WebDeveloper.ElementAncestors.ancestorSingleLineHeight)
    {
      WebDeveloper.ElementAncestors.adjustAncestors(ancestors, function(ancestor) { WebDeveloper.ElementAncestors.setAncestorDescription(ancestor, true, false, 0); });
    }

    // If the ancestors are wrapping
    if(ancestorContainer.offsetHeight > WebDeveloper.ElementAncestors.ancestorSingleLineHeight)
    {
      WebDeveloper.ElementAncestors.adjustAncestors(ancestors, function(ancestor) { WebDeveloper.ElementAncestors.setAncestorDescription(ancestor, true, false, 16); });
    }

    // If the ancestors are wrapping
    if(ancestorContainer.offsetHeight > WebDeveloper.ElementAncestors.ancestorSingleLineHeight)
    {
      WebDeveloper.ElementAncestors.adjustAncestors(ancestors, function(ancestor) { WebDeveloper.ElementAncestors.setAncestorDescription(ancestor, false, false, 0); });
    }

    // If the ancestors are wrapping
    if(ancestorContainer.offsetHeight > WebDeveloper.ElementAncestors.ancestorSingleLineHeight)
    {
      WebDeveloper.ElementAncestors.toggleMiddleAncestor(ancestorContainer, ancestors, false);
    }

    currentHeight = ancestorContainer.offsetHeight;

    // While the ancestors are wrapping
    while(currentHeight > WebDeveloper.ElementAncestors.ancestorSingleLineHeight && currentHeight != previousHeight)
    {
      previousHeight = ancestorContainer.offsetHeight;

      WebDeveloper.ElementAncestors.hideAncestors(ancestorContainer);

      currentHeight = ancestorContainer.offsetHeight;
    }
  }
};

// Sets the ancestor description
WebDeveloper.ElementAncestors.setAncestorDescription = function(ancestor, includeId, includeClasses, truncateLength)
{
  var ancestorData        = ancestor.getAttribute("data-web-developer-element-id");
  var ancestorDescription = ancestor.getAttribute("data-web-developer-element-tag");

  // If including the id and it is set
  if(includeId && ancestorData)
  {
    ancestorDescription += ancestorData;
  }

  ancestorData = ancestor.getAttribute("data-web-developer-element-classes");

  // If including the classes and they are set
  if(includeClasses && ancestorData)
  {
    ancestorDescription += ancestorData;
  }

  // If truncating the length and the description is longer than the truncate length
  if(truncateLength && ancestorDescription.length > truncateLength)
  {
    var halfLength = truncateLength / 2;

    ancestorDescription = ancestorDescription.substring(0, halfLength) + "..." + ancestorDescription.substr(-halfLength);
  }

  // If this is the active ancestor
  if(ancestor.classList.contains("active"))
  {
    ancestor.textContent = ancestorDescription;
  }
  else
  {
    ancestor.querySelector("a").textContent = ancestorDescription;
  }
};

// Toggles the middle ancestor
WebDeveloper.ElementAncestors.toggleMiddleAncestor = function(ancestorContainer, ancestors, display)
{
  var middleAncestor = null;

  // If displaying the middle ancestor
  if(display)
  {
    middleAncestor = ancestorContainer.querySelector(".web-developer-middle-ancestor");

    // If the ancestors are set
    if(ancestors)
    {
      // Loop through the ancestors
      ancestors.forEach((ancestor) =>
      {
        ancestor.classList.remove("d-none");
      });
    }

    // If there is a middle ancestor
    if(middleAncestor)
    {
      middleAncestor.classList.remove("web-developer-middle-ancestor");
    }
  }
  else
  {
    var breadcrumbLink = null;

    // If the ancestors are set
    if(ancestors)
    {
      middleAncestor = ancestors.item(Math.floor(ancestors.length / 2));
      breadcrumbLink = middleAncestor.querySelector("a");
    }

    // If the breadcrumb link is set
    if(breadcrumbLink)
    {
      breadcrumbLink.textContent = "...";

      middleAncestor.classList.add("web-developer-middle-ancestor");
    }
  }
};

window.addEventListener("resize", WebDeveloper.ElementAncestors.resize);

WebDeveloper.ElementInformation                 = WebDeveloper.ElementInformation || {};
WebDeveloper.ElementInformation.currentElement  = null;
WebDeveloper.ElementInformation.locale          = null;
WebDeveloper.ElementInformation.selfClosingTags = ["area", "br", "col", "hr", "img", "input", "param"];

// Adds a CSS property
WebDeveloper.ElementInformation.addCSSProperty = function(element, property, contentDocument)
{
  var cssProperty = WebDeveloper.Common.getPropertyCSSValue(contentDocument.defaultView.getComputedStyle(element, null), property);

  // If the CSS property is set
  if(cssProperty)
  {
    return property + ": " + WebDeveloper.Common.getCSSText(cssProperty) + ";\n";
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

    // If the event target is set and has a string class name
    if(eventTarget && eventTarget.className.split)
    {
      var tagName = eventTarget.tagName;

      // If the event target is not a scrollbar
      if(tagName && tagName.toLowerCase() != "scrollbar")
      {
        WebDeveloper.ElementInformation.currentElement = eventTarget;

        WebDeveloper.ElementInformation.displayElementInformation(eventTarget);
      }
    }

    event.stopPropagation();
    event.preventDefault();
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

// Displays the information for an element
WebDeveloper.ElementInformation.displayElementInformation = function(element)
{
  var contentDocument    = WebDeveloper.Common.getContentDocument();
  var generatedDocument  = WebDeveloper.Dashboard.getDashboard(contentDocument).contentDocument;
  var elementInformation = generatedDocument.getElementById("element-information-content");

  WebDeveloper.Common.empty(elementInformation);
  elementInformation.appendChild(WebDeveloper.ElementInformation.generateElementInformation(element, contentDocument, generatedDocument, "none"));
  WebDeveloper.ElementAncestors.resize();
};

// Generates ancestor information for an element
WebDeveloper.ElementInformation.generateAncestorInformation = function(element, contentDocument)
{
  var ancestorInformation = contentDocument.createElement("div");
  var ancestorList        = contentDocument.createElement("ol");
  var hasAncestors        = false;
  var heading             = contentDocument.createElement("h1");
  var parentElement       = null;

  heading.appendChild(contentDocument.createTextNode(WebDeveloper.ElementInformation.getLocaleString("ancestors")));
  heading.setAttribute("class", "h4");

  // While there is a parent element
  while((parentElement = element.parentNode) !== null)
  {
    element      = parentElement;
    hasAncestors = true;

    WebDeveloper.Common.insertAsFirstChild(ancestorList, WebDeveloper.ElementInformation.getElementDescription(element, contentDocument, "web-developer-ancestor"));
  }

  ancestorInformation.setAttribute("class", "col-sm-6 web-developer-ancestors");
  ancestorInformation.appendChild(heading);

  // If there are ancestors
  if(hasAncestors)
  {
    var lastItem = contentDocument.createElement("li");

    lastItem.setAttribute("class", "last");
    ancestorList.appendChild(lastItem);
    ancestorList.setAttribute("class", "bg-body-tertiary border list-unstyled p-2");
    ancestorInformation.appendChild(ancestorList);
  }

  return ancestorInformation;
};

// Generates children information for an element
WebDeveloper.ElementInformation.generateChildrenInformation = function(element, contentDocument)
{
  var childList           = contentDocument.createElement("ol");
  var childNodes          = element.childNodes;
  var childrenInformation = contentDocument.createElement("div");
  var elementDescription  = null;
  var hasChildren         = false;
  var heading             = contentDocument.createElement("h1");

  heading.appendChild(contentDocument.createTextNode(WebDeveloper.ElementInformation.getLocaleString("children")));
  heading.setAttribute("class", "h4");

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

  childrenInformation.setAttribute("class", "col-sm-6 web-developer-children");
  childrenInformation.appendChild(heading);

  // If there are children
  if(hasChildren)
  {
    childList.setAttribute("class", "bg-body-tertiary border list-unstyled p-2");
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
  var childElement   = contentDocument.createElement("h1");
  var domInformation = contentDocument.createElement("div");
  var domContent     = "<";
  var tagName        = element.tagName.toLowerCase();

  childElement.appendChild(contentDocument.createTextNode(WebDeveloper.ElementInformation.getLocaleString("dom")));
  childElement.setAttribute("class", "h4");

  domInformation.setAttribute("class", "col-sm-6");
  domInformation.appendChild(childElement);

  childElement = contentDocument.createElement("pre");

  childElement.setAttribute("class", "bg-body-tertiary border p-2 web-developer-syntax-highlight");
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

  divElement.setAttribute("class", "row");
  divElement.appendChild(WebDeveloper.ElementInformation.generateDOMInformation(element, generatedDocument, theme));
  divElement.appendChild(WebDeveloper.ElementInformation.generateLayoutInformation(element, generatedDocument));
  elementInformation.appendChild(divElement);

  divElement = generatedDocument.createElement("div");

  divElement.setAttribute("class", "row");
  divElement.appendChild(WebDeveloper.ElementInformation.generatePositionInformation(element, contentDocument, generatedDocument));
  divElement.appendChild(WebDeveloper.ElementInformation.generateTextInformation(element, contentDocument, generatedDocument));
  elementInformation.appendChild(divElement);

  divElement = generatedDocument.createElement("div");

  divElement.setAttribute("class", "row");
  divElement.appendChild(WebDeveloper.ElementInformation.generateAncestorInformation(element, generatedDocument));
  divElement.appendChild(WebDeveloper.ElementInformation.generateChildrenInformation(element, generatedDocument));
  elementInformation.appendChild(divElement);

  return elementInformation;
};

// Generates layout information for an element
WebDeveloper.ElementInformation.generateLayoutInformation = function(element, contentDocument)
{
  var childElement      = contentDocument.createElement("h1");
  var layoutInformation = contentDocument.createElement("div");

  childElement.appendChild(contentDocument.createTextNode(WebDeveloper.ElementInformation.getLocaleString("layout")));
  childElement.setAttribute("class", "h4");

  layoutInformation.setAttribute("class", "col-sm-6 web-developer-css");
  layoutInformation.appendChild(childElement);

  childElement = contentDocument.createElement("pre");

  childElement.setAttribute("class", "bg-body-tertiary border p-2 web-developer-syntax-highlight");
  childElement.setAttribute("data-line-numbers", "false");
  childElement.setAttribute("data-type", "css");

  childElement.appendChild(contentDocument.createTextNode("height: " + element.offsetHeight + "px;\nwidth: " + element.offsetWidth + "px;"));

  layoutInformation.appendChild(childElement);

  return layoutInformation;
};

// Generates position information for an element
WebDeveloper.ElementInformation.generatePositionInformation = function(element, contentDocument, generatedDocument)
{
  var childElement        = generatedDocument.createElement("h1");
  var positionInformation = generatedDocument.createElement("div");
  var positionContent     = "";

  childElement.appendChild(generatedDocument.createTextNode(WebDeveloper.ElementInformation.getLocaleString("position")));
  childElement.setAttribute("class", "h4");
  positionInformation.setAttribute("class", "col-sm-6 web-developer-css");
  positionInformation.appendChild(childElement);

  childElement = generatedDocument.createElement("pre");

  childElement.setAttribute("class", "bg-body-tertiary border p-2 web-developer-syntax-highlight");
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
  var childElement    = generatedDocument.createElement("h1");
  var textInformation = generatedDocument.createElement("div");
  var textContent     = "";

  childElement.appendChild(generatedDocument.createTextNode(WebDeveloper.ElementInformation.getLocaleString("text")));
  childElement.setAttribute("class", "h4");
  textInformation.setAttribute("class", "col-sm-6 web-developer-css");
  textInformation.appendChild(childElement);

  childElement = generatedDocument.createElement("pre");

  childElement.setAttribute("class", "bg-body-tertiary border p-2 web-developer-syntax-highlight");
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

  childElement.appendChild(generatedDocument.createTextNode(textContent));
  textInformation.appendChild(childElement);

  return textInformation;
};

// Returns the element description
WebDeveloper.ElementInformation.getElementDescription = function(element, contentDocument, type)
{
  var description = null;

  // If the element and tag name are set
  if(element && element.tagName)
  {
    var classList = element.className.split(" ");
    var link      = contentDocument.createElement("a");
    var linkText  = element.tagName.toLowerCase();

    description = contentDocument.createElement("li");

    link.setAttribute("class", type);
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

// Returns the element information dashboard HTML template
WebDeveloper.ElementInformation.getElementInformationDashboardTemplates = function(parameters)
{
  var dashboardTemplates = {};

  dashboardTemplates.dashboard          = '<div id="web-developer-dashboard-resizer">&bull;</div><h1 id="web-developer-dashboard-title" class="text-muted">' + parameters.dashboardTitle + '</h1><ul id="web-developer-dashboard-tabs" class="nav nav-pills"></ul><div id="web-developer-dashboard-panels" class="tab-content"></div>';
  dashboardTemplates.elementInformation = '<div id="element-information-content" class="container-fluid overflow-y-scroll"><p id="web-developer-information" class="lead text-info">' + parameters.selectAnElementDisplayInformation + '</p></div><div id="current-element-ancestors" class="bg-body-secondary border-top border-secondary-subtle px-1"></div>';
  dashboardTemplates.panel              = '<div id="' + parameters.tabId + '-panel" class="tab-pane active"></div>';
  dashboardTemplates.tab                = '<li id="' + parameters.tabId + '-tab" class="nav-item"><a href="#' + parameters.tabId + '-panel" class="active nav-link" data-bs-target="#' + parameters.tabId + '-panel" data-bs-toggle="pill">' + parameters.title + "</a></li>";

  return dashboardTemplates;
};

// Returns a string from the locale
WebDeveloper.ElementInformation.getLocaleString = function(name)
{
  return WebDeveloper.ElementInformation.locale[name];
};

// Initializes the display element information dashboard
WebDeveloper.ElementInformation.initialize = function(display, contentDocument, locale)
{
  // If displaying the element information dashboard
  if(display)
  {
    var dashboardPanel = null;
    var templates      = WebDeveloper.ElementInformation.getElementInformationDashboardTemplates({ dashboardTitle: locale.dashboardTitle, selectAnElementDisplayInformation: locale.selectAnElementDisplayInformation, tabId: "element-information", title: locale.elementInformation });

    dashboardPanel                                         = WebDeveloper.Dashboard.openDashboardTab("element-information", locale.elementInformation, contentDocument, templates, locale.dashboardTitle);
    dashboardPanel.innerHTML                               = templates.elementInformation;
    WebDeveloper.ElementInformation.locale                 = locale;
    window.WebDeveloperEvents                              = window.WebDeveloperEvents || {};
    window.WebDeveloperEvents.ElementInformation           = window.WebDeveloperEvents.ElementInformation || {};
    window.WebDeveloperEvents.ElementInformation.click     = WebDeveloper.ElementInformation.click;
    window.WebDeveloperEvents.ElementInformation.mouseOver = WebDeveloper.ElementAncestors.mouseOver;

    dashboardPanel.addEventListener("click", WebDeveloper.ElementInformation.clickOutput, false);

    window.setTimeout(function() { WebDeveloper.ElementInformation.resize(WebDeveloper.Dashboard.getDashboard(contentDocument)); }, 100);

    contentDocument.addEventListener("click", window.WebDeveloperEvents.ElementInformation.click, true);
    contentDocument.addEventListener("mouseover", window.WebDeveloperEvents.ElementInformation.mouseOver, false);
  }
  else
  {
    WebDeveloper.Dashboard.closeDashboardTab("element-information", contentDocument);

    contentDocument.removeEventListener("click", window.WebDeveloperEvents.ElementInformation.click, true);
    contentDocument.removeEventListener("mouseover", window.WebDeveloperEvents.ElementInformation.mouseOver, false);
    WebDeveloper.ElementAncestors.removeOutline(contentDocument);

    window.WebDeveloperEvents.ElementInformation = null;
  }

  WebDeveloper.Common.toggleStyleSheet("/embedded/css/dashboard/external/element-information.css", "web-developer-element-information-styles", contentDocument, false);
};

// Resizes the element information elements
WebDeveloper.ElementInformation.resize = function(dashboard)
{
  var elementInformationContent = dashboard.contentDocument.getElementById("element-information-content");

  // If the element information content exists
  if(elementInformationContent)
  {
    elementInformationContent.style.height = dashboard.offsetHeight - elementInformationContent.offsetTop - WebDeveloper.ElementAncestors.ancestorSingleLineHeight - 1 + "px";
  }
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
        WebDeveloper.ElementInformation.currentElement = element;

        WebDeveloper.ElementInformation.displayElementInformation(element);

        // If the owner document is set
        if(ownerDocument)
        {
          element = ownerDocument.getElementById("element-information-content");

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

  WebDeveloper.ElementInformation.currentElement = parentElement;

  WebDeveloper.ElementInformation.displayElementInformation(parentElement);

  // If the owner document is set
  if(ownerDocument)
  {
    element = ownerDocument.getElementById("element-information-content");

    // If the element is found
    if(element)
    {
      element.scrollTop = 0;
    }
  }
};

// Fixes a non-structured-clonable data error in Firefox
""; // eslint-disable-line no-unused-expressions
