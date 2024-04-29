var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Validation = WebDeveloper.Validation || {};

// Initializes the validation
WebDeveloper.Validation.initialize = function(data)
{
  document.getElementById("form-content").value = data;

  document.getElementById("form").submit();
};
