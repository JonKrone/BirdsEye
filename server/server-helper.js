const curry = require('ramda').curry;
const helper = module.exports;

// Hoist global variables for easy referencing
global.__lib = __dirname + '/../lib/';

// Return the first element of a collection. Frequently useful for DB models.
helper.first = (array) => array[0];

/*
  Curried helper to log a description when invoked with a
  second parameter. Useful for locating errors. Note that
  it re-throws the error, continuing the error chain.

  example:
	  async
	    .catch(reportError('creating customer'))
	    .catch(handleError);
*/
helper.reportError = curry(function(description, error) {
  console.error('\n*** Error', description, '***');
  console.error('***', error, '\n');

  if (error instanceof Error) throw error;
});