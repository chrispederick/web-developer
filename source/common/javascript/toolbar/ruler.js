var WebDeveloper = WebDeveloper || {};

WebDeveloper.Ruler = WebDeveloper.Ruler || {};

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

  WebDeveloper.Ruler.ruler.style.height = (WebDeveloper.Ruler.endY - WebDeveloper.Ruler.startY) + "px";
  WebDeveloper.Ruler.ruler.style.left   = WebDeveloper.Ruler.startX + "px";
  WebDeveloper.Ruler.ruler.style.top    = WebDeveloper.Ruler.startY + "px";
  WebDeveloper.Ruler.ruler.style.width  = (WebDeveloper.Ruler.endX - WebDeveloper.Ruler.startX) + "px";

  // Run this on a delay because the styles must be all setup
  window.setTimeout(function()
  {
    WebDeveloper.Ruler.resizeBackgrounds();
    WebDeveloper.Ruler.updateInformation();
  }, 100);
};

// Displays the ruler
WebDeveloper.Ruler.displayRuler = function(display, contentDocument, toolbarHTML)
{
  // Run first so that the size calculations are accurate on setup
  WebDeveloper.Common.toggleStyleSheet("toolbar/ruler.css", "web-developer-ruler-styles", contentDocument, false);

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

// Removes the ruler
WebDeveloper.Ruler.removeRuler = function(contentDocument)
{
  WebDeveloper.Common.removeMatchingElements("#web-developer-ruler-container", contentDocument);
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

  WebDeveloper.Ruler.backgroundBottom.style.height = (containerHeight - rulerPositionY - rulerHeight) + "px";
  WebDeveloper.Ruler.backgroundBottom.style.width  = containerWidth + "px";
  WebDeveloper.Ruler.backgroundLeft.style.height   = rulerHeight + "px";
  WebDeveloper.Ruler.backgroundLeft.style.top      = rulerPositionY + "px";
  WebDeveloper.Ruler.backgroundLeft.style.width    = rulerPositionX + "px";
  WebDeveloper.Ruler.backgroundRight.style.top     = rulerPositionY + "px";
  WebDeveloper.Ruler.backgroundRight.style.height  = rulerHeight + "px";
  WebDeveloper.Ruler.backgroundRight.style.width   = (containerWidth - rulerPositionX - rulerWidth) + "px";
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
