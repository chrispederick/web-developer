var WebDeveloper = WebDeveloper || {};

WebDeveloper.Cookie = WebDeveloper.Cookie || {};

// Handles the cookie dialog being accepted
WebDeveloper.Cookie.accept = function()
{
	var host				= WebDeveloper.Common.trim(document.getElementById("web-developer-host").value);
	var errors			= "";
	var expires			= WebDeveloper.Common.trim(document.getElementById("web-developer-expires").value);
	var expiresDate = new Date(expires);
	var name				= WebDeveloper.Common.trim(document.getElementById("web-developer-name").value);
	var path				= WebDeveloper.Common.trim(document.getElementById("web-developer-path").value);

	// If the name is empty
	if(!name)
	{
		errors += WebDeveloper.Locales.getString("emptyName") + "\n";
	}

	// If the host is empty
	if(!host)
	{
		errors += WebDeveloper.Locales.getString("emptyHost") + "\n";
	}

	// If the path is empty
	if(!path)
	{
		errors += WebDeveloper.Locales.getString("emptyPath") + "\n";
	}

	// If this is not a session cookie
	if(!document.getElementById("web-developer-session-cookie").checked)
	{
		// If the expires is empty
		if(!expires)
		{
			errors += WebDeveloper.Locales.getString("emptyExpires") + "\n";
		}
		else if(expiresDate && expiresDate == "Invalid Date")
		{
			errors += WebDeveloper.Locales.getString("invalidExpires") + "\n";
		}
	}

	// If there are errors
	if(errors)
	{
		var title = null;

		// If the first argument equals add
		if(window.arguments[0] == "add")
		{
			title = WebDeveloper.Locales.getString("addCookieError");
		}
		else
		{
			title = WebDeveloper.Locales.getString("editCookieError");
		}

		WebDeveloper.Common.displayError(title, WebDeveloper.Common.trim(errors));

		return false;
	}
	else
	{
		var value						 = WebDeveloper.Common.trim(document.getElementById("web-developer-value").value);
		var cookie					 = name + "=" + value + ";path=" + path + ";";
		var cookiePreference = WebDeveloper.Preferences.getIntegerPreference("network.cookie.cookieBehavior");
		var scheme					 = "http://";
		var secure					 = document.getElementById("web-developer-secure-cookie").checked;
		var session					 = document.getElementById("web-developer-session-cookie").checked;
		var uri							 = null;

		// If the host is a domain
		if(host.charAt(0) == ".")
		{
			cookie += "domain=" + host + ";";
			host		= host.substring(1);
		}

		// If this is not a session cookie
		if(!session)
		{
			cookie += "expires=" + expiresDate.toUTCString() + ";";
		}

		// If the cookie is secure
		if(secure)
		{
			cookie += "secure;";
			scheme	= "https://";
		}

		// If the first argument equals edit
		if(window.arguments[0] == "edit")
		{
			Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager).remove(window.arguments[3], window.arguments[1], window.arguments[4], false);

			window.arguments[7].edited = true;
			window.arguments[7].host	 = host;
			window.arguments[7].name	 = name;
			window.arguments[7].path	 = path;
			window.arguments[7].secure = secure;
			window.arguments[7].value  = value;

			// If this is not a session cookie
			if(!session)
			{
				window.arguments[7].expires = expiresDate.toUTCString();
			}
		}

		uri = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI(scheme + host + path, null, null);

		// If the cookie preference is not allowing all cookies
		if(cookiePreference !== 0)
		{
			WebDeveloper.Preferences.setIntegerPreference("network.cookie.cookieBehavior", 0);
		}

		Components.classes["@mozilla.org/cookieService;1"].getService().QueryInterface(Components.interfaces.nsICookieService).setCookieString(uri, null, cookie.substring(0, cookie.length - 1), null);

		// If the cookie preference was not allowing all cookies
		if(cookiePreference !== 0)
		{
			WebDeveloper.Preferences.setIntegerPreference("network.cookie.cookieBehavior", cookiePreference);
		}
	}

	return true;
};

// Handles the cookie dialog being cancelled
WebDeveloper.Cookie.cancel = function()
{
	// If the first argument equals edit
	if(window.arguments[0] == "edit")
	{
		window.arguments[7].edited = false;
	}

	return true;
};

// Initializes the cookie dialog
WebDeveloper.Cookie.initialize = function()
{
	// If the first argument equals add
	if(window.arguments[0] == "add")
	{
		var date = new Date();
		var url  = Components.classes["@mozilla.org/network/standard-url;1"].createInstance(Components.interfaces.nsIURL);

		document.title = WebDeveloper.Locales.getString("addCookie");
		url.spec			 = WebDeveloper.Common.getContentDocument().documentURI;

		date.setDate(date.getDate() + 1);

		document.getElementById("web-developer-expires").value = date.toUTCString();
		document.getElementById("web-developer-host").value		 = url.host;
		document.getElementById("web-developer-path").value		 = url.path;
	}
	else
	{
		document.title = WebDeveloper.Locales.getString("editCookie");

		document.getElementById("web-developer-name").value  = window.arguments[1];
		document.getElementById("web-developer-value").value = window.arguments[2];
		document.getElementById("web-developer-host").value  = window.arguments[3];
		document.getElementById("web-developer-path").value  = window.arguments[4];

		// If the cookie is a session cookie
		if(window.arguments[5])
		{
			document.getElementById("web-developer-expires").value = window.arguments[5];
		}
		else
		{
			document.getElementById("web-developer-expires").disabled				= true;
			document.getElementById("web-developer-session-cookie").checked = true;
		}

		// If the cookie is secure
		if(window.arguments[6] == "true")
		{
			document.getElementById("web-developer-secure-cookie").checked = true;
		}
	}
};

// Updates the expiry status
WebDeveloper.Cookie.updateExpiryStatus = function()
{
	var expires = document.getElementById("web-developer-expires");

	// If session cookie is checked
	if(document.getElementById("web-developer-session-cookie").checked)
	{
		expires.disabled = true;
		expires.value		 = "";
	}
	else
	{
		var date = new Date();

		date.setDate(date.getDate() + 1);

		expires.disabled = false;
		expires.value		 = date.toUTCString();
	}

};
