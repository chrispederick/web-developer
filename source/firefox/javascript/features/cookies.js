var WebDeveloper = WebDeveloper || {};

WebDeveloper.Cookies = WebDeveloper.Cookies || {};

// Clears all session cookies
WebDeveloper.Cookies.clearSessionCookies = function()
{
	var cookie				= null;
	var cookieManager = Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager);
	var cookies				= cookieManager.enumerator;
	var removed				= 0;

	// Loop through the cookies
	while(cookies.hasMoreElements())
	{
		cookie = cookies.getNext();

		// If this is a cookie with no expiration
		if(cookie instanceof Components.interfaces.nsICookie2 && cookie.expires == "0")
		{
			cookieManager.remove(cookie.host, cookie.name, cookie.path, false);
			removed++;
		}
	}

	// If one session cookie was removed
	if(removed == 1)
	{
		WebDeveloper.Common.displayNotification("clearSessionCookiesSingleResult");
	}
	else
	{
		WebDeveloper.Common.displayNotification("clearSessionCookiesMultipleResult", [removed]);
	}
};

// Returns all the cookies for the document
WebDeveloper.Cookies.getCookies = function()
{
	var allCookies			 = null;
	var contentDocument	 = WebDeveloper.Common.getContentDocument();
	var contentDocuments = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
	var cookie					 = null;
	var cookies					 = {};
	var documentCookie	 = null;
	var documentCookies	 = null;
	var host						 = null;
	var location				 = null;

	cookies.documents = [];
	cookies.pageURL		= contentDocument.documentURI;

	// Loop through the documents
	for(var i = 0, l = contentDocuments.length; i < l; i++)
	{
		contentDocument					= contentDocuments[i];
		documentCookies					= {};
		documentCookies.cookies = [];
		documentCookies.url			= contentDocument.documentURI;
		host										= null;
		location								= contentDocument.location;

		// Try to get the host
		try
		{
			host = location.hostname;
		}
		catch(exception)
		{
			// Ignore
		}

		allCookies = WebDeveloper.Cookies.getHostCookies(host, "/", true);

		// Loop through the cookies
		for(var j = 0, m = allCookies.length; j < m; j++)
		{
			documentCookie = {};
			cookie				 = allCookies[j];

			documentCookie.expires	= cookie.expires;
			documentCookie.host			= cookie.host;
			documentCookie.httpOnly = cookie.isHttpOnly;
			documentCookie.name			= cookie.name;
			documentCookie.path			= cookie.path;
			documentCookie.secure		= cookie.isSecure;
			documentCookie.value		= cookie.value;

			documentCookies.cookies.push(documentCookie);
		}

		cookies.documents.push(documentCookies);
	}

	return cookies;
};

// Get the cookies for the specified host
WebDeveloper.Cookies.getHostCookies = function(host, path, sort)
{
	var cookies = [];

	// If the host is set
	if(host)
	{
		var cookie						= null;
		var cookieEnumeration = Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager).enumerator;
		var cookieHost				= null;
		var cookiePath				= null;

		// Loop through the cookies
		while(cookieEnumeration.hasMoreElements())
		{
			cookie = cookieEnumeration.getNext().QueryInterface(Components.interfaces.nsICookie2);

			cookieHost = cookie.host;
			cookiePath = cookie.path;

			// If there is a host and path for this cookie
			if(cookieHost && cookiePath)
			{
				// If the cookie host starts with '.'
				if(cookieHost.charAt(0) == ".")
				{
					cookieHost = cookieHost.substring(1);
				}

				// If the host and cookie host and path and cookie path match
				if((host == cookieHost || WebDeveloper.Common.endsWith("." + cookieHost, host)) && (path == cookiePath || cookiePath.indexOf(path) === 0))
				{
					cookies.push(cookie);
				}
			}
		}

		// If sorting cookies
		if(sort)
		{
			cookies.sort(WebDeveloper.Cookies.sortCookies);
		}
	}

	return cookies;
};

// Sorts two cookies
WebDeveloper.Cookies.sortCookies = function(cookieOne, cookieTwo)
{
	// If cookie one and cookie two are set
	if(cookieOne && cookieTwo)
	{
		var cookieOneHost = cookieOne.host;
		var cookieOneName = cookieOne.name;
		var cookieTwoHost = cookieTwo.host;
		var cookieTwoName = cookieTwo.name;

		// If the cookies are equal
		if(cookieOneHost == cookieTwoHost && cookieOneName == cookieTwoName)
		{
			return 0;
		}
		else if(cookieOneHost < cookieTwoHost || (cookieOneHost == cookieTwoHost && cookieOneName < cookieTwoName))
		{
			return -1;
		}
	}

	return 1;
};

