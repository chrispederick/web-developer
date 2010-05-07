var animationSpeed = 100;

// Collapses all the output
function collapseAllOutput()
{
	$("h3").addClass("collapsed").next().slideUp(animationSpeed);
}

// Creates a table cell from data
function createTableCell(data)
{				
	// If the data is set
	if(data)
	{
		return "<td>" + data + "</td>";
	}

	return "<td></td>";
}

// Expands all the output
function expandAllOutput()
{
	$("h3").removeClass("collapsed").next().slideDown(animationSpeed);
}

// Formats a URL
function formatURL(url)
{
	// If the URL is set
	if(url)
	{
		var protocolIndex = url.indexOf("://");
		
		return url.substring(protocolIndex + 3);
	}

	return url;
}

// Outputs content
function output(content, title, url, jumpTitle, jumpLink)
{
	var pre = $("<pre></pre>");

	// If the URL is set
	if(url)
	{
		$("#content").append('<h3 id="' + jumpLink + '"><span></span><a href="' + url + '">' + title + "</a></h3>");
	}
	else
	{
		$("#content").append('<h3 id="' + jumpLink + '"><span></span>' + title + "</h3>");
	}
	
	$("#content").append(pre);
	pre.text(content);
	$("#content").append('<div class="separator"></div>');
	
	$("#jump-to ul").append('<li><a href="#' + jumpLink + '">' + jumpTitle + "</a></li>");
}

// Sets the page title
function setPageTitle(type, data)
{
	$("h1").html(type + " from " + data.pageTitle + ' <span><a href="' + data.pageURL + '">' + data.pageURL + "</a></span>");
}

// Sets the window title
function setWindowTitle(type, data)
{
	document.title = type + " from " + data.pageTitle + " - " + data.pageURL;
}

// Toggles the collapsed state of an output
function toggleOutput()
{
	$(this).parent().toggleClass("collapsed").next().slideToggle(animationSpeed);
}

// Initializes the common page elements
function initializeCommonElements()
{
	$("#header div").show();
	
	$("h3 span").click(toggleOutput);
	$("#collapse-all").click(collapseAllOutput);
	$("#expand-all").click(expandAllOutput);
}
