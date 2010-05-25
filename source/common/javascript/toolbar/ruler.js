WebDeveloper.Ruler = {};

WebDeveloper.Ruler.drag   = false;
WebDeveloper.Ruler.endX   = 0;
WebDeveloper.Ruler.endY   = 0;
WebDeveloper.Ruler.move   = false;
WebDeveloper.Ruler.moveX  = 0;
WebDeveloper.Ruler.moveY  = 0;
WebDeveloper.Ruler.resize = false;
WebDeveloper.Ruler.startX = 0;
WebDeveloper.Ruler.startY = 0;

// Creates the ruler
WebDeveloper.Ruler.createRuler = function(contentDocument)
{
  var container = contentDocument.createElement("div");
  var resizer   = contentDocument.createElement("div");
  var ruler     = contentDocument.createElement("div");

  resizer.setAttribute("id", "web-developer-ruler-bottom-left");
  container.appendChild(resizer);

  resizer = contentDocument.createElement("div");
  resizer.setAttribute("id", "web-developer-ruler-bottom-right");
  container.appendChild(resizer);

  resizer = contentDocument.createElement("div");
  resizer.setAttribute("id", "web-developer-ruler-top-left");
  container.appendChild(resizer);

  resizer = contentDocument.createElement("div");
  resizer.setAttribute("id", "web-developer-ruler-top-right");
  container.appendChild(resizer);

  container.setAttribute("id", "web-developer-ruler-container");
  ruler.setAttribute("id", "web-developer-ruler");
  ruler.appendChild(container);

	WebDeveloper.Common.getDocumentBodyElement(contentDocument).appendChild(ruler);

  contentDocument.addEventListener("mousedown", WebDeveloper.Ruler.mouseDown, true);
  contentDocument.addEventListener("mousemove", WebDeveloper.Ruler.mouseMove, false);
  contentDocument.addEventListener("mouseup", WebDeveloper.Ruler.mouseUp, true);
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
	      var ruler = ownerDocument.getElementById("web-developer-ruler");
	
	      // If the ruler was found
	      if(ruler)
	      {
		      var tagName = eventTarget.tagName;
		      var toolbar = ownerDocument.getElementById("web-developer-ruler-toolbar");

	        // If the event target is not the toolbar, the toolbar is not an ancestor of the event target and the event target is not a scrollbar
	        if(eventTarget != toolbar && !WebDeveloper.Common.isAncestor(eventTarget, toolbar) && tagName && tagName.toLowerCase() != "scrollbar")
	        {
		        var xPosition = event.pageX;
		        var yPosition = event.pageY;
		
	          // If event target is the container element
	          if(eventTarget == ownerDocument.getElementById("web-developer-ruler-container"))
	          {
	            WebDeveloper.Ruler.move  = true;
	            WebDeveloper.Ruler.moveX = xPosition - ruler.offsetLeft;
	            WebDeveloper.Ruler.moveY = yPosition - ruler.offsetTop;
	          }
	          else if(eventTarget == ownerDocument.getElementById("web-developer-ruler-bottom-left"))
	          {
	            WebDeveloper.Ruler.resize = true;
	            WebDeveloper.Ruler.startX = ruler.offsetLeft + ruler.offsetWidth;
	            WebDeveloper.Ruler.startY = ruler.offsetTop;
	          }
	          else if(eventTarget == ownerDocument.getElementById("web-developer-ruler-bottom-right"))
	          {
	            WebDeveloper.Ruler.resize = true;
	            WebDeveloper.Ruler.startX = ruler.offsetLeft;
	            WebDeveloper.Ruler.startY = ruler.offsetTop;
	          }
	          else if(eventTarget == ownerDocument.getElementById("web-developer-ruler-top-left"))
	          {
	            WebDeveloper.Ruler.resize = true;
	            WebDeveloper.Ruler.startX = ruler.offsetLeft + ruler.offsetWidth;
	            WebDeveloper.Ruler.startY = ruler.offsetTop + ruler.offsetHeight;
	          }
	          else if(eventTarget == ownerDocument.getElementById("web-developer-ruler-top-right"))
	          {
	            WebDeveloper.Ruler.resize = true;
	            WebDeveloper.Ruler.startX = ruler.offsetLeft;
	            WebDeveloper.Ruler.startY = ruler.offsetTop + ruler.offsetHeight;
	          }
	          else
	          {
	            WebDeveloper.Ruler.drag   = true;
	            WebDeveloper.Ruler.endX   = 0;
	            WebDeveloper.Ruler.endY   = 0;
	            WebDeveloper.Ruler.startX = xPosition;
	            WebDeveloper.Ruler.startY = yPosition;
	
						  WebDeveloper.Ruler.updateInformation(ownerDocument);
	          }
	
				    event.stopPropagation();
				    event.preventDefault();
	        }
				}
      }
    }
  }
};

// Handles the mouse move event
WebDeveloper.Ruler.mouseMove = function(event)
{
  var eventTarget = event.target;

  // If the event target is set
  if(eventTarget)
  {
    var ownerDocument = eventTarget.ownerDocument;

    // If the event target has an owner document
    if(ownerDocument)
    {
      var ruler = ownerDocument.getElementById("web-developer-ruler");

      // If the ruler is set
      if(ruler)
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

          // If the start x position is greater than the end x position
          if(WebDeveloper.Ruler.startX > WebDeveloper.Ruler.endX)
          {
            width = WebDeveloper.Ruler.startX - WebDeveloper.Ruler.endX;

            ruler.style.left = xPosition + "px";
          }
          else
          {
            width = WebDeveloper.Ruler.endX - WebDeveloper.Ruler.startX;

            ruler.style.left = WebDeveloper.Ruler.startX + "px";
          }

          // If the start y position is greater than the end y position
          if(WebDeveloper.Ruler.startY > WebDeveloper.Ruler.endY)
          {
            height = WebDeveloper.Ruler.startY - WebDeveloper.Ruler.endY;

            ruler.style.top = WebDeveloper.Ruler.endY + "px";
          }
          else
          {
            height = WebDeveloper.Ruler.endY - WebDeveloper.Ruler.startY;

            ruler.style.top = WebDeveloper.Ruler.startY + "px";
          }

          ruler.style.height = height + "px";
          ruler.style.width  = width + "px";
        }
        else if(WebDeveloper.Ruler.move)
        {
          var newXPosition = xPosition - WebDeveloper.Ruler.moveX;
          var newYPosition = yPosition - WebDeveloper.Ruler.moveY;

          ruler.style.left = newXPosition + "px";
          ruler.style.top  = newYPosition + "px";

          WebDeveloper.Ruler.endX   = newXPosition + ruler.offsetWidth;
          WebDeveloper.Ruler.endY   = newYPosition + ruler.offsetHeight;
          WebDeveloper.Ruler.startX = newXPosition;
          WebDeveloper.Ruler.startY = newYPosition;
        }

			  WebDeveloper.Ruler.updateInformation(ownerDocument);
      }
    }
  }
};

// Handles the mouse up event
WebDeveloper.Ruler.mouseUp = function(event)
{
  var eventTarget = event.target;

  // If the event target is set
  if(eventTarget)
  {
    var ownerDocument = eventTarget.ownerDocument;

    // If the event target has an owner document
    if(ownerDocument)
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
		
		  WebDeveloper.Ruler.updateInformation(ownerDocument);
		}
	}
};

// Removes the ruler
WebDeveloper.Ruler.removeRuler = function(contentDocument)
{
	WebDeveloper.Common.removeMatchingElements("#web-developer-ruler", contentDocument);

  contentDocument.removeEventListener("mousedown", WebDeveloper.Ruler.selectRuler, true);
  contentDocument.removeEventListener("mousemove", WebDeveloper.Ruler.moveRuler, false);
  contentDocument.removeEventListener("mouseup", WebDeveloper.Ruler.deselectRuler, true);
};
