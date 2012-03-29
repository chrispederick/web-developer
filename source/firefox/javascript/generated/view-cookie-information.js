var WebDeveloper = WebDeveloper || {};

WebDeveloper.Generated							= WebDeveloper.Generated || {};
WebDeveloper.Generated.storedLocale = null;

// Deletes a cookie
WebDeveloper.Generated.deleteCookie = function()
{
	var cookie				= {};
	var cookieElement = $(this).parent();
	var deleteDialog	= $("#delete-dialog");

	cookie.name = $(".web-developer-name", cookieElement).text();

	$(".alert").remove();

	$("h3", deleteDialog).html(WebDeveloper.Generated.storedLocale.deleteCookie);
	$("p", deleteDialog).html(WebDeveloper.Generated.storedLocale.deleteCookieConfirmation.replace("%S", "<strong>" + cookie.name + "</strong>"));

	$(".btn-danger", deleteDialog).off("click").on("click", function()
	{
		var message = WebDeveloper.Generated.storedLocale.cookieDeleted;

		cookie.host = $(".web-developer-host", cookieElement).text();
		cookie.path = $(".web-developer-path", cookieElement).text();

		Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager).remove(cookie.host, cookie.name, cookie.path, false);

		cookieElement.slideUp(WebDeveloper.Generated.animationSpeed, function() { cookieElement.remove(); });
		deleteDialog.modal("hide");
		cookieElement.before('<div class="alert alert-success">' + message.replace("%S", "<strong>" + cookie.name + "</strong>") + "</div>");
	});

	deleteDialog.modal("show");
};

// Edits a cookie
WebDeveloper.Generated.editCookie = function()
{
	var cookie				 = $(this).parent();
	var expiresElement = $(".web-developer-expires", cookie);
	var expires				 = expiresElement.text();
	var hostElement		 = $(".web-developer-host", cookie);
	var nameElement		 = $(".web-developer-name", cookie);
	var name					 = nameElement.text();
	var pathElement		 = $(".web-developer-path", cookie);
	var response			 = {};
	var secureElement  = $(".web-developer-secure", cookie);
	var secure				 = secureElement.text();
	var valueElement	 = $(".web-developer-value", cookie);

	// If this is a session cookie
	if(expires == WebDeveloper.Generated.storedLocale.atEndOfSession)
	{
		expires = null;
	}

	// If this is not a secure cookie
	if(secure == WebDeveloper.Generated.storedLocale.no)
	{
		secure = false;
	}
	else
	{
		secure = true;
	}

	$(".alert").remove();

	window.openDialog("chrome://web-developer/content/dialogs/cookie.xul", "web-developer-cookie-dialog", "centerscreen,chrome,modal", "edit", name, valueElement.text(), hostElement.text(), pathElement.text(), expires, secure, response);

	// If the cookie was edited
	if(response.edited)
	{
		var message = WebDeveloper.Generated.storedLocale.cookieEdited;

		nameElement.text(response.name);
		valueElement.text(response.value);
		hostElement.text(response.host);
		pathElement.text(response.path);

		// If this is not a session cookie
		if(response.expires)
		{
			expiresElement.text(response.expires);
		}
		else
		{
			expiresElement.text(WebDeveloper.Generated.storedLocale.atEndOfSession);
		}

		// If this is a secure cookie
		if(response.secure)
		{
			secureElement.text(WebDeveloper.Generated.storedLocale.yes);
		}
		else
		{
			secureElement.text(WebDeveloper.Generated.storedLocale.no);
		}

		cookie.prepend('<div class="alert alert-success">' + message.replace("%S", "<strong>" + name + "</strong>") + "</div>");
	}
};

// Generates the commands
WebDeveloper.Generated.generateCommands = function(locale, includeEdit)
{
	var commands = "";

	// If including the edit command
	if(includeEdit)
	{
		commands += '<button class="web-developer-edit btn btn-primary">' + locale.editCookie + "</button>";
	}

	commands += '<button class="web-developer-delete btn btn-danger">' + locale.deleteCookie + "</button>";

	return commands;
};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
	var container						= null;
	var content							= $("#content");
	var contentDocument			= null;
	var cookieInformation		= locale.cookieInformation;
	var documents						= data.documents;
	var cookie							= null;
	var cookieDescription		= null;
	var cookieElement				= null;
	var cookieExpires				= null;
	var cookieName					= null;
	var cookies							= null;
	var cookiesCounter			= 1;
	var cookiesDropdown			= $("#cookies-dropdown");
	var cookiesDropdownMenu = $(".dropdown-menu", cookiesDropdown);
	var cookiesLength				= null;
	var deleteDialog				= $("#delete-dialog");
	var expiresDescription	= null;
	var httpOnlyDescription = null;
	var secureDescription		= null;
	var table								= null;
	var tableBody						= null;

	WebDeveloper.Generated.emptyContent();
	WebDeveloper.Generated.localizeHeader(locale);
	WebDeveloper.Generated.setPageTitle(cookieInformation, data, locale);

	$(".dropdown-toggle", cookiesDropdown).prepend(locale.cookies);

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument		= documents[i];
		cookieDescription = locale.cookies.toLowerCase();
		cookies						= contentDocument.cookies;
		cookiesLength			= cookies.length;

		// If there is only one cookie
		if(cookiesLength == 1)
		{
			cookieDescription = locale.cookie.toLowerCase();
		}

		WebDeveloper.Generated.addDocument(contentDocument.url, i, cookieDescription, cookiesLength);

		// If there are cookies
		if(cookiesLength > 0)
		{
			container = WebDeveloper.Generated.generateDocumentContainer();

			// Loop through the cookies
			for(var j = 0; j < cookiesLength; j++)
			{
				cookie							= cookies[j];
				cookieElement				= $('<div id="cookie-' + cookiesCounter + '" class="web-developer-cookie"></div>');
				cookieExpires				= cookie.expires;
				cookieName					= cookie.name;
				expiresDescription	= locale.atEndOfSession;
				httpOnlyDescription = locale.no;
				secureDescription		= locale.no;
				table								= $('<table class="table table-bordered table-striped"></table>');
				tableBody						= $("<tbody></tbody>");

				table.append('<thead><tr><th>' + locale.property + '</th><th>' + locale.value + '</th></tr></thead>');
				tableBody.append('<tr><td>' + locale.name + '</td><td class="web-developer-name">' + cookieName + '</td></tr>');
				tableBody.append('<tr><td>' + locale.value + '</td><td class="web-developer-value">' + cookie.value + '</td></tr>');
				tableBody.append('<tr><td>' + locale.host + '</td><td class="web-developer-host">' + cookie.host + '</td></tr>');
				tableBody.append('<tr><td>' + locale.path + '</td><td class="web-developer-path">' + cookie.path + '</td></tr>');

				// If the cookie has an expiration
				if(cookieExpires)
				{
					expiresDescription = new Date(cookieExpires * 1000).toUTCString();
				}

				tableBody.append('<tr><td>' + locale.expires + '</td><td class="web-developer-expires">' + expiresDescription + '</td></tr>');

				// If the cookie is secure
				if(cookie.secure)
				{
					secureDescription = locale.yes;
				}

				tableBody.append('<tr><td>' + locale.secure + '</td><td class="web-developer-secure">' + secureDescription + '</td></tr>');

				// If the cookie is HttpOnly
				if(cookie.httpOnly)
				{
					httpOnlyDescription = locale.yes;
				}

				tableBody.append('<tr><td>' + locale.httpOnly + '</td><td class="web-developer-secure">' + httpOnlyDescription + '</td></tr>');

				table.append(tableBody);
				cookieElement.append(table).append(WebDeveloper.Generated.generateCommands(locale, !cookie.httpOnly));
				container.append(cookieElement).append('<div class="web-developer-separator"></div>');
				content.append(container);
				cookiesDropdownMenu.append('<li><a href="#cookie-' + cookiesCounter + '">' + cookieName + "</a></li>");

				cookiesCounter++;
			}
		}
		else
		{
			WebDeveloper.Generated.addSeparator();
		}
	}

	WebDeveloper.Generated.storedLocale = locale;

	$(".btn-danger", deleteDialog).html(locale.deleteLabel);
	$('button[data-dismiss="modal"]', deleteDialog).html(locale.cancel);
	$(".web-developer-delete").on("click", WebDeveloper.Generated.deleteCookie);
	$(".web-developer-edit").on("click", WebDeveloper.Generated.editCookie);

	WebDeveloper.Generated.initializeCommonElements();
};
