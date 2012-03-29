var WebDeveloper = WebDeveloper || {};

WebDeveloper.Common = WebDeveloper.Common || {};

// Displays a notification
WebDeveloper.Common.displayNotification = function(notification, variables)
{
	chrome.extension.sendRequest({"message": notification, "substitutes": variables, "type": "display-notification" });
};
