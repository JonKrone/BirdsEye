/*
	This file injects TEST_HELPER, a file path, into the global namespace so that we can
	import helpers in a consistent and explicit way.
*/
global.TEST_HELPER = __dirname + '/test-helper.js';
