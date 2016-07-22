var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
  var colorDescription = null;
  var colorInformation = locale.colorInformation;
  var colorsLength     = null;
  var container        = null;
  var content        = document.getElementById("content");
  var contentDocument  = null;
  var documents        = data.documents;

  WebDeveloper.Generated.emptyContent();
  WebDeveloper.Generated.localizeHeader(locale);
  WebDeveloper.Generated.setPageTitle(colorInformation, data, locale);

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    colorDescription = locale.colors.toLowerCase();
    contentDocument  = documents[i];
    colorsLength     = contentDocument.colors.length;

    // If there is only one anchor
    if(colorsLength == 1)
    {
      colorDescription = locale.color.toLowerCase();
    }

    WebDeveloper.Generated.addDocument(contentDocument.url, i, colorDescription, colorsLength);

    // If there are colors
    if(colorsLength > 0)
    {
      container = WebDeveloper.Generated.generateDocumentContainer();

      $(container).append(ich.colors(contentDocument, true));
      content.appendChild(container);
    }

    WebDeveloper.Generated.addSeparator();
  }

  WebDeveloper.Generated.initializeCommonElements();
};
