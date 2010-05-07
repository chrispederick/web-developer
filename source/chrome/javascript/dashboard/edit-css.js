WebDeveloper.Dashboard = WebDeveloper.Dashboard || {};

WebDeveloper.Dashboard.editCSSUpdateFrequency = 1000;

// Adds an edit CSS tab
WebDeveloper.Dashboard.addEditCSSTab = function(title, css, position, dashboardDocument)
{
	var panels   = dashboardDocument.querySelector("#web-developer-edit-css-panels");
	var selected = "";
	var tabs     = dashboardDocument.querySelector("#web-developer-edit-css-tabs");

	// If this is the first tab
	if(position == 1)
	{
		selected = " selected";
	}

	panels.innerHTML = panels.innerHTML + '<textarea id="web-developer-edit-css-panel-' + position + '" class="panel' + selected + '">' + css + '</textarea>';
	tabs.innerHTML   = tabs.innerHTML + '<li id="web-developer-edit-css-tab-' + position + '" class="tab' + selected + '">' + title + '</li>';
};

// Applies the edit CSS
WebDeveloper.Dashboard.applyEditCSS = function(dashboardDocument, contentDocument)
{
	var editStyles = contentDocument.querySelector("#web-developer-edit-css-styles");

	// If the edit styles element exists
	if(editStyles)
	{
		var styles    = "";
		var textAreas = dashboardDocument.querySelectorAll("#web-developer-edit-css-panel textarea");
		
		// Loop through the text areas
		for(var i = 0, l = textAreas.length; i < l; i++)
		{
			styles += textAreas[i].value;
		}
		
		contentDocument.querySelector("#web-developer-edit-css-styles").innerText = styles;
	}
};

// Edits the CSS of the page
WebDeveloper.Dashboard.editCSS = function(edit, contentDocument)
{
	var title = "Edit CSS";

	// If editing the CSS
	if(edit)
	{
		var documentCSS			  = WebDeveloper.Content.getDocumentCSS(contentDocument);
		var dashboardDocument = WebDeveloper.Dashboard.openDashboardTab(title, contentDocument);
		var tabId             = WebDeveloper.Dashboard.convertTitleToId(title);
				
		dashboardDocument.querySelector("#" + tabId + "-panel").innerHTML = '<ul id="web-developer-edit-css-tabs" class="tab-bar bottom-tabs"></ul><div id="web-developer-edit-css-panels"></div>';

		chrome.extension.sendRequest({type: "get-content-from-urls", urls: documentCSS.styleSheets}, function(response) 
		{
			var position   = 1;
			var styleSheet = null;

			// Loop through the style sheets
			for(var i = 0, l = response.length; i < l; i++)
			{
				styleSheet = response[i];
			
				WebDeveloper.Dashboard.addEditCSSTab(WebDeveloper.Dashboard.formatURL(styleSheet.url), styleSheet.content, position, dashboardDocument);
				
				position++;
			}
			
			// If there are embedded styles
			if(documentCSS.embedded)
			{
				WebDeveloper.Dashboard.addEditCSSTab("Embedded styles", documentCSS.embedded, position, dashboardDocument);
			}
			
			WebDeveloper.CSS.toggleAllStyleSheets(true, contentDocument);

			styleSheet = contentDocument.createElement("style");
			
			styleSheet.setAttribute("id", "web-developer-edit-css-styles");
			WebDeveloper.Common.getDocumentHeadElement(contentDocument).appendChild(styleSheet);
			
			WebDeveloper.Dashboard.applyEditCSS(dashboardDocument, contentDocument);
			dashboardDocument.querySelector("#web-developer-edit-css-tabs").addEventListener("click", WebDeveloper.Dashboard.tabBarClicked, false);

			window.WebDeveloper.editCSSInterval = window.setInterval(function() { WebDeveloper.Dashboard.applyEditCSS(dashboardDocument, contentDocument); }, WebDeveloper.Dashboard.editCSSUpdateFrequency);
		});
	}
	else
	{			
    window.clearInterval(window.WebDeveloper.editCSSInterval);
    WebDeveloper.Common.removeMatchingElements("#web-developer-edit-css-styles", contentDocument);
		WebDeveloper.CSS.toggleAllStyleSheets(false, contentDocument);
		WebDeveloper.Dashboard.closeDashboardTab(title, contentDocument);
	}
};
