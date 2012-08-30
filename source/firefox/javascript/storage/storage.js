var WebDeveloper = WebDeveloper || {};

WebDeveloper.Storage              = WebDeveloper.Storage || {};
WebDeveloper.Storage.sessionStore = null;

// Deletes the features on a tab
WebDeveloper.Storage.deleteFeatures = function(tab)
{
  try
  {
    WebDeveloper.Storage.getSessionStore().deleteTabValue(tab, WebDeveloper.Storage.storageId);
  }
  catch(exception)
  {
    // Ignore
  }
};

// Gets the features on a tab
WebDeveloper.Storage.getFeatures = function(tab)
{
  var features = WebDeveloper.Storage.getSessionStore().getTabValue(tab, WebDeveloper.Storage.storageId);

  // If there are features
  if(features)
  {
    return features.split(",");
  }

  return null;
};

// Returns the session store
WebDeveloper.Storage.getSessionStore = function()
{
  // If the session store is not set
  if(!WebDeveloper.Storage.sessionStore)
  {
    // Try to set the session store
    try
    {
      WebDeveloper.Storage.sessionStore = Components.classes["@mozilla.org/browser/sessionstore;1"].getService(Components.interfaces.nsISessionStore);
    }
    catch(exception)
    {
      WebDeveloper.Storage.sessionStore = Components.classes["@mozilla.org/suite/sessionstore;1"].getService(Components.interfaces.nsISessionStore);
    }
  }

  return WebDeveloper.Storage.sessionStore;
};

// Returns true if any feature is active on the current tab
WebDeveloper.Storage.hasFeatures = function()
{
  // If there are features
  if(WebDeveloper.Storage.getFeatures(WebDeveloper.Common.getTabBrowser().selectedTab))
  {
    return true;
  }

  return false;
};

// Returns true if a feature is active on a tab
WebDeveloper.Storage.isFeatureActive = function(feature)
{
  return WebDeveloper.Common.inArray(feature, WebDeveloper.Storage.getFeatures(WebDeveloper.Common.getTabBrowser().selectedTab));
};

// Sets the features on a tab
WebDeveloper.Storage.setFeatures = function(features)
{
  WebDeveloper.Storage.getSessionStore().setTabValue(WebDeveloper.Common.getTabBrowser().selectedTab, WebDeveloper.Storage.storageId, features.join(","));
};

// Toggles a feature on a tab
WebDeveloper.Storage.toggleFeature = function(feature, tab)
{
  var features = null;
  var position = null;

  // If the tab is not set
  if(!tab)
  {
    tab = WebDeveloper.Common.getTabBrowser().selectedTab;
  }

  features = WebDeveloper.Storage.getFeatures(tab);
  position = WebDeveloper.Common.positionInArray(feature, features);

  // If the feature is not on the tab
  if(position == -1)
  {
    // If there are any features
    if(features)
    {
      features.push(feature);
    }
    else
    {
      features = [feature];
    }
  }
  else
  {
    features.splice(position, 1);
  }

  // If there are features
  if(features.length)
  {
    WebDeveloper.Storage.setFeatures(features);
  }
  else
  {
    WebDeveloper.Storage.deleteFeatures(tab);
  }
};
