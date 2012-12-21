describe('customSpec', function() {

    beforeEach(module('mgc.locals'));

    var config;

    beforeEach(function() {

        inject(function($injector) {
        	config = $injector.get('mgc.locals');
        });
    });

    it('should have defined the path to "modules.js"', function() {
			expect(config.path).toMatch(/locals/);
    });
});