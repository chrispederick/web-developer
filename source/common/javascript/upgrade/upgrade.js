var WebDeveloper = WebDeveloper || {};

WebDeveloper.Upgrade = WebDeveloper.Upgrade || {};

// Formats the version as a number
WebDeveloper.Upgrade.formatVersionNumber = function(versionString)
{
	var betaVersion				= versionString.indexOf("b");
	var firstDecimalPlace = versionString.indexOf(".");
	var versionNumber			= versionString.substring(0, firstDecimalPlace) + ".";

	// If this is not a beta version
	if(betaVersion == -1)
	{
		versionNumber += versionString.substring(firstDecimalPlace + 1);
	}
	else
	{
		versionNumber += versionString.substring(firstDecimalPlace + 1, betaVersion);
	}

	return parseFloat(versionNumber, 10) + "";
};
