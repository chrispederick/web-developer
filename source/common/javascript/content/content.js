var WebDeveloper = WebDeveloper || {};

WebDeveloper.Content = WebDeveloper.Content || {};

// Adds the color of the specified property to the list
WebDeveloper.Content.addColor = function(node, property, colors)
{
  // If the node, property and colors are set
  if(node && property && colors)
  {
    var color = WebDeveloper.Common.getPropertyCSSValue(node.ownerDocument.defaultView.getComputedStyle(node, null), property);

    // If the color is set
    if(color)
    {
      // If the color has a primitive type of color
      if(color.primitiveType == WebDeveloper.Common.getCSSPrimitiveValue("RGBCOLOR"))
      {
        var cssNumber = WebDeveloper.Common.getCSSPrimitiveValue("NUMBER");

        color = color.getRGBColorValue();

        colors.push("#" + WebDeveloper.Content.formatColor(color.red.getFloatValue(cssNumber)) + WebDeveloper.Content.formatColor(color.green.getFloatValue(cssNumber)) + WebDeveloper.Content.formatColor(color.blue.getFloatValue(cssNumber)));
      }
      else
      {
        color = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);

        // If the color is in RGB format
        if(color)
        {
          colors.push("#" + WebDeveloper.Content.formatColor(parseInt(color[1], 10)) + WebDeveloper.Content.formatColor(parseInt(color[2], 10)) + WebDeveloper.Content.formatColor(parseInt(color[3], 10)));
        }
      }
    }
  }
};

// Filters cookies based on the parameters
WebDeveloper.Content.filterCookies = function(allCookies, host, path, sort)
{
  var filteredCookies = [];

  // If the cookies and host are set
  if(allCookies && host)
  {
    var cookie     = null;
    var cookieHost = null;
    var cookiePath = null;

    // Loop through the cookies
    for(var i = 0, l = allCookies.length; i < l; i++)
    {
      cookie = allCookies[i];

      cookieHost = cookie.host;
      cookiePath = cookie.path;

      // If there is a host and path for this cookie
      if(cookieHost && cookiePath)
      {
        // If the cookie host starts with '.'
        if(cookieHost.charAt(0) == ".")
        {
          cookieHost = cookieHost.substring(1);
        }

        // If the host and cookie host and path and cookie path match
        if((host == cookieHost || WebDeveloper.Common.endsWith(host, "." + cookieHost)) && (path == cookiePath || cookiePath.indexOf(path) === 0))
        {
          filteredCookies.push(cookie);
        }
      }
    }

    // If sorting cookies
    if(sort)
    {
      filteredCookies.sort(WebDeveloper.Content.sortCookies);
    }
  }

  return filteredCookies;
};

// Formats a CSS color
WebDeveloper.Content.formatColor = function(color)
{
  var formattedColor = color.toString(16);

  // If the formatted color is less than 2 characters long
  if(formattedColor.length < 2)
  {
    return "0" + formattedColor;
  }

  return formattedColor;
};

// Returns any anchors in the document
WebDeveloper.Content.getAnchors = function()
{
  var anchor             = null;
  var anchors            = {};
  var contentDocument    = WebDeveloper.Common.getContentDocument();
  var contentDocuments   = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var documentAllAnchors = null;
  var documentAnchors    = null;
  var nonUniqueAnchors   = null;

  anchors.documents = [];
  anchors.pageTitle = contentDocument.title;
  anchors.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument         = contentDocuments[i];
    documentAllAnchors      = contentDocument.querySelectorAll("[id]");
    documentAnchors         = {};
    documentAnchors.anchors = [];
    documentAnchors.url     = contentDocument.documentURI;
    nonUniqueAnchors        = [];

    // Loop through the id anchors
    for(var j = 0, m = documentAllAnchors.length; j < m; j++)
    {
      nonUniqueAnchors.push(documentAllAnchors[j].getAttribute("id"));
    }

    documentAllAnchors = contentDocument.querySelectorAll("a[name]");

    // Loop through the name anchors
    for(j = 0, m = documentAllAnchors.length; j < m; j++)
    {
      nonUniqueAnchors.push(documentAllAnchors[j].getAttribute("name"));
    }

    nonUniqueAnchors.sort();

    // Loop through the anchors
    for(j = 0, m = nonUniqueAnchors.length; j < m; j++)
    {
      anchor = nonUniqueAnchors[j];

      // If this is not the last anchor and the anchor is the same as the next anchor
      if(j + 1 < m && anchor == nonUniqueAnchors[j + 1])
      {
        continue;
      }

      documentAnchors.anchors.push(anchor);
    }

    anchors.documents.push(documentAnchors);
  }

  return anchors;
};

// Returns any broken images in the document
WebDeveloper.Content.getBrokenImages = function()
{
  var allImages         = null;
  var brokenImages      = {};
  var contentDocument   = WebDeveloper.Common.getContentDocument();
  var contentDocuments  = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var documentImages    = null;

  brokenImages.documents = [];
  brokenImages.pageTitle = contentDocument.title;
  brokenImages.pageURL   = contentDocument.documentURI;

  // Loop through the documents to get the images and count them
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument       = contentDocuments[i];
    allImages             = WebDeveloper.Common.getDocumentImages(contentDocument);
    documentImages        = {};
    documentImages.images = [];
    documentImages.url    = contentDocument.documentURI;

    // Loop through the images
    for(var j = 0, m = allImages.length; j < m; j++)
    {
      documentImages.images.push(allImages[j].src);
    }

    brokenImages.documents.push(documentImages);
  }

  return brokenImages;
};

// Returns all the colors used on the page
WebDeveloper.Content.getColors = function()
{
  var colors           = {};
  var contentDocument  = WebDeveloper.Common.getContentDocument();
  var contentDocuments = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var documentColors   = null;

  colors.documents = [];
  colors.pageTitle = contentDocument.title;
  colors.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument       = contentDocuments[i];
    documentColors        = {};
    documentColors.colors = WebDeveloper.Content.getDocumentColors(contentDocument);
    documentColors.url    = contentDocument.documentURI;

    colors.documents.push(documentColors);
  }

  return colors;
};

// Returns all the cookies for the document
WebDeveloper.Content.getCookies = function(allCookies)
{
  var contentDocument  = WebDeveloper.Common.getContentDocument();
  var contentDocuments = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var cookies          = {};
  var documentCookies  = null;
  var host             = null;

  cookies.documents = [];
  cookies.pageTitle = contentDocument.title;
  cookies.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument         = contentDocuments[i];
    documentCookies         = {};
    documentCookies.cookies = [];
    documentCookies.url     = contentDocument.documentURI;
    host                    = null;

    // Try to get the host
    try
    {
      host = contentDocument.location.hostname;
    }
    catch(exception)
    {
      // Ignore
    }

    documentCookies.cookies = WebDeveloper.Content.filterCookies(allCookies, host, "/", true);

    cookies.documents.push(documentCookies);
  }

  return cookies;
};

// Returns all the CSS for the document
WebDeveloper.Content.getCSS = function()
{
  var contentDocument  = WebDeveloper.Common.getContentDocument();
  var contentDocuments = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var css              = {};

  css.documents = [];
  css.pageTitle = contentDocument.title;
  css.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    css.documents.push(WebDeveloper.Content.getDocumentCSS(contentDocuments[i]));
  }

  return css;
};

// Returns all the colors used in the document
WebDeveloper.Content.getDocumentColors = function(contentDocument)
{
  var colors     = [];
  var node       = null;
  var treeWalker = contentDocument.createTreeWalker(WebDeveloper.Common.getDocumentBodyElement(contentDocument), NodeFilter.SHOW_ELEMENT, null, false);

  // While the tree walker has more nodes
  while((node = treeWalker.nextNode()) !== null)
  {
    WebDeveloper.Content.addColor(node, "background-color", colors);
    WebDeveloper.Content.addColor(node, "border-bottom-color", colors);
    WebDeveloper.Content.addColor(node, "border-left-color", colors);
    WebDeveloper.Content.addColor(node, "border-right-color", colors);
    WebDeveloper.Content.addColor(node, "border-top-color", colors);
    WebDeveloper.Content.addColor(node, "color", colors);
  }

  colors = WebDeveloper.Content.tidyColors(colors);

  return colors;
};

// Returns the CSS for the specified document
WebDeveloper.Content.getDocumentCSS = function(contentDocument, screenOnly)
{
  var documentCSS     = {};
  var embeddedStyles  = "";
  var styleSheet      = null;
  var styleSheets     = contentDocument.getElementsByTagName("style");
  var styleSheetSheet = null;
  var styleSheetURL   = null;

  documentCSS.url         = contentDocument.documentURI;
  documentCSS.styleSheets = [];

  // Loop through the embedded style sheets
  for(var i = 0, l = styleSheets.length; i < l; i++)
  {
    styleSheet      = styleSheets[i];
    styleSheetSheet = styleSheet.sheet;

    // If this is a valid style sheet and not returning media screen only or this is an active screen style sheet
    if(WebDeveloper.CSS.isValidStyleSheet(styleSheetSheet) && (!screenOnly || WebDeveloper.CSS.isMediaStyleSheet(styleSheetSheet, "screen")))
    {
      embeddedStyles += styleSheet.textContent.trim() + "\n\n";

      documentCSS.styleSheets = documentCSS.styleSheets.concat(WebDeveloper.CSS.getImportedStyleSheets(styleSheetSheet));
    }
  }

  styleSheets = contentDocument.styleSheets;

  // Loop through the style sheets
  for(i = 0, l = styleSheets.length; i < l; i++)
  {
    styleSheet    = styleSheets[i];
    styleSheetURL = styleSheet.href;

    // If this is a valid style sheet, is not an inline style sheet or disabled and not returning media screen only or this is an active screen style sheet
    if(WebDeveloper.CSS.isValidStyleSheet(styleSheet) && styleSheetURL && styleSheetURL != contentDocument.documentURI && !styleSheet.disabled && (!screenOnly || (WebDeveloper.CSS.isMediaStyleSheet(styleSheet, "screen") && !WebDeveloper.CSS.isAlternateStyleSheet(styleSheet))))
    {
      documentCSS.styleSheets.push(WebDeveloper.Common.removeReloadParameterFromURL(styleSheetURL));

      documentCSS.styleSheets = documentCSS.styleSheets.concat(WebDeveloper.CSS.getImportedStyleSheets(styleSheet));
    }
  }

  // If there are embedded styles
  if(embeddedStyles)
  {
    documentCSS.embedded = embeddedStyles;
  }

  return documentCSS;
};

// Returns the details for the document
WebDeveloper.Content.getDocumentDetails = function()
{
  var contentDocument = WebDeveloper.Common.getContentDocument();
  var documentDetails = {};

  documentDetails.pageTitle = contentDocument.title;
  documentDetails.pageURL   = contentDocument.documentURI;

  return documentDetails;
};

// Returns the outline for a document
WebDeveloper.Content.getDocumentOutline = function()
{
  var contentDocument     = WebDeveloper.Common.getContentDocument();
  var contentDocuments    = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var documentAllHeadings = null;
  var documentHeading     = null;
  var documentOutline     = null;
  var heading             = null;
  var headingImages       = null;
  var headingText         = null;
  var outline             = {};

  outline.documents = [];
  outline.pageTitle = contentDocument.title;
  outline.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument          = contentDocuments[i];
    documentAllHeadings      = contentDocument.querySelectorAll("h1, h2, h3, h4, h5, h6");
    documentOutline          = {};
    documentOutline.headings = [];
    documentOutline.url      = contentDocument.documentURI;

    // Loop through the headers
    for(var j = 0, m = documentAllHeadings.length; j < m; j++)
    {
      documentHeading       = {};
      heading               = documentAllHeadings[j];
      headingText           = WebDeveloper.Common.getElementText(heading).trim();
      documentHeading.level = parseInt(heading.tagName.toLowerCase().substring(1), 10);

      // If there is no heading text
      if(!headingText)
      {
        headingImages = heading.querySelectorAll("img[alt]");

        // Loop through the heading images
        for(var k = 0, n = headingImages.length; k < n; k++)
        {
          headingText += headingImages[k].getAttribute("alt") + " ";
        }

        headingText = headingText.trim();

        // If there is heading text
        if(headingText)
        {
          headingText = "(" + headingText + ")";
        }
      }

      documentHeading.text = headingText;

      documentOutline.headings.push(documentHeading);
    }

    outline.documents.push(documentOutline);
  }

  return outline;
};

// Returns all the documents under a frame
WebDeveloper.Content.getDocuments = function(frame)
{
  var documents = [];

  // If the frame is set
  if(frame)
  {
    var frames = frame.frames;

    // Try to access the frame document
    try
    {
      // If the frame document exists
      if(frame.document)
      {
        documents.push(frame.document);
      }
    }
    catch(exception)
    {
      // Ignore
    }

    // Loop through the frames
    for(var i = 0, l = frames.length; i < l; i++)
    {
      documents = documents.concat(WebDeveloper.Content.getDocuments(frames[i]));
    }
  }

  return documents;
};

// Returns any duplicate ids in the document
WebDeveloper.Content.getDuplicateIds = function()
{
  var contentDocument      = WebDeveloper.Common.getContentDocument();
  var contentDocuments     = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var documentAllIds       = null;
  var documentDuplicateIds = null;
  var duplicateIds         = {};
  var id                   = null;
  var nonDuplicateIds    = null;

  duplicateIds.documents = [];
  duplicateIds.pageTitle = contentDocument.title;
  duplicateIds.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument          = contentDocuments[i];
    documentAllIds           = contentDocument.querySelectorAll("[id]");
    documentDuplicateIds     = {};
    documentDuplicateIds.ids = [];
    documentDuplicateIds.url = contentDocument.documentURI;
    nonDuplicateIds          = [];

    // Loop through the ids
    for(var j = 0, m = documentAllIds.length; j < m; j++)
    {
      nonDuplicateIds.push(documentAllIds[j].getAttribute("id"));
    }

    nonDuplicateIds.sort();

    // Loop through the ids
    for(j = 0, m = nonDuplicateIds.length; j < m; j++)
    {
      id = nonDuplicateIds[j];

      // If this is the same as the previous id and it is not already in the duplicate ids array
      if(id == nonDuplicateIds[j - 1] && !WebDeveloper.Common.inArray(id, documentDuplicateIds.ids))
      {
        documentDuplicateIds.ids.push(id);
      }
    }

    duplicateIds.documents.push(documentDuplicateIds);
  }

  return duplicateIds;
};

// Returns any forms in the document
WebDeveloper.Content.getForms = function()
{
  var allForms            = null;
  var contentDocument     = WebDeveloper.Common.getContentDocument();
  var contentDocuments    = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var documentForm        = null;
  var documentFormElement = null;
  var documentForms       = null;
  var elementType         = null;
  var form                = null;
  var formElement         = null;
  var formElementId       = null;
  var formElements        = null;
  var forms               = {};
  var labelElement        = null;

  forms.documents = [];
  forms.pageTitle = contentDocument.title;
  forms.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument     = contentDocuments[i];
    allForms            = contentDocument.forms;
    documentForms       = {};
    documentForms.forms = [];
    documentForms.url   = contentDocument.documentURI;

    // Loop through the forms
    for(var j = 0, m = allForms.length; j < m; j++)
    {
      documentForm          = {};
      documentForm.elements = [];
      form                  = allForms[j];
      formElements          = form.elements;

      // If the form has an action attribute
      if(form.hasAttribute("action"))
      {
        documentForm.action = form.getAttribute("action");
      }

      // If the form has an id attribute
      if(form.hasAttribute("id"))
      {
        documentForm.id = form.getAttribute("id");
      }

      // If the form has a method attribute
      if(form.hasAttribute("method"))
      {
        documentForm.method = form.getAttribute("method");
      }

      // If the form has a name attribute
      if(form.hasAttribute("name"))
      {
        documentForm.name = form.getAttribute("name");
      }

      // Loop through the form elements
      for(var k = 0, n = formElements.length; k < n; k++)
      {
        documentFormElement = {};
        formElement         = formElements[k];
        elementType         = formElement.tagName.toLowerCase();
        formElementId       = formElement.getAttribute("id");
        labelElement        = formElement.parentNode;

        // If this is an input element
        if(elementType == "input")
        {
          documentFormElement.value = formElement.value;

          // If the form element has a type attribute
          if(formElement.hasAttribute("type"))
          {
            elementType = formElement.getAttribute("type");
          }
        }
        else if(elementType == "select" || elementType == "textarea")
        {
          documentFormElement.value = formElement.value;
        }

        // If the parent element is a label
        if(labelElement.tagName.toLowerCase() == "label")
        {
          documentFormElement.label = labelElement.textContent.trim();
        }

        // If the form element has an id attribute
        if(formElementId)
        {
          documentFormElement.id = formElementId;

          // If the label is not already set
          if(!documentFormElement.label)
          {
            labelElement = contentDocument.querySelector('label[for="' + formElementId + '"]');

            // If a label element was found
            if(labelElement)
            {
              documentFormElement.label = labelElement.textContent.trim();
            }
          }
        }

        // If the form element has a maxlength attribute
        if(formElement.hasAttribute("maxlength"))
        {
          documentFormElement.maximumLength = formElement.getAttribute("maxlength");
        }

        // If the form element has a name attribute
        if(formElement.hasAttribute("name"))
        {
          documentFormElement.name = formElement.getAttribute("name");
        }

        // If the form element has a size attribute
        if(formElement.hasAttribute("size"))
        {
          documentFormElement.size = formElement.getAttribute("size");
        }

        documentFormElement.type = elementType;

        documentForm.elements.push(documentFormElement);
      }

      documentForms.forms.push(documentForm);
    }

    forms.documents.push(documentForms);
  }

  return forms;
};

// Returns any images in the document
WebDeveloper.Content.getImages = function()
{
  var allImages        = null;
  var contentDocument  = WebDeveloper.Common.getContentDocument();
  var contentDocuments = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var documentImage    = null;
  var documentImages   = null;
  var image            = null;
  var images           = {};

  images.documents = [];
  images.pageTitle = contentDocument.title;
  images.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument       = contentDocuments[i];
    allImages             = WebDeveloper.Common.getDocumentImages(contentDocument);
    documentImages        = {};
    documentImages.images = [];
    documentImages.url    = contentDocument.documentURI;

    // Loop through the images
    for(var j = 0, m = allImages.length; j < m; j++)
    {
      documentImage = {};
      image         = allImages[j];

      // If the image has an alt attribute
      if(image.hasAttribute("alt"))
      {
        documentImage.alt = image.getAttribute("alt");
      }

      documentImage.height = image.naturalHeight;
      documentImage.src    = image.src;
      documentImage.width  = image.naturalWidth;

      documentImages.images.push(documentImage);
    }

    images.documents.push(documentImages);
  }

  return images;
};

// Returns any JavaScript for the document
WebDeveloper.Content.getJavaScript = function()
{
  var contentDocument    = WebDeveloper.Common.getContentDocument();
  var contentDocuments   = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var documentJavaScript = null;
  var embeddedJavaScript = null;
  var javaScript         = {};
  var script             = null;
  var scripts            = null;

  javaScript.documents = [];
  javaScript.pageTitle = contentDocument.title;
  javaScript.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument    = contentDocuments[i];
    documentJavaScript = {};
    embeddedJavaScript = "";
    scripts            = contentDocument.getElementsByTagName("script");

    documentJavaScript.url        = contentDocument.documentURI;
    documentJavaScript.javaScript = [];

    // Loop through the scripts
    for(var j = 0, m = scripts.length; j < m; j++)
    {
      script = scripts[j];

      // If this is a valid external script
      if(script.src)
      {
        documentJavaScript.javaScript.push(script.src);
      }
      else
      {
        embeddedJavaScript += script.textContent.trim() + "\n\n";
      }
    }

    // If there is embedded JavaScript
    if(embeddedJavaScript)
    {
      documentJavaScript.embedded = embeddedJavaScript;
    }

    javaScript.documents.push(documentJavaScript);
  }

  return javaScript;
};

// Returns any links in the document
WebDeveloper.Content.getLinks = function()
{
  var contentDocument  = WebDeveloper.Common.getContentDocument();
  var contentDocuments = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var documentAllLinks = null;
  var documentLinks    = null;
  var link             = null;
  var links            = {};
  var nonUniqueLinks   = null;

  links.documents = [];
  links.pageTitle = contentDocument.title;
  links.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument     = contentDocuments[i];
    documentAllLinks    = contentDocument.links;
    documentLinks       = {};
    documentLinks.links = [];
    documentLinks.url   = contentDocument.documentURI;
    nonUniqueLinks      = [];

    // Loop through the links
    for(var j = 0, m = documentAllLinks.length; j < m; j++)
    {
      nonUniqueLinks.push(documentAllLinks[j].href);
    }

    nonUniqueLinks.sort();

    // Loop through the links
    for(j = 0, m = nonUniqueLinks.length; j < m; j++)
    {
      link = nonUniqueLinks[j];

      // If this is not the last link and the link is the same as the next link
      if(j + 1 < m && link == nonUniqueLinks[j + 1])
      {
        continue;
      }

      documentLinks.links.push(link);
    }

    links.documents.push(documentLinks);
  }

  return links;
};

// Returns any meta tags in the document
WebDeveloper.Content.getMetaTags = function()
{
  var contentDocument     = WebDeveloper.Common.getContentDocument();
  var contentDocuments    = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var documentAllMetaTags = null;
  var documentMetaTag     = null;
  var documentMetaTags    = null;
  var metaTag             = null;
  var metaTags            = {};

  metaTags.documents = [];
  metaTags.pageTitle = contentDocument.title;
  metaTags.pageURL   = contentDocument.documentURI;

  // Loop through the documents
  for(var i = 0, l = contentDocuments.length; i < l; i++)
  {
    contentDocument           = contentDocuments[i];
    documentAllMetaTags       = contentDocument.getElementsByTagName("meta");
    documentMetaTags          = {};
    documentMetaTags.metaTags = [];
    documentMetaTags.url      = contentDocument.documentURI;

    // Loop through the meta tags
    for(var j = 0, m = documentAllMetaTags.length; j < m; j++)
    {
      documentMetaTag = {};
      metaTag         = documentAllMetaTags[j];

      // If the meta tag has a name attribute
      if(metaTag.hasAttribute("name"))
      {
        documentMetaTag.content = metaTag.getAttribute("content");
        documentMetaTag.name    = metaTag.getAttribute("name");
      }
      else if(metaTag.hasAttribute("charset"))
      {
        documentMetaTag.content = metaTag.getAttribute("charset");
        documentMetaTag.name    = "charset";
      }
      else if(metaTag.hasAttribute("http-equiv"))
      {
        documentMetaTag.content = metaTag.getAttribute("content");
        documentMetaTag.name    = metaTag.getAttribute("http-equiv");
      }
      else if(metaTag.hasAttribute("property"))
      {
        documentMetaTag.content = metaTag.getAttribute("content");
        documentMetaTag.name    = metaTag.getAttribute("property");
      }

      documentMetaTags.metaTags.push(documentMetaTag);
    }

    metaTags.documents.push(documentMetaTags);
  }

  return metaTags;
};

// Returns the window size
WebDeveloper.Content.getWindowSize = function()
{
  var size = {};

  size.innerHeight = window.innerHeight;
  size.innerWidth  = window.innerWidth;
  size.outerHeight = window.outerHeight;
  size.outerWidth  = window.outerWidth;

  return size;
};

// Sorts two cookies
WebDeveloper.Content.sortCookies = function(cookieOne, cookieTwo)
{
  // If cookie one and cookie two are set
  if(cookieOne && cookieTwo)
  {
    var cookieOneHost = cookieOne.host;
    var cookieOneName = cookieOne.name;
    var cookieTwoHost = cookieTwo.host;
    var cookieTwoName = cookieTwo.name;

    // If the cookies are equal
    if(cookieOneHost == cookieTwoHost && cookieOneName == cookieTwoName)
    {
      return 0;
    }
    else if(cookieOneHost < cookieTwoHost || (cookieOneHost == cookieTwoHost && cookieOneName < cookieTwoName))
    {
      return -1;
    }
  }

  return 1;
};

// Tidies a list of colors by removing duplicates and sorting
WebDeveloper.Content.tidyColors = function(colors)
{
  var color      = null;
  var tidiedColors = [];

  colors.sort();

  // Loop through the colors
  for(var i = 0, l = colors.length; i < l; i++)
  {
    color = colors[i];

    // If this is not the last color and the color is the same as the next color
    if(i + 1 < l && color == colors[i + 1])
    {
      continue;
    }

    tidiedColors.push(color);
  }

  return tidiedColors;
};
