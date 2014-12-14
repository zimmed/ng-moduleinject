/**
 * `ng-moduleinject` TestSuite
 */

(function (define) {
    "use strict";

    define(
        ['tests/testsuite',
         'tests/ng-appcontroller/testAppControllerBare'],
        function (TestSuite, testAppControllerBare) {
            
            // Create new TestSuite
            var testSuite = new TestSuite();
            
            // Expose child TestSuites or Tests
            testSuite.addChild('testAppControllerBare', testAppControllerBare);
            
            // Return TestSuite
            return testSuite;
        }
    );

})(define);