var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Generated                    = WebDeveloper.Generated || {};
WebDeveloper.Generated.animationSpeed     = 200;
WebDeveloper.Generated.maximumURLLength   = 100;
WebDeveloper.Generated.syntaxHighlighters = [];

// Adds a document
WebDeveloper.Generated.addDocument = function(documentURL, documentCount, itemDescription, itemCount)
{
  var childElement = document.createElement("a");
  var element      = document.createElement("h2");
  var fragment     = document.createDocumentFragment();

  childElement.appendChild(document.createTextNode(documentURL));

  childElement.setAttribute("class", "text-decoration-none");
  childElement.setAttribute("href", documentURL);
  element.setAttribute("id", "document-" + (documentCount + 1));
  element.appendChild(childElement);
  fragment.appendChild(element);

  childElement = document.createElement("a");
  element      = document.createElement("li");

  childElement.appendChild(document.createTextNode(WebDeveloper.Generated.formatURL(documentURL)));
  childElement.setAttribute("class", "dropdown-item");
  childElement.setAttribute("href", "#document-" + (documentCount + 1));
  element.appendChild(childElement);
  document.getElementById("documents-dropdown").querySelector(".dropdown-menu").appendChild(element);

  // If the item description is set
  if(itemDescription)
  {
    element = document.createElement("h3");

    // If the item count is not set
    if(typeof itemCount === "undefined")
    {
      element.appendChild(document.createTextNode(itemDescription));
    }
    else
    {
      // If there are items
      if(itemCount !== 0)
      {
        var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var useElement = document.createElementNS("http://www.w3.org/2000/svg", "use");

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
      }

      element.appendChild(document.createTextNode(itemCount + " " + itemDescription));
    }

    fragment.appendChild(element);
  }

  document.getElementById("content").appendChild(fragment);
};

// Adds a separator
WebDeveloper.Generated.addSeparator = function()
{
  var separator = document.createElement("hr");

  separator.setAttribute("class", "m-5");
  document.getElementById("content").appendChild(separator);
};

// Adjusts the class of multiple elements
WebDeveloper.Generated.adjustElementsClass = function(elements, className, add)
{
  // Loop through the elements
  elements.forEach((element) =>
  {
    // If adding the class
    if(add)
    {
      element.classList.add(className);
    }
    else
    {
      element.classList.remove(className);
    }
  });
};

// Changes the syntax highlight theme
WebDeveloper.Generated.changeSyntaxHighlightTheme = function(event)
{
  var themeMenu = this;

  // If this is not the current theme
  if(!themeMenu.classList.contains("active"))
  {
    var color = themeMenu.getAttribute("id").replace("web-developer-syntax-highlighting-", "");
    var theme = WebDeveloper.Generated.getSyntaxHighlightTheme(color);

    // If there is no theme
    if(theme == "none")
    {
      WebDeveloper.Generated.adjustElementsClass(document.querySelectorAll(".CodeMirror"), "d-none", true);
      WebDeveloper.Generated.adjustElementsClass(document.querySelectorAll(".web-developer-syntax-highlight"), "d-none", false);
    }
    else if(WebDeveloper.Generated.syntaxHighlighters.length)
    {
      WebDeveloper.Generated.adjustElementsClass(document.querySelectorAll(".CodeMirror"), "d-none", false);
      WebDeveloper.Generated.adjustElementsClass(document.querySelectorAll(".web-developer-syntax-highlight"), "d-none", true);

      // Loop through the syntax highlighters
      for(var i = 0, l = WebDeveloper.Generated.syntaxHighlighters.length; i < l; i++)
      {
        WebDeveloper.Generated.syntaxHighlighters[i].setOption("theme", theme);
      }
    }
    else
    {
      WebDeveloper.Generated.initializeSyntaxHighlight(color);
    }

    document.getElementById("web-developer-syntax-highlighting-dark").classList.remove("active");
    document.getElementById("web-developer-syntax-highlighting-light").classList.remove("active");
    document.getElementById("web-developer-syntax-highlighting-none").classList.remove("active");
    themeMenu.classList.add("active");
  }

  event.preventDefault();
};

// Collapses all the output
WebDeveloper.Generated.collapseAllOutput = function(event)
{
  // Loop through all the headers
  document.querySelectorAll("h3").forEach((header) =>
  {
    // If the next sibling is not a separator
    if(header.nextSibling.tagName.toLowerCase() != "hr")
    {
      header.classList.add("collapsed");
      header.nextSibling.classList.add("d-none");
    }
  });

  // If the event is set
  if(event)
  {
    event.preventDefault();
  }
};

// Empties the content
WebDeveloper.Generated.emptyContent = function()
{
  document.getElementById("content").querySelector(".progress").remove();
};

// Expands all the output
WebDeveloper.Generated.expandAllOutput = function(event)
{
  // Loop through all the headers
  document.querySelectorAll("h3").forEach((header) =>
  {
    // If the next sibling is not a separator
    if(header.nextSibling.tagName.toLowerCase() != "hr")
    {
      header.classList.remove("collapsed");
      header.nextSibling.classList.remove("d-none");
    }
  });

  // If the event is set
  if(event)
  {
    event.preventDefault();
  }
};

// Formats a URL
WebDeveloper.Generated.formatURL = function(url)
{
  // If the URL is set
  if(url && url.length > WebDeveloper.Generated.maximumURLLength)
  {
    var halfLength = WebDeveloper.Generated.maximumURLLength / 2;

    return url.substring(0, halfLength) + "..." + url.substr(-halfLength);
  }

  return url;
};

// Generates a document container
WebDeveloper.Generated.generateDocumentContainer = function()
{
  var documentContainer = document.createElement("div");

  documentContainer.setAttribute("class", "web-developer-document");

  return documentContainer;
};

// Returns the syntax highlight theme for a color
WebDeveloper.Generated.getSyntaxHighlightTheme = function(color)
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

// Initializes the common page elements
WebDeveloper.Generated.initializeCommonElements = function()
{
  document.getElementById("content").addEventListener("click", WebDeveloper.Generated.toggleOutput);
  document.getElementById("web-developer-collapse-all").addEventListener("click", WebDeveloper.Generated.collapseAllOutput);
  document.getElementById("web-developer-expand-all").addEventListener("click", WebDeveloper.Generated.expandAllOutput);
};

// Initializes the syntax highlight functionality
WebDeveloper.Generated.initializeSyntaxHighlight = function(color, locale)
{
  // If the locale is set
  if(locale)
  {
    document.getElementById("web-developer-syntax-highlighting-dropdown").querySelector(".dropdown-toggle").append(locale.syntaxHighlighting);
    document.getElementById("web-developer-syntax-highlighting-dark").append(locale.dark);
    document.getElementById("web-developer-syntax-highlighting-light").append(locale.light);
    document.getElementById("web-developer-syntax-highlighting-none").append(locale.none);
    document.getElementById("web-developer-syntax-highlighting-" + color).classList.add("active");

    document.getElementById("web-developer-syntax-highlighting-dark").addEventListener("click", WebDeveloper.Generated.changeSyntaxHighlightTheme);
    document.getElementById("web-developer-syntax-highlighting-light").addEventListener("click", WebDeveloper.Generated.changeSyntaxHighlightTheme);
    document.getElementById("web-developer-syntax-highlighting-none").addEventListener("click", WebDeveloper.Generated.changeSyntaxHighlightTheme);
  }

  // If a color is set
  if(color != "none")
  {
    var theme = WebDeveloper.Generated.getSyntaxHighlightTheme(color);

    document.querySelectorAll(".web-developer-syntax-highlight").forEach(function(pre)
    {
      window.setTimeout(function()
      {
        /* eslint-disable indent */
        WebDeveloper.Generated.syntaxHighlighters.push(CodeMirror(function(element)
        {
          pre.after(element);
          pre.classList.add("d-none");
        },
        {
          lineNumbers: pre.getAttribute("data-line-numbers"),
          mode: pre.getAttribute("data-type"),
          readOnly: true,
          tabSize: 2,
          theme: theme,
          value: pre.textContent
        }));
        /* eslint-enable indent */
      }, 0);
    });
  }
};

// Initializes the page with JSON data
WebDeveloper.Generated.initializeWithJSON = function(event)
{
  var eventTarget = event.target;

  WebDeveloper.Generated.initialize(JSON.parse(eventTarget.getAttribute("data-web-developer")), JSON.parse(eventTarget.getAttribute("data-web-developer-locale")));

  eventTarget.removeAttribute("data-web-developer");
  eventTarget.removeAttribute("data-web-developer-locale");

  window.removeEventListener("web-developer-generated-event", WebDeveloper.Generated.initializeWithJSON, false);
};

// Localizes the header
WebDeveloper.Generated.localizeHeader = function(locale)
{
  document.getElementById("web-developer-collapse-all").append(locale.collapseAll);
  document.getElementById("web-developer-expand-all").append(locale.expandAll);
  document.getElementById("documents-dropdown").querySelector(".dropdown-toggle").append(locale.documents);
};

// Outputs content
WebDeveloper.Generated.output = function(title, url, anchor, type, outputOriginal)
{
  var childElement      = null;
  var container         = document.createElement("pre");
  var content           = document.getElementById("content");
  var documentContainer = WebDeveloper.Generated.generateDocumentContainer();
  var element           = document.createElement("h3");
  var outputContainers  = [];
  var outputTitle       = title;
  var svgElement        = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var useElement        = document.createElementNS("http://www.w3.org/2000/svg", "use");

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

  // If the URL is set
  if(url)
  {
    childElement = document.createElement("a");
    outputTitle  = WebDeveloper.Generated.formatURL(url);

    childElement.appendChild(document.createTextNode(outputTitle));
    childElement.setAttribute("href", url);
    element.appendChild(childElement);
  }
  else
  {
    element.appendChild(document.createTextNode(outputTitle));
  }

  content.appendChild(element);

  childElement = document.createElement("a");
  element      = document.createElement("li");

  childElement.appendChild(document.createTextNode(outputTitle));
  childElement.setAttribute("class", "dropdown-item");
  childElement.setAttribute("href", "#" + anchor);
  element.appendChild(childElement);
  document.getElementById("files-dropdown").querySelector(".dropdown-menu").append(element);

  container.setAttribute("class", "bg-light border p-2 web-developer-syntax-highlight");
  container.setAttribute("data-line-numbers", "true");
  container.setAttribute("data-type", type);
  documentContainer.appendChild(container);
  outputContainers.push(container);

  // If the original should be output
  if(outputOriginal)
  {
    var originalContainer = document.createElement("pre");

    originalContainer.setAttribute("class", "web-developer-original");
    documentContainer.appendChild(originalContainer);
    outputContainers.push(originalContainer);
  }

  content.appendChild(documentContainer);
  WebDeveloper.Generated.addSeparator();

  return outputContainers;
};

// Sets the page title
WebDeveloper.Generated.setPageTitle = function(type, data, locale)
{
  document.title = type + " " + locale.from.toLowerCase() + " " + WebDeveloper.Generated.formatURL(data.pageURL);

  document.querySelector(".navbar-brand span").replaceChildren(type);
};

// Toggles the collapsed state of an output
WebDeveloper.Generated.toggleOutput = function(event)
{
  var eventTarget = event.target;
  var header      = null;

  // If the event target is an SVG
  if(eventTarget.tagName.toLowerCase() == "svg")
  {
    header = eventTarget.parentNode;
  }
  else if(eventTarget.tagName.toLowerCase() == "use")
  {
    header = eventTarget.parentNode.parentNode;
  }

  // If the header is set
  if(header && header.tagName.toLowerCase() == "h3")
  {
    header.classList.toggle("collapsed");
    header.nextSibling.classList.toggle("d-none");
  }
};

window.addEventListener("web-developer-generated-event", WebDeveloper.Generated.initializeWithJSON, false);
