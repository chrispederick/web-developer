var WebDeveloper = WebDeveloper || {};

WebDeveloper.ElementAncestors         = WebDeveloper.ElementAncestors || {};
WebDeveloper.ElementAncestors.element = null;

// Returns the ancestor information for an element
WebDeveloper.ElementAncestors.getAncestorInformation = function(element, contentDocument)
{
  var ancestorInformation = contentDocument.createElement("ol");
  var parentElement       = null;

  ancestorInformation.setAttribute("class", "breadcrumb");
  WebDeveloper.Common.insertAsFirstChild(ancestorInformation, WebDeveloper.ElementAncestors.getElementDescription(element, contentDocument, true));

  // While there is a parent element
  while((parentElement = element.parentNode) !== null)
  {
    element = parentElement;

    WebDeveloper.Common.insertAsFirstChild(ancestorInformation, WebDeveloper.ElementAncestors.getElementDescription(element, contentDocument, false));
  }

  return ancestorInformation;
};

// Returns the description for an element
WebDeveloper.ElementAncestors.getElementDescription = function(element, contentDocument, active)
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
      description.setAttribute("class", "active");
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
      var childElement = contentDocument.createElement("a");

      childElement.setAttribute("href", "#");
      childElement.setAttribute("class", "web-developer-ancestor");
      description.appendChild(childElement);
    }
  }

  return description;
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
        // If the event target has a style property
        if(eventTarget.style)
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
