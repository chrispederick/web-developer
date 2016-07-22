var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Message = WebDeveloper.Message || {};

// Initializes the message dialog
WebDeveloper.Message.initialize = function()
{
  document.getElementById("web-developer-message").value = window.arguments[0];
};

// Opens the more information URL in a new tab
WebDeveloper.Message.moreInformation = function()
{
  WebDeveloper.Common.openURL(window.arguments[1]);
  window.close();
};
