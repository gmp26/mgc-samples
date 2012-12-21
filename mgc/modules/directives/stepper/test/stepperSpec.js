/*
 * sample unit testing for sample templates and implementations
 */
describe('mgcStepper', function () {

  // declare these up here to be global to all tests
  var $rootScope, $compile, scope;

  beforeEach(module('mgc.directives'));
  beforeEach(module('mgc.filters'));

  // inject in angular constructs. Injector knows about leading/trailing underscores and does the right thing
  // otherwise, you would need to inject these into each test
  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
		scope = $rootScope.$new(); 
  }));

  // reset the ui.config after each test
  afterEach(function () {
    angular.module('mgc.config').value('mgc.config', {});
  });

  // optional grouping of tests
  describe('mgcStepper directive', function () {
    var element;
    it('should create an element if using element-style', function () {
      element = $compile('<mgc-Stepper ng-model="a"></mgc-Stepper>')($rootScope);
      expect(element).toBeDefined();
    });
	});

});
