// Make the `expect` function available in every test file
global.expect = require('chai').expect;

// Hoist global variables for easy referencing
global.__models = __dirname + '/../server/models';
global.__lib = __dirname + '/../lib';

// Mocha helpers to support coroutine tests
const Bluebird = require('bluebird');
global.before_ = function(f) {
	before( Bluebird.coroutine(f) );
}

global.beforeEach_ = function(f) {
	beforeEach( Bluebird.coroutine(f) );
}

global.it_ = function(description, f) {
	it( description, Bluebird.coroutine(f) );
}

global.xit_ = function(description, f) {
	xit( description, f );
}

global.it_.only = function(description, f) {
	it.only( description, Bluebird.coroutine(f) );
}

// P.S. I am relatively uncomfortable bundling these helpers with global