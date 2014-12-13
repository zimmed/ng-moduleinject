/**
 * Extra assertion methods for testing framework
 */

(function (define) {
    "use strict";
    
    define(
        function () {
            return {
                
                _flags : {},
                
                /**
                 * Message template parser
                 *  Formats argument values into arg numbers {1}, {2}, {n}, etc.
                 *  within string.
                 *  @param def_msg (str) - Default string to use if !msg
                 *  @param msg (str) - Templated string
                 *  @params ... (mixed) - Arguments
                 *  @returns (str) - Formatted string
                 */
                _parseMessage : function (def_msg, msg /** arg1, arg2, ... **/) {
                    var i;
                    if (this._flags.not) {
                        def_msg = "(NOT) " + def_msg;
                    }
                    if (!msg) {
                        msg = def_msg;
                    }
                    for (i = 1; i < arguments.length; i += 1) {
                        msg = msg.replace("{" + i + "}", arguments[i]);
                    }
                    return msg;
                },
                
                /**
                 * Tests boolean expression and asserts value with given message
                 *  or default message, if no custom one exists.
                 *  @param expr (bool) - The expression to test
                 *  @param msg (str) - The custom message
                 *  @param def_msg (str) - The default test message
                 *  @return QUnit assertion
                 */
                _test : function (expr, msg) {
                    if (this._flags.not) {
                        expr = !expr;
                    }
                    return this.ok(expr, msg);
                },
                
                /**
                 * Verifies that a is loosely equivalent to b,
                 *  but not strictly equivalent.
                 */
                looselyEqualTo : function (actual, expected, msg) {
                    msg = this._parseMessage("Loosely, but not strictly equal. {1} == {2} && {1} !== {2}.",
                                             msg, actual, expected);
                    return this._test((actual == expected) && (actual !== expected), msg);
                },
                
                /* Verifies that a is loosely equivalent to b */
                equalTo : function (actual, expected, msg) {
                    msg = this._parseMessage("Loosely equal to each other. {1} == {2}.",
                                             msg, actual, expected);
                    return this._test(actual == expected, msg);
                },
                
                /* Verifies that a is strictly equivalent to b */
                strictlyEqualTo : function (actual, expected, msg) {
                    msg = this._parseMessage("Strictly equal to each other. {1} === {2}.",
                                             msg, actual, expected);
                    return this._test(actual === expected, msg);
                },
                
                /* Verifies that both are of the same class */
                sameClassAs : function (actual, expected, msg) {
                    msg = this._parseMessage("Have same constructing class. {1} === {2}.",
                                             msg, actual.constructor.name,
                                             expected.constructor.name);
                    return this._test(actual.constructor === expected.constructor, msg);
                },
                
                /* Verifies that a is an instance of class/class name b */
                instanceOf : function (testObject, classRef, msg) {
                    if (typeof classRef === "string") {
                        return this.instanceOfName(testObject, classRef, msg);
                    }
                    return this.instanceOfClass(testObject, classRef, msg);
                },
                
                /* Verifies that a is an instance of class b */
                instanceOfClass : function (testObject, classConstructor, msg) {
                    msg = this._parseMessage("Instance of {2}.", msg, testObject,
                                             classConstructor.name);
                    return this._test(testObject.constructor === classConstructor, msg);
                },
                
                /* Verifies that a's constructing class name is b */
                instanceOfName : function (testObject, className, msg) {
                    msg = this._parseMessage("Instance Of {2}.", msg, testObject, className);
                    return this._test(testObject.constructor.name === className, msg);
                },
                
                /* Verifies that both are same type */
                sameTypeAs : function (actual, expected, msg) {
                    msg = this._parseMessage("Have same type. typeof {1} === typeof {2}.",
                                             msg, actual, expected);
                    return this._test(typeof actual === typeof expected, msg);
                },
                
                /* Verifies that a is of type b */
                typeOf : function (testObject, typeName, msg) {
                    msg = this._parseMessage("Is of type {2}.", msg, testObject, typeName);
                    return this._test(typeof testObject === typeName, msg);
                },
                
                /* Verifies that a contains element b */
                containItem : function (testObject, itemValue, msg) {
                    var prop, expr;
                    msg = this._parseMessage("{1} contains element {2}.", msg, testObject, itemValue);
                    if (Array.isArray(testObject)) {
                        expr = (testObject.indexOf(itemValue) !== -1);
                    } else if (typeof testObject === 'object') {
                        expr = false;
                        for (prop in testObject) {
                            if (testObject.hasOwnProperty(prop) && testObject[prop] === itemValue) {
                                expr = true;
                                break;
                            }
                        }
                    } else {
                        throw "Invalid testObject passed to Assert.containItem: " + testObject;
                    }
                    return this._test(expr, msg);
                },
                
                /* Verifies that a contains element b */
                containProperty : function (testObject, propertyName, msg) {
                    msg = this._parseMessage("{1} has property {2}.", msg, testObject, propertyName);
                    if (typeof testObject !== 'object') {
                        throw "Invalid testObject passed to Assert.containProperty: " + testObject;
                    }
                    return this._test(testObject.hasOwnProperty(propertyName), msg);
                },
                
                /* Verifies that operation throws an error */
                throwError : function (operation, error, msg) {
                    msg = this._parseMessage("Operation throws error ({2}) when called.",
                                             msg, actual, error);
                    if (typeof operation !== "function") {
                        throw "Invalid argument passed to Assert.throwError: " + operation;
                    }
                    try {
                        operation();
                    } catch (e) {
                        if (!error || e === error) {
                            return this._test(true, msg);
                        }
                    }
                    return this._test(false, msg);
                },
                
                /* Verifies that operation throws any error */
                throwAnyError : function (operation, msg) {
                    msg = this._parseMessage("Operation throws any error when called.", msg);
                    if (typeof operation !== "function") {
                        throw "Invalid argument passed to Assert.throwAnyError: " + operation;
                    }
                    try {
                        operation();
                    } catch (e) {
                        return this._test(true, msg);
                    }
                    return this._test(false, msg);
                },
                
                /* Verifies that object exists */
                exist : function (testObject, msg) {
                    msg = this._parseMessage("{1} has been declared and defined.", msg, testObject);
                    var expr;
                    try {
                        expr = (typeof testObject !== 'undefined');
                    } catch (e) {
                        expr = false;
                    }
                    return this._test(expr, msg);
                }
                
                
            };
        }
    );
    
})(define);