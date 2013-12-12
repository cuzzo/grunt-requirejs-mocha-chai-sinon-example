(function() {
  // This is ultimately fed to require.config().
  var Config = {
    'paths': {
      'config': 'config',

      // src
      'add-one': 'src/add-one'
    }
  };

  // If _TEST_MODE, configre to '../' since our tests are stored in './test/'.
  if (typeof _TEST_MODE !== 'undefined' && _TEST_MODE === true) {
    Config.baseUrl = '../';
    require.config(Config);
    return true;
  }

  // if 'define' exists as a function, AMD.
  if (typeof define === 'function') {
    define([], function() {
      return Config;
    });
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
