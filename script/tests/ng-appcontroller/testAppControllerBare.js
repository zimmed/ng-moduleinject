/**
 * `testAppController` TestModule
 */

(function (define) {
    "use strict";
    
    define(
        ['tests/testmodule',
        'ng-appcontroller'],
        function (TestModule, AppController) {
            
            // Create new TestModue
            var _self = new TestModule("tests.ng-appcontroller.testAppControllerBare");
            
            // Define setUp
            _self.setUp = function () {
            };
            
            // Define tearDown
            _self.tearDown = function () {
            };
            
            // Tests
            _self.addTest(_self,
                         "testAppControllerCreate",
                         "Verify AppController object instantiation",
                         function (assert, _self) {
                var apps = null;
                assert.does.not.throwAnyError(function () {
                    apps = new AppController();
                });
                assert.does.exist(apps);
                assert.is.not.empty(apps);
                assert.is.typeOf(apps, 'object');
                assert.is.instanceOf(apps, AppController);
                
                apps = null;
                assert.does.not.throwAnyError(function () {
                    apps = new AppController([]);
                });
                assert.does.exist(apps);
                assert.is.not.empty(apps);
                assert.is.typeOf(apps, 'object');
                assert.is.instanceOf(apps, AppController);
                
                apps = null;
                assert.does.not.throwAnyError(function () {
                    apps = new AppController(
                        [
                            {
                                name : "myModule",
                                data : ["Spam", "And", "Eggs", "All", "Day"],
                                route : "/",
                                controllers : [
                                    '<div ng-controller="MyModuleCtrl" ng-model="data">' +
                                    '   <p ng-repeat="item in data">{{item}}</p>' +
                                    '</div>'
                                    ]
                            }
                        ]
                    );
                });
                assert.does.exist(apps);
                assert.is.not.empty(apps);
                assert.is.typeOf(apps, 'object');
                assert.is.instanceOf(apps, AppController);

                assert.expect(15);
            });
            
            _self.addTest(_self,
                         "testAppControllerValid",
                         "Verify AppController object instantiates with valid data",
                         function (assert, _self) {
                var apps = new AppController(
                    [
                        {
                            name : "myModule",
                            data : ["Spam", "And", "Eggs", "All", "Day"],
                            route : "/",
                            controllers : [
                                '<div ng-controller="MyModuleCtrl" ng-model="data">' +
                                '   <p ng-repeat="item in data">{{item}}</p>' +
                                '</div>'
                                ]
                        }
                    ]
                );
                assert.does.haveProperty(apps, "myModule");
                
                assert.expect(1);
            });
            
            _self.addTest(_self,
                         "testAppControllerInvalid",
                         "Verify AppController object doesn't create with invalid data",
                         function (assert, _self) {
                var apps = null;
                assert.does.throwAnyError(function () {
                    apps = new AppController("a module");
                });
                assert.is.empty(apps);
                assert.is.not.instanceOf(apps, AppController);
                assert.does.throwAnyError(function () {
                    apps = new AppController({"mod1" : "a module"});
                });
                assert.is.empty(apps);
                assert.is.not.instanceOf(apps, AppController);
                
                assert.expect(6);
            });
            
            // Return module
            return _self;
        }
    );
    
})(define);