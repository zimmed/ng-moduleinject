/**
 * Top level test library
 */

(function (window, require) {
    "use strict";

    require.config({
        paths: {
            'QUnit': 'lib/qunit-1.16.0',
            'jQuery': 'lib/jquery-2.1.1'
        },
        shim: {
            'QUnit': {
                exports: 'QUnit',
                init: function () {
                    QUnit.config.autoload = false;
                    QUnit.config.autostart = false;
                }
            },
            'jQuery': {
                exports: 'jQuery'
            }
        }
    });
    
    require(
        ['jQuery', 'QUnit', 'tests/assertions'],
        function ($, QUnit, assertions) {
            var prop;
            /* Add custom assertion methods from tests/assertions.js */
            for (prop in assertions) {
                QUnit.Assert[prop] = assertions[prop];
            }
            /* Extend Assert with english chains */
            QUnit.Assert.is = QUnit.Assert;
            QUnit.Assert.does = QUnit.Assert;
            QUnit.Assert.not = $.extend(true, {}, QUnit.Assert);
            QUnit.Assert.not._flags.not = true;
        }
    );

    // require the unit tests.
    require(
        ['QUnit', 'tests/testsuite', 'tests/main'],
        function (QUnit, TestSuite, tests) {

            // Create new TestSuite
            var testSuite = new TestSuite();
            // Expose child TestSuites
            testSuite._tests = tests;
            // Define init function (special for top-level testmain.js)
            testSuite.init = function () {
                // Run QUnit
                QUnit.load();
                QUnit.start();
            };
            // Define run method
            testSuite.run = function () {
                this._tests.run();
                this.init();
            };
            
            // Unlike child-levels, this level will not return
            //  the TestSuite. Instead, it is exposed to the
            //  window as window.testSuite and trigger loaded
            //  event.

            window.TestSuite = testSuite;
            window.TestSuite.runAll();
        }
    );

})(window, require);