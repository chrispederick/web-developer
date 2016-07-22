var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
  var childElement        = null;
  var content             = document.getElementById("content");
  var contentDocument     = null;
  var documents           = data.documents;
  var element             = null;
  var metaTagDescription  = null;
  var metaTagsDescription = locale.metaTags;
  var metaTagsLength      = null;
  var table               = null;
  var tableContainer      = null;

  WebDeveloper.Generated.emptyContent();
  WebDeveloper.Generated.localizeHeader(locale);
  WebDeveloper.Generated.setPageTitle(metaTagsDescription, data, locale);

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument    = documents[i];
    metaTagDescription = metaTagsDescription.toLowerCase();
    metaTagsLength     = contentDocument.metaTags.length;

    // If there is only one meta tag
    if(metaTagsLength == 1)
    {
      metaTagDescription = locale.metaTag;
    }

    WebDeveloper.Generated.addDocument(contentDocument.url, i, metaTagDescription, metaTagsLength);

    // If there are meta tags
    if(metaTagsLength > 0)
    {
      childElement   = document.createElement("th");
      element        = document.createElement("tr");
      table          = document.createElement("table");
      tableContainer = document.createElement("thead");

      childElement.appendChild(document.createTextNode(locale.name));
      element.appendChild(childElement);

      childElement = document.createElement("th");

      childElement.appendChild(document.createTextNode(locale.content));
      element.appendChild(childElement);
      tableContainer.appendChild(element);
      table.setAttribute("class", "table table-striped");
      table.appendChild(tableContainer);

      tableContainer = document.createElement("tbody");

      $(tableContainer).append(ich.metaTags(contentDocument, true));
      table.appendChild(tableContainer);
      content.appendChild(table);
    }

    WebDeveloper.Generated.addSeparator();
  }

  WebDeveloper.Generated.initializeCommonElements();
};
