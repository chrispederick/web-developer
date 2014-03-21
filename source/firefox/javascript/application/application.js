// Constructs an application object
function WebDeveloperApplication(applicationPath)
{
  this.applicationPath = applicationPath;
  this.executable    = this.getExecutable();
  this.file          = null;
}

// Creates a source file
WebDeveloperApplication.prototype.createSourceFile = function(temporaryDirectory, uri)
{
  var sourceFile = null;

  // If the URI has a file scheme
  if(uri.scheme == "file")
  {
    var fileProtocolHandler = Components.classes["@mozilla.org/network/protocol;1?name=file"].createInstance(Components.interfaces.nsIFileProtocolHandler);

    sourceFile = fileProtocolHandler.getFileFromURLSpec(uri.spec);
  }

  // If the source file is not set
  if(!sourceFile)
  {
    var fileExtension = "html";
    var fileName      = uri.host;
    var url         = Components.classes["@mozilla.org/network/standard-url;1"].createInstance(Components.interfaces.nsIURL);

    sourceFile = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
    url.spec   = uri.spec;

    // If the URL has a file extension
    if(url.fileExtension)
    {
      fileExtension = url.fileExtension;
    }

    temporaryDirectory.append("webdeveloper-" + fileName + "-" + new Date().getTime() + "." + fileExtension);
    sourceFile.initWithPath(temporaryDirectory.path);
  }

  return sourceFile;
};

// Returns an executable for the application
WebDeveloperApplication.prototype.getExecutable = function()
{
  var executable = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);

  // If the extension is running on a Mac and the application path points at an application bundle
  if(WebDeveloper.Common.isMac() && WebDeveloper.Common.endsWith(this.applicationPath, ".app"))
  {
    executable.initWithPath("/usr/bin/open");
  }
  else
  {
    executable.initWithPath(this.applicationPath);
  }

  return executable;
};

// Returns the post data
WebDeveloperApplication.prototype.getPostData = function()
{
  // Try to get the post data
  try
  {
    var sessionHistory = getWebNavigation().sessionHistory;
    var entry          = sessionHistory.getEntryAtIndex(sessionHistory.index, false).QueryInterface(Components.interfaces.nsISHEntry);

    return entry.postData;
  }
  catch(exception)
  {
    return null;
  }
};

// Launch the application with the given file
WebDeveloperApplication.prototype.launchWithFile = function()
{
  var process        = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
  var processArguments = [this.file.path];

  process.init(this.executable);

  // If the extension is running on a Mac and the application path points at an application bundle
  if(WebDeveloper.Common.isMac() && WebDeveloper.Common.endsWith(this.applicationPath, ".app"))
  {
    processArguments = ["-a", this.applicationPath, this.file.path];
  }

  process.run(false, processArguments, processArguments.length);
};

// Launch the application with the source from the given URI
WebDeveloperApplication.prototype.launchWithSource = function(uri, contentWindow)
{
  var temporaryDirectory = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("TmpD", Components.interfaces.nsIFile);

  // If the temporary directory exists, is a directory and is writable
  if(temporaryDirectory.exists() && temporaryDirectory.isDirectory() && temporaryDirectory.isWritable())
  {
    // If the executable exists and is executable
    if(this.executable.exists() && this.executable.isExecutable())
    {
      this.file = this.createSourceFile(temporaryDirectory, uri);

      if(uri.scheme == "file")
      {
        this.launchWithFile();
      }
      else
      {
        var webBrowserPersistInterface = Components.interfaces.nsIWebBrowserPersist;
        var webBrowserPersist        = Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(webBrowserPersistInterface);

        webBrowserPersist.persistFlags     = webBrowserPersistInterface.PERSIST_FLAGS_AUTODETECT_APPLY_CONVERSION | webBrowserPersistInterface.PERSIST_FLAGS_FROM_CACHE | webBrowserPersistInterface.PERSIST_FLAGS_REPLACE_EXISTING_FILES;
        webBrowserPersist.progressListener = this;

        webBrowserPersist.saveURI(uri, null, uri, this.getPostData(), null, this.file, contentWindow.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIWebNavigation).QueryInterface(Components.interfaces.nsILoadContext));
      }
    }
    else
    {
      WebDeveloper.Common.displayError(WebDeveloper.Locales.getString("viewSourceWith"), WebDeveloper.Locales.getFormattedString("launchApplicationFailed", [this.applicationPath]));
    }
  }
  else
  {
    WebDeveloper.Common.displayError(WebDeveloper.Locales.getString("viewSourceWith"), WebDeveloper.Locales.getFormattedString("temporaryDirectoryFailed", [temporaryDirectory.path]));
  }
};

// Launch the application with the given URL
WebDeveloperApplication.prototype.launchWithURL = function(url)
{
  // If the executable exists and is executable
  if(this.executable.exists() && this.executable.isExecutable())
  {
    var process        = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
    var processArguments = [url];

    process.init(this.executable);

    // If the extension is running on a Mac and the application path points at an application bundle
    if(WebDeveloper.Common.isMac() && WebDeveloper.Common.endsWith(this.applicationPath, ".app"))
    {
      processArguments = ["-a", this.applicationPath, url];
    }

    process.run(false, processArguments, processArguments.length);
  }
  else
  {
    WebDeveloper.Common.displayError(WebDeveloper.Locales.getString("openApplication"), WebDeveloper.Locales.getFormattedString("launchApplicationFailed", [this.applicationPath]));
  }
};

// Called when the progress state changes
WebDeveloperApplication.prototype.onStateChange = function(webProgress, request, stateFlags)
{
  // If the progress has stopped
  if(stateFlags & Components.interfaces.nsIWebProgressListener.STATE_STOP)
  {
    this.launchWithFile();
  }
};

// Indicates the interfaces this object supports
WebDeveloperApplication.prototype.QueryInterface = function(id)
{
  // If the query is for a supported interface
  if(id.equals(Components.interfaces.nsISupports) || id.equals(Components.interfaces.nsIWebProgressListener))
  {
    return this;
  }

  throw Components.results.NS_NOINTERFACE;
};

// Dummy methods requiring implementations
WebDeveloperApplication.prototype.onLocationChange = function() {};
WebDeveloperApplication.prototype.onProgressChange = function() {};
WebDeveloperApplication.prototype.onSecurityChange = function() {};
WebDeveloperApplication.prototype.onStatusChange   = function() {};
