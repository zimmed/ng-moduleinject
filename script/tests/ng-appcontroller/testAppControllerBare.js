/**
 * `testAppController` TestModule
 */

(function (define) {
    "use strict";
    
    define(
        ['tests/testmodule',
        'ng-appcontroller'],
        function (TestModule, AppController) {
            
            // Create new TestModue
            var _self = new TestModule("tests.ng-appcontroller.testAppControllerBare");
            
            // Define setUp
            _self.setUp = function () {
            };
            
            // Define tearDown
            _self.tearDown = function () {
            };
            
            // Tests
            _self.addTest(_self,
                         "testAppControllerCreate",
                         "Verify AppController object instantiation",
                         function (assert, _self) {
                assert.ok(true, "No assertions written yet.");
            });
            _self.addTest(_self,
                         "testAppControllerValid",
                         "Verify AppController object instantiates with valid data",
                         function (assert, _self) {
                assert.ok(true, "No assertions written yet.");
            });
            _self.addTest(_self,
                         "testAppControllerInvalid",
                         "Verify AppController object doesn't create with invalid data",
                         function (assert, _self) {
                assert.ok(true, "No assertions written yet.");
            });
            
            // Return module
            return _self;
        }
    );
    
})(define);