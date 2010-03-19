WebDeveloper.Outline = WebDeveloper.Outline || {};

// Outlines all block level elements
WebDeveloper.Outline.outlineBlockLevelElements = function(contentDocument)
{
  WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-outline-block-level-elements-before", contentDocument, false);
  WebDeveloper.Common.toggleStyleSheet("features/style-sheets/outline/outline-block-level-elements.css", "web-developer-outline-block-level-elements", contentDocument, false);
};

// Outlines all deprecated elements
WebDeveloper.Outline.outlineDeprecatedElements = function(contentDocument)
{
  WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-outline-deprecated-elements-before", contentDocument, false);
  WebDeveloper.Common.toggleStyleSheet("features/style-sheets/outline/outline-deprecated-elements.css", "web-developer-outline-deprecated-elements", contentDocument, false);
};

// Outlines all external links
WebDeveloper.Outline.outlineExternalLinks = function(outline, contentDocument)
{
  // If outlining external links
  if(outline)
  {
    var location     = contentDocument.location;
    var protocol     = location.protocol.replace(/:/gi, "\\:");
    var styleElement = contentDocument.createElement("style");

    styleElement.setAttribute("id", "web-developer-outline-external-links");
    styleElement.appendChild(contentDocument.createTextNode("a:not([href^=" + protocol + "\\/\\/" + location.hostname.replace(/\\/gi, "\\.") + "]) { outline: 1px solid #f00 !important; }"));
    styleElement.appendChild(contentDocument.createTextNode("a:not([href^=" + protocol + "]) { outline-style: none !important; }"));

    WebDeveloper.Common.getDocumentHeadElement(contentDocument).appendChild(styleElement);
  }
  else
  {
		WebDeveloper.Common.removeStyleSheet("web-developer-outline-external-links", contentDocument);
  }
};

// Outlines all floated elements
WebDeveloper.Outline.outlineFloatedElements = function(outline, contentDocument)
{
  // If outlining floated elements
  if(outline)
  {
		var float			 = null;
		var node			 = null;
		var treeWalker = contentDocument.createTreeWalker(WebDeveloper.Common.getDocumentBodyElement(contentDocument), NodeFilter.SHOW_ELEMENT, null, false);

		// While the tree walker has more nodes
		while((node = treeWalker.nextNode()) !== null)
		{
			float = node.ownerDocument.defaultView.getComputedStyle(node, null).getPropertyCSSValue("float").cssText;
	
			// If this element has a background image and it is a URL
			if(float && float != "none")
			{
				WebDeveloper.Common.addClass(node, "web-developer-outline-floated-elements");
			}
		}
  }
  else
  {
		var floatedElements = contentDocument.querySelectorAll(".web-developer-outline-floated-elements");
	
		// Loop through the floated elements
		for(var i = 0, l = floatedElements.length; i < l; i++)
		{
			WebDeveloper.Common.removeClass(floatedElements[i], "web-developer-outline-floated-elements");
		}
  }

	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/outline/outline-floated-elements.css", "web-developer-outline-floated-elements", contentDocument, false);
};

// Outlines all frames
WebDeveloper.Outline.outlineFrames = function(contentDocument)
{
  WebDeveloper.Common.toggleStyleSheet("features/style-sheets/outline/outline-frames.css", "web-developer-outline-frames", contentDocument, false);
};

// Outlines all headingss
WebDeveloper.Outline.outlineHeadings = function(contentDocument)
{
  WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-outline-headings-before", contentDocument, false);
  WebDeveloper.Common.toggleStyleSheet("features/style-sheets/outline/outline-headings.css", "web-developer-outline-headings", contentDocument, false);
};

// Outlines all non-secure elements
WebDeveloper.Outline.outlineNonSecureElements = function(contentDocument)
{
  WebDeveloper.Common.toggleStyleSheet("features/style-sheets/outline/outline-non-secure-elements.css", "web-developer-outline-non-secure-elements", contentDocument, false);
};

// Outlines all positioned elements
WebDeveloper.Outline.outlinePositionedElements = function(positionType, outline, contentDocument)
{
	var className = "web-developer-outline-" + positionType + "-positioned-elements";
	
  // If outlining positioned elements
  if(outline)
  {
		var node			 = null;
		var position	 = null;
		var treeWalker = contentDocument.createTreeWalker(WebDeveloper.Common.getDocumentBodyElement(contentDocument), NodeFilter.SHOW_ELEMENT, null, false);
	
		// While the tree walker has more nodes
		while((node = treeWalker.nextNode()) !== null)
		{
			position = node.ownerDocument.defaultView.getComputedStyle(node, null).getPropertyCSSValue("position").cssText;
	
			// If this element has a background image and it is a URL
			if(position && position == positionType)
			{
				WebDeveloper.Common.addClass(node, className);
			}
		}
  }
  else
  {
		var positionedElements = contentDocument.querySelectorAll("." + className);
	
		// Loop through the positioned elements
		for(var i = 0, l = positionedElements.length; i < l; i++)
		{
			WebDeveloper.Common.removeClass(positionedElements[i], className);
		}
  }

	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/outline/outline-positioned-elements.css", className, contentDocument, false);
};

// Outlines all table captions
WebDeveloper.Outline.outlineTableCaptions = function(contentDocument)
{
  WebDeveloper.Common.toggleStyleSheet("features/style-sheets/outline/outline-table-captions.css", "web-developer-outline-table-captions", contentDocument, false);
};

// Outlines all table cells
WebDeveloper.Outline.outlineTableCells = function(contentDocument)
{
  WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-outline-table-cells-before", contentDocument, false);
  WebDeveloper.Common.toggleStyleSheet("features/style-sheets/outline/outline-table-cells.css", "web-developer-outline-table-cells", contentDocument, false);
};

// Outlines all tables
WebDeveloper.Outline.outlineTables = function(contentDocument)
{
  WebDeveloper.Common.toggleStyleSheet("features/style-sheets/outline/outline-tables.css", "web-developer-outline-tables", contentDocument, false);
};
