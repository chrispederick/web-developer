var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Generated        = WebDeveloper.Generated || {};
WebDeveloper.Generated.cookie = null;

// Handles the cookie session setting being changed
WebDeveloper.Generated.changeSession = function()
{
  var cookieExpires = document.getElementById("cookie-expires");

  // If the session setting is checked
  if(document.getElementById("cookie-session").checked)
  {
    cookieExpires.disabled = true;
    cookieExpires.value    = "";

    cookieExpires.setAttribute("placeholder", "");
  }
  else
  {
    cookieExpires.disabled = false;
    cookieExpires.value    = WebDeveloper.Cookies.getDateTomorrow();

    cookieExpires.setAttribute("placeholder", WebDeveloper.Generated.storedLocale.expiresPlaceholder);
  }
};

// Deletes a cookie
WebDeveloper.Generated.deleteCookie = function()
{
  var alert      = document.createElement("div");
  var cookie     = WebDeveloper.Generated.populateCookieFromElement(WebDeveloper.Generated.cookie);
  var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var useElement = document.createElementNS("http://www.w3.org/2000/svg", "use");

  WebDeveloper.Cookies.deleteCookie(cookie);

  useElement.setAttribute("href", "/svg/icons/icons.svg#c-check");
  svgElement.appendChild(useElement);
  svgElement.setAttribute("class", "bi me-1");
  alert.appendChild(svgElement);
  alert.appendChild(document.createTextNode(WebDeveloper.Generated.storedLocale.cookieDeleted.replace("%S", "'" + cookie.name + "'")));
  alert.setAttribute("class", "alert alert-success");

  WebDeveloper.Generated.cookie.replaceWith(alert);
  bootstrap.Modal.getOrCreateInstance("#delete-dialog").hide();
};

// Handles the delete cookie dialog being opened
WebDeveloper.Generated.deleteCookieDialogOpened = function(event)
{
  var cookieElement = event.relatedTarget.parentElement;

  WebDeveloper.Generated.cookie = cookieElement;

  document.getElementById("delete-dialog").querySelector("p").replaceChildren(WebDeveloper.Generated.storedLocale.deleteCookieConfirmation.replace("%S", "'" + cookieElement.querySelector(".web-developer-name").textContent + "'"));
};

// Displays a cookie
WebDeveloper.Generated.displayCookie = function(cookie, container, documentCount, cookiesCounter, locale)
{
  var childElement        = document.createElement("th");
  var cookieElement       = document.createElement("div");
  var cookieExpires       = cookie.expires;
  var cookieName          = cookie.name;
  var element             = document.createElement("tr");
  var expiresDescription  = locale.atEndOfSession;
  var httpOnlyDescription = locale.no;
  var secureDescription   = locale.no;
  var separator           = document.createElement("hr");
  var table               = document.createElement("table");
  var tableContainer      = document.createElement("tbody");
  var tableWrapper        = document.createElement("div");

  // If the cookie has an expiration
  if(cookieExpires)
  {
    expiresDescription = new Date(cookieExpires * 1000).toUTCString();
  }

  // If the cookie is HttpOnly
  if(cookie.httpOnly)
  {
    httpOnlyDescription = locale.yes;
  }

  // If the cookie is secure
  if(cookie.secure)
  {
    secureDescription = locale.yes;
  }

  childElement.appendChild(document.createTextNode(locale.name));
  element.appendChild(childElement);

  childElement = document.createElement("td");

  childElement.appendChild(document.createTextNode(cookieName));
  childElement.setAttribute("class", "text-break web-developer-name");
  element.appendChild(childElement);
  tableContainer.appendChild(element);

  childElement = document.createElement("th");
  element      = document.createElement("tr");

  childElement.appendChild(document.createTextNode(locale.value));
  element.appendChild(childElement);

  childElement = document.createElement("td");

  childElement.appendChild(document.createTextNode(cookie.value));
  childElement.setAttribute("class", "text-break web-developer-value");
  element.appendChild(childElement);
  tableContainer.appendChild(element);

  childElement = document.createElement("th");
  element      = document.createElement("tr");

  childElement.appendChild(document.createTextNode(locale.host));
  element.appendChild(childElement);

  childElement = document.createElement("td");

  childElement.appendChild(document.createTextNode(cookie.host));
  childElement.setAttribute("class", "text-break web-developer-host");
  element.appendChild(childElement);
  tableContainer.appendChild(element);

  childElement = document.createElement("th");
  element      = document.createElement("tr");

  childElement.appendChild(document.createTextNode(locale.path));
  element.appendChild(childElement);

  childElement = document.createElement("td");

  childElement.appendChild(document.createTextNode(cookie.path));
  childElement.setAttribute("class", "text-break web-developer-path");
  element.appendChild(childElement);
  tableContainer.appendChild(element);

  childElement = document.createElement("th");
  element      = document.createElement("tr");

  childElement.appendChild(document.createTextNode(locale.expires));
  element.appendChild(childElement);

  childElement = document.createElement("td");

  childElement.appendChild(document.createTextNode(expiresDescription));
  childElement.setAttribute("class", "text-break web-developer-expires");
  element.appendChild(childElement);
  tableContainer.appendChild(element);

  childElement = document.createElement("th");
  element      = document.createElement("tr");

  childElement.appendChild(document.createTextNode(locale.secure));
  element.appendChild(childElement);

  childElement = document.createElement("td");

  childElement.appendChild(document.createTextNode(secureDescription));
  childElement.setAttribute("class", "text-break web-developer-secure");
  element.appendChild(childElement);
  tableContainer.appendChild(element);

  childElement = document.createElement("th");
  element      = document.createElement("tr");

  childElement.appendChild(document.createTextNode(locale.httpOnly));
  element.appendChild(childElement);

  childElement = document.createElement("td");

  childElement.appendChild(document.createTextNode(httpOnlyDescription));
  element.appendChild(childElement);
  tableContainer.appendChild(element);

  table.appendChild(tableContainer);
  table.setAttribute("class", "table table-borderless table-striped");
  tableWrapper.setAttribute("class", "table-responsive");
  tableWrapper.appendChild(table);
  cookieElement.setAttribute("id", "cookie-" + cookiesCounter);
  cookieElement.appendChild(tableWrapper);
  cookieElement.appendChild(WebDeveloper.Generated.generateCommands(cookie, locale));
  container.appendChild(cookieElement);
  separator.setAttribute("class", "m-5");
  container.appendChild(separator);
  document.getElementById("content").appendChild(container);

  WebDeveloper.Generated.addItem(cookieName, cookiesCounter, documentCount + 1);
};

// Edits a cookie
WebDeveloper.Generated.editCookie = function()
{
  // If the dialog is valid
  if(WebDeveloper.Generated.validateEditDialog())
  {
    var alert      = document.createElement("div");
    var newCookie  = WebDeveloper.Generated.populateCookieFromDialog();
    var oldCookie  = WebDeveloper.Generated.populateCookieFromElement(WebDeveloper.Generated.cookie);
    var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var useElement = document.createElementNS("http://www.w3.org/2000/svg", "use");

    WebDeveloper.Cookies.deleteCookie(oldCookie);
    WebDeveloper.Cookies.addCookie(newCookie);
    WebDeveloper.Generated.populateElementFromCookie(WebDeveloper.Generated.cookie, newCookie);

    useElement.setAttribute("href", "/svg/icons/icons.svg#c-check");
    svgElement.appendChild(useElement);
    svgElement.setAttribute("class", "bi me-1");
    alert.appendChild(svgElement);
    alert.appendChild(document.createTextNode(WebDeveloper.Generated.storedLocale.cookieEdited.replace("%S", "'" + oldCookie.name + "'")));
    alert.setAttribute("class", "alert alert-success");
    WebDeveloper.Generated.cookie.prepend(alert);
    bootstrap.Modal.getOrCreateInstance("#edit-dialog").hide();
  }
};

// Handles the edit cookie dialog being opened
WebDeveloper.Generated.editCookieDialogOpened = function(event)
{
  var cookieElement = event.relatedTarget.parentElement;

  WebDeveloper.Generated.cookie = cookieElement;

  WebDeveloper.Generated.populateDialogFromElement(cookieElement);
  WebDeveloper.Generated.resetEditDialog();
};

// Generates the commands
WebDeveloper.Generated.generateCommands = function(cookie, locale)
{
  var commands      = document.createDocumentFragment();
  var cookieHost    = cookie.host;
  var buttonElement = document.createElement("button");
  var spanElement   = null;
  var svgElement    = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var useElement    = document.createElementNS("http://www.w3.org/2000/svg", "use");

  useElement.setAttribute("href", "/svg/icons/icons.svg#trash");
  svgElement.appendChild(useElement);
  svgElement.setAttribute("class", "bi me-1");
  buttonElement.appendChild(svgElement);
  buttonElement.appendChild(document.createTextNode(locale.deleteConfirmation));
  buttonElement.setAttribute("class", "btn btn-danger btn-sm me-1 web-developer-delete");
  buttonElement.setAttribute("data-bs-target", "#delete-dialog");
  buttonElement.setAttribute("data-bs-toggle", "modal");
  commands.appendChild(buttonElement);

  buttonElement = document.createElement("button");
  svgElement    = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  useElement    = document.createElementNS("http://www.w3.org/2000/svg", "use");

  useElement.setAttribute("href", "/svg/icons/icons.svg#pen");
  svgElement.appendChild(useElement);
  svgElement.setAttribute("class", "bi me-1");
  buttonElement.appendChild(svgElement);
  buttonElement.appendChild(document.createTextNode(locale.edit));

  // If the cookie is HTTP only
  if(cookie.httpOnly)
  {
    spanElement = document.createElement("span");

    buttonElement.setAttribute("class", "btn btn-primary btn-sm web-developer-edit");
    buttonElement.setAttribute("disabled", "disabled");
    spanElement.setAttribute("data-bs-placement", "right");
    spanElement.setAttribute("data-bs-title", locale.cannotEditHTTPOnlyCookies);
    spanElement.setAttribute("data-bs-toggle", "tooltip");
    spanElement.appendChild(buttonElement);
    bootstrap.Tooltip.getOrCreateInstance(spanElement);

    buttonElement = spanElement;
  }
  else if(!WebDeveloper.Cookies.canEditLocalCookie() && (cookieHost == "localhost" || cookieHost == ".localhost"))
  {
    spanElement = document.createElement("span");

    buttonElement.setAttribute("class", "btn btn-primary btn-sm web-developer-edit");
    buttonElement.setAttribute("disabled", "disabled");
    spanElement.setAttribute("data-bs-placement", "right");
    spanElement.setAttribute("data-bs-title", locale.extensionName + " " + locale.cannotEditLocalhostCookies);
    spanElement.setAttribute("data-bs-toggle", "tooltip");
    spanElement.appendChild(buttonElement);
    bootstrap.Tooltip.getOrCreateInstance(spanElement);

    buttonElement = spanElement;
  }
  else
  {
    buttonElement.setAttribute("class", "btn btn-primary btn-sm web-developer-edit");
    buttonElement.setAttribute("data-bs-target", "#edit-dialog");
    buttonElement.setAttribute("data-bs-toggle", "modal");
  }

  commands.appendChild(buttonElement);

  return commands;
};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
  var container         = null;
  var contentDocument   = null;
  var cookieInformation = locale.cookieInformation;
  var documents         = data.documents;
  var cookieDescription = null;
  var cookies           = null;
  var cookiesCounter    = 1;
  var cookiesLength     = null;
  var deleteDialog      = document.getElementById("delete-dialog");
  var editDialog        = document.getElementById("edit-dialog");

  WebDeveloper.Generated.storeLocale(locale);
  WebDeveloper.Generated.emptyContent();
  WebDeveloper.Generated.initializeHeader(cookieInformation, data, locale);
  WebDeveloper.Generated.initializeSidebar(locale);

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument   = documents[i];
    cookieDescription = locale.cookies.toLowerCase();
    cookies           = contentDocument.cookies;
    cookiesLength     = cookies.length;

    // If there is only one cookie
    if(cookiesLength == 1)
    {
      cookieDescription = locale.cookie.toLowerCase();
    }

    WebDeveloper.Generated.addDocument(contentDocument.url, i, cookieDescription, cookiesLength, true);

    // If there are cookies
    if(cookiesLength > 0)
    {
      container = WebDeveloper.Generated.generateDocumentContainer();

      // Loop through the cookies
      for(var j = 0; j < cookiesLength; j++)
      {
        WebDeveloper.Generated.displayCookie(cookies[j], container, i, cookiesCounter, locale);

        cookiesCounter++;
      }
    }
    else
    {
      WebDeveloper.Generated.addSeparator();
    }
  }

  document.getElementById("cookie-expires").setAttribute("placeholder", locale.expiresPlaceholder);
  document.getElementById("cookie-host").setAttribute("placeholder", locale.hostPlaceholder);
  document.getElementById("cookie-name").setAttribute("placeholder", locale.namePlaceholder);
  document.getElementById("cookie-path").setAttribute("placeholder", locale.pathPlaceholder);
  document.getElementById("cookie-value").setAttribute("placeholder", locale.valuePlaceholder);
  document.querySelector('[for="cookie-expires"]').append(locale.expires);
  document.querySelector('[for="cookie-host"]').append(locale.host);
  document.querySelector('[for="cookie-name"]').append(locale.name);
  document.querySelector('[for="cookie-path"]').append(locale.path);
  document.querySelector('[for="cookie-secure"]').append(locale.secureCookie);
  document.querySelector('[for="cookie-session"]').append(locale.sessionCookie);
  document.querySelector('[for="cookie-value"]').append(locale.value);

  deleteDialog.querySelector("h4").append(locale.deleteCookie);
  deleteDialog.querySelector(".btn-danger").append(locale.deleteLabel);
  deleteDialog.querySelector(".btn-outline-secondary").append(locale.cancel);
  editDialog.querySelector("h4").append(locale.editCookie);
  editDialog.querySelector(".btn-outline-secondary").append(locale.cancel);
  editDialog.querySelector(".btn-primary").append(locale.save);

  document.getElementById("cookie-session").addEventListener("change", WebDeveloper.Generated.changeSession);
  deleteDialog.addEventListener("show.bs.modal", WebDeveloper.Generated.deleteCookieDialogOpened);
  deleteDialog.querySelector(".btn-danger").addEventListener("click", WebDeveloper.Generated.deleteCookie);
  editDialog.addEventListener("show.bs.modal", WebDeveloper.Generated.editCookieDialogOpened);
  editDialog.querySelector(".btn-primary").addEventListener("click", WebDeveloper.Generated.editCookie);

  WebDeveloper.Generated.initializeCommonElements();
};

// Populates a cookie from a dialog
WebDeveloper.Generated.populateCookieFromDialog = function()
{
  var cookie = {};

  cookie.host  = document.getElementById("cookie-host").value.trim();
  cookie.name  = document.getElementById("cookie-name").value.trim();
  cookie.path  = document.getElementById("cookie-path").value.trim();
  cookie.value = document.getElementById("cookie-value").value;

  // If the cookie is secure
  if(document.getElementById("cookie-secure").checked)
  {
    cookie.secure = true;
  }

  // If the cookie is a session cookie
  if(document.getElementById("cookie-session").checked)
  {
    cookie.session = true;
  }
  else
  {
    cookie.expires = document.getElementById("cookie-expires").value.trim();
  }

  return cookie;
};

// Populates a cookie from an element
WebDeveloper.Generated.populateCookieFromElement = function(cookieElement)
{
  var cookie = {};

  cookie.host = cookieElement.querySelector(".web-developer-host").textContent;
  cookie.name = cookieElement.querySelector(".web-developer-name").textContent;
  cookie.path = cookieElement.querySelector(".web-developer-path").textContent;

  // If the cookie is secure
  if(cookieElement.querySelector(".web-developer-secure").textContent == WebDeveloper.Generated.storedLocale.yes)
  {
    cookie.secure = true;
  }

  return cookie;
};

// Populates a dialog from an element
WebDeveloper.Generated.populateDialogFromElement = function(cookieElement)
{
  var cookieExpires = document.getElementById("cookie-expires");
  var expires       = cookieElement.querySelector(".web-developer-expires").textContent;

  document.getElementById("cookie-host").value  = cookieElement.querySelector(".web-developer-host").textContent;
  document.getElementById("cookie-name").value  = cookieElement.querySelector(".web-developer-name").textContent;
  document.getElementById("cookie-path").value  = cookieElement.querySelector(".web-developer-path").textContent;
  document.getElementById("cookie-value").value = cookieElement.querySelector(".web-developer-value").textContent;

  // If this is a session cookie
  if(expires == WebDeveloper.Generated.storedLocale.atEndOfSession)
  {
    cookieExpires.disabled = true;
    cookieExpires.value    = "";

    document.getElementById("cookie-session").checked = true;
  }
  else
  {
    cookieExpires.disabled = false;
    cookieExpires.value    = expires;

    document.getElementById("cookie-session").checked = false;
  }

  // If this is not a secure cookie
  if(cookieElement.querySelector(".web-developer-secure").textContent == WebDeveloper.Generated.storedLocale.no)
  {
    document.getElementById("cookie-secure").checked = false;
  }
  else
  {
    document.getElementById("cookie-secure").checked = true;
  }
};

// Populates an element from a cookie
WebDeveloper.Generated.populateElementFromCookie = function(cookieElement, cookie)
{
  cookieElement.querySelector(".web-developer-host").replaceChildren(cookie.host);
  cookieElement.querySelector(".web-developer-name").replaceChildren(cookie.name);
  cookieElement.querySelector(".web-developer-path").replaceChildren(cookie.path);
  cookieElement.querySelector(".web-developer-value").replaceChildren(cookie.value);

  // If the cookie is secure
  if(cookie.secure)
  {
    cookieElement.querySelector(".web-developer-secure").replaceChildren(WebDeveloper.Generated.storedLocale.yes);
  }
  else
  {
    cookieElement.querySelector(".web-developer-secure").replaceChildren(WebDeveloper.Generated.storedLocale.no);
  }

  // If the cookie is a session cookie
  if(cookie.session)
  {
    cookieElement.querySelector(".web-developer-expires").replaceChildren(WebDeveloper.Generated.storedLocale.atEndOfSession);
  }
  else
  {
    cookieElement.querySelector(".web-developer-expires").replaceChildren(cookie.expires);
  }

  return cookie;
};

// Resets the edit cookie dialog
WebDeveloper.Generated.resetEditDialog = function()
{
  document.getElementById("cookie-expires").classList.remove("is-invalid");
  document.getElementById("cookie-host").classList.remove("is-invalid");
  document.getElementById("cookie-name").classList.remove("is-invalid");
  document.getElementById("cookie-path").classList.remove("is-invalid");
};

// Returns true if the edit cookie dialog is valid
WebDeveloper.Generated.validateEditDialog = function()
{
  var host      = document.getElementById("cookie-host");
  var hostValue = host.value.trim();
  var name      = document.getElementById("cookie-name");
  var path      = document.getElementById("cookie-path");
  var valid     = true;

  // If the cookie name is not set
  if(name.value.trim() == "")
  {
    document.getElementById("cookie-name-invalid").replaceChildren(WebDeveloper.Generated.storedLocale.nameCannotBeEmpty);
    name.classList.add("is-invalid");

    valid = false;
  }
  else
  {
    name.classList.remove("is-invalid");
  }

  // If the cookie host is not set
  if(hostValue == "")
  {
    document.getElementById("cookie-host-invalid").replaceChildren(WebDeveloper.Generated.storedLocale.hostCannotBeEmpty);
    host.classList.add("is-invalid");

    valid = false;
  }
  else if(hostValue == "localhost" || hostValue == ".localhost")
  {
    document.getElementById("cookie-host-invalid").replaceChildren(WebDeveloper.Generated.storedLocale.extensionName + " " + WebDeveloper.Generated.storedLocale.cannotEditLocalhostCookies);
    host.classList.add("is-invalid");

    valid = false;
  }
  else
  {
    host.classList.remove("is-invalid");
  }

  // If the cookie path is not set
  if(path.value.trim() == "")
  {
    document.getElementById("cookie-path-invalid").replaceChildren(WebDeveloper.Generated.storedLocale.pathCannotBeEmpty);
    path.classList.add("is-invalid");

    valid = false;
  }
  else
  {
    path.classList.remove("is-invalid");
  }

  // If the cookie is not a session cookie
  if(!document.getElementById("cookie-session").checked)
  {
    var expires      = document.getElementById("cookie-expires");
    var expiresValue = expires.value.trim();

    // If the cookie expires is not set
    if(expiresValue == "")
    {
      document.getElementById("cookie-expires-invalid").replaceChildren(WebDeveloper.Generated.storedLocale.expiresCannotBeEmpty);
      expires.classList.add("is-invalid");

      valid = false;
    }
    else if(new Date(expiresValue) == "Invalid Date")
    {
      document.getElementById("cookie-expires-invalid").replaceChildren(WebDeveloper.Generated.storedLocale.expiresNotValid);
      expires.classList.add("is-invalid");

      valid = false;
    }
    else
    {
      expires.classList.remove("is-invalid");
    }
  }

  return valid;
};
