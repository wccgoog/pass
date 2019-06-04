define(function () {
    'use strict';
    var test2 = (msg) => {
        $("#main").append("<p>" + msg + "</p>")
    }
    return {
        test2: test2
    }
});