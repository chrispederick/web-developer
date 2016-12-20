var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Overlay       = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Forms = WebDeveloper.Overlay.Forms || {};

$(function()
{
  $("#check-all-checkboxes").append(WebDeveloper.Locales.getString("checkAllCheckboxes")).on("click", WebDeveloper.Overlay.Forms.checkAllCheckboxes);
  $("#clear-form-fields").append(WebDeveloper.Locales.getString("clearFormFields")).on("click", WebDeveloper.Overlay.Forms.clearFormFields);
  $("#clear-radio-buttons").append(WebDeveloper.Locales.getString("clearRadioButtons")).on("click", WebDeveloper.Overlay.Forms.clearRadioButtons);
  $("#convert-form-gets-to-posts").append(WebDeveloper.Locales.getString("convertFormGetsToPosts")).on("click", function() { WebDeveloper.Overlay.Forms.convertFormMethods("post"); });
  $("#convert-form-posts-to-gets").append(WebDeveloper.Locales.getString("convertFormPostsToGets")).on("click", function() { WebDeveloper.Overlay.Forms.convertFormMethods("get"); });
  $("#convert-select-elements-to-text-inputs").append(WebDeveloper.Locales.getString("convertSelectElementsToTextInputs")).on("click", WebDeveloper.Overlay.Forms.convertSelectElementsToTextInputs);
  $("#convert-text-inputs-to-textareas").append(WebDeveloper.Locales.getString("convertTextInputsToTextareas")).on("click", WebDeveloper.Overlay.Forms.convertTextInputsToTextareas);
  $("#display-form-details").append(WebDeveloper.Locales.getString("displayFormDetails")).on("click", WebDeveloper.Overlay.Forms.displayFormDetails);
  $("#display-passwords").append(WebDeveloper.Locales.getString("displayPasswords")).on("click", WebDeveloper.Overlay.Forms.displayPasswords);
  $("#enable-auto-completion").append(WebDeveloper.Locales.getString("enableAutoCompletion")).on("click", WebDeveloper.Overlay.Forms.enableAutoCompletion);
  $("#enable-form-fields").append(WebDeveloper.Locales.getString("enableFormFields")).on("click", WebDeveloper.Overlay.Forms.enableFormFields);
  $("#expand-select-elements").append(WebDeveloper.Locales.getString("expandSelectElements")).on("click", WebDeveloper.Overlay.Forms.expandSelectElements);
  $("#make-form-fields-writable").append(WebDeveloper.Locales.getString("makeFormFieldsWritable")).on("click", WebDeveloper.Overlay.Forms.makeFormFieldsWritable);
  $("#outline-form-fields-without-labels").append(WebDeveloper.Locales.getString("outlineFormFieldsWithoutLabels")).on("click", WebDeveloper.Overlay.Forms.outlineFormFieldsWithoutLabels);
  $("#populate-form-fields").append(WebDeveloper.Locales.getString("populateFormFields")).on("click", WebDeveloper.Overlay.Forms.populateFormFields);
  $("#remove-maximum-lengths").append(WebDeveloper.Locales.getString("removeMaximumLengths")).on("click", WebDeveloper.Overlay.Forms.removeMaximumLengths);
  $("#uncheck-all-checkboxes").append(WebDeveloper.Locales.getString("uncheckAllCheckboxes")).on("click", WebDeveloper.Overlay.Forms.uncheckAllCheckboxes);
  $("#view-form-information").append(WebDeveloper.Locales.getString("viewFormInformation")).on("click", WebDeveloper.Overlay.Forms.viewFormInformation);
  $("#disable-form-validation").append(WebDeveloper.Locales.getString("disableFormValidation")).on("click", WebDeveloper.Overlay.Forms.disableFormValidation);
});

// Adds a feature on a tab
WebDeveloper.Overlay.Forms.addFeatureOnTab = function(featureItem, tab, scriptCode)
{
  WebDeveloper.Overlay.addFeatureOnTab(featureItem, tab, "features/javascript/forms.js", scriptCode);
};

// Checks all checkboxes
WebDeveloper.Overlay.Forms.checkAllCheckboxes = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.toggleCheckboxes(true, [document]);");
    }
  });
};

// Clears all form fields
WebDeveloper.Overlay.Forms.clearFormFields = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.clearFormFields([document]);");
    }
  });
};

// Clears all radio buttons
WebDeveloper.Overlay.Forms.clearRadioButtons = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.clearRadioButtons([document]);");
    }
  });
};

// Converts the methods of all forms
WebDeveloper.Overlay.Forms.convertFormMethods = function(method)
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, 'WebDeveloper.Forms.convertFormMethods("' + method + '", [document]);');
    }
  });
};

// Converts select elements to text inputs
WebDeveloper.Overlay.Forms.convertSelectElementsToTextInputs = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.convertSelectElementsToTextInputs([document]);");
    }
  });
};

// Converts text inputs to textareas
WebDeveloper.Overlay.Forms.convertTextInputsToTextareas = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.convertTextInputsToTextareas([document]);");
    }
  });
};

// Displays the details about all forms
WebDeveloper.Overlay.Forms.displayFormDetails = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Forms.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.displayFormDetails(" + display + ", [document]);");
    }
  });
};

// Displays all passwords
WebDeveloper.Overlay.Forms.displayPasswords = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.displayPasswords([document]);");
    }
  });
};

// Enables auto completion on all elements
WebDeveloper.Overlay.Forms.enableAutoCompletion = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.enableAutoCompletion([document]);");
    }
  });
};

// Enables all form fields
WebDeveloper.Overlay.Forms.enableFormFields = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.enableFormFields([document]);");
    }
  });
};

// Expands all select elements
WebDeveloper.Overlay.Forms.expandSelectElements = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.expandSelectElements([document]);");
    }
  });
};

// Makes all form fields writable
WebDeveloper.Overlay.Forms.makeFormFieldsWritable = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.makeFormFieldsWritable([document]);");
    }
  });
};

// Outlines all form fields without labels
WebDeveloper.Overlay.Forms.outlineFormFieldsWithoutLabels = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Forms.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.outlineFormFieldsWithoutLabels(" + display + ", [document]);");
    }
  });
};

// Populates all form fields
WebDeveloper.Overlay.Forms.populateFormFields = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, 'WebDeveloper.Forms.populateFormFields([document], "' + chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("populate_email_address") + '", "' + WebDeveloper.Locales.getString("password").toLowerCase() + '");');
    }
  });
};

// Removes maximum lengths from all elements
WebDeveloper.Overlay.Forms.removeMaximumLengths = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.removeMaximumLengths([document]);");
    }
  });
};

// Toggles a feature on a tab
WebDeveloper.Overlay.Forms.toggleFeatureOnTab = function(featureItem, tab, scriptCode)
{
  WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "features/javascript/forms.js", scriptCode);
};

// Unchecks all checkboxes
WebDeveloper.Overlay.Forms.uncheckAllCheckboxes = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.toggleCheckboxes(false, [document]);");
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
        chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-form-information.html"), tab.index, data, WebDeveloper.Overlay.Forms.getViewFormInformationLocale());
      });
    }
  });
};

// Disables HTML5 validation
WebDeveloper.Overlay.Forms.disableFormValidation = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.disableFormValidation([document]);");
    }
  });
};
