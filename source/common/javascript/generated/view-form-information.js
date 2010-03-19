// Initializes the page with data
function initialize(data)
{
	var container       = null;
	var contentDocument = null;
	var documents       = data.documents;
	var form            = null;
	var formDescription = null;
	var formElement     = null;
	var formElements    = null;
	var forms           = null;
	var formsLength     = null;
	var list            = null;
	var row             = null;
	var table           = null;
	var url							= null;

	setPageTitle("Forms", data);
	setWindowTitle("Forms", data);
	
	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];
		formDescription = "forms";
		forms           = contentDocument.forms;
		formsLength     = forms.length;
		url             = contentDocument.url;
	
		// If there is only one form
		if(formsLength == 1)
		{
			formDescription = "form";
		}

		$("#content").append('<h2><span></span><a href="' + url + '">' + url + "</a></h2>");
		$("#content").append('<h3 id="form-' + (i + 1) + '"><span></span>' + formsLength + " " + formDescription + "</h3>");
		$("#jump-to ul").append('<li><a href="#form-' + (i + 1) + '">' + formatURL(url) + "</a></li>");	

		// If there are forms
		if(formsLength > 0)
		{
			container = $("<div></div>");

			$("#content").append(container);

			// Loop through the forms
			for(var j = 0; j < formsLength; j++)
			{
				form         = forms[j];
				formElements = form.elements;
				row          = $("<tr></tr>");
				table        = $("<table></table>");

				table.append("<tr><th>Id</th><th>Name</th><th>Method</th><th>Action</th></tr>");
				
				row.append(createTableCell(form.id));
				row.append(createTableCell(form.name));
				row.append(createTableCell(form.method));
				row.append(createTableCell(form.action));
				
				table.append(row);

				container.append("<h4>Form</h4>");
				container.append(table);

				// If there are form elements
				if(formElements.length > 0)
				{
					table = $("<table></table>");
					
					table.append("<tr><th>Id</th><th>Name</th><th>Type</th><th>Value</th><th>Size</th><th>Maximum length</th></tr>");

					// Loop through the form elements
					for(var k = 0, n = formElements.length; k < n; k++)
					{
						formElement = formElements[k];
						row         = $("<tr></tr>");

						row.append(createTableCell(formElement.id));
						row.append(createTableCell(formElement.name));
						row.append(createTableCell(formElement.type));
						row.append(createTableCell(formElement.value));
						row.append(createTableCell(formElement.size));
						row.append(createTableCell(formElement.maximumLength));

						table.append(row);
					}

					container.append("<h4>Elements</h4>");
					container.append(table);
				}
				
				container.append('<div class="separator"></div>');
			}
		}
		else
		{
			$("#content").append('<div class="separator"></div>');
		}
	}
	
	initializeCommonElements();
}
