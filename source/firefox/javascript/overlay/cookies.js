var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay				 = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Cookies = WebDeveloper.Overlay.Cookies || {};

// Adds a cookie
WebDeveloper.Overlay.Cookies.addCookie = function()
{
	window.openDialog("chrome://web-developer/content/dialogs/cookie.xul", "web-developer-cookie-dialog", "centerscreen,chrome,modal", "add");
};

// Clears all session cookies
WebDeveloper.Overlay.Cookies.clearSessionCookies = function()
{
	// If the clearing is confirmed
	if(WebDeveloper.Overlay.displayConfirmation(WebDeveloper.Locales.getString("clearSessionCookies"), WebDeveloper.Locales.getString("clearSessionCookiesConfirmation"), WebDeveloper.Locales.getString("clear")))
	{
		WebDeveloper.Cookies.clearSessionCookies();
	}
};

// Deletes all the cookies for the current domain
WebDeveloper.Overlay.Cookies.deleteDomainCookies = function()
{
	var cookies				= [];
	var cookiesLength = null;
	var documents			= WebDeveloper.Common.getDocuments(WebDeveloper.Common.getContentWindow());
	var message				= null;

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		cookies = cookies.concat(WebDeveloper.Cookies.getHostCookies(documents[i].location.hostname, "/", false));
	}

	cookiesLength = cookies.length;

	// If one cookie was found
	if(cookiesLength == 1)
	{
		message = WebDeveloper.Locales.getString("deleteDomainCookiesSingleConfirmation");
	}
	else
	{
		message = WebDeveloper.Locales.getFormattedString("deleteDomainCookiesMultipleConfirmation", [cookiesLength]);
	}

	// If the deletion is confirmed
	if(cookiesLength === 0 || WebDeveloper.Overlay.displayConfirmation(WebDeveloper.Locales.getString("deleteDomainCookies"), message, WebDeveloper.Locales.getString("delete")))
	{
		var cookie				= null;
		var cookieManager = Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager);

		// Loop through all the cookies
		for(i = 0 ; i < cookiesLength; i++)
		{
			cookie = cookies[i];

			cookieManager.remove(cookie.host, cookie.name, cookie.path, false);
		}

		// If one cookie was found
		if(cookiesLength == 1)
		{
			WebDeveloper.Common.displayNotification("deleteDomainCookiesSingleResult");
		}
		else
		{
			WebDeveloper.Common.displayNotification("deleteDomainCookiesMultipleResult", [cookiesLength]);
		}
	}
};

// Deletes all the cookies for the current path
WebDeveloper.Overlay.Cookies.deletePathCookies = function()
{
	var cookies				= [];
	var cookiesLength = null;
	var documents			= WebDeveloper.Common.getDocuments(WebDeveloper.Common.getContentWindow());
	var message				= null;
	var pageDocument	= null;

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		pageDocument = documents[i];
		cookies			 = cookies.concat(WebDeveloper.Cookies.getHostCookies(pageDocument.location.hostname, pageDocument.location.pathname, false));
	}

	cookiesLength = cookies.length;

	// If one cookie was found
	if(cookiesLength == 1)
	{
		message = WebDeveloper.Locales.getString("deletePathCookiesSingleConfirmation");
	}
	else
	{
		message = WebDeveloper.Locales.getFormattedString("deletePathCookiesMultipleConfirmation", [cookiesLength]);
	}

	// If the deletion is confirmed
	if(cookiesLength === 0 || WebDeveloper.Overlay.displayConfirmation(WebDeveloper.Locales.getString("deletePathCookies"), message, WebDeveloper.Locales.getString("delete")))
	{
		var cookie				= null;
		var cookieManager = Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager);

		// Loop through all the cookies
		for(i = 0; i < cookiesLength; i++)
		{
			cookie = cookies[i];

			cookieManager.remove(cookie.host, cookie.name, cookie.path, false);
		}

		// If one cookie was found
		if(cookiesLength == 1)
		{
			WebDeveloper.Common.displayNotification("deletePathCookiesSingleResult");
		}
		else
		{
			WebDeveloper.Common.displayNotification("deletePathCookiesMultipleResult", [cookiesLength]);
		}
	}
};

// Toggles cookies
WebDeveloper.Overlay.Cookies.toggleCookies = function(element)
{
	var cookieBehavior = 2;

	// If enabling cookies
	if(WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")))
	{
		cookieBehavior = 0;
	}

	WebDeveloper.Preferences.setIntegerPreference("network.cookie.cookieBehavior", cookieBehavior);
};

// Toggles third-party cookies
WebDeveloper.Overlay.Cookies.toggleThirdPartyCookies = function(element)
{
	var cookieBehavior = 1;

	// If enabling third-party cookies
	if(WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")))
	{
		cookieBehavior = 0;
	}

	WebDeveloper.Preferences.setIntegerPreference("network.cookie.cookieBehavior", cookieBehavior);
};

// Updates the disable cookies menu
WebDeveloper.Overlay.Cookies.updateDisableCookiesMenu = function()
{
	var disableThirdPartyCookiesChecked = false;
	var disableThirdPartyCookiesMenu		= document.getElementById("web-developer-disable-third-party-cookies-command");
	var disableCookiesChecked						= false;
	var disableCookiesPreferenceValue		= WebDeveloper.Preferences.getIntegerPreference("network.cookie.cookieBehavior");

	// If the cookie preference value is set to 2
	if(disableCookiesPreferenceValue == 2)
	{
		disableCookiesChecked = true;
	}
	else if(disableCookiesPreferenceValue == 1)
	{
		disableThirdPartyCookiesChecked = true;
	}

	WebDeveloper.Common.configureElement(document.getElementById("web-developer-disable-all-cookies-command"), "checked", disableCookiesChecked);
	WebDeveloper.Common.configureElement(disableThirdPartyCookiesMenu, "checked", disableThirdPartyCookiesChecked);
	WebDeveloper.Common.configureElement(disableThirdPartyCookiesMenu, "disabled", disableCookiesChecked);
};

// Displays all the cookies for the page
WebDeveloper.Overlay.Cookies.viewCookieInformation = function()
{
	var locale = WebDeveloper.Locales.setupGeneratedLocale();

	locale.atEndOfSession						= WebDeveloper.Locales.getString("atEndOfSession");
	locale.cancel										= WebDeveloper.Locales.getString("cancel");
	locale.cookie										= WebDeveloper.Locales.getString("cookie");
	locale.cookieDeleted						= WebDeveloper.Locales.getString("cookieDeleted");
	locale.cookieEdited							= WebDeveloper.Locales.getString("cookieEdited");
	locale.cookieInformation				= WebDeveloper.Locales.getString("cookieInformation");
	locale.cookies									= WebDeveloper.Locales.getString("cookies");
	locale.deleteCookie							= WebDeveloper.Locales.getString("deleteCookie");
	locale.deleteCookieConfirmation = WebDeveloper.Locales.getString("deleteCookieConfirmation");
	locale.deleteLabel							= WebDeveloper.Locales.getString("delete");
	locale.editCookie								= WebDeveloper.Locales.getString("editCookie");
	locale.expires									= WebDeveloper.Locales.getString("expires");
	locale.host											= WebDeveloper.Locales.getString("host");
	locale.httpOnly									= WebDeveloper.Locales.getString("httpOnly");
	locale.name											= WebDeveloper.Locales.getString("name");
	locale.no												= WebDeveloper.Locales.getString("no");
	locale.path											= WebDeveloper.Locales.getString("path");
	locale.property									= WebDeveloper.Locales.getString("property");
	locale.secure										= WebDeveloper.Locales.getString("secure");
	locale.value										= WebDeveloper.Locales.getString("value");
	locale.yes											= WebDeveloper.Locales.getString("yes");

	WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-cookie-information.html"), WebDeveloper.Cookies.getCookies(), locale);
};
