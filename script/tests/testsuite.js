/**
 * TestSuite Class
 *  Defined module returns TestSuite pseudo-class.
 */

(function (define) {
    "use strict";
    
    define(
        function () {
            /**
             * TestSuite - pseudo-class that contains basic functionality
             *  for test suite.
             */
            var TestSuite = function () {
                
                /**
                 * Run all tests in current suite
                 *
                 * Note: This should be overridden for each instance
                 *  of TestSuite.
                 */
                this.run = function () {
                    throw "run method never defined for TestSuite!";
                };
                
                /* Alias for this.run */
                this.runAll = function () { return this.run(); };
                
                /**
                 * Run test from only specified test module or individual test
                 *  @param test (str) - the test/module to run
                 *  @opt-param dont_init (bool) - if set, function will
                 *      skip call to this.init.
                 */
                this.runTest = function (test, dont_init) {
                    var scope;
                    if (!test) {
                        this.run();
                    } else {
                        if (typeof (test) !== "string") {
                            throw ("Invalid argument passed to `runTest`: " +
                                   JSON.stringify(test));
                        }
                        scope = test.split('.');
                        this['_' + scope[0]].run(scope.slice(1));
                    }
                    if (!dont_init && this.init) {
                        this.init();
                    }
                };
                
                /**
                 * Run tests from all modules in list
                 *  @param tests (mixed) - array of individule tests/modules
                 *                       - string of tests/modules separated by ','
                 */
                this.runTests = function (tests) {
                    var i;
                    if (typeof (tests) === "string") {
                        tests = tests.split(',');
                    }
                    if (!Array.isArray(tests)) {
                        throw ("Invalid argument passed to `runTests`: " +
                            JSON.stringify(tests));
                    }
                    for (i = 0; i < tests.length; i += 1) {
                        this.runTest(tests[i], true);
                    }
                    if (this.init) {
                        this.init();
                    }
                };
                
            };
            
            return TestSuite;
        }
    );

})(define);