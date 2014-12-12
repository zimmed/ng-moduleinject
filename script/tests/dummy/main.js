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
            testSuite._dummyOne = dummyOne;
            // Define run method
            testSuite.run = function () {
                this._dummyOne.run();
            };
            
            // Return TestSuite
            return testSuite;
        }
    );

})(define);