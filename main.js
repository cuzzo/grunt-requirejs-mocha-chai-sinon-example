(function() {
  /**
   * If distributable is stored at ./dist and config is stored at ./,
   * then pop two parts to get the baseUrl.
   */
  var base_url = (function() {
    var scripts = document.getElementsByTagName('script');
    var me = scripts[scripts.length -1];
    var parts = me.src.split('/');
    parts.pop();
    if (parts[parts.length - 1] === 'dist') {
      parts.pop();
    }
    return parts.join('/') + '/';
  })();

  /**
   * HACK: run async so that main / distributable is intrepreted and
   * modules are registered--and, therefore, require.specified() can work.
   *
   * In layman's terms, one config to rule them all. Config will work in tests
   * as well as development and distributed.
   *
   * If config is not specified in < 5ms, assume it is not specified
   * and request it.
   *
   * Basically, this is a 5ms cost to have a single config file in a logical
   * location--and on a slow client, it can potentially cause an additional
   * request for config.js.
   */
  setTimeout(function() {
    var is_dist = require.specified('config');
    var config_key = is_dist ? 'config' : base_url + 'config.js';

    require([config_key], function(Config) {
      Config.baseUrl = base_url;
      require.config(Config);
      main();
    });
  }, 5);

  // This is your main function.
  function main() {
    require([
      'add-one'
    ], function(AddOne) {
      console.log(AddOne.addOne(1));
    });
  }
})();
