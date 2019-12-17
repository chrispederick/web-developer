var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

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
  WebDeveloper.Overlay.addFeatureOnTab(featureItem, tab, "/features/javascript/images.js", scriptCode);
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
      chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(featureItem.attr("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.displayAltAttributes(" + !enabled + ", [document]);");
      });
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
      var locale = "";

      locale += "'height': '" + WebDeveloper.Locales.getString("height") + "',";
      locale += "'width': '" + WebDeveloper.Locales.getString("width") + "'";

      chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(featureItem.attr("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.displayImageDimensions(" + !enabled + ", [document], {" + locale + "});");
      });
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
      chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(featureItem.attr("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.displayImagePaths(" + !enabled + ", [document]);");
      });
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
      chrome.tabs.sendMessage(tab.id, { type: "get-broken-images" }, function(data)
      {
        var locale = WebDeveloper.Locales.setupGeneratedLocale();

        locale.brokenImage  = WebDeveloper.Locales.getString("brokenImage");
        locale.brokenImages = WebDeveloper.Locales.getString("brokenImages");

        chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("/generated/find-broken-images.html"), tab.index, data, locale);
        WebDeveloper.Overlay.close();
      });
    }
  });
};

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
      chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(featureItem.attr("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.hideImages(" + !enabled + ", [document]);");
      });
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
      chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(featureItem.attr("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.makeImagesInvisible(" + !enabled + ", [document]);");
      });
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
      chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(featureItem.attr("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.outlineBackgroundImages(" + !enabled + ", [document]);");
      });
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
      chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(featureItem.attr("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.outlineImagesWithAdjustedDimensions(" + !enabled + ", [document]);");
      });
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
      chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(featureItem.attr("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.outlineImagesWithOversizedDimensions(" + !enabled + ", [document]);");
      });
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
      chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(featureItem.attr("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.replaceImagesWithAltAttributes(" + !enabled + ", [document]);");
      });
    }
  });
};

// Toggles a feature on a tab
WebDeveloper.Overlay.Images.toggleFeatureOnTab = function(featureItem, tab, scriptCode)
{
  WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "/features/javascript/images.js", scriptCode);
};

// Toggles images
WebDeveloper.Overlay.Images.toggleImages = function()
{
  WebDeveloper.Overlay.toggleContentSetting("images", $(this), "enableImagesResult", "disableImagesResult");
};

// Displays all the images
WebDeveloper.Overlay.Images.viewImageInformation = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, { type: "get-images" }, function(data)
      {
        chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("/generated/view-image-information.html"), tab.index, data, WebDeveloper.Overlay.Images.getViewImageInformationLocale());
        WebDeveloper.Overlay.close();
      });
    }
  });
};
