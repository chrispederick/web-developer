WebDeveloper.ElementInformation = {};

WebDeveloper.ElementInformation.element      = null;
WebDeveloper.ElementInformation.selected     = false;
WebDeveloper.ElementInformation.selectionCSS = '::selection { background-color: transparent !important; }';

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
	    var ownerDocument = eventTarget.ownerDocument;
	
	    // If the owner document is set
	    if(ownerDocument)
	    {
	      var elementInformation = ownerDocument.getElementById("web-developer-element-information");
	
	      // If the element information was found
	      if(elementInformation)
	      {
		      var tagName = eventTarget.tagName;
		      var toolbar = ownerDocument.getElementById("web-developer-element-information-toolbar");

	        // If the event target is not the element information or toolbar, the element information and toolbar are not ancestors of the event target and the event target is not a scrollbar
	        if(eventTarget != elementInformation && eventTarget != toolbar && !WebDeveloper.Common.isAncestor(eventTarget, elementInformation) && !WebDeveloper.Common.isAncestor(eventTarget, toolbar) && tagName && tagName.toLowerCase() != "scrollbar")
	        {
						WebDeveloper.ElementInformation.populateElementInformation(eventTarget, ownerDocument);
					}
			
			    event.stopPropagation();
			    event.preventDefault();
				}
      }
    }
  }
};

// Creates the element information
WebDeveloper.ElementInformation.createElementInformation = function(contentDocument)
{
  var elementInformation = contentDocument.createElement("div");
  var header             = contentDocument.createElement("div");
  var wrapper            = contentDocument.createElement("div");

	header.innerHTML = '<h1 class="description">Element Information</h1>';
	
  header.setAttribute("id", "web-developer-element-information-header");

  header.addEventListener("mousedown", WebDeveloper.ElementInformation.selectElementInformation, true);
  header.addEventListener("mouseup", WebDeveloper.ElementInformation.deselectElementInformation, true);

  wrapper.setAttribute("id", "web-developer-element-information-body");

	elementInformation.appendChild(header);
	elementInformation.appendChild(wrapper);
  elementInformation.setAttribute("id", "web-developer-element-information");

	WebDeveloper.Common.getDocumentBodyElement(contentDocument).appendChild(elementInformation);

  contentDocument.addEventListener("click", WebDeveloper.ElementInformation.click, true);
  contentDocument.addEventListener("mousemove", WebDeveloper.ElementInformation.mouseMove, false);
  contentDocument.addEventListener("mouseover", WebDeveloper.ElementInformation.mouseOver, false);
};

// Handles the element information being deselected
WebDeveloper.ElementInformation.deselectElementInformation = function(event)
{
  var eventTarget = event.target;

  // If the event target is set
  if(eventTarget)
  {
    var ownerDocument = eventTarget.ownerDocument;

    // If the owner document is set
    if(ownerDocument)
    {
      var elementInformation = ownerDocument.getElementById("web-developer-element-information");

      // If the element information was found
      if(elementInformation)
      {
				WebDeveloper.ElementInformation.selected = false;

				WebDeveloper.Common.removeMatchingElements("#web-developer-element-information-selection-styles", ownerDocument);
			}
		}
  }
};

// Displays the ancestors of an element
WebDeveloper.ElementInformation.displayElementAncestors = function(element, contentDocument)
{
  // If the element is set
  if(element)
  {
    var tagName = element.tagName;

    // If the tag name is set and does not equal scrollbar
    if(tagName && tagName.toLowerCase() != "scrollbar")
    {
      var ancestorText       = WebDeveloper.ElementInformation.getElementDescription(element);
      var elementDescription = null;
      var parentElement      = null;

      // While there is a parent element
      while((parentElement = element.parentNode) !== null)
      {
	      element            = parentElement;
	      elementDescription = WebDeveloper.ElementInformation.getElementDescription(element);
	      
	      // If the element description is set
	      if(elementDescription)
	      {
		      ancestorText += " < " + elementDescription;
	      }
      }

      contentDocument.querySelector("#web-developer-element-information-toolbar p").innerHTML = ancestorText;
    }
  }
};

// Returns the description for an element
WebDeveloper.ElementInformation.getElementDescription = function(element)
{
  var description = "";

  // If the element and tag name are set
  if(element && element.tagName)
	{
		var className = null;
		var classes   = element.className.split(" ");

    description = element.tagName.toLowerCase();

    // If the element has an id attribute
    if(element.hasAttribute("id"))
    {
      description += "#" + element.getAttribute("id");
    }

    // If the element has an class attribute
    if(element.hasAttribute("class"))
    {
			// Loop through the classes
			for(var i = 0, l = classes.length; i < l; i++)
			{
				className = WebDeveloper.Common.trim(classes[i]);
				
				// If the class name is set
				if(className)
				{
					description += "." + className;
				}
			}
		}
  }

  return description;
};

// Handles the mouse move event
WebDeveloper.ElementInformation.mouseMove = function(event)
{
  // If the element information block is selected
  if(WebDeveloper.ElementInformation.selected)
  {
    var eventTarget = event.target;

    // If the event target is set
    if(eventTarget)
    {
      var ownerDocument = eventTarget.ownerDocument;

      // If the owner document is set
      if(ownerDocument)
      {
        var elementInformation = ownerDocument.getElementById("web-developer-element-information");

        // If the element information was found
        if(elementInformation)
        {
          elementInformation.style.left = (event.clientX - 5) + "px !important";
          elementInformation.style.top  = (event.clientY - 5) + "px !important";
        }
      }
    }
  }
};

// Handles the mouse over event
WebDeveloper.ElementInformation.mouseOver = function(event)
{
  // If the element information block is not selected
  if(!WebDeveloper.ElementInformation.selected)
  {
	  var eventTarget = event.target;
	
	  // If the event target is set
	  if(eventTarget)
	  {
	    var ownerDocument = eventTarget.ownerDocument;
	
	    // If the owner document is set
	    if(ownerDocument)
	    {
	      var elementInformation = ownerDocument.getElementById("web-developer-element-information");
	
	      // If the element information was found
	      if(elementInformation)
	      {
	        // If the event target is not the element or the element information and the element information is not an ancestor of the event target
	        if(eventTarget != WebDeveloper.ElementInformation.element && eventTarget != elementInformation && !WebDeveloper.Common.isAncestor(eventTarget, elementInformation) && !WebDeveloper.Common.isAncestor(eventTarget, ownerDocument.getElementById("web-developer-element-information-toolbar")))
	        {
				    // If the event target has a style property
				    if(eventTarget.style)
				    {
							WebDeveloper.ElementInformation.removeOutline(WebDeveloper.ElementInformation.element);
			
			        eventTarget.style.outline               = "1px solid #f00";
			        WebDeveloper.ElementInformation.element = eventTarget;
	
							WebDeveloper.ElementInformation.displayElementAncestors(eventTarget, ownerDocument);
	
							// Needed for Chrome to keep track of
							eventTarget.setAttribute("web-developer-element-information-outline", "true");
				    }
	        }
	      }
	    }
	  }
	}
};

// Populates the attributes for an element
WebDeveloper.ElementInformation.populateElementAttributes = function(element)
{
  var attribute              = null;
  var attributeName          = null;
  var attributes             = element.attributes;
  var attributeValue         = null;
	var elementInformationHTML = "";

  // Loop through the attributes
  for(var i = 0, l = attributes.length; i < l; i++)
  {
    attribute     = attributes[i];
    attributeName = attribute.name;
    
    // If this is the style attribute
    if(attributeName == "style")
		{
			// If the element has the Web Developer outline attribute
			if(element.hasAttribute("web-developer-element-information-outline"))
			{
				attributeValue = WebDeveloper.Common.trim(WebDeveloper.Common.removeSubstring(attribute.value, "outline-width: 1px; outline-style: solid; outline-color: rgb(255, 0, 0);"));

				// If the attribute value is set
				if(attributeValue)
				{
					elementInformationHTML += "<p>" + attributeName + '="' + attributeValue + '"</p>';
				}
			}
			else
			{
				elementInformationHTML += "<p>" + attributeName + '="' + attribute.value + '"</p>';
			}
    }
    else if(attributeName != "web-developer-element-information-outline")
    {
      elementInformationHTML += "<p>" + attributeName + '="' + attribute.value + '"</p>';
    }    
  }

	// If no attributes were added
	if(!elementInformationHTML)
	{
		elementInformationHTML += '<p class="none">None</p>';
	}

	return '<h2>Attributes</h2><div class="section">' + elementInformationHTML + "</div>";
};

// Populates the fonts for an element
WebDeveloper.ElementInformation.populateElementFonts = function(element, contentDocument)
{
	var elementInformationHTML = '<h2>Fonts</h2><div class="section">';
	var fontFamily             = contentDocument.defaultView.getComputedStyle(element, null).getPropertyCSSValue("font-family");
	var fontSize               = contentDocument.defaultView.getComputedStyle(element, null).getPropertyCSSValue("font-size");
	
	// If the font family and size are set
	if(fontFamily && fontSize)
	{
		elementInformationHTML += "<p>font-family: " + fontFamily.cssText + "</p>";
		elementInformationHTML += "<p>font-size: " + fontSize.cssText + "</p>";
	}
	else
	{
		elementInformationHTML += '<p class="none">None</p>';
	}
	
	elementInformationHTML += "</div>";

	return elementInformationHTML;
};

// Populates the information for an element
WebDeveloper.ElementInformation.populateElementInformation = function(element, contentDocument)
{
	var elementInformationHTML = "";
  var header                 = contentDocument.querySelector("#web-developer-element-information #web-developer-element-information-header h1");
	var wrapper                = contentDocument.querySelector("#web-developer-element-information #web-developer-element-information-body");
	
	// If the header has a class
	if(header.hasAttribute("class"))
	{
		header.removeAttribute("class");
	}
	
	header.innerHTML = WebDeveloper.ElementInformation.getElementDescription(element);
	
	elementInformationHTML += WebDeveloper.ElementInformation.populateElementAttributes(element);
	elementInformationHTML += WebDeveloper.ElementInformation.populateElementPosition(element);
	elementInformationHTML += WebDeveloper.ElementInformation.populateElementFonts(element, contentDocument);
	
	wrapper.innerHTML = elementInformationHTML;
};

// Populates the position for an element
WebDeveloper.ElementInformation.populateElementPosition = function(element)
{
	var elementInformationHTML = '<h2>Position</h2><div class="section">';

	elementInformationHTML += "<p>left: " + WebDeveloper.Common.getElementPositionX(element) + "px</p>";	
	elementInformationHTML += "<p>top: " + WebDeveloper.Common.getElementPositionY(element) + "px</p>";	
	elementInformationHTML += "<p>width: " + element.offsetWidth + "px</p>";	
	elementInformationHTML += "<p>height: " + element.offsetHeight + "px</p>";	
	elementInformationHTML += "</div>";

	return elementInformationHTML;
};

// Removes the element information
WebDeveloper.ElementInformation.removeElementInformation = function(contentDocument)
{
	var elementInformationOutline = contentDocument.querySelector("[web-developer-element-information-outline=true]");
  var header                    = contentDocument.querySelector("#web-developer-element-information #web-developer-element-information-header h1");

  header.removeEventListener("mousedown", WebDeveloper.ElementInformation.selectElementInformation, true);
  header.removeEventListener("mouseup", WebDeveloper.ElementInformation.deselectElementInformation, true);

	WebDeveloper.ElementInformation.removeOutline(WebDeveloper.ElementInformation.element);
	WebDeveloper.Common.removeMatchingElements("#web-developer-element-information", contentDocument);

	WebDeveloper.ElementInformation.removeOutline(elementInformationOutline);
	elementInformationOutline.removeAttribute("web-developer-element-information-outline");

  contentDocument.removeEventListener("click", WebDeveloper.ElementInformation.click, true);
  contentDocument.removeEventListener("mousemove", WebDeveloper.ElementInformation.mouseMove, false);
  contentDocument.removeEventListener("mouseover", WebDeveloper.ElementInformation.mouseOver, false);
};

// Removes the outline from an element
WebDeveloper.ElementInformation.removeOutline = function(element)
{
	// If the element is set
	if(element)
	{
    element.style.outline = "";

    // If the element has an empty style attribute
    if(element.hasAttribute("style") && WebDeveloper.Common.trim(element.getAttribute("style")) == "")
    {
      element.removeAttribute("style");
    }
    
		// Needed for Chrome to keep track of
    element.removeAttribute("web-developer-element-information-outline");
	}
};

// Handles the element information being selected
WebDeveloper.ElementInformation.selectElementInformation = function(event)
{
  // If the click was not a right click
  if(event.button != 2)
  {
    var eventTarget = event.target;

    // If the event target is set
    if(eventTarget)
    {
	    var ownerDocument = eventTarget.ownerDocument;
	
	    // If the owner document is set
	    if(ownerDocument)
	    {
	      var elementInformation = ownerDocument.getElementById("web-developer-element-information");
	
	      // If the element information was found
	      if(elementInformation)
	      {
					var styleSheet = ownerDocument.createElement("style");
	      
					WebDeveloper.ElementInformation.selected = true;

					styleSheet.innerText = WebDeveloper.ElementInformation.selectionCSS;

					styleSheet.setAttribute("id", "web-developer-element-information-selection-styles");

					WebDeveloper.Common.getDocumentBodyElement(ownerDocument).appendChild(styleSheet);
				}
			}
    }
	}
};
