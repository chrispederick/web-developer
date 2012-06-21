var WebDeveloper = WebDeveloper || {};

WebDeveloper.Dashboard = WebDeveloper.Dashboard || {};

// Initializes the page
WebDeveloper.Dashboard.initialize = function(elementInformation, theme)
{
	var content = $("#content");

	// Fades out the previous content before updating
	content.fadeOut(WebDeveloper.Generated.animationDuration, function()
	{
		content.css("visibility", "hidden").show().html(elementInformation);

		WebDeveloper.Dashboard.adjustBreadcrumb();
		WebDeveloper.Generated.resizeAncestors(true);
		WebDeveloper.Generated.initializeSyntaxHighlight(theme);

		// Fades in the new content
		content.hide().css("visibility", "visible").fadeIn(WebDeveloper.Generated.animationDuration);
	});
};
