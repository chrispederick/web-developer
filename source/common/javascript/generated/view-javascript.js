var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Generated              = WebDeveloper.Generated || {};
WebDeveloper.Generated.storedLocale = null;
WebDeveloper.Generated.theme        = null;

// Beautifies the JavaScript
WebDeveloper.Generated.beautifyJavaScript = function(event)
{
  var beautifyLink       = $(this);
  var newJavaScript      = null;
  var originalJavaScript = null;

  // If the JavaScript was already beautified
  if(beautifyLink.hasClass("web-developer-beautified"))
  {
    // Loop through the original JavaScript
    $(".web-developer-original").each(function(position, element)
    {
      originalJavaScript = $(element);
      newJavaScript      = originalJavaScript.text();

      $(".web-developer-syntax-highlight", originalJavaScript.parent()).text(newJavaScript);

      // If there is a corresponding syntax highlight
      if(WebDeveloper.Generated.syntaxHighlighters.length > position)
      {
        WebDeveloper.Generated.syntaxHighlighters[position].setValue(newJavaScript);
      }
    });

    beautifyLink.text(WebDeveloper.Generated.storedLocale.beautifyJavaScript).removeClass("web-developer-beautified");
  }
  else
  {
    // Loop through the original JavaScript
    $(".web-developer-original").each(function(position, element)
    {
      originalJavaScript = $(element);
      newJavaScript      = js_beautify(originalJavaScript.text(), { indent_size: 2, max_preserve_newlines: 1, space_before_conditional: false }); // eslint-disable-line camelcase

      $(".web-developer-syntax-highlight", originalJavaScript.parent()).text(newJavaScript);

      // If there is a corresponding syntax highlight
      if(WebDeveloper.Generated.syntaxHighlighters.length > position)
      {
        WebDeveloper.Generated.syntaxHighlighters[position].setValue(newJavaScript);
      }
    });

    beautifyLink.text(WebDeveloper.Generated.storedLocale.undoBeautifyJavaScript).addClass("web-developer-beautified");
  }

  event.preventDefault();
};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
  var contentDocument        = null;
  var documents              = data.documents;
  var embeddedContainers     = null;
  var embeddedJavaScriptFrom = locale.embeddedJavaScriptFrom;
  var javaScript             = null;
  var javaScriptCount        = null;
  var javaScriptCounter      = 1;
  var javaScriptDescription  = locale.javaScript;
  var url                    = null;
  var urlContentRequests     = [];

  WebDeveloper.Generated.emptyContent();
  WebDeveloper.Generated.localizeHeader(locale);
  WebDeveloper.Generated.setPageTitle(javaScriptDescription, data, locale);
  $(".dropdown-toggle", $("#files-dropdown")).prepend(javaScriptDescription);

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];
    javaScript      = contentDocument.javaScript;
    javaScriptCount = javaScript.length;
    url             = contentDocument.url;

    WebDeveloper.Generated.addDocument(url, i);

    // If there are embedded JavaScript
    if(contentDocument.embedded)
    {
      embeddedContainers = WebDeveloper.Generated.output(embeddedJavaScriptFrom + " " + url, null, "javascript-" + javaScriptCounter++, "javascript", true);

      // Loop through the embedded containers
      for(var j = 0, m = embeddedContainers.length; j < m; j++)
      {
        embeddedContainers[j].text(contentDocument.embedded);
      }
    }

    // Loop through the JavaScript
    for(var k = 0; k < javaScriptCount; k++)
    {
      url = javaScript[k];

      urlContentRequests.push({ outputContainers: WebDeveloper.Generated.output(null, url, "javascript-" + javaScriptCounter++, "javascript", true), url: url });
    }

    // If there is no JavaScript
    if(!contentDocument.embedded && javaScriptCount === 0)
    {
      WebDeveloper.Generated.addSeparator();
    }
  }

  WebDeveloper.Generated.storedLocale = locale;
  WebDeveloper.Generated.theme        = data.theme;

  $("#web-developer-beautify").text(locale.beautifyJavaScript).on("click", WebDeveloper.Generated.beautifyJavaScript);

  WebDeveloper.Generated.initializeCommonElements();

  // If there are external style sheets to get the CSS from
  if(urlContentRequests.length)
  {
    WebDeveloper.Common.getURLContents(urlContentRequests, "// " + locale.couldNotLoadJavaScript, function()
    {
      var outputContainers  = null;
      var urlContentRequest = null;

      // Loop through the URL content requests
      for(var n = 0, p = urlContentRequests.length; n < p; n++)
      {
        urlContentRequest = urlContentRequests[n];
        outputContainers  = urlContentRequest.outputContainers;

        // Loop through the output containers
        for(var q = 0, r = outputContainers.length; q < r; q++)
        {
          outputContainers[q].text(urlContentRequest.content);
        }
      }

      WebDeveloper.Generated.initializeSyntaxHighlight(WebDeveloper.Generated.theme, locale);
    });
  }
  else
  {
    WebDeveloper.Generated.initializeSyntaxHighlight(WebDeveloper.Generated.theme, locale);
  }
};
