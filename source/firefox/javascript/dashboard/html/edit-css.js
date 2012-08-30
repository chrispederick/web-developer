var WebDeveloper = WebDeveloper || {};

WebDeveloper.Dashboard = WebDeveloper.Dashboard || {};

// Initializes the page with JSON data
WebDeveloper.Dashboard.initializeWithJSON = function(event)
{
  var eventTarget = event.target;
  var data        = JSON.parse(eventTarget.getAttribute("data-web-developer"));

  WebDeveloper.Dashboard.initializeEditor("css", data.theme);
  WebDeveloper.Dashboard.setContent(data.content);

  eventTarget.removeAttribute("data-web-developer");

  window.removeEventListener("web-developer-dashboard-event", WebDeveloper.Dashboard.initializeWithJSON, false);
};

window.addEventListener("web-developer-dashboard-event", WebDeveloper.Dashboard.initializeWithJSON, false);
