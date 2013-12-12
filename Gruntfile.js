module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      options: {
        baseUrl: '.'
      }
    },
    mocha: {
      // Test all files ending in .html anywhere inside the test directory.
      browser: ['test/**/*.html'],
      options: {
        reporter: 'Spec', 
        run: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('default', [
    'test'
  ]);

};
