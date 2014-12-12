/**
 * `dummyOne` TestModule
 */

(function (define) {
    "use strict";
    
    define(
        ['tests/testmodule'],
        function (TestModule) {
            
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
                    console.log(self);
                    assert.expect(2);
                    assert.equal(typeof (self.dummy_data), "string");
                    assert.notStrictEqual("some data", self.dummy_data);
                });
            
            // Return module
            return dummyOne;
        }
    );
    
})(define);