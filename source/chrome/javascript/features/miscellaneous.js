WebDeveloper.Miscellaneous = WebDeveloper.Miscellaneous || {};

// Shows a notification
WebDeveloper.Miscellaneous.showNotification = function(message)
{
	chrome.extension.sendRequest({type: "notification", notification: message});
};
