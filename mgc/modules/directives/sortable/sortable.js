/*
 jQuery UI Sortable plugin wrapper

 @param [mgc-sortable] {object} Options to pass to $.fn.sortable() merged onto mgc.config
*/

angular.module('mgc.directives').directive('mgcSortable', [
  'mgc.config', function(mgcConfig) {
    var options;
    options = {};
    if (mgcConfig.sortable != null) {
      angular.extend(options, mgcConfig.sortable);
    }
    return {
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {
        var onStart, onUpdate, opts, _start, _update;
        opts = angular.extend({}, options, scope.$eval(attrs.mgcOptions));
        if (ngModel != null) {
          onStart = function(e, mgc) {
            return mgc.item.data('mgc-sortable-start', mgc.item.index());
          };
          onUpdate = function(e, mgc) {
            var end, start;
            start = mgc.item.data('mgc-sortable-start');
            end = mgc.item.index();
            ngModel.$modelValue.splice(end, 0, ngModel.$modelValue.splice(start, 1)[0]);
            return scope.$apply();
          };
          _start = opts.start;
          opts.start = function(e, mgc) {
            onStart(e, mgc);
            if (typeof _start === "function") {
              _start(e, mgc);
            }
            return scope.$apply();
          };
          _update = opts.update;
          opts.update = function(e, mgc) {
            onUpdate(e, mgc);
            if (typeof _update === "function") {
              _update(e, mgc);
            }
            return scope.$apply();
          };
        }
        return element.sortable(opts);
      }
    };
  }
]);
