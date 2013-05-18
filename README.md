grunt-requirejs-mocha-chai-sinon-example
========================================

An example using mocha in combination with require.js and Grunt.js (alongside chai and sinon).


Usage
-----

grunt-requirejs-mocha-chai-sinon-example has one usage: to demonstrate how to use a bunch of awesome javascript libraries in combination.

Why is this helpful?  It's pretty tricky to figure it out on your own (or at least it was for me).  So, hopefully, this will be of some help to someone struggling to put this group of libraries together.

grunt-requirejs-mocha-chai-sinon-example is purposefully lightweight.  There's no example demonstrating how to tie in Backbone.  But, if you're that far in the game, figuring out that piece should be trivial (I hope xD).


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



License
-------

grunt-requirejs-mocha-chai-sinon-example is free--as in BSD. Hack your heart out, hackers.
