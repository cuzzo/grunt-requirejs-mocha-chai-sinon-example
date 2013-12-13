// Squire solves the problem of "how do I test in isolation when AMD is loading other stuff"
// use it to mock dependencies before load, and the modules using those dependencies will only 
// see the mocked object

// the arithmetic function immediately consumes add-one and times-six, and outputs an answer,
// so there's nothing to be done if you want to change that behavior... unless you change
// the modules it loads.  Useful for testing AMD modules which have similar behavior

require([
  'squire'
  ], function(Squire) {

  // one for each separately mocked test
  // otherwise, they overlap
  var injector = new Squire();
  var injector2 = new Squire();
 
  // See here if you're using jQuery, there's a trick you should know
  //http://blog.baltrinic.com/software-development/agile-practices/automated-testing/stop-jquery-loading-twice-with-squire-js
  //injector.mock('jquery', function() { return $; });

  describe('arithmetic Exemplary Test 1', function() {
    it('Should be 12.', function(done) {
      require(['arithmetic'],function(Arithmetic){
        chai.assert.equal(Arithmetic.answer, 12);
        done();
      });
    });
  });

  describe('arithmetic Exemplary Test 2', function() {
    it('Should be 42. mocked add-one', function(done) {
      injector.mock('add-one', function() { 
        return {
          addOne: function(x) {
            return x+6;  // add-one will now always add 6
          }
        }
      }).require(['arithmetic'],function(Arithmetic){
        chai.assert.equal(Arithmetic.answer, 42);
        done();
      });
    });
  });

  describe('arithmetic Exemplary Test 3', function() {
    it('Should be 42. mocked times-six', function(done) {
      injector2.mock('times-six', function() { 
        return {
          timesSix: function(x) {
            return x*21;  // add-one will now always multiply by 21
          }
        }
      }).require(['arithmetic'],function(Arithmetic){
        chai.assert.equal(Arithmetic.answer, 42);
        done();
      });
    });
  });

});
