var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
  var name = locale.extensionName;

  $("title").text(locale.about + " " + name);
  $("h1").text(name);
  $("#description").text(locale.extensionDescription);
  $("#follow-on-twitter").text(locale.followOnTwitter);
  $("#author").text(locale.author);
  $("#version").text(locale.version);
  $("#build-date").text(locale.buildDate);
};
