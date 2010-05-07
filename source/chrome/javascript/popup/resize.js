WebDeveloper.Popup.Resize = {};

$(function() 
{ 
	$("#display-window-size").click(WebDeveloper.Popup.Resize.displayWindowSize);
	$("#resize-window").click(WebDeveloper.Popup.Resize.resizeWindow);
	
	$(".custom-resize-window").click(WebDeveloper.Popup.Resize.customResizeWindow);

	$("#resize-window-cancel").click(WebDeveloper.Popup.Resize.cancelResizeWindow);
	$("#resize-window-height, #resize-window-width").keypress(WebDeveloper.Popup.Resize.resizeWindowKeyPress);	 
	$("#resize-window-submit").click(WebDeveloper.Popup.Resize.submitResizeWindow);
});
	
// Cancels resizing the window
WebDeveloper.Popup.Resize.cancelResizeWindow = function()
{
	$("#toolbar, #resize-menu").show();
	$("#resize-window-dialog").hide();
};
	
// Resizes the window to a custom size
WebDeveloper.Popup.Resize.customResizeWindow = function()
{
	var featureItem = $(this);
	var size				= featureItem.attr("id").replace(/resize-/, "").split("x");

	WebDeveloper.Popup.getSelectedWindow(function(selectedWindow)
	{
		chrome.windows.update(selectedWindow.id, {height: parseInt(size[1], 10), width: parseInt(size[0], 10)}, function()
		{
			WebDeveloper.Analytics.trackFeature(featureItem);
			WebDeveloper.Popup.close();
		});
	});
};
	
// Displays the window size
WebDeveloper.Popup.Resize.displayWindowSize = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		chrome.tabs.sendRequest(tab.id, {type: "get-window-size"}, function(response) 
		{
			var viewportSize = "<tr><th>Viewport</th><td>Width: " + response.innerWidth + "px</td><td>Height: " + response.innerHeight + "px</td></tr>";
			var windowSize	 = "<tr><th>Window</th><td>Width: " + response.outerWidth + "px</td><td>Height: " + response.outerHeight + "px</td></tr>";
		 
			WebDeveloper.Popup.showComplexNotification("<table>" + windowSize + viewportSize + "</table>");

			WebDeveloper.Analytics.trackFeature(featureItem);
		});
	});
};
	
// Resizes the window
WebDeveloper.Popup.Resize.resizeWindow = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		chrome.tabs.sendRequest(tab.id, {type: "get-window-size"}, function(response) 
		{
			$("#resize-window-height").val(response.outerHeight);
			$("#resize-window-width").val(response.outerWidth);

			$("#toolbar, .menu, #notification").hide();
			$("#resize-window-dialog").show();

			WebDeveloper.Analytics.trackFeature(featureItem);
		});
	});
};

// Handles a key press when resizing a window	
WebDeveloper.Popup.Resize.resizeWindowKeyPress = function(event)
{
	// If the enter key was pressed
	if(event.keyCode == 13) 
	{	 
		WebDeveloper.Popup.Resize.submitResizeWindow();	 
	} 
};
	
// Resizes the window
WebDeveloper.Popup.Resize.submitResizeWindow = function()
{
	var resizeHeight = parseInt($("#resize-window-height").val(), 10);
	var resizeWidth	= parseInt($("#resize-window-width").val(), 10);

	WebDeveloper.Popup.getSelectedWindow(function(selectedWindow)
	{
		chrome.windows.update(selectedWindow.id, {height: resizeHeight, width: resizeWidth}, function()
		{
			WebDeveloper.Popup.Resize.cancelResizeWindow();
			WebDeveloper.Popup.Resize.displayWindowSize();
		});
	});
};
