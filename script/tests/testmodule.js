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
                this.tests = {};
                
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
                        this.tests[test]();
                        
                    }
                };
                
                /**
                 * Run all tests in module
                 */
                this.run = function () {
                    var i;
                    QUnit.module(this.name);
                    for (i in this.tests) {
                        this.runTest(i, true);
                    }
                };
                
                /* Alias for run */
                this.runAll = function () { return this.run(); };
                
                /**
                 * Add test to module
                 *  @param mod (TestModule) - Reference to current test module
                 *  @param name (str) - The name (identifier format) of the test
                 *  @param description (str) - Description of test
                 *  @param callback (function (assert)) - Test procedure
                 */
                this.addTest = function (mod, name, description, callback) {
                    var str = "[" + name + "] " + description;
                    this.tests[name] = function () {
                        
                        QUnit.test(str, function (assert) {
                            if (mod.setUp) {
                                mod.setUp();
                            }
                            callback(assert, mod);
                            if (mod.tearDown) {
                                mod.tearDown();
                            }
                        });
                        
                    };
                };
                
            };
            
            return TestModule;
        }
    );

})(define);