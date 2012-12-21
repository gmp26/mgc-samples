'use strict';
/**
 * @see <a href="http://stackoverflow.com/questions/2161159/get-script-path">This Stack Overflow Question</a>
 */

// This script should be colocated with the content directory
var mgcContentPath = (function() {
	var scripts = document.getElementsByTagName('script');
	var script = scripts[scripts.length-1];
	var src;
	if (script.getAttribute.length !== undefined) {
	    src = script.src;
	}
	else {
	    src = script.getAttribute('src', -1);
	}
	return "/" + src.split('/').slice(3, -1).join('/');
})(); 

angular.module('mgc.locals', []).value('mgc.locals', {path:mgcContentPath});

