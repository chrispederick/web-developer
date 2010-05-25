WebDeveloper.Miscellaneous = WebDeveloper.Miscellaneous || {};

// Displays all hidden elements
WebDeveloper.Miscellaneous.displayHiddenElements = function(contentDocument)
{
	var inputElements = contentDocument.querySelectorAll("input[type=hidden]");
	var node					= null;
	var treeWalker		= contentDocument.createTreeWalker(WebDeveloper.Common.getDocumentBodyElement(contentDocument), NodeFilter.SHOW_ELEMENT, WebDeveloper.Miscellaneous.hiddenNodeFilter, false);

	// Loop through the input elements
	for(var i = 0, l = inputElements.length; i < l; i++)
	{
		inputElements[i].removeAttribute("type");
	}

	// While the tree walker has more nodes
	while((node = treeWalker.nextNode()) !== null)
	{
		node.style.display = "";
	}
};

// Filter for the hidden node tree walker
WebDeveloper.Miscellaneous.hiddenNodeFilter = function(node)
{
	// If the node is set and is not a Web Developer node
	if(node && (!node.hasAttribute("id") || node.getAttribute("id").indexOf("web-developer") !== 0))
	{
		var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node, null);

		// If the computed style is set
		if(computedStyle)
		{
			var display = computedStyle.getPropertyCSSValue("display");
			var tagName = node.tagName;

			// If this element has a display and tag name, the display is set to none and the tag name is not script
			if(display && tagName && display.cssText == "none")
			{
				return NodeFilter.FILTER_ACCEPT;
			}
		}
	}

	return NodeFilter.FILTER_SKIP;
};

// Linearizes a page
WebDeveloper.Miscellaneous.linearizePage = function(contentDocument)
{
	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/miscellaneous/linearize-page.css", "web-developer-linearize-page", contentDocument, false);
};

// Makes all frames resizable
WebDeveloper.Miscellaneous.makeFramesResizable = function(contentDocument)
{
	var frame						= null;
	var frames					= contentDocument.querySelectorAll("frame");
	var message					= null;
	var resizableFrames = 0;

	// Loop through the frames
	for(var i = 0, l = frames.length; i < l; i++)
	{
		frame = frames[i];
	
		// If the frame has a no resize attribute
		if(frame.hasAttribute("noresize"))
		{
			frame.removeAttribute("noresize");

			resizableFrames++;
		}
	}
	
	// If one frame was made resizable
	if(resizableFrames == 1)
	{
		message = "1 frame was made resizable";
	}
	else
	{
		message = resizableFrames + " frames were made resizable";
	}

	WebDeveloper.Miscellaneous.showNotification(message);
};
