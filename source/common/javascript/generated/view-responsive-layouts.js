var WebDeveloper = WebDeveloper || {};

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
	var anchor						= null;
	var container					= null;
	var content						= $("#content");
	var filesDropdown			= $("#files-dropdown");
	var filesDropdownMenu = $(".dropdown-menu", filesDropdown);
	var height						= null;
	var layout						= null;
	var layoutDescription = null;
	var layouts						= data.layouts;
	var url								= data.pageURL;
	var width							= null;

	WebDeveloper.Generated.emptyContent();
	WebDeveloper.Generated.localizeHeader(locale);
	WebDeveloper.Generated.setPageTitle(locale.responsiveLayouts, data, locale);
	WebDeveloper.Generated.addDocument(url, 0);

	$(".dropdown-toggle", filesDropdown).prepend(locale.layouts);

	// Loop through the layouts
	for(var i = 0, l = layouts.length; i < l; i++)
	{
		anchor						= "layout-" + i;
		layout						= layouts[i];
		height						= layout.height;
		width							= layout.width;
		layoutDescription = layout.description + " (" + width + "x" + height + ")";

		content.append('<h3 id="' + anchor + '"><span></span>' + layoutDescription + "</h3>");
		filesDropdownMenu.append('<li><a href="#' + anchor + '">' + layoutDescription + "</a></li>");

		container = WebDeveloper.Generated.generateDocumentContainer();

		container.append('<iframe src="' + url + '" width="' + width + '" height="' + height +'"></iframe>');
		content.append(container);
		WebDeveloper.Generated.addSeparator();
	}

	$("#web-developer-reload").text(locale.reloadLayouts).on("click", WebDeveloper.Generated.reloadLayouts);

	WebDeveloper.Generated.initializeCommonElements();
};

// Reloads the layouts
WebDeveloper.Generated.reloadLayouts = function(event)
{
	var iframe = null;

	// Loop through the iframes
	$("iframe").each(function()
	{
		iframe = $(this);

		iframe.attr("src", iframe.attr("src"));
	});

	event.preventDefault();
};
