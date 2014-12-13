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
                looselyEqualTo : function (a, b, msg) {
                    msg = this._parseMessage("Loosely, but not strictly equal. {1} == {2} && {1} !== {2}.",
                                             msg, a, b);
                    return this._test((a == b) && (a !== b), msg);
                },
                
                /* Verifies that a is loosely equivalent to b */
                equalTo : function (a, b, msg) {
                    msg = this._parseMessage("Loosely equal to each other. {1} == {2}.",
                                             msg, a, b);
                    return this._test(a == b, msg);
                },
                
                /* Verifies that a is strictly equivalent to b */
                strictlyEqualTo : function (a, b, msg) {
                    msg = this._parseMessage("Strictly equal to each other. {1} === {2}.",
                                             msg, a, b);
                    return this._test(a === b, msg);
                },
                
                /* Verifies that both are of the same class */
                sameClassAs : function (a, b, msg) {
                    msg = this._parseMessage("Have same constructing class. {1} === {2}.",
                                             msg, a.constructor.name, b.constructor.name);
                    return this._test(a.constructor === b.constructor, msg);
                },
                
                /* Verifies that a is an instance of class/class name b */
                instanceOf : function (a, b, msg) {
                    if (typeof b === "string") {
                        return this.instanceOfName(a, b, msg);
                    }
                    return this.instanceOfClass(a, b, msg);
                },
                
                /* Verifies that a is an instance of class b */
                instanceOfClass : function (a, b, msg) {
                    msg = this._parseMessage("Instance of {2}.", msg, a, b.name);
                    return this._test(a.constructor === b, msg);
                },
                
                /* Verifies that a's constructing class name is b */
                instanceOfName : function (a, b, msg) {
                    msg = this._parseMessage("Instance Of {2}.", msg, a, b);
                    return this._test(a.constructor.name === b, msg);
                },
                
                /* Verifies that both are same type */
                sameTypeAs : function (a, b, msg) {
                    msg = this._parseMessage("Have same type. typeof {1} === typeof {2}.",
                                             msg, a, b);
                    return this._test(typeof a === typeof b, msg);
                },
                
                /* Verifies that a is of type b */
                typeOf : function (a, b, msg) {
                    msg = this._parseMessage("Is of type {2}.", msg, a, b);
                    return this._test(typeof a === b, msg);
                },
                
                /* Verifies that a contains element b */
                containItem : function (a, b, msg) {
                    msg = this._parseMessage("{1} contains element {2}.", msg, a, b);
                    return this._test(a.indexOf(b) !== -1, msg);
                },
                
                /* Verifies that a contains element b */
                containProperty : function (a, b, msg) {
                    msg = this._parseMessage("{1} has property {2}.", msg, a, b);
                    return this._test(a.hasOwnProperty(b), msg);
                },
                
                /* Verifies that operation throws an error */
                throwError : function (a, b, msg) {
                    msg = this._parseMessage("Operation throws error ({2}) when called.", msg, a, b);
                    if (typeof a !== "function") {
                        throw "Invalid argument passed to Assert.throwError: " + a;
                    }
                    try {
                        a();
                    } catch (e) {
                        if (!b || e === b) {
                            return this._test(true, msg);
                        }
                    }
                    return this._test(false, msg);
                },
                
                /* Verifies that operation throws any error */
                throwAnyError : function (a, msg) {
                    msg = this._parseMessage("Operation throws any error when called.", msg);
                    if (typeof a !== "function") {
                        throw "Invalid argument passed to Assert.throwAnyError: " + a;
                    }
                    try {
                        a();
                    } catch (e) {
                        return this._test(true, msg);
                    }
                    return this._test(false, msg);
                },
                
                /* Verifies that object exists */
                exist : function (a, msg) {
                    msg = this._parseMessage("{1} has been declared and defined.", msg, a);
                    var expr;
                    try {
                        expr = (typeof a !== 'undefined');
                    } catch (e) {
                        expr = false;
                    }
                    return this._test(expr, msg);
                },
                
                /* Verifies that object exists, but is empty */
                empty : function (a, msg) {
                    var expr, prop;
                    msg = this._parseMessage("{1} is empty.", msg, a);
                    if (typeof a === "string" || typeof a === "array") {
                        expr = (a.length === 0);
                    } else if (typeof a === "object") {
                        for (prop in a) {
                            if (a.hasOwnProperty(prop)) {
                                expr = false;
                                break;
                            }
                    } else {
                        expr = (a === null);
                    }
                    return this._test(expr, msg);
                }
                
                
            };
        }
    );
    
})(define);