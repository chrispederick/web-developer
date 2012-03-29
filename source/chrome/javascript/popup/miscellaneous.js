var WebDeveloper = WebDeveloper || {};

WebDeveloper.Popup							 = WebDeveloper.Popup || {};
WebDeveloper.Popup.Miscellaneous = WebDeveloper.Popup.Miscellaneous || {};

$(function()
{
	$("#clear-history").on("click", WebDeveloper.Popup.Miscellaneous.confirmClearHistory);
	$("#display-color-picker").on("click", WebDeveloper.Popup.Miscellaneous.displayColorPicker);
	$("#display-hidden-elements").on("click", WebDeveloper.Popup.Miscellaneous.displayHiddenElements);
	$("#display-ruler").on("click", WebDeveloper.Popup.Miscellaneous.displayRuler);
	$("#linearize-page").on("click", WebDeveloper.Popup.Miscellaneous.linearizePage);
	$("#make-frames-resizable").on("click", WebDeveloper.Popup.Miscellaneous.makeFramesResizable);
	$("#mark-all-links-unvisited").on("click", function() { WebDeveloper.Popup.Miscellaneous.toggleVisitedLinks(false); });
	$("#mark-all-links-visited").on("click", function() { WebDeveloper.Popup.Miscellaneous.toggleVisitedLinks(true); });
});

// Adds a feature on a tab
WebDeveloper.Popup.Miscellaneous.addFeatureOnTab = function(featureItem, tab, scriptCode)
{
	WebDeveloper.Popup.addFeatureOnTab(featureItem, tab, "features/javascript/miscellaneous.js", scriptCode);
};

// Adds an href to the history
WebDeveloper.Popup.Miscellaneous.addToHistory = function(href)
{
	chrome.history.addUrl({url: href});
};

// Clears the history
WebDeveloper.Popup.Miscellaneous.clearHistory = function()
{
	WebDeveloper.Popup.closeConfirmation();

	chrome.history.deleteAll(function()
	{
		WebDeveloper.Popup.displayNotification(WebDeveloper.Locales.getString("clearHistoryResult"));
	});
};

// Asks to confirm to clear the history
WebDeveloper.Popup.Miscellaneous.confirmClearHistory = function()
{
	WebDeveloper.Popup.displayConfirmation(WebDeveloper.Locales.getString("clearHistoryConfirmation"), WebDeveloper.Locales.getString("clear"), WebDeveloper.Popup.Miscellaneous.clearHistory);
};

// Displays a color picker
WebDeveloper.Popup.Miscellaneous.displayColorPicker = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.toggleFeatureOnTab(featureItem, tab, "toolbar/javascript/color-picker.js", "WebDeveloper.ColorPicker.displayColorPicker(" + display + ", document);");

			WebDeveloper.Popup.close();
		}
	});
};

// Displays all hidden elements
WebDeveloper.Popup.Miscellaneous.displayHiddenElements = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Miscellaneous.addFeatureOnTab(featureItem, tab, "WebDeveloper.Miscellaneous.displayHiddenElements([document]);");
		}
	});
};

// Displays a ruler
WebDeveloper.Popup.Miscellaneous.displayRuler = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.toggleFeatureOnTab(featureItem, tab, "toolbar/javascript/ruler.js", "WebDeveloper.Ruler.displayRuler(" + display + ", document);");

			WebDeveloper.Popup.close();
		}
	});
};

// Linearizes a page
WebDeveloper.Popup.Miscellaneous.linearizePage = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Miscellaneous.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Miscellaneous.linearizePage([document]);");
		}
	});
};

// Makes all frames resizable
WebDeveloper.Popup.Miscellaneous.makeFramesResizable = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Miscellaneous.addFeatureOnTab(featureItem, tab, "WebDeveloper.Miscellaneous.makeFramesResizable([document]);");
		}
	});
};

// Removes an href from the history
WebDeveloper.Popup.Miscellaneous.removeFromHistory = function(href)
{
	chrome.history.deleteUrl({url: href});
};

// Toggles a feature on a tab
WebDeveloper.Popup.Miscellaneous.toggleFeatureOnTab = function(featureItem, tab, scriptCode)
{
	WebDeveloper.Popup.toggleFeatureOnTab(featureItem, tab, "features/javascript/miscellaneous.js", scriptCode);
};

// Toggles all links on the page between visited and unvisited
WebDeveloper.Popup.Miscellaneous.toggleVisitedLinks = function(visited)
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			chrome.tabs.sendRequest(tab.id, {type: "get-links"}, function(data)
			{
				var documents = data.documents;
				var links			= null;

				// Loop through the documents
				for(var i = 0, l = documents.length; i < l; i++)
				{
					links = documents[i].links;

					// Loop through all the links
					for(var j = 0, m = links.length; j < m; j++)
					{
						// If marking links as visited
						if(visited)
						{
							WebDeveloper.Popup.Miscellaneous.addToHistory(links[j]);
						}
						else
						{
							WebDeveloper.Popup.Miscellaneous.removeFromHistory(links[j]);
						}
					}
				}
			});
		}
	});
};
