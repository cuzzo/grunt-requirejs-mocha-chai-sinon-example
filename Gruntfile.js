var _ = require('underscore')._;
var RJSConfig = require('./src/config');

module.exports = function(grunt) {
  // Add require.js to the paths.
  RJSConfig.paths = _.extend(RJSConfig.paths, {
    'require-lib': '../node_modules/requirejs/require'
  });

  // Include EVERY path in the distributable.
  RJSConfig.include = [];
  _.each(RJSConfig.paths, function(path, key) {
    RJSConfig.include.push(key);
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      compile: {
        options: _.extend(RJSConfig, {
          name: 'config',
          out: 'dist/my-proj.js',
          baseUrl: './src',
          generateSourceMaps: true,
          optimize: 'uglify2',
          optimizeAllPluginResources: true,
          preserveLicenseComments: false
	})
      }
    },
    mocha: {
      // Test all files ending in .html anywhere inside the test directory.
      browser: ['test/**/*.html'],
      options: {
        reporter: 'Nyan', // Duh!
        run: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('dist', ['requirejs']);
};
