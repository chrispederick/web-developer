var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Background                                        = WebDeveloper.Background || {};
WebDeveloper.Background.maximumCaptureVisibleTabCallsPerSecond = 1000;

// Gets the content from a URL
WebDeveloper.Background.getURLContent = async function(url, errorMessage)
{
  return new Promise((resolve) =>
  {
    var urlContent = fetch(url);

    // Get the response
    urlContent.then((response) =>
    {
      // If the response is okay
      if(response.ok)
      {
        // Get the response text
        response.text().then((text) =>
        {
          resolve({ content: text, url: url });
        });
      }
      else
      {
        resolve({ content: errorMessage, url: url });
      }
    });
  });
};

// Gets the content from a set of URLs
WebDeveloper.Background.getURLContents = async function(urls, errorMessage, sendResponse)
{
  var promises = [];
  var results  = null;

  // Loop through the urls
  for(var i = 0, l = urls.length; i < l; i++)
  {
    promises.push(WebDeveloper.Background.getURLContent(urls[i], errorMessage));
  }

  results = await Promise.all(promises);

  sendResponse(results);
};

// Gets the visible tab
WebDeveloper.Background.getVisibleTab = function(sendResponse)
{
  chrome.tabs.captureVisibleTab(null, null, function(dataUrl)
  {
    sendResponse({ dataUrl: dataUrl, maximumPerSecond: WebDeveloper.Background.maximumCaptureVisibleTabCallsPerSecond });
  });
};

// Handles any background messages
WebDeveloper.Background.message = function(message, sender, sendResponse)
{
  // If the message type is to get a storage item
  if(message.type == "get-storage-item")
  {
    WebDeveloper.Storage.getItem(message.item, function(item)
    {
      sendResponse({ value: item });
    });
  }
  else if(message.type == "get-url-contents")
  {
    WebDeveloper.Background.getURLContents(message.urls, message.errorMessage, sendResponse);
  }
  else if(message.type == "get-visible-tab")
  {
    WebDeveloper.Background.getVisibleTab(sendResponse);
  }
  else if(message.type == "set-storage-item")
  {
    WebDeveloper.Storage.setItem(message.item, message.value);

    // No response required
    sendResponse({});
  }

  return true;
};

// If the maximum capture visible tab calls per second is set
if(chrome.tabs.MAX_CAPTURE_VISIBLE_TAB_CALLS_PER_SECOND)
{
  WebDeveloper.Background.maximumCaptureVisibleTabCallsPerSecond = chrome.tabs.MAX_CAPTURE_VISIBLE_TAB_CALLS_PER_SECOND;
}

chrome.runtime.onMessage.addListener(WebDeveloper.Background.message);
