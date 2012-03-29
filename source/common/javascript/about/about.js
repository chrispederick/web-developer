var WebDeveloper = WebDeveloper || {};

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
	var name = locale.extensionName;

	$("title").html(locale.about + " " + name);
	$("h1").html(name);
	$("#description").html(locale.extensionDescription);
	$("#author").html(locale.author);
	$("#version").html(locale.version);
	$("#build-date").html(locale.buildDate);
};
