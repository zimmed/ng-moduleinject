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
                
                /* Holds all child suites/modules */
                this.children : {},
                    
                /**
                 * Add children and return this for cascading operations
                 *  @param name (str) - The name of the child module/suite
                 *  @param child (mixed) - The TestSuite or TestModule to add
                 *  @return this
                 */
                this.addChild : function (name, child) {
                    this.children[name] = child;
                    return this;
                }
                
                /**
                 * Run all tests in current suite
                 */
                this.run = function () {
                    var child_name;
                    for (child_name in this.children) {
                        this.children[child_name].run();
                    }
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
                        this.children[scope[0]].run(scope.slice(1));
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
                    for (i in tests) {
                        this.runTest(i, true);
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