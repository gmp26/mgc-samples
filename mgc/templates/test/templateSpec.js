/*
 * sample unit testing for sample templates and implementations
 */
describe('mgcTemplate', function () {

  // declare these up here to be global to all tests
  var $rootScope, $compile;

  beforeEach(module('mgc.directives'));
  beforeEach(module('mgc.filters'));

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
  describe('filter', function () {

    // we're doing filter tests so globally define here for this subset of tests
    var $filter;
    beforeEach(inject(function (_$filter_) {
      $filter = _$filter_;
    }));

    // very simple boilerplate setup of test for a custom filter
    var tmpl;
    beforeEach(function () {
      tmpl = $filter('filterTmpl');
    });

    it('should exist when provided', function () {
      expect(tmpl).toBeDefined();
    });

    it('should return exactly what interesting thing the filter is doing to input', function () {
      expect(tmpl('text')).toEqual('text');
    });

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
