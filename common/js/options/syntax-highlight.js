var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.pre               = null;
WebDeveloper.syntaxHighlighter = null;

// Returns the syntax highlight theme for a color
WebDeveloper.getSyntaxHighlightTheme = function(color)
{
  var theme = "none";

  // If the color is dark
  if(color == "dark")
  {
    theme = "ctp-mocha";
  }
  else if(color == "light")
  {
    theme = "ctp-latte";
  }

  return theme;
};

// Initializes the syntax highlighting
WebDeveloper.initialize = function()
{
  var textArea = document.getElementById("web-developer-syntax-highlight-sample");

  WebDeveloper.pre = document.getElementById("web-developer-syntax-highlight-example");

  WebDeveloper.pre.textContent = textArea.value;

  /* eslint-disable indent */
  WebDeveloper.syntaxHighlighter = CodeMirror.fromTextArea(textArea,
  {
    lineNumbers: true,
    mode: "htmlmixed",
    readOnly: true,
    tabSize: 2
  });
  /* eslint-enable indent */

  WebDeveloper.syntaxHighlighter.getWrapperElement().classList.add("d-none");

  WebDeveloper.Storage.getItem("syntax_highlight_theme", function(item)
  {
    WebDeveloper.setTheme(item);
  });
};

// Sets the theme
WebDeveloper.setTheme = function(color)
{
  var theme = WebDeveloper.getSyntaxHighlightTheme(color);

  // If there is no theme
  if(theme == "none")
  {
    WebDeveloper.syntaxHighlighter.getWrapperElement().classList.add("d-none");
    WebDeveloper.pre.classList.remove("d-none");
  }
  else
  {
    WebDeveloper.syntaxHighlighter.setOption("theme", theme);
    WebDeveloper.pre.classList.add("d-none");
    WebDeveloper.syntaxHighlighter.getWrapperElement().classList.remove("d-none");
  }
};

// If the document is still loading
if(document.readyState === "loading")
{
  document.addEventListener("DOMContentLoaded", WebDeveloper.initialize);
}
else
{
  WebDeveloper.initialize();
}
