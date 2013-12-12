(function() {
  // This is ultimately fed to require.config().
  var Config = {
    'paths': {
      'main': 'main',

      // src
      'add-one': 'app/add-one'
    }
  };

  // If _TEST_MODE, configre to '../' since our tests are stored in './test/'.
  if (typeof _TEST_MODE !== 'undefined' && _TEST_MODE === true) {
    Config.baseUrl = '../src/';
    require.config(Config);
    return true;
  }

  // If 'define' exists as a function, run main.
  if (typeof define === 'function') {
    require.config(Config);
    require([
      'main'
    ], function(Main) {
      Main.main();
    });
    return true;
  }
  // If exports exists as an object, CommonJS.
  if (typeof module === 'object') {
    module.exports = Config;
  }
  // If module exists as an object, use CommonJS-like module exports for node.
  if (typeof exports === 'object') {
    exports.RJSConfig = Config;
  }

  return Config;
})();
