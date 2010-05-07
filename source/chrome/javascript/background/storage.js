WebDeveloper.Storage = {};

// Clears the features on a tab
WebDeveloper.Storage.clearTabFeatures = function(featureTabId)
{
	window.localStorage.removeItem(featureTabId);
		
	WebDeveloper.Storage.updateBadgeText(featureTabId);
};

// Returns the list of features on a tab
WebDeveloper.Storage.getFeaturesOnTab = function(tabId)
{
	var featuresOnTab = window.localStorage.getItem(tabId);

	// If there are features on the tab
	if(featuresOnTab)
	{
		return featuresOnTab.split(",");
	}

	return null;
};

// Returns the open menu
WebDeveloper.Storage.getMenu = function()
{
	return window.localStorage.getItem("menu");
};

// Returns true if a feature is on a tab
WebDeveloper.Storage.isFeatureOnTab = function(feature, tab)
{
	var tabId				  = tab.id;
	var featuresOnTab = window.localStorage.getItem(tabId);

	// If there are features on the tab
	if(featuresOnTab)
	{
		var featuresOnTabArray = featuresOnTab.split(",");
		
		// Loop through the features on the tab
		for(var i = 0, l = featuresOnTabArray.length; i < l; i++)
		{
			// If the feature is on the tab
			if(featuresOnTabArray[i] == feature)
			{
				return true;
			}
		}
	}

	return false;
};

// Handles a tab selection changing
WebDeveloper.Storage.tabSelectionChanged = function(tabId, selectInfo)
{
	WebDeveloper.Storage.updateBadgeText(tabId);
};

// Handles a tab updating
WebDeveloper.Storage.tabUpdated = function(tabId, properties)
{
	// If there are no properties or the status is loading
	if(!properties || properties.status == "loading") 
	{ 
		WebDeveloper.Storage.clearTabFeatures(tabId); 
	}
};

// Toggles a feature on a tab
WebDeveloper.Storage.toggleFeatureOnTab = function(feature, tab)
{
	var featureTabId				 = tab.id;
	var currentFeaturesOnTab = window.localStorage.getItem(featureTabId);
	var newFeaturesOnTab		 = null;
	
	// If there are features on the tab
	if(currentFeaturesOnTab)
	{
		var featureOnTab = false;
		
		newFeaturesOnTab = currentFeaturesOnTab.split(",");
		
		// Loop through the features on the tab
		for(var i = 0, l = newFeaturesOnTab.length; i < l; i++)
		{
			// If the feature is on the tab
			if(newFeaturesOnTab[i] == feature)
			{
				featureOnTab = true;
				
				newFeaturesOnTab.splice(i, 1);
			}
		}
		
		// If the feature is on the tab
		if(featureOnTab)
		{
			newFeaturesOnTab = newFeaturesOnTab.join(",");
		}
		else
		{
			newFeaturesOnTab = currentFeaturesOnTab + feature + ",";
		}
	}
	else
	{
		newFeaturesOnTab = feature + ",";
	}

	window.localStorage.setItem(featureTabId, newFeaturesOnTab);

	WebDeveloper.Storage.updateBadgeText(featureTabId);
};

// Toggles a menu
WebDeveloper.Storage.toggleMenu = function(menu)
{
	var currentMenu = window.localStorage.getItem("menu");
	
	// If the current menu is set and is the menu
	if(currentMenu && currentMenu == menu)
	{
		 window.localStorage.removeItem("menu");
	}
	else
	{
		 window.localStorage.setItem("menu", menu);
	}
};

// Updates the badge text for a tab
WebDeveloper.Storage.updateBadgeText = function(featureTabId)
{
	var badgeText			= "";
	var badgeTooltip	= "@name@";
	var featuresOnTab = WebDeveloper.Storage.getFeaturesOnTab(featureTabId);

	// If there are features on the tab
	if(featuresOnTab)
	{
		var featureCount			 = featuresOnTab.length - 1;
		var featureDescription = "features";
	
		// If there is only one feature count
		if(featureCount == 1)
		{
			featureDescription = "feature";
		}

		badgeText			= featureCount.toString();
		badgeTooltip += "\n" + badgeText + " active " + featureDescription + " on this tab";
	}

	chrome.browserAction.setBadgeText({ text: badgeText, tabId: featureTabId });
	chrome.browserAction.setTitle({ title: badgeTooltip, tabId: featureTabId });
};

chrome.tabs.onRemoved.addListener(WebDeveloper.Storage.tabUpdated);
chrome.tabs.onSelectionChanged.addListener(WebDeveloper.Storage.tabSelectionChanged);
chrome.tabs.onUpdated.addListener(WebDeveloper.Storage.tabUpdated);

chrome.browserAction.setBadgeBackgroundColor({ color: [0, 200, 0, 255] });
