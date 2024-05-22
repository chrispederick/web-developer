var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Displays an image
WebDeveloper.Generated.displayImage = function(image, container, documentCount, imagesCounter, locale)
{
  var childElement   = document.createElement("th");
  var element        = document.createElement("tr");
  var imageSrc       = image.src;
  var linkElement    = document.createElement("a");
  var table          = document.createElement("table");
  var tableContainer = document.createElement("thead");
  var tableWrapper   = document.createElement("div");

  childElement.appendChild(document.createTextNode(locale.property));
  element.appendChild(childElement);

  childElement = document.createElement("th");

  childElement.appendChild(document.createTextNode(locale.value));
  element.appendChild(childElement);
  tableContainer.appendChild(element);
  table.appendChild(tableContainer);

  tableContainer = document.createElement("tbody");
  childElement   = document.createElement("td");
  element        = document.createElement("tr");

  childElement.appendChild(document.createTextNode(locale.src));
  element.appendChild(childElement);

  childElement = document.createElement("td");

  linkElement.appendChild(document.createTextNode(imageSrc));
  linkElement.setAttribute("href", imageSrc);
  linkElement.setAttribute("rel", "noreferrer");
  linkElement.setAttribute("target", "_blank");
  childElement.appendChild(linkElement);
  element.appendChild(childElement);
  tableContainer.appendChild(element);

  childElement = document.createElement("td");
  element      = document.createElement("tr");

  childElement.appendChild(document.createTextNode(locale.width));
  element.appendChild(childElement);

  childElement = document.createElement("td");

  childElement.appendChild(document.createTextNode(image.width));
  element.appendChild(childElement);
  tableContainer.appendChild(element);

  childElement = document.createElement("td");
  element      = document.createElement("tr");

  childElement.appendChild(document.createTextNode(locale.height));
  element.appendChild(childElement);

  childElement = document.createElement("td");

  childElement.appendChild(document.createTextNode(image.height));
  element.appendChild(childElement);
  tableContainer.appendChild(element);

  // If the image has an alt attribute
  if(image.alt)
  {
    childElement = document.createElement("td");
    element      = document.createElement("tr");

    childElement.appendChild(document.createTextNode(locale.alt));
    element.appendChild(childElement);

    childElement = document.createElement("td");

    childElement.appendChild(document.createTextNode(image.alt));
    element.appendChild(childElement);
    tableContainer.appendChild(element);
  }

  table.appendChild(tableContainer);
  table.setAttribute("class", "table table-borderless table-striped");
  tableWrapper.appendChild(table);
  tableWrapper.setAttribute("class", "table-responsive");

  childElement = document.createElement("img");
  element      = document.createElement("div");

  childElement.setAttribute("class", "img-thumbnail mb-3");
  childElement.setAttribute("src", imageSrc);
  element.setAttribute("id", "item-" + imagesCounter);
  element.appendChild(childElement);
  container.appendChild(element);
  container.appendChild(tableWrapper);

  element = document.createElement("hr");

  element.setAttribute("class", "m-5");
  container.appendChild(element);
  document.getElementById("content").appendChild(container);

  WebDeveloper.Generated.addItem(WebDeveloper.Generated.formatURL(imageSrc), imagesCounter, documentCount + 1);
};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
  var container         = null;
  var contentDocument   = null;
  var documents         = data.documents;
  var imageDescription  = null;
  var images            = null;
  var imagesCounter     = 1;
  var imagesDescription = locale.images;
  var imagesLength      = null;

  WebDeveloper.Generated.emptyContent();
  WebDeveloper.Generated.initializeHeader(imagesDescription, data, locale);
  WebDeveloper.Generated.initializeSidebar(locale);

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument  = documents[i];
    imageDescription = imagesDescription.toLowerCase();
    images           = contentDocument.images;
    imagesLength     = images.length;

    // If there is only one image
    if(imagesLength == 1)
    {
      imageDescription = locale.image.toLowerCase();
    }

    WebDeveloper.Generated.addDocument(contentDocument.url, i, imageDescription, imagesLength, true);

    // If there are images
    if(imagesLength > 0)
    {
      container = WebDeveloper.Generated.generateDocumentContainer();

      // Loop through the images
      for(var j = 0; j < imagesLength; j++)
      {
        WebDeveloper.Generated.displayImage(images[j], container, i, imagesCounter, locale);

        imagesCounter++;
      }
    }
    else
    {
      WebDeveloper.Generated.addSeparator();
    }
  }

  WebDeveloper.Generated.initializeCommonElements();
};
