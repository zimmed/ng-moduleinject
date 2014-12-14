/**
 * `dummyTwo` TestModule
 */

(function (define) {
    "use strict";
    
    define(
        ['tests/testmodule'],
        function (TestModule) {
            
            // Create new TestModue
            var dummyTwo = new TestModule("tests.dummy.dummyTwo");
            
            // Define setUp
            dummyTwo.setUp = function () {
                this._DummyClass = function _DummyClass (name) {
                    if (!name) name = 'Unnamed';
                    this.name = name;
                    this.throwError = function (error) { throw error; };
                    this.List = function () {
                        var l = [], i = 0;
                        for (i; i < arguments.length; i++) {
                            l.push(arguments[i]);
                        }
                        return l;
                    };
                    this.toString = function () {
                        return "[Dummy `" + this.name + "`]";
                    }
                };
                this._dummy = new this._DummyClass();
            };
            
            // Define tearDown
            dummyTwo.tearDown = function () {
                this._dummy = undefined;
            };
            
            // Tests
            
            dummyTwo.addTest(dummyTwo,
                             "createDummyObject",
                             "Verify DummyClass object instantiation",
                             function (assert, self) {
                var dummy = self._dummy;

                assert.expect(15);

                assert.does.exist(dummy);
                assert.is.not.empty(dummy);
                assert.is.typeOf(dummy, "object");
                assert.is.instanceOf(dummy, '_DummyClass');
                assert.is.instanceOf(dummy, self._DummyClass);
                assert.does.containProperty(dummy, 'name');
                
                dummy.name = 'yoyo';
                
                assert.does.containItem(dummy, 'yoyo');
                assert.is.strictlyEqualTo(dummy.name, 'yoyo');
                assert.is.equalTo(dummy.name, 'yoyo');
                assert.is.equalTo(dummy.name, 'YoYo');

                assert.is.not.strictlyEqualTo(dummy.name, 'YoYo');
                assert.is.strictlyEqualTo(dummy, dummy);
                assert.is.sameClassAs(dummy, dummy);
                assert.does.not.containProperty(dummy, 'dummy');
                assert.does.not.containItem(dummy, 'dummy');
            });
            
            dummyTwo.addTest(dummyTwo,
                             "dummyClassThrowError",
                             "Verify error-catching assertion methods",
                             function (assert, self) {
                var dummy = self._dummy;
                
                assert.is.strictlyEqualTo(dummy.name, 'Unnamed');
                
                dummy.name = 'ErrorDummy';
                
                assert.does.throwError(function () {
                        dummy.throwError('MyError');
                    }, 'MyError');
                assert.does.not.throwError(function () {
                        dummy.throwError('DifferentError');
                    }, 'MyError');
                assert.does.throwAnyError(function () {
                        dummy.throwError();
                    });
                assert.does.not.throwAnyError(function () {
                        var five = 5;
                    });
            });
            
            dummyTwo.addTest(dummyTwo,
                             "dummyListOperations",
                             "Verify list-based assertions work.",
                             function (assert, self) {
                assert.expect(13);
                var dummy = self._dummy;
                assert.does.not.exist(list);
                var list = [], list2;
                assert.does.exist(list);
                assert.is.typeOf(list, "object");
                assert.is.instanceOf(list, "Array");
                assert.is.empty(list);
                list = dummy.List('one', 'five', 7, 'ten', 204, { prop: "wtf" });
                list2 = ['one', 'five', 7, 'ten', 204, { prop: "wtf" }];
                assert.is.not.empty(list);
                assert.is.equalTo(list, list2);
                assert.is.strictlyEqualTo(list, list2);
                assert.is.not.sameInstanceAs(list, list2);
                assert.does.containItem(list, 'five');
                assert.does.containItem(list, { prop: "wtf" });
                assert.does.not.containItem(list, "wtf");
                assert.does.throwAnyError(function () {
                    assert.does.containProperty(list, "prop");
                });
            });
            
            dummyTwo.addTest(dummyTwo,
                             "testInstanceAssertions",
                             "Verify instance-testing assertions work.",
                             function (assert, self) {
                var dummy = self._dummy,
                    dummy2 = self._dummy,
                    dummy3 = $.extend(true, {}, self._dummy);
                assert.expect(11);
                assert.is.equalTo(dummy, dummy2);
                assert.is.equalTo(dummy, dummy3);
                assert.is.strictlyEqualTo(dummy, dummy2);
                assert.is.strictlyEqualTo(dummy, dummy3);
                assert.is.sameTypeAs(dummy, dummy2);
                
                assert.is.sameTypeAs(dummy, dummy3);
                assert.is.sameClassAs(dummy, dummy2);
                assert.is.not.sameClassAs(dummy, dummy3);
                assert.is.sameInstanceAs(dummy, dummy);
                assert.is.sameInstanceAs(dummy, dummy2);
                
                assert.is.not.sameInstanceAs(dummy, dummy3);
            });
            
            // Return module
            return dummyTwo;
        }
    );
    
})(define);