var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Common = WebDeveloper.Common || {};

// Displays a notification
WebDeveloper.Common.displayNotification = function(message, parameters)
{
  chrome.extension.sendMessage({ message: message, parameters: parameters, type: "display-notification" });
};
