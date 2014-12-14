/**
 * `tests` TestSuite
 */

(function (define) {
    "use strict";

    define(
        ['tests/testsuite',
         'tests/ng-appcontroller/main',
         'tests/dummy/main'],
        function (TestSuite, ng_appcontroller, dummy) {
            
            // Create new TestSuite
            var testSuite = new TestSuite();
            
            // Expose child TestSuites or Tests
            testSuite.addChild('ng_appcontroller', ng_appcontroller);
            
            // Return TestSuite
            return testSuite;
        }
    );

})(define);