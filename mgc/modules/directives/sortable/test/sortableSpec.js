
describe('mgcSortable', function() {
	
  beforeEach(module('mgc.directives'));

  return describe('simple use', function() {
	
    it('should have a ui-sortable class', function() {
      return inject(function($compile, $rootScope) {
        var element;
        element = $compile("<ul mgc-sortable></ul>")($rootScope);
        return expect(element.hasClass("ui-sortable")).toBeTruthy();
      });
    });

    xit('should update model when order changes', function() {
      return inject(function($compile, $rootScope) {
        var element;
        element = $compile('<ul mgc-sortable ng-model="items"><li ng-repeat="item in items" id="s-{{$index}}">{{ item }}</li></ul>')($rootScope);
        $rootScope.$apply(function() {
					console.log("order 1")
          $rootScope.items = ["One", "Two", "Three"];
        });
        element.find('li:eq(1)').insertAfter(element.find('li:eq(2)'));
				element.trigger('update');
				element.refresh();
				element.refreshPositions();
				console.log(element);
				expect($rootScope.items).toEqual(["One", "Three", "Two"]);
      });
    });
  });
});
