Web Developer
=============

The Web Developer extension adds various web developer tools to a browser.
The extension is available for Chrome, Firefox and Opera, and will run on any platform that these browsers support including Windows, OS X and Linux.

The extension can be installed from its home page:

* Home page: [http://chrispederick.com/work/web-developer/](http://chrispederick.com/work/web-developer/)

Or directly from the Chrome, Firefox or Opera extension repositories:

* Chrome: [https://chrome.google.com/webstore/detail/bfbameneiokkgbdmiekhjnmfkcnldhhm](https://chrome.google.com/webstore/detail/bfbameneiokkgbdmiekhjnmfkcnldhhm)
* Firefox: [https://addons.mozilla.org/en-US/firefox/addon/web-developer/](https://addons.mozilla.org/en-US/firefox/addon/web-developer/)
* Opera:
[https://addons.opera.com/en/extensions/details/web-developer/](https://addons.opera.com/en/extensions/details/web-developer/)

Announcements
-------------

For announcements about the Web Developer extension including news about beta releases and previews of upcoming versions follow:

* Blog: [http://chrispederick.com/blog/](http://chrispederick.com/blog/)
* Twitter: [http://twitter.com/chrispederick/](http://twitter.com/chrispederick/)
* Dribbble: [http://dribbble.com/chrispederick/projects/9762-Web-Developer](http://dribbble.com/chrispederick/projects/9762-Web-Developer)

Help
----

Help for the Web Developer extension can be found on its home page:

* Help: [http://chrispederick.com/work/web-developer/help/](http://chrispederick.com/work/web-developer/help/)
* Known issues: [http://chrispederick.com/work/web-developer/issues/](http://chrispederick.com/work/web-developer/issues/)
* To-do list: [http://chrispederick.com/work/web-developer/to-do/](http://chrispederick.com/work/web-developer/to-do/)

To report a new issue or suggest a new feature please contact me:

* Contact: [http://chrispederick.com/contact/](http://chrispederick.com/contact/)

Developers
----------

### Technologies

The Web Developer extension is written in JavaScript, HTML and CSS.
The XML user interface language
[XUL](https://developer.mozilla.org/en/XUL)
is also used in the Firefox version.

### Extension documentation

For information about how to write browser extensions check out the Chrome, Firefox and Opera documentation:

* Chrome: [http://code.google.com/chrome/extensions/docs.html](http://code.google.com/chrome/extensions/docs.html)
* Firefox: [https://developer.mozilla.org/en-US/addons](https://developer.mozilla.org/en-US/addons)
* Opera: [https://dev.opera.com/extensions/](https://dev.opera.com/extensions/)

### Localization

The Firefox extension is fully localized with languages other than English (US) provided by the community.
For information about how to write localized browser extensions check out the Firefox documentation:

* Firefox: [https://developer.mozilla.org/en/Localizing_an_extension](https://developer.mozilla.org/en/Localizing_an_extension)

### Build process

The extension uses the [Gulp build system](http://gulpjs.com/).

Once Gulp is installed the extension is built by running the following:

	gulp

To build the extension for Chrome, Firefox or Opera only run `gulp chrome`, `gulp firefox` or `gulp opera` respectively.

When the extension is built it creates `build/chrome`, `build/firefox` and `build/opera` directories as well as packaged versions of the extensions `build/web-developer-chrome.zip`, `build/web-developer-firefox.xpi`, `build/web-developer-opera.nex`.

The extension can be installed in Chrome or Opera by loading the unpacked extension in `build/chrome` or `build/opera` respectively as described in the [Chrome](http://code.google.com/chrome/extensions/getstarted.html#load-ext) and [Opera](https://dev.opera.com/extensions/testing/) documentation.
The extension can be installed in Firefox by installing `build/web-developer-firefox.xpi` like a regular extension.

### Included libraries

The following libraries are used by and included in the extension as-is:

* Bootstrap from Twitter: [http://twitter.github.com/bootstrap/](http://twitter.github.com/bootstrap/)
* CodeMirror: [http://codemirror.net/](http://codemirror.net/)
* Eric Meyer's Reset CSS: [http://meyerweb.com/eric/tools/css/reset/](http://meyerweb.com/eric/tools/css/reset/)
* Font Awesome: [http://fontawesome.io/](http://fontawesome.io/)
* ICanHaz: [http://icanhazjs.com/](http://icanhazjs.com/)
* jQuery: [http://jquery.com/](http://jquery.com/)
* JS Beautifier: [https://github.com/einars/js-beautify](https://github.com/einars/js-beautify)
* Table Drag and Drop jQuery Plugin: [http://www.isocra.com/2008/02/table-drag-and-drop-jquery-plugin/](http://www.isocra.com/2008/02/table-drag-and-drop-jquery-plugin/)

They should not be altered apart from to update to their latest versions for maintenance reasons.
The latest versions of Bootstrap from Twitter or jQuery can be automatically merged into the repository using `gulp merge-bootstrap` or `gulp merge-jquery` respectively.

### Icons

The icons used in the extension are:

* Font Awesome: [http://fontawesome.io/](http://fontawesome.io/)
* Helveticons: [http://helveticons.ch/](http://helveticons.ch/)
* Icon Drawer classic set: [http://icondrawer.com/](http://icondrawer.com/)

Any new icons used in the extension should come from these existing icon sets for consistency.

### Editor Configuration

An [EditorConfig](http://editorconfig.org/) file is included to unify the coding style for different editors.

Acknowledgements
----------------

Supported by:

* [BrowserStack](https://www.browserstack.com/)

Author
------

### Chris Pederick

* [http://chrispederick.com/](http://chrispederick.com/)
* [http://twitter.com/chrispederick/](http://twitter.com/chrispederick/)

License
-------

All files are distributed for free under the terms of the
[GNU General Public License](http://www.gnu.org/licenses/gpl.txt).
This does not apply to the included libraries or icons mentioned in the Developer section which have their own individual licenses.
