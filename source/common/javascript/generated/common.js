var WebDeveloper = WebDeveloper || {};

WebDeveloper.Generated									= WebDeveloper.Generated || {};
WebDeveloper.Generated.animationSpeed		= 200;
WebDeveloper.Generated.maximumURLLength = 100;

// Adds a document
WebDeveloper.Generated.addDocument = function(documentURL, documentCount, itemDescription, itemCount)
{
	$("#content").append('<h2 id="document-' + (documentCount + 1) + '"><a href="' + documentURL + '">' + documentURL + "</a></h2>");
	$(".dropdown-menu", $("#documents-dropdown")).append('<li><a href="#document-' + (documentCount + 1) + '">' + WebDeveloper.Generated.formatURL(documentURL) + "</a></li>");

	// If the item description are set
	if(itemDescription)
	{
		var description = "<h3>";

		// If there are items
		if(itemCount !== 0)
		{
			description += '<i class="icon-caret-down"></i>';
		}

		description += itemCount + " " + itemDescription + "</h3>";

		$("#content").append(description);
	}
};

// Adds a separator
WebDeveloper.Generated.addSeparator = function()
{
	$("#content").append('<div class="web-developer-separator"></div>');
};

// Collapses all the output
WebDeveloper.Generated.collapseAllOutput = function(event)
{
	// Loop through the output headers
	$("h3").each(function()
	{
		var header = $(this);

		$("i", header).removeClass("icon-caret-down").addClass("icon-caret-right");
		header.next().slideUp(WebDeveloper.Generated.animationSpeed);
	});

	event.preventDefault();
};

// Empties the content
WebDeveloper.Generated.emptyContent = function()
{
	$(".progress", $("#content")).remove();
};

// Expands all the output
WebDeveloper.Generated.expandAllOutput = function(event)
{
	// Loop through the output headers
	$("h3").each(function()
	{
		var header = $(this);

		$("i", header).removeClass("icon-caret-right").addClass("icon-caret-down");
		header.next().slideDown(WebDeveloper.Generated.animationSpeed);
	});

	// If the event is set
	if(event)
	{
		event.preventDefault();
	}
};

// Formats a URL
WebDeveloper.Generated.formatURL = function(url)
{
	// If the URL is set
	if(url && url.length > WebDeveloper.Generated.maximumURLLength)
	{
		var halfLength = WebDeveloper.Generated.maximumURLLength / 2;

		return url.substring(0, halfLength) + "..." + url.substr(-halfLength);
	}

	return url;
};

// Generates a document container
WebDeveloper.Generated.generateDocumentContainer = function()
{
	return $('<div class="web-developer-document"></div>');
};

// Initializes the common page elements
WebDeveloper.Generated.initializeCommonElements = function()
{
	$("i", $("h3")).on("click", WebDeveloper.Generated.toggleOutput);
	$("#web-developer-collapse-all").on("click", WebDeveloper.Generated.collapseAllOutput);
	$("#web-developer-expand-all").on("click", WebDeveloper.Generated.expandAllOutput);

	// If there is a nav bar
	if($(".navbar").length)
	{
		$(".dropdown-toggle").dropdown();
	}
};

// Initializes the syntax highlight functionality
WebDeveloper.Generated.initializeSyntaxHighlight = function(color)
{
	// If there is a color
	if(color != "none")
	{
		// Loop through the syntax highlight elements
		$('.web-developer-syntax-highlight').each(function()
		{
			var pre = $(this);

			window.setTimeout(function()
			{
				CodeMirror(function(element)
				{
					pre.after(element);
					pre.remove();
				},
				{
					lineNumbers: pre.data("line-numbers"),
					mode: pre.data("type"),
					readOnly: "nocursor",
					tabSize: 2,
					theme: color,
					value: pre.html()
				});
			}, 0);
		});
	}
};

// Initializes the page with JSON data
WebDeveloper.Generated.initializeWithJSON = function(event)
{
	var eventTarget = event.target;

	WebDeveloper.Generated.initialize(JSON.parse(eventTarget.getAttribute("data-web-developer")), JSON.parse(eventTarget.getAttribute("data-web-developer-locale")));

	eventTarget.removeAttribute("data-web-developer");
	eventTarget.removeAttribute("data-web-developer-locale");

	window.removeEventListener("web-developer-generated-event", WebDeveloper.Generated.initializeWithJSON, false);
};

// Localizes the header
WebDeveloper.Generated.localizeHeader = function(locale)
{
	$("#web-developer-collapse-all").text(locale.collapseAll);
	$("#web-developer-expand-all").text(locale.expandAll);
	$(".dropdown-toggle", $("#documents-dropdown")).prepend(locale.documents);
	$("span.brand").text(locale.webDeveloper);
};

// Outputs content
WebDeveloper.Generated.output = function(content, title, url, anchor, type, outputOriginal)
{
	var contentElement = $("#content");
	var pre						 = $('<pre class="web-developer-syntax-highlight" data-line-numbers="true" data-type="' + type + '"></pre>');

	// If the URL is set
	if(url)
	{
		var formattedURL = WebDeveloper.Generated.formatURL(url);

		contentElement.append('<h3 id="' + anchor + '"><i class="icon-caret-down"></i><a href="' + url + '">' + formattedURL + "</a></h3>");
		$(".dropdown-menu", $("#files-dropdown")).append('<li><a href="#' + anchor + '">' + formattedURL + "</a></li>");
	}
	else
	{
		contentElement.append('<h3 id="' + anchor + '"><i class="icon-caret-down"></i>' + title + "</h3>");
		$(".dropdown-menu", $("#files-dropdown")).append('<li><a href="#' + anchor + '">' + title + "</a></li>");
	}

	pre.text(content);
	contentElement.append(pre);

	// If the original should be output
	if(outputOriginal)
	{
		pre = $('<pre class="web-developer-original"></pre>');

		pre.text(content);
		contentElement.append(pre);
	}

	WebDeveloper.Generated.addSeparator();
};

// Sets the page title
WebDeveloper.Generated.setPageTitle = function(type, data, locale)
{
	document.title = type + " " + locale.from.toLowerCase() + " " + WebDeveloper.Generated.formatURL(data.pageURL);

	$("a.brand", $(".navbar")).html(type);
};

// Toggles the collapsed state of an output
WebDeveloper.Generated.toggleOutput = function()
{
	$(this).toggleClass("icon-caret-down").toggleClass("icon-caret-right").parent().next().slideToggle(WebDeveloper.Generated.animationSpeed);
};

window.addEventListener("web-developer-generated-event", WebDeveloper.Generated.initializeWithJSON, false);
