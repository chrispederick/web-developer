WebDeveloper.Forms = WebDeveloper.Forms || {};

// Clears all radio buttons
WebDeveloper.Forms.clearRadioButtons = function(contentDocument)
{
  var clearedRadioButtons = 0;
  var message             = null;
  var radioButtons        = contentDocument.querySelectorAll("input[type=radio]");

  // Loop through the radio buttons
  for(var i = 0, l = radioButtons.length; i < l; i++)
  {
    radioButtons[i].checked = false;

    clearedRadioButtons++;
  }
  
  // If one radio button was cleared
  if(clearedRadioButtons == 1)
  {
		message = "1 radio button cleared";
  }
  else
  {
		message = clearedRadioButtons + " radio buttons cleared";
  }

	WebDeveloper.Forms.showNotification(message);
};

// Converts the methods of all forms
WebDeveloper.Forms.convertFormMethods = function(method, contentDocument)
{
  var convertedForms = 0;
  var form           = null;
	var forms          = contentDocument.forms;
  var message        = null;

  // Loop through all the forms
  for(var i = 0, l = forms.length; i < l; i++)
  {
    form = forms[i];

    // If this form is not already the right method
    if((!form.hasAttribute("method") && method == "post") || (form.hasAttribute("method") && form.getAttribute("method").toLowerCase() != method))
    {
      form.setAttribute("method", method);
      
      convertedForms++;
    }
  }

  // If one form was converted
  if(convertedForms == 1)
  {
		message = "1 form converted";
  }
  else
  {
		message = convertedForms + " forms converted";
  }

	WebDeveloper.Forms.showNotification(message);
};

// Converts select elements to text inputs
WebDeveloper.Forms.convertSelectElementsToTextInputs = function(contentDocument)
{
  var convertedSelectElements = 0;
  var message                 = null;
  var inputElement            = null;
  var parentNode              = null;
  var selectElement           = null;
  var selectElements          = contentDocument.querySelectorAll("select");

  // While there are select elements
  while(selectElements.length > 0)
  {
    inputElement  = contentDocument.createElement("input");
    selectElement = selectElements[0];
    parentNode    = selectElement.parentNode;

    inputElement.value = selectElement.value;

    // If the select element has an id attribute
    if(selectElement.hasAttribute("id"))
    {
      inputElement.setAttribute("id", selectElement.getAttribute("id"));
    }

    // If the select element has a name attribute
    if(selectElement.hasAttribute("name"))
    {
      inputElement.setAttribute("name", selectElement.getAttribute("name"));
    }

    parentNode.insertBefore(inputElement, selectElement);
		parentNode.removeChild(selectElement);

    convertedSelectElements++;
  }

  // If one select element was converted
  if(convertedSelectElements == 1)
  {
		message = "1 select element converted";
  }
  else
  {
		message = convertedSelectElements + " select elements converted";
  }

	WebDeveloper.Forms.showNotification(message);
};

// Displays the details about all forms
WebDeveloper.Forms.displayFormDetails = function(display, contentDocument)
{
  var inputElement  = null;
  var inputElements = contentDocument.querySelectorAll("input");
  var spanElement   = null;
  var text          = null;

	WebDeveloper.Common.removeMatchingElements("span.web-developer-display-form-details", contentDocument);

  // Loop through the input tags
  for(var i = 0, l = inputElements.length; i < l; i++)
  {
    inputElement = inputElements[i];

    // If the input element was un-hidden
    if(inputElement.hasAttribute("web-developer-unhidden"))
    {
      inputElement.removeAttribute("web-developer-unhidden");
      inputElement.setAttribute("type", "hidden");
    }

    // If displaying the form details
    if(display)
    {
      spanElement = contentDocument.createElement("span");
      text        = "<input";

      // If the element is hidden
      if(inputElement.hasAttribute("type") && inputElement.getAttribute("type").toLowerCase() == "hidden")
      {
        inputElement.setAttribute("web-developer-unhidden", true);
        inputElement.removeAttribute("type");
      }

      // If the element has an autocomplete attribute
      if(inputElement.hasAttribute("autocomplete"))
      {
        text += ' autocomplete="' + inputElement.getAttribute("autocomplete") + '"';
      }

      // If the element has an id attribute
      if(inputElement.hasAttribute("id"))
      {
        text += ' id="' + inputElement.getAttribute("id") + '"';
      }

      // If the element has a maxlength attribute
      if(inputElement.hasAttribute("maxlength"))
      {
        text += ' maxlength="' + inputElement.getAttribute("maxlength") + '"';
      }

      // If the element has an name attribute
      if(inputElement.hasAttribute("name"))
      {
        text += ' name="' + inputElement.getAttribute("name") + '"';
      }

      // If the element has a size attribute
      if(inputElement.hasAttribute("size"))
      {
        text += ' size="' + inputElement.getAttribute("size") + '"';
      }

      // If the element has a type attribute
      if(inputElement.hasAttribute("type"))
      {
        text += ' type="' + inputElement.getAttribute("type") + '"';

	      // If the element is a checkbox or radio button
	      if(inputElement.getAttribute("type").toLowerCase() == "checkbox" || inputElement.getAttribute("type").toLowerCase() == "radio")
	      {
	        text += ' value="' + inputElement.value + '"';
	      }
      }

      text += ">";

      spanElement.setAttribute("class", "web-developer-display-form-details");
      spanElement.appendChild(contentDocument.createTextNode(text));
      inputElement.parentNode.insertBefore(spanElement, inputElement);
    }
  }

  // If displaying the form details
  if(display)
  {
	  var buttonElement    = null;
	  var buttonElements   = contentDocument.querySelectorAll("button");
	  var selectElement    = null;
	  var selectElements   = contentDocument.querySelectorAll("select");
	  var textAreaElement  = null;
	  var textAreaElements = contentDocument.querySelectorAll("textarea");

    // Loop through the button tags
    for(i = 0, l = buttonElements.length; i < l; i++)
    {
      buttonElement = buttonElements[i];
      spanElement   = contentDocument.createElement("span");
      text          = "<button";

      // If the element has an id attribute
      if(buttonElement.hasAttribute("id"))
      {
        text += ' id="' + buttonElement.getAttribute("id") + '"';
      }

      // If the element has an name attribute
      if(buttonElement.hasAttribute("name"))
      {
        text += ' name="' + buttonElement.getAttribute("name") + '"';
      }

      // If the element has a value
      if(buttonElement.value)
      {
        text += ' value="' + buttonElement.value + '"';
      }

      text += ">";

      spanElement.setAttribute("class", "web-developer-display-form-details");
      spanElement.appendChild(contentDocument.createTextNode(text));
      buttonElement.parentNode.insertBefore(spanElement, buttonElement);
    }

    // Loop through the select tags
    for(i = 0, l = selectElements.length; i < l; i++)
    {
      selectElement = selectElements[i];
      spanElement   = contentDocument.createElement("span");
      text          = "<select";

      // If the element has an id attribute
      if(selectElement.hasAttribute("id"))
      {
        text += ' id="' + selectElement.getAttribute("id") + '"';
      }

      // If the element has an name attribute
      if(selectElement.hasAttribute("name"))
      {
        text += ' name="' + selectElement.getAttribute("name") + '"';
      }

      // If the element has a value
      if(selectElement.value)
      {
        text += ' value="' + selectElement.value + '"';
      }

      text += ">";

      spanElement.setAttribute("class", "web-developer-display-form-details");
      spanElement.appendChild(contentDocument.createTextNode(text));
      selectElement.parentNode.insertBefore(spanElement, selectElement);
    }

    // Loop through the textarea tags
    for(i = 0, l = textAreaElements.length; i < l; i++)
    {
      textAreaElement = textAreaElements[i];
      spanElement     = contentDocument.createElement("span");
      text            = "<textarea";

      // If the element has an id attribute
      if(textAreaElement.hasAttribute("id"))
      {
        text += ' id="' + textAreaElement.getAttribute("id") + '"';
      }

      // If the element has a maxlength attribute
      if(textAreaElement.hasAttribute("maxlength"))
      {
        text += ' maxlength="' + textAreaElement.getAttribute("maxlength") + '"';
      }

      // If the element has an name attribute
      if(textAreaElement.hasAttribute("name"))
      {
        text += ' name="' + textAreaElement.getAttribute("name") + '"';
      }

      text += ">";

      spanElement.setAttribute("class", "web-developer-display-form-details");
      spanElement.appendChild(contentDocument.createTextNode(text));
      textAreaElement.parentNode.insertBefore(spanElement, textAreaElement);
    }
  }

  WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-form-details-before", contentDocument, false);
  WebDeveloper.Common.toggleStyleSheet("features/style-sheets/forms/display-form-details.css", "web-developer-display-form-details", contentDocument, false);
};

// Enables auto completion on all elements
WebDeveloper.Forms.enableAutoCompletion = function(contentDocument)
{
  var autoCompleteElements = contentDocument.querySelectorAll("[autocomplete]");
  var enabledElements      = 0;
  var message              = null;

  // Loop through the auto complete elements
  for(var i = 0, l = autoCompleteElements.length; i < l; i++)
  {
    autoCompleteElements[i].removeAttribute("autocomplete");

    enabledElements++;
  }

  // If one element was enabled
  if(enabledElements == 1)
  {
		message = "1 element enabled";
  }
  else
  {
		message = enabledElements + " elements enabled";
  }

	WebDeveloper.Forms.showNotification(message);
};

// Enables the form elements
WebDeveloper.Forms.enableFormElements = function(formElements)
{
  var enabledElements = 0;
  var formElement     = null;

  // Loop through the form elements
  for(var i = 0, l = formElements.length; i < l; i++)
  {
    formElement = formElements[i];

    // If the form element is disabled
    if(formElement.disabled)
    {
      formElement.disabled = false;

	    enabledElements++;
    }
  }
  
  return enabledElements;
};

// Enables all form fields
WebDeveloper.Forms.enableFormFields = function(contentDocument)
{
  var enabledFields = 0;
  var forms         = contentDocument.forms;
  var message       = null;

  // Loop through the forms
  for(var i = 0, l = forms.length; i < l; i++)
  {
    enabledFields += WebDeveloper.Forms.enableFormElements(forms[i].elements);
  }

  enabledFields += WebDeveloper.Forms.enableFormElements(contentDocument.querySelectorAll("input[type=image]"));

  // If one field was enabled
  if(enabledFields == 1)
  {
		message = "1 form field enabled";
  }
  else
  {
		message = enabledFields + " form fields enabled";
  }

	WebDeveloper.Forms.showNotification(message);
};

// Makes all form fields writable
WebDeveloper.Forms.makeFormFieldsWritable = function(contentDocument)
{
  var message          = null;
  var readOnlyElements = contentDocument.querySelectorAll("[readonly]");
  var writableElements = 0;

  // Loop through the read only elements
  for(var i = 0, l = readOnlyElements.length; i < l; i++)
  {
    readOnlyElements[i].removeAttribute("readonly");

    writableElements++;
  }

  // If one element was enabled
  if(writableElements == 1)
  {
		message = "1 form field made writable";
  }
  else
  {
		message = writableElements + " form fields made writable";
  }

	WebDeveloper.Forms.showNotification(message);
};

// Populates all form fields
WebDeveloper.Forms.populateFormFields = function(contentDocument)
{
  var inputElement     = null;
  var inputElementName = null;
  var inputElements    = contentDocument.querySelectorAll("input");
  var inputElementType = null;
  var option           = null;
  var options          = null;
  var selectElement    = null;
  var selectElements   = contentDocument.querySelectorAll("select");
  var textAreaElement  = null;
  var textAreaElements = contentDocument.querySelectorAll("textarea");

  // Loop through the input tags
  for(var i = 0, l = inputElements.length; i < l; i++)
  {
    inputElement = inputElements[i];

    // If the input element is not disabled
    if(!inputElement.disabled)
    {
	    inputElementType = inputElement.getAttribute("type");

      // If the input element value is not set and the type is not set or is email, password or text
      if(!WebDeveloper.Common.trim(inputElement.value) && (!inputElementType || inputElementType.toLowerCase() == "email" || inputElementType.toLowerCase() == "password" || inputElementType.toLowerCase() == "search" || inputElementType.toLowerCase() == "text"))
      {
        inputElementName = inputElement.getAttribute("name");

        // If the input element type is email or is text and the name contains email
        if(inputElementType.toLowerCase() == "email" || (inputElementType == "text" && inputElementName.toLowerCase().indexOf("email") >= 0))
        {
          inputElement.value = "example@example.org";
        }
        else if(inputElementType.toLowerCase() == "password")
        {
          inputElement.value = "password";
        }
        else
        {
          inputElement.value = inputElementName;
        }
      }
      else if(inputElementType.toLowerCase() == "checkbox" || inputElementType.toLowerCase() == "radio")
      {
        inputElement.checked = true;
      }
    }
  }

  // Loop through the select tags
  for(i = 0, l = selectElements.length; i < l; i++)
  {
    selectElement = selectElements[i];

    // If the select element is not disabled and the value is not set
    if(!selectElement.disabled && !WebDeveloper.Common.trim(selectElement.value))
    {
      options = selectElement.options;

      // Loop through the options
      for(var j = 0, m = options.length; j < m; j++)
      {
        option = options.item(j);

        // If the option is set and the option text and option value are not empty
        if(option && WebDeveloper.Common.trim(option.text) && WebDeveloper.Common.trim(option.value))
        {
          selectElement.selectedIndex = j;

          break;
        }
      }
    }
  }

  // Loop through the text area tags
  for(i = 0, l = textAreaElements.length; i < l; i++)
  {
    textAreaElement = textAreaElements[i];

    // If the text area element is not disabled and the value is not set
    if(!textAreaElement.disabled && !WebDeveloper.Common.trim(textAreaElement.value))
    {
      textAreaElement.value = textAreaElement.getAttribute("name");
    }
  }
};

// Removes maximum lengths from all elements
WebDeveloper.Forms.removeMaximumLengths = function(contentDocument)
{
  var alteredElements       = 0;
  var maximumLengthElements = contentDocument.querySelectorAll("[maxlength]");
  var message               = null;

  // Loop through the maximum length elements
  for(var i = 0, l = maximumLengthElements.length; i < l; i++)
  {
    maximumLengthElements[i].removeAttribute("maxlength");

    alteredElements++;
  }

  // If one element was altered
  if(alteredElements == 1)
  {
		message = "Maximum length removed from 1 element";
  }
  else
  {
		message = "Maximum length removed from " + alteredElements + " elements";
  }

	WebDeveloper.Forms.showNotification(message);
};

// Shows all passwords
WebDeveloper.Forms.showPasswords = function(contentDocument)
{
  var message        = null;
  var passwords      = contentDocument.querySelectorAll("input[type=password]");
  var shownPasswords = 0;

  // Loop through the passwords
  for(var i = 0, l = passwords.length; i < l; i++)
  {
    passwords[i].removeAttribute("type");

    shownPasswords++;
  }

  // If one password shown
  if(shownPasswords == 1)
  {
		message = "1 password shown";
  }
  else
  {
		message = shownPasswords + " passwords shown";
  }

	WebDeveloper.Forms.showNotification(message);
};
