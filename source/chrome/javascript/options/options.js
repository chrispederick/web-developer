var WebDeveloper = WebDeveloper || {};

WebDeveloper.Options = WebDeveloper.Options || {};

$(function() 
{ 
	WebDeveloper.Options.load();

	$("a").attr("target", "_blank");
	$("#cancel").click(WebDeveloper.Options.cancel);
	$("#save").click(WebDeveloper.Options.save);
});

// Handles the options being cancelled
WebDeveloper.Options.cancel = function()
{
	window.close();
};

// Loads the options
WebDeveloper.Options.load = function()
{
	// If analytics are not disabled
	if(!window.localStorage.getItem("disable-analytics"))
	{
		$("#analytics").get(0).checked = true; 
	}
};

// Handles the options being saved
WebDeveloper.Options.save = function()
{
	var notification = $("#notification");

	notification.hide();

	// If analytics are not disabled
	if($("#analytics").get(0).checked)
	{
		window.localStorage.removeItem("disable-analytics");
	}
	else
	{
		window.localStorage.setItem("disable-analytics", true);
	}
	
	notification.fadeIn(500);
};
