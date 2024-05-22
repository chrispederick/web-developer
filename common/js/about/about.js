var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.About = WebDeveloper.About || {};

// Initializes the about page
WebDeveloper.About.initialize = function()
{
  var extensionName = WebDeveloper.Locales.getString("extensionName");

  document.getElementById("author").append(WebDeveloper.Locales.getString("author"));
  document.getElementById("build-date").append(WebDeveloper.Locales.getString("buildDate"));
  document.getElementById("description").append(WebDeveloper.Locales.getString("extensionDescription"));
  document.getElementById("donate-link").prepend(WebDeveloper.Locales.getString("donate"));
  document.getElementById("name").append(extensionName);
  document.getElementById("version").append(WebDeveloper.Locales.getString("version"));
  document.getElementById("website").prepend(WebDeveloper.Locales.getString("visitTheWebsite"));
  document.querySelector("title").replaceChildren(WebDeveloper.Locales.getString("about") + " " + extensionName);
  document.querySelector(".card-text").insertAdjacentHTML("beforeend", DOMPurify.sanitize('<span class="fw-bold">' + extensionName + "</span> " + WebDeveloper.Locales.getString("donationCard")));
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
