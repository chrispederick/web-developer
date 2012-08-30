var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay         = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Outline = WebDeveloper.Overlay.Outline || {};

// Outlines all block level elements
WebDeveloper.Overlay.Outline.outlineBlockLevelElements = function(element)
{
  WebDeveloper.Outline.outlineBlockLevelElements(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()), WebDeveloper.Preferences.getExtensionBooleanPreference("outline.show.element.tag.names"));
  WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Outlines the specified elements
WebDeveloper.Overlay.Outline.outlineCustomElements = function(element)
{
  var elementId = element.getAttribute("id");
  var featureId = WebDeveloper.Common.getFeatureId(elementId);

  // If custom elements are already being outlined
  if(WebDeveloper.Storage.isFeatureActive(featureId))
  {
    var contentDocument = null;
    var documents       = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());

    // Loop through the documents
    for(var i = 0, l = documents.length; i < l; i++)
    {
      contentDocument = documents[i];

      WebDeveloper.Common.removeMatchingElements("#web-developer-outline-custom-elements", contentDocument);

      // If showing element tag names
      if(WebDeveloper.Preferences.getExtensionBooleanPreference("outline.show.element.tag.names"))
      {
        WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-outline-custom-elements-before", contentDocument, false);
      }
    }

    WebDeveloper.Storage.toggleFeature(featureId);
  }
  else
  {
    window.openDialog("chrome://web-developer/content/dialogs/outline-custom-elements.xul", "web-developer-outline-dialog", "centerscreen,chrome,modal", featureId);
  }
};

// Outlines all deprecated elements
WebDeveloper.Overlay.Outline.outlineDeprecatedElements = function(element)
{
  WebDeveloper.Outline.outlineDeprecatedElements(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()), WebDeveloper.Preferences.getExtensionBooleanPreference("outline.show.element.tag.names"));
  WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Outlines all external links
WebDeveloper.Overlay.Outline.outlineExternalLinks = function(element)
{
  var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

  WebDeveloper.Outline.outlineExternalLinks(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(featureId);
};

// Outlines all floated elements
WebDeveloper.Overlay.Outline.outlineFloatedElements = function(element)
{
  var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

  WebDeveloper.Outline.outlineFloatedElements(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(featureId);
};

// Outlines all frames
WebDeveloper.Overlay.Outline.outlineFrames = function(element)
{
  WebDeveloper.Outline.outlineFrames(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Outlines all headings
WebDeveloper.Overlay.Outline.outlineHeadings = function(element)
{
  WebDeveloper.Outline.outlineHeadings(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()), WebDeveloper.Preferences.getExtensionBooleanPreference("outline.show.element.tag.names"));
  WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Outlines all non-secure elements
WebDeveloper.Overlay.Outline.outlineNonSecureElements = function(element)
{
  WebDeveloper.Outline.outlineNonSecureElements(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Outlines all positioned elements
WebDeveloper.Overlay.Outline.outlinePositionedElements = function(positionType, element)
{
  var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

  WebDeveloper.Outline.outlinePositionedElements(positionType, !WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(featureId);
};

// Outlines all tables
WebDeveloper.Overlay.Outline.outlineTables = function(element)
{
  WebDeveloper.Outline.outlineTables(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Outlines all table captions
WebDeveloper.Overlay.Outline.outlineTableCaptions = function(element)
{
  WebDeveloper.Outline.outlineTableCaptions(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Outlines all table cells
WebDeveloper.Overlay.Outline.outlineTableCells = function(element)
{
  WebDeveloper.Outline.outlineTableCells(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()), WebDeveloper.Preferences.getExtensionBooleanPreference("outline.show.element.tag.names"));
  WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Toggles whether to show element tag names when outlining
WebDeveloper.Overlay.Outline.toggleShowElementTagNames = function(element)
{
  WebDeveloper.Preferences.disableExtensionPreference(element, "outline.show.element.tag.names");
};

// Updates the outline menu
WebDeveloper.Overlay.Outline.updateOutlineMenu = function()
{
  WebDeveloper.Overlay.configureFeatureElement("web-developer-outline-block-level-elements-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-outline-custom-elements-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-outline-deprecated-elements-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-outline-external-links-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-outline-floated-elements-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-outline-frames-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-outline-headings-command", "checked");
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-outline-show-element-tag-names-command"), "checked", WebDeveloper.Preferences.getExtensionBooleanPreference("outline.show.element.tag.names"));
};

// Updates the outline positioned elements menu
WebDeveloper.Overlay.Outline.updateOutlinePositionedElementsMenu = function()
{
  WebDeveloper.Overlay.configureFeatureElement("web-developer-outline-absolute-positioned-elements-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-outline-fixed-positioned-elements-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-outline-relative-positioned-elements-command", "checked");
};

// Updates the outline tables menu
WebDeveloper.Overlay.Outline.updateOutlineTablesMenu = function()
{
  WebDeveloper.Overlay.configureFeatureElement("web-developer-outline-all-tables-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-outline-table-captions-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-outline-table-cells-command", "checked");
};
