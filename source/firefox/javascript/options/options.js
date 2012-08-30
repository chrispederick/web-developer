var WebDeveloper = WebDeveloper || {};

WebDeveloper.Options = WebDeveloper.Options || {};

// Adds a keyboard shortcut
WebDeveloper.Options.addKeyboardShortcut = function()
{
  document.documentElement.openSubDialog("chrome://web-developer/content/options/dialogs/keyboard.xul", "", ["add", document.getElementById("web-developer-keyboard-shortcuts").getRowCount()]);
  WebDeveloper.Options.initializeKeyboardPane();
};

// Adds a resize option
WebDeveloper.Options.addResizeOption = function()
{
  document.documentElement.openSubDialog("chrome://web-developer/content/options/dialogs/resize.xul", "", ["add", document.getElementById("web-developer-resize-options").getRowCount()]);
  WebDeveloper.Options.initializeResizePane();
};

// Adds a responsive layout
WebDeveloper.Options.addResponsiveLayout = function()
{
  document.documentElement.openSubDialog("chrome://web-developer/content/options/dialogs/responsive-layout.xul", "", ["add", document.getElementById("web-developer-responsive-layouts").getRowCount()]);
  WebDeveloper.Options.initializeResponsiveLayoutsPane();
};

// Adds a tool
WebDeveloper.Options.addTool = function()
{
  document.documentElement.openSubDialog("chrome://web-developer/content/options/dialogs/tool.xul", "", ["add", document.getElementById("web-developer-tools").getRowCount()]);
  WebDeveloper.Options.initializeToolsPane();
};

// Adds a view source with option
WebDeveloper.Options.addViewSourceWithOption = function()
{
  document.documentElement.openSubDialog("chrome://web-developer/content/options/dialogs/view-source-with.xul", "", ["add", document.getElementById("web-developer-view-source-with-options").getRowCount()]);
  WebDeveloper.Options.initializeViewSourcePane();
};

// Adds a tool separator
WebDeveloper.Options.addToolSeparator = function()
{
  var listItem  = document.createElement("listitem");
  var separator = document.createElement("separator");

  separator.setAttribute("class", "groove");
  listItem.appendChild(separator);

  separator = document.createElement("separator");

  separator.setAttribute("class", "groove");
  listItem.appendChild(separator);

  separator = document.createElement("separator");

  separator.setAttribute("class", "groove");
  listItem.appendChild(separator);

  document.getElementById("web-developer-tools").appendChild(listItem);
};

// Deletes a keyboard shortcut
WebDeveloper.Options.deleteKeyboardShortcut = function()
{
  var keyboardShortcuts = document.getElementById("web-developer-keyboard-shortcuts");

  // If the deletion is confirmed
  if(WebDeveloper.Options.displayDeleteConfirmation(WebDeveloper.Locales.getString("deleteKeyboardShortcut"), WebDeveloper.Locales.getFormattedString("deleteKeyboardShortcutConfirmation", [keyboardShortcuts.selectedItem.childNodes[0].getAttribute("label")])))
  {
    keyboardShortcuts.removeItemAt(keyboardShortcuts.selectedIndex);
    WebDeveloper.Options.updateKeyboardPreferences();
  }
};

// Deletes a resize option
WebDeveloper.Options.deleteResizeOption = function()
{
  var resizeOptions = document.getElementById("web-developer-resize-options");

  // If the deletion is confirmed
  if(WebDeveloper.Options.displayDeleteConfirmation(WebDeveloper.Locales.getString("deleteResizeOption"), WebDeveloper.Locales.getFormattedString("deleteResizeOptionConfirmation", [resizeOptions.selectedItem.childNodes[0].getAttribute("label")])))
  {
    resizeOptions.removeItemAt(resizeOptions.selectedIndex);
    WebDeveloper.Options.updateResizePreferences();
  }
};

// Deletes a responsive layout
WebDeveloper.Options.deleteResponsiveLayout = function()
{
  var responsiveLayouts = document.getElementById("web-developer-responsive-layouts");

  // If the deletion is confirmed
  if(WebDeveloper.Options.displayDeleteConfirmation(WebDeveloper.Locales.getString("deleteResponsiveLayout"), WebDeveloper.Locales.getFormattedString("deleteResponsiveLayoutConfirmation", [responsiveLayouts.selectedItem.childNodes[0].getAttribute("label")])))
  {
    responsiveLayouts.removeItemAt(responsiveLayouts.selectedIndex);
    WebDeveloper.Options.updateResponsiveLayoutsPreferences();
  }
};

// Deletes a tool
WebDeveloper.Options.deleteTool = function()
{
  var tools = document.getElementById("web-developer-tools");

  // If the deletion is confirmed
  if(WebDeveloper.Options.displayDeleteConfirmation(WebDeveloper.Locales.getString("deleteTool"), WebDeveloper.Locales.getFormattedString("deleteToolConfirmation", [tools.selectedItem.childNodes[0].getAttribute("label")])))
  {
    tools.removeItemAt(tools.selectedIndex);
    WebDeveloper.Options.updateToolsPreferences();
  }
};

// Deletes a view source with option
WebDeveloper.Options.deleteViewSourceWithOption = function()
{
  var viewSourceWithOptions = document.getElementById("web-developer-view-source-with-options");

  // If the deletion is confirmed
  if(WebDeveloper.Options.displayDeleteConfirmation(WebDeveloper.Locales.getString("deleteViewSourceWithOption"), WebDeveloper.Locales.getFormattedString("deleteViewSourceWithOptionConfirmation", [viewSourceWithOptions.selectedItem.childNodes[0].getAttribute("label")])))
  {
    viewSourceWithOptions.removeItemAt(viewSourceWithOptions.selectedIndex);
    WebDeveloper.Options.updateViewSourceWithPreferences();
  }
};

// Displays a delete confirmation dialog
WebDeveloper.Options.displayDeleteConfirmation = function(title, message)
{
  var promptService = Components.interfaces.nsIPromptService;

  // If the deletion is confirmed
  if(Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(promptService).confirmEx(null, title, message, promptService.BUTTON_TITLE_IS_STRING * promptService.BUTTON_POS_0 + promptService.BUTTON_TITLE_CANCEL * promptService.BUTTON_POS_1, WebDeveloper.Locales.getString("delete"), null, null, null, {value: false}) === 0)
  {
    return true;
  }

  return false;
};

// Edits a keyboard shortcut
WebDeveloper.Options.editKeyboardShortcut = function()
{
  document.documentElement.openSubDialog("chrome://web-developer/content/options/dialogs/keyboard.xul", "", ["edit", document.getElementById("web-developer-keyboard-shortcuts").selectedIndex]);
  WebDeveloper.Options.initializeKeyboardPane();
};

// Edits a resize option
WebDeveloper.Options.editResizeOption = function()
{
  document.documentElement.openSubDialog("chrome://web-developer/content/options/dialogs/resize.xul", "", ["edit", document.getElementById("web-developer-resize-options").selectedIndex]);
  WebDeveloper.Options.initializeResizePane();
};

// Edits a responsive layout
WebDeveloper.Options.editResponsiveLayout = function()
{
  document.documentElement.openSubDialog("chrome://web-developer/content/options/dialogs/responsive-layout.xul", "", ["edit", document.getElementById("web-developer-responsive-layouts").selectedIndex]);
  WebDeveloper.Options.initializeResponsiveLayoutsPane();
};

// Edits a tool
WebDeveloper.Options.editTool = function()
{
  document.documentElement.openSubDialog("chrome://web-developer/content/options/dialogs/tool.xul", "", ["edit", document.getElementById("web-developer-tools").selectedIndex]);
  WebDeveloper.Options.initializeToolsPane();
};

// Edits a view source with option
WebDeveloper.Options.editViewSourceWithOption = function()
{
  document.documentElement.openSubDialog("chrome://web-developer/content/options/dialogs/view-source-with.xul", "", ["edit", document.getElementById("web-developer-view-source-with-options").selectedIndex]);
  WebDeveloper.Options.initializeViewSourcePane();
};

// Removes all items from a list box
WebDeveloper.Options.emptyListBox = function(listBox)
{
  // While there are still rows
  while(listBox.getRowCount() > 0)
  {
    listBox.removeItemAt(0);
  }
};

// Initializes the options dialog
WebDeveloper.Options.initialize = function()
{
  // If the window arguments are set
  if(window.arguments)
  {
    var pane = document.getElementById("web-developer-options-" + window.arguments[0] + "-pane");

    // If the pane is set
    if(pane)
    {
      document.getElementById("web-developer-options").showPane(pane);
    }
  }
};

// Initializes the colors browser
WebDeveloper.Options.initializeColorsBrowser = function()
{
  WebDeveloper.Options.updateSyntaxHighlightTheme();

  document.getElementById("web-developer-syntax-highlight-browser").removeEventListener("load", WebDeveloper.Options.initializeColorsBrowser, true);
};

// Initializes the colors pane
WebDeveloper.Options.initializeColorsPane = function()
{
  // If the extension is not running on a Mac
  if(WebDeveloper.Common.isMac())
  {
    document.getElementById("web-developer-toolbar-color").hidden = false;
  }

  document.getElementById("web-developer-syntax-highlight-browser").addEventListener("load", WebDeveloper.Options.initializeColorsBrowser, true);
};

// Initializes the keyboard pane
WebDeveloper.Options.initializeKeyboardPane = function()
{
  var command           = null;
  var feature           = null;
  var key               = null;
  var keyboardShortcuts = document.getElementById("web-developer-keyboard-shortcuts");
  var listCell          = null;
  var listItem          = null;
  var modifiers         = null;
  var modifierSeparator = WebDeveloper.Locales.getString("MODIFIER_SEPARATOR", "web-developer-platform-keys");

  WebDeveloper.Options.emptyListBox(keyboardShortcuts);

  // Loop through the keyboard shortcuts
  for(var i = 1, l = WebDeveloper.Preferences.getExtensionIntegerPreference("keyboard.count"); i <= l; i++)
  {
    feature = WebDeveloper.Preferences.getExtensionStringPreference("keyboard." + i + ".feature");
    key     = WebDeveloper.Preferences.getLocalizedPreference("keyboard." + i + ".key");
    modifiers = WebDeveloper.Preferences.getExtensionStringPreference("keyboard." + i + ".modifiers");

    // If the feature, key and modifiers are set
    if(feature && key && modifiers)
    {
      command = WebDeveloper.Common.getMainWindow().document.getElementById("web-developer-" + feature + "-command");

      // If the command is set
      if(command)
      {
        listCell = document.createElement("listcell");
        listItem = document.createElement("listitem");

        listCell.setAttribute("data-web-developer-feature", feature);
        listCell.setAttribute("label", command.getAttribute("label"));
        listItem.appendChild(listCell);

        listCell = document.createElement("listcell");

        listCell.setAttribute("data-web-developer-key", key);
        listCell.setAttribute("data-web-developer-modifiers", modifiers);

        // If the modifiers are alt and shift
        if(modifiers == "alt shift")
        {
          listCell.setAttribute("label", WebDeveloper.Locales.getString("VK_ALT", "web-developer-platform-keys") + modifierSeparator + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys") + modifierSeparator + key);
        }
        else if(modifiers == "control shift")
        {
          listCell.setAttribute("label", WebDeveloper.Locales.getString("VK_CONTROL", "web-developer-platform-keys") + modifierSeparator + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys") + modifierSeparator + key);
        }
        else if(modifiers == "meta shift")
        {
          listCell.setAttribute("label", WebDeveloper.Locales.getString("VK_META", "web-developer-platform-keys") + modifierSeparator + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys") + modifierSeparator + key);
        }

        listItem.appendChild(listCell);

        keyboardShortcuts.appendChild(listItem);
      }
    }
  }
};

// Initializes the resize pane
WebDeveloper.Options.initializeResizePane = function()
{
  var description       = null;
  var height            = 0;
  var key               = null;
  var listCell          = null;
  var listItem          = null;
  var modifiers         = null;
  var modifierSeparator = WebDeveloper.Locales.getString("MODIFIER_SEPARATOR", "web-developer-platform-keys");
  var resizeOptions     = document.getElementById("web-developer-resize-options");
  var viewport          = false;
  var width             = 0;

  WebDeveloper.Options.emptyListBox(resizeOptions);

  // Loop through the resize options
  for(var i = 1, l = WebDeveloper.Preferences.getExtensionIntegerPreference("resize.count"); i <= l; i++)
  {
    description = WebDeveloper.Preferences.getLocalizedPreference("resize." + i + ".description");
    height      = WebDeveloper.Preferences.getExtensionIntegerPreference("resize." + i + ".height");
    key         = WebDeveloper.Preferences.getLocalizedPreference("resize." + i + ".key");
    modifiers   = WebDeveloper.Preferences.getExtensionStringPreference("resize." + i + ".modifiers");
    width       = WebDeveloper.Preferences.getExtensionIntegerPreference("resize." + i + ".width");

    // If the description, height and width are set
    if(description && height > 0 && width > 0)
    {
      listCell = document.createElement("listcell");
      listItem = document.createElement("listitem");
      viewport = WebDeveloper.Preferences.getExtensionBooleanPreference("resize." + i + ".viewport");

      listCell.setAttribute("label", description);
      listItem.appendChild(listCell);

      listCell = document.createElement("listcell");

      listCell.setAttribute("label", width);
      listItem.appendChild(listCell);

      listCell = document.createElement("listcell");

      listCell.setAttribute("label", height);
      listItem.appendChild(listCell);

      listCell = document.createElement("listcell");

      // If resizing the viewport
      if(viewport)
      {
        listCell.setAttribute("label", WebDeveloper.Locales.getString("yes"));
      }
      else
      {
        listCell.setAttribute("label", WebDeveloper.Locales.getString("no"));
      }

      listItem.appendChild(listCell);

      listCell = document.createElement("listcell");

      // If a key and modifiers are set
      if(key && modifiers)
      {
        listCell.setAttribute("data-web-developer-key", key);
        listCell.setAttribute("data-web-developer-modifiers", modifiers);

        // If the modifiers are alt and shift
        if(modifiers == "alt shift")
        {
          listCell.setAttribute("label", WebDeveloper.Locales.getString("VK_ALT", "web-developer-platform-keys") + modifierSeparator + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys") + modifierSeparator + key);
        }
        else if(modifiers == "control shift")
        {
          listCell.setAttribute("label", WebDeveloper.Locales.getString("VK_CONTROL", "web-developer-platform-keys") + modifierSeparator + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys") + modifierSeparator + key);
        }
        else if(modifiers == "meta shift")
        {
          listCell.setAttribute("label", WebDeveloper.Locales.getString("VK_META", "web-developer-platform-keys") + modifierSeparator + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys") + modifierSeparator + key);
        }
      }

      listItem.appendChild(listCell);

      resizeOptions.appendChild(listItem);
    }
  }
};

// Initializes the responsive layouts pane
WebDeveloper.Options.initializeResponsiveLayoutsPane = function()
{
  var description       = null;
  var height            = 0;
  var listCell          = null;
  var listItem          = null;
  var responsiveLayouts = document.getElementById("web-developer-responsive-layouts");
  var width             = 0;

  WebDeveloper.Options.emptyListBox(responsiveLayouts);

  // Loop through the responsive layouts
  for(var i = 1, l = WebDeveloper.Preferences.getExtensionIntegerPreference("responsive.layout.count"); i <= l; i++)
  {
    description = WebDeveloper.Preferences.getLocalizedPreference("responsive.layout." + i + ".description");
    height      = WebDeveloper.Preferences.getExtensionIntegerPreference("responsive.layout." + i + ".height");
    width       = WebDeveloper.Preferences.getExtensionIntegerPreference("responsive.layout." + i + ".width");

    // If the description, height and width are set
    if(description && height > 0 && width > 0)
    {
      listCell = document.createElement("listcell");
      listItem = document.createElement("listitem");

      listCell.setAttribute("label", description);
      listItem.appendChild(listCell);

      listCell = document.createElement("listcell");

      listCell.setAttribute("label", width);
      listItem.appendChild(listCell);

      listCell = document.createElement("listcell");

      listCell.setAttribute("label", height);
      listItem.appendChild(listCell);

      responsiveLayouts.appendChild(listItem);
    }
  }
};

// Initializes the tools pane
WebDeveloper.Options.initializeToolsPane = function()
{
  var description       = null;
  var key               = null;
  var listCell          = null;
  var listItem          = null;
  var modifiers         = null;
  var modifierSeparator = WebDeveloper.Locales.getString("MODIFIER_SEPARATOR", "web-developer-platform-keys");
  var path              = null;
  var separator         = null;
  var tools             = document.getElementById("web-developer-tools");
  var url               = null;

  WebDeveloper.Options.emptyListBox(tools);

  // Loop through the tools
  for(var i = 1, l = WebDeveloper.Preferences.getExtensionIntegerPreference("tool.count"); i <= l; i++)
  {
    // If this is a separator
    if(WebDeveloper.Preferences.getExtensionBooleanPreference("tool." + i + ".separator"))
    {
      separator = document.createElement("separator");
      listItem  = document.createElement("listitem");

      separator.setAttribute("class", "groove");
      listItem.appendChild(separator);

      separator = document.createElement("separator");

      separator.setAttribute("class", "groove");
      listItem.appendChild(separator);

      separator = document.createElement("separator");

      separator.setAttribute("class", "groove");
      listItem.appendChild(separator);

      tools.appendChild(listItem);
    }
    else
    {
      description = WebDeveloper.Preferences.getLocalizedPreference("tool." + i + ".description");
      path        = WebDeveloper.Preferences.getExtensionStringPreference("tool." + i + ".path");
      url         = WebDeveloper.Preferences.getExtensionStringPreference("tool." + i + ".url");

      // If the description and either a path or url are set
      if((description && (path || url)))
      {
        key       = WebDeveloper.Preferences.getLocalizedPreference("tool." + i + ".key");
        listCell  = document.createElement("listcell");
        listItem  = document.createElement("listitem");
        modifiers = WebDeveloper.Preferences.getExtensionStringPreference("tool." + i + ".modifiers");

        listCell.setAttribute("label", description);
        listItem.appendChild(listCell);

        listCell = document.createElement("listcell");

        // If a path is set
        if(path)
        {
          listCell.setAttribute("data-web-developer-tool-type", "path");
          listCell.setAttribute("label", path);
        }
        else
        {
          listCell.setAttribute("data-web-developer-tool-type", "url");
          listCell.setAttribute("label", url);
        }

        listItem.appendChild(listCell);

        listCell = document.createElement("listcell");

        // If a key and modifiers are set
        if(key && modifiers)
        {
          listCell.setAttribute("data-web-developer-key", key);
          listCell.setAttribute("data-web-developer-modifiers", modifiers);

          // If the modifiers are alt and shift
          if(modifiers == "alt shift")
          {
            listCell.setAttribute("label", WebDeveloper.Locales.getString("VK_ALT", "web-developer-platform-keys") + modifierSeparator + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys") + modifierSeparator + key);
          }
          else if(modifiers == "control shift")
          {
            listCell.setAttribute("label", WebDeveloper.Locales.getString("VK_CONTROL", "web-developer-platform-keys") + modifierSeparator + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys") + modifierSeparator + key);
          }
          else if(modifiers == "meta shift")
          {
            listCell.setAttribute("label", WebDeveloper.Locales.getString("VK_META", "web-developer-platform-keys") + modifierSeparator + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys") + modifierSeparator + key);
          }
        }

        listItem.appendChild(listCell);

        tools.appendChild(listItem);
      }
    }
  }
};

// Initializes the view source pane
WebDeveloper.Options.initializeViewSourcePane = function()
{
  var description           = null;
  var key                   = null;
  var listCell              = null;
  var listItem              = null;
  var modifiers             = null;
  var modifierSeparator     = WebDeveloper.Locales.getString("MODIFIER_SEPARATOR", "web-developer-platform-keys");
  var path                  = null;
  var viewSourceWithOptions = document.getElementById("web-developer-view-source-with-options");

  WebDeveloper.Options.emptyListBox(viewSourceWithOptions);

  // Loop through the view source with options
  for(var i = 1, l = WebDeveloper.Preferences.getExtensionIntegerPreference("view.source.with.count"); i <= l; i++)
  {
    description = WebDeveloper.Preferences.getExtensionStringPreference("view.source.with." + i + ".description");
    path        = WebDeveloper.Preferences.getExtensionStringPreference("view.source.with." + i + ".path");

    // If the description and path are set
    if(description && path)
    {
      key       = WebDeveloper.Preferences.getExtensionStringPreference("view.source.with." + i + ".key");
      listCell  = document.createElement("listcell");
      listItem  = document.createElement("listitem");
      modifiers = WebDeveloper.Preferences.getExtensionStringPreference("tool." + i + ".modifiers");

      listCell.setAttribute("label", description);
      listItem.appendChild(listCell);

      listCell = document.createElement("listcell");

      listCell.setAttribute("label", path);
      listItem.appendChild(listCell);

      listCell = document.createElement("listcell");

      // If a key and modifiers are set
      if(key && modifiers)
      {
        listCell.setAttribute("data-web-developer-key", key);
        listCell.setAttribute("data-web-developer-modifiers", modifiers);

        // If the modifiers are alt and shift
        if(modifiers == "alt shift")
        {
          listCell.setAttribute("label", WebDeveloper.Locales.getString("VK_ALT", "web-developer-platform-keys") + modifierSeparator + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys") + modifierSeparator + key);
        }
        else if(modifiers == "control shift")
        {
          listCell.setAttribute("label", WebDeveloper.Locales.getString("VK_CONTROL", "web-developer-platform-keys") + modifierSeparator + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys") + modifierSeparator + key);
        }
        else if(modifiers == "meta shift")
        {
          listCell.setAttribute("label", WebDeveloper.Locales.getString("VK_META", "web-developer-platform-keys") + modifierSeparator + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys") + modifierSeparator + key);
        }
      }

      listItem.appendChild(listCell);

      viewSourceWithOptions.appendChild(listItem);
    }
  }
};

// Moves down an item in a list box
WebDeveloper.Options.moveDownListBoxItem = function(listBox)
{
  var selectedItem  = listBox.selectedItem;
  var selectedIndex = listBox.selectedIndex;

  // If an item is selected and it is not at the bottom
  if(selectedItem && selectedIndex != listBox.getRowCount() - 1)
  {
    listBox.selectItem(listBox.insertBefore(selectedItem, listBox.getItemAtIndex(selectedIndex + 2)));
  }
};

// Moves down a resize option
WebDeveloper.Options.moveDownResizeOption = function()
{
  WebDeveloper.Options.moveDownListBoxItem(document.getElementById("web-developer-resize-options"));
  WebDeveloper.Options.updateResizePreferences();
};

// Moves down a responsive layout
WebDeveloper.Options.moveDownResponsiveLayout = function()
{
  WebDeveloper.Options.moveDownListBoxItem(document.getElementById("web-developer-responsive-layouts"));
  WebDeveloper.Options.updateResponsiveLayoutsPreferences();
};

// Moves down a tool
WebDeveloper.Options.moveDownTool = function()
{
  WebDeveloper.Options.moveDownListBoxItem(document.getElementById("web-developer-tools"));
  WebDeveloper.Options.updateToolsPreferences();
};

// Moves down a view source with option
WebDeveloper.Options.moveDownViewSourceWithOption = function()
{
  WebDeveloper.Options.moveDownListBoxItem(document.getElementById("web-developer-view-source-with-options"));
  WebDeveloper.Options.updateViewSourceWithPreferences();
};

// Moves up an item in a list box
WebDeveloper.Options.moveUpListBoxItem = function(listBox)
{
  var selectedItem  = listBox.selectedItem;
  var selectedIndex = listBox.selectedIndex;

  // If an item is selected and it is not at the top
  if(selectedItem && selectedIndex !== 0)
  {
    listBox.selectItem(listBox.insertBefore(selectedItem, listBox.getItemAtIndex(selectedIndex - 1)));
  }
};

// Moves up a resize option
WebDeveloper.Options.moveUpResizeOption = function()
{
  WebDeveloper.Options.moveUpListBoxItem(document.getElementById("web-developer-resize-options"));
  WebDeveloper.Options.updateResizePreferences();
};

// Moves up a responsive layout
WebDeveloper.Options.moveUpResponsiveLayout = function()
{
  WebDeveloper.Options.moveUpListBoxItem(document.getElementById("web-developer-responsive-layouts"));
  WebDeveloper.Options.updateResponsiveLayoutsPreferences();
};

// Moves up a tool
WebDeveloper.Options.moveUpTool = function()
{
  WebDeveloper.Options.moveUpListBoxItem(document.getElementById("web-developer-tools"));
  WebDeveloper.Options.updateToolsPreferences();
};

// Moves up a view source with option
WebDeveloper.Options.moveUpViewSourceWithOption = function()
{
  WebDeveloper.Options.moveUpListBoxItem(document.getElementById("web-developer-view-source-with-options"));
  WebDeveloper.Options.updateViewSourceWithPreferences();
};

// Handles a keyboard shortcut being selected
WebDeveloper.Options.selectKeyboardShortcut = function()
{
  var selectedItem = document.getElementById("web-developer-keyboard-shortcuts").selectedItem;

  document.getElementById("web-developer-delete-keyboard-shortcut").disabled = !selectedItem;
  document.getElementById("web-developer-edit-keyboard-shortcut").disabled   = !selectedItem;
};

// Handles a resize option being selected
WebDeveloper.Options.selectResizeOption = function()
{
  var resizeOptions = document.getElementById("web-developer-resize-options");
  var resizeCount   = resizeOptions.getRowCount();
  var selectedIndex = resizeOptions.selectedIndex;
  var selectedItem  = resizeOptions.selectedItem;

  document.getElementById("web-developer-delete-resize-option").disabled    = !selectedItem || resizeCount == 1;
  document.getElementById("web-developer-edit-resize-option").disabled      = !selectedItem;
  document.getElementById("web-developer-move-down-resize-option").disabled = !selectedItem || selectedIndex == resizeCount - 1;
  document.getElementById("web-developer-move-up-resize-option").disabled   = !selectedItem || !selectedIndex;
};

// Handles a responsive layout being selected
WebDeveloper.Options.selectResponsiveLayout = function()
{
  var responsiveLayouts     = document.getElementById("web-developer-responsive-layouts");
  var responsiveLayoutCount = responsiveLayouts.getRowCount();
  var selectedIndex         = responsiveLayouts.selectedIndex;
  var selectedItem          = responsiveLayouts.selectedItem;

  document.getElementById("web-developer-delete-responsive-layout").disabled    = !selectedItem || responsiveLayoutCount == 1;
  document.getElementById("web-developer-edit-responsive-layout").disabled      = !selectedItem;
  document.getElementById("web-developer-move-down-responsive-layout").disabled = !selectedItem || selectedIndex == responsiveLayoutCount - 1;
  document.getElementById("web-developer-move-up-responsive-layout").disabled   = !selectedItem || !selectedIndex;
};

// Handles a tool being selected
WebDeveloper.Options.selectTool = function()
{
  var tools         = document.getElementById("web-developer-tools");
  var selectedIndex = tools.selectedIndex;
  var selectedItem  = tools.selectedItem;
  var toolCount     = tools.getRowCount();

  document.getElementById("web-developer-delete-tool").disabled    = !selectedItem || toolCount == 1;
  document.getElementById("web-developer-edit-tool").disabled      = !selectedItem;
  document.getElementById("web-developer-move-down-tool").disabled = !selectedItem || selectedIndex == toolCount - 1;
  document.getElementById("web-developer-move-up-tool").disabled   = !selectedItem || !selectedIndex;
};

// Handles a view source with option being selected
WebDeveloper.Options.selectViewSourceWithOption = function()
{
  var viewSourceWithOptions = document.getElementById("web-developer-view-source-with-options");
  var selectedIndex         = viewSourceWithOptions.selectedIndex;
  var selectedItem          = viewSourceWithOptions.selectedItem;
  var viewSourceWithCount   = viewSourceWithOptions.getRowCount();

  document.getElementById("web-developer-delete-view-source-with-option").disabled    = !selectedItem;
  document.getElementById("web-developer-edit-view-source-with-option").disabled      = !selectedItem;
  document.getElementById("web-developer-move-down-view-source-with-option").disabled = !selectedItem || selectedIndex == viewSourceWithCount - 1;
  document.getElementById("web-developer-move-up-view-source-with-option").disabled   = !selectedItem || !selectedIndex;
};

// Updates the keyboard preferences
WebDeveloper.Options.updateKeyboardPreferences = function()
{
  var feature               = null;
  var key                   = null;
  var keyboard              = null;
  var keyboardShortcut      = null;
  var keyboardShortcuts     = document.getElementById("web-developer-keyboard-shortcuts");
  var keyboardShortcutCount = keyboardShortcuts.getRowCount();
  var modifiers             = null;
  var position              = 0;

  // Loop through the keyboard shortcuts
  for(var i = 1, l = WebDeveloper.Preferences.getExtensionIntegerPreference("keyboard.count"); i <= l; i++)
  {
    WebDeveloper.Preferences.deleteExtensionPreference("keyboard." + i + ".feature");
    WebDeveloper.Preferences.deleteExtensionPreference("keyboard." + i + ".key");
    WebDeveloper.Preferences.deleteExtensionPreference("keyboard." + i + ".modifiers");
  }

  // Loop through the keyboard shortcuts
  for(i = 0; i < keyboardShortcutCount; i++)
  {
    position         = i + 1;
    keyboardShortcut = keyboardShortcuts.getItemAtIndex(i).childNodes;
    feature          = keyboardShortcut[0].getAttribute("data-web-developer-feature");
    keyboard         = keyboardShortcut[1];
    key              = keyboard.getAttribute("data-web-developer-key");
    modifiers        = keyboard.getAttribute("data-web-developer-modifiers");

    // If the keyboard shortcut description matches the original localized version
    if(key == WebDeveloper.Locales.getString("extensions.webdeveloper.keyboard." + position + ".key"))
    {
      WebDeveloper.Preferences.deleteExtensionPreference("keyboard." + position + ".key");
    }
    else
    {
      WebDeveloper.Preferences.setExtensionStringPreference("keyboard." + position + ".key", key);
    }

    WebDeveloper.Preferences.setExtensionStringPreference("keyboard." + position + ".feature", feature);
    WebDeveloper.Preferences.setExtensionStringPreference("keyboard." + position + ".modifiers", modifiers);
  }

  WebDeveloper.Preferences.setExtensionIntegerPreference("keyboard.count", keyboardShortcutCount);
};

// Updates the resize preferences
WebDeveloper.Options.updateResizePreferences = function()
{
  var key           = null;
  var keyboard      = null;
  var modifiers     = null;
  var position      = 0;
  var resizeOption  = null;
  var resizeOptions = document.getElementById("web-developer-resize-options");
  var resizeCount   = resizeOptions.getRowCount();
  var viewport      = false;

  // Loop through the resize preferences
  for(var i = 1, l = WebDeveloper.Preferences.getExtensionIntegerPreference("resize.count"); i <= l; i++)
  {
    WebDeveloper.Preferences.deleteExtensionPreference("resize." + i + ".description");
    WebDeveloper.Preferences.deleteExtensionPreference("resize." + i + ".height");
    WebDeveloper.Preferences.deleteExtensionPreference("resize." + i + ".key");
    WebDeveloper.Preferences.deleteExtensionPreference("resize." + i + ".modifiers");
    WebDeveloper.Preferences.deleteExtensionPreference("resize." + i + ".viewport");
    WebDeveloper.Preferences.deleteExtensionPreference("resize." + i + ".width");
  }

  // Loop through the resize options
  for(i = 0; i < resizeCount; i++)
  {
    position     = i + 1;
    resizeOption = resizeOptions.getItemAtIndex(i).childNodes;
    keyboard     = resizeOption[3];
    key          = keyboard.getAttribute("data-web-developer-key");
    modifiers    = keyboard.getAttribute("data-web-developer-modifiers");
    viewport     = false;

    WebDeveloper.Preferences.setExtensionStringPreference("resize." + position + ".description", resizeOption[0].getAttribute("label"));
    WebDeveloper.Preferences.setExtensionIntegerPreference("resize." + position + ".width", resizeOption[1].getAttribute("label"));
    WebDeveloper.Preferences.setExtensionIntegerPreference("resize." + position + ".height", resizeOption[2].getAttribute("label"));

    // If resizing the viewport
    if(resizeOption[3].getAttribute("label") == WebDeveloper.Locales.getString("yes"))
    {
      viewport = true;
    }

    WebDeveloper.Preferences.setExtensionBooleanPreference("resize." + position + ".viewport", viewport);

    // If a key and modifiers are set
    if(key && modifiers)
    {
      WebDeveloper.Preferences.setExtensionStringPreference("resize." + position + ".key", key);
      WebDeveloper.Preferences.setExtensionStringPreference("resize." + position + ".modifiers", modifiers);
    }
  }

  WebDeveloper.Preferences.setExtensionIntegerPreference("resize.count", resizeCount);

  // If the first resize description matches the original localized version
  if(WebDeveloper.Preferences.getExtensionStringPreference("resize.1.description") == WebDeveloper.Locales.getString("extensions.webdeveloper.resize.1.description"))
  {
    WebDeveloper.Preferences.deleteExtensionPreference("resize.1.description");
  }
};

// Updates the responsive layouts preferences
WebDeveloper.Options.updateResponsiveLayoutsPreferences = function()
{
  var description           = null;
  var position              = 0;
  var responsiveLayout      = null;
  var responsiveLayouts     = document.getElementById("web-developer-responsive-layouts");
  var responsiveLayoutCount = responsiveLayouts.getRowCount();

  // Loop through the responsive layout preferences
  for(var i = 1, l = WebDeveloper.Preferences.getExtensionIntegerPreference("responsive.layout.count"); i <= l; i++)
  {
    WebDeveloper.Preferences.deleteExtensionPreference("responsive.layout." + i + ".description");
    WebDeveloper.Preferences.deleteExtensionPreference("responsive.layout." + i + ".height");
    WebDeveloper.Preferences.deleteExtensionPreference("responsive.layout." + i + ".width");
  }

  // Loop through the responsive layout options
  for(i = 0; i < responsiveLayoutCount; i++)
  {
    position         = i + 1;
    responsiveLayout = responsiveLayouts.getItemAtIndex(i).childNodes;
    description      = responsiveLayout[0].getAttribute("label");

    WebDeveloper.Preferences.setExtensionIntegerPreference("responsive.layout." + position + ".width", responsiveLayout[1].getAttribute("label"));
    WebDeveloper.Preferences.setExtensionIntegerPreference("responsive.layout." + position + ".height", responsiveLayout[2].getAttribute("label"));

    // If the responsive option description matches the original localized version
    if(description == WebDeveloper.Locales.getString("extensions.webdeveloper.responsive.layout." + position + ".description"))
    {
      WebDeveloper.Preferences.deleteExtensionPreference("responsive.layout." + position + ".description");
    }
    else
    {
      WebDeveloper.Preferences.setExtensionStringPreference("responsive.layout." + position + ".description", description);
    }
  }

  WebDeveloper.Preferences.setExtensionIntegerPreference("responsive.layout.count", responsiveLayoutCount);
};

// Updates the syntax highlight theme
WebDeveloper.Options.updateSyntaxHighlightTheme = function()
{
  document.getElementById("web-developer-syntax-highlight-browser").contentDocument.defaultView.WebDeveloper.setTheme(document.getElementById("web-developer-syntax-highlight-theme").value);
};

// Updates the tools preferences
WebDeveloper.Options.updateToolsPreferences = function()
{
  var description = null;
  var key         = null;
  var keyboard    = null;
  var modifiers   = null;
  var pathURL     = null;
  var position    = 0;
  var tool        = null;
  var tools       = document.getElementById("web-developer-tools");
  var toolCount   = tools.getRowCount();

  // Loop through the tools preferences
  for(var i = 1, l = WebDeveloper.Preferences.getExtensionIntegerPreference("tool.count"); i <= l; i++)
  {
    WebDeveloper.Preferences.deleteExtensionPreference("tool." + i + ".description");
    WebDeveloper.Preferences.deleteExtensionPreference("tool." + i + ".key");
    WebDeveloper.Preferences.deleteExtensionPreference("tool." + i + ".modifiers");
    WebDeveloper.Preferences.deleteExtensionPreference("tool." + i + ".path");
    WebDeveloper.Preferences.deleteExtensionPreference("tool." + i + ".separator");
    WebDeveloper.Preferences.deleteExtensionPreference("tool." + i + ".url");
  }

  // Loop through the tools
  for(i = 0; i < toolCount; i++)
  {
    position = i + 1;
    tool     = tools.getItemAtIndex(i).childNodes;

    // If this is a separator
    if(tool[0].nodeName == "separator")
    {
      WebDeveloper.Preferences.setExtensionBooleanPreference("tool." + i + ".separator");
    }
    else
    {
      description = tool[0].getAttribute("label");
      keyboard    = tool[2];
      key         = keyboard.getAttribute("data-web-developer-key");
      modifiers   = keyboard.getAttribute("data-web-developer-modifiers");
      pathURL     = tool[1];

      // If the tool description matches the original localized version
      if(description == WebDeveloper.Locales.getString("extensions.webdeveloper.tool." + position + ".description"))
      {
        WebDeveloper.Preferences.deleteExtensionPreference("tool." + position + ".description");
      }
      else
      {
        WebDeveloper.Preferences.setExtensionStringPreference("tool." + position + ".description", description);
      }

      // If this is an application
      if(pathURL.getAttribute("data-web-developer-tool-type") == "path")
      {
        WebDeveloper.Preferences.setExtensionStringPreference("tool." + position + ".path", pathURL.getAttribute("label"));
      }
      else
      {
        WebDeveloper.Preferences.setExtensionStringPreference("tool." + position + ".url", pathURL.getAttribute("label"));
      }

      // If a key and modifiers are set
      if(key && modifiers)
      {
        // If the tool key matches the original localized version
        if(key == WebDeveloper.Locales.getString("extensions.webdeveloper.tool." + position + ".key"))
        {
          WebDeveloper.Preferences.deleteExtensionPreference("tool." + position + ".key");
        }
        else
        {
          WebDeveloper.Preferences.setExtensionStringPreference("tool." + position + ".key", key);
        }

        WebDeveloper.Preferences.setExtensionStringPreference("tool." + position + ".modifiers", modifiers);
      }
    }
  }

  WebDeveloper.Preferences.setExtensionIntegerPreference("tool.count", toolCount);
};

// Updates the view source with preferences
WebDeveloper.Options.updateViewSourceWithPreferences = function()
{
  var key                   = null;
  var keyboard              = null;
  var modifiers             = null;
  var position              = 0;
  var viewSourceWithOption  = null;
  var viewSourceWithOptions = document.getElementById("web-developer-view-source-with-options");
  var viewSourceWithCount   = viewSourceWithOptions.getRowCount();

  // Loop through the view source with preferences
  for(var i = 1, l = WebDeveloper.Preferences.getExtensionIntegerPreference("view.source.with.count"); i <= l; i++)
  {
    WebDeveloper.Preferences.deleteExtensionPreference("view.source.with." + i + ".description");
    WebDeveloper.Preferences.deleteExtensionPreference("view.source.with." + i + ".key");
    WebDeveloper.Preferences.deleteExtensionPreference("view.source.with." + i + ".modifiers");
    WebDeveloper.Preferences.deleteExtensionPreference("view.source.with." + i + ".path");
  }

  // Loop through the view source with options
  for(i = 0; i < viewSourceWithCount; i++)
  {
    position             = i + 1;
    viewSourceWithOption = viewSourceWithOptions.getItemAtIndex(i).childNodes;
    keyboard             = viewSourceWithOption[2];
    key                  = keyboard.getAttribute("data-web-developer-key");
    modifiers            = keyboard.getAttribute("data-web-developer-modifiers");

    WebDeveloper.Preferences.setExtensionStringPreference("view.source.with." + position + ".description", viewSourceWithOption[0].getAttribute("label"));
    WebDeveloper.Preferences.setExtensionStringPreference("view.source.with." + position + ".path", viewSourceWithOption[1].getAttribute("label"));

    // If a key and modifiers are set
    if(key && modifiers)
    {
      WebDeveloper.Preferences.setExtensionStringPreference("view.source.with." + position + ".key", key);
      WebDeveloper.Preferences.setExtensionStringPreference("view.source.with." + position + ".modifiers", modifiers);
    }
  }

  WebDeveloper.Preferences.setExtensionIntegerPreference("view.source.with.count", viewSourceWithCount);
};
