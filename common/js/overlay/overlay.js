var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Common                 = WebDeveloper.Common || {};
WebDeveloper.Overlay                = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.animationSpeed = 100;

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
WebDeveloper.Overlay.addFeatureOnTab = function(featureItem, tab, scriptFiles, scriptCode, args)
{
  WebDeveloper.Overlay.addScriptsToTab(tab, scriptFiles, scriptCode, args, null);
};

// Adds a script to the tab
WebDeveloper.Overlay.addScriptToTab = function(tab, scriptCode, callback)
{
  chrome.scripting.executeScript({ target: { tabId: tab.id }, func: scriptCode }).then(callback);
};

// Adds scripts to the tab
WebDeveloper.Overlay.addScriptsToTab = function(tab, scriptFiles, scriptCode, args, callback)
{
  // If the script file is not an array
  if(!Array.isArray(scriptFiles))
  {
    scriptFiles = [scriptFiles];
  }

  chrome.scripting.executeScript({ target: { tabId: tab.id }, files: scriptFiles }).then(() =>
    chrome.scripting.executeScript({ target: { tabId: tab.id }, func: scriptCode, args: args }).then(callback)
  );
};

// Handles a tab change
WebDeveloper.Overlay.changeTab = function(event)
{
  var eventTarget = event.target;

  // If the event target is a nav link
  if(eventTarget && eventTarget.classList.contains("nav-link"))
  {
    WebDeveloper.Overlay.closeConfirmation();
    WebDeveloper.Overlay.closeNotification();
    WebDeveloper.Overlay.Cookies.cancelAddCookie();
    WebDeveloper.Overlay.Resize.cancelResizeWindow();

    WebDeveloper.Storage.setItem("menu", eventTarget.parentElement.getAttribute("id"));
  }
};

// Closes the overlay
WebDeveloper.Overlay.close = function()
{
  window.close();
};

// Closes the confirmation
WebDeveloper.Overlay.closeConfirmation = function()
{
  document.getElementById("confirmation").classList.add("d-none");
};

// Closes the notification
WebDeveloper.Overlay.closeNotification = function()
{
  document.getElementById("notification").classList.add("d-none");
};

// Displays a confirmation
WebDeveloper.Overlay.displayConfirmation = function(title, message, buttonText, buttonIcon, callback)
{
  var buttonHTML   = buttonText;
  var confirmation = document.getElementById("confirmation");
  var button       = confirmation.querySelector(".btn-warning");

  // If the button icon is set
  if(buttonIcon)
  {
    buttonHTML = '<svg class="bi me-1"><use href="/svg/icons/icons.svg#' + buttonIcon + '"></svg>' + buttonText;
  }

  WebDeveloper.Overlay.closeNotification();

  // Removes any old event listeners
  button.replaceWith(button.cloneNode(true));

  button = confirmation.querySelector(".btn-warning");

  button.replaceChildren();
  button.insertAdjacentHTML("beforeend", buttonHTML);
  confirmation.querySelector("span").replaceChildren(message);
  confirmation.classList.remove("d-none");

  button.addEventListener("click", function()
  {
    callback();
    WebDeveloper.Overlay.closeConfirmation();
  });
};

// Displays a notification
WebDeveloper.Overlay.displayNotification = function(message, type)
{
  var notification = document.getElementById("notification");
  var span         = notification.querySelector("span");

  // If the type is not specified
  if(!type)
  {
    type = "success";
  }

  span.replaceChildren();
  span.insertAdjacentHTML("beforeend", DOMPurify.sanitize(message));
  notification.classList.remove("alert-danger", "alert-info", "alert-success", "alert-warning", "d-none");
  notification.classList.add("alert-" + type);
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

// Initializes the overlay
WebDeveloper.Overlay.initialize = function()
{
  var confirmationCancel = document.getElementById("confirmation-cancel");

  WebDeveloper.Storage.getItem("display_overlay_with", function(displayOverlayWith)
  {
    WebDeveloper.Overlay.labelMenu(document.querySelector("#cookies-toolbar > a"), WebDeveloper.Locales.getString("cookies"), displayOverlayWith);
    WebDeveloper.Overlay.labelMenu(document.querySelector("#css-toolbar > a"), WebDeveloper.Locales.getString("css"), displayOverlayWith);
    WebDeveloper.Overlay.labelMenu(document.querySelector("#disable-toolbar > a"), WebDeveloper.Locales.getString("disable"), displayOverlayWith);
    WebDeveloper.Overlay.labelMenu(document.querySelector("#forms-toolbar > a"), WebDeveloper.Locales.getString("forms"), displayOverlayWith);
    WebDeveloper.Overlay.labelMenu(document.querySelector("#images-toolbar > a"), WebDeveloper.Locales.getString("images"), displayOverlayWith);
    WebDeveloper.Overlay.labelMenu(document.querySelector("#information-toolbar > a"), WebDeveloper.Locales.getString("information"), displayOverlayWith);
    WebDeveloper.Overlay.labelMenu(document.querySelector("#miscellaneous-toolbar > a"), WebDeveloper.Locales.getString("miscellaneous"), displayOverlayWith);
    WebDeveloper.Overlay.labelMenu(document.querySelector("#options-toolbar > a"), WebDeveloper.Locales.getString("options"), displayOverlayWith);
    WebDeveloper.Overlay.labelMenu(document.querySelector("#outline-toolbar > a"), WebDeveloper.Locales.getString("outline"), displayOverlayWith);
    WebDeveloper.Overlay.labelMenu(document.querySelector("#resize-toolbar > a"), WebDeveloper.Locales.getString("resize"), displayOverlayWith);
    WebDeveloper.Overlay.labelMenu(document.querySelector("#tools-toolbar > a"), WebDeveloper.Locales.getString("tools"), displayOverlayWith);

    // If the display overlay with setting is set to text
    if(displayOverlayWith == "text")
    {
      document.querySelector(".nav-tabs").classList.add("overlay-text");
    }
  });

  WebDeveloper.Storage.getItem("menu", function(menu)
  {
    // If the menu is not set
    if(!menu)
    {
      // Default to the cookies toolbar since disable is not available on all browsers
      menu = "cookies-toolbar";
    }

    // If the menu is set
    if(menu)
    {
      bootstrap.Tab.getOrCreateInstance(document.querySelector("#" + menu + " > a")).show();
    }
  });

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    WebDeveloper.Storage.getFeaturesOnTab(tab.id, function(featuresOnTab)
    {
      // If there are features on the tab
      if(featuresOnTab)
      {
        // Loop through the features on the tab
        for(var i = 0, l = featuresOnTab.length; i < l; i++)
        {
          document.getElementById(featuresOnTab[i]).classList.add("active");
        }
      }
    });
  });

  confirmationCancel.append(WebDeveloper.Locales.getString("cancel"));

  confirmationCancel.addEventListener("click", WebDeveloper.Overlay.closeConfirmation);
  document.getElementById("notification-close").addEventListener("click", WebDeveloper.Overlay.closeNotification);
  document.querySelector(".container-fluid").addEventListener("click", WebDeveloper.Overlay.openURL);
  document.querySelector(".nav-tabs").addEventListener("click", WebDeveloper.Overlay.changeTab);
};

// Returns true if this is a valid tab
WebDeveloper.Overlay.isValidTab = function(tab)
{
  var url = tab.url;

  // If this is a chrome URL
  if(url.indexOf("chrome://") === 0 || url.indexOf("chrome-extension://") === 0 || url.indexOf("moz-extension://") === 0)
  {
    WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("internalBrowserPagesError"), "danger");

    return false;
  }
  else if(url.indexOf("https://addons.mozilla.org/") === 0 || url.indexOf("https://chrome.google.com/extensions/") === 0 || url.indexOf("https://chrome.google.com/webstore/") === 0 || url.indexOf("https://chromewebstore.google.com/") === 0)
  {
    WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("extensionGalleryError"), "danger");

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
    menu.setAttribute("title", label);
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

    // No response required
    sendResponse({});
  }

  return true;
};

// Opens a generated tab
WebDeveloper.Overlay.openGeneratedTab = function(tabURL, tabIndex, data, locale)
{
  // Need to clone the data and locale to workaround Firefox dead object memory clean up
  var generatedData   = JSON.parse(JSON.stringify(data));
  var generatedLocale = JSON.parse(JSON.stringify(locale));
  var newTabIndex     = tabIndex + 1;

  chrome.tabs.create({ active: false, index: newTabIndex, url: tabURL }, function(openedTab)
  {
    var tabLoaded = function(tabId, tabInformation)
    {
      // If this is the opened tab and it finished loading
      if(tabId == openedTab.id && tabInformation.status && tabInformation.status == "complete")
      {
        var extensionTab = null;
        var tabs         = chrome.extension.getViews({ tabId: tabId, type: "tab" });

        // Vivaldi does not return tabs when searching for type tab
        if(tabs.length === 0)
        {
          tabs = chrome.extension.getViews({ tabId: tabId });
        }

        // Loop through the tabs
        for(var i = 0, l = tabs.length; i < l; i++)
        {
          extensionTab = tabs[i];

          extensionTab.WebDeveloper.Generated.initialized = true;

          extensionTab.WebDeveloper.Generated.initialize(generatedData, generatedLocale);
        }

        chrome.tabs.onUpdated.removeListener(tabLoaded);
        chrome.tabs.highlight({ tabs: newTabIndex });

        WebDeveloper.Overlay.close();
      }
    };

    chrome.tabs.onUpdated.addListener(tabLoaded);
  });
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
  var eventTarget = event.target;

  // If the event target is set, is a link, has an href, and is an open URL link
  if(eventTarget && eventTarget.tagName && eventTarget.tagName.toLowerCase() == "a" && eventTarget.hasAttribute("href") && eventTarget.classList.contains("open-url"))
  {
    var href = eventTarget.getAttribute("href");

    WebDeveloper.Overlay.getSelectedTab(function(tab)
    {
      chrome.tabs.create({ index: tab.index + 1, url: href });

      WebDeveloper.Overlay.close();
    });

    event.preventDefault();
  }
};

// Opens a validation tab
WebDeveloper.Overlay.openValidationTab = function(tabURL, tabIndex, data)
{
  var newTabIndex = tabIndex + 1;

  chrome.tabs.create({ active: false, index: newTabIndex, url: tabURL }, function(openedTab)
  {
    var tabLoaded = function(tabId, tabInformation)
    {
      // If this is the opened tab and it finished loading
      if(tabId == openedTab.id && tabInformation.status && tabInformation.status == "complete")
      {
        var extensionTab = null;
        var tabs         = chrome.extension.getViews({ tabId: tabId, type: "tab" });

        // Loop through the tabs
        for(var i = 0, l = tabs.length; i < l; i++)
        {
          extensionTab = tabs[i];

          extensionTab.WebDeveloper.Validation.initialized = true;

          extensionTab.WebDeveloper.Validation.initialize(data);
        }

        chrome.tabs.onUpdated.removeListener(tabLoaded);
        chrome.tabs.highlight({ tabs: newTabIndex });

        WebDeveloper.Overlay.close();
      }
    };

    chrome.tabs.onUpdated.addListener(tabLoaded);
  });
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
WebDeveloper.Overlay.toggleFeatureOnTab = function(featureItem, tab, scriptFiles, scriptCode, args, closeOverlay)
{
  var feature = featureItem.getAttribute("id");

  WebDeveloper.Overlay.addScriptsToTab(tab, scriptFiles, scriptCode, args, function()
  {
    featureItem.classList.toggle("active");

    WebDeveloper.Storage.toggleFeatureOnTab(feature, tab, function()
    {
      // If the overlay should be closed
      if(closeOverlay)
      {
        WebDeveloper.Overlay.close();
      }
    });
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
        menu.classList.add("active");
      }
      else if(menu.classList.contains("active"))
      {
        menu.classList.remove("active");
      }
    });
  }
};

// If the document is still loading
if(document.readyState === "loading")
{
  document.addEventListener("DOMContentLoaded", WebDeveloper.Overlay.initialize);
}
else
{
  WebDeveloper.Overlay.initialize();
}

chrome.runtime.onMessage.addListener(WebDeveloper.Overlay.message);
