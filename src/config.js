(function() {
  // This is ultimately fed to require.config().
  var Config = {
    'paths': {
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

  // if 'define' exists as a function, AMD.
  if (typeof define === 'function') {
    require.config(Config);
    require([
      'main'
    ], function(Main) {
      Main.main();
    });
    return true;
  }
  // if module exists as an object, node CommonJS.
  if (typeof module === 'object') {
    module.exports = Config;
  }
  // if exports exists as an object, CommonJS.
  if (typeof exports === 'object') {
    exports.RJSConfig = Config;
  }

  return Config;
})();
