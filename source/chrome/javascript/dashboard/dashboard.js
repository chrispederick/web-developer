var WebDeveloper = WebDeveloper || {};

WebDeveloper.Dashboard				= WebDeveloper.Dashboard || {};
WebDeveloper.Dashboard.resize	= false;

// Closes a dashboard tab
WebDeveloper.Dashboard.closeDashboardTab = function(tabId, contentDocument)
{
	var dashboardDocument = WebDeveloper.Dashboard.getDashboard(contentDocument).contentDocument;

	WebDeveloper.Common.removeMatchingElements("#" + tabId + "-panel, #" + tabId + "-tab", dashboardDocument);

	// If the last tab on the dashboard was closed
	if(dashboardDocument.querySelectorAll("#web-developer-dashboard-tabs > li").length === 0)
	{
		WebDeveloper.Dashboard.removeDashboard(contentDocument);
	}
};

// Create the dashboard
WebDeveloper.Dashboard.createDashboard = function(contentDocument, dashboardHTML)
{
	var dashboard					= contentDocument.createElement("iframe");
	var dashboardDocument = null;
	var resizer						= null;

	dashboard.setAttribute("id", "web-developer-dashboard");

	WebDeveloper.Common.getDocumentBodyElement(contentDocument).appendChild(dashboard);

	dashboardDocument														= dashboard.contentDocument;
	window.WebDeveloperEvents										= window.WebDeveloperEvents || {};
	window.WebDeveloperEvents.Dashboard					= window.WebDeveloperEvents.Dashboard || {};
	window.WebDeveloperEvents.Dashboard.mouseUp	= WebDeveloper.Dashboard.mouseUp;

	WebDeveloper.Common.toggleStyleSheet("dashboard/style-sheets/dashboard.css", "web-developer-dashboard-styles", contentDocument, false);
	WebDeveloper.Common.toggleStyleSheet("dashboard/style-sheets/common.css", "web-developer-dashboard-styles", dashboardDocument, false);

	WebDeveloper.Common.getDocumentBodyElement(dashboardDocument).innerHTML = dashboardHTML;

	WebDeveloper.Common.includeJavaScript("dashboard/javascript/html/dashboard.js", dashboardDocument);

	dashboardDocument.querySelector(".brand img").setAttribute("src", WebDeveloper.Common.getChromeURL("dashboard/images/logo.png"));

	resizer	= dashboardDocument.getElementById("web-developer-dashboard-resizer");

	contentDocument.addEventListener("mouseup", window.WebDeveloperEvents.Dashboard.mouseUp, false);
	dashboardDocument.addEventListener("mousemove", WebDeveloper.Dashboard.mouseMove, false);
	dashboardDocument.addEventListener("mouseup", WebDeveloper.Dashboard.mouseUp, false);
	resizer.addEventListener("mousedown", WebDeveloper.Dashboard.resizerMouseDown, false);

	// Get the dashboard templates
	chrome.extension.sendRequest({ "item": "dashboard_height", "type": "get-storage-item" }, function(response)
	{
		// If the dashboard height value was returned
		if(response.value)
		{
			dashboard.style.setProperty("height", response.value, "important");
		}
	});
};

// Returns the dashboard
WebDeveloper.Dashboard.getDashboard = function(contentDocument)
{
	return contentDocument.getElementById("web-developer-dashboard");
};

// Handles the mouse move event
WebDeveloper.Dashboard.mouseMove = function()
{
	// If resizing the dashboard
	if(WebDeveloper.Dashboard.resize)
	{
		var dashboard = WebDeveloper.Dashboard.getDashboard(WebDeveloper.Common.getContentDocument());
		var height		= (dashboard.offsetHeight - event.pageY) + "px";

		dashboard.style.setProperty("height", height, "important");

		WebDeveloper.EditCSS.resize(dashboard);
		WebDeveloper.ElementInformation.resize(dashboard);

		// Get the dashboard templates
		chrome.extension.sendRequest({ "item": "dashboard_height", "type": "set-storage-item", "value": height }, function(response)
		{
			// Ignore
		});
	}
};

// Handles the mouse up event
WebDeveloper.Dashboard.mouseUp = function()
{
	WebDeveloper.Dashboard.resize = false;
};

// Opens a dashboard tab
WebDeveloper.Dashboard.openDashboardTab = function(tabId, title, contentDocument, templates)
{
	var dashboard					= WebDeveloper.Dashboard.getDashboard(contentDocument);
	var dashboardDocument = null;
	var panels						= null;
	var tabs							= null;

	// If the dashboard does not already exist
	if(!dashboard)
	{
		WebDeveloper.Dashboard.createDashboard(contentDocument, templates.dashboard);

		dashboard = WebDeveloper.Dashboard.getDashboard(contentDocument);
	}

	dashboardDocument = dashboard.contentDocument;

	panels = dashboardDocument.getElementById("web-developer-dashboard-panels");
	tabs	 = dashboardDocument.getElementById("web-developer-dashboard-tabs");

	WebDeveloper.Common.removeClass(panels.querySelector(".active"), "active");
	WebDeveloper.Common.removeClass(tabs.querySelector(".active"), "active");

	WebDeveloper.Common.appendHTML(templates.panel, panels, dashboardDocument);
	WebDeveloper.Common.appendHTML(templates.tab, tabs, dashboardDocument);

	return dashboardDocument.getElementById(tabId + "-panel");
};

// Removes the dashboard
WebDeveloper.Dashboard.removeDashboard = function(contentDocument)
{
	WebDeveloper.Common.removeMatchingElements("#web-developer-dashboard", contentDocument);
	WebDeveloper.Common.toggleStyleSheet("dashboard/style-sheets/dashboard.css", "web-developer-dashboard-styles", contentDocument, false);

	contentDocument.removeEventListener("mouseup", window.WebDeveloperEvents.Dashboard.mouseUp, false);

	window.WebDeveloperEvents.Dashboard = null;
};

// Handles the resizer mouse down event
WebDeveloper.Dashboard.resizerMouseDown = function(event)
{
	// If the click was not a right click
	if(event.button != 2)
	{
		WebDeveloper.Dashboard.resize = true;
	}
};
