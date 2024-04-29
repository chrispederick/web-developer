var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Storage           = WebDeveloper.Storage || {};
WebDeveloper.Storage.storageId = "web-developer";

// Clears the features on a tab
WebDeveloper.Storage.clearTabFeatures = function(tabProperties, tabId, updateBadgeText)
{
  // If there are no tab properties, no status or the status is loading
  if(!tabProperties || !tabProperties.status || tabProperties.status == "loading")
  {
    WebDeveloper.Storage.removeItem(tabId);

    // If the badge text should be updated
    if(updateBadgeText)
    {
      WebDeveloper.Storage.updateBadgeText(tabId);
    }
  }
};

// Returns the list of features on a tab
WebDeveloper.Storage.getFeaturesOnTab = function(tabId, callback)
{
  WebDeveloper.Storage.getItem(tabId, function(featuresOnTab)
  {
    // If there are features on the tab
    if(featuresOnTab)
    {
      callback(featuresOnTab.split(","));
    }
    else
    {
      callback(null);
    }
  });
};

// Returns an item
WebDeveloper.Storage.getItem = function(item, callback)
{
  chrome.storage.local.get(item.toString(), function(storageItem)
  {
    // If the item was found
    if(item in storageItem)
    {
      callback(storageItem[item]);
    }
    else
    {
      callback(null);
    }
  });
};

// Returns multiple items
WebDeveloper.Storage.getItems = function(items, callback)
{
  chrome.storage.local.get(items, function(storageItems)
  {
    callback(storageItems);
  });
};

// Returns true if a feature is on a tab
WebDeveloper.Storage.isFeatureOnTab = function(feature, tab, callback)
{
  var isFeatureOnTab = false;
  var tabId          = tab.id;

  WebDeveloper.Storage.getItem(tabId, function(featuresOnTab)
  {
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
          isFeatureOnTab = true;
        }
      }
    }

    callback(isFeatureOnTab);
  });
};

// Removes an item
WebDeveloper.Storage.removeItem = function(item)
{
  chrome.storage.local.remove(item.toString());
};

// Sets an item
WebDeveloper.Storage.setItem = function(item, value, callback)
{
  var storageItem = {};

  storageItem[item] = value;

  chrome.storage.local.set(storageItem, callback);
};

// Sets an item if it is not already set
WebDeveloper.Storage.setItemIfNotSet = function(item, value)
{
  WebDeveloper.Storage.getItem(item, function(existingItem)
  {
    // If the item is not already set
    if(!existingItem)
    {
      WebDeveloper.Storage.setItem(item, value);
    }
  });
};

// Handles a tab being activated
WebDeveloper.Storage.tabActivated = function(tabInfo)
{
  WebDeveloper.Storage.updateBadgeText(tabInfo.tabId);
};

// Handles a tab being removed
WebDeveloper.Storage.tabRemoved = function(tabId, properties)
{
  WebDeveloper.Storage.clearTabFeatures(properties, tabId, false);
};

// Handles a tab updating
WebDeveloper.Storage.tabUpdated = function(tabId, properties)
{
  WebDeveloper.Storage.clearTabFeatures(properties, tabId, true);
};

// Toggles a feature on a tab
WebDeveloper.Storage.toggleFeatureOnTab = function(feature, tab, callback)
{
  var featureTabId = tab.id;

  WebDeveloper.Storage.getItem(featureTabId, function(currentFeaturesOnTab)
  {
    var newFeaturesOnTab = null;

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
        newFeaturesOnTab = currentFeaturesOnTab + "," + feature;
      }
    }
    else
    {
      newFeaturesOnTab = feature;
    }

    WebDeveloper.Storage.setItem(featureTabId, newFeaturesOnTab, callback);
    WebDeveloper.Storage.updateBadgeText(featureTabId);
  });
};

// Updates the badge text for a tab
WebDeveloper.Storage.updateBadgeText = function(featureTabId)
{
  var badgeText    = "";
  var badgeTooltip = "@name@";

  WebDeveloper.Storage.getFeaturesOnTab(featureTabId, function(featuresOnTab)
  {
    // If there are features on the tab
    if(featuresOnTab)
    {
      var featureCount       = featuresOnTab.length;
      var featureDescription = "features";

      // If there is only one feature count
      if(featureCount == 1)
      {
        featureDescription = "feature";
      }

      badgeText     = featureCount.toString();
      badgeTooltip += "\n" + badgeText + " active " + featureDescription + " on this tab";
    }

    chrome.action.setBadgeText({ text: badgeText, tabId: featureTabId });
    chrome.action.setTitle({ title: badgeTooltip, tabId: featureTabId });
  });
};

chrome.tabs.onActivated.addListener(WebDeveloper.Storage.tabActivated);
chrome.tabs.onRemoved.addListener(WebDeveloper.Storage.tabRemoved);
chrome.tabs.onUpdated.addListener(WebDeveloper.Storage.tabUpdated);

chrome.action.setBadgeBackgroundColor({ color: [0, 200, 0, 255] });
