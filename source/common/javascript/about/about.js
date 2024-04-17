var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.About = WebDeveloper.About || {};

// Initializes the about page
WebDeveloper.About.initialize = function()
{
  var name = WebDeveloper.Locales.getString("extensionName");

  document.getElementById("author").append(WebDeveloper.Locales.getString("author"));
  document.getElementById("build-date").append(WebDeveloper.Locales.getString("buildDate"));
  document.getElementById("description").append(WebDeveloper.Locales.getString("extensionDescription"));
  document.getElementById("name").append(name);
  document.getElementById("version").append(WebDeveloper.Locales.getString("version"));
  document.getElementById("website").prepend(WebDeveloper.Locales.getString("visitTheWebsite"));
  document.querySelector("title").replaceChildren(WebDeveloper.Locales.getString("about") + " " + name);
};

// If the document is still loading
if(document.readyState === "loading")
{
  document.addEventListener("DOMContentLoaded", WebDeveloper.About.initialize);
}
else
{
  WebDeveloper.About.initialize();
}
