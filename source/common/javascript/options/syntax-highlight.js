var WebDeveloper = WebDeveloper || {};

WebDeveloper.codeMirror      = null;
WebDeveloper.pre             = null;
WebDeveloper.syntaxHighlight = null;

// Initializes the syntax highlighting
WebDeveloper.initialize = function()
{
  var textArea = $("#web-developer-syntax-highlight-sample");

  WebDeveloper.pre = $("#web-developer-syntax-highlight-example");

  WebDeveloper.pre.text(textArea.val()).hide();

  WebDeveloper.codeMirror = CodeMirror.fromTextArea(textArea.get(0),
  {
    mode: "htmlmixed",
    readOnly: "nocursor",
    tabSize: 2,
    theme: "light"
  });

  WebDeveloper.syntaxHighlight = $(WebDeveloper.codeMirror.getWrapperElement());
};

// Sets the theme
WebDeveloper.setTheme = function(theme)
{
  // If there is no theme
  if(theme == "none")
  {
    WebDeveloper.syntaxHighlight.hide();
    WebDeveloper.pre.show();
  }
  else
  {
    // If the code mirror is set
    if(WebDeveloper.codeMirror)
    {
      WebDeveloper.codeMirror.setOption("theme", theme);
    }

    WebDeveloper.pre.hide();
    WebDeveloper.syntaxHighlight.show();
  }
};

$(function()
{
  WebDeveloper.initialize();
});
