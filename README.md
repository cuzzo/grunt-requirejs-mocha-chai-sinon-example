grunt-requirejs-mocha-chai-sinon-example
========================================

An example using Mocha in combination with RequireJS / require.js and Grunt (alongside Chai and Sinon.JS).


Usage
-----

grunt-requirejs-mocha-chai-sinon-example has one usage: to demonstrate how to use a bunch of awesome javascript libraries in combination.

Why is this helpful?  It's pretty tricky to figure it out on your own (or at least it was for me).  So, hopefully, this will be of some help to someone struggling to put this group of libraries together.

grunt-requirejs-mocha-chai-sinon-example is purposefully lightweight.  There's no example demonstrating how to tie in Backbone.  But, if you're that far in the game, figuring out that piece should be trivial (I hope xD).



Configuration Examples
----------------------

### [Gruntfile](http://gruntjs.com/sample-gruntfile "An Example Gruntfile") Configuration Example

#### Mocha Configuration for Your Gruntfile:

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
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
  
  grunt.registerTask('test', ['mocha']);
};
```

In this example, tests are stored in a ```test``` directory relative to the Gruntfile.

#### RequireJS Configuration for Your Gruntfile:

```javascript
var _ = require('underscore')._;
var RJSConfig = require('./config');

module.exports = function(grunt) {
  // Add require.js to the paths.
  RJSConfig.paths = _.extend(RJSConfig.paths, {
    'require-lib': 'node_modules/requirejs/require'
  });

  // Include EVERY path in the distributable.
  RJSConfig.include = [];
  _.each(RJSConfig.paths, function(path, key) {
    RJSConfig.include.push(key);
  });

  grunt.initConfig({
    requirejs: {
      compile: {
        options: _.extend(RJSConfig, {
          name: 'main',
          out: 'dist/my-proj.js',
          baseUrl: './',
          generateSourceMaps: true,
          optimize: 'uglify2',
          optimizeAllPluginResources: true,
          preserveLicenseComments: false
	})
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('dist', ['requirejs']);
};
```

This assumes that your RequireJS configuration is in the same directory as your Gruntfile (which it is for this example, but may not be in your case).


#### Putting It Together:

```javascript
var _ = require('underscore')._;
var RJSConfig = require('./config');

module.exports = function(grunt) {
  // Add require.js to the paths.
  RJSConfig.paths = _.extend(RJSConfig.paths, {
    'require-lib': 'node_modules/requirejs/require'
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
          name: 'main',
          out: 'dist/my-proj.js',
          baseUrl: './',
          generateSourceMaps: true,
          optimize: 'uglify2',
          optimizeAllPluginResources: true,
          preserveLicenseComments: false
	})
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
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('dist', ['requirejs']);
};
```


### [package.json](https://github.com/isaacs/npm/blob/master/doc/cli/json.md "Detailed package.json Documentation") Configuration

This example uses Grunt, RequireJS, Mocha, Chai, and Sinon.JS--and is, therefore, dependent upon them.

It's good practice to put your projects dependencies inside a package.json file (that makes it easy to fetch all the dependencies with a simple ```npm install``` command).


```javascript
{
  "name": "grunt-requirejs-mocha-chai-sinon-example",
  "version": "0.0.1",
  "dependencies": {
    "grunt-lib-phantomjs": "~0.3",
    "requirejs": "~2.1.4",
    "sinon": "~1.6.0",
    "chai": "~1.6.0",
    "mocha": "~1.9.0"
  },  
  "devDependencies": {
    "grunt": "~0.4.1",
    "grunt-cli": "~0.1.7",
    "grunt-mocha": "~0.3.1"
  }
}
```


### [RequireJS Config File](http://requirejs.org/docs/api.html#config "RequireJS Config File Documentation") Example

```javascript
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
```

The important part is the call to require.config() or define(). The requirejs config dictionary is stored in ```Config```. Later, it exported either AMD-like (for RequireJS) or CommonJS-like (for node).

For simplicity, for this example, config.js could be:

```javascript
require.config({
  'paths': {
    // src
    'add-one': 'src/add-one'
  }
};
```

In this example, there's only one JS file to the "application".  With this config file, the add-one.js code can be accessed like so:

```javascript
require(['add-one'], function(AddOne) {
  var three = AddOne.addOne(2);
});
```


Testing Example
---------------

### Unit testing with Mocha and Chai is dead simple.

In this example, I'm testing an addOne function.  The code looks something like:

```javascript
// Describe allows you to create a group of tests.
describe('addOne Test', function() {
  // it() is the test.
  it('Should be 2.', function() {
    // Chai provides a nice interface for assertions.
    chai.assert.equal(AddOne.addOne(1), 2);
  });
});
```

### An Example of Testing an Asynchronous RequireJS Callback:

```javascript
describe('addOne Test', function() {
 it('Should be 2.', function(done) {
   require([
     'add-one'
   ], function(AddOne) {
     chai.assert.equal(AddOne.addOne(1), 2);
     done();
   });
 });
});
```

Notice the addition of ```done``` as a parameter to ```it()```.  ```done``` allows your tests to occurr asynchronoulsy, but it requires that it be envoked to end the test--notice the call to ```done()``` at the end of the test.

### A Stubbing Example with Sinon

```javascript
describe('addOne Test', function() {
  it('Should be 42; stubbed by sinon.', function() {
    AddOne.addOne = sinon.stub().returns(42);
    chai.assert.equal(AddOne.addOne(1), 42);
  });
});
```

```sinon.stub().returns()``` allows you to override a function and force it to return whatever you want.  In this example, it returns 42.



Application Structure
---------------------

The point of tying all of these libraries together is to help assuage the pain of working with large JavaScript projects.  Feel free to organize you're project however you like, but it's probably worth some of your time to think about the structure.

For this simple example, the path directory is:

```
`-repo/            # Repository of all code.
  `-css/           # Directory containing css / stylesheets.
  `-lib/           # Directory containing third-party libraries (Chai, Mocha, RequireJS, and Sinon.JS).
  `-src/           # Directory containing the source code of the application (which is a single file: "add-one.js").
  `-test/          # Directory containing the test code.
  `-config.js      # RequireJS configuration file.
  `-Gruntfile.js   # Grunt configuration file.
  `-license.txt    # License to hack.
  `-main.js        # Example RequireJS main file (your project's main file).
  `-main.dev.html  # Example of using RequireJS without a distributable (for development).
  `-main.dist.html # Example of using RequireJS with distributable (for production).
  `-package.json   # package configuratoin file.
  `-README.md      # This lovely file.
```



Dependencies
------------

[Node & npm](https://github.com/joyent/node/wiki/Installation "Node Installation Guide")

If you don't have Node or npm installed, the above link should be easy to follow.



Getting Started
---------------

1: Clone the repository.

```bash
git clone https://github.com/cuzzo/grunt-requirejs-mocha-chai-sinon-example.git
```

2: Inside the repository, install the javascript dependencies.

```bash
npm install
```

3: Run the tests!

```bash
./node_modules/grunt-cli/bin/grunt test
```

4: Build distributable with RequireJS and Grunt.
```bash
./node_modules/grunt-cli/bin/grunt dist
```

5: Check ```main.dev.html``` and ```main.dist.html``` for "2" in the Console's log.

If you don't see something like:

```
Running "mocha:browser" (mocha) task
Testing: test/example.html
 3   -_-__,------,
 0   -_-__|  /\_/\ 
 0   -_-_~|_( ^ .^) 
     -_-_ ""  "" 

  3 tests complete (125 ms)


Done, without errors.
```

you messed something up (somehow).


Other Resources
---------------
* [grunt-mocha](https://github.com/kmiyashiro/grunt-mocha "An Example of Running Mocha Tests with Grunt") - Most helpful resource that I found while trying to tie these libraries together.
* [Grunt Guide](http://gruntjs.com/getting-started "Getting Started with Grunt") - Grunt's documentation (in case you have any troubles with grunt or grunt-cli).
* [Sinon Examples](http://sinonjs.org/docs/ "Sinon Documentation - "Mocks and Stubs and Spies, oh my!") - Use cases for Sinon (and why you might want to consider using it, if you're not already).
* [Mocha Examples](http://visionmedia.github.io/mocha/#getting-started "Getting Started with Mocha.js") - Unit tests example with Mocha (and why you might want to consider it, if you're using something else).
* [RequireJS / Backbone Configuration](http://gregfranko.com/blog/require-dot-js-2-dot-0-shim-configuration/ "RequireJS / Backbone shim Configuration") - Not the best example, but...


License
-------

grunt-requirejs-mocha-chai-sinon-example is free--as in BSD. Hack your heart out, hackers.
