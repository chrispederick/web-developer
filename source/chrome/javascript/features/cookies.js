var WebDeveloper = WebDeveloper || {};

WebDeveloper.Cookies = WebDeveloper.Cookies || {};

// Adds a cookie
WebDeveloper.Cookies.addCookie = function(cookie)
{
	var host		 = WebDeveloper.Common.trim(cookie.host);
	var name		 = WebDeveloper.Common.trim(cookie.name);
	var protocol = "http://";
	var secure	 = cookie.secure;
	var url			 = null;
	var value		 = WebDeveloper.Common.trim(cookie.value);

	// If the cookie is secure
	if(secure)
	{
		protocol = "https://";
	}

	url = protocol + host + WebDeveloper.Common.trim(cookie.path);

	// If the cookie is a session cookie
	if(cookie.session)
	{
		chrome.cookies.set({ "domain": host, "name": name, "secure": secure, "url": url, "value": value });
	}
	else
	{
		chrome.cookies.set({ "domain": host, "expirationDate": (new Date(WebDeveloper.Common.trim(cookie.expires)).getTime()) / 1000, "name": name, "secure": secure, "url": url, "value": value });
	}
};

// Returns true if you can edit a local cookie
WebDeveloper.Cookies.canEditLocalCookie = function()
{
	return false;
};

// Deletes a cookie
WebDeveloper.Cookies.deleteCookie = function(cookie)
{
	var protocol = "http://";

	// If the cookie is secure
	if(cookie.secure)
	{
		protocol = "https://";
	}

	chrome.cookies.remove({ "name": cookie.name, "url": protocol + cookie.host + cookie.path });
};
