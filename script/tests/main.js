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
            testSuite.addChild('ng_moduleinject', ng_moduleinject)
                .addChild('dummy', dummy);
            
            // Return TestSuite
            return testSuite;
        }
    );

})(define);