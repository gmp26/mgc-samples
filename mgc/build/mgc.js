/**
 * MGC - Maths Education DSL in AngularJS
 * @version v0.1.0 - 2012-12-21
 * @link https://github.com/gmp26/mgc
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

angular.module('mgc.config', []).value('mgc.config', {});
angular.module('mgc.filters', ['mgc.config']);
angular.module('mgc.directives', ['mgc.config']);
angular.module('mgc.services', ['mgc.config']);
angular.module('mgc', ['mgc.filters', 'mgc.directives', 'mgc.services', 'mgc.config']);

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

angular.module('mgc.directives').directive('mgcEval', ['mgc.funcGen', function(funcGen) {
	var fg = funcGen;

  return {
    restrict: 'C', // the directive can be invoked only by using  mgc-eval="" in the template
    scope: true,	
    link: function (scope, element, attrs) {

			var f = fg.define(attrs.f);
			
			//scope.x = scope.x | 0;
			attrs.sigfigs = attrs.sigfigs | 3;

			console.log(element.html());

	    scope.$watch('x', function (newVal, oldVal) {
			  console.log(attrs.sigfigs);
				element.html(f(scope.x).toPrecision(attrs.sigfigs));
	    });
	  }
  };
}]);
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


angular.module('mgc.services', ['mgc.config'], function($provide) {
    $provide.factory('funcGen', function() {

			var poly = function() {
					var args = Array.prototype.slice.call(arguments);
					return function(x) {
						return args.reduce(function(y0, y1) {
							return y0*x + y1;
						});
					};
				}; 

	
		return {

			// takes polynomial coefficients in descending order poly(1,2,3) returns f : x => x^2 + 2x + 3
			poly: poly,
			
			// generates a rational function of two polynomials
			rational: function() {
				var numerator = poly.apply(this, arguments);
				return function() {
					var denominator = poly.apply(this, arguments);
					return function(x) {
						return numerator(x)/denominator(x);
					};
				};
			},
						
			// takes a function definition string in the form '(x,y,z) -> x*y + z'
			// i.e. an optionally parenthesised parameter list, mapped to an expression via '->'
			// returns a function that implements the map. 
			//
			define: function(funcdef) {
				var paramList, funcbody;
				var re = /^\s*(\S+)\s*->\s*(.*)\s*$/;
				var matches = funcdef.match(re);
				if(matches != null) {
					//console.log("matches = "+matches);
					paramList = matches[1];
					if(paramList[0] === '(') paramList=paramList.slice(1,-1);
					//console.log('funcdef='+funcdef);
					funcBody = matches[2];
					//console.log("funcBody1="+funcBody);
										
					funcBody = funcBody
						.replace(/Math\./g,'')
						.replace(/asin/g, 'Math.asin')
						.replace(/acos/g, 'Math.acos')
						.replace(/atan/g, 'Math.atan')
						.replace(/sin/g, 'Math.sin')
						.replace(/cos/g, 'Math.cos')
						.replace(/tan/g, 'Math.tan')
						.replace(/log/g, 'Math.log')
						.replace(/exp/g, 'Math.exp')
						.replace(/pow/g, 'Math.pow')					
						.replace(/ceil/g, 'Math.ceil')
						.replace(/floor/g, 'Math.floor')
						.replace(/round/g, 'Math.round')
						.replace(/sqrt/g, 'Math.sqrt')
						.replace(/abs/g, 'Math.abs')
						.replace(/atan2/g, 'Math.atan2')
						.replace(/PI/g, 'Math.PI')						
						.replace(/LN2/g, 'Math.LN2')
						.replace(/LN10/g, 'Math.LN10')
						.replace(/LOG2E/g, 'Math.LOG2E')
						.replace(/LOG10E/g, 'Math.LOG10E')
						.replace(/SQRT1_2/g, 'Math.SQRT1_2')
						.replace(/SQRT2/g, 'Math.SQRT2')
						.replace(/E/g, 'Math.E')
						.replace(/Math.(a|LOG2|LOG10)Math./g, "Math.$1")
						;
					
					//console.log("funcBody2="+funcBody);		
				}
				if(paramList && funcBody && paramList.length > 0 && funcBody.length > 0) {
					var f = new Function(paramList, "return "+funcBody+";");
					var rf = function() {
						var args = Array.prototype.slice.call(arguments);
						return f.apply(this, arguments); 
					};
					rf.p = paramList; 
					rf.f = funcBody;
					return rf;
				}
				
				throw new Error("unable to parse params or function body");
			}
		};
	});
});