# local javascripts 

These must coexist with the content directory so the path to content can be calculated.
This is useful in sites where pages have access to local static content on a path which differs
from any path that may be present in the URL. Common wherever URLs have been simplified.

## `custom.js` template

### Usage from an angularJS controller:

	  ['mgc.locals', function MyController(mgc.locals) {
	
			// get server path to local files.
			var path = mgc.locals.path;
		}]