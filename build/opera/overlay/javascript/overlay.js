var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay         = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Cookies = WebDeveloper.Overlay.Cookies || {};

// Returns the locale for the view cookie information feature
WebDeveloper.Overlay.Cookies.getViewCookieInformationLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.atEndOfSession             = WebDeveloper.Locales.getString("atEndOfSession");
  locale.cancel                     = WebDeveloper.Locales.getString("cancel");
  locale.cannotEdit                 = WebDeveloper.Locales.getString("cannotEdit");
  locale.cannotEditHTTPOnlyCookies  = WebDeveloper.Locales.getString("cannotEditHTTPOnlyCookies");
  locale.cannotEditLocalhostCookies = WebDeveloper.Locales.getString("cannotEditLocalhostCookies");
  locale.cookie                     = WebDeveloper.Locales.getString("cookie");
  locale.cookieDeleted              = WebDeveloper.Locales.getString("cookieDeleted");
  locale.cookieEdited               = WebDeveloper.Locales.getString("cookieEdited");
  locale.cookieInformation          = WebDeveloper.Locales.getString("cookieInformation");
  locale.cookies                    = WebDeveloper.Locales.getString("cookies");
  locale.deleteConfirmation         = WebDeveloper.Locales.getString("deleteConfirmation");
  locale.deleteCookie               = WebDeveloper.Locales.getString("deleteCookie");
  locale.deleteCookieConfirmation   = WebDeveloper.Locales.getString("deleteCookieConfirmation");
  locale.deleteLabel                = WebDeveloper.Locales.getString("delete");
  locale.edit                       = WebDeveloper.Locales.getString("edit");
  locale.editCookie                 = WebDeveloper.Locales.getString("editCookie");
  locale.expires                    = WebDeveloper.Locales.getString("expires");
  locale.expiresCannotBeEmpty       = WebDeveloper.Locales.getString("expiresCannotBeEmpty");
  locale.expiresNotValid            = WebDeveloper.Locales.getString("expiresNotValid");
  locale.expiresPlaceholder         = WebDeveloper.Locales.getString("expiresPlaceholder");
  locale.host                       = WebDeveloper.Locales.getString("host");
  locale.hostCannotBeEmpty          = WebDeveloper.Locales.getString("hostCannotBeEmpty");
  locale.hostPlaceholder            = WebDeveloper.Locales.getString("hostPlaceholder");
  locale.httpOnly                   = WebDeveloper.Locales.getString("httpOnly");
  locale.name                       = WebDeveloper.Locales.getString("name");
  locale.nameCannotBeEmpty          = WebDeveloper.Locales.getString("nameCannotBeEmpty");
  locale.namePlaceholder            = WebDeveloper.Locales.getString("namePlaceholder");
  locale.no                         = WebDeveloper.Locales.getString("no");
  locale.path                       = WebDeveloper.Locales.getString("path");
  locale.pathCannotBeEmpty          = WebDeveloper.Locales.getString("pathCannotBeEmpty");
  locale.pathPlaceholder            = WebDeveloper.Locales.getString("pathPlaceholder");
  locale.property                   = WebDeveloper.Locales.getString("property");
  locale.save                       = WebDeveloper.Locales.getString("save");
  locale.secure                     = WebDeveloper.Locales.getString("secure");
  locale.secureCookie               = WebDeveloper.Locales.getString("secureCookie");
  locale.sessionCookie              = WebDeveloper.Locales.getString("sessionCookie");
  locale.value                      = WebDeveloper.Locales.getString("value");
  locale.valuePlaceholder           = WebDeveloper.Locales.getString("valuePlaceholder");
  locale.yes                        = WebDeveloper.Locales.getString("yes");

  return locale;
};
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay     = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.CSS = WebDeveloper.Overlay.CSS || {};

// Returns the locale for the view CSS feature
WebDeveloper.Overlay.CSS.getViewCSSLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.couldNotLoadCSS    = WebDeveloper.Locales.getString("couldNotLoadCSS");
  locale.css                = WebDeveloper.Locales.getString("css");
  locale.dark               = WebDeveloper.Locales.getString("dark");
  locale.embeddedCSSFrom    = WebDeveloper.Locales.getString("embeddedCSSFrom");
  locale.light              = WebDeveloper.Locales.getString("light");
  locale.none               = WebDeveloper.Locales.getString("none");
  locale.syntaxHighlighting = WebDeveloper.Locales.getString("syntaxHighlighting");

  return locale;
};
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay       = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Forms = WebDeveloper.Overlay.Forms || {};

// Returns the locale for the view form information feature
WebDeveloper.Overlay.Forms.getViewFormInformationLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.action        = WebDeveloper.Locales.getString("action");
  locale.elements      = WebDeveloper.Locales.getString("elements");
  locale.form          = WebDeveloper.Locales.getString("form");
  locale.forms         = WebDeveloper.Locales.getString("forms");
  locale.id            = WebDeveloper.Locales.getString("id");
  locale.label         = WebDeveloper.Locales.getString("label");
  locale.maximumLength = WebDeveloper.Locales.getString("maximumLength");
  locale.method        = WebDeveloper.Locales.getString("method");
  locale.name          = WebDeveloper.Locales.getString("name");
  locale.size          = WebDeveloper.Locales.getString("size");
  locale.type          = WebDeveloper.Locales.getString("type");
  locale.value         = WebDeveloper.Locales.getString("value");

  return locale;
};
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay        = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Images = WebDeveloper.Overlay.Images || {};

// Returns the locale for the view image information feature
WebDeveloper.Overlay.Images.getViewImageInformationLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.alt      = WebDeveloper.Locales.getString("alt");
  locale.height   = WebDeveloper.Locales.getString("height");
  locale.image    = WebDeveloper.Locales.getString("image");
  locale.images   = WebDeveloper.Locales.getString("images");
  locale.property = WebDeveloper.Locales.getString("property");
  locale.src      = WebDeveloper.Locales.getString("src");
  locale.value    = WebDeveloper.Locales.getString("value");
  locale.width    = WebDeveloper.Locales.getString("width");

  return locale;
};
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay             = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Information = WebDeveloper.Overlay.Information || {};

// Returns the locale for the view anchor information feature
WebDeveloper.Overlay.Information.getViewAnchorInformationLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.anchor            = WebDeveloper.Locales.getString("anchor");
  locale.anchorInformation = WebDeveloper.Locales.getString("anchorInformation");
  locale.anchors           = WebDeveloper.Locales.getString("anchors");

  return locale;
};

// Returns the locale for the view color information feature
WebDeveloper.Overlay.Information.getViewColorInformationLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.color            = WebDeveloper.Locales.getString("color");
  locale.colorInformation = WebDeveloper.Locales.getString("colorInformation");
  locale.colors           = WebDeveloper.Locales.getString("colors");

  return locale;
};

// Returns the locale for the view document outline feature
WebDeveloper.Overlay.Information.getViewDocumentOutlineLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.documentOutline = WebDeveloper.Locales.getString("documentOutline");
  locale.heading         = WebDeveloper.Locales.getString("heading");
  locale.headings        = WebDeveloper.Locales.getString("headings");
  locale.missingHeading  = WebDeveloper.Locales.getString("missingHeading");
  locale.noHeadingText   = WebDeveloper.Locales.getString("noHeadingText");

  return locale;
};

// Returns the locale for the view JavaScript feature
WebDeveloper.Overlay.Information.getViewJavaScriptLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.beautifyJavaScript     = WebDeveloper.Locales.getString("beautifyJavaScript");
  locale.couldNotLoadJavaScript = WebDeveloper.Locales.getString("couldNotLoadJavaScript");
  locale.dark                   = WebDeveloper.Locales.getString("dark");
  locale.embeddedJavaScriptFrom = WebDeveloper.Locales.getString("embeddedJavaScriptFrom");
  locale.javaScript             = WebDeveloper.Locales.getString("javaScript");
  locale.light                  = WebDeveloper.Locales.getString("light");
  locale.none                   = WebDeveloper.Locales.getString("none");
  locale.syntaxHighlighting     = WebDeveloper.Locales.getString("syntaxHighlighting");
  locale.undoBeautifyJavaScript = WebDeveloper.Locales.getString("undoBeautifyJavaScript");

  return locale;
};

// Returns the locale for the view link information feature
WebDeveloper.Overlay.Information.getViewLinkInformationLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.link            = WebDeveloper.Locales.getString("link");
  locale.linkInformation = WebDeveloper.Locales.getString("linkInformation");
  locale.links           = WebDeveloper.Locales.getString("links");

  return locale;
};

// Returns the locale for the view meta tag information feature
WebDeveloper.Overlay.Information.getViewMetaTagInformationLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.content  = WebDeveloper.Locales.getString("content");
  locale.metaTag  = WebDeveloper.Locales.getString("metaTag");
  locale.metaTags = WebDeveloper.Locales.getString("metaTags");
  locale.name     = WebDeveloper.Locales.getString("name");

  return locale;
};

// Returns the locale for the view response headers feature
WebDeveloper.Overlay.Information.getViewResponseHeadersLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.couldNotLoadResponseHeaders = WebDeveloper.Locales.getString("couldNotLoadResponseHeaders");
  locale.responseHeaders             = WebDeveloper.Locales.getString("responseHeaders");

  return locale;
};
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay         = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Options = WebDeveloper.Overlay.Options || {};

// Returns the locale for the about feature
WebDeveloper.Overlay.Options.getAboutLocale = function()
{
  var locale = {};

  locale.about                = WebDeveloper.Locales.getString("about");
  locale.author               = WebDeveloper.Locales.getString("author");
  locale.buildDate            = WebDeveloper.Locales.getString("buildDate");
  locale.extensionDescription = WebDeveloper.Locales.getString("extensionDescription");
  locale.extensionName        = WebDeveloper.Locales.getString("extensionName");
  locale.followOnAppNet       = WebDeveloper.Locales.getString("followOnAppNet");
  locale.followOnTwitter      = WebDeveloper.Locales.getString("followOnTwitter");
  locale.version              = WebDeveloper.Locales.getString("version");

  return locale;
};
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay        = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Resize = WebDeveloper.Overlay.Resize || {};

// Returns the locale for the view responsive layouts feature
WebDeveloper.Overlay.Resize.getViewResponsiveLayoutsLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.layouts           = WebDeveloper.Locales.getString("layouts");
  locale.reloadLayouts     = WebDeveloper.Locales.getString("reloadLayouts");
  locale.responsiveLayouts = WebDeveloper.Locales.getString("responsiveLayouts");

  return locale;
};
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Common                 = WebDeveloper.Common || {};
WebDeveloper.Overlay                = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.animationSpeed = 100;

$(function()
{
  var menu         = chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("menu");
  var notification = $("#notification");

  $("#cookies-toolbar > a").append(WebDeveloper.Locales.getString("cookies"));
  $("#css-toolbar > a").append(WebDeveloper.Locales.getString("css"));
  $("#disable-toolbar > a").append(WebDeveloper.Locales.getString("disable"));
  $("#forms-toolbar > a").append(WebDeveloper.Locales.getString("forms"));
  $("#images-toolbar > a").append(WebDeveloper.Locales.getString("images"));
  $("#information-toolbar > a").append(WebDeveloper.Locales.getString("information"));
  $("#miscellaneous-toolbar > a").append(WebDeveloper.Locales.getString("miscellaneous"));
  $("#options-toolbar > a").append(WebDeveloper.Locales.getString("options"));
  $("#outline-toolbar > a").append(WebDeveloper.Locales.getString("outline"));
  $("#resize-toolbar > a").append(WebDeveloper.Locales.getString("resize"));
  $("#tools-toolbar > a").append(WebDeveloper.Locales.getString("tools"));

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
  WebDeveloper.Overlay.addScriptToTab(tab, { "file": scriptFile }, function()
  {
    WebDeveloper.Overlay.addScriptToTab(tab, { "code": scriptCode }, callback);
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
  chrome.tabs.query({ "active": true, "currentWindow": true }, function(tabs)
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
    WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("internalBrowserPagesError"), "error");

    return false;
  }
  else if(url.indexOf("https://chrome.google.com/extensions/") === 0 || url.indexOf("https://chrome.google.com/webstore/") === 0)
  {
    WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("chromeExtensionGalleryError"), "error");

    return false;
  }

  return true;
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
    chrome.tabs.create({ "index": tab.index + 1, "url": tabURL });

    WebDeveloper.Overlay.close();
  });
};

// Opens a URL from the overlay
WebDeveloper.Overlay.openURL = function()
{
  var href = $(this).attr("href");

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    chrome.tabs.create({ "index": tab.index + 1, "url": href });

    WebDeveloper.Overlay.close();
  });
};

// Toggles a content setting
WebDeveloper.Overlay.toggleContentSetting = function(settingType, menu, url, enableMessage, disableMessage)
{
  chrome.contentSettings[settingType].get({ "primaryUrl": url }, function(details)
  {
    var callback = null;
    var setting  = details.setting;

    // If the setting is currently set to block
    if(setting == "block")
    {
      setting = "allow";
    }
    else
    {
      setting = "block";
    }

    // If the enable and disable message are set
    if(enableMessage && disableMessage)
    {
      callback = function()
      {
        WebDeveloper.Overlay.updateContentSettingMenu(menu, settingType);

        // If the setting is being allowed
        if(setting == "allow")
        {
          WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString(enableMessage));
        }
        else
        {
          WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString(disableMessage));
        }
      };
    }

    chrome.contentSettings[settingType].set({ "primaryPattern": url, "setting": setting }, callback);
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
    chrome.contentSettings[settingType].get({ "primaryUrl": "http://*/*" }, function(details)
    {
      var setting = details.setting;

      // If the setting is currently set to block
      if(setting == "block")
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

chrome.extension.onMessage.addListener(WebDeveloper.Overlay.message);
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay         = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Cookies = WebDeveloper.Overlay.Cookies || {};

$(function()
{
  var addCookieExpires   = $("#add-cookie-expires");
  var addCookieHost      = $("#add-cookie-host");
  var addCookieName      = $("#add-cookie-name");
  var addCookiePath      = $("#add-cookie-path");
  var addCookieValue     = $("#add-cookie-value");
  var disableCookiesMenu = $("#disable-cookies");

  disableCookiesMenu.append(WebDeveloper.Locales.getString("disableCookies")).on("click", WebDeveloper.Overlay.Cookies.toggleCookies);
  $("#add-cookie").append(WebDeveloper.Locales.getString("addCookieMenu")).on("click", WebDeveloper.Overlay.Cookies.addCookie);
  $("#delete-domain-cookies").append(WebDeveloper.Locales.getString("deleteDomainCookies")).on("click", WebDeveloper.Overlay.Cookies.deleteDomainCookies);
  $("#delete-path-cookies").append(WebDeveloper.Locales.getString("deletePathCookies")).on("click", WebDeveloper.Overlay.Cookies.deletePathCookies);
  $("#delete-session-cookies").append(WebDeveloper.Locales.getString("deleteSessionCookies")).on("click", WebDeveloper.Overlay.Cookies.deleteSessionCookies);
  $("#view-cookie-information").append(WebDeveloper.Locales.getString("viewCookieInformation")).on("click", WebDeveloper.Overlay.Cookies.viewCookieInformation);

  $("#add-cookie-cancel").on("click", WebDeveloper.Overlay.Cookies.cancelAddCookie);
  $("#add-cookie-dialog").on("submit", function(event) { event.preventDefault(); });
  $("#add-cookie-submit").on("click", WebDeveloper.Overlay.Cookies.submitAddCookie);

  $("legend", $("#add-cookie-dialog")).text(WebDeveloper.Locales.getString("addCookie"));
  $("#add-cookie-cancel").text(WebDeveloper.Locales.getString("cancel"));
  $("#add-cookie-secure").after(WebDeveloper.Locales.getString("secureCookie"));
  $("#add-cookie-session").after(WebDeveloper.Locales.getString("sessionCookie")).on("change", WebDeveloper.Overlay.Cookies.changeSession);
  $("#add-cookie-submit").append(WebDeveloper.Locales.getString("add"));
  $('[for="add-cookie-expires"]').text(WebDeveloper.Locales.getString("expires"));
  $('[for="add-cookie-host"]').text(WebDeveloper.Locales.getString("host"));
  $('[for="add-cookie-name"]').text(WebDeveloper.Locales.getString("name"));
  $('[for="add-cookie-path"]').text(WebDeveloper.Locales.getString("path"));
  $('[for="add-cookie-value"]').text(WebDeveloper.Locales.getString("value"));

  addCookieExpires.attr("placeholder", WebDeveloper.Locales.getString("expiresPlaceholder"));
  addCookieHost.attr("placeholder", WebDeveloper.Locales.getString("hostPlaceholder"));
  addCookieName.attr("placeholder", WebDeveloper.Locales.getString("namePlaceholder"));
  addCookiePath.attr("placeholder", WebDeveloper.Locales.getString("pathPlaceholder"));
  addCookieValue.attr("placeholder", WebDeveloper.Locales.getString("valuePlaceholder"));
  addCookieExpires.add(addCookieHost).add(addCookieName).add(addCookiePath).add(addCookieValue).on("keypress", WebDeveloper.Overlay.Cookies.addCookieKeyPress);

  WebDeveloper.Overlay.updateContentSettingMenu(disableCookiesMenu, "cookies");
});

// Adds a cookie
WebDeveloper.Overlay.Cookies.addCookie = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, {type: "get-location-details"}, function(response)
      {
        var addCookieDialog = $("#add-cookie-dialog");

        $("#add-cookie-expires").val(WebDeveloper.Cookies.getDateTomorrow()).prop("disabled", false);
        $("#add-cookie-host").val(response.host);
        $("#add-cookie-path").val(response.path);
        $("#add-cookie-value").focus();

        WebDeveloper.Overlay.Cookies.resetAddDialog(addCookieDialog);

        $(".tabbable, #confirmation, #notification").slideUp(WebDeveloper.Overlay.animationSpeed, function()
        {
          addCookieDialog.slideDown(WebDeveloper.Overlay.animationSpeed);
        });
      });
    }
  });
};

// Handles a key press when adding a cookie
WebDeveloper.Overlay.Cookies.addCookieKeyPress = function(event)
{
  // If the enter key was pressed
  if(event.keyCode == 13)
  {
    WebDeveloper.Overlay.Cookies.submitAddCookie();
  }
};

// Cancels adding a cookie
WebDeveloper.Overlay.Cookies.cancelAddCookie = function()
{
  $("#add-cookie-dialog").slideUp(WebDeveloper.Overlay.animationSpeed, function()
  {
    $(".tabbable").slideDown(WebDeveloper.Overlay.animationSpeed);
  });
};

// Handles the cookie session setting being changed
WebDeveloper.Overlay.Cookies.changeSession = function()
{
  var session = $(this);

  // If the session setting is checked
  if(session.prop("checked"))
  {
    $("#add-cookie-expires").val("").prop("disabled", true);
  }
  else
  {
    $("#add-cookie-expires").val(WebDeveloper.Cookies.getDateTomorrow()).prop("disabled", false);
  }
};

// Converts an array of cookies
WebDeveloper.Overlay.Cookies.convertCookies = function(cookies)
{
  var convertedCookies = [];
  var cookie           = null;
  var cookieObject     = null;

  // Loop through the cookies
  for(var i = 0, l = cookies.length; i < l; i++)
  {
    cookie       = {};
    cookieObject = cookies[i];

    cookie.expires  = cookieObject.expirationDate;
    cookie.host     = cookieObject.domain;
    cookie.httpOnly = cookieObject.httpOnly;
    cookie.name     = cookieObject.name;
    cookie.path     = cookieObject.path;
    cookie.secure   = cookieObject.secure;
    cookie.session  = cookieObject.session;
    cookie.value    = cookieObject.value;

    convertedCookies.push(cookie);
  }

  return convertedCookies;
};

// Deletes all the cookies for the current domain
WebDeveloper.Overlay.Cookies.deleteDomainCookies = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.cookies.getAll({}, function(allCookies)
      {
        chrome.tabs.sendMessage(tab.id, { "allCookies": WebDeveloper.Overlay.Cookies.convertCookies(allCookies), "type": "get-domain-cookies" }, function(cookies)
        {
          WebDeveloper.Cookies.deleteDomainCookies(cookies);
        });
      });
    }
  });
};

// Deletes all the cookies for the current path
WebDeveloper.Overlay.Cookies.deletePathCookies = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.cookies.getAll({}, function(allCookies)
      {
        chrome.tabs.sendMessage(tab.id, { "allCookies": WebDeveloper.Overlay.Cookies.convertCookies(allCookies), "type": "get-path-cookies" }, function(cookies)
        {
          WebDeveloper.Cookies.deletePathCookies(cookies);
        });
      });
    }
  });
};

// Deletes all session cookies
WebDeveloper.Overlay.Cookies.deleteSessionCookies = function()
{
  chrome.cookies.getAll({}, function(allCookies)
  {
    WebDeveloper.Cookies.deleteSessionCookies(WebDeveloper.Overlay.Cookies.convertCookies(allCookies));
  });
};

// Populates a cookie from a dialog
WebDeveloper.Overlay.Cookies.populateCookieFromDialog = function()
{
  var cookie = {};

  cookie.host  = $("#add-cookie-host").val();
  cookie.name  = $("#add-cookie-name").val();
  cookie.path  = $("#add-cookie-path").val();
  cookie.value = $("#add-cookie-value").val();

  // If the cookie is secure
  if($("#add-cookie-secure").prop("checked"))
  {
    cookie.secure = true;
  }

  // If the cookie is a session cookie
  if($("#add-cookie-session").prop("checked"))
  {
    cookie.session = true;
  }
  else
  {
    cookie.expires = $("#add-cookie-expires").val();
  }

  return cookie;
};

// Resets the add cookie dialog
WebDeveloper.Overlay.Cookies.resetAddDialog = function(addDialog)
{
  $(".has-error", addDialog).removeClass("has-error");
  $(".help-block", addDialog).text("");
};

// Adds a cookie
WebDeveloper.Overlay.Cookies.submitAddCookie = function()
{
  // If the dialog is valid
  if(WebDeveloper.Overlay.Cookies.validateAddDialog())
  {
    var cookie = WebDeveloper.Overlay.Cookies.populateCookieFromDialog();

    WebDeveloper.Cookies.addCookie(cookie);
    WebDeveloper.Overlay.Cookies.cancelAddCookie();
    WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getFormattedString("cookieAdded", [cookie.name]));
  }
};

// Toggles cookies
WebDeveloper.Overlay.Cookies.toggleCookies = function()
{
  var menu = $(this);

  WebDeveloper.Overlay.toggleContentSetting("cookies", menu, "http://*/*", "enableCookiesResult", "disableCookiesResult");
  WebDeveloper.Overlay.toggleContentSetting("cookies", menu, "https://*/*");
};

// Returns true if the add dialog is valid
WebDeveloper.Overlay.Cookies.validateAddDialog = function()
{
  var expires   = $("#add-cookie-expires");
  var host      = $("#add-cookie-host");
  var hostValue = host.val().trim();
  var name      = $("#add-cookie-name");
  var path      = $("#add-cookie-path");
  var valid     = true;

  WebDeveloper.Overlay.Cookies.resetAddDialog($("#add-cookie-dialog"));

  // If the cookie name is not set
  if(!name.val())
  {
    name.closest(".form-group").addClass("has-error");
    name.next(".help-block").text(WebDeveloper.Locales.getString("nameCannotBeEmpty"));

    valid = false;
  }

  // If the cookie host is not set
  if(!hostValue)
  {
    host.closest(".form-group").addClass("has-error");
    host.next(".help-block").text(WebDeveloper.Locales.getString("hostCannotBeEmpty"));

    valid = false;
  }
  else if(hostValue == "localhost" || hostValue == ".localhost")
  {
    host.closest(".form-group").addClass("has-error");
    host.next(".help-block").html(WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("hostCannotBeLocalhost"));

    valid = false;
  }

  // If the cookie path is not set
  if(!path.val())
  {
    path.closest(".form-group").addClass("has-error");
    path.next(".help-block").text(WebDeveloper.Locales.getString("pathCannotBeEmpty"));

    valid = false;
  }

  // If the cookie is not a session cookie
  if(!$("#add-cookie-session").prop("checked"))
  {
    var expiresValue = expires.val().trim();

    // If the cookie expires is not set
    if(!expiresValue)
    {
      expires.closest(".form-group").addClass("has-error");
      expires.closest(".input-group").next(".help-block").text(WebDeveloper.Locales.getString("expiresCannotBeEmpty"));

      valid = false;
    }
    else if(new Date(expiresValue) == "Invalid Date")
    {
      expires.closest(".form-group").addClass("has-error");
      expires.closest(".input-group").next(".help-block").text(WebDeveloper.Locales.getString("expiresNotValid"));

      valid = false;
    }
  }

  return valid;
};

// Displays all the cookies for the page
WebDeveloper.Overlay.Cookies.viewCookieInformation = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.cookies.getAll({}, function(allCookies)
      {
        chrome.tabs.sendMessage(tab.id, { "allCookies": WebDeveloper.Overlay.Cookies.convertCookies(allCookies), "type": "get-cookies" }, function(data)
        {
          chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-cookie-information.html"), tab.index, data, WebDeveloper.Overlay.Cookies.getViewCookieInformationLocale());
        });
      });
    }
  });
};
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay     = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.CSS = WebDeveloper.Overlay.CSS || {};

$(function()
{
  $("#disable-all-styles").append(WebDeveloper.Locales.getString("disableAllStyles")).on("click", WebDeveloper.Overlay.CSS.disableAllStyles);
  $("#disable-browser-default-styles").append(WebDeveloper.Locales.getString("disableBrowserDefaultStyles")).on("click", WebDeveloper.Overlay.CSS.disableBrowserDefaultStyles);
  $("#disable-embedded-styles").append(WebDeveloper.Locales.getString("disableEmbeddedStyles")).on("click", WebDeveloper.Overlay.CSS.disableEmbeddedStyles);
  $("#disable-inline-styles").append(WebDeveloper.Locales.getString("disableInlineStyles")).on("click", WebDeveloper.Overlay.CSS.disableInlineStyles);
  $("#disable-linked-style-sheets").append(WebDeveloper.Locales.getString("disableLinkedStyleSheets")).on("click", WebDeveloper.Overlay.CSS.disableLinkedStyleSheets);
  $("#disable-print-styles").append(WebDeveloper.Locales.getString("disablePrintStyles")).on("click", WebDeveloper.Overlay.CSS.disablePrintStyles);
  $("#display-handheld-styles").append(WebDeveloper.Locales.getString("displayHandheldStyles")).on("click", WebDeveloper.Overlay.CSS.displayHandheldStyles);
  $("#display-print-styles").append(WebDeveloper.Locales.getString("displayPrintStyles")).on("click", WebDeveloper.Overlay.CSS.displayPrintStyles);
  $("#edit-css").append(WebDeveloper.Locales.getString("editCSS")).on("click", WebDeveloper.Overlay.CSS.editCSS);
  $("#reload-linked-style-sheets").append(WebDeveloper.Locales.getString("reloadLinkedStyleSheets")).on("click", WebDeveloper.Overlay.CSS.reloadLinkedStyleSheets);
  $("#use-border-box-model").append(WebDeveloper.Locales.getString("useBorderBoxModel")).on("click", WebDeveloper.Overlay.CSS.useBorderBoxModel);
  $("#view-css").append(WebDeveloper.Locales.getString("viewCSS")).on("click", WebDeveloper.Overlay.CSS.viewCSS);
});

// Adds a feature on a tab
WebDeveloper.Overlay.CSS.addFeatureOnTab = function(featureItem, tab, scriptCode)
{
  WebDeveloper.Overlay.addFeatureOnTab(featureItem, tab, "features/javascript/css.js", scriptCode);
};

// Disables all styles
WebDeveloper.Overlay.CSS.disableAllStyles = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleAllStyles(" + disable + ", [document]);");
    }
  });
};

// Disables the browser default styles
WebDeveloper.Overlay.CSS.disableBrowserDefaultStyles = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleBrowserDefaultStyles([document]);");
    }
  });
};

// Disables embedded styles
WebDeveloper.Overlay.CSS.disableEmbeddedStyles = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleEmbeddedStyles(" + disable + ", [document]);");
    }
  });
};

// Disables inline styles
WebDeveloper.Overlay.CSS.disableInlineStyles = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleInlineStyles(" + disable + ", [document]);");
    }
  });
};

// Disables linked style sheets
WebDeveloper.Overlay.CSS.disableLinkedStyleSheets = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleLinkedStyleSheets(" + disable + ", [document]);");
    }
  });
};

// Disables print styles
WebDeveloper.Overlay.CSS.disablePrintStyles = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.togglePrintStyles(" + disable + ", [document]);");
    }
  });
};

// Displays handheld styles
WebDeveloper.Overlay.CSS.displayHandheldStyles = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var storage = chrome.extension.getBackgroundPage().WebDeveloper.Storage;
      var display = !storage.isFeatureOnTab(feature, tab);

      // If displaying handheld styles and print styles are being displayed
      if(display && storage.isFeatureOnTab("display-print-styles", tab))
      {
        var displayPrintStylesItem = $("#display-print-styles");

        WebDeveloper.Overlay.CSS.toggleFeatureOnTab(displayPrintStylesItem, tab, 'WebDeveloper.CSS.toggleMediaTypeStyles("print", false, [document]);');
      }

      WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, 'WebDeveloper.CSS.toggleMediaTypeStyles("handheld", ' + display + ', [document]);');
    }
  });
};

// Displays print styles
WebDeveloper.Overlay.CSS.displayPrintStyles = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var storage = chrome.extension.getBackgroundPage().WebDeveloper.Storage;
      var display = !storage.isFeatureOnTab(feature, tab);

      // If displaying print styles and handheld styles are being displayed
      if(display && storage.isFeatureOnTab("display-handheld-styles", tab))
      {
        var displayHandheldStylesItem = $("#display-handheld-styles");

        WebDeveloper.Overlay.CSS.toggleFeatureOnTab(displayHandheldStylesItem, tab, 'WebDeveloper.CSS.toggleMediaTypeStyles("handheld", false, [document]);');
      }

      WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, 'WebDeveloper.CSS.toggleMediaTypeStyles("print", ' + display + ', [document]);');
    }
  });
};

// Edits the CSS of the page
WebDeveloper.Overlay.CSS.editCSS = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var edit    = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);
      var locale  = "";

      locale += "'couldNotLoadCSS': '" + WebDeveloper.Locales.getString("couldNotLoadCSS") + "',";
      locale += "'dashboardTitle': '" + WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("dashboard") + "',";
      locale += "'editCSS': '" + WebDeveloper.Locales.getString("editCSS") + "',";
      locale += "'embeddedStyles': '" + WebDeveloper.Locales.getString("embeddedStyles") + "'";

      WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "dashboard/javascript/dashboard.js", "WebDeveloper.EditCSS.editCSS(" + edit + ", document, {" + locale + "});", true);
    }
  });
};

// Reloads the linked style sheets of the page
WebDeveloper.Overlay.CSS.reloadLinkedStyleSheets = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.CSS.addFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.reloadLinkedStyleSheets([document]);");
    }
  });
};

// Toggles a feature on a tab
WebDeveloper.Overlay.CSS.toggleFeatureOnTab = function(featureItem, tab, scriptCode)
{
  WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "features/javascript/css.js", scriptCode);
};

// Displays alt attributes for all images
WebDeveloper.Overlay.CSS.useBorderBoxModel = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.useBorderBoxModel([document]);");
    }
  });
};

// Displays the CSS
WebDeveloper.Overlay.CSS.viewCSS = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, {type: "get-css"}, function(data)
      {
        data.theme = chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("syntax_highlight_theme");

        chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-css.html"), tab.index, data, WebDeveloper.Overlay.CSS.getViewCSSLocale());
      });
    }
  });
};
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay         = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Disable = WebDeveloper.Overlay.Disable || {};

$(function()
{
  var disableJavaScriptMenu    = $("#disable-javascript");
  var disableNotificationsMenu = $("#disable-notifications");
  var disablePluginsMenu       = $("#disable-plugins");
  var disablePopupsMenu        = $("#disable-popups");

  disableJavaScriptMenu.append(WebDeveloper.Locales.getString("disableJavaScript")).on("click", WebDeveloper.Overlay.Disable.toggleJavaScript);
  disableNotificationsMenu.append(WebDeveloper.Locales.getString("disableNotifications")).on("click", WebDeveloper.Overlay.Disable.toggleNotifications);
  disablePluginsMenu.append(WebDeveloper.Locales.getString("disablePlugins")).on("click", WebDeveloper.Overlay.Disable.togglePlugins);
  disablePopupsMenu.append(WebDeveloper.Locales.getString("disablePopups")).on("click", WebDeveloper.Overlay.Disable.togglePopups);
  $("#reset-disable-features").append(WebDeveloper.Locales.getString("resetDisableFeatures")).on("click", WebDeveloper.Overlay.Disable.resetFeatures);

  WebDeveloper.Overlay.updateContentSettingMenu(disableJavaScriptMenu, "javascript");
  WebDeveloper.Overlay.updateContentSettingMenu(disableNotificationsMenu, "notifications");
  WebDeveloper.Overlay.updateContentSettingMenu(disablePluginsMenu, "plugins");
  WebDeveloper.Overlay.updateContentSettingMenu(disablePopupsMenu, "popups");
});

// Resets the disable features
WebDeveloper.Overlay.Disable.resetFeatures = function()
{
  chrome.contentSettings.cookies.clear({});
  chrome.contentSettings.images.clear({});
  chrome.contentSettings.javascript.clear({});
  chrome.contentSettings.notifications.clear({});
  chrome.contentSettings.plugins.clear({});
  chrome.contentSettings.popups.clear({});

  WebDeveloper.Overlay.updateContentSettingMenu($("#disable-javascript"), "javascript");
  WebDeveloper.Overlay.updateContentSettingMenu($("#disable-notifications"), "notifications");
  WebDeveloper.Overlay.updateContentSettingMenu($("#disable-plugins"), "plugins");
  WebDeveloper.Overlay.updateContentSettingMenu($("#disable-popups"), "popups");

  WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString("resetDisableFeaturesResult"));
};

// Toggles JavaScript
WebDeveloper.Overlay.Disable.toggleJavaScript = function()
{
  var menu = $(this);

  WebDeveloper.Overlay.toggleContentSetting("javascript", menu, "http://*/*", "enableJavaScriptResult", "disableJavaScriptResult");
  WebDeveloper.Overlay.toggleContentSetting("javascript", menu, "https://*/*");
};

// Toggles notifications
WebDeveloper.Overlay.Disable.toggleNotifications = function()
{
  var menu = $(this);

  WebDeveloper.Overlay.toggleContentSetting("notifications", menu, "http://*/*", "enableNotificationsResult", "disableNotificationsResult");
  WebDeveloper.Overlay.toggleContentSetting("notifications", menu, "https://*/*");
};

// Toggles plugins
WebDeveloper.Overlay.Disable.togglePlugins = function()
{
  var menu = $(this);

  WebDeveloper.Overlay.toggleContentSetting("plugins", menu, "http://*/*", "enablePluginsResult", "disablePluginsResult");
  WebDeveloper.Overlay.toggleContentSetting("plugins", menu, "https://*/*");
};

// Toggles popups
WebDeveloper.Overlay.Disable.togglePopups = function()
{
  var menu = $(this);

  WebDeveloper.Overlay.toggleContentSetting("popups", menu, "http://*/*", "enablePopupsResult", "disablePopupsResult");
  WebDeveloper.Overlay.toggleContentSetting("popups", menu, "https://*/*");
};
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay       = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Forms = WebDeveloper.Overlay.Forms || {};

$(function()
{
  $("#check-all-checkboxes").append(WebDeveloper.Locales.getString("checkAllCheckboxes")).on("click", WebDeveloper.Overlay.Forms.checkAllCheckboxes);
  $("#clear-form-fields").append(WebDeveloper.Locales.getString("clearFormFields")).on("click", WebDeveloper.Overlay.Forms.clearFormFields);
  $("#clear-radio-buttons").append(WebDeveloper.Locales.getString("clearRadioButtons")).on("click", WebDeveloper.Overlay.Forms.clearRadioButtons);
  $("#convert-form-gets-to-posts").append(WebDeveloper.Locales.getString("convertFormGetsToPosts")).on("click", function() { WebDeveloper.Overlay.Forms.convertFormMethods("post"); });
  $("#convert-form-posts-to-gets").append(WebDeveloper.Locales.getString("convertFormPostsToGets")).on("click", function() { WebDeveloper.Overlay.Forms.convertFormMethods("get"); });
  $("#convert-select-elements-to-text-inputs").append(WebDeveloper.Locales.getString("convertSelectElementsToTextInputs")).on("click", WebDeveloper.Overlay.Forms.convertSelectElementsToTextInputs);
  $("#convert-text-inputs-to-textareas").append(WebDeveloper.Locales.getString("convertTextInputsToTextareas")).on("click", WebDeveloper.Overlay.Forms.convertTextInputsToTextareas);
  $("#display-form-details").append(WebDeveloper.Locales.getString("displayFormDetails")).on("click", WebDeveloper.Overlay.Forms.displayFormDetails);
  $("#display-passwords").append(WebDeveloper.Locales.getString("displayPasswords")).on("click", WebDeveloper.Overlay.Forms.displayPasswords);
  $("#enable-auto-completion").append(WebDeveloper.Locales.getString("enableAutoCompletion")).on("click", WebDeveloper.Overlay.Forms.enableAutoCompletion);
  $("#enable-form-fields").append(WebDeveloper.Locales.getString("enableFormFields")).on("click", WebDeveloper.Overlay.Forms.enableFormFields);
  $("#expand-select-elements").append(WebDeveloper.Locales.getString("expandSelectElements")).on("click", WebDeveloper.Overlay.Forms.expandSelectElements);
  $("#make-form-fields-writable").append(WebDeveloper.Locales.getString("makeFormFieldsWritable")).on("click", WebDeveloper.Overlay.Forms.makeFormFieldsWritable);
  $("#outline-form-fields-without-labels").append(WebDeveloper.Locales.getString("outlineFormFieldsWithoutLabels")).on("click", WebDeveloper.Overlay.Forms.outlineFormFieldsWithoutLabels);
  $("#populate-form-fields").append(WebDeveloper.Locales.getString("populateFormFields")).on("click", WebDeveloper.Overlay.Forms.populateFormFields);
  $("#remove-maximum-lengths").append(WebDeveloper.Locales.getString("removeMaximumLengths")).on("click", WebDeveloper.Overlay.Forms.removeMaximumLengths);
  $("#uncheck-all-checkboxes").append(WebDeveloper.Locales.getString("uncheckAllCheckboxes")).on("click", WebDeveloper.Overlay.Forms.uncheckAllCheckboxes);
  $("#view-form-information").append(WebDeveloper.Locales.getString("viewFormInformation")).on("click", WebDeveloper.Overlay.Forms.viewFormInformation);
});

// Adds a feature on a tab
WebDeveloper.Overlay.Forms.addFeatureOnTab = function(featureItem, tab, scriptCode)
{
  WebDeveloper.Overlay.addFeatureOnTab(featureItem, tab, "features/javascript/forms.js", scriptCode);
};

// Checks all checkboxes
WebDeveloper.Overlay.Forms.checkAllCheckboxes = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.toggleCheckboxes(true, [document]);");
    }
  });
};

// Clears all form fields
WebDeveloper.Overlay.Forms.clearFormFields = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.clearFormFields([document]);");
    }
  });
};

// Clears all radio buttons
WebDeveloper.Overlay.Forms.clearRadioButtons = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.clearRadioButtons([document]);");
    }
  });
};

// Converts the methods of all forms
WebDeveloper.Overlay.Forms.convertFormMethods = function(method)
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, 'WebDeveloper.Forms.convertFormMethods("' + method + '", [document]);');
    }
  });
};

// Converts select elements to text inputs
WebDeveloper.Overlay.Forms.convertSelectElementsToTextInputs = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.convertSelectElementsToTextInputs([document]);");
    }
  });
};

// Converts text inputs to textareas
WebDeveloper.Overlay.Forms.convertTextInputsToTextareas = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.convertTextInputsToTextareas([document]);");
    }
  });
};

// Displays the details about all forms
WebDeveloper.Overlay.Forms.displayFormDetails = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Forms.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.displayFormDetails(" + display + ", [document]);");
    }
  });
};

// Displays all passwords
WebDeveloper.Overlay.Forms.displayPasswords = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.displayPasswords([document]);");
    }
  });
};

// Enables auto completion on all elements
WebDeveloper.Overlay.Forms.enableAutoCompletion = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.enableAutoCompletion([document]);");
    }
  });
};

// Enables all form fields
WebDeveloper.Overlay.Forms.enableFormFields = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.enableFormFields([document]);");
    }
  });
};

// Expands all select elements
WebDeveloper.Overlay.Forms.expandSelectElements = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.expandSelectElements([document]);");
    }
  });
};

// Makes all form fields writable
WebDeveloper.Overlay.Forms.makeFormFieldsWritable = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.makeFormFieldsWritable([document]);");
    }
  });
};

// Outlines all form fields without labels
WebDeveloper.Overlay.Forms.outlineFormFieldsWithoutLabels = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Forms.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.outlineFormFieldsWithoutLabels(" + display + ", [document]);");
    }
  });
};

// Populates all form fields
WebDeveloper.Overlay.Forms.populateFormFields = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, 'WebDeveloper.Forms.populateFormFields([document], "' + chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("populate_email_address") + '", "' + WebDeveloper.Locales.getString("password").toLowerCase() + '");');
    }
  });
};

// Removes maximum lengths from all elements
WebDeveloper.Overlay.Forms.removeMaximumLengths = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.removeMaximumLengths([document]);");
    }
  });
};

// Toggles a feature on a tab
WebDeveloper.Overlay.Forms.toggleFeatureOnTab = function(featureItem, tab, scriptCode)
{
  WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "features/javascript/forms.js", scriptCode);
};

// Unchecks all checkboxes
WebDeveloper.Overlay.Forms.uncheckAllCheckboxes = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.toggleCheckboxes(false, [document]);");
    }
  });
};

// Displays information about all forms
WebDeveloper.Overlay.Forms.viewFormInformation = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, {type: "get-forms"}, function(data)
      {
        chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-form-information.html"), tab.index, data, WebDeveloper.Overlay.Forms.getViewFormInformationLocale());
      });
    }
  });
};
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay        = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Images = WebDeveloper.Overlay.Images || {};

$(function()
{
  var disableImagesMenu = $("#disable-images");

  disableImagesMenu.append(WebDeveloper.Locales.getString("disableImages")).on("click", WebDeveloper.Overlay.Images.toggleImages);
  $("#display-alt-attributes").append(WebDeveloper.Locales.getString("displayAltAttributes")).on("click", WebDeveloper.Overlay.Images.displayAltAttributes);
  $("#display-image-dimensions").append(WebDeveloper.Locales.getString("displayImageDimensions")).on("click", WebDeveloper.Overlay.Images.displayImageDimensions);
  $("#display-image-paths").append(WebDeveloper.Locales.getString("displayImagePaths")).on("click", WebDeveloper.Overlay.Images.displayImagePaths);
  $("#find-broken-images").append(WebDeveloper.Locales.getString("findBrokenImages")).on("click", WebDeveloper.Overlay.Images.findBrokenImages);
  $("#hide-background-images").append(WebDeveloper.Locales.getString("hideBackgroundImages")).on("click", WebDeveloper.Overlay.Images.hideBackgroundImages);
  $("#hide-images").append(WebDeveloper.Locales.getString("hideImages")).on("click", WebDeveloper.Overlay.Images.hideImages);
  $("#make-images-full-size").append(WebDeveloper.Locales.getString("makeImagesFullSize")).on("click", WebDeveloper.Overlay.Images.makeImagesFullSize);
  $("#make-images-invisible").append(WebDeveloper.Locales.getString("makeImagesInvisible")).on("click", WebDeveloper.Overlay.Images.makeImagesInvisible);
  $("#outline-all-images").append(WebDeveloper.Locales.getString("outlineAllImages")).on("click", WebDeveloper.Overlay.Images.outlineAllImages);
  $("#outline-background-images").append(WebDeveloper.Locales.getString("outlineBackgroundImages")).on("click", WebDeveloper.Overlay.Images.outlineBackgroundImages);
  $("#outline-images-with-adjusted-dimensions").append(WebDeveloper.Locales.getString("outlineImagesWithAdjustedDimensions")).on("click", WebDeveloper.Overlay.Images.outlineImagesWithAdjustedDimensions);
  $("#outline-images-with-empty-alt-attributes").append(WebDeveloper.Locales.getString("outlineImagesWithEmptyAltAttributes")).on("click", WebDeveloper.Overlay.Images.outlineImagesWithEmptyAltAttributes);
  $("#outline-images-with-oversized-dimensions").append(WebDeveloper.Locales.getString("outlineImagesWithOversizedDimensions")).on("click", WebDeveloper.Overlay.Images.outlineImagesWithOversizedDimensions);
  $("#outline-images-without-alt-attributes").append(WebDeveloper.Locales.getString("outlineImagesWithoutAltAttributes")).on("click", WebDeveloper.Overlay.Images.outlineImagesWithoutAltAttributes);
  $("#outline-images-without-dimensions").append(WebDeveloper.Locales.getString("outlineImagesWithoutDimensions")).on("click", WebDeveloper.Overlay.Images.outlineImagesWithoutDimensions);
  $("#reload-images").append(WebDeveloper.Locales.getString("reloadImages")).on("click", WebDeveloper.Overlay.Images.reloadImages);
  $("#replace-images-with-alt-attributes").append(WebDeveloper.Locales.getString("replaceImagesWithAltAttributes")).on("click", WebDeveloper.Overlay.Images.replaceImagesWithAltAttributes);
  $("#view-image-information").append(WebDeveloper.Locales.getString("viewImageInformation")).on("click", WebDeveloper.Overlay.Images.viewImageInformation);

  WebDeveloper.Overlay.updateContentSettingMenu(disableImagesMenu, "images");
});

// Adds a feature on a tab
WebDeveloper.Overlay.Images.addFeatureOnTab = function(featureItem, tab, scriptCode)
{
  WebDeveloper.Overlay.addFeatureOnTab(featureItem, tab, "features/javascript/images.js", scriptCode);
};

// Displays alt attributes for all images
WebDeveloper.Overlay.Images.displayAltAttributes = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.displayAltAttributes(" + display + ", [document]);");
    }
  });
};

// Displays the dimensions for all images
WebDeveloper.Overlay.Images.displayImageDimensions = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);
      var locale  = "";

      locale += "'height': '" + WebDeveloper.Locales.getString("height") + "',";
      locale += "'width': '" + WebDeveloper.Locales.getString("width") + "'";

      WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.displayImageDimensions(" + display + ", [document], {" + locale + "});");
    }
  });
};

// Displays the paths for all images
WebDeveloper.Overlay.Images.displayImagePaths = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.displayImagePaths(" + display + ", [document]);");
    }
  });
};

// Finds all the broken images on a page
WebDeveloper.Overlay.Images.findBrokenImages = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, {type: "get-broken-images"}, function(data)
      {
        var locale = WebDeveloper.Locales.setupGeneratedLocale();

        locale.brokenImage  = WebDeveloper.Locales.getString("brokenImage");
        locale.brokenImages = WebDeveloper.Locales.getString("brokenImages");

        chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/find-broken-images.html"), tab.index, data, locale);
      });
    }
  });
};

// Hides all background images
WebDeveloper.Overlay.Images.hideBackgroundImages = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.hideBackgroundImages([document]);");
    }
  });
};

// Hides all images
WebDeveloper.Overlay.Images.hideImages = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.hideImages(" + disable + ", [document]);");
    }
  });
};

// Makes all images full size
WebDeveloper.Overlay.Images.makeImagesFullSize = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Images.addFeatureOnTab(featureItem, tab, "WebDeveloper.Images.makeImagesFullSize([document]);");
    }
  });
};

// Makes all images invisible
WebDeveloper.Overlay.Images.makeImagesInvisible = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature   = featureItem.attr("id");
      var invisible = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.makeImagesInvisible(" + invisible + ", [document]);");
    }
  });
};

// Outlines all images
WebDeveloper.Overlay.Images.outlineAllImages = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.outlineAllImages([document]);");
    }
  });
};

// Outlines all background images
WebDeveloper.Overlay.Images.outlineBackgroundImages = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var outline = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.outlineBackgroundImages(" + outline + ", [document]);");
    }
  });
};

// Outlines all images with adjusted dimensions
WebDeveloper.Overlay.Images.outlineImagesWithAdjustedDimensions = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var outline = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.outlineImagesWithAdjustedDimensions(" + outline + ", [document]);");
    }
  });
};

// Outlines all images with empty alt attributes
WebDeveloper.Overlay.Images.outlineImagesWithEmptyAltAttributes = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.outlineImagesWithEmptyAltAttributes([document]);");
    }
  });
};

// Outlines all images with oversized dimensions
WebDeveloper.Overlay.Images.outlineImagesWithOversizedDimensions = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var outline = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.outlineImagesWithOversizedDimensions(" + outline + ", [document]);");
    }
  });
};

// Outlines all images without alt attributes
WebDeveloper.Overlay.Images.outlineImagesWithoutAltAttributes = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.outlineImagesWithoutAltAttributes([document]);");
    }
  });
};

// Outlines all images without dimensions
WebDeveloper.Overlay.Images.outlineImagesWithoutDimensions = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.outlineImagesWithoutDimensions([document]);");
    }
  });
};

// Reloads all the images on a page
WebDeveloper.Overlay.Images.reloadImages = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Images.addFeatureOnTab(featureItem, tab, "WebDeveloper.Images.reloadImages([document]);");
    }
  });
};

// Replaces all images with alt attributes
WebDeveloper.Overlay.Images.replaceImagesWithAltAttributes = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var replace = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.replaceImagesWithAltAttributes(" + replace + ", [document]);");
    }
  });
};

// Toggles a feature on a tab
WebDeveloper.Overlay.Images.toggleFeatureOnTab = function(featureItem, tab, scriptCode)
{
  WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "features/javascript/images.js", scriptCode);
};

// Toggles images
WebDeveloper.Overlay.Images.toggleImages = function()
{
  var menu = $(this);

  WebDeveloper.Overlay.toggleContentSetting("images", menu, "http://*/*", "enableImagesResult", "disableImagesResult");
  WebDeveloper.Overlay.toggleContentSetting("images", menu, "https://*/*");
};

// Displays all the images
WebDeveloper.Overlay.Images.viewImageInformation = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, {type: "get-images"}, function(data)
      {
        chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-image-information.html"), tab.index, data, WebDeveloper.Overlay.Images.getViewImageInformationLocale());
      });
    }
  });
};
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay             = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Information = WebDeveloper.Overlay.Information || {};

$(function()
{
  $("#display-abbreviations").append(WebDeveloper.Locales.getString("displayAbbreviations")).on("click", WebDeveloper.Overlay.Information.displayAbbreviations);
  $("#display-access-keys").append(WebDeveloper.Locales.getString("displayAccessKeys")).on("click", WebDeveloper.Overlay.Information.displayAccessKeys);
  $("#display-anchors").append(WebDeveloper.Locales.getString("displayAnchors")).on("click", WebDeveloper.Overlay.Information.displayAnchors);
  $("#display-aria-roles").append(WebDeveloper.Locales.getString("displayARIARoles")).on("click", WebDeveloper.Overlay.Information.displayARIARoles);
  $("#display-div-dimensions").append(WebDeveloper.Locales.getString("displayDivDimensions")).on("click", WebDeveloper.Overlay.Information.displayDivDimensions);
  $("#display-div-order").append(WebDeveloper.Locales.getString("displayDivOrder")).on("click", WebDeveloper.Overlay.Information.displayDivOrder);
  $("#display-element-information").append(WebDeveloper.Locales.getString("displayElementInformation")).on("click", WebDeveloper.Overlay.Information.displayElementInformation);
  $("#display-id-class-details").append(WebDeveloper.Locales.getString("displayIdClassDetails")).on("click", WebDeveloper.Overlay.Information.displayIdClassDetails);
  $("#display-link-details").append(WebDeveloper.Locales.getString("displayLinkDetails")).on("click", WebDeveloper.Overlay.Information.displayLinkDetails);
  $("#display-object-information").append(WebDeveloper.Locales.getString("displayObjectInformation")).on("click", WebDeveloper.Overlay.Information.displayObjectInformation);
  $("#display-stack-levels").append(WebDeveloper.Locales.getString("displayStackLevels")).on("click", WebDeveloper.Overlay.Information.displayStackLevels);
  $("#display-tab-index").append(WebDeveloper.Locales.getString("displayTabIndex")).on("click", WebDeveloper.Overlay.Information.displayTabIndex);
  $("#display-table-depth").append(WebDeveloper.Locales.getString("displayTableDepth")).on("click", WebDeveloper.Overlay.Information.displayTableDepth);
  $("#display-table-information").append(WebDeveloper.Locales.getString("displayTableInformation")).on("click", WebDeveloper.Overlay.Information.displayTableInformation);
  $("#display-title-attributes").append(WebDeveloper.Locales.getString("displayTitleAttributes")).on("click", WebDeveloper.Overlay.Information.displayTitleAttributes);
  $("#display-topographic-information").append(WebDeveloper.Locales.getString("displayTopographicInformation")).on("click", WebDeveloper.Overlay.Information.displayTopographicInformation);
  $("#find-duplicate-ids").append(WebDeveloper.Locales.getString("findDuplicateIds")).on("click", WebDeveloper.Overlay.Information.findDuplicateIds);
  $("#view-anchor-information").append(WebDeveloper.Locales.getString("viewAnchorInformation")).on("click", WebDeveloper.Overlay.Information.viewAnchorInformation);
  $("#view-color-information").append(WebDeveloper.Locales.getString("viewColorInformation")).on("click", WebDeveloper.Overlay.Information.viewColorInformation);
  $("#view-document-outline").append(WebDeveloper.Locales.getString("viewDocumentOutline")).on("click", WebDeveloper.Overlay.Information.viewDocumentOutline);
  $("#view-link-information").append(WebDeveloper.Locales.getString("viewLinkInformation")).on("click", WebDeveloper.Overlay.Information.viewLinkInformation);
  $("#view-meta-tag-information").append(WebDeveloper.Locales.getString("viewMetaTagInformation")).on("click", WebDeveloper.Overlay.Information.viewMetaTagInformation);
  $("#view-javascript").append(WebDeveloper.Locales.getString("viewJavaScript")).on("click", WebDeveloper.Overlay.Information.viewJavaScript);
  $("#view-response-headers").append(WebDeveloper.Locales.getString("viewResponseHeaders")).on("click", WebDeveloper.Overlay.Information.viewResponseHeaders);
});

// Displays the abbreviations on a page
WebDeveloper.Overlay.Information.displayAbbreviations = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayAbbreviations([document]);");
    }
  });
};

// Displays the access keys on a page
WebDeveloper.Overlay.Information.displayAccessKeys = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayAccessKeys(" + display + ", [document]);");
    }
  });
};

// Displays the anchors on a page
WebDeveloper.Overlay.Information.displayAnchors = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayAnchors(" + display + ", [document]);");
    }
  });
};

// Displays the ARIA roles on a page
WebDeveloper.Overlay.Information.displayARIARoles = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayARIARoles([document]);");
    }
  });
};

// Displays the dimensions for divs on a page
WebDeveloper.Overlay.Information.displayDivDimensions = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);
      var locale  = "";

      locale += "'height': '" + WebDeveloper.Locales.getString("height") + "',";
      locale += "'width': '" + WebDeveloper.Locales.getString("width") + "'";

      WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayDivDimensions(" + display + ", [document], {" + locale + "});");
    }
  });
};

// Displays the order of the divs on a page
WebDeveloper.Overlay.Information.displayDivOrder = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayDivOrder(" + display + ", [document]);");
    }
  });
};

// Displays information about an element
WebDeveloper.Overlay.Information.displayElementInformation = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);
      var locale  = "";

      locale += "'ancestors': '" + WebDeveloper.Locales.getString("ancestors") + "',";
      locale += "'children': '" + WebDeveloper.Locales.getString("children") + "',";
      locale += "'dashboardTitle': '" + WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("dashboard") + "',";
      locale += "'dom': '" + WebDeveloper.Locales.getString("dom") + "',";
      locale += "'elementInformation': '" + WebDeveloper.Locales.getString("elementInformation") + "',";
      locale += "'layout': '" + WebDeveloper.Locales.getString("layout") + "',";
      locale += "'position': '" + WebDeveloper.Locales.getString("position") + "',";
      locale += "'selectAnElementDisplayInformation': '" + WebDeveloper.Locales.getString("selectAnElementDisplayInformation") + "',";
      locale += "'text': '" + WebDeveloper.Locales.getString("text") + "'";

      WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "dashboard/javascript/dashboard.js", "WebDeveloper.ElementInformation.initialize(" + display + ", document, {" + locale + "});", true);
    }
  });
};

// Displays the id and class details for a page
WebDeveloper.Overlay.Information.displayIdClassDetails = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayIdClassDetails(" + display + ", [document]);");
    }
  });
};

// Displays the details for the links on a page
WebDeveloper.Overlay.Information.displayLinkDetails = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayLinkDetails([document]);");
    }
  });
};

// Displays the information for objects on a page
WebDeveloper.Overlay.Information.displayObjectInformation = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayObjectInformation(" + display + ", [document]);");
    }
  });
};

// Displays the stack levels on a page
WebDeveloper.Overlay.Information.displayStackLevels = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayStackLevels(" + display + ", [document]);");
    }
  });
};

// Displays the tab indices on a page
WebDeveloper.Overlay.Information.displayTabIndex = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayTabIndex(" + display + ", [document]);");
    }
  });
};

// Displays the depth of all tables on a page
WebDeveloper.Overlay.Information.displayTableDepth = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayTableDepth(" + display + ", [document], " + '"' + WebDeveloper.Locales.getString("depth") + '");');
    }
  });
};

// Displays the information for tables on a page
WebDeveloper.Overlay.Information.displayTableInformation = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayTableInformation(" + display + ", [document]);");
    }
  });
};

// Displays the title attributes on a page
WebDeveloper.Overlay.Information.displayTitleAttributes = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayTitleAttributes(" + display + ", [document]);");
    }
  });
};

// Displays the topographic information for a page
WebDeveloper.Overlay.Information.displayTopographicInformation = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayTopographicInformation([document]);");
    }
  });
};

// Finds all the duplicate ids on a page
WebDeveloper.Overlay.Information.findDuplicateIds = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, {type: "get-duplicate-ids"}, function(data)
      {
        var locale = WebDeveloper.Locales.setupGeneratedLocale();

        locale.duplicateId  = WebDeveloper.Locales.getString("duplicateId");
        locale.duplicateIds = WebDeveloper.Locales.getString("duplicateIds");

        chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/find-duplicate-ids.html"), tab.index, data, locale);
      });
    }
  });
};

// Toggles a feature on a tab
WebDeveloper.Overlay.Information.toggleFeatureOnTab = function(featureItem, tab, scriptCode)
{
  WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "features/javascript/information.js", scriptCode);
};

// Displays the anchor information for a page
WebDeveloper.Overlay.Information.viewAnchorInformation = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, {type: "get-anchors"}, function(data)
      {
        chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-anchor-information.html"), tab.index, data, WebDeveloper.Overlay.Information.getViewAnchorInformationLocale());
      });
    }
  });
};

// Displays the color information for a page
WebDeveloper.Overlay.Information.viewColorInformation = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, {type: "get-colors"}, function(data)
      {
        chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-color-information.html"), tab.index, data, WebDeveloper.Overlay.Information.getViewColorInformationLocale());
      });
    }
  });
};

// Displays the document outline
WebDeveloper.Overlay.Information.viewDocumentOutline = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, {type: "get-document-outline"}, function(data)
      {
        chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-document-outline.html"), tab.index, data, WebDeveloper.Overlay.Information.getViewDocumentOutlineLocale());
      });
    }
  });
};

// Displays the JavaScript
WebDeveloper.Overlay.Information.viewJavaScript = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, {type: "get-javascript"}, function(data)
      {
        data.theme = chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("syntax_highlight_theme");

        chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-javascript.html"), tab.index, data, WebDeveloper.Overlay.Information.getViewJavaScriptLocale());
      });
    }
  });
};

// Displays the link information for a page
WebDeveloper.Overlay.Information.viewLinkInformation = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, {type: "get-links"}, function(data)
      {
        chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-link-information.html"), tab.index, data, WebDeveloper.Overlay.Information.getViewLinkInformationLocale());
      });
    }
  });
};

// Displays the meta tag information for a page
WebDeveloper.Overlay.Information.viewMetaTagInformation = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, {type: "get-meta-tags"}, function(data)
      {
        chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-meta-tag-information.html"), tab.index, data, WebDeveloper.Overlay.Information.getViewMetaTagInformationLocale());
      });
    }
  });
};

// Displays the response headers
WebDeveloper.Overlay.Information.viewResponseHeaders = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, {type: "get-document-details"}, function(data)
      {
        chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-response-headers.html"), tab.index, data, WebDeveloper.Overlay.Information.getViewResponseHeadersLocale());
      });
    }
  });
};
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay               = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Miscellaneous = WebDeveloper.Overlay.Miscellaneous || {};

$(function()
{
  $("#clear-cache").append(WebDeveloper.Locales.getString("clearCache")).on("click", WebDeveloper.Overlay.Miscellaneous.clearCache);
  $("#clear-history").append(WebDeveloper.Locales.getString("clearHistory")).on("click", WebDeveloper.Overlay.Miscellaneous.confirmClearHistory);
  $("#display-color-picker").append(WebDeveloper.Locales.getString("displayColorPicker")).on("click", WebDeveloper.Overlay.Miscellaneous.displayColorPicker);
  $("#display-hidden-elements").append(WebDeveloper.Locales.getString("displayHiddenElements")).on("click", WebDeveloper.Overlay.Miscellaneous.displayHiddenElements);
  $("#display-line-guides").append(WebDeveloper.Locales.getString("displayLineGuides")).on("click", WebDeveloper.Overlay.Miscellaneous.displayLineGuides);
  $("#display-ruler").append(WebDeveloper.Locales.getString("displayRuler")).on("click", WebDeveloper.Overlay.Miscellaneous.displayRuler);
  $("#linearize-page").append(WebDeveloper.Locales.getString("linearizePage")).on("click", WebDeveloper.Overlay.Miscellaneous.linearizePage);
  $("#make-frames-resizable").append(WebDeveloper.Locales.getString("makeFramesResizable")).on("click", WebDeveloper.Overlay.Miscellaneous.makeFramesResizable);
  $("#mark-all-links-unvisited").append(WebDeveloper.Locales.getString("markAllLinksUnvisited")).on("click", function() { WebDeveloper.Overlay.Miscellaneous.toggleVisitedLinks(false); });
  $("#mark-all-links-visited").append(WebDeveloper.Locales.getString("markAllLinksVisited")).on("click", function() { WebDeveloper.Overlay.Miscellaneous.toggleVisitedLinks(true); });
});

// Adds a feature on a tab
WebDeveloper.Overlay.Miscellaneous.addFeatureOnTab = function(featureItem, tab, scriptCode)
{
  WebDeveloper.Overlay.addFeatureOnTab(featureItem, tab, "features/javascript/miscellaneous.js", scriptCode);
};

// Adds an href to the history
WebDeveloper.Overlay.Miscellaneous.addToHistory = function(href)
{
  chrome.history.addUrl({url: href});
};

// Clears the cache
WebDeveloper.Overlay.Miscellaneous.clearCache = function()
{
  WebDeveloper.Overlay.openTab("chrome://settings/clearBrowserData");
};

// Clears the history
WebDeveloper.Overlay.Miscellaneous.clearHistory = function()
{
  WebDeveloper.Overlay.closeConfirmation();

  chrome.history.deleteAll(function()
  {
    WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString("clearHistoryResult"));
  });
};

// Asks to confirm to clear the history
WebDeveloper.Overlay.Miscellaneous.confirmClearHistory = function()
{
  WebDeveloper.Overlay.displayConfirmation(null, WebDeveloper.Locales.getString("clearHistoryConfirmation"), WebDeveloper.Locales.getString("clear"), "trash", WebDeveloper.Overlay.Miscellaneous.clearHistory);
};

// Displays a color picker
WebDeveloper.Overlay.Miscellaneous.displayColorPicker = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);
      var locale  = {};

      locale.hoverColor    = WebDeveloper.Locales.getString("hoverColor");
      locale.selectedColor = WebDeveloper.Locales.getString("selectedColor");
      locale.title         = WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("colorPicker");

      WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "toolbar/javascript/color-picker.js", "WebDeveloper.ColorPicker.displayColorPicker(" + display + ", document, '" + ich.colorPickerToolbar(locale, true) + "');", true);
    }
  });
};

// Displays all hidden elements
WebDeveloper.Overlay.Miscellaneous.displayHiddenElements = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Miscellaneous.addFeatureOnTab(featureItem, tab, "WebDeveloper.Miscellaneous.displayHiddenElements([document]);");
    }
  });
};

// Displays line guides
WebDeveloper.Overlay.Miscellaneous.displayLineGuides = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);
      var locale  = {};

      locale.addHorizontalLineGuide = WebDeveloper.Locales.getString("addHorizontalLineGuide");
      locale.addVerticalLineGuide   = WebDeveloper.Locales.getString("addVerticalLineGuide");
      locale.nextPosition           = WebDeveloper.Locales.getString("nextPosition");
      locale.positionLabel          = WebDeveloper.Locales.getString("positionLabel");
      locale.previousPosition       = WebDeveloper.Locales.getString("previousPosition");
      locale.title                  = WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("lineGuides");

      WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "toolbar/javascript/line-guides.js", "WebDeveloper.LineGuides.displayLineGuides(" + display + ", document, '" + ich.lineGuidesToolbar(locale, true) + "');", true);
    }
  });
};

// Displays a ruler
WebDeveloper.Overlay.Miscellaneous.displayRuler = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);
      var locale  = {};

      locale.endPositionX   = WebDeveloper.Locales.getString("endPositionX");
      locale.height         = WebDeveloper.Locales.getString("height");
      locale.startPositionX = WebDeveloper.Locales.getString("startPositionX");
      locale.title          = WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("ruler");
      locale.width          = WebDeveloper.Locales.getString("width");
      locale.yLabel         = WebDeveloper.Locales.getString("yLabel");

      WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "toolbar/javascript/ruler.js", "WebDeveloper.Ruler.displayRuler(" + display + ", document, '" + ich.rulerToolbar(locale, true) + "');", true);
    }
  });
};

// Linearizes a page
WebDeveloper.Overlay.Miscellaneous.linearizePage = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Miscellaneous.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Miscellaneous.linearizePage([document]);");
    }
  });
};

// Makes all frames resizable
WebDeveloper.Overlay.Miscellaneous.makeFramesResizable = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Miscellaneous.addFeatureOnTab(featureItem, tab, "WebDeveloper.Miscellaneous.makeFramesResizable([document]);");
    }
  });
};

// Removes an href from the history
WebDeveloper.Overlay.Miscellaneous.removeFromHistory = function(href)
{
  chrome.history.deleteUrl({url: href});
};

// Toggles a feature on a tab
WebDeveloper.Overlay.Miscellaneous.toggleFeatureOnTab = function(featureItem, tab, scriptCode)
{
  WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "features/javascript/miscellaneous.js", scriptCode);
};

// Toggles all links on the page between visited and unvisited
WebDeveloper.Overlay.Miscellaneous.toggleVisitedLinks = function(visited)
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, {type: "get-links"}, function(data)
      {
        var documents = data.documents;
        var links     = null;

        // Loop through the documents
        for(var i = 0, l = documents.length; i < l; i++)
        {
          links = documents[i].links;

          // Loop through all the links
          for(var j = 0, m = links.length; j < m; j++)
          {
            // If marking links as visited
            if(visited)
            {
              WebDeveloper.Overlay.Miscellaneous.addToHistory(links[j]);
            }
            else
            {
              WebDeveloper.Overlay.Miscellaneous.removeFromHistory(links[j]);
            }
          }
        }
      });
    }
  });
};
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay         = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Options = WebDeveloper.Overlay.Options || {};

$(function()
{
  $("#about").append(WebDeveloper.Locales.getString("aboutMenu")).on("click", WebDeveloper.Overlay.Options.about);
  $("#help").append(WebDeveloper.Locales.getString("help")).on("click", WebDeveloper.Overlay.openURL);
  $("#options").append(WebDeveloper.Locales.getString("optionsMenu")).on("click", WebDeveloper.Overlay.Options.options);
  $("#reset-page").append(WebDeveloper.Locales.getString("resetPage")).on("click", WebDeveloper.Overlay.Options.resetPage);
});

// Opens the about page
WebDeveloper.Overlay.Options.about = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("about/about.html"), tab.index, null, WebDeveloper.Overlay.Options.getAboutLocale());
  });
};

// Opens the options
WebDeveloper.Overlay.Options.options = function()
{
  WebDeveloper.Overlay.openTab(chrome.extension.getURL("options/options.html"));
};

// Resets the page
WebDeveloper.Overlay.Options.resetPage = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    WebDeveloper.Overlay.addScriptToTab(tab, { "code": "window.location.reload();" }, function()
    {
      WebDeveloper.Overlay.close();
    });
  });
};
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay         = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Outline = WebDeveloper.Overlay.Outline || {};

$(function()
{
  var showElementTagNamesMenu = $("#show-element-tag-names");

  $("#outline-absolute-positioned-elements").append(WebDeveloper.Locales.getString("outlineAbsolutePositionedElements")).on("click", WebDeveloper.Overlay.Outline.outlineAbsolutePositionedElements);
  $("#outline-block-level-elements").append(WebDeveloper.Locales.getString("outlineBlockLevelElements")).on("click", WebDeveloper.Overlay.Outline.outlineBlockLevelElements);
  $("#outline-deprecated-elements").append(WebDeveloper.Locales.getString("outlineDeprecatedElements")).on("click", WebDeveloper.Overlay.Outline.outlineDeprecatedElements);
  $("#outline-external-links").append(WebDeveloper.Locales.getString("outlineExternalLinks")).on("click", WebDeveloper.Overlay.Outline.outlineExternalLinks);
  $("#outline-fixed-positioned-elements").append(WebDeveloper.Locales.getString("outlineFixedPositionedElements")).on("click", WebDeveloper.Overlay.Outline.outlineFixedPositionedElements);
  $("#outline-floated-elements").append(WebDeveloper.Locales.getString("outlineFloatedElements")).on("click", WebDeveloper.Overlay.Outline.outlineFloatedElements);
  $("#outline-frames").append(WebDeveloper.Locales.getString("outlineFrames")).on("click", WebDeveloper.Overlay.Outline.outlineFrames);
  $("#outline-headings").append(WebDeveloper.Locales.getString("outlineHeadings")).on("click", WebDeveloper.Overlay.Outline.outlineHeadings);
  $("#outline-non-secure-elements").append(WebDeveloper.Locales.getString("outlineNonSecureElements")).on("click", WebDeveloper.Overlay.Outline.outlineNonSecureElements);
  $("#outline-relative-positioned-elements").append(WebDeveloper.Locales.getString("outlineRelativePositionedElements")).on("click", WebDeveloper.Overlay.Outline.outlineRelativePositionedElements);
  $("#outline-table-captions").append(WebDeveloper.Locales.getString("outlineTableCaptions")).on("click", WebDeveloper.Overlay.Outline.outlineTableCaptions);
  $("#outline-table-cells").append(WebDeveloper.Locales.getString("outlineTableCells")).on("click", WebDeveloper.Overlay.Outline.outlineTableCells);
  $("#outline-tables").append(WebDeveloper.Locales.getString("outlineTables")).on("click", WebDeveloper.Overlay.Outline.outlineTables);
  showElementTagNamesMenu.append(WebDeveloper.Locales.getString("showElementTagNames")).on("click", WebDeveloper.Overlay.Outline.toggleShowElementTagNames);

  // If the outline show element tag names preference is set to true
  if(chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("outline.show.element.tag.names") == "true")
  {
    showElementTagNamesMenu.addClass("active");
  }
});

// Outlines all absolute positioned elements
WebDeveloper.Overlay.Outline.outlineAbsolutePositionedElements = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var outline = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, 'WebDeveloper.Outline.outlinePositionedElements("absolute", ' + outline + ", [document]);");
    }
  });
};

// Outlines all block level elements
WebDeveloper.Overlay.Outline.outlineBlockLevelElements = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var showElementTagNames = chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("outline.show.element.tag.names") == "true";

      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineBlockLevelElements([document], " + showElementTagNames + ");");
    }
  });
};

// Outlines all deprecated elements
WebDeveloper.Overlay.Outline.outlineDeprecatedElements = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var showElementTagNames = chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("outline.show.element.tag.names") == "true";

      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineDeprecatedElements([document], " + showElementTagNames + ");");
    }
  });
};

// Outlines all external links
WebDeveloper.Overlay.Outline.outlineExternalLinks = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var outline = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineExternalLinks(" + outline + ", [document]);");
    }
  });
};

// Outlines all fixed positioned elements
WebDeveloper.Overlay.Outline.outlineFixedPositionedElements = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var outline = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, 'WebDeveloper.Outline.outlinePositionedElements("fixed", ' + outline + ", [document]);");
    }
  });
};

// Outlines all floated elements
WebDeveloper.Overlay.Outline.outlineFloatedElements = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var outline = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineFloatedElements(" + outline + ", [document]);");
    }
  });
};

// Outlines all frames
WebDeveloper.Overlay.Outline.outlineFrames = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineFrames([document]);");
    }
  });
};

// Outlines all headings
WebDeveloper.Overlay.Outline.outlineHeadings = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var showElementTagNames = chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("outline.show.element.tag.names") == "true";

      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineHeadings([document], " + showElementTagNames + ");");
    }
  });
};

// Outlines all non-secure elements
WebDeveloper.Overlay.Outline.outlineNonSecureElements = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineNonSecureElements([document]);");
    }
  });
};

// Outlines all relative positioned elements
WebDeveloper.Overlay.Outline.outlineRelativePositionedElements = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var outline = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, 'WebDeveloper.Outline.outlinePositionedElements("relative", ' + outline + ", [document]);");
    }
  });
};

// Outlines all table captions
WebDeveloper.Overlay.Outline.outlineTableCaptions = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineTableCaptions([document]);");
    }
  });
};

// Outlines all table cells
WebDeveloper.Overlay.Outline.outlineTableCells = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var showElementTagNames = chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("outline.show.element.tag.names") == "true";

      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineTableCells([document], " + showElementTagNames + ");");
    }
  });
};

// Outlines all tables
WebDeveloper.Overlay.Outline.outlineTables = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineTables([document]);");
    }
  });
};

// Toggles a feature on a tab
WebDeveloper.Overlay.Outline.toggleFeatureOnTab = function(featureItem, tab, scriptCode)
{
  WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "features/javascript/outline.js", scriptCode);
};

// Toggles whether to show element tag names when outlining
WebDeveloper.Overlay.Outline.toggleShowElementTagNames = function()
{
  var featureItem = $(this);

  featureItem.toggleClass("active");
  chrome.extension.getBackgroundPage().WebDeveloper.Storage.setItem("outline.show.element.tag.names", featureItem.hasClass("active"));
};

var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay        = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Resize = WebDeveloper.Overlay.Resize || {};

$(function()
{
  var resizeWindowHeight = $("#resize-window-height");
  var resizeWindowWidth  = $("#resize-window-width");

  $("#display-window-size").append(WebDeveloper.Locales.getString("displayWindowSize")).on("click", WebDeveloper.Overlay.Resize.displayWindowSize);
  $("#edit-resize-dimensions").append(WebDeveloper.Locales.getString("editResizeDimensions")).on("click", WebDeveloper.Overlay.Resize.editResizeDimensions);
  $("#resize-menu").on("click", ".custom-resize-window", WebDeveloper.Overlay.Resize.customResizeWindow);
  $("#resize-window").append(WebDeveloper.Locales.getString("resizeWindowMenu")).on("click", WebDeveloper.Overlay.Resize.displayResizeDialog);
  $("#view-responsive-layouts").append(WebDeveloper.Locales.getString("viewResponsiveLayouts")).on("click", WebDeveloper.Overlay.Resize.viewResponsiveLayouts);

  $("#resize-window-cancel").on("click", WebDeveloper.Overlay.Resize.cancelResizeWindow);
  $("#resize-window-dialog").on("submit", function(event) { event.preventDefault(); });
  $("#resize-window-submit").on("click", WebDeveloper.Overlay.Resize.submitResizeWindow);

  $("legend", $("#resize-window-dialog")).text(WebDeveloper.Locales.getString("resizeWindow"));
  $("#resize-window-cancel").text(WebDeveloper.Locales.getString("cancel"));
  $("#resize-window-submit").append(WebDeveloper.Locales.getString("resize"));
  $('[for="resize-window-height"]').text(WebDeveloper.Locales.getString("height"));
  $('[for="resize-window-width"]').text(WebDeveloper.Locales.getString("width"));

  resizeWindowHeight.attr("placeholder", WebDeveloper.Locales.getString("heightPlaceholder"));
  resizeWindowWidth.attr("placeholder", WebDeveloper.Locales.getString("widthPlaceholder"));
  resizeWindowHeight.add(resizeWindowWidth).on("keypress", WebDeveloper.Overlay.Resize.resizeWindowKeyPress);

  WebDeveloper.Overlay.Resize.setupCustomResizeOptions();
});

// Cancels resizing the window
WebDeveloper.Overlay.Resize.cancelResizeWindow = function()
{
  $("#resize-window-dialog").slideUp(WebDeveloper.Overlay.animationSpeed, function()
  {
    $(".tabbable").slideDown(WebDeveloper.Overlay.animationSpeed);
  });
};

// Resizes the window to a custom size
WebDeveloper.Overlay.Resize.customResizeWindow = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.Resize.resizeWindow(featureItem.data("height"), featureItem.data("width"));
};

// Displays the resize dialog
WebDeveloper.Overlay.Resize.displayResizeDialog = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, {type: "get-window-size"}, function(response)
      {
        var resizeWindowDialog = $("#resize-window-dialog");

        $("#resize-window-height").val(response.outerHeight);
        $("#resize-window-width").val(response.outerWidth).focus();

        WebDeveloper.Overlay.Resize.resetResizeDialog(resizeWindowDialog);

        $(".tabbable, #confirmation, #notification").slideUp(WebDeveloper.Overlay.animationSpeed, function()
        {
          resizeWindowDialog.slideDown(WebDeveloper.Overlay.animationSpeed);
        });
      });
    }
  });
};

// Displays the window size
WebDeveloper.Overlay.Resize.displayWindowSize = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, {type: "get-window-size"}, function(response)
      {
        WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getFormattedString("displayWindowSizeResult", [response.outerWidth, response.outerHeight, response.innerWidth, response.innerHeight]), "info");
      });
    }
  });
};

// Opens the options to edit the resize dimensions
WebDeveloper.Overlay.Resize.editResizeDimensions = function()
{
  WebDeveloper.Overlay.openTab(chrome.extension.getURL("options/options.html#resize-tab"));
};

// Resets the add cookie dialog
WebDeveloper.Overlay.Resize.resetResizeDialog = function(resizeDialog)
{
  $(".has-error", resizeDialog).removeClass("has-error");
  $(".help-block", resizeDialog).text("");
};

// Resizes the window
WebDeveloper.Overlay.Resize.resizeWindow = function(height, width)
{
  WebDeveloper.Overlay.getSelectedWindow(function(selectedWindow)
  {
    var size = {};

    // Set the window state to normal before resizing the window
    size.state = "normal";

    // If the height is not a wildcard
    if(height != "*")
    {
      size.height = parseInt(height, 10);
    }

    // If the width is not a wildcard
    if(width != "*")
    {
      size.width = parseInt(width, 10);
    }

    chrome.windows.update(selectedWindow.id, size, function()
    {
      WebDeveloper.Overlay.close();
    });
  });
};

// Handles a key press when resizing the window
WebDeveloper.Overlay.Resize.resizeWindowKeyPress = function(event)
{
  // If the enter key was pressed
  if(event.keyCode == 13)
  {
    WebDeveloper.Overlay.Resize.submitResizeWindow();
  }
};

// Sets up the custom resize options
WebDeveloper.Overlay.Resize.setupCustomResizeOptions = function()
{
  var description          = null;
  var editResizeDimensions = $("#edit-resize-dimensions").closest("li");
  var height               = 0;
  var resizeOption         = null;
  var storage              = chrome.extension.getBackgroundPage().WebDeveloper.Storage;
  var width                = 0;

  $(".custom-resize-window", $("#custom-resize-options")).remove();

  // Loop through the resize options
  for(var i = 1, l = storage.getItem("resize_count"); i <= l; i++)
  {
    description = storage.getItem("resize_" + i + "_description");
    height      = storage.getItem("resize_" + i + "_height");
    width       = storage.getItem("resize_" + i + "_width");

    // If the description, height and width are set
    if(description && height > 0 && width > 0)
    {
      resizeOption = {};

      resizeOption.description = description;
      resizeOption.height      = height;
      resizeOption.width       = width;

      editResizeDimensions.before(ich.customResizeOption(resizeOption));
    }
  }
};

// Resizes the window
WebDeveloper.Overlay.Resize.submitResizeWindow = function()
{
  // If the dialog is valid
  if(WebDeveloper.Overlay.Resize.validateResizeDialog())
  {
    WebDeveloper.Overlay.Resize.resizeWindow($("#resize-window-height").val(), $("#resize-window-width").val());
  }
};

// Returns true if the resize dialog is valid
WebDeveloper.Overlay.Resize.validateResizeDialog = function()
{
  var height      = $("#resize-window-height");
  var heightValue = height.val().trim();
  var width       = $("#resize-window-width");
  var widthValue  = width.val().trim();
  var valid       = true;

  WebDeveloper.Overlay.Resize.resetResizeDialog($("#resize-window-dialog"));

  // If the height is not set
  if(!heightValue)
  {
    height.closest(".form-group").addClass("has-error");
    height.closest(".input-group").next(".help-block").text(WebDeveloper.Locales.getString("heightCannotBeEmpty"));

    valid = false;
  }
  else if(heightValue != "*" && (parseInt(heightValue, 10) != heightValue || heightValue <= 0))
  {
    height.closest(".form-group").addClass("has-error");
    height.closest(".input-group").next(".help-block").text(WebDeveloper.Locales.getString("heightNotValid"));

    valid = false;
  }

  // If the width is not set
  if(!widthValue)
  {
    width.closest(".form-group").addClass("has-error");
    width.closest(".input-group").next(".help-block").text(WebDeveloper.Locales.getString("widthCannotBeEmpty"));

    valid = false;
  }
  else if(widthValue != "*" && (parseInt(widthValue, 10) != widthValue || widthValue <= 0))
  {
    width.closest(".form-group").addClass("has-error");
    width.closest(".input-group").next(".help-block").text(WebDeveloper.Locales.getString("widthNotValid"));

    valid = false;
  }

  return valid;
};

// Displays the responsive layouts for the page
WebDeveloper.Overlay.Resize.viewResponsiveLayouts = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var data        = {};
      var description = null;
      var height      = null;
      var layout      = null;
      var storage     = chrome.extension.getBackgroundPage().WebDeveloper.Storage;
      var width       = null;

      data.layouts = [];
      data.pageURL = tab.url;

      // Loop through the possible responsive options
      for(var i = 1, l = storage.getItem("responsive_layout_count"); i <= l; i++)
      {
        description = storage.getItem("responsive_layout_" + i + "_description");
        height      = storage.getItem("responsive_layout_" + i + "_height");
        width       = storage.getItem("responsive_layout_" + i + "_width");

        // If the description, height and width are set
        if(description && height > 0 && width > 0)
        {
          layout             = {};
          layout.description = description;
          layout.height      = height;
          layout.width       = width;

          data.layouts.push(layout);
        }
      }

      chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-responsive-layouts.html"), tab.index, data, WebDeveloper.Overlay.Resize.getViewResponsiveLayoutsLocale());
    }
  });
};
var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay       = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Tools = WebDeveloper.Overlay.Tools || {};

$(function()
{
  $("#edit-tools").append(WebDeveloper.Locales.getString("editTools")).on("click", WebDeveloper.Overlay.Tools.editTools);
  $("#tools-menu").on("click", ".custom-tool", WebDeveloper.Overlay.Tools.customTool);
  $("#validate-local-css").append(WebDeveloper.Locales.getString("validateLocalCSS")).on("click", WebDeveloper.Overlay.Tools.validateLocalCSS);
  $("#validate-local-html").append(WebDeveloper.Locales.getString("validateLocalHTML")).on("click", WebDeveloper.Overlay.Tools.validateLocalHTML);
  $("#view-source").append(WebDeveloper.Locales.getString("viewSource")).on("click", WebDeveloper.Overlay.Tools.viewSource);

  WebDeveloper.Overlay.Tools.setupCustomTools();
});

// Opens a custom tool
WebDeveloper.Overlay.Tools.customTool = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    WebDeveloper.Overlay.openTab(featureItem.data("url") + tab.url);
  });
};

// Opens the options to edit the tools
WebDeveloper.Overlay.Tools.editTools = function()
{
  WebDeveloper.Overlay.openTab(chrome.extension.getURL("options/options.html#tools-tab"));
};

// Sets up the custom tools
WebDeveloper.Overlay.Tools.setupCustomTools = function()
{
  var description = null;
  var editTools   = $("#edit-tools").closest("li");
  var storage     = chrome.extension.getBackgroundPage().WebDeveloper.Storage;
  var tool        = null;
  var url         = 0;

  $(".custom-tool", $("#custom-tools")).remove();

  // Loop through the tools
  for(var i = 1, l = storage.getItem("tool_count"); i <= l; i++)
  {
    description = storage.getItem("tool_" + i + "_description");
    url         = storage.getItem("tool_" + i + "_url");

    // If the description and url are set
    if(description && url)
    {
      tool = {};

      tool.description = description;
      tool.url         = url;

      editTools.before(ich.customTool(tool));
    }
  }
};

// Validates the CSS of the local page
WebDeveloper.Overlay.Tools.validateLocalCSS = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, {type: "get-css"}, function(data)
      {
        chrome.extension.getBackgroundPage().WebDeveloper.Background.validateLocalCSS(chrome.extension.getURL("validation/css.html"), tab.index, data);
      });
    }
  });
};

// Validates the HTML of the local page
WebDeveloper.Overlay.Tools.validateLocalHTML = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.extension.getBackgroundPage().WebDeveloper.Background.validateLocalHTML(chrome.extension.getURL("validation/html.html"), tab.index, tab.url);
    }
  });
};

// Displays the source of the page
WebDeveloper.Overlay.Tools.viewSource = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    WebDeveloper.Overlay.openTab("view-source:" + tab.url);
  });
};
