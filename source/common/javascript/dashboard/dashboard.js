var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Dashboard = WebDeveloper.Dashboard || {};

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
    var lastSlashIndex   = url.lastIndexOf("/");
    var queryStringIndex = url.indexOf("?", lastSlashIndex);

    // If there is no query string
    if(queryStringIndex == -1)
    {
      return url.substring(lastSlashIndex + 1);
    }

    return url.substring(lastSlashIndex + 1, queryStringIndex);
  }

  return url;
};
