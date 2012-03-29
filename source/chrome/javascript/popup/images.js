var WebDeveloper = WebDeveloper || {};

WebDeveloper.Popup				= WebDeveloper.Popup || {};
WebDeveloper.Popup.Images = WebDeveloper.Popup.Images || {};

$(function()
{
	$("#display-alt-attributes").on("click", WebDeveloper.Popup.Images.displayAltAttributes);
	$("#display-image-dimensions").on("click", WebDeveloper.Popup.Images.displayImageDimensions);
	$("#display-image-paths").on("click", WebDeveloper.Popup.Images.displayImagePaths);
	$("#find-broken-images").on("click", WebDeveloper.Popup.Images.findBrokenImages);
	$("#hide-background-images").on("click", WebDeveloper.Popup.Images.hideBackgroundImages);
	$("#hide-images").on("click", WebDeveloper.Popup.Images.hideImages);
	$("#make-images-full-size").on("click", WebDeveloper.Popup.Images.makeImagesFullSize);
	$("#make-images-invisible").on("click", WebDeveloper.Popup.Images.makeImagesInvisible);
	$("#outline-all-images").on("click", WebDeveloper.Popup.Images.outlineAllImages);
	$("#outline-background-images").on("click", WebDeveloper.Popup.Images.outlineBackgroundImages);
	$("#outline-images-with-adjusted-dimensions").on("click", WebDeveloper.Popup.Images.outlineImagesWithAdjustedDimensions);
	$("#outline-images-with-empty-alt-attributes").on("click", WebDeveloper.Popup.Images.outlineImagesWithEmptyAltAttributes);
	$("#outline-images-with-oversized-dimensions").on("click", WebDeveloper.Popup.Images.outlineImagesWithOversizedDimensions);
	$("#outline-images-without-alt-attributes").on("click", WebDeveloper.Popup.Images.outlineImagesWithoutAltAttributes);
	$("#outline-images-without-dimensions").on("click", WebDeveloper.Popup.Images.outlineImagesWithoutDimensions);
	$("#reload-images").on("click", WebDeveloper.Popup.Images.reloadImages);
	$("#replace-images-with-alt-attributes").on("click", WebDeveloper.Popup.Images.replaceImagesWithAltAttributes);
	$("#view-image-information").on("click", WebDeveloper.Popup.Images.viewImageInformation);
});

// Adds a feature on a tab
WebDeveloper.Popup.Images.addFeatureOnTab = function(featureItem, tab, scriptCode)
{
	WebDeveloper.Popup.addFeatureOnTab(featureItem, tab, "features/javascript/images.js", scriptCode);
};

// Displays alt attributes for all images
WebDeveloper.Popup.Images.displayAltAttributes = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.displayAltAttributes(" + display + ", [document]);");
		}
	});
};

// Displays the dimensions for all images
WebDeveloper.Popup.Images.displayImageDimensions = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.displayImageDimensions(" + display + ", [document]);");
		}
	});
};

// Displays the paths for all images
WebDeveloper.Popup.Images.displayImagePaths = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.displayImagePaths(" + display + ", [document]);");
		}
	});
};

// Finds all the broken images on a page
WebDeveloper.Popup.Images.findBrokenImages = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			chrome.tabs.sendRequest(tab.id, {type: "get-broken-images"}, function(data)
			{
				var locale = WebDeveloper.Locales.setupGeneratedLocale();

				locale.brokenImage	= WebDeveloper.Locales.getString("brokenImage");
				locale.brokenImages	= WebDeveloper.Locales.getString("brokenImages");

				chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/find-broken-images.html"), tab.index, data, locale);

				WebDeveloper.Popup.close();
			});
		}
	});
};

// Hides all background images
WebDeveloper.Popup.Images.hideBackgroundImages = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.toggleBackgroundImages([document]);");
		}
	});
};

// Hides all images
WebDeveloper.Popup.Images.hideImages = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.toggleImages(" + disable + ", [document]);");
		}
	});
};

// Makes all images full size
WebDeveloper.Popup.Images.makeImagesFullSize = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Images.addFeatureOnTab(featureItem, tab, "WebDeveloper.Images.makeImagesFullSize([document]);");
		}
	});
};

// Makes all images invisible
WebDeveloper.Popup.Images.makeImagesInvisible = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature		= featureItem.attr("id");
			var invisible = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.makeImagesInvisible(" + invisible + ", [document]);");
		}
	});
};

// Outlines all images
WebDeveloper.Popup.Images.outlineAllImages = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.outlineAllImages([document]);");
		}
	});
};

// Outlines all background images
WebDeveloper.Popup.Images.outlineBackgroundImages = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var outline = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.outlineBackgroundImages(" + outline + ", [document]);");
		}
	});
};

// Outlines all images with adjusted dimensions
WebDeveloper.Popup.Images.outlineImagesWithAdjustedDimensions = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var outline = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.outlineImagesWithAdjustedDimensions(" + outline + ", [document]);");
		}
	});
};

// Outlines all images with empty alt attributes
WebDeveloper.Popup.Images.outlineImagesWithEmptyAltAttributes = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.outlineImagesWithEmptyAltAttributes([document]);");
		}
	});
};

// Outlines all images with oversized dimensions
WebDeveloper.Popup.Images.outlineImagesWithOversizedDimensions = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var outline = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.outlineImagesWithOversizedDimensions(" + outline + ", [document]);");
		}
	});
};

// Outlines all images without alt attributes
WebDeveloper.Popup.Images.outlineImagesWithoutAltAttributes = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.outlineImagesWithoutAltAttributes([document]);");
		}
	});
};

// Outlines all images without dimensions
WebDeveloper.Popup.Images.outlineImagesWithoutDimensions = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.outlineImagesWithoutDimensions([document]);");
		}
	});
};

// Reloads all the images on a page
WebDeveloper.Popup.Images.reloadImages = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Images.addFeatureOnTab(featureItem, tab, "WebDeveloper.Images.reloadImages([document]);");
		}
	});
};

// Replaces all images with alt attributes
WebDeveloper.Popup.Images.replaceImagesWithAltAttributes = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var replace = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Images.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Images.replaceImagesWithAltAttributes(" + replace + ", [document]);");
		}
	});
};

// Toggles a feature on a tab
WebDeveloper.Popup.Images.toggleFeatureOnTab = function(featureItem, tab, scriptCode)
{
	WebDeveloper.Popup.toggleFeatureOnTab(featureItem, tab, "features/javascript/images.js", scriptCode);
};

// Displays all the images
WebDeveloper.Popup.Images.viewImageInformation = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			chrome.tabs.sendRequest(tab.id, {type: "get-images"}, function(data)
			{
				var locale = WebDeveloper.Locales.setupGeneratedLocale();

				locale.alt			= WebDeveloper.Locales.getString("alt");
				locale.height		= WebDeveloper.Locales.getString("height");
				locale.image		= WebDeveloper.Locales.getString("image");
				locale.images		= WebDeveloper.Locales.getString("images");
				locale.property	= WebDeveloper.Locales.getString("property");
				locale.src			= WebDeveloper.Locales.getString("src");
				locale.value		= WebDeveloper.Locales.getString("value");
				locale.width		= WebDeveloper.Locales.getString("width");

				chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-image-information.html"), tab.index, data, locale);

				WebDeveloper.Popup.close();
			});
		}
	});
};
