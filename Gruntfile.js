module.exports = function(grunt) {
  grunt.initConfig({
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

  // create a task, 'test', which runs mocha
  grunt.registerTask('test', [
    'mocha'
  ]);

  // create a default task which runs the test task
  grunt.registerTask('default', [
    'test'
  ]);

};
