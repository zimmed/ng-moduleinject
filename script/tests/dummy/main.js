/**
 * `dummy` TestSuite
 */

(function (define) {
    "use strict";
    
    define(
        ['tests/testsuite',
         'tests/dummy/dummyOne'],
        function (TestSuite, dummyOne) {
            
            // Create new TestSuite
            var testSuite = new TestSuite();
            // Expose child TestSuites or Tests
            testSuite.addChild('dummyOne', dummyOne);
            
            // Return TestSuite
            return testSuite;
        }
    );

})(define);