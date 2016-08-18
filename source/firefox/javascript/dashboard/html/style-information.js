var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Dashboard = WebDeveloper.Dashboard || {};

// Initializes the page
WebDeveloper.Dashboard.initialize = function(styleInformation, theme)
{
  var content = $("#content");

  // Fades out the previous content before updating
  content.fadeOut(WebDeveloper.Generated.animationSpeed, function()
  {
    content.css("visibility", "hidden").show().empty().get(0).appendChild(styleInformation);

    WebDeveloper.Dashboard.adjustBreadcrumb();
    WebDeveloper.Generated.resizeAncestors(true);
    WebDeveloper.Generated.initializeCommonElements();
    WebDeveloper.Generated.initializeSyntaxHighlight(theme);

    // Fades in the new content
    content.hide().css("visibility", "visible").fadeIn(WebDeveloper.Generated.animationSpeed);
  });
};
