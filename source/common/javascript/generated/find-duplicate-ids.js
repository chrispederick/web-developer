var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
  var content         = document.getElementById("content");
  var contentDocument = null;
  var documents       = data.documents;
  var duplicateIds    = locale.duplicateIds;
  var idDescription   = null;
  var ids             = null;
  var idsLength       = null;
  var list            = null;
  var listElement     = null;
  var url             = null;

  WebDeveloper.Generated.emptyContent();
  WebDeveloper.Generated.localizeHeader(locale);
  WebDeveloper.Generated.setPageTitle(duplicateIds, data, locale);

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];
    idDescription   = duplicateIds.toLowerCase();
    ids             = contentDocument.ids;
    idsLength       = ids.length;
    url             = contentDocument.url;

    // If there is only one image
    if(idsLength == 1)
    {
      idDescription = locale.duplicateId;
    }

    WebDeveloper.Generated.addDocument(contentDocument.url, i, idDescription, idsLength);

    // If there are duplicate ids
    if(idsLength > 0)
    {
      list        = document.createElement("ol");
      listElement = $(list);

      // Loop through the ids
      for(var j = 0; j < idsLength; j++)
      {
        listElement.append(ich.duplicateId({ id: ids[j], url: url }));
      }

      content.appendChild(list);
    }

    WebDeveloper.Generated.addSeparator();
  }

  WebDeveloper.Generated.initializeCommonElements();
};
