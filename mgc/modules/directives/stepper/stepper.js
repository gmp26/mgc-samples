angular.module('mgc.directives').directive('mgcStepper', ['mgc.config', function(mgcConfig) {
	var options = mgcConfig.mgcStepper || {};
	
	var template = '<div class="input-prepend input-append">\
	  <button class="btn icon-arrow-left" type="button"></button>\
	  <input class="span2" id="appendedPrependedInput" type="number" value="{{amount}}">\
	  <button class="btn icon-arrow-right" type="button"></button>\
	</div>';
	return {
		restrict: 'A',
    require: '?ngModel', // get a hold of NgModelController
		// supports using directive as an attribute, with options as the attribute value
		link: function(scope, element, attrs, ngModel) {
			var opts;

			if(!ngModel) return;

			// opts is link element-specific options merged on top of global defaults. 
			// If you only extend the global default, then all instances would override each other
			opts = angular.extend({}, options, scope.$eval(attrs.mgcStepper));
 
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

