/**
 * `dummy` TestSuite
 */

(function (define) {
    "use strict";
    
    define(
        ['tests/testsuite'],
        function (TestSuite) {
            
            // Create new TestSuite
            var testSuite = new TestSuite();
            // Expose child TestSuites or Tests
            
            // Define run method
            testSuite.run = function () {
                // No tests yet
            };
            // Return TestSuite
            return testSuite;
        }
    );

})(define);