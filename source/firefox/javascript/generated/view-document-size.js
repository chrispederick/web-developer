var WebDeveloper = WebDeveloper || {};

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Adds a section to the document size
WebDeveloper.Generated.addSection = function(elements, descriptionSingular, descriptionPlural, tableBody, bytesLocale, kilobytesLocale)
{
	var description							= descriptionPlural;
	var element									= null;
	var elementsLength					= elements.length;
	var fileSize								= null;
	var filesLength							= 0;
	var sectionHeader						= $('<tr class="web-developer-section"><td></td><td></td><td></td></tr>');
	var sectionSize							= 0;
	var sectionUncompressedSize = 0;
	var size										= null;
	var tableRow								= null;
	var uncompressedSize				= null;
	var url											= null;

	tableBody.append(sectionHeader);

	// Loop through the elements
	for(var i = 0; i < elementsLength; i++)
	{
		element					 = elements[i];
		fileSize				 = element.size;
		size						 = fileSize.size;
		tableRow				 = $('<tr><td></td><td></td><td></td></tr>');
		uncompressedSize = fileSize.uncompressedSize;
		url							 = element.url;

		sectionSize += size;
		filesLength++;

		$("td:eq(0)", tableRow).html('<a href="' + url + '" target="_blank">' + url + "</a>");
		$("td:eq(1)", tableRow).html(WebDeveloper.Common.formatFileSize(size, bytesLocale, kilobytesLocale));

		// If the uncompressed size is set
		if(uncompressedSize)
		{
			$("td:eq(2)", tableRow).html(WebDeveloper.Common.formatFileSize(uncompressedSize, bytesLocale, kilobytesLocale));

			sectionUncompressedSize += uncompressedSize;
		}
		else
		{
			sectionUncompressedSize += size;
		}

		// If this is an odd row
		if(i % 2 === 0)
		{
			tableRow.addClass("odd");
		}

		tableBody.append(tableRow);
	}

	// If there is only one element
	if(elementsLength == 1)
	{
		description = descriptionSingular;
	}

	$("td:eq(0)", sectionHeader).html(elementsLength + " " + description);

	// If the size is set
	if(sectionSize > 0)
	{
		$("td:eq(1)", sectionHeader).html(WebDeveloper.Common.formatFileSize(sectionSize, bytesLocale, kilobytesLocale));
	}

	// If the uncompressed size is set
	if(sectionUncompressedSize > 0)
	{
		$("td:eq(2)", sectionHeader).html(WebDeveloper.Common.formatFileSize(sectionUncompressedSize, bytesLocale, kilobytesLocale));
	}

	return { "files": filesLength, "size": sectionSize, "uncompressedSize": sectionUncompressedSize };
};

// Collapses all sections
WebDeveloper.Generated.collapseAllSections = function(event)
{
	$(".web-developer-section").addClass("web-developer-collapsed");
	$("tr:not(.web-developer-section, .web-developer-total)", $("tbody")).slideUp(WebDeveloper.Generated.animationSpeed);

	event.preventDefault();
};

// Expands all sections
WebDeveloper.Generated.expandAllSections = function(event)
{
	$(".web-developer-section").removeClass("web-developer-collapsed");
	$("tr:not(.web-developer-section, .web-developer-total)", $("tbody")).slideDown(WebDeveloper.Generated.animationSpeed);

	event.preventDefault();
};

// Toggles a section
WebDeveloper.Generated.toggleSection = function()
{
	$(this).toggleClass("web-developer-collapsed").nextUntil(".web-developer-section, .web-developer-total").slideToggle(WebDeveloper.Generated.animationSpeed);
};

// Initializes the page with data and locale
WebDeveloper.Generated.initialize = function(data, locale)
{
	var bytesLocale						= locale.bytes;
	var description						= locale.files;
	var documentSize					= locale.documentSize;
	var filesLength						= 0;
	var kilobytesLocale				= locale.kilobytes;
	var sectionResults				= null;
	var table									= $('<table class="table"></table>');
	var tableBody							= $("<tbody></tbody>");
	var tableRow							= $('<tr class="web-developer-total"><td></td><td></td><td></td></tr>');
	var totalSize							= 0;
	var totalUncompressedSize = 0;

	WebDeveloper.Generated.emptyContent();
	WebDeveloper.Generated.localizeHeader(locale);
	WebDeveloper.Generated.setPageTitle(documentSize, data, locale);

	table.append("<thead><tr><th></th><th>" + locale.size + "</th><th>" + locale.uncompressedSize + "</th></tr></thead>");

	sectionResults = WebDeveloper.Generated.addSection(data.documents, locale.document, locale.documents, tableBody, bytesLocale, kilobytesLocale);

	filesLength						+= sectionResults.files;
	totalSize							+= sectionResults.size;
	totalUncompressedSize += sectionResults.uncompressedSize;

	sectionResults = WebDeveloper.Generated.addSection(data.images, locale.image, locale.images, tableBody, bytesLocale, kilobytesLocale);

	filesLength						+= sectionResults.files;
	totalSize							+= sectionResults.size;
	totalUncompressedSize += sectionResults.uncompressedSize;

	sectionResults = WebDeveloper.Generated.addSection(data.objects, locale.object, locale.objects, tableBody, bytesLocale, kilobytesLocale);

	filesLength						+= sectionResults.files;
	totalSize							+= sectionResults.size;
	totalUncompressedSize += sectionResults.uncompressedSize;

	sectionResults = WebDeveloper.Generated.addSection(data.scripts, locale.script, locale.scripts, tableBody, bytesLocale, kilobytesLocale);

	filesLength						+= sectionResults.files;
	totalSize							+= sectionResults.size;
	totalUncompressedSize += sectionResults.uncompressedSize;

	sectionResults = WebDeveloper.Generated.addSection(data.styleSheets, locale.styleSheet, locale.styleSheets, tableBody, bytesLocale, kilobytesLocale);

	filesLength						+= sectionResults.files;
	totalSize							+= sectionResults.size;
	totalUncompressedSize += sectionResults.uncompressedSize;

	// If there is only one file
	if(filesLength == 1)
	{
		description = locale.file;
	}

	$("td:eq(0)", tableRow).html(filesLength + " " + description);

	// If the size is set
	if(totalSize > 0)
	{
		$("td:eq(1)", tableRow).html(WebDeveloper.Common.formatFileSize(totalSize, bytesLocale, kilobytesLocale));
	}

	// If the uncompressed size is set
	if(totalUncompressedSize > 0)
	{
		$("td:eq(2)", tableRow).html(WebDeveloper.Common.formatFileSize(totalUncompressedSize, bytesLocale, kilobytesLocale));
	}

	tableBody.append(tableRow);
	table.append(tableBody);
	$("#content").append(table);

	$("tr:not(.web-developer-section, .web-developer-total)", $("tbody")).hide();

	$(".web-developer-section").addClass("web-developer-collapsed").click(WebDeveloper.Generated.toggleSection);
	$("#web-developer-collapse-all").click(WebDeveloper.Generated.collapseAllSections);
	$("#web-developer-expand-all").click(WebDeveloper.Generated.expandAllSections);
};
