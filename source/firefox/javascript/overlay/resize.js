var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay				= WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Resize = WebDeveloper.Overlay.Resize || {};

// Resizes the window to a custom size
WebDeveloper.Overlay.Resize.customResizeWindow = function()
{
	var contentWindow = WebDeveloper.Common.getContentWindow();

	window.openDialog("chrome://web-developer/content/dialogs/resize-window.xul", "web-developer-resize-dialog", "centerscreen,chrome,modal", contentWindow.outerWidth, contentWindow.outerHeight, contentWindow.innerWidth, contentWindow.innerHeight);
};

// Displays the current window size
WebDeveloper.Overlay.Resize.displayWindowSize = function()
{
	var contentWindow = WebDeveloper.Common.getContentWindow();

	WebDeveloper.Common.displayNotification("displayWindowSizeResult", [contentWindow.outerWidth, contentWindow.outerHeight, contentWindow.innerWidth, contentWindow.innerHeight]);
};

// Displays the current window size in the title bar
WebDeveloper.Overlay.Resize.displayWindowSizeInTitle = function(element)
{
	var contentDocument = WebDeveloper.Common.getContentDocument();

	// If adding the window size to the title
	if(!WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")))
	{
		var contentWindow = WebDeveloper.Common.getContentWindow();

		contentDocument.title += " - " + contentWindow.outerWidth + "x" + contentWindow.outerHeight + " [" + contentWindow.innerWidth + "x" + contentWindow.innerHeight + "]";

		window.addEventListener("resize", WebDeveloper.Overlay.Resize.updateWindowSizeInTitle, false);
	}
	else
	{
		var title = contentDocument.title;

		contentDocument.title = title.substring(0, title.lastIndexOf(" - "));

		// Try to remove the event listener
		try
		{
			window.removeEventListener("resize", WebDeveloper.Overlay.Resize.updateWindowSizeInTitle, false);
		}
		catch(exception)
		{
			// Ignore
		}
	}

	WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Resizes the window or viewport to the given width and height
WebDeveloper.Overlay.Resize.resizeWindow = function(width, height, viewport)
{
	var windowX = window.screenX;
	var windowY = window.screenY;

	// If resizing the viewport
	if(viewport)
	{
		var contentWindow = WebDeveloper.Common.getContentWindow();

		contentWindow.innerHeight = height;
		contentWindow.innerWidth	= width;
	}
	else
	{
		window.resizeTo(width, height);
	}

	window.screenX = windowX;
	window.screenY = windowY;
};

// Updates the resize menu
WebDeveloper.Overlay.Resize.updateResizeMenu = function(menu, suffix)
{
	var contentWindow		= WebDeveloper.Common.getContentWindow();
	var description			= null;
	var height					= null;
	var key							= null;
	var menuItem				= document.createElement("menuitem");
	var modifiers				= null;
	var resizeSeparator	= document.getElementById("web-developer-resize-separator3-" + suffix);
	var viewport				= false;
	var viewportHeight	= contentWindow.innerHeight;
	var viewportWidth		= contentWindow.innerWidth;
	var width						= null;
	var windowHeight		= contentWindow.outerHeight;
	var windowWidth			= contentWindow.outerWidth;

	WebDeveloper.Overlay.configureFeatureElement("web-developer-display-window-size-title-command", "checked");
	WebDeveloper.Overlay.removeGeneratedMenuItems(menu);

	// Loop through the possible resize options
	for(var i = 1, l = WebDeveloper.Preferences.getExtensionIntegerPreference("resize.count"); i <= l; i++)
	{
		description = WebDeveloper.Preferences.getLocalizedPreference("resize." + i + ".description");
		height			= WebDeveloper.Preferences.getExtensionIntegerPreference("resize." + i + ".height");
		width				= WebDeveloper.Preferences.getExtensionIntegerPreference("resize." + i + ".width");

		// If the description, height and width are set
		if(description && height > 0 && width > 0)
		{
			key				= WebDeveloper.Preferences.getExtensionStringPreference("resize." + i + ".key");
			menuItem	= document.createElement("menuitem");
			modifiers = WebDeveloper.Preferences.getExtensionStringPreference("resize." + i + ".modifiers");
			viewport	= WebDeveloper.Preferences.getExtensionBooleanPreference("resize." + i + ".viewport");

			// If the resize attributes match the current size
			if((viewport && viewportWidth == width && viewportHeight == height) || (!viewport && windowWidth == width && windowHeight == height))
			{
				menuItem.setAttribute("checked", true);
			}

			menuItem.setAttribute("class", "web-developer-generated-menu");
			menuItem.setAttribute("label", description);
			menuItem.setAttribute("oncommand", "WebDeveloper.Overlay.Resize.resizeWindow(" + width + ", " + height + ", " + viewport + ")");
			menuItem.setAttribute("type", "radio");

			// If a key and modifiers are set
			if(key && modifiers)
			{
				menuItem.setAttribute("key", "web-developer-resize-" + i + "-key");
			}

			menu.insertBefore(menuItem, resizeSeparator);
		}
	}
};

// Updates the window size in the title bar
WebDeveloper.Overlay.Resize.updateWindowSizeInTitle = function()
{
	var contentDocument = WebDeveloper.Common.getContentDocument();
	var contentWindow		= WebDeveloper.Common.getContentWindow();
	var title						= contentDocument.title;

	contentDocument.title = title.substring(0, title.lastIndexOf(" - ")) + " - " + contentWindow.outerWidth + "x" + contentWindow.outerHeight + " [" + contentWindow.innerWidth + "x" + contentWindow.innerHeight + "]";
};

// Displays the responsive layouts for the page
WebDeveloper.Overlay.Resize.viewResponsiveLayouts = function()
{
	var data				= {};
	var description = null;
	var height			= null;
	var layout			= null;
	var width				= null;

	data.layouts = [];
	data.pageURL = WebDeveloper.Common.getTabBrowser().currentURI.spec;

	// Loop through the possible responsive options
	for(var i = 1, l = WebDeveloper.Preferences.getExtensionIntegerPreference("responsive.layout.count"); i <= l; i++)
	{
		description = WebDeveloper.Preferences.getLocalizedPreference("responsive.layout." + i + ".description");
		height			= WebDeveloper.Preferences.getExtensionIntegerPreference("responsive.layout." + i + ".height");
		width				= WebDeveloper.Preferences.getExtensionIntegerPreference("responsive.layout." + i + ".width");

		// If the description, height and width are set
		if(description && height > 0 && width > 0)
		{
			layout						 = {};
			layout.description = description;
			layout.height			 = height;
			layout.width			 = width;

			data.layouts.push(layout);
		}
	}

	WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-responsive-layouts.html"), data, WebDeveloper.Overlay.Resize.getViewResponsiveLayoutsLocale());
};
