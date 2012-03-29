var WebDeveloper = WebDeveloper || {};

WebDeveloper.Content = WebDeveloper.Content || {};

// Returns the size of a document
WebDeveloper.Content.getDocumentSize = function()
{
	var contentDocument				 = WebDeveloper.Common.getContentDocument();
	var contentDocuments			 = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
	var documentSize					 = {};
	var documentSizeDocument	 = null;
	var documentSizeImage			 = null;
	var documentSizeObject		 = null;
	var documentSizeScript		 = null;
	var documentSizeStyleSheet = null;
	var documentURL						 = null;
	var image									 = null;
	var images								 = null;
	var object								 = null;
	var objects								 = null;
	var script								 = null;
	var scripts								 = null;
	var styleSheet						 = null;
	var styleSheets						 = null;
	var url										 = null;

	documentSize.documents	 = [];
	documentSize.images			 = [];
	documentSize.objects		 = [];
	documentSize.pageURL		 = contentDocument.documentURI;
	documentSize.scripts		 = [];
	documentSize.styleSheets = [];

	// Loop through the documents
	for(var i = 0, l = contentDocuments.length; i < l; i++)
	{
		contentDocument						= contentDocuments[i];
		documentSizeDocument			= {};
		documentURL								= contentDocument.documentURI;
		documentSizeDocument.size = WebDeveloper.Content.getFileSize(documentURL, true);
		documentSizeDocument.url	= documentURL;
		images										= WebDeveloper.Common.getDocumentImages(contentDocument);
		objects										= contentDocument.embeds;
		scripts										= contentDocument.querySelectorAll("script[src]");
		styleSheets								= contentDocument.styleSheets;

		// Loop through the images
		for(var j = 0, m = images.length; j < m; j++)
		{
			documentSizeImage			 = {};
			image									 = images[j];
			url										 = image.src;
			documentSizeImage.size = WebDeveloper.Content.getFileSize(url, false);
			documentSizeImage.url  = url;

			documentSize.images.push(documentSizeImage);
		}

		// Loop through the objects
		for(j = 0, m = objects.length; j < m; j++)
		{
			documentSizeObject			= {};
			object									= objects[j];
			url											= object.src;
			documentSizeObject.size = WebDeveloper.Content.getFileSize(url, false);
			documentSizeObject.url	= url;

			documentSize.objects.push(documentSizeObject);
		}

		// Loop through the scripts
		for(j = 0, m = scripts.length; j < m; j++)
		{
			documentSizeScript			= {};
			script									= scripts[j];
			url											= script.src;
			documentSizeScript.size = WebDeveloper.Content.getFileSize(url, true);
			documentSizeScript.url	= url;

			documentSize.scripts.push(documentSizeScript);
		}

		// Loop through the style sheets
		for(j = 0, m = styleSheets.length; j < m; j++)
		{
			styleSheet = styleSheets[j];

			// If this is a valid style sheet and is not an inline style sheet
			if(WebDeveloper.CSS.isValidStyleSheet(styleSheet) && styleSheet.href && styleSheet.href != documentURL)
			{
				documentSizeStyleSheet			= {};
				url													= styleSheet.href;
				documentSizeStyleSheet.size = WebDeveloper.Content.getFileSize(url, true);
				documentSizeStyleSheet.url	= url;

				documentSize.styleSheets.push(documentSizeStyleSheet);
			}
		}

		documentSize.documents.push(documentSizeDocument);
	}

	documentSize.documents.sort(WebDeveloper.Content.sortByFileSize);
	documentSize.images.sort(WebDeveloper.Content.sortByFileSize);
	documentSize.objects.sort(WebDeveloper.Content.sortByFileSize);
	documentSize.scripts.sort(WebDeveloper.Content.sortByFileSize);
	documentSize.styleSheets.sort(WebDeveloper.Content.sortByFileSize);

	return documentSize;
};

// Returns the size of a file
WebDeveloper.Content.getFileSize = function(url, includeCompressed)
{
	var cacheService = Components.classes["@mozilla.org/network/cache-service;1"].getService(Components.interfaces.nsICacheService);
	var cacheSession = null;
	var file				 = null;
	var fileSize		 = {};
	var readAccess	 = Components.interfaces.nsICache.ACCESS_READ;
	var size				 = null;

	// Try to get the file size from the HTTP cache
	try
	{
		cacheSession											= cacheService.createSession("HTTP", 0, true);
		cacheSession.doomEntriesIfExpired = false;
		file															= cacheSession.openCacheEntry(url, readAccess, false);

		// If there is a file
		if(file)
		{
			size = file.dataSize;
		}
	}
	catch(exception)
	{
		// Try to get the file size from the FTP cache
		try
		{
			cacheSession											= cacheService.createSession("FTP", 0, true);
			cacheSession.doomEntriesIfExpired = false;
			file															= cacheSession.openCacheEntry(url, readAccess, false);

			// If there is a file
			if(file)
			{
				size = file.dataSize;
			}
		}
		catch(exception2)
		{
			size = null;
		}
	}

	// If the file size could not be retrieved from the cache
	if(!size)
	{
		// Try to download the file
		try
		{
			var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);

			size = ioService.newChannelFromURI(ioService.newURI(url, null, null)).open().available();
		}
		catch(exception3)
		{
			size = null;
		}
	}

	fileSize.size = size;

	// If including the compressed size
	if(includeCompressed)
	{
		var fileCompressed	 = true;
		var uncompressedSize = null;

		// If there is a file
		if(file)
		{
			var encoding				= null;
			var responseHeaders = null;

			// Try to get the cache encoding
			try
			{
				// Specific case-sensitive required
				encoding = file.getMetaDataElement("request-Accept-Encoding");
			}
			catch(exception4)
			{
				encoding = null;

				// Try to get the response headers
				try
				{
					// Specific case-sensitive required
					responseHeaders = file.getMetaDataElement("response-head");
				}
				catch(exception5)
				{
					responseHeaders = null;
				}
			}

			// If the cache is not GZIP encoded
			if((!encoding || encoding.indexOf("gzip") == -1) && (!responseHeaders || responseHeaders.indexOf("Content-Encoding: gzip") == -1))
			{
				fileCompressed = false;
			}
		}

		// If the file is compressed
		if(fileCompressed)
		{
			// Try to download the file
			try
			{
				var request = new XMLHttpRequest();

				request.open("get", url, false);
				request.send(null);

				uncompressedSize = request.responseText.length;

				// If the uncompressed size is smaller than the size
				if(uncompressedSize < size)
				{
					uncompressedSize = size;
				}
			}
			catch(exception6)
			{
				uncompressedSize = null;
			}
		}

		fileSize.uncompressedSize = uncompressedSize;
	}

	return fileSize;
};

// Sorts files by file size
WebDeveloper.Content.sortByFileSize = function(fileOne, fileTwo)
{
	return fileTwo.size.size - fileOne.size.size;
};
