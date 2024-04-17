var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Generated                          = WebDeveloper.Generated || {};
WebDeveloper.Generated.ancestorSingleLineHeight = 24;
WebDeveloper.Generated.ancestorContainer        = null;
WebDeveloper.Generated.ancestors                = null;

// Adjusts the ancestors
WebDeveloper.Generated.adjustAncestors = function(adjustor)
{
  // If the ancestors are set
  if(WebDeveloper.Generated.ancestors)
  {
    // Loop through the ancestors
    WebDeveloper.Generated.ancestors.forEach((ancestor) =>
    {
      adjustor(ancestor);
    });
  }
};

// Hides ancestors from the middle of the path
WebDeveloper.Generated.hideAncestors = function()
{
  var middleAncestor   = document.querySelector(".web-developer-middle-ancestor");
  var nextSiblings     = WebDeveloper.Common.getNextSiblings(middleAncestor, ":not(.d-none)");
  var previousSiblings = WebDeveloper.Common.getPreviousSiblings(middleAncestor, ":not(.d-none)");

  // If there are previous siblings
  if(previousSiblings)
  {
    previousSiblings.slice(-1).classList.add("d-none");
  }

  // If there are next siblings
  if(nextSiblings)
  {
    nextSiblings[0].classList.add("d-none");
  }

  // middleAncestor.prevAll(":visible").first().add(middleAncestor.nextAll(":visible").eq(0)).hide();
};

// Initializes the ancestors
WebDeveloper.Generated.initializeAncestors = function()
{
  window.addEventListener("resize", WebDeveloper.Generated.resizeAncestors);
};

// Resizes the ancestors
WebDeveloper.Generated.resizeAncestors = function(reset)
{
  var currentHeight  = 0;
  var previousHeight = 0;

  // If resetting or the ancestor container and ancestors are not set
  if(reset || !WebDeveloper.Generated.ancestorContainer && !WebDeveloper.Generated.ancestors)
  {
    var breadcrumb = document.querySelector("#current-element-ancestors .breadcrumb");

    // If the breadcrumb is set
    if(breadcrumb)
    {
      WebDeveloper.Generated.ancestorContainer = breadcrumb;
      WebDeveloper.Generated.ancestors         = breadcrumb.querySelectorAll("li");
    }
  }

  WebDeveloper.Generated.toggleMiddleAncestor(true);

  WebDeveloper.Generated.adjustAncestors(function(ancestor) { WebDeveloper.Generated.setAncestorDescription(ancestor, true, true, 0); });

  // If the ancestor container is set
  if(WebDeveloper.Generated.ancestorContainer)
  {
    // If the ancestors are wrapping
    if(WebDeveloper.Generated.ancestorContainer.offsetHeight > WebDeveloper.Generated.ancestorSingleLineHeight)
    {
      WebDeveloper.Generated.adjustAncestors(function(ancestor) { WebDeveloper.Generated.setAncestorDescription(ancestor, true, true, 30); });
    }

    // If the ancestors are wrapping
    if(WebDeveloper.Generated.ancestorContainer.offsetHeight > WebDeveloper.Generated.ancestorSingleLineHeight)
    {
      WebDeveloper.Generated.adjustAncestors(function(ancestor) { WebDeveloper.Generated.setAncestorDescription(ancestor, true, false, 0); });
    }

    // If the ancestors are wrapping
    if(WebDeveloper.Generated.ancestorContainer.offsetHeight > WebDeveloper.Generated.ancestorSingleLineHeight)
    {
      WebDeveloper.Generated.adjustAncestors(function(ancestor) { WebDeveloper.Generated.setAncestorDescription(ancestor, true, false, 16); });
    }

    // If the ancestors are wrapping
    if(WebDeveloper.Generated.ancestorContainer.offsetHeight > WebDeveloper.Generated.ancestorSingleLineHeight)
    {
      WebDeveloper.Generated.adjustAncestors(function(ancestor) { WebDeveloper.Generated.setAncestorDescription(ancestor, false, false, 0); });
    }

    // If the ancestors are wrapping
    if(WebDeveloper.Generated.ancestorContainer.offsetHeight > WebDeveloper.Generated.ancestorSingleLineHeight)
    {
      WebDeveloper.Generated.toggleMiddleAncestor(false);
    }

    currentHeight = WebDeveloper.Generated.ancestorContainer.offsetHeight;

    // While the ancestors are wrapping
    while(currentHeight > WebDeveloper.Generated.ancestorSingleLineHeight && currentHeight != previousHeight)
    {
      previousHeight = WebDeveloper.Generated.ancestorContainer.offsetHeight;

      WebDeveloper.Generated.hideAncestors();

      currentHeight = WebDeveloper.Generated.ancestorContainer.offsetHeight;
    }
  }
};

// Sets the ancestor description
WebDeveloper.Generated.setAncestorDescription = function(ancestor, includeId, includeClasses, truncateLength)
{
  var ancestorData        = ancestor.getAttribute("data-web-developer-element-id");
  var ancestorDescription = ancestor.getAttribute("data-web-developer-element-tag");

  // If including the id and it is set
  if(includeId && ancestorData)
  {
    ancestorDescription += ancestorData;
  }

  ancestorData = ancestor.getAttribute("data-web-developer-element-classes");

  // If including the classes and they are set
  if(includeClasses && ancestorData)
  {
    ancestorDescription += ancestorData;
  }

  // If truncating the length and the description is longer than the truncate length
  if(truncateLength && ancestorDescription.length > truncateLength)
  {
    var halfLength = truncateLength / 2;

    ancestorDescription = ancestorDescription.substring(0, halfLength) + "..." + ancestorDescription.substr(-halfLength);
  }

  // If this is the active ancestor
  if(ancestor.classList.contains("active"))
  {
    ancestor.textContent = ancestorDescription;
  }
  else
  {
    ancestor.querySelector("a").textContent = ancestorDescription;
  }
};

// Toggles the middle ancestor
WebDeveloper.Generated.toggleMiddleAncestor = function(display)
{
  var middleAncestor = null;

  // If displaying the middle ancestor
  if(display)
  {
    middleAncestor = document.querySelector(".web-developer-middle-ancestor");

    // If the ancestors are set
    if(WebDeveloper.Generated.ancestors)
    {
      // Loop through the ancestors
      WebDeveloper.Generated.ancestors.forEach((ancestor) =>
      {
        ancestor.classList.remove("d-none");
      });
    }

    // If there is a middle ancestor
    if(middleAncestor)
    {
      middleAncestor.classList.remove("web-developer-middle-ancestor");
    }
  }
  else
  {
    var breadcrumbLink = null;

    // If the ancestors are set
    if(WebDeveloper.Generated.ancestors)
    {
      middleAncestor = WebDeveloper.Generated.ancestors.item(Math.floor(WebDeveloper.Generated.ancestors.length / 2));
      breadcrumbLink = middleAncestor.querySelector("a");
    }

    // If the breadcrumb link is set
    if(breadcrumbLink)
    {
      breadcrumbLink.textContent = "...";

      middleAncestor.classList.add("web-developer-middle-ancestor");
    }
  }
};

// If the document is still loading
if(document.readyState === "loading")
{
  document.addEventListener("DOMContentLoaded", WebDeveloper.Generated.initializeAncestors);
}
else
{
  WebDeveloper.Generated.initializeAncestors();
}
