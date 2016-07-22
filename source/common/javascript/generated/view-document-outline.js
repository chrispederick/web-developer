var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
  var childElement         = null;
  var container            = null;
  var content              = document.getElementById("content");
  var contentDocument      = null;
  var documentOutline      = locale.documentOutline;
  var documents            = data.documents;
  var heading              = null;
  var headingDescription   = null;
  var headingLevel         = null;
  var headings             = null;
  var headingsLength       = null;
  var headingText          = null;
  var previousHeadingLevel = null;

  WebDeveloper.Generated.emptyContent();
  WebDeveloper.Generated.localizeHeader(locale);
  WebDeveloper.Generated.setPageTitle(documentOutline, data, locale);

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument    = documents[i];
    headingDescription = locale.headings.toLowerCase();
    headings           = contentDocument.headings;
    headingsLength     = headings.length;

    // If there is only one heading
    if(headingsLength == 1)
    {
      headingDescription = locale.heading.toLowerCase();
    }

    WebDeveloper.Generated.addDocument(contentDocument.url, i, headingDescription, headingsLength);

    // If there are headings
    if(headingsLength > 0)
    {
      container            = WebDeveloper.Generated.generateDocumentContainer();
      previousHeadingLevel = 0;

      // Loop through the headings
      for(var j = 0; j < headingsLength; j++)
      {
        heading      = headings[j];
        headingLevel = heading.level;
        headingText  = heading.text;

        // Loop through any missing headers
        for(var k = previousHeadingLevel + 1; k < headingLevel; k++)
        {
          childElement = document.createElement("span");
          heading      = document.createElement("h" + k);

          childElement.appendChild(document.createTextNode("<h" + k + ">"));
          childElement.setAttribute("class", "label label-warning");
          heading.appendChild(childElement);
          heading.appendChild(document.createTextNode(locale.missingHeading));
          heading.setAttribute("class", "text-muted");
          container.appendChild(heading);
        }

        // If there is no heading text
        if(!headingText)
        {
          headingText = locale.noHeadingText;
        }

        childElement = document.createElement("span");
        heading      = document.createElement("h" + headingLevel);

        childElement.appendChild(document.createTextNode("<h" + headingLevel + ">"));
        childElement.setAttribute("class", "label label-success");
        heading.appendChild(childElement);
        heading.appendChild(document.createTextNode(headingText));
        container.appendChild(heading);

        previousHeadingLevel = headingLevel;
      }

      content.appendChild(container);
    }

    WebDeveloper.Generated.addSeparator();
  }

  WebDeveloper.Generated.initializeCommonElements();
};
