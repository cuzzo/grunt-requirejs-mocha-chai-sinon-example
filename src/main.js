'use strict';

// require the config file be loaded...
require(['config'], function() {

// and then execute the main section of the program
    require([
        'arithmetic', 
    ], function (Arithmetic) {
        console.log('starting app from main');
        alert("Should be 12:" + Arithmetic.answer);
    });

});