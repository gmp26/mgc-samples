angular.module('mgc.directives').directive('mgcAdjustable', ['mgc.config', function (mgcConfig) {
  var options = mgcConfig.adjustable || {};
  return {
    restrict: 'EAC', // supports using directive as element, attribute and class
    link: function (iScope, iElement, iAttrs, controller) {
      var opts;

      // opts is link element-specific options merged on top of global defaults. If you only extend the global default, then all instances would override each other
      opts = angular.extend({}, options, iAttrs.mgcTemplate);

      // your logic goes here
    }
  };
}]);
