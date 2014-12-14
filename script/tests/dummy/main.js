/**
 * `dummy` TestSuite
 */

(function (define) {
    "use strict";
    
    define(
        ['tests/testsuite',
         'tests/dummy/dummyOne',
         'tests/dummy/dummyTwo'],
        function (TestSuite, dummyOne, dummyTwo) {
            
            // Create new TestSuite
            var testSuite = new TestSuite();
            // Expose child TestSuites or Tests
            testSuite.addChild('dummyOne', dummyOne)
                .addChild('dummyTwo', dummyTwo);
            
            // Return TestSuite
            return testSuite;
        }
    );

})(define);