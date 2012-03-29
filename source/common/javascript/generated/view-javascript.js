var WebDeveloper = WebDeveloper || {};

WebDeveloper.Generated							= WebDeveloper.Generated || {};
WebDeveloper.Generated.storedLocale = null;
WebDeveloper.Generated.theme				= null;

// Beautifies the JavaScript
WebDeveloper.Generated.beautifyJavaScript = function(event)
{
	var beautifyLink = $(this);
	var pre					 = null;

	WebDeveloper.Generated.expandAllOutput();
	$(".CodeMirror").remove();

	// If the JavaScript was already beautified
	if(beautifyLink.hasClass("web-developer-beautified"))
	{
		// Loop through the original JavaScript
		$(".web-developer-original").each(function()
		{
			pre = $(this);

			$('<pre class="web-developer-syntax-highlight" data-line-numbers="true" data-type="javascript"></pre>').insertBefore(pre).text(pre.text());
		});

		beautifyLink.text(WebDeveloper.Generated.storedLocale.beautifyJavaScript).removeClass("web-developer-beautified");
	}
	else
	{
		// Loop through the original JavaScript
		$(".web-developer-original").each(function()
		{
			pre = $(this);

			$('<pre class="web-developer-syntax-highlight" data-line-numbers="true" data-type="javascript"></pre>').insertBefore(pre).text(js_beautify(pre.text()));
		});

		beautifyLink.text(WebDeveloper.Generated.storedLocale.undoBeautifyJavaScript).addClass("web-developer-beautified");
	}

	WebDeveloper.Generated.initializeSyntaxHighlight(WebDeveloper.Generated.theme);

	event.preventDefault();
};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
	var contentDocument				 = null;
	var documents							 = data.documents;
	var embedded							 = null;
	var embeddedJavaScriptFrom = locale.embeddedJavaScriptFrom;
	var errorMessage					 = "// " + locale.couldNotLoadJavaScript;
	var javaScript						 = null;
	var javaScriptCount				 = null;
	var javaScriptCounter			 = 1;
	var javaScriptDescription  = locale.javaScript;
	var url										 = null;

	WebDeveloper.Generated.emptyContent();
	WebDeveloper.Generated.localizeHeader(locale);
	WebDeveloper.Generated.setPageTitle(javaScriptDescription, data, locale);
	$(".dropdown-toggle", $("#files-dropdown")).prepend(javaScriptDescription);

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];
		javaScript			= contentDocument.javaScript;
		javaScriptCount = javaScript.length;
		url							= contentDocument.url;

		WebDeveloper.Generated.addDocument(url, i);

		// If there are embedded JavaScript
		if(contentDocument.embedded)
		{
			WebDeveloper.Generated.output(contentDocument.embedded, embeddedJavaScriptFrom + " " + url, null, "javascript-" + (javaScriptCounter++), "javascript", true);
		}

		// Loop through the JavaScript
		for(var j = 0; j < javaScriptCount; j++)
		{
			url	= javaScript[j];

			WebDeveloper.Generated.output(WebDeveloper.Common.getContentFromURL(url, errorMessage), null, url, "javascript-" + (javaScriptCounter++), "javascript", true);
		}

		// If there is no JavaScript
		if(!contentDocument.embedded && javaScriptCount === 0)
		{
			WebDeveloper.Generated.addSeparator();
		}
	}

	WebDeveloper.Generated.storedLocale = locale;
	WebDeveloper.Generated.theme				= data.theme;

	$("#web-developer-beautify").text(locale.beautifyJavaScript).on("click", WebDeveloper.Generated.beautifyJavaScript);

	WebDeveloper.Generated.initializeCommonElements();
	WebDeveloper.Generated.initializeSyntaxHighlight(WebDeveloper.Generated.theme);
};
