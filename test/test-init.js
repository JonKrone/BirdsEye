/*
	This file injects TEST_HELPER, a file path, into the global namespace so that we can
	import helpers in a consistent and explicit way.

	Additionally, prepare our node environment for testing (just set a flag). This helps
	us avoid overwriting development database information and lowers cost of instantiating
	our server.
*/
global.TEST_HELPER = __dirname + '/test-helper.js';

process.env.NODE_ENV = 'test';