var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
  var content             = document.getElementById("content");
  var contentDocument     = null;
  var documents           = data.documents;
  var duplicateIds        = locale.duplicateIds;
  var duplicateIdTemplate = document.getElementById("duplicate-id").innerHTML;
  var idDescription       = null;
  var ids                 = null;
  var idsLength           = null;
  var list                = null;
  var url                 = null;

  WebDeveloper.Generated.emptyContent();
  WebDeveloper.Generated.initializeHeader(duplicateIds, data, locale);
  WebDeveloper.Generated.initializeSidebar(locale);
  Mustache.parse(duplicateIdTemplate);

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

    WebDeveloper.Generated.addDocument(contentDocument.url, i, idDescription, idsLength, true);

    // If there are duplicate ids
    if(idsLength > 0)
    {
      list = document.createElement("ol");

      // Loop through the ids
      for(var j = 0; j < idsLength; j++)
      {
        list.insertAdjacentHTML("beforeend", DOMPurify.sanitize(Mustache.render(duplicateIdTemplate, { id: ids[j], url: url }), { ADD_ATTR: ["target"] }));
      }

      content.appendChild(list);
    }

    WebDeveloper.Generated.addSeparator();
  }

  WebDeveloper.Generated.initializeCommonElements();
};
