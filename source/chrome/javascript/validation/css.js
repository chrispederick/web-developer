var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Validation = WebDeveloper.Validation || {};

// Initializes the validation
WebDeveloper.Validation.initialize = function(data)
{
  $("#text").val(data.css);
  $("#form").submit();
};
