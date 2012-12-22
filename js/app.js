
/**
 * demoApp - 1.0.0rc2
 */

angular.module('demoApp', ['mgc'], function($locationProvider) {
	$locationProvider.hashPrefix('');
	// Make code pretty
	window.prettyPrint && prettyPrint();
}).value('ui.config', {
	currency: {
		symbol: 'USD $'
	}
}).directive('scrollto', [function(){
	return function(scope, elm, attrs) {
		elm.bind('click', function(e){
			e.preventDefault();
			if (attrs.href) {
				attrs.scrollto = attrs.href;
			}
			var top = $(attrs.scrollto).offset().top;
			$('body').animate({ scrollTop: top }, 800);
		});
	};
}])
	.controller('StepperCtrl', function($scope) {
		console.log('StepperCtrl called');
	});
