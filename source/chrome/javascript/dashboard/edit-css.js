var WebDeveloper = WebDeveloper || {};

WebDeveloper.EditCSS = WebDeveloper.EditCSS || {};

// Adds a tab
WebDeveloper.EditCSS.addTab = function(title, css, tabs, panels, position, contentDocument)
{
	var active = "";

	if(position == 1)
	{
		active = "active";
	}

	// Get the edit CSS tab templates
	chrome.extension.sendRequest({ "active": active, "css": css, "position": position, "title": title, "type": "get-edit-css-tab-templates" }, function(response)
	{
		WebDeveloper.Common.appendHTML(response.panel, panels, contentDocument);
		WebDeveloper.Common.appendHTML(response.tab, tabs, contentDocument);
	});
};

// Applies the CSS
WebDeveloper.EditCSS.apply = function()
{
	WebDeveloper.EditCSS.applyCSS();
};

// Edits the CSS of the page
WebDeveloper.EditCSS.editCSS = function(edit, contentDocument, locale)
{
	// If editing the CSS
	if(edit)
	{
		WebDeveloper.EditCSS.loadDashboardTemplates(contentDocument, locale);
	}
	else
	{
		WebDeveloper.EditCSS.stopUpdate();
		WebDeveloper.EditCSS.resetDocument(contentDocument);
		WebDeveloper.Dashboard.closeDashboardTab("edit-css", contentDocument);
	}
};

// Returns the styles containers
WebDeveloper.EditCSS.getStylesContainers = function()
{
	var dashboard				 = WebDeveloper.Dashboard.getDashboard(WebDeveloper.Common.getContentDocument());
	var stylesContainers = [];

	// If the dashboard was found
	if(dashboard)
	{
		stylesContainers = dashboard.contentDocument.getElementById("edit-css-panel").getElementsByTagName("textarea");
	}

	return stylesContainers;
};

// Returns the styles in a container
WebDeveloper.EditCSS.getStylesFromContainer = function(stylesContainer)
{
	return stylesContainer.value;
};

// Loads the dashboard templates
WebDeveloper.EditCSS.loadDashboardTemplates = function(contentDocument, locale)
{
	// Get the dashboard templates
	chrome.extension.sendRequest({ "dashboardTitle": locale.dashboardTitle, "tabId": "edit-css", "title": locale.editCSS, "type": "get-edit-css-dashboard-templates" }, function(response)
	{
		// If the dashboard template was returned - sometimes this fails
		if(response.dashboard)
		{
			var dashboardPanel = WebDeveloper.Dashboard.openDashboardTab("edit-css", locale.editCSS, contentDocument, response);

			WebDeveloper.EditCSS.retrieveCSS(contentDocument, dashboardPanel, response.editCSS, locale);
			WebDeveloper.CSS.toggleAllStyleSheets(true, contentDocument);
			WebDeveloper.EditCSS.update(contentDocument);
		}
		else
		{
			WebDeveloper.EditCSS.loadDashboardTemplates(contentDocument, locale);
		}
	});
};

// Resizes the edit CSS elements
WebDeveloper.EditCSS.resize = function(dashboard)
{
	var editCSSPanels	= dashboard.contentDocument.getElementById("web-developer-edit-css-panels");

	// If the edit CSS panels exist
	if(editCSSPanels)
	{
		editCSSPanels.style.height = (dashboard.offsetHeight - editCSSPanels.offsetTop - 1) + "px";
	}
};

// Retrieves the CSS for the document
WebDeveloper.EditCSS.retrieveCSS = function(contentDocument, dashboardPanel, editCSSPanel, locale)
{
	var documentCSS	= WebDeveloper.Content.getDocumentCSS(contentDocument);

	dashboardPanel.innerHTML = editCSSPanel;

	// Get the style sheet content
	chrome.extension.sendRequest({ "errorMessage": "/* " + locale.couldNotLoadCSS + " */", "type": "get-url-contents", "urls": documentCSS.styleSheets }, function(response)
	{
		var dashboardDocument = WebDeveloper.Dashboard.getDashboard(contentDocument).contentDocument;
		var panels						= dashboardDocument.getElementById("web-developer-edit-css-panels");
		var position					= 1;
		var styleSheet				= null;
		var tabs							= dashboardDocument.getElementById("web-developer-edit-css-tabs");

		// Loop through the style sheets
		for(var i = 0, l = response.length; i < l; i++)
		{
			styleSheet = response[i];

			WebDeveloper.EditCSS.addTab(WebDeveloper.Dashboard.formatURL(styleSheet.url), styleSheet.content, tabs, panels, position, dashboardDocument);

			position++;
		}

		// If there are embedded styles
		if(documentCSS.embedded)
		{
			WebDeveloper.EditCSS.addTab(locale.embeddedStyles, documentCSS.embedded, tabs, panels, position, dashboardDocument);
		}

		// If there is no CSS
		if(!documentCSS.styleSheets.length && !documentCSS.embedded)
		{
			WebDeveloper.EditCSS.addTab(locale.editCSS, "", tabs, panels, position, dashboardDocument);
		}

		window.setTimeout(function() { WebDeveloper.EditCSS.resize(WebDeveloper.Dashboard.getDashboard(contentDocument)); }, 100);
	});
};
