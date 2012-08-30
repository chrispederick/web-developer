var WebDeveloper = WebDeveloper || {};

WebDeveloper.LineGuides = WebDeveloper.LineGuides || {};

// Creates the line guides events
WebDeveloper.LineGuides.createEvents = function(contentDocument)
{
  contentDocument.addEventListener("mousemove", WebDeveloper.LineGuides.mouseMove, false);
  contentDocument.addEventListener("resize", WebDeveloper.LineGuides.resize, false);
};

// Creates the line guides toolbar
WebDeveloper.LineGuides.createToolbar = function()
{
  document.getElementById("web-developer-line-guides-color").color = WebDeveloper.Preferences.getExtensionStringPreference("line.guides.color");

  WebDeveloper.Common.configureElement(document.getElementById("web-developer-line-guides-toolbar"), "hidden", false);
};

// Returns the line guides color
WebDeveloper.LineGuides.getColor = function()
{
  return WebDeveloper.Preferences.getExtensionStringPreference("line.guides.color");
};

// Hides the line guide information
WebDeveloper.LineGuides.hideInformation = function()
{
  document.getElementById("web-developer-line-guides-information").hidden = true;
};

// Removes the line guides events
WebDeveloper.LineGuides.removeEvents = function(contentDocument)
{
  contentDocument.removeEventListener("mousemove", WebDeveloper.LineGuides.moveLineGuide, false);
  contentDocument.removeEventListener("resize", WebDeveloper.LineGuides.resizeLineGuides, false);
};

// Removes the line guides toolbar
WebDeveloper.LineGuides.removeToolbar = function()
{
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-line-guides-toolbar"), "hidden", true);
};

// Updates the line guides color
WebDeveloper.LineGuides.updateColor = function()
{
  var color      = document.getElementById("web-developer-line-guides-color").color;
  var lineGuides = WebDeveloper.Common.getContentDocument().querySelectorAll(".web-developer-line-guide div");

  // Loop through the line guides
  for(var i = 0, l = lineGuides.length; i < l; i++)
  {
    lineGuides[i].style.backgroundColor = color;
  }

  WebDeveloper.Preferences.setExtensionStringPreference("line.guides.color", color);
};

// Updates the line guide information
WebDeveloper.LineGuides.updateInformation = function(position, previousPosition, nextPosition)
{
  document.getElementById("web-developer-line-guide-position").value          = position + "px";
  document.getElementById("web-developer-next-line-guide-position").value     = nextPosition + "px";
  document.getElementById("web-developer-previous-line-guide-position").value = previousPosition + "px";
  document.getElementById("web-developer-line-guides-information").hidden     = false;
};
