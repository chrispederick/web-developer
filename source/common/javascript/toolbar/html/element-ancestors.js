var WebDeveloper = WebDeveloper || {};

WebDeveloper.Generated													= WebDeveloper.Generated || {};
WebDeveloper.Generated.ancestorSingleLineHeight = 18;
WebDeveloper.Generated.ancestorContainer				= null;
WebDeveloper.Generated.ancestors								= null;

// Adjusts the ancestors
WebDeveloper.Generated.adjustAncestors = function(adjustor)
{
	// Loop through the ancestors
	WebDeveloper.Generated.ancestors.each(function()
	{
		adjustor($(this));
	});
};

// Hides ancestors from the middle of the path
WebDeveloper.Generated.hideAncestors = function()
{
	var middleAncestor = $(".web-developer-middle-ancestor");

	middleAncestor.prevAll(":visible").first().add(middleAncestor.nextAll(":visible").eq(0)).hide();
};

// Hides ancestors from the middle of the path
WebDeveloper.Generated.populateAncestors = function(ancestors)
{
	$("#content").empty().get(0).appendChild(ancestors);
	WebDeveloper.Generated.resizeAncestors(true);
};

// Resizes the ancestors
WebDeveloper.Generated.resizeAncestors = function(reset)
{
	var currentHeight	 = 0;
	var previousHeight = 0;

	// If resetting or the ancestor container and ancestors are not set
	if(reset || (!WebDeveloper.Generated.ancestorContainer && !WebDeveloper.Generated.ancestors))
	{
		WebDeveloper.Generated.ancestorContainer = $(".breadcrumb");
		WebDeveloper.Generated.ancestors				 = $("li", WebDeveloper.Generated.ancestorContainer);
	}

	WebDeveloper.Generated.toggleMiddleAncestor(true);

	WebDeveloper.Generated.adjustAncestors(function(ancestor) { WebDeveloper.Generated.setAncestorDescription(ancestor, true, true, 0); });

	// If the ancestors are wrapping
	if(WebDeveloper.Generated.ancestorContainer.height() > WebDeveloper.Generated.ancestorSingleLineHeight)
	{
		WebDeveloper.Generated.adjustAncestors(function(ancestor) { WebDeveloper.Generated.setAncestorDescription(ancestor, true, true, 30); });
	}

	// If the ancestors are wrapping
	if(WebDeveloper.Generated.ancestorContainer.height() > WebDeveloper.Generated.ancestorSingleLineHeight)
	{
		WebDeveloper.Generated.adjustAncestors(function(ancestor) { WebDeveloper.Generated.setAncestorDescription(ancestor, true, false, 0); });
	}

	// If the ancestors are wrapping
	if(WebDeveloper.Generated.ancestorContainer.height() > WebDeveloper.Generated.ancestorSingleLineHeight)
	{
		WebDeveloper.Generated.adjustAncestors(function(ancestor) { WebDeveloper.Generated.setAncestorDescription(ancestor, true, false, 16); });
	}

	// If the ancestors are wrapping
	if(WebDeveloper.Generated.ancestorContainer.height() > WebDeveloper.Generated.ancestorSingleLineHeight)
	{
		WebDeveloper.Generated.adjustAncestors(function(ancestor) { WebDeveloper.Generated.setAncestorDescription(ancestor, false, false, 0); });
	}

	// If the ancestors are wrapping
	if(WebDeveloper.Generated.ancestorContainer.height() > WebDeveloper.Generated.ancestorSingleLineHeight)
	{
		WebDeveloper.Generated.toggleMiddleAncestor(false);
	}

	currentHeight = WebDeveloper.Generated.ancestorContainer.height();

	// While the ancestors are wrapping
	while(currentHeight > WebDeveloper.Generated.ancestorSingleLineHeight && currentHeight != previousHeight)
	{
		previousHeight = WebDeveloper.Generated.ancestorContainer.height();

		WebDeveloper.Generated.hideAncestors();

		currentHeight = WebDeveloper.Generated.ancestorContainer.height();
	}
};

// Sets the ancestor description
WebDeveloper.Generated.setAncestorDescription = function(ancestor, includeId, includeClasses, truncateLength)
{
	var ancestorData				= ancestor.data("web-developer-element-id");
	var ancestorDescription = ancestor.data("web-developer-element-tag");

	// If including the id and it is set
	if(includeId && ancestorData)
	{
		ancestorDescription += ancestorData;
	}

	ancestorData = ancestor.data("web-developer-element-classes");

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
	if(ancestor.hasClass("active"))
	{
		ancestor.text(ancestorDescription);
	}
	else
	{
		$("a", ancestor).text(ancestorDescription);
	}
};

// Toggles the middle ancestor
WebDeveloper.Generated.toggleMiddleAncestor = function(display)
{
	// If displaying the middle ancestor
	if(display)
	{
		WebDeveloper.Generated.ancestors.show();
		$(".web-developer-middle-ancestor").removeClass("web-developer-middle-ancestor");
	}
	else
	{
		var middleAncestor = WebDeveloper.Generated.ancestors.eq(Math.floor(WebDeveloper.Generated.ancestors.length / 2)).addClass("web-developer-middle-ancestor");

		$("a", middleAncestor).text("...");
	}
};

$(function()
{
	$(window).on("resize", WebDeveloper.Generated.resizeAncestors);
});
