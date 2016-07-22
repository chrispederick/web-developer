var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
  var brokenImages     = locale.brokenImages;
  var content          = document.getElementById("content");
  var contentDocument  = null;
  var documents        = data.documents;
  var imagesLength     = null;
  var list             = null;

  WebDeveloper.Generated.emptyContent();
  WebDeveloper.Generated.localizeHeader(locale);
  WebDeveloper.Generated.setPageTitle(brokenImages, data, locale);

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];
    imagesLength    = contentDocument.images.length;

    WebDeveloper.Generated.addDocument(contentDocument.url, i, locale.brokenImages);

    // If there are broken images
    if(imagesLength > 0)
    {
      list = document.createElement("ol");

      // Loop through the images
      for(var j = 0, m = imagesLength; j < m; j++)
      {
        WebDeveloper.Generated.testForBrokenImage(contentDocument.images[j], list);
      }

      content.appendChild(list);
    }

    WebDeveloper.Generated.addSeparator();
  }

  WebDeveloper.Generated.initializeCommonElements();
};

// Tests for a broken image
WebDeveloper.Generated.testForBrokenImage = function(src, list)
{
  var image = new Image();

  // Add a load event listener to the image
  image.onerror = function()
  {
    $(list).append(ich.brokenImage({ src: image.src }));
  };

  image.src = src;
};
