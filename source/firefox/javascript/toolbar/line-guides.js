var WebDeveloper = WebDeveloper || {};

WebDeveloper.LineGuides = WebDeveloper.LineGuides || {};

// Creates the line guides toolbar
WebDeveloper.LineGuides.createToolbar = function(contentDocument)
{
	document.getElementById("web-developer-line-guides-color").color = WebDeveloper.Preferences.getExtensionStringPreference("line.guides.color");

	WebDeveloper.Common.configureElement(document.getElementById("web-developer-line-guides-toolbar"), "hidden", false);
};

// Removes the line guides toolbar
WebDeveloper.LineGuides.removeToolbar = function(contentDocument)
{
	WebDeveloper.Common.configureElement(document.getElementById("web-developer-line-guides-toolbar"), "hidden", true);
};

// Updates the line guides color
WebDeveloper.LineGuides.updateColor = function()
{
	var color			 = document.getElementById("web-developer-line-guides-color").color;
	var lineGuides = WebDeveloper.Common.getContentDocument().querySelectorAll(".web-developer-line-guide div");

	// Loop through the line guides
	for(var i = 0, l = lineGuides.length; i < l; i++)
	{
		lineGuides[i].style.backgroundColor = color;
	}

	WebDeveloper.Preferences.setExtensionStringPreference("line.guides.color", color);
};
