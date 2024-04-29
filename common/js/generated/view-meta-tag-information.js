var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

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
  var metaTagsTemplate    = document.getElementById("meta-tags").innerHTML;
  var table               = null;
  var tableContainer      = null;
  var tableWrapper        = document.createElement("div");

  WebDeveloper.Generated.emptyContent();
  WebDeveloper.Generated.initializeHeader(metaTagsDescription, data, locale);
  WebDeveloper.Generated.initializeSidebar(locale);
  Mustache.parse(metaTagsTemplate);

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

    WebDeveloper.Generated.addDocument(contentDocument.url, i, metaTagDescription, metaTagsLength, true);

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
      table.appendChild(tableContainer);

      tableContainer = document.createElement("tbody");

      tableContainer.insertAdjacentHTML("beforeend", DOMPurify.sanitize("<table>" + Mustache.render(metaTagsTemplate, contentDocument) + "</table>", { ALLOWED_TAGS: ["tr", "td"] }));
      table.appendChild(tableContainer);
      table.setAttribute("class", "table table-borderless table-striped");
      tableWrapper.appendChild(table);
      tableWrapper.setAttribute("class", "table-responsive");
      content.appendChild(tableWrapper);
    }

    WebDeveloper.Generated.addSeparator();
  }

  WebDeveloper.Generated.initializeCommonElements();
};
