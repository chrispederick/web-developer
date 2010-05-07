// Initializes the page with data
function initialize(data)
{
	var container						 = null;
	var contentDocument			 = null;
	var documents						 = data.documents;
	var heading							 = null;
	var headingDescription	 = null;
	var headingLevel         = null;
	var headings						 = null;
	var headingsLength			 = null;
	var previousHeadingLevel = null;
	var url									 = null;

	setPageTitle("Document Outline", data);
	setWindowTitle("Document Outline", data);
	
	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument		 = documents[i];
		headingDescription = "headings";
		headings					 = contentDocument.headings;
		headingsLength		 = headings.length;
		url								 = contentDocument.url;
		
		// If there is only one heading
		if(headingsLength == 1)
		{
			headingDescription = "heading";
		}

		$("#content").append('<h2><span></span><a href="' + url + '">' + url + "</a></h2>");
		$("#content").append('<h3 id="outline-' + (i + 1) + '"><span></span>' + headingsLength + " " + headingDescription + "</h3>");
		$("#content").append(container);
		$("#jump-to ul").append('<li id="outline-' + (i + 1) + '"><a href="#outline-' + (i + 1) + '">' + formatURL(url) + "</a></li>");	

		// If there are headings
		if(headingsLength > 0)
		{
			container						 = $("<div></div>");
      previousHeadingLevel = 0;

			$("#content").append(container);

			// Loop through the headings
			for(var j = 0; j < headingsLength; j++)
			{
				heading			 = headings[j];
				headingLevel = heading.level;

        // Loop through any missing headers
        for(var k = previousHeadingLevel + 1; k < headingLevel; k++)
        {
					container.append('<h4 class="level-' + k + ' missing-heading"><span>&lt;h' + k + "&gt;</span>[Missing heading]</h4>");
        }
			
				container.append('<h4 class="level-' + headingLevel + '"><span>&lt;h' + headingLevel + "&gt;</span>" + heading.text + "</h4>");

        previousHeadingLevel = headingLevel;
			}

			container.append('<div class="separator"></div>');
		}
		else
		{
			$("#content").append('<div class="separator"></div>');
		}
	}
	
	initializeCommonElements();
}
