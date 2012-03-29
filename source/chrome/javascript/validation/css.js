var WebDeveloper = WebDeveloper || {};

WebDeveloper.Validation = WebDeveloper.Validation || {};

// Initializes the validation
WebDeveloper.Validation.initialize = function(data)
{
	$("#text").val(data.css);
	$("#form").submit();
};
