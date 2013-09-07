var WebDeveloper = WebDeveloper || {};

WebDeveloper.Validation = WebDeveloper.Validation || {};

// Initializes the validation
WebDeveloper.Validation.initialize = function(data)
{
  $("#fragment").val(data[0].content);
  $("#form").submit();
};
