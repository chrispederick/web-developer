var WebDeveloper = WebDeveloper || {};

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
  var anchor            = null;
  var childElement      = null;
  var container         = null;
  var content           = document.getElementById("content");
  var element           = null;
  var filesDropdown     = $("#files-dropdown");
  var filesDropdownMenu = $(".dropdown-menu", filesDropdown).get(0);
  var height            = null;
  var layout            = null;
  var layoutDescription = null;
  var layouts           = data.layouts;
  var url               = data.pageURL;
  var width             = null;
  var scrollbarWidth	= WebDeveloper.Common.getScrollbarWidth();
  
  WebDeveloper.Generated.emptyContent();
  WebDeveloper.Generated.localizeHeader(locale);
  WebDeveloper.Generated.setPageTitle(locale.responsiveLayouts, data, locale);
  WebDeveloper.Generated.addDocument(url, 0);

  $(".dropdown-toggle", filesDropdown).prepend(locale.layouts);

  // Loop through the layouts
  for(var i = 0, l = layouts.length; i < l; i++)
  {
    anchor            = "layout-" + i;
    layout            = layouts[i];
    childElement      = document.createElement("i");
    element           = document.createElement("h3");
    height            = parseInt(layout.height) + scrollbarWidth;
    width             = parseInt(layout.width) + scrollbarWidth;
    layoutDescription = layout.description + " (" + layout.height + "x" + layout.width + ")";

    childElement.setAttribute("class", "icon-caret-down");
    element.appendChild(childElement);
    element.setAttribute("id", anchor);
    element.appendChild(document.createTextNode(layoutDescription));
    content.appendChild(element);

    childElement = document.createElement("iframe");
    container    = WebDeveloper.Generated.generateDocumentContainer();

    childElement.setAttribute("height", height);
    childElement.setAttribute("src", url);
    childElement.setAttribute("width", width);
	childElement.setAttribute("scrolling", "yes");

    container.appendChild(childElement);
    content.appendChild(container);
    WebDeveloper.Generated.addSeparator();

    childElement = document.createElement("a");
    element      = document.createElement("li");

    childElement.appendChild(document.createTextNode(layoutDescription));
    childElement.setAttribute("href", "#" + anchor);
    filesDropdownMenu.appendChild(element);
  }
  
  $("#web-developer-reload").text(locale.reloadLayouts).on("click", WebDeveloper.Generated.reloadLayouts);

  WebDeveloper.Generated.initializeCommonElements();
};

// Reloads the layouts
WebDeveloper.Generated.reloadLayouts = function(event)
{
  var iframe = null;

  // Loop through the iframes
  $("iframe").each(function()
  {
    iframe = $(this);

    iframe.attr("src", iframe.attr("src"));
  });

  event.preventDefault();
};
