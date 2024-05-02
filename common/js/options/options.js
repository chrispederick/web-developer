var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Options                   = WebDeveloper.Options || {};
WebDeveloper.Options.allowedPurifyTags = ["button", "span", "svg", "td", "tr", "use"];
WebDeveloper.Options.optionCallback    = null;
WebDeveloper.Options.optionRow         = null;
WebDeveloper.Options.tableDragRow      = null;

// Adds a resize option
WebDeveloper.Options.addResizeOption = function()
{
  var resizeDescription = document.getElementById("resize-description");
  var resizeForm        = document.getElementById("resize-form");

  resizeForm.querySelector("legend").textContent                             = WebDeveloper.Locales.getString("addResizeOption");
  document.getElementById("resize-submit").querySelector("span").textContent = WebDeveloper.Locales.getString("add");

  resizeDescription.value                        = "";
  document.getElementById("resize-width").value  = "";
  document.getElementById("resize-height").value = "";

  resizeForm.removeAttribute("data-position");
  document.getElementById("resize-options-container").classList.add("d-none");
  resizeForm.classList.remove("d-none");
  resizeDescription.focus();
};

// Adds a responsive layout
WebDeveloper.Options.addResponsiveLayout = function()
{
  var responsiveLayoutDescription = document.getElementById("responsive-layout-description");
  var responsiveLayoutForm        = document.getElementById("responsive-layout-form");

  responsiveLayoutForm.querySelector("legend").textContent                              = WebDeveloper.Locales.getString("addResponsiveLayout");
  document.getElementById("responsive-layout-submit").querySelector("span").textContent = WebDeveloper.Locales.getString("add");

  responsiveLayoutDescription.value                         = "";
  document.getElementById("responsive-layout-width").value  = "";
  document.getElementById("responsive-layout-height").value = "";

  responsiveLayoutForm.removeAttribute("data-position");
  document.getElementById("responsive-layouts-container").classList.add("d-none");
  responsiveLayoutForm.classList.remove("d-none");
  responsiveLayoutDescription.focus();
};

// Adds a tool
WebDeveloper.Options.addTool = function()
{
  var toolDescription = document.getElementById("tool-description");
  var toolForm        = document.getElementById("tool-form");

  toolForm.querySelector("legend").textContent                             = WebDeveloper.Locales.getString("addTool");
  document.getElementById("tool-submit").querySelector("span").textContent = WebDeveloper.Locales.getString("add");

  toolDescription.value                      = "";
  document.getElementById("tool-url").value  = "";

  toolForm.removeAttribute("data-position");
  document.getElementById("tools-container").classList.add("d-none");
  toolForm.classList.remove("d-none");
  toolDescription.focus();
};

// Handles a tab change
WebDeveloper.Options.changeTab = function(event)
{
  var eventTarget = event.target;

  // If the event target is a nav link
  if(eventTarget && eventTarget.classList.contains("nav-link"))
  {
    WebDeveloper.Storage.setItem("option", eventTarget.parentElement.getAttribute("id"));
  }
};

// Closes the resize option
WebDeveloper.Options.closeResizeOption = function()
{
  document.getElementById("resize-form").classList.add("d-none");
  document.getElementById("resize-options-container").classList.remove("d-none");
};

// Closes the responsive layout
WebDeveloper.Options.closeResponsiveLayout = function()
{
  document.getElementById("responsive-layout-form").classList.add("d-none");
  document.getElementById("responsive-layouts-container").classList.remove("d-none");
};

// Closes the tool
WebDeveloper.Options.closeTool = function()
{
  document.getElementById("tool-form").classList.add("d-none");
  document.getElementById("tools-container").classList.remove("d-none");
};

// Deletes an option
WebDeveloper.Options.deleteOption = function(option, title, confirmation, callback)
{
  var deleteDialog = document.getElementById("delete-dialog");

  deleteDialog.querySelector("h4").replaceChildren(title);
  deleteDialog.querySelector("p").replaceChildren(confirmation);

  WebDeveloper.Options.optionCallback = callback;
  WebDeveloper.Options.optionRow      = option;

  bootstrap.Modal.getOrCreateInstance("#delete-dialog").show();
};

// Handles an option delete being submitted
WebDeveloper.Options.deleteOptionSubmit = function()
{
  WebDeveloper.Options.optionRow.remove();
  WebDeveloper.Options.optionCallback();
  bootstrap.Modal.getOrCreateInstance("#delete-dialog").hide();
};

// Deletes a resize option
WebDeveloper.Options.deleteResizeOption = function(button)
{
  var resizeOption = button.closest("tr");

  WebDeveloper.Options.deleteOption(resizeOption, WebDeveloper.Locales.getString("deleteResizeOption"), WebDeveloper.Locales.getFormattedString("deleteResizeOptionConfirmation", [resizeOption.querySelector("td:nth-child(1)").textContent]), WebDeveloper.Options.updateResizeOptions);
};

// Deletes a responsive layout
WebDeveloper.Options.deleteResponsiveLayout = function(button)
{
  var responsiveLayout = button.closest("tr");

  WebDeveloper.Options.deleteOption(responsiveLayout, WebDeveloper.Locales.getString("deleteResponsiveLayout"), WebDeveloper.Locales.getFormattedString("deleteResponsiveLayoutConfirmation", [responsiveLayout.querySelector("td:nth-child(1)").textContent]), WebDeveloper.Options.updateResponsiveLayouts);
};

// Deletes a tool
WebDeveloper.Options.deleteTool = function(button)
{
  var tool = button.closest("tr");

  WebDeveloper.Options.deleteOption(tool, WebDeveloper.Locales.getString("deleteTool"), WebDeveloper.Locales.getFormattedString("deleteToolConfirmation", [tool.querySelector("td:nth-child(1)").textContent]), WebDeveloper.Options.updateTools);
};

// Edits a resize option
WebDeveloper.Options.editResizeOption = function(button)
{
  var resizeDescription = document.getElementById("resize-description");
  var resizeForm        = document.getElementById("resize-form");
  var resizeOption      = button.closest("tr");
  var position          = Array.prototype.indexOf.call(resizeOption.parentElement.children, resizeOption);

  resizeForm.querySelector("legend").textContent                             = WebDeveloper.Locales.getString("editResizeOption");
  document.getElementById("resize-submit").querySelector("span").textContent = WebDeveloper.Locales.getString("save");

  resizeDescription.value                        = resizeOption.querySelector("td:nth-child(1)").textContent;
  document.getElementById("resize-width").value  = resizeOption.querySelector("td:nth-child(2)").textContent;
  document.getElementById("resize-height").value = resizeOption.querySelector("td:nth-child(3)").textContent;

  resizeForm.setAttribute("data-position", position);
  document.getElementById("resize-options-container").classList.add("d-none");
  resizeForm.classList.remove("d-none");
  resizeDescription.focus();
};

// Edits a responsive layout
WebDeveloper.Options.editResponsiveLayout = function(button)
{
  var responsiveLayoutDescription = document.getElementById("responsive-layout-description");
  var responsiveLayoutForm        = document.getElementById("responsive-layout-form");
  var responsiveLayout            = button.closest("tr");
  var position                    = Array.prototype.indexOf.call(responsiveLayout.parentElement.children, responsiveLayout);

  responsiveLayoutForm.querySelector("legend").textContent                              = WebDeveloper.Locales.getString("editResponsiveLayout");
  document.getElementById("responsive-layout-submit").querySelector("span").textContent = WebDeveloper.Locales.getString("save");

  responsiveLayoutDescription.value                         = responsiveLayout.querySelector("td:nth-child(1)").textContent;
  document.getElementById("responsive-layout-width").value  = responsiveLayout.querySelector("td:nth-child(2)").textContent;
  document.getElementById("responsive-layout-height").value = responsiveLayout.querySelector("td:nth-child(3)").textContent;

  responsiveLayoutForm.setAttribute("data-position", position);
  document.getElementById("responsive-layouts-container").classList.add("d-none");
  responsiveLayoutForm.classList.remove("d-none");
  responsiveLayoutDescription.focus();
};

// Edits a tool
WebDeveloper.Options.editTool = function(button)
{
  var toolDescription = document.getElementById("tool-description");
  var toolForm        = document.getElementById("tool-form");
  var tool            = button.closest("tr");
  var position        = Array.prototype.indexOf.call(tool.parentElement.children, tool);

  toolForm.querySelector("legend").textContent                             = WebDeveloper.Locales.getString("editTool");
  document.getElementById("tool-submit").querySelector("span").textContent = WebDeveloper.Locales.getString("save");

  toolDescription.value                      = tool.querySelector("td:nth-child(1)").textContent;
  document.getElementById("tool-url").value  = tool.querySelector("td:nth-child(2)").textContent;

  toolForm.setAttribute("data-position", position);
  document.getElementById("tools-container").classList.add("d-none");
  toolForm.classList.remove("d-none");
  toolDescription.focus();
};

// Initializes the options
WebDeveloper.Options.initialize = function()
{
  var hash = window.location.hash;

  // If the hash is set
  if(hash)
  {
    WebDeveloper.Storage.setItem("option", hash);
    bootstrap.Tab.getOrCreateInstance(document.querySelector("#" + hash + " > a")).show();
  }
  else
  {
    WebDeveloper.Storage.getItem("option", function(option)
    {
      // If the option is set
      if(option)
      {
        bootstrap.Tab.getOrCreateInstance(document.querySelector("#" + option + " > a")).show();
      }
    });
  }

  WebDeveloper.Options.initializeAdvancedTab();
  WebDeveloper.Options.initializeColorsTab();
  WebDeveloper.Options.initializeGeneralTab();
  WebDeveloper.Options.initializeResizeTab();
  WebDeveloper.Options.initializeResponsiveLayoutsTab();
  WebDeveloper.Options.initializeToolsTab();
  WebDeveloper.Options.localize();

  document.getElementById("delete-submit").addEventListener("click", WebDeveloper.Options.deleteOptionSubmit);
  document.querySelector(".nav-tabs").addEventListener("click", WebDeveloper.Options.changeTab);
};

// Initializes the advanced tab
WebDeveloper.Options.initializeAdvancedTab = function()
{
  var populateEmailAddress = document.getElementById("populate_email_address");

  WebDeveloper.Storage.getItem("populate_email_address", function(item)
  {
    populateEmailAddress.value = item;
  });

  populateEmailAddress.addEventListener("change", WebDeveloper.Options.updatePopulateEmailAddress);
};

// Initializes the colors tab
WebDeveloper.Options.initializeColorsTab = function()
{
  var syntaxHighlightTheme = document.getElementById("syntax_highlight_theme");

  WebDeveloper.Storage.getItem("syntax_highlight_theme", function(item)
  {
    syntaxHighlightTheme.value = item;
  });

  syntaxHighlightTheme.addEventListener("change", WebDeveloper.Options.updateSyntaxHighlightTheme);
};

// Initializes the general tab
WebDeveloper.Options.initializeGeneralTab = function()
{
  var displayOverlayWith = document.getElementById("display_overlay_with");

  WebDeveloper.Storage.getItem("display_overlay_with", function(item)
  {
    displayOverlayWith.value = item;
  });

  WebDeveloper.Storage.getItem("overlay_icon", function(item)
  {
    document.getElementById("overlay_icon_" + item).checked = true;
  });

  displayOverlayWith.addEventListener("change", WebDeveloper.Options.updateDisplayOverlayWith);
  document.getElementById("overlay-icon-form").addEventListener("change", WebDeveloper.Options.updateOverlayIcon);
};

// Initializes the resize tab
WebDeveloper.Options.initializeResizeTab = function()
{
  var resizeOptions      = document.getElementById("resize-options");
  var resizeOptionsTable = resizeOptions.querySelector("tbody");

  resizeOptionsTable.replaceChildren();

  WebDeveloper.Storage.getItem("resize_count", function(resizeOptionCount)
  {
    var resizeStorageOptionKeys = [];

    // Loop through the resize options
    for(var i = 1, l = resizeOptionCount; i <= l; i++)
    {
      resizeStorageOptionKeys.push("resize_" + i + "_description", "resize_" + i + "_height", "resize_" + i + "_width");
    }

    WebDeveloper.Storage.getItems(resizeStorageOptionKeys, function(resizeStorageOptions)
    {
      var description          = null;
      var height               = 0;
      var resizeOption         = null;
      var resizeOptionTemplate = document.getElementById("resize-option").innerHTML;
      var width                = 0;

      Mustache.parse(resizeOptionTemplate);

      // Loop through the resize options
      for(i = 1, l = resizeOptionCount; i <= l; i++)
      {
        description = resizeStorageOptions["resize_" + i + "_description"];
        height      = resizeStorageOptions["resize_" + i + "_height"];
        width       = resizeStorageOptions["resize_" + i + "_width"];

        // If the description, height and width are set
        if(description && height > 0 && width > 0)
        {
          resizeOption = {};

          resizeOption.description = description;
          resizeOption.height      = height;
          resizeOption.width       = width;

          resizeOptionsTable.insertAdjacentHTML("beforeend", DOMPurify.sanitize("<table>" + Mustache.render(resizeOptionTemplate, resizeOption) + "</table>", { ALLOWED_TAGS: WebDeveloper.Options.allowedPurifyTags }));
        }
      }

      // If there is only one resize option
      if(resizeOptionCount == 1)
      {
        resizeOptionsTable.classList.add("single");
      }

      WebDeveloper.Options.localizeTableActions(resizeOptionsTable);

      resizeOptionsTable.addEventListener("click", WebDeveloper.Options.resizeOptionsClick);
      resizeOptionsTable.addEventListener("drop", WebDeveloper.Options.updateResizeOptions);

      // Loop through the rows
      resizeOptionsTable.querySelectorAll(".draggable").forEach(function(row)
      {
        row.addEventListener("dragend", WebDeveloper.Options.tableDragEnd);
        row.addEventListener("dragover", WebDeveloper.Options.tableDragOver);
        row.addEventListener("dragstart", WebDeveloper.Options.tableDragStart);
      });
    });
  });

  document.getElementById("resize-cancel").addEventListener("click", WebDeveloper.Options.closeResizeOption);
  document.getElementById("resize-description").addEventListener("keypress", WebDeveloper.Options.resizeOptionKeyPress);
  document.getElementById("resize-form").addEventListener("submit", function(event) { event.preventDefault(); });
  document.getElementById("resize-height").addEventListener("keypress", WebDeveloper.Options.resizeOptionKeyPress);
  document.getElementById("resize-option-add").addEventListener("click", WebDeveloper.Options.addResizeOption);
  document.getElementById("resize-submit").addEventListener("click", WebDeveloper.Options.submitResizeOption);
  document.getElementById("resize-width").addEventListener("keypress", WebDeveloper.Options.resizeOptionKeyPress);
};

// Initializes the responsive layouts tab
WebDeveloper.Options.initializeResponsiveLayoutsTab = function()
{
  var responsiveLayouts      = document.getElementById("responsive-layouts-options");
  var responsiveLayoutsTable = responsiveLayouts.querySelector("tbody");

  responsiveLayoutsTable.replaceChildren();

  WebDeveloper.Storage.getItem("responsive_layout_count", function(responsiveLayoutsCount)
  {
    var responsiveLayoutsStorageOptionKeys = [];

    // Loop through the responsive layouts
    for(var i = 1, l = responsiveLayoutsCount; i <= l; i++)
    {
      responsiveLayoutsStorageOptionKeys.push("responsive_layout_" + i + "_description", "responsive_layout_" + i + "_height", "responsive_layout_" + i + "_width");
    }

    WebDeveloper.Storage.getItems(responsiveLayoutsStorageOptionKeys, function(responsiveLayoutsStorageOptions)
    {
      var description              = null;
      var height                   = 0;
      var responsiveLayout         = null;
      var responsiveLayoutTemplate = document.getElementById("responsive-layout").innerHTML;
      var width                    = 0;

      Mustache.parse(responsiveLayoutTemplate);

      // Loop through the responsive layouts
      for(i = 1, l = responsiveLayoutsCount; i <= l; i++)
      {
        description = responsiveLayoutsStorageOptions["responsive_layout_" + i + "_description"];
        height      = responsiveLayoutsStorageOptions["responsive_layout_" + i + "_height"];
        width       = responsiveLayoutsStorageOptions["responsive_layout_" + i + "_width"];

        // If the description, height and width are set
        if(description && height > 0 && width > 0)
        {
          responsiveLayout = {};

          responsiveLayout.description = description;
          responsiveLayout.height      = height;
          responsiveLayout.width       = width;

          responsiveLayoutsTable.insertAdjacentHTML("beforeend", DOMPurify.sanitize("<table>" + Mustache.render(responsiveLayoutTemplate, responsiveLayout) + "</table>", { ALLOWED_TAGS: WebDeveloper.Options.allowedPurifyTags }));
        }
      }

      // If there is only one responsive layout
      if(responsiveLayoutsCount == 1)
      {
        responsiveLayoutsTable.classList.add("single");
      }

      WebDeveloper.Options.localizeTableActions(responsiveLayoutsTable);

      responsiveLayoutsTable.addEventListener("click", WebDeveloper.Options.responsiveLayoutsClick);
      responsiveLayoutsTable.addEventListener("drop", WebDeveloper.Options.updateResponsiveLayouts);

      // Loop through the rows
      responsiveLayoutsTable.querySelectorAll(".draggable").forEach(function(row)
      {
        row.addEventListener("dragend", WebDeveloper.Options.tableDragEnd);
        row.addEventListener("dragover", WebDeveloper.Options.tableDragOver);
        row.addEventListener("dragstart", WebDeveloper.Options.tableDragStart);
      });
    });
  });

  document.getElementById("responsive-layout-add").addEventListener("click", WebDeveloper.Options.addResponsiveLayout);
  document.getElementById("responsive-layout-cancel").addEventListener("click", WebDeveloper.Options.closeResponsiveLayout);
  document.getElementById("responsive-layout-description").addEventListener("keypress", WebDeveloper.Options.responsiveLayoutKeyPress);
  document.getElementById("responsive-layout-form").addEventListener("submit", function(event) { event.preventDefault(); });
  document.getElementById("responsive-layout-height").addEventListener("keypress", WebDeveloper.Options.responsiveLayoutKeyPress);
  document.getElementById("responsive-layout-submit").addEventListener("click", WebDeveloper.Options.submitResponsiveLayout);
  document.getElementById("responsive-layout-width").addEventListener("keypress", WebDeveloper.Options.responsiveLayoutKeyPress);
};

// Initializes the tools tab
WebDeveloper.Options.initializeToolsTab = function()
{
  var tools      = document.getElementById("tools-options");
  var toolsTable = tools.querySelector("tbody");

  toolsTable.replaceChildren();

  WebDeveloper.Storage.getItem("tool_count", function(toolsCount)
  {
    var toolsStorageOptionKeys = [];

    // Loop through the tools
    for(var i = 1, l = toolsCount; i <= l; i++)
    {
      toolsStorageOptionKeys.push("tool_" + i + "_description", "tool_" + i + "_url");
    }

    WebDeveloper.Storage.getItems(toolsStorageOptionKeys, function(toolsStorageOptions)
    {
      var description  = null;
      var tool         = null;
      var toolTemplate = document.getElementById("tool").innerHTML;
      var url          = null;

      Mustache.parse(toolTemplate);

      // Loop through the tools
      for(i = 1, l = toolsCount; i <= l; i++)
      {
        description = toolsStorageOptions["tool_" + i + "_description"];
        url         = toolsStorageOptions["tool_" + i + "_url"];

        // If the description and url are set
        if(description && url)
        {
          tool = {};

          tool.description = description;
          tool.url         = url;

          toolsTable.insertAdjacentHTML("beforeend", DOMPurify.sanitize("<table>" + Mustache.render(toolTemplate, tool) + "</table>", { ALLOWED_TAGS: WebDeveloper.Options.allowedPurifyTags }));
        }
      }

      // If there is only one tool
      if(toolsCount == 1)
      {
        toolsTable.classList.add("single");
      }

      WebDeveloper.Options.localizeTableActions(toolsTable);

      toolsTable.addEventListener("click", WebDeveloper.Options.toolsClick);
      toolsTable.addEventListener("drop", WebDeveloper.Options.updateTools);

      // Loop through the rows
      toolsTable.querySelectorAll(".draggable").forEach(function(row)
      {
        row.addEventListener("dragend", WebDeveloper.Options.tableDragEnd);
        row.addEventListener("dragover", WebDeveloper.Options.tableDragOver);
        row.addEventListener("dragstart", WebDeveloper.Options.tableDragStart);
      });
    });
  });

  document.getElementById("tool-add").addEventListener("click", WebDeveloper.Options.addTool);
  document.getElementById("tool-cancel").addEventListener("click", WebDeveloper.Options.closeTool);
  document.getElementById("tool-description").addEventListener("keypress", WebDeveloper.Options.toolKeyPress);
  document.getElementById("tool-form").addEventListener("submit", function(event) { event.preventDefault(); });
  document.getElementById("tool-submit").addEventListener("click", WebDeveloper.Options.submitTool);
  document.getElementById("tool-url").addEventListener("keypress", WebDeveloper.Options.toolKeyPress);
};

// Localizes the options
WebDeveloper.Options.localize = function()
{
  var extensionName = WebDeveloper.Locales.getString("extensionName");

  document.title = extensionName + " " + WebDeveloper.Locales.getString("options");

  document.getElementById("advanced-tab").querySelector("a").append(WebDeveloper.Locales.getString("advanced"));
  document.getElementById("colors-tab").querySelector("a").append(WebDeveloper.Locales.getString("colors"));
  document.getElementById("delete-dialog").querySelector(".btn-outline-secondary").append(WebDeveloper.Locales.getString("cancel"));
  document.getElementById("delete-submit").append(WebDeveloper.Locales.getString("delete"));
  document.getElementById("donate-link").prepend(WebDeveloper.Locales.getString("donate"));
  document.getElementById("general-tab").querySelector("a").append(WebDeveloper.Locales.getString("general"));
  document.getElementById("resize-tab").querySelector("a").append(WebDeveloper.Locales.getString("resize"));
  document.getElementById("responsive-layouts-tab").querySelector("a").append(WebDeveloper.Locales.getString("responsive"));
  document.getElementById("sidebar").querySelector(".card-text").insertAdjacentHTML("beforeend", DOMPurify.sanitize('<span class="fw-bold">' + extensionName + "</span> " + WebDeveloper.Locales.getString("donationCard")));
  document.getElementById("tools-tab").querySelector("a").append(WebDeveloper.Locales.getString("tools"));
  document.querySelector(".navbar-brand span").replaceChildren(extensionName + " " + WebDeveloper.Locales.getString("options"));
  document.querySelector("h1.visually-hidden").replaceChildren(extensionName + " " + WebDeveloper.Locales.getString("options"));

  WebDeveloper.Options.localizeAdvancedTab();
  WebDeveloper.Options.localizeColorsTab();
  WebDeveloper.Options.localizeGeneralTab();
  WebDeveloper.Options.localizeResizeTab();
  WebDeveloper.Options.localizeResponsiveLayoutsTab();
  WebDeveloper.Options.localizeToolsTab();
};

// Localizes the advanced tab
WebDeveloper.Options.localizeAdvancedTab = function()
{
  document.querySelector('[for="populate_email_address"]').append(WebDeveloper.Locales.getString("populateEmailAddress"));
};

// Localizes the colors tab
WebDeveloper.Options.localizeColorsTab = function()
{
  document.getElementById("preview").append(WebDeveloper.Locales.getString("preview"));
  document.getElementById("syntax-highlight-performance").append(WebDeveloper.Locales.getString("syntaxHighlightPerformance"));
  document.querySelector('[for="syntax_highlight_theme"]').append(WebDeveloper.Locales.getString("syntaxHighlightTheme"));
  document.querySelector('[value="dark"]').append(WebDeveloper.Locales.getString("dark"));
  document.querySelector('[value="light"]').append(WebDeveloper.Locales.getString("light"));
  document.querySelector('[value="none"]').append(WebDeveloper.Locales.getString("none"));
};

// Localizes the general tab
WebDeveloper.Options.localizeGeneralTab = function()
{
  document.getElementById("overlay-icon").append(WebDeveloper.Locales.getString("overlayIcon"));
  document.querySelector('[for="display_overlay_with"]').append(WebDeveloper.Locales.getString("displayOverlayWith"));
  document.querySelector('[for="overlay_icon_color"]').append(WebDeveloper.Locales.getString("color"));
  document.querySelector('[for="overlay_icon_gray"]').append(WebDeveloper.Locales.getString("gray"));
  document.querySelector('[for="overlay_icon_monochrome"]').append(WebDeveloper.Locales.getString("monochrome"));
  document.querySelector('[value="icons_text"]').append(WebDeveloper.Locales.getString("iconsText"));
  document.querySelector('[value="icons"]').append(WebDeveloper.Locales.getString("icons"));
  document.querySelector('[value="text"]').append(WebDeveloper.Locales.getString("text"));
};

// Localizes the resize tab
WebDeveloper.Options.localizeResizeTab = function()
{
  document.getElementById("resize-cancel").append(WebDeveloper.Locales.getString("cancel"));
  document.getElementById("resize-description").setAttribute("placeholder", WebDeveloper.Locales.getString("descriptionPlaceholder"));
  document.getElementById("resize-height").setAttribute("placeholder", WebDeveloper.Locales.getString("heightPlaceholder"));
  document.getElementById("resize-width").setAttribute("placeholder", WebDeveloper.Locales.getString("widthPlaceholder"));
  document.getElementById("resize-option-add").append(WebDeveloper.Locales.getString("addLabel"));
  document.getElementById("resize-options-actions").append(WebDeveloper.Locales.getString("actions"));
  document.getElementById("resize-options-description").append(WebDeveloper.Locales.getString("description"));
  document.getElementById("resize-options-drag-drop").append(WebDeveloper.Locales.getString("dragDropReorder"));
  document.getElementById("resize-options-width").append(WebDeveloper.Locales.getString("width"));
  document.getElementById("resize-options-height").append(WebDeveloper.Locales.getString("height"));
  document.querySelector('[for="resize-description"]').append(WebDeveloper.Locales.getString("description"));
  document.querySelector('[for="resize-height"]').append(WebDeveloper.Locales.getString("height"));
  document.querySelector('[for="resize-width"]').append(WebDeveloper.Locales.getString("width"));
};

// Localizes the responsive layouts tab
WebDeveloper.Options.localizeResponsiveLayoutsTab = function()
{
  document.getElementById("responsive-layout-add").append(WebDeveloper.Locales.getString("addLabel"));
  document.getElementById("responsive-layout-cancel").append(WebDeveloper.Locales.getString("cancel"));
  document.getElementById("responsive-layout-description").setAttribute("placeholder", WebDeveloper.Locales.getString("descriptionPlaceholder"));
  document.getElementById("responsive-layout-height").setAttribute("placeholder", WebDeveloper.Locales.getString("heightPlaceholder"));
  document.getElementById("responsive-layout-width").setAttribute("placeholder", WebDeveloper.Locales.getString("widthPlaceholder"));
  document.getElementById("responsive-layouts-actions").append(WebDeveloper.Locales.getString("actions"));
  document.getElementById("responsive-layouts-description").append(WebDeveloper.Locales.getString("description"));
  document.getElementById("responsive-layouts-drag-drop").append(WebDeveloper.Locales.getString("dragDropReorder"));
  document.getElementById("responsive-layouts-height").append(WebDeveloper.Locales.getString("height"));
  document.getElementById("responsive-layouts-width").append(WebDeveloper.Locales.getString("width"));
  document.querySelector('[for="responsive-layout-description"]').append(WebDeveloper.Locales.getString("description"));
  document.querySelector('[for="responsive-layout-height"]').append(WebDeveloper.Locales.getString("height"));
  document.querySelector('[for="responsive-layout-width"]').append(WebDeveloper.Locales.getString("width"));
};

// Localizes the table actions
WebDeveloper.Options.localizeTableActions = function(table)
{
  // Loop through the delete buttons
  table.querySelectorAll(".btn-danger span").forEach(function(button)
  {
    button.replaceChildren(WebDeveloper.Locales.getString("deleteConfirmation"));
  });

  // Loop through the edit buttons
  table.querySelectorAll(".btn-primary span").forEach(function(button)
  {
    button.replaceChildren(WebDeveloper.Locales.getString("edit"));
  });
};

// Localizes the tools tab
WebDeveloper.Options.localizeToolsTab = function()
{
  document.getElementById("tool-add").append(WebDeveloper.Locales.getString("addLabel"));
  document.getElementById("tool-cancel").append(WebDeveloper.Locales.getString("cancel"));
  document.getElementById("tool-description").setAttribute("placeholder", WebDeveloper.Locales.getString("descriptionPlaceholder"));
  document.getElementById("tool-url").setAttribute("placeholder", WebDeveloper.Locales.getString("urlPlaceholder"));
  document.getElementById("tools-actions").append(WebDeveloper.Locales.getString("actions"));
  document.getElementById("tools-description").append(WebDeveloper.Locales.getString("description"));
  document.getElementById("tools-drag-drop").append(WebDeveloper.Locales.getString("dragDropReorder"));
  document.getElementById("tools-url").append(WebDeveloper.Locales.getString("url"));
  document.querySelector('[for="tool-description"]').append(WebDeveloper.Locales.getString("description"));
  document.querySelector('[for="tool-url"]').append(WebDeveloper.Locales.getString("url"));
};

// Handles a key press when adding or editing a resize option
WebDeveloper.Options.resizeOptionKeyPress = function(event)
{
  // If the enter key was pressed
  if(event.keyCode == 13)
  {
    WebDeveloper.Options.submitResizeOption();
  }
};

// Handles a click inside the resize options
WebDeveloper.Options.resizeOptionsClick = function(event)
{
  var button = event.target.closest("button");

  // If the target is a button
  if(button)
  {
    // If the target is an edit button
    if(button.classList.contains("btn-primary"))
    {
      WebDeveloper.Options.editResizeOption(button);
    }
    else
    {
      WebDeveloper.Options.deleteResizeOption(button);
    }

    event.preventDefault();
  }
};

// Handles a key press when adding or editing a responsive layout option
WebDeveloper.Options.respsonsiveLayoutKeyPress = function(event)
{
  // If the enter key was pressed
  if(event.keyCode == 13)
  {
    WebDeveloper.Options.submitResponsiveLayout();
  }
};

// Handles a click inside the responsive layouts
WebDeveloper.Options.responsiveLayoutsClick = function(event)
{
  var button = event.target.closest("button");

  // If the target is a button
  if(button)
  {
    // If the target is an edit button
    if(button.classList.contains("btn-primary"))
    {
      WebDeveloper.Options.editResponsiveLayout(button);
    }
    else
    {
      WebDeveloper.Options.deleteResponsiveLayout(button);
    }

    event.preventDefault();
  }
};

// Submits the option
WebDeveloper.Options.submitOption = function(option, options, position)
{
  var table = options.querySelector("tbody");

  // If the position is set
  if(position)
  {
    var tableRow = table.querySelector("tr:nth-child(" + (parseInt(position, 10) + 1) + ")");

    tableRow.insertAdjacentHTML("beforebegin", DOMPurify.sanitize("<table>" + option + "</table>", { ALLOWED_TAGS: WebDeveloper.Options.allowedPurifyTags }));
    tableRow.remove();
  }
  else
  {
    table.insertAdjacentHTML("beforeend", DOMPurify.sanitize("<table>" + option + "</table>", { ALLOWED_TAGS: WebDeveloper.Options.allowedPurifyTags }));
  }

  WebDeveloper.Options.localizeTableActions(table);
};

// Submits the resize option
WebDeveloper.Options.submitResizeOption = function()
{
  // If the resize option is valid
  if(WebDeveloper.Options.validateResizeOption())
  {
    var resizeOption = {};

    resizeOption.description = document.getElementById("resize-description").value.trim();
    resizeOption.height      = document.getElementById("resize-height").value.trim();
    resizeOption.width       = document.getElementById("resize-width").value.trim();

    WebDeveloper.Options.submitOption(Mustache.render(document.getElementById("resize-option").innerHTML, resizeOption), document.getElementById("resize-options"), document.getElementById("resize-form").getAttribute("data-position"));

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
    var responsiveLayout = {};

    responsiveLayout.description = document.getElementById("responsive-layout-description").value.trim();
    responsiveLayout.height      = document.getElementById("responsive-layout-height").value.trim();
    responsiveLayout.width       = document.getElementById("responsive-layout-width").value.trim();

    WebDeveloper.Options.submitOption(Mustache.render(document.getElementById("responsive-layout").innerHTML, responsiveLayout), document.getElementById("responsive-layouts-options"), document.getElementById("responsive-layout-form").getAttribute("data-position"));

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

    tool.description = document.getElementById("tool-description").value.trim();
    tool.url         = document.getElementById("tool-url").value.trim();

    WebDeveloper.Options.submitOption(Mustache.render(document.getElementById("tool").innerHTML, tool), document.getElementById("tools-options"), document.getElementById("tool-form").getAttribute("data-position"));

    WebDeveloper.Options.updateTools();
    WebDeveloper.Options.closeTool();
  }
};

// Handles a table drag ending
WebDeveloper.Options.tableDragEnd = function()
{
  WebDeveloper.Options.tableDragRow.classList.remove("dragging");
  WebDeveloper.Options.tableDragRow.closest("table").classList.add("table-striped");
};

// Handles a table drag over
WebDeveloper.Options.tableDragOver = function(event)
{
  var dragOverRow = event.target.closest("tr");
  var tableRows   = Array.from(event.target.closest("tbody").children);

  // If the drag over row is after the drag row
  if(tableRows.indexOf(dragOverRow) > tableRows.indexOf(WebDeveloper.Options.tableDragRow))
  {
    dragOverRow.after(WebDeveloper.Options.tableDragRow);
  }
  else
  {
    dragOverRow.before(WebDeveloper.Options.tableDragRow);
  }

  event.preventDefault();
};

// Handles a table drag starting
WebDeveloper.Options.tableDragStart = function(event)
{
  WebDeveloper.Options.tableDragRow = event.target;

  WebDeveloper.Options.tableDragRow.classList.add("dragging");
  WebDeveloper.Options.tableDragRow.closest("table").classList.remove("table-striped");
};

// Handles a key press when adding or editing a tool
WebDeveloper.Options.toolKeyPress = function(event)
{
  // If the enter key was pressed
  if(event.keyCode == 13)
  {
    WebDeveloper.Options.submitTool();
  }
};

// Handles a click inside the tools
WebDeveloper.Options.toolsClick = function(event)
{
  var button = event.target.closest("button");

  // If the target is a button
  if(button)
  {
    // If the target is an edit button
    if(button.classList.contains("btn-primary"))
    {
      WebDeveloper.Options.editTool(button);
    }
    else
    {
      WebDeveloper.Options.deleteTool(button);
    }

    event.preventDefault();
  }
};

// Updates the display overlay with setting
WebDeveloper.Options.updateDisplayOverlayWith = function()
{
  WebDeveloper.Storage.setItem("display_overlay_with", document.getElementById("display_overlay_with").value);
};

// Updates the overlay icon with setting
WebDeveloper.Options.updateOverlayIcon = function(event)
{
  WebDeveloper.Storage.setItem("overlay_icon", event.target.value, WebDeveloper.Storage.updateOverlayIcon);
};

// Updates the populate email address
WebDeveloper.Options.updatePopulateEmailAddress = function()
{
  WebDeveloper.Storage.setItem("populate_email_address", document.getElementById("populate_email_address").value.trim());
};

// Updates the resize options
WebDeveloper.Options.updateResizeOptions = function()
{
  var position           = 0;
  var resizeOptionsTable = document.getElementById("resize-options").querySelector("tbody");
  var resizeOptions      = resizeOptionsTable.querySelectorAll("tr");
  var resizeOptionsCount = resizeOptions.length;

  WebDeveloper.Storage.getItem("resize_count", function(item)
  {
    // Loop through the resize preferences
    for(var i = 1, l = item; i <= l; i++)
    {
      WebDeveloper.Storage.removeItem("resize_" + i + "_description");
      WebDeveloper.Storage.removeItem("resize_" + i + "_height");
      WebDeveloper.Storage.removeItem("resize_" + i + "_width");
    }

    // Loop through the resize options
    resizeOptions.forEach(function(resizeOption, index)
    {
      position = index + 1;

      WebDeveloper.Storage.setItem("resize_" + position + "_description", resizeOption.querySelector("td:nth-child(1)").textContent);
      WebDeveloper.Storage.setItem("resize_" + position + "_width", resizeOption.querySelector("td:nth-child(2)").textContent);
      WebDeveloper.Storage.setItem("resize_" + position + "_height", resizeOption.querySelector("td:nth-child(3)").textContent);
    });

    WebDeveloper.Storage.setItem("resize_count", resizeOptionsCount);

    // If there is only one resize option
    if(resizeOptionsCount == 1)
    {
      resizeOptionsTable.classList.add("single");
    }
    else
    {
      resizeOptionsTable.classList.remove("single");
    }
  });
};

// Updates the responsive layouts
WebDeveloper.Options.updateResponsiveLayouts = function()
{
  var position               = 0;
  var responsiveLayoutsTable = document.getElementById("responsive-layouts-options").querySelector("tbody");
  var responsiveLayouts      = responsiveLayoutsTable.querySelectorAll("tr");
  var responsiveLayoutsCount = responsiveLayouts.length;

  WebDeveloper.Storage.getItem("responsive_layout_count", function(item)
  {
    // Loop through the responsive layouts preferences
    for(var i = 1, l = item; i <= l; i++)
    {
      WebDeveloper.Storage.removeItem("responsive_layout_" + i + "_description");
      WebDeveloper.Storage.removeItem("responsive_layout_" + i + "_height");
      WebDeveloper.Storage.removeItem("responsive_layout_" + i + "_width");
    }

    // Loop through the responsive layouts
    responsiveLayouts.forEach(function(responsiveLayout, index)
    {
      position = index + 1;

      WebDeveloper.Storage.setItem("responsive_layout_" + position + "_description", responsiveLayout.querySelector("td:nth-child(1)").textContent);
      WebDeveloper.Storage.setItem("responsive_layout_" + position + "_width", responsiveLayout.querySelector("td:nth-child(2)").textContent);
      WebDeveloper.Storage.setItem("responsive_layout_" + position + "_height", responsiveLayout.querySelector("td:nth-child(3)").textContent);
    });

    WebDeveloper.Storage.setItem("responsive_layout_count", responsiveLayoutsCount);

    // If there is only one responsive layout
    if(responsiveLayoutsCount == 1)
    {
      responsiveLayoutsTable.classList.add("single");
    }
    else
    {
      responsiveLayoutsTable.classList.remove("single");
    }
  });
};

// Updates the syntax highlight theme
WebDeveloper.Options.updateSyntaxHighlightTheme = function()
{
  var theme = document.getElementById("syntax_highlight_theme").value;

  WebDeveloper.Storage.setItem("syntax_highlight_theme", theme);
  document.getElementById("syntax-highlight-browser").contentDocument.defaultView.WebDeveloper.setTheme(theme);
};

// Updates the tools
WebDeveloper.Options.updateTools = function()
{
  var position   = 0;
  var toolsTable = document.getElementById("tools-options").querySelector("tbody");
  var tools      = toolsTable.querySelectorAll("tr");
  var toolsCount = tools.length;

  WebDeveloper.Storage.getItem("tool_count", function(item)
  {
    // Loop through the tools preferences
    for(var i = 1, l = item; i <= l; i++)
    {
      WebDeveloper.Storage.removeItem("tool_" + i + "_description");
      WebDeveloper.Storage.removeItem("tool_" + i + "_url");
    }

    // Loop through the tools
    tools.forEach(function(tool, index)
    {
      position = index + 1;

      WebDeveloper.Storage.setItem("tool_" + position + "_description", tool.querySelector("td:nth-child(1)").textContent);
      WebDeveloper.Storage.setItem("tool_" + position + "_url", tool.querySelector("td:nth-child(2)").textContent);
    });

    WebDeveloper.Storage.setItem("tool_count", toolsCount);

    // If there is only one responsive layout
    if(toolsCount == 1)
    {
      toolsTable.classList.add("single");
    }
    else
    {
      toolsTable.classList.remove("single");
    }
  });
};

// Returns true if the resize option is valid
WebDeveloper.Options.validateResizeOption = function()
{
  var description = document.getElementById("resize-description");
  var height      = document.getElementById("resize-height");
  var heightValue = height.value.trim();
  var width       = document.getElementById("resize-width");
  var widthValue  = width.value.trim();
  var valid       = true;

  // If the description is not set
  if(description.value.trim() == "")
  {
    document.getElementById("resize-description-invalid").replaceChildren(WebDeveloper.Locales.getString("descriptionCannotBeEmpty"));
    description.classList.add("is-invalid");

    valid = false;
  }
  else
  {
    description.classList.remove("is-invalid");
  }

  // If the height is not set
  if(heightValue == "")
  {
    document.getElementById("resize-height-invalid").replaceChildren(WebDeveloper.Locales.getString("heightCannotBeEmpty"));
    height.classList.add("is-invalid");

    valid = false;
  }
  else if(heightValue != "*" && (parseInt(heightValue, 10) != heightValue || heightValue <= 0))
  {
    document.getElementById("resize-height-invalid").replaceChildren(WebDeveloper.Locales.getString("heightNotValid"));
    height.classList.add("is-invalid");

    valid = false;
  }
  else
  {
    height.classList.remove("is-invalid");
  }

  // If the width is not set
  if(widthValue == "")
  {
    document.getElementById("resize-width-invalid").replaceChildren(WebDeveloper.Locales.getString("widthCannotBeEmpty"));
    width.classList.add("is-invalid");

    valid = false;
  }
  else if(widthValue != "*" && (parseInt(widthValue, 10) != widthValue || widthValue <= 0))
  {
    document.getElementById("resize-width-invalid").replaceChildren(WebDeveloper.Locales.getString("widthNotValid"));
    width.classList.add("is-invalid");

    valid = false;
  }
  else
  {
    width.classList.remove("is-invalid");
  }

  return valid;
};

// Returns true if the responsive layout is valid
WebDeveloper.Options.validateResponsiveLayout = function()
{
  var description = document.getElementById("responsive-layout-description");
  var height      = document.getElementById("responsive-layout-height");
  var heightValue = height.value.trim();
  var width       = document.getElementById("responsive-layout-width");
  var widthValue  = width.value.trim();
  var valid       = true;

  // If the description is not set
  if(description.value.trim() == "")
  {
    document.getElementById("responsive-layout-description-invalid").replaceChildren(WebDeveloper.Locales.getString("descriptionCannotBeEmpty"));
    description.classList.add("is-invalid");

    valid = false;
  }
  else
  {
    description.classList.remove("is-invalid");
  }

  // If the height is not set
  if(heightValue == "")
  {
    document.getElementById("responsive-layout-height-invalid").replaceChildren(WebDeveloper.Locales.getString("heightCannotBeEmpty"));
    height.classList.add("is-invalid");

    valid = false;
  }
  else if(heightValue != "*" && (parseInt(heightValue, 10) != heightValue || heightValue <= 0))
  {
    document.getElementById("responsive-layout-height-invalid").replaceChildren(WebDeveloper.Locales.getString("heightNotValid"));
    height.classList.add("is-invalid");

    valid = false;
  }
  else
  {
    height.classList.remove("is-invalid");
  }

  // If the width is not set
  if(widthValue == "")
  {
    document.getElementById("responsive-layout-width-invalid").replaceChildren(WebDeveloper.Locales.getString("widthCannotBeEmpty"));
    width.classList.add("is-invalid");

    valid = false;
  }
  else if(widthValue != "*" && (parseInt(widthValue, 10) != widthValue || widthValue <= 0))
  {
    document.getElementById("responsive-layout-width-invalid").replaceChildren(WebDeveloper.Locales.getString("widthNotValid"));
    width.classList.add("is-invalid");

    valid = false;
  }
  else
  {
    width.classList.remove("is-invalid");
  }

  return valid;
};

// Returns true if the tool is valid
WebDeveloper.Options.validateTool = function()
{
  var description = document.getElementById("tool-description");
  var url         = document.getElementById("tool-url");
  var valid       = true;

  // If the description is not set
  if(description.value.trim() == "")
  {
    document.getElementById("tool-description-invalid").replaceChildren(WebDeveloper.Locales.getString("descriptionCannotBeEmpty"));
    description.classList.add("is-invalid");

    valid = false;
  }
  else
  {
    description.classList.remove("is-invalid");
  }

  // If the URL is not set
  if(url.value.trim() == "")
  {
    document.getElementById("tool-url-invalid").replaceChildren(WebDeveloper.Locales.getString("urlCannotBeEmpty"));
    description.classList.add("is-invalid");

    valid = false;
  }
  else
  {
    description.classList.remove("is-invalid");
  }

  return valid;
};

// If the document is still loading
if(document.readyState === "loading")
{
  document.addEventListener("DOMContentLoaded", WebDeveloper.Options.initialize);
}
else
{
  WebDeveloper.Options.initialize();
}
