define([], function() {
  var Main = {};

  // This is your main function. After configuration in config.js, it is called.
  Main.main = function() {
    require([
      'add-one'
    ], function(AddOne) {
      console.log(AddOne.addOne(1));
    });
  };

  return Main;
});
