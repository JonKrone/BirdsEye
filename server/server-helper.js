const R = require('ramda');
const Help = module.exports;

// Hoist global variables for easy referencing
global.__lib = __dirname + '/../lib/';
global.__models = __dirname + '/models/';

// Return the first element of a collection. Frequently useful for DB models.
Help.first = (array) => array[0];

/*
  Curried helper to log a description when invoked with a
  second parameter. Useful for locating errors. Note that
  it re-throws the error, continuing the error chain.

  example:
	  async
	    .catch(reportError('creating customer'))
	    .catch(handleError);
*/
Help.reportError = R.curry(function(description, error) {
  console.error('\n*** Error!', description, '***');
  console.error('***', error, '\n');

  if (error instanceof Error) throw error;
});

// Send status through response on invocation.
Help.sendStatus = R.curry(function (response, status, _) {
  response.sendStatus(status);
});

// Send status and data after invocation with data.
Help.sendStatusAndData = R.curry(function (response, status, data) {
  response.status(status).send(data);
});

// TODO: rethink.
// Send status and error description to client and log it on the server.
Help.sendStatusAndError = R.curry(function (response, status, description, error) {
  try {
    Help.reportError(description, error);
  } catch (error) {
    throw error;

    //  we throw the error again so we don't lose it! Always good to know when there's an error
  } finally {
    // code in a finally block _always_ executes.
    // we use it so that regardless whether the reportError above throws
    // an error, we will always send the client a response.
    return Help.sendStatusAndData(response, status, { error: description });
  }
});