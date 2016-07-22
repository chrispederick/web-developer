var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Keyboard = WebDeveloper.Keyboard || {};

// Handles the keyboard dialog being accepted
WebDeveloper.Keyboard.accept = function()
{
  // If adding the keyboard shortcut
  if(window.arguments[0][0] == "add")
  {
    WebDeveloper.Preferences.setExtensionIntegerPreference("keyboard.count", window.arguments[0][1] + 1);
  }

  // If the extension is not running on a Mac
  if(!WebDeveloper.Common.isMac())
  {
    document.getElementById("web-developer-keyboard-dialog-pane").writePreferences();
  }
};

// Initializes the keyboard dialog
WebDeveloper.Keyboard.initialize = function()
{
  var position        = window.arguments[0][1] + 1;
  var preferences     = document.getElementById("web-developer-keyboard-preferences");
  var selectedFeature = null;

  WebDeveloper.Dialog.addPreference("webdeveloper.keyboard.feature", "extensions.webdeveloper.keyboard." + position + ".feature", "unichar", preferences);
  WebDeveloper.Dialog.addPreference("webdeveloper.keyboard.key", "extensions.webdeveloper.keyboard." + position + ".key", "wstring", preferences);
  WebDeveloper.Dialog.addPreference("webdeveloper.keyboard.modifiers", "extensions.webdeveloper.keyboard." + position + ".modifiers", "unichar", preferences);

  // If editing the keyboard shortcut
  if(window.arguments[0][0] == "edit")
  {
    selectedFeature = WebDeveloper.Preferences.getExtensionStringPreference("keyboard." + (window.arguments[0][1] + 1) + ".feature");
  }

  WebDeveloper.Keyboard.populateFeatures(selectedFeature);

  document.getElementById("web-developer-keyboard-alt-shift").setAttribute("label", WebDeveloper.Locales.getString("VK_ALT", "web-developer-platform-keys") + WebDeveloper.Locales.getString("MODIFIER_SEPARATOR", "web-developer-platform-keys") + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys"));
  document.getElementById("web-developer-keyboard-control-shift").setAttribute("label", WebDeveloper.Locales.getString("VK_CONTROL", "web-developer-platform-keys") + WebDeveloper.Locales.getString("MODIFIER_SEPARATOR", "web-developer-platform-keys") + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys"));
  document.getElementById("web-developer-keyboard-meta-shift").setAttribute("label", WebDeveloper.Locales.getString("VK_META", "web-developer-platform-keys") + WebDeveloper.Locales.getString("MODIFIER_SEPARATOR", "web-developer-platform-keys") + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys"));
};

// Populates the features
WebDeveloper.Keyboard.populateFeatures = function(selectedFeature)
{
  var feature        = null;
  var featureId      = null;
  var featureMenu    = document.getElementById("web-developer-keyboard-feature");
  var features       = WebDeveloper.Common.getMainWindow().document.querySelectorAll(".web-developer-feature-command");
  var sortedFeatures = [];

  // Loop through the features
  for(var i = 0, l = features.length; i < l; i++)
  {
    feature = features[i];

    sortedFeatures.push([WebDeveloper.Common.getFeatureId(feature.getAttribute("id")), feature.getAttribute("label")]);
  }

  sortedFeatures.sort(WebDeveloper.Keyboard.sortFeatures);

  // Loop through the sorted features
  for(i = 0, l = sortedFeatures.length; i < l; i++)
  {
    feature = sortedFeatures[i];
    featureId = feature[0];

    featureMenu.appendItem(feature[1], featureId);

    // If this is the selected feature
    if(selectedFeature == featureId)
    {
      featureMenu.selectedIndex = i;
    }
  }
};

// Sorts the features
WebDeveloper.Keyboard.sortFeatures = function(featureOne, featureTwo)
{
  return featureOne[1] > featureTwo[1];
};
