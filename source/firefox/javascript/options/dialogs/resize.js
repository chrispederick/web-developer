var WebDeveloper = WebDeveloper || {};

WebDeveloper.Resize = WebDeveloper.Resize || {};

// Handles the resize dialog being accepted
WebDeveloper.Resize.accept = function()
{
	// If adding the resize option
	if(window.arguments[0][0] == "add")
	{
		WebDeveloper.Preferences.setExtensionIntegerPreference("resize.count", window.arguments[0][1] + 1);
	}
};

// Initializes the resize dialog
WebDeveloper.Resize.initialize = function()
{
	var position		= window.arguments[0][1] + 1;
	var preferences = document.getElementById("web-developer-resize-preferences");

	WebDeveloper.Dialog.addPreference("webdeveloper.resize.description", "extensions.webdeveloper.resize." + position + ".description", "wstring", preferences);
	WebDeveloper.Dialog.addPreference("webdeveloper.resize.height", "extensions.webdeveloper.resize." + position + ".height", "int", preferences);
	WebDeveloper.Dialog.addPreference("webdeveloper.resize.key", "extensions.webdeveloper.resize." + position + ".key", "wstring", preferences);
	WebDeveloper.Dialog.addPreference("webdeveloper.resize.modifiers", "extensions.webdeveloper.resize." + position + ".modifiers", "unichar", preferences);
	WebDeveloper.Dialog.addPreference("webdeveloper.resize.viewport", "extensions.webdeveloper.resize." + position + ".viewport", "bool", preferences);
	WebDeveloper.Dialog.addPreference("webdeveloper.resize.width", "extensions.webdeveloper.resize." + position + ".width", "int", preferences);

	document.getElementById("web-developer-resize-alt-shift").setAttribute("label", WebDeveloper.Locales.getString("VK_ALT", "web-developer-platform-keys") + WebDeveloper.Locales.getString("MODIFIER_SEPARATOR", "web-developer-platform-keys") + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys"));
	document.getElementById("web-developer-resize-control-shift").setAttribute("label", WebDeveloper.Locales.getString("VK_CONTROL", "web-developer-platform-keys") + WebDeveloper.Locales.getString("MODIFIER_SEPARATOR", "web-developer-platform-keys") + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys"));
	document.getElementById("web-developer-resize-meta-shift").setAttribute("label", WebDeveloper.Locales.getString("VK_META", "web-developer-platform-keys") + WebDeveloper.Locales.getString("MODIFIER_SEPARATOR", "web-developer-platform-keys") + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys"));
};
