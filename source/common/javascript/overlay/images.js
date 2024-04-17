var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Overlay        = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Images = WebDeveloper.Overlay.Images || {};

// Adds a feature on a tab
WebDeveloper.Overlay.Images.addFeatureOnTab = function(featureItem, tab, scriptCode, args)
{
  WebDeveloper.Overlay.addFeatureOnTab(featureItem, tab, "/features/javascript/images.js", scriptCode, args);
};

// Displays alt attributes for all images
WebDeveloper.Overlay.Images.displayAltAttributes = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Images.displayAltAttributes(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Displays the dimensions for all images
WebDeveloper.Overlay.Images.displayImageDimensions = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var locale = {};

      locale.height = WebDeveloper.Locales.getString("height");
      locale.width  = WebDeveloper.Locales.getString("width");

      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, function(featureEnabled, featureLocale) { WebDeveloper.Images.displayImageDimensions(!featureEnabled, [document], featureLocale); }, [enabled, locale]);
      });
    }
  });
};

// Displays the paths for all images
WebDeveloper.Overlay.Images.displayImagePaths = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Images.displayImagePaths(!featureEnabled, [document]); }, [enabled]);
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

        WebDeveloper.Overlay.openGeneratedTab(chrome.runtime.getURL("/generated/find-broken-images.html"), tab.index, data, locale);
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
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, function() { WebDeveloper.Images.hideBackgroundImages([document]); });
    }
  });
};

// Hides all images
WebDeveloper.Overlay.Images.hideImages = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Images.hideImages(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Initializes the images overlay
WebDeveloper.Overlay.Images.initialize = function()
{
  var disableImagesMenu                        = document.getElementById("disable-images");
  var displayAltAttributesMenu                 = document.getElementById("display-alt-attributes");
  var displayImageDimensionsMenu               = document.getElementById("display-image-dimensions");
  var displayImagePathsMenu                    = document.getElementById("display-image-paths");
  var findBrokenImagesMenu                     = document.getElementById("find-broken-images");
  var hideBackgroundImagesMenu                 = document.getElementById("hide-background-images");
  var hideImagesMenu                           = document.getElementById("hide-images");
  var makeImagesFullSizeMenu                   = document.getElementById("make-images-full-size");
  var makeImagesInvisibleMenu                  = document.getElementById("make-images-invisible");
  var outlineAllImagesMenu                     = document.getElementById("outline-all-images");
  var outlineBackgroundImagesMenu              = document.getElementById("outline-background-images");
  var outlineImagesWithAdjustedDimensionsMenu  = document.getElementById("outline-images-with-adjusted-dimensions");
  var outlineImagesWithEmptyAltAttributesMenu  = document.getElementById("outline-images-with-empty-alt-attributes");
  var outlineImagesWithOversizedDimensionsMenu = document.getElementById("outline-images-with-oversized-dimensions");
  var outlineImagesWithoutAltAttributesMenu    = document.getElementById("outline-images-without-alt-attributes");
  var outlineImagesWithoutDimensionsMenu       = document.getElementById("outline-images-without-dimensions");
  var reloadImagesMenu                         = document.getElementById("reload-images");
  var replaceImagesWithAltAttributesMenu       = document.getElementById("replace-images-with-alt-attributes");
  var viewImageInformationMenu                 = document.getElementById("view-image-information");

  disableImagesMenu.append(WebDeveloper.Locales.getString("disableImages"));
  displayAltAttributesMenu.append(WebDeveloper.Locales.getString("displayAltAttributes"));
  displayImageDimensionsMenu.append(WebDeveloper.Locales.getString("displayImageDimensions"));
  displayImagePathsMenu.append(WebDeveloper.Locales.getString("displayImagePaths"));
  findBrokenImagesMenu.append(WebDeveloper.Locales.getString("findBrokenImages"));
  hideBackgroundImagesMenu.append(WebDeveloper.Locales.getString("hideBackgroundImages"));
  hideImagesMenu.append(WebDeveloper.Locales.getString("hideImages"));
  makeImagesFullSizeMenu.append(WebDeveloper.Locales.getString("makeImagesFullSize"));
  makeImagesInvisibleMenu.append(WebDeveloper.Locales.getString("makeImagesInvisible"));
  outlineAllImagesMenu.append(WebDeveloper.Locales.getString("outlineAllImages"));
  outlineBackgroundImagesMenu.append(WebDeveloper.Locales.getString("outlineBackgroundImages"));
  outlineImagesWithAdjustedDimensionsMenu.append(WebDeveloper.Locales.getString("outlineImagesWithAdjustedDimensions"));
  outlineImagesWithEmptyAltAttributesMenu.append(WebDeveloper.Locales.getString("outlineImagesWithEmptyAltAttributes"));
  outlineImagesWithOversizedDimensionsMenu.append(WebDeveloper.Locales.getString("outlineImagesWithOversizedDimensions"));
  outlineImagesWithoutAltAttributesMenu.append(WebDeveloper.Locales.getString("outlineImagesWithoutAltAttributes"));
  outlineImagesWithoutDimensionsMenu.append(WebDeveloper.Locales.getString("outlineImagesWithoutDimensions"));
  reloadImagesMenu.append(WebDeveloper.Locales.getString("reloadImages"));
  replaceImagesWithAltAttributesMenu.append(WebDeveloper.Locales.getString("replaceImagesWithAltAttributes"));
  viewImageInformationMenu.append(WebDeveloper.Locales.getString("viewImageInformation"));

  disableImagesMenu.addEventListener("click", WebDeveloper.Overlay.Images.toggleImages);
  displayAltAttributesMenu.addEventListener("click", WebDeveloper.Overlay.Images.displayAltAttributes);
  displayImageDimensionsMenu.addEventListener("click", WebDeveloper.Overlay.Images.displayImageDimensions);
  displayImagePathsMenu.addEventListener("click", WebDeveloper.Overlay.Images.displayImagePaths);
  findBrokenImagesMenu.addEventListener("click", WebDeveloper.Overlay.Images.findBrokenImages);
  hideBackgroundImagesMenu.addEventListener("click", WebDeveloper.Overlay.Images.hideBackgroundImages);
  hideImagesMenu.addEventListener("click", WebDeveloper.Overlay.Images.hideImages);
  makeImagesFullSizeMenu.addEventListener("click", WebDeveloper.Overlay.Images.makeImagesFullSize);
  makeImagesInvisibleMenu.addEventListener("click", WebDeveloper.Overlay.Images.makeImagesInvisible);
  outlineAllImagesMenu.addEventListener("click", WebDeveloper.Overlay.Images.outlineAllImages);
  outlineBackgroundImagesMenu.addEventListener("click", WebDeveloper.Overlay.Images.outlineBackgroundImages);
  outlineImagesWithAdjustedDimensionsMenu.addEventListener("click", WebDeveloper.Overlay.Images.outlineImagesWithAdjustedDimensions);
  outlineImagesWithEmptyAltAttributesMenu.addEventListener("click", WebDeveloper.Overlay.Images.outlineImagesWithEmptyAltAttributes);
  outlineImagesWithOversizedDimensionsMenu.addEventListener("click", WebDeveloper.Overlay.Images.outlineImagesWithOversizedDimensions);
  outlineImagesWithoutAltAttributesMenu.addEventListener("click", WebDeveloper.Overlay.Images.outlineImagesWithoutAltAttributes);
  outlineImagesWithoutDimensionsMenu.addEventListener("click", WebDeveloper.Overlay.Images.outlineImagesWithoutDimensions);
  reloadImagesMenu.addEventListener("click", WebDeveloper.Overlay.Images.reloadImages);
  replaceImagesWithAltAttributesMenu.addEventListener("click", WebDeveloper.Overlay.Images.replaceImagesWithAltAttributes);
  viewImageInformationMenu.addEventListener("click", WebDeveloper.Overlay.Images.viewImageInformation);

  WebDeveloper.Overlay.updateContentSettingMenu(disableImagesMenu, "images");
};

// Makes all images full size
WebDeveloper.Overlay.Images.makeImagesFullSize = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Images.addFeatureOnTab(featureItem, tab, function() { WebDeveloper.Images.makeImagesFullSize([document]); });
    }
  });
};

// Makes all images invisible
WebDeveloper.Overlay.Images.makeImagesInvisible = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Images.makeImagesInvisible(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Outlines all images
WebDeveloper.Overlay.Images.outlineAllImages = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, function() { WebDeveloper.Images.outlineAllImages([document]); });
    }
  });
};

// Outlines all background images
WebDeveloper.Overlay.Images.outlineBackgroundImages = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Images.outlineBackgroundImages(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Outlines all images with adjusted dimensions
WebDeveloper.Overlay.Images.outlineImagesWithAdjustedDimensions = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Images.outlineImagesWithAdjustedDimensions(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Outlines all images with empty alt attributes
WebDeveloper.Overlay.Images.outlineImagesWithEmptyAltAttributes = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, function() { WebDeveloper.Images.outlineImagesWithEmptyAltAttributes([document]); });
    }
  });
};

// Outlines all images with oversized dimensions
WebDeveloper.Overlay.Images.outlineImagesWithOversizedDimensions = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Images.outlineImagesWithOversizedDimensions(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Outlines all images without alt attributes
WebDeveloper.Overlay.Images.outlineImagesWithoutAltAttributes = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, function() { WebDeveloper.Images.outlineImagesWithoutAltAttributes([document]); });
    }
  });
};

// Outlines all images without dimensions
WebDeveloper.Overlay.Images.outlineImagesWithoutDimensions = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, function() { WebDeveloper.Images.outlineImagesWithoutDimensions([document]); });
    }
  });
};

// Reloads all the images on a page
WebDeveloper.Overlay.Images.reloadImages = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Images.addFeatureOnTab(featureItem, tab, function() { WebDeveloper.Images.reloadImages([document]); });
    }
  });
};

// Replaces all images with alt attributes
WebDeveloper.Overlay.Images.replaceImagesWithAltAttributes = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Images.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Images.replaceImagesWithAltAttributes(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Toggles a feature on a tab
WebDeveloper.Overlay.Images.toggleFeatureOnTab = function(featureItem, tab, scriptCode, args)
{
  WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "/features/javascript/images.js", scriptCode, args);
};

// Toggles images
WebDeveloper.Overlay.Images.toggleImages = function()
{
  WebDeveloper.Overlay.toggleContentSetting("images", this, "enableImagesResult", "disableImagesResult");
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
        WebDeveloper.Overlay.openGeneratedTab(chrome.runtime.getURL("/generated/view-image-information.html"), tab.index, data, WebDeveloper.Overlay.Images.getViewImageInformationLocale());
      });
    }
  });
};

// If the document is still loading
if(document.readyState === "loading")
{
  document.addEventListener("DOMContentLoaded", WebDeveloper.Overlay.Images.initialize);
}
else
{
  WebDeveloper.Overlay.Images.initialize();
}
