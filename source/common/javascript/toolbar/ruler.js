var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Ruler                 = WebDeveloper.Ruler || {};
WebDeveloper.Ruler.toolbarDocument = null;

// Creates the ruler events
WebDeveloper.Ruler.createEvents = function(contentDocument)
{
  window.WebDeveloperEvents                      = window.WebDeveloperEvents || {};
  window.WebDeveloperEvents.Ruler                = window.WebDeveloperEvents.Ruler || {};
  window.WebDeveloperEvents.Ruler.mouseDown      = WebDeveloper.Ruler.mouseDown;
  window.WebDeveloperEvents.Ruler.mouseMove      = WebDeveloper.Ruler.mouseMove;
  window.WebDeveloperEvents.Ruler.mouseUp        = WebDeveloper.Ruler.mouseUp;
  window.WebDeveloperEvents.Ruler.resizeDocument = WebDeveloper.Ruler.resizeDocument;

  contentDocument.addEventListener("mousedown", window.WebDeveloperEvents.Ruler.mouseDown, true);
  contentDocument.addEventListener("mousemove", window.WebDeveloperEvents.Ruler.mouseMove, false);
  contentDocument.addEventListener("mouseup", window.WebDeveloperEvents.Ruler.mouseUp, true);
  contentDocument.addEventListener("resize", window.WebDeveloperEvents.Ruler.resizeDocument, false);
};

// Creates the ruler
WebDeveloper.Ruler.createRuler = function(contentDocument)
{
  var divElement = null;

  WebDeveloper.Ruler.container = contentDocument.createElement("div");

  WebDeveloper.Ruler.container.setAttribute("id", "web-developer-ruler-container");
  WebDeveloper.Common.getDocumentBodyElement(contentDocument).appendChild(WebDeveloper.Ruler.container);
  WebDeveloper.Ruler.resizeContainer();

  WebDeveloper.Ruler.backgroundBottom = contentDocument.createElement("div");

  WebDeveloper.Ruler.backgroundBottom.setAttribute("id", "web-developer-ruler-background-bottom");
  WebDeveloper.Ruler.container.appendChild(WebDeveloper.Ruler.backgroundBottom);

  WebDeveloper.Ruler.backgroundLeft = contentDocument.createElement("div");

  WebDeveloper.Ruler.backgroundLeft.setAttribute("id", "web-developer-ruler-background-left");
  WebDeveloper.Ruler.container.appendChild(WebDeveloper.Ruler.backgroundLeft);

  WebDeveloper.Ruler.backgroundRight = contentDocument.createElement("div");

  WebDeveloper.Ruler.backgroundRight.setAttribute("id", "web-developer-ruler-background-right");
  WebDeveloper.Ruler.container.appendChild(WebDeveloper.Ruler.backgroundRight);

  WebDeveloper.Ruler.backgroundTop = contentDocument.createElement("div");

  WebDeveloper.Ruler.backgroundTop.setAttribute("id", "web-developer-ruler-background-top");
  WebDeveloper.Ruler.container.appendChild(WebDeveloper.Ruler.backgroundTop);

  WebDeveloper.Ruler.ruler = contentDocument.createElement("div");

  divElement = contentDocument.createElement("div");

  divElement.setAttribute("id", "web-developer-ruler-bottom-left");
  WebDeveloper.Ruler.ruler.appendChild(divElement);

  divElement = contentDocument.createElement("div");

  divElement.setAttribute("id", "web-developer-ruler-bottom-right");
  WebDeveloper.Ruler.ruler.appendChild(divElement);

  divElement = contentDocument.createElement("div");

  divElement.setAttribute("id", "web-developer-ruler-top-left");
  WebDeveloper.Ruler.ruler.appendChild(divElement);

  divElement = contentDocument.createElement("div");

  divElement.setAttribute("id", "web-developer-ruler-top-right");
  WebDeveloper.Ruler.ruler.appendChild(divElement);

  WebDeveloper.Ruler.ruler.setAttribute("id", "web-developer-ruler");
  WebDeveloper.Ruler.container.appendChild(WebDeveloper.Ruler.ruler);

  WebDeveloper.Ruler.ruler.style.height = WebDeveloper.Ruler.endY - WebDeveloper.Ruler.startY + "px";
  WebDeveloper.Ruler.ruler.style.left   = WebDeveloper.Ruler.startX + "px";
  WebDeveloper.Ruler.ruler.style.top    = WebDeveloper.Ruler.startY + "px";
  WebDeveloper.Ruler.ruler.style.width  = WebDeveloper.Ruler.endX - WebDeveloper.Ruler.startX + "px";

  // Run this on a delay because the styles must be all setup
  window.setTimeout(function()
  {
    WebDeveloper.Ruler.resizeBackgrounds();
    WebDeveloper.Ruler.updateInformation();
  }, 100);
};

// Creates the ruler toolbar
WebDeveloper.Ruler.createToolbar = function(contentDocument, toolbarHTML)
{
  var rulerToolbar = contentDocument.createElement("iframe");
  var styleSheet   = null;

  rulerToolbar.setAttribute("id", "web-developer-ruler-toolbar");
  rulerToolbar.setAttribute("class", "web-developer-toolbar");

  WebDeveloper.Common.getDocumentBodyElement(contentDocument).appendChild(rulerToolbar);
  rulerToolbar.contentWindow.stop();

  WebDeveloper.Ruler.toolbarDocument = rulerToolbar.contentDocument;
  styleSheet                         = WebDeveloper.Ruler.toolbarDocument.createElement("link");

  styleSheet.setAttribute("rel", "stylesheet");
  styleSheet.setAttribute("href", WebDeveloper.Common.getChromeURL("toolbar/ruler-toolbar.css"));
  WebDeveloper.Common.getDocumentHeadElement(WebDeveloper.Ruler.toolbarDocument).appendChild(styleSheet);

  WebDeveloper.Common.getDocumentBodyElement(WebDeveloper.Ruler.toolbarDocument).innerHTML = toolbarHTML;

  WebDeveloper.Ruler.toolbarDocument.querySelector("img").setAttribute("src", WebDeveloper.Common.getChromeURL("toolbar/images/logo.png"));
  WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-height").addEventListener("change", WebDeveloper.Ruler.updateHeight, false);
  WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-width").addEventListener("change", WebDeveloper.Ruler.updateWidth, false);
};

// Displays the ruler
WebDeveloper.Ruler.displayRuler = function(display, contentDocument, toolbarHTML)
{
  // Run first so that the size calculations are accurate on setup
  WebDeveloper.Common.toggleStyleSheet("/toolbar/ruler.css", "web-developer-ruler-styles", contentDocument, false);

  // If displaying the ruler
  if(display)
  {
    WebDeveloper.Ruler.reset();
    WebDeveloper.Ruler.createRuler(contentDocument);
    WebDeveloper.Ruler.createEvents(contentDocument);
    WebDeveloper.Ruler.createToolbar(contentDocument, toolbarHTML);
  }
  else
  {
    WebDeveloper.Ruler.removeRuler(contentDocument);
    WebDeveloper.Ruler.removeEvents(contentDocument);
    WebDeveloper.Ruler.removeToolbar(contentDocument);
    WebDeveloper.Ruler.reset();
  }
};

// Handles the mouse down event
WebDeveloper.Ruler.mouseDown = function(event)
{
  // If the click was not a right click
  if(event.button != 2)
  {
    var eventTarget = event.target;

    // If the event target is set
    if(eventTarget)
    {
      var ownerDocument = eventTarget.ownerDocument;

      // If the owner document is set
      if(ownerDocument)
      {
        var tagName = eventTarget.tagName;
        var toolbar = ownerDocument.getElementById("web-developer-ruler-toolbar");

        // If the event target is not the toolbar, the toolbar is not an ancestor of the event target and the event target is not a scrollbar
        if(eventTarget != toolbar && !WebDeveloper.Common.isAncestor(eventTarget, toolbar) && tagName && tagName.toLowerCase() != "scrollbar")
        {
          var xPosition = event.pageX;
          var yPosition = event.pageY;

          // If event target is the container element
          if(eventTarget == WebDeveloper.Ruler.ruler)
          {
            WebDeveloper.Ruler.move  = true;
            WebDeveloper.Ruler.moveX = xPosition - WebDeveloper.Ruler.ruler.offsetLeft;
            WebDeveloper.Ruler.moveY = yPosition - WebDeveloper.Ruler.ruler.offsetTop;
          }
          else if(eventTarget == ownerDocument.getElementById("web-developer-ruler-bottom-left"))
          {
            WebDeveloper.Ruler.resize = true;
            WebDeveloper.Ruler.startX = WebDeveloper.Ruler.ruler.offsetLeft + WebDeveloper.Ruler.ruler.offsetWidth;
            WebDeveloper.Ruler.startY = WebDeveloper.Ruler.ruler.offsetTop;
          }
          else if(eventTarget == ownerDocument.getElementById("web-developer-ruler-bottom-right"))
          {
            WebDeveloper.Ruler.resize = true;
            WebDeveloper.Ruler.startX = WebDeveloper.Ruler.ruler.offsetLeft;
            WebDeveloper.Ruler.startY = WebDeveloper.Ruler.ruler.offsetTop;
          }
          else if(eventTarget == ownerDocument.getElementById("web-developer-ruler-top-left"))
          {
            WebDeveloper.Ruler.resize = true;
            WebDeveloper.Ruler.startX = WebDeveloper.Ruler.ruler.offsetLeft + WebDeveloper.Ruler.ruler.offsetWidth;
            WebDeveloper.Ruler.startY = WebDeveloper.Ruler.ruler.offsetTop + WebDeveloper.Ruler.ruler.offsetHeight;
          }
          else if(eventTarget == ownerDocument.getElementById("web-developer-ruler-top-right"))
          {
            WebDeveloper.Ruler.resize = true;
            WebDeveloper.Ruler.startX = WebDeveloper.Ruler.ruler.offsetLeft;
            WebDeveloper.Ruler.startY = WebDeveloper.Ruler.ruler.offsetTop + WebDeveloper.Ruler.ruler.offsetHeight;
          }
          else
          {
            WebDeveloper.Ruler.drag   = true;
            WebDeveloper.Ruler.endX   = 0;
            WebDeveloper.Ruler.endY   = 0;
            WebDeveloper.Ruler.startX = xPosition;
            WebDeveloper.Ruler.startY = yPosition;

            WebDeveloper.Ruler.updateInformation();
          }

          event.stopPropagation();
          event.preventDefault();
        }
      }
    }
  }
};

// Handles the mouse move event
WebDeveloper.Ruler.mouseMove = function(event)
{
  // If the ruler is being dragged, moved or resized
  if(WebDeveloper.Ruler.drag || WebDeveloper.Ruler.move || WebDeveloper.Ruler.resize)
  {
    var eventTarget = event.target;

    // If the event target is set
    if(eventTarget)
    {
      var ownerDocument = eventTarget.ownerDocument;

      // If the event target has an owner document
      if(ownerDocument)
      {
        var xPosition = event.pageX;
        var yPosition = event.pageY;

        // If the ruler is being dragged or resized
        if(WebDeveloper.Ruler.drag || WebDeveloper.Ruler.resize)
        {
          var height = 0;
          var width  = 0;

          WebDeveloper.Ruler.endX = xPosition;
          WebDeveloper.Ruler.endY = yPosition;

          // If the end x position is greater than the start x position
          if(WebDeveloper.Ruler.endX > WebDeveloper.Ruler.startX)
          {
            width = WebDeveloper.Ruler.endX - WebDeveloper.Ruler.startX;

            WebDeveloper.Ruler.ruler.style.left = WebDeveloper.Ruler.startX + "px";
          }
          else
          {
            width = WebDeveloper.Ruler.startX - WebDeveloper.Ruler.endX;

            WebDeveloper.Ruler.ruler.style.left = xPosition + "px";
          }

          // If the end y position is greater than the start y position
          if(WebDeveloper.Ruler.endY > WebDeveloper.Ruler.startY)
          {
            height = WebDeveloper.Ruler.endY - WebDeveloper.Ruler.startY;

            WebDeveloper.Ruler.ruler.style.top = WebDeveloper.Ruler.startY + "px";
          }
          else
          {
            height = WebDeveloper.Ruler.startY - WebDeveloper.Ruler.endY;

            WebDeveloper.Ruler.ruler.style.top = WebDeveloper.Ruler.endY + "px";
          }

          WebDeveloper.Ruler.ruler.style.height = height + "px";
          WebDeveloper.Ruler.ruler.style.width  = width + "px";
        }
        else if(WebDeveloper.Ruler.move)
        {
          var newXPosition = xPosition - WebDeveloper.Ruler.moveX;
          var newYPosition = yPosition - WebDeveloper.Ruler.moveY;

          WebDeveloper.Ruler.ruler.style.left = newXPosition + "px";
          WebDeveloper.Ruler.ruler.style.top  = newYPosition + "px";

          WebDeveloper.Ruler.endX   = newXPosition + WebDeveloper.Ruler.ruler.offsetWidth - 2;
          WebDeveloper.Ruler.endY   = newYPosition + WebDeveloper.Ruler.ruler.offsetHeight - 2;
          WebDeveloper.Ruler.startX = newXPosition;
          WebDeveloper.Ruler.startY = newYPosition;
        }

        WebDeveloper.Ruler.resizeBackgrounds();
        WebDeveloper.Ruler.updateInformation();
      }
    }
  }
};

// Handles the mouse up event
WebDeveloper.Ruler.mouseUp = function(event)
{
  // If the click was not a right click
  if(event.button != 2)
  {
    var eventTarget = event.target;

    // If the event target is set
    if(eventTarget)
    {
      var ownerDocument = eventTarget.ownerDocument;

      // If the event target has an owner document
      if(ownerDocument)
      {
        var tagName = eventTarget.tagName;
        var toolbar = ownerDocument.getElementById("web-developer-ruler-toolbar");

        // If the event target is not the toolbar, the toolbar is not an ancestor of the event target and the event target is not a scrollbar
        if(eventTarget != toolbar && !WebDeveloper.Common.isAncestor(eventTarget, toolbar) && tagName && tagName.toLowerCase() != "scrollbar")
        {
          // If not moving the ruler
          if(!WebDeveloper.Ruler.move)
          {
            var xPosition = event.pageX;
            var yPosition = event.pageY;

            // If the X position is greater than the start X position
            if(xPosition > WebDeveloper.Ruler.startX)
            {
              WebDeveloper.Ruler.endX = xPosition;
            }
            else
            {
              WebDeveloper.Ruler.endX   = WebDeveloper.Ruler.startX;
              WebDeveloper.Ruler.startX = xPosition;
            }

            // If the Y position is greater than the start Y position
            if(yPosition > WebDeveloper.Ruler.startY)
            {
              WebDeveloper.Ruler.endY = yPosition;
            }
            else
            {
              WebDeveloper.Ruler.endY   = WebDeveloper.Ruler.startY;
              WebDeveloper.Ruler.startY = yPosition;
            }
          }

          WebDeveloper.Ruler.drag   = false;
          WebDeveloper.Ruler.move   = false;
          WebDeveloper.Ruler.moveX  = 0;
          WebDeveloper.Ruler.moveY  = 0;
          WebDeveloper.Ruler.resize = false;

          WebDeveloper.Ruler.updateInformation();
        }
      }
    }
  }
};

// Removes the ruler events
WebDeveloper.Ruler.removeEvents = function(contentDocument)
{
  contentDocument.removeEventListener("mousedown", window.WebDeveloperEvents.Ruler.mouseDown, true);
  contentDocument.removeEventListener("mousemove", window.WebDeveloperEvents.Ruler.mouseMove, false);
  contentDocument.removeEventListener("mouseup", window.WebDeveloperEvents.Ruler.mouseUp, true);
  contentDocument.removeEventListener("resize", window.WebDeveloperEvents.Ruler.resizeDocument, false);

  window.WebDeveloperEvents.Ruler = null;
};

// Removes the ruler
WebDeveloper.Ruler.removeRuler = function(contentDocument)
{
  WebDeveloper.Common.removeMatchingElements("#web-developer-ruler-container", contentDocument);
};

// Removes the ruler toolbar
WebDeveloper.Ruler.removeToolbar = function(contentDocument)
{
  // If the toolbar document is set
  if(WebDeveloper.Ruler.toolbarDocument)
  {
    WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-height").removeEventListener("change", WebDeveloper.Ruler.updateHeight, false);
    WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-width").removeEventListener("change", WebDeveloper.Ruler.updateWidth, false);
  }

  WebDeveloper.Common.removeMatchingElements("#web-developer-ruler-toolbar", contentDocument);
};

// Resets the ruler
WebDeveloper.Ruler.reset = function()
{
  WebDeveloper.Ruler.backgroundBottom = null;
  WebDeveloper.Ruler.backgroundLeft   = null;
  WebDeveloper.Ruler.backgroundRight  = null;
  WebDeveloper.Ruler.backgroundTop    = null;
  WebDeveloper.Ruler.container        = null;
  WebDeveloper.Ruler.drag             = false;
  WebDeveloper.Ruler.endX             = 498;
  WebDeveloper.Ruler.endY             = 398;
  WebDeveloper.Ruler.move             = false;
  WebDeveloper.Ruler.moveX            = 0;
  WebDeveloper.Ruler.moveY            = 0;
  WebDeveloper.Ruler.resize           = false;
  WebDeveloper.Ruler.ruler            = null;
  WebDeveloper.Ruler.startX           = 200;
  WebDeveloper.Ruler.startY           = 200;
};

// Resizes the ruler backgrounds
WebDeveloper.Ruler.resizeBackgrounds = function()
{
  var containerHeight = WebDeveloper.Ruler.container.offsetHeight;
  var containerWidth  = WebDeveloper.Ruler.container.offsetWidth;
  var rulerHeight     = WebDeveloper.Ruler.ruler.offsetHeight;
  var rulerPositionX  = WebDeveloper.Common.getElementPositionX(WebDeveloper.Ruler.ruler);
  var rulerPositionY  = WebDeveloper.Common.getElementPositionY(WebDeveloper.Ruler.ruler);
  var rulerWidth      = WebDeveloper.Ruler.ruler.offsetWidth;

  WebDeveloper.Ruler.backgroundBottom.style.height = containerHeight - rulerPositionY - rulerHeight + "px";
  WebDeveloper.Ruler.backgroundBottom.style.width  = containerWidth + "px";
  WebDeveloper.Ruler.backgroundLeft.style.height   = rulerHeight + "px";
  WebDeveloper.Ruler.backgroundLeft.style.top      = rulerPositionY + "px";
  WebDeveloper.Ruler.backgroundLeft.style.width    = rulerPositionX + "px";
  WebDeveloper.Ruler.backgroundRight.style.top     = rulerPositionY + "px";
  WebDeveloper.Ruler.backgroundRight.style.height  = rulerHeight + "px";
  WebDeveloper.Ruler.backgroundRight.style.width   = containerWidth - rulerPositionX - rulerWidth + "px";
  WebDeveloper.Ruler.backgroundTop.style.height    = rulerPositionY + "px";
  WebDeveloper.Ruler.backgroundTop.style.width     = containerWidth + "px";
};

// Resizes the ruler container
WebDeveloper.Ruler.resizeContainer = function()
{
  var contentDocument = WebDeveloper.Common.getContentDocument();
  var contentWindow   = WebDeveloper.Common.getContentWindow();
  var documentHeight  = WebDeveloper.Common.getDocumentBodyElement(contentDocument).offsetHeight;
  var documentWidth   = WebDeveloper.Common.getDocumentBodyElement(contentDocument).offsetWidth;
  var viewportHeight  = contentWindow.innerHeight;
  var viewportWidth   = contentWindow.innerWidth;

  // If the viewport width is greater than the document width
  if(viewportWidth > documentWidth)
  {
    WebDeveloper.Ruler.container.style.width = viewportWidth + "px";
  }
  else
  {
    WebDeveloper.Ruler.container.style.width = documentWidth + "px";
  }

  // If the viewport height is greater than the document height
  if(viewportHeight > documentHeight)
  {
    WebDeveloper.Ruler.container.style.height = viewportHeight + "px";
  }
  else
  {
    WebDeveloper.Ruler.container.style.height = documentHeight + "px";
  }
};

// Handles the resize event
WebDeveloper.Ruler.resizeDocument = function()
{
  WebDeveloper.Ruler.resizeContainer();
  WebDeveloper.Ruler.resizeBackgrounds();
};

// Updates the ruler height
WebDeveloper.Ruler.updateHeight = function()
{
  var height = WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-height").value.replace(/px/gi, "");

  // If the height is valid
  if(height && parseInt(height, 10) == height && height > 0)
  {
    height                                = parseInt(height, 10);
    WebDeveloper.Ruler.ruler.style.height = height - 2 + "px";
    WebDeveloper.Ruler.endY               = WebDeveloper.Ruler.startY + height;

    WebDeveloper.Ruler.resizeBackgrounds();
    WebDeveloper.Ruler.updateInformation();
  }
};

// Updates the ruler information
WebDeveloper.Ruler.updateInformation = function()
{
  // If the ruler is set
  if(WebDeveloper.Ruler.ruler)
  {
    WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-height").value = WebDeveloper.Ruler.ruler.offsetHeight + "px";
    WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-width").value  = WebDeveloper.Ruler.ruler.offsetWidth + "px";

    // If the end x position is greater than the start x position
    if(WebDeveloper.Ruler.endX > WebDeveloper.Ruler.startX)
    {
      WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-end-x").textContent   = WebDeveloper.Ruler.endX + 2 + "px";
      WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-start-x").textContent = WebDeveloper.Ruler.startX + "px";
    }
    else
    {
      WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-end-x").textContent   = WebDeveloper.Ruler.endX + "px";
      WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-start-x").textContent = WebDeveloper.Ruler.startX + 2 + "px";
    }

    // If the end y position is greater than the start y position
    if(WebDeveloper.Ruler.endY > WebDeveloper.Ruler.startY)
    {
      WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-end-y").textContent   = WebDeveloper.Ruler.endY + 2 + "px";
      WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-start-y").textContent = WebDeveloper.Ruler.startY + "px";
    }
    else
    {
      WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-end-y").textContent   = WebDeveloper.Ruler.endY + "px";
      WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-start-y").textContent = WebDeveloper.Ruler.startY + 2 + "px";
    }
  }
};

// Updates the ruler width
WebDeveloper.Ruler.updateWidth = function()
{
  var width = WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-width").value.replace(/px/gi, "");

  // If the width is valid
  if(width && parseInt(width, 10) == width && width > 0)
  {
    width                                = parseInt(width, 10);
    WebDeveloper.Ruler.ruler.style.width = width - 2 + "px";
    WebDeveloper.Ruler.endX              = WebDeveloper.Ruler.startX + width;

    WebDeveloper.Ruler.resizeBackgrounds();
    WebDeveloper.Ruler.updateInformation();
  }
};
