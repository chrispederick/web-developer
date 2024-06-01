var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Generated                    = WebDeveloper.Generated || {};
WebDeveloper.Generated.animationSpeed     = 200;
WebDeveloper.Generated.maximumURLLength   = 100;
WebDeveloper.Generated.storedLocale       = null;
WebDeveloper.Generated.syntaxHighlighters = [];

// Adds a document
WebDeveloper.Generated.addDocument = function(documentURL, documentCount, itemDescription, itemCount, outputHeader)
{
  var childElement  = document.createElement("a");
  var accordionItem = document.getElementById("accordion-item");
  var element       = document.createElement("h2");
  var fragment      = document.createDocumentFragment();

  childElement.appendChild(document.createTextNode(documentURL));

  childElement.setAttribute("class", "text-decoration-none");
  childElement.setAttribute("href", documentURL);
  childElement.setAttribute("rel", "noreferrer");
  childElement.setAttribute("target", "_blank");
  element.setAttribute("class", "text-break");
  element.setAttribute("id", "document-" + (documentCount + 1));
  element.appendChild(childElement);
  fragment.appendChild(element);

  // If the accordion item is set
  if(accordionItem)
  {
    document.getElementById("documents").insertAdjacentHTML("beforeend", DOMPurify.sanitize(Mustache.render(accordionItem.innerHTML, { documentURL: documentURL, index: documentCount + 1, itemCount: itemCount, itemsHeader: itemCount + " " + itemDescription })));
  }

  // If the outputting a header and the item description is set
  if(outputHeader && itemDescription)
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

// Adds an item
WebDeveloper.Generated.addItem = function(itemName, itemIndex, documentIndex)
{
  var childElement = document.createElement("a");
  var element      = document.createElement("li");

  childElement.appendChild(document.createTextNode(itemName));
  childElement.setAttribute("href", "#item-" + itemIndex);
  element.appendChild(childElement);
  document.getElementById("items-" + documentIndex).querySelector("ol").appendChild(element);
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
  var documentsAccordion = document.getElementById("documents");

  // Loop through all the headers
  document.getElementById("content").querySelectorAll("h3").forEach((header) =>
  {
    // If the next sibling is not a separator
    if(header.nextSibling.tagName.toLowerCase() != "hr")
    {
      header.classList.add("collapsed");
      header.nextSibling.classList.add("d-none");
    }
  });

  // Loop through all the accordion buttons
  documentsAccordion.querySelectorAll(".accordion-button").forEach((accordionButton) =>
  {
    accordionButton.classList.add("collapsed");
  });

  // Loop through all the accordion bodies
  documentsAccordion.querySelectorAll(".accordion-collapse.show").forEach((accordionBody) =>
  {
    accordionBody.classList.remove("show");
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
  document.querySelector(".progress").remove();
};

// Expands all the output
WebDeveloper.Generated.expandAllOutput = function(event)
{
  var documentsAccordion = document.getElementById("documents");

  // Loop through all the headers
  document.getElementById("content").querySelectorAll("h3").forEach((header) =>
  {
    // If the next sibling is not a separator
    if(header.nextSibling.tagName.toLowerCase() != "hr")
    {
      header.classList.remove("collapsed");
      header.nextSibling.classList.remove("d-none");
    }
  });

  // Loop through all the accordion buttons
  documentsAccordion.querySelectorAll(".accordion-button.collapsed").forEach((accordionButton) =>
  {
    accordionButton.classList.remove("collapsed");
  });

  // Loop through all the accordion bodies
  documentsAccordion.querySelectorAll(".accordion-collapse").forEach((accordionBody) =>
  {
    accordionBody.classList.add("show");
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
  var firstAccordionItem = document.querySelector(".accordion-item");

  firstAccordionItem.querySelector(".collapsed").classList.remove("collapsed");
  firstAccordionItem.querySelector(".accordion-collapse").classList.add("show");

  document.getElementById("content").addEventListener("click", WebDeveloper.Generated.toggleOutput);
  document.getElementById("web-developer-collapse-all").addEventListener("click", WebDeveloper.Generated.collapseAllOutput);
  document.getElementById("web-developer-expand-all").addEventListener("click", WebDeveloper.Generated.expandAllOutput);
};

// Sets the page title
WebDeveloper.Generated.initializeHeader = function(type, data, locale)
{
  var collapseAll = document.getElementById("web-developer-collapse-all");

  document.title = type + " " + locale.from.toLowerCase() + " " + WebDeveloper.Generated.formatURL(data.pageURL);

  document.querySelector(".navbar-brand span").replaceChildren(locale.extensionName + " " + type);
  document.querySelector("h1.visually-hidden").replaceChildren(type);

  // If the collapse all element exists
  if(collapseAll)
  {
    document.getElementById("web-developer-collapse-all").append(locale.collapseAll);
    document.getElementById("web-developer-expand-all").append(locale.expandAll);
  }
};

// Initializes the sidebar
WebDeveloper.Generated.initializeSidebar = function(locale)
{
  document.getElementById("donate-link").prepend(locale.donate);
  document.getElementById("sidebar").querySelector(".card-text").insertAdjacentHTML("beforeend", DOMPurify.sanitize('<span class="fw-bold">' + locale.extensionName + "</span> " + locale.donationCard));
};

// Initializes the syntax highlight functionality
WebDeveloper.Generated.initializeSyntaxHighlight = function(color)
{
  // If the locale is set
  if(WebDeveloper.Generated.storedLocale)
  {
    document.getElementById("web-developer-syntax-highlighting-dropdown").querySelector(".dropdown-toggle").append(WebDeveloper.Generated.storedLocale.syntaxHighlighting);
    document.getElementById("web-developer-syntax-highlighting-dark").append(WebDeveloper.Generated.storedLocale.dark);
    document.getElementById("web-developer-syntax-highlighting-light").append(WebDeveloper.Generated.storedLocale.light);
    document.getElementById("web-developer-syntax-highlighting-none").append(WebDeveloper.Generated.storedLocale.none);
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

// Outputs content
WebDeveloper.Generated.output = function(title, url, type, outputOriginal, itemIndex, documentIndex)
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
  element.setAttribute("id", "item-" + (itemIndex + 1));

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

  container.setAttribute("class", "bg-body-tertiary border p-2 web-developer-syntax-highlight");
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
  WebDeveloper.Generated.addItem(outputTitle, itemIndex + 1, documentIndex + 1);

  return outputContainers;
};

// Stores the locale
WebDeveloper.Generated.storeLocale = function(locale)
{
  // This is required to stop Firefox erroring about accessing a dead object
  WebDeveloper.Generated.storedLocale = JSON.parse(JSON.stringify(locale));
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
