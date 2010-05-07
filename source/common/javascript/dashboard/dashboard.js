WebDeveloper.Dashboard = {};

// Converts a title to an id
WebDeveloper.Dashboard.convertTitleToId = function(title)
{
	return "web-developer-" + title.toLowerCase().replace(" ", "-");
};

// Formats a URL
WebDeveloper.Dashboard.formatURL = function(url)
{
	// If the URL is set
	if(url)
	{
		var lastSlashIndex = url.lastIndexOf("/");
		
		return url.substring(lastSlashIndex + 1);
	}

	return url;
};
