(function (define) {

    /* AppController Class */
    define(
        [],
        function () {
            return function AppController () {
                this.toString = function () {
                    return "[AppController Object]";
                };
            };
        }
    );

})(define)