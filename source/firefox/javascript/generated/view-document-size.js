var WebDeveloper = WebDeveloper || {};

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Adds a section to the document size
WebDeveloper.Generated.addSection = function(elements, descriptionSingular, descriptionPlural, tableBody, bytesLocale, kilobytesLocale)
{
	var element									= null;
	var elementsLength					= elements.length;
	var fileSize								= null;
	var filesLength							= 0;
	var sectionHeader						= null;
	var sectionSize							= 0;
	var sectionUncompressedSize = 0;
	var size										= null;
	var sizeInformation					= {};
	var uncompressedSize				= null;

	sizeInformation.description = elementsLength + " ";

	// If there is only one element
	if(elementsLength == 1)
	{
		sizeInformation.description += descriptionSingular;
	}
	else
	{
		sizeInformation.description += descriptionPlural;
	}

	sectionHeader = ich.documentSizeHeader(sizeInformation);

	tableBody.append(sectionHeader);

	// Loop through the elements
	for(var i = 0; i < elementsLength; i++)
	{
		element					 = elements[i];
		fileSize				 = element.size;
		size						 = fileSize.size;
		sizeInformation  = {};
		uncompressedSize = fileSize.uncompressedSize;

		sectionSize += size;

		filesLength++;

		sizeInformation.size = WebDeveloper.Common.formatFileSize(size, bytesLocale, kilobytesLocale);
		sizeInformation.url  = element.url;

		// If the uncompressed size is set
		if(uncompressedSize)
		{
			sizeInformation.uncompressedSize = WebDeveloper.Common.formatFileSize(uncompressedSize, bytesLocale, kilobytesLocale);

			sectionUncompressedSize += uncompressedSize;
		}
		else
		{
			sectionUncompressedSize += size;
		}

		// If this is an odd row
		if(i % 2 === 0)
		{
			sizeInformation.stripe = ' class="odd"';
		}

		tableBody.append(ich.documentSizeElement(sizeInformation));
	}

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
	var tableBody = $("tbody");

	$("i", tableBody).removeClass("icon-caret-down").addClass("icon-caret-right");
	$("tr:not(#web-developer-total, .web-developer-section)", tableBody).slideUp(WebDeveloper.Generated.animationSpeed);

	event.preventDefault();
};

// Expands all sections
WebDeveloper.Generated.expandAllSections = function(event)
{
	var tableBody = $("tbody");

	$("i", tableBody).removeClass("icon-caret-right").addClass("icon-caret-down");
	$("tr:not(#web-developer-total, .web-developer-section)", tableBody).slideDown(WebDeveloper.Generated.animationSpeed);

	event.preventDefault();
};

// Toggles a section
WebDeveloper.Generated.toggleSection = function()
{
	var sectionHeader = $(this);

	$("i", sectionHeader).toggleClass("icon-caret-down").toggleClass("icon-caret-right");
	sectionHeader.nextUntil("#web-developer-total, .web-developer-section").slideToggle(WebDeveloper.Generated.animationSpeed);
};

// Initializes the page with data and locale
WebDeveloper.Generated.initialize = function(data, locale)
{
	var bytesLocale						= locale.bytes;
	var documentSize					= locale.documentSize;
	var filesLength						= 0;
	var kilobytesLocale				= locale.kilobytes;
	var sectionResults				= null;
	var tableBody							= null;
	var total									= {};
	var totalSize							= 0;
	var totalUncompressedSize = 0;

	WebDeveloper.Generated.emptyContent();
	WebDeveloper.Generated.localizeHeader(locale);
	WebDeveloper.Generated.setPageTitle(documentSize, data, locale);

	$("#content").append(ich.documentSizeTable(locale));

	tableBody			 = $("tbody");
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

	total.description = filesLength + " ";

	// If there is only one file
	if(filesLength == 1)
	{
		total.description += locale.file;
	}
	else
	{
		total.description += locale.files;
	}

	// If the size is set
	if(totalSize > 0)
	{
		total.size = WebDeveloper.Common.formatFileSize(totalSize, bytesLocale, kilobytesLocale);
	}

	// If the uncompressed size is set
	if(totalUncompressedSize > 0)
	{
		total.uncompressedSize = WebDeveloper.Common.formatFileSize(totalUncompressedSize, bytesLocale, kilobytesLocale);
	}

	tableBody.append(ich.documentSizeTotal(total));

	$("tr:not(#web-developer-total, .web-developer-section)", tableBody).hide();

	$(".web-developer-section").click(WebDeveloper.Generated.toggleSection);
	$("#web-developer-collapse-all").click(WebDeveloper.Generated.collapseAllSections);
	$("#web-developer-expand-all").click(WebDeveloper.Generated.expandAllSections);
};
