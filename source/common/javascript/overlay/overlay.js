var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Common                 = WebDeveloper.Common || {};
WebDeveloper.Overlay                = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.animationSpeed = 100;

$(function()
{
  var displayOverlayWith = chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("display_overlay_with");
  var menu               = chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("menu");
  var notification       = $("#notification");

  WebDeveloper.Overlay.labelMenu($("#cookies-toolbar > a"), WebDeveloper.Locales.getString("cookies"), displayOverlayWith);
  WebDeveloper.Overlay.labelMenu($("#css-toolbar > a"), WebDeveloper.Locales.getString("css"), displayOverlayWith);
  WebDeveloper.Overlay.labelMenu($("#disable-toolbar > a"), WebDeveloper.Locales.getString("disable"), displayOverlayWith);
  WebDeveloper.Overlay.labelMenu($("#forms-toolbar > a"), WebDeveloper.Locales.getString("forms"), displayOverlayWith);
  WebDeveloper.Overlay.labelMenu($("#images-toolbar > a"), WebDeveloper.Locales.getString("images"), displayOverlayWith);
  WebDeveloper.Overlay.labelMenu($("#information-toolbar > a"), WebDeveloper.Locales.getString("information"), displayOverlayWith);
  WebDeveloper.Overlay.labelMenu($("#miscellaneous-toolbar > a"), WebDeveloper.Locales.getString("miscellaneous"), displayOverlayWith);
  WebDeveloper.Overlay.labelMenu($("#options-toolbar > a"), WebDeveloper.Locales.getString("options"), displayOverlayWith);
  WebDeveloper.Overlay.labelMenu($("#outline-toolbar > a"), WebDeveloper.Locales.getString("outline"), displayOverlayWith);
  WebDeveloper.Overlay.labelMenu($("#resize-toolbar > a"), WebDeveloper.Locales.getString("resize"), displayOverlayWith);
  WebDeveloper.Overlay.labelMenu($("#tools-toolbar > a"), WebDeveloper.Locales.getString("tools"), displayOverlayWith);

  // If the display overlay with setting is set to text
  if(displayOverlayWith == "text")
  {
    $(".nav-tabs").addClass("overlay-text");
  }

  // If the menu is not set
  if(!menu)
  {
    menu = $(".nav-tabs > li:visible:first").attr("id");
  }

  // If the menu is set
  if(menu)
  {
    $("a", $("#" + menu)).tab("show");
  }

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    var featuresOnTab = chrome.extension.getBackgroundPage().WebDeveloper.Storage.getFeaturesOnTab(tab.id);

    // If there are features on the tab
    if(featuresOnTab)
    {
      // Loop through the features on the tab
      for(var i = 0, l = featuresOnTab.length; i < l; i++)
      {
        $("#" + featuresOnTab[i]).addClass("active");
      }
    }
  });

  $("#confirmation-cancel").on("click", WebDeveloper.Overlay.closeConfirmation);
  $(".close", notification).on("click", WebDeveloper.Overlay.closeNotification);
  $(".help-inline").on("click", "a", WebDeveloper.Overlay.openURL);
  $("li", $(".nav-tabs")).on("click", WebDeveloper.Overlay.changeTab);
  $(notification).on("click", "a", WebDeveloper.Overlay.openURL);
});

// Displays a notification
WebDeveloper.Common.displayNotification = function(message, parameters)
{
  // If parameters are set
  if(parameters)
  {
    WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getFormattedString(message, parameters));
  }
  else
  {
    WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString(message));
  }
};

// Adds a feature on a tab
WebDeveloper.Overlay.addFeatureOnTab = function(featureItem, tab, scriptFile, scriptCode)
{
  WebDeveloper.Overlay.addScriptsToTab(tab, scriptFile, scriptCode, null);
};

// Adds a script to the tab
WebDeveloper.Overlay.addScriptToTab = function(tab, script, callback)
{
  chrome.tabs.executeScript(tab.id, script, callback);
};

// Adds scripts to the tab
WebDeveloper.Overlay.addScriptsToTab = function(tab, scriptFile, scriptCode, callback)
{
  WebDeveloper.Overlay.addScriptToTab(tab, { file: scriptFile }, function()
  {
    WebDeveloper.Overlay.addScriptToTab(tab, { code: scriptCode }, callback);
  });
};

// Handles a tab change
WebDeveloper.Overlay.changeTab = function()
{
  WebDeveloper.Overlay.closeNotification();

  chrome.extension.getBackgroundPage().WebDeveloper.Storage.setItem("menu", $(this).attr("id"));
};

// Closes the overlay
WebDeveloper.Overlay.close = function()
{
  window.close();
};

// Closes the confirmation
WebDeveloper.Overlay.closeConfirmation = function(event, callback)
{
  $("#confirmation").slideUp(WebDeveloper.Overlay.animationSpeed, callback);

  // If the event is set
  if(event)
  {
    event.preventDefault();
  }
};

// Closes the notification
WebDeveloper.Overlay.closeNotification = function(event, callback)
{
  $("#notification").slideUp(WebDeveloper.Overlay.animationSpeed, callback);

  // If the event is set
  if(event)
  {
    event.preventDefault();
  }
};

// Displays a confirmation
WebDeveloper.Overlay.displayConfirmation = function(title, message, buttonText, buttonIcon, callback)
{
  var confirmation = $("#confirmation");

  WebDeveloper.Overlay.closeConfirmation(null, function()
  {
    var buttonHTML = buttonText;

    // If the button icon is set
    if(buttonIcon)
    {
      buttonHTML = '<i class="icon-' + buttonIcon + '"></i> ' + buttonText;
    }

    $("span", confirmation).text(message);
    $("#confirmation-cancel").text(WebDeveloper.Locales.getString("cancel"));
    $(".btn-warning", confirmation).html(buttonHTML).off("click").on("click", callback);
    confirmation.slideDown(WebDeveloper.Overlay.animationSpeed);
  });
};

// Displays a notification
WebDeveloper.Overlay.displayNotification = function(message, type)
{
  var notification = $("#notification");

  // If the type is not specified
  if(!type)
  {
    type = "success";
  }

  WebDeveloper.Overlay.closeNotification(null, function()
  {
    notification.removeClass().addClass("alert alert-dismissable alert-" + type);
    $("span", notification).html(message);
    notification.slideDown(WebDeveloper.Overlay.animationSpeed);
  });
};

// Returns the selected tab
WebDeveloper.Overlay.getSelectedTab = function(callback)
{
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs)
  {
    callback(tabs[0]);
  });
};

// Returns the selected window
WebDeveloper.Overlay.getSelectedWindow = function(callback)
{
  chrome.windows.getCurrent(callback);
};

// Returns true if this is a valid tab
WebDeveloper.Overlay.isValidTab = function(tab)
{
  var url = tab.url;

  // If this is a chrome URL
  if(url.indexOf("chrome://") === 0 || url.indexOf("chrome-extension://") === 0)
  {
    WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("internalBrowserPagesError"), "danger");

    return false;
  }
  else if(url.indexOf("https://chrome.google.com/extensions/") === 0 || url.indexOf("https://chrome.google.com/webstore/") === 0)
  {
    WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("chromeExtensionGalleryError"), "danger");

    return false;
  }

  return true;
};

// Labels a menu
WebDeveloper.Overlay.labelMenu = function(menu, label, displayOverlayWith)
{
  // If the display overlay with setting is set to icons only
  if(displayOverlayWith == "icons")
  {
    menu.attr("title", label);
  }
  else
  {
    menu.append(label);
  }
};

// Handles any overlay messages
WebDeveloper.Overlay.message = function(message, sender, sendResponse)
{
  // If the message type is a notification
  if(message.type == "display-notification")
  {
    WebDeveloper.Common.displayNotification(message.message, message.parameters);
  }

  sendResponse({});
};

// Opens a tab to the URL
WebDeveloper.Overlay.openTab = function(tabURL)
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    chrome.tabs.create({ index: tab.index + 1, url: tabURL });

    WebDeveloper.Overlay.close();
  });
};

// Opens a URL from the overlay
WebDeveloper.Overlay.openURL = function(event)
{
  var href = $(this).attr("href");

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    chrome.tabs.create({ index: tab.index + 1, url: href });

    WebDeveloper.Overlay.close();
  });

  event.preventDefault();
};

// Sets a content setting
WebDeveloper.Overlay.setContentSetting = function(settingType, currentSetting, newSetting, menu, message)
{
  chrome.contentSettings[settingType].clear({}, function()
  {
    chrome.contentSettings[settingType].get({ primaryUrl: "http://*/*" }, function(details)
    {
      // If the setting is still set to the current setting
      if(details.setting == currentSetting)
      {
        chrome.contentSettings[settingType].set({ primaryPattern: "<all_urls>", setting: newSetting }, function()
        {
          WebDeveloper.Overlay.updateContentSettingMenu(menu, settingType);
          WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString(message));
        });
      }
      else
      {
        WebDeveloper.Overlay.updateContentSettingMenu(menu, settingType);
        WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString(message));
      }
    });
  });
};

// Toggles a content setting
WebDeveloper.Overlay.toggleContentSetting = function(settingType, menu, enableMessage, disableMessage)
{
  chrome.contentSettings[settingType].get({ primaryUrl: "http://*/*" }, function(details)
  {
    var currentSetting = details.setting;

    // If the setting is currently set to block
    if(currentSetting == "block")
    {
      WebDeveloper.Overlay.setContentSetting(settingType, currentSetting, "allow", menu, enableMessage);
    }
    else
    {
      WebDeveloper.Overlay.setContentSetting(settingType, currentSetting, "block", menu, disableMessage);
    }
  });
};

// Toggles a feature on a tab
WebDeveloper.Overlay.toggleFeatureOnTab = function(featureItem, tab, scriptFile, scriptCode, closeOverlay)
{
  var feature = featureItem.attr("id");

  WebDeveloper.Overlay.addScriptsToTab(tab, scriptFile, scriptCode, function()
  {
    chrome.extension.getBackgroundPage().WebDeveloper.Storage.toggleFeatureOnTab(feature, tab);

    featureItem.toggleClass("active");

    // If the overlay should be closed
    if(closeOverlay)
    {
      WebDeveloper.Overlay.close();
    }
  });
};

// Updates the menu
WebDeveloper.Overlay.updateContentSettingMenu = function(menu, settingType)
{
  // If content settings exists
  if(chrome.contentSettings)
  {
    chrome.contentSettings[settingType].get({ primaryUrl: "http://*/*" }, function(details)
    {
      // If the setting is currently set to block
      if(details.setting == "block")
      {
        menu.addClass("active");
      }
      else if(menu.hasClass("active"))
      {
        menu.removeClass("active");
      }
    });
  }
};

chrome.runtime.onMessage.addListener(WebDeveloper.Overlay.message);
