var WebDeveloper = WebDeveloper || {};

WebDeveloper.Dashboard							 = WebDeveloper.Dashboard || {};
WebDeveloper.Dashboard.browserWindow = null;
WebDeveloper.Dashboard.currentLine	 = null;
WebDeveloper.Dashboard.editor				 = null;
WebDeveloper.Dashboard.editorElement = null;
WebDeveloper.Dashboard.lastPosition	 = null;
WebDeveloper.Dashboard.lastQuery		 = null;

// Adjusts the breadcrumb
WebDeveloper.Dashboard.adjustBreadcrumb = function()
{
	// If the dashboard is not vertical
	if(!$("html").hasClass("vertical"))
	{
		$(".breadcrumb").css("margin-right", ($("#web-developer-copy-ancestor-path").outerWidth() + 10) + "px");
	}
};

// Returns the ancestor path
WebDeveloper.Dashboard.getAncestorPath = function()
{
	var ancestor		 = null;
	var ancestorData = null;
	var ancestorPath = "";

	// Loop through the ancestors
	$("li", $("#web-developer-ancestors")).each(function()
	{
		ancestor			= $(this);
		ancestorData	= ancestor.data("web-developer-element-id");
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
	// If the editor is set
	if(WebDeveloper.Dashboard.editor)
	{
		// If the editor element is set
		if(WebDeveloper.Dashboard.editorElement)
		{
			return WebDeveloper.Dashboard.editor.getValue();
		}
		else
		{
			return WebDeveloper.Dashboard.editor.val();
		}
	}

	return null;
};

// Initializes the editor
WebDeveloper.Dashboard.initializeEditor = function(type, color)
{
	WebDeveloper.Dashboard.browserWindow = $(window);

	// If the color is not set
	if(color == "none")
	{
		WebDeveloper.Dashboard.editor = $("#web-developer-content");
	}
	else
	{
		WebDeveloper.Dashboard.editor = CodeMirror.fromTextArea($("#web-developer-content").get(0),
		{
			lineNumbers: true,
			mode: type,
			onCursorActivity: function()
			{
				WebDeveloper.Dashboard.editor.setLineClass(WebDeveloper.Dashboard.currentLine, null);

				WebDeveloper.Dashboard.currentLine = WebDeveloper.Dashboard.editor.setLineClass(WebDeveloper.Dashboard.editor.getCursor().line, "current-line");
			},
			tabSize: 2,
			theme: color
		});

		WebDeveloper.Dashboard.editorElement = $(WebDeveloper.Dashboard.editor.getScrollerElement());
	}

	WebDeveloper.Dashboard.resize();

	WebDeveloper.Dashboard.browserWindow.on("resize", WebDeveloper.Dashboard.resize);
};

// Handles the window being resized
WebDeveloper.Dashboard.resize = function()
{
	// If the editor element is set
	if(WebDeveloper.Dashboard.editorElement)
	{
		WebDeveloper.Dashboard.editorElement.height(WebDeveloper.Dashboard.browserWindow.height());
	}
	else
	{
		WebDeveloper.Dashboard.editor.height(WebDeveloper.Dashboard.browserWindow.height());
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
			WebDeveloper.Dashboard.lastQuery		= query;
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
WebDeveloper.Dashboard.setContent = function(content)
{
	// If the editor element is set
	if(WebDeveloper.Dashboard.editorElement)
	{
		WebDeveloper.Dashboard.editor.setValue(content);
	}
	else
	{
		WebDeveloper.Dashboard.editor.val(content);
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
