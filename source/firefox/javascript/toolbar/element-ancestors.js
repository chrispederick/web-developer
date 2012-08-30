var WebDeveloper = WebDeveloper || {};

WebDeveloper.ElementAncestors = WebDeveloper.ElementAncestors || {};

// Creates the element information toolbar
WebDeveloper.ElementAncestors.createToolbar = function()
{
  WebDeveloper.Common.configureElement(WebDeveloper.Common.getMainWindow().document.getElementById("web-developer-element-ancestors-toolbar"), "hidden", false);
};

// Displays the ancestors of an element
WebDeveloper.ElementAncestors.displayElementAncestors = function(element)
{
  var contentDocument = WebDeveloper.Common.getMainWindow().document.getElementById("web-developer-element-ancestors-browser").contentDocument;

  contentDocument.defaultView.WebDeveloper.Generated.populateAncestors(WebDeveloper.ElementAncestors.getAncestorInformation(element, contentDocument));
};

// Generates ancestor information for an element
WebDeveloper.ElementAncestors.generateAncestorInformation = function(element, contentDocument)
{
  var ancestorInformation = contentDocument.createElement("div");
  var buttonElement       = contentDocument.createElement("button");

  buttonElement.appendChild(contentDocument.createTextNode(WebDeveloper.Locales.getString("copyAncestorPath")));
  buttonElement.setAttribute("class", "btn btn-primary");
  buttonElement.setAttribute("id", "web-developer-copy-ancestor-path");
  ancestorInformation.appendChild(buttonElement);
  ancestorInformation.appendChild(WebDeveloper.ElementAncestors.getAncestorInformation(element, contentDocument));
  ancestorInformation.setAttribute("id", "web-developer-ancestors");

  return ancestorInformation;
};

// Removes the element information toolbar
WebDeveloper.ElementAncestors.removeToolbar = function()
{
  WebDeveloper.Common.configureElement(WebDeveloper.Common.getMainWindow().document.getElementById("web-developer-element-ancestors-toolbar"), "hidden", true);
};
