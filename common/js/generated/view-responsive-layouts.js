var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Returns the width of the vertical scrollbar (same as the height of the horizontal one)
WebDeveloper.Generated.getScrollbarWidth = function(content)
{
  var innerDiv       = document.createElement("div");
  var outerDiv       = document.createElement("div");
  var scrollbarWidth = 0;

  innerDiv.style.height   = "150px";
  outerDiv.style.height   = "100px";
  outerDiv.style.overflow = "auto";
  outerDiv.style.width    = "100px";

  outerDiv.appendChild(innerDiv);
  content.appendChild(outerDiv);

  scrollbarWidth = outerDiv.offsetWidth - innerDiv.offsetWidth;

  content.removeChild(outerDiv);

  // Adding scrollbar width no longer seems necessary
  scrollbarWidth = 0;

  return scrollbarWidth;
};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
  var anchor            = null;
  var childElement      = null;
  var container         = null;
  var content           = document.getElementById("content");
  var element           = document.createElement("div");
  var height            = null;
  var layout            = null;
  var layoutDescription = null;
  var layouts           = data.layouts;
  var layoutsBody       = document.getElementById("layouts-body");
  var layoutsList       = layoutsBody.querySelector("ol");
  var layoutTemplate    = document.getElementById("layout").innerHTML;
  var reload            = document.getElementById("web-developer-reload");
  var scrollbarWidth    = WebDeveloper.Generated.getScrollbarWidth(content);
  var svgElement        = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var url               = data.pageURL;
  var useElement        = document.createElementNS("http://www.w3.org/2000/svg", "use");
  var width             = null;

  WebDeveloper.Generated.emptyContent();
  WebDeveloper.Generated.initializeHeader(locale.responsiveLayouts, data, locale);
  WebDeveloper.Generated.initializeSidebar(locale);
  Mustache.parse(layoutTemplate);

  useElement.setAttribute("href", "/svg/icons/icons.svg#warning-sign");
  svgElement.appendChild(useElement);
  svgElement.setAttribute("class", "bi me-1");
  element.appendChild(svgElement);
  element.setAttribute("class", "alert alert-warning");
  element.appendChild(document.createTextNode(locale.viewResponsiveLayoutsWarning));
  content.appendChild(element);

  WebDeveloper.Generated.addDocument(url, 0);

  document.getElementById("documents").querySelector("span").append(url);
  layoutsBody.querySelector("h3").append(locale.layouts);
  reload.append(locale.reloadLayouts);

  // Loop through the layouts
  for(var i = 0, l = layouts.length; i < l; i++)
  {
    anchor            = "layout-" + (i + 1);
    layout            = layouts[i];
    childElement      = document.createElement("iframe");
    element           = document.createElement("h3");
    height            = layout.height;
    svgElement        = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    useElement        = document.createElementNS("http://www.w3.org/2000/svg", "use");
    width             = layout.width;
    layoutDescription = layout.description + " (" + width + "x" + height + ")";

    useElement.setAttribute("href", "/svg/icons/icons.svg#s-delete");
    svgElement.appendChild(useElement);
    svgElement.setAttribute("class", "bi icon-collapse me-1");
    element.appendChild(svgElement);

    svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    useElement = document.createElementNS("http://www.w3.org/2000/svg", "use");

    useElement.setAttribute("href", "/svg/icons/icons.svg#s-add");
    svgElement.appendChild(useElement);
    svgElement.setAttribute("class", "bi icon-expand me-1");
    element.appendChild(svgElement);
    element.setAttribute("id", anchor);
    element.appendChild(document.createTextNode(layoutDescription));
    content.appendChild(element);

    childElement = document.createElement("iframe");
    container    = WebDeveloper.Generated.generateDocumentContainer();

    childElement.setAttribute("class", "overflow-scroll shadow");
    childElement.setAttribute("height", parseInt(height, 10) + scrollbarWidth);
    childElement.setAttribute("sandbox", "allow-forms allow-same-origin allow-scripts");
    childElement.setAttribute("scrolling", "yes");
    childElement.setAttribute("src", url);
    childElement.setAttribute("width", parseInt(width, 10) + scrollbarWidth);

    container.appendChild(childElement);
    content.appendChild(container);
    WebDeveloper.Generated.addSeparator();

    layoutsList.insertAdjacentHTML("beforeend", DOMPurify.sanitize(Mustache.render(layoutTemplate, { id: anchor, description: layoutDescription })));
  }

  reload.addEventListener("click", WebDeveloper.Generated.reloadLayouts);

  WebDeveloper.Generated.initializeCommonElements();
};

// Reloads the layouts
WebDeveloper.Generated.reloadLayouts = function(event)
{
  var src = null;

  // Loop through the iframes
  document.querySelectorAll("iframe").forEach(function(iframe)
  {
    src = iframe.getAttribute("src");

    iframe.setAttribute("src", src);
  });

  event.preventDefault();
};
