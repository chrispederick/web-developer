var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Overlay       = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Forms = WebDeveloper.Overlay.Forms || {};

// Adds a feature on a tab
WebDeveloper.Overlay.Forms.addFeatureOnTab = function(featureItem, tab, scriptCode, args)
{
  WebDeveloper.Overlay.addFeatureOnTab(featureItem, tab, "/features/javascript/forms.js", scriptCode, args);
};

// Checks all checkboxes
WebDeveloper.Overlay.Forms.checkAllCheckboxes = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, function() { WebDeveloper.Forms.toggleCheckboxes(true, [document]); });
    }
  });
};

// Clears all form fields
WebDeveloper.Overlay.Forms.clearFormFields = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, function() { WebDeveloper.Forms.clearFormFields([document]); });
    }
  });
};

// Clears all radio buttons
WebDeveloper.Overlay.Forms.clearRadioButtons = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, function() { WebDeveloper.Forms.clearRadioButtons([document]); });
    }
  });
};

// Converts the methods of all forms
WebDeveloper.Overlay.Forms.convertFormMethods = function(method)
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, function(formMethod) { WebDeveloper.Forms.convertFormMethods(formMethod, [document]); }, [method]);
    }
  });
};

// Converts select elements to text inputs
WebDeveloper.Overlay.Forms.convertSelectElementsToTextInputs = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, function() { WebDeveloper.Forms.convertSelectElementsToTextInputs([document]); });
    }
  });
};

// Converts text inputs to textareas
WebDeveloper.Overlay.Forms.convertTextInputsToTextareas = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, function() { WebDeveloper.Forms.convertTextInputsToTextareas([document]); });
    }
  });
};

// Displays the details about all forms
WebDeveloper.Overlay.Forms.displayFormDetails = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Forms.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Forms.displayFormDetails(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Displays all passwords
WebDeveloper.Overlay.Forms.displayPasswords = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, function() { WebDeveloper.Forms.displayPasswords([document]); });
    }
  });
};

// Enables auto completion on all elements
WebDeveloper.Overlay.Forms.enableAutoCompletion = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, function() { WebDeveloper.Forms.enableAutoCompletion([document]); });
    }
  });
};

// Enables all form fields
WebDeveloper.Overlay.Forms.enableFormFields = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, function() { WebDeveloper.Forms.enableFormFields([document]); });
    }
  });
};

// Expands all select elements
WebDeveloper.Overlay.Forms.expandSelectElements = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, function() { WebDeveloper.Forms.expandSelectElements([document]); });
    }
  });
};

// Returns the locale for the view form information feature
WebDeveloper.Overlay.Forms.getViewFormInformationLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.action        = WebDeveloper.Locales.getString("action");
  locale.elements      = WebDeveloper.Locales.getString("elements");
  locale.form          = WebDeveloper.Locales.getString("form");
  locale.forms         = WebDeveloper.Locales.getString("forms");
  locale.id            = WebDeveloper.Locales.getString("id");
  locale.label         = WebDeveloper.Locales.getString("label");
  locale.maximumLength = WebDeveloper.Locales.getString("maximumLength");
  locale.method        = WebDeveloper.Locales.getString("method");
  locale.name          = WebDeveloper.Locales.getString("name");
  locale.size          = WebDeveloper.Locales.getString("size");
  locale.type          = WebDeveloper.Locales.getString("type");
  locale.value         = WebDeveloper.Locales.getString("value");

  return locale;
};

// Initializes the forms overlay
WebDeveloper.Overlay.Forms.initialize = function()
{
  var checkAllCheckboxesMenu                = document.getElementById("check-all-checkboxes");
  var clearFormFieldsMenu                   = document.getElementById("clear-form-fields");
  var clearRadioButtonsMenu                 = document.getElementById("clear-radio-buttons");
  var convertFormGetsToPostsMenu            = document.getElementById("convert-form-gets-to-posts");
  var convertFormPostsToGetsMenu            = document.getElementById("convert-form-posts-to-gets");
  var convertSelectElementsToTextInputsMenu = document.getElementById("convert-select-elements-to-text-inputs");
  var convertTextInputsToTextareasMenu      = document.getElementById("convert-text-inputs-to-textareas");
  var displayFormDetailsMenu                = document.getElementById("display-form-details");
  var displayPasswordsMenu                  = document.getElementById("display-passwords");
  var enableAutoCompletionMenu              = document.getElementById("enable-auto-completion");
  var enableFormFieldsMenu                  = document.getElementById("enable-form-fields");
  var expandSelectElementsMenu              = document.getElementById("expand-select-elements");
  var makeFormFieldsWritableMenu            = document.getElementById("make-form-fields-writable");
  var outlineFormFieldsWithoutLabelsMenu    = document.getElementById("outline-form-fields-without-labels");
  var populateFormFieldsMenu                = document.getElementById("populate-form-fields");
  var removeFormValidationMenu              = document.getElementById("remove-form-validation");
  var removeMaximumLengthsMenu              = document.getElementById("remove-maximum-lengths");
  var uncheckAllCheckboxesMenu              = document.getElementById("uncheck-all-checkboxes");
  var viewFormInformationMenu               = document.getElementById("view-form-information");

  checkAllCheckboxesMenu.append(WebDeveloper.Locales.getString("checkAllCheckboxes"));
  clearFormFieldsMenu.append(WebDeveloper.Locales.getString("clearFormFields"));
  clearRadioButtonsMenu.append(WebDeveloper.Locales.getString("clearRadioButtons"));
  convertFormGetsToPostsMenu.append(WebDeveloper.Locales.getString("convertFormGetsToPosts"));
  convertFormPostsToGetsMenu.append(WebDeveloper.Locales.getString("convertFormPostsToGets"));
  convertSelectElementsToTextInputsMenu.append(WebDeveloper.Locales.getString("convertSelectElementsToTextInputs"));
  convertTextInputsToTextareasMenu.append(WebDeveloper.Locales.getString("convertTextInputsToTextareas"));
  displayFormDetailsMenu.append(WebDeveloper.Locales.getString("displayFormDetails"));
  displayPasswordsMenu.append(WebDeveloper.Locales.getString("displayPasswords"));
  enableAutoCompletionMenu.append(WebDeveloper.Locales.getString("enableAutoCompletion"));
  enableFormFieldsMenu.append(WebDeveloper.Locales.getString("enableFormFields"));
  expandSelectElementsMenu.append(WebDeveloper.Locales.getString("expandSelectElements"));
  makeFormFieldsWritableMenu.append(WebDeveloper.Locales.getString("makeFormFieldsWritable"));
  outlineFormFieldsWithoutLabelsMenu.append(WebDeveloper.Locales.getString("outlineFormFieldsWithoutLabels"));
  populateFormFieldsMenu.append(WebDeveloper.Locales.getString("populateFormFields"));
  removeFormValidationMenu.append(WebDeveloper.Locales.getString("removeFormValidation"));
  removeMaximumLengthsMenu.append(WebDeveloper.Locales.getString("removeMaximumLengths"));
  uncheckAllCheckboxesMenu.append(WebDeveloper.Locales.getString("uncheckAllCheckboxes"));
  viewFormInformationMenu.append(WebDeveloper.Locales.getString("viewFormInformation"));

  checkAllCheckboxesMenu.addEventListener("click", WebDeveloper.Overlay.Forms.checkAllCheckboxes);
  clearFormFieldsMenu.addEventListener("click", WebDeveloper.Overlay.Forms.clearFormFields);
  clearRadioButtonsMenu.addEventListener("click", WebDeveloper.Overlay.Forms.clearRadioButtons);
  convertFormGetsToPostsMenu.addEventListener("click", function() { WebDeveloper.Overlay.Forms.convertFormMethods("post"); });
  convertFormPostsToGetsMenu.addEventListener("click", function() { WebDeveloper.Overlay.Forms.convertFormMethods("get"); });
  convertSelectElementsToTextInputsMenu.addEventListener("click", WebDeveloper.Overlay.Forms.convertSelectElementsToTextInputs);
  convertTextInputsToTextareasMenu.addEventListener("click", WebDeveloper.Overlay.Forms.convertTextInputsToTextareas);
  displayFormDetailsMenu.addEventListener("click", WebDeveloper.Overlay.Forms.displayFormDetails);
  displayPasswordsMenu.addEventListener("click", WebDeveloper.Overlay.Forms.displayPasswords);
  enableAutoCompletionMenu.addEventListener("click", WebDeveloper.Overlay.Forms.enableAutoCompletion);
  enableFormFieldsMenu.addEventListener("click", WebDeveloper.Overlay.Forms.enableFormFields);
  expandSelectElementsMenu.addEventListener("click", WebDeveloper.Overlay.Forms.expandSelectElements);
  makeFormFieldsWritableMenu.addEventListener("click", WebDeveloper.Overlay.Forms.makeFormFieldsWritable);
  outlineFormFieldsWithoutLabelsMenu.addEventListener("click", WebDeveloper.Overlay.Forms.outlineFormFieldsWithoutLabels);
  populateFormFieldsMenu.addEventListener("click", WebDeveloper.Overlay.Forms.populateFormFields);
  removeFormValidationMenu.addEventListener("click", WebDeveloper.Overlay.Forms.removeFormValidation);
  removeMaximumLengthsMenu.addEventListener("click", WebDeveloper.Overlay.Forms.removeMaximumLengths);
  uncheckAllCheckboxesMenu.addEventListener("click", WebDeveloper.Overlay.Forms.uncheckAllCheckboxes);
  viewFormInformationMenu.addEventListener("click", WebDeveloper.Overlay.Forms.viewFormInformation);
};

// Makes all form fields writable
WebDeveloper.Overlay.Forms.makeFormFieldsWritable = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, function() { WebDeveloper.Forms.makeFormFieldsWritable([document]); });
    }
  });
};

// Outlines all form fields without labels
WebDeveloper.Overlay.Forms.outlineFormFieldsWithoutLabels = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Forms.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Forms.outlineFormFieldsWithoutLabels(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Populates all form fields
WebDeveloper.Overlay.Forms.populateFormFields = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.getItem("populate_email_address", function(item)
      {
        WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, function(emailAddress, password) { WebDeveloper.Forms.populateFormFields([document], emailAddress, password); }, [item, WebDeveloper.Locales.getString("password").toLowerCase()]);
      });
    }
  });
};

// Removes validation on all form fields
WebDeveloper.Overlay.Forms.removeFormValidation = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, function() { WebDeveloper.Forms.removeFormValidation([document]); });
    }
  });
};

// Removes maximum lengths from all elements
WebDeveloper.Overlay.Forms.removeMaximumLengths = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, function() { WebDeveloper.Forms.removeMaximumLengths([document]); });
    }
  });
};

// Toggles a feature on a tab
WebDeveloper.Overlay.Forms.toggleFeatureOnTab = function(featureItem, tab, scriptCode, args)
{
  WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "/features/javascript/forms.js", scriptCode, args);
};

// Unchecks all checkboxes
WebDeveloper.Overlay.Forms.uncheckAllCheckboxes = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, function() { WebDeveloper.Forms.toggleCheckboxes(false, [document]); });
    }
  });
};

// Displays information about all forms
WebDeveloper.Overlay.Forms.viewFormInformation = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, { type: "get-forms" }, function(data)
      {
        WebDeveloper.Overlay.openGeneratedTab(chrome.runtime.getURL("/generated/view-form-information.html"), tab.index, data, WebDeveloper.Overlay.Forms.getViewFormInformationLocale());
      });
    }
  });
};

// If the document is still loading
if(document.readyState === "loading")
{
  document.addEventListener("DOMContentLoaded", WebDeveloper.Overlay.Forms.initialize);
}
else
{
  WebDeveloper.Overlay.Forms.initialize();
}
