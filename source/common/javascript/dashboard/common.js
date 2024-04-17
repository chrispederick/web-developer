var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Dashboard = WebDeveloper.Dashboard || {};

// Initializes the ancestors
WebDeveloper.Dashboard.initializeAncestors = function(event)
{
  WebDeveloper.Generated.ancestorContainer = event.target;
  WebDeveloper.Generated.ancestors         = WebDeveloper.Generated.ancestorContainer.querySelectorAll("li");

  WebDeveloper.Generated.resizeAncestors();
};

window.addEventListener("web-developer-initialize-ancestors-event", WebDeveloper.Dashboard.initializeAncestors, false);
