var WebDeveloper = WebDeveloper || {};

WebDeveloper.Dialog = WebDeveloper.Dialog || {};

// Adds a preference
WebDeveloper.Dialog.addPreference = function(id, name, type, preferences)
{
	var preference = document.createElement("preference");

	preference.setAttribute("id", id);
	preference.setAttribute("name", name);
	preference.setAttribute("type", type);

	preferences.appendChild(preference);
};
