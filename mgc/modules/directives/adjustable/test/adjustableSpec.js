describe('mgcAdjustable', function () {

  // declare these up here to be global to all tests
  var $rootScope, $compile;

  beforeEach(module('mgc.directives'));

  // inject in angular constructs. Injector knows about leading/trailing underscores and does the right thing
  // otherwise, you would need to inject these into each test
  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  // reset the mgc.config after each test
  afterEach(function () {
    angular.module('mgc.config').value('mgc.config', {});
  });

  // optional grouping of tests
  describe('directive', function () {
    var element;
    it('should create an element if using element-style', function () {
      element = $compile('<mgc-directive-tmpl ng-model="a"></mgc-directive-tmpl>')($rootScope);
      expect(element).toBeDefined();
    });
  });

});
