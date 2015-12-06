var WebDeveloper = WebDeveloper || {};

WebDeveloper.Images                         = WebDeveloper.Images || {};
WebDeveloper.Images.imageDimensionsLocale   = null;
WebDeveloper.Images.imageDimensionsTimeout  = null;
WebDeveloper.Images.imageDimensionsUpdating = false;

// Displays alt attributes for all images
WebDeveloper.Images.displayAltAttributes = function(display, documents)
{
  var contentDocument = null;
  var image           = null;
  var images          = null;
  var spanElement     = null;
  var text            = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If displaying the alt attributes
    if(display)
    {
      images = contentDocument.querySelectorAll("img[alt], input[type=image][alt]");

      // Loop through the images
      for(var j = 0, m = images.length; j < m; j++)
      {
        image       = images[j];
        spanElement = contentDocument.createElement("span");
        text        = 'alt="' + image.getAttribute("alt") + '"';

        spanElement.setAttribute("class", "web-developer-display-alt-attributes");
        spanElement.appendChild(contentDocument.createTextNode(text));
        image.parentNode.insertBefore(spanElement, image);
      }
    }
    else
    {
      WebDeveloper.Common.removeMatchingElements(".web-developer-display-alt-attributes", contentDocument);
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-alt-attributes", contentDocument, false);
  }
};

// Displays the dimensions for all images
WebDeveloper.Images.displayImageDimensions = function(display, documents, locale)
{
  var contentDocument = null;

  // If displaying the image dimensions
  if(display)
  {
    WebDeveloper.Images.imageDimensionsLocale = locale;

    window.addEventListener("resize", WebDeveloper.Images.resizeImageDimensions, false);
  }
  else
  {
    WebDeveloper.Images.imageDimensionsLocale = null;

    window.removeEventListener("resize", WebDeveloper.Images.resizeImageDimensions, false);
  }

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If displaying the image dimensions
    if(display)
    {
      WebDeveloper.Images.updateImageDimensions(contentDocument);
    }
    else
    {
      WebDeveloper.Common.removeMatchingElements(".web-developer-display-image-dimensions", contentDocument);
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-image-dimensions-before", contentDocument, false);
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/display-image-dimensions.css", "web-developer-display-image-dimensions", contentDocument, false);
  }
};

// Displays the paths for all images
WebDeveloper.Images.displayImagePaths = function(display, documents)
{
  var contentDocument = null;
  var image           = null;
  var images          = null;
  var imageSrc        = null;
  var linkElement     = null;
  var spanElement     = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If displaying the alt attributes
    if(display)
    {
      images = contentDocument.images;

      // Loop through the images
      for(var j = 0, m = images.length; j < m; j++)
      {
        image       = images[j];
        imageSrc    = image.src;
        linkElement = contentDocument.createElement("a");
        spanElement = contentDocument.createElement("span");

        linkElement.setAttribute("href", imageSrc);
        linkElement.appendChild(contentDocument.createTextNode('src="' + imageSrc + '"'));

        spanElement.setAttribute("class", "web-developer-display-image-paths");
        spanElement.appendChild(linkElement);
        image.parentNode.insertBefore(spanElement, image);
      }
    }
    else
    {
      WebDeveloper.Common.removeMatchingElements(".web-developer-display-image-paths", contentDocument);
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-image-paths", contentDocument, false);
  }
};

// Hides the background images on a page
WebDeveloper.Images.hideBackgroundImages = function(documents)
{
  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/hide-background-images.css", "web-developer-hide-background-images", documents[i], false);
  }
};

// Hides all the images
WebDeveloper.Images.hideImages = function(hide, documents)
{
  var contentDocument = null;
  var inputElement    = null;
  var inputElements   = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];
    inputElements   = contentDocument.getElementsByTagName("input");

    // Loop through all the input tags
    for(var j = 0, m = inputElements.length; j < m; j++)
    {
      inputElement = inputElements[j];

      // If hiding images and the input element is of type image
      if(hide && inputElement.hasAttribute("type") && inputElement.getAttribute("type").toLowerCase() == "image")
      {
        inputElement.setAttribute("web-developer-hide-images", true);
        inputElement.setAttribute("type", "submit");
      }
      else if(inputElement.hasAttribute("web-developer-hide-images"))
      {
        inputElement.removeAttribute("web-developer-hide-images");
        inputElement.setAttribute("type", "image");
      }
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/hide-images.css", "web-developer-hide-images", contentDocument, false);
  }
};

// Makes all images full size
WebDeveloper.Images.makeImagesFullSize = function(documents)
{
  var alteredImages = 0;
  var image         = null;
  var images        = null;
  var naturalHeight = null;
  var naturalWidth  = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    images = documents[i].images;

    // Loop through the images
    for(var j = 0, m = images.length; j < m; j++)
    {
      image         = images[j];
      naturalHeight = image.naturalHeight;
      naturalWidth  = image.naturalWidth;

      // If the height or width is not the full size
      if((naturalHeight && image.height != naturalHeight) || (naturalWidth && image.width != naturalWidth))
      {
        image.height = image.naturalHeight;
        image.width = image.naturalWidth;

        alteredImages++;
      }
    }
  }

  // If one image was made full size
  if(alteredImages == 1)
  {
    WebDeveloper.Common.displayNotification("makeImagesFullSizeSingleResult");
  }
  else
  {
    WebDeveloper.Common.displayNotification("makeImagesFullSizeMultipleResult", [alteredImages]);
  }
};

// Makes all images invisible
WebDeveloper.Images.makeImagesInvisible = function(invisible, documents)
{
  var contentDocument = null;
  var image           = null;
  var imageInput      = null;
  var imageInputs     = null;
  var images          = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];
    imageInputs     = contentDocument.querySelectorAll("input[type=image], input[web-developer-make-images-invisible]");
    images          = contentDocument.images;

    // Loop through the image input tags
    for(var j = 0, m = imageInputs.length; j < m; j++)
    {
      imageInput = imageInputs[j];

      // If making images invisible
      if(invisible)
      {
        imageInput.setAttribute("web-developer-make-images-invisible", true);
        imageInput.setAttribute("type", "submit");
      }
      else if(imageInput.hasAttribute("web-developer-make-images-invisible"))
      {
        imageInput.removeAttribute("web-developer-make-images-invisible");
        imageInput.setAttribute("type", "image");
      }
    }

    // Loop through the images
    for(j = 0, m = images.length; j < m; j++)
    {
      image = images[j];

      // If making images invisible
      if(invisible)
      {
        // If the image width is not set and the image is not broken
        if(!image.hasAttribute("width") && image.naturalWidth)
        {
          image.setAttribute("width", image.naturalWidth);
        }

        // If the image height is not set and the image is not broken
        if(!image.hasAttribute("height") && image.naturalHeight)
        {
          image.setAttribute("height", image.naturalHeight);
        }

        image.setAttribute("web-developer-make-images-invisible", image.getAttribute("src"));
        image.setAttribute("src", WebDeveloper.Common.getChromeURL("features/style-sheets/images/transparent.png"));
      }
      else
      {
        image.setAttribute("src", image.getAttribute("web-developer-make-images-invisible"));
        image.removeAttribute("web-developer-make-images-invisible");
      }
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/make-images-invisible.css", "web-developer-make-images-invisible", contentDocument, false);
  }
};

// Outlines all images
WebDeveloper.Images.outlineAllImages = function(documents)
{
  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/outline-all-images.css", "web-developer-outline-all-images", documents[i], false);
  }
};

// Outlines all background images
WebDeveloper.Images.outlineBackgroundImages = function(outline, documents)
{
  var backgroundImage  = null;
  var backgroundImages = null;
  var contentDocument  = null;
  var node             = null;
  var treeWalker       = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If outlining background images
    if(outline)
    {
      treeWalker = contentDocument.createTreeWalker(WebDeveloper.Common.getDocumentBodyElement(contentDocument), NodeFilter.SHOW_ELEMENT, null, false);

      // While the tree walker has more nodes
      while((node = treeWalker.nextNode()) !== null)
      {
        backgroundImage = WebDeveloper.Common.getCSSProperty(WebDeveloper.Common.getPropertyCSSValue(node.ownerDocument.defaultView.getComputedStyle(node, null), "background-image"));

        // If this element has a background image and it is a URL
        if(WebDeveloper.Common.isCSSURI(backgroundImage))
        {
          WebDeveloper.Common.addClass(node, "web-developer-outline-background-images");
        }
      }
    }
    else
    {
      backgroundImages = contentDocument.getElementsByClassName("web-developer-outline-background-images");

      // While there are background images
      while(backgroundImages.length > 0)
      {
        WebDeveloper.Common.removeClass(backgroundImages[0], "web-developer-outline-background-images");
      }
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/outline-background-images.css", "web-developer-outline-background-images", contentDocument, false);
  }
};

// Outlines all images with adjusted dimensions
WebDeveloper.Images.outlineImagesWithAdjustedDimensions = function(outline, documents)
{
  var contentDocument              = null;
  var image                        = null;
  var images                       = null;
  var imagesWithAdjustedDimensions = null;
  var naturalHeight                = null;
  var naturalWidth                 = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If outlining images with adjusted dimensions
    if(outline)
    {
      images = contentDocument.images;

      // Loop through the images
      for(var j = 0, m = images.length; j < m; j++)
      {
        image         = images[j];
        naturalHeight = image.naturalHeight;
        naturalWidth  = image.naturalWidth;

        // If the height or width has been adjusted
        if((naturalHeight && image.height != naturalHeight) || (naturalWidth && image.width != naturalWidth))
        {
          WebDeveloper.Common.addClass(image, "web-developer-outline-images-with-adjusted-dimensions");
        }
      }
    }
    else
    {
      imagesWithAdjustedDimensions = contentDocument.getElementsByClassName("web-developer-outline-images-with-adjusted-dimensions");

      // While there are images with adjusted dimensions
      while(imagesWithAdjustedDimensions.length > 0)
      {
        WebDeveloper.Common.removeClass(imagesWithAdjustedDimensions[0], "web-developer-outline-images-with-adjusted-dimensions");
      }
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/outline-images-with-adjusted-dimensions.css", "web-developer-outline-images-with-adjusted-dimensions", contentDocument, false);
  }
};

// Outlines all images with empty alt attributes
WebDeveloper.Images.outlineImagesWithEmptyAltAttributes = function(documents)
{
  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/outline-images-with-empty-alt-attributes.css", "web-developer-outline-images-with-empty-alt-attributes", documents[i], false);
  }
};

// Outlines all images with oversized dimensions
WebDeveloper.Images.outlineImagesWithOversizedDimensions = function(outline, documents)
{
  var contentDocument               = null;
  var image                         = null;
  var images                        = null;
  var imagesWithOversizedDimensions = null;
  var naturalHeight                 = null;
  var naturalWidth                  = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If outlining images with oversized dimensions
    if(outline)
    {
      images = contentDocument.images;

      // Loop through the images
      for(var j = 0, m = images.length; j < m; j++)
      {
        image         = images[j];
        naturalHeight = image.naturalHeight;
        naturalWidth  = image.naturalWidth;

        // If the height or width has been oversized
        if((naturalHeight && image.height > naturalHeight) || (naturalWidth && image.width > naturalWidth))
        {
          WebDeveloper.Common.addClass(image, "web-developer-outline-images-with-oversized-dimensions");
        }
      }
    }
    else
    {
      imagesWithOversizedDimensions = contentDocument.getElementsByClassName("web-developer-outline-images-with-oversized-dimensions");

      // While there are images with oversized dimensions
      while(imagesWithOversizedDimensions.length > 0)
      {
        WebDeveloper.Common.removeClass(imagesWithOversizedDimensions[0], "web-developer-outline-images-with-oversized-dimensions");
      }
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/outline-images-with-oversized-dimensions.css", "web-developer-outline-images-with-oversized-dimensions", contentDocument, false);
  }
};

// Outlines all images without alt attributes
WebDeveloper.Images.outlineImagesWithoutAltAttributes = function(documents)
{
  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/outline-images-without-alt-attributes.css", "web-developer-outline-images-without-alt-attributes", documents[i], false);
  }
};

// Outlines all images without dimensions
WebDeveloper.Images.outlineImagesWithoutDimensions = function(documents)
{
  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/outline-images-without-dimensions.css", "web-developer-outline-images-without-dimensions", documents[i], false);
  }
};

// Reloads the images in a document
WebDeveloper.Images.reloadImages = function(documents)
{
  var computedStyle   = null;
  var contentDocument = null;
  var imageURL        = null;
  var node            = null;
  var styleImage      = null;
  var treeWalker      = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];
    treeWalker      = contentDocument.createTreeWalker(contentDocument, NodeFilter.SHOW_ELEMENT, null, false);

    // While the tree walker has more nodes
    while((node = treeWalker.nextNode()) !== null)
    {
      // If this is an image element
      if(node.tagName.toLowerCase() == "img" || (node.tagName.toLowerCase() == "input" && node.src && node.type && node.type.toLowerCase() == "image"))
      {
        imageURL = node.src;

        // If this is not a chrome image
        if(imageURL.indexOf("chrome://") !== 0)
        {
          node.src = WebDeveloper.Images.updateReloadImageURL(imageURL);
        }
      }
      else if(node.tagName.toLowerCase() == "link" && node.href && node.href.indexOf("chrome://") !== 0 && node.rel && node.rel.indexOf("icon") != -1)
      {
        node.href = WebDeveloper.Images.updateReloadImageURL(node.href);
      }
      else
      {
        computedStyle = node.ownerDocument.defaultView.getComputedStyle(node, null);

        // If the computed style is set
        if(computedStyle)
        {
          styleImage = WebDeveloper.Common.getCSSProperty(WebDeveloper.Common.getPropertyCSSValue(computedStyle, "background-image"));

          // If this element has a background image and it is a URI
          if(WebDeveloper.Common.isCSSURI(styleImage))
          {
            imageURL = WebDeveloper.Common.getCSSURI(styleImage);

            // If this is not a chrome image
            if(imageURL.indexOf("chrome://") !== 0)
            {
              node.style.backgroundImage = WebDeveloper.Images.updateReloadImageURL(imageURL);
            }
          }

          styleImage = WebDeveloper.Common.getPropertyCSSValue(computedStyle, "list-style-image");

          // If this element has a list style image and it is a URI
          if(WebDeveloper.Common.isCSSURI(styleImage))
          {
            imageURL = WebDeveloper.Common.getCSSURI(styleImage);

            // If this is not a chrome image
            if(imageURL.indexOf("chrome://") !== 0)
            {
              node.style.listStyleImage = WebDeveloper.Images.updateReloadImageURL(imageURL);
            }
          }
        }
      }
    }
  }

  WebDeveloper.Common.displayNotification("reloadImagesResult");
};

// Replaces all images with alt attributes
WebDeveloper.Images.replaceImagesWithAltAttributes = function(replace, documents)
{
  var contentDocument = null;
  var image           = null;
  var images          = null;
  var spanElement     = null;
  var text            = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If replacing the images
    if(replace)
    {
      images = contentDocument.images;

      // Loop through the images
      for(var j = 0, m = images.length; j < m; j++)
      {
        image       = images[j];
        spanElement = contentDocument.createElement("span");
        text        = image.getAttribute("alt");

        spanElement.setAttribute("class", "web-developer-replace-images-with-alt-attributes");
        spanElement.appendChild(contentDocument.createTextNode(text));
        image.parentNode.insertBefore(spanElement, image);
      }
    }
    else
    {
      WebDeveloper.Common.removeMatchingElements(".web-developer-replace-images-with-alt-attributes", contentDocument);
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/hide-images.css", "web-developer-replace-images-with-alt-attributes", contentDocument, false);
  }
};

// Resizes the dimensions for all images
WebDeveloper.Images.resizeImageDimensions = function()
{
  // If there is a timeout set
  if(WebDeveloper.Images.imageDimensionsTimeout)
  {
    window.clearTimeout(WebDeveloper.Images.imageDimensionsTimeout);

    WebDeveloper.Images.imageDimensionsTimeout = null;
  }

  // If the image dimensions are not already updating
  if(!WebDeveloper.Images.imageDimensionsUpdating)
  {
    var documents = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());

    // Loop through the documents
    for(var i = 0, l = documents.length; i < l; i++)
    {
      WebDeveloper.Images.updateImageDimensions(documents[i]);
    }
  }
  else
  {
    WebDeveloper.Images.imageDimensionsTimeout = window.setTimeout(WebDeveloper.Images.resizeImageDimensions, 0);
  }
};

// Updates the dimensions for all images
WebDeveloper.Images.updateImageDimensions = function(contentDocument)
{
  var image       = null;
  var images      = contentDocument.images;
  var spanElement = null;
  var text        = null;

  WebDeveloper.Images.imageDimensionsUpdating = true;

  WebDeveloper.Common.removeMatchingElements(".web-developer-display-image-dimensions", contentDocument);

  // Loop through the images
  for(var i = 0, l = images.length; i < l; i++)
  {
    image = images[i];
    text  = WebDeveloper.Common.formatDimensions(image.width, image.height, WebDeveloper.Images.imageDimensionsLocale);

    // If the text is set
    if(text)
    {
      spanElement = contentDocument.createElement("span");

      spanElement.setAttribute("class", "web-developer-display-image-dimensions");
      spanElement.appendChild(contentDocument.createTextNode(text));
      image.parentNode.insertBefore(spanElement, image);
    }
  }

  WebDeveloper.Images.imageDimensionsUpdating = false;
};

// Updates a reload image URL
WebDeveloper.Images.updateReloadImageURL = function(imageURL)
{
  var newImageURL = WebDeveloper.Common.removeReloadParameterFromURL(imageURL);

  // If the image URL does not have query parameters
  if(newImageURL.indexOf("?") == -1)
  {
    newImageURL += "?";
  }
  else
  {
    newImageURL += "&";
  }

  return newImageURL + "web-developer-reload=" + new Date().getTime();
};
