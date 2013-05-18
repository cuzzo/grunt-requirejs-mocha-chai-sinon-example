module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      options: {
        baseUrl: '.',
        mainConfigFile: 'build.js',
        out: 'dist/socialorgui.js'
      }
    },
    mocha: {
      browser: ['test/**/*.html'],
      options: {
        reporter: 'Nyan', // Duh!
        run: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('test', ['mocha']);
};
