# mgc-sortable directive

This directive allows you to sort arrays with drag & drop.

## Requirements

- JQuery
- JQueryUI

## Usage

Load the script file: sortable.js in your application (or load in mgc which includes it)

		<script type="text/javascript" src="modules/directives/sortable/src/sortable.js"></script>

Add the sortable module as a dependency to your application module:

		var myAppModule = angular.module('MyApp', ['mgc.directives.sortable'])


Apply the directive to your form elements:

		<ul mgc-sortable ng-model="items">
		  <li ng-repeat="item in items">{{ item }}</li>
		</ul>

### Options

All the [jQueryUI Sortable options](http://api.jqueryui.com/sortable/) can be passed through the directive.

		myAppModule.controller('MyController', function($scope) {
		  $scope.items = ["One", "Two", "Three"];

		  $scope.sortableOptions = {
		    update: function(e, mgc) { ... },
		    axis: 'x'
		  };
		});


		<ul mgc-sortable="sortableOptions" ng-model="items">
		  <li ng-repeat="item in items">{{ item }}</li>
		</ul>



