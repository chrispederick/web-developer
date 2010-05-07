var WebDeveloper = WebDeveloper || {};

WebDeveloper.Platform = WebDeveloper.Platform || {};

// Returns true if the platform is Windows
WebDeveloper.Platform.isWindows = function()
{
	// If the platform contains 'win'
	if(navigator.platform.toLowerCase().indexOf("win") != -1)
	{
		return true;
	}
	
	return false;
};