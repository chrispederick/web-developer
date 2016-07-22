var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Overlay        = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Images = WebDeveloper.Overlay.Images || {};

// Disables external site images
WebDeveloper.Overlay.Images.disableExternalSiteImages = function(element)
{
  var imageBehavior = 3;

  // If enabling external images
  if(WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")))
  {
    imageBehavior = 1;
  }

  WebDeveloper.Preferences.setIntegerPreference("permissions.default.image", imageBehavior);
  BrowserReload();
};

// Disables image animations
WebDeveloper.Overlay.Images.disableImageAnimations = function(element)
{
  var imageBehavior = "none";

  // If enabling images
  if(WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")))
  {
    imageBehavior = "normal";
  }

  WebDeveloper.Preferences.setStringPreference("image.animation_mode", imageBehavior);
  BrowserReload();
};

// Disables images
WebDeveloper.Overlay.Images.disableImages = function(element)
{
  var imageBehavior = 2;

  // If enabling images
  if(WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")))
  {
    imageBehavior = 1;
  }

  WebDeveloper.Preferences.setIntegerPreference("permissions.default.image", imageBehavior);
  BrowserReload();
};

// Displays alt attributes for all images
WebDeveloper.Overlay.Images.displayAltAttributes = function(element)
{
  var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

  WebDeveloper.Images.displayAltAttributes(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the dimensions for all images
WebDeveloper.Overlay.Images.displayImageDimensions = function(element)
{
  var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));
  var locale    = WebDeveloper.Locales.setupGeneratedLocale();

  locale.height = WebDeveloper.Locales.getString("height");
  locale.width  = WebDeveloper.Locales.getString("width");

  WebDeveloper.Images.displayImageDimensions(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()), locale);
  WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the file sizes for all images
WebDeveloper.Overlay.Images.displayImageFileSizes = function(element)
{
  var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

  WebDeveloper.Images.displayImageFileSizes(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the paths for all images
WebDeveloper.Overlay.Images.displayImagePaths = function(element)
{
  var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

  WebDeveloper.Images.displayImagePaths(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(featureId);
};

// Finds all the broken images on a page
WebDeveloper.Overlay.Images.findBrokenImages = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.brokenImage  = WebDeveloper.Locales.getString("brokenImage");
  locale.brokenImages = WebDeveloper.Locales.getString("brokenImages");

  WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/find-broken-images.html"), WebDeveloper.Content.getBrokenImages(), locale);
};

// Hides the background images in a document
WebDeveloper.Overlay.Images.hideBackgroundImages = function(element)
{
  WebDeveloper.Images.hideBackgroundImages(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Hides the images
WebDeveloper.Overlay.Images.hideImages = function(element)
{
  var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

  WebDeveloper.Images.hideImages(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(featureId);
};

// Makes all images full size
WebDeveloper.Overlay.Images.makeImagesFullSize = function()
{
  WebDeveloper.Images.makeImagesFullSize(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
};

// Makes all images invisible
WebDeveloper.Overlay.Images.makeImagesInvisible = function(element)
{
  var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

  WebDeveloper.Images.makeImagesInvisible(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(featureId);
};

// Outlines all images
WebDeveloper.Overlay.Images.outlineAllImages = function(element)
{
  WebDeveloper.Images.outlineAllImages(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Outlines all background images
WebDeveloper.Overlay.Images.outlineBackgroundImages = function(element)
{
  var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

  WebDeveloper.Images.outlineBackgroundImages(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(featureId);
};

// Outlines all images with adjusted dimensions
WebDeveloper.Overlay.Images.outlineImagesWithAdjustedDimensions = function(element)
{
  var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

  WebDeveloper.Images.outlineImagesWithAdjustedDimensions(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(featureId);
};

// Outlines all images with empty alt attributes
WebDeveloper.Overlay.Images.outlineImagesWithEmptyAltAttributes = function(element)
{
  WebDeveloper.Images.outlineImagesWithEmptyAltAttributes(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Outlines all images with oversized dimensions
WebDeveloper.Overlay.Images.outlineImagesWithOversizedDimensions = function(element)
{
  var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

  WebDeveloper.Images.outlineImagesWithOversizedDimensions(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(featureId);
};

// Outlines all images without alt attributes
WebDeveloper.Overlay.Images.outlineImagesWithoutAltAttributes = function(element)
{
  WebDeveloper.Images.outlineImagesWithoutAltAttributes(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Outlines all images without dimensions
WebDeveloper.Overlay.Images.outlineImagesWithoutDimensions = function(element)
{
  WebDeveloper.Images.outlineImagesWithEmptyAltAttributes(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Reloads images
WebDeveloper.Overlay.Images.reloadImages = function()
{
  WebDeveloper.Images.reloadImages(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
};

// Replaces all images with alt attributes
WebDeveloper.Overlay.Images.replaceImagesWithAltAttributes = function(element)
{
  var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

  WebDeveloper.Images.replaceImagesWithAltAttributes(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(featureId);
};

// Updates the disable images menu
WebDeveloper.Overlay.Images.updateDisableImagesMenu = function()
{
  var disableImageAnimations        = false;
  var disableImageAnimationsMenu    = document.getElementById("web-developer-disable-image-animations-command");
  var disableExternalSiteImages     = false;
  var disableExternalSiteImagesMenu = document.getElementById("web-developer-disable-external-site-images-command");
  var disableImages                 = false;
  var disableImagesPreference       = WebDeveloper.Preferences.getIntegerPreference("permissions.default.image");

  // If the image preference is set to 2
  if(disableImagesPreference == 2)
  {
    disableImages = true;
  }
  else if(disableImagesPreference == 3)
  {
    disableExternalSiteImages = true;
  }

  // If the image animation preference is set to none
  if(WebDeveloper.Preferences.getStringPreference("image.animation_mode") == "none")
  {
    disableImageAnimations = true;
  }

  WebDeveloper.Common.configureElement(document.getElementById("web-developer-disable-all-images-command"), "checked", disableImages);
  WebDeveloper.Common.configureElement(disableExternalSiteImagesMenu, "checked", disableExternalSiteImages);
  WebDeveloper.Common.configureElement(disableExternalSiteImagesMenu, "disabled", disableImages);
  WebDeveloper.Common.configureElement(disableImageAnimationsMenu, "checked", disableImageAnimations);
  WebDeveloper.Common.configureElement(disableImageAnimationsMenu, "disabled", disableImages);
};

// Updates the images menu
WebDeveloper.Overlay.Images.updateImagesMenu = function(suffix)
{
  var disableImages = WebDeveloper.Preferences.getIntegerPreference("permissions.default.image") == 2;

  WebDeveloper.Common.configureElement(document.getElementById("web-developer-display-alt-attributes-command"), "disabled", disableImages);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-display-image-dimensions-command"), "disabled", disableImages);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-display-image-file-sizes-command"), "disabled", disableImages);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-display-image-paths-command"), "disabled", disableImages);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-find-broken-images-command"), "disabled", disableImages);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-hide-background-images-command"), "disabled", disableImages);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-hide-images-command"), "disabled", disableImages);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-make-images-full-size-command"), "disabled", disableImages);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-make-images-invisible-command"), "disabled", disableImages);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-outline-images-" + suffix), "disabled", disableImages);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-reload-images-command"), "disabled", disableImages);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-replace-images-with-alt-attributes-command"), "disabled", disableImages);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-view-image-information-command"), "disabled", disableImages);
  WebDeveloper.Overlay.configureFeatureElement("web-developer-display-alt-attributes-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-display-image-dimensions-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-display-image-file-sizes-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-display-image-paths-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-hide-background-images-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-hide-images-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-replace-images-with-alt-attributes-command", "checked");
};

// Updates the outline images menu
WebDeveloper.Overlay.Images.updateOutlineImagesMenu = function()
{
  WebDeveloper.Overlay.configureFeatureElement("web-developer-outline-all-images-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-outline-background-images-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-outline-images-with-adjusted-dimensions-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-outline-images-with-empty-alt-attributes-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-outline-images-with-oversized-dimensions-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-outline-images-without-alt-attributes-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-outline-images-without-dimensions-command", "checked");
};

// Displays all the images
WebDeveloper.Overlay.Images.viewImageInformation = function()
{
  WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-image-information.html"), WebDeveloper.Content.getImages(), WebDeveloper.Overlay.Images.getViewImageInformationLocale());
};
