var WebDeveloper = WebDeveloper || {};

WebDeveloper.Dashboard = WebDeveloper.Dashboard || {};

// Closes the given tab in the dashboard
WebDeveloper.Dashboard.closeDashboardTab = function(title)
{
	var i								 = 0;
	var l								 = 0;
	var tab							 = null;
	var tabBox					 = document.getElementById("web-developer-dashboard-tab-box");
	var tabElements			 = null;
	var selectedTab			 = tabBox.selectedTab;
	var selectedTabPanel = tabBox.selectedPanel;
	var tabPanels				 = document.getElementById("web-developer-dashboard-tab-panels");
	var tabs						 = document.getElementById("web-developer-dashboard-tabs");

	// If the title is set
	if(title)
	{
		tabElements = tabs.childNodes;

		// Loop through the tabs
		for(i = 0, l = tabElements.length; i < l; i++)
		{
			tab = tabElements.item(i);

			// If this is a tab and the tab has a matching label attribute
			if(tab.nodeName == "tab" && tab.hasAttribute("label") && tab.getAttribute("label") == title)
			{
				selectedTab			 = tab;
				selectedTabPanel = tabPanels.childNodes[i];

				break;
			}
		}
	}

	// If a selected tab panel is set, but not a selected tab
	if(selectedTabPanel && !selectedTab)
	{
		var counter								= 0;
		var selectedTabPanelIndex = 0;
		var tabPanel							= null;
		var tabPanelElements			= tabPanels.childNodes;

		tabElements = tabs.childNodes;

		// Loop through the tab panels
		for(i = 0, l = tabPanelElements.length; i < l; i++)
		{
			tabPanel = tabPanelElements.item(i);

			// If this is the selected tab
			if(tabPanel == selectedTabPanel)
			{
				break;
			}

			selectedTabPanelIndex++;
		}

		// Loop through the tabs
		for(i = 0, l = tabElements.length; i < l; i++)
		{
			tab = tabElements.item(i);

			// If this is a tab and the tab has a matching label attribute
			if(tab.nodeName == "tab" && counter == selectedTabPanelIndex)
			{
				selectedTab = tab;

				break;
			}

			counter++;
		}
	}

	// If a selected tab and tab panel are set
	if(selectedTab && selectedTabPanel)
	{
		tabPanels.removeChild(selectedTabPanel);
		tabs.removeChild(selectedTab);

		// If there are no tab panels remaining
		if(tabPanels.childNodes.length === 0)
		{
			document.getElementById("web-developer-dashboard").hidden					 = true;
			document.getElementById("web-developer-dashboard-splitter").hidden = true;
		}
		else
		{
			tabs.selectedIndex = 0;
		}
	}
};

// Is the given tab open in the dashboard
WebDeveloper.Dashboard.isOpenInDashboard = function(title)
{
	var tab  = null;
	var tabs = document.getElementById("web-developer-dashboard-tabs").childNodes;

	// Loop through the tabs
	for(var i = 0, l = tabs.length; i < l; i++)
	{
		tab = tabs.item(i);

		// If this is a tab and it has a matching label attribute
		if(tab.nodeName == "tab" && tab.hasAttribute("label") && tab.getAttribute("label") == title)
		{
			return true;
		}
	}

	return false;
};

// Moves the dashboard
WebDeveloper.Dashboard.moveDashboard = function(position)
{
	// If the position is not the current position
	if(position !== WebDeveloper.Preferences.getExtensionStringPreference("dashboard.position"))
	{
		WebDeveloper.Preferences.setExtensionStringPreference("dashboard.position", position);
		WebDeveloper.Dashboard.positionDashboard();
	}
};

// Opens the given URL in the dashboard
WebDeveloper.Dashboard.openInDashboard = function(title, url)
{
	var browser		= document.createElement("browser");
	var tab				= document.createElement("tab");
	var tabCount	= 0;
	var tabPanel	= document.createElement("tabpanel");
	var tabPanels = document.getElementById("web-developer-dashboard-tab-panels");
	var tabs			= document.getElementById("web-developer-dashboard-tabs");

	browser.setAttribute("type", "content");
	browser.setAttribute("flex", "1");
	browser.setAttribute("src", url);
	tabPanel.appendChild(browser);
	tab.setAttribute("label", title);

	tabPanels.appendChild(tabPanel);
	tabs.insertBefore(tab, document.getElementById("web-developer-dashboard-flex-spacer"));

	tabCount					 = tabPanels.childNodes.length - 1;
	tabs.selectedIndex = tabCount;

	// If this is the only tab
	if(tabCount === 0)
	{
		var dashboard = document.getElementById("web-developer-dashboard");

		WebDeveloper.Dashboard.positionDashboard();

		// If the dashboard height is less than 100
		if(dashboard.height < 200)
		{
			dashboard.height = 200;
		}

		// If the dashboard width is less than 100
		if(dashboard.width < 200)
		{
			dashboard.width = 200;
		}

		dashboard.hidden																									 = false;
		document.getElementById("web-developer-dashboard-splitter").hidden = false;
	}
};

// Positions the dashboard
WebDeveloper.Dashboard.positionDashboard = function()
{
	var appContent				= document.getElementById("appcontent");
	var dashboard					= document.getElementById("web-developer-dashboard");
	var dashboardSplitter = document.getElementById("web-developer-dashboard-splitter");
	var position					= WebDeveloper.Preferences.getExtensionStringPreference("dashboard.position");

	// If the dashboard should be positioned at the bottom
	if(position == "bottom")
	{
		appContent.appendChild(dashboardSplitter);
		appContent.appendChild(dashboard);
	}
	else if(position == "left")
	{
		var browser = appContent.parentNode;

		browser.insertBefore(dashboard, appContent);
		browser.insertBefore(dashboardSplitter, appContent);
	}
	else if(position == "right")
	{
		WebDeveloper.Common.insertAfter(dashboard, appContent);
		WebDeveloper.Common.insertAfter(dashboardSplitter, appContent);
	}
	else if(position == "top")
	{
		WebDeveloper.Common.insertAsFirstChild(appContent, dashboardSplitter);
		WebDeveloper.Common.insertAsFirstChild(appContent, dashboard);
	}

	// If the dashboard is positioned at the bottom or top
	if(position == "bottom" || position == "top")
	{
		dashboardSplitter.setAttribute("orient", "vertical");
	}
	else if(position == "left" || position == "right")
	{
		dashboardSplitter.setAttribute("orient", "horizontal");
	}

	dashboardSplitter.setAttribute("class", position);
};

// Updates the move menu
WebDeveloper.Dashboard.updateMoveMenu = function()
{
	var menu = document.getElementById("web-developer-move-dashboard-" + WebDeveloper.Preferences.getExtensionStringPreference("dashboard.position"));

	// If the menu is set
	if(menu)
	{
		menu.setAttribute("checked", true);
	}
};
