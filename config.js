(function() {
  var Config = {
    'paths': {
      // src
      'add-one': 'src/add-one'
    }
  };

  if (typeof _TEST_MODE !== 'undefined' && _TEST_MODE === true) {
    Config.baseUrl = window._BASE_URL;
    Config.basePath = window._BASE_PATH;
    require.config(Config);
    return true;
  }

  if (typeof define === 'function') {
    define([], function() {
      return Config;
    });
  }
  if (typeof module === 'object') {
    module.exports = Config;
  }
  if (typeof exports === 'object') {
    exports.RJSConfig = Config;
  }

  return Config;
})();
