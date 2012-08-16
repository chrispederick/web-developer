// Constructs a validate CSS object
function WebDeveloperValidateCSS()
{
	this.file							 = null;
	this.validationRequest = null;
}

// Cleans up
WebDeveloperValidateCSS.prototype.cleanUp = function()
{
	// If the file is set
	if(this.file)
	{
		// Try to delete the file
		try
		{
			this.file.remove(false);
		}
		catch(exception)
		{
			// Ignore
		}

		this.file = null;
	}

	// If the validation request is set
	if(this.validationRequest)
	{
		this.validationRequest.abort();
	}
};

// Creates a source file
WebDeveloperValidateCSS.prototype.createSourceFile = function(uri)
{
	var temporaryDirectory = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("TmpD", Components.interfaces.nsIFile);

	// If the temporary directory exists, is a directory and is writable
	if(temporaryDirectory.exists() && temporaryDirectory.isDirectory() && temporaryDirectory.isWritable())
	{
		var fileName	 = "";
		var sourceFile = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);

		// Try to get the host
		try
		{
			fileName = uri.host;
		}
		catch(exception)
		{
			// Ignore
		}

		temporaryDirectory.append("web-developer-" + fileName + "-" + new Date().getTime() + ".css");
		sourceFile.initWithPath(temporaryDirectory.path);

		return sourceFile;
	}
	else
	{
		WebDeveloper.Common.displayError(WebDeveloper.Locales.getString("validateCSS"), WebDeveloper.Locales.getFormattedString("temporaryDirectoryFailed", [temporaryDirectory.path]));

		return null;
	}
};

// Returns the CSS as text
WebDeveloperValidateCSS.prototype.getCSS = function(css, callback)
{
	var contentDocument		 = null;
	var cssText						 = "";
	var documents					 = css.documents;
	var styleSheets				 = null;
	var urlContentRequests = [];

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];
		styleSheets			= contentDocument.styleSheets;

		// If there are embedded styles
		if(contentDocument.embedded)
		{
			cssText += contentDocument.embedded;
		}

		// Loop through the style sheets
		for(var j = 0, m = styleSheets.length; j < m; j++)
		{
			urlContentRequests.push({ "url": styleSheets[j] });
		}
	}

	WebDeveloper.Common.getURLContents(urlContentRequests, "", function()
	{
		// Loop through the URL content requests
		for(var k = 0, n = urlContentRequests.length; k < n; k++)
		{
			cssText += urlContentRequests[k].content;
		}

		callback(cssText);
	});
};

// Parses the validation results by type
WebDeveloperValidateCSS.prototype.parseValidationResultsByType = function(type)
{
	var count					= 0;
	var resultsHTML		= this.validationRequest.responseText;
	var startPosition = resultsHTML.indexOf('<div id="' + type + '">');

	// If the start position is greater than 0
	if(startPosition > 0)
	{
		var endPosition = resultsHTML.indexOf("</div>", startPosition);

		// If the end position is greater than 0
		if(endPosition > 0)
		{
			count = resultsHTML.slice(startPosition, endPosition).split("<li>").length;
		}
	}

	// If the count is greater than 0
	if(count > 0)
	{
		return count - 1;
	}

	return 0;
};

// Validate the CSS from the given URI and document list in the background
WebDeveloperValidateCSS.prototype.validateBackgroundCSS = function(uri, css)
{
	var boundaryString = new Date().getTime();
	var boundary			 = "--" + boundaryString;
	var fileName			 = "css";
	var validator			 = this;

	// Try to get the host
	try
	{
		fileName = uri.host;
	}
	catch(exception)
	{
		// Ignore
	}

	// If the validation request is not set
	if(!this.validationRequest)
	{
		this.validationRequest = new XMLHttpRequest();
	}

	this.validationRequest.onreadystatechange = WebDeveloper.PageValidation.updateCSSValidationDetails;

	this.validationRequest.open("post", "http://jigsaw.w3.org/css-validator/validator");
	this.validationRequest.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + boundaryString);

	this.getCSS(css, function(cssText)
	{
		var requestBody = boundary + "\r\nContent-Disposition: form-data; name=\"file\"; filename=\"" + fileName + ".css\"\r\n";

		requestBody += "Content-Type: text/css\r\n\r\n";
		requestBody += cssText + "\r\n";
		requestBody += boundary + "\r\n";
		requestBody += "Content-Disposition: form-data; name=\"profile\"\r\n\r\ncss3\r\n";
		requestBody += boundary + "\r\n";
		requestBody += "Content-Disposition: form-data; name=\"usermedium\"\r\n\r\nall\r\n";
		requestBody += boundary + "\r\n";
		requestBody += "Content-Disposition: form-data; name=\"warning\"\r\n\r\n0\r\n";
		requestBody += boundary + "--";

		// Try to send the request
		try
		{
			validator.validationRequest.sendAsBinary(requestBody);
		}
		catch(exception2)
		{
			// Reset the validation request
			validator.validationRequest = new XMLHttpRequest();
		}
	});
};

// Validate the CSS from the given URI and document list
WebDeveloperValidateCSS.prototype.validateCSS = function(uri, css)
{
	var tab  = WebDeveloper.Common.getTabBrowser().getBrowserForTab(WebDeveloper.Common.openURL(WebDeveloper.Common.getChromeURL("validation/css.html")));
	var load = (function(validator, url)
	{
		var handler = function(event)
		{
			validator.getCSS(css, function(cssText)
			{
				var contentDocument = tab.contentDocument;
				var outputStream		= Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);

				validator.file = validator.createSourceFile(url);

				validator.file.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, parseInt(644, 8));
				outputStream.init(validator.file, parseInt(4, 16) | parseInt(8, 16) | parseInt(20, 16), parseInt(644, 8), null);

				outputStream.write(cssText, cssText.length);
				outputStream.close();

				contentDocument.getElementById("file").value = validator.file.path;

				contentDocument.getElementById("form").submit();
				window.setTimeout(function() { validator.cleanUp(); }, 1000);
			});

			tab.removeEventListener("load", handler, true);
		};

		return handler;
	})(this, uri);

	tab.addEventListener("load", load, true);
};
