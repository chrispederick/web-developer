var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
  var contentDocument        = null;
  var css                    = locale.css;
  var documents              = data.documents;
  var embeddedContainers     = null;
  var embeddedCSSFrom        = locale.embeddedCSSFrom;
  var styleSheets            = null;
  var styleSheetsCount       = null;
  var styleSheetsCounter     = 0;
  var styleSheetsDescription = null;
  var styleSheetsLength      = 0;
  var url                    = null;
  var urlContentRequests     = [];

  WebDeveloper.Generated.storeLocale(locale);
  WebDeveloper.Generated.emptyContent();
  WebDeveloper.Generated.initializeHeader(css, data, locale);
  WebDeveloper.Generated.initializeSidebar(locale);

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument        = documents[i];
    styleSheets            = contentDocument.styleSheets;
    styleSheetsCount       = styleSheets.length;
    styleSheetsDescription = locale.styleSheets.toLowerCase();
    styleSheetsLength      = styleSheetsCount;
    url                    = contentDocument.url;

    // If there are embedded styles
    if(contentDocument.embedded)
    {
      styleSheetsLength++;
    }

    // If there is only one style sheet
    if(styleSheetsLength == 1)
    {
      styleSheetsDescription = locale.styleSheet.toLowerCase();
    }

    WebDeveloper.Generated.addDocument(url, i, styleSheetsDescription, styleSheetsLength, false);

    // If there are embedded styles
    if(contentDocument.embedded)
    {
      embeddedContainers = WebDeveloper.Generated.output(embeddedCSSFrom + " " + url, null, "css", false, styleSheetsCounter++, i);

      // Loop through the embedded containers
      for(var j = 0, m = embeddedContainers.length; j < m; j++)
      {
        embeddedContainers[j].textContent = contentDocument.embedded;
      }
    }

    // Loop through the style sheets
    for(var k = 0; k < styleSheetsCount; k++)
    {
      url = styleSheets[k];

      urlContentRequests.push({ outputContainers: WebDeveloper.Generated.output(null, url, "css", false, styleSheetsCounter++, i), url: url });
    }

    // If there are no style sheets
    if(!contentDocument.embedded && styleSheetsCount === 0)
    {
      WebDeveloper.Generated.addSeparator();
    }
  }

  WebDeveloper.Generated.initializeCommonElements();

  // If there are external style sheets to get the CSS from
  if(urlContentRequests.length)
  {
    WebDeveloper.Common.getURLContents(urlContentRequests, "/* " + locale.couldNotLoadCSS + " */", function()
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
