/**
 * Top level test library
 */

(function (window, require) {
    "use strict";

$().ready(function () {
    setTimeout(function () {
        require.config({
            paths: {
                'QUnit': 'lib/qunit-1.16.0',
                'jQuery': 'lib/jquery-2.1.1'
            },
            shim: {
                'QUnit': {
                    exports: 'QUnit',
                    init: function () {
                        QUnit.config.autostart = false;
                    }
                },
                'jQuery': {
                    exports: 'jQuery'
                }
            }
        });

        // require the unit tests.
        require(
            ['jQuery', 'QUnit', 'tests/testsuite', 'tests/main'],
            function ($, QUnit, TestSuite, tests) {

                // Create new TestSuite
                var testSuite = new TestSuite();
                // Expose child TestSuites
                testSuite._tests = tests;
                // Define run method
                testSuite.run = function () {
                    this._tests.run();
                };
                // Define init function (special for top-level testmain.js)
                testSuite.init = function () {
                    // Run QUnit
                    //QUnit.reset();
                    //QUnit.start();
                };

                // Unlike child-levels, this level will not return
                //  the TestSuite. Instead, it is exposed to the
                //  window as window.testSuite and trigger loaded
                //  event.

                window.TestSuite = testSuite;
                QUnit.start();
                $('div#qunitLoaded').trigger("click");
            }
        );
  }, 1000);
});
})(window, require);