angular.module('mgc.config', []).value('mgc.config', {});
angular.module('mgc.filters', ['mgc.config']);
angular.module('mgc.directives', ['mgc.config']);
angular.module('mgc.services', ['mgc.config']);
angular.module('mgc', ['mgc.filters', 'mgc.directives', 'mgc.services', 'mgc.config']);
