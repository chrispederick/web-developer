var WebDeveloper = WebDeveloper || {};

WebDeveloper.Popup			 = WebDeveloper.Popup || {};
WebDeveloper.Popup.Forms = WebDeveloper.Popup.Forms || {};

$(function()
{
	$("#check-all-checkboxes").on("click", WebDeveloper.Popup.Forms.checkAllCheckboxes);
	$("#clear-form-fields").on("click", WebDeveloper.Popup.Forms.clearFormFields);
	$("#clear-radio-buttons").on("click", WebDeveloper.Popup.Forms.clearRadioButtons);
	$("#convert-form-gets-to-posts").on("click", function() { WebDeveloper.Popup.Forms.convertFormMethods("post"); });
	$("#convert-form-posts-to-gets").on("click", function() { WebDeveloper.Popup.Forms.convertFormMethods("get"); });
	$("#convert-select-elements-to-text-inputs").on("click", WebDeveloper.Popup.Forms.convertSelectElementsToTextInputs);
	$("#convert-text-inputs-to-textareas").on("click", WebDeveloper.Popup.Forms.convertTextInputsToTextareas);
	$("#display-form-details").on("click", WebDeveloper.Popup.Forms.displayFormDetails);
	$("#display-passwords").on("click", WebDeveloper.Popup.Forms.displayPasswords);
	$("#enable-auto-completion").on("click", WebDeveloper.Popup.Forms.enableAutoCompletion);
	$("#enable-form-fields").on("click", WebDeveloper.Popup.Forms.enableFormFields);
	$("#expand-select-elements").on("click", WebDeveloper.Popup.Forms.expandSelectElements);
	$("#make-form-fields-writable").on("click", WebDeveloper.Popup.Forms.makeFormFieldsWritable);
	$("#outline-form-fields-without-labels").on("click", WebDeveloper.Popup.Forms.outlineFormFieldsWithoutLabels);
	$("#populate-form-fields").on("click", WebDeveloper.Popup.Forms.populateFormFields);
	$("#remove-maximum-lengths").on("click", WebDeveloper.Popup.Forms.removeMaximumLengths);
	$("#uncheck-all-checkboxes").on("click", WebDeveloper.Popup.Forms.uncheckAllCheckboxes);
	$("#view-form-information").on("click", WebDeveloper.Popup.Forms.viewFormInformation);
});

// Adds a feature on a tab
WebDeveloper.Popup.Forms.addFeatureOnTab = function(featureItem, tab, scriptCode)
{
	WebDeveloper.Popup.addFeatureOnTab(featureItem, tab, "features/javascript/forms.js", scriptCode);
};

// Checks all checkboxes
WebDeveloper.Popup.Forms.checkAllCheckboxes = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.toggleCheckboxes(true, [document]);");
		}
	});
};

// Clears all form fields
WebDeveloper.Popup.Forms.clearFormFields = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.clearFormFields([document]);");
		}
	});
};

// Clears all radio buttons
WebDeveloper.Popup.Forms.clearRadioButtons = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.clearRadioButtons([document]);");
		}
	});
};

// Converts the methods of all forms
WebDeveloper.Popup.Forms.convertFormMethods = function(method)
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Forms.addFeatureOnTab(featureItem, tab, 'WebDeveloper.Forms.convertFormMethods("' + method + '", [document]);');
		}
	});
};

// Converts select elements to text inputs
WebDeveloper.Popup.Forms.convertSelectElementsToTextInputs = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.convertSelectElementsToTextInputs([document]);");
		}
	});
};

// Converts text inputs to textareas
WebDeveloper.Popup.Forms.convertTextInputsToTextareas = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.convertTextInputsToTextareas([document]);");
		}
	});
};

// Displays the details about all forms
WebDeveloper.Popup.Forms.displayFormDetails = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Forms.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.displayFormDetails(" + display + ", [document]);");
		}
	});
};

// Displays all passwords
WebDeveloper.Popup.Forms.displayPasswords = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.displayPasswords([document]);");
		}
	});
};

// Enables auto completion on all elements
WebDeveloper.Popup.Forms.enableAutoCompletion = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.enableAutoCompletion([document]);");
		}
	});
};

// Enables all form fields
WebDeveloper.Popup.Forms.enableFormFields = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.enableFormFields([document]);");
		}
	});
};

// Expands all select elements
WebDeveloper.Popup.Forms.expandSelectElements = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.expandSelectElements([document]);");
		}
	});
};

// Makes all form fields writable
WebDeveloper.Popup.Forms.makeFormFieldsWritable = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.makeFormFieldsWritable([document]);");
		}
	});
};

// Outlines all form fields without labels
WebDeveloper.Popup.Forms.outlineFormFieldsWithoutLabels = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Forms.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.outlineFormFieldsWithoutLabels(" + display + ", [document]);");
		}
	});
};

// Populates all form fields
WebDeveloper.Popup.Forms.populateFormFields = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Forms.addFeatureOnTab(featureItem, tab, 'WebDeveloper.Forms.populateFormFields([document], "' + chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("populate_email_address") + '");');
		}
	});
};

// Removes maximum lengths from all elements
WebDeveloper.Popup.Forms.removeMaximumLengths = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.removeMaximumLengths([document]);");
		}
	});
};

// Toggles a feature on a tab
WebDeveloper.Popup.Forms.toggleFeatureOnTab = function(featureItem, tab, scriptCode)
{
	WebDeveloper.Popup.toggleFeatureOnTab(featureItem, tab, "features/javascript/forms.js", scriptCode);
};

// Unchecks all checkboxes
WebDeveloper.Popup.Forms.uncheckAllCheckboxes = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Forms.addFeatureOnTab(featureItem, tab, "WebDeveloper.Forms.toggleCheckboxes(false, [document]);");
		}
	});
};

// Displays information about all forms
WebDeveloper.Popup.Forms.viewFormInformation = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			chrome.tabs.sendRequest(tab.id, {type: "get-forms"}, function(data)
			{
				var locale = WebDeveloper.Locales.setupGeneratedLocale();

				locale.action				 = WebDeveloper.Locales.getString("action");
				locale.elements			 = WebDeveloper.Locales.getString("elements");
				locale.form					 = WebDeveloper.Locales.getString("form");
				locale.forms				 = WebDeveloper.Locales.getString("forms");
				locale.id						 = WebDeveloper.Locales.getString("id");
				locale.label				 = WebDeveloper.Locales.getString("label");
				locale.maximumLength = WebDeveloper.Locales.getString("maximumLength");
				locale.method				 = WebDeveloper.Locales.getString("method");
				locale.name					 = WebDeveloper.Locales.getString("name");
				locale.size					 = WebDeveloper.Locales.getString("size");
				locale.type					 = WebDeveloper.Locales.getString("type");
				locale.value				 = WebDeveloper.Locales.getString("value");

				chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-form-information.html"), tab.index, data, locale);

				WebDeveloper.Popup.close();
			});
		}
	});
};
