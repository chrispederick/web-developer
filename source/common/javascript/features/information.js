var WebDeveloper = WebDeveloper || {};

WebDeveloper.Information											 = WebDeveloper.Information || {};
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
	var accessKeyElement	= null;
	var accessKeyElements = null;
	var contentDocument	= null;
	var spanElement				= null;
	var text							= null;

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];

		WebDeveloper.Common.removeMatchingElements("span.web-developer-display-access-keys", contentDocument);

		// If displaying the access keys
		if(display)
		{
			accessKeyElements = contentDocument.querySelectorAll("[accesskey]");

			// Loop through the access key elements
			for(var j = 0, m = accessKeyElements.length; j < m; j++)
			{
				accessKeyElement = accessKeyElements[j];
				spanElement			 = contentDocument.createElement("span");
				text						 = 'accesskey="' + accessKeyElement.getAttribute("accesskey") + '"';

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
	var anchorElement		 = null;
	var anchorElements	 = null;
	var contentDocument  = null;
	var documentLocation = null;
	var anchorLocation	 = null;
	var linkElement			 = null;
	var spanElement			 = null;
	var text						 = null;

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];

		WebDeveloper.Common.removeMatchingElements("span.web-developer-display-anchors", contentDocument);

		// If displaying the anchors
		if(display)
		{
			anchorElements	 = contentDocument.querySelectorAll("[id], [name]");
			documentLocation = contentDocument.location;
			anchorLocation	 = documentLocation.pathname + documentLocation.search;

			// Loop through the anchor elements
			for(var j = 0, m = anchorElements.length; j < m; j++)
			{
				anchorElement = anchorElements[j];

				// If the anchor element is not the document root element
				if(anchorElement != contentDocument.documentElement)
				{
					linkElement	= contentDocument.createElement("a");
					spanElement	= contentDocument.createElement("span");
					text				= anchorLocation;

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
WebDeveloper.Information.displayDivDimensions = function(display, documents)
{
	var contentDocument = null;

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
			WebDeveloper.Common.removeMatchingElements("span.web-developer-display-div-dimensions", contentDocument);
		}

		WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-div-dimensions-before", contentDocument, false);
		WebDeveloper.Common.toggleStyleSheet("features/style-sheets/information/display-div-dimensions.css", "web-developer-display-div-dimensions", contentDocument, false);
	}

	// If displaying the div dimensions
	if(display)
	{
		window.addEventListener("resize", WebDeveloper.Information.resizeDivDimensions, false);
	}
	else
	{
		window.removeEventListener("resize", WebDeveloper.Information.resizeDivDimensions, false);
	}
};

// Displays the order of the divs on a page
WebDeveloper.Information.displayDivOrder = function(display, documents)
{
	var contentDocument  = null;
	var div							 = null;
	var divs						 = null;
	var spanElement			 = null;
	var text						 = null;

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];

		WebDeveloper.Common.removeMatchingElements("span.web-developer-display-div-order", contentDocument);

		// If displaying the div order
		if(display)
		{
			divs = contentDocument.getElementsByTagName("div");

			// Loop through the divs
			for(var j = 0, m = divs.length; j < m; j++)
			{
				div					= divs[j];
				spanElement	= contentDocument.createElement("span");
				text				= WebDeveloper.Information.getElementDescription(div) + " " + (j + 1);

				spanElement.setAttribute("class", "web-developer-display-div-order");
				spanElement.appendChild(contentDocument.createTextNode(text));

				WebDeveloper.Common.insertAsFirstChild(div, spanElement);
			}
		}

		WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-div-order-before", contentDocument, false);
		WebDeveloper.Common.toggleStyleSheet("features/style-sheets/information/display-div-order.css", "web-developer-display-div-order", contentDocument, false);
	}
};

// Displays the id and class details for a page
WebDeveloper.Information.displayIdClassDetails = function(display, documents)
{
	var contentDocument = null;
	var idClassElement	= null;
	var idClassElements = null;
	var spanElement			= null;
	var text						= null;

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];

		WebDeveloper.Common.removeMatchingElements("span.web-developer-id-class-details", contentDocument);

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
					 text				 = WebDeveloper.Information.getElementDescription(idClassElement);

					 spanElement.setAttribute("class", "web-developer-id-class-details");
					 spanElement.appendChild(contentDocument.createTextNode(text));
					 idClassElement.parentNode.insertBefore(spanElement, idClassElement);
				}
			}
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
	var divElement			 = null;
	var object					 = null;
	var objectAttributes = null;
	var objects					 = null;
	var param						 = null;
	var paramAttributes	 = null;
	var params					 = null;
	var pElement				 = null;

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];

		WebDeveloper.Common.removeMatchingElements("div.web-developer-display-object-information", contentDocument);

		// If displaying the object information
		if(display)
		{
			objects = contentDocument.getElementsByTagName("object");

			// Loop through the objects
			for(var j = 0, m = objects.length; j < m; j++)
			{
				divElement			 = contentDocument.createElement("div");
				object					 = objects[j];
				objectAttributes = "";
				params					 = object.getElementsByTagName("param");
				pElement				 = contentDocument.createElement("p");

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
					param						= params[j];
					paramAttributes = "";
					pElement				= contentDocument.createElement("p");

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

		WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-object-information-before", contentDocument, false);
		WebDeveloper.Common.toggleStyleSheet("features/style-sheets/information/display-object-information.css", "web-developer-display-object-information", contentDocument, false);
	}
};

// Displays the stack levels on a page
WebDeveloper.Information.displayStackLevels = function(display, documents)
{
	var contentDocument = null;
	var node						= null;
	var spanElement		= null;
	var text						= null;
	var treeWalker			= null;

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];

		WebDeveloper.Common.removeMatchingElements("span.web-developer-display-stack-levels", contentDocument);

		// If displaying the stack levels
		if(display)
		{
			treeWalker = contentDocument.createTreeWalker(WebDeveloper.Common.getDocumentBodyElement(contentDocument), NodeFilter.SHOW_ELEMENT, WebDeveloper.Information.stackLevelFilter, false);

			// While the tree walker has more nodes
			while((node = treeWalker.nextNode()) !== null)
			{
				spanElement = contentDocument.createElement("span");
				text				= WebDeveloper.Information.getElementDescription(node) + ' z-index="' + node.ownerDocument.defaultView.getComputedStyle(node, null).getPropertyCSSValue("z-index").cssText + '"';

				spanElement.setAttribute("class", "web-developer-display-stack-levels");
				spanElement.appendChild(contentDocument.createTextNode(text));

				node.parentNode.insertBefore(spanElement, node);
			}
		}

		WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-stack-levels", contentDocument, false);
	}
};

// Displays the tab indices on a page
WebDeveloper.Information.displayTabIndex = function(display, documents)
{
	var contentDocument  = null;
	var spanElement			 = null;
	var tabIndexElement	 = null;
	var tabIndexElements = null;
	var text						 = null;

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];

		WebDeveloper.Common.removeMatchingElements("span.web-developer-display-tab-index", contentDocument);

		// If displaying the tab indices
		if(display)
		{
			tabIndexElements = contentDocument.querySelectorAll("[tabindex]");

			// Loop through the tab index elements
			for(var j = 0, m = tabIndexElements.length; j < m; j++)
			{
				spanElement			= contentDocument.createElement("span");
				tabIndexElement = tabIndexElements[j];
				text						= 'tabindex="' + tabIndexElement.getAttribute("tabindex") + '"';

				spanElement.setAttribute("class", "web-developer-display-tab-index");
				spanElement.appendChild(contentDocument.createTextNode(text));
				tabIndexElement.parentNode.insertBefore(spanElement, tabIndexElement);
			}
		}

		WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-tab-index", contentDocument, false);
	}
};

// Displays the information for a table cell
WebDeveloper.Information.displayTableCellInformation = function(tableCell, contentDocument)
{
	var divElement = contentDocument.createElement("div");
	var pElement	 = null;

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
WebDeveloper.Information.displayTableDepth = function(display, documents)
{
	var contentDocument = null;
	var spanElement			= null;
	var table						= null;
	var tables					= null;
	var text						= null;

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];

		WebDeveloper.Common.removeMatchingElements("span.web-developer-display-table-depth", contentDocument);

		// If displaying the tab indices
		if(display)
		{
			tables = contentDocument.getElementsByTagName("table");

			// Loop through the table elements
			for(var j = 0, m = tables.length; j < m; j++)
			{
				spanElement	= contentDocument.createElement("span");
				table				= tables[j];
				text				= WebDeveloper.Locales.getString("depth") + " = " + WebDeveloper.Information.getTableDepth(table);

				spanElement.setAttribute("class", "web-developer-display-table-depth");
				spanElement.appendChild(contentDocument.createTextNode(text));
				table.parentNode.insertBefore(spanElement, table);
			}
		}

		WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-table-depth", contentDocument, false);
	}
};

// Displays the information for tables on a page
WebDeveloper.Information.displayTableInformation = function(display, documents)
{
	var contentDocument = null;
	var divElement			= null;
	var table						= null;
	var tableCells			= null;
	var tables					= null;

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];

		WebDeveloper.Common.removeMatchingElements("div.web-developer-display-table-information", contentDocument);

		// If displaying the table information
		if(display)
		{
			tables = contentDocument.getElementsByTagName("table");

			// Loop through the table elements
			for(var j = 0, m = tables.length; j < m; j++)
			{
				table			 = tables[j];
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

		WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-table-information-before", contentDocument, false);
		WebDeveloper.Common.toggleStyleSheet("features/style-sheets/information/display-table-information.css", "web-developer-display-table-information", contentDocument, false);
	}
};

// Displays the title attributes on a page
WebDeveloper.Information.displayTitleAttributes = function(display, documents)
{
	var contentDocument				 = null;
	var spanElement						 = null;
	var text									 = null;
	var titleAttributeElement	 = null;
	var titleAttributeElements = null;

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];

		WebDeveloper.Common.removeMatchingElements("span.web-developer-display-title-attributes", contentDocument);

		// If displaying the title attributes
		if(display)
		{
			titleAttributeElements = contentDocument.querySelectorAll("[title]");

			// Loop through the title attribute elements
			for(var j = 0, m = titleAttributeElements.length; j < m; j++)
			{
				spanElement						= contentDocument.createElement("span");
				titleAttributeElement = titleAttributeElements[i];
				text									= 'title="' + titleAttributeElement.getAttribute("title") + '"';

				spanElement.setAttribute("class", "web-developer-display-title-attributes");
				spanElement.appendChild(contentDocument.createTextNode(text));
				titleAttributeElement.parentNode.insertBefore(spanElement, titleAttributeElement);
			}
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
			description += "." + WebDeveloper.Common.trim(classes[i]);
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
		var element				= table;
		var parentElement = null;
		var tagName				= null;

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
	var div					= null;
	var divs				= contentDocument.getElementsByTagName("div");
	var spanElement	= null;
	var text				= null;

	WebDeveloper.Information.divDimensionsUpdating = true;

	WebDeveloper.Common.removeMatchingElements("span.web-developer-display-div-dimensions", contentDocument);

	// Loop through the divs
	for(var i = 0, l = divs.length; i < l; i++)
	{
		div					= divs[i];
		spanElement	= contentDocument.createElement("span");
		text				= WebDeveloper.Information.getElementDescription(div) + " " + WebDeveloper.Common.formatDimensions(div.offsetWidth, div.offsetHeight);

		spanElement.style.left		 = div.offsetLeft + "px";
		spanElement.style.position = "absolute";
		spanElement.style.top			 = div.offsetTop + "px";

		spanElement.setAttribute("class", "web-developer-display-div-dimensions");
		spanElement.appendChild(contentDocument.createTextNode(text));

		WebDeveloper.Common.insertAsFirstChild(div, spanElement);
	}

	WebDeveloper.Information.divDimensionsUpdating = false;
};
