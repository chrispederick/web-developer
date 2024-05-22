var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
  var content         = document.getElementById("content");
  var contentDocument = null;
  var documents       = data.documents;
  var linkDescription = null;
  var linkInformation = locale.linkInformation;
  var linksLength     = null;
  var linksTemplate   = document.getElementById("links").innerHTML;
  var list            = null;

  WebDeveloper.Generated.emptyContent();
  WebDeveloper.Generated.initializeHeader(linkInformation, data, locale);
  WebDeveloper.Generated.initializeSidebar(locale);
  Mustache.parse(linksTemplate);

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];
    linkDescription = locale.links.toLowerCase();
    linksLength     = contentDocument.links.length;

    // If there is only one link
    if(linksLength == 1)
    {
      linkDescription = locale.link.toLowerCase();
    }

    WebDeveloper.Generated.addDocument(contentDocument.url, i, linkDescription, linksLength, true);

    // If there are links
    if(linksLength > 0)
    {
      list = document.createElement("ol");

      list.insertAdjacentHTML("beforeend", DOMPurify.sanitize(Mustache.render(linksTemplate, contentDocument), { ADD_ATTR: ["target"] }));
      content.appendChild(list);
    }

    WebDeveloper.Generated.addSeparator();
  }

  WebDeveloper.Generated.initializeCommonElements();
};
