var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Generated              = WebDeveloper.Generated || {};
WebDeveloper.Generated.storedLocale = null;
WebDeveloper.Generated.theme        = null;

// Beautifies the JavaScript
WebDeveloper.Generated.beautifyJavaScript = function(event)
{
  var beautifyLink  = this;
  var newJavaScript = null;

  // If the JavaScript was already beautified
  if(beautifyLink.classList.contains("web-developer-beautified"))
  {
    // Loop through the original JavaScript
    document.querySelectorAll(".web-developer-original").forEach(function(originalJavaScript, index)
    {
      newJavaScript = originalJavaScript.textContent;

      originalJavaScript.parentElement.querySelector(".web-developer-syntax-highlight").textContent = newJavaScript;

      // If there is a corresponding syntax highlight
      if(WebDeveloper.Generated.syntaxHighlighters.length > index)
      {
        WebDeveloper.Generated.syntaxHighlighters[index].setValue(newJavaScript);
      }
    });

    beautifyLink.classList.remove("web-developer-beautified");
  }
  else
  {
    // Loop through the original JavaScript
    document.querySelectorAll(".web-developer-original").forEach(function(originalJavaScript, index)
    {
      newJavaScript = js_beautify(originalJavaScript.textContent, { indent_size: 2, max_preserve_newlines: 1, space_before_conditional: false }); // eslint-disable-line camelcase

      originalJavaScript.parentElement.querySelector(".web-developer-syntax-highlight").textContent = newJavaScript;

      // If there is a corresponding syntax highlight
      if(WebDeveloper.Generated.syntaxHighlighters.length > index)
      {
        WebDeveloper.Generated.syntaxHighlighters[index].setValue(newJavaScript);
      }
    });

    beautifyLink.classList.add("web-developer-beautified");
  }

  event.preventDefault();
};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
  var beautify               = document.getElementById("web-developer-beautify");
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
  document.getElementById("files-dropdown").querySelector(".dropdown-toggle").append(javaScriptDescription);
  beautify.querySelector(".beautify").append(locale.beautifyJavaScript);
  beautify.querySelector(".undo-beautify").append(locale.undoBeautifyJavaScript);

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
        embeddedContainers[j].textContent = contentDocument.embedded;
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

  WebDeveloper.Generated.theme = data.theme;

  beautify.addEventListener("click", WebDeveloper.Generated.beautifyJavaScript);

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
