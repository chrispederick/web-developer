var WebDeveloper = WebDeveloper || {};

WebDeveloper.Tool = WebDeveloper.Tool || {};

// Handles the tool dialog being accepted
WebDeveloper.Tool.accept = function()
{
	// If adding the tool
	if(window.arguments[0][0] == "add")
	{
		WebDeveloper.Preferences.setExtensionIntegerPreference("tool.count", window.arguments[0][1] + 1);
	}
};

// Changes the tool type
WebDeveloper.Tool.changeType = function()
{
	var application = document.getElementById("web-developer-tool-application-radio").selected;
	var path				= document.getElementById("web-developer-tool-path");
	var url					= document.getElementById("web-developer-tool-url");

	path.disabled																											 = !application;
	document.getElementById("web-developer-tool-path-choose").disabled = !application;
	url.disabled																											 = application;

	// If the application radio button is selected
	if(application)
	{
		url.value = "";
	}
	else
	{
		path.value = "";
	}
};

// Open a dialog to choose an application
WebDeveloper.Tool.chooseApplication = function()
{
	var filePicker = Components.classes["@mozilla.org/filepicker;1"].createInstance(Components.interfaces.nsIFilePicker);

	filePicker.init(window, WebDeveloper.Locales.getString("chooseApplication"), filePicker.modeGetFolder);

	// If the user selected an application
	if(filePicker.show() == filePicker.returnOK)
	{
		var applicationPath = filePicker.file.path;
		var executable			= Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);

		executable.initWithPath(applicationPath);

		// If the executable exists and is executable
		if(executable.exists() && executable.isExecutable())
		{
			var toolPath = document.getElementById("web-developer-tool-path");

			toolPath.value = applicationPath;

			document.getElementById("web-developer-tool-dialog-pane").userChangedValue(toolPath);
		}
		else
		{
			WebDeveloper.Common.displayError(WebDeveloper.Locales.getString("chooseApplication"), WebDeveloper.Locales.getFormattedString("invalidApplication", [applicationPath]));
		}
	}
};

// Initializes the tool dialog
WebDeveloper.Tool.initialize = function()
{
	var position		= window.arguments[0][1] + 1;
	var preferences = document.getElementById("web-developer-tool-preferences");

	WebDeveloper.Dialog.addPreference("webdeveloper.tool.description", "extensions.webdeveloper.tool." + position + ".description", "wstring", preferences);
	WebDeveloper.Dialog.addPreference("webdeveloper.tool.key", "extensions.webdeveloper.tool." + position + ".key", "wstring", preferences);
	WebDeveloper.Dialog.addPreference("webdeveloper.tool.modifiers", "extensions.webdeveloper.tool." + position + ".modifiers", "unichar", preferences);
	WebDeveloper.Dialog.addPreference("webdeveloper.tool.path", "extensions.webdeveloper.tool." + position + ".path", "unichar", preferences);
	WebDeveloper.Dialog.addPreference("webdeveloper.tool.url", "extensions.webdeveloper.tool." + position + ".url", "unichar", preferences);

	// If editing a tool and it has a URL
	if(window.arguments[0][0] == "edit" && WebDeveloper.Preferences.getExtensionStringPreference("tool." + position + ".url"))
	{
		document.getElementById("web-developer-tool-url-radio").radioGroup.selectedIndex = 1;

		WebDeveloper.Tool.changeType();
	}

	document.getElementById("web-developer-tool-alt-shift").setAttribute("label", WebDeveloper.Locales.getString("VK_ALT", "web-developer-platform-keys") + WebDeveloper.Locales.getString("MODIFIER_SEPARATOR", "web-developer-platform-keys") + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys"));
	document.getElementById("web-developer-tool-control-shift").setAttribute("label", WebDeveloper.Locales.getString("VK_CONTROL", "web-developer-platform-keys") + WebDeveloper.Locales.getString("MODIFIER_SEPARATOR", "web-developer-platform-keys") + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys"));
	document.getElementById("web-developer-tool-meta-shift").setAttribute("label", WebDeveloper.Locales.getString("VK_META", "web-developer-platform-keys") + WebDeveloper.Locales.getString("MODIFIER_SEPARATOR", "web-developer-platform-keys") + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys"));
};
