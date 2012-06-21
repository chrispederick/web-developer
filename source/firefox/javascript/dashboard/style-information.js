var WebDeveloper = WebDeveloper || {};

WebDeveloper.StyleInformation								 = WebDeveloper.StyleInformation || {};
WebDeveloper.StyleInformation.currentElement = null;

// Handles the click event
WebDeveloper.StyleInformation.click = function(event)
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
				WebDeveloper.StyleInformation.displayStyleInformation(eventTarget);
			}

			event.stopPropagation();
			event.preventDefault();
		}
	}
};

// Handles the click event inside the output
WebDeveloper.StyleInformation.clickOutput = function(event)
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
				WebDeveloper.StyleInformation.copyAncestorPath();
			}
			else
			{
				var tagName = eventTarget.tagName;

				// If the event target is a link
				if(tagName && tagName.toLowerCase() == "a")
				{
					var href = eventTarget.getAttribute("href");

					// If the href is set and is a hash
					if(href && href == "#")
					{
						WebDeveloper.StyleInformation.selectParentElement(eventTarget);
					}
					else
					{
						WebDeveloper.Common.openURL(href);
					}

					event.preventDefault();
				}
			}
		}
	}
};

// Copies the ancestor path
WebDeveloper.StyleInformation.copyAncestorPath = function()
{
	Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(document.getElementById("web-developer-style-information-browser").contentDocument.defaultView.WebDeveloper.Dashboard.getAncestorPath());

	WebDeveloper.Common.displayNotification("ancestorPathCopied");
};

// Displays the style information for an element
WebDeveloper.StyleInformation.displayStyleInformation = function(element)
{
	var generatedDocument = document.getElementById("web-developer-style-information-browser").contentDocument;
	var generatedContent	= generatedDocument.getElementById("content");
	var styleInformation	= WebDeveloper.ElementAncestors.generateAncestorInformation(element);
	var styleSheet				= null;
	var styleSheets				= WebDeveloper.StyleInformation.getStyleInformation(element);

	WebDeveloper.StyleInformation.currentElement = element;

	WebDeveloper.Common.empty(generatedContent);

	// Loop through the style sheets
	for(styleSheet in styleSheets)
	{
		styleInformation += '<h3><span></span><a href="' + styleSheet + '">' + styleSheet + "</a></h3>";
		styleInformation += '<pre class="web-developer-syntax-highlight" data-line-numbers="false" data-type="css">' + WebDeveloper.Common.trim(styleSheets[styleSheet]) + "</pre>";
	}

	// If no style information was found
	if(!styleInformation)
	{
		styleInformation += '<p class="web-developer-information">' + WebDeveloper.Locales.getString("noStyleInformation") + "</p>";
	}

	generatedDocument.defaultView.WebDeveloper.Dashboard.setPosition(WebDeveloper.Preferences.getExtensionStringPreference("dashboard.position"));
	generatedDocument.defaultView.WebDeveloper.Dashboard.initialize(styleInformation, WebDeveloper.Preferences.getExtensionStringPreference("syntax.highlight.theme"));
};

// Formats a style
WebDeveloper.StyleInformation.formatStyle = function(property, value)
{
	return "	" + WebDeveloper.CSS.formatStyleProperty(property) + ": " + WebDeveloper.CSS.formatStyleValue(value) + ";\n";
};

// Gets the style information for an element
WebDeveloper.StyleInformation.getStyleInformation = function(element)
{
	var domUtils			 = Components.classes["@mozilla.org/inspector/dom-utils;1"].getService(Components.interfaces.inIDOMUtils);
	var line					 = null;
	var rule					 = null;
	var rules					 = domUtils.getCSSStyleRules(element);
	var ruleStyle			 = null;
	var ruleStyles		 = null;
	var styleSheet		 = null;
	var styleSheetHref = null;
	var styleSheets		 = [];
	var styleText			 = null;

	// Loop through the element rules
	for(var i = 0, l = rules.Count(); i < l; i++)
	{
		rule = rules.GetElementAt(i).QueryInterface(Components.interfaces.nsIDOMCSSStyleRule);
		line = domUtils.getRuleLine(rule);

		// If there is a parent style sheet
		if(rule.parentStyleSheet)
		{
			styleSheet = rule.parentStyleSheet;
		}

		// If this is a valid style sheet
		if(WebDeveloper.CSS.isValidStyleSheet(styleSheet))
		{
			ruleStyles		 = rule.style;
			styleSheetHref = styleSheet.href;
			styleText			 = "/* " + WebDeveloper.Locales.getString("line") + " " + line + " */\n" + rule.selectorText + "\n{\n";

			// Loop through the style rules
			for(var j = 0, m = ruleStyles.length; j < m; j++)
			{
				ruleStyle = ruleStyles[j];

				// If this is a valid rule style
				if(WebDeveloper.CSS.isValidRuleStyle(ruleStyles, ruleStyle))
				{
					styleText += WebDeveloper.StyleInformation.formatStyle(ruleStyle, ruleStyles.getPropertyValue(ruleStyle));
				}
			}

			styleText += "}\n\n";

			// If this style sheet has rules already stored
			if(styleSheets[styleSheetHref])
			{
				styleSheets[styleSheetHref] += styleText;
			}
			else
			{
				styleSheets[styleSheetHref] = styleText;
			}
		}
	}

	// If the element has inline styles
	if(element.hasAttribute("style"))
	{
		var inlineStyle	 = null;
		var inlineStyles = element.getAttribute("style").split(";");
		var property		 = null;

		styleText = "";

		// If there are inline styles
		if(inlineStyles.length)
		{
			// Loop through the inline styles
			for(i = 0, l = inlineStyles.length; i < l; i++)
			{
				inlineStyle = inlineStyles[i];

				// If the inline style is set
				if(inlineStyle)
				{
					ruleStyle = inlineStyle.split(":");
					property	= WebDeveloper.Common.trim(ruleStyle[0]);

					// If the property is not an outline
					if(property != "outline")
					{
						styleText += WebDeveloper.StyleInformation.formatStyle(property, WebDeveloper.Common.trim(ruleStyle[1]));
					}
				}
			}

			// If the style text is set
			if(styleText)
			{
				styleSheets["/* " + WebDeveloper.Locales.getString("inlineStyles") + " */"] = "\n{\n" + styleText + "\n}\n";
			}
		}
	}

	return styleSheets;
};

// Initializes the style information dashboard
WebDeveloper.StyleInformation.initialize = function()
{
	var contentDocument = null;
	var documents				= WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];

		contentDocument.addEventListener("click", WebDeveloper.StyleInformation.click, true);
		contentDocument.addEventListener("mouseover", WebDeveloper.ElementAncestors.mouseOver, false);

		WebDeveloper.Common.toggleStyleSheet("toolbar/style-sheets/element-ancestors.css", "web-developer-style-information-styles", contentDocument, false);
	}

	WebDeveloper.ElementAncestors.createToolbar();

	contentDocument																												= document.getElementById("web-developer-style-information-browser").contentDocument;
	contentDocument.querySelector(".web-developer-information").innerHTML = WebDeveloper.Locales.getString("selectAnElementDisplayStyles");

	contentDocument.addEventListener("click", WebDeveloper.StyleInformation.clickOutput, false);
};

// Handles a parent element being selected
WebDeveloper.StyleInformation.selectParentElement = function(eventTarget)
{
	var ancestorCount = 0;
	var element				= eventTarget.parentNode;
	var parentElement = WebDeveloper.StyleInformation.currentElement;

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

	WebDeveloper.StyleInformation.displayStyleInformation(parentElement);
};

// Uninitializes the style information dashboard
WebDeveloper.StyleInformation.uninitialize = function()
{
	var contentDocument = document.getElementById("web-developer-style-information-browser").contentDocument;
	var documents				= WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());

	contentDocument.removeEventListener("click", WebDeveloper.StyleInformation.clickOutput, false);

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];

		contentDocument.removeEventListener("click", WebDeveloper.StyleInformation.click, true);
		contentDocument.removeEventListener("mouseover", WebDeveloper.ElementAncestors.mouseOver, false);

		WebDeveloper.ElementAncestors.removeOutline(contentDocument);
		WebDeveloper.Common.toggleStyleSheet("toolbar/style-sheets/element-ancestors.css", "web-developer-style-information-styles", contentDocument, false);
	}

	// If the element information is not also running
	if(!WebDeveloper.Common.getMainWindow().WebDeveloper.Dashboard.isOpenInDashboard(WebDeveloper.Locales.getString("elementInformation")))
	{
		WebDeveloper.ElementAncestors.removeToolbar();
	}
};
