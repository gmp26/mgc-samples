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