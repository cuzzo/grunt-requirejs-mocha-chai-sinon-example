Mocha AMD example
========================================

An example using Mocha in combination with RequireJS / require.js and Grunt (alongside Chai, Sinon.JS, and Squire.js).


Usage
-----

Mocha AMD example has one usage: to demonstrate how to use a bunch of awesome javascript libraries in combination.

Why is this helpful?  It's pretty tricky to figure it out on your own (or at least it was for me).  So, hopefully, this will be of some help to someone struggling to put this group of libraries together.

The Mocha AMD example is purposefully lightweight.  There's no example demonstrating how to tie in Backbone, for instance, but if you're able to set these tests up, taking it from there should be pretty simple.



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
        reporter: 'Spec', 
        run: true
      }   
    }
  });
  
  grunt.loadNpmTasks('grunt-mocha');
  
  grunt.registerTask('test', ['mocha']);
};
```

In this example, tests are stored in a ```test``` directory relative to the Gruntfile.

### [package.json](https://github.com/isaacs/npm/blob/master/doc/cli/json.md "Detailed package.json Documentation") Configuration

This example uses Grunt, as well as it's mocha support -- and is, therefore, dependent upon them being installed.

It's good practice to put your projects dependencies inside a package.json file, and *also* check them in to your source control.   But for this project, we don't, since you can just download them again on checkout with  ```npm install``` command.  (This is the difference between an example project and a production system.)

This package.json file fetches grunt, grunt-cli (which lets you type ```grunt``` on the command line), and grunt-mocha, which allows you to use the mocha section inside your grunt file.


```javascript
{
  "name": "Mocha-AMD-example",
  "version": "0.1.0",
  "dependencies": {
  },
  "devDependencies": {
    "grunt": "~0.4.2",
    "grunt-cli": "~0.1.11",
    "grunt-mocha": "~0.4.7",
    "bower": "~1.2.8"
  }
}
```

#### [bower.json](http://bower.io "Main Bower Page") Configuration 

The following is a small subset of bower.json file.  Like the package.json file, it details the dependencies of your project.  While the package.json file lists dependencies for Grunt, the bower.json file lists dependencies that you'll consume in your browser.  For this example, that includes testing libraries.

Since our tests include chai, mocha, sinonjs and squire, we include them here.  The app itself needs requirejs, so that's in the separate production dependencies section.

Like in package.json, you should [check these libraries in to your source control](http://addyosmani.com/blog/checking-in-front-end-dependencies/), so your build isn't dependent on github being up, but again, for our example, we let you fetch it yourself via ```bower install```.

```javascript
  "devDependencies": {
    "chai": "~1.8.1",
    "mocha": "~1.15.1",
    "sinonjs": "~1.7.3",
    "squire": "*"
  },
  "dependencies": {
    "requirejs": "~2.1.9"
  }
```



### [RequireJS Config File](http://requirejs.org/docs/api.html#config "RequireJS Config File Documentation") Example

There are two different RequireJS config files in this example.  The first is for the source:

```javascript
require.config({
  'paths': {
    'add-one': 'add-one',
    'times-six': 'times-six',
    'arithmetic': 'arithmetic'
  }
});
```

The second is for the test code:

```javascript
require.config({
  'paths': {
    'squire': '../bower_components/squire/src/Squire'
  }
});
```

For the tests, we first include the source config, then the test config.  That way, when we run our "application", it's free of test dependencies.

In this example, there's three JS files to the "application".  With this config file, the add-one.js code can be accessed like so:

```
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

Notice the addition of ```done``` as a parameter to ```it()```.  ```done``` allows your tests to occurr asynchronoulsy, but it requires that it be envoked to end the test -- notice the call to ```done();``` at the end of the test.  You can also wrap the whole test with the require - then you won't need to call 'done()'.

```javascript
require([
     'add-one'
], function(AddOne) {
  describe('addOne Test', function() {
      it('Should be 2.', function(done) {
        chai.assert.equal(AddOne.addOne(1), 2);
      });
  });
});
```

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

### A Stubbing example with Squire

```javascript
require([
  'squire'
  ], function(Squire) {
  var injector = new Squire();
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
);
```

Sometimes, you need to stub out required dependencies.  Squire offers one way to do that.  First, use require to load squire, initialize an injector instance, then use that to stub out and require (or just require) any required dependencies.  In this example, the 'add-one' dependency of the 'arithmetic' module is replaced with a dummy function which just returns a constant number. 


Application Structure
---------------------

The point of tying all of these libraries together is to help assuage the pain of working with large JavaScript projects.  Feel free to organize you're project however you like, but it's probably worth some of your time to think about the structure.

For this simple example, the path directory is:

```
`-repo/          # Repository of all code.
  `-src/         # Directory containing the source code of the application (which is a single file: "add-one.js").
  `-test/        # Directory containing the test code.
  `-bower.json   # front end library configuration file
  `-Gruntfile.js # Grunt configuration file.
  `-license.txt  # License to hack.
  `-package.json # package configuratoin file.
  `-README.md    # This lovely file.
```



Dependencies
------------

[Node & npm](https://github.com/joyent/node/wiki/Installation "Node Installation Guide")
[bower](http://bower.io  "Bower home page") 

If you don't have Node or npm installed, the above links should be easy to follow.  Bower installs easily with npm.

For easiest use, you may wish to also install grunt's command line interface, as well as bower, into a globally usable directory in your path, such as /usr/local/bin.

On a Unix (or Mac) system, you'd do this by
```bash
sudo npm -g install grunt-cli
sudo npm -g install bower
```


Getting Started
---------------

1: Clone the repository.

```bash
git clone https://github.com/netdance/Mocha-AMD-example.git
```

(or just use Github's awesome GUI tool)

2: Inside the repository, install the javascript dependencies.

```bash
npm install
```
then
```bash
./node_modules//bower/bin/bower install
```
or, if you've installed bower globally, just ```bower install```

3: Run the tests!

```bash
./node_modules/grunt-cli/bin/grunt test
```

again, if you've installed grunt-cli globally, just ```grunt```

If you don't see something like:

```
Running "mocha:browser" (mocha) task
Testing: test/example.html


  addOne Exemplary Tests
    ✓ Should be 2. 
    ✓ Should be 42; Sinon stub. 
    ✓ Should be 2 (again); unstubbed. 

(... more tests run here)

  11 passing (3ms)

>> 11 passed! (0.00s)

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

Mocha-AMD-example is free--as in BSD. Hack your heart out, hackers.

This code was origninally started in cuzzo/grunt-requirejs-mocha-chai-sinon-example - and I'm deeply indebted to him for the clarity of his example.  Hopefully I didn't complicate it too much.
