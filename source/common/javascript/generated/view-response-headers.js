// Initializes the page with data
function initialize(data)
{
	var pre             = $("<pre></pre>");
	var request         = new XMLHttpRequest();
	var responseHeaders = null;

	setPageTitle("Response Headers", data);
	setWindowTitle("Response Headers", data);
	
  request.open("get", data.pageURL, false);
  request.send(null);
  
  responseHeaders = request.getAllResponseHeaders();
  
	$("#content").append(pre);
	pre.text(responseHeaders + "\n" + request.status + " " + request.statusText);
}
