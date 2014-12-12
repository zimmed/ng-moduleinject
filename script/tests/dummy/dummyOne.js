/**
 * `dummyOne` TestModule
 */

(function (define) {
    "use strict";
    
    define(
        ['tests/testmodule',
        'tests/testsuite'],
        function (TestModule, MyObject) {
            
            // Create new TestModue
            var dummyOne = new TestModule("tests.dummy.dummyOne");
            
            // Define setUp
            dummyOne.setUp = function () {
                this.dummy_data = "Some data";
            };
            
            // Define tearDown
            dummyOne.tearDown = function () {
                this.dummy_data = undefined;
            };
            
            // Tests
            
            /**
             * verifyDummyData
             *  validates data set in this module's `setUp` method is correct.
             */
            dummyOne.addTest(dummyOne,
                             "verifyDummyData",
                             "Verify setUp data initialization",
                             function (assert, self) {
                    assert.expect(2);
                    assert.equal(typeof (self.dummy_data), "string");
                    assert.notStrictEqual("some data", self.dummy_data);
                });
            dummyOne.addTest(dummyOne,
                            "objectCreate",
                            "Verify object constructs correctly",
                            function (assert, self) {
                    var myObj = new MyObject();
                    assert.expect(1);
                    assert.notEqual(myObj, undefined);
            });
            
            // Return module
            return dummyOne;
        }
    );
    
})(define);