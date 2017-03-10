var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Options                = WebDeveloper.Options || {};
WebDeveloper.Options.animationSpeed = 100;

$(function()
{
  var hash   = window.location.hash;
  var option = WebDeveloper.Storage.getItem("option");

  WebDeveloper.Options.initialize();

  // If the hash is set
  if(hash)
  {
    $("a", $(hash)).tab("show");
    WebDeveloper.Storage.setItem("option", hash);
  }
  else if(option)
  {
    $("a", $("#" + option)).tab("show");
  }

  $("li", $(".nav-tabs")).on("click", WebDeveloper.Options.changeTab);
});

// Handles a tab change
WebDeveloper.Options.changeTab = function()
{
  WebDeveloper.Storage.setItem("option", $(this).attr("id"));
};

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
  var resizeOptions = $("#resize-options");

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

// Deletes an option
WebDeveloper.Options.deleteOption = function(option, title, confirmation, updateCallback)
{
  var deleteDialog = $("#delete-dialog");

  $("h4", deleteDialog).text(title);
  $("p", deleteDialog).text(confirmation);

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

  WebDeveloper.Options.deleteOption(resizeOption, WebDeveloper.Locales.getString("deleteResizeOption"), WebDeveloper.Locales.getFormattedString("deleteResizeOptionConfirmation", [$("td:eq(0)", resizeOption).text()]), WebDeveloper.Options.updateResizeOptions);
};

// Deletes a responsive layout
WebDeveloper.Options.deleteResponsiveLayout = function()
{
  var responsiveLayout = $(this).closest("tr");

  WebDeveloper.Options.deleteOption(responsiveLayout, WebDeveloper.Locales.getString("deleteResponsiveLayout"), WebDeveloper.Locales.getFormattedString("deleteResponsiveLayoutConfirmation", [$("td:eq(0)", responsiveLayout).text()]), WebDeveloper.Options.updateResponsiveLayouts);
};

// Deletes a tool
WebDeveloper.Options.deleteTool = function()
{
  var tool = $(this).closest("tr");

  WebDeveloper.Options.deleteOption(tool, WebDeveloper.Locales.getString("deleteTool"), WebDeveloper.Locales.getFormattedString("deleteToolConfirmation", [$("td:eq(0)", tool).text()]), WebDeveloper.Options.updateTools);
};

// Displays the option form
WebDeveloper.Options.displayOptionForm = function(options, addTitle, addLabel, editTitle, editLabel)
{
  // If in edit mode
  if($("form", options).data("position"))
  {
    $("legend", options).text(editTitle);
    $("form .btn-primary > span", options).text(editLabel);
  }
  else
  {
    $("legend", options).text(addTitle);
    $("form .btn-primary > span", options).text(addLabel);
  }

  $(".table-container", options).slideUp(WebDeveloper.Options.animationSpeed, function()
  {
    $("form", options).slideDown(WebDeveloper.Options.animationSpeed);
  });
};

// Displays the resize option form
WebDeveloper.Options.displayResizeOptionForm = function()
{
  var resizeOptions = $("#resize-options");

  WebDeveloper.Options.resetOptionForm($("#resize-form"));
  WebDeveloper.Options.displayOptionForm(resizeOptions, WebDeveloper.Locales.getString("addResizeOption"), WebDeveloper.Locales.getString("add"), WebDeveloper.Locales.getString("editResizeOption"), WebDeveloper.Locales.getString("save"));
};

// Displays the responsive layout form
WebDeveloper.Options.displayResponsiveLayoutForm = function()
{
  var responsiveLayoutsOptions = $("#responsive-layouts-options");

  WebDeveloper.Options.resetOptionForm($("#responsive-layout-form"));
  WebDeveloper.Options.displayOptionForm(responsiveLayoutsOptions, WebDeveloper.Locales.getString("addResponsiveLayout"), WebDeveloper.Locales.getString("add"), WebDeveloper.Locales.getString("editResponsiveLayout"), WebDeveloper.Locales.getString("save"));
};

// Displays the tool form
WebDeveloper.Options.displayToolForm = function()
{
  var toolsOptions = $("#tools-options");

  WebDeveloper.Options.resetOptionForm($("#tool-form"));
  WebDeveloper.Options.displayOptionForm(toolsOptions, WebDeveloper.Locales.getString("addTool"), WebDeveloper.Locales.getString("add"), WebDeveloper.Locales.getString("editTool"), WebDeveloper.Locales.getString("save"));
};

// Edits a resize option
WebDeveloper.Options.editResizeOption = function()
{
  var resizeOptionPosition = $(this).closest("tr").prevAll().length + 1;

  $("#resize-description").val(WebDeveloper.Storage.getItem("resize_" + resizeOptionPosition + "_description"));
  $("#resize-width").val(WebDeveloper.Storage.getItem("resize_" + resizeOptionPosition + "_width"));
  $("#resize-height").val(WebDeveloper.Storage.getItem("resize_" + resizeOptionPosition + "_height"));

  $("#resize-form").data("position", resizeOptionPosition);

  WebDeveloper.Options.displayResizeOptionForm();
};

// Edits a responsive layout
WebDeveloper.Options.editResponsiveLayout = function()
{
  var responsiveLayoutPosition = $(this).closest("tr").prevAll().length + 1;

  $("#responsive-layout-description").val(WebDeveloper.Storage.getItem("responsive_layout_" + responsiveLayoutPosition + "_description"));
  $("#responsive-layout-width").val(WebDeveloper.Storage.getItem("responsive_layout_" + responsiveLayoutPosition + "_width"));
  $("#responsive-layout-height").val(WebDeveloper.Storage.getItem("responsive_layout_" + responsiveLayoutPosition + "_height"));

  $("#responsive-layout-form").data("position", responsiveLayoutPosition);

  WebDeveloper.Options.displayResponsiveLayoutForm();
};

// Edits a tool
WebDeveloper.Options.editTool = function()
{
  var toolPosition = $(this).closest("tr").prevAll().length + 1;

  $("#tool-description").val(WebDeveloper.Storage.getItem("tool_" + toolPosition + "_description"));
  $("#tool-url").val(WebDeveloper.Storage.getItem("tool_" + toolPosition + "_url"));

  $("#tool-form").data("position", toolPosition);

  WebDeveloper.Options.displayToolForm();
};

// Initializes the options
WebDeveloper.Options.initialize = function()
{
  WebDeveloper.Options.localize();
  WebDeveloper.Options.initializeColorsTab();
  WebDeveloper.Options.initializeGeneralTab();
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

// Initializes the general tab
WebDeveloper.Options.initializeGeneralTab = function()
{
  $("#display_overlay_with").val(WebDeveloper.Storage.getItem("display_overlay_with")).on("change", WebDeveloper.Options.updateDisplayOverlayWith);
};

// Initializes the resize tab
WebDeveloper.Options.initializeResizeTab = function()
{
  var description        = null;
  var height             = 0;
  var resizeOption       = null;
  var resizeOptionCount  = WebDeveloper.Storage.getItem("resize_count");
  var resizeOptions      = $("#resize-options");
  var resizeOptionsTable = $("tbody", resizeOptions);
  var width              = 0;

  resizeOptionsTable.empty();

  // Loop through the resize options
  for(var i = 1, l = resizeOptionCount; i <= l; i++)
  {
    description = WebDeveloper.Storage.getItem("resize_" + i + "_description");
    height      = WebDeveloper.Storage.getItem("resize_" + i + "_height");
    width       = WebDeveloper.Storage.getItem("resize_" + i + "_width");

    // If the description, height and width are set
    if(description && height > 0 && width > 0)
    {
      resizeOption = {};

      resizeOption.description = description;
      resizeOption.height      = height;
      resizeOption.width       = width;

      resizeOptionsTable.append(ich.resizeOption(resizeOption));
    }
  }

  // If there is only one resize option
  if(resizeOptionCount == 1)
  {
    resizeOptionsTable.addClass("single");
  }

  $(".btn-danger > span", resizeOptionsTable).text(WebDeveloper.Locales.getString("deleteConfirmation"));
  $(".btn-primary > span", resizeOptionsTable).text(WebDeveloper.Locales.getString("edit"));

  resizeOptionsTable.on("click", ".btn-danger", WebDeveloper.Options.deleteResizeOption);
  resizeOptionsTable.on("click", ".btn-primary", WebDeveloper.Options.editResizeOption);
  $("table", resizeOptions).tableDnD({ onDragStart: WebDeveloper.Options.tableDragStart, onDrop: WebDeveloper.Options.updateResizeOptions });
  $(".table-container > .btn-primary", resizeOptions).on("click", WebDeveloper.Options.displayResizeOptionForm);

  $("#resize-cancel").on("click", WebDeveloper.Options.closeResizeOption);
  $("#resize-form").on("submit", function(event) { event.preventDefault(); });
  $("#resize-submit").on("click", WebDeveloper.Options.submitResizeOption);
};

// Initializes the responsive layouts tab
WebDeveloper.Options.initializeResponsiveLayoutsTab = function()
{
  var description            = null;
  var height                 = 0;
  var responsiveLayout       = null;
  var responsiveLayoutsCount = WebDeveloper.Storage.getItem("responsive_layout_count");
  var responsiveLayouts      = $("#responsive-layouts-options");
  var responsiveLayoutsTable = $("tbody", responsiveLayouts);
  var width                  = 0;

  responsiveLayoutsTable.empty();

  // Loop through the responsive layouts
  for(var i = 1, l = responsiveLayoutsCount; i <= l; i++)
  {
    description = WebDeveloper.Storage.getItem("responsive_layout_" + i + "_description");
    height      = WebDeveloper.Storage.getItem("responsive_layout_" + i + "_height");
    width       = WebDeveloper.Storage.getItem("responsive_layout_" + i + "_width");

    // If the description, height and width are set
    if(description && height > 0 && width > 0)
    {
      responsiveLayout = {};

      responsiveLayout.description = description;
      responsiveLayout.height      = height;
      responsiveLayout.width       = width;

      responsiveLayoutsTable.append(ich.responsiveLayout(responsiveLayout));
    }
  }

  // If there is only one responsive layout
  if(responsiveLayoutsCount == 1)
  {
    responsiveLayoutsTable.addClass("single");
  }

  $(".btn-danger > span", responsiveLayoutsTable).text(WebDeveloper.Locales.getString("deleteConfirmation"));
  $(".btn-primary > span", responsiveLayoutsTable).text(WebDeveloper.Locales.getString("edit"));

  responsiveLayoutsTable.on("click", ".btn-danger", WebDeveloper.Options.deleteResponsiveLayout);
  responsiveLayoutsTable.on("click", ".btn-primary", WebDeveloper.Options.editResponsiveLayout);
  $("table", responsiveLayouts).tableDnD({ onDragStart: WebDeveloper.Options.tableDragStart, onDrop: WebDeveloper.Options.updateResponsiveLayouts });
  $(".table-container > .btn-primary", responsiveLayouts).on("click", WebDeveloper.Options.displayResponsiveLayoutForm);

  $("#responsive-layout-form").on("submit", function(event) { event.preventDefault(); });
  $("#responsive-layout-submit").on("click", WebDeveloper.Options.submitResponsiveLayout);
  $("#responsive-layout-cancel").on("click", WebDeveloper.Options.closeResponsiveLayout);
};

// Initializes the tools tab
WebDeveloper.Options.initializeToolsTab = function()
{
  var description = null;
  var tool        = null;
  var toolsCount  = WebDeveloper.Storage.getItem("tool_count");
  var tools       = $("#tools-options");
  var toolsTable  = $("tbody", tools);
  var url         = null;

  toolsTable.empty();

  // Loop through the tools
  for(var i = 1, l = toolsCount; i <= l; i++)
  {
    description = WebDeveloper.Storage.getItem("tool_" + i + "_description");
    url         = WebDeveloper.Storage.getItem("tool_" + i + "_url");

    // If the description and url are set
    if(description && url)
    {
      tool = {};

      tool.description = description;
      tool.url         = url;

      toolsTable.append(ich.tool(tool));
    }
  }

  // If there is only one tool
  if(toolsCount == 1)
  {
    toolsCount.addClass("single");
  }

  $(".btn-danger > span", toolsTable).text(WebDeveloper.Locales.getString("deleteConfirmation"));
  $(".btn-primary > span", toolsTable).text(WebDeveloper.Locales.getString("edit"));

  toolsTable.on("click", ".btn-danger", WebDeveloper.Options.deleteTool);
  toolsTable.on("click", ".btn-primary", WebDeveloper.Options.editTool);
  $("table", tools).tableDnD({ onDragStart: WebDeveloper.Options.tableDragStart, onDrop: WebDeveloper.Options.updateTools });
  $(".table-container > .btn-primary", tools).on("click", WebDeveloper.Options.displayToolForm);

  $("#tool-form").on("submit", function(event) { event.preventDefault(); });
  $("#tool-submit").on("click", WebDeveloper.Options.submitTool);
  $("#tool-cancel").on("click", WebDeveloper.Options.closeTool);
};

// Localizes the options
WebDeveloper.Options.localize = function()
{
  var deleteDialog = $("#delete-dialog");

  $("title").text(WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("options"));
  $(".navbar-brand").text(WebDeveloper.Locales.getString("options"));
  $(".navbar-text").text(WebDeveloper.Locales.getString("extensionName"));

  $("a", $("#advanced-tab")).append(WebDeveloper.Locales.getString("advanced"));
  $("a", $("#colors-tab")).append(WebDeveloper.Locales.getString("colors"));
  $("a", $("#general-tab")).append(WebDeveloper.Locales.getString("general"));
  $("a", $("#resize-tab")).append(WebDeveloper.Locales.getString("resize"));
  $("a", $("#responsive-layouts-tab")).append(WebDeveloper.Locales.getString("responsive"));
  $("a", $("#tools-tab")).append(WebDeveloper.Locales.getString("tools"));

  $(".modal-footer > .btn-default", deleteDialog).text(WebDeveloper.Locales.getString("cancel"));
  $(".btn-danger", deleteDialog).append(WebDeveloper.Locales.getString("delete"));

  WebDeveloper.Options.localizeColorsTab();
  WebDeveloper.Options.localizeGeneralTab();
  WebDeveloper.Options.localizeResizeTab();
  WebDeveloper.Options.localizeResponsiveLayoutsTab();
  WebDeveloper.Options.localizeToolsTab();
  WebDeveloper.Options.localizeAdvancedTab();
};

// Localizes the advanced tab
WebDeveloper.Options.localizeAdvancedTab = function()
{
  $('[for="populate_email_address"]').text(WebDeveloper.Locales.getString("populateEmailAddress"));
};

// Localizes the colors tab
WebDeveloper.Options.localizeColorsTab = function()
{
  $("#syntax-highlight-performance").text(WebDeveloper.Locales.getString("syntaxHighlightPerformance"));

  $('[for="syntax_highlight_theme"]').text(WebDeveloper.Locales.getString("syntaxHighlightTheme"));

  $('[value="dark"]').text(WebDeveloper.Locales.getString("dark"));
  $('[value="light"]').text(WebDeveloper.Locales.getString("light"));
  $('[value="none"]').text(WebDeveloper.Locales.getString("none"));

  $("#preview").text(WebDeveloper.Locales.getString("preview"));
};

// Localizes the general tab
WebDeveloper.Options.localizeGeneralTab = function()
{
  $('[for="display_overlay_with"]').text(WebDeveloper.Locales.getString("displayOverlayWith"));

  $('[value="icons_text"]').text(WebDeveloper.Locales.getString("iconsText"));
  $('[value="icons"]').text(WebDeveloper.Locales.getString("icons"));
  $('[value="text"]').text(WebDeveloper.Locales.getString("text"));
};

// Localizes the resize tab
WebDeveloper.Options.localizeResizeTab = function()
{
  var resizeOptions = $("#resize-options");

  $("th:eq(0)", resizeOptions).text(WebDeveloper.Locales.getString("description"));
  $("th:eq(1)", resizeOptions).text(WebDeveloper.Locales.getString("width"));
  $("th:eq(2)", resizeOptions).text(WebDeveloper.Locales.getString("height"));
  $("th:eq(3)", resizeOptions).text(WebDeveloper.Locales.getString("keyboard"));
  $("th:eq(4)", resizeOptions).text(WebDeveloper.Locales.getString("actions"));

  $(".table-container > .btn-primary", resizeOptions).append(WebDeveloper.Locales.getString("addLabel"));
  $(".text-muted", resizeOptions).text(WebDeveloper.Locales.getString("dragDropReorder"));

  $("#resize-cancel").text(WebDeveloper.Locales.getString("cancel"));
  $("#resize-description").attr("placeholder", WebDeveloper.Locales.getString("descriptionPlaceholder"));
  $("#resize-height").attr("placeholder", WebDeveloper.Locales.getString("heightPlaceholder"));
  $("#resize-width").attr("placeholder", WebDeveloper.Locales.getString("widthPlaceholder"));
  $('[for="resize-description"]').text(WebDeveloper.Locales.getString("description"));
  $('[for="resize-height"]').text(WebDeveloper.Locales.getString("height"));
  $('[for="resize-width"]').text(WebDeveloper.Locales.getString("width"));
};

// Localizes the responsive layouts tab
WebDeveloper.Options.localizeResponsiveLayoutsTab = function()
{
  var responsiveLayouts = $("#responsive-layouts-options");

  $("th:eq(0)", responsiveLayouts).text(WebDeveloper.Locales.getString("description"));
  $("th:eq(1)", responsiveLayouts).text(WebDeveloper.Locales.getString("width"));
  $("th:eq(2)", responsiveLayouts).text(WebDeveloper.Locales.getString("height"));
  $("th:eq(3)", responsiveLayouts).text(WebDeveloper.Locales.getString("actions"));

  $(".table-container > .btn-primary", responsiveLayouts).append(WebDeveloper.Locales.getString("addLabel"));
  $(".text-muted", responsiveLayouts).text(WebDeveloper.Locales.getString("dragDropReorder"));

  $("#responsive-layout-cancel").text(WebDeveloper.Locales.getString("cancel"));
  $("#responsive-layout-description").attr("placeholder", WebDeveloper.Locales.getString("descriptionPlaceholder"));
  $("#responsive-layout-height").attr("placeholder", WebDeveloper.Locales.getString("heightPlaceholder"));
  $("#responsive-layout-width").attr("placeholder", WebDeveloper.Locales.getString("widthPlaceholder"));
  $('[for="responsive-layout-description"]').text(WebDeveloper.Locales.getString("description"));
  $('[for="responsive-layout-height"]').text(WebDeveloper.Locales.getString("height"));
  $('[for="responsive-layout-width"]').text(WebDeveloper.Locales.getString("width"));
};

// Localizes the tools tab
WebDeveloper.Options.localizeToolsTab = function()
{
  var tools = $("#tools-options");

  $("th:eq(0)", tools).text(WebDeveloper.Locales.getString("description"));
  $("th:eq(1)", tools).text(WebDeveloper.Locales.getString("url"));
  $("th:eq(2)", tools).text(WebDeveloper.Locales.getString("keyboard"));
  $("th:eq(3)", tools).text(WebDeveloper.Locales.getString("actions"));

  $(".table-container > .btn-primary", tools).append(WebDeveloper.Locales.getString("addLabel"));
  $(".text-muted", tools).text(WebDeveloper.Locales.getString("dragDropReorder"));

  $("#tool-cancel").text(WebDeveloper.Locales.getString("cancel"));
  $("#tool-description").attr("placeholder", WebDeveloper.Locales.getString("descriptionPlaceholder"));
  $("#tool-url").attr("placeholder", WebDeveloper.Locales.getString("urlPlaceholder"));
  $('[for="tool-description"]').text(WebDeveloper.Locales.getString("description"));
  $('[for="tool-url"]').text(WebDeveloper.Locales.getString("url"));
};

// Resets the option form
WebDeveloper.Options.resetOptionForm = function(form)
{
  $(".has-error", form).removeClass("has-error");
  $(".help-block", form).text("");
};

// Submits the option
WebDeveloper.Options.submitOption = function(option, options, position)
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

// Submits the resize option
WebDeveloper.Options.submitResizeOption = function()
{
  // If the resize option is valid
  if(WebDeveloper.Options.validateResizeOption())
  {
    var resizeOption  = {};
    var resizeOptions = $("#resize-options");

    resizeOption.description = $("#resize-description").val().trim();
    resizeOption.height      = $("#resize-height").val().trim();
    resizeOption.width       = $("#resize-width").val().trim();

    WebDeveloper.Options.submitOption(ich.resizeOption(resizeOption), resizeOptions, $("#resize-form").data("position"));

    WebDeveloper.Options.updateResizeOptions();
    WebDeveloper.Options.closeResizeOption();
  }
};

// Submits the responsive layout
WebDeveloper.Options.submitResponsiveLayout = function()
{
  // If the responsive layout is valid
  if(WebDeveloper.Options.validateResponsiveLayout())
  {
    var responsiveLayout  = {};
    var responsiveLayouts = $("#responsive-layouts-options");

    responsiveLayout.description = $("#responsive-layout-description").val();
    responsiveLayout.height      = $("#responsive-layout-height").val();
    responsiveLayout.width       = $("#responsive-layout-width").val();

    WebDeveloper.Options.submitOption(ich.responsiveLayout(responsiveLayout), responsiveLayouts, $("#responsive-layout-form").data("position"));

    WebDeveloper.Options.updateResponsiveLayouts();
    WebDeveloper.Options.closeResponsiveLayout();
  }
};

// Submits the tool
WebDeveloper.Options.submitTool = function()
{
  // If the tool is valid
  if(WebDeveloper.Options.validateTool())
  {
    var tool  = {};
    var tools = $("#tools-options");

    tool.description = $("#tool-description").val();
    tool.url         = $("#tool-url").val();

    WebDeveloper.Options.submitOption(ich.tool(tool), tools, $("#tool-form").data("position"));

    WebDeveloper.Options.updateTools();
    WebDeveloper.Options.closeTool();
  }
};

// Handles a table drag starting
WebDeveloper.Options.tableDragStart = function(table)
{
  $(table).removeClass("table-striped");
};

// Updates the display overlay with setting
WebDeveloper.Options.updateDisplayOverlayWith = function()
{
  WebDeveloper.Storage.setItem("display_overlay_with", $("#display_overlay_with").val());
};

// Updates the populate email address
WebDeveloper.Options.updatePopulateEmailAddress = function()
{
  WebDeveloper.Storage.setItem("populate_email_address", $("#populate_email_address").val());
};

// Updates the resize options
WebDeveloper.Options.updateResizeOptions = function(table)
{
  var position      = 0;
  var resizeOption  = null;
  var resizeTab     = $("#resize-options");
  var resizeTable   = $("tbody", resizeTab);
  var resizeOptions = $("tr", resizeTable);
  var resizeCount   = resizeOptions.length;

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
    position     = i + 1;
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
    $("table", resizeTab).tableDnD({ onDragStart: WebDeveloper.Options.tableDragStart, onDrop: WebDeveloper.Options.updateResizeOptions });
  }

  $(".btn-danger > span", resizeTable).text(WebDeveloper.Locales.getString("deleteConfirmation"));
  $(".btn-primary > span", resizeTable).text(WebDeveloper.Locales.getString("edit"));

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
WebDeveloper.Options.updateResponsiveLayouts = function(table)
{
  var position               = 0;
  var responsiveLayout       = null;
  var responsiveLayoutsTab   = $("#responsive-layouts-options");
  var responsiveLayoutsTable = $("tbody", responsiveLayoutsTab);
  var responsiveLayouts      = $("tr", responsiveLayoutsTable);
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
    position         = i + 1;
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
    $("table", responsiveLayoutsTab).tableDnD({ onDragStart: WebDeveloper.Options.tableDragStart, onDrop: WebDeveloper.Options.updateResponsiveLayouts });
  }

  $(".btn-danger > span", responsiveLayoutsTable).text(WebDeveloper.Locales.getString("deleteConfirmation"));
  $(".btn-primary > span", responsiveLayoutsTable).text(WebDeveloper.Locales.getString("edit"));

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
WebDeveloper.Options.updateTools = function(table)
{
  var position   = 0;
  var tool       = null;
  var toolsTab   = $("#tools-options");
  var toolsTable = $("tbody", toolsTab);
  var tools      = $("tr", toolsTable);
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
    tool     = tools.eq(i);

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
    $("table", toolsTab).tableDnD({ onDragStart: WebDeveloper.Options.tableDragStart, onDrop: WebDeveloper.Options.updateTools });
  }

  $(".btn-danger > span", toolsTable).text(WebDeveloper.Locales.getString("deleteConfirmation"));
  $(".btn-primary > span", toolsTable).text(WebDeveloper.Locales.getString("edit"));

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

// Returns true if the resize option is valid
WebDeveloper.Options.validateResizeOption = function()
{
  var description = $("#resize-description");
  var height      = $("#resize-height");
  var heightValue = height.val().trim();
  var width       = $("#resize-width");
  var widthValue  = width.val().trim();
  var valid       = true;

  WebDeveloper.Options.resetOptionForm($("#resize-form"));

  // If the description is not set
  if(!description.val().trim())
  {
    description.closest(".form-group").addClass("has-error");
    description.next(".help-block").text(WebDeveloper.Locales.getString("descriptionCannotBeEmpty"));

    valid = false;
  }

  // If the height is not set
  if(!heightValue)
  {
    height.closest(".form-group").addClass("has-error");
    height.closest(".input-group").next(".help-block").text(WebDeveloper.Locales.getString("heightCannotBeEmpty"));

    valid = false;
  }
  else if(heightValue != "*" && (parseInt(heightValue, 10) != heightValue || heightValue <= 0))
  {
    height.closest(".form-group").addClass("has-error");
    height.closest(".input-group").next(".help-block").text(WebDeveloper.Locales.getString("heightNotValid"));

    valid = false;
  }

  // If the width is not set
  if(!widthValue)
  {
    width.closest(".form-group").addClass("has-error");
    width.closest(".input-group").next(".help-block").text(WebDeveloper.Locales.getString("widthCannotBeEmpty"));

    valid = false;
  }
  else if(widthValue != "*" && (parseInt(widthValue, 10) != widthValue || widthValue <= 0))
  {
    width.closest(".form-group").addClass("has-error");
    width.closest(".input-group").next(".help-block").text(WebDeveloper.Locales.getString("widthNotValid"));

    valid = false;
  }

  return valid;
};

// Returns true if the responsive layout is valid
WebDeveloper.Options.validateResponsiveLayout = function()
{
  var description = $("#responsive-layout-description");
  var height      = $("#responsive-layout-height");
  var heightValue = height.val().trim();
  var width       = $("#responsive-layout-width");
  var widthValue  = width.val().trim();
  var valid       = true;

  WebDeveloper.Options.resetOptionForm($("#responsive-layout-form"));

  // If the description is not set
  if(!description.val().trim())
  {
    description.next(".help-block").text(WebDeveloper.Locales.getString("descriptionCannotBeEmpty"));
    description.closest(".form-group").addClass("has-error");

    valid = false;
  }

  // If the height is not set
  if(!heightValue)
  {
    height.closest(".form-group").addClass("has-error");
    height.closest(".input-group").next(".help-block").text(WebDeveloper.Locales.getString("heightCannotBeEmpty"));

    valid = false;
  }
  else if(parseInt(heightValue, 10) != heightValue || heightValue <= 0)
  {
    height.closest(".form-group").addClass("has-error");
    height.closest(".input-group").next(".help-block").text(WebDeveloper.Locales.getString("heightNotValid"));

    valid = false;
  }

  // If the width is not set
  if(!widthValue)
  {
    width.closest(".form-group").addClass("has-error");
    width.closest(".input-group").next(".help-block").text(WebDeveloper.Locales.getString("widthCannotBeEmpty"));

    valid = false;
  }
  else if(parseInt(widthValue, 10) != widthValue || widthValue <= 0)
  {
    width.closest(".form-group").addClass("has-error");
    width.closest(".input-group").next(".help-block").text(WebDeveloper.Locales.getString("widthNotValid"));

    valid = false;
  }

  return valid;
};

// Returns true if the tool is valid
WebDeveloper.Options.validateTool = function()
{
  var description = $("#tool-description");
  var url         = $("#tool-url");
  var valid       = true;

  WebDeveloper.Options.resetOptionForm($("#tool-form"));

  // If the description is not set
  if(!description.val().trim())
  {
    description.closest(".form-group").addClass("has-error");
    description.next(".help-block").text(WebDeveloper.Locales.getString("descriptionCannotBeEmpty"));

    valid = false;
  }

  // If the URL is not set
  if(!url.val().trim())
  {
    url.closest(".form-group").addClass("has-error");
    url.closest(".input-group").next(".help-block").text(WebDeveloper.Locales.getString("urlCannotBeEmpty"));

    valid = false;
  }

  return valid;
};
