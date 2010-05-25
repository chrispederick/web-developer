WebDeveloper.Popup.Tools = {};

$(function() 
{ 
	$("#validate-css").click(WebDeveloper.Popup.Tools.validateCSS);
	$("#validate-feed").click(WebDeveloper.Popup.Tools.validateFeed);
	$("#validate-html").click(WebDeveloper.Popup.Tools.validateHTML);
	$("#validate-links").click(WebDeveloper.Popup.Tools.validateLinks);
	$("#validate-local-css").click(WebDeveloper.Popup.Tools.validateLocalCSS);
	$("#validate-local-html").click(WebDeveloper.Popup.Tools.validateLocalHTML);
	$("#validate-section-508").click(WebDeveloper.Popup.Tools.validateSection508);
	$("#validate-wcag").click(WebDeveloper.Popup.Tools.validateWCAG);
	$("#view-source").click(WebDeveloper.Popup.Tools.viewSource);
});
	
// Validates the CSS of the page
WebDeveloper.Popup.Tools.validateCSS = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.openTab("http://jigsaw.w3.org/css-validator/validator?profile=css3&warning=2&uri=" + tab.url, featureItem);
	});
};
	
// Validates the feeds of the page
WebDeveloper.Popup.Tools.validateFeed = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.openTab("http://validator.w3.org/feed/check.cgi?url=" + tab.url, featureItem);
	});
};
	
// Validates the HTML of the page
WebDeveloper.Popup.Tools.validateHTML = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.openTab("http://validator.w3.org/check?verbose=1&uri=" + tab.url, featureItem);
	});
};
	
// Validates the links of the page
WebDeveloper.Popup.Tools.validateLinks = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.openTab("http://validator.w3.org/checklink?summary=on&uri=" + tab.url, featureItem);
	});
};
	
// Validates the CSS of the local page
WebDeveloper.Popup.Tools.validateLocalCSS = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
		  chrome.tabs.sendRequest(tab.id, {type: "validate-local-css"}, function(response) 
		  {
				WebDeveloper.Analytics.trackFeature(featureItem);
				WebDeveloper.Popup.close();
		  });
		}
	});
};
	
// Validates the HTML of the local page
WebDeveloper.Popup.Tools.validateLocalHTML = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
		  chrome.tabs.sendRequest(tab.id, {type: "validate-local-html"}, function(response) 
		  {
				WebDeveloper.Analytics.trackFeature(featureItem);
				WebDeveloper.Popup.close();
		  });
		}
	});
};
	
// Validates the page against the Section 508 accessibility guidelines
WebDeveloper.Popup.Tools.validateSection508 = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.openTab("http://cynthiasays.com/mynewtester/cynthia.exe?rptmode=2&runcr=1&url1=" + tab.url, featureItem);
	});
};
	
// Validates the page against the WCAG accessibility guidelines
WebDeveloper.Popup.Tools.validateWCAG = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.openTab("http://cynthiasays.com/mynewtester/cynthia.exe?rptmode=-1&runcr=1&url1=" + tab.url, featureItem);
	});
};
	
// Displays the source of the page
WebDeveloper.Popup.Tools.viewSource = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.openTab("view-source:" + tab.url, featureItem);
	});
};
