var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Generated = WebDeveloper.Generated || {};

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
  var javaScriptCounter      = 0;
  var javaScriptDescription  = locale.javaScript;
  var javaScriptLength       = 0;
  var url                    = null;
  var urlContentRequests     = [];

  WebDeveloper.Generated.storeLocale(locale);
  WebDeveloper.Generated.emptyContent();
  WebDeveloper.Generated.initializeHeader(javaScriptDescription, data, locale);
  WebDeveloper.Generated.initializeSidebar(locale);
  beautify.querySelector(".beautify").append(locale.beautifyJavaScript);
  beautify.querySelector(".undo-beautify").append(locale.undoBeautifyJavaScript);

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument  = documents[i];
    javaScript       = contentDocument.javaScript;
    javaScriptCount  = javaScript.length;
    javaScriptLength = javaScriptCount;
    url              = contentDocument.url;

    // If there are embedded styles
    if(contentDocument.embedded)
    {
      javaScriptLength++;
    }

    WebDeveloper.Generated.addDocument(url, i, javaScriptDescription, javaScriptLength, false);

    // If there are embedded JavaScript
    if(contentDocument.embedded)
    {
      embeddedContainers = WebDeveloper.Generated.output(embeddedJavaScriptFrom + " " + url, null, "javascript", true, javaScriptCounter++, i);

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

      urlContentRequests.push({ outputContainers: WebDeveloper.Generated.output(null, url, "javascript", true, javaScriptCounter++, i), url: url });
    }

    // If there is no JavaScript
    if(!contentDocument.embedded && javaScriptCount === 0)
    {
      WebDeveloper.Generated.addSeparator();
    }
  }

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
          outputContainers[q].textContent = urlContentRequest.content;
        }
      }

      WebDeveloper.Generated.initializeSyntaxHighlight(data.theme);
    });
  }
  else
  {
    WebDeveloper.Generated.initializeSyntaxHighlight(data.theme);
  }
};
