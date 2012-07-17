var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay			 = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Forms = WebDeveloper.Overlay.Forms || {};

// Clears all form fields
WebDeveloper.Overlay.Forms.clearFormFields = function()
{
	WebDeveloper.Forms.clearFormFields(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
};

// Clears all radio buttons
WebDeveloper.Overlay.Forms.clearRadioButtons = function()
{
	WebDeveloper.Forms.clearRadioButtons(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
};

// Converts the methods of all forms
WebDeveloper.Overlay.Forms.convertFormMethods = function(method)
{
	WebDeveloper.Forms.convertFormMethods(method, WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
};

// Converts select elements to text inputs
WebDeveloper.Overlay.Forms.convertSelectElementsToTextInputs = function()
{
	WebDeveloper.Forms.convertSelectElementsToTextInputs(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
};

// Converts text inputs to textareas
WebDeveloper.Overlay.Forms.convertTextInputsToTextareas = function()
{
	WebDeveloper.Forms.convertTextInputsToTextareas(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
};

// Displays the details about all forms
WebDeveloper.Overlay.Forms.displayFormDetails = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Forms.displayFormDetails(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays all passwords
WebDeveloper.Overlay.Forms.displayPasswords = function()
{
	WebDeveloper.Forms.displayPasswords(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
};

// Enables auto completion on all elements
WebDeveloper.Overlay.Forms.enableAutoCompletion = function()
{
	WebDeveloper.Forms.enableAutoCompletion(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
};

// Enables the form elements
WebDeveloper.Overlay.Forms.enableFormElements = function()
{
	WebDeveloper.Forms.enableFormElements(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
};

// Enables all form fields
WebDeveloper.Overlay.Forms.enableFormFields = function()
{
	WebDeveloper.Forms.enableFormFields(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
};

// Expands all select elements
WebDeveloper.Overlay.Forms.expandSelectElements = function()
{
	WebDeveloper.Forms.expandSelectElements(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
};

// Makes all form fields writable
WebDeveloper.Overlay.Forms.makeFormFieldsWritable = function()
{
	WebDeveloper.Forms.makeFormFieldsWritable(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
};

// Outlines all form fields without labels
WebDeveloper.Overlay.Forms.outlineFormFieldsWithoutLabels = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Forms.outlineFormFieldsWithoutLabels(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Populates all form fields
WebDeveloper.Overlay.Forms.populateFormFields = function()
{
	WebDeveloper.Forms.populateFormFields(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()), WebDeveloper.Preferences.getExtensionStringPreference("populate.email.address"), WebDeveloper.Locales.getString("password").toLowerCase());
};

// Removes maximum lengths from all elements
WebDeveloper.Overlay.Forms.removeMaximumLengths = function()
{
	WebDeveloper.Forms.removeMaximumLengths(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
};

// Toggles all the checkboxes on the page
WebDeveloper.Overlay.Forms.toggleCheckboxes = function(check)
{
	WebDeveloper.Forms.toggleCheckboxes(check, WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
};

// Updates the forms menu
WebDeveloper.Overlay.Forms.updateFormsMenu = function()
{
	WebDeveloper.Overlay.configureFeatureElement("web-developer-display-form-details-command", "checked");
	WebDeveloper.Overlay.configureFeatureElement("web-developer-outline-form-fields-without-labels-command", "checked");
};

// Displays information about all forms
WebDeveloper.Overlay.Forms.viewFormInformation = function()
{
	WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-form-information.html"), WebDeveloper.Content.getForms(), WebDeveloper.Overlay.Forms.getViewFormInformationLocale());
};
