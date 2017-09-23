var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Cookies = WebDeveloper.Cookies || {};

// Sanitizes a cookie host
WebDeveloper.Cookies.sanitizeHost = function(host)
{
  // If the host is set and starts with '.'
  if(host && host.charAt(0) == ".")
  {
    return host.substring(1);
  }

  return host;
};
