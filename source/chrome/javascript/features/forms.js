WebDeveloper.Forms = WebDeveloper.Forms || {};

// Shows a notification
WebDeveloper.Forms.showNotification = function(message)
{
	chrome.extension.sendRequest({type: "notification", notification: message});
};
