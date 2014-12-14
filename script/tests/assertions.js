/**
 * Extra assertion methods for testing framework
 */

(function (define) {
    "use strict";
    
    define(
        function () {
            return {
                
                _not : false,
                
                /**
                 * Message template parser
                 *  Formats argument values into arg numbers {1}, {2}, {n}, etc.
                 *  within string.
                 *  @param def_msg (str) - Default string to use if !msg
                 *  @param def_not_msg (str) - Default string to use if !msg and not flag set
                 *  @param msg (str) - Templated string
                 *  @params ... (mixed) - Arguments 1..n to replace {n} in templated string.
                 *  @returns (str) - Formatted string
                 */
                _parseMessage : function (def_msg, def_not_msg, msg /** arg1, arg2, ... **/) {
                    var i, re;
                    if (this._not) {
                        def_msg = def_not_msg;
                    }
                    if (!msg) {
                        msg = def_msg;
                    }
                    for (i = 1; i < arguments.length - 2; i += 1) {
                        re = new RegExp("\\{" + i + "\\}", 'g');
                        msg = msg.replace(re, arguments[i + 2]);
                        re = new RegExp("\\{v" + i + "\\}", 'g');
                        msg = msg.replace(re, JSON.stringify(arguments[i + 2]));
                    }
                    return msg;
                },
                
                /**
                 * Compares two items, if string, compare without regard to case.
                 */
                _looseComp : function (a, b) {
                    if (typeof a === 'string' && typeof b === 'string') {
                        return (a.toLowerCase() === b.toLowerCase());
                    }
                    return (a == b || JSON.stringify(a) === JSON.stringify(b));
                },
                
                /**
                 * Compares two items strictly
                 */
                _strictComp : function (a, b) {
                    return (JSON.stringify(a) === JSON.stringify(b));
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
                    if (this._not) {
                        expr = !expr;
                    }
                    return this.ok(expr, msg);
                },
                
                /* Verifies that a is loosely equivalent to b */
                equalTo : function (actual, expected, msg) {
                    msg = this._parseMessage("{1} is loosely equal to {2}",
                                             "{1} is not loosely equal to {2}.",
                                             msg, actual, expected);
                    return this._test(this._looseComp(actual, expected), msg);
                },
                
                /* Verifies that a is strictly equivalent to b */
                strictlyEqualTo : function (actual, expected, msg) {
                    msg = this._parseMessage("{1} is strictly equal to {2}.",
                                             "{1} is not strictly equal to {2}.",
                                             msg, actual, expected);
                    return this._test(this._strictComp(actual, expected), msg);
                },
                
                /* Verifies that both are of the same class */
                sameClassAs : function (actual, expected, msg) {
                    msg = this._parseMessage("Both have same constructing class ({3} === {4}).",
                                             "Both have different constructing classes ({3} !== {4}).",
                                             msg, actual, expected, actual.constructor.name,
                                             expected.constructor.name);
                    return this._test(actual.constructor === expected.constructor, msg);
                },
                    
                /* Verifies that both are references to the same instance */
                sameInstanceAs : function (actual, expected, msg) {
                    msg = this._parseMessage("{1} and {2} are references to the same instance ({v1}).",
                                             "{1} and {2} do not reference the same instance.",
                                             msg, actual, expected);
                    if (typeof actual !== 'object' || typeof expected !== 'object') {
                        throw "Arguments passed to Assert.sameInstanceAs must be objects.";
                    }
                    return this._test(actual === expected, msg);
                },
                
                /* Verifies that a is an instance of class/class name b */
                instanceOf : function (testObject, classRef, msg) {
                    // Uses instanceOfClass or instanceOfName, no need to parse msg
                    if (typeof classRef === "string") {
                        return this.instanceOfName(testObject, classRef, msg);
                    }
                    return this.instanceOfClass(testObject, classRef, msg);
                },
                
                /* Verifies that a is an instance of class b */
                instanceOfClass : function (testObject, classConstructor, msg) {
                    msg = this._parseMessage("{1} is instance of {3}.",
                                             "{1} is not instance of {3}.",
                                             msg, testObject, classConstructor, classConstructor.name);
                    return this._test(testObject.constructor === classConstructor, msg);
                },
                
                /* Verifies that a's constructing class name is b */
                instanceOfName : function (testObject, className, msg) {
                    msg = this._parseMessage("{1} is instance of {2}.",
                                             "{1} is not instance of {2}.",
                                             msg, testObject, className);
                    return this._test(testObject.constructor.name === className, msg);
                },
                
                /* Verifies that both are same type */
                sameTypeAs : function (actual, expected, msg) {
                    msg = this._parseMessage("{1} is the same type as {2}.",
                                             "{1} is not the same type as {2}.",
                                             msg, actual, expected);
                    return this._test(typeof actual === typeof expected, msg);
                },
                
                /* Verifies that a is of type b */
                typeOf : function (testObject, typeName, msg) {
                    msg = this._parseMessage("{1} is of type '{2}'.",
                                             "{1} is not of type '{2}' ({3}).",
                                             msg, testObject, typeName, typeof testObject);
                    return this._test(typeof testObject === typeName, msg);
                },
                
                /* Verifies that a contains element b */
                containItem : function (testObject, itemValue, msg) {
                    var prop, expr = false;
                    msg = this._parseMessage("{1} contains {2} as an element.",
                                             "{1} does not contain {2} as an element.",
                                             msg, testObject, itemValue);
                    if (Array.isArray(testObject)) {
                        expr = (testObject.indexOf(itemValue) !== -1);
                    }
                    if (!expr && typeof testObject === 'object') {
                        expr = false;
                        for (prop in testObject) {
                            if (testObject.hasOwnProperty(prop) &&
                                    this._strictComp(testObject[prop], itemValue)) {
                                expr = true;
                                break;
                            }
                        }
                    } else if (typeof testObject !== 'object') {
                        throw "Invalid testObject passed to Assert.containItem: " + testObject;
                    }
                    return this._test(expr, msg);
                },
                
                /* Verifies that a contains element b */
                containProperty : function (testObject, propertyName, msg) {
                    msg = this._parseMessage("{1} has {2} property.",
                                             "{1} has no {2} property.",
                                             msg, testObject, propertyName);
                    if (Array.isArray(testObject) || typeof testObject !== 'object') {
                        throw "Invalid testObject passed to Assert.containProperty: " + testObject;
                    }
                    return this._test(testObject.hasOwnProperty(propertyName), msg);
                },
                
                /* Verifies that operation throws an error */
                throwError : function (operation, error, msg) {
                    msg = this._parseMessage("Operation throws error ({v2}) when called.",
                                             "Operation does not throw error ({v2}) when called.",
                                             msg, operation, error);
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
                    msg = this._parseMessage("Operation throws some error when called.",
                                             "Operation does not throw any error when called.",
                                             msg, operation);
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
                    msg = this._parseMessage("{1} has been defined and declared.",
                                             "{1} has not been declared or has not been defined.",
                                             msg, testObject);
                    var expr;
                    try {
                        expr = (typeof testObject !== 'undefined');
                    } catch (e) {
                        expr = false;
                    }
                    return this._test(expr, msg);
                },
                
                /* Verifies that object exists, but is empty */
                empty : function (testObject, msg) {
                    var expr, prop;
                    msg = this._parseMessage("{1} is empty.",
                                             "{1} is not empty.",
                                             msg, testObject);
                    if (typeof testObject === "string" || Array.isArray(testObject)) {
                        expr = (testObject.length === 0);
                    } else if (typeof testObject === "object") {
                        for (prop in testObject) {
                            if (testObject.hasOwnProperty(prop)) {
                                expr = false;
                                break;
                            }
                        }
                    } else {
                        expr = (testObject === null);
                    }
                    return this._test(expr, msg);
                }
                
                
            };
        }
    );
    
})(define);