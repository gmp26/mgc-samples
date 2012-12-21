angular.module('mgc.directives').directive('mgcStepper', ['mgc.config', function(mgcConfig) {
	var options = mgcConfig.mgcStepper || {};
	return {
		restrict: 'A',
		// supports using directive as an attribute, with options as the attribute value
		link: function(scope, element, attrs, controller) {
			var opts;

			// opts is link element-specific options merged on top of global defaults. 
			// If you only extend the global default, then all instances would override each other
			opts = angular.extend({}, options, attrs.mgcStepper);
 
			// activate jQuery UI spinner 
			var spinner = element.spinner(opts);

			scope.$watch('amount', function(val) {
				element.spinner("value", val);
			}); 

			element.spinner({
				value: scope.amount,
				spin: function(event, ui) {
					console.log("CHANGE");
					scope.amount = ui.value;
					scope.$apply();
				}
			});

		}
	};
}]);

