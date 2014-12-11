/**
 * TestSuite Class
 *  Defined module returns TestSuite pseudo-class.
 */

(function (define) {
    "use strict";
    
    define(
        null,
        function () {
            /**
             * TestSuite - pseudo-class that contains basic functionality
             *  for test suite.
             */
            var TestSuite = function () {
                
                /* Alias for this.run */
                this.runAll = this.run;
                
                /**
                 * Run test from only specified test module
                 *  @param mod (str) - the module to test
                 *  @opt-param dont_init (bool) - if set, function will
                 *      skip call to this.init.
                 */
                this.runModule = function (mod, dont_init) {
                    var scope;
                    if (!mod) {
                        this.run();
                    } else {
                        if (!typeof(mod) !== "string") {
                            throw ("Invalid argument passed to `runModule`: " +
                                   JSON.stringify(mod));
                        }
                        scope = mod.split('.');
                        this['_' + scope[0]].run(scope.slice(1));
                    }
                    if (!dont_init && this.init) {
                        this.init();
                    }
                },
                
                /**
                 * Run tests from all modules in list
                 *  @param modules (mixed) - array of individule test modules
                 *                         - string of modules separated by ','
                 */
                this.runModules = function (modules) {
                    var i;
                    if (typeof(modules) === "string") {
                        modules = modules.split(',');
                    }
                    if (!Array.isArray(modules)) {
                        throw ("Invalid argument passed to `runModules`: " +
                            JSON.stringify(modules));
                    }
                    for (i = 0; i < modules.length; i += 1) {
                        this.runModule(modules[i], true);
                    }
                    if (this.init) {
                        this.init();
                    }
                },
                
                /**
                 * Run all tests in current suite
                 *
                 * Note: This should be overridden for each instance
                 *  of TestSuite.
                 */
                this.run = function () {
                    throw "run method never defined for TestSuite!";
                }
                
            };
            
            return TestSuite;
        }
    );

})(define);