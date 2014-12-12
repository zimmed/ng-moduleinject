/**
 * `tests` TestSuite
 */

(function (define) {
    "use strict";

    define(
        ['tests/testsuite',
         'tests/ng-moduleinject/main',
         'tests/dummy/main'],
        function (TestSuite, ng_moduleinject, dummy) {
            
            // Create new TestSuite
            var testSuite = new TestSuite();
            // Expose child TestSuites or Tests
            testSuite._ng_moduleinject = ng_moduleinject;
            testSuite._dummy = dummy;
            // Define run method
            testSuite.run = function () {
                testSuite._ng_moduleinject.run();
                testSuite._dummy.run();
            };
            // Return TestSuite
            return testSuite;
        }
    );

})(define);