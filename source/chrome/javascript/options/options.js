var WebDeveloper = WebDeveloper || {};

WebDeveloper.Options								= WebDeveloper.Options || {};
WebDeveloper.Options.animationSpeed = 100;

$(function()
{
	var option = WebDeveloper.Storage.getItem("option");

	WebDeveloper.Options.initialize();

	// If the option is set
	if(option)
	{
		$("a", $("#" + option)).tab("show");
	}

	$("li", $(".nav-tabs")).on("click", WebDeveloper.Options.changeTab);
});

// Closes the option
WebDeveloper.Options.closeOption = function(options, form, clearCallback)
{
	form.slideUp(WebDeveloper.Options.animationSpeed, function()
	{
		$(".table-container", options).slideDown(WebDeveloper.Options.animationSpeed);

		clearCallback();

		form.removeData("position");
	});
};

// Closes the resize option
WebDeveloper.Options.closeResizeOption = function()
{
	var resizeOptions	= $("#resize-options");

	WebDeveloper.Options.closeOption(resizeOptions, $("form", resizeOptions), function()
	{
		$("#resize-description").val("");
		$("#resize-width").val("");
		$("#resize-height").val("");
	});
};

// Closes the responsive layout
WebDeveloper.Options.closeResponsiveLayout = function()
{
	var responsiveLayoutOptions = $("#responsive-layouts-options");

	WebDeveloper.Options.closeOption(responsiveLayoutOptions, $("form", responsiveLayoutOptions), function()
	{
		$("#responsive-layout-description").val("");
		$("#responsive-layout-width").val("");
		$("#responsive-layout-height").val("");
	});
};

// Closes the tool
WebDeveloper.Options.closeTool = function()
{
	var toolOptions = $("#tools-options");

	WebDeveloper.Options.closeOption(toolOptions, $("form", toolOptions), function()
	{
		$("#tool-description").val("");
		$("#tool-url").val("");
	});
};

// Handles a tab change
WebDeveloper.Options.changeTab = function()
{
	chrome.extension.getBackgroundPage().WebDeveloper.Storage.setItem("option", $(this).attr("id"));
};

// Deletes an option
WebDeveloper.Options.deleteOption = function(option, title, confirmation, updateCallback)
{
	var deleteDialog = $("#delete-dialog");

	$("h3", deleteDialog).html(title);
	$("p", deleteDialog).html(confirmation);

	$(".btn-danger", deleteDialog).off("click").on("click", function()
	{
		option.remove();
		deleteDialog.modal("hide");
		updateCallback();
	});

	deleteDialog.modal("show");
};

// Deletes a resize option
WebDeveloper.Options.deleteResizeOption = function()
{
	var resizeOption = $(this).closest("tr");

	WebDeveloper.Options.deleteOption(resizeOption, WebDeveloper.Locales.getString("deleteResizeOption"), WebDeveloper.Locales.getSubstitutedString("deleteResizeOptionConfirmation", [$("td:eq(0)", resizeOption).html()]), WebDeveloper.Options.updateResizeOptions);
};

// Deletes a responsive layout
WebDeveloper.Options.deleteResponsiveLayout = function()
{
	var responsiveLayout = $(this).closest("tr");

	WebDeveloper.Options.deleteOption(responsiveLayout, WebDeveloper.Locales.getString("deleteResponsiveLayout"), WebDeveloper.Locales.getSubstitutedString("deleteResponsiveLayoutConfirmation", [$("td:eq(0)", responsiveLayout).html()]), WebDeveloper.Options.updateResponsiveLayouts);
};

// Deletes a tool
WebDeveloper.Options.deleteTool = function()
{
	var tool = $(this).closest("tr");

	WebDeveloper.Options.deleteOption(tool, WebDeveloper.Locales.getString("deleteTool"), WebDeveloper.Locales.getSubstitutedString("deleteToolConfirmation", [$("td:eq(0)", tool).html()]), WebDeveloper.Options.updateTools);
};

// Displays the option form
WebDeveloper.Options.displayOptionForm = function(options, add, edit)
{
	// If in edit mode
	if($("form", options).data("position"))
	{
		$("legend", options).html(edit);
	}
	else
	{
		$("legend", options).html(add);
	}

	$(".table-container", options).slideUp(WebDeveloper.Options.animationSpeed, function()
	{
		$("form", options).slideDown(WebDeveloper.Options.animationSpeed);
	});
};

// Displays the resize option form
WebDeveloper.Options.displayResizeOptionForm = function()
{
	WebDeveloper.Options.displayOptionForm($("#resize-options"), WebDeveloper.Locales.getString("addResizeOption"), WebDeveloper.Locales.getString("editResizeOption"));
};

// Displays the responsive layout form
WebDeveloper.Options.displayResponsiveLayoutForm = function()
{
	WebDeveloper.Options.displayOptionForm($("#responsive-layouts-options"), WebDeveloper.Locales.getString("addResponsiveLayout"), WebDeveloper.Locales.getString("editResponsiveLayout"));
};

// Displays the tool form
WebDeveloper.Options.displayToolForm = function()
{
	WebDeveloper.Options.displayOptionForm($("#tools-options"), WebDeveloper.Locales.getString("addTool"), WebDeveloper.Locales.getString("editTool"));
};

// Edits a resize option
WebDeveloper.Options.editResizeOption = function()
{
	var resizeOptionPosition = $(this).closest("tr").prevAll().length + 1;

	$("#resize-description").val(WebDeveloper.Storage.getItem("resize_" + resizeOptionPosition + "_description"));
	$("#resize-width").val(WebDeveloper.Storage.getItem("resize_" + resizeOptionPosition + "_width"));
	$("#resize-height").val(WebDeveloper.Storage.getItem("resize_" + resizeOptionPosition + "_height"));

	$("form", $("#resize-options")).data("position", resizeOptionPosition);

	WebDeveloper.Options.displayResizeOptionForm();
};

// Edits a responsive layout
WebDeveloper.Options.editResponsiveLayout = function()
{
	var responsiveLayoutPosition = $(this).closest("tr").prevAll().length + 1;

	$("#responsive-layout-description").val(WebDeveloper.Storage.getItem("responsive_layout_" + responsiveLayoutPosition + "_description"));
	$("#responsive-layout-width").val(WebDeveloper.Storage.getItem("responsive_layout_" + responsiveLayoutPosition + "_width"));
	$("#responsive-layout-height").val(WebDeveloper.Storage.getItem("responsive_layout_" + responsiveLayoutPosition + "_height"));

	$("form", $("#responsive-layouts-options")).data("position", responsiveLayoutPosition);

	WebDeveloper.Options.displayResponsiveLayoutForm();
};

// Edits a tool
WebDeveloper.Options.editTool = function()
{
	var toolPosition = $(this).closest("tr").prevAll().length + 1;

	$("#tool-description").val(WebDeveloper.Storage.getItem("tool_" + toolPosition + "_description"));
	$("#tool-url").val(WebDeveloper.Storage.getItem("tool_" + toolPosition + "_url"));

	$("form", $("#tools-options")).data("position", toolPosition);

	WebDeveloper.Options.displayToolForm();
};

// Initializes the options
WebDeveloper.Options.initialize = function()
{
	WebDeveloper.Options.localize();
	WebDeveloper.Options.initializeColorsTab();
	WebDeveloper.Options.initializeResizeTab();
	WebDeveloper.Options.initializeResponsiveLayoutsTab();
	WebDeveloper.Options.initializeToolsTab();
	WebDeveloper.Options.initializeAdvancedTab();
};

// Initializes the advanced tab
WebDeveloper.Options.initializeAdvancedTab = function()
{
	$("#populate_email_address").val(WebDeveloper.Storage.getItem("populate_email_address")).on("change", WebDeveloper.Options.updatePopulateEmailAddress);
};

// Initializes the colors tab
WebDeveloper.Options.initializeColorsTab = function()
{
	$("#syntax_highlight_theme").val(WebDeveloper.Storage.getItem("syntax_highlight_theme")).on("change", WebDeveloper.Options.updateSyntaxHighlightTheme);
	$("#syntax-highlight-browser").on("load", WebDeveloper.Options.updateSyntaxHighlightTheme);
};

// Initializes the resize tab
WebDeveloper.Options.initializeResizeTab = function()
{
	var description				 = null;
	var height						 = 0;
	var resizeOption			 = null;
	var resizeOptionCount  = WebDeveloper.Storage.getItem("resize_count");
	var resizeOptions			 = $("#resize-options");
	var resizeOptionsTable = $("tbody", resizeOptions);
	var width							 = 0;

	resizeOptionsTable.empty();

	// Loop through the resize options
	for(var i = 1, l = resizeOptionCount; i <= l; i++)
	{
		description = WebDeveloper.Storage.getItem("resize_" + i + "_description");
		height			= WebDeveloper.Storage.getItem("resize_" + i + "_height");
		width				= WebDeveloper.Storage.getItem("resize_" + i + "_width");

		// If the description, height and width are set
		if(description && height > 0 && width > 0)
		{
			resizeOption = {};

			resizeOption.description = description;
			resizeOption.height			 = height;
			resizeOption.width			 = width;

			resizeOptionsTable.append(ich.resize_option(resizeOption));
		}
	}

	// If there is only one resize option
	if(resizeOptionCount == 1)
	{
		resizeOptionsTable.addClass("single");
	}

	$(".btn-danger", resizeOptionsTable).html(WebDeveloper.Locales.getString("deleteConfirmation"));
	$(".btn-primary", resizeOptionsTable).html(WebDeveloper.Locales.getString("edit"));

	resizeOptionsTable.on("click", ".btn-danger", WebDeveloper.Options.deleteResizeOption);
	resizeOptionsTable.on("click", ".btn-primary", WebDeveloper.Options.editResizeOption);
	$("table", resizeOptions).tableDnD({ "onDragStart": WebDeveloper.Options.tableDragStart, "onDrop": WebDeveloper.Options.updateResizeOptions });
	$(".table-container > .btn-primary", resizeOptions).on("click", WebDeveloper.Options.displayResizeOptionForm);

	$("form", resizeOptions).on("submit", function(event) { event.preventDefault(); });
	$("#resize-cancel").on("click", WebDeveloper.Options.closeResizeOption);
	$("#resize-save").on("click", WebDeveloper.Options.saveResizeOption);
};

// Initializes the responsive layouts tab
WebDeveloper.Options.initializeResponsiveLayoutsTab = function()
{
	var description						 = null;
	var height								 = 0;
	var responsiveLayout			 = null;
	var responsiveLayoutsCount = WebDeveloper.Storage.getItem("responsive_layout_count");
	var responsiveLayouts			 = $("#responsive-layouts-options");
	var responsiveLayoutsTable = $("tbody", responsiveLayouts);
	var width									 = 0;

	responsiveLayoutsTable.empty();

	// Loop through the responsive layouts
	for(var i = 1, l = responsiveLayoutsCount; i <= l; i++)
	{
		description = WebDeveloper.Storage.getItem("responsive_layout_" + i + "_description");
		height			= WebDeveloper.Storage.getItem("responsive_layout_" + i + "_height");
		width				= WebDeveloper.Storage.getItem("responsive_layout_" + i + "_width");

		// If the description, height and width are set
		if(description && height > 0 && width > 0)
		{
			responsiveLayout = {};

			responsiveLayout.description = description;
			responsiveLayout.height			 = height;
			responsiveLayout.width			 = width;

			responsiveLayoutsTable.append(ich.responsive_layout(responsiveLayout));
		}
	}

	// If there is only one responsive layout
	if(responsiveLayoutsCount == 1)
	{
		responsiveLayoutsTable.addClass("single");
	}

	$(".btn-danger", responsiveLayoutsTable).html(WebDeveloper.Locales.getString("deleteConfirmation"));
	$(".btn-primary", responsiveLayoutsTable).html(WebDeveloper.Locales.getString("edit"));

	responsiveLayoutsTable.on("click", ".btn-danger", WebDeveloper.Options.deleteResponsiveLayout);
	responsiveLayoutsTable.on("click", ".btn-primary", WebDeveloper.Options.editResponsiveLayout);
	$("table", responsiveLayouts).tableDnD({ "onDragStart": WebDeveloper.Options.tableDragStart, "onDrop": WebDeveloper.Options.updateResponsiveLayouts });
	$(".table-container > .btn-primary", responsiveLayouts).on("click", WebDeveloper.Options.displayResponsiveLayoutForm);

	$("form", responsiveLayouts).on("submit", function(event) { event.preventDefault(); });
	$("#responsive-layout-cancel").on("click", WebDeveloper.Options.closeResponsiveLayout);
	$("#responsive-layout-save").on("click", WebDeveloper.Options.saveResponsiveLayout);
};

// Initializes the tools tab
WebDeveloper.Options.initializeToolsTab = function()
{
	var description	= null;
	var tool				= null;
	var toolsCount	= WebDeveloper.Storage.getItem("tool_count");
	var tools				= $("#tools-options");
	var toolsTable	= $("tbody", tools);
	var url					= null;

	toolsTable.empty();

	// Loop through the tools
	for(var i = 1, l = toolsCount; i <= l; i++)
	{
		description = WebDeveloper.Storage.getItem("tool_" + i + "_description");
		url					= WebDeveloper.Storage.getItem("tool_" + i + "_url");

		// If the description and url are set
		if(description && url)
		{
			tool = {};

			tool.description = description;
			tool.url				 = url;

			toolsTable.append(ich.tool(tool));
		}
	}

	// If there is only one tool
	if(toolsCount == 1)
	{
		toolsCount.addClass("single");
	}

	$(".btn-danger", toolsTable).html(WebDeveloper.Locales.getString("deleteConfirmation"));
	$(".btn-primary", toolsTable).html(WebDeveloper.Locales.getString("edit"));

	toolsTable.on("click", ".btn-danger", WebDeveloper.Options.deleteTool);
	toolsTable.on("click", ".btn-primary", WebDeveloper.Options.editTool);
	$("table", tools).tableDnD({ "onDragStart": WebDeveloper.Options.tableDragStart, "onDrop": WebDeveloper.Options.updateTools });
	$(".table-container > .btn-primary", tools).on("click", WebDeveloper.Options.displayToolForm);

	$("form", tools).on("submit", function(event) { event.preventDefault(); });
	$("#tool-cancel").on("click", WebDeveloper.Options.closeTool);
	$("#tool-save").on("click", WebDeveloper.Options.saveTool);
};

// Localizes the options
WebDeveloper.Options.localize = function()
{
	var deleteDialog = $("#delete-dialog");

	$("title").html(WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("options"));
	$("a.brand", $(".navbar")).html(WebDeveloper.Locales.getString("options"));

	$("a", $("#colors-tab")).append(WebDeveloper.Locales.getString("colors"));
	$("a", $("#resize-tab")).append(WebDeveloper.Locales.getString("resize"));
	$("a", $("#responsive-layouts-tab")).append(WebDeveloper.Locales.getString("responsive"));
	$("a", $("#tools-tab")).append(WebDeveloper.Locales.getString("tools"));
	$("a", $("#advanced-tab")).append(WebDeveloper.Locales.getString("advanced"));

	$(".btn-danger", deleteDialog).html(WebDeveloper.Locales.getString("delete"));
	$('button[data-dismiss="modal"]', deleteDialog).html(WebDeveloper.Locales.getString("cancel"));

	WebDeveloper.Options.localizeColorsTab();
	WebDeveloper.Options.localizeResizeTab();
	WebDeveloper.Options.localizeResponsiveLayoutsTab();
	WebDeveloper.Options.localizeToolsTab();
	WebDeveloper.Options.localizeAdvancedTab();
};

// Localizes the advanced tab
WebDeveloper.Options.localizeAdvancedTab = function()
{
	$('[for="populate_email_address"]').html(WebDeveloper.Locales.getString("populateEmailAddress"));
};

// Localizes the colors tab
WebDeveloper.Options.localizeColorsTab = function()
{
	$('[for="syntax_highlight_theme"]').html(WebDeveloper.Locales.getString("theme"));

	$('[value="dark"]').html(WebDeveloper.Locales.getString("dark"));
	$('[value="light"]').html(WebDeveloper.Locales.getString("light"));
	$('[value="none"]').html(WebDeveloper.Locales.getString("none"));

	$("p", $("#colors-options")).html(WebDeveloper.Locales.getString("preview"));
};

// Localizes the resize tab
WebDeveloper.Options.localizeResizeTab = function()
{
	var resizeOptions = $("#resize-options");

	$("th:eq(0)", resizeOptions).html(WebDeveloper.Locales.getString("description"));
	$("th:eq(1)", resizeOptions).html(WebDeveloper.Locales.getString("width"));
	$("th:eq(2)", resizeOptions).html(WebDeveloper.Locales.getString("height"));
	$("th:eq(3)", resizeOptions).html(WebDeveloper.Locales.getString("keyboard"));
	$("th:eq(4)", resizeOptions).html(WebDeveloper.Locales.getString("actions"));

	$(".muted", resizeOptions).html(WebDeveloper.Locales.getString("dragDropReorder"));
	$(".table-container > .btn-primary", resizeOptions).html(WebDeveloper.Locales.getString("add"));

	$('[for="resize-description"]').html(WebDeveloper.Locales.getString("description"));
	$("#resize-description").attr("placeholder", WebDeveloper.Locales.getString("descriptionPlaceholder"));
	$('[for="resize-width"]').html(WebDeveloper.Locales.getString("width"));
	$("#resize-width").attr("placeholder", WebDeveloper.Locales.getString("widthPlaceholder"));
	$('[for="resize-height"]').html(WebDeveloper.Locales.getString("height"));
	$("#resize-height").attr("placeholder", WebDeveloper.Locales.getString("heightPlaceholder"));
	$("#resize-cancel").append(WebDeveloper.Locales.getString("cancel"));
	$("#resize-save").append(WebDeveloper.Locales.getString("save"));
};

// Localizes the responsive layouts tab
WebDeveloper.Options.localizeResponsiveLayoutsTab = function()
{
	var responsiveLayouts = $("#responsive-layouts-options");

	$("th:eq(0)", responsiveLayouts).html(WebDeveloper.Locales.getString("description"));
	$("th:eq(1)", responsiveLayouts).html(WebDeveloper.Locales.getString("width"));
	$("th:eq(2)", responsiveLayouts).html(WebDeveloper.Locales.getString("height"));
	$("th:eq(3)", responsiveLayouts).html(WebDeveloper.Locales.getString("actions"));

	$(".muted", responsiveLayouts).html(WebDeveloper.Locales.getString("dragDropReorder"));
	$(".table-container > .btn-primary", responsiveLayouts).html(WebDeveloper.Locales.getString("add"));

	$('[for="responsive-layout-description"]').html(WebDeveloper.Locales.getString("description"));
	$("#responsive-layout-description").attr("placeholder", WebDeveloper.Locales.getString("descriptionPlaceholder"));
	$('[for="responsive-layout-width"]').html(WebDeveloper.Locales.getString("width"));
	$("#responsive-layout-width").attr("placeholder", WebDeveloper.Locales.getString("widthPlaceholder"));
	$('[for="responsive-layout-height"]').html(WebDeveloper.Locales.getString("height"));
	$("#responsive-layout-height").attr("placeholder", WebDeveloper.Locales.getString("heightPlaceholder"));
	$("#responsive-layout-cancel").append(WebDeveloper.Locales.getString("cancel"));
	$("#responsive-layout-save").append(WebDeveloper.Locales.getString("save"));
};

// Localizes the tools tab
WebDeveloper.Options.localizeToolsTab = function()
{
	var tools = $("#tools-options");

	$("th:eq(0)", tools).html(WebDeveloper.Locales.getString("description"));
	$("th:eq(1)", tools).html(WebDeveloper.Locales.getString("url"));
	$("th:eq(2)", tools).html(WebDeveloper.Locales.getString("keyboard"));
	$("th:eq(3)", tools).html(WebDeveloper.Locales.getString("actions"));

	$(".muted", tools).html(WebDeveloper.Locales.getString("dragDropReorder"));
	$(".table-container > .btn-primary", tools).html(WebDeveloper.Locales.getString("add"));

	$('[for="tool-description"]').html(WebDeveloper.Locales.getString("description"));
	$("#tool-description").attr("placeholder", WebDeveloper.Locales.getString("descriptionPlaceholder"));
	$('[for="tool-url"]').html(WebDeveloper.Locales.getString("url"));
	$("#tool-url").attr("placeholder", WebDeveloper.Locales.getString("urlPlaceholder"));
	$("#tool-cancel").append(WebDeveloper.Locales.getString("cancel"));
	$("#tool-save").append(WebDeveloper.Locales.getString("save"));
};

// Saves the option
WebDeveloper.Options.saveOption = function(option, options, position)
{
	// If the position is set
	if(position)
	{
		$("tbody > tr:eq(" + (position - 1) + ")", options).replaceWith(option);
	}
	else
	{
		$("tbody", options).append(option);
	}
};

// Saves the resize option
WebDeveloper.Options.saveResizeOption = function()
{
	var resizeOption	= {};
	var resizeOptions = $("#resize-options");

	resizeOption.description = $("#resize-description").val();
	resizeOption.height			 = $("#resize-height").val();
	resizeOption.width			 = $("#resize-width").val();

	WebDeveloper.Options.saveOption(ich.resize_option(resizeOption), resizeOptions, $("form", resizeOptions).data("position"));

	WebDeveloper.Options.updateResizeOptions();
	WebDeveloper.Options.closeResizeOption();
};

// Saves the responsive layout
WebDeveloper.Options.saveResponsiveLayout = function()
{
	var responsiveLayout	= {};
	var responsiveLayouts = $("#responsive-layouts-options");

	responsiveLayout.description = $("#responsive-layout-description").val();
	responsiveLayout.height			 = $("#responsive-layout-height").val();
	responsiveLayout.width			 = $("#responsive-layout-width").val();

	WebDeveloper.Options.saveOption(ich.responsive_layout(responsiveLayout), responsiveLayouts, $("form", responsiveLayouts).data("position"));

	WebDeveloper.Options.updateResponsiveLayouts();
	WebDeveloper.Options.closeResponsiveLayout();
};

// Saves the tool
WebDeveloper.Options.saveTool = function()
{
	var tool	= {};
	var tools = $("#tools-options");

	tool.description = $("#tool-description").val();
	tool.url				 = $("#tool-url").val();

	WebDeveloper.Options.saveOption(ich.tool(tool), tools, $("form", tools).data("position"));

	WebDeveloper.Options.updateTools();
	WebDeveloper.Options.closeTool();
};

// Handles a table drag starting
WebDeveloper.Options.tableDragStart = function(table, row)
{
	$(table).removeClass("table-striped");
};

// Updates the populate email address
WebDeveloper.Options.updatePopulateEmailAddress = function()
{
	WebDeveloper.Storage.setItem("populate_email_address", $("#populate_email_address").val());
};

// Updates the resize options
WebDeveloper.Options.updateResizeOptions = function(table, row)
{
	var position			= 0;
	var resizeOption	= null;
	var resizeTab			= $("#resize-options");
	var resizeTable		= $("tbody", resizeTab);
	var resizeOptions	= $("tr", resizeTable);
	var resizeCount		= resizeOptions.length;

	// Loop through the resize preferences
	for(var i = 1, l = WebDeveloper.Storage.getItem("resize_count"); i <= l; i++)
	{
		WebDeveloper.Storage.removeItem("resize_" + i + "_description");
		WebDeveloper.Storage.removeItem("resize_" + i + "_height");
		WebDeveloper.Storage.removeItem("resize_" + i + "_width");
	}

	// Loop through the resize options
	for(i = 0; i < resizeCount; i++)
	{
		position		 = i + 1;
		resizeOption = resizeOptions.eq(i);

		WebDeveloper.Storage.setItem("resize_" + position + "_description", $("td:eq(0)", resizeOption).text());
		WebDeveloper.Storage.setItem("resize_" + position + "_width", $("td:eq(1)", resizeOption).text());
		WebDeveloper.Storage.setItem("resize_" + position + "_height", $("td:eq(2)", resizeOption).text());
	}

	WebDeveloper.Storage.setItem("resize_count", resizeCount);

	// If the table is set
	if(table)
	{
		$(table).addClass("table-striped");
	}
	else
	{
		$("table", resizeTab).tableDnD({ "onDragStart": WebDeveloper.Options.tableDragStart, "onDrop": WebDeveloper.Options.updateResizeOptions });
	}

	$(".btn-danger", resizeTable).html(WebDeveloper.Locales.getString("deleteConfirmation"));
	$(".btn-primary", resizeTable).html(WebDeveloper.Locales.getString("edit"));

	// If there is only one resize option
	if(resizeCount == 1)
	{
		resizeTable.addClass("single");
	}
	else
	{
		resizeTable.removeClass("single");
	}
};

// Updates the responsive layouts
WebDeveloper.Options.updateResponsiveLayouts = function(table, row)
{
	var position							 = 0;
	var responsiveLayout			 = null;
	var responsiveLayoutsTab	 = $("#responsive-layouts-options");
	var responsiveLayoutsTable = $("tbody", responsiveLayoutsTab);
	var responsiveLayouts			 = $("tr", responsiveLayoutsTable);
	var responsiveLayoutsCount = responsiveLayouts.length;

	// Loop through the responsive layouts preferences
	for(var i = 1, l = WebDeveloper.Storage.getItem("responsive_layout_count"); i <= l; i++)
	{
		WebDeveloper.Storage.removeItem("responsive_layout_" + i + "_description");
		WebDeveloper.Storage.removeItem("responsive_layout_" + i + "_height");
		WebDeveloper.Storage.removeItem("responsive_layout_" + i + "_width");
	}

	// Loop through the responsive layouts
	for(i = 0; i < responsiveLayoutsCount; i++)
	{
		position				 = i + 1;
		responsiveLayout = responsiveLayouts.eq(i);

		WebDeveloper.Storage.setItem("responsive_layout_" + position + "_description", $("td:eq(0)", responsiveLayout).text());
		WebDeveloper.Storage.setItem("responsive_layout_" + position + "_width", $("td:eq(1)", responsiveLayout).text());
		WebDeveloper.Storage.setItem("responsive_layout_" + position + "_height", $("td:eq(2)", responsiveLayout).text());
	}

	WebDeveloper.Storage.setItem("responsive_layout_count", responsiveLayoutsCount);

	// If the table is set
	if(table)
	{
		$(table).addClass("table-striped");
	}
	else
	{
		$("table", responsiveLayoutsTab).tableDnD({ "onDragStart": WebDeveloper.Options.tableDragStart, "onDrop": WebDeveloper.Options.updateResponsiveLayouts });
	}

	$(".btn-danger", responsiveLayoutsTable).html(WebDeveloper.Locales.getString("deleteConfirmation"));
	$(".btn-primary", responsiveLayoutsTable).html(WebDeveloper.Locales.getString("edit"));

	// If there is only one resize option
	if(responsiveLayoutsCount == 1)
	{
		responsiveLayoutsTable.addClass("single");
	}
	else
	{
		responsiveLayoutsTable.removeClass("single");
	}
};

// Updates the syntax highlight theme
WebDeveloper.Options.updateSyntaxHighlightTheme = function()
{
	var theme = $("#syntax_highlight_theme").val();

	$("#syntax-highlight-browser").get(0).contentDocument.defaultView.WebDeveloper.setTheme(theme);
	WebDeveloper.Storage.setItem("syntax_highlight_theme", theme);
};

// Updates the tools
WebDeveloper.Options.updateTools = function(table, row)
{
	var position	 = 0;
	var tool			 = null;
	var toolsTab	 = $("#tools-options");
	var toolsTable = $("tbody", toolsTab);
	var tools			 = $("tr", toolsTable);
	var toolsCount = tools.length;

	// Loop through the tools preferences
	for(var i = 1, l = WebDeveloper.Storage.getItem("tool_count"); i <= l; i++)
	{
		WebDeveloper.Storage.removeItem("tool_" + i + "_description");
		WebDeveloper.Storage.removeItem("tool_" + i + "_url");
	}

	// Loop through the tools
	for(i = 0; i < toolsCount; i++)
	{
		position = i + 1;
		tool		 = toolsCount.eq(i);

		WebDeveloper.Storage.setItem("tool_" + position + "_description", $("td:eq(0)", tool).text());
		WebDeveloper.Storage.setItem("tool_" + position + "_url", $("td:eq(1)", tool).text());
	}

	WebDeveloper.Storage.setItem("tool_count", toolsCount);

	// If the table is set
	if(table)
	{
		$(table).addClass("table-striped");
	}
	else
	{
		$("table", toolsTab).tableDnD({ "onDragStart": WebDeveloper.Options.tableDragStart, "onDrop": WebDeveloper.Options.updateTools });
	}

	$(".btn-danger", toolsTable).html(WebDeveloper.Locales.getString("deleteConfirmation"));
	$(".btn-primary", toolsTable).html(WebDeveloper.Locales.getString("edit"));

	// If there is only one resize option
	if(toolsCount == 1)
	{
		toolsTable.addClass("single");
	}
	else
	{
		toolsTable.removeClass("single");
	}
};
