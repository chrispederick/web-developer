var WebDeveloper = WebDeveloper || {};

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Formats the form description
WebDeveloper.Generated.formatFormDescription = function(form)
{
	// If the form id is set
	if(form.id)
	{
		return form.id;
	}
	else if(form.name)
	{
		return form.name;
	}

	return form.action;
};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
	var container					= null;
	var content						= $("#content");
	var contentDocument		= null;
	var documents					= data.documents;
	var form							= null;
	var formDescription		= null;
	var forms							= null;
	var formsCounter			= 1;
	var formsDescription	= locale.forms;
	var formsDropdown			= $("#forms-dropdown");
	var formsDropdownMenu	= $(".dropdown-menu", formsDropdown);
	var formsLength				= null;
	var list							= null;
	var table							= null;
	var tableBody					= null;

	WebDeveloper.Generated.emptyContent();
	WebDeveloper.Generated.localizeHeader(locale);
	WebDeveloper.Generated.setPageTitle(formsDescription, data, locale);

	$(".dropdown-toggle", formsDropdown).prepend(formsDescription);

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];
		formDescription = formsDescription.toLowerCase();
		forms						= contentDocument.forms;
		formsLength			= forms.length;

		// If there is only one form
		if(formsLength == 1)
		{
			formDescription = locale.form.toLowerCase();
		}

		WebDeveloper.Generated.addDocument(contentDocument.url, i, formDescription, formsLength);

		// If there are forms
		if(formsLength > 0)
		{
			container = WebDeveloper.Generated.generateDocumentContainer();

			// Loop through the forms
			for(var j = 0; j < formsLength; j++)
			{
				form			= forms[j];
				table			= $('<table class="table table-bordered table-striped"></table>');
				tableBody	= $("<tbody></tbody>");

				table.append("<thead><tr><th>" + locale.id + "</th><th>" + locale.name + "</th><th>" + locale.method + "</th><th>" + locale.action + "</th></tr></thead>");
				tableBody.append(ich.form(form));
				table.append(tableBody);
				container.append('<h4 id="form-' + formsCounter + '" class="web-developer-form">' + locale.form + "</h4>");
				container.append(table);

				// If there are form elements
				if(form.elements.length > 0)
				{
					table			= $('<table class="table table-bordered table-striped"></table>');
					tableBody = $("<tbody></tbody>");

					table.append("<thead><tr><th>" + locale.id + "</th><th>" + locale.name + "</th><th>" + locale.type + "</th><th>" + locale.value + "</th><th>" + locale.label + "</th><th>" + locale.size + "</th><th>" + locale.maximumLength + "</th></tr></thead>");
					tableBody.append(ich.formElements(form));
					container.append("<h4>" + locale.elements + "</h4>");
					table.append(tableBody);
					container.append(table);
				}

				container.append('<div class="web-developer-separator"></div>');
				formsDropdownMenu.append('<li><a href="#form-' + formsCounter + '">' + WebDeveloper.Generated.formatFormDescription(form) + "</a></li>");

				formsCounter++;
			}

			content.append(container);
		}
		else
		{
			WebDeveloper.Generated.addSeparator();
		}
	}

	WebDeveloper.Generated.initializeCommonElements();
};
