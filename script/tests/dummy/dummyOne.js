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
            dummyOne.addTest("verifyDummyData",
                             "Verify setUp data initialization",
                             function (assert) {
                    assert.expect(3);
                    assert.equal("string", typeof (this.dummy_data),
                                "Unexpected type of dummy_data.");
                    assert.equal("some data", this.dummy_data);
                    assert.notStrictEqual("some data", this.dummy_data);
                });
            
            // Return module
            return dummyOne;
        }
    );
    
})(define);