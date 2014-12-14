(function (define) {

    /* AppController Class */
    define(
        [],
        function () {
            return function AppController (modules) {
                
                var mod;
                
                if (modules && !Array.isArray(modules)) {
                    throw "Invalid argument `modules` passed to AppController Constructor. " +
                        "(Expected array, received " + modules.constructor.name + ").";
                }
                for (mod in modules) {
                    this[modules[mod].name] = modules[mod];
                }
                
                /**
                 * Override toString for better output
                 */
                this.toString = function () {
                    return "[AppController Object]";
                };
            };
        }
    );

})(define)