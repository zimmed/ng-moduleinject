/**
 * TestModule CLass
 *  Defined module returns TestModule pseudo-class.
 */

(function (define) {
    "use strict";
    
    define(
        ['QUnit'],
        function (QUnit) {
            /**
             * TestModule - pseudo-class that contains basic functionality
             *  for test module.
             */
            var TestModule = function (name) {
                
                /* init module data */
                this.name = name;
                this.tests = [];
                
                /**
                 * Run only specified test
                 *  @param test (str) - the test/module to run
                 */
                this.runTest = function (test, dont_init) {
                    if (!test) {
                        this.runAll();
                    } else {
                        if (typeof (test) !== "string") {
                            throw ("Invalid argument passed to `runTest`: " +
                                   JSON.stringify(test));
                        }
                        if (!dont_init) {
                            QUnit.module(this.name);
                        }
                        if (this.setUp) {
                            this.setUp();
                        }
                        this.tests[test]();
                        if (this.tearDown) {
                            this.tearDown();
                        }
                    }
                };
                
                /**
                 * Run all tests in module
                 */
                this.run = function () {
                    var i;
                    QUnit.module(this.name);
                    for (i = 0; i < this.tests.length; i += 1) {
                        this.runTest(this.tests[i], true);
                    }
                };
                
                /* Alias for run */
                this.runAll = function () { return this.run(); };
                
                /**
                 * Add test to module
                 *  @param name (str) - The name (identifier format) of the test
                 *  @
                 */
                this.addTest = function (name, description, callback) {
                    var str = "[" + this.name + "." + name + "] " + description;
                    this.tests[name] = function () {
                        QUnit.test(str, callback);
                    };
                };
                
            };
            
            return TestModule;
        }
    );

})(define);