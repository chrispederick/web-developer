Web Developer
=============

The Web Developer extension adds various web developer tools to a browser.
The extension is available for Chrome, Edge, Firefox, and Opera, and will run on any platform that these browsers support including Windows, OS X and Linux.

The extension can be installed from its home page:

* Home page: [https://chrispederick.com/work/web-developer/](https://chrispederick.com/work/web-developer/)

Or directly from the Chrome, Edge, Firefox or Opera extension repositories:

* Chrome: [https://chromewebstore.google.com/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm](https://chromewebstore.google.com/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm)
* Edge: [https://microsoftedge.microsoft.com/addons/detail/web-developer/ilbdhapjffldgngebmnkdodohjapjccm](https://microsoftedge.microsoft.com/addons/detail/web-developer/ilbdhapjffldgngebmnkdodohjapjccm)
* Firefox: [https://addons.mozilla.org/en-US/firefox/addon/web-developer/](https://addons.mozilla.org/en-US/firefox/addon/web-developer/)
* Opera:
[https://addons.opera.com/en/extensions/details/web-developer/](https://addons.opera.com/en/extensions/details/web-developer/)

Announcements
-------------

For announcements about the Web Developer extension including news about beta releases and previews of upcoming versions follow:

* Blog: [https://chrispederick.com/blog/](https://chrispederick.com/blog/)
* Mastodon: [https://social.lol/@chrispederick](https://social.lol/@chrispederick)

Help
----

Help for the Web Developer extension can be found on its home page:

* Help: [https://chrispederick.com/work/web-developer/help/](https://chrispederick.com/work/web-developer/help/)
* Known issues: [https://chrispederick.com/work/web-developer/issues/](https://chrispederick.com/work/web-developer/issues/)
* To-do list: [https://chrispederick.com/work/web-developer/to-do/](https://chrispederick.com/work/web-developer/to-do/)

To report a new issue or suggest a new feature please contact me:

* Contact: [https://chrispederick.com/contact/](http://chrispederick.com/contact/)

Developers
----------

### Technologies

The Web Developer extension is written in JavaScript, HTML, and CSS.

### Extension documentation

For information about how to write browser extensions check out the Chrome, Firefox, and Opera documentation:

* Chrome: [https://developer.chrome.com/docs/extensions/](https://developer.chrome.com/docs/extensions/)
* Edge: [https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/](https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/)
* Firefox: [https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons)
* Opera: [https://dev.opera.com/extensions/](https://dev.opera.com/extensions/)

### Build process

The extension uses the [Gulp build system](https://gulpjs.com/).

Once Gulp is installed the extension is built by running the following:

	gulp

To build the extension for Chrome, Edge, Firefox, or Opera only run `gulp chrome`, `gulp edge`, `gulp firefox`, or `gulp opera` respectively.

When the extension is built it creates `build/chrome`, `build/edge`, `build/firefox`, and `build/opera` directories as well as packaged versions of the extensions `build/web-developer-chrome.zip`, `build/web-developer-edge.zip`, `build/web-developer-firefox.xpi`, and `build/web-developer-opera.nex`.

The extension can be installed in Chrome, Edge, Firefox, or Opera by loading the unpacked extension in `build/chrome`, `build/edge`, `build/firefox`, or `build/opera` respectively as described in the [Chrome](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked), [Edge](https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/extension-sideloading), [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#trying_it_out), and [Opera](https://dev.opera.com/extensions/testing/) documentation.

### Included libraries

The following libraries are used by and included in the extension as-is:

* Bootstrap: [https://getbootstrap.com/](https://getbootstrap.com/)
* CodeMirror: [https://codemirror.net/](https://codemirror.net/)
* DOMPurify: [https://github.com/cure53/DOMPurify](https://github.com/cure53/DOMPurify)
* Eric Meyer's Reset CSS: [https://meyerweb.com/eric/tools/css/reset/](https://meyerweb.com/eric/tools/css/reset/)
* JS Beautifier: [https://github.com/beautify-web/js-beautify](https://github.com/beautify-web/js-beautify)
* mustache.js: [https://github.com/janl/mustache.js/](https://github.com/janl/mustache.js/) imported from [https://unpkg.com/browse/mustache@4.2.0/mustache.js](https://unpkg.com/browse/mustache@4.2.0/mustache.js)

They should not be altered apart from to update to their latest versions for maintenance reasons.

### Icons

The icons used in the extension are from [Nucleo](https://nucleoapp.com) and any new icons used in the extension should also come from there for consistency.

### Editor Configuration

An [EditorConfig](https://editorconfig.org/) file is included to unify the coding style for different editors.

Acknowledgements
----------------

Supported by:

* [BrowserStack](https://www.browserstack.com/)

Author
------

### Chris Pederick

* [https://chrispederick.com/](https://chrispederick.com/)
* [https://social.lol/@chrispederick](https://social.lol/@chrispederick)

License
-------

All files are distributed for free under the terms of the
[GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.txt).
This does not apply to the included libraries or icons mentioned in the Developer section which have their own individual licenses.
