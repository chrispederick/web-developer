WebDeveloper.Images = WebDeveloper.Images || {};

// Shows a notification
WebDeveloper.Images.showNotification = function(message)
{
	chrome.extension.sendRequest({type: "notification", notification: message});
};
