var WebDeveloper = WebDeveloper || {};

WebDeveloper.Dashboard               = WebDeveloper.Dashboard || {};
WebDeveloper.Dashboard.browserWindow = null;
WebDeveloper.Dashboard.currentLine   = null;
WebDeveloper.Dashboard.editor        = null;
WebDeveloper.Dashboard.editorElement = null;
WebDeveloper.Dashboard.lastPosition  = null;
WebDeveloper.Dashboard.lastQuery     = null;
WebDeveloper.Dashboard.textArea      = null;

// Adjusts the breadcrumb
WebDeveloper.Dashboard.adjustBreadcrumb = function()
{
  // If the dashboard is not vertical
  if(!$("html").hasClass("vertical"))
  {
    $(".breadcrumb").css("margin-right", ($("#web-developer-copy-ancestor-path").outerWidth() + 10) + "px");
  }
};

// Changes the syntax highlight theme
WebDeveloper.Dashboard.changeSyntaxHighlightTheme = function(type, color)
{
  WebDeveloper.Dashboard.setContent(WebDeveloper.Dashboard.getContent(), true);

  // If the color is not set
  if(color == "none")
  {
    $(".CodeMirror").hide();
    WebDeveloper.Dashboard.textArea.show();
  }
  else if(WebDeveloper.Dashboard.editorElement)
  {
    $(".CodeMirror").show();
    WebDeveloper.Dashboard.textArea.hide();

    WebDeveloper.Dashboard.editor.setOption("theme", color);
  }
  else
  {
    WebDeveloper.Dashboard.initializeSyntaxHighlight(type, color);
  }
};

// Returns the ancestor path
WebDeveloper.Dashboard.getAncestorPath = function()
{
  var ancestor     = null;
  var ancestorData = null;
  var ancestorPath = "";

  // Loop through the ancestors
  $("li", $("#web-developer-ancestors")).each(function()
  {
    ancestor      = $(this);
    ancestorData  = ancestor.data("web-developer-element-id");
    ancestorPath += ancestor.data("web-developer-element-tag");

    // If the ancestor data is set
    if(ancestorData)
    {
      ancestorPath += ancestorData;
    }

    ancestorData = ancestor.data("web-developer-element-classes");

    // If the ancestor data is set
    if(ancestorData)
    {
      ancestorPath += ancestorData;
    }

    ancestorPath += " > ";
  });

  // If the ancestor path is set
  if(ancestorPath)
  {
    ancestorPath = ancestorPath.substring(0, ancestorPath.length - 3);
  }

  return ancestorPath;
};

// Returns the content
WebDeveloper.Dashboard.getContent = function()
{
  // If the text area is set and is visible
  if(WebDeveloper.Dashboard.textArea && WebDeveloper.Dashboard.textArea.is(":visible"))
  {
    return WebDeveloper.Dashboard.textArea.val();
  }
  else if(WebDeveloper.Dashboard.editor)
  {
    return WebDeveloper.Dashboard.editor.getValue();
  }

  return null;
};

// Initializes the editor
WebDeveloper.Dashboard.initializeEditor = function(type, color)
{
  WebDeveloper.Dashboard.browserWindow = $(window);
  WebDeveloper.Dashboard.textArea      = $("#web-developer-content");

  // If the color is set
  if(color != "none")
  {
    WebDeveloper.Dashboard.initializeSyntaxHighlight(type, color);
  }

  WebDeveloper.Dashboard.resize();

  WebDeveloper.Dashboard.browserWindow.on("resize", WebDeveloper.Dashboard.resize);
};

// Initializes the syntax highlight functionality
WebDeveloper.Dashboard.initializeSyntaxHighlight = function(type, color)
{
  WebDeveloper.Dashboard.editor = CodeMirror.fromTextArea($("#web-developer-content").get(0),
  {
    lineNumbers: true,
    mode: type,
    onCursorActivity: function()
    {
      // If the current line is set
      if(WebDeveloper.Dashboard.currentLine)
      {
        WebDeveloper.Dashboard.editor.setLineClass(WebDeveloper.Dashboard.currentLine, null);
      }

      WebDeveloper.Dashboard.currentLine = WebDeveloper.Dashboard.editor.setLineClass(WebDeveloper.Dashboard.editor.getCursor().line, null, "current-line");
    },
    tabSize: 2,
    theme: color
  });

  WebDeveloper.Dashboard.editorElement = $(WebDeveloper.Dashboard.editor.getScrollerElement());
};

// Handles the window being resized
WebDeveloper.Dashboard.resize = function()
{
  WebDeveloper.Dashboard.textArea.height(WebDeveloper.Dashboard.browserWindow.height());

  // If the editor element is set
  if(WebDeveloper.Dashboard.editorElement)
  {
    WebDeveloper.Dashboard.editorElement.height(WebDeveloper.Dashboard.browserWindow.height());
  }
};

// Searches for the specified query
WebDeveloper.Dashboard.search = function(query)
{
  // If the editor element is set
  if(WebDeveloper.Dashboard.editorElement)
  {
    var cursor = null;

    // If this is a new query
    if(query != WebDeveloper.Dashboard.lastQuery)
    {
      WebDeveloper.Dashboard.lastPosition = null;
      WebDeveloper.Dashboard.lastQuery    = query;
    }

    cursor = WebDeveloper.Dashboard.editor.getSearchCursor(query, WebDeveloper.Dashboard.lastPosition, true);

    // If the search was not found
    if(!cursor.findNext())
    {
      cursor = WebDeveloper.Dashboard.editor.getSearchCursor(query, null, true);

      // If the search was still not found
      if(!cursor.findNext())
      {
        return;
      }
    }

    WebDeveloper.Dashboard.lastPosition = cursor.to();

    WebDeveloper.Dashboard.editor.setSelection(cursor.from(), WebDeveloper.Dashboard.lastPosition);
  }
};

// Sets the content
WebDeveloper.Dashboard.setContent = function(content, excludeNewLine)
{
  WebDeveloper.Dashboard.textArea.val(content);

  // If the editor is set
  if(WebDeveloper.Dashboard.editor)
  {
    // If not excluding the new line
    if(!excludeNewLine)
    {
      content += "\n";
    }

    WebDeveloper.Dashboard.editor.setValue(content);
  }
};

// Sets the position
WebDeveloper.Dashboard.setPosition = function(position)
{
  // If the position is left or right
  if(position == "left" || position == "right")
  {
    $("html").addClass("vertical");
  }
};
