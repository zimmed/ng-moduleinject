/**
 * `tests` TestSuite
 */

(function (define) {
    "use strict";

    define(
        ['tests/testsuite',
         'tests/ng-moduleinject/main'],
        function (TestSuite, ng_moduleinject) {
            
            // Create new TestSuite
            var testSuite = new TestSuite();
            // Expose child TestSuites or Tests
            testSuite._ng_moduleinject = ng_moduleinject;
            // Define run method
            testSuite.run = function () {
                testSuite._ng_moduleinject.run();
            };
            // Return TestSuite
            return testSuite;
        }
    );

})(define);