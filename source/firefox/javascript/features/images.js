var WebDeveloper = WebDeveloper || {};

WebDeveloper.Images = WebDeveloper.Images || {};

// Displays the file sizes for all images
WebDeveloper.Images.displayImageFileSizes = function(display, documents)
{
  var contentDocument  = null;
  var fileSizeRequests = [];
  var image            = null;
  var images           = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If displaying the file sizes
    if(display)
    {
      images = contentDocument.images;

      // Loop through the images
      for(var j = 0, m = images.length; j < m; j++)
      {
        image = images[j];

        fileSizeRequests.push({ "fileObject": {}, "image": image, "includeUncompressed": false, "url": image.src });
      }
    }
    else
    {
      WebDeveloper.Common.removeMatchingElements(".web-developer-display-image-file-sizes", contentDocument);
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-image-file-sizes-before", contentDocument, false);
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/display-image-file-sizes.css", "web-developer-display-image-file-sizes", contentDocument, false);
  }

  // If display the file sizes and there are requests
  if(display && fileSizeRequests.length)
  {
    WebDeveloper.Common.getFileSizes(fileSizeRequests, function()
    {
      var bytes           = WebDeveloper.Locales.getString("bytes");
      var fileSizeRequest = null;
      var image           = null;
      var kilobytes       = WebDeveloper.Locales.getString("kilobytes");
      var spanElement     = null;
      var text            = null;

      // Loop through the file size requests
      for(i = 0, l = fileSizeRequests.length; i < l; i++)
      {
        fileSizeRequest = fileSizeRequests[i];
        image           = fileSizeRequest.image;
        contentDocument = image.ownerDocument;
        text            = WebDeveloper.Common.formatFileSize(fileSizeRequest.fileObject.size.size, bytes, kilobytes);

        // If the text is set
        if(text)
        {
          spanElement = contentDocument.createElement("span");

          spanElement.setAttribute("class", "web-developer-display-image-file-sizes");
          spanElement.appendChild(contentDocument.createTextNode(text));
          image.parentNode.insertBefore(spanElement, image);
        }
      }
    });
  }
};
