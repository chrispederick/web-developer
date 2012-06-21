var WebDeveloper = WebDeveloper || {};

WebDeveloper.Generated							= WebDeveloper.Generated || {};
WebDeveloper.Generated.cookie				= null;
WebDeveloper.Generated.storedLocale = null;

// Handles the cookie session setting being changed
WebDeveloper.Generated.changeSession = function()
{
	var session = $(this);

	// If the session setting is checked
	if(session.prop("checked"))
	{
		$("#cookie-expires").val("").prop("disabled", true);
	}
	else
	{
		$("#cookie-expires").val(WebDeveloper.Cookies.getDateTomorrow()).prop("disabled", false);
	}
};

// Handles clicking edit
WebDeveloper.Generated.clickEdit = function()
{
	var editButton = $(this);

	// If the cookie can be edited
	if(editButton.hasClass("btn-primary"))
	{
		WebDeveloper.Generated.showEditDialog(editButton.parent());
	}
	else
	{
		editButton.popover("toggle");
	}
};

// Deletes a cookie
WebDeveloper.Generated.deleteCookie = function()
{
	var cookie = WebDeveloper.Generated.populateCookieFromElement(WebDeveloper.Generated.cookie);

	WebDeveloper.Cookies.deleteCookie(cookie);

	WebDeveloper.Generated.cookie.slideUp(WebDeveloper.Generated.animationSpeed, function() { WebDeveloper.Generated.cookie.remove(); });
	$("#delete-dialog").modal("hide");
	WebDeveloper.Generated.cookie.before('<div class="alert alert-success">' + WebDeveloper.Generated.storedLocale.cookieDeleted.replace("%S", "<strong>" + cookie.name + "</strong>") + "</div>");
};

// Edits a cookie
WebDeveloper.Generated.editCookie = function()
{
	// If the dialog is valid
	if(WebDeveloper.Generated.validateEditDialog())
	{
		var newCookie = WebDeveloper.Generated.populateCookieFromDialog();
		var oldCookie = WebDeveloper.Generated.populateCookieFromElement(WebDeveloper.Generated.cookie);

		WebDeveloper.Cookies.deleteCookie(oldCookie);
		WebDeveloper.Cookies.addCookie(newCookie);
		WebDeveloper.Generated.populateElementFromCookie(WebDeveloper.Generated.cookie, newCookie);

		WebDeveloper.Generated.cookie.prepend('<div class="alert alert-success">' + WebDeveloper.Generated.storedLocale.cookieEdited.replace("%S", "<strong>" + oldCookie.name + "</strong>") + "</div>");
		$("#edit-dialog").modal("hide");
	}
};

// Generates the commands
WebDeveloper.Generated.generateCommands = function(cookie, locale)
{
	var commands	 = "";
	var cookieHost = cookie.host;

	commands += '<button class="web-developer-delete btn btn-danger"><i class="icon-trash"></i> ' + locale.deleteConfirmation + "</button>";

	// If the cookie is HTTP onlu
	if(cookie.httpOnly)
	{
		commands += '<button class="web-developer-edit btn" data-content="' + locale.cannotEditHTTPOnlyCookies + '" data-title="' + locale.cannotEdit + '" data-trigger="manual"><i class="icon-pencil"></i> ' + locale.edit + "</button>";
	}
	else if(!WebDeveloper.Cookies.canEditLocalCookie() && (cookieHost == "localhost" || cookieHost == ".localhost"))
	{
		commands += '<button class="web-developer-edit btn" data-content=' + "'" + locale.cannotEditLocalhostCookies + "'" + ' data-title="' + locale.cannotEdit + '" data-trigger="manual"><i class="icon-pencil"></i> ' + locale.edit + "</button>";
	}
	else
	{
		commands += '<button class="web-developer-edit btn btn-primary"><i class="icon-pencil"></i> ' + locale.edit + "</button>";
	}

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
	var editDialog					= $("#edit-dialog");
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

				tableBody.append('<tr><td>' + locale.httpOnly + '</td><td>' + httpOnlyDescription + '</td></tr>');

				table.append(tableBody);
				cookieElement.append(table).append(WebDeveloper.Generated.generateCommands(cookie, locale));
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

	$("#cookie-secure").after(locale.secureCookie);
	$("#cookie-session").after(locale.sessionCookie).on("change", WebDeveloper.Generated.changeSession);
	$(".btn-danger", deleteDialog).append(locale.deleteLabel).on("click", WebDeveloper.Generated.deleteCookie);
	$(".btn-primary", editDialog).append(locale.save).on("click", WebDeveloper.Generated.editCookie);
	$('button[data-dismiss="modal"]', deleteDialog).html(locale.cancel);
	$('button[data-dismiss="modal"]', editDialog).html(locale.cancel);
	$(".web-developer-delete").on("click", WebDeveloper.Generated.showDeleteDialog);
	$(".web-developer-edit").on("click", WebDeveloper.Generated.clickEdit);
	$('[for="cookie-expires"]').html(locale.expires);
	$('[for="cookie-host"]').html(locale.host);
	$('[for="cookie-name"]').html(locale.name);
	$('[for="cookie-path"]').html(locale.path);
	$('[for="cookie-value"]').html(locale.value);

	WebDeveloper.Generated.initializeCommonElements();
};

// Populates a cookie from a dialog
WebDeveloper.Generated.populateCookieFromDialog = function()
{
	var cookie = {};

	cookie.host  = $("#cookie-host").val();
	cookie.name  = $("#cookie-name").val();
	cookie.path  = $("#cookie-path").val();
	cookie.value = $("#cookie-value").val();

	// If the cookie is secure
	if($("#cookie-secure").prop("checked"))
	{
		cookie.secure = true;
	}

	// If the cookie is a session cookie
	if($("#cookie-session").prop("checked"))
	{
		cookie.session = true;
	}
	else
	{
		cookie.expires = $("#cookie-expires").val();
	}

	return cookie;
};

// Populates a cookie from an element
WebDeveloper.Generated.populateCookieFromElement = function(cookieElement)
{
	var cookie = {};

	cookie.host = $(".web-developer-host", cookieElement).text();
	cookie.name = $(".web-developer-name", cookieElement).text();
	cookie.path = $(".web-developer-path", cookieElement).text();

	// If the cookie is secure
	if($(".web-developer-secure", cookieElement).text() == WebDeveloper.Generated.storedLocale.yes)
	{
		cookie.secure = true;
	}

	return cookie;
};

// Populates a dialog from an element
WebDeveloper.Generated.populateDialogFromElement = function(cookieElement)
{
	var expires	= $(".web-developer-expires", cookieElement).text();

	$("#cookie-host").val($(".web-developer-host", cookieElement).text());
	$("#cookie-name").val($(".web-developer-name", cookieElement).text());
	$("#cookie-path").val($(".web-developer-path", cookieElement).text());
	$("#cookie-value").val($(".web-developer-value", cookieElement).text());

	// If this is a session cookie
	if(expires == WebDeveloper.Generated.storedLocale.atEndOfSession)
	{
		$("#cookie-expires").val("").prop("disabled", true);
		$("#cookie-session").prop("checked", true);
	}
	else
	{
		$("#cookie-expires").val(expires).prop("disabled", false);
		$("#cookie-session").prop("checked", false);
	}

	// If this is not a secure cookie
	if($(".web-developer-secure", cookieElement).text() == WebDeveloper.Generated.storedLocale.no)
	{
		$("#cookie-secure").prop("checked", false);
	}
	else
	{
		$("#cookie-secure").prop("checked", true);
	}
};

// Populates an element from a cookie
WebDeveloper.Generated.populateElementFromCookie = function(cookieElement, cookie)
{
	$(".web-developer-host", cookieElement).text(cookie.host);
	$(".web-developer-name", cookieElement).text(cookie.name);
	$(".web-developer-path", cookieElement).text(cookie.path);
	$(".web-developer-value", cookieElement).text(cookie.value);

	// If the cookie is secure
	if(cookie.secure)
	{
		$(".web-developer-secure", cookieElement).text(WebDeveloper.Generated.storedLocale.yes);
	}
	else
	{
		$(".web-developer-secure", cookieElement).text(WebDeveloper.Generated.storedLocale.no);
	}

	// If the cookie is a session cookie
	if(cookie.session)
	{
		$(".web-developer-expires", cookieElement).text(WebDeveloper.Generated.storedLocale.atEndOfSession);
	}
	else
	{
		$(".web-developer-expires", cookieElement).text(cookie.expires);
	}

	return cookie;
};

// Resets the edit cookie dialog
WebDeveloper.Generated.resetEditDialog = function(editDialog)
{
	$(".error", editDialog).removeClass("error");
	$(".help-inline", editDialog).html("");
};

// Shows the delete cookie dialog
WebDeveloper.Generated.showDeleteDialog = function()
{
	var cookieElement = $(this).parent();
	var cookieName		= $(".web-developer-name", cookieElement).text();
	var deleteDialog	= $("#delete-dialog");

	WebDeveloper.Generated.cookie = cookieElement;

	$(".alert").remove();

	$("h3", deleteDialog).html(WebDeveloper.Generated.storedLocale.deleteCookie);
	$("p", deleteDialog).html(WebDeveloper.Generated.storedLocale.deleteCookieConfirmation.replace("%S", "<strong>" + cookieName + "</strong>"));

	deleteDialog.modal("show");
};

// Shows the edit cookie dialog
WebDeveloper.Generated.showEditDialog = function(cookieElement)
{
	var editDialog = $("#edit-dialog");

	WebDeveloper.Generated.cookie = cookieElement;

	$(".alert").remove();

	$("h3", editDialog).html(WebDeveloper.Generated.storedLocale.editCookie);
	WebDeveloper.Generated.populateDialogFromElement(cookieElement);
	WebDeveloper.Generated.resetEditDialog(editDialog);

	editDialog.modal("show");
};

// Returns true if the edit cookie dialog is valid
WebDeveloper.Generated.validateEditDialog = function()
{
	var expires = $("#cookie-expires");
	var host		= $("#cookie-host");
	var name		= $("#cookie-name");
	var path		= $("#cookie-path");
	var valid		= true;

	WebDeveloper.Generated.resetEditDialog($("#edit-dialog"));

	// If the cookie name is not set
	if(!name.val())
	{
		name.next().html(WebDeveloper.Generated.storedLocale.nameCannotBeEmpty);
		name.closest(".control-group").addClass("error");

		valid = false;
	}

	// If the cookie host is not set
	if(!host.val())
	{
		host.next().html(WebDeveloper.Generated.storedLocale.hostCannotBeEmpty);
		host.closest(".control-group").addClass("error");

		valid = false;
	}

	// If the cookie path is not set
	if(!path.val())
	{
		path.next().html(WebDeveloper.Generated.storedLocale.pathCannotBeEmpty);
		path.closest(".control-group").addClass("error");

		valid = false;
	}

	// If the cookie is not a session cookie
	if(!$("#cookie-session").prop("checked"))
	{
		var expiresValue = WebDeveloper.Common.trim(expires.val());

		// If the cookie expires is not set
		if(!expiresValue)
		{
			expires.next().html(WebDeveloper.Generated.storedLocale.expiresCannotBeEmpty);
			expires.closest(".control-group").addClass("error");

			valid = false;
		}
		else if(new Date(expiresValue) == "Invalid Date")
		{
			expires.next().html(WebDeveloper.Generated.storedLocale.expiresNotValid);
			expires.closest(".control-group").addClass("error");

			valid = false;
		}
	}

	return valid;
};
